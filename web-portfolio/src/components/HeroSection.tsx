import { Sparkles, ArrowRight, Mail } from 'lucide-react';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
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
  );
}
