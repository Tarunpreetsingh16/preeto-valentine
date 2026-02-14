import { useState, useRef, useCallback } from 'react'
import Confetti from './Confetti'
import styles from './Valentine.module.css'

export default function Valentine() {
  const [saidYes, setSaidYes] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const containerRef = useRef(null)

  const moveButton = useCallback(() => {
    if (saidYes) return
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const padding = 80
    setPosition({
      x: Math.random() * (100 - (padding / rect.width) * 100) + (padding / rect.width) * 50,
      y: Math.random() * (100 - (padding / rect.height) * 100) + (padding / rect.height) * 50,
    })
  }, [saidYes])

  const handleYes = () => {
    setSaidYes(true)
  }

  if (saidYes) {
    return (
      <div className={styles.wrapper}>
        <Confetti />
        <div className={styles.final}>
          <p className={styles.finalTitle}>I love you 💕</p>
          <p className={styles.finalSub}>Thank you for saying yes. Here&apos;s to our next chapter.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <h1 className={styles.question}>Will you be my Valentine?</h1>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.noBtn}
          onMouseEnter={moveButton}
          onFocus={moveButton}
        >
          Maybe later
        </button>
        <button
          type="button"
          className={styles.yesBtn}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={handleYes}
        >
          Yes!
        </button>
      </div>
    </div>
  )
}
