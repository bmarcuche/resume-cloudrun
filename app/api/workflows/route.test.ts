/** @jest-environment node */
import { GET } from './route'

const run = {
  id: 1, name: 'Production CI/CD Pipeline', status: 'completed', conclusion: 'success',
  created_at: '2026-09-26T00:00:00Z', updated_at: '2026-09-26T00:03:52Z', head_branch: 'main',
  head_sha: 'abcdef1234567890', actor: { login: 'bmarcuche', avatar_url: '' }, event: 'push',
  workflow_id: 1, run_number: 98, html_url: 'https://github.com/x', jobs_url: '',
}
const json = (body: unknown, ok = true, status = 200) => ({ ok, status, statusText: 'x', json: async () => body }) as Response

describe('GET /api/workflows', () => {
  afterEach(() => jest.restoreAllMocks())
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('transforms GitHub runs and uses the commit title as the name', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) =>
      String(url).includes('/commits/')
        ? json({ sha: run.head_sha, commit: { message: 'feat: thing\n\nbody', author: { name: 'b', email: 'e' } } })
        : json({ workflow_runs: [run, { ...run, id: 2, conclusion: null }], total_count: 2 }),
    )
    const body = await (await GET()).json()
    expect(body.source).toBe('github')
    expect(body.workflow_runs[0].name).toBe('feat: thing')
    expect(body.workflow_runs[0].head_sha).toBe('abcdef1')
    expect(body.workflow_runs[0].duration).toBeGreaterThan(0)
    expect(body.workflow_runs[1].duration).toBeUndefined()
  })

  it('falls back to the workflow name when the commit lookup fails', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async (url) =>
      String(url).includes('/commits/') ? json({}, false, 404) : json({ workflow_runs: [run], total_count: 1 }),
    )
    const body = await (await GET()).json()
    expect(body.workflow_runs[0].name).toBe('Production CI/CD Pipeline')
  })

  it('serves fallback data when GitHub answers with an error', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue(json({}, false, 403))
    const body = await (await GET()).json()
    expect(body.source).toBe('fallback')
    expect(body.workflow_runs.length).toBeGreaterThan(0)
  })

  it('serves fallback data when the request throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    const body = await (await GET()).json()
    expect(body.source).toBe('fallback')
  })
})
