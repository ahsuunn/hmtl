import config from '@payload-config'
import { getPayload as _getPayload } from 'payload'
import { cache } from 'react'

/**
 * Memoised per-request Payload instance using React `cache`.
 * This ensures we reuse the same Payload instance within a single
 * Next.js server render pass (RSC / Server Action).
 */
export const getPayload = cache(() => _getPayload({ config }))

