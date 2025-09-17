// src/data/personalInfo.js
import { Instagram, Youtube, Video, Linkedin, Twitter } from 'lucide-react';

// Then in your component:

export const personalInfo = {
  name: "Sourav Alam Prodhan",
  title: "Creative Video Editor & Motion Graphics Designer",
  tagline: "Bringing Stories to Life Through Visual Excellence",
  bio: {
    short: "Passionate video editor with 6+ years of experience creating compelling visual content for brands, artists, and storytellers worldwide.",
    long: "I'm a creative video editor and motion graphics designer with over 6 years of experience in the industry. My passion lies in transforming raw footage into compelling visual stories that captivate audiences and deliver results. From corporate brand videos to indie music videos, I bring a unique blend of technical expertise and creative vision to every project. I believe that every frame matters, and I'm dedicated to crafting videos that not only look beautiful but also serve their intended purpose effectively."
  },
  location: "dhaka, Bangladesh",
  email: "czsourav277@gmail.com",
  phone: "+880 1608833811",
  website: "www.alexmorgan.video",
  
  // Contact Information (structured for components)
  contact: {
    email: "czsourav277@gmail.com",
    phone: "+880 1608833811",
    location: "dhaka, Bangladesh",
    website: "www.alexmorgan.video"
  },
  
  // Social Media
social: [
    {
      name: "Instagram",
      url: "https://instagram.com/alexmorgan_video",
      icon: Instagram
    },
    {
      name: "YouTube", 
      url: "https://youtube.com/@alexmorgan_video",
      icon: Youtube
    },
    {
      name: "Vimeo",
      url: "https://vimeo.com/alexmorgan",
      icon: Video
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/alexmorgan-video", 
      icon: Linkedin
    },
    {
      name: "Twitter",
      url: "https://twitter.com/alexmorgan_vid",
      icon: Twitter
    }
  ],
  // Professional Stats
  stats: {
    projectsCompleted: 150,
    yearsExperience: 6,
    clientsSatisfied: 85,
    awardsWon: 12,
    totalVideoViews: "2.5M+",
    averageProjectRating: 4.9
  },

  // Services
  services: [
    {
      id: 1,
      title: "Video Editing",
      description: "Professional video editing services for all types of content",
      icon: "🎬",
      features: [
        "Multi-cam editing",
        "Color correction",
        "Audio mixing",
        "Transitions & effects",
        "Format optimization"
      ]
    },
    {
      id: 2,
      title: "Motion Graphics",
      description: "Eye-catching animations and motion graphics design",
      icon: "✨",
      features: [
        "Logo animations",
        "2D/3D animations",
        "Text animations",
        "Infographics",
        "Visual effects"
      ]
    },
    {
      id: 3,
      title: "Color Grading",
      description: "Professional color grading and visual enhancement",
      icon: "🎨",
      features: [
        "Cinematic looks",
        "Brand consistency",
        "Mood enhancement",
        "Technical correction",
        "Style matching"
      ]
    },
    {
      id: 4,
      title: "Post-Production",
      description: "Complete post-production workflow management",
      icon: "⚙️",
      features: [
        "Project management",
        "File organization",
        "Quality control",
        "Format delivery",
        "Revisions handling"
      ]
    }
  ],

  // Pricing (optional, can be used for service pages)
  pricing: {
    hourlyRate: "$75-150",
    projectRates: {
      basic: {
        name: "Basic Edit",
        price: "$500-1,500",
        description: "Simple cuts, basic color correction, audio sync"
      },
      standard: {
        name: "Standard Production",
        price: "$1,500-5,000", 
        description: "Advanced editing, motion graphics, color grading"
      },
      premium: {
        name: "Premium Production",
        price: "$5,000-15,000",
        description: "Full production with custom animations and effects"
      }
    }
  },

  // Availability & Process
  availability: {
    status: "Available for new projects",
    responseTime: "24 hours",
    projectDelivery: "5-15 business days",
    revisions: "3 rounds included"
  },

  process: [
    {
      step: 1,
      title: "Discovery",
      description: "Understanding your vision, goals, and requirements"
    },
    {
      step: 2,
      title: "Planning", 
      description: "Creating project timeline, style guide, and workflow"
    },
    {
      step: 3,
      title: "Production",
      description: "Editing, color grading, and motion graphics creation"
    },
    {
      step: 4,
      title: "Review",
      description: "Client feedback integration and refinements"
    },
    {
      step: 5,
      title: "Delivery",
      description: "Final exports in all required formats and resolutions"
    }
  ],

  // Equipment & Software (for transparency)
  equipment: {
    camera: ["Sony A7S III", "Canon EOS R5", "DJI Pocket 2"],
    audio: ["Rode VideoMic Pro+", "Zoom H5 Recorder"],
    lighting: ["Aputure AL-M9", "Godox SL-60W"],
    computer: "Mac Studio M1 Ultra 64GB RAM"
  },

  // Certifications & Education
  certifications: [
    {
      name: "Adobe Certified Expert - Premiere Pro",
      year: "2023",
      organization: "Adobe"
    },
    {
      name: "DaVinci Resolve Certified Colorist",
      year: "2022", 
      organization: "Blackmagic Design"
    },
    {
      name: "Bachelor of Fine Arts - Film Production",
      year: "2018",
      organization: "UCLA School of Theater, Film and Television"
    }
  ]
};

export default personalInfo;