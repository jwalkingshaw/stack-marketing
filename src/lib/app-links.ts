const DEFAULT_APP_URL = "http://localhost:3001";
const DEFAULT_KINDE_PRICING_TABLE_KEY = "organization_plans";

type AuthAction = "login" | "register";

interface AuthUrlOptions {
  postLoginRedirectPath?: string;
  invitationToken?: string;
  pricingTableKey?: string;
  planInterest?: "free" | "starter" | "growth" | "scale" | "enterprise" | string;
  createOrg?: boolean;
}

function normalizeAppBaseUrl(rawUrl: string | undefined): string {
  const trimmed = (rawUrl || DEFAULT_APP_URL).trim();
  return trimmed.replace(/\/+$/, "");
}

function sanitizeRelativePath(path: string | undefined, fallback: string): string {
  if (!path) return fallback;
  if (!path.startsWith("/")) return fallback;
  if (path.startsWith("//")) return fallback;
  return path;
}

export function getAppBaseUrl(): string {
  return normalizeAppBaseUrl(process.env.NEXT_PUBLIC_APP_URL);
}

function getPricingTableKey(): string {
  return (
    process.env.NEXT_PUBLIC_KINDE_PRICING_TABLE_KEY?.trim() ||
    DEFAULT_KINDE_PRICING_TABLE_KEY
  );
}

export function buildAppUrl(path = "/"): string {
  const safePath = sanitizeRelativePath(path, "/");
  return `${getAppBaseUrl()}${safePath}`;
}

export function buildAppAuthUrl(
  action: AuthAction,
  options: AuthUrlOptions = {}
): string {
  const postLoginRedirectPath = sanitizeRelativePath(
    options.postLoginRedirectPath,
    action === "register" ? "/onboarding?create=1" : "/"
  );
  const url = new URL(buildAppUrl(`/api/auth/${action}`));

  if (postLoginRedirectPath) {
    url.searchParams.set("post_login_redirect_url", postLoginRedirectPath);
  }

  if (options.invitationToken) {
    url.searchParams.set("invitation_token", options.invitationToken);
  }

  if (action === "register") {
    const pricingTableKey = (options.pricingTableKey || getPricingTableKey()).trim();
    if (pricingTableKey) {
      url.searchParams.set("pricing_table_key", pricingTableKey);
      if (options.createOrg !== false) {
        url.searchParams.set("is_create_org", "true");
      }
    }

    if (options.planInterest) {
      url.searchParams.set("plan_interest", String(options.planInterest).trim());
    }
  }

  return url.toString();
}
