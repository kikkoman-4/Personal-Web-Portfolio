import { useState, useEffect } from 'react'
import { 
  Briefcase, 
  User, 
  FolderGit, 
  Mail, 
  ExternalLink, 
  Send, 
  Cpu, 
  Layers, 
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Phone,
  MapPin
} from 'lucide-react'

// Custom SVG components for brand icons since Lucide v1+ does not package them
const Github = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Projects Data from Resume
const PROJECTS = [
  {
    title: "Wine Century Bros Website",
    description: "A Next.js and Supabase web application built from scratch, integrating the Google Sheets API for seamless inventory management, backend Zod data validation, and smooth GSAP/Lenis scrolling animations.",
    tags: ["Next.js", "Supabase", "Google Sheets API", "Zod", "GSAP", "Lenis"],
    github: "https://github.com/kikkoman-4",
    demo: "https://example.com",
    category: "Freelance Work"
  },
  {
    title: "Hive Mind",
    description: "Developed robust game backend infrastructure and mobile optimizations with high-performance object pooling for projectiles/collectibles, throttled enemy AI decision-making ticks, and secure JSON local saves for stable 60 FPS gameplay.",
    tags: ["C#", "Unity", "Game Dev", "JSON", "Optimization"],
    github: "https://github.com/kikkoman-4",
    demo: "https://example.com",
    category: "Game Development"
  },
  {
    title: "HildrStudios Website",
    description: "A responsive digital storefront for booking creative services (web development, photography, videography) built using Next.js and Tailwind CSS with custom React state animations.",
    tags: ["Next.js", "React", "TailwindCSS", "UI/UX", "Responsive Design"],
    github: "https://github.com/kikkoman-4",
    demo: "https://example.com",
    category: "Freelance Work"
  },
  {
    title: "Bagong Cotta LGU Website",
    description: "A PHP-based public service portal digitizing administrative dashboards, online certification requests, and local community news hubs with a focus on responsive and accessible interfaces.",
    tags: ["PHP", "JavaScript", "MySQL", "LGU Portal", "Bootstrap"],
    github: "https://github.com/kikkoman-4",
    demo: "https://example.com",
    category: "LGU Web App"
  }
];

// Experience Timeline
const EXPERIENCE = [
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

// Education History
const EDUCATION = [
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

// Certifications & Seminars
const CERTIFICATIONS = [
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

// Core Strengths
const STRENGTHS = [
  "Performance Optimization",
  "Full-Stack Architecture",
  "Responsive UI/UX Design",
  "Systems Refactoring",
  "Cross-Team Collaboration"
];

// Languages
const LANGUAGES = [
  { name: "English", level: "Fluent" },
  { name: "Filipino", level: "Fluent" }
];

// Skills Data
const SKILLS = [
  { category: "Front end", items: ["TypeScript", "JavaScript", "Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion", "HTML5/CSS3"] },
  { category: "Backend & Databases", items: ["Node.js", "C#", "Python", "PHP", "Java", "Supabase", "PostgreSQL", "MySQL", "RESTful APIs"] },
  { category: "Tools & DevOps", items: ["Git/GitHub", "Docker", "Cloudflare R2", "Figma"] }
];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Handle active navigation highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Immersive liquid morphism animated background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/15 dark:bg-purple-500/10 blur-[130px] animate-blob-1"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 dark:bg-indigo-500/10 blur-[150px] animate-blob-2"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-fuchsia-600/10 dark:bg-fuchsia-500/5 blur-[120px] animate-blob-1"></div>
      </div>

      {/* SVG Liquid/Gooey Filter Definition */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Floating Dock Navigation Container */}
      <div 
        className="fixed z-50 left-1/2 -translate-x-1/2 bottom-6 md:left-auto md:translate-x-0 md:bottom-auto md:right-8 md:top-1/2 md:-translate-y-1/2"
        onMouseLeave={() => setHoveredSection(null)}
      >
        {/* LAYER 1: Liquid Morphism Backgrounds (Gooey Filter Applied) */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-300 flex-row py-2.5 px-4 gap-2 md:flex-col md:py-5 md:px-2.5 md:gap-3"
          style={{ filter: 'url(#liquid-goo)' }}
        >
          {/* Main Dock Backdrop */}
          <div className="absolute inset-0 bg-slate-900/95 dark:bg-slate-950/95 shadow-2xl rounded-full" />
          
          {/* Droplet Background Bubbles (one behind each item, sliding out on hover/active) */}
          {['hero', 'about', 'projects', 'skills', 'contact'].map((item) => {
            const isHovered = hoveredSection === item;
            const isActive = activeSection === item;
            const showDroplet = isHovered || isActive;
            
            return (
              <div 
                key={`bg-${item}`}
                className="w-10 h-10 flex items-center justify-center relative"
              >
                {/* The merging droplet background bubble */}
                <div 
                  className={`absolute h-10 rounded-full transition-all duration-500 ease-out ${
                    showDroplet 
                      ? 'bg-slate-900/95 dark:bg-slate-950/95 w-24 scale-105 translate-y-[-56px] md:translate-y-0 md:translate-x-[-68px]' 
                      : 'bg-transparent w-10 scale-90 translate-y-0 md:translate-x-0'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* LAYER 2: Interactive Buttons and Icons (No filter, crisp rendering) */}
        <div className="relative flex items-center transition-all duration-300 flex-row py-2.5 px-4 gap-2 md:flex-col md:py-5 md:px-2.5 md:gap-3">
          {['hero', 'about', 'projects', 'skills', 'contact'].map((item) => {
            const isHovered = hoveredSection === item;
            const isActive = activeSection === item;
            
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setHoveredSection(item)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer"
                aria-label={`Scroll to ${item}`}
              >
                {/* Icon wrapper to handle color state */}
                <span className={`transition-all duration-300 z-10 ${isActive || isHovered ? 'text-indigo-400 dark:text-indigo-400 scale-110' : 'text-slate-400 dark:text-slate-500'}`}>
                  {item === 'hero' && <Sparkles size={16} />}
                  {item === 'about' && <User size={16} />}
                  {item === 'projects' && <FolderGit size={16} />}
                  {item === 'skills' && <Cpu size={16} />}
                  {item === 'contact' && <Mail size={16} />}
                </span>

                {/* Text Label inside the droplet (crisp and positioned over the background bubble) */}
                <span 
                  className={`absolute z-20 pointer-events-none capitalize text-[10px] font-bold tracking-wide text-white transition-all duration-500 ease-out whitespace-nowrap ${
                    isActive || isHovered
                      ? 'opacity-100 scale-100 translate-y-[-56px] md:translate-y-0 md:translate-x-[-68px]'
                      : 'opacity-0 scale-75 translate-y-0 md:translate-x-0'
                  }`}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Containers */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center py-20 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-6 animate-pulse">
            <Sparkles size={13} />
            <span>Available for freelance & contract roles</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl leading-tight">
            Aa Kikz H. Afable <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Junior Full-Stack Developer</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            I build clean, high-performance web applications and logic-heavy 2D games, bringing complex projects from rough ideas to finished products.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xs sm:max-w-none">
            <button 
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer group shadow-lg shadow-indigo-600/10"
            >
              <span>Explore My Work</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700/50 transition-colors cursor-pointer"
            >
              <Mail size={16} />
              <span>Get in Touch</span>
            </button>
          </div>
        </section>

        {/* SECTION 2: ABOUT / EXPERIENCE */}
        <section id="about" className="py-24 scroll-mt-16">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 md:sticky md:top-24 space-y-10 text-left">
              <div>
                <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
                  <User size={16} />
                  <span>About Me</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                  My professional path & design principles
                </h2>
                <p className="mt-6 text-slate-605 dark:text-slate-400 leading-relaxed">
                  I’m a Full-Stack Developer with a deep focus on web and game development. I spend most of my time building clean, high-performance web applications and logic-heavy 2D games.
                </p>
                <p className="mt-4 text-slate-605 dark:text-slate-400 leading-relaxed">
                  Whether I’m wiring up backend databases, crafting smooth user interfaces, or programming core gameplay systems, I love taking a complex project from a rough idea all the way to a finished, working product.
                </p>
              </div>

              {/* Core Strengths */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Core Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {STRENGTHS.map((strength, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-semibold">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>Education</span>
                </h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{edu.institution}</div>
                      <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Languages</h3>
                <div className="space-y-2">
                  {LANGUAGES.map((lang, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">{lang.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-12 text-left">
              {/* Professional Experience */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                  <Briefcase size={18} />
                  <span>Professional Experience</span>
                </h3>
                
                <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-8">
                  {EXPERIENCE.map((exp, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"></div>
                      <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">{exp.period}</div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{exp.company}</div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Seminars */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
                  <Award size={18} />
                  <span>Certifications & Seminars</span>
                </h3>
                
                <div className="space-y-4">
                  {CERTIFICATIONS.map((cert, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 flex justify-between items-start gap-4 hover:border-indigo-300 dark:hover:border-indigo-900/50 transition-colors">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</div>
                      </div>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: PROJECTS */}
        <section id="projects" className="py-24 scroll-mt-16 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
                <FolderGit size={16} />
                <span>Featured Works</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Innovative design solutions
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-md">
              A curated selection of custom applications designed from scratch using cutting edge web stacks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((proj, index) => (
              <div 
                key={index} 
                className="group flex flex-col bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5"
              >
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{proj.category}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 flex items-center justify-between">
                  <span>{proj.title}</span>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {proj.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold border-t border-slate-100 dark:border-slate-800/50 pt-4">
                  <a href={proj.github} target="_blank" className="flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    <Github size={14} />
                    <span>Source</span>
                  </a>
                  <a href={proj.demo} target="_blank" className="flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: SKILLS */}
        <section id="skills" className="py-24 scroll-mt-16 text-left">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
                <Cpu size={16} />
                <span>My Stack</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                Engineered for speed, built to scale
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                I maintain expertise across multiple technology disciplines. From frontend rendering mechanisms to robust backend structures, these tools form my daily development pipeline.
              </p>
            </div>

            <div className="md:col-span-7 grid gap-6">
              {SKILLS.map((cat, index) => (
                <div key={index} className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers size={14} />
                    <span>{cat.category}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className="bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-900/60 border border-slate-200 dark:border-slate-800/60 text-slate-800 dark:text-slate-200 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: CONTACT */}
        <section id="contact" className="py-24 scroll-mt-16 text-left mb-16">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
                  <Mail size={16} />
                  <span>Contact</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                  Start a conversation
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Have an project in mind or looking for a developer to join your engineering crew? Let's construct something awesome together.
                </p>
              </div>

              <div className="space-y-4">
                <a href="mailto:kikzafable@gmail.com" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Mail size={18} />
                  <span className="text-sm font-medium">kikzafable@gmail.com</span>
                </a>
                <a href="tel:+639567331807" className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  <Phone size={18} />
                  <span className="text-sm font-medium">(+63) 956-733-1807</span>
                </a>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <MapPin size={18} />
                  <span className="text-sm font-medium">Vista Verde, Brgy. Mayowe, Tayabas City</span>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <a href="https://github.com/kikkoman-4" target="_blank" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub Profile">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com/in/kikz-afable" target="_blank" className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="LinkedIn Profile">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="space-y-4 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 md:p-8">
                {formSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/55 text-emerald-600 dark:text-emerald-400 mb-4">
                      <Send size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm mx-auto">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Your Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          required 
                          value={contactName} 
                          onChange={(e) => setContactName(e.target.value)} 
                          placeholder="Jane Doe" 
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          value={contactEmail} 
                          onChange={(e) => setContactEmail(e.target.value)} 
                          placeholder="jane@company.com" 
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Message</label>
                      <textarea 
                        id="message" 
                        required 
                        rows={4} 
                        value={contactMessage} 
                        onChange={(e) => setContactMessage(e.target.value)} 
                        placeholder="Tell me about your project needs..." 
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                    >
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-600">
        <p>&copy; {new Date().getFullYear()} Aa Kikz H. Afable. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App;
