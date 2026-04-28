import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const T = {
    en: {
        nav: { brand: 'Autonomy Scanner', logout: 'Logout', lang: 'ES' },
        dashboard: {
            title: 'Assessments',
            subtitle: 'Manage your AGOM governance assessments',
            newBtn: '+ New Assessment',
            empty: 'No assessments yet. Create your first one.',
            systems: 'system', systemsP: 'systems', evaluated: 'evaluated',
        },
        create: {
            title: 'New Assessment',
            nameLabel: 'Assessment Name', namePlaceholder: 'e.g. Q2 2025 Governance Review',
            orgLabel: 'Organization', orgPlaceholder: 'Company or department name',
            descLabel: 'Description', descPlaceholder: 'Optional context...',
            submit: 'Create Assessment', cancel: 'Cancel',
        },
        workspace: {
            back: '← Back',
            addSystem: '+ Add System',
            systemName: 'System Name', systemNamePlaceholder: 'e.g. Payment Approval Bot',
            systemDesc: 'Description', systemDescPlaceholder: 'What does this system do?',
            autonomyLevel: 'Autonomy Level', governanceLevel: 'Governance Level',
            saveSystem: 'Save System', cancel: 'Cancel',
            deleteSystem: 'Delete',
            scores: 'Scores',
            autonomyScore: 'Autonomy Score',
            governanceScore: 'Governance Score',
            agiIndex: 'AGI Index',
            govGap: 'Governance Gap',
            viewResults: 'View Full Results',
            noSystems: 'No systems added yet.',
        },
        results: {
            back: '← Back to Workspace',
            title: 'Assessment Results',
            downloadPDF: 'Download PDF Report',
            summary: 'Summary',
        },
        auth: {
            loginTitle: 'Sign in', loginBtn: 'Sign In',
            registerTitle: 'Create account', registerBtn: 'Create Account',
            email: 'Email', password: 'Password', confirmPassword: 'Confirm Password',
            noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
            signUpLink: 'Sign up', signInLink: 'Sign in',
            passwordMin: 'Min. 6 characters',
        },
    },
    es: {
        nav: { brand: 'Autonomy Scanner', logout: 'Cerrar sesión', lang: 'EN' },
        dashboard: {
            title: 'Evaluaciones',
            subtitle: 'Gestioná tus evaluaciones de gobernanza AGOM',
            newBtn: '+ Nueva Evaluación',
            empty: 'No hay evaluaciones aún. Creá la primera.',
            systems: 'sistema', systemsP: 'sistemas', evaluated: 'evaluado',
        },
        create: {
            title: 'Nueva Evaluación',
            nameLabel: 'Nombre de la Evaluación', namePlaceholder: 'ej: Revisión de Gobernanza Q2 2025',
            orgLabel: 'Organización', orgPlaceholder: 'Empresa o departamento',
            descLabel: 'Descripción', descPlaceholder: 'Contexto opcional...',
            submit: 'Crear Evaluación', cancel: 'Cancelar',
        },
        workspace: {
            back: '← Volver',
            addSystem: '+ Agregar Sistema',
            systemName: 'Nombre del Sistema', systemNamePlaceholder: 'ej: Bot de Aprobación de Pagos',
            systemDesc: 'Descripción', systemDescPlaceholder: '¿Qué hace este sistema?',
            autonomyLevel: 'Nivel de Autonomía', governanceLevel: 'Nivel de Gobernanza',
            saveSystem: 'Guardar Sistema', cancel: 'Cancelar',
            deleteSystem: 'Eliminar',
            scores: 'Puntajes',
            autonomyScore: 'Autonomy Score',
            governanceScore: 'Governance Score',
            agiIndex: 'AGI Index',
            govGap: 'Governance Gap',
            viewResults: 'Ver Resultados Completos',
            noSystems: 'No hay sistemas cargados aún.',
        },
        results: {
            back: '← Volver al Workspace',
            title: 'Resultados de la Evaluación',
            downloadPDF: 'Descargar Informe PDF',
            summary: 'Resumen',
        },
        auth: {
            loginTitle: 'Iniciar sesión', loginBtn: 'Iniciar Sesión',
            registerTitle: 'Crear cuenta', registerBtn: 'Crear Cuenta',
            email: 'Email', password: 'Contraseña', confirmPassword: 'Confirmar Contraseña',
            noAccount: '¿No tenés cuenta?', haveAccount: '¿Ya tenés cuenta?',
            signUpLink: 'Registrate', signInLink: 'Iniciá sesión',
            passwordMin: 'Mín. 6 caracteres',
        },
    },
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('scanner_lang') || 'es';
    });

    const toggleLang = () => {
        const next = lang === 'en' ? 'es' : 'en';
        setLang(next);
        localStorage.setItem('scanner_lang', next);
    };

    const t = (section, key) => T[lang]?.[section]?.[key] ?? T['en']?.[section]?.[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
