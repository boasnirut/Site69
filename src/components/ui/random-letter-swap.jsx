import React, { useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function RandomLetterSwap({ label, className = '', href, onClick }) {
  const [displayText, setDisplayText] = useState(label)
  const isHovered = useRef(false)

  const handleMouseEnter = () => {
    isHovered.current = true
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        label
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) return label[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= label.length) {
        clearInterval(interval)
      }
      iteration += 1 / 3
    }, 25)
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    setDisplayText(label)
  }

  const content = (
    <span
      className={`inline-block transition-colors duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {displayText}
    </span>
  )

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }

  return content
}
