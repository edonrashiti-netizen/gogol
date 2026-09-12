import type { WorksData } from '../types/works'

const STORAGE_KEY = 'gogol-works-data-v2'
const AUTH_KEY = 'gogol-admin-auth'

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'gogol-admin'

export function isAdminAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setAdminAuthenticated(value: boolean) {
  if (value) sessionStorage.setItem(AUTH_KEY, '1')
  else sessionStorage.removeItem(AUTH_KEY)
}

async function fetchPublished(): Promise<WorksData> {
  try {
    const live = await fetch('/api/works', { cache: 'no-store' })
    if (live.ok) return (await live.json()) as WorksData
  } catch {
    // fall through to static file
  }

  const response = await fetch('/works-data.json', { cache: 'no-store' })
  if (!response.ok) return { groups: [] }
  return (await response.json()) as WorksData
}

export async function loadWorksData(): Promise<WorksData> {
  if (isAdminAuthenticated()) {
    const local = localStorage.getItem(STORAGE_KEY)
    if (local) {
      try {
        return JSON.parse(local) as WorksData
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }
  return fetchPublished()
}

export function saveWorksDataLocal(data: WorksData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export async function publishWorksData(data: WorksData, password: string) {
  saveWorksDataLocal(data)

  const response = await fetch('/api/works', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': password,
    },
    body: JSON.stringify(data),
  })

  if (response.status === 503) {
    return { ok: false as const, reason: 'blob' as const }
  }
  if (!response.ok) {
    return { ok: false as const, reason: 'error' as const }
  }
  return { ok: true as const }
}

export function clearLocalWorksData() {
  localStorage.removeItem(STORAGE_KEY)
}

export function downloadWorksData(data: WorksData) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'works-data.json'
  anchor.click()
  URL.revokeObjectURL(url)
}
