import { Github, Linkedin, Twitter } from 'lucide-react'

export const personalInfo = {
  name: "Alex Creative",
  bio: {
    paragraph1: "I'm a passionate and detail-oriented video editor and graphics designer with over 5 years of experience in turning creative concepts into compelling visual content. My expertise lies in crafting narratives that resonate with audiences, whether it's for a brand commercial, a music video, or a corporate presentation.",
    paragraph2: "From initial storyboarding to final color grading and sound design, I am dedicated to delivering high-quality results that exceed expectations. I thrive in collaborative environments and am always eager to take on new challenges and push creative boundaries."
  },
  experience: 5,
  contact: {
    email: "alex.creative@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA"
  },
  social: [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: Github
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: Linkedin
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: Twitter
    }
  ]
}