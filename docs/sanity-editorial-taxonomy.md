# Sanity Editorial Taxonomy Guide

Last updated: 2026-05-11

Use this guide when creating or editing `/news` posts in Sanity.

## Purpose

Sanity posts now have two structured editorial fields in addition to tags:

- `contentRole`
- `pillarKey`

Use them to manage editorial clusters intentionally instead of relying only on freeform tags.

## Field Definitions

### `contentRole`

Use this to describe what kind of editorial post the article is.

Available values:

- `news`
  - time-sensitive updates
  - trend reactions
  - industry developments
  - company or ecosystem changes

- `spoke`
  - a supporting article inside a broader pillar
  - a narrower explainer, comparison, analysis, or problem post
  - should usually link back to a pillar or major thematic page

- `editorial`
  - broader opinion, analysis, or educational writing that is not clearly a news item and not yet part of a tight pillar structure

### `pillarKey`

Use this to assign the post to a structured editorial cluster.

Available values:

- `product-content-operations`
- `multilingual-content-operations`
- `partner-content-operations`
- `market-execution`
- `compliance-and-launch-operations`
- `european-regulatory-operations`

## How To Use These Fields

### Use `contentRole = news` when:

- the article is primarily about something new that happened
- freshness matters more than long-term cluster support
- it does not need to function as a spoke in a durable hub-and-spoke system

Examples:

- breaking regulatory developments
- market announcements
- industry trend roundups

### Use `contentRole = spoke` when:

- the post supports a broader topic you want Stackcess to own
- the post should connect back to a pillar or major coded page
- the article is a narrow subtopic rather than the main category definition

Examples:

- `What ESSNA Signals About Multi-Market Product Content in Europe`
- `Why Spreadsheets Fail for Supplement Product Content Operations`
- `How to Adapt Supplement Product Copy for Local Markets Without Rewriting Everything`

### Use `contentRole = editorial` when:

- the post is evergreen or analytical
- it does not cleanly fit news
- it is not yet intentionally attached to a pillar as a spoke

Examples:

- broader opinion pieces
- category essays
- educational commentary you may cluster later

## Pillar Key Guidance

### `product-content-operations`

Use for posts about:

- PIM
- DAM
- catalog structure
- variants
- SKUs
- ecommerce content operations
- cross-functional product content workflow
- spreadsheet breakdowns

Examples:

- `Why Spreadsheets Fail for Supplement Product Content Operations`
- `What a Supplement PIM Should Actually Manage`
- `How Approved Assets and Product Data Drift Apart in Growing Brands`

### `multilingual-content-operations`

Use for posts about:

- translation workflow
- localization review
- multilingual product records
- language vs market distinctions
- claims-sensitive localization

Examples:

- `How to Localize Supplement Product Content for New Markets`
- `Why Market-Level Content Breaks When Language Is the Only Localization Layer`

### `partner-content-operations`

Use for posts about:

- distributors
- retailers
- partner portals
- syndication
- approved partner packs
- external content sharing

Examples:

- `What Distributor-Ready Product Content Actually Includes`
- `What Product Content Syndication Means for Brands Selling Through Partners`

### `compliance-and-launch-operations`

Use for posts about:

- launch readiness
- COAs
- support documents
- label-readiness workflow
- operational effects of compliance documentation

Examples:

- `Why Supplement Launches Stall Before Products Are Commercially Ready`
- `How Supplement Brands Manage COAs At Scale`

### `market-execution`

Use for posts about:

- joint business plan execution
- trade or partner activation
- distributor enablement
- retailer activation support
- campaign asset delivery
- partner execution readiness

Examples:

- `Why Joint Business Plans Fail in Execution, Not Alignment`
- `What Distributors Actually Need From Supplement Brands to Activate Faster`
- `How to Share Approved Campaign Assets Without Email Chains`

### `european-regulatory-operations`

Use for posts about:

- ESSNA
- EU market divergence
- European claims pressure
- EU regulatory explainers tied to operating impact
- Europe-specific product content adaptation issues

Examples:

- `What ESSNA Signals About Multi-Market Product Content in Europe`
- `Who Sets Supplement Rules in Europe, and Who Actually Enforces Them?`
- `Why EU Sports Nutrition Rule Changes Create Content Ops Pressure for Brands`

## Current Draft Mapping

Use these values for the current drafts:

| Draft | contentRole | pillarKey |
|---|---|---|
| `What ESSNA Signals About Multi-Market Product Content in Europe` | `spoke` | `european-regulatory-operations` |
| `Why Spreadsheets Fail for Supplement Product Content Operations` | `spoke` | `product-content-operations` |
| `What Distributor-Ready Product Content Actually Includes` | `spoke` | `product-content-operations` |
| `How to Prepare Product Content for Retailers, Distributors, and Ecommerce at the Same Time` | `spoke` | `product-content-operations` |
| `Why Joint Business Plans Fail in Execution, Not Alignment` | `spoke` | `market-execution` |
| `What Distributors Actually Need From Supplement Brands to Activate Faster` | `spoke` | `market-execution` |
| `How to Share Approved Campaign Assets Without Email Chains` | `spoke` | `market-execution` |

The pillar page `How Supplement Brands Manage Product Content Across Markets, Channels, and Partners` is a coded page, not a Sanity post, so it does not need these fields.

## Practical Rules

- Do not use tags as a substitute for `pillarKey`
- Use tags for related concepts, searchability, and lightweight editorial grouping
- Use `pillarKey` for intentional cluster ownership
- Use `contentRole` to tell the system what kind of article it is

## Recommended Default

If you are unsure:

- choose `spoke` if the article clearly supports a broader strategic topic
- choose `editorial` if it is evergreen but not yet attached to a hub
- choose `news` only when recency is central to the article's purpose
