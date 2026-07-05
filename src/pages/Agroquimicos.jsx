import { useState } from 'react';
import { Plus, Download, FlaskConical, AlertTriangle, Calendar, ClipboardCheck, Edit, Trash2, Droplets, Archive } from 'lucide-react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { agroquimicosStats, agroquimicosAlertas, agroquimicos, proximosVencimientos, categoriasResumen } from '../data/mockData';
import './Agroquimicos.css';

export default function Agroquimicos() {
  const [showModal, setShowModal] = useState(false);
  const [showAplicacionModal, setShowAplicacionModal] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="agroquimicos">
      <div className="agroquimicos__header">
        <div>
          <h1>Inventario e Insumos</h1>
          <p>Control centralizado de insumos, aplicaciones y cumplimiento normativo.</p>
        </div>
        <div className="agroquimicos__header-actions">
          <Button variant="outline" icon={Download}>Reporte Stock</Button>
          <Button variant="outline" icon={Droplets} onClick={() => setShowAplicacionModal(true)}>Registrar Aplicación</Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
            Ingresar Compra
          </Button>
        </div>
      </div>

      <div className="agroquimicos__alertas">
        <div className="agroquimicos__alerta agroquimicos__alerta--danger">
          <div className="agroquimicos__alerta-icon">
            <Calendar size={20} />
          </div>
          <div>
            <strong>{agroquimicosAlertas.porVencer.cantidad} productos por vencer</strong>
            <p>{agroquimicosAlertas.porVencer.mensaje}</p>
          </div>
        </div>
        <div className="agroquimicos__alerta agroquimicos__alerta--warning">
          <div className="agroquimicos__alerta-icon">
            <AlertTriangle size={20} />
          </div>
          <div>
            <strong>Stock bajo detectado</strong>
            <p>{agroquimicosAlertas.stockBajo.mensaje}</p>
          </div>
        </div>
      </div>

      <div className="agroquimicos__stats">
        <StatCard icon={Archive} iconBg="primary" title="Valor Inventario" value={agroquimicosStats.valorInventario.value}>
          <span className="text-sm text-success">⤴ {agroquimicosStats.valorInventario.trend}</span>
        </StatCard>
        <StatCard icon={FlaskConical} iconBg="success" title="Insumos Activos" value={agroquimicosStats.insumosActivos.value} label={agroquimicosStats.insumosActivos.label} />
        <StatCard icon={Calendar} iconBg="warning" title="Próxima Aplicación" value={agroquimicosStats.proximaAplicacion.value} label={agroquimicosStats.proximaAplicacion.label} />
        <StatCard icon={ClipboardCheck} iconBg="info" title="Última Auditoría" value={agroquimicosStats.ultimaAuditoria.value} label={agroquimicosStats.ultimaAuditoria.label} />
      </div>

      <div className="agroquimicos__table-section">
        <div className="agroquimicos__table-header">
          <h3>Inventario de Insumos</h3>
          <div className="agroquimicos__table-controls">
            <select className="agroquimicos__select"><option>Todos los tipos</option></select>
            <select className="agroquimicos__select"><option>Ordenar por Stock</option></select>
          </div>
        </div>
        <div className="agroquimicos__table-scroll">
          <table className="agroquimicos__table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>TIPO</th>
                <th>STOCK ACTUAL</th>
                <th>ESTADO</th>
                <th>VENCIMIENTO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {agroquimicos.map(item => (
                <tr key={item.id} className={item.estadoType === 'danger' ? 'agroquimicos__row--danger' : ''}>
                  <td>
                    <div className="font-semibold">{item.producto}</div>
                    <div className="text-xs text-muted">Lote: {item.lote}</div>
                  </td>
                  <td><Badge variant={item.tipoColor} size="sm">{item.tipo}</Badge></td>
                  <td>
                    <div className="agroquimicos__stock">
                      <span className="tabular-nums">{item.stockActual}</span>
                      <div className="agroquimicos__stock-bar">
                        <div
                          className={`agroquimicos__stock-fill agroquimicos__stock-fill--${item.estadoType}`}
                          style={{ width: `${Math.min(item.porcentaje, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted">Min: {item.stockMin}</span>
                    </div>
                  </td>
                  <td><Badge variant={item.estadoType} dot size="sm">{item.estado}</Badge></td>
                  <td className="tabular-nums">{item.vencimiento}</td>
                  <td>
                    <div className="agroquimicos__actions">
                      <button className="agroquimicos__action-btn" title="Editar"><Edit size={15} /></button>
                      <button className="agroquimicos__action-btn agroquimicos__action-btn--danger" title="Eliminar"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="agroquimicos__pagination">
          <span className="text-sm text-secondary">Mostrando {agroquimicos.length} de 24 productos</span>
          <div className="agroquimicos__pages">
            <button className="agroquimicos__page-btn active">1</button>
            <button className="agroquimicos__page-btn">2</button>
            <button className="agroquimicos__page-btn">3</button>
          </div>
        </div>
      </div>

      <div className="agroquimicos__bottom">
        <div className="agroquimicos__vencimientos">
          <div className="agroquimicos__vencimientos-header">
            <h3>Próximos Vencimientos</h3>
            <Badge variant="danger" size="sm">URGENTE</Badge>
          </div>
          {proximosVencimientos.map(v => (
            <div key={v.id} className="agroquimicos__vencimiento-item">
              <div className="agroquimicos__vencimiento-icon"><Calendar size={18} /></div>
              <div>
                <div className="font-semibold">{v.producto}</div>
                <div className="text-sm text-secondary">Vence en {v.diasRestantes} días</div>
              </div>
              <Button variant="primary" size="sm">USAR AHORA</Button>
            </div>
          ))}
        </div>

        <div className="agroquimicos__categorias">
          <h3>Resumen de Categorías</h3>
          {categoriasResumen.map(cat => (
            <div key={cat.nombre} className="agroquimicos__cat-item">
              <div className="agroquimicos__cat-label">
                <span>{cat.nombre}</span>
                <span className="font-semibold tabular-nums">{cat.porcentaje}%</span>
              </div>
              <div className="agroquimicos__cat-bar">
                <div className="agroquimicos__cat-fill" style={{ width: `${cat.porcentaje}%`, background: cat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Ingresar Nuevo Producto">
        <form className="agroquimicos__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="agroquimicos__form-field">
            <label>Nombre del Producto <span className="required">*</span></label>
            <input type="text" placeholder="Ej: Glifosato 48%" />
          </div>
          <div className="agroquimicos__form-row">
            <div className="agroquimicos__form-field">
              <label>Tipo <span className="required">*</span></label>
              <select><option value="">Seleccionar...</option><option>Semillas y Plantines</option><option>Agroquímico (Herbicida)</option><option>Agroquímico (Fertilizante)</option><option>Empaque y Cosecha (Cajones, Bolsas)</option><option>Riego y Suelo</option><option>Herramientas y Varios</option></select>
            </div>
            <div className="agroquimicos__form-field">
              <label>N° de Lote</label>
              <input type="text" placeholder="Ej: #GL-9023" />
            </div>
          </div>
          <div className="agroquimicos__form-row">
            <div className="agroquimicos__form-field">
              <label>Stock Inicial <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" placeholder="Cantidad" style={{ flex: 1 }} />
                <select style={{ width: '90px' }}>
                  <option>L</option>
                  <option>Kg</option>
                  <option>Unid.</option>
                  <option>Gr</option>
                  <option>Cc</option>
                </select>
              </div>
            </div>
            <div className="agroquimicos__form-field">
              <label>Stock Mínimo <span className="required">*</span></label>
              <input type="number" placeholder="Alerta cuando baje" />
            </div>
          </div>
          <div className="agroquimicos__form-row">
            <div className="agroquimicos__form-field">
              <label>Cultivo Destino (Opcional)</label>
              <select>
                <option value="">Uso General / Sin asignar</option>
                <option>Lote A-12 - Pimiento Rojo</option>
                <option>Lote B-04 - Zapallo</option>
                <option>Lote C-09 - Sandía</option>
                <option>Lote D-07 - Pimiento Verde</option>
              </select>
            </div>
            <div className="agroquimicos__form-field">
              <label>Fecha de Vencimiento <span className="required">*</span></label>
              <input type="date" />
            </div>
          </div>
          <div className="agroquimicos__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar Producto</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showAplicacionModal} onClose={() => setShowAplicacionModal(false)} title="Registrar Aplicación a Cultivo">
        <form className="agroquimicos__form" onSubmit={(e) => { e.preventDefault(); setShowAplicacionModal(false); }}>
          <div className="agroquimicos__form-field">
            <label>Cultivo / Lote Destino <span className="required">*</span></label>
            <select required>
              <option value="">Seleccionar...</option>
              <option>Lote A-12 - Pimiento Rojo</option>
              <option>Lote B-04 - Zapallo</option>
              <option>Lote C-09 - Sandía</option>
              <option>Lote D-07 - Pimiento Verde</option>
            </select>
          </div>
          <div className="agroquimicos__form-field">
            <label>Insumo a Aplicar <span className="required">*</span></label>
            <select required>
              <option value="">Seleccionar del inventario...</option>
              <option>Glifosato 48% SL (Stock: 250 L)</option>
              <option>Urea Granulada (Stock: 5.500 Kg)</option>
              <option>Abamectina 1.8% (Stock: 45 L)</option>
              <option>Fosfato Monoamónico (Stock: 2.200 Kg)</option>
            </select>
          </div>
          <div className="agroquimicos__form-row">
            <div className="agroquimicos__form-field">
              <label>Cantidad Aplicada <span className="required">*</span></label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" step="0.1" placeholder="Ej: 15" required style={{ flex: 1 }} />
                <select style={{ width: '80px' }}>
                  <option>L</option>
                  <option>Kg</option>
                  <option>Gr</option>
                  <option>Cc</option>
                </select>
              </div>
            </div>
            <div className="agroquimicos__form-field">
              <label>Fecha de Aplicación <span className="required">*</span></label>
              <input type="date" required />
            </div>
          </div>
          <div className="agroquimicos__form-field">
            <label>Observaciones / Maquinaria</label>
            <textarea rows="2" placeholder="Ej: Aplicado con Tractor 1 Fiat R60..." />
          </div>
          <div className="agroquimicos__form-actions" style={{ marginTop: '24px' }}>
            <Button variant="outline" onClick={() => setShowAplicacionModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit" icon={Droplets}>Registrar Aplicación</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
