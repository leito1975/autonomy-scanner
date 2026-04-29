import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import ScoreCard from '../components/ScoreCard';
import { useLanguage } from '../context/LanguageContext';

export default function AssessmentResults() {
    const { id } = useParams();
    const { lang } = useLanguage();
    const es = lang === 'es';
    const tx = (en, es_) => es ? es_ : en;

    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploadMsg, setUploadMsg] = useState('');
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const AUTONOMY_LABELS = {
        0: tx('Manual',                'Manual'),
        1: tx('Automation',            'Automatización'),
        2: tx('AI Assisted',           'IA Asistida'),
        3: tx('Supervised Autonomy',   'Autonomía Supervisada'),
        4: tx('Operational Autonomy',  'Autonomía Operacional'),
    };

    const GOVERNANCE_LABELS = {
        0: tx('No Controls',           'Sin Controles'),
        1: tx('Basic Controls',        'Controles Básicos'),
        2: tx('Human Supervision',     'Supervisión Humana'),
        3: tx('Structured Governance', 'Gobernanza Estructurada'),
        4: tx('Adaptive Governance',   'Gobernanza Adaptativa'),
    };

    useEffect(() => {
        api.getAssessment(id)
            .then(setAssessment)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBrandingUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setUploadMsg('');
        try {
            await api.uploadBranding(id, file);
            setUploadMsg(tx('Branding image uploaded successfully!', '¡Imagen de branding subida correctamente!'));
            const updated = await api.getAssessment(id);
            setAssessment(updated);
        } catch (err) {
            setUploadMsg(`Error: ${err.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveBranding = async () => {
        try {
            await api.removeBranding(id);
            setUploadMsg(tx('Branding removed.', 'Branding eliminado.'));
            const updated = await api.getAssessment(id);
            setAssessment(updated);
        } catch (err) {
            setUploadMsg(`Error: ${err.message}`);
        }
    };

    const handleDownloadPdf = () => {
        const token = localStorage.getItem('scanner_token');
        const apiBase = (import.meta.env.VITE_API_URL || '') + '/api';
        const url = `${apiBase}/assessments/${id}/report`;
        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                if (!res.ok) throw new Error(tx('Failed to generate report', 'Error al generar el informe'));
                return res.blob();
            })
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = `AGOM-Report-${assessment.organization_name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
                a.click();
                URL.revokeObjectURL(blobUrl);
            })
            .catch((err) => setError(err.message));
    };

    if (loading) return <div className="loading"><div className="loading-spinner"></div><p>…</p></div>;
    if (error && !assessment) return <div className="alert alert-error">{error}</div>;

    const { scores, systems } = assessment;
    const evaluatedSystems = systems.filter(s => s.autonomy_level !== null && s.governance_level !== null);
    const gapClass = scores.governanceGap > 0 ? 'gap-positive' : scores.governanceGap < 0 ? 'gap-negative' : 'gap-neutral';

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div className="page-breadcrumb">
                    <Link to={`/assessments/${id}`}>← {tx('Back to Workspace', 'Volver al Workspace')}</Link>
                </div>
                <div className="flex-between">
                    <div>
                        <h1 className="page-title">{tx('Assessment Results', 'Resultados de la Evaluación')}</h1>
                        <p className="page-subtitle">{assessment.organization_name} · {assessment.assessment_date}</p>
                    </div>
                    <button className="btn btn-primary" onClick={handleDownloadPdf} id="generate-report-btn">
                        📄 {tx('Generate Report', 'Generar Informe')}
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {/* Score Cards */}
            <div className="score-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                <ScoreCard label={tx('Autonomy Score', 'Autonomy Score')} value={scores.autonomyScore?.toFixed(2)} color="var(--color-primary)" />
                <ScoreCard label={tx('Governance Score', 'Governance Score')} value={scores.governanceScore?.toFixed(2)} color="var(--color-success)" />
                <ScoreCard label="AGI Index" value={scores.agiIndex?.toFixed(2)} color="var(--color-warning)" />
                <ScoreCard label="Governance Gap" value={scores.governanceGap?.toFixed(2)} color={scores.governanceGap > 0 ? 'var(--color-error)' : 'var(--color-success)'} />
            </div>

            {/* Gap Interpretation */}
            <div className={`card gap-card ${gapClass}`} style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="card-body">
                    <h3 style={{ marginBottom: 'var(--space-sm)', fontWeight: 700 }}>
                        {tx('Governance Gap Analysis', 'Análisis de Governance Gap')}
                    </h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                        {scores.governanceGap > 0 && (
                            <>
                                <strong>{tx('Risk:', 'Riesgo:')}</strong> {tx('Autonomy exceeds governance by', 'La autonomía supera a la gobernanza en')}{' '}
                                <strong>{Math.abs(scores.governanceGap).toFixed(2)}</strong> {tx('points.', 'puntos.')}{' '}
                                {tx('Systems are operating with more autonomy than governance controls allow.',
                                   'Los sistemas operan con más autonomía de la que los controles de gobernanza permiten.')}
                            </>
                        )}
                        {scores.governanceGap < 0 && (
                            <>
                                <strong>{tx('Good:', 'Bien:')}</strong> {tx('Governance exceeds autonomy by', 'La gobernanza supera a la autonomía en')}{' '}
                                <strong>{Math.abs(scores.governanceGap).toFixed(2)}</strong> {tx('points.', 'puntos.')}{' '}
                                {tx('The governance controls are proportional to or exceed the level of autonomy.',
                                   'Los controles de gobernanza son proporcionales o superan el nivel de autonomía.')}
                            </>
                        )}
                        {scores.governanceGap === 0 && (
                            <><strong>{tx('Balanced:', 'Equilibrado:')}</strong> {tx('Autonomy and governance are perfectly aligned.', 'Autonomía y gobernanza están perfectamente alineadas.')}</>
                        )}
                    </p>
                </div>
            </div>

            {/* Systems Table */}
            <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="card-header">
                    <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>
                        {tx('Systems Evaluated', 'Sistemas Evaluados')} ({evaluatedSystems.length}/{systems.length})
                    </h3>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>{tx('System', 'Sistema')}</th>
                                <th>{tx('Process', 'Proceso')}</th>
                                <th>{tx('Autonomy Level', 'Nivel de Autonomía')}</th>
                                <th>{tx('Governance Level', 'Nivel de Gobernanza')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {systems.map((sys, idx) => (
                                <tr key={sys.id}>
                                    <td style={{ color: 'var(--color-text-muted)' }}>{idx + 1}</td>
                                    <td style={{ color: 'var(--color-text)', fontWeight: 600 }}>{sys.system_name}</td>
                                    <td>{sys.process_name}</td>
                                    <td>
                                        {sys.autonomy_level !== null ? (
                                            <span className="badge badge-primary">
                                                {sys.autonomy_level} — {AUTONOMY_LABELS[sys.autonomy_level]}
                                            </span>
                                        ) : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                                    </td>
                                    <td>
                                        {sys.governance_level !== null ? (
                                            <span className="badge badge-warning">
                                                {sys.governance_level} — {GOVERNANCE_LABELS[sys.governance_level]}
                                            </span>
                                        ) : <span style={{ color: 'var(--color-text-muted)' }}>—</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Branding Upload */}
            <div className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="card-body">
                    <h3 style={{ marginBottom: 'var(--space-md)', fontWeight: 700, fontSize: '1rem' }}>
                        {tx('PDF Branding Template', 'Plantilla de Branding para PDF')}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                        {tx('Upload a custom header image (logo/banner) to brand your PDF reports.',
                           'Subí una imagen de encabezado personalizada (logo/banner) para tus informes PDF.')}
                    </p>
                    {uploadMsg && (
                        <div className={`alert ${uploadMsg.startsWith('Error') ? 'alert-error' : 'alert-success'}`} style={{ marginBottom: 'var(--space-md)' }}>
                            {uploadMsg}
                        </div>
                    )}
                    <div className="flex-between gap-md">
                        <div className={`upload-zone ${assessment.hasBranding ? 'upload-zone-active' : ''}`}
                            style={{ flex: 1 }} onClick={() => fileInputRef.current?.click()}>
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleBrandingUpload} style={{ display: 'none' }} />
                            {uploading
                                ? tx('Uploading…', 'Subiendo...')
                                : assessment.hasBranding
                                    ? tx('✅ Branding uploaded — click to replace', '✅ Branding subido — clic para reemplazar')
                                    : tx('📎 Click to upload header image (PNG, JPG, max 5MB)', '📎 Clic para subir imagen de encabezado (PNG, JPG, máx 5MB)')}
                        </div>
                        {assessment.hasBranding && (
                            <button className="btn btn-danger btn-sm" onClick={handleRemoveBranding}>
                                {tx('Remove', 'Eliminar')}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex-between">
                <Link to={`/assessments/${id}`} className="btn btn-ghost">
                    ← {tx('Back to Workspace', 'Volver al Workspace')}
                </Link>
                <button className="btn btn-primary btn-lg" onClick={handleDownloadPdf} id="download-report-btn">
                    📄 {tx('Download PDF Report', 'Descargar Informe PDF')}
                </button>
            </div>
        </div>
    );
}
