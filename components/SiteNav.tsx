'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
  RectangleStackIcon,
  ServerStackIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import { resumeData } from '../lib/resume-data'
import ThemeToggle from './ThemeToggle'

const NAV_LINKS = [
  { href: '/#resume', label: 'Resume' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#technologies', label: 'Technologies' },
  { href: '/workflows', label: 'Deployment' },
]

const TABS = [
  { href: '/#resume', label: 'Resume', id: 'resume', Icon: DocumentTextIcon },
  { href: '/#projects', label: 'Projects', id: 'projects', Icon: RectangleStackIcon },
  { href: '/#technologies', label: 'Tech', id: 'technologies', Icon: CpuChipIcon },
  { href: '/workflows', label: 'Deployment', id: '', Icon: ServerStackIcon },
]

const RESUME_PDF = '/resume/bruno_marcuche_resume.pdf'
const RESUME_PDF_NAME = 'Bruno Marcuche SRE Resume.pdf'
const NAV_TITLE = 'SRE · AIOPs'

export default function SiteNav() {
  const { name } = resumeData
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  // Brand card reveals once the hero has scrolled up behind the bar.
  useEffect(() => {
    const hero = document.querySelector('.site-hero')
    const update = () => {
      const bottom = hero ? hero.getBoundingClientRect().bottom : 0
      setScrolled(bottom <= 64)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Scroll-spy: highlight the bottom tab for the section currently in view.
  useEffect(() => {
    const ids = ['resume', 'projects', 'technologies']
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="site-nav-inner">
            {/* Left: brand card, fades in once past the hero */}
            <div className="site-nav-left">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`nav-brand flex items-center gap-2.5 ${scrolled ? 'is-visible' : ''}`}
              >
                <Image
                  src="/images/profile.png"
                  alt={name}
                  width={36}
                  height={36}
                  className="nav-brand-img rounded-full h-9 w-9 object-cover"
                />
                <span className="text-left leading-tight">
                  <span className="block text-sm font-semibold text-headline">{name}</span>
                  <span className="block text-[11px] text-body">{NAV_TITLE}</span>
                </span>
              </button>
            </div>

            {/* Center: section links (desktop only) */}
            <div className="site-nav-center hidden md:flex">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-item">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: actions (Download + theme toggle, both breakpoints) */}
            <div className="site-nav-right">
              <a href={RESUME_PDF} download={RESUME_PDF_NAME} className="button-download">
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="bottom-nav md:hidden" aria-label="Sections">
        {TABS.map((tab) => {
          const isActive =
            pathname === '/workflows'
              ? tab.href === '/workflows'
              : tab.id !== '' && active === tab.id
          const Icon = tab.Icon
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`bottom-nav-item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{tab.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
