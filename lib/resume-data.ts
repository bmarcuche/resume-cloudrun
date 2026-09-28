// Single source of truth for all resume content.
// The on-screen resume and the print/PDF output both render from this file,
// so they can never drift. To update the resume, edit this data only.

export interface ContactInfo {
  location: string
  email: string
  linkedin: { label: string; url: string }
  website: { label: string; url: string }
  github: { label: string; url: string }
}

export interface ExperienceItem {
  start: string
  end: string
  location: string
  title: string
  company: string
  bullets: string[]
}

export interface EducationItem {
  start: string
  end: string
  location: string
  degree: string
  school: string
  note?: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface VolunteeringItem {
  start: string
  end: string
  location: string
  role: string
  org: string
  description: string
  link?: string
}

export interface ResumeData {
  name: string
  tagline: string
  contact: ContactInfo
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  strengths: string[]
  skills: SkillCategory[]
  hobbies: string[]
  volunteering: VolunteeringItem[]
}

export const resumeData: ResumeData = {
  name: 'Bruno Marcuche',
  tagline: 'Platform Architect',

  contact: {
    location: 'Boulder, CO 80301',
    email: 'bmarcuche@gmail.com',
    linkedin: { label: 'linkedin.com/in/bruno-marcuche', url: 'https://www.linkedin.com/in/bruno-marcuche/' },
    website: { label: 'resume.mindtunnel.org', url: 'https://resume.mindtunnel.org/' },
    github: { label: 'github.com/bmarcuche', url: 'https://github.com/bmarcuche/' },
  },

  summary:
    'Platform Architect and technical leader who builds the systems other teams run on. ' +
    "I've scaled infrastructure across on-prem, hybrid, and cloud, and automated deployment and operations " +
    'for thousands of Linux and Windows instances. Most recently I architected an internal AI agent platform, ' +
    'a custom semantic router orchestrating specialized LLM agents, that has routed 40,000+ ops requests, ' +
    '83% of them without LLM reasoning. I lead ops and SRE teams, drive observability with ' +
    'OpenTelemetry and PagerDuty, and turn slow, manual operations into fast, repeatable automation.',

  experience: [
    {
      start: '08/2026',
      end: 'present',
      location: 'Boulder, CO',
      title: 'Platform Architect',
      company: 'AssetWorks',
      bullets: [
        'Architect and operate the hosting platform behind a large fleet of managed customer environments, applying AI-driven engineering to fleet operations at scale.',
        'Own platform architecture spanning Windows server fleets, Azure DevOps pipelines, and multi-tenant upgrade orchestration, plus relational schema design and maintenance.',
        'Built Sentry, unified monitoring for hosted databases and web servers: agentless collectors every 2 to 10 minutes, 100M+ samples in its first 34 days, and database health streamed to Azure with zero rejected points.',
        'Led GhostWatch, an AI-assisted incident pipeline started at the Microsoft Global Hackathon 2026: a Rust platform (1,200+ tests) that groups 18 live signal feeds into incidents. Rules proved 4x more accurate than a small LLM at labeling them, so rules lead and the LLM handles the tail.',
        'Maintain the environment inventory as the authoritative source of truth: 99% of its values collected automatically, and every other tool on the platform reads it before acting.',
        'Lead capacity and sizing analysis for executive decisions, and root-cause investigation on production incidents spanning application servers, storage, and reporting services.',
      ],
    },
    {
      start: '03/2025',
      end: '07/2026',
      location: 'Berwyn, PA',
      title: 'Operations Team Lead',
      company: 'AssetWorks',
      bullets: [
        'Built an internal AI agent platform on the Model Context Protocol: specialized LLM agents behind a custom semantic router (fine-tuned sentence-transformer embeddings, pgvector retrieval). 40,000+ routed requests since 03/2026, 83% handled without the LLM reasoning fallback.',
        'Agents write what they learn back to a shared store of 2,000+ knowledge patterns, so the platform improves with use.',
        'Built the Hosted Environment Navigator, the system of record for the hosted environment: 99% of its values collected automatically, behind a 500+ route API with 800+ tests.',
        'Built Hosted Access Manager for just-in-time, auto-expiring database access: 1,100+ time-boxed grants, each justified and audited, and 59% handed back before the timer ran out.',
        'Led a team of five; rolled out OpenTelemetry and Observe; mentored through 1:1s and training.',
      ],
    },
    {
      start: '12/2022',
      end: '01/2025',
      location: 'Boulder, CO',
      title: 'Backend Developer, Founder',
      company: 'EdventureTrek',
      bullets: [
        'Founded an educational exploration game; designed custom taxonomy GPTs for plant and animal classification.',
        'Built the Python/FastAPI backend with MySQL and event logging; ran CI/CD on GCP with GitHub Actions.',
      ],
    },
    {
      start: '07/2022',
      end: '12/2022',
      location: 'Atlanta, GA',
      title: 'Site Reliability Engineering Manager',
      company: 'AnswerRocket',
      bullets: [
        'Led a remote SRE team of four; ran weekly syncs and architecture reviews.',
        'Expanded Ansible coverage across AWS (15% less manual deploy time) and automated SOC 2 environment validation.',
      ],
    },
    {
      start: '03/2016',
      end: '07/2022',
      location: 'Alpharetta, GA',
      title: 'Site Reliability Architect',
      company: 'OfficeSpace Software',
      bullets: [
        'Owned production and staging on GCP: patching, config management, release packaging, and automation with Puppet and Python.',
        'Migrated from Rackspace to GCP, saving $60K annually; cut deploy times over 60% with a CircleCI, Puppet, Docker and Terraform pipeline.',
        'Built a Slackbot that deploys customer instances in under 10 minutes; hired, onboarded and led a three-person SRE team.',
      ],
    },
    {
      start: '2009',
      end: '2016',
      location: 'São Paulo, Brazil',
      title: 'Sr. Technical Consultant / Team Lead',
      company: 'Hewlett Packard',
      bullets: [
        'Tier 3 support for HP Server Automation; automated workflows with Python against the HPSA API.',
        'Mentored junior engineers; ranked #1 in the team for customer satisfaction.',
      ],
    },
  ],

  education: [
    {
      start: '10/2001',
      end: '12/2004',
      location: 'Ft. Lauderdale, Florida',
      degree: "Information Systems | Bachelor's Degree",
      school: 'ITT Technical Institute',
      note: 'Honors Graduate',
    },
  ],

  strengths: ['Leadership', 'AI-Led Ops', 'Cloud Infrastructure', 'Automation'],

  skills: [
    {
      name: 'Cloud & Automation',
      skills: ['GCP', 'Azure Cloud', 'Cloud Run', 'Terraform', 'Ansible', 'Docker'],
    },
    {
      name: 'CI/CD & Delivery',
      skills: ['GitHub Actions', 'Azure DevOps', 'Jenkins'],
    },
    {
      name: 'Observability',
      skills: ['OpenTelemetry', 'Prometheus', 'PagerDuty', 'Observe'],
    },
    {
      name: 'AI & Agents',
      skills: ['LLM Agents', 'Model Context Protocol', 'pgvector', 'Hugging Face', 'Claude'],
    },
    {
      name: 'Development & Data',
      skills: ['Python', 'Redis', 'Postgres'],
    },
    {
      name: 'Systems & Serving',
      skills: ['Linux', 'Nginx'],
    },
  ],


  hobbies: [
    'Exploring AI tooling (LLMs, MCP)',
    'SRE meetups',
    'Home lab experimentation with Docker',
  ],

  volunteering: [
    {
      start: '07/2020',
      end: '11/2024',
      location: 'Boulder, Colorado, USA',
      role: 'Delivery Driver / Wellness Check',
      org: 'Meals on Wheels Boulder',
      description:
        "As a Meals on Wheels delivery driver, I got to enjoy great conversations with some of Boulder's greatest citizens.",
      link: 'https://mowboulder.org',
    },
  ],
}
