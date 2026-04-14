import { isUnlimitedBillingLimit } from './billing-catalog'

export function formatBillingLimit(value: number): string {
  return isUnlimitedBillingLimit(value) ? "Unlimited" : value.toLocaleString("en-US");
}

export function formatBillingGigabytes(value: number): string {
  if (isUnlimitedBillingLimit(value)) return "Unlimited";
  if (value >= 1000 && value % 1000 === 0) {
    return `${value / 1000} TB`;
  }
  return `${value} GB`;
}

export function formatUploadBytes(value: number): string {
  if (value >= 1024 * 1024 * 1024) {
    return `${Math.round(value / (1024 * 1024 * 1024))} GB`;
  }
  return `${Math.round(value / (1024 * 1024))} MB`;
}

export function formatDeepLUsage(value: number): string {
  if (value <= 0) return "Not included";
  if (isUnlimitedBillingLimit(value)) return "Unlimited";
  if (value % 1_000_000 === 0) return `${value / 1_000_000}M chars`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M chars`;
  if (value % 1_000 === 0) return `${value / 1_000}K chars`;
  return `${value.toLocaleString("en-US")} chars`;
}
