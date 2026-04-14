// Inlined from @tradetool/types — kept in sync with packages/types/src/billing-catalog.ts

export type BillingPlanId = 'free' | 'starter' | 'growth' | 'scale' | 'enterprise'

export type BillingPlanInterval = 'month'

export const UNLIMITED_BILLING_LIMIT = 2_147_483_647

export interface BillingPlanCatalogEntry {
  id: BillingPlanId
  name: string
  description: string
  price: number
  monthlyPriceCents: number
  currency: string
  interval: BillingPlanInterval
  activeSkuLimit: number
  storageLimitGb: number
  deliveryBandwidthLimitGb: number
  internalUserLimit: number
  partnerInviteLimit: number
  deeplTotalCharLimit: number
  maxUploadBytes: number
  showMaxUploadInMarketing: boolean
  publicShareLinksEnabled: boolean
  features: string[]
  popular?: boolean
}

const PAID_PLATFORM_MAX_UPLOAD_BYTES = 1024 * 1024 * 1024
const FREE_MAX_UPLOAD_BYTES = 50 * 1024 * 1024

export const BILLING_PLAN_CATALOG: BillingPlanCatalogEntry[] = [
  {
    id: 'free',
    name: 'Free (Sandbox)',
    description: 'Ideal for product discovery',
    price: 0,
    monthlyPriceCents: 0,
    currency: 'USD',
    interval: 'month',
    activeSkuLimit: 10,
    storageLimitGb: 2,
    deliveryBandwidthLimitGb: 4,
    internalUserLimit: 1,
    partnerInviteLimit: 2,
    deeplTotalCharLimit: 0,
    maxUploadBytes: FREE_MAX_UPLOAD_BYTES,
    showMaxUploadInMarketing: true,
    publicShareLinksEnabled: false,
    features: [
      '10 active SKUs',
      '2 GB storage',
      '4 GB monthly delivery bandwidth',
      '1 internal user',
      '2 external partner invites',
      'DeepL usage not included',
      'Max file upload size: 50 MB per file',
      'Public share links disabled',
    ],
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal for single-brand founders',
    price: 59,
    monthlyPriceCents: 5_900,
    currency: 'USD',
    interval: 'month',
    activeSkuLimit: 50,
    storageLimitGb: 15,
    deliveryBandwidthLimitGb: 25,
    internalUserLimit: 2,
    partnerInviteLimit: 10,
    deeplTotalCharLimit: 200_000,
    maxUploadBytes: PAID_PLATFORM_MAX_UPLOAD_BYTES,
    showMaxUploadInMarketing: false,
    publicShareLinksEnabled: true,
    features: [
      '50 active SKUs',
      '15 GB storage',
      '25 GB monthly delivery bandwidth',
      '2 internal users',
      '10 external partner invites',
      '200,000 DeepL characters / month',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Ideal for established teams',
    price: 149,
    monthlyPriceCents: 14_900,
    currency: 'USD',
    interval: 'month',
    activeSkuLimit: 500,
    storageLimitGb: 100,
    deliveryBandwidthLimitGb: 200,
    internalUserLimit: 8,
    partnerInviteLimit: 100,
    deeplTotalCharLimit: 750_000,
    maxUploadBytes: PAID_PLATFORM_MAX_UPLOAD_BYTES,
    showMaxUploadInMarketing: false,
    publicShareLinksEnabled: true,
    features: [
      '500 active SKUs',
      '100 GB storage',
      '200 GB monthly delivery bandwidth',
      '8 internal users',
      '100 external partner invites',
      '750,000 DeepL characters / month',
    ],
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'Ideal for global brands and retailers',
    price: 349,
    monthlyPriceCents: 34_900,
    currency: 'USD',
    interval: 'month',
    activeSkuLimit: 2_500,
    storageLimitGb: 500,
    deliveryBandwidthLimitGb: 1_000,
    internalUserLimit: UNLIMITED_BILLING_LIMIT,
    partnerInviteLimit: UNLIMITED_BILLING_LIMIT,
    deeplTotalCharLimit: 2_000_000,
    maxUploadBytes: PAID_PLATFORM_MAX_UPLOAD_BYTES,
    showMaxUploadInMarketing: false,
    publicShareLinksEnabled: true,
    features: [
      '2,500 active SKUs',
      '500 GB storage',
      '1 TB monthly delivery bandwidth',
      'Unlimited internal users',
      'Unlimited external partner invites',
      '2,000,000 DeepL characters / month',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom commercial and technical terms',
    price: 0,
    monthlyPriceCents: 0,
    currency: 'USD',
    interval: 'month',
    activeSkuLimit: UNLIMITED_BILLING_LIMIT,
    storageLimitGb: UNLIMITED_BILLING_LIMIT,
    deliveryBandwidthLimitGb: UNLIMITED_BILLING_LIMIT,
    internalUserLimit: UNLIMITED_BILLING_LIMIT,
    partnerInviteLimit: UNLIMITED_BILLING_LIMIT,
    deeplTotalCharLimit: UNLIMITED_BILLING_LIMIT,
    maxUploadBytes: PAID_PLATFORM_MAX_UPLOAD_BYTES,
    showMaxUploadInMarketing: false,
    publicShareLinksEnabled: true,
    features: ['Custom limits', 'Custom support', 'Custom controls'],
  },
]

export function isUnlimitedBillingLimit(limit: number | null | undefined): boolean {
  return Number(limit) >= UNLIMITED_BILLING_LIMIT
}

export function shouldShowMaxUploadInMarketing(planId: string | null | undefined): boolean {
  const normalizedPlanId = String(planId || '').trim().toLowerCase()
  const plan = BILLING_PLAN_CATALOG.find((p) => p.id === normalizedPlanId) || BILLING_PLAN_CATALOG[0]
  return plan.showMaxUploadInMarketing
}
