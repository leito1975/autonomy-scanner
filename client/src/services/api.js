// In production, VITE_API_URL points to the Render backend (e.g. https://autonomy-scanner.onrender.com)
// In development, uses the Vite proxy (/api → localhost:3001)
const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api';

function getToken() {
    return localStorage.getItem('scanner_token');
}

async function request(path, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
    }

    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return res.json();
    }
    return res;
}

export const api = {
    // Auth
    register: (email, password) =>
        request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),

    login: (email, password) =>
        request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

    getMe: () => request('/auth/me'),

    // Assessments
    getAssessments: () => request('/assessments'),

    createAssessment: (data) =>
        request('/assessments', { method: 'POST', body: JSON.stringify(data) }),

    getAssessment: (id) => request(`/assessments/${id}`),

    deleteAssessment: (id) =>
        request(`/assessments/${id}`, { method: 'DELETE' }),

    // Systems
    getSystems: (assessmentId) =>
        request(`/assessments/${assessmentId}/systems`),

    addSystem: (assessmentId, data) =>
        request(`/assessments/${assessmentId}/systems`, { method: 'POST', body: JSON.stringify(data) }),

    updateSystem: (assessmentId, systemId, data) =>
        request(`/assessments/${assessmentId}/systems/${systemId}`, { method: 'PUT', body: JSON.stringify(data) }),

    deleteSystem: (assessmentId, systemId) =>
        request(`/assessments/${assessmentId}/systems/${systemId}`, { method: 'DELETE' }),

    // Reports
    uploadBranding: async (assessmentId, file) => {
        const token = getToken();
        const formData = new FormData();
        formData.append('branding', file);

        const res = await fetch(`${API_BASE}/assessments/${assessmentId}/branding`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || 'Upload failed');
        }
        return res.json();
    },

    removeBranding: (assessmentId) =>
        request(`/assessments/${assessmentId}/branding`, { method: 'DELETE' }),

    getReportUrl: (assessmentId) => {
        const token = getToken();
        return `${API_BASE}/assessments/${assessmentId}/report?token=${encodeURIComponent(token)}`;
    },
};
