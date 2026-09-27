import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test'

// Mock IntersectionObserver used by scroll-reveal components
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
}

// Mock matchMedia used in components
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function matchMedia() {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }
  }
}

// next/font/google fetches font files at build time; stub it for tests
jest.mock('next/font/local', () => () => ({ variable: '--font-local', className: 'font-local' }))

// jsdom ships no fetch. Default to a rejecting stub so client components take
// their offline fallback; individual tests spy on global.fetch to override.
if (typeof global.fetch === 'undefined') {
  global.fetch = () => Promise.reject(new Error('fetch is not available in tests'))
}
