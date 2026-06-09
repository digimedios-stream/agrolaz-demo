import { useState } from 'react';
import { Plus, UserPlus, Shield, Edit, Trash2 } from 'lucide-react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { usuarios } from '../data/mockData';
import './Usuarios.css';

export default function Usuarios() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="usuarios">
      <div className="usuarios__header">
        <div>
          <h1>Usuarios del Sistema</h1>
          <p>Administra los accesos, roles y permisos de la plataforma.</p>
        </div>
        <Button variant="primary" icon={UserPlus} onClick={() => setShowModal(true)}>
          Nuevo Usuario
        </Button>
      </div>

      <div className="usuarios__table-section">
        <div className="usuarios__table-scroll">
          <table className="usuarios__table">
            <thead>
              <tr>
                <th>USUARIO</th>
                <th>ROL</th>
                <th>ÚLTIMO ACCESO</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="usuarios__user-info">
                      <div className="usuarios__avatar">
                        {user.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold">{user.nombre}</div>
                        <div className="text-xs text-secondary">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Badge variant={user.rolColor} size="sm">
                      <Shield size={12} style={{ marginRight: 4 }} />
                      {user.rol}
                    </Badge>
                  </td>
                  <td className="text-secondary">{user.ultimoAcceso}</td>
                  <td><Badge variant={user.estadoType} dot size="sm">{user.estado}</Badge></td>
                  <td>
                    <div className="usuarios__actions">
                      <button className="usuarios__action-btn" title="Editar"><Edit size={15} /></button>
                      <button className="usuarios__action-btn usuarios__action-btn--danger" title="Eliminar"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Crear Nuevo Usuario">
        <form className="usuarios__form" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
          <div className="usuarios__form-field">
            <label>Nombre Completo <span className="required">*</span></label>
            <input type="text" placeholder="Ej: Juan Pérez" />
          </div>
          <div className="usuarios__form-field">
            <label>Correo Electrónico <span className="required">*</span></label>
            <input type="email" placeholder="Ej: juan@agrolaz.com" />
          </div>
          <div className="usuarios__form-row">
            <div className="usuarios__form-field">
              <label>Rol del Sistema <span className="required">*</span></label>
              <select>
                <option value="">Seleccionar rol...</option>
                <option>Administrador</option>
                <option>Gerente</option>
                <option>Operador</option>
              </select>
            </div>
            <div className="usuarios__form-field">
              <label>Contraseña Inicial <span className="required">*</span></label>
              <input type="password" placeholder="Min. 8 caracteres" />
            </div>
          </div>
          <div className="usuarios__form-actions">
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Crear Usuario</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
