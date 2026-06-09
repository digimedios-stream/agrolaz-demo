import { useState } from 'react';
import { Plus, Fuel, Droplet, Download, FileText, Image as ImageIcon } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { combustibleStats, movimientosCombustible } from '../data/mockData';
import './Combustible.css';

export default function Combustible() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [tipoMovimiento, setTipoMovimiento] = useState('consumo'); // 'consumo' o 'abastecimiento'

  const columns = [
    { header: 'Fecha', accessor: 'fecha', width: '150px' },
    {
      header: 'Tipo',
      render: (row) => <Badge variant={row.tipoColor} dot>{row.tipo}</Badge>,
    },
    {
      header: 'Detalle (Origen → Destino)',
      render: (row) => (
        <div>
          <div className="font-semibold text-sm">{row.origen} → {row.destino}</div>
          <div className="text-xs text-secondary">Operario: {row.operario} {row.odometro !== '-' ? `| Odóm: ${row.odometro}` : ''}</div>
        </div>
      ),
    },
    {
      header: 'Litros',
      render: (row) => (
        <span className={`font-semibold ${row.litros.startsWith('+') ? 'text-success' : 'text-danger'}`}>
          {row.litros}
        </span>
      ),
    },
    {
      header: 'Comprobante',
      render: (row) => (
        row.ticketUrl ? (
          <button className="combustible__ticket-btn" title="Ver Ticket/Foto">
            <ImageIcon size={18} />
          </button>
        ) : (
          <span className="text-secondary">-</span>
        )
      ),
      width: '100px',
    },
  ];

  return (
    <div className="combustible">
      <div className="combustible__header">
        <div>
          <h1>Gestión de Combustible</h1>
          <p>Control de inventario en cisternas/bidones y bitácora de consumo por maquinaria.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Registrar Movimiento
        </Button>
      </div>

      <div className="combustible__stats">
        <StatCard
          icon={Droplet}
          iconBg="primary"
          title="Tanque / Cisterna Principal"
          value={`${combustibleStats.cisterna.value} L`}
          label={`Capacidad: ${combustibleStats.cisterna.max} L`}
        >
          <div className="combustible__tank-bar">
            <div className="combustible__tank-fill" style={{ width: '84%' }} />
          </div>
        </StatCard>
        
        <StatCard
          icon={Droplet}
          iconBg="warning"
          title="Bidones Móviles"
          value={`${combustibleStats.bidones.value} L`}
          label={`Capacidad: ${combustibleStats.bidones.max} L`}
        >
          <div className="combustible__tank-bar">
            <div className="combustible__tank-fill combustible__tank-fill--warning" style={{ width: '70%' }} />
          </div>
        </StatCard>

        <StatCard
          icon={Fuel}
          iconBg="danger"
          title="Consumo del Mes"
          value={combustibleStats.consumoMensual.value}
          label="Total de litros consumidos"
        >
          <span className="text-sm text-danger">{combustibleStats.consumoMensual.trend}</span>
        </StatCard>

        <StatCard
          icon={FileText}
          iconBg="success"
          title="Gasto Estimado"
          value={combustibleStats.ultimoGasto.value}
          label={combustibleStats.ultimoGasto.label}
        />
      </div>

      <div className="combustible__table-section">
        <div className="combustible__toolbar">
          <h3 className="combustible__table-title">Bitácora de Movimientos</h3>
          <Button variant="outline" size="sm" icon={Download}>Exportar Excel</Button>
        </div>

        <DataTable
          columns={columns}
          data={movimientosCombustible}
          currentPage={page}
          totalItems={movimientosCombustible.length}
          pageSize={6}
          onPageChange={setPage}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Movimiento de Combustible" size="md">
        <form className="combustible__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          
          <div className="combustible__form-row">
            <div className="combustible__form-field">
              <label>Tipo de Movimiento <span className="required">*</span></label>
              <select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
                <option value="consumo">Consumo (Carga a Maquinaria)</option>
                <option value="abastecimiento">Abastecimiento (Compra a Proveedor)</option>
              </select>
            </div>
            <div className="combustible__form-field">
              <label>Fecha y Hora <span className="required">*</span></label>
              <input type="datetime-local" required />
            </div>
          </div>

          {tipoMovimiento === 'consumo' ? (
            <>
              <div className="combustible__form-row">
                <div className="combustible__form-field">
                  <label>Origen del Combustible <span className="required">*</span></label>
                  <select required>
                    <option value="cisterna">Cisterna Principal</option>
                    <option value="bidon">Bidón Móvil</option>
                  </select>
                </div>
                <div className="combustible__form-field">
                  <label>Maquinaria Destino <span className="required">*</span></label>
                  <select required>
                    <option value="">Seleccionar máquina...</option>
                    <option>Tractor John Deere 5075E</option>
                    <option>Cosechadora Case IH</option>
                    <option>Pulverizadora Pla</option>
                  </select>
                </div>
              </div>
              
              <div className="combustible__form-row">
                <div className="combustible__form-field">
                  <label>Litros Cargados <span className="required">*</span></label>
                  <input type="number" step="0.1" placeholder="Ej: 150" required />
                </div>
                <div className="combustible__form-field">
                  <label>Odómetro / Horómetro Actual <span className="required">*</span></label>
                  <input type="text" placeholder="Ej: 1250 hs" required />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="combustible__form-row">
                <div className="combustible__form-field">
                  <label>Proveedor <span className="required">*</span></label>
                  <input type="text" placeholder="Ej: YPF Agro" required />
                </div>
                <div className="combustible__form-field">
                  <label>Destino <span className="required">*</span></label>
                  <select required>
                    <option value="cisterna">Cisterna Principal</option>
                    <option value="bidon">Bidones Móviles</option>
                  </select>
                </div>
              </div>
              <div className="combustible__form-row">
                <div className="combustible__form-field">
                  <label>Litros Comprados <span className="required">*</span></label>
                  <input type="number" step="0.1" placeholder="Ej: 3000" required />
                </div>
                <div className="combustible__form-field">
                  <label>Nº Remito / Factura</label>
                  <input type="text" placeholder="Ej: 0001-00001234" />
                </div>
              </div>
            </>
          )}

          <div className="combustible__form-field mt-md">
            <label>Evidencia (Foto del Surtidor / Ticket)</label>
            <div className="combustible__upload-zone">
              <ImageIcon size={32} className="text-secondary mb-sm" />
              <p className="text-sm">Arrastra la imagen o haz clic para subir</p>
              <input type="file" className="combustible__file-input" accept="image/*" />
            </div>
          </div>

          <div className="combustible__form-actions mt-lg">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Registrar Movimiento</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
