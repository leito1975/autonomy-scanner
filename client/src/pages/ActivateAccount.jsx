import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

export default function ActivateAccount() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('No activation token provided.');
            setLoading(false);
            return;
        }
        api.validateInviteToken(token)
            .then(({ email }) => {
                setEmail(email);
                setTokenValid(true);
            })
            .catch(() => setError('This invitation link is invalid or has expired.'))
            .finally(() => setLoading(false));
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const data = await api.activateAccount(token, password);
            localStorage.setItem('scanner_token', data.token);
            window.location.href = '/';
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="auth-container">
                <div className="loading">
                    <div className="loading-spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Activar cuenta</h1>
                <p className="auth-subtitle">AGOM Autonomy Scanner — AonikLabs</p>

                {error && <div className="alert alert-error">{error}</div>}

                {tokenValid && (
                    <>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            Activando cuenta para <strong style={{ color: 'var(--color-text)' }}>{email}</strong>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Nueva contraseña</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="Mínimo 6 caracteres"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirmar contraseña</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                    placeholder="Repetí la contraseña"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%' }}
                                disabled={submitting}
                            >
                                {submitting ? 'Activando…' : 'Activar cuenta'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
