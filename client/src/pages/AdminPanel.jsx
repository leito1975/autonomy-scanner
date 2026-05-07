import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('user');
    const [inviting, setInviting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchUsers = useCallback(async () => {
        try {
            const data = await api.getAdminUsers();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleInvite = async (e) => {
        e.preventDefault();
        setInviting(true);
        setError('');
        setSuccess('');
        try {
            await api.inviteUser(inviteEmail, inviteRole);
            setSuccess(`Invitación enviada a ${inviteEmail}`);
            setInviteEmail('');
            fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setInviting(false);
        }
    };

    const handleResendInvite = async (u) => {
        setError('');
        setSuccess('');
        try {
            await api.resendInvite(u.id);
            setSuccess(`Invitación reenviada a ${u.email}`);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleActive = async (u) => {
        setError('');
        try {
            await api.updateUser(u.id, { is_active: !u.is_active });
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (u) => {
        if (!window.confirm(`¿Eliminar al usuario ${u.email}? Esta acción no se puede deshacer.`)) return;
        setError('');
        try {
            await api.deleteUser(u.id);
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>
                    Panel de Administración
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                    Gestioná los usuarios de AGOM Autonomy Scanner.
                </p>
            </div>

            {error && (
                <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
                    {success}
                </div>
            )}

            {/* Invite form */}
            <div className="card card-body" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Invitar usuario
                </h2>
                <form onSubmit={handleInvite} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div className="form-group" style={{ flex: '1 1 260px', marginBottom: 0 }}>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={inviteEmail}
                            onChange={e => setInviteEmail(e.target.value)}
                            required
                            placeholder="usuario@empresa.com"
                        />
                    </div>
                    <div className="form-group" style={{ flex: '0 0 140px', marginBottom: 0 }}>
                        <label className="form-label">Rol</label>
                        <select
                            className="form-select"
                            value={inviteRole}
                            onChange={e => setInviteRole(e.target.value)}
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={inviting} style={{ flex: '0 0 auto' }}>
                        {inviting ? 'Enviando…' : 'Invitar'}
                    </button>
                </form>
            </div>

            {/* Users list */}
            <div className="card">
                <div className="card-header">
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Usuarios ({users.length})</h2>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    {loading ? (
                        <div className="loading" style={{ padding: '2rem' }}>
                            <div className="loading-spinner"></div>
                        </div>
                    ) : users.length === 0 ? (
                        <p style={{ padding: '2rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                            No hay usuarios registrados.
                        </p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                                    {['Email', 'Rol', 'Estado', 'Invitación', 'Creado', 'Acciones'].map(h => (
                                        <th key={h} style={{
                                            padding: '0.75rem 1rem',
                                            textAlign: 'left',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            color: 'var(--color-text-secondary)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                        }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr
                                        key={u.id}
                                        style={{ borderBottom: '1px solid var(--color-border)' }}
                                    >
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                                            {u.email}
                                            {u.id === currentUser?.id && (
                                                <span style={{
                                                    marginLeft: '0.5rem',
                                                    fontSize: '0.7rem',
                                                    color: 'var(--color-text-muted)',
                                                    fontStyle: 'italic',
                                                }}>
                                                    (vos)
                                                </span>
                                            )}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <span className={`admin-badge admin-badge-${u.role}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            <span className={`admin-badge admin-badge-${u.is_active ? 'active' : 'inactive'}`}>
                                                {u.is_active ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                            {u.has_pending_invite ? (
                                                <span style={{ color: 'var(--color-accent-amber)' }}>⏳ Pendiente</span>
                                            ) : '—'}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                            {new Date(u.created_at).toLocaleDateString('es-AR')}
                                        </td>
                                        <td style={{ padding: '0.75rem 1rem' }}>
                                            {u.id !== currentUser?.id && (
                                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                    {u.has_pending_invite && (
                                                        <button
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={() => handleResendInvite(u)}
                                                            title="Reenviar invitación"
                                                        >
                                                            Reenviar
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-sm btn-ghost"
                                                        onClick={() => handleToggleActive(u)}
                                                    >
                                                        {u.is_active ? 'Desactivar' : 'Activar'}
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleDelete(u)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
