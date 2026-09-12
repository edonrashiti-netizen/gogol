export type WorkItem = {
  id: string
  title: string
  description: string
  /** Optional. When empty, "Visit website" is hidden. */
  website?: string
  /** Up to 5 image URLs or data URLs. */
  images: string[]
}

export type WorkGroup = {
  id: string
  name: string
  slug: string
  description: string
  coverImage: string
  items: WorkItem[]
}

export type WorksData = {
  groups: WorkGroup[]
}

export const MAX_PROJECT_IMAGES = 5

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createId() {
  return crypto.randomUUID()
}

/** Normalize older data that used a single `image` field. */
export function normalizeWorksData(raw: unknown): WorksData {
  const data = raw as {
    groups?: Array<{
      id: string
      name: string
      slug: string
      description: string
      coverImage: string
      items?: Array<{
        id: string
        title: string
        description: string
        website?: string
        image?: string
        images?: string[]
      }>
    }>
  }

  return {
    groups: (data.groups || []).map((group) => ({
      ...group,
      items: (group.items || []).map((item) => {
        const fromArray = Array.isArray(item.images) ? item.images.filter(Boolean) : []
        const fromSingle = item.image ? [item.image] : []
        const images = (fromArray.length ? fromArray : fromSingle).slice(0, MAX_PROJECT_IMAGES)
        const website = item.website?.trim() || undefined
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          website,
          images,
        }
      }),
    })),
  }
}
