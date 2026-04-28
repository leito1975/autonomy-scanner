import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function CreateAssessment() {
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    const [form, setForm] = useState({
        organizationName: '',
        assessorName: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        notes: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const assessment = await api.createAssessment(form);
            navigate(`/assessments/${assessment.id}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const labels = {
        back:       lang === 'es' ? '← Volver al Dashboard' : '← Back to Dashboard',
        title:      lang === 'es' ? 'Nueva Evaluación'       : 'New Assessment',
        subtitle:   lang === 'es' ? 'Configurá una nueva evaluación de gobernanza AGOM' : 'Set up a new AGOM governance assessment',
        orgName:    lang === 'es' ? 'Nombre de la Organización *' : 'Organization Name *',
        orgPH:      lang === 'es' ? 'ej: Acme S.A.'              : 'Acme Corporation',
        assessor:   lang === 'es' ? 'Nombre del Auditor *'        : 'Assessor Name *',
        assessorPH: lang === 'es' ? 'ej: Juan Pérez'             : 'Jane Smith',
        date:       lang === 'es' ? 'Fecha de Evaluación *'       : 'Assessment Date *',
        notes:      lang === 'es' ? 'Notas (opcional)'            : 'Notes (optional)',
        notesPH:    lang === 'es' ? 'Contexto adicional...'       : 'Any additional context…',
        cancel:     lang === 'es' ? 'Cancelar'                    : 'Cancel',
        create:     lang === 'es' ? (loading ? 'Creando...' : 'Crear Evaluación') : (loading ? 'Creating…' : 'Create Assessment'),
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="page-header">
                <div className="page-breadcrumb"><Link to="/">{labels.back}</Link></div>
                <h1 className="page-title">{labels.title}</h1>
                <p className="page-subtitle">{labels.subtitle}</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="org-name">{labels.orgName}</label>
                            <input id="org-name" name="organizationName" type="text" className="form-input"
                                placeholder={labels.orgPH} value={form.organizationName} onChange={handleChange} required autoFocus />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="assessor-name">{labels.assessor}</label>
                                <input id="assessor-name" name="assessorName" type="text" className="form-input"
                                    placeholder={labels.assessorPH} value={form.assessorName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="assessment-date">{labels.date}</label>
                                <input id="assessment-date" name="assessmentDate" type="date" className="form-input"
                                    value={form.assessmentDate} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="notes">{labels.notes}</label>
                            <textarea id="notes" name="notes" className="form-textarea"
                                placeholder={labels.notesPH} value={form.notes} onChange={handleChange} rows={3} />
                        </div>
                        <div className="flex-between" style={{ marginTop: 'var(--space-lg)' }}>
                            <Link to="/" className="btn btn-ghost">{labels.cancel}</Link>
                            <button type="submit" className="btn btn-primary" disabled={loading}>{labels.create}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
