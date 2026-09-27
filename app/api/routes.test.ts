/** @jest-environment node */
import { GET as health } from './health/route'
import { GET as ready } from './ready/route'

describe('health endpoints', () => {
  it('health reports healthy with no-cache headers', async () => {
    const res = await health()
    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toContain('no-store')
    expect((await res.json()).status).toBe('healthy')
  })
  it('ready reports ready', async () => {
    const res = await ready()
    expect(res.status).toBe(200)
    expect((await res.json()).status).toBe('ready')
  })
})
