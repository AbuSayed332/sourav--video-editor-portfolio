// src/data/skills.js

export const technicalSkills = [
  {
    id: 1,
    name: "Adobe Premiere Pro",
    category: "Video Editing",
    proficiency: 95,
    icon: "🎬",
    description: "Advanced video editing, multicam editing, color correction, and audio mixing",
    yearsOfExperience: 6
  },
  {
    id: 2,
    name: "Adobe After Effects",
    category: "Motion Graphics",
    proficiency: 90,
    icon: "✨",
    description: "Complex motion graphics, visual effects, compositing, and 2D animation",
    yearsOfExperience: 5
  },
  {
    id: 3,
    name: "DaVinci Resolve",
    category: "Color Grading",
    proficiency: 85,
    icon: "🎨",
    description: "Professional color grading, color correction, and advanced post-production",
    yearsOfExperience: 4
  },
  {
    id: 4,
    name: "Final Cut Pro",
    category: "Video Editing",
    proficiency: 80,
    icon: "🍎",
    description: "Fast-paced editing, multicam workflows, and efficient project management",
    yearsOfExperience: 4
  },
  {
    id: 5,
    name: "Adobe Photoshop",
    category: "Graphics",
    proficiency: 88,
    icon: "🖼️",
    description: "Photo manipulation, graphic design, and digital artwork creation",
    yearsOfExperience: 7
  },
  {
    id: 6,
    name: "Adobe Audition",
    category: "Audio",
    proficiency: 75,
    icon: "🎵",
    description: "Audio editing, sound design, noise reduction, and audio restoration",
    yearsOfExperience: 3
  },
  {
    id: 7,
    name: "Cinema 4D",
    category: "3D Graphics",
    proficiency: 70,
    icon: "🎯",
    description: "3D modeling, animation, and rendering for motion graphics",
    yearsOfExperience: 2
  },
  {
    id: 8,
    name: "Adobe Illustrator",
    category: "Graphics",
    proficiency: 82,
    icon: "✏️",
    description: "Vector graphics, logo design, and illustration for video projects",
    yearsOfExperience: 5
  }
];

export const creativeSkills = [
  {
    id: 1,
    name: "Storytelling",
    proficiency: 92,
    icon: "📚",
    description: "Crafting compelling narratives and emotional arcs"
  },
  {
    id: 2,
    name: "Color Theory",
    proficiency: 88,
    icon: "🌈",
    description: "Understanding color psychology and visual aesthetics"
  },
  {
    id: 3,
    name: "Motion Design",
    proficiency: 85,
    icon: "🎪",
    description: "Creating engaging animations and transitions"
  },
  {
    id: 4,
    name: "Visual Composition",
    proficiency: 90,
    icon: "📐",
    description: "Framing, rule of thirds, and visual balance"
  },
  {
    id: 5,
    name: "Sound Design",
    proficiency: 78,
    icon: "🔊",
    description: "Creating and editing audio to enhance visual content"
  },
  {
    id: 6,
    name: "Brand Aesthetics",
    proficiency: 86,
    icon: "🏷️",
    description: "Maintaining consistent visual identity across projects"
  }
];

export const workflowSkills = [
  {
    id: 1,
    name: "Project Management",
    proficiency: 88,
    icon: "📋",
    description: "Managing timelines, deadlines, and client expectations"
  },
  {
    id: 2,
    name: "Client Communication",
    proficiency: 92,
    icon: "💬",
    description: "Clear communication and collaborative feedback integration"
  },
  {
    id: 3,
    name: "File Organization",
    proficiency: 90,
    icon: "📁",
    description: "Efficient project structure and asset management"
  },
  {
    id: 4,
    name: "Quality Control",
    proficiency: 94,
    icon: "✅",
    description: "Attention to detail and consistent quality standards"
  },
  {
    id: 5,
    name: "Problem Solving",
    proficiency: 87,
    icon: "🧩",
    description: "Creative solutions for technical and creative challenges"
  },
  {
    id: 6,
    name: "Time Management",
    proficiency: 89,
    icon: "⏰",
    description: "Efficient workflow and meeting tight deadlines"
  }
];

export const skillCategories = [
  {
    name: "Technical Skills",
    skills: technicalSkills,
    color: "blue"
  },
  {
    name: "Creative Skills",
    skills: creativeSkills,
    color: "purple"
  },
  {
    name: "Workflow Skills",
    skills: workflowSkills,
    color: "green"
  }
];

export const getTopSkills = (count = 6) => {
  const allSkills = [...technicalSkills, ...creativeSkills, ...workflowSkills];
  return allSkills
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, count);
};