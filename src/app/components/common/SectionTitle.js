'use client'
import FadeInUp from '../animations/FadeInUp'

export default function SectionTitle({ 
  title, 
  subtitle, 
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) {
  const alignmentClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right'
  }

  return (
    <div className={`mb-12 ${alignmentClasses[align]} ${className}`}>
      <FadeInUp delay={0}>
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ${titleClassName}`}>
          {title}
        </h2>
      </FadeInUp>
      
      {subtitle && (
        <FadeInUp delay={200}>
          <p className={`text-lg text-gray-400 max-w-3xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${subtitleClassName}`}>
            {subtitle}
          </p>
        </FadeInUp>
      )}
    </div>
  )
}