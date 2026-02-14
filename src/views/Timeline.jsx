import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { timelineMonths } from '../data/timeline'
import styles from './Timeline.module.css'

const SECTION_HEIGHT = 100
const CENTER_X = 50
const LEFT_X = 18
const RIGHT_X = 82

function buildSnakePath(count) {
  const points = []
  points.push([CENTER_X, 0])
  for (let i = 0; i < count; i++) {
    const y = (i + 0.5) * SECTION_HEIGHT
    const x = i % 2 === 0 ? LEFT_X : RIGHT_X
    points.push([x, y])
    if (i < count - 1) points.push([CENTER_X, y])
  }
  const lastY = count * SECTION_HEIGHT
  points.push([CENTER_X, lastY])
  const [first, ...rest] = points.map(([x, y]) => `${x},${y}`)
  return `M ${first} L ${rest.join(' L ')}`
}

const snakePath = buildSnakePath(timelineMonths.length)
const totalHeight = timelineMonths.length * SECTION_HEIGHT

export default function Timeline() {
  const navigate = useNavigate()
  const pathRef = useRef(null)
  const sectionRefs = useRef([])
  const [dotPosition, setDotPosition] = useState({ x: CENTER_X, y: 0 })
  const [visibleIndex, setVisibleIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState(() => new Set([0]))
  const [hasScrolled, setHasScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  // Close lightbox on Escape + lock body scroll when open
  useEffect(() => {
    if (!lightboxPhoto) return
    const onKeyDown = (e) => { if (e.key === 'Escape') setLightboxPhoto(null) }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxPhoto])

  // Hide scroll hint after first scroll
  useEffect(() => {
    const onScroll = () => setHasScrolled(true)
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Progress dot + scroll progress (for bar and back-to-top)
  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      setScrollProgress(progress)
      const length = path.getTotalLength()
      const point = path.getPointAtLength(progress * length)
      setDotPosition({ x: point.x, y: point.y })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollToSection = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Which section is in view + card reveal
  useEffect(() => {
    const observers = sectionRefs.current
      .filter(Boolean)
      .map((el, i) => {
        const ob = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleIndex(i)
              setVisibleSections((prev) => new Set([...prev, i]))
            }
          },
          { threshold: 0.25 }
        )
        ob.observe(el)
        return ob
      })
    return () => observers.forEach((ob) => ob.disconnect())
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.gridBg} aria-hidden />

      {/* Floating decorative elements */}
      <div className={styles.floats} aria-hidden>
        <span className={styles.floatHeart} style={{ '--i': 0 }}>♥</span>
        <span className={styles.floatHeart} style={{ '--i': 1 }}>♥</span>
        <span className={styles.floatHeart} style={{ '--i': 2 }}>♥</span>
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>Our story</h1>
        <p className={styles.subtitle}>
          {timelineMonths[visibleIndex]?.label ?? 'Scroll the timeline'}
          <span className={styles.progressCount}>
            {' '}· {visibleIndex + 1} of {timelineMonths.length}
          </span>
        </p>
        <div className={styles.progressBar} role="progressbar" aria-valuenow={Math.round(scrollProgress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Timeline progress">
          <div className={styles.progressBarFill} style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      </header>

      {/* Jump to section – dots on the side */}
      <nav className={styles.sectionNav} aria-label="Jump to month">
        {timelineMonths.map((month, i) => (
          <button
            key={month.id}
            type="button"
            className={`${styles.sectionNavDot} ${i === visibleIndex ? styles.sectionNavDotActive : ''}`}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${month.label}`}
            aria-current={i === visibleIndex ? 'true' : undefined}
            title={month.label}
          />
        ))}
      </nav>

      {/* Back to top – shows when scrolled down */}
      <button
        type="button"
        className={`${styles.backToTop} ${scrollProgress > 0.15 ? styles.backToTopVisible : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span aria-hidden>↑</span>
      </button>

      <div className={`${styles.scrollHint} ${hasScrolled ? styles.scrollHintHidden : ''}`} aria-hidden>
        <span className={styles.scrollHintText}>Scroll to begin</span>
        <span className={styles.scrollHintArrow}>↓</span>
      </div>

      <div className={styles.scrollTrack} style={{ height: `${timelineMonths.length * 100}vh` }}>
        <svg
          className={styles.snakeLine}
          viewBox={`0 0 100 ${totalHeight}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(232, 160, 184, 0.2)" />
              <stop offset="50%" stopColor="rgba(232, 160, 184, 0.7)" />
              <stop offset="100%" stopColor="rgba(232, 160, 184, 0.2)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathRef}
            d={snakePath}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <g
            className={styles.progressDot}
            transform={`translate(${dotPosition.x}, ${dotPosition.y})`}
          >
            {/* Symmetric heart: two lobes at top, point at bottom */}
            <path d="M 0 -2.4 C -1.2 -3.2 -2.8 -2 -2.8 -0.6 C -2.8 0.4 -1.4 1.6 0 2.6 C 1.4 1.6 2.8 0.4 2.8 -0.6 C 2.8 -2 1.2 -3.2 0 -2.4 Z" />
          </g>
        </svg>

        {timelineMonths.map((month, i) => {
          const isLeft = i % 2 === 0
          const isLast = month.isLast
          return (
            <section
              key={month.id}
              ref={(el) => { sectionRefs.current[i] = el }}
              className={`${styles.section} ${visibleSections.has(i) ? styles.sectionVisible : ''}`}
              style={{ '--section-index': i, '--card-dir': isLeft ? -1 : 1 }}
              aria-label={`${month.label}: ${month.title}`}
            >
              <div
                className={`${styles.cardWrap} ${isLeft ? styles.cardLeft : styles.cardRight}`}
                data-photo-count={(month.photos || []).length}
              >
                <article className={styles.card}>
                  <p className={styles.monthTag}>{month.label}</p>
                  <h2 className={styles.cardTitle}>{month.title}</h2>
                  <div
                    className={styles.photoGallery}
                    data-count={(month.photos || []).length}
                  >
                    {(month.photos || []).length > 0 ? (
                      (month.photos || []).map((photo, photoIndex) => (
                        <figure
                          key={photoIndex}
                          className={styles.photoItem}
                          style={{ '--photo-i': photoIndex }}
                        >
                          <button
                            type="button"
                            className={styles.photoTrigger}
                            onClick={() => setLightboxPhoto({ src: photo.src, caption: photo.caption })}
                            aria-label="View full size"
                          >
                            <img src={photo.src} alt="" className={styles.photo} />
                          </button>
                          {photo.caption && (
                            <figcaption className={styles.photoCaption}>{photo.caption}</figcaption>
                          )}
                        </figure>
                      ))
                    ) : (
                      <div className={styles.photoPlaceholder} aria-hidden>
                        <span className={styles.photoPlaceholderIcon}>♥</span>
                        <span className={styles.photoPlaceholderLabel}>Your photos here</span>
                      </div>
                    )}
                  </div>
                  <p className={styles.caption}>{month.caption}</p>
                  {isLast && (
                    <button
                      type="button"
                      className={styles.cta}
                      onClick={() => navigate('/valentine')}
                      aria-label="Continue to Valentine question"
                    >
                      What&apos;s next? →
                    </button>
                  )}
                </article>
              </div>
            </section>
          )
        })}
      </div>

      {/* Lightbox modal */}
      {lightboxPhoto && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setLightboxPhoto(null)}
          aria-modal="true"
          role="dialog"
          aria-label="Photo full size"
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img src={lightboxPhoto.src} alt="" className={styles.lightboxImage} />
            {lightboxPhoto.caption && (
              <p className={styles.lightboxCaption}>{lightboxPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
