// Several home page widgets read the same run list. Share one in-flight request
// so a page load costs a single /api/workflows call instead of one per widget.
let inflight: Promise<unknown> | null = null

export function fetchWorkflowRuns<T>(): Promise<T> {
  if (!inflight) {
    inflight = fetch('/api/workflows')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .finally(() => {
        inflight = null
      })
  }
  return inflight as Promise<T>
}
