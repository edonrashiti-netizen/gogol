import { useState } from 'react'

type ProjectGalleryProps = {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0)
  if (images.length === 0) return null

  const multi = images.length > 1
  const safeIndex = ((index % images.length) + images.length) % images.length

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + images.length) % images.length)
  }

  return (
    <div className={`work-page__gallery ${multi ? 'work-page__gallery--multi' : ''}`}>
      <div className="work-page__image">
        <img src={images[safeIndex]} alt={`${title} photo ${safeIndex + 1}`} loading="lazy" />
      </div>

      {multi && (
        <>
          <button
            type="button"
            className="work-page__nav work-page__nav--prev"
            onClick={() => go(-1)}
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            type="button"
            className="work-page__nav work-page__nav--next"
            onClick={() => go(1)}
            aria-label="Next photo"
          >
            →
          </button>
          <div className="work-page__dots" aria-label="Photo position">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === safeIndex ? 'is-active' : undefined}
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
