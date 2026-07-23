// =============================================================================
// PORTFOLIO CONFIGURATION & DATA
// All personal information, social links, contact info, section copy, and 
// portfolio items are centralized here. Update these variables to customize 
// your portfolio without editing individual component files!
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Personal & Contact Information
// -----------------------------------------------------------------------------
export const PERSONAL_INFO = {
  name: "AA Kikz H. Afable",
  title: "Junior Full-Stack Developer",
  statusBadge: "Available for freelance & contract roles",
  bio: "I build clean, high-performance web applications and logic-heavy 2D games, bringing complex projects from rough ideas to finished products.",

  // Contact Info
  email: "kikzafable@gmail.com",
  phone: "(+63) 956-733-1807",
  phoneRaw: "+639567331807",
  location: "Vista Verde, Brgy. Mayowe, Tayabas City, Quezon",

  // Social Links
  socials: {
    github: "https://github.com/kikkoman-4",
    linkedin: "https://linkedin.com/in/kikz-afable",
  }
};

// -----------------------------------------------------------------------------
// 2. Section Texts & Headings
// -----------------------------------------------------------------------------
export const HERO_CONTENT = {
  badge: PERSONAL_INFO.statusBadge,
  name: PERSONAL_INFO.name,
  title: PERSONAL_INFO.title,
  subtitle: PERSONAL_INFO.bio,
  ctaPrimary: "Explore My Work",
  ctaSecondary: "Get in Touch"
};

export const ABOUT_CONTENT = {
  tagline: "About Me",
  title: "My professional path & design principles",
  paragraphs: [
    "I’m a Full-Stack Developer with a deep focus on web and game development. I spend most of my time building clean, high-performance web applications and logic-heavy 2D games.",
    "Whether I’m wiring up backend databases, crafting smooth user interfaces, or programming core gameplay systems, I love taking a complex project from a rough idea all the way to a finished, working product."
  ]
};

export const PROJECTS_CONTENT = {
  tagline: "Featured Works",
  title: "Innovative design solutions",
  subtitle: "A curated selection of custom applications designed from scratch using cutting edge web stacks."
};

export const SKILLS_CONTENT = {
  tagline: "My Stack",
  title: "Engineered for speed, built to scale",
  subtitle: "I maintain expertise across multiple technology disciplines. From frontend rendering mechanisms to robust backend structures, these tools form my daily development pipeline."
};

export const CONTACT_CONTENT = {
  tagline: "Contact",
  title: "Start a conversation",
  subtitle: "Have an project in mind or looking for a developer to join your engineering crew? Let's construct something awesome together.",
  successTitle: "Message Sent!",
  successMessage: "Thank you for reaching out. I'll get back to you as soon as possible."
};

// -----------------------------------------------------------------------------
// 3. Projects List
// -----------------------------------------------------------------------------
export const PROJECTS = [
  {
    title: "Wine Century Bros Website",
    description: "A Next.js and Supabase web application built from scratch, integrating the Google Sheets API for seamless inventory management, backend Zod data validation, and smooth GSAP/Lenis scrolling animations.",
    tags: ["Next.js", "Supabase", "Google Sheets API", "Zod", "GSAP", "Lenis"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "Freelance Work"
  },
  {
    title: "Hive Mind",
    description: "Developed robust game backend infrastructure and mobile optimizations with high-performance object pooling for projectiles/collectibles, throttled enemy AI decision-making ticks, and secure JSON local saves for stable 60 FPS gameplay.",
    tags: ["C#", "Unity", "Game Dev", "JSON", "Optimization"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "Game Development"
  },
  {
    title: "HildrStudios Website",
    description: "A responsive digital storefront for booking creative services (web development, photography, videography) built using Next.js and Tailwind CSS with custom React state animations.",
    tags: ["Next.js", "React", "TailwindCSS", "UI/UX", "Responsive Design"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "Freelance Work"
  },
  {
    title: "Bagong Cotta LGU Website",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "LGU Web App"
  }
];

// -----------------------------------------------------------------------------
// 4. Professional Experience
// -----------------------------------------------------------------------------
export const EXPERIENCE = [
  {
    role: "Freelance Full-Stack Developer",
    company: "Wine Century Bros Website",
    period: "March 2026",
    description: "Built a Next.js and Supabase web application from scratch, integrating the Google Sheets API for seamless inventory management. Handled backend data processing using Zod validation and crafted smooth, interactive user interfaces with GSAP and Lenis."
  },
  {
    role: "Pawzled Game Development Intern",
    company: "Hive Mind",
    period: "February 2026",
    description: "Developed robust backend infrastructure and mobile optimizations by implementing high-performance object pooling for projectiles and collectibles, throttling enemy AI decision-making ticks, standardizing manager states with a unified reset architecture, and building a secure JSON-based local save system to ensure a stable 60 FPS."
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "HildrStudios Website",
    period: "January 2026",
    description: "Built a responsive digital storefront using Next.js and Tailwind CSS for clients to browse and book specialized services like web development, photography, and videography. Implemented interactive UI animations using native React state and CSS, while optimizing media-heavy pages to maintain fast loading speeds across high-resolution service galleries."
  },
  {
    role: "UI/UX Developer",
    company: "Bagong Cotta LGU Website",
    period: "Sep 2024 - Dec 2025",
    description: "Co-developed a PHP web application for Barangay Cotta to digitize local government services, focusing on user experience. Designed and implemented the user interfaces for online certification forms, administrative dashboards, and the community news hub to ensure they were responsive and accessible to residents."
  }
];

// -----------------------------------------------------------------------------
// 5. Education History
// -----------------------------------------------------------------------------
export const EDUCATION = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "STI College Lucena",
    period: "2022 - 2026"
  },
  {
    degree: "Mobile App & Web Development",
    institution: "STI College Lucena",
    period: "2020 - 2022"
  }
];

// -----------------------------------------------------------------------------
// 6. Certifications & Seminars
// -----------------------------------------------------------------------------
export const CERTIFICATIONS = [
  {
    title: "Google Network Security Specializations",
    issuer: "Google Certification",
    date: "March 2026"
  },
  {
    title: "Google AI Specialization",
    issuer: "Google Certification",
    date: "March 2026"
  },
  {
    title: "Google Data Analysis with Python",
    issuer: "Google Certification",
    date: "March 2026"
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google Certification",
    date: "March 2026"
  },
  {
    title: "Globe Developers Conference 2025",
    issuer: "BGC Globe Tower, Taguig",
    date: "October 9, 2025"
  }
];

// -----------------------------------------------------------------------------
// 7. Core Strengths
// -----------------------------------------------------------------------------
export const STRENGTHS = [
  "Performance Optimization",
  "Full-Stack Architecture",
  "Responsive UI/UX Design",
  "Systems Refactoring",
  "Cross-Team Collaboration"
];

// -----------------------------------------------------------------------------
// 8. Languages
// -----------------------------------------------------------------------------
export const LANGUAGES = [
  { name: "English", level: "Fluent" },
  { name: "Filipino", level: "Fluent" }
];

// -----------------------------------------------------------------------------
// 9. Technical Skills
// -----------------------------------------------------------------------------
export const SKILLS = [
  { category: "Front end", items: ["TypeScript", "JavaScript", "Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5/CSS3"] },
  { category: "Backend & Databases", items: ["Node.js", "C#", "Python", "PHP", "Java", "Supabase", "PostgreSQL", "MySQL", "RESTful APIs"] },
  { category: "Tools & DevOps", items: ["Git/GitHub", "Docker", "Cloudflare R2", "Figma"] }
];
