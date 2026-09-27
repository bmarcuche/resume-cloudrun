import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import localFont from 'next/font/local'
import './globals.css'

// Fonts are vendored under app/fonts so the build never reaches Google Fonts
// (the CI runner cannot). Latin subsets from Google Fonts, OFL licensed.
const display = localFont({
  src: [{ path: './fonts/Archivo-Variable.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-display',
  display: 'swap',
})
const body = localFont({
  src: [
    { path: './fonts/IBMPlexSans-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
})
const mono = localFont({
  src: [
    { path: './fonts/IBMPlexMono-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexMono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
})

const DESCRIPTION =
  'Platform Architect. Designs and runs the control plane for a multi-tenant hosted platform: an AI agent layer that routes ops work, fleet discovery, just-in-time access, and incident pipelines.'

export const metadata: Metadata = {
  title: 'Bruno Marcuche, Platform Architect',
  description: DESCRIPTION,
  keywords:
    'Platform Architect, Platform Engineering, SRE, AI agents, LLM, Model Context Protocol, MCP, DevOps, Cloud, Azure, GCP, Linux, Automation, Observability, Bruno Marcuche',
  authors: [{ name: 'Bruno Marcuche' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche, Platform Architect',
    description: DESCRIPTION,
    url: 'https://resume.mindtunnel.org',
    siteName: 'MindTunnel',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        {/* Apply the saved theme before first paint to avoid a light->dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var u=document.cookie.indexOf('winner_unlock=')!==-1;var theme=(t==='winner'&&u)?'winner':(t==='dark'?'dark':'light');document.documentElement.setAttribute('data-theme',theme)}catch(e){}})();",
          }}
        />
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
      <body className="antialiased">{children}</body>
    </html>
  )
}
