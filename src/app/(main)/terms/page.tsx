import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms and Conditions - Stackcess',
  description: 'Terms and Conditions for using the Stackcess platform and services.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-medium text-[var(--color-foreground)] mb-4 tracking-[-0.02em] leading-[1.1]">
            Terms and Conditions
          </h1>
          <p className="text-[var(--color-foreground-muted)]">Last updated: 23 March 2026</p>
        </div>

        <div className="space-y-10 text-sm text-[var(--color-foreground-muted)] leading-[1.7]">

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Stackcess platform and services (&quot;Service&quot;), you agree to be
              bound by these Terms and Conditions (&quot;Terms&quot;). These Terms apply to all users of the
              Service, including brand workspace members and invited partner users. If you are using the Service
              on behalf of an organisation, you represent that you have authority to bind that organisation to
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">2. Description of Service</h2>
            <p className="mb-3">
              Stackcess is a software-as-a-service platform built for the sports supplement industry. It
              provides tools for product information management (PIM), digital asset management (DAM),
              partner content sharing, market and locale configuration, regulatory document storage,
              AI-assisted translation, and Partner Update delivery.
            </p>
            <p>
              The platform operates on a workspace model. Each subscribing organisation (&quot;Workspace
              Owner&quot;) gets a dedicated workspace. Workspace Owners can invite internal team members and
              external partner organisations. Partners do not need their own paid Stackcess subscription
              to receive and view content shared with them. The number of partner invites available to a
              Workspace Owner is determined by their plan.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">3. User Types and Workspace Access</h2>
            <p className="mb-3">
              The Service has two primary user types:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong className="text-[var(--color-foreground)]">Workspace Members</strong> - employees or contractors of a
                subscribing organisation. Covered by the organisation&apos;s paid plan. Each plan has a team size
                limit; the Workspace Owner is responsible for managing member access within their plan limits.
              </li>
              <li>
                <strong className="text-[var(--color-foreground)]">Invited Partner Users</strong> - members of partner
                organisations invited to receive shared content. Partners do not require a paid plan to
                view content shared with them. However, the number of partner invites a Workspace Owner
                can issue is governed by their plan limit - not per-user billing. Partner users may only access content
                explicitly shared with their organisation; they cannot access the sharing brand&apos;s full
                workspace or any unshared content.
              </li>
            </ul>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activities under your account. Notify us immediately of any unauthorised access.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">4. Content Ownership and Licence</h2>
            <p className="mb-3">
              You retain full ownership of all content you upload to the Service, including product data,
              digital assets, regulatory documents, and any other materials (&quot;Your Content&quot;).
            </p>
            <p className="mb-3">
              By uploading content, you grant Stackcess a limited, non-exclusive, royalty-free licence to
              store, process, and transmit Your Content solely as necessary to provide the Service to you and
              your designated partners. We do not use Your Content for any other purpose, including training
              AI models.
            </p>
            <p>
              You are responsible for ensuring you have the rights to upload and share any content submitted
              to the platform, including product images, regulatory documents, and third-party materials.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">5. Partner Sharing and Content Delivery</h2>
            <p className="mb-3">
              The Service enables Workspace Owners to share product content, digital assets, and documents
              with invited partner organisations through controlled Share Sets and scoped access grants.
            </p>
            <p className="mb-3">
              You control exactly what is shared with each partner, including which products, assets,
              markets, and locales are visible. Partners receive access only to what you explicitly grant.
              Revoking a grant removes partner access to that content.
            </p>
            <p>
              When you share a Partner Update or Kit, Stackcess records basic analytics - including when
              the update was viewed and by which partner workspace. Both the sharing brand and the receiving
              partner may see this analytics data within their respective workspaces.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">6. Regulatory Documents</h2>
            <p className="mb-3">
              Stackcess supports storage and delivery of regulatory documents including Certificates of
              Analysis (COAs), approved product labels, GMP certifications, and similar compliance materials.
            </p>
            <p>
              Stackcess provides a system for storing and sharing these documents but makes no representation
              or warranty as to their accuracy, completeness, or regulatory compliance. You are solely
              responsible for ensuring that regulatory documents stored and shared through the platform are
              accurate, current, and compliant with applicable laws and regulations in each relevant market.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">7. AI Translation</h2>
            <p className="mb-3">
              The Service includes AI-assisted translation of product content into supported languages.
              When you use translation features, relevant content may be transmitted to third-party AI
              translation providers to generate translated output.
            </p>
            <p>
              AI-generated translations are provided as a starting point. You are responsible for reviewing
              translated content for accuracy before distributing it to partners or publishing it in any
              market. Stackcess makes no warranty that AI translations are accurate, complete, or
              appropriate for regulatory or commercial use in any jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">8. Subscription, Plans, and Billing</h2>
            <p className="mb-3">
              Paid plans are charged on a flat monthly basis per workspace. You are not charged per seat -
              team size is governed by the plan limit, not per-user billing. All fees are charged in advance
              and are non-refundable except where required by applicable law.
            </p>
            <p className="mb-3">
              Plan limits cover active SKUs, storage, monthly delivery bandwidth, internal users, external
              partner invites, and translation volume. When a limit is reached, the platform will prompt
              you to upgrade. We do not automatically delete data when limits are reached - you will be
              notified and can choose to upgrade.
            </p>
            <p>
              We reserve the right to modify pricing with at least 30 days&apos; notice. Continued use of
              the Service after a price change constitutes acceptance of the new pricing.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">9. Downgrade, Cancellation, and Data</h2>
            <p className="mb-3">
              If you downgrade to a lower plan or the free plan, your workspace and all its data remains
              intact. You will not be able to add new items beyond the lower plan&apos;s limits until you
              upgrade again, but existing data is never automatically deleted due to a plan change.
            </p>
            <p>
              If you cancel your account entirely, you may request a data export before closure. Following
              account deletion, we will retain your data for 30 days before permanent deletion, except
              where a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">10. Acceptable Use</h2>
            <p className="mb-3">You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Upload or share false, misleading, or fraudulent regulatory documents</li>
              <li>Share content with partners in excess of any agreed access grant</li>
              <li>Attempt to gain unauthorised access to other workspaces or accounts</li>
              <li>Reverse engineer, scrape, or systematically extract data from the platform</li>
              <li>Resell or sublicense access to the Service without our written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">11. Intellectual Property</h2>
            <p>
              The Stackcess platform, its design, features, and underlying technology are the exclusive
              property of Stackcess and its licensors, protected by copyright, trademark, and other
              applicable laws. You may not copy, modify, distribute, or create derivative works from any
              part of the platform without our express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">12. Service Availability</h2>
            <p>
              We aim to maintain high availability but do not guarantee uninterrupted access. The Service
              may be temporarily unavailable for maintenance, security updates, or other operational reasons.
              We are not liable for any loss arising from planned or unplanned service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">13. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express
              or implied. We do not warrant that the Service will be error-free, that regulatory document
              storage meets any specific compliance requirement, or that AI-generated translations are
              accurate or suitable for any particular purpose.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">14. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Stackcess shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the Service,
              including but not limited to loss of data, loss of revenue, or regulatory penalties arising
              from inaccurate or outdated content shared with partners or published in any market.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">15. Termination</h2>
            <p>
              We may suspend or terminate your account for material breach of these Terms, with or without
              notice depending on severity. You may cancel your account at any time through workspace
              settings. Upon termination, access to the Service will cease; data export and deletion
              procedures are as described in section 9.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">16. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. For material changes, we will provide at least
              30 days&apos; notice by email or in-app notification. Continued use of the Service after
              the effective date of any changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">17. Governing Law</h2>
            <p>
              These Terms are governed by the laws of New Zealand, without regard to conflict of law
              provisions. Any disputes arising under these Terms will be subject to the non-exclusive
              jurisdiction of the New Zealand courts. &quot;Non-exclusive&quot; means that if you are located
              in another jurisdiction, you may also have the right to bring proceedings in your local courts
              under applicable consumer or business protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-[var(--color-foreground)] mb-3">18. Contact</h2>
            <p>
              Questions about these Terms:{' '}
              <a href="mailto:hello@stackcess.com" className="text-[var(--color-foreground)] hover:text-[var(--color-foreground)] underline underline-offset-2 transition-colors">
                hello@stackcess.com
              </a>
            </p>
          </section>

        </div>

        <div className="mt-14 pt-8 border-t border-[var(--color-border)] text-xs text-[var(--color-foreground-muted)]">
          Also see our{' '}
          <Link href="/privacy" className="text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] underline underline-offset-2 transition-colors">
            Privacy Policy
          </Link>
        </div>

      </div>
    </div>
  )
}


