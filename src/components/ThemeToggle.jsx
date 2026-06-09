import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      aria-label="Toggle theme"
    >
      <span className={`theme-toggle__icon ${theme === 'light' ? 'active' : ''}`}>
        <Sun size={18} />
      </span>
      <span className={`theme-toggle__icon ${theme === 'dark' ? 'active' : ''}`}>
        <Moon size={18} />
      </span>
    </button>
  );
}
