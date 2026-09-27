import { render, screen } from '@testing-library/react'
import { WorkflowStatusIcon, WorkflowStatusBadge } from './WorkflowStatus'

describe('WorkflowStatus', () => {
  it.each(['success', 'failure', 'in_progress', 'queued', 'cancelled', 'unknown'])('renders an icon for %s', (status) => {
    const { container } = render(<WorkflowStatusIcon status={status} size="sm" />)
    expect(container.querySelector('svg')).not.toBeNull()
  })
  it.each([
    ['success', 'Success'],
    ['in_progress', 'In Progress'],
    ['cancelled', 'Cancelled'],
    ['weird', 'Weird'],
  ])('labels the %s badge', (status, label) => {
    render(<WorkflowStatusBadge status={status} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
