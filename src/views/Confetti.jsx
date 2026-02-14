import { useEffect, useState } from 'react'
import styles from './Confetti.module.css'

const COLORS = ['#e8a0b8', '#e8c9a0', '#c97b96', '#b8a9c4', '#f5f0eb']
const COUNT = 80

export default function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1.5,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
  )

  return (
    <div className={styles.container} aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size * 0.6,
            '--rot': `${p.rotation}deg`,
          }}
        />
      ))}
    </div>
  )
}
