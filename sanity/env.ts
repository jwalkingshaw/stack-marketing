// Environment configuration for Sanity Studio
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID as string
export const dataset = (process.env.SANITY_STUDIO_DATASET || 'production') as string

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID in environment variables. Make sure it\'s defined in .env.local')
}

export default {
  projectId,
  dataset,
}
