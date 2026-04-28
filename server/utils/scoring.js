/**
 * AGOM Score Calculation Utilities
 *
 * Autonomy Level: 0-4 (Manual → Operational Autonomy)
 * Governance Level: 0-4 (No Controls → Adaptive Governance)
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

/**
 * Calculate all AGOM scores from an array of evaluated systems.
 * Only includes systems that have both autonomy_level and governance_level set.
 */
function calculateScores(systems) {
    const evaluated = systems.filter(
        (s) => s.autonomy_level !== null && s.governance_level !== null
    );

    if (evaluated.length === 0) {
        return {
            autonomyScore: 0,
            governanceScore: 0,
            agi: 0,
            governanceGap: 0,
            evaluatedCount: 0,
            totalCount: systems.length,
        };
    }

    const sumAutonomy = evaluated.reduce((acc, s) => acc + s.autonomy_level, 0);
    const sumGovernance = evaluated.reduce((acc, s) => acc + s.governance_level, 0);

    const autonomyScore = sumAutonomy / evaluated.length;
    const governanceScore = sumGovernance / evaluated.length;
    const agi = (autonomyScore + governanceScore) / 2;
    const governanceGap = autonomyScore - governanceScore;

    return {
        autonomyScore: Math.round(autonomyScore * 100) / 100,
        governanceScore: Math.round(governanceScore * 100) / 100,
        agi: Math.round(agi * 100) / 100,
        governanceGap: Math.round(governanceGap * 100) / 100,
        evaluatedCount: evaluated.length,
        totalCount: systems.length,
    };
}

module.exports = {
    calculateScores,
    AUTONOMY_LABELS,
    GOVERNANCE_LABELS,
};
