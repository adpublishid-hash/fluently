import { useCallback, useEffect, useState } from 'react';
import type { LeaderboardEntry } from '../../types';
import { useAuth } from '../../auth/AuthContext';

const API = '/api';

/** Stable, friendly fallback avatar when a learner hasn't set one. */
export function leaderboardAvatar(name: string, url?: string): string {
  if (url) return url;
  const seed = encodeURIComponent(name || 'Learner');
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`;
}

export async function fetchLeaderboard(
  headers: Record<string, string>,
  limit = 50,
): Promise<LeaderboardEntry[]> {
  const res = await fetch(`${API}/leaderboard?limit=${limit}`, { headers });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.leaderboard) {
    throw new Error(data?.error || 'Failed to load leaderboard');
  }
  return (data.leaderboard as LeaderboardEntry[]).map((entry) => ({
    ...entry,
    user: {
      ...entry.user,
      avatarUrl: leaderboardAvatar(entry.user.name, entry.user.avatarUrl),
    },
  }));
}

interface UseLeaderboardResult {
  entries: LeaderboardEntry[];
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/** Fetches the global leaderboard once authenticated, with manual reload support. */
export function useLeaderboard(limit = 50): UseLeaderboardResult {
  const { authHeaders, isAuthenticated, user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!isAuthenticated) {
      setEntries([]);
      setLoading(false);
      return;
    }
    let active = true;
    setLoading(true);
    setError(null);
    fetchLeaderboard(authHeaders(), limit)
      .then((data) => {
        if (active) setEntries(data);
      })
      .catch((err: Error) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [authHeaders, isAuthenticated, limit]);

  // Reload when auth state changes or this user's XP changes (their rank may move).
  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, [load, user?.xp]);

  return { entries, loading, error, reload: () => load() };
}
