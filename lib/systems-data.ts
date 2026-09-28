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
  siCloudflare,
  siFastify,
  siGooglecloud,
  siOnnx,
  siSvelte,
  siTypescript,
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

export type DiagramKey = 'router' | 'ghostwatch' | 'discovery' | 'access' | 'hypescroll'
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
  link?: { href: string; label: string }
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
const TypeScript = fromBrand(siTypescript)
const Svelte = fromBrand(siSvelte)
const Fastify = fromBrand(siFastify)
const Onnx = fromBrand(siOnnx)
const Cloudflare = fromBrand(siCloudflare)
const GoogleCloud = fromBrand(siGooglecloud)

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

// Built outside work, so it sits in its own section rather than under "Systems I own".
// Publish the product and the engineering, never the host, ports or tooling details.
export const projects: System[] = [
  {
    id: 'hypescroll',
    title: 'HypeScroll',
    subtitle: 'A positive-news reel that filters out doom with small local models',
    link: { href: 'https://hypescroll.io', label: 'hypescroll.io' },
    status: [
      { label: 'Live', tone: 'ok' },
      { label: 'Side project', tone: 'info' },
    ],
    description:
      'One mobile-first feed of uplifting stories, books, recipes and podcasts. It pulls from RSS feeds, scrapers, Reddit and small independent sites it discovers on its own, scores every story at import, and links back to the source instead of copying it.',
    outcomes: [
      'Every story is scored at import by a local MiniLM embedding model with small trained layers for interest, constructiveness and negativity. No LLM sits in the serving path.',
      'A retrained negativity model only goes live if its block rate on a fixed reference set rises by one point or less.',
      'I review the discovery queue with Claude Code through a custom MCP server; approved labels feed the next retrain.',
      'CI tests every service, deploys only what changed, and fails the run unless a live login succeeds afterwards.',
    ],
    stack: [
      t('TypeScript', TypeScript),
      t('Svelte', Svelte),
      t('Fastify', Fastify),
      t('PostgreSQL', Postgres),
      t('MiniLM on ONNX', Onnx),
      t('MCP', MCP),
      t('Cloudflare', Cloudflare),
      t('Google Cloud', GoogleCloud),
    ],
    metrics: [
      { value: '0', label: 'LLM calls in the feed path' },
      { value: 'int8', label: 'embeddings on CPU' },
      { value: '≤1 pt', label: 'block-rate rise to ship a model' },
    ],
    diagram: 'hypescroll',
  },
]
