// Content for the Systems section. HTML only, not part of the PDF.
// Every stack item carries an icon: a simple-icons brand mark where one exists,
// a heroicons outline glyph otherwise. Copy must stay clean under lib/disclosure.ts.
import {
  CircleStackIcon,
  ClockIcon,
  CloudIcon,
  EyeIcon,
  LockClosedIcon,
  SparklesIcon,
  ArrowPathRoundedSquareIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'
import {
  siAnsible,
  siCelery,
  siFastapi,
  siFlask,
  siHuggingface,
  siModelcontextprotocol,
  siNginx,
  siPostgresql,
  siPython,
  siRedis,
  siRust,
} from 'simple-icons'
import { fromBrand } from '../components/icons/BrandIcon'
import type { TechItem } from './tech-data'

export type DiagramKey = 'router' | 'ghostwatch' | 'discovery' | 'access'
export interface SystemStatus {
  label: string
  tone: 'ok' | 'warn' | 'info'
}
export interface SystemMetric {
  value: string
  label: string
}
export interface System {
  id: string
  title: string
  subtitle: string
  status: SystemStatus[]
  description: string
  outcomes: string[]
  stack: TechItem[]
  metrics: SystemMetric[]
  diagram: DiagramKey
}

const t = (name: string, Icon: TechItem['Icon']): TechItem => ({ name, Icon })
const Python = fromBrand(siPython)
const Rust = fromBrand(siRust)
const Postgres = fromBrand(siPostgresql)
const HF = fromBrand(siHuggingface)
const MCP = fromBrand(siModelcontextprotocol)
const Ansible = fromBrand(siAnsible)
const Flask = fromBrand(siFlask)
const Celery = fromBrand(siCelery)
const Redis = fromBrand(siRedis)
const FastAPI = fromBrand(siFastapi)
const Nginx = fromBrand(siNginx)

export const systems: System[] = [
  {
    id: 'agent-platform',
    title: 'Internal AI agent platform',
    subtitle: 'Semantic router and MCP gateway in front of a fleet of specialist agents',
    status: [
      { label: 'In production', tone: 'ok' },
      { label: 'Since 12/2024', tone: 'info' },
    ],
    description:
      'Every prompt hits a two-stage classifier before any LLM sees it. Deterministic patterns take a keyword fast path. Ambiguous ones go through a fine-tuned bi-encoder and cross-encoder over a pgvector store, then land on the right agent with retrieved knowledge and environment context already attached.',
    outcomes: [
      '95%+ of requests route with no LLM reasoning; classification in under 100 ms on CPU.',
      'Closed-loop retraining from routing outcomes and human corrections cut LLM fallback from 22% to under 5% in five iterations.',
      'Agents built 235 Ansible and CI/CD pipelines and ran 213 upgrades, removing about 426 hours of manual deploy work.',
    ],
    stack: [
      t('Python', Python),
      t('Rust (candle)', Rust),
      t('pgvector', CircleStackIcon),
      t('sentence-transformers', HF),
      t('MCP', MCP),
      t('Kiro CLI', SparklesIcon),
      t('Ansible', Ansible),
      t('Azure DevOps', ArrowPathRoundedSquareIcon),
    ],
    metrics: [
      { value: '0.81', label: 'top-1 routing accuracy' },
      { value: '<5%', label: 'LLM fallback, from 22%' },
    ],
    diagram: 'router',
  },
  {
    id: 'ghostwatch',
    title: 'GhostWatch',
    subtitle: 'AI-assisted incident investigation pipeline',
    status: [
      { label: 'Detection live', tone: 'ok' },
      { label: 'Self-healing in pilot', tone: 'warn' },
    ],
    description:
      'Nine in ten service interruptions we studied warned us first, usually as a backlog signal before the outage. GhostWatch turns that warning into an investigation instead of a page. Started at the Microsoft Global Hackathon 2026 with a cross-company team.',
    outcomes: [
      'A classifier spots the signal and opens one investigation, not a flood of alerts.',
      'An LLM on Microsoft Foundry classifies the case and orders the telemetry it needs. Exporters and detectors are generated on demand into App Insights and Azure Data Explorer.',
      'The Azure SRE Agent takes the case and goes after root cause. Investigation handoff is in progress.',
    ],
    stack: [
      t('Microsoft Foundry', SparklesIcon),
      t('Azure SRE Agent', EyeIcon),
      t('App Insights', EyeIcon),
      t('Azure Data Explorer', CircleStackIcon),
      t('Python', Python),
    ],
    metrics: [
      { value: '9 of 10', label: 'outages warned first' },
      { value: '1', label: 'investigation per signal' },
    ],
    diagram: 'ghostwatch',
  },
  {
    id: 'hen',
    title: 'Hosted Environment Navigator',
    subtitle: 'System of record for the hosted environment',
    status: [{ label: 'In production', tone: 'ok' }],
    description:
      'Continuous discovery inventories every install: version, config, services, databases and certificates, into a JSONB Postgres store behind a searchable dashboard. It is the context the agent platform reads before it acts.',
    outcomes: [
      'Integrates ticketing, source control, certificate and bastion services, with Celery workers refreshing state on a rolling schedule.',
      'bcrypt RBAC, API tokens, CSRF and rate limiting, audit logging.',
    ],
    stack: [
      t('Flask', Flask),
      t('PostgreSQL JSONB', Postgres),
      t('Celery', Celery),
      t('Redis', Redis),
      t('Ansible', Ansible),
      t('Azure', CloudIcon),
    ],
    metrics: [
      { value: '20', label: 'blueprints' },
      { value: '224', label: 'routes' },
      { value: '245', label: 'tests' },
    ],
    diagram: 'discovery',
  },
  {
    id: 'ham',
    title: 'Hosted Access Manager',
    subtitle: 'Just-in-time, time-boxed privileged database access',
    status: [{ label: 'In production', tone: 'ok' }],
    description:
      'An approved change request unlocks an account for a window and locks it again on expiry. Credentials live in a managed vault. A scheduler reconciles state continuously, locking expired sessions and orphaned accounts.',
    outcomes: [
      'Replaced standing credentials and manual DBA grants across the whole database estate.',
      'Self-service onboarding registers servers after identity and host verification.',
    ],
    stack: [
      t('FastAPI', FastAPI),
      t('PostgreSQL', Postgres),
      t('APScheduler', ClockIcon),
      t('Azure Key Vault', LockClosedIcon),
      t('nginx', Nginx),
      t('systemd', ServerStackIcon),
    ],
    metrics: [
      { value: '0', label: 'permanent credentials' },
      { value: '250+', label: 'sessions' },
      { value: '100%', label: 'of the database estate' },
    ],
    diagram: 'access',
  },
]
