import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Accepted for call-site compatibility; the cascade is now scroll-driven. */
  delay?: number
  className?: string
}

// Scroll-reveal wrapper. The entrance animation is pure CSS (scroll-driven via
// animation-timeline where supported), so content is visible immediately and is
// never gated on JavaScript hydration. No client runtime, no IntersectionObserver.
export default function Reveal({ children, className = '' }: RevealProps) {
  return <div className={`reveal ${className}`}>{children}</div>
}
