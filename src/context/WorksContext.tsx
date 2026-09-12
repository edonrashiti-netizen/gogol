import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  ADMIN_PASSWORD,
  clearLocalWorksData,
  downloadWorksData,
  loadWorksData,
  publishWorksData,
  saveWorksDataLocal,
} from '../lib/worksStorage'
import { createId, slugify, type WorkGroup, type WorkItem, type WorksData } from '../types/works'

type WorksContextValue = {
  data: WorksData
  loading: boolean
  getGroupBySlug: (slug: string) => WorkGroup | undefined
  addGroup: (input: { name: string; description: string; coverImage: string }) => void
  updateGroup: (
    id: string,
    input: { name: string; description: string; coverImage: string; slug: string },
  ) => void
  deleteGroup: (id: string) => void
  addItem: (
    groupId: string,
    input: { title: string; description: string; website: string; image?: string },
  ) => void
  updateItem: (
    groupId: string,
    itemId: string,
    input: { title: string; description: string; website: string; image?: string },
  ) => void
  deleteItem: (groupId: string, itemId: string) => void
  exportData: () => void
  publishData: () => Promise<{ ok: boolean; reason?: 'blob' | 'error' }>
  resetToPublished: () => Promise<void>
  reload: () => Promise<void>
}

const WorksContext = createContext<WorksContextValue | null>(null)

export function WorksProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WorksData>({ groups: [] })
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    const loaded = await loadWorksData()
    setData(loaded)
    setLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  const persist = useCallback((next: WorksData) => {
    setData(next)
    saveWorksDataLocal(next)
  }, [])

  const getGroupBySlug = useCallback(
    (slug: string) => data.groups.find((group) => group.slug === slug),
    [data.groups],
  )

  const addGroup = useCallback(
    (input: { name: string; description: string; coverImage: string }) => {
      const baseSlug = slugify(input.name) || 'group'
      let slug = baseSlug
      let i = 2
      while (data.groups.some((group) => group.slug === slug)) {
        slug = `${baseSlug}-${i}`
        i += 1
      }
      const group: WorkGroup = {
        id: createId(),
        name: input.name.trim(),
        slug,
        description: input.description.trim(),
        coverImage: input.coverImage.trim(),
        items: [],
      }
      persist({ groups: [...data.groups, group] })
    },
    [data.groups, persist],
  )

  const updateGroup = useCallback(
    (
      id: string,
      input: { name: string; description: string; coverImage: string; slug: string },
    ) => {
      const slug = slugify(input.slug) || slugify(input.name) || 'group'
      if (data.groups.some((group) => group.slug === slug && group.id !== id)) {
        throw new Error('Slug already exists')
      }
      persist({
        groups: data.groups.map((group) =>
          group.id === id
            ? {
                ...group,
                name: input.name.trim(),
                description: input.description.trim(),
                coverImage: input.coverImage.trim(),
                slug,
              }
            : group,
        ),
      })
    },
    [data.groups, persist],
  )

  const deleteGroup = useCallback(
    (id: string) => {
      persist({ groups: data.groups.filter((group) => group.id !== id) })
    },
    [data.groups, persist],
  )

  const addItem = useCallback(
    (
      groupId: string,
      input: { title: string; description: string; website: string; image?: string },
    ) => {
      const item: WorkItem = {
        id: createId(),
        title: input.title.trim(),
        description: input.description.trim(),
        website: input.website.trim(),
        image: input.image?.trim() || undefined,
      }
      persist({
        groups: data.groups.map((group) =>
          group.id === groupId ? { ...group, items: [...group.items, item] } : group,
        ),
      })
    },
    [data.groups, persist],
  )

  const updateItem = useCallback(
    (
      groupId: string,
      itemId: string,
      input: { title: string; description: string; website: string; image?: string },
    ) => {
      persist({
        groups: data.groups.map((group) =>
          group.id === groupId
            ? {
                ...group,
                items: group.items.map((item) =>
                  item.id === itemId
                    ? {
                        ...item,
                        title: input.title.trim(),
                        description: input.description.trim(),
                        website: input.website.trim(),
                        image: input.image?.trim() || undefined,
                      }
                    : item,
                ),
              }
            : group,
        ),
      })
    },
    [data.groups, persist],
  )

  const deleteItem = useCallback(
    (groupId: string, itemId: string) => {
      persist({
        groups: data.groups.map((group) =>
          group.id === groupId
            ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
            : group,
        ),
      })
    },
    [data.groups, persist],
  )

  const exportData = useCallback(() => {
    downloadWorksData(data)
  }, [data])

  const publishData = useCallback(async () => {
    return publishWorksData(data, ADMIN_PASSWORD)
  }, [data])

  const resetToPublished = useCallback(async () => {
    clearLocalWorksData()
    await reload()
  }, [reload])

  const value = useMemo(
    () => ({
      data,
      loading,
      getGroupBySlug,
      addGroup,
      updateGroup,
      deleteGroup,
      addItem,
      updateItem,
      deleteItem,
      exportData,
      publishData,
      resetToPublished,
      reload,
    }),
    [
      data,
      loading,
      getGroupBySlug,
      addGroup,
      updateGroup,
      deleteGroup,
      addItem,
      updateItem,
      deleteItem,
      exportData,
      publishData,
      resetToPublished,
      reload,
    ],
  )

  return <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
}

export function useWorks() {
  const ctx = useContext(WorksContext)
  if (!ctx) throw new Error('useWorks must be used within WorksProvider')
  return ctx
}
