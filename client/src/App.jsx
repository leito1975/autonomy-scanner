import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAssessment from './pages/CreateAssessment';
import AssessmentWorkspace from './pages/AssessmentWorkspace';
import AssessmentResults from './pages/AssessmentResults';

export default function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="app-layout">
                <div className="loading" style={{ marginTop: '40vh' }}>
                    <div className="loading-spinner"></div>
                    <p>Initializing…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Routes>
                    {/* Public */}
                    <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

                    {/* Protected */}
                    <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/assessments/new" element={<ProtectedRoute><CreateAssessment /></ProtectedRoute>} />
                    <Route path="/assessments/:id" element={<ProtectedRoute><AssessmentWorkspace /></ProtectedRoute>} />
                    <Route path="/assessments/:id/results" element={<ProtectedRoute><AssessmentResults /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}
