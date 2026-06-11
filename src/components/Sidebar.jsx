import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Sprout, Receipt, FlaskConical, Tractor,
  Users, Shield, Settings, Plus, HelpCircle, LogOut, Menu, X, Fuel, Archive
} from 'lucide-react';
import { useState } from 'react';
import { currentUser } from '../data/mockData';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/produccion', icon: Sprout, label: 'Producción' },
  { to: '/ventas', icon: Receipt, label: 'Ventas' },
  { to: '/agroquimicos', icon: Archive, label: 'Inventario' },
  { to: '/maquinarias', icon: Tractor, label: 'Maquinarias' },
  { to: '/combustible', icon: Fuel, label: 'Combustible' },
  { to: '/personal', icon: Users, label: 'Personal' },
  { to: '/usuarios', icon: Shield, label: 'Usuarios' },
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
        <Menu size={24} />
      </button>

      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <div className="sidebar__brand">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="AgroLaz" className="sidebar__logo" />
            <div className="sidebar__brand-text">
              <span className="sidebar__brand-name">AgroLaz</span>
              <span className="sidebar__brand-sub">Gestión Agrícola</span>
            </div>
            <button className="sidebar__close-mobile" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="sidebar__nav">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar__bottom">
          <button className="sidebar__action-btn" onClick={() => { navigate('/produccion'); setMobileOpen(false); }}>
            <Plus size={18} />
            <span>Nuevo Cultivo</span>
          </button>

          <button className="sidebar__link sidebar__link--subtle" onClick={() => setMobileOpen(false)}>
            <HelpCircle size={20} />
            <span>Soporte</span>
          </button>

          <button className="sidebar__link sidebar__link--subtle sidebar__link--logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
