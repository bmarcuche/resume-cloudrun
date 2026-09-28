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
  siOpentelemetry,
  siSvelte,
  siTypescript,
  siCelery,
  siClaude,
  siFastapi,
  siFlask,
  siHuggingface,
  siModelcontextprotocol,
  siNginx,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siRust,
} from 'simple-icons'
import { fromBrand } from '../components/icons/BrandIcon'
import type { TechItem } from './tech-data'

export type DiagramKey = 'router' | 'ghostwatch' | 'sentry' | 'discovery' | 'access' | 'hypescroll'
export interface SystemStatus {
  label: string
  tone: 'ok' | 'warn' | 'info'
}
export interface SystemMetric {
  value: string
  label: string
}
// One "what changed" card: `from` sets the scene, value and unit are the effect,
// `note` is the cause in one short sentence. `bar` draws before and after to scale.
export interface ImpactItem {
  from: string
  value: string
  unit: string
  note: string
  bar?: { before: number; after: number; max: number }
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
  impact?: { lede: string; items: ImpactItem[] }
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
const Claude = fromBrand(siClaude)
const OTel = fromBrand(siOpentelemetry)
const ReactIcon = fromBrand(siReact)

// Figures are measured from the systems themselves; anything unverified stays off
// the site until confirmed.
// Publish outcomes and rates only: no fleet or customer counts, product names,
// database vendor or protocols.
export const systems: System[] = [
  {
    id: 'agent-platform',
    title: 'Internal AI agent platform',
    subtitle: 'Semantic router and MCP gateway in front of a fleet of specialist agents',
    status: [
      { label: 'In production', tone: 'ok' },
      { label: 'Since 03/2026', tone: 'info' },
    ],
    description:
      'Every request hits a classifier before any LLM sees it. Deterministic patterns take a keyword fast path. Ambiguous ones go through a fine-tuned bi-encoder and cross-encoder over pgvector, then land on the right specialist agent with retrieved knowledge and environment context already attached.',
    outcomes: [
      'Specialist agents cover deploys, cloud, CI/CD, access, databases, monitoring and incidents, and write what they learn back to a shared knowledge store.',
      'One MCP gateway fronts the cloud, CI/CD, secrets, ticketing, monitoring and fleet operations tools the agents use.',
    ],
    stack: [
      t('Python', Python),
      t('Rust (candle)', Rust),
      t('pgvector', CircleStackIcon),
      t('sentence-transformers', HF),
      t('MCP', MCP),
      t('Claude Code', Claude),
      t('Kiro CLI', SparklesIcon),
      t('Ansible', Ansible),
      t('Azure DevOps', ArrowPathRoundedSquareIcon),
    ],
    metrics: [
      { value: '40k+', label: 'requests routed since 03/2026' },
      { value: '83%', label: 'no LLM reasoning, last 30 days' },
      { value: '2,000+', label: 'knowledge patterns in pgvector' },
    ],
    diagram: 'router',
    impact: {
      lede: 'Upgrade tickets before and after agent-built pipelines went live in 02/2026. Lead time is request to done, so it includes waiting on the customer; bars are to scale.',
      items: [
        {
          from: 'upgrade, request to done, was 40 days',
          value: '11',
          unit: 'days median',
          note: 'Across 352 upgrades. It was already falling before the pipelines; since May it is 9 days.',
          bar: { before: 40.4, after: 11.3, max: 40.4 },
        },
        {
          from: 'upgrades, were run by hand',
          value: '380+',
          unit: 'automated runs',
          note: 'Agent-built pipelines now run them, about 20 minutes of machine time each.',
        },
      ],
    },
  },
  {
    id: 'ghostwatch',
    title: 'GhostWatch',
    subtitle: 'An incident pipeline that notices, correlates and packages an outage before anyone pages',
    status: [
      { label: 'Receiver live', tone: 'ok' },
      { label: 'SRE hand-off built, gated off', tone: 'warn' },
    ],
    description:
      'Started at the Microsoft Global Hackathon 2026 with a cross-company team, now a four-stage Rust platform. A receiver matches every signal to its server and database. A Foreman groups related signals into one labeled incident. A factory deploys the telemetry the case needs, and the Azure SRE Agent investigates the packaged case.',
    outcomes: [
      'Rules labeled incidents correctly 70% of the time against 17% for a small LLM, so rules lead and the LLM only handles the unknown tail.',
      'Signals inside planned outages are marked, never silently dropped.',
      'Built test-first against a formal correctness bar: provenance, conservation, closure, idempotence and determinism.',
    ],
    stack: [
      t('Rust', Rust),
      t('TypeScript', TypeScript),
      t('Svelte', Svelte),
      t('PostgreSQL', Postgres),
      t('Microsoft Foundry', SparklesIcon),
      t('Azure SRE Agent', EyeIcon),
      t('App Insights', EyeIcon),
      t('Azure Data Explorer', CircleStackIcon),
      t('OpenTelemetry', OTel),
    ],
    metrics: [
      { value: '18', label: 'live signal feeds' },
      { value: '15', label: 'Rust crates' },
      { value: '1,200+', label: 'Rust tests' },
    ],
    diagram: 'ghostwatch',
    impact: {
      lede: 'Before GhostWatch, a report-server hang was found when it happened. Measured by replaying past hangs.',
      items: [
        {
          from: 'report-server hangs, was no warning',
          value: '17 of 21',
          unit: 'warned first',
          note: 'Median warning 75 minutes ahead, on past hangs the detector never saw in setup.',
        },
      ],
    },
  },
  {
    id: 'sentry',
    title: 'Sentry',
    subtitle: 'Unified monitoring for hosted databases, web servers and service interruptions',
    status: [
      { label: 'In production', tone: 'ok' },
      { label: 'Since 08/2026', tone: 'info' },
    ],
    description:
      'One console for database health, live web server status and service interruption analysis. Collectors check every database every 2 to 10 minutes. Raw 5-minute data is kept for 14 days and hourly rollups forever.',
    outcomes: [
      '46 database metrics, 8 host metrics and a health snapshot per database: backups, archiving, listeners, replication, recovery area and blocking sessions.',
      'A nightly scan of report servers counts crashes and manual restarts and separates unexpected reboots from planned ones.',
    ],
    stack: [
      t('Python', Python),
      t('Flask', Flask),
      t('Celery', Celery),
      t('PostgreSQL', Postgres),
      t('React', ReactIcon),
      t('OpenTelemetry', OTel),
      t('Azure Monitor', EyeIcon),
      t('Azure Data Explorer', CircleStackIcon),
    ],
    metrics: [
      { value: '100M+', label: 'samples in its first 34 days' },
      { value: '3M+', label: 'samples a day' },
      { value: '49', label: 'health fields per database' },
    ],
    diagram: 'sentry',
  },
  {
    id: 'hen',
    title: 'Hosted Environment Navigator',
    subtitle: 'System of record for the hosted environment',
    status: [
      { label: 'In production', tone: 'ok' },
      { label: 'Since 11/2025', tone: 'info' },
    ],
    description:
      'Continuous discovery inventories every install: version, config, services, databases and certificates, into a JSONB Postgres store behind a searchable dashboard.',
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
      { value: '99%', label: 'of values collected automatically' },
      { value: '500+', label: 'API routes' },
      { value: '800+', label: 'tests' },
    ],
    diagram: 'discovery',
  },
  {
    id: 'ham',
    title: 'Hosted Access Manager',
    subtitle: 'Just-in-time, time-boxed privileged database access',
    status: [
      { label: 'In production', tone: 'ok' },
      { label: 'Since 04/2026', tone: 'info' },
    ],
    description:
      'Engineers request access to a production or test database for a set time. The account unlocks, relocks when the timer ends, and every action is recorded. Credentials live in a managed vault.',
    outcomes: [
      'Every request carries a written justification, and every SQL statement run from the UI is logged.',
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
      { value: '1,100+', label: 'time-boxed grants' },
      { value: '500+', label: 'written justifications' },
      { value: '2,500+', label: 'audit records' },
    ],
    diagram: 'access',
    impact: {
      lede: 'Before the access manager, getting into a database meant a DBA ticket. Measured from past DBA tickets and the audit log.',
      items: [
        {
          from: 'database access, was a DBA ticket (~1 day)',
          value: '78',
          unit: 's median',
          note: 'Self-service grants replace the ticket, with no DBA involved; 90% connect within 17 minutes.',
        },
      ],
    },
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
