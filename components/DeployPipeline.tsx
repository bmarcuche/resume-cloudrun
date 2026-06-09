'use client'

import { useEffect, useRef, useState } from 'react'
import type { ComponentType, SVGProps } from 'react'
import {
  CodeBracketIcon,
  PlayCircleIcon,
  RocketLaunchIcon,
  ArrowUpTrayIcon,
  CloudIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

interface Phase {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  detail: string
  mono?: boolean
}

const PHASES: Phase[] = [
  { Icon: CodeBracketIcon, title: 'Git Commit', detail: 'git push origin main', mono: true },
  { Icon: PlayCircleIcon, title: 'GitHub Actions', detail: 'CI triggered' },
  { Icon: RocketLaunchIcon, title: 'Build & Test', detail: 'next build' },
  { Icon: ArrowUpTrayIcon, title: 'Push Image', detail: 'to GCR' },
  { Icon: CloudIcon, title: 'Cloud Run', detail: 'deploy revision' },
  { Icon: GlobeAltIcon, title: 'Live', detail: 'served on GCP' },
]

const TICK_MS = 560
const HOLD_MS = 1800
const LIVE_URL = 'resume.mindtunnel.org'

// Animated deploy stepper: nodes and connectors light up in sequence, the
// active node pulses, and the live-URL bar turns on when the deploy completes.
export default function DeployPipeline() {
  // Interleaved slots: node0, line0, node1, line1, ... node(n-1)
  const totalSlots = PHASES.length * 2 - 1
  const [filled, setFilled] = useState(0)
  const reduced = useRef(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const nodeOn = (i: number) => filled > i * 2
  const lineOn = (i: number) => filled > i * 2 + 1
  const lastActive = Math.floor((filled - 1) / 2)
  const allDone = filled >= totalSlots

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }

  const run = () => {
    stop()
    setFilled(0)
    if (reduced.current) {
      setFilled(totalSlots)
      return
    }
    timer.current = setInterval(() => {
      setFilled((f) => {
        if (f >= totalSlots) {
          stop()
          setTimeout(run, HOLD_MS)
          return f
        }
        return f + 1
      })
    }, TICK_MS)
  }

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    run()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="dp-card">
      {/* Header */}
      <div className="dp-head">
        <span className="dp-dot" />
        <span className="dp-app">Deploy pipeline</span>
        <CodeBracketIcon className="dp-branch" aria-hidden="true" />
      </div>

      {/* Stepper */}
      <ol className="dp-steps">
        {PHASES.map((phase, i) => {
          const isLast = i === PHASES.length - 1
          const on = nodeOn(i)
          const pulse = !reduced.current && i === lastActive && !allDone
          const Icon = phase.Icon
          return (
            <li key={phase.title} className="dp-step">
              <div className={`dp-node ${on ? 'is-on' : ''} ${pulse ? 'is-pulse' : ''}`}>
                <Icon aria-hidden="true" />
              </div>
              {!isLast && (
                <span className={`dp-line ${lineOn(i) ? 'is-on' : ''}`} aria-hidden="true" />
              )}
              <div className="dp-content">
                <div className={`dp-title ${on ? 'is-on' : ''}`}>{phase.title}</div>
                <div className={`dp-detail ${phase.mono ? 'is-mono' : ''}`}>{phase.detail}</div>
              </div>
            </li>
          )
        })}
      </ol>

      {/* Live URL bar */}
      <div className="dp-urlwrap">
        <div className={`dp-url ${allDone ? 'is-done' : ''}`}>
          <LockClosedIcon aria-hidden="true" />
          <span className="dp-urltext">{LIVE_URL}</span>
        </div>
      </div>
    </div>
  )
}
