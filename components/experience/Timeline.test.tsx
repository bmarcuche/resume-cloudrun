import { render, screen } from '@testing-library/react'
import Timeline from './Timeline'

describe('Timeline', () => {
  it('renders every employer and opens the current role by default', () => {
    const { container } = render(<Timeline />)
    for (const c of ['AssetWorks', 'EdventureTrek', 'AnswerRocket', 'OfficeSpace Software', 'Hewlett Packard', 'ITT Technical Institute']) {
      expect(screen.getAllByText(c).length).toBeGreaterThan(0)
    }
    const entries = container.querySelectorAll('details.tl-entry')
    expect(entries[0]).toHaveAttribute('open')
    expect(entries[1]).not.toHaveAttribute('open')
  })
  it('lists the Platform Architect role first, then Operations Team Lead, both at AssetWorks', () => {
    const { container } = render(<Timeline />)
    const entries = container.querySelectorAll('details.tl-entry')
    expect(entries[0].textContent).toMatch(/08\/2026 to present/)
    expect(entries[0].textContent).toMatch(/AssetWorks/)
    expect(entries[0].querySelector('.tl-who span')!.textContent).toBe('Platform Architect')
    expect(entries[1].querySelector('.tl-who span')!.textContent).toBe('Operations Team Lead')
    expect(entries[1].textContent).toMatch(/03\/2025 to 07\/2026/)
    expect(entries[0].textContent).toMatch(/agentic automation/)
    expect(entries[0].textContent).not.toMatch(/Zendesk|Oracle|M5|FA, EAM/)
  })
  it('links to the PDF', () => {
    render(<Timeline />)
    expect(screen.getByRole('link', { name: /full resume as PDF/ })).toHaveAttribute('href', '/resume/bruno_marcuche_resume.pdf')
  })
})
