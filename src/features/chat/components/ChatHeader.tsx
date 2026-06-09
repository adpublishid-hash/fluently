import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Zap } from 'lucide-react';

type ChatHeaderProps = {
  title: string;
  subtitle: string;
  sessionEnded: boolean;
  onBack: () => void;
  onNewSession: () => void;
  onEndSession: () => void;
};

export function ChatHeader({
  title,
  subtitle,
  sessionEnded,
  onBack,
  onNewSession,
  onEndSession,
}: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-3 sm:px-5 pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-4 pb-3.5 z-10 sticky top-0">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-3 text-[11px] font-black text-text-secondary shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <button
            type="button"
            onClick={onNewSession}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-2xl bg-primary px-3 text-[11px] font-black text-white shadow-sm transition-colors hover:bg-primary-dark"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">New Session</span>
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/25 shadow-sm">
              <span className="text-xl">🐻</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-extrabold text-[15px] text-text-primary leading-tight">{title}</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />Online
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-[10px] text-text-muted font-semibold">{subtitle}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            <Zap size={11} className="text-primary fill-primary" />
            <span className="text-[11px] font-extrabold text-primary">Unlimited</span>
          </div>
          <button
            onClick={onEndSession}
            disabled={sessionEnded}
            className={`rounded-2xl border px-3 py-2 text-[11px] font-black transition-colors ${
              sessionEnded
                ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-text-muted'
                : 'cursor-pointer border-red-100 bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            {sessionEnded ? 'Report Ready' : 'End Session'}
          </button>
        </div>
      </div>
    </div>
  );
}
