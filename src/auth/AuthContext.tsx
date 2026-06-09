import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
  email: string;
  phone: string;
  xp: number;
  streak: number;
  level: number;
  onboardingCompleted: boolean;
  persona: UserPersona | null;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'lifetime';
  planExpiresAt?: string | null;
  status: 'active' | 'suspended';
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
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (credential: string) => Promise<{ success: boolean; error?: string; isNewUser?: boolean }>;
  logout: () => void;
  completeOnboarding: (persona: UserPersona) => Promise<{ success: boolean; error?: string }>;
  updatePersona: (personaPatch: Partial<UserPersona>) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (patch: { displayName?: string; avatarUrl?: string }) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  userExists: (email: string) => Promise<boolean>;
  upgradePlan: (plan: 'pro' | 'lifetime') => Promise<{ success: boolean; error?: string }>;
  awardXp: (xp: number, activity?: string) => Promise<{ success: boolean; error?: string }>;
  authHeaders: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API = '/api';
const SESSION_KEY = 'talky_session';
const TOKEN_KEY = 'talky_token';
const ADMIN_EMAIL = 'wahib.chelsea@gmail.com';

function normalizeUser(data: any): User {
  const name = data.name ?? 'Learner';
  const email = data.email ?? '';
  const isAdminEmail = email.trim().toLowerCase() === ADMIN_EMAIL;
  return {
    id: Number(data.id ?? 0),
    name,
    displayName: data.displayName ?? data.display_name ?? name,
    avatarUrl: data.avatarUrl ?? data.avatar_url ?? '',
    email,
    phone: data.phone ?? '',
    xp: Number(data.xp ?? 0),
    streak: Number(data.streak ?? 0),
    level: Number(data.level ?? 1),
    onboardingCompleted: Boolean(data.onboardingCompleted ?? data.onboarding_completed),
    persona: data.persona ?? null,
    role: isAdminEmail ? 'admin' : 'user',
    plan: ['free', 'pro', 'lifetime'].includes(data.plan) ? data.plan : 'free',
    planExpiresAt: data.planExpiresAt ?? data.plan_expires_at ?? null,
    status: data.status === 'suspended' ? 'suspended' : 'active',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? normalizeUser(JSON.parse(session)) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  });

  const isAuthenticated = user !== null && token !== null;

  const persistSession = useCallback((nextUser: User, nextToken?: string | null) => {
    setUser(nextUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    localStorage.setItem('talky_user', JSON.stringify(nextUser));
    if (nextToken !== undefined) {
      if (nextToken) {
        setToken(nextToken);
        localStorage.setItem(TOKEN_KEY, nextToken);
      } else {
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  }, []);

  const authHeaders = useCallback((): Record<string, string> => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  // Refresh local copy from /me on mount whenever we have a token, so other devices
  // (or admin role/plan changes) reflect immediately.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (cancelled) return;
        if (res.status === 401) {
          logout();
          return;
        }
        if (!res.ok) return;
        const data = await res.json();
        if (data?.user) persistSession(normalizeUser(data.user));
      } catch {
        // network error — keep cached user
      }
    })();
    return () => { cancelled = true; };
  }, [token, logout, persistSession]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user), data.token);
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [persistSession]);

  const register = useCallback(async (name: string, email: string, password: string, phone = ''): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user), data.token);
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [persistSession]);

  const loginWithGoogle = useCallback(async (credential: string): Promise<{ success: boolean; error?: string; isNewUser?: boolean }> => {
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user), data.token);
      localStorage.setItem('talky_has_visited', 'true');
      return { success: true, isNewUser: Boolean(data.isNewUser) };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [persistSession]);

  useEffect(() => {
    if (token) return;
    const hash = window.location.hash || '';
    if (!hash.includes('id_token=')) return;
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const idToken = params.get('id_token');
    if (!idToken) return;

    window.history.replaceState({}, document.title, `${window.location.pathname}${window.location.search}`);
    void loginWithGoogle(idToken);
  }, [loginWithGoogle, token]);

  const completeOnboarding = useCallback(async (persona: UserPersona): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };

    try {
      const res = await fetch(`${API}/users/persona`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ persona }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };

      persistSession(normalizeUser(data.user));
      localStorage.setItem('talky_onboarding_done', 'true');
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user, token, persistSession]);

  const updatePersona = useCallback(async (personaPatch: Partial<UserPersona>): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };

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
    persistSession({ ...user, persona });

    try {
      const res = await fetch(`${API}/users/persona`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ persona }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user));
      return { success: true };
    } catch {
      return { success: true };
    }
  }, [user, token, persistSession]);

  const updateProfile = useCallback(async (patch: { displayName?: string; avatarUrl?: string }): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };

    // Optimistic update so UI feels instant.
    const optimistic: User = {
      ...user,
      displayName: patch.displayName ?? user.displayName,
      avatarUrl: patch.avatarUrl ?? user.avatarUrl,
    };
    persistSession(optimistic);

    try {
      const res = await fetch(`${API}/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user));
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user, token, persistSession]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };

    try {
      const res = await fetch(`${API}/users/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user, token]);

  const requestPasswordReset = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, []);

  const confirmPasswordReset = useCallback(async (resetToken: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch(`${API}/auth/reset/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword }),
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

  const upgradePlan = useCallback(async (plan: 'pro' | 'lifetime'): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };

    try {
      const res = await fetch(`${API}/users/upgrade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user));
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user, token, persistSession]);

  const awardXp = useCallback(async (xp: number, activity = 'general'): Promise<{ success: boolean; error?: string }> => {
    if (!user || !token) return { success: false, error: 'User session not found' };
    try {
      const res = await fetch(`${API}/users/xp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ xp, activity }),
      });
      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error };
      persistSession(normalizeUser(data.user));
      return { success: true };
    } catch {
      return { success: false, error: 'Server tidak dapat dihubungi' };
    }
  }, [user, token, persistSession]);

  return (
    <AuthContext.Provider value={{
      user, token, isAuthenticated,
      login, register, loginWithGoogle, logout,
      completeOnboarding, updatePersona, updateProfile,
      changePassword,
      requestPasswordReset, confirmPasswordReset,
      userExists, upgradePlan, awardXp, authHeaders,
    }}>
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
