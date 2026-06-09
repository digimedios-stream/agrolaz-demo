import { useLocation } from 'react-router-dom';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { currentUser } from '../data/mockData';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const sectionNames = {
  '/dashboard': 'Dashboard',
  '/produccion': 'Producción',
  '/ventas': 'Ventas',
  '/agroquimicos': 'Agroquímicos',
  '/maquinarias': 'Maquinarias',
  '/personal': 'Personal',
  '/configuracion': 'Configuración',
};

export default function Header() {
  const location = useLocation();
  const currentSection = sectionNames[location.pathname] || 'Dashboard';

  return (
    <header className="header">
      <div className="header__left">
        <nav className="header__breadcrumb">
          <span className="header__breadcrumb-item">Inicio</span>
          <ChevronRight size={14} className="header__breadcrumb-sep" />
          <span className="header__breadcrumb-item header__breadcrumb-item--active">
            {currentSection}
          </span>
        </nav>
      </div>

      <div className="header__center">
        <div className="header__search">
          <Search size={16} className="header__search-icon" />
          <input
            type="text"
            placeholder="Buscar cultivos, lotes o personal..."
            className="header__search-input"
          />
        </div>
      </div>

      <div className="header__right">
        <button className="header__icon-btn header__notification" aria-label="Notificaciones">
          <Bell size={20} />
          <span className="header__notification-badge">3</span>
        </button>

        <ThemeToggle />

        <div className="header__user">
          <div className="header__user-info">
            <span className="header__user-name">{currentUser.name}</span>
            <span className="header__user-role">{currentUser.role}</span>
          </div>
          <div className="header__avatar">
            {currentUser.initials}
          </div>
        </div>
      </div>
    </header>
  );
}
