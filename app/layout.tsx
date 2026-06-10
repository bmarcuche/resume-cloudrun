import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bruno Marcuche · SRE and AIOPs',
  description: 'Resume of Bruno Marcuche, Site Reliability Engineer and technical leader focused on AIOPs. Architected an internal AI agent platform handling 10,000+ ops tasks and cutting change lead time by ~89%.',
  keywords: 'Site Reliability Engineer, SRE, AI agents, LLM, Model Context Protocol, MCP, DevOps, Cloud, Linux, Automation, Observability, Bruno Marcuche',
  authors: [{ name: 'Bruno Marcuche' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Bruno Marcuche · SRE and AIOPs',
    description: 'SRE and technical leader focused on AIOPs. Architected an internal agent platform handling 10,000+ ops tasks and cutting change lead time by ~89%.',
    url: 'https://resume.mindtunnel.org',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint to avoid a light->dark flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var u=document.cookie.indexOf('winner_unlock=')!==-1;var theme=(t==='winner'&&u)?'winner':(t==='dark'?'dark':'light');document.documentElement.setAttribute('data-theme',theme)}catch(e){}})();",
          }}
        />
        {/* Reveal-on-scroll fallback when JavaScript is disabled */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
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
