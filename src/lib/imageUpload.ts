import { MAX_PROJECT_IMAGES } from '../types/works'

/** Read a file as a resized JPEG data URL to keep storage size reasonable. */
export function fileToDataUrl(file: File, maxWidth = 1600, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read file'))
    reader.onload = () => {
      const src = String(reader.result || '')
      const img = new Image()
      img.onerror = () => reject(new Error('Could not load image'))
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const width = Math.round(img.width * scale)
        const height = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(src)
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = src
    }
    reader.readAsDataURL(file)
  })
}

export async function filesToDataUrls(
  files: FileList | File[],
  currentCount: number,
): Promise<string[]> {
  const remaining = Math.max(0, MAX_PROJECT_IMAGES - currentCount)
  const list = Array.from(files).slice(0, remaining)
  const urls: string[] = []
  for (const file of list) {
    if (!file.type.startsWith('image/')) continue
    urls.push(await fileToDataUrl(file))
  }
  return urls
}
