import { render, screen } from '@testing-library/react'
import DeploymentFlow from './DeploymentFlow'

it('renders the six deployment steps', () => {
  render(<DeploymentFlow />)
  for (const step of ['Git Commit', 'GitHub Actions', 'Build & Test', 'Push Image', 'Cloud Run']) {
    expect(screen.getByText(step)).toBeInTheDocument()
  }
})
