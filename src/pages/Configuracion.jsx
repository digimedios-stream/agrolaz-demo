import { useState } from 'react';
import { Save, Building2, User, Bell, Settings as SettingsIcon, Plus, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import './Configuracion.css';

const tabs = [
  { id: 'empresa', label: 'Datos de Empresa', icon: Building2 },
  { id: 'perfil', label: 'Mi Perfil', icon: User },
  { id: 'alertas', label: 'Alertas', icon: Bell },
  { id: 'operativa', label: 'Operativa', icon: SettingsIcon },
];

export default function Configuracion() {
  const [activeTab, setActiveTab] = useState('empresa');
  const [showEspecieModal, setShowEspecieModal] = useState(false);
  const [catalogoCultivos, setCatalogoCultivos] = useState([
    { id: 1, nombre: 'Pimiento Rojo', emoji: '🌶️', activo: true },
    { id: 2, nombre: 'Pimiento Verde', emoji: '🫑', activo: true },
    { id: 3, nombre: 'Pimiento amarillo', emoji: '🫑', activo: true },
    { id: 4, nombre: 'Zapallo', emoji: '🎃', activo: true },
    { id: 5, nombre: 'Sandía', emoji: '🍉', activo: true },
    { id: 6, nombre: 'Frutilla', emoji: '🍓', activo: true },
  ]);

  return (
    <div className="configuracion">
      <div className="configuracion__header">
        <div>
          <h1>Configuración del Sistema</h1>
          <p>Administra las preferencias y parámetros de AgroLaz.</p>
        </div>
        <Button variant="primary" icon={Save}>Guardar Cambios</Button>
      </div>

      <div className="configuracion__content">
        <aside className="configuracion__tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`configuracion__tab ${activeTab === tab.id ? 'configuracion__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="configuracion__panel">
          {activeTab === 'empresa' && (
            <div className="configuracion__section animate-in">
              <h3>Datos de la Empresa</h3>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>
                Información legal y fiscal de la finca.
              </p>
              
              <div className="configuracion__form-row">
                <div className="configuracion__form-field">
                  <label>Razón Social</label>
                  <input type="text" defaultValue="AgroLaz S.A." />
                </div>
                <div className="configuracion__form-field">
                  <label>CUIT</label>
                  <input type="text" defaultValue="30-71234567-8" />
                </div>
              </div>
              
              <div className="configuracion__form-field mt-md">
                <label>Dirección Física</label>
                <input type="text" defaultValue="Ruta Prov. 302 Km 12, Tucumán" />
              </div>

              <div className="configuracion__form-row mt-md">
                <div className="configuracion__form-field">
                  <label>Moneda Principal</label>
                  <select defaultValue="ARS">
                    <option value="ARS">Pesos Argentinos (ARS)</option>
                    <option value="USD">Dólares Estadounidenses (USD)</option>
                  </select>
                </div>
                <div className="configuracion__form-field">
                  <label>Huso Horario</label>
                  <select defaultValue="ART">
                    <option value="ART">Argentina Time (GMT-3)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="configuracion__section animate-in">
              <h3>Mi Perfil y Seguridad</h3>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>
                Actualiza tus datos de contacto y credenciales.
              </p>

              <div className="configuracion__form-row">
                <div className="configuracion__form-field">
                  <label>Nombre Completo</label>
                  <input type="text" defaultValue="Ricardo Mendoza" />
                </div>
                <div className="configuracion__form-field">
                  <label>Teléfono</label>
                  <input type="tel" defaultValue="+54 9 381 123-4567" />
                </div>
              </div>

              <div className="configuracion__form-field mt-md">
                <label>Correo Electrónico</label>
                <input type="email" defaultValue="ricardo@agrolaz.com" />
              </div>

              <h4 style={{ marginTop: '32px', marginBottom: '16px' }}>Cambiar Contraseña</h4>
              <div className="configuracion__form-row">
                <div className="configuracion__form-field">
                  <label>Nueva Contraseña</label>
                  <input type="password" placeholder="Mínimo 8 caracteres" />
                </div>
                <div className="configuracion__form-field">
                  <label>Confirmar Contraseña</label>
                  <input type="password" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alertas' && (
            <div className="configuracion__section animate-in">
              <h3>Preferencias de Alertas</h3>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>
                Configura cómo y cuándo deseas recibir notificaciones.
              </p>

              <div className="configuracion__toggle-group">
                <div className="configuracion__toggle-item">
                  <div>
                    <strong>Alertas de Stock de Agroquímicos</strong>
                    <p className="text-sm text-secondary">Recibir un email cuando el stock cae por debajo del nivel de reposición.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="configuracion__toggle-item">
                  <div>
                    <strong>Mantenimiento de Maquinarias</strong>
                    <p className="text-sm text-secondary">Avisar 5 días antes de que venza un service programado.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="configuracion__toggle-item">
                  <div>
                    <strong>Resumen Semanal</strong>
                    <p className="text-sm text-secondary">Recibir un reporte de producción y ventas cada viernes a las 18:00hs.</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operativa' && (
            <div className="configuracion__section animate-in">
              <h3>Configuración Operativa</h3>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>
                Parámetros internos de los módulos del sistema.
              </p>

              <div className="configuracion__form-field mt-md">
                <label>Umbral de Stock Crítico (%)</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="number" defaultValue="20" style={{ width: '100px' }} />
                  <span className="text-secondary font-sm">
                    Si el stock baja de este porcentaje, se marca como Crítico.
                  </span>
                </div>
              </div>

              <div className="configuracion__form-field mt-md">
                <label>Días de Anticipación para Vencimientos</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input type="number" defaultValue="15" style={{ width: '100px' }} />
                  <span className="text-secondary font-sm">
                    Avisar cuando falten estos días para que venza un producto.
                  </span>
                </div>
              </div>

              <hr style={{ margin: '32px 0', borderColor: 'var(--border)' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ marginBottom: '4px' }}>Catálogo de Especies</h4>
                  <p className="text-sm text-secondary">Especies disponibles en el menú al registrar un cultivo.</p>
                </div>
                <Button variant="outline" size="sm" icon={Plus} onClick={() => setShowEspecieModal(true)}>Nueva Especie</Button>
              </div>

              <div className="configuracion__table-container">
                <table className="configuracion__table">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }}>ÍCONO</th>
                      <th>ESPECIE</th>
                      <th>ESTADO</th>
                      <th style={{ width: '80px', textAlign: 'center' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogoCultivos.map(c => (
                      <tr key={c.id}>
                        <td style={{ fontSize: '20px' }}>{c.emoji}</td>
                        <td className="font-semibold">{c.nombre}</td>
                        <td><span className="text-success text-sm font-semibold">Activo</span></td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="configuracion__action-btn" title="Desactivar / Ocultar">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      <Modal isOpen={showEspecieModal} onClose={() => setShowEspecieModal(false)} title="Agregar Nueva Especie" size="sm">
        <form className="configuracion__form" onSubmit={(e) => { e.preventDefault(); setShowEspecieModal(false); }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className="configuracion__form-field" style={{ width: '100px' }}>
              <label>Ícono <span className="required">*</span></label>
              <select required style={{ fontSize: '20px', textAlign: 'center', padding: '8px 12px' }}>
                <option value="🌱">🌱</option>
                <option value="🍅">🍅</option>
                <option value="🥬">🥬</option>
                <option value="🥕">🥕</option>
                <option value="🥦">🥦</option>
                <option value="🫑">🫑</option>
                <option value="🌽">🌽</option>
                <option value="🥔">🥔</option>
                <option value="🧅">🧅</option>
                <option value="🍆">🍆</option>
                <option value="🧄">🧄</option>
                <option value="🥜">🥜</option>
                <option value="🌿">🌿</option>
                <option value="🌾">🌾</option>
                <option value="🌻">🌻</option>
                <option value="🌳">🌳</option>
                <option value="🍎">🍎</option>
                <option value="🍋">🍋</option>
                <option value="🍇">🍇</option>
                <option value="🍉">🍉</option>
              </select>
            </div>
            <div className="configuracion__form-field" style={{ flex: 1 }}>
              <label>Nombre Especie <span className="required">*</span></label>
              <input type="text" placeholder="Ej: Berenjena" required />
            </div>
          </div>
          <div className="configuracion__form-actions" style={{ marginTop: '24px' }}>
            <Button variant="outline" onClick={() => setShowEspecieModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
