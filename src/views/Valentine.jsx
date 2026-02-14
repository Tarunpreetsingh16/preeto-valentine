import { useState, useCallback } from 'react'
import Confetti from './Confetti'
import styles from './Valentine.module.css'

// Replace with your own letter (use \n\n for paragraph breaks)
const LETTER_CONTENT = `This is where your letter goes.

You can write as much as you like. Each time you add two line breaks, it starts a new paragraph.

Edit LETTER_CONTENT in src/views/Valentine.jsx to put your real message here.`

export default function Valentine() {
  const [saidYes, setSaidYes] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)

  const handleYes = () => setSaidYes(true)

  const handleNo = useCallback(() => {
    if (saidYes) return
    setNoClickCount((c) => c + 1)
  }, [saidYes])

  const yesScale = 1 + Math.min(noClickCount * 0.15, 1)

  if (saidYes) {
    return (
      <div className={styles.wrapperFinal}>
        <Confetti />
        <div className={styles.final}>
          <p className={styles.finalTitle}>I love you 💕</p>
          <p className={styles.finalSub}>
            Thank you for saying yes. Here&apos;s to our next chapter.
          </p>
        </div>

        <section className={styles.letterSection}>
          <div className={styles.letterScroll}>
            <div className={styles.letterContent}>
              {LETTER_CONTENT.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para.trim() || '\u00A0'}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.question}>Will you be my Valentine?</h1>

      <div className={styles.buttons}>
        <button type="button" className={styles.noBtn} onClick={handleNo}>
          No
        </button>
        <button
          key={noClickCount}
          type="button"
          className={`${styles.yesBtn} ${noClickCount > 0 ? styles.yesBtnShake : ''}`}
          style={{ '--yes-scale': yesScale, transform: `scale(${yesScale})` }}
          onClick={handleYes}
        >
          Yes!
        </button>
      </div>
    </div>
  )
}
