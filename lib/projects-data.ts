// Content for the on-page Projects section (HTML only, not part of the PDF).
// Icons are placeholders rendered as inline SVG; swap `icon` for an image later.

export type ProjectIconKey = 'router' | 'fleet' | 'access'

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  icon: ProjectIconKey
  title: string
  subtitle: string
  role: string
  period?: string
  summary: string
  metrics?: ProjectMetric[]
  highlights: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    id: 'semantic-router',
    icon: 'router',
    title: 'Internal AI Agent Platform',
    subtitle: 'Semantic Router & Gateway',
    role: 'Architect & Developer',
    period: '12/2024 to present',
    summary:
      "A self-hosted multi-agent orchestrator with a custom two-stage semantic router, built as an advanced routing layer on top of Amazon Kiro's multi-agent architecture. It classifies every request in under 100ms and dispatches to the right specialist agent across 19 domain experts.",
    metrics: [
      { value: '<100ms', label: 'to classify & route' },
      { value: '0.81', label: 'top-1 routing accuracy' },
      { value: '19', label: 'specialist agents' },
      { value: '3,400+', label: 'prompts in 12 weeks' },
    ],
    highlights: [
      'An advanced routing layer on top of Amazon Kiro: a pre-classification gateway that intercepts every prompt before the LLM, injecting tier decisions, retrieved knowledge, and entity context, so 95%+ of requests route with no LLM reasoning.',
      'A two-stage neural pipeline: a fine-tuned bi-encoder retrieves candidate patterns from a pgvector store, then a fine-tuned cross-encoder reranks them for the final classification, all on CPU.',
      'A closed-loop learning system captures real routing outcomes and human corrections as gold labels and gates every retrain on holdout accuracy. Fallback to LLM reasoning dropped from 22% to under 5% over 5 retrain iterations.',
      'Routes across 19 specialist domains with 268 scoped tools (ops, infrastructure, pipelines, credentials, databases, monitoring, and more), using a keyword fast-path for deterministic patterns and the neural pipeline for ambiguous queries.',
    ],
    stack: [
      'Python',
      'Rust (candle)',
      'pgvector',
      'PostgreSQL',
      'sentence-transformers',
      'Kiro CLI',
      'MCP',
      'systemd',
      'WinRM',
      'Azure DevOps',
      'Ansible',
    ],
  },
  {
    id: 'hen',
    icon: 'fleet',
    title: 'Hosted Environment Navigator',
    subtitle: 'Fleet system of record (HEN)',
    role: 'Architect & Developer',
    summary:
      'A system of record for a Windows server estate running FA/EAM, with continuous discovery across the fleet.',
    metrics: [
      { value: '20', label: 'blueprints' },
      { value: '224', label: 'routes' },
      { value: '25', label: 'table schema' },
      { value: '245', label: 'tests' },
    ],
    highlights: [
      'WinRM auto-discovery continuously inventories every install (version, config, services, IIS, databases, certificates) into a JSONB Postgres store, surfaced through a searchable dashboard.',
      'Integrates Zendesk, Azure DevOps, GitHub, DigiCert, and Azure Bastion, with Celery workers refreshing fleet state on a rolling schedule.',
      'Secured with bcrypt RBAC, API tokens, CSRF and rate limiting, and audit logging.',
    ],
    stack: [
      'Python 3.9',
      'Flask',
      'Gunicorn',
      'gevent',
      'PostgreSQL (JSONB)',
      'Redis',
      'Celery',
      'WinRM',
      'Ansible',
      'Azure',
    ],
  },
  {
    id: 'ham',
    icon: 'access',
    title: 'Hosted Access Manager',
    subtitle: 'Just-in-time privileged access (HAM)',
    role: 'Architect & Developer',
    summary:
      'A just-in-time, time-boxed service for privileged access to Oracle databases across the fleet.',
    metrics: [
      { value: '0', label: 'permanent credentials' },
      { value: '250+', label: 'sessions' },
      { value: '350+', label: 'Oracle SIDs managed' },
    ],
    highlights: [
      'Requests validated through CAB or Jira unlock accounts and automatically lock again on expiry, with credentials stored in Azure Key Vault and a full audit trail.',
      'Self-service onboarding registers servers automatically after a token check and SSH verification, with a single console to navigate every server and SID.',
      'A scheduler continuously reconciles state, locking expired sessions and orphaned accounts.',
      'Replaced standing credentials and manual DBA grants across the Oracle fleet.',
    ],
    stack: [
      'Python 3.12',
      'FastAPI',
      'PostgreSQL',
      'psycopg2',
      'APScheduler',
      'Paramiko',
      'Azure Key Vault',
      'nginx',
      'systemd',
    ],
  },
]
