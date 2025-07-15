import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bruno Marcuche - Site Reliability Engineer | Linux | Cloud',
  description: 'Resume and portfolio of Bruno Marcuche, experienced Site Reliability Engineer specializing in Linux systems, cloud infrastructure, and automation.',
  keywords: 'Site Reliability Engineer, SRE, Linux, Cloud, DevOps, Bruno Marcuche, Infrastructure, Automation',
  authors: [{ name: 'Bruno Marcuche' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche - Site Reliability Engineer | Linux | Cloud',
    description: 'Resume and portfolio of Bruno Marcuche, Site Reliability Engineer',
    url: 'https://mindtunnel.org',
    siteName: 'MindTunnel',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
