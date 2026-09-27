// Strings that must never appear in published copy. See the design spec,
// "Disclosure policy". Matching is case-sensitive on purpose: the terms are
// specific enough that a lower-case "government" or "bastion" in ordinary prose
// would also be a violation.
export const BANNED = [
  '350', '150+', 'government', 'FA-EAM', 'FA/EAM', 'Oracle SID', 'WinRM',
  'Zendesk', 'DigiCert', 'Bastion', 'CAB or Jira', '32 servers', '561-284', 'Open to',
] as const

/** Every string value reachable inside an object or array, depth first. */
export function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap(collectStrings)
  }
  return []
}

export function findViolations(strings: string[]): { text: string; term: string }[] {
  const out: { text: string; term: string }[] = []
  for (const text of strings) {
    for (const term of BANNED) {
      if (text.includes(term)) out.push({ text, term })
    }
  }
  return out
}
