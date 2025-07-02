import { useState, useCallback, useEffect } from 'react'
import styles from '@/styles/jumping-letters.module.css'

export const useJumpingLetters = () => {
  const [activeLetters, setActiveLetters] = useState(new Set())

  const handleMouseEnter = useCallback((index) => {
    setActiveLetters((prev) => new Set(prev).add(index))
  }, [])

  const handleAnimationEnd = useCallback((index) => {
    setActiveLetters((prev) => {
      const newSet = new Set(prev)
      newSet.delete(index)
      return newSet
    })
  }, [])

  const renderJumpingText = useCallback(
    (text, className = '') => {
      return (
        <div className={`${styles.container} ${className}`}>
          {text.split(' ').map((word, wordIndex) => (
            <div key={wordIndex} className={styles.word}>
              {word.split('').map((letter, letterIndex) => (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  className={`${styles.alphabet} ${
                    activeLetters.has(`${wordIndex}-${letterIndex}`)
                      ? styles.active
                      : ''
                  }`}
                  onMouseEnter={() =>
                    handleMouseEnter(`${wordIndex}-${letterIndex}`)
                  }
                  onAnimationEnd={() =>
                    handleAnimationEnd(`${wordIndex}-${letterIndex}`)
                  }
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>
      )
    },
    [activeLetters, handleMouseEnter, handleAnimationEnd]
  )

  return { renderJumpingText }
}