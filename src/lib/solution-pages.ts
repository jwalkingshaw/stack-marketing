import type { Metadata } from 'next'
import type { SolutionPageContent } from '@/components/SolutionPageTemplate'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

export const solutionPages: Record<string, SolutionPageContent> = {
  'ai-localization-for-supplement-brands': {
    slug: 'ai-localization-for-supplement-brands',
    shortTitle: 'AI Market Adaptation for Supplement Brands',
    title: 'AI Market Adaptation for Supplement Brands | Stackcess',
    description: 'Adopt approved source content, then adapt it for local markets with AI that helps teams handle translation, claims-sensitive wording, and market-specific review pressure.',
    kicker: 'AI Market Adaptation',
    heroTitle: 'International supplement content has a market-readiness problem, not just a translation problem.',
    heroBody:
      'Supplement brands do not just need product copy in another language. They need localized content that stays close to the approved source while reading appropriately for the local market. Stackcess follows an adopt-and-adapt model: translate from the approved baseline, then review the draft against local regulatory expectations to identify wording that is and is not recommended before suggesting targeted changes. The result is a more reviewable localized draft with fewer avoidable revisions.',
    heroPoints: [
      'When straight translation is usually enough, and when a market-specific adaptation pass is worth the extra review.',
      'How localized copy can stay closer to approved source content without reading like a literal conversion.',
      'Why visible change summaries help teams review faster and launch with less back-and-forth.',
    ],
    categoryProblemTitle: 'Direct translation often creates extra review work for supplement content.',
    categoryProblemBody:
      'A supplement brand may have strong English source copy and still end up with weak German, French, or regional-market output if the workflow stops at translation. Claims language, certainty, implied efficacy, and retailer or market expectations do not always survive direct conversion cleanly. The result may be linguistically correct copy that still triggers internal questions, revision cycles, or local pushback before it is ready to use. The cost shows up as slower launches, more reviewer friction, and localized content that drifts further from the approved source each time it gets rewritten.',
    categoryProblems: [
      {
        title: 'Translation alone can miss claims-sensitive phrasing',
        body: 'Language conversion can preserve the basic meaning while still carrying wording that feels too strong, too literal, or out of place in the destination market.',
      },
      {
        title: 'Teams lose time in repeated review loops',
        body: 'Marketing, regulatory, and local market teams end up revisiting the same fields when the first output is only linguistically correct, not commercially ready for local review.',
      },
      {
        title: 'Brand voice drifts across locales',
        body: 'Without shared instructions, each locale update starts to sound increasingly disconnected from the approved source position, terminology, and tone.',
      },
    ],
    platformTitle: 'What the AI workflow should do for supplement brands.',
    platformBody:
      'The useful distinction is between translation and adaptation. Translation answers what the source content says in another language. Adaptation helps teams decide how that content should be written for a local market so it remains understandable, commercially usable, and easier to review internally. In practice, that means starting from the approved source baseline, reviewing the draft for the local market against local regulatory expectations, and then adapting only the wording that appears not recommended for that market.',
    capabilityGroups: [
      {
        title: 'Translation mode',
        items: [
          'Users can translate product attributes from the approved source baseline into the local languages available to them.',
          'The source content stays the anchor, which keeps downstream locale work tied back to an approved starting point.',
          'When no meaningful market-specific issues appear, the result is effectively a direct translation workflow.',
        ],
      },
      {
        title: 'Adaptation mode',
        items: [
          'The system translates the source field, reviews it for the local market against local regulatory expectations, and identifies wording that may not be recommended.',
          'Only the phrases that appear overstated, overly literal, not recommended for the target market, or difficult for local review are suggested for rewriting rather than rewriting the whole field by default.',
          'The goal is to keep as much of the approved meaning as possible while reducing unnecessary rework in downstream review.',
        ],
      },
      {
        title: 'Review visibility',
        items: [
          'Teams get the adapted localized copy, a plain-language back-translation, and a summary of the changes that were suggested.',
          'Users can see what changed and why, which makes the output easier for brand, commercial, and local reviewers to evaluate.',
          'Regeneration guidance gives teams a cleaner way to refine outputs without restarting the workflow from zero.',
        ],
      },
      {
        title: 'Brand control',
        items: [
          'Shared adaptation defaults help shape tone and writing guidance across locales.',
          'The workflow balances source fidelity, market suitability, and brand consistency instead of treating them as separate problems.',
          'Teams move faster because localized drafts arrive in a more reviewable state, not because approval disappears.',
        ],
      },
    ],
    comparisonSection: {
      kicker: 'Translation Vs Adaptation',
      title: 'Use translation by default. Use adaptation where local regulatory expectations require different wording.',
      body:
        'The page should not sell adaptation as a heavier process for every field. The value is in knowing when a direct translation is enough and when local regulatory expectations suggest a more reviewable localized version will save time downstream.',
      leftTitle: 'Straight translation',
      rightTitle: 'Market adaptation',
      rows: [
        {
          label: 'Best fit',
          left: 'Routine fields where the approved source travels cleanly and the destination market does not need much interpretation.',
          right: 'Claims-sensitive, channel-facing, or reviewer-visible fields where literal wording is more likely to create comments or rewrites.',
        },
        {
          label: 'Output style',
          left: 'A linguistically correct version of the source field.',
          right: 'A localized draft that stays close to source meaning but uses more market-appropriate phrasing where needed.',
        },
        {
          label: 'Team effort',
          left: 'Lower effort up front, but more manual follow-up if the wording does not survive local review well.',
          right: 'Slightly more guidance up front, with fewer avoidable review loops once the draft reaches brand or local teams.',
        },
        {
          label: 'Reviewer view',
          left: 'Reviewers still need to interpret what feels off and explain what should change.',
          right: 'Reviewers get a cleaner draft, a back-translation, and visible reasoning around suggested wording changes based on local market recommendations.',
        },
      ],
    },
    operatingTitle: 'Where this matters in live supplement operations.',
    operatingBody:
      'Localization pressure is usually operational before it becomes linguistic. Teams are trying to launch in another market, support a distributor, refresh an ecommerce feed, or prepare retailer-facing materials. The failure mode is not just awkward copy. It is delayed go-live, repeated review cycles, and uncertainty about whether the localized version is ready to send forward for approval and launch preparation.',
    operatingSections: [
      {
        title: 'Market launches',
        body: 'A direct translation can get teams part of the way there, but adaptation reduces the amount of manual rewriting needed before a new market launch feels credible to internal and in-market reviewers.',
      },
      {
        title: 'Distributor enablement',
        body: 'Regional partners need content they can actually use. If every field still needs local rewriting before it can be shared, the brand has not really localized the product content operation.',
      },
      {
        title: 'Claims consistency',
        body: 'The same product should not sound casually aggressive in one market and overly softened in another because each locale was handled in isolation.',
      },
      {
        title: 'Approval discipline',
        body: 'The workflow improves preparation and visibility before the handoff. Human approval still happens in the normal process, but teams reach that stage with cleaner drafts and fewer avoidable questions.',
      },
    ],
    faqTitle: 'Common questions about AI market adaptation',
    faqs: [
      {
        question: 'When should teams use adaptation instead of straight translation?',
        answer: 'Use adaptation when direct translation produces wording that feels too literal, too strong, awkward for the channel, or likely to trigger local review comments. If the translated field reads cleanly and stays close to the approved source, straight translation may be enough.',
      },
      {
        question: 'What kinds of wording usually need a second look?',
        answer: 'Teams usually pay closer attention to claims-adjacent phrasing, certainty of effect, benefit language, and wording that local regulatory expectations would be less likely to recommend in that market.',
      },
      {
        question: 'What does the reviewer actually receive?',
        answer: 'The reviewer gets the localized output, a back-translation for sense-checking, and a summary of the changes that were suggested so they can see what moved and why.',
      },
      {
        question: 'How does Stackcess keep localized copy closer to the approved source?',
        answer: 'The workflow starts from approved source content, keeps that source as the anchor, and suggests targeted changes only where the destination market appears to need them. That keeps teams from drifting into unnecessary full rewrites.',
      },
    ],
    relatedPages: [
      {
        href: '/pim-for-supplement-brands',
        title: 'PIM for supplement brands',
        description: 'See how approved source fields, product structure, and scoped attributes create the foundation for stronger localization.',
      },
      {
        href: '/dam-for-supplement-brands',
        title: 'DAM for supplement brands',
        description: 'Localized copy still needs the right labels, images, and supporting files attached to the correct market workflow.',
      },
      {
        href: '/coa-management-for-supplement-brands',
        title: 'COA management',
        description: 'Compliance-sensitive content work sits alongside the wider document and market-readiness process for supplement brands.',
      },
    ],
  },
  'pim-for-supplement-brands': {
    slug: 'pim-for-supplement-brands',
    shortTitle: 'PIM for Supplement Brands',
    title: 'PIM for Supplement Brands | Stackcess',
    description: 'Manage supplement product data, variants, claims, and market-ready catalog content from one structured PIM workflow.',
    kicker: 'Category Page',
    heroTitle: 'PIM for supplement brands that need more than a product table.',
    heroBody:
      'Supplement catalogs are messy in predictable ways. Flavors, pack sizes, claims language, channel requirements, label changes, and market-specific restrictions turn a simple SKU list into an operating problem. A PIM for supplement brands needs to keep product data structured, usable, and commercially ready long after the initial setup.',
    heroPoints: [
      'How supplement catalogs break once variants, claims, and channels start moving independently.',
      'What a supplement-focused PIM needs to control at family, variant, and market level.',
      'Why product data quality matters to distributors, retailers, and localization teams, not just ecommerce.',
    ],
    categoryProblemTitle: 'A supplement PIM has to carry regulatory and channel pressure at the same time.',
    categoryProblemBody:
      'General PIM language misses the practical load on supplement teams. The same product can change by flavor, tub size, claim set, retailer spec, and market. If those differences sit in spreadsheets, email threads, and disconnected exports, the issue is no longer product information. It is execution risk.',
    categoryProblems: [
      {
        title: 'Variant logic gets brittle',
        body: 'Serving formats, flavor variants, bundles, and market packs drift apart when teams duplicate records instead of managing shared and variant-specific fields deliberately.',
      },
      {
        title: 'Claims and copy diverge by channel',
        body: 'The product page, sell sheet, retailer pack, and distributor export often stop matching after the second or third update cycle.',
      },
      {
        title: 'Launch readiness is opaque',
        body: 'Teams know the SKU exists, but they cannot see whether the record is complete, approved, localized, and ready for downstream delivery.',
      },
    ],
    platformTitle: 'What a supplement-focused PIM should actually manage.',
    platformBody:
      'The job is not just storing attributes. It is controlling how product information changes, how it rolls down to variants, how it is scoped for market and channel, and how teams know whether the data is commercially usable.',
    capabilityGroups: [
      {
        title: 'Catalog structure',
        items: [
          'Product families and variants that reflect flavor, size, format, and regional assortment logic.',
          'Shared fields for common product truths, with variant-level overrides where they belong.',
          'Field-level rules that separate source data from export-only or computed output.',
        ],
      },
      {
        title: 'Content governance',
        items: [
          'Controlled handling of claims, ingredients, directions, warnings, and retailer-facing copy.',
          'Clear completeness checks so teams know what is missing before a launch or export.',
          'Approval-oriented workflows that reduce silent changes and stale copies in the market.',
        ],
      },
      {
        title: 'Market and channel scoping',
        items: [
          'Market-specific fields for localized copy, claims adjustments, and legal wording changes.',
          'Destination-aware outputs for distributor packs, retailer uploads, ecommerce pages, and internal references.',
          'A cleaner path from one core record to multiple partner-ready versions.',
        ],
      },
      {
        title: 'Operational visibility',
        items: [
          'A single view of which products are complete, approved, and ready for delivery.',
          'Less dependence on ad hoc exports and spreadsheet-side fixes before every launch.',
          'A stronger handoff between product, commercial, marketing, and partner teams.',
        ],
      },
    ],
    operatingTitle: 'Where the commercial pressure shows up first.',
    operatingBody:
      'The teams feeling PIM pain are rarely only ecommerce managers. The problem reaches brand, trade, export, and distributor operations quickly because every downstream partner depends on the same source record, whether they know it or not.',
    operatingSections: [
      {
        title: 'Distributor onboarding',
        body: 'When a new distributor asks for product specs, variants, hero assets, and claim-safe copy, the weakness of a loose catalog shows up immediately.',
      },
      {
        title: 'Retailer refreshes',
        body: 'Large retailers do not want interpretation. They want structured, current product data that matches the pack, the label, and the commercial packshot set.',
      },
      {
        title: 'Market expansion',
        body: 'A product record that works in one market often needs controlled differences in another. Without scope-aware data, teams either duplicate records or overwrite the wrong information.',
      },
      {
        title: 'Portfolio growth',
        body: 'As the range gets broader, the cost of weak structure compounds. Every new SKU adds more manual checking unless the model is disciplined early.',
      },
    ],
    faqTitle: 'Common questions about PIM for supplement brands',
    faqs: [
      {
        question: 'How is a supplement PIM different from a general product database?',
        answer: 'A supplement PIM needs to manage variant-heavy catalogs, claims-sensitive copy, market differences, and distributor or retailer output requirements in a controlled way.',
      },
      {
        question: 'Does a supplement brand need a PIM before it reaches enterprise scale?',
        answer: 'Usually yes. The pressure starts once product variants, partner requests, and repeated content updates stop fitting cleanly in spreadsheets.',
      },
      {
        question: 'Should a supplement PIM also handle assets and documents?',
        answer: 'In practice it should stay tightly connected to them. Product data without linked labels, hero images, and supporting documents still creates handoff problems.',
      },
      {
        question: 'What is the first sign that a supplement team has outgrown manual catalog management?',
        answer: 'Teams start spending more time reconciling versions across channels and partners than improving the actual product content itself.',
      },
    ],
    relatedPages: [
      {
        href: '/dam-for-supplement-brands',
        title: 'DAM for supplement brands',
        description: 'How approved imagery, labels, and documents need to stay attached to product truth, not live as a separate archive.',
      },
      {
        href: '/coa-management-for-supplement-brands',
        title: 'COA management for supplement brands',
        description: 'Why certificates of analysis become an operating issue once QA, distributors, and market requirements start crossing over.',
      },
      {
        href: '/pricing',
        title: 'Stackcess pricing',
        description: 'See how the platform scales from smaller catalogs to larger multi-market and partner-heavy operations.',
      },
    ],
  },
  'dam-for-supplement-brands': {
    slug: 'dam-for-supplement-brands',
    shortTitle: 'DAM for Supplement Brands',
    title: 'DAM for Supplement Brands | Stackcess',
    description: 'Control supplement imagery, labels, regulatory files, and partner-ready assets with a DAM built for product operations.',
    kicker: 'Category Page',
    heroTitle: 'DAM for supplement brands that need approved assets, not a bigger file dump.',
    heroBody:
      'A supplement brand does not just manage product photos. It manages labels, hero renders, PDFs, compliance packs, retailer uploads, launch kits, and market-specific files that must stay tied to the right product and the right use case. A DAM for supplement brands needs to govern context, not just storage.',
    heroPoints: [
      'Why product imagery, labels, and documents become unreliable when the DAM is disconnected from the catalog.',
      'What supplement teams need from asset governance when retailers, distributors, and agencies all need different files.',
      'How a stronger DAM model reduces stale assets, duplicate folders, and resend work.',
    ],
    categoryProblemTitle: 'Asset sprawl is usually a product operations problem wearing a media label.',
    categoryProblemBody:
      'The folder structure may look tidy, but that does not mean the operation is controlled. Teams still ask which hero image is current, which label was approved, which PDF belongs to which market, and whether the agency has the right version. The cost is usually paid in launch delays and channel inconsistency.',
    categoryProblems: [
      {
        title: 'Approved files lose context',
        body: 'A packshot stored separately from the product, the market, and the channel quickly becomes hard to trust even if the filename looks sensible.',
      },
      {
        title: 'Agencies and partners work from stale versions',
        body: 'Without scoped sharing and version visibility, external teams keep local copies and brands inherit the cleanup later.',
      },
      {
        title: 'Compliance documents and media are split apart',
        body: 'When labels, certifications, and support files live outside the asset workflow, product readiness becomes harder to verify.',
      },
    ],
    platformTitle: 'What a supplement-focused DAM should control.',
    platformBody:
      'The right DAM does more than hold images. It needs to link each asset to product context, manage approval state, control versioning, and support partner delivery without turning every request into manual account management.',
    capabilityGroups: [
      {
        title: 'Asset-to-product mapping',
        items: [
          'Link hero images, label files, PDFs, and supporting media to the correct product and variant record.',
          'Keep asset slots structured so teams know what exists and what is missing.',
          'Reduce ambiguity around front label, back label, hero image, lifestyle image, and support documents.',
        ],
      },
      {
        title: 'Approval and version control',
        items: [
          'Track which assets are current, approved, superseded, or still under review.',
          'Give teams a cleaner audit trail around asset replacement and launch readiness.',
          'Stop outdated files from continuing downstream simply because they were easier to find.',
        ],
      },
      {
        title: 'Partner delivery',
        items: [
          'Share the right files with retailers, distributors, and agencies without exposing the whole asset library.',
          'Support destination-specific packs where each audience needs a different mix of imagery and documents.',
          'Cut repeat resend work when partners need current files on demand.',
        ],
      },
      {
        title: 'Operational searchability',
        items: [
          'Search by product, market, tag, document type, or operational status instead of hunting through folders.',
          'Keep metadata useful enough that teams can work at speed, not just satisfy an upload form.',
          'Make asset completeness visible alongside the broader product workflow.',
        ],
      },
    ],
    operatingTitle: 'The commercial impact shows up well beyond the creative team.',
    operatingBody:
      'A weak DAM slows content operations everywhere. Sales teams send the wrong deck. Retailers receive outdated imagery. Distributors ask for current files again. Agencies rebuild sets that already exist. The visible symptom is media confusion, but the root problem is unreliable control over product assets.',
    operatingSections: [
      {
        title: 'Retail submission quality',
        body: 'Retailers expect current imagery, complete packs, and less clarification. Weak asset governance creates friction before the product even reaches shelf or listing.',
      },
      {
        title: 'Campaign execution',
        body: 'Launch work gets harder when teams cannot tell which files are approved for paid media, ecommerce, and distributor-facing materials.',
      },
      {
        title: 'Distributor confidence',
        body: 'Distribution partners trust brands more when asset delivery feels current, organized, and dependable instead of reactive.',
      },
      {
        title: 'International coordination',
        body: 'Market-specific labels and support files add another layer. The DAM needs scope, not just more folders, once the business crosses borders.',
      },
    ],
    faqTitle: 'Common questions about DAM for supplement brands',
    faqs: [
      {
        question: 'Why is a general file library not enough for a supplement brand?',
        answer: 'Because supplement teams need product-linked, approved, and scope-aware assets, not just storage space for images and PDFs.',
      },
      {
        question: 'Should labels and compliance documents live inside the DAM workflow too?',
        answer: 'They should at least stay tightly linked. If labels, certifications, and support documents are detached from product assets, teams lose confidence in what is current.',
      },
      {
        question: 'What is the first sign that a DAM setup is failing?',
        answer: 'People stop trusting search and start asking colleagues for the latest file because that feels safer than relying on the system.',
      },
      {
        question: 'How does a supplement DAM help distributors and retailers?',
        answer: 'It gives them access to current, product-specific files without relying on repeated one-off email requests and manual resend work.',
      },
    ],
    relatedPages: [
      {
        href: '/pim-for-supplement-brands',
        title: 'PIM for supplement brands',
        description: 'See how product structure, variant logic, and market scoping support a stronger asset operation.',
      },
      {
        href: '/coa-management-for-supplement-brands',
        title: 'COA management for supplement brands',
        description: 'Extend the asset and document workflow into supplier evidence, finished batch records, and partner-facing compliance support.',
      },
      {
        href: '/help',
        title: 'Help center',
        description: 'Explore the product documentation behind catalog, asset, and partner workflow management in Stackcess.',
      },
    ],
  },
  'coa-management-for-supplement-brands': {
    slug: 'coa-management-for-supplement-brands',
    shortTitle: 'COA Management for Supplement Brands',
    title: 'COA Management for Supplement Brands | Stackcess',
    description: 'Organize supplier and batch COAs, product links, and partner-ready compliance documents for supplement brands.',
    kicker: 'Compliance Workflow',
    heroTitle: 'COA management for supplement brands needs structure, not a shared drive.',
    heroBody:
      'Certificates of analysis sit at the intersection of supplier qualification, finished batch release, distributor support, and market-facing compliance questions. The documents matter, but the operating model matters more. If teams cannot connect a COA to the right ingredient, batch, product, market, and partner request, the file exists without doing its job.',
    heroPoints: [
      'What supplier and finished-batch COAs actually need to support in a supplement operation.',
      'How FDA dietary supplement CGMP rules shape COA handling, supplier qualification, and specification checks.',
      'Why COA management becomes a cross-functional problem once commercial teams and partners need answers quickly.',
    ],
    categoryProblemTitle: 'A COA is not just a PDF, it is evidence inside a quality system.',
    categoryProblemBody:
      'For dietary supplements, supplier certificates of analysis and finished-batch testing records sit inside a wider CGMP process. FDA guidance and 21 CFR Part 111 make the point directly. Teams can rely on a supplier COA for some component specifications only if the supplier is qualified, the methods and limits are documented, actual results are provided, and the COA is periodically re-confirmed. That means document storage alone is not enough.',
    categoryProblems: [
      {
        title: 'Supplier evidence is hard to trust at speed',
        body: 'A COA that arrives by email and lands in a folder may still be unusable if the batch, method, limits, or approval context are unclear.',
      },
      {
        title: 'Commercial teams still need the answer',
        body: 'Distributors, retailers, and export partners often ask for current compliance support long after QA filed the original record.',
      },
      {
        title: 'Product, batch, and document records split apart',
        body: 'When COAs are managed separately from the product and partner workflow, teams spend time reconciling references instead of responding confidently.',
      },
    ],
    platformTitle: 'What disciplined COA management looks like in practice.',
    platformBody:
      'The goal is not to turn commercial software into a laboratory information system. It is to make certificates, supporting documents, and product context usable across the business while respecting that COAs sit inside regulated quality and supplier control processes.',
    capabilityGroups: [
      {
        title: 'Document control',
        items: [
          'Keep supplier COAs, finished batch records, labels, and supporting compliance files attached to the right product context.',
          'Use metadata that tracks supplier, batch, market relevance, document type, and approval status.',
          'Reduce the risk of the wrong certificate being sent simply because filenames are inconsistent.',
        ],
      },
      {
        title: 'Cross-functional access',
        items: [
          'Give QA, regulatory, sales, and distributor-facing teams a clearer way to retrieve current supporting files.',
          'Support partner-ready sharing without exposing every internal document to every external user.',
          'Make routine compliance responses less dependent on tribal knowledge.',
        ],
      },
      {
        title: 'Batch and product linkage',
        items: [
          'Connect document records back to the products and variants they support.',
          'Keep batch-specific evidence distinguishable from evergreen product support files.',
          'Make it easier to answer which record applies to which shipment, assortment, or partner query.',
        ],
      },
      {
        title: 'Operational clarity',
        items: [
          'Separate source-of-truth quality evidence from presentation or partner-sharing copies where needed.',
          'Maintain a cleaner trail around what was provided, when, and for whom.',
          'Treat COAs as operational evidence that needs context, not just retention.',
        ],
      },
    ],
    operatingTitle: 'The pressure usually arrives from outside QA first.',
    operatingBody:
      'The commercial side often discovers the COA problem before the document owner does. A retailer asks for current support. A distributor needs evidence before listing. An export market asks for clarification on a batch-linked record. Suddenly the issue is no longer whether the file exists. It is whether the business can retrieve the right evidence quickly and confidently.',
    operatingSections: [
      {
        title: 'Distributor requests',
        body: 'Partners often need current supporting documents fast. Slow retrieval weakens confidence and turns a routine request into a commercial delay.',
      },
      {
        title: 'Market-specific packs',
        body: 'Different destinations may require different supporting sets. Teams need to know which COA-linked documents belong in which partner flow.',
      },
      {
        title: 'Batch-level questions',
        body: 'Once a batch or ingredient question appears, weak document linkage becomes obvious. The answer needs to connect the record, the product, and the commercial context quickly.',
      },
      {
        title: 'Supplier qualification follow-through',
        body: 'FDA dietary supplement guidance does not treat supplier COAs as self-proving. Brands still need qualification, documentation, and periodic re-confirmation around reliance on them.',
      },
    ],
    faqTitle: 'Common questions about COA management for supplement brands',
    faqs: [
      {
        question: 'What is a COA in a dietary supplement operation?',
        answer: 'A certificate of analysis is a document that records specified characteristics and test results for a component or batch, and it sits inside wider quality and supplier-control processes.',
      },
      {
        question: 'Can a supplement brand rely on a supplier COA without further controls?',
        answer: 'Not by default. FDA dietary supplement CGMP rules require supplier qualification, documented methods and limits, actual results, and periodic re-confirmation when relying on supplier COAs for certain component specifications.',
      },
      {
        question: 'Why does COA management affect commercial teams?',
        answer: 'Because distributors, retailers, and export partners often need supporting documents quickly, and delays usually come from poor retrieval, weak linkage, or uncertain version control.',
      },
      {
        question: 'Is COA management only a QA function?',
        answer: 'The quality system owns the evidence, but the operating burden crosses QA, regulatory, commercial, and partner support once documents need to move through the business reliably.',
      },
    ],
    relatedPages: [
      {
        href: '/pim-for-supplement-brands',
        title: 'PIM for supplement brands',
        description: 'See how structured product records help keep compliance documents connected to the products and variants they support.',
      },
      {
        href: '/dam-for-supplement-brands',
        title: 'DAM for supplement brands',
        description: 'Treat labels, certifications, and COAs as governed product assets, not scattered attachments.',
      },
      {
        href: '/help',
        title: 'Help center',
        description: 'Read the documentation around asset workflows, product fields, and operational governance inside Stackcess.',
      },
    ],
    sources: [
      {
        href: 'https://www.law.cornell.edu/cfr/text/21/111.75',
        label: '21 CFR 111.75',
        note: 'FDA dietary supplement CGMP rule on component identity, supplier COAs, and finished-batch specification checks.',
      },
      {
        href: 'https://www.fda.gov/Food/GuidanceRegulation/GuidanceDocumentsRegulatoryInformation/DietarySupplements/ucm238182.htm',
        label: 'FDA small entity guide',
        note: 'FDA guidance explaining what a certificate of analysis is and what is required when relying on supplier COAs.',
      },
      {
        href: 'https://www.nsf.org/nutrition-wellness/product-and-ingredient-certification',
        label: 'NSF product certification',
        note: 'Independent certification context showing how ingredient identity, purity, and contaminant expectations connect back to supplement quality claims.',
      },
    ],
  },
}

export function buildSolutionMetadata(slug: keyof typeof solutionPages): Metadata {
  const content = solutionPages[slug]
  const url = `/${content.slug}`

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url,
      type: 'website',
    },
    twitter: {
      title: content.title,
      description: content.description,
    },
    keywords: [
      content.shortTitle.toLowerCase(),
      'supplement brands',
      'stackcess',
    ],
    metadataBase: new URL(siteUrl),
  }
}
