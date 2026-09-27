import { practice } from './practice-data'

it('has four scale-neutral principles', () => {
  expect(practice).toHaveLength(4)
  for (const p of practice) {
    expect(p.body).not.toMatch(/five|team of \d/i)
  }
  expect(practice[3].body).toMatch(/at any team size/)
})
