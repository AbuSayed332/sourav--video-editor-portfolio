'use client'
import { useEffect, useRef } from 'react'
import useIntersectionObserver from '../common/useIntersectionObserver'

export default function ScrollAnimation({ 
  children, 
  className = '', 
  threshold = 0.1, 
  onInView = () => {},
  triggerOnce = true 
}) {
  const ref = useRef()
  const isVisible = useIntersectionObserver(ref, { threshold, triggerOnce })

  useEffect(() => {
    if (isVisible) {
      onInView()
    }
  }, [isVisible, onInView])

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}