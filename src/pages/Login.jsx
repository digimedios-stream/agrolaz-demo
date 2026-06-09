import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Button from '../components/Button';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="login-page">
      <ThemeToggle className="login-page__theme" />

      <div className="login-card">
        <div className="login-card__header">
          <img src="/logo.png" alt="AgroLaz" className="login-card__logo" />
          <h1 className="login-card__title">Bienvenido a AgroLaz</h1>
          <p className="login-card__subtitle">Gestión Agrícola Inteligente</p>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          <div className="login-card__field">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="login-card__input-wrap">
              <Mail size={18} className="login-card__input-icon" />
              <input
                id="email"
                type="email"
                placeholder="usuario@agrolaz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login-card__field">
            <label htmlFor="password">Contraseña</label>
            <div className="login-card__input-wrap">
              <Lock size={18} className="login-card__input-icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-card__toggle-pw"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-card__options">
            <label className="login-card__checkbox">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="#" className="login-card__forgot">¿Olvidó su contraseña?</a>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            icon={LogIn}
          >
            Ingresar
          </Button>

          <p className="login-card__help">
            ¿Necesita ayuda? <a href="#">Contacte a Soporte</a>
          </p>
        </form>
      </div>

      <footer className="login-page__footer">
        © 2024 AgroLaz Gestión Agrícola. Todos los derechos reservados.
      </footer>
    </div>
  );
}
