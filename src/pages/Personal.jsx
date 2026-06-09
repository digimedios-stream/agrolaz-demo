import { useState } from 'react';
import { Plus, Users, ClipboardCheck, DollarSign, Edit, Eye, CreditCard } from 'lucide-react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { personalStats, empleados, pagos, asistencia } from '../data/mockData';
import './Personal.css';

const tabs = ['Empleados', 'Asistencia', 'Pagos'];

export default function Personal() {
  const [activeTab, setActiveTab] = useState('Empleados');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="personal">
      <div className="personal__header">
        <div>
          <h1>Personal</h1>
          <p>Gestión de empleados, asistencia y pagos.</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
          Nuevo Empleado
        </Button>
      </div>

      <div className="personal__stats">
        <StatCard icon={Users} iconBg="primary" title="Empleados Activos" value={personalStats.empleadosActivos.value} label={personalStats.empleadosActivos.label} />
        <StatCard icon={ClipboardCheck} iconBg="success" title="Asistencia Hoy" value={personalStats.asistenciaHoy.value} label={personalStats.asistenciaHoy.label} />
        <StatCard icon={DollarSign} iconBg="warning" title="Sueldos del Mes" value={personalStats.sueldosMes.value} label={personalStats.sueldosMes.label} />
      </div>

      <div className="personal__table-section">
        <div className="personal__tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`personal__tab ${activeTab === tab ? 'personal__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Empleados' && (
          <div className="personal__table-scroll">
            <table className="personal__table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>DNI</th>
                  <th>Cargo</th>
                  <th>Fecha Ingreso</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      <div className="personal__empleado">
                        <span className="personal__avatar">{emp.initials}</span>
                        <span className="font-semibold">{emp.nombre}</span>
                      </div>
                    </td>
                    <td className="tabular-nums">{emp.dni}</td>
                    <td>{emp.cargo}</td>
                    <td className="text-secondary">{emp.fechaIngreso}</td>
                    <td className="text-secondary">{emp.telefono}</td>
                    <td><Badge variant={emp.estadoType} dot size="sm">{emp.estado}</Badge></td>
                    <td>
                      <div className="personal__actions">
                        <button className="personal__action-btn" title="Ver perfil"><Eye size={15} /></button>
                        <button className="personal__action-btn" title="Editar"><Edit size={15} /></button>
                        <button className="personal__action-btn" title="Registrar pago"><CreditCard size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Asistencia' && (
          <div className="personal__asistencia">
            <div className="personal__asistencia-header">
              <h3>{asistencia.mes}</h3>
              <div className="personal__asistencia-legend">
                <span className="personal__legend-item"><span className="personal__legend-dot personal__legend-dot--presente" /> Presente</span>
                <span className="personal__legend-item"><span className="personal__legend-dot personal__legend-dot--ausente" /> Ausente</span>
                <span className="personal__legend-item"><span className="personal__legend-dot personal__legend-dot--tarde" /> Tarde</span>
              </div>
            </div>
            <div className="personal__asistencia-grid">
              {asistencia.registros.map((reg, i) => (
                <div key={i} className="personal__asistencia-row">
                  <span className="personal__asistencia-name font-semibold">{reg.empleado}</span>
                  <div className="personal__asistencia-bars">
                    <div className="personal__bar">
                      <div className="personal__bar-fill personal__bar-fill--presente" style={{ width: `${(reg.presente / asistencia.dias) * 100}%` }} />
                    </div>
                    <div className="personal__bar-stats">
                      <span className="text-xs text-success">{reg.presente}P</span>
                      <span className="text-xs text-danger">{reg.ausente}A</span>
                      <span className="text-xs text-warning">{reg.tarde}T</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Pagos' && (
          <div className="personal__pagos">
            <div className="personal__pagos-header">
              <h3>Registro de Pagos</h3>
              <Button variant="primary" size="sm" icon={Plus}>Registrar Pago</Button>
            </div>
            <div className="personal__table-scroll">
              <table className="personal__table">
                <thead>
                  <tr>
                    <th>Empleado</th>
                    <th>Período</th>
                    <th>Monto</th>
                    <th>Fecha Pago</th>
                    <th>Método</th>
                    <th>Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {pagos.map(pago => (
                    <tr key={pago.id}>
                      <td className="font-semibold">{pago.empleado}</td>
                      <td>{pago.periodo}</td>
                      <td className="font-semibold tabular-nums">{pago.monto}</td>
                      <td className="text-secondary">{pago.fechaPago}</td>
                      <td>{pago.metodo}</td>
                      <td><Badge variant="default" size="sm">{pago.comprobante}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Nuevo Empleado">
        <form className="personal__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="personal__form-row">
            <div className="personal__form-field">
              <label>Nombre Completo <span className="required">*</span></label>
              <input type="text" placeholder="Nombre y apellido" />
            </div>
            <div className="personal__form-field">
              <label>DNI <span className="required">*</span></label>
              <input type="text" placeholder="XX.XXX.XXX" />
            </div>
          </div>
          <div className="personal__form-row">
            <div className="personal__form-field">
              <label>Cargo <span className="required">*</span></label>
              <select><option value="">Seleccionar...</option><option>Capataz</option><option>Peón General</option><option>Tractorista</option><option>Técnico</option><option>Administrativo</option></select>
            </div>
            <div className="personal__form-field">
              <label>Fecha de Ingreso <span className="required">*</span></label>
              <input type="date" />
            </div>
          </div>
          <div className="personal__form-field">
            <label>Teléfono</label>
            <input type="tel" placeholder="+54 9 XXX XXX-XXXX" />
          </div>
          <div className="personal__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Empleado</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
