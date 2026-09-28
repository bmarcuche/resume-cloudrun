import type { ComponentType } from 'react'
import type { DiagramKey } from '../../lib/systems-data'
import RouterFlow from './RouterFlow'
import GhostWatchFlow from './GhostWatchFlow'
import DiscoveryFlow from './DiscoveryFlow'
import AccessFlow from './AccessFlow'
import SentryFlow from './SentryFlow'
import HypeScrollFlow from './HypeScrollFlow'

export const DIAGRAMS: Record<DiagramKey, ComponentType> = {
  router: RouterFlow,
  ghostwatch: GhostWatchFlow,
  discovery: DiscoveryFlow,
  access: AccessFlow,
  sentry: SentryFlow,
  hypescroll: HypeScrollFlow,
}
