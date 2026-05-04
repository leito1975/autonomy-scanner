import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function AssessmentWorkspace() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { lang } = useLanguage();

    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [addForm, setAddForm] = useState({ systemName: '', processName: '', description: '' });
    const [addError, setAddError] = useState('');
    const [saving, setSaving] = useState({});
    const [deleting, setDeleting] = useState(false);

    const es = lang === 'es';
    const MAX_SYSTEMS = 10;

    const AUTONOMY_OPTIONS = [
        { value: 0, label: es ? '0 — Manual'                      : '0 — Manual' },
        { value: 1, label: es ? '1 — Automatización'              : '1 — Automation' },
        { value: 2, label: es ? '2 — IA Asistida'                 : '2 — AI Assisted' },
        { value: 3, label: es ? '3 — Autonomía Supervisada'       : '3 — Supervised Autonomy' },
        { value: 4, label: es ? '4 — Autonomía Operacional'       : '4 — Operational Autonomy' },
    ];

    const GOVERNANCE_OPTIONS = [
        { value: 0, label: es ? '0 — Sin Controles'               : '0 — No Controls' },
        { value: 1, label: es ? '1 — Controles Básicos'           : '1 — Basic Controls' },
        { value: 2, label: es ? '2 — Supervisión Humana'          : '2 — Human Supervision' },
        { value: 3, label: es ? '3 — Gobernanza Estructurada'     : '3 — Structured Governance' },
        { value: 4, label: es ? '4 — Gobernanza Adaptativa'       : '4 — Adaptive Governance' },
    ];

    const ECONOMIC_OPTIONS = [
        { value: 0, label: es ? '0 — Sin Impacto Financiero'      : '0 — No Financial Impact' },
        { value: 1, label: es ? '1 — Exposición Baja'             : '1 — Low Exposure' },
        { value: 2, label: es ? '2 — Exposición Moderada'         : '2 — Moderate Exposure' },
        { value: 3, label: es ? '3 — Exposición Alta'             : '3 — High Exposure' },
        { value: 4, label: es ? '4 — Exposición Crítica'          : '4 — Critical Exposure' },
    ];

    const OPERATIONAL_OPTIONS = [
        { value: 0, label: es ? '0 — Impacto Mínimo'              : '0 — Minimal Impact' },
        { value: 1, label: es ? '1 — Impacto Local'               : '1 — Local Impact' },
        { value: 2, label: es ? '2 — Impacto Departamental'       : '2 — Departmental Impact' },
        { value: 3, label: es ? '3 — Impacto Organizacional'      : '3 — Organizational Impact' },
        { value: 4, label: es ? '4 — Impacto Estratégico'         : '4 — Strategic Impact' },
    ];

    const tx = (en, es_) => es ? es_ : en;

    const fetchAssessment = useCallback(async () => {
        try {
            const data = await api.getAssessment(id);
            setAssessment(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => { fetchAssessment(); }, [fetchAssessment]);

    const handleAddSystem = async (e) => {
        e.preventDefault();
        setAddError('');
        try {
            await api.addSystem(id, addForm);
            setAddForm({ systemName: '', processName: '', description: '' });
            setShowAddForm(false);
            fetchAssessment();
        } catch (err) {
            setAddError(err.message);
        }
    };

    const handleEvaluate = async (systemId, field, value) => {
        const key = `${systemId}-${field}`;
        setSaving((prev) => ({ ...prev, [key]: true }));
        try {
            const updateData = {};
            if (field === 'autonomy')    updateData.autonomyLevel    = Number(value);
            if (field === 'governance')  updateData.governanceLevel  = Number(value);
            if (field === 'economic')    updateData.economicExposure = Number(value);
            if (field === 'operational') updateData.operationalImpact= Number(value);
            await api.updateSystem(id, systemId, updateData);
            fetchAssessment();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving((prev) => ({ ...prev, [key]: false }));
        }
    };

    const handleDeleteSystem = async (systemId) => {
        if (!confirm(tx('Remove this system?', '¿Eliminar este sistema?'))) return;
        try {
            await api.deleteSystem(id, systemId);
            fetchAssessment();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAssessment = async () => {
        if (!confirm(tx('Delete this entire assessment? This cannot be undone.', '¿Eliminar esta evaluación? Esta acción no se puede deshacer.'))) return;
        setDeleting(true);
        try {
            await api.deleteAssessment(id);
            navigate('/');
        } catch (err) {
            setError(err.message);
            setDeleting(false);
        }
    };

    if (loading) return <div className="loading"><div className="loading-spinner"></div><p>…</p></div>;
    if (error && !assessment) return <div className="alert alert-error">{error}</div>;

    const systems = assessment?.systems || [];
    const scores = assessment?.scores || {};
    const canAddMore = systems.length < MAX_SYSTEMS;
    const hasEvaluatedSystems = scores.evaluatedCount > 0;

    return (
        <div>
            <div className="page-header">
                <div className="page-breadcrumb">
                    <Link to="/">← {tx('Dashboard', 'Dashboard')}</Link>
                </div>
                <div className="flex-between">
                    <div>
                        <h1 className="page-title">{assessment.organization_name}</h1>
                        <p className="page-subtitle">
                            {tx('Assessor', 'Auditor')}: {assessment.assessor_name} · {tx('Date', 'Fecha')}: {assessment.assessment_date}
                        </p>
                    </div>
                    <div className="flex-between gap-sm">
                        {hasEvaluatedSystems && (
                            <Link to={`/assessments/${id}/results`} className="btn btn-primary" id="view-results-btn">
                                {tx('View Results →', 'Ver Resultados →')}
                            </Link>
                        )}
                        <button className="btn btn-danger btn-sm" onClick={handleDeleteAssessment} disabled={deleting}>
                            {deleting ? '…' : tx('🗑 Delete', '🗑 Eliminar')}
                        </button>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="section-header">
                <div className="flex-between gap-md">
                    <h2 className="section-title">{tx('System Inventory', 'Inventario de Sistemas')}</h2>
                    <span className="counter-badge">{systems.length}/{MAX_SYSTEMS} {tx('systems', 'sistemas')}</span>
                </div>
                {canAddMore && (
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowAddForm(!showAddForm)} id="add-system-btn">
                        {showAddForm ? tx('Cancel', 'Cancelar') : tx('+ Add System', '+ Agregar Sistema')}
                    </button>
                )}
            </div>

            {showAddForm && (
                <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                    <div className="card-body">
                        {addError && <div className="alert alert-error">{addError}</div>}
                        <form onSubmit={handleAddSystem}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="sys-name">
                                        {tx('System Name *', 'Nombre del Sistema *')}
                                    </label>
                                    <input id="sys-name" type="text" className="form-input"
                                        placeholder={tx('e.g. Fraud Detection Engine', 'ej: Motor de Detección de Fraude')}
                                        value={addForm.systemName}
                                        onChange={(e) => setAddForm({ ...addForm, systemName: e.target.value })}
                                        required autoFocus />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="proc-name">
                                        {tx('Process Name *', 'Nombre del Proceso *')}
                                    </label>
                                    <input id="proc-name" type="text" className="form-input"
                                        placeholder={tx('e.g. Transaction Monitoring', 'ej: Monitoreo de Transacciones')}
                                        value={addForm.processName}
                                        onChange={(e) => setAddForm({ ...addForm, processName: e.target.value })}
                                        required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="sys-desc">
                                    {tx('Description (optional)', 'Descripción (opcional)')}
                                </label>
                                <input id="sys-desc" type="text" className="form-input"
                                    placeholder={tx('Brief description…', 'Descripción breve...')}
                                    value={addForm.description}
                                    onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm">
                                {tx('Add System', 'Agregar Sistema')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {systems.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🖥️</div>
                    <p className="empty-state-text">
                        {tx('No systems registered. Add your first system to begin the evaluation.',
                            'No hay sistemas registrados. Agregá el primero para comenzar la evaluación.')}
                    </p>
                </div>
            ) : (
                <div>
                    {systems.map((sys, idx) => (
                        <div key={sys.id} className="system-row" id={`system-${sys.id}`}>
                            <div className="system-row-header">
                                <div>
                                    <div className="system-row-name">
                                        <span style={{ color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>#{idx + 1}</span>
                                        {sys.system_name}
                                    </div>
                                    <div className="system-row-process">
                                        {sys.process_name}
                                        {sys.description && (
                                            <span style={{ color: 'var(--color-text-muted)' }}> — {sys.description}</span>
                                        )}
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-sm" onClick={() => handleDeleteSystem(sys.id)} title={tx('Remove', 'Eliminar')}>✕</button>
                            </div>
                            <div className="system-eval-grid">
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">
                                        {tx('Autonomy Level', 'Nivel de Autonomía')}
                                        <span className="eval-hint">{tx('How independently does this system act?', '¿Qué tan independiente actúa este sistema?')}</span>
                                    </label>
                                    <select className="form-select" value={sys.autonomy_level ?? ''}
                                        onChange={(e) => handleEvaluate(sys.id, 'autonomy', e.target.value)}
                                        disabled={saving[`${sys.id}-autonomy`]} id={`autonomy-${sys.id}`}>
                                        <option value="" disabled>{tx('Select level…', 'Seleccioná el nivel...')}</option>
                                        {AUTONOMY_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">
                                        {tx('Governance Level', 'Nivel de Gobernanza')}
                                        <span className="eval-hint">{tx('How controlled and audited is this system?', '¿Qué tan controlado y auditado está este sistema?')}</span>
                                    </label>
                                    <select className="form-select" value={sys.governance_level ?? ''}
                                        onChange={(e) => handleEvaluate(sys.id, 'governance', e.target.value)}
                                        disabled={saving[`${sys.id}-governance`]} id={`governance-${sys.id}`}>
                                        <option value="" disabled>{tx('Select level…', 'Seleccioná el nivel...')}</option>
                                        {GOVERNANCE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">
                                        {tx('Economic Exposure', 'Exposición Económica')}
                                        <span className="eval-hint">{tx('Can it generate autonomous costs or financial decisions?', '¿Puede generar costos autónomos o decisiones financieras?')}</span>
                                    </label>
                                    <select className="form-select" value={sys.economic_exposure ?? ''}
                                        onChange={(e) => handleEvaluate(sys.id, 'economic', e.target.value)}
                                        disabled={saving[`${sys.id}-economic`]} id={`economic-${sys.id}`}>
                                        <option value="" disabled>{tx('Select level…', 'Seleccioná el nivel...')}</option>
                                        {ECONOMIC_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">
                                        {tx('Operational Impact', 'Impacto Operativo')}
                                        <span className="eval-hint">{tx('How severe is the impact if this system fails or misbehaves?', '¿Qué tan grave es el impacto si este sistema falla o actúa mal?')}</span>
                                    </label>
                                    <select className="form-select" value={sys.operational_impact ?? ''}
                                        onChange={(e) => handleEvaluate(sys.id, 'operational', e.target.value)}
                                        disabled={saving[`${sys.id}-operational`]} id={`operational-${sys.id}`}>
                                        <option value="" disabled>{tx('Select level…', 'Seleccioná el nivel...')}</option>
                                        {OPERATIONAL_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {sys.autonomy_level !== null && sys.governance_level !== null &&
                             sys.economic_exposure !== null && sys.operational_impact !== null && (
                                <div style={{ marginTop: 'var(--space-sm)', textAlign: 'right' }}>
                                    <span className="badge badge-success">✓ {tx('Fully Evaluated', 'Evaluación Completa')}</span>
                                </div>
                            )}
                            {(sys.autonomy_level !== null || sys.governance_level !== null ||
                              sys.economic_exposure !== null || sys.operational_impact !== null) &&
                             !(sys.autonomy_level !== null && sys.governance_level !== null &&
                               sys.economic_exposure !== null && sys.operational_impact !== null) && (
                                <div style={{ marginTop: 'var(--space-sm)', textAlign: 'right' }}>
                                    <span className="badge badge-warning">⋯ {tx('Partial', 'Parcial')}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {hasEvaluatedSystems && (
                <>
                    <hr className="divider" />
                    <div className="flex-between">
                        <div>
                            <strong style={{ color: 'var(--color-text)' }}>{scores.evaluatedCount}/{scores.totalCount}</strong>{' '}
                            <span style={{ color: 'var(--color-text-secondary)' }}>{tx('systems evaluated', 'sistemas evaluados')}</span>
                        </div>
                        <Link to={`/assessments/${id}/results`} className="btn btn-primary">
                            {tx('View Results & Generate Report →', 'Ver Resultados y Generar Informe →')}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
