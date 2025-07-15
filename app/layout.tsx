import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bruno Marcuche - DevOps Engineer & Cloud Architect',
  description: 'Professional resume and portfolio of Bruno Marcuche, experienced DevOps Engineer and Cloud Architect specializing in GCP, automation, and modern infrastructure.',
  keywords: 'DevOps, Cloud Architecture, GCP, Terraform, Ansible, Bruno Marcuche',
  authors: [{ name: 'Bruno Marcuche' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche - DevOps Engineer & Cloud Architect',
    description: 'Professional resume and portfolio of Bruno Marcuche',
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
