import { useState, useEffect } from 'react';
import FloatingDock from './components/layout/FloatingDock';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

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

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* Immersive liquid morphism animated background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/15 dark:bg-purple-500/10 blur-[130px] animate-blob-1"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 dark:bg-indigo-500/10 blur-[150px] animate-blob-2"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-fuchsia-600/10 dark:bg-fuchsia-500/5 blur-[120px] animate-blob-1"></div>
      </div>


      {/* Floating Dock Navigation */}
      <FloatingDock activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Content Containers */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
