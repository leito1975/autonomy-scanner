/**
 * AGOM Score Calculation Utilities — v2.1
 *
 * Four evaluation dimensions (0–4 each):
 *   Autonomy Level       — Manual → Operational Autonomy
 *   Governance Level     — No Controls → Adaptive Governance
 *   Economic Exposure    — None → Critical Financial Exposure
 *   Operational Impact   — Minimal → Strategic Impact
 */

const AUTONOMY_LABELS = {
    0: 'Manual',
    1: 'Automation',
    2: 'AI Assisted',
    3: 'Supervised Autonomy',
    4: 'Operational Autonomy',
};

const GOVERNANCE_LABELS = {
    0: 'No Controls',
    1: 'Basic Controls',
    2: 'Human Supervision',
    3: 'Structured Governance',
    4: 'Adaptive Governance',
};

const ECONOMIC_LABELS = {
    0: 'No Financial Impact',
    1: 'Low Exposure',
    2: 'Moderate Exposure',
    3: 'High Exposure',
    4: 'Critical Exposure',
};

const OPERATIONAL_LABELS = {
    0: 'Minimal Impact',
    1: 'Local Impact',
    2: 'Departmental Impact',
    3: 'Organizational Impact',
    4: 'Strategic Impact',
};

// A system is fully evaluated when all 4 dimensions are set
function isFullyEvaluated(s) {
    return (
        s.autonomy_level !== null &&
        s.governance_level !== null &&
        s.economic_exposure !== null &&
        s.operational_impact !== null
    );
}

/**
 * Calculate all AGOM scores from an array of systems.
 * Only systems with all 4 dimensions set count toward scores.
 */
function calculateScores(systems) {
    const evaluated = systems.filter(isFullyEvaluated);

    if (evaluated.length === 0) {
        return {
            autonomyScore: 0,
            governanceScore: 0,
            economicScore: 0,
            operationalScore: 0,
            agi: 0,
            governanceGap: 0,
            riskPriority: 0,
            evaluatedCount: 0,
            totalCount: systems.length,
        };
    }

    const n = evaluated.length;
    const sumAutonomy    = evaluated.reduce((a, s) => a + s.autonomy_level,    0);
    const sumGovernance  = evaluated.reduce((a, s) => a + s.governance_level,  0);
    const sumEconomic    = evaluated.reduce((a, s) => a + s.economic_exposure,  0);
    const sumOperational = evaluated.reduce((a, s) => a + s.operational_impact, 0);

    const autonomyScore    = sumAutonomy    / n;
    const governanceScore  = sumGovernance  / n;
    const economicScore    = sumEconomic    / n;
    const operationalScore = sumOperational / n;

    // AGI Index: average of all 4 dimensions (0–4)
    const agi = (autonomyScore + governanceScore + economicScore + operationalScore) / 4;

    // Governance Gap: how much autonomy exceeds governance (positive = risk)
    const governanceGap = autonomyScore - governanceScore;

    // Risk Priority: combines uncontrolled autonomy + exposure dimensions
    // High when: high autonomy, low governance, high economic, high operational
    const riskPriority = (autonomyScore + economicScore + operationalScore) / 3 - governanceScore;

    const round2 = (v) => Math.round(v * 100) / 100;

    return {
        autonomyScore:    round2(autonomyScore),
        governanceScore:  round2(governanceScore),
        economicScore:    round2(economicScore),
        operationalScore: round2(operationalScore),
        agi:              round2(agi),
        governanceGap:    round2(governanceGap),
        riskPriority:     round2(riskPriority),
        evaluatedCount:   evaluated.length,
        totalCount:       systems.length,
    };
}

module.exports = {
    calculateScores,
    isFullyEvaluated,
    AUTONOMY_LABELS,
    GOVERNANCE_LABELS,
    ECONOMIC_LABELS,
    OPERATIONAL_LABELS,
};
