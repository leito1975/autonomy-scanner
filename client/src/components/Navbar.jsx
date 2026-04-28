import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { t, toggleLang } = useLanguage();

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <span className="navbar-brand-icon">⚡</span>
                    {t('nav', 'brand')}
                </Link>
                <div className="navbar-actions">
                    {/* Language toggle */}
                    <button
                        onClick={toggleLang}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#C47D2A',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                        }}
                        title="Cambiar idioma / Switch language"
                    >
                        {t('nav', 'lang')}
                    </button>

                    {user && (
                        <>
                            <span className="navbar-user">{user.email}</span>
                            <button className="btn btn-ghost btn-sm" onClick={logout}>
                                {t('nav', 'logout')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
