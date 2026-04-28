import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { t, toggleLang, lang } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Language toggle en la pantalla de login */}
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <button
                        onClick={toggleLang}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#C47D2A',
                            borderRadius: '6px',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}
                    >
                        {lang === 'es' ? 'EN' : 'ES'}
                    </button>
                </div>

                <h1 className="auth-title">{t('auth', 'loginTitle')}</h1>
                <p className="auth-subtitle">Autonomy Scanner — AonikLabs</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-email">{t('auth', 'email')}</label>
                        <input
                            id="login-email"
                            type="email"
                            className="form-input"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="login-password">{t('auth', 'password')}</label>
                        <input
                            id="login-password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? '…' : t('auth', 'loginBtn')}
                    </button>
                </form>

                <div className="auth-footer">
                    {t('auth', 'noAccount')} <Link to="/register">{t('auth', 'signUpLink')}</Link>
                </div>
            </div>
        </div>
    );
}
