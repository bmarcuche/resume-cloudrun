import { fetchWorkflowRuns } from './workflow-runs'

const ok = (body: unknown) => ({ ok: true, status: 200, json: async () => body }) as Response

describe('fetchWorkflowRuns', () => {
  afterEach(() => jest.restoreAllMocks())

  it('shares one request between concurrent callers', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue(ok({ source: 'github' }))
    const [a, b] = await Promise.all([fetchWorkflowRuns(), fetchWorkflowRuns()])
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(a).toEqual({ source: 'github' })
    expect(b).toBe(a)
  })

  it('fetches again once the previous request settled, including after a failure', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({ ok: false, status: 503 } as Response)
      .mockResolvedValueOnce(ok({ source: 'github' }))
    await expect(fetchWorkflowRuns()).rejects.toThrow('503')
    await expect(fetchWorkflowRuns()).resolves.toEqual({ source: 'github' })
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
