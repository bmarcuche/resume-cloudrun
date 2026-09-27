'use client'

import { useEffect, useState } from 'react'

const STEPS = ['git push', 'GitHub Actions', 'build and test', 'push image', 'Cloud Run', 'live']

interface Run {
  run_number: number
  head_sha: string
  name: string
  conclusion: string | null
  created_at: string
  updated_at: string
}

function duration(run: Run): string {
  const s = Math.max(0, Math.round((Date.parse(run.updated_at) - Date.parse(run.created_at)) / 1000))
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

// Deploy proof on the home page. Fetches the latest run through the site's own
// API and keeps static copy when the API is unavailable.
export default function DeployProof() {
  const [run, setRun] = useState<Run | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/workflows')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { source?: string; workflow_runs?: Run[] }) => {
        // The API answers 200 with canned runs when GitHub is unavailable; only live data counts.
        if (data.source !== 'github') return
        const first = data.workflow_runs?.[0]
        if (!cancelled && first && typeof first.run_number === 'number') setRun(first)
      })
      .catch(() => {
        /* fallback copy stays */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="deploys" className="pa-section deploys-pa">
      <div className="pa-wrap">
        <h2 className="pa-h2">This site is a platform too</h2>
        <p className="pa-lede">
          Every push to main builds a container, ships it to Cloud Run and serves it at
          resume.mindtunnel.org. The full run history is on the{' '}
          <a className="pa-link" href="/workflows">
            deployment dashboard
          </a>
          .
        </p>
        <div className="pipe">
          <div className="pipe-steps">
            {STEPS.map((s) => (
              <span key={s} className="pipe-step">
                <i aria-hidden="true" />
                {s}
              </span>
            ))}
          </div>
          <div className="pipe-run pa-mono">
            {run ? (
              <>
                <span>
                  last run <b>#{run.run_number}</b>
                </span>
                <span>
                  <b>{run.head_sha.slice(0, 7)}</b> {run.name}
                </span>
                <span>
                  {run.conclusion ?? 'in progress'} in <b>{duration(run)}</b>
                </span>
              </>
            ) : (
              <span>latest run on the dashboard</span>
            )}
            <span>Next.js 15 on Cloud Run, GCP</span>
          </div>
        </div>
      </div>
    </section>
  )
}
