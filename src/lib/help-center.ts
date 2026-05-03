export type HelpSection = {
  title: string;
  body: string;
  bullets?: string[];
  steps?: string[];
};

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  audience: string;
  readTime: string;
  updatedAt: string;
  appPaths: string[];
  sections: HelpSection[];
};

export const helpArticles: HelpArticle[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    summary:
      "Create your workspace, finish your profile, and set the first defaults before your team starts adding content.",
    category: "Start Here",
    audience: "Owners and admins",
    readTime: "5 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/onboarding", "/welcome", "/{workspaceSlug}"],
    sections: [
      {
        title: "What to complete first",
        body:
          "A clean setup prevents rework later. The first run should establish workspace identity, market defaults, and who can access the workspace.",
        bullets: [
          "Create workspace name and URL during onboarding.",
          "Select business type and primary market.",
          "Complete your profile so activity and invites show your real name.",
        ],
      },
      {
        title: "Onboarding flow",
        body:
          "The onboarding form creates the organization record and routes you to your workspace.",
        steps: [
          "Enter workspace name and URL slug.",
          "Pick industry, business type, team size, and primary market.",
          "Confirm details and create the workspace.",
        ],
      },
      {
        title: "First admin checklist",
        body:
          "Before inviting others, validate branding and product data structure so teammates work in the right model.",
        bullets: [
          "Upload logo and organization profile in Settings > Organization.",
          "Create at least one product model and attribute group.",
          "Create core attributes and required fields for your model.",
          "Add channels and destinations if you publish to multiple endpoints.",
        ],
      },
    ],
  },
  {
    slug: "app-navigation",
    title: "App Navigation And Screen Elements",
    summary:
      "Understand what each shell element does: Workspace rail, sidebar, page header, and scope toolbar.",
    category: "Start Here",
    audience: "All users",
    readTime: "6 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}", "/{workspaceSlug}/products", "/{workspaceSlug}/assets"],
    sections: [
      {
        title: "Workspace rail (left narrow rail)",
        body:
          "The workspace rail lets you switch workspace context fast and open notifications.",
        bullets: [
          "Grid icon opens Home or View All (partner context).",
          "Workspace icons switch tenant or shared brand context.",
          "Plus icon opens workspace creation.",
          "Bell opens Notification Center.",
        ],
      },
      {
        title: "Main sidebar",
        body:
          "The main sidebar is your app module navigation. It also contains workspace account actions.",
        bullets: [
          "Dashboard, Assets, Products, Updates are the core modules.",
          "Collapse/expand state is remembered per workspace.",
          "Workspace menu includes Settings and invite/member actions (role based).",
        ],
      },
      {
        title: "Page header and scope toolbar",
        body:
          "On list pages, scope controls appear in the header to define active content context.",
        bullets: [
          "Market, Channel, Destination, Language selectors define current view context.",
          "These controls are shown on Assets and Products list views.",
          "Product detail pages keep a compact back header and show scope tools in-page.",
        ],
      },
      {
        title: "Partner view behavior",
        body:
          "If your workspace is partner type, scope and route behavior include brand feed context.",
        bullets: [
          "Routes can include /view/{scope} where scope is all or a brand slug.",
          "Shared brand rows are read-only in combined partner views.",
          "The rail keeps brand switching available without leaving the current module.",
        ],
      },
    ],
  },
  {
    slug: "notification-center",
    title: "Notification Center",
    summary:
      "Track new shared assets, products, grants, and update reminders across brands.",
    category: "Start Here",
    audience: "All users",
    readTime: "3 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/notifications"],
    sections: [
      {
        title: "What appears here",
        body:
          "Notifications aggregate workspace events so teams can act without searching across modules.",
        bullets: [
          "Asset shared events",
          "Product shared events",
          "Share grant changes",
          "Published and reminder update events",
        ],
      },
      {
        title: "Key controls",
        body:
          "The top controls let users narrow feed noise and clear unread indicators.",
        bullets: [
          "Workspace filter limits events to one brand/workspace.",
          "Mark read clears unread state for current filter context.",
          "Each item opens directly to the relevant screen.",
        ],
      },
    ],
  },
  {
    slug: "assets-library",
    title: "Assets Library",
    summary:
      "Manage files, folders, metadata, tagging, product links, and versioned media in the DAM view.",
    category: "Catalog Workflows",
    audience: "DAM users and product teams",
    readTime: "8 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}/assets", "/{workspaceSlug}/view/{scope}/assets"],
    sections: [
      {
        title: "Primary layout",
        body:
          "The Assets page is split into folder navigation, filters, and an asset grid/list view with bulk actions.",
        bullets: [
          "Folder tree supports nested folders and context menu actions.",
          "Filters include search, tags, product links, new/updated time windows, and sorting.",
          "View modes include grid, list, and visual style variants.",
        ],
      },
      {
        title: "Asset panel",
        body:
          "Clicking an asset opens a side panel for deep editing and version operations.",
        bullets: [
          "Edit filename, description, tags, categories, and folder assignment.",
          "Open share dialog for public link controls and download permissions.",
          "Link or unlink products.",
          "Review metadata and permissions.",
          "Upload new file versions, inspect history, and restore older versions.",
        ],
      },
      {
        title: "Bulk actions",
        body:
          "Selection mode activates a fixed toolbar for cross-asset operations.",
        bullets: [
          "Bulk edit metadata fields",
          "Tag, move, delete, or share selected items",
          "Clear selection quickly from the floating toolbar",
        ],
      },
      {
        title: "Set membership from assets",
        body:
          "You can add selected assets/folders to reusable sets directly from DAM.",
        steps: [
          "Select assets or folders.",
          "Choose Share/Add to Set action.",
          "Select existing set or create inline.",
          "Optionally apply market/channel/locale constraints.",
          "Confirm Add To Set.",
        ],
      },
    ],
  },
  {
    slug: "asset-upload-workflow",
    title: "Asset Upload Workflow",
    summary:
      "Upload at scale with profiles, inline metadata, product-link suggestions, and bulk editor controls.",
    category: "Catalog Workflows",
    audience: "DAM users",
    readTime: "7 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}/assets/upload"],
    sections: [
      {
        title: "Upload queue model",
        body:
          "Every file enters a queue row where metadata can be edited before upload.",
        bullets: [
          "Status states: pending, uploading, completed, failed.",
          "Rows can include title, description, tags, categories, keywords, scope, and product links.",
          "Validation column blocks upload when required profile fields are missing.",
        ],
      },
      {
        title: "Upload profiles",
        body:
          "Profiles control required metadata and validation strictness.",
        bullets: [
          "Fast Upload: title only",
          "Standard DAM: title, tags, product link, usage group",
          "Compliance: adds description requirement",
        ],
      },
      {
        title: "Automation and suggestions",
        body:
          "The uploader can infer product links and usage groups from filename/tags and apply dynamic set rules.",
        bullets: [
          "Suggested product links include confidence labels.",
          "Usage group suggestions are keyword driven.",
          "Phase 5 set rules can auto-assign uploaded assets to matching sets.",
        ],
      },
      {
        title: "Bulk editor in upload queue",
        body:
          "Use bulk editor to apply metadata and scope to many queued assets.",
        bullets: [
          "Supports append/replace/clear operations for tags/categories/keywords.",
          "Can replace or clear product link selections.",
          "Can set/add/clear authoring scope in one operation.",
          "Includes undo snapshot for last bulk update.",
        ],
      },
    ],
  },
  {
    slug: "products-and-variants",
    title: "Products Catalog",
    summary:
      "Use the Products table to search, filter, sort, create products, and manage catalog status at scale.",
    category: "Catalog Workflows",
    audience: "PIM users",
    readTime: "7 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}/products", "/{workspaceSlug}/view/{scope}/products"],
    sections: [
      {
        title: "Table controls",
        body:
          "The Products table is the main listing surface for parent, standalone, and variant records.",
        bullets: [
          "Search by name, SKU, SCIN, or barcode.",
          "Filter by status and product model.",
          "Filter by scope coverage: all, in current scope, missing in scope.",
          "Sort by key columns (status, name, identifiers, model, score).",
        ],
      },
      {
        title: "Hierarchy behavior",
        body:
          "Variant hierarchy can be shown inline with parent rows and quick expansion controls.",
        bullets: [
          "Parent rows can expand to inline variants.",
          "Special view-all variant row opens full variant section.",
          "Variant axis chips appear in variant rows.",
        ],
      },
      {
        title: "Creation flow",
        body:
          "The Add Product modal creates a product in the selected model and optionally sets initial authoring scope.",
        steps: [
          "Open Add Product.",
          "Enter product name, optional SKU, model, and status.",
          "Optionally set initial authoring scope.",
          "Create and redirect to product detail.",
        ],
      },
      {
        title: "Bulk and set operations",
        body:
          "Selected products can be added to product sets and updated in scope batches.",
        bullets: [
          "Share selected adds products/variants to a product set.",
          "Bulk scope operation supports set/add/clear.",
          "Shared brand rows are read-only in partner feed contexts.",
        ],
      },
    ],
  },
  {
    slug: "product-detail-editor",
    title: "Product And Variant Detail Editor",
    summary:
      "Edit scoped product content, manage media slots, translations, completeness, and variant structures.",
    category: "Catalog Workflows",
    audience: "PIM and content teams",
    readTime: "10 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/products/{productId}",
      "/{workspaceSlug}/products/{productId}/variants/{variantId}",
    ],
    sections: [
      {
        title: "Section navigation",
        body:
          "Detail screens are organized into system sections and field-group sections.",
        bullets: [
          "System sections include attributes, variants/media, and product settings.",
          "Field-group sections map to your configured attribute groups.",
          "Required and missing views help completion workflows.",
        ],
      },
      {
        title: "Scoped editing model",
        body:
          "Edits apply to active market/channel/language/destination scope when edit mode is enabled.",
        bullets: [
          "Scope toolbar defines current write context.",
          "Authoring scope rules can block out-of-scope editing.",
          "Some system fields are immutable (example: SCIN).",
        ],
      },
      {
        title: "Media and documentation slots",
        body:
          "Products can map assets into predefined image and document slots.",
        bullets: [
          "Assign existing assets or upload directly to slots.",
          "Track slot-level version history and restore prior versions.",
          "Use dedicated slots for front/back/hero and compliance documents.",
        ],
      },
      {
        title: "Variant management",
        body:
          "Parent products manage variant structures and axis values in inline tables.",
        bullets: [
          "Convert standalone products into parent structures when variants are added.",
          "Variant detail supports inheritance with optional child overrides.",
          "Variant axis fields are maintained at parent level.",
        ],
      },
      {
        title: "Translation support",
        body:
          "When enabled, product detail can launch Translation panel for selected locale workflows.",
        bullets: [
          "Review generated suggestions before apply.",
          "Track localization eligibility and write-assist availability.",
        ],
      },
    ],
  },
  {
    slug: "partner-updates",
    title: "Partner Updates",
    summary:
      "Draft, build, audience-target, publish, and analyze update campaigns with kit attachments.",
    category: "Collaboration",
    audience: "Brand teams and partner recipients",
    readTime: "9 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/updates",
      "/{workspaceSlug}/updates/{updateId}",
      "/{workspaceSlug}/view/{scope}/updates",
    ],
    sections: [
      {
        title: "Brand-side list and create",
        body:
          "The Updates list supports status filtering and creation of new updates.",
        bullets: [
          "Status filters: draft, scheduled, published, archived, canceled.",
          "Create dialog captures title, urgency, summary, and optional due date.",
        ],
      },
      {
        title: "Composer workflow",
        body:
          "Update detail follows a staged workflow: compose, build, audience, review, analytics.",
        bullets: [
          "Compose rich message body and labels.",
          "Attach kit items (product, asset, URL, text blocks).",
          "Build email/social templates with selected assets.",
          "Set delivery mode (partners, share link, or both).",
        ],
      },
      {
        title: "Publish and share controls",
        body:
          "Updates can go live immediately or by schedule, with optional public share links.",
        bullets: [
          "Schedule requires a datetime value.",
          "Share links can be regenerated and have expiry.",
          "Partner reminders can be sent post-publish.",
        ],
      },
      {
        title: "Recipient experience",
        body:
          "Partners consume updates in /view scope and can acknowledge or activate actionable updates.",
        bullets: [
          "Recipient status tracks opened, acknowledged, and activated states.",
          "Kit contents are visible in partner detail view.",
          "Informational updates may not require acknowledge actions.",
        ],
      },
    ],
  },
  {
    slug: "team-and-invites",
    title: "Team, Partners, And Invite Wizard",
    summary:
      "Invite internal users or partners with role, module-level permissions, and scope defaults.",
    category: "Collaboration",
    audience: "Owners and admins",
    readTime: "8 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings/team",
      "/{workspaceSlug}/settings/team/invite",
      "/{workspaceSlug}/settings/team/partners",
    ],
    sections: [
      {
        title: "Team page capabilities",
        body:
          "Team settings combine member list, pending invitations, and scoped permission controls.",
        bullets: [
          "Copy invitation links and delete pending invites.",
          "Apply market-scoped DAM and PIM permissions to members.",
          "Manage collection/set-level DAM grants when enabled.",
        ],
      },
      {
        title: "Invite wizard",
        body:
          "The wizard standardizes invitation setup in four steps: who, access, scope, review.",
        steps: [
          "Choose invitee email and baseline role/access level.",
          "Set module levels (products, assets, share links).",
          "Assign global market scope and optional sets.",
          "Review and send invite.",
        ],
      },
      {
        title: "Partner relationship management",
        body:
          "Partner detail page controls relationship status and set assignments for each partner org.",
        bullets: [
          "Adjust relationship access level (view/edit).",
          "Suspend, restore, or revoke partner relationship.",
          "Assign or revoke specific asset/product sets per partner.",
        ],
      },
    ],
  },
  {
    slug: "settings-organization-and-models",
    title: "Settings: Organization, Product Families, Attribute Groups, Product Fields",
    summary:
      "Design the core product architecture that controls product creation, variant behavior, validation, and downstream publishing quality.",
    category: "Settings And Admin",
    audience: "Admins and product operations",
    readTime: "14 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings",
      "/{workspaceSlug}/settings/product-models",
      "/{workspaceSlug}/settings/field-groups",
      "/{workspaceSlug}/settings/product-fields",
      "/{workspaceSlug}/products/{productId}",
    ],
    sections: [
      {
        title: "Why this setup is critical",
        body:
          "Product setup is your catalog foundation. If product families, attribute groups, and product fields are inconsistent, teams create duplicate data, miss required content, and publish incorrect records to channels.",
        bullets: [
          "Design your structure before bulk imports and partner sharing.",
          "Treat model/group/field design as source-of-truth architecture, not UI configuration.",
          "Lock naming conventions early to avoid migration and retraining costs.",
        ],
      },
      {
        title: "Dedicated deep dive guides",
        body:
          "Use these standalone guides when you need implementation-level details for each setup layer.",
        bullets: [
          "Product Families (Product Models): /help/product-families",
          "Attribute Groups: /help/attribute-groups",
          "Product Fields: /help/product-fields",
        ],
      },
      {
        title: "Organization baseline",
        body:
          "Organization settings stores identity metadata used across workspace UI, sharing, and recipient-facing touchpoints.",
        bullets: [
          "Set organization name, website, and description to align internal and external references.",
          "Upload logo with validated format and size so shared pages and workspace shell render correctly.",
        ],
      },
      {
        title: "Product families (configured as Product Models)",
        body:
          "In Stackcess, product families are configured using Product Models. A model should represent one repeatable product architecture with consistent required data and variant logic.",
        bullets: [
          "Create a separate family/model when required fields or variant axes are meaningfully different (example: apparel vs appliances).",
          "Avoid creating too many families; prefer one model per true structural pattern, not per campaign or season.",
          "Define whether the family is typically standalone, parent/variant, or mixed before users start creating products.",
          "Use clear model names tied to operational ownership (example: Footwear Core, Hardgoods Core).",
          "Validate model coverage with real sample SKUs before broad rollout.",
        ],
      },
      {
        title: "Attribute group design",
        body:
          "Attribute groups control how the product editor is segmented. Good grouping improves completion speed, review quality, and onboarding for new users.",
        bullets: [
          "Group by workflow intent: merchandising, compliance, logistics, digital merchandising, channel overrides.",
          "Keep group names task-oriented so users know where to edit without searching.",
          "Place high-frequency fields in early groups and low-frequency or specialist fields later.",
          "Use stable groups across families where possible to reduce context switching for editors.",
          "Respect locked/system groups (example: basic info, documentation) and design around them instead of duplicating fields.",
        ],
      },
      {
        title: "Product fields (attribute schema) deep guide",
        body:
          "Product fields define your data contract. Every field should have a clear owner, validation rule, and publishing purpose.",
        bullets: [
          "Use the narrowest field type that fits the requirement (identifier, measurement, select, media, table, boolean, text).",
          "Mark fields as required only when missing values should block completion or publishing.",
          "Apply uniqueness only to true business identifiers (for example global or family-level SKU rules).",
          "Enable localization only for content that actually changes by locale; avoid localizing technical fields.",
          "For select-like fields, define controlled value lists and governance for adding new options.",
          "Write field descriptions and examples so users understand expected format and business meaning.",
          "Separate canonical source fields from computed or downstream export-only fields.",
        ],
      },
      {
        title: "Scope, localization, and channel rules",
        body:
          "Field-level scope settings determine where data can be edited and published. This is essential for multi-market and multi-channel operations.",
        bullets: [
          "Restrict fields to relevant channels/markets/locales when values should differ by endpoint.",
          "Keep global master data fields scope-agnostic where possible to reduce maintenance.",
          "Use channel-aware fields for requirements that are truly destination-specific (example: marketplace bullets).",
          "Test one sample product across at least two market/channel scopes before launch.",
          "Document fallback behavior for missing scoped values to avoid silent publish failures.",
        ],
      },
      {
        title: "Recommended setup sequence",
        body:
          "Follow this sequence to reduce rework and keep data migration risk low.",
        steps: [
          "Confirm business outcomes and channel requirements for each product family.",
          "Create Product Models (families) and define variant strategy for each.",
          "Create Attribute Groups in the intended editor order.",
          "Create Product Fields with final type, required/unique rules, and descriptions.",
          "Attach fields to groups and validate section flow in product detail screens.",
          "Configure market/channel/locale restrictions for scoped fields.",
          "Create sample products and run completeness QA with real users.",
          "Freeze architecture, then begin import/migration and team training.",
        ],
      },
      {
        title: "Governance after go-live",
        body:
          "Post-launch changes to families, groups, and fields should follow change control to prevent catalog regressions.",
        bullets: [
          "Require admin review for field type changes and required-flag changes.",
          "Version and document schema decisions before changing live models.",
          "Run impact checks on integrations, exports, and validation workflows before release.",
          "Prefer additive changes first; deprecate old fields before hard removal.",
          "Schedule recurring audits for unused fields, duplicate fields, and low-quality values.",
        ],
      },
    ],
  },
  {
    slug: "product-families",
    title: "Product Families (Product Models)",
    summary:
      "Build durable product family architecture so every product starts with the right structure, variant logic, and required data.",
    category: "Settings And Admin",
    audience: "PIM admins and catalog leads",
    readTime: "10 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings/product-models",
      "/{workspaceSlug}/products",
      "/{workspaceSlug}/products/{productId}",
    ],
    sections: [
      {
        title: "What a product family controls",
        body:
          "In Stackcess, product families are implemented as Product Models. A family controls which fields matter, how variants behave, and which completeness checks are realistic for a class of products.",
        bullets: [
          "Families define product shape, not campaign or season structure.",
          "Family design impacts onboarding speed, import mapping, and publish quality.",
          "One poorly designed family can create repeated data cleanup across all channels.",
        ],
      },
      {
        title: "Family boundary decision framework",
        body:
          "Create a new family only when structural differences are real and persistent. Over-splitting families creates admin overhead and inconsistent data.",
        bullets: [
          "Split when required fields are substantially different.",
          "Split when variant axes differ (example: size/color vs capacity/voltage).",
          "Split when compliance requirements differ by category.",
          "Do not split solely for merchandising teams, temporary launches, or partner-specific exports.",
        ],
      },
      {
        title: "Variant strategy per family",
        body:
          "Define parent/variant behavior before teams create records. This prevents rework when converting standalone records into variant structures later.",
        bullets: [
          "Identify parent-only fields versus variant-level fields early.",
          "Keep axis definitions stable and business-meaningful (size, color, finish, pack count).",
          "Document inheritance expectations so editors know when overrides are allowed.",
          "Validate a sample parent plus three variants before launch.",
        ],
      },
      {
        title: "Family launch checklist",
        body:
          "Before enabling a new family for broad use, run this checklist with product ops and channel stakeholders.",
        steps: [
          "Define family scope and in-scope product examples.",
          "Confirm required fields and identifier strategy.",
          "Map field groups and editor order for daily workflows.",
          "Test completeness in at least two market/channel contexts.",
          "Approve migration/import mapping and train editors.",
        ],
      },
      {
        title: "Change management for live families",
        body:
          "Treat live family changes as controlled releases. Field or axis changes can affect exports, integrations, and partner consumption.",
        bullets: [
          "Prefer additive changes over destructive edits.",
          "Deprecate and migrate old fields before removal.",
          "Run impact checks on integrations and templates before publishing schema changes.",
          "Maintain a family version log for auditability.",
        ],
      },
    ],
  },
  {
    slug: "attribute-groups",
    title: "Attribute Groups: Editor Structure And Governance",
    summary:
      "Design attribute groups that mirror real workflows so product detail editing is fast, complete, and consistent across teams.",
    category: "Settings And Admin",
    audience: "PIM admins and content operations",
    readTime: "9 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings/field-groups",
      "/{workspaceSlug}/products/{productId}",
    ],
    sections: [
      {
        title: "Why groups matter",
        body:
          "Attribute groups are not just visual sections. They define how editors navigate the product page, which affects completion rates and error frequency.",
        bullets: [
          "Strong grouping reduces search time and duplicate edits.",
          "Weak grouping causes hidden required fields and inconsistent values.",
          "Group design should align to job roles and review workflows.",
        ],
      },
      {
        title: "Recommended group taxonomy",
        body:
          "Use a stable group pattern that teams can recognize across families.",
        bullets: [
          "Core Identity: product name, identifiers, brand-level basics.",
          "Merchandising: customer-facing copy and discovery fields.",
          "Technical/Specifications: measurable and factual product data.",
          "Compliance/Regulatory: required legal and safety content.",
          "Media/Documentation: imagery and supporting files.",
          "Channel Overrides: destination-specific values.",
        ],
      },
      {
        title: "Group ordering and section design",
        body:
          "Order groups by frequency and criticality. Editors should encounter high-value required fields early.",
        bullets: [
          "Put high-frequency, high-risk fields near the top.",
          "Keep low-frequency specialist fields in later groups.",
          "Avoid deeply fragmented groups with only one or two unrelated fields.",
          "Use clear, operational names instead of internal project language.",
        ],
      },
      {
        title: "Shared vs family-specific groups",
        body:
          "Reuse groups where families share workflow shape, but allow family-specific groups when structural needs differ.",
        bullets: [
          "Shared groups reduce training overhead and improve consistency.",
          "Family-specific groups are justified for unique technical or compliance requirements.",
          "Document ownership for each group so schema decisions have accountable approvers.",
        ],
      },
      {
        title: "Governance and maintenance",
        body:
          "Group structures should be reviewed on a cadence, especially after large imports or channel expansions.",
        steps: [
          "Audit fields per group for usage and quality issues.",
          "Merge duplicate or low-value groups where possible.",
          "Check required-field completion rates by section.",
          "Re-sequence groups when workflow bottlenecks are identified.",
          "Communicate changes with release notes for editors and reviewers.",
        ],
      },
    ],
  },
  {
    slug: "product-fields",
    title: "Product Fields: Types, Validation, Scope, And Quality",
    summary:
      "Define product fields as a strict data contract with clear validation, localization, and channel scope rules.",
    category: "Settings And Admin",
    audience: "PIM admins, data stewards, and integration leads",
    readTime: "12 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings/product-fields",
      "/{workspaceSlug}/products/{productId}",
      "/{workspaceSlug}/products/{productId}/variants/{variantId}",
    ],
    sections: [
      {
        title: "Field definition checklist",
        body:
          "Every new product field should be created with a documented purpose and lifecycle owner.",
        bullets: [
          "Business purpose: why this field exists and who consumes it.",
          "Data type and format: exact value shape and examples.",
          "Ownership: who approves value standards and change requests.",
          "Required/optional state and publish impact when empty.",
          "Scope rules: global versus market/channel/locale specific.",
        ],
      },
      {
        title: "Choosing the right field type",
        body:
          "Use the most constrained field type available so validation can prevent bad data at entry time.",
        bullets: [
          "Identifier fields for SKUs, GTINs, and other controlled IDs.",
          "Measurement fields for numeric values with unit expectations.",
          "Select or enum fields for controlled vocabularies.",
          "Table/structured fields for repeatable spec blocks.",
          "Media/document fields for slot-based asset attachments.",
          "Text fields for narrative content with length guidance.",
        ],
      },
      {
        title: "Validation and uniqueness strategy",
        body:
          "Validation should reflect business-critical constraints without over-blocking editorial workflows.",
        bullets: [
          "Apply required only where missing values should block completion.",
          "Use uniqueness for true identifiers, not descriptive text.",
          "Define min/max length and format expectations for text-like fields.",
          "Use controlled options for fields that drive filters and exports.",
          "Plan fallback behavior for empty optional fields in downstream feeds.",
        ],
      },
      {
        title: "Scope, localization, and channel behavior",
        body:
          "Field scope decisions determine where values can vary and who can edit them.",
        bullets: [
          "Keep core master data global unless variation is necessary.",
          "Use localized fields only for translatable customer-facing content.",
          "Use channel-aware fields for destination-specific requirements.",
          "Restrict markets/channels/locales when values are not universally valid.",
          "Test for missing scoped values before enabling publish automation.",
        ],
      },
      {
        title: "Quality controls and rollout",
        body:
          "Schema quality is maintained by testing and monitoring, not one-time setup.",
        steps: [
          "Create test records for each family and variant pattern.",
          "Run completeness checks in all target market/channel contexts.",
          "Validate integration/export payloads for new or changed fields.",
          "Monitor rejection and validation error patterns after launch.",
          "Audit stale, duplicate, or low-population fields quarterly.",
        ],
      },
    ],
  },
  {
    slug: "settings-markets-localization",
    title: "Settings: Markets, Localization, Channels, Destinations",
    summary:
      "Control content distribution context and language workflows across regions and endpoints.",
    category: "Settings And Admin",
    audience: "Admins and localization managers",
    readTime: "9 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/settings/markets",
      "/{workspaceSlug}/settings/localization",
      "/{workspaceSlug}/settings/channels",
      "/{workspaceSlug}/settings/destinations",
    ],
    sections: [
      {
        title: "Markets",
        body:
          "Markets define regional containers with default locale, currency, and timezone.",
        bullets: [
          "Create market records with optional default flag.",
          "Inspect assigned locale list and market defaults in detail panel.",
        ],
      },
      {
        title: "Channels and destinations",
        body:
          "Channels define publishing lanes; destinations define concrete endpoints within lane/market context.",
        bullets: [
          "Enable/disable channels and destinations without deleting history.",
          "Destination records can include market and channel bindings.",
        ],
      },
      {
        title: "Localization defaults",
        body:
          "Default localization settings drive translation behavior for the whole workspace.",
        bullets: [
          "Enable/disable translation and write assist.",
          "Set preferred tone and default glossary.",
          "Store brand writing instructions used in AI context.",
        ],
      },
      {
        title: "Glossaries and activity",
        body:
          "Glossaries manage source-target terminology pairs; activity tracks translation jobs and review states.",
        bullets: [
          "Create glossary with source/target locales and entry rows.",
          "Update entries in detail mode and sync provider glossary identifiers.",
          "Activity view tracks queued, running, review, applied, and failed items.",
        ],
      },
    ],
  },
  {
    slug: "settings-sets-sharing",
    title: "Settings: Sets, Rules, And Partner Assignments",
    summary:
      "Build reusable asset/product sets, define dynamic rules, and assign partner access with precision.",
    category: "Settings And Admin",
    audience: "Admins and collaboration managers",
    readTime: "8 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}/settings/sets"],
    sections: [
      {
        title: "Sets workflow",
        body:
          "The Sets page follows a staged process from creation to partner assignment.",
        steps: [
          "Create set (assets or products).",
          "Select active set.",
          "Manage membership in Assets or Products modules.",
          "Define dynamic rules.",
          "Assign set access to partners.",
        ],
      },
      {
        title: "Dynamic rules",
        body:
          "Rules allow auto-inclusion/exclusion by tags, folders, usage groups, and product criteria.",
        bullets: [
          "Asset rules can include/exclude by tags and folders.",
          "Product rules can include/exclude by model and name contains values.",
          "Rule priority controls evaluation order.",
        ],
      },
      {
        title: "Partner assignments",
        body:
          "Each set can be granted to active partner organizations with view/edit access.",
        bullets: [
          "Assign partner and access level per set.",
          "Revoke active grants without deleting the set.",
          "Use set grants alongside market/module permissions for least privilege.",
        ],
      },
    ],
  },
  {
    slug: "billing-and-usage",
    title: "Billing And Usage",
    summary:
      "Track plan status, usage limits, and upgrade paths from the billing workspace controls.",
    category: "Settings And Admin",
    audience: "Workspace owners and finance admins",
    readTime: "4 min",
    updatedAt: "March 14, 2026",
    appPaths: ["/{workspaceSlug}/settings/billing"],
    sections: [
      {
        title: "Current subscription panel",
        body:
          "Shows active plan, billing status, and period windows for the organization.",
      },
      {
        title: "Usage meters",
        body:
          "Usage cards compare current values against plan limits.",
        bullets: [
          "Active SKUs",
          "Storage usage (GB)",
          "Internal user count",
          "Partner invite count",
          "Included translated characters",
        ],
      },
      {
        title: "Plan options and portal",
        body:
          "Plan cards summarize pricing/features and route plan changes through billing portal.",
        bullets: [
          "Manage current plan from portal action.",
          "Upgrade from plan cards with portal redirect.",
          "Partner signup source flow can show workspace upgrade banner.",
        ],
      },
    ],
  },
  {
    slug: "partner-workspace-views",
    title: "Partner Workspace Views",
    summary:
      "Understand /view scope behavior for partner teams consuming brand-shared catalogs and updates.",
    category: "Collaboration",
    audience: "Partner users and brand enablement teams",
    readTime: "5 min",
    updatedAt: "March 14, 2026",
    appPaths: [
      "/{workspaceSlug}/view/all",
      "/{workspaceSlug}/view/{brandSlug}/products",
      "/{workspaceSlug}/view/{brandSlug}/assets",
    ],
    sections: [
      {
        title: "Scope types",
        body:
          "Partner view routes support all-brands and single-brand scopes while keeping a shared workspace shell.",
        bullets: [
          "all scope aggregates feeds from connected brands.",
          "brand scope isolates one brand feed in products/assets/updates.",
        ],
      },
      {
        title: "Read-only behavior",
        body:
          "Records shared from brands remain read-only where applicable to protect source-of-truth ownership.",
        bullets: [
          "Shared brand rows are not editable in partner mixed views.",
          "Partner-owned records in self context remain editable if role permits.",
        ],
      },
      {
        title: "Partner home",
        body:
          "Partner home dashboard highlights required actions and recent shared content.",
        bullets: [
          "Updates requiring action with urgency prioritization.",
          "New shared assets and products.",
          "Acknowledged/activated progress indicators.",
        ],
      },
    ],
  },
];

export function getHelpArticleBySlug(slug: string): HelpArticle | undefined {
  return helpArticles.find((article) => article.slug === slug);
}

export function getHelpCategories(): Array<{ category: string; articles: HelpArticle[] }> {
  const grouped = new Map<string, HelpArticle[]>();
  for (const article of helpArticles) {
    const existing = grouped.get(article.category) || [];
    existing.push(article);
    grouped.set(article.category, existing);
  }

  return Array.from(grouped.entries()).map(([category, articles]) => ({
    category,
    articles,
  }));
}
