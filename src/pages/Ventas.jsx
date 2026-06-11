import { useState } from 'react';
import { Plus, DollarSign, ShoppingCart, TrendingUp, Download, Filter, Landmark, CreditCard, Monitor, Banknote, MoreVertical } from 'lucide-react';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { ventasStats, ventas, ventasResumen } from '../data/mockData';
import './Ventas.css';

const pagoIcons = {
  landmark: Landmark,
  'credit-card': CreditCard,
  monitor: Monitor,
  banknote: Banknote,
};

export default function Ventas() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="ventas">
      <div className="ventas__header">
        <div>
          <h1>Ventas</h1>
          <p>Monitoreo de transacciones y facturación comercial.</p>
        </div>
        <div className="ventas__header-actions">
          <Button variant="outline" icon={Download}>Exportar Reporte</Button>
          <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
            Nueva Venta
          </Button>
        </div>
      </div>

      <div className="ventas__stats">
        <StatCard
          icon={DollarSign}
          iconBg="primary"
          title="Total Facturado Mes"
          value={ventasStats.totalFacturado.value}
          trend={ventasStats.totalFacturado.trend}
          trendUp={ventasStats.totalFacturado.trendUp}
        >
          <span className="text-sm text-secondary">Ventas brutas acumuladas en Agosto</span>
        </StatCard>
        <StatCard
          icon={ShoppingCart}
          iconBg="success"
          title="Cantidad de Ventas"
          value={ventasStats.cantidadVentas.value}
          trend={ventasStats.cantidadVentas.extra}
          trendUp
        >
          <span className="text-sm text-secondary">Operaciones comerciales procesadas</span>
        </StatCard>
        <div className="ventas__destacada">
          <div className="ventas__destacada-badge">DESTACADO</div>
          <h4>{ventasStats.cosechaDestacada.nombre}</h4>
          <p>{ventasStats.cosechaDestacada.descripcion}</p>
          <div className="ventas__destacada-footer">
            <div>
              <span className="text-xs text-secondary">VALOR ESTIMADO</span>
              <span className="ventas__destacada-valor">{ventasStats.cosechaDestacada.valor}</span>
            </div>
            <Button variant="outline" size="sm">Liquidar</Button>
          </div>
        </div>
      </div>

      <div className="ventas__table-section">
        <div className="ventas__table-header">
          <h3>Registro de Transacciones</h3>
          <div className="ventas__table-actions">
            <Button variant="outline" size="sm" icon={Filter}>Filtros</Button>
            <Button variant="outline" size="sm" icon={Download}>Exportar</Button>
          </div>
        </div>
        <div className="ventas__table-scroll">
          <table className="ventas__table">
            <thead>
              <tr>
                <th>Comprobante</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Pago</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => {
                const PayIcon = pagoIcons[v.pagoIcon] || Banknote;
                return (
                  <tr key={v.id}>
                    <td className="font-semibold" style={{ color: 'var(--primary)' }}>{v.comprobante}</td>
                    <td className="text-secondary">{v.fecha}</td>
                    <td>
                      <div>{v.cliente}</div>
                      <div className="text-xs text-muted">{v.clienteCuit}</div>
                    </td>
                    <td><Badge variant="default" size="sm">{v.producto}</Badge></td>
                    <td className="tabular-nums">{v.cantidad}</td>
                    <td>
                      <div className="ventas__pago">
                        <PayIcon size={14} />
                        <span>{v.pago}</span>
                      </div>
                    </td>
                    <td className="font-semibold tabular-nums">{v.total}</td>
                    <td>
                      <button className="ventas__more-btn"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ventas__pagination">
          <span className="text-sm text-secondary">Mostrando {ventas.length} de 148 ventas</span>
          <div className="ventas__pages">
            <button className="ventas__page-btn active">1</button>
            <button className="ventas__page-btn">2</button>
            <button className="ventas__page-btn">3</button>
          </div>
        </div>
      </div>

      <div className="ventas__resumen">
        <div className="ventas__resumen-card">
          <span className="text-xs font-semibold text-secondary">IMPUESTOS RETENIDOS</span>
          <span className="ventas__resumen-valor text-danger tabular-nums">{ventasResumen.impuestosRetenidos}</span>
        </div>
        <div className="ventas__resumen-card">
          <span className="text-xs font-semibold text-secondary">PENDIENTE COBRO</span>
          <span className="ventas__resumen-valor text-warning tabular-nums">{ventasResumen.pendienteCobro}</span>
        </div>
        <div className="ventas__resumen-card ventas__resumen-card--highlight">
          <span className="text-xs font-semibold" style={{ color: 'var(--primary-hover)' }}>GANANCIA NETA ESTIMADA</span>
          <span className="ventas__resumen-valor tabular-nums" style={{ color: 'var(--text)' }}>{ventasResumen.gananciaNeta}</span>
          <TrendingUp size={20} style={{ color: 'var(--primary-hover)', marginLeft: 'auto' }} />
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Nueva Venta" drawer>
        <form className="ventas__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="ventas__form-field">
            <label>Producto <span className="required">*</span></label>
            <select><option value="">Seleccionar producto...</option><option>Tomate Cherry</option><option>Lechuga Romana</option><option>Trigo Grado 1</option><option>Maíz Pisingallo</option></select>
          </div>
          <div className="ventas__form-field">
            <label>Cantidad <span className="required">*</span></label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="number" step="0.1" placeholder="Ej: 100" style={{ flex: 1 }} />
              <select style={{ width: '130px' }}>
                <option value="ton">Toneladas</option>
                <option value="kg">Kg</option>
                <option value="unidades">Unidades</option>
                <option value="bolsas">Bolsas</option>
                <option value="cajones">Cajones</option>
              </select>
            </div>
          </div>
          <div className="ventas__form-field">
            <label>Precio Unitario ($) <span className="required">*</span></label>
            <input type="number" placeholder="0.00" />
          </div>
          <div className="ventas__form-field">
            <label>Cliente <span className="required">*</span></label>
            <input type="text" placeholder="Nombre o razón social" />
          </div>
          <div className="ventas__form-field">
            <label>CUIT</label>
            <input type="text" placeholder="XX-XXXXXXXX-X" />
          </div>
          <div className="ventas__form-field">
            <label>Método de Pago <span className="required">*</span></label>
            <select><option value="">Seleccionar...</option><option>Efectivo</option><option>Transferencia</option><option>Cheque</option><option>E-Check</option></select>
          </div>
          <div className="ventas__form-field">
            <label>Observaciones</label>
            <textarea rows="3" placeholder="Notas adicionales..." />
          </div>
          <div className="ventas__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Registrar Venta</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
