import { act, render, screen, waitFor } from '@testing-library/react'

const flush = () => act(() => new Promise<void>((r) => setTimeout(r, 0)))
import DeployProof from './DeployProof'

describe('DeployProof', () => {
  afterEach(() => jest.restoreAllMocks())
  it('renders the six pipeline steps and a dashboard link', () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    render(<DeployProof />)
    for (const s of ['git push', 'GitHub Actions', 'build and test', 'push image', 'Cloud Run', 'live']) {
      expect(screen.getByText(s)).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'deployment dashboard' })).toHaveAttribute('href', '/workflows')
    expect(screen.getByText(/Every push to main/)).toBeInTheDocument()
  })
  it('shows the latest run when the API answers', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ source: 'github', workflow_runs: [{ run_number: 101, head_sha: 'abcdef1234567', name: 'feat: something', conclusion: 'success', created_at: '2026-09-26T00:00:00Z', updated_at: '2026-09-26T00:03:52Z' }] }),
    } as Response)
    render(<DeployProof />)
    await waitFor(() => expect(screen.getByText('#101')).toBeInTheDocument())
    expect(screen.getByText('abcdef1')).toBeInTheDocument()
    expect(screen.getByText(/3m 52s/)).toBeInTheDocument()
  })
  it('shows the static line when the API serves its fallback data', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ source: 'fallback', workflow_runs: [{ run_number: 27, head_sha: '3c900ef00', name: 'old', conclusion: 'success', created_at: '2025-07-01T00:00:00Z', updated_at: '2025-07-01T00:03:45Z' }] }),
    } as Response)
    render(<DeployProof />)
    await flush()
    await flush()
    expect(screen.getByText('latest run on the dashboard')).toBeInTheDocument()
    expect(screen.queryByText('#27')).toBeNull()
  })
  it('never prints undefined on failure', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    const { container } = render(<DeployProof />)
    await waitFor(() => expect(screen.getByText(/Next.js 15 on Cloud Run/)).toBeInTheDocument())
    expect(container.textContent).not.toMatch(/undefined|NaN/)
  })
})
