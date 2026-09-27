'use client'

import { useEffect, useState } from 'react'

// Reads the latest GitHub Actions run number through the site's own API.
// Degrades to a static label when the API is unavailable (no token, rate limit).
export default function LiveDeployCell() {
  const [run, setRun] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/workflows')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { workflow_runs?: { run_number?: number }[] }) => {
        const n = data.workflow_runs?.[0]?.run_number
        if (!cancelled && typeof n === 'number') setRun(n)
      })
      .catch(() => {
        /* keep the fallback */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="stat">
      <span className="stat-value pa-mono" style={{ fontSize: '1.1rem', paddingTop: 6 }}>
        {run === null ? 'live' : `v${run}`}
      </span>
      <span className="stat-live">
        <i aria-hidden="true" />
        this site, deployed by CI
      </span>
    </div>
  )
}
