import { siGithub } from 'simple-icons'
import { resumeData } from '../../lib/resume-data'
import { SITE } from '../../lib/site'
import { fromBrand, LinkedInIcon } from '../icons/BrandIcon'
import PlatformMap from '../diagrams/PlatformMap'

const GitHubIcon = fromBrand(siGithub)

// The `site-hero` class stays on the header: SiteNav measures it to decide when
// the brand card appears in the sticky bar.
export default function Hero() {
  const { name, contact } = resumeData
  const stamp = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  return (
    <header className="hero-pa site-hero" id="top">
      <div className="pa-wrap">
        <div>
          <h1 className="hero-name">{name}</h1>
          <p className="hero-role">{SITE.role}</p>
          <p className="hero-thesis">
            {SITE.thesis} <span>{SITE.location}.</span>
          </p>
          <div className="hero-cta">
            <a className="pa-btn pa-btn-primary" href="#systems">
              See the systems
            </a>
            <a className="pa-btn" href={contact.linkedin.url} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a className="pa-btn" href={contact.github.url} target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>
          <div className="hero-contact pa-mono">
            <span>{contact.email}</span>
            <span>{contact.website.label}</span>
          </div>
        </div>
        <div>
          <PlatformMap />
          <p className="hero-map-cap pa-mono">platform map, {stamp}</p>
        </div>
      </div>
    </header>
  )
}
