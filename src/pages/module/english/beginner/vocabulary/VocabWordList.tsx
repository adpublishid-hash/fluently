import React from 'react';
import { Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';

interface VocabItem {
  word: string;
  ipa: string;
  meaning: string;
}

interface VocabWordListProps {
  items: VocabItem[];
  accentColor?: string;
}

const VocabWordList: React.FC<VocabWordListProps> = ({
  items,
  accentColor = '#3498DB',
}) => {
  const play = (text: string) => { playAudio(text, 0.9); };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white"
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
      >
        <div className="w-8 shrink-0" />
        <div className="flex-1">Kata / Phonetic</div>
        <div className="text-right shrink-0">Arti</div>
      </div>

      {/* ── Item List ── */}
      <div className="divide-y divide-gray-50">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-3 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            {/* Play button */}
            <button
              onClick={() => play(item.word)}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white shadow-md active:scale-90 transition-all"
              style={{ backgroundColor: accentColor }}
              aria-label={`Putar ${item.word}`}
            >
              <Volume2 size={15} />
            </button>

            {/* Word + IPA */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#1A1A2E] text-[14px] leading-snug truncate">
                {item.word}
              </p>
              <span className="mt-0.5 inline-block font-mono text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                {item.ipa}
              </span>
            </div>

            {/* Meaning */}
            <div className="max-w-[38%] text-right shrink-0">
              <span className="text-[13px] text-gray-600 font-semibold leading-tight">
                {item.meaning}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabWordList;
