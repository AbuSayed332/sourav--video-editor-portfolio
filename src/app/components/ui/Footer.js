'use client'
import { Heart, ArrowUp } from 'lucide-react'
import { personalInfo } from '../../../data/personalInfo'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  const services = [
    'Video Editing',
    'Motion Graphics',
    'Brand Design',
    'Social Media Content',
    'Color Grading',
    'Sound Design'
  ]

  const handleLinkClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-black relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sourav A. Prodhan
            </div>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              Professional video editor and graphics designer creating compelling visual stories 
              that connect with audiences and drive results.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {personalInfo.social?.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="p-3 bg-gray-900 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-pink-400 transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact info bar */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Email: {personalInfo.contact.email}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Phone: {personalInfo.contact.phone}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Location: {personalInfo.contact.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 text-gray-500 mb-4 md:mb-0">
            <span>© {currentYear} Sourav A. Prodhan. Made with</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <button 
              className="hover:text-purple-400 transition-colors duration-300"
              onClick={() => alert('Privacy Policy would be implemented here')}
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-purple-400 transition-colors duration-300"
              onClick={() => alert('Terms of Service would be implemented here')}
            >
              Terms of Service
            </button>
            <button 
              className="hover:text-purple-400 transition-colors duration-300"
              onClick={() => handleLinkClick('#contact')}
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}