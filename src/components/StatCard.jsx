import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import './StatCard.css';

export default function StatCard({
  icon: Icon,
  iconBg = 'primary',
  title,
  value,
  label,
  trend,
  trendUp,
  alert,
  alertType = 'warning',
  children,
  className = '',
}) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card__header">
        {Icon && (
          <div className={`stat-card__icon stat-card__icon--${iconBg}`}>
            <Icon size={22} />
          </div>
        )}
        {trend && (
          <span className={`stat-card__trend ${trendUp ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
        )}
        {alert && (
          <span className={`stat-card__alert stat-card__alert--${alertType}`}>
            <AlertTriangle size={12} />
            {alert}
          </span>
        )}
      </div>
      <div className="stat-card__body">
        {title && <span className="stat-card__title">{title}</span>}
        <div className="stat-card__value tabular-nums">{value}</div>
        {label && <span className="stat-card__label">{label}</span>}
      </div>
      {children && <div className="stat-card__footer">{children}</div>}
    </div>
  );
}
