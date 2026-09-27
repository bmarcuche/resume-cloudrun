// Site-wide constants shared by the nav, hero, footer and print header.
export const SITE = {
  url: 'https://resume.mindtunnel.org',
  pdfPath: '/resume/bruno_marcuche_resume.pdf',
  pdfName: 'Bruno Marcuche Platform Architect Resume.pdf',
  navCaption: 'platform architect',
  role: 'Platform Architect',
  location: 'Boulder, CO',
  thesis:
    'I design and run the control plane for a multi-tenant hosted platform: an AI agent layer that routes ops work, fleet discovery, just-in-time access, and incident pipelines that find root cause before a customer calls.',
  repo: 'https://github.com/bmarcuche/resume-cloudrun',
} as const
