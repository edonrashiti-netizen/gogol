export type WorkItem = {
  id: string
  title: string
  description: string
  website: string
  image?: string
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
