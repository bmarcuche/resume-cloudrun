#!/bin/bash

# Production-ready deployment validation script
# Validates deployment health, performance, and security

set -euo pipefail

# Configuration
DOMAIN="https://resume.mindtunnel.org"
MAX_RESPONSE_TIME=3000  # milliseconds
MIN_UPTIME_PERCENTAGE=99.9
HEALTH_CHECK_RETRIES=5
HEALTH_CHECK_INTERVAL=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Health check function
check_health() {
    local url="$1"
    local max_retries="$2"
    local interval="$3"
    
    log_info "Performing health check on $url"
    
    for ((i=1; i<=max_retries; i++)); do
        log_info "Health check attempt $i/$max_retries"
        
        if response=$(curl -s -w "%{http_code},%{time_total}" "$url/api/health" 2>/dev/null); then
            http_code=$(echo "$response" | cut -d',' -f1)
            response_time=$(echo "$response" | cut -d',' -f2)
            
            if [[ "$http_code" == "200" ]]; then
                log_success "Health check passed (HTTP $http_code, ${response_time}s)"
                return 0
            else
                log_warning "Health check failed with HTTP $http_code"
            fi
        else
            log_warning "Health check request failed"
        fi
        
        if [[ $i -lt $max_retries ]]; then
            log_info "Waiting ${interval}s before retry..."
            sleep "$interval"
        fi
    done
    
    log_error "Health check failed after $max_retries attempts"
    return 1
}

# Performance test function
check_performance() {
    local url="$1"
    local max_time="$2"
    
    log_info "Running performance test on $url"
    
    # Test main page
    response_time=$(curl -o /dev/null -s -w '%{time_total}' "$url")
    response_time_ms=$(echo "$response_time * 1000" | bc -l | cut -d'.' -f1)
    
    log_info "Response time: ${response_time_ms}ms"
    
    if [[ $response_time_ms -lt $max_time ]]; then
        log_success "Performance test passed (${response_time_ms}ms < ${max_time}ms)"
        return 0
    else
        log_error "Performance test failed (${response_time_ms}ms >= ${max_time}ms)"
        return 1
    fi
}

# Security headers check
check_security_headers() {
    local url="$1"
    
    log_info "Checking security headers for $url"
    
    headers=$(curl -I -s "$url" | tr -d '\r')
    
    # Required security headers
    declare -A required_headers=(
        ["X-Frame-Options"]="DENY"
        ["X-Content-Type-Options"]="nosniff"
        ["X-XSS-Protection"]="1; mode=block"
        ["Strict-Transport-Security"]="max-age="
    )
    
    local all_passed=true
    
    for header in "${!required_headers[@]}"; do
        if echo "$headers" | grep -qi "^$header:"; then
            log_success "Security header '$header' is present"
        else
            log_error "Security header '$header' is missing"
            all_passed=false
        fi
    done
    
    if $all_passed; then
        log_success "All security headers check passed"
        return 0
    else
        log_error "Security headers check failed"
        return 1
    fi
}

# SSL/TLS check
check_ssl() {
    local domain="$1"
    
    log_info "Checking SSL/TLS configuration for $domain"
    
    # Extract domain from URL
    domain_only=$(echo "$domain" | sed 's|https\?://||' | sed 's|/.*||')
    
    # Check SSL certificate
    if ssl_info=$(echo | openssl s_client -servername "$domain_only" -connect "$domain_only:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null); then
        log_success "SSL certificate is valid"
        
        # Check expiration
        not_after=$(echo "$ssl_info" | grep "notAfter" | cut -d'=' -f2)
        expiry_date=$(date -d "$not_after" +%s 2>/dev/null || date -j -f "%b %d %T %Y %Z" "$not_after" +%s 2>/dev/null)
        current_date=$(date +%s)
        days_until_expiry=$(( (expiry_date - current_date) / 86400 ))
        
        if [[ $days_until_expiry -gt 30 ]]; then
            log_success "SSL certificate expires in $days_until_expiry days"
        else
            log_warning "SSL certificate expires in $days_until_expiry days - renewal needed soon"
        fi
        
        return 0
    else
        log_error "SSL certificate check failed"
        return 1
    fi
}

# Domain mapping check
check_domain_mapping() {
    local domain="$1"
    
    log_info "Checking domain mapping for $domain"
    
    # Extract domain from URL
    domain_only=$(echo "$domain" | sed 's|https\?://||' | sed 's|/.*||')
    
    # Check if domain resolves
    if nslookup "$domain_only" >/dev/null 2>&1; then
        log_success "Domain $domain_only resolves correctly"
        
        # Check if it's accessible
        if curl -f -s --max-time 10 "$domain" >/dev/null; then
            log_success "Domain $domain is accessible"
            return 0
        else
            log_error "Domain $domain is not accessible"
            return 1
        fi
    else
        log_error "Domain $domain_only does not resolve"
        return 1
    fi
}

# Main validation function
main() {
    log_info "Starting deployment validation for $DOMAIN"
    log_info "Validation criteria:"
    log_info "  - Max response time: ${MAX_RESPONSE_TIME}ms"
    log_info "  - Health check retries: $HEALTH_CHECK_RETRIES"
    log_info "  - Health check interval: ${HEALTH_CHECK_INTERVAL}s"
    echo ""
    
    local exit_code=0
    
    # Run all checks
    log_info "=== HEALTH CHECK ==="
    if ! check_health "$DOMAIN" "$HEALTH_CHECK_RETRIES" "$HEALTH_CHECK_INTERVAL"; then
        exit_code=1
    fi
    echo ""
    
    log_info "=== PERFORMANCE CHECK ==="
    if ! check_performance "$DOMAIN" "$MAX_RESPONSE_TIME"; then
        exit_code=1
    fi
    echo ""
    
    log_info "=== SECURITY HEADERS CHECK ==="
    if ! check_security_headers "$DOMAIN"; then
        exit_code=1
    fi
    echo ""
    
    log_info "=== SSL/TLS CHECK ==="
    if ! check_ssl "$DOMAIN"; then
        exit_code=1
    fi
    echo ""
    
    log_info "=== DOMAIN MAPPING CHECK ==="
    if ! check_domain_mapping "$DOMAIN"; then
        exit_code=1
    fi
    echo ""
    
    # Final result
    if [[ $exit_code -eq 0 ]]; then
        log_success "🎉 All deployment validation checks passed!"
        log_success "Service is ready for production traffic"
    else
        log_error "❌ Deployment validation failed"
        log_error "Please fix the issues before proceeding"
    fi
    
    exit $exit_code
}

# Check dependencies
command -v curl >/dev/null 2>&1 || { log_error "curl is required but not installed"; exit 1; }
command -v openssl >/dev/null 2>&1 || { log_error "openssl is required but not installed"; exit 1; }
command -v bc >/dev/null 2>&1 || { log_error "bc is required but not installed"; exit 1; }

# Run main function
main "$@"
