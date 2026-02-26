import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SidebarNew() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isAdmin = ['super_admin', 'admin_rrhh', 'admin'].includes(user?.roleName || user?.userRole);
    const isSuperAdmin = (user?.roleName || user?.userRole) === 'super_admin';

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <aside className="crm-sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">C</div>
                <div>
                    <div className="sidebar-logo-name">CRM System</div>
                    <div className="sidebar-logo-sub">Panel de Administrador</div>
                </div>
            </div>

            {isAdmin && (
                <>
                    <div className="sidebar-section">
                        <div className="sidebar-section-label">Panel</div>
                        <nav className="sidebar-nav">
                            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                Inicio
                            </NavLink>
                            <NavLink to="/admin/notificaciones" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                Notificaciones
                            </NavLink>
                            <NavLink to="/admin/calendario" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                Calendario
                            </NavLink>
                        </nav>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-section-label">Gestión de Personas</div>
                        <nav className="sidebar-nav">
                            <NavLink to="/admin/employees" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Recursos Humanos
                            </NavLink>
                            <NavLink to="/admin/asistencia" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                                Asistencia
                            </NavLink>
                        </nav>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-section-label">Comercial</div>
                        <nav className="sidebar-nav">
                            <NavLink to="/admin/proyectos" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                                Proyectos
                            </NavLink>
                            <NavLink to="/admin/ventas" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                Ventas
                            </NavLink>
                            <NavLink to="/admin/finanzas" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                Finanzas
                            </NavLink>
                        </nav>
                    </div>

                    <div className="sidebar-section">
                        <div className="sidebar-section-label">Sistemas y Seguridad</div>
                        <nav className="sidebar-nav">
                            <NavLink to="/admin/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                                Analítica Web
                            </NavLink>
                            <NavLink to="/admin/audit" className={({ isActive }) => isActive ? 'active' : ''}>
                                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Auditoría
                            </NavLink>
                            {isSuperAdmin && (
                                <NavLink to="/admin/permissions" className={({ isActive }) => isActive ? 'active' : ''}>
                                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.07 4.93A10 10 0 1 0 4.93 19.07" />
                                    </svg>
                                    Permisos RBAC
                                </NavLink>
                            )}
                        </nav>
                    </div>
                </>
            )}

            {!isAdmin && (
                <div className="sidebar-section">
                    <div className="sidebar-section-label">Mi Portal</div>
                    <nav className="sidebar-nav">
                        <NavLink to="/employee/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Dashboard
                        </NavLink>
                    </nav>
                </div>
            )}

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-avatar">{user?.userName?.[0]?.toUpperCase() || 'U'}</div>
                    <div>
                        <div className="sidebar-user-name">{user?.userName || 'Usuario'}</div>
                        <div className="sidebar-user-role">{user?.roleName || user?.userRole || 'Empleado'}</div>
                    </div>
                </div>
                <button className="sidebar-logout" onClick={handleLogout}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
