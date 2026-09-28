import { act, render, screen, waitFor } from '@testing-library/react'

const flush = () => act(() => new Promise<void>((r) => setTimeout(r, 0)))
import Hero from './Hero'
import StatusStrip from './StatusStrip'
import LiveDeployCell from './LiveDeployCell'

describe('Hero', () => {
  it('leads with the role and thesis, no phone, no availability line', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Bruno Marcuche' })).toBeInTheDocument()
    expect(screen.getByText('Platform Architect')).toBeInTheDocument()
    expect(screen.getByText(/control plane for a multi-tenant hosted platform/)).toBeInTheDocument()
    expect(screen.queryByText(/561-284/)).toBeNull()
    expect(screen.queryByText(/Open to/)).toBeNull()
    expect(screen.getByRole('link', { name: 'See the systems' })).toHaveAttribute('href', '#systems')
  })
})

describe('StatusStrip', () => {
  it('shows outcome figures and no fleet or client counts', () => {
    render(<StatusStrip />)
    expect(screen.getByText('40k+')).toBeInTheDocument()
    expect(screen.getByText('1,100+')).toBeInTheDocument()
    // Unverified figures stay off until confirmed
    expect(screen.queryByText('99.99%')).toBeNull()
    expect(screen.queryByText('89%')).toBeNull()
    expect(screen.queryByText(/350|150\+/)).toBeNull()
  })
})

describe('LiveDeployCell', () => {
  afterEach(() => jest.restoreAllMocks())
  it('shows the latest run number', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ source: 'github', workflow_runs: [{ run_number: 101 }] }) } as Response)
    render(<LiveDeployCell />)
    await waitFor(() => expect(screen.getByText('v101')).toBeInTheDocument())
  })
  it('falls back when the fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('offline'))
    render(<LiveDeployCell />)
    expect(screen.getByText('live')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('this site, deployed by CI')).toBeInTheDocument())
    expect(screen.queryByText(/undefined/)).toBeNull()
  })
  it('ignores the API fallback payload and keeps the static label', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ source: 'fallback', workflow_runs: [{ run_number: 27 }] }) } as Response)
    render(<LiveDeployCell />)
    await flush()
    await flush()
    expect(screen.getByText('live')).toBeInTheDocument()
    expect(screen.queryByText('v27')).toBeNull()
  })
  it('falls back on an empty run list', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ workflow_runs: [] }) } as Response)
    render(<LiveDeployCell />)
    await waitFor(() => expect(screen.getByText('live')).toBeInTheDocument())
  })
})
