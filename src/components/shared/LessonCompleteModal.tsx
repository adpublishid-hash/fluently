import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../auth/AuthContext';

interface Props {
  show: boolean;
  onClose: () => void;
  lessonLabel: string;
  accentColor: string;
  nextLessonPath?: string;
  onNext?: () => void;
  onBack: () => void;
  xpReward?: number;
}

export default function LessonCompleteModal({
  show, onClose, lessonLabel, accentColor, nextLessonPath, onNext, onBack, xpReward = 50,
}: Props) {
  const { awardXp } = useAuth();
  const awarded = useRef(false);

  useEffect(() => {
    if (show && !awarded.current) {
      awarded.current = true;
      awardXp(xpReward, 'lesson');
    }
    if (!show) awarded.current = false;
  }, [show, xpReward, awardXp]);

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
        >
          <span style={{ fontSize: 36 }}>🏆</span>
        </div>
        <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-1">Lesson Selesai! 🎉</h2>
        <p className="text-[13px] text-gray-500 mb-3">
          Kamu telah menyelesaikan <b>{lessonLabel}</b>. Terus semangat!
        </p>
        <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-4">
          <span style={{ fontSize: 14 }}>⚡</span>
          <span className="text-[13px] font-extrabold text-amber-600">+{xpReward} XP</span>
        </div>
        <div className="flex justify-center gap-2 mb-6">
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
          <span style={{ fontSize: 26 }}>⭐</span>
        </div>
        <div className="flex gap-3">
          {nextLessonPath && onNext && (
            <button
              onClick={onNext}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
            >
              Next ›
            </button>
          )}
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
