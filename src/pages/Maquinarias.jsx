import { useState } from 'react';
import { Plus, Tractor, CheckCircle, Wrench, AlertCircle, Clock, Eye, Edit, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { maquinariasStats, alertasCriticas, maquinarias, mantenimientoSugerido } from '../data/mockData';
import './Maquinarias.css';

const estadoIcons = {
  success: CheckCircle,
  warning: Wrench,
  danger: AlertCircle,
};

export default function Maquinarias() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="maquinarias">
      <div className="maquinarias__header">
        <div>
          <h1>Maquinarias</h1>
          <p>Control de flota y mantenimiento preventivo</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>Nueva Maquinaria</Button>
      </div>

      <div className="maquinarias__stats">
        <StatCard icon={Tractor} iconBg="primary" title="Flota Total" value={maquinariasStats.flotaTotal.value}>
          <span className="text-sm text-success">{maquinariasStats.flotaTotal.extra}</span>
        </StatCard>
        <StatCard icon={CheckCircle} iconBg="success" title="Operativas" value={maquinariasStats.operativas.value}>
          <span className="text-sm text-secondary">{maquinariasStats.operativas.extra}</span>
        </StatCard>
        <StatCard
          icon={Wrench} iconBg="warning" title="En Mantenimiento" value={maquinariasStats.enMantenimiento.value}
          alert={maquinariasStats.enMantenimiento.hasAlert ? '⚠' : null} alertType="warning"
        />
        <StatCard
          icon={AlertCircle} iconBg="danger" title="Services Próximos" value={maquinariasStats.servicesProximos.value}
          alert={maquinariasStats.servicesProximos.hasAlert ? '!' : null} alertType="danger"
        />
      </div>

      <div className="maquinarias__content">
        <div className="maquinarias__sidebar-section">
          <div className="maquinarias__alertas-card">
            <h4 className="text-danger">
              <AlertTriangle size={16} style={{ marginRight: 6 }} />
              Alertas Críticas
            </h4>
            {alertasCriticas.map(a => (
              <div key={a.id} className="maquinarias__alerta-item">
                <strong className="text-danger">{a.maquina}</strong>
                <p className="text-sm text-secondary">{a.problema}</p>
              </div>
            ))}
          </div>

          <div className="maquinarias__mant-card">
            <h4>
              <Clock size={16} style={{ marginRight: 6 }} />
              Mantenimiento Sugerido
            </h4>
            {mantenimientoSugerido.map(m => (
              <div key={m.id} className="maquinarias__mant-item">
                <Clock size={16} className="text-muted" />
                <div>
                  <strong>{m.maquina}</strong>
                  <p className="text-sm text-secondary">{m.tarea}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="maquinarias__grid">
          {maquinarias.map(maq => (
            <div key={maq.id} className={`maquinarias__card ${maq.vencido ? 'maquinarias__card--vencido' : ''}`}>
              <div className="maquinarias__card-header">
                <div className="maquinarias__card-icon">
                  <Tractor size={28} />
                </div>
                <Badge variant={maq.estadoType} size="sm">{maq.estado}</Badge>
              </div>

              <h4 className="maquinarias__card-name">{maq.nombre}</h4>
              <p className="text-sm text-muted">ID: {maq.idCode}</p>
              <p className="text-sm text-secondary" style={{ marginTop: 8 }}>
                ⏱ {maq.horasKm}
              </p>

              <div className="maquinarias__card-service">
                <div className="maquinarias__service-label">
                  <span className="text-sm">{maq.serviceLabel}</span>
                  <span className={`text-sm font-semibold ${maq.vencido ? 'text-danger' : ''}`}>
                    {maq.vencido ? 'VENCIDO' : `${maq.serviceProgress}%`}
                  </span>
                </div>
                <div className="maquinarias__service-bar">
                  <div
                    className={`maquinarias__service-fill ${
                      maq.vencido ? 'maquinarias__service-fill--danger' :
                      maq.serviceProgress > 90 ? 'maquinarias__service-fill--warning' :
                      'maquinarias__service-fill--success'
                    }`}
                    style={{ width: `${Math.min(maq.serviceProgress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="maquinarias__card-actions">
                <button className="maquinarias__action">
                  <Eye size={14} /> Detalle
                </button>
                <button className="maquinarias__action">
                  <Edit size={14} /> Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Nueva Maquinaria">
        <form className="maquinarias__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="maquinarias__form-field">
            <label>Nombre / Modelo <span className="required">*</span></label>
            <input type="text" placeholder="Ej: Tractor John Deere 5075E" />
          </div>
          <div className="maquinarias__form-row">
            <div className="maquinarias__form-field">
              <label>ID Interno <span className="required">*</span></label>
              <input type="text" placeholder="Ej: MAQ-2024-001" />
            </div>
            <div className="maquinarias__form-field">
              <label>Horas / Km Actuales <span className="required">*</span></label>
              <input type="number" placeholder="0" />
            </div>
          </div>
          <div className="maquinarias__form-field">
            <label>Próximo Service <span className="required">*</span></label>
            <input type="text" placeholder="Ej: 1500hs" />
          </div>
          <div className="maquinarias__form-field mb-sm">
            <label>Foto de la Maquinaria</label>
            <div className="maquinarias__upload-zone">
              <ImageIcon size={32} className="text-secondary mb-sm" />
              <p className="text-sm">Arrastra la imagen o haz clic para subir</p>
              <input type="file" className="maquinarias__file-input" accept="image/*" />
            </div>
          </div>
          <div className="maquinarias__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Maquinaria</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
