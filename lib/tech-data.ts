import type { ComponentType, SVGProps } from 'react'
import {
  CloudIcon,
  CloudArrowUpIcon,
  RocketLaunchIcon,
  KeyIcon,
  Cog6ToothIcon,
  ArrowPathRoundedSquareIcon,
  FlagIcon,
  ChartBarIcon,
  CpuChipIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline'
import {
  siGooglecloud,
  siTerraform,
  siAnsible,
  siPuppet,
  siDocker,
  siGithubactions,
  siPrometheus,
  siOpentelemetry,
  siPagerduty,
  siRedis,
  siPostgresql,
  siModelcontextprotocol,
  siHuggingface,
  siPytorch,
  siClaude,
  siPython,
  siNginx,
  siRedhat,
  siUbuntu,
  siPopos,
  siAlacritty,
  siTmux,
  siNeovim,
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

// Items use real brand marks (simple-icons) where the brand allows it;
// the rest keep generic heroicon glyphs. Category headers stay generic.
export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: 'Cloud & Platform',
    Icon: CloudIcon,
    items: [
      { name: 'GCP', Icon: fromBrand(siGooglecloud) },
      { name: 'Azure', Icon: CloudArrowUpIcon },
      { name: 'App Engine', Icon: RocketLaunchIcon },
      { name: 'IAM', Icon: KeyIcon },
    ],
  },
  {
    label: 'Infra & Automation',
    Icon: Cog6ToothIcon,
    items: [
      { name: 'Terraform', Icon: fromBrand(siTerraform) },
      { name: 'Ansible', Icon: fromBrand(siAnsible) },
      { name: 'Puppet', Icon: fromBrand(siPuppet) },
      { name: 'Docker', Icon: fromBrand(siDocker) },
    ],
  },
  {
    label: 'CI/CD & Delivery',
    Icon: ArrowPathRoundedSquareIcon,
    items: [
      { name: 'GitHub Actions', Icon: fromBrand(siGithubactions) },
      { name: 'LaunchDarkly', Icon: FlagIcon },
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
    label: 'Data & AI',
    Icon: CpuChipIcon,
    items: [
      { name: 'Redis', Icon: fromBrand(siRedis) },
      { name: 'pgvector', Icon: fromBrand(siPostgresql) },
      { name: 'MCP', Icon: fromBrand(siModelcontextprotocol) },
      { name: 'Hugging Face', Icon: fromBrand(siHuggingface) },
      { name: 'PyTorch', Icon: fromBrand(siPytorch) },
      { name: 'Amazon Kiro', Icon: SparklesIcon },
      { name: 'Claude', Icon: fromBrand(siClaude) },
    ],
  },
  {
    label: 'Languages & Systems',
    Icon: CommandLineIcon,
    items: [
      { name: 'Python', Icon: fromBrand(siPython) },
      { name: 'Nginx', Icon: fromBrand(siNginx) },
      { name: 'RHEL', Icon: fromBrand(siRedhat) },
      { name: 'Ubuntu', Icon: fromBrand(siUbuntu) },
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
    ],
  },
]
