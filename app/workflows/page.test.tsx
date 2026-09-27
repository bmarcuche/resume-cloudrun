import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import WorkflowsPage from './page'

const run = (over: Record<string, unknown>) => ({
  id: 1, name: 'Production CI/CD Pipeline', status: 'completed', conclusion: 'success',
  created_at: '2026-09-26T00:00:00Z', updated_at: '2026-09-26T00:03:52Z', head_branch: 'main', head_sha: 'abcdef1234567',
  actor: { login: 'bmarcuche', avatar_url: '' }, event: 'push', workflow_id: 1, run_number: 98,
  html_url: 'https://github.com/x', jobs_url: '', ...over,
})

describe('WorkflowsPage', () => {
  afterEach(() => jest.restoreAllMocks())

  it('lists runs and filters by status', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ workflow_runs: [run({ id: 1 }), run({ id: 2, run_number: 97, conclusion: 'failure' }), run({ id: 3, run_number: 96, conclusion: null, status: 'in_progress' })] }),
    } as Response)
    render(<WorkflowsPage />)
    await waitFor(() => expect(screen.getByText('#98')).toBeInTheDocument())
    expect(screen.getByRole('heading', { level: 1, name: 'Deploy history' })).toBeInTheDocument()
    fireEvent.click(screen.getAllByText('Failure')[0])
    expect(screen.queryByText('#98')).toBeNull()
    expect(screen.getByText('#97')).toBeInTheDocument()
  })

  it('stops loading when the API fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    render(<WorkflowsPage />)
    await waitFor(() => expect(screen.queryByText(/Loading workflow runs/)).toBeNull())
  })
})
