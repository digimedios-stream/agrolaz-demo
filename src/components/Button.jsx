import { Loader2 } from 'lucide-react';
import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <Loader2 size={18} className="btn__spinner" />
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      <span>{loading ? 'Cargando...' : children}</span>
    </button>
  );
}
