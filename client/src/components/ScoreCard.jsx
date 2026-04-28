export default function ScoreCard({ label, value, color, icon }) {
    const displayValue = typeof value === 'number' ? value.toFixed(2) : value;

    return (
        <div className="score-card" style={{ '--score-color': color }}>
            {icon && <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>}
            <div className="score-value">{displayValue}</div>
            <div className="score-label">{label}</div>
        </div>
    );
}
