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

export const CERTIFICATIONS_CONTENT = {
  tagline: "Credentials",
  title: "Certifications & Seminars",
  subtitle: "A verified collection of professional certificates and attended seminars. Click any card to view the full certificate PDF."
};

export const EVENTS_CONTENT = {
  tagline: "Professional Journey",
  title: "Events & Milestones",
  subtitle: "A chronological timeline of hackathons, competitions, seminars, and significant achievements that shaped my development journey."
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
    demo: "https://www.winecenturybros.com/",
    category: "Freelance Work",
    thumbnail: "/thumbnails/wcb1.jpg"
  },
  {
    title: "Hive Mind",
    description: "Developed robust game backend infrastructure and mobile optimizations with high-performance object pooling for projectiles/collectibles, throttled enemy AI decision-making ticks, and secure JSON local saves for stable 60 FPS gameplay.",
    tags: ["C#", "Unity", "Game Dev", "JSON", "Optimization"],
    demo: "https://example.com",
    category: "Game Development Internship Project",
    thumbnail: "/thumb-hive-mind.png"
  },
  {
    title: "HildrStudios Website",
    description: "A responsive digital storefront for booking creative services (web development, photography, videography) built using Next.js and Tailwind CSS with custom React state animations.",
    tags: ["Next.js", "React", "TailwindCSS", "UI/UX", "Responsive Design"],
    demo: "https://www.hildrstudios.com",
    category: "Freelance Work",
    thumbnail: "/thumbnails/hildr.jpg"
  },
  {
    title: "Bagong Cotta LGU Website",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    category: "School Capstone Project",
    thumbnail: "/thumb-bagong-cotta.png"
  },
  {
    title: "Zus",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    github: "https://github.com/kikkoman-4/zus",
    demo: "https://remix.gg/g/8a843fb0-0391-4c4d-aaf9-9b7992c9d491",
    category: "Remix Game Jam",
    thumbnail: "/thumbnails/rmix.png"
  },
  {
    title: "Dead Pixel",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "School Project",
    thumbnail: "/thumb-bagong-cotta.png"
  },
  {
    title: "Kypher",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    github: PERSONAL_INFO.socials.github,
    demo: "https://example.com",
    category: "STI College Expo Project",
    thumbnail: "/thumb-bagong-cotta.png"
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
    description: "Built a Next.js and Supabase web application from scratch, integrating the Google Sheets API for seamless inventory management. Handled backend data processing using Zod validation and crafted smooth, interactive user interfaces with GSAP and Lenis.",
    images: [
      "/thumbnails/wcb1.jpg",
      "/thumbnails/wcb2.jpg"
    ]
  },
  {
    role: "Pawzled Game Development Intern",
    company: "Hive Mind",
    period: "February 2026",
    description: "Developed robust backend infrastructure and mobile optimizations by implementing high-performance object pooling for projectiles and collectibles, throttling enemy AI decision-making ticks, standardizing manager states with a unified reset architecture, and building a secure JSON-based local save system to ensure a stable 60 FPS.",
    images: [
      "/thumbnails/pzd1.png",
      "/thumbnails/pzd3.png",
      "/thumbnails/pzd.jpg",
    ]
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "HildrStudios Website",
    period: "January 2026",
    description: "Built a responsive digital storefront using Next.js and Tailwind CSS for clients to browse and book specialized services like web development, photography, and videography. Implemented interactive UI animations using native React state and CSS, while optimizing media-heavy pages to maintain fast loading speeds across high-resolution service galleries.",
    images: [
      "/thumbnails/hildr.jpg"
    ]
  },
  {
    role: "UI/UX Developer",
    company: "Bagong Cotta LGU Website",
    period: "Sep 2024 - Dec 2025",
    description: "Co-developed a PHP web application for Barangay Cotta to digitize local government services, focusing on user experience. Designed and implemented the user interfaces for online certification forms, administrative dashboards, and the community news hub to ensure they were responsive and accessible to residents.",
    images: [
      "/exp/bagong-cotta-1.png",
      "/exp/bagong-cotta-2.png",
      "/exp/bagong-cotta-3.png"
    ]
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
  // ── Google AI ────────────────────────────────────────────────────────────
  {
    title: "Google AI Specialization",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/Google AI.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI Fundamentals",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI Fundamentals.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI for App Building",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI for App Building.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI for Brainstorming and Planning",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI for Brainstorming and Planning.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI for Content Creation",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI for Content Creation.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI for Data Analysis",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI for Data Analysis.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "AI for Writing and Communicating",
    issuer: "Google / Coursera",
    category: "Google AI",
    date: "March 2026",
    pdf: "/certs/AI for Writing and Communicating.pdf",
    verifyUrl: "https://coursera.org"
  },

  // ── Google Cybersecurity ─────────────────────────────────────────────────
  {
    title: "Google Network Security",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Google Network Security.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Foundations of Cybersecurity.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Connect and Protect: Networks and Network Security",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Connect and Protect Networks and Network Security.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Play It Safe: Manage Security Risks",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Play It Safe Manage Security Risks.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Network Architecture",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Network Architecture.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Network Monitoring and Analysis",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Network Monitoring and Analysis.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Network Operations",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Network Operations.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Network Traffic and Logs Using IDS and SIEM",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Network Traffic and Logs Using IDS and SIEM.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Secure Against Network Intrusions",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Secure Against Network Intrusions.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Security Hardening",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Security hardening.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Introduction to Detection and Incident Response",
    issuer: "Google / Coursera",
    category: "Google Cybersecurity",
    date: "March 2026",
    pdf: "/certs/Introduction to Detection and Incident Response.pdf",
    verifyUrl: "https://coursera.org"
  },

  // ── Google Data & Python ─────────────────────────────────────────────────
  {
    title: "Google Data Analysis with Python",
    issuer: "Google / Coursera",
    category: "Google Data",
    date: "March 2026",
    pdf: "/certs/Google Data Analysis with Python.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Clean Your Data",
    issuer: "Google / Coursera",
    category: "Google Data",
    date: "March 2026",
    pdf: "/certs/Clean Your Data.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Explore Raw Data",
    issuer: "Google / Coursera",
    category: "Google Data",
    date: "March 2026",
    pdf: "/certs/Explore Raw Data.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Data Structures in Python",
    issuer: "Google / Coursera",
    category: "Google Data",
    date: "March 2026",
    pdf: "/certs/Data Structures in Python.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Using Python to Interact with the Operating System",
    issuer: "Google / Coursera",
    category: "Google Data",
    date: "March 2026",
    pdf: "/certs/Using Python to Interact with the Operating System.pdf",
    verifyUrl: "https://coursera.org"
  },

  // ── Google Agile / Project Management ───────────────────────────────────
  {
    title: "Google Agile Essentials",
    issuer: "Google / Coursera",
    category: "Google Agile",
    date: "March 2026",
    pdf: "/certs/Google Agile Essentials.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Foundations of Agile Project Management",
    issuer: "Google / Coursera",
    category: "Google Agile",
    date: "March 2026",
    pdf: "/certs/Foundations of Agile Project Management.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Implement the Scrum Framework",
    issuer: "Google / Coursera",
    category: "Google Agile",
    date: "March 2026",
    pdf: "/certs/Implement the Scrum Framework.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Organize Projects and Measure Productivity with Scrum",
    issuer: "Google / Coursera",
    category: "Google Agile",
    date: "March 2026",
    pdf: "/certs/Organize Projects and Measure Productivity with Scrum.pdf",
    verifyUrl: "https://coursera.org"
  },

  // ── Google Dev Tools ─────────────────────────────────────────────────────
  {
    title: "Introduction to Git and GitHub",
    issuer: "Google / Coursera",
    category: "Google Dev",
    date: "March 2026",
    pdf: "/certs/Introduction to Git and GitHub.pdf",
    verifyUrl: "https://coursera.org"
  },
  {
    title: "Coursera Certificate (5C0XWIV23YQY)",
    issuer: "Coursera",
    category: "Google Dev",
    date: "March 2026",
    pdf: "/certs/Coursera 5C0XWIV23YQY.pdf",
    verifyUrl: "https://coursera.org/verify/5C0XWIV23YQY"
  },
  {
    title: "Coursera Certificate (LY6ZAHZ2B0HQ)",
    issuer: "Coursera",
    category: "Google Dev",
    date: "March 2026",
    pdf: "/certs/Coursera LY6ZAHZ2B0HQ.pdf",
    verifyUrl: "https://coursera.org/verify/LY6ZAHZ2B0HQ"
  },
  {
    title: "Coursera Certificate (XTXU9Y0G9UIQ)",
    issuer: "Coursera",
    category: "Google Dev",
    date: "March 2026",
    pdf: "/certs/Coursera XTXU9Y0G9UIQ.pdf",
    verifyUrl: "https://coursera.org/verify/XTXU9Y0G9UIQ"
  },
  {
    title: "Coursera Certificate (YKSSTMS1FYH8)",
    issuer: "Coursera",
    category: "Google Dev",
    date: "March 2026",
    pdf: "/certs/Coursera YKSSTMS1FYH8.pdf",
    verifyUrl: "https://coursera.org/verify/YKSSTMS1FYH8"
  },

  // ── Hackathons ───────────────────────────────────────────────────────────
  {
    title: "Dogarithms Hackathon",
    issuer: "Dogarithms",
    category: "Hackathons",
    date: "2025",
    pdf: "/certs/Dogarithms.pdf",
    verifyUrl: ""
  },
  {
    title: "Hackathon Recognition / Award",
    issuer: "Hackathon Organizer",
    category: "Hackathons",
    date: "2025",
    pdf: "/certs/25.png",
    verifyUrl: ""
  },

  // ── Conferences & Seminars ───────────────────────────────────────────────
  {
    title: "Globe Developers Conference 2025",
    issuer: "Globe Telecom",
    category: "Seminars",
    date: "October 9, 2025",
    pdf: "/certs/Globe DevCon 2025 Certificate_AA Afable.pdf",
    verifyUrl: ""
  },
  {
    title: "GDG Certificate",
    issuer: "Google Developer Groups",
    category: "Seminars",
    date: "2025",
    pdf: "/certs/GDG-Certificate-AA_Kikz_H__Afable.pdf",
    verifyUrl: ""
  },
  {
    title: "Certificate",
    issuer: "Issuer",
    category: "Seminars",
    date: "2025",
    pdf: "/certs/certificate.pdf",
    verifyUrl: ""
  },
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
// 8. Professional Stats
// -----------------------------------------------------------------------------
export const STATS = [
  { label: "Hackathons", value: "4+", description: "Participated" },
  { label: "Projects", value: "12+", description: "Completed" },
  { label: "Clients", value: "8+", description: "Satisfied" },
  { label: "Experience", value: "3+", description: "Years" }
];

// -----------------------------------------------------------------------------
// 9. Languages
// -----------------------------------------------------------------------------
export const LANGUAGES = [
  { name: "English", level: "Fluent" },
  { name: "Filipino", level: "Fluent" }
];

// -----------------------------------------------------------------------------
// 10. Events & Milestones
// -----------------------------------------------------------------------------

// Event Category Type
export type EventCategory = 
  | 'hackathon' 
  | 'competition' 
  | 'milestone' 
  | 'seminar' 
  | 'award';

// Event Interface
export interface Event {
  // Required fields
  title: string;              // Event name
  date: string;               // ISO format or human-readable (e.g., "2025-03-15" or "March 2025")
  description: string;        // Event description (2-3 sentences)
  category: EventCategory;    // Event type classification
  
  // Optional fields
  location?: string;          // Physical or virtual location
  achievement?: string;       // Award or outcome (e.g., "1st Place Winner", "Best UI/UX")
  tags?: string[];            // Related technologies or topics
  links?: {
    external?: string;        // Project URL or event website
    github?: string;          // Repository link
    certificate?: string;     // PDF certificate path
  };
  images?: string[];          // Optional event photos or screenshots
}

// Events Content Configuration
export interface EventsContent {
  tagline: string;   // Small uppercase label
  title: string;     // Section heading
  subtitle: string;  // Section description paragraph
}

// Events Array with sample data covering all categories
export const EVENTS: Event[] = [
  {
    title: "Remix Game Jam",
    date: "#",
    description: "Participated in a 48-hour game development hackathon organized by Yield Guild Games Philippines. Built a web-based multiplayer game using React and WebSockets, focusing on real-time gameplay mechanics and responsive UI design.",
    category: "hackathon",
    location: "Online",
    achievement: "Participant",
    tags: ["HTML", "CSS", "WebSockets", "Game Dev", "JavaScript", "Singleplayer"],
    links: {
      external: "https://remix.gg/g/8a843fb0-0391-4c4d-aaf9-9b7992c9d491",
      github: "https://github.com/kikkoman-4/zus"
    },
    images: ["/thumbnails/rmix.png"]
  },
  {
    title: "YGG Pilipinas Game Jam Hackathon",
    date: "February 2025",
    description: "Participated in a 48-hour game development hackathon organized by Yield Guild Games Philippines. Built a web-based multiplayer game using React and WebSockets, focusing on real-time gameplay mechanics and responsive UI design.",
    category: "hackathon",
    location: "BGC Taguig City, Philippines",
    achievement: "Participant",
    tags: ["React", "WebSockets", "Game Dev", "JavaScript", "Multiplayer"],
    links: {
      external: "https://example.com/demo",
      github: "https://github.com/kikkoman-4/ygg-game-jam"
    },
    images: ["/thumbnails/placeholder-hackathon.svg"]
  },
  {
    title: "Globe AcadArena Awards 2025",
    date: "August 26, 2025",
    description: "Recognized as a Top 4 Finalist in the prestigious Globe AcadArena Awards, which celebrates the best collegiate esports organizations across the Philippines. Led initiatives in community building, competitive tournament management, and fostering inclusive gaming culture within our school organization.",
    category: "milestone",
    location: "BGC Taguig City, Philippines",
    achievement: "Top 4 Finalist",
    tags: ["Leadership", "Gaming", "School Organization", "AcadArena"],
    images: ["/thumbnails/AA_awards.jpg", "/thumbnails/AA_awards (2).jpg"]
  },
  {
    title: "Globe Developers Conference 2025",
    date: "October 9, 2025",
    description: "Attended a full-day conference on modern web technologies, cloud architecture, and API integration strategies. Gained insights into scalable application design and emerging industry trends from leading tech professionals.",
    category: "seminar",
    location: "BGC Taguig City, Philippines",
    tags: ["API", "Cloud", "Web Dev", "Networking"],
    links: {
      certificate: "/certs/Globe DevCon 2025 Certificate_AA Afable.pdf"
    },
    images: ["/thumbnails/placeholder-seminar.svg"]
  },
  {
    title: "Wine Century Bros Website Launch",
    date: "March 2026",
    description: "Successfully deployed a production-grade Next.js application with Supabase backend, Google Sheets API integration, and smooth GSAP animations. Delivered a complete e-commerce solution with real-time inventory management and responsive design.",
    category: "milestone",
    tags: ["Next.js", "Supabase", "Google Sheets API", "GSAP", "Full-Stack"],
    links: {
      external: "https://www.winecenturybros.com/"
    },
    images: ["/thumbnails/wcb1.jpg", "/thumbnails/wcb2.jpg"]
  },
  {
    title: "STI Tagisan ng Talino Competition",
    date: "November 2024",
    description: "Competed in STI's premier hackathon competition focused on innovative mobile application development and UI/UX design. Collaborated with a team to conceptualize and prototype a mobile solution addressing real-world problems, showcasing technical skills and creative problem-solving abilities.",
    category: "competition",
    location: "STI College Lucena",
    achievement: "3rd Place",
    tags: ["Mobile App", "App Design", "UI/UX", "Hackathon"],
    images: ["/thumbnails/STI_hackathon.jpg", "/thumbnails/STI_hackathon (2).jpg"]
  },
  {
    title: "DLSU Hackercup 2025",
    date: "August 15-16, 2025",
    description: "Participated in an intensive coding hackathon focused on algorithmic problem-solving and efficient data structure implementation. Collaborated with a team to develop creative solutions under time constraints while maintaining code quality.",
    category: "hackathon",
    achievement: "Participant",
    location: "Manila, Philippines",
    tags: ["Algorithms", "Data Structures", "Problem Solving", "Teamwork", "Software Development", "App Design"],
    links: {
      certificate: "/certs/Dogarithms.pdf"
    },
    images: ["/certs/Dogarithms.pdf"]
  },
  {
    title: "Google Developers Group PUP: Build Your Cloud Arsenal: A Deep Dive into GCP Compute Services Seminar",
    date: "2025",
    description: "Attended Google Developer Groups meetup featuring technical talks on modern web development, cloud technologies, and developer tools. Networked with fellow developers and learned about best practices in software engineering.",
    category: "seminar",
    location: "online",
    tags: ["Google Cloud", "Web Dev", "Developer Tools", "Networking"],
    links: {
      certificate: "/certs/GDG-Certificate-AA_Kikz_H__Afable.pdf"
    },
    images: ["/certs/GDG-Certificate-AA_Kikz_H__Afable.pdf"]
  },
  {
    title: "Inventi Hackathon Challenge",
    date: "September 29, 2025",
    description: "",
    category: "competition",
    achievement: "Participant",
    location: "online",
    tags: ["Software Development", "Web Dev", "Developer Tools", "Networking"],
    links: {
      certificate: "/certs/25.png"
    },
    images: ["/certs/25.png"]
  },
  {
    title: "Pawzled Game Development Internship",
    date: "February 2026",
    description: "Completed major milestone in game development internship by delivering robust backend infrastructure with high-performance object pooling, optimized AI systems, and secure save functionality. Achieved stable 60 FPS performance on mobile devices.",
    category: "milestone",
    location: "Pawzled Game Development",
    achievement: "Internship Completion",
    tags: ["C#", "Unity", "Game Backend", "Optimization", "Mobile"],
    images: ["/thumbnails/pzd1.png", "/thumbnails/pzd3.png"]
  }
];
