'use client'
import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  onClick,
  style,
  ...props 
}, ref) => {
  const baseStyles = 'relative overflow-hidden transition-all duration-300'
  
  const variants = {
    default: 'bg-gray-800 border border-gray-700 rounded-xl',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl',
    glass: 'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl',
    outline: 'border-2 border-gray-700 rounded-xl hover:border-purple-500'
  }
  
  const hoverEffects = hover 
    ? 'hover:shadow-xl hover:scale-105 hover:-translate-y-1' 
    : ''
  
  const cursorStyle = onClick ? 'cursor-pointer' : ''
  
  const cardStyles = `${baseStyles} ${variants[variant]} ${hoverEffects} ${cursorStyle} ${className}`
  
  return (
    <div
      ref={ref}
      className={cardStyles}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export default Card