import { PERSONAL_INFO } from '../../data/portfolioData';

export default function Footer() {
  return (
    <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-600">
      <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
    </footer>
  );
}
