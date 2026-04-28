import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const { t, toggleLang, lang } = useLanguage();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError(lang === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await register(email, password);
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
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <button onClick={toggleLang} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.2)', color:'#C47D2A', borderRadius:'6px', padding:'3px 10px', fontSize:'0.75rem', fontWeight:700, cursor:'pointer' }}>
                        {lang === 'es' ? 'EN' : 'ES'}
                    </button>
                </div>

                <h1 className="auth-title">{t('auth','registerTitle')}</h1>
                <p className="auth-subtitle">Autonomy Scanner — AonikLabs</p>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="register-email">{t('auth','email')}</label>
                        <input id="register-email" type="email" className="form-input" placeholder="you@company.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="register-password">{t('auth','password')}</label>
                        <input id="register-password" type="password" className="form-input" placeholder={t('auth','passwordMin')}
                            value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="register-confirm">{t('auth','confirmPassword')}</label>
                        <input id="register-confirm" type="password" className="form-input" placeholder="••••••••"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? '…' : t('auth','registerBtn')}
                    </button>
                </form>

                <div className="auth-footer">
                    {t('auth','haveAccount')} <Link to="/login">{t('auth','signInLink')}</Link>
                </div>
            </div>
        </div>
    );
}
