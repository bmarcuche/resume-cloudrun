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
    'a custom semantic router orchestrating specialized LLM agents, that has handled 10,000+ ops and ' +
    'engineering tasks and cut change lead time by ~89%. I lead ops and SRE teams, drive observability with ' +
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
        'Built and run production agentic automation: a Python orchestration layer driving Claude with bi-encoder/cross-encoder retrieval over pgvector, feeding live operational systems.',
        'Design and build the internal tooling the hosting org runs on: fleet-wide database monitoring, upgrade scheduling with ticketing and calendar integration, and cross-system customer reconciliation.',
        'Maintain the environment inventory as the authoritative source of truth, with automated discovery and configuration-drift detection across the fleet.',
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
        'Built an internal AI agent platform on the Model Context Protocol: specialized LLM agents behind a custom semantic router (fine-tuned sentence-transformer embeddings, pgvector retrieval). 10,000+ routed ops and engineering tasks in its first 12 weeks.',
        'Cut change lead time ~89% (DORA): customer upgrades from ~27 days to under 3, new environments from ~12 days to ~1.5.',
        'Delivered 235 agent-built Ansible and CI/CD pipelines and automated 213 upgrade deployments, removing ~426 hours of manual deploy work at 99.99% platform uptime.',
        'Designed multi-agent incident workflows that caught a fleet-wide config-deletion bug and root-caused an OS update and API regression in a single session.',
        'Led a team of five; rolled out OpenTelemetry and Observe to cut MTTR; mentored through 1:1s and training.',
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
