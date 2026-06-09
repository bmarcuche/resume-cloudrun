import type { ProjectIconKey } from '../../lib/projects-data'

// Hand-drawn line-art placeholders. Each uses currentColor so the theme drives
// the color; swap any of these for a real <img> of the project later.

function RouterIcon() {
  // Semantic router: one input fans through a router node out to specialist agents.
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="24" r="2.4" fill="currentColor" stroke="none" />
      <line x1="9.5" y1="24" x2="15" y2="24" />
      <rect x="15" y="18" width="12" height="12" rx="3" />
      <circle cx="21" cy="24" r="2" />
      <line x1="27" y1="24" x2="32" y2="24" />
      <line x1="32" y1="24" x2="40" y2="13" />
      <line x1="32" y1="24" x2="40" y2="24" />
      <line x1="32" y1="24" x2="40" y2="35" />
      <rect x="40" y="10.5" width="5.5" height="5.5" rx="1.4" fill="currentColor" stroke="none" />
      <rect x="40" y="21.5" width="5.5" height="5.5" rx="1.4" fill="currentColor" stroke="none" />
      <rect x="40" y="32.5" width="5.5" height="5.5" rx="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FleetIcon() {
  // Server fleet under continuous discovery (radar sweep).
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="9" width="22" height="8" rx="2" />
      <circle cx="12.5" cy="13" r="1.2" fill="currentColor" stroke="none" />
      <line x1="16" y1="13" x2="26" y2="13" strokeWidth="1.2" />
      <rect x="8" y="20" width="22" height="8" rx="2" />
      <circle cx="12.5" cy="24" r="1.2" fill="currentColor" stroke="none" />
      <line x1="16" y1="24" x2="26" y2="24" strokeWidth="1.2" />
      <rect x="8" y="31" width="22" height="8" rx="2" />
      <circle cx="12.5" cy="35" r="1.2" fill="currentColor" stroke="none" />
      <line x1="16" y1="35" x2="26" y2="35" strokeWidth="1.2" />
      <circle cx="36" cy="38" r="1.8" fill="currentColor" stroke="none" />
      <path d="M29 38 A7 7 0 0 1 36 31" />
      <path d="M25 38 A11 11 0 0 1 36 27" />
    </svg>
  )
}

function AccessIcon() {
  // Time-boxed privileged access: a lock with a clock face.
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 22 V17 a8 8 0 0 1 16 0 V22" />
      <rect x="12" y="22" width="24" height="18" rx="3" />
      <circle cx="24" cy="31" r="5" />
      <line x1="24" y1="31" x2="24" y2="28" />
      <line x1="24" y1="31" x2="26.5" y2="32.5" />
      <circle cx="24" cy="31" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

const ICONS = {
  router: RouterIcon,
  fleet: FleetIcon,
  access: AccessIcon,
}

export default function ProjectIcon({ icon }: { icon: ProjectIconKey }) {
  const Icon = ICONS[icon]
  return <Icon />
}
