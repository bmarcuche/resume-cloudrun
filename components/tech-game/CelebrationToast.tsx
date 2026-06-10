'use client'

import { StarIcon } from '@heroicons/react/24/solid'

interface CelebrationToastProps {
  text: string
  visible: boolean
  finale: boolean
}

// Transient footer toast for the tech game. Presentational only; the parent owns
// the queue and visibility timing. Hidden on desktop (the game is mobile-only).
export default function CelebrationToast({ text, visible, finale }: CelebrationToastProps) {
  return (
    <div
      className={`tech-toast ${visible ? 'is-visible' : ''} ${finale ? 'is-finale' : ''}`}
      role="status"
      aria-live="polite"
    >
      <StarIcon className="tech-toast-star" aria-hidden="true" />
      <span>{text}</span>
    </div>
  )
}
