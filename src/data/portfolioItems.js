// src/data/portfolioItems.js

// Portfolio items organized by type for tab navigation
export const portfolioItems = {
  video: [
    {
      id: 1,
      title: "Corporate Brand Video",
      category: "Commercial",
      type: "video",
      thumbnail: "/images/portfolio/video1.jpg",
      videoUrl: "https://vimeo.com/123456789",
      description: "A dynamic corporate brand video showcasing company values and culture through compelling storytelling and motion graphics.",
      client: "TechCorp Solutions",
      duration: "2:30",
      tags: ["Motion Graphics", "Corporate", "Brand Identity"],
      year: "2024",
      software: ["After Effects", "Premiere Pro", "Photoshop"],
      featured: true
    },
    {
      id: 2,
      title: "Music Video - Indie Artist",
      category: "Music Video",
      type: "video",
      thumbnail: "/images/portfolio/video2.jpg",
      videoUrl: "https://youtube.com/watch?v=example",
      description: "Creative music video with experimental visual effects and color grading that perfectly complements the artist's unique sound.",
      client: "Luna Eclipse",
      duration: "3:45",
      tags: ["Music Video", "Color Grading", "Visual Effects"],
      year: "2024",
      software: ["DaVinci Resolve", "After Effects"],
      featured: true
    },
    {
      id: 3,
      title: "Documentary Feature",
      category: "Documentary",
      type: "video",
      thumbnail: "/images/portfolio/video1.jpg",
      videoUrl: "https://vimeo.com/567890123",
      description: "Feature-length documentary about environmental conservation with powerful storytelling and cinematic visuals.",
      client: "Green Earth Foundation",
      duration: "45:00",
      tags: ["Documentary", "Environmental", "Storytelling"],
      year: "2023",
      software: ["Premiere Pro", "DaVinci Resolve", "Audition"],
      featured: true
    },
    {
      id: 4,
      title: "Wedding Highlight Reel",
      category: "Wedding",
      type: "video",
      thumbnail: "/images/portfolio/video2.jpg",
      videoUrl: "https://youtube.com/watch?v=wedding123",
      description: "Emotional wedding highlight reel capturing the joy and romance of a couple's special day with cinematic storytelling.",
      client: "Sarah & Michael",
      duration: "4:20",
      tags: ["Wedding", "Cinematic", "Emotional"],
      year: "2024",
      software: ["Premiere Pro", "After Effects"],
      featured: false
    },
    {
      id: 5,
      title: "Product Launch Video",
      category: "Commercial",
      type: "video",
      thumbnail: "/images/portfolio/video1.jpg",
      videoUrl: "https://vimeo.com/product123",
      description: "High-energy product launch video with dynamic transitions and modern visual effects for a tech startup.",
      client: "InnovateTech",
      duration: "1:45",
      tags: ["Product", "Commercial", "Tech"],
      year: "2024",
      software: ["After Effects", "Premiere Pro"],
      featured: false
    },
    {
      id: 6,
      title: "Travel Documentary",
      category: "Travel",
      type: "video",
      thumbnail: "/images/portfolio/video2.jpg",
      videoUrl: "https://youtube.com/watch?v=travel456",
      description: "Breathtaking travel documentary showcasing hidden gems across Southeast Asia with stunning aerial footage.",
      client: "Wanderlust Productions",
      duration: "8:30",
      tags: ["Travel", "Aerial", "Documentary"],
      year: "2023",
      software: ["DaVinci Resolve", "Premiere Pro"],
      featured: false
    }
  ],
  graphics: [
    {
      id: 7,
      title: "Animated Logo Design",
      category: "Motion Graphics",
      type: "graphics",
      thumbnail: "/images/portfolio/graphics1.jpg",
      videoUrl: "https://vimeo.com/789012345",
      description: "Sleek animated logo reveal with particle effects and smooth transitions for a tech startup's brand identity.",
      client: "StartupX",
      duration: "0:15",
      tags: ["Logo Animation", "2D Animation", "Brand Identity"],
      year: "2023",
      software: ["After Effects", "Illustrator"],
      featured: false
    },
    {
      id: 8,
      title: "Social Media Campaign",
      category: "Social Media",
      type: "graphics",
      thumbnail: "/images/portfolio/graphics2.jpg",
      videoUrl: "https://vimeo.com/345678901",
      description: "Series of animated social media posts and stories for a fashion brand's product launch campaign.",
      client: "Urban Style Co.",
      duration: "0:30",
      tags: ["Social Media", "Animation", "Fashion"],
      year: "2023",
      software: ["After Effects", "Photoshop"],
      featured: false
    },
    {
      id: 9,
      title: "Explainer Animation",
      category: "Educational",
      type: "graphics",
      thumbnail: "/images/portfolio/graphics1.jpg",
      videoUrl: "https://vimeo.com/explainer789",
      description: "Engaging explainer animation breaking down complex financial concepts into easy-to-understand visuals.",
      client: "FinanceEasy",
      duration: "2:15",
      tags: ["Explainer", "Educational", "Finance"],
      year: "2024",
      software: ["After Effects", "Illustrator"],
      featured: true
    },
    {
      id: 10,
      title: "Event Promo Graphics",
      category: "Event",
      type: "graphics", 
      thumbnail: "/images/portfolio/graphics2.jpg",
      videoUrl: "https://vimeo.com/event456",
      description: "Dynamic promotional graphics package for a music festival including tickets, posters, and social media assets.",
      client: "Summer Beats Festival",
      duration: "1:00",
      tags: ["Event", "Branding", "Music"],
      year: "2024",
      software: ["After Effects", "Photoshop", "Illustrator"],
      featured: true
    },
    {
      id: 11,
      title: "UI Animation Package",
      category: "UI/UX",
      type: "graphics",
      thumbnail: "/images/portfolio/graphics1.jpg",
      videoUrl: "https://vimeo.com/ui123",
      description: "Comprehensive UI animation package for a mobile app including micro-interactions and loading animations.",
      client: "MobileFirst App",
      duration: "0:45",
      tags: ["UI/UX", "Mobile", "Micro-interactions"],
      year: "2024",
      software: ["After Effects", "Principle"],
      featured: false
    },
    {
      id: 12,
      title: "3D Product Visualization",
      category: "3D Graphics",
      type: "graphics",
      thumbnail: "/images/portfolio/graphics2.jpg",
      videoUrl: "https://vimeo.com/3d789",
      description: "Photorealistic 3D product visualization and animation for an e-commerce brand's marketing campaign.",
      client: "LuxuryGoods Co.",
      duration: "1:30",
      tags: ["3D", "Product", "E-commerce"],
      year: "2023",
      software: ["Cinema 4D", "After Effects", "Octane Render"],
      featured: false
    }
  ]
};

// Legacy export for backward compatibility
export const allPortfolioItems = [
  ...portfolioItems.video,
  ...portfolioItems.graphics
];

export const categories = [
  "All",
  "Commercial",
  "Music Video",
  "Motion Graphics",
  "Documentary",
  "Wedding",
  "Social Media"
];

export const filterItemsByCategory = (category) => {
  if (category === "All") return portfolioItems;
  return portfolioItems.filter(item => item.category === category);
};

export const getFeaturedItems = () => {
  return portfolioItems.filter(item => item.featured);
};