import type { ComponentType, SVGProps } from 'react'
import {
  CloudIcon,
  CloudArrowUpIcon,
  RocketLaunchIcon,
  KeyIcon,
  CubeIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  ArrowPathRoundedSquareIcon,
  FlagIcon,
  ChartBarIcon,
  SignalIcon,
  BellAlertIcon,
  CircleStackIcon,
  TableCellsIcon,
  ShareIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  ServerStackIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  CommandLineIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

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

// Icons are generic glyphs (not brand logos) used to give each item a tile.
export const TECH_CATEGORIES: TechCategory[] = [
  {
    label: 'Cloud & Platform',
    Icon: CloudIcon,
    items: [
      { name: 'GCP', Icon: CloudIcon },
      { name: 'Azure', Icon: CloudArrowUpIcon },
      { name: 'App Engine', Icon: RocketLaunchIcon },
      { name: 'IAM', Icon: KeyIcon },
    ],
  },
  {
    label: 'Infra & Automation',
    Icon: Cog6ToothIcon,
    items: [
      { name: 'Terraform', Icon: CubeIcon },
      { name: 'Ansible', Icon: Cog6ToothIcon },
      { name: 'Puppet', Icon: WrenchScrewdriverIcon },
      { name: 'Docker', Icon: CubeTransparentIcon },
    ],
  },
  {
    label: 'CI/CD & Delivery',
    Icon: ArrowPathRoundedSquareIcon,
    items: [
      { name: 'GitHub Actions', Icon: ArrowPathRoundedSquareIcon },
      { name: 'LaunchDarkly', Icon: FlagIcon },
    ],
  },
  {
    label: 'Observability',
    Icon: ChartBarIcon,
    items: [
      { name: 'Prometheus', Icon: ChartBarIcon },
      { name: 'OpenTelemetry', Icon: SignalIcon },
      { name: 'PagerDuty', Icon: BellAlertIcon },
    ],
  },
  {
    label: 'Data & AI',
    Icon: CpuChipIcon,
    items: [
      { name: 'Redis', Icon: CircleStackIcon },
      { name: 'pgvector', Icon: TableCellsIcon },
      { name: 'MCP', Icon: ShareIcon },
      { name: 'Amazon Q', Icon: SparklesIcon },
      { name: 'Claude', Icon: ChatBubbleLeftRightIcon },
    ],
  },
  {
    label: 'Languages & Systems',
    Icon: CommandLineIcon,
    items: [
      { name: 'Python', Icon: CodeBracketIcon },
      { name: 'Nginx', Icon: GlobeAltIcon },
      { name: 'RHEL', Icon: ServerStackIcon },
      { name: 'Ubuntu', Icon: ComputerDesktopIcon },
    ],
  },
]

export const SETUP_CATEGORIES: TechCategory[] = [
  {
    label: 'OS & Terminal',
    Icon: ComputerDesktopIcon,
    items: [
      { name: 'Pop! OS', Icon: ComputerDesktopIcon },
      { name: 'Alacritty', Icon: CommandLineIcon },
      { name: 'tmux (custom keybinds)', Icon: Squares2X2Icon },
      { name: 'NeoVIM', Icon: CodeBracketIcon },
    ],
  },
  {
    label: 'AI Assistants',
    Icon: SparklesIcon,
    items: [
      { name: 'Amazon Kiro CLI', Icon: SparklesIcon },
      { name: 'Claude Code', Icon: ChatBubbleLeftRightIcon },
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
