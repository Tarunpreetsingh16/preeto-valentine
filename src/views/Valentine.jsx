import { useState, useCallback } from 'react'
import Confetti from './Confetti'
import styles from './Valentine.module.css'

// Replace with your own letter (use \n\n for paragraph breaks)
const LETTER_CONTENT = `
I don't know where to start as you made everyday special for me. Whether you were here or not; your presence was always with me. It was a beautiful year as a whole. I didn't know I would be married by this year; however, I am happy that I did get married only because you are my wife.

The day I met you, I was not aware it would lead to something beautiful. I can say for sure that your beauty did struck right from the first day, and later I got to know you. Your demenaor took over your beauty. I got to know a very kind and loving person.

I know I can be hard to deal with sometimes as I can be stubborn on some things, but for some reason I have always agreed when you needed or wanted something from me or this relationship. All because of you and your love.

The days apart have also been beautiful as I got to know the desire I have to love you more, wanting you here to make love.

I don't have many words to express. All I can say is I am the luckiest man and this has been a great year for me - just because you came into my life and become my partner forever ♾️.

I hope we love, fight, care, travel and do everything, and do it together.

To my lovely wife, Preeto 😘 `

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
