import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  onboardingCompleted: boolean;
  persona: UserPersona | null;
}

export interface UserPersona {
  ageRange: string;
  gender: string;
  targetLanguage: string;
  level: string;
  whyLearning: string;
  specificGoals: string[];
  interests: string[];
  studyDuration: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  completeOnboarding: (persona: UserPersona) => Promise<{ success: boolean; error?: string }>;
  updatePersona: (personaPatch: Partial<UserPersona>) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  userExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API = '/api';

function normalizeUser(data: any): User {
  return {
    id: Number(data.id ?? 0),
    name: data.name ?? 'Learner',
    email: data.email ?? '',
    onboardingCompleted: Boolean(data.onboardingCompleted ?? data.onboarding_completed),
    persona: data.persona ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const session = localStorage.getItem('talky_session');
      return session ? normalizeUser(JSON.parse(session)) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = user !== null;

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      const userData = normalizeUser(data.user);
      setUser(userData);
      localStorage.setItem('talky_session', JSON.stringify(userData));
      localStorage.setItem('talky_user', JSON.stringify(userData));
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      const userData = normalizeUser(data.user);
      setUser(userData);
      localStorage.setItem('talky_session', JSON.stringify(userData));
      localStorage.setItem('talky_user', JSON.stringify(userData));
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('talky_session');
  }, []);

  const completeOnboarding = useCallback(async (persona: UserPersona): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User session not found' };

    try {
      const res = await fetch(`${API}/users/persona`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, persona }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };

      const userData = normalizeUser(data.user);
      setUser(userData);
      localStorage.setItem('talky_session', JSON.stringify(userData));
      localStorage.setItem('talky_user', JSON.stringify(userData));
      localStorage.setItem('talky_onboarding_done', 'true');
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user]);

  const updatePersona = useCallback(async (personaPatch: Partial<UserPersona>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User session not found' };

    const currentPersona: UserPersona = user.persona ?? {
      ageRange: '',
      gender: '',
      targetLanguage: 'English',
      level: 'beginner',
      whyLearning: '',
      specificGoals: [],
      interests: [],
      studyDuration: '',
    };
    const persona = { ...currentPersona, ...personaPatch };
    const optimisticUser = { ...user, persona };

    setUser(optimisticUser);
    localStorage.setItem('talky_session', JSON.stringify(optimisticUser));
    localStorage.setItem('talky_user', JSON.stringify(optimisticUser));

    try {
      const res = await fetch(`${API}/users/persona`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, persona }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };

      const userData = normalizeUser(data.user);
      setUser(userData);
      localStorage.setItem('talky_session', JSON.stringify(userData));
      localStorage.setItem('talky_user', JSON.stringify(userData));
      return { success: true };
    } catch {
      return { success: true };
    }
  }, [user]);

  const resetPassword = useCallback(async (email: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, []);

  const userExists = useCallback(async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API}/auth/exists?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      return data.exists ?? false;
    } catch {
      return false;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, completeOnboarding, updatePersona, resetPassword, userExists }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
