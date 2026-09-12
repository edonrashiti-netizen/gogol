import { seedWorksData } from '../data/seedWorks'
import { normalizeWorksData, type WorksData } from '../types/works'

const STORAGE_KEY = 'gogol-works-data-v3'
const AUTH_KEY = 'gogol-admin-auth'

export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'gogol-admin'

export function isAdminAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function setAdminAuthenticated(value: boolean) {
  if (value) sessionStorage.setItem(AUTH_KEY, '1')
  else sessionStorage.removeItem(AUTH_KEY)
}

async function fetchWithTimeout(url: string, ms = 4000): Promise<Response> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { cache: 'no-store', signal: controller.signal })
  } finally {
    window.clearTimeout(timer)
  }
}

async function fetchPublished(): Promise<WorksData> {
  try {
    const response = await fetchWithTimeout('/works-data.json')
    if (response.ok) {
      const data = normalizeWorksData(await response.json())
      if (data.groups.length > 0) return data
    }
  } catch {
    // use seed
  }
  return normalizeWorksData(seedWorksData)
}

export async function loadWorksData(): Promise<WorksData> {
  try {
    if (isAdminAuthenticated()) {
      const local = localStorage.getItem(STORAGE_KEY)
      if (local) {
        try {
          return normalizeWorksData(JSON.parse(local))
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    }
    return await fetchPublished()
  } catch {
    return normalizeWorksData(seedWorksData)
  }
}

export function saveWorksDataLocal(data: WorksData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeWorksData(data)))
}

export async function publishWorksData(data: WorksData, password: string) {
  const normalized = normalizeWorksData(data)
  saveWorksDataLocal(normalized)

  try {
    const response = await fetch('/api/works', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify(normalized),
      signal: AbortSignal.timeout(5000),
    })

    if (response.status === 503) {
      return { ok: false as const, reason: 'blob' as const }
    }
    if (!response.ok) {
      return { ok: false as const, reason: 'error' as const }
    }
    return { ok: true as const }
  } catch {
    return { ok: false as const, reason: 'error' as const }
  }
}

export function clearLocalWorksData() {
  localStorage.removeItem(STORAGE_KEY)
}

export function downloadWorksData(data: WorksData) {
  const blob = new Blob([JSON.stringify(normalizeWorksData(data), null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'works-data.json'
  anchor.click()
  URL.revokeObjectURL(url)
}
