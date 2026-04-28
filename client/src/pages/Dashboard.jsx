import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { t } = useLanguage();

    useEffect(() => {
        api.getAssessments()
            .then(setAssessments)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>…</p>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header flex-between">
                <div>
                    <h1 className="page-title">{t('dashboard', 'title')}</h1>
                    <p className="page-subtitle">{t('dashboard', 'subtitle')}</p>
                </div>
                <Link to="/assessments/new" className="btn btn-primary" id="new-assessment-btn">
                    {t('dashboard', 'newBtn')}
                </Link>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {assessments.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <p className="empty-state-text">{t('dashboard', 'empty')}</p>
                    <Link to="/assessments/new" className="btn btn-primary">
                        {t('dashboard', 'newBtn')}
                    </Link>
                </div>
            ) : (
                <div>
                    {assessments.map((a) => (
                        <Link
                            key={a.id}
                            to={`/assessments/${a.id}`}
                            className="assessment-item"
                            id={`assessment-${a.id}`}
                        >
                            <div className="assessment-item-info">
                                <div className="assessment-item-org">{a.organization_name}</div>
                                <div className="assessment-item-meta">
                                    <span>📅 {a.assessment_date}</span>
                                    <span>👤 {a.assessor_name}</span>
                                    <span>🖥️ {a.system_count} {a.system_count !== 1 ? t('dashboard', 'systemsP') : t('dashboard', 'systems')}</span>
                                    {a.evaluated_count > 0 && (
                                        <span className="badge badge-success">
                                            {a.evaluated_count} {t('dashboard', 'evaluated')}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="assessment-item-arrow">→</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
