import type { ComponentType } from 'react'
import type { DiagramKey } from '../../lib/systems-data'
import RouterFlow from './RouterFlow'
import GhostWatchFlow from './GhostWatchFlow'
import DiscoveryFlow from './DiscoveryFlow'
import AccessFlow from './AccessFlow'
import HypeScrollFlow from './HypeScrollFlow'

export const DIAGRAMS: Record<DiagramKey, ComponentType> = {
  router: RouterFlow,
  ghostwatch: GhostWatchFlow,
  discovery: DiscoveryFlow,
  access: AccessFlow,
  hypescroll: HypeScrollFlow,
}
