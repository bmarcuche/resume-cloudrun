import type { ComponentType, SVGProps } from 'react'
import {
  CloudIcon,
  CloudArrowUpIcon,
  RocketLaunchIcon,
  BoltIcon,
  Cog6ToothIcon,
  ArrowPathRoundedSquareIcon,
  ChartBarIcon,
  CpuChipIcon,
  CircleStackIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  CommandLineIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline'
import {
  siGooglecloud,
  siTerraform,
  siAnsible,
  siPuppet,
  siDocker,
  siGithubactions,
  siGit,
  siGithub,
  siPrometheus,
  siOpentelemetry,
  siPagerduty,
  siRedis,
  siPostgresql,
  siModelcontextprotocol,
  siHuggingface,
  siClaude,
  siPython,
  siNginx,
  siRedhat,
  siUbuntu,
  siPopos,
  siAlacritty,
  siTmux,
  siNeovim,
  siZsh,
} from 'simple-icons'
import { fromBrand } from '../components/icons/BrandIcon'

type Icon = ComponentType<SVGProps<SVGSVGElement>>

export interface TechItem {
  name: string
  Icon: Icon
}

export interface TechCategory {
  label: string
  Icon: Icon
  items: TechItem[]
}

// Items use real brand marks (simple-icons) where the brand allows it; the rest
// keep generic heroicon glyphs. Categories are kept coherent and each holds 3+ items
// so the mobile tile game has fair, inferable groups (no tiny giveaway categories).
export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: 'Cloud Platforms',
    Icon: CloudIcon,
    items: [
      { name: 'GCP', Icon: fromBrand(siGooglecloud) },
      { name: 'Azure Cloud', Icon: CloudArrowUpIcon },
      { name: 'Cloud Run', Icon: BoltIcon },
      { name: 'App Engine', Icon: RocketLaunchIcon },
    ],
  },
  {
    label: 'Infra & Config',
    Icon: Cog6ToothIcon,
    items: [
      { name: 'Terraform', Icon: fromBrand(siTerraform) },
      { name: 'Ansible', Icon: fromBrand(siAnsible) },
      { name: 'Puppet', Icon: fromBrand(siPuppet) },
    ],
  },
  {
    label: 'CI/CD & Containers',
    Icon: ArrowPathRoundedSquareIcon,
    items: [
      { name: 'GitHub Actions', Icon: fromBrand(siGithubactions) },
      { name: 'Azure DevOps', Icon: ArrowPathRoundedSquareIcon },
      { name: 'Docker', Icon: fromBrand(siDocker) },
    ],
  },
  {
    label: 'Observability',
    Icon: ChartBarIcon,
    items: [
      { name: 'Prometheus', Icon: fromBrand(siPrometheus) },
      { name: 'OpenTelemetry', Icon: fromBrand(siOpentelemetry) },
      { name: 'PagerDuty', Icon: fromBrand(siPagerduty) },
    ],
  },
  {
    label: 'AI & Agents',
    Icon: CpuChipIcon,
    items: [
      { name: 'MCP', Icon: fromBrand(siModelcontextprotocol) },
      { name: 'Hugging Face', Icon: fromBrand(siHuggingface) },
      { name: 'pgvector', Icon: CircleStackIcon },
      { name: 'Claude', Icon: fromBrand(siClaude) },
      { name: 'Amazon Kiro', Icon: SparklesIcon },
    ],
  },
  {
    label: 'Development & Data',
    Icon: CommandLineIcon,
    items: [
      { name: 'Python', Icon: fromBrand(siPython) },
      { name: 'Redis', Icon: fromBrand(siRedis) },
      { name: 'Postgres', Icon: fromBrand(siPostgresql) },
    ],
  },
  {
    label: 'Systems & Serving',
    Icon: ServerStackIcon,
    items: [
      { name: 'RHEL', Icon: fromBrand(siRedhat) },
      { name: 'Ubuntu', Icon: fromBrand(siUbuntu) },
      { name: 'Nginx', Icon: fromBrand(siNginx) },
    ],
  },
]

export const SETUP_CATEGORIES: TechCategory[] = [
  {
    label: 'OS & Terminal',
    Icon: ComputerDesktopIcon,
    items: [
      { name: 'Pop! OS', Icon: fromBrand(siPopos) },
      { name: 'Alacritty', Icon: fromBrand(siAlacritty) },
      { name: 'tmux (custom keybinds)', Icon: fromBrand(siTmux) },
      { name: 'NeoVIM', Icon: fromBrand(siNeovim) },
      { name: 'Git', Icon: fromBrand(siGit) },
      { name: 'Zsh', Icon: fromBrand(siZsh) },
    ],
  },
  {
    label: 'AI Assistants',
    Icon: SparklesIcon,
    items: [
      { name: 'Amazon Kiro CLI', Icon: SparklesIcon },
      { name: 'Claude Code', Icon: fromBrand(siClaude) },
    ],
  },
  {
    label: 'Cloud & DevOps',
    Icon: CloudIcon,
    items: [
      { name: 'Azure DevOps', Icon: ArrowPathRoundedSquareIcon },
      { name: 'Azure CLI', Icon: CloudArrowUpIcon },
      { name: 'gcloud CLI', Icon: fromBrand(siGooglecloud) },
      { name: 'GitHub CLI', Icon: fromBrand(siGithub) },
    ],
  },
]
