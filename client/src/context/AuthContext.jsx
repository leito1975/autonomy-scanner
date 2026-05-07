import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('scanner_token');
        if (token) {
            api.getMe()
                .then(({ user }) => setUser(user))
                .catch(() => {
                    localStorage.removeItem('scanner_token');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const data = await api.login(email, password);
        localStorage.setItem('scanner_token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (email, password) => {
        const data = await api.register(email, password);
        localStorage.setItem('scanner_token', data.token);
        setUser(data.user);
        return data;
    };

    const loginWithToken = (token, userData) => {
        localStorage.setItem('scanner_token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('scanner_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
