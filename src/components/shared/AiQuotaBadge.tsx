import { useEffect, useState } from 'react';
import { KeyRound, Sparkles } from 'lucide-react';
import { AI_QUOTA_CHANGED_EVENT, fetchAiQuota, getStudioKey, openAiKeyPrompt, type AiQuota } from '../../services/aiClient';

/** "Kuota AI hari ini: 7/10" plus a button to manage the learner's own key. */
export default function AiQuotaBadge({ className = '' }: { className?: string }) {
  const [quota, setQuota] = useState<AiQuota | null>(null);
  const [hasKey, setHasKey] = useState(() => Boolean(getStudioKey()));

  useEffect(() => {
    let active = true;
    const refresh = () => {
      setHasKey(Boolean(getStudioKey()));
      void fetchAiQuota().then((value) => { if (active) setQuota(value); });
    };
    refresh();
    window.addEventListener(AI_QUOTA_CHANGED_EVENT, refresh);
    return () => {
      active = false;
      window.removeEventListener(AI_QUOTA_CHANGED_EVENT, refresh);
    };
  }, []);

  if (!quota) return null;
  const empty = quota.remaining <= 0;
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-xs font-bold ${empty && !hasKey ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-slate-100 bg-white text-slate-600'} ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Sparkles size={14} className="text-indigo-500" />
        Kuota AI hari ini: {quota.remaining}/{quota.limit}
        {empty && (hasKey ? ' · memakai key AI Studio kamu' : ' · habis')}
      </span>
      <button onClick={() => openAiKeyPrompt()} className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200">
        <KeyRound size={12} /> {hasKey ? 'Key AI Studio aktif' : 'Pakai key sendiri'}
      </button>
    </div>
  );
}
