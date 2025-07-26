import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import '../styles/icon-fixes.css'

export const metadata: Metadata = {
  title: 'Bruno Marcuche - Site Reliability Engineer | Linux | Cloud',
  description: 'Resume and portfolio of Bruno Marcuche, experienced Site Reliability Engineer specializing in Linux systems, cloud infrastructure, and automation.',
  keywords: 'Site Reliability Engineer, SRE, Linux, Cloud, DevOps, Bruno Marcuche, Infrastructure, Automation',
  authors: [{ name: 'Bruno Marcuche' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche - Site Reliability Engineer | Linux | Cloud',
    description: 'Resume and portfolio of Bruno Marcuche, Site Reliability Engineer',
    url: 'https://mindtunnel.org',
    siteName: 'MindTunnel',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W71716NXX8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W71716NXX8');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
