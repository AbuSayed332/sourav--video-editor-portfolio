'use client'
import { useEffect, useState, useRef } from 'react'

import useIntersectionObserver from '../common/useIntersectionObserver'

export default function FadeInUp({ 
  children, 
  delay = 0, 
  duration = 600,
  className = '',
  threshold = 0.1,
  triggerOnce = true 
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useRef()
  const isVisible = useIntersectionObserver(ref, { threshold, triggerOnce })

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShouldAnimate(true)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])

  const animationStyles = {
    transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    opacity: shouldAnimate ? 1 : 0,
    transform: shouldAnimate ? 'translateY(0)' : 'translateY(30px)'
  }

  return (
    <div 
      ref={ref}
      style={animationStyles}
      className={className}
    >
      {children}
    </div>
  )
}