import { put, list, del } from '@vercel/blob'

type WorksData = {
  groups: unknown[]
}

export default async function handler(req: Request): Promise<Response> {
  const pathname = 'gogol-works-data.json'

  if (req.method === 'GET') {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return Response.json({ error: 'not configured' }, { status: 404 })
      }
      const result = await list({ prefix: pathname })
      const blob = result.blobs.find((item) => item.pathname === pathname)
      if (!blob) {
        return Response.json({ error: 'not found' }, { status: 404 })
      }
      const data = await fetch(blob.url).then((response) => response.json())
      return Response.json(data)
    } catch {
      return Response.json({ error: 'not found' }, { status: 404 })
    }
  }

  if (req.method === 'PUT') {
    const password = req.headers.get('x-admin-password')
    const expected = process.env.ADMIN_PASSWORD || 'gogol-admin'
    if (password !== expected) {
      return Response.json({ error: 'unauthorized' }, { status: 401 })
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return Response.json({ error: 'blob not configured' }, { status: 503 })
    }

    const body = (await req.json()) as WorksData
    // Remove old versions with same logical name if needed
    try {
      const existing = await list({ prefix: pathname })
      await Promise.all(existing.blobs.map((blob) => del(blob.url)))
    } catch {
      // ignore cleanup errors
    }

    await put(pathname, JSON.stringify(body, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    })

    return Response.json({ ok: true })
  }

  return Response.json({ error: 'method not allowed' }, { status: 405 })
}
