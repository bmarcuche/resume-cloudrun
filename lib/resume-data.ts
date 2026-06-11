// Single source of truth for all resume content.
// The on-screen resume and the print/PDF output both render from this file,
// so they can never drift. To update the resume, edit this data only.

export interface ContactInfo {
  location: string
  phone: string
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
  tagline: 'Site Reliability Engineer, AIOPs',

  contact: {
    location: 'Boulder, CO 80301',
    phone: '561-284-2441',
    email: 'bmarcuche@gmail.com',
    linkedin: { label: 'linkedin.com/in/bruno-marcuche', url: 'https://www.linkedin.com/in/bruno-marcuche/' },
    website: { label: 'resume.mindtunnel.org', url: 'https://resume.mindtunnel.org/' },
    github: { label: 'github.com/bmarcuche', url: 'https://github.com/bmarcuche/' },
  },

  summary:
    'Site Reliability Engineer and technical leader who builds the systems other teams run on. ' +
    "I've scaled infrastructure across on-prem, hybrid, and cloud, and automated deployment and operations " +
    'for thousands of Linux and Windows instances. Most recently I architected an internal AI agent platform, ' +
    'a custom semantic router orchestrating 16 specialized LLM agents, that has handled 10,000+ ops and ' +
    'engineering tasks and cut change lead time by ~89%. I lead ops and SRE teams, drive observability with ' +
    'OpenTelemetry and PagerDuty, and turn slow, manual operations into fast, repeatable automation. ' +
    'Open to both leadership and senior IC roles.',

  experience: [
    {
      start: '03/2025',
      end: 'present',
      location: 'Berwyn, PA',
      title: 'Operations Team Lead',
      company: 'AssetWorks',
      bullets: [
        'Architected and built an internal AI agent platform on the Model Context Protocol: 16 specialized LLM agents coordinated by a custom semantic router (fine-tuned sentence-transformer embeddings with pgvector knowledge retrieval). It handled 10,000+ routed ops and engineering tasks in its first 12 weeks across deployment, cloud, CI/CD, and incident response.',
        'Cut FA-EAM change lead time by ~89% after launch. Customer upgrades dropped from ~27 days to under 3 days, and provisioning of new environments from ~12 days to ~1.5 days, declining every month after going live (DORA lead time for changes).',
        'Delivered 235 Ansible and CI/CD pipelines built by the agents and automated 213 customer upgrade deployments, eliminating ~426 hours of manual deploy work, across a fleet of 350+ servers serving 150+ government clients at 99.99% uptime.',
        'Designed multi-agent incident workflows that investigate and remediate across the fleet in a single session. They caught a bug that was deleting configuration on 32 servers and identified the root cause of a Windows Update and API regression that would otherwise take hours of manual log correlation.',
        'Lead a team of five; drove an observability rollout (OpenTelemetry and Observe) to reduce MTTR and mentor engineers through 1:1s, training, and knowledge sharing.',
      ],
    },
    {
      start: '12/2022',
      end: '01/2025',
      location: 'Boulder, CO',
      title: 'Backend Developer, Founder',
      company: 'EdventureTrek',
      bullets: [
        'Founded and led development of an educational game focused on outdoor exploration and biodiversity.',
        'Designed custom taxonomy GPTs for plant and animal classification.',
        'Built Python/FastAPI backend with MySQL and event logging.',
        'Managed CI/CD on GCP with GitHub Actions and internal tooling.',
      ],
    },
    {
      start: '07/2022',
      end: '12/2022',
      location: 'Atlanta, GA',
      title: 'Site Reliability Engineering Manager',
      company: 'AnswerRocket',
      bullets: [
        'Led remote SRE team (4 reports); ran weekly syncs and architecture reviews.',
        'Expanded Ansible coverage across AWS, cutting manual deploy time by 15%.',
        'Supported SOC 2 audit by automating cloud environment validation.',
      ],
    },
    {
      start: '03/2016',
      end: '07/2022',
      location: 'Alpharetta, GA',
      title: 'Site Reliability Architect',
      company: 'OfficeSpace Software',
      bullets: [
        'Led SRE hiring, onboarding and 1:1s for a 3-person team.',
        'Built Slackbot enabling teams to deploy customer instances in under 10 minutes.',
        'Reduced deploy times over 60% via CI pipeline (CircleCI, Puppet, Docker, Terraform).',
        'Migrated infrastructure from Rackspace to GCP, saving $60K annually.',
        'Owned production and staging infrastructure on GCP; managed OS patching, config management, release packaging, and automation with Puppet and Python.',
      ],
    },
    {
      start: '2009',
      end: '2016',
      location: 'São Paulo, Brazil',
      title: 'Sr. Technical Consultant / Team Lead',
      company: 'Hewlett Packard',
      bullets: [
        'Delivered Tier 3 support for HP Server Automation; mentored junior engineers.',
        'Automated workflows by developing Python scripts utilizing the HPSA API.',
        'Ranked #1 in team for customer satisfaction.',
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
