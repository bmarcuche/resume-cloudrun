#!/bin/bash

# Comprehensive CI/CD Pipeline Testing Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="https://resume.mindtunnel.org"
GITHUB_REPO="bmarcuche/resume-cloudrun"
MAX_WAIT_TIME=600  # 10 minutes
CHECK_INTERVAL=30  # 30 seconds

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

log_stage() {
    echo -e "${PURPLE}[STAGE]${NC} $1"
}

# Test functions
test_site_availability() {
    log_info "Testing site availability..."
    
    if response=$(curl -s -w "%{http_code},%{time_total}" "$DOMAIN" 2>/dev/null); then
        http_code=$(echo "$response" | tail -1 | cut -d',' -f1)
        response_time=$(echo "$response" | tail -1 | cut -d',' -f2)
        
        if [[ "$http_code" == "200" ]]; then
            log_success "Site is available (HTTP $http_code, ${response_time}s)"
            return 0
        else
            log_warning "Site returned HTTP $http_code"
            return 1
        fi
    else
        log_error "Failed to connect to site"
        return 1
    fi
}

test_health_endpoint() {
    log_info "Testing health endpoint..."
    
    if response=$(curl -s -w "%{http_code}" "$DOMAIN/api/health" 2>/dev/null); then
        http_code=$(echo "$response" | tail -c 4)
        
        if [[ "$http_code" == "200" ]]; then
            log_success "Health endpoint is working (HTTP $http_code)"
            # Show health response
            health_data=$(echo "$response" | head -c -4)
            echo "Health Response: $health_data"
            return 0
        else
            log_warning "Health endpoint returned HTTP $http_code"
            return 1
        fi
    else
        log_error "Failed to connect to health endpoint"
        return 1
    fi
}

test_readiness_endpoint() {
    log_info "Testing readiness endpoint..."
    
    if response=$(curl -s -w "%{http_code}" "$DOMAIN/api/ready" 2>/dev/null); then
        http_code=$(echo "$response" | tail -c 4)
        
        if [[ "$http_code" == "200" ]]; then
            log_success "Readiness endpoint is working (HTTP $http_code)"
            return 0
        else
            log_warning "Readiness endpoint returned HTTP $http_code"
            return 1
        fi
    else
        log_error "Failed to connect to readiness endpoint"
        return 1
    fi
}

test_security_headers() {
    log_info "Testing security headers..."
    
    headers=$(curl -I -s "$DOMAIN" | tr -d '\r')
    
    # Check for security headers
    declare -A security_headers=(
        ["X-Frame-Options"]="should be present"
        ["X-Content-Type-Options"]="should be present"
        ["Strict-Transport-Security"]="should be present"
    )
    
    local all_passed=true
    
    for header in "${!security_headers[@]}"; do
        if echo "$headers" | grep -qi "^$header:"; then
            log_success "Security header '$header' is present"
        else
            log_warning "Security header '$header' is missing"
            all_passed=false
        fi
    done
    
    if $all_passed; then
        log_success "Security headers test passed"
        return 0
    else
        log_warning "Some security headers are missing"
        return 1
    fi
}

test_performance() {
    log_info "Testing performance..."
    
    response_time=$(curl -o /dev/null -s -w '%{time_total}' "$DOMAIN")
    response_time_ms=$(echo "$response_time * 1000" | bc -l | cut -d'.' -f1)
    
    log_info "Response time: ${response_time_ms}ms"
    
    if [[ $response_time_ms -lt 2000 ]]; then
        log_success "Performance test passed (${response_time_ms}ms < 2000ms)"
        return 0
    else
        log_warning "Performance test warning (${response_time_ms}ms >= 2000ms)"
        return 1
    fi
}

wait_for_deployment() {
    log_info "Waiting for deployment to complete..."
    log_info "This may take 3-5 minutes for the full CI/CD pipeline"
    
    local start_time=$(date +%s)
    local attempts=0
    
    while true; do
        local current_time=$(date +%s)
        local elapsed=$((current_time - start_time))
        attempts=$((attempts + 1))
        
        log_info "Attempt $attempts - Elapsed time: ${elapsed}s"
        
        # Check if health endpoint is available (indicates new deployment)
        if curl -s -f "$DOMAIN/api/health" >/dev/null 2>&1; then
            log_success "New deployment detected! Health endpoint is available"
            return 0
        fi
        
        # Check timeout
        if [[ $elapsed -gt $MAX_WAIT_TIME ]]; then
            log_error "Timeout waiting for deployment (${MAX_WAIT_TIME}s)"
            return 1
        fi
        
        log_info "Waiting ${CHECK_INTERVAL}s before next check..."
        sleep $CHECK_INTERVAL
    done
}

# Main testing function
main() {
    echo "🧪 CI/CD Pipeline Testing Started"
    echo "=================================="
    echo "Domain: $DOMAIN"
    echo "Repository: $GITHUB_REPO"
    echo "Max wait time: ${MAX_WAIT_TIME}s"
    echo "Check interval: ${CHECK_INTERVAL}s"
    echo ""
    
    log_stage "STAGE 1: Initial Site Test"
    test_site_availability
    echo ""
    
    log_stage "STAGE 2: Waiting for Deployment"
    if wait_for_deployment; then
        echo ""
        log_stage "STAGE 3: Post-Deployment Validation"
        
        # Test all endpoints and features
        local test_results=()
        
        log_info "Running comprehensive validation tests..."
        echo ""
        
        # Site availability
        if test_site_availability; then
            test_results+=("✅ Site Availability")
        else
            test_results+=("❌ Site Availability")
        fi
        
        # Health endpoint
        if test_health_endpoint; then
            test_results+=("✅ Health Endpoint")
        else
            test_results+=("❌ Health Endpoint")
        fi
        
        # Readiness endpoint
        if test_readiness_endpoint; then
            test_results+=("✅ Readiness Endpoint")
        else
            test_results+=("❌ Readiness Endpoint")
        fi
        
        # Security headers
        if test_security_headers; then
            test_results+=("✅ Security Headers")
        else
            test_results+=("⚠️  Security Headers")
        fi
        
        # Performance
        if test_performance; then
            test_results+=("✅ Performance")
        else
            test_results+=("⚠️  Performance")
        fi
        
        echo ""
        log_stage "STAGE 4: Test Results Summary"
        echo "=============================="
        
        for result in "${test_results[@]}"; do
            echo "$result"
        done
        
        echo ""
        
        # Count successful tests
        local success_count=$(printf '%s\n' "${test_results[@]}" | grep -c "✅" || true)
        local total_count=${#test_results[@]}
        
        if [[ $success_count -eq $total_count ]]; then
            log_success "🎉 All tests passed! ($success_count/$total_count)"
            log_success "CI/CD Pipeline is working perfectly!"
            return 0
        else
            log_warning "⚠️  Some tests failed or had warnings ($success_count/$total_count passed)"
            log_info "Check the results above for details"
            return 1
        fi
    else
        log_error "❌ Deployment did not complete within timeout"
        log_info "Check GitHub Actions: https://github.com/$GITHUB_REPO/actions"
        return 1
    fi
}

# Check dependencies
command -v curl >/dev/null 2>&1 || { log_error "curl is required but not installed"; exit 1; }
command -v bc >/dev/null 2>&1 || { log_error "bc is required but not installed"; exit 1; }

# Run main function
main "$@"
