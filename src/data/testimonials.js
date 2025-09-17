// src/data/testimonials.js

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechCorp Solutions",
    avatar: "/images/testimonials/sarah.jpg", // Add testimonial photos to public/images/testimonials/
    rating: 5,
    text: "Working with this video editor was absolutely fantastic. They took our vision and transformed it into something even better than we imagined. The attention to detail and creative flair really made our brand video stand out.",
    project: "Corporate Brand Video",
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    position: "Creative Director",
    company: "Urban Style Co.",
    avatar: "/images/testimonials/marcus.jpg",
    rating: 5,
    text: "The social media campaign videos exceeded all expectations. Each piece was perfectly crafted for our target audience, and the engagement rates speak for themselves. Highly professional and creative work.",
    project: "Social Media Campaign",
    featured: true
  },
  {
    id: 3,
    name: "Luna Eclipse",
    position: "Independent Artist",
    company: "Music Industry",
    avatar: "/images/testimonials/luna.jpg",
    rating: 5,
    text: "My music video came out absolutely stunning! The visual effects perfectly complemented my sound, and the color grading gave it such a unique aesthetic. I've received so many compliments from fans and industry professionals.",
    project: "Music Video - Indie Artist",
    featured: true
  },
  {
    id: 4,
    name: "David Chen",
    position: "Founder",
    company: "StartupX",
    avatar: "/images/testimonials/david.jpg",
    rating: 5,
    text: "The animated logo they created for us is perfect. It's sleek, modern, and really captures our brand identity. The delivery was on time and the communication throughout the project was excellent.",
    project: "Animated Logo Design",
    featured: false
  },
  {
    id: 5,
    name: "Dr. Emily Watson",
    position: "Director",
    company: "Green Earth Foundation",
    avatar: "/images/testimonials/emily.jpg",
    rating: 5,
    text: "Our documentary required a sensitive touch and deep understanding of environmental issues. The final product was both beautiful and impactful, helping us reach a much wider audience with our conservation message.",
    project: "Documentary Feature",
    featured: true
  },
  {
    id: 6,
    name: "Michael & Sarah Thompson",
    position: "Newlyweds",
    company: "Personal",
    avatar: "/images/testimonials/couple.jpg",
    rating: 5,
    text: "Our wedding highlight reel brings tears to our eyes every time we watch it. They captured the emotion and joy of our special day perfectly. It's something we'll treasure forever.",
    project: "Wedding Highlight Reel",
    featured: false
  }
];

export const getFeaturedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.featured);
};

export const getTestimonialsByRating = (minRating = 4) => {
  return testimonials.filter(testimonial => testimonial.rating >= minRating);
};