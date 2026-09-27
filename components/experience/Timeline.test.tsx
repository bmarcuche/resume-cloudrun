import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

describe('Timeline', () => {
  it('renders every employer and opens the current role by default', () => {
    const { container } = render(<Timeline />)
    for (const c of ['AssetWorks', 'EdventureTrek', 'AnswerRocket', 'OfficeSpace Software', 'Hewlett Packard', 'ITT Technical Institute']) {
      expect(screen.getByText(c)).toBeInTheDocument()
    }
    const entries = container.querySelectorAll('details.tl-entry')
    expect(entries[0]).toHaveAttribute('open')
    expect(entries[1]).not.toHaveAttribute('open')
  })
  it('labels the current role Platform Architect', () => {
    render(<Timeline />)
    expect(screen.getByText('Operations Team Lead, Platform Architect')).toBeInTheDocument()
  })
  it('links to the PDF', () => {
    render(<Timeline />)
    expect(screen.getByRole('link', { name: /full resume as PDF/ })).toHaveAttribute('href', '/resume/bruno_marcuche_resume.pdf')
  })
})
