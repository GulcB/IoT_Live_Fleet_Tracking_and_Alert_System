import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
	isAuthenticated: boolean;
	isAdmin: boolean;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	// TODO: Set back to false once Keycloak is integrated
	// For development, everyone is auto-authenticated as admin
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

	// For now, everyone is admin once logged in.
	// In the future, this will come from Keycloak/User profile.
	const isAdmin = true;

	const login = () => {
		setIsAuthenticated(true);
		localStorage.setItem('auth_token', 'mock_token');
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem('auth_token');
	};

	// Check storage on mount to persist session across reloads
	useEffect(() => {
		const token = localStorage.getItem('auth_token');
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
