import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
    _id: string;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, _id: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        const _id = localStorage.getItem('userId');
        if (email && _id) {
            setUser({ email, _id });
        }
        setLoading(false);
    }, []);

    const login = (email: string, _id: string) => {
        localStorage.setItem('email', email);
        localStorage.setItem('userId', _id);
        console.log(email);
        console.log(_id);
        setUser({ email, _id });
        navigate('/main');
    };

    const logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
