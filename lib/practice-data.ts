// "How I work" principles. Scale-neutral by design: no team headcount here.
export interface Principle {
  title: string
  body: string
}

export const practice: Principle[] = [
  {
    title: 'Ship the control plane, not the ticket',
    body: 'If a task comes through more than twice, it becomes a pipeline, a scoped tool or an agent skill. The queue gets shorter every month or the platform is not doing its job.',
  },
  {
    title: 'Deterministic first, models second',
    body: 'Keyword fast paths and typed tools handle what they can. LLM reasoning is the fallback, measured, and retrained from corrections rather than trusted.',
  },
  {
    title: 'Observability before automation',
    body: 'OpenTelemetry and Observe went in before the agents did. You cannot hand production to software you cannot watch.',
  },
  {
    title: 'Lead by building alongside',
    body: 'I run teams the way I run platforms: clear ownership, measured outcomes, and engineers who grow into owners. 1:1s, architecture reviews and pairing on the platform itself are the operating model at any team size.',
  },
]
