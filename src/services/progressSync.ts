import {
  COMPLETION_KEY_PATTERN,
  PROGRESS_CHANGED_EVENT,
  readCompletedIds,
  writeCompletedIds,
  type LessonId,
} from '../utils/lessonProgress';

// Items are "<storageKey>|<lessonId>", matching the server's lesson_progress rows.
const ITEM_SEPARATOR = '|';
const LESSON_ID_PATTERN = /^[a-z0-9:/_.-]{1,80}$/i;
const POLL_INTERVAL_MS = 60_000;
const DEBOUNCE_MS = 2_000;

function completionKeys(): string[] {
  const keys: string[] = [];
  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && COMPLETION_KEY_PATTERN.test(key)) keys.push(key);
    }
  } catch {
    return [];
  }
  return keys;
}

export function collectLocalProgress(): string[] {
  const items: string[] = [];
  completionKeys().forEach((key) => {
    readCompletedIds(key).forEach((id) => {
      const value = String(id);
      if (LESSON_ID_PATTERN.test(value)) items.push(`${key}${ITEM_SEPARATOR}${value}`);
    });
  });
  return items.sort();
}

/** Merges server items into localStorage. Local progress is never removed. */
export function applyRemoteProgress(items: string[]): boolean {
  const grouped = new Map<string, string[]>();
  items.forEach((item) => {
    const separatorIndex = item.lastIndexOf(ITEM_SEPARATOR);
    if (separatorIndex <= 0) return;
    const key = item.slice(0, separatorIndex);
    const id = item.slice(separatorIndex + 1);
    if (!COMPLETION_KEY_PATTERN.test(key) || !LESSON_ID_PATTERN.test(id)) return;
    grouped.set(key, [...(grouped.get(key) ?? []), id]);
  });

  let changed = false;
  grouped.forEach((remoteIds, key) => {
    const local = readCompletedIds(key);
    const localAsText = new Set(local.map(String));
    const usesStrings = local.some((id) => typeof id === 'string');
    const additions: LessonId[] = remoteIds
      .filter((id) => !localAsText.has(id))
      .map((id) => (!usesStrings && /^\d+$/.test(id) ? Number(id) : id));
    if (!additions.length) return;
    changed = true;
    writeCompletedIds(key, [...local, ...additions]);
  });
  return changed;
}

export function clearLocalProgress() {
  completionKeys().forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore storage failures
    }
  });
}

async function postProgress(apiBase: string, token: string, items: string[]): Promise<string[] | null> {
  const response = await fetch(`${apiBase}/users/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ items }),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return Array.isArray(data.items) ? data.items.filter((item: unknown): item is string => typeof item === 'string') : null;
}

/**
 * Keeps localStorage completion lists and the server in sync while a user is
 * signed in. Returns a cleanup function.
 */
export function startProgressSync(apiBase: string, token: string): () => void {
  let lastSynced = '';
  let inFlight = false;
  let stopped = false;
  let debounceTimer: number | undefined;

  const sync = async (force = false) => {
    if (stopped || inFlight) return;
    const local = collectLocalProgress();
    const snapshot = local.join('\n');
    if (!force && snapshot === lastSynced) return;
    inFlight = true;
    try {
      const remote = await postProgress(apiBase, token, local);
      if (!remote || stopped) return;
      applyRemoteProgress(remote);
      lastSynced = collectLocalProgress().join('\n');
    } catch {
      // Offline or server unavailable: retry on the next trigger.
    } finally {
      inFlight = false;
    }
  };

  const scheduleSync = () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => void sync(), DEBOUNCE_MS);
  };
  const syncWhenHidden = () => {
    if (document.visibilityState === 'hidden') void sync();
  };

  void sync(true);
  const interval = window.setInterval(() => void sync(), POLL_INTERVAL_MS);
  window.addEventListener(PROGRESS_CHANGED_EVENT, scheduleSync);
  window.addEventListener('online', scheduleSync);
  document.addEventListener('visibilitychange', syncWhenHidden);

  return () => {
    stopped = true;
    window.clearTimeout(debounceTimer);
    window.clearInterval(interval);
    window.removeEventListener(PROGRESS_CHANGED_EVENT, scheduleSync);
    window.removeEventListener('online', scheduleSync);
    document.removeEventListener('visibilitychange', syncWhenHidden);
  };
}

/** Best-effort final upload, used right before signing out. Returns true when stored on the server. */
export async function flushProgress(apiBase: string, token: string): Promise<boolean> {
  try {
    return (await postProgress(apiBase, token, collectLocalProgress())) !== null;
  } catch {
    return false;
  }
}
