import { useState } from 'react';
import { Plus, Sprout, Filter, Download, Check, MoreVertical } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { produccionStats, cultivos } from '../data/mockData';
import './Produccion.css';

const tabs = ['Todos', 'Por cosechar', 'Cosechados'];

export default function Produccion() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [showCosechaModal, setShowCosechaModal] = useState(false);
  const [showEstadoModal, setShowEstadoModal] = useState(false);
  const [selectedCultivo, setSelectedCultivo] = useState(null);
  const [page, setPage] = useState(1);

  const columns = [
    {
      header: 'Cultivo',
      render: (row) => (
        <div className="prod-cultivo">
          <span className="prod-cultivo__emoji">{row.emoji}</span>
          <span className="prod-cultivo__name">{row.hortaliza}</span>
        </div>
      ),
    },
    { header: 'Variedad', accessor: 'variedad' },
    {
      header: 'Lote / Naves',
      render: (row) => (
        <div>
          <div className="font-semibold">{row.lote}</div>
          <div className="text-sm text-secondary">{row.naves}</div>
        </div>
      ),
    },
    { header: 'Fecha Siembra', accessor: 'fechaSiembra' },
    { header: 'Fecha Cultivo Aprox.', accessor: 'fechaCultivo' },
    ...(activeTab === 'Cosechados'
      ? [{
          header: 'Rendimiento',
          render: (row) => <span className="font-semibold">{row.rendimiento || '-'}</span>,
        }]
      : [{
          header: 'Estado',
          render: (row) => (
            <div 
              onClick={() => { setSelectedCultivo(row); setShowEstadoModal(true); }}
              title="Clic para cambiar estado"
              style={{ cursor: 'pointer', display: 'inline-block', transition: 'opacity 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Badge variant={row.estadoType} dot>{row.estado}</Badge>
            </div>
          ),
        }]
    ),
    {
      header: 'Acciones',
      render: (row) => (
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {row.estado !== 'Cosechado' && (
            <button 
              className="prod-actions-btn" 
              title="Registrar Cosecha"
              onClick={() => setShowCosechaModal(true)}
              style={{ color: 'var(--success)' }}
            >
              <Check size={16} />
            </button>
          )}
          <button className="prod-actions-btn" title="Opciones"><MoreVertical size={16} /></button>
        </div>
      ),
      width: '80px',
    },
  ];

  const filteredCultivos = cultivos.filter(c => {
    if (activeTab === 'Todos') return true;
    if (activeTab === 'Cosechados') return c.estado === 'Cosechado';
    return c.estado !== 'Cosechado';
  });

  return (
    <div className="produccion">
      <div className="produccion__header">
        <div>
          <h1>Producción</h1>
          <p>Control operativo y gestión de ciclo de vida de cultivos por lote.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Nuevo Cultivo
        </Button>
      </div>

      <div className="produccion__stats">
        <StatCard
          icon={Sprout}
          iconBg="primary"
          title="Naves Totales Activas"
          value={produccionStats.superficie.value}
          label="Naves"
        >
          <span className="text-sm text-success">⤴ {produccionStats.superficie.trend}</span>
        </StatCard>
        <StatCard
          icon={Sprout}
          iconBg="success"
          title="Por Cosechar"
          value={produccionStats.porCosechar.value}
          label="Lotes"
        />
        <StatCard
          icon={Sprout}
          iconBg="primary"
          title="Estado de Salud"
          value={produccionStats.estadoSalud.value}
        >
          <div className="produccion__health-bar">
            <div className="produccion__health-fill" style={{ width: `${produccionStats.estadoSalud.percentage}%` }} />
          </div>
          <span className="text-xs text-secondary">{produccionStats.estadoSalud.percentage}% de las naves sin alertas críticas</span>
        </StatCard>
      </div>

      <div className="produccion__table-section">
        <div className="produccion__toolbar">
          <div className="produccion__tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`produccion__tab ${activeTab === tab ? 'produccion__tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="produccion__filters">
            <Button variant="outline" size="sm" icon={Filter}>Filtros</Button>
            <Button variant="outline" size="sm" icon={Download}>Exportar</Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredCultivos}
          currentPage={page}
          totalItems={filteredCultivos.length}
          pageSize={6}
          onPageChange={setPage}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Nuevo Cultivo">
        <form className="produccion__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="produccion__form-row">
            <div className="produccion__form-field">
              <label>Hortaliza <span className="required">*</span></label>
              <select><option value="">Seleccionar...</option><option>Tomate</option><option>Lechuga</option><option>Zanahoria</option><option>Brócoli</option><option>Pimiento</option><option>Choclo</option></select>
            </div>
            <div className="produccion__form-field">
              <label>Variedad <span className="required">*</span></label>
              <input type="text" placeholder="Ej: Cherry Red" />
            </div>
          </div>
          <div className="produccion__form-row">
            <div className="produccion__form-field">
              <label>Fecha de Siembra <span className="required">*</span></label>
              <input type="date" />
            </div>
            <div className="produccion__form-field">
              <label>Fecha Est. Cosecha</label>
              <input type="date" />
            </div>
          </div>
          <div className="produccion__form-row">
            <div className="produccion__form-field">
              <label>Lote <span className="required">*</span></label>
              <select><option value="">Seleccionar...</option><option>Lote A-12</option><option>Lote B-04</option><option>Lote C-09</option></select>
            </div>
            <div className="produccion__form-field">
              <label>Cant. Naves <span className="required">*</span></label>
              <input type="number" step="1" placeholder="Ej: 5" />
            </div>
          </div>
          <div className="produccion__form-field">
            <label>Notas</label>
            <textarea rows="3" placeholder="Observaciones adicionales..." />
          </div>
          <div className="produccion__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Cultivo</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showCosechaModal} onClose={() => setShowCosechaModal(false)} title="Registrar Cosecha" size="sm">
        <form className="produccion__form" onSubmit={(e) => { e.preventDefault(); setShowCosechaModal(false); }}>
          <p className="text-sm text-secondary" style={{ marginBottom: '16px' }}>
            Registra el rendimiento final para cerrar el ciclo de este cultivo.
          </p>
          <div className="produccion__form-field">
            <label>Fecha de Cosecha <span className="required">*</span></label>
            <input type="date" required />
          </div>
          <div className="produccion__form-field" style={{ marginTop: '16px' }}>
            <label>Rendimiento Total <span className="required">*</span></label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="number" step="0.1" placeholder="Ej: 15.5" required style={{ flex: 1 }} />
              <select style={{ width: '110px' }}>
                <option>Ton</option>
                <option>Kg</option>
                <option>Unidades</option>
                <option>Bolsas</option>
              </select>
            </div>
          </div>
          <div className="produccion__form-field" style={{ marginTop: '16px' }}>
            <label>Calidad Promedio</label>
            <select>
              <option>Exportación (Primera)</option>
              <option>Mercado Interno (Segunda)</option>
              <option>Industria</option>
            </select>
          </div>
          <div className="produccion__form-actions" style={{ marginTop: '24px' }}>
            <Button variant="outline" onClick={() => setShowCosechaModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" icon={Check}>Finalizar</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showEstadoModal} onClose={() => { setShowEstadoModal(false); setSelectedCultivo(null); }} title="Cambiar Estado" size="sm">
        <form className="produccion__form" onSubmit={(e) => { e.preventDefault(); setShowEstadoModal(false); setSelectedCultivo(null); }}>
          <p className="text-sm text-secondary" style={{ marginBottom: '16px' }}>
            Actualizando el estado del lote <strong className="text-text">{selectedCultivo?.lote}</strong> ({selectedCultivo?.hortaliza}).
          </p>
          <div className="produccion__form-field">
            <label>Nuevo Estado <span className="required">*</span></label>
            <select defaultValue={selectedCultivo?.estado} required>
              <option value="Óptimo">Óptimo</option>
              <option value="En Floración">En Floración</option>
              <option value="Mantenimiento">Mantenimiento / Aplicación</option>
              <option value="Riego Crítico">Riego Crítico / Sequía</option>
              <option value="Plaga / Enfermedad">Alerta: Plaga / Enfermedad</option>
              <option value="Listo para cosechar">Listo para cosechar</option>
            </select>
          </div>
          <div className="produccion__form-field" style={{ marginTop: '16px' }}>
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Ej: Se detectó pulgón, se requiere aplicar insecticida..." />
          </div>
          <div className="produccion__form-actions" style={{ marginTop: '24px' }}>
            <Button variant="outline" onClick={() => { setShowEstadoModal(false); setSelectedCultivo(null); }}>Cancelar</Button>
            <Button variant="primary" type="submit">Actualizar Estado</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
