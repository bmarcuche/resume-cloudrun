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
      'A self-hosted LLM orchestrator with a custom semantic router that runs in two stages, classifying every request and dispatching it to the right specialist agent.',
    metrics: [
      { value: '~0.80', label: 'top-1 routing accuracy' },
      { value: '0.83', label: 'retrieval MRR' },
      { value: '5,400+', label: 'prompts classified' },
      { value: '2,800+', label: 'routed in 12 weeks' },
    ],
    highlights: [
      'A fine-tuned bi-encoder retrieves candidate patterns from a pgvector store, then a cross-encoder reranks them to classify each request.',
      'Classified requests route to specialist agents that execute domain work over MCP, with per-agent tool scoping across roughly 200 tools.',
      'A learning loop captures real routing outcomes and gates any retrain on accuracy held out and verified against those outcomes.',
      'The routing engine is also ported to Rust (candle, in-process embeddings) as a standalone TUI.',
    ],
    stack: [
      'Python',
      'sentence-transformers',
      'PyTorch',
      'PostgreSQL',
      'pgvector',
      'MCP',
      'Redis',
      'Ansible',
      'Azure',
      'Rust',
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
      { value: '0', label: 'standing credentials' },
      { value: 'JIT', label: 'time-boxed access' },
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
