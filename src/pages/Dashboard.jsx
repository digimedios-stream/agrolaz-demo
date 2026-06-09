import { Sprout, DollarSign, FlaskConical, Tractor } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, ArcElement,
  Tooltip, Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import {
  dashboardStats, ventasMensuales, produccionPorHortaliza, ultimasActividades
} from '../data/mockData';
import { useTheme } from '../context/ThemeContext';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const barData = {
    labels: ventasMensuales.map(v => v.mes),
    datasets: [{
      label: 'Ventas ($)',
      data: ventasMensuales.map(v => v.valor),
      backgroundColor: '#2D6A4F',
      borderRadius: 6,
      maxBarThickness: 40,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#1B1B1B',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDark ? '#9CA3AF' : '#6B7280', font: { family: 'Inter' } },
      },
      y: {
        grid: { color: isDark ? '#374151' : '#E5E7EB' },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          font: { family: 'Inter' },
          callback: (v) => `$${(v / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  const doughnutData = {
    labels: produccionPorHortaliza.map(p => p.nombre),
    datasets: [{
      data: produccionPorHortaliza.map(p => p.porcentaje),
      backgroundColor: produccionPorHortaliza.map(p => p.color),
      borderWidth: 0,
      cutout: '68%',
    }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#1B1B1B',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="dashboard__stats">
        <StatCard
          icon={Sprout}
          iconBg="primary"
          title="Producción Activa"
          value={dashboardStats.produccion.value}
          label={dashboardStats.produccion.label}
          trend={dashboardStats.produccion.trend}
          trendUp={dashboardStats.produccion.trendUp}
        />
        <StatCard
          icon={DollarSign}
          iconBg="success"
          title="Ventas Totales"
          value={dashboardStats.ventas.value}
          label={dashboardStats.ventas.label}
          trend={dashboardStats.ventas.trend}
          trendUp={dashboardStats.ventas.trendUp}
        />
        <StatCard
          icon={FlaskConical}
          iconBg="warning"
          title="Stock Agroquímicos"
          value={dashboardStats.agroquimicos.value}
          label={dashboardStats.agroquimicos.label}
          alert={dashboardStats.agroquimicos.alert}
          alertType={dashboardStats.agroquimicos.alertType}
        />
        <StatCard
          icon={Tractor}
          iconBg="neutral"
          title="Flota Activa"
          value={dashboardStats.maquinarias.value}
          label={dashboardStats.maquinarias.label}
          alert={dashboardStats.maquinarias.alert}
          alertType={dashboardStats.maquinarias.alertType}
        />
      </div>

      <div className="dashboard__charts">
        <div className="dashboard__chart-card">
          <div className="dashboard__chart-header">
            <h3>Ventas Mensuales</h3>
            <select className="dashboard__chart-select">
              <option>Últimos 6 meses</option>
            </select>
          </div>
          <div className="dashboard__chart-body">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="dashboard__chart-card">
          <h3>Producción por Hortaliza</h3>
          <div className="dashboard__doughnut-body">
            <div className="dashboard__doughnut-wrap">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="dashboard__doughnut-center">
                <span className="dashboard__doughnut-value">1.2k</span>
                <span className="dashboard__doughnut-label">TONELADAS</span>
              </div>
            </div>
            <div className="dashboard__doughnut-legend">
              {produccionPorHortaliza.map(p => (
                <div key={p.nombre} className="dashboard__legend-item">
                  <span className="dashboard__legend-dot" style={{ background: p.color }} />
                  <span>{p.nombre} ({p.porcentaje}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__activities">
        <div className="dashboard__activities-header">
          <h3>Últimas Actividades</h3>
          <a href="#" className="dashboard__view-all">Ver todas</a>
        </div>
        <div className="dashboard__activities-table">
          <table>
            <thead>
              <tr>
                <th>ACTIVIDAD</th>
                <th>SECTOR / CULTIVO</th>
                <th>FECHA Y HORA</th>
                <th>ESTADO</th>
                <th>ENCARGADO</th>
              </tr>
            </thead>
            <tbody>
              {ultimasActividades.map(act => (
                <tr key={act.id}>
                  <td className="dashboard__act-name">
                    <span>{act.actividad}</span>
                  </td>
                  <td className="text-secondary">{act.sector}</td>
                  <td className="text-secondary">{act.fecha}</td>
                  <td>
                    <Badge variant={act.estadoType} size="sm">{act.estado}</Badge>
                  </td>
                  <td>
                    <div className="dashboard__encargado">
                      <span className="dashboard__encargado-avatar">{act.encargado.initials}</span>
                      <span>{act.encargado.nombre}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
