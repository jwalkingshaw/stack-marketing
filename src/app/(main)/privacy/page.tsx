import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - Stackcess',
  description: 'Privacy Policy for the Stackcess platform - how we collect, use, and protect your data.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-medium text-[var(--color-foreground)] mb-4 tracking-[-0.02em] leading-[1.1]">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-foreground-muted)]">Last updated: 23 March 2026</p>
        </div>

        <div className="space-y-10 text-sm text-[var(--color-foreground-muted)] leading-[1.7]">

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">1. Who We Are</h2>
            <p className="mb-3">
              Stackcess is a software-as-a-service platform for supplement brands and partner networks,
              incorporated in New Zealand and serving customers globally. This Privacy Policy explains
              how we collect, use, and protect personal information when you use our platform.
            </p>
            <p>
              Because we serve customers across multiple regions, we are committed to meeting the
              privacy standards of the New Zealand Privacy Act 2020, the EU General Data Protection
              Regulation (GDPR), and the UK GDPR where applicable. If you are located in the EU or
              UK, the relevant sections below describe your specific rights.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">2. The B2B Context</h2>
            <p>
              Stackcess is a business-to-business platform. Most of the personal information we process
              relates to individuals acting in a professional capacity on behalf of their organisation -
              for example, a brand&apos;s marketing manager or a retailer&apos;s buying team. We process
              this information to provide a service to the organisation, not for personal profiling or
              consumer-marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">3. Information We Collect</h2>
            <p className="mb-3">We collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-[var(--color-foreground)]">Account and identity data</strong> - name, work email
                address, and organisation name when you register or are invited to a workspace.
                Authentication is handled via Kinde (see section 6).
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Workspace and organisation data</strong> - your
                organisation&apos;s workspace settings, team member roles, and partner relationship
                configurations.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Product and asset content</strong> - product catalog
                data, digital assets (images, PDFs), regulatory documents (COAs, labels, certifications),
                and associated metadata that you upload to the platform. This is your data; we process
                it only to provide the Service.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Partner sharing data</strong> - records of which
                content has been shared with which partner organisations, including market and locale
                scoping, access grant history, and revocation records.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Partner Update analytics</strong> - when a Partner
                Update or Kit is delivered, we record basic engagement data: whether it was viewed, when,
                and by which partner workspace. This analytics data is visible to both the sending brand
                and the receiving partner in their respective workspaces.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Billing data</strong> - subscription plan, billing
                contact details, and payment transaction records. Payment card data is handled entirely
                by Stripe and never stored on Stackcess servers (see section 6).
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Usage and technical data</strong> - IP address,
                browser and device type, session activity, and feature usage patterns collected
                automatically when you use the platform. Used for security monitoring, performance
                improvement, and support.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">4. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, and maintain the Service and your workspace</li>
              <li>Authenticate users and manage workspace access and roles</li>
              <li>Process and deliver partner sharing grants and Partner Updates</li>
              <li>Generate and record Update analytics visible within the platform</li>
              <li>Process subscription payments and send billing communications</li>
              <li>Send transactional emails - workspace invitations, product updates, support responses</li>
              <li>Monitor for security threats and prevent unauthorised access</li>
              <li>Improve platform performance and develop new features</li>
            </ul>
            <p className="mt-3">
              We do not use your product content, regulatory documents, or business data for advertising,
              profiling, or any purpose outside of providing the Service.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">5. AI Translation</h2>
            <p className="mb-3">
              When you use the AI translation feature, product content you select for translation is
              transmitted to DeepL to generate the translated output. DeepL does not use
              API-submitted content for model training, and content is not retained beyond the
              translation request.
            </p>
            <p>
              You are responsible for reviewing AI-generated translations before distributing them to
              partners or publishing them in any market. Do not send content containing sensitive
              personal data through the translation feature.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">6. Third-Party Service Providers</h2>
            <p className="mb-3">
              We use the following third-party providers to operate the Service. Each processes data
              on our behalf under appropriate data processing agreements:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong className="text-[var(--color-foreground)]">Kinde</strong> - authentication and identity
                management. Handles user login, session tokens, and multi-factor authentication.
                See <a href="https://kinde.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-foreground)] underline underline-offset-2 hover:text-[var(--color-foreground)] transition-colors">Kinde&apos;s Privacy Policy</a>.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Stripe</strong> - payment processing. All payment
                card data is collected and stored by Stripe; Stackcess receives only a token reference.
                See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-foreground)] underline underline-offset-2 hover:text-[var(--color-foreground)] transition-colors">Stripe&apos;s Privacy Policy</a>.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Resend</strong> - transactional email delivery
                for workspace invitations and platform notifications.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Supabase</strong> - database infrastructure and
                file storage hosting for the platform.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">DeepL</strong> - processes product content
                you submit for AI translation. DeepL does not use API-submitted content for model
                training. Content is not retained beyond the translation request. See{' '}
                <a href="https://www.deepl.com/en/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-foreground)] underline underline-offset-2 hover:text-[var(--color-foreground)] transition-colors">DeepL&apos;s Privacy Policy</a>.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Crowdin</strong> - used to manage and deliver
                localised versions of the Stackcess platform interface. Crowdin processes platform
                UI strings only - not your product content or business data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">7. Information Sharing</h2>
            <p className="mb-3">We do not sell your personal information. We share information only in these circumstances:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>With the service providers listed in section 6, as necessary to operate the platform</li>
              <li>
                With partner organisations you explicitly grant access to - limited to the content
                and analytics data within the scope of that grant
              </li>
              <li>When required by applicable law, court order, or regulatory request</li>
              <li>In connection with a merger, acquisition, or asset sale, with appropriate notice to affected users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">8. International Data Transfers</h2>
            <p>
              Stackcess is incorporated in New Zealand and our infrastructure providers operate globally,
              including in the United States and European Union. When personal data is transferred outside
              your home jurisdiction, we rely on appropriate transfer mechanisms - including standard
              contractual clauses for EU/UK data - to ensure your data is protected to the standard
              required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">9. Data Security</h2>
            <p>
              We implement technical and organisational security measures appropriate to the sensitivity
              of the data we process, including encrypted data transmission (TLS), access controls,
              row-level security on the database, and regular security reviews. No method of electronic
              storage is completely secure; in the event of a data breach affecting your information,
              we will notify you as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">10. Data Retention</h2>
            <p className="mb-3">
              We retain your workspace data for as long as your account is active. If you downgrade
              your plan, data is retained in full - you are not penalised for reducing your subscription.
            </p>
            <p>
              On account deletion, we retain your data for 30 days to allow for export requests before
              permanent deletion. Billing records may be retained for longer where required by tax or
              financial reporting obligations.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">11. Your Rights</h2>
            <p className="mb-3">
              Depending on where you are located, you may have the following rights regarding your
              personal information:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>Access - request a copy of the personal data we hold about you</li>
              <li>Correction - request correction of inaccurate data</li>
              <li>Erasure - request deletion of your personal data in certain circumstances</li>
              <li>Restriction - request that we limit how we process your data</li>
              <li>Portability - receive your data in a portable format</li>
              <li>Objection - object to processing based on legitimate interests</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hello@stackcess.com" className="text-[var(--color-foreground)] underline underline-offset-2 hover:text-[var(--color-foreground)] transition-colors">
                hello@stackcess.com
              </a>. EU and UK residents may also lodge a complaint with their local supervisory authority.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">12. Cookies</h2>
            <p>
              We use session cookies to keep you logged in and functional cookies required for the
              platform to operate. We do not use third-party advertising cookies or cross-site tracking.
              You can control cookies through your browser settings, though disabling functional cookies
              will prevent you from using the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">13. Children&apos;s Privacy</h2>
            <p>
              The Service is intended for business use by adults. We do not knowingly collect personal
              information from anyone under 18. If we become aware of such data having been collected,
              we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">14. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in the platform or applicable law.
              We will notify you of material changes by email or in-app notice at least 14 days before
              they take effect. The &quot;Last updated&quot; date at the top of this page reflects the most
              recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">15. Contact</h2>
            <p>
              Privacy questions or requests:{' '}
              <a href="mailto:hello@stackcess.com" className="text-[var(--color-foreground)] underline underline-offset-2 hover:text-[var(--color-foreground)] transition-colors">
                hello@stackcess.com
              </a>
            </p>
          </section>

        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-border)] text-xs text-[var(--color-foreground-muted)]">
          Also see our{' '}
          <Link href="/terms" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] underline underline-offset-2 transition-colors">
            Terms and Conditions
          </Link>
        </div>

      </div>
    </div>
  )
}

