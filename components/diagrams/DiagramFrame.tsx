import type { ReactNode } from 'react'

// Holds a wide and a tall SVG variant of the same diagram. CSS shows one per
// breakpoint (700px). Never scrolls sideways.
export default function DiagramFrame({ children }: { children: ReactNode }) {
  return <div className="dwrap">{children}</div>
}
