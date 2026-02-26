import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/api';

export default function PermissionsPage() {
    const [matrix, setMatrix] = useState({ roles: [], permisos: [], assignedSet: [] });

    useEffect(() => {
        api.get('/api/permissions/matrix')
            .then(r => setMatrix(r.data))
            .catch(console.error);
    }, []);

    const togglePermission = async (roleId, permisoId) => {
        try {
            await api.post('/api/permissions/toggle', { roleId, permisoId });
            // Refresh
            const { data } = await api.get('/api/permissions/matrix');
            setMatrix(data);
        } catch (err) {
            alert('Error al actualizar permiso');
        }
    };

    const isGranted = (roleId, permisoId) => {
        return matrix.assignedSet?.includes(`${roleId}:${permisoId}`);
    };

    return (
        <div className="crm-layout">
            <Sidebar />
            <main className="crm-main">
                <div className="crm-topbar">
                    <div>
                        <div className="topbar-sub">Sistemas y Seguridad › Control de Acceso</div>
                        <div className="topbar-title">Gestión de Permisos RBAC</div>
                    </div>
                </div>

                <div className="crm-content fade-in">
                    <div className="section-card">
                        <div className="section-header">
                            <div>
                                <div className="section-title">Matriz de Roles & Privilegios</div>
                                <div className="section-subtitle">Asignación granular de capacidades por perfil de usuario</div>
                            </div>
                        </div>
                        <div className="section-body" style={{ padding: '0' }}>
                            <table className="crm-table">
                                <thead>
                                    <tr>
                                        <th style={{ minWidth: '200px' }}>Módulo / Área</th>
                                        <th>Acción Permitida</th>
                                        {matrix.roles?.map(r => (
                                            <th key={r.id} style={{ textAlign: 'center', width: '120px' }}>{r.nombre}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {matrix.permisos?.map((perm) => (
                                        <tr key={perm.id}>
                                            <td style={{ fontWeight: '600', color: 'var(--text)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontSize: '10px', background: 'var(--bg-hover)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-3)' }}>MOD</span>
                                                    {perm.modulo}
                                                </div>
                                            </td>
                                            <td style={{ color: 'var(--text-2)', fontSize: '13px' }}>{perm.accion}</td>
                                            {matrix.roles?.map(role => (
                                                <td key={role.id} style={{ textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <label className="checkbox-container">
                                                            <input
                                                                type="checkbox"
                                                                checked={isGranted(role.id, perm.id)}
                                                                onChange={() => togglePermission(role.id, perm.id)}
                                                            />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {!matrix.permisos?.length && (
                                        <tr>
                                            <td colSpan={10}>
                                                <div className="empty-state" style={{ padding: '60px 0' }}>
                                                    <div className="empty-icon">
                                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1">
                                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                        </svg>
                                                    </div>
                                                    <div style={{ marginTop: '16px', color: 'var(--text-3)', fontWeight: '500' }}>Configurando matriz de seguridad...</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
