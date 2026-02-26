import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../api/api';

export default function AuditPage() {
    const [logs, setLogs] = useState([]);
    const [duplicates, setDuplicates] = useState([]);

    useEffect(() => {
        api.get('/api/admin/audit')
            .then(r => {
                setLogs(r.data.logs || []);
                setDuplicates(r.data.duplicates || []);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="crm-layout">
            <Sidebar />
            <main className="crm-main">
                <div className="crm-topbar">
                    <div>
                        <div className="topbar-sub">Sistemas & Seguridad › Trazabilidad de Eventos</div>
                        <div className="topbar-title">Auditoría del Sistema</div>
                    </div>
                </div>

                <div className="crm-content fade-in">
                    <div className="section-card" style={{ marginBottom: '24px' }}>
                        <div className="section-header">
                            <div>
                                <div className="section-title">Logs de Actividad</div>
                                <div className="section-subtitle">Registro cronológico de operaciones</div>
                            </div>
                        </div>
                        <div className="section-body" style={{ padding: '0' }}>
                            <table className="crm-table">
                                <thead>
                                    <tr><th>Usuario</th><th>Evento</th><th>IP Origen</th><th>Fecha y Hora</th></tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr><td colSpan={4}>
                                            <div className="empty-state" style={{ padding: '40px 0' }}>
                                                <div className="empty-icon">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                        <polyline points="14 2 14 8 20 8"></polyline>
                                                    </svg>
                                                </div>
                                                <div style={{ color: 'var(--text-3)', marginTop: '12px' }}>Sin logs de actividad registrados</div>
                                            </div>
                                        </td></tr>
                                    ) : (
                                        logs.map((l, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: '600' }}>
                                                    {l.user_name || (l.user_id ? `ID: ${l.user_id.slice(0, 8)}` : 'Sistema')}
                                                </td>
                                                <td><span className="badge badge-blue" style={{ textTransform: 'uppercase', fontSize: '10px' }}>{l.action || l.event}</span></td>
                                                <td style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-2)' }}>{l.ip}</td>
                                                <td style={{ color: 'var(--text-3)', fontSize: '13px' }}>{new Date(l.created_at).toLocaleString('es')}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="section-card">
                        <div className="section-header">
                            <div>
                                <div className="section-title">Alertas de Seguridad</div>
                                <div className="section-subtitle">Detección de posibles duplicados o riesgos</div>
                            </div>
                        </div>
                        <div className="section-body" style={{ padding: '0' }}>
                            <table className="crm-table">
                                <thead>
                                    <tr><th>Administrador</th><th>Riesgo</th><th>Nuevo Registro</th><th>Similar Existente</th><th>Acción</th></tr>
                                </thead>
                                <tbody>
                                    {duplicates.length === 0 ? (
                                        <tr><td colSpan={5}>
                                            <div className="empty-state" style={{ padding: '40px 0' }}>
                                                <div className="empty-icon">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" strokeWidth="1">
                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                    </svg>
                                                </div>
                                                <div style={{ color: 'var(--text-3)', marginTop: '12px' }}>Sin alertas de seguridad pendientes</div>
                                            </div>
                                        </td></tr>
                                    ) : (
                                        duplicates.map((d, i) => (
                                            <tr key={i}>
                                                <td style={{ fontWeight: '600' }}>{d.admin_name || (d.admin_id ? d.admin_id.slice(0, 8) : 'S/N')}</td>
                                                <td>
                                                    <span className={`badge ${d.similitud > 75 ? 'badge-red' : 'badge-orange'}`} style={{ fontWeight: '700' }}>
                                                        {d.similitud}% Match
                                                    </span>
                                                </td>
                                                <td style={{ fontSize: '13px' }}>{d.nombre_nuevo}</td>
                                                <td style={{ fontSize: '13px', color: 'var(--text-2)' }}>{d.nombre_similar}</td>
                                                <td><span className="badge badge-gray" style={{ fontSize: '11px' }}>{d.accion}</span></td>
                                            </tr>
                                        ))
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
