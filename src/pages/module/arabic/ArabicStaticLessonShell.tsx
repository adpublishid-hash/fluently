import type React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, CheckCircle, ChevronLeft, Headphones, Mic, Volume2 } from 'lucide-react';
import { ViewState } from '../../../types';
import { arabicLessonCounts, arabicSkills, type ArabicLevelId, type ArabicSkillId } from './arabicModuleData';
import ArabicLessonSupplement from './ArabicLessonSupplement';

type LegacyLessonProps = {
  apiKey?: string;
  onNavigate: (view: ViewState) => void;
  userParams?: { name: string; isLifetime: boolean };
  onComplete: () => void;
};

type ArabicStaticLessonShellProps = {
  levelId: ArabicLevelId;
  routeLevelId?: string;
  skillId: ArabicSkillId;
  lessonId: number;
  LessonComponent: React.ComponentType<LegacyLessonProps>;
};

const quickPractice: Record<ArabicSkillId, Array<{ label: string; arabic: string; hint: string }>> = {
  kalam: [
    { label: 'Dengarkan', arabic: 'السَّلامُ عَلَيْكُمْ', hint: 'Ucapkan salam dengan panjang mad yang jelas.' },
    { label: 'Jawab', arabic: 'وَعَلَيْكُمُ السَّلامُ', hint: 'Latih jawaban salam dengan ritme natural.' },
  ],
  istima: [
    { label: 'Audio', arabic: 'أَنَا مِنْ إِنْدُونِيسِيَا', hint: 'Dengarkan tanpa melihat teks, lalu ulangi maknanya.' },
    { label: 'Kata kunci', arabic: 'أَيْنَ الْقَلَمُ؟', hint: 'Tangkap kata tanya dan objek utama.' },
  ],
  qiraah: [
    { label: 'Bacaan', arabic: 'هَذَا بَيْتٌ كَبِيرٌ', hint: 'Baca dari kanan ke kiri dan cari kata benda.' },
    { label: 'Pemahaman', arabic: 'الْوَلَدُ فِي الْمَدْرَسَةِ', hint: 'Temukan siapa, di mana, dan maknanya.' },
  ],
  kitabah: [
    { label: 'Salin', arabic: 'أَنَا طَالِبٌ', hint: 'Tulis ulang dengan bentuk huruf sambung yang rapi.' },
    { label: 'Susun', arabic: 'هَذِهِ مَدْرَسَةٌ', hint: 'Perhatikan kata tunjuk dan isim setelahnya.' },
  ],
  mufradat: [
    { label: 'Kosakata', arabic: 'كِتَابٌ', hint: 'Baca, dengarkan, lalu sebutkan artinya: buku.' },
    { label: 'Kalimat', arabic: 'هَذَا كِتَابٌ', hint: 'Pola dasar: ini adalah sebuah buku.' },
  ],
  grammar: [
    { label: 'Nahwu', arabic: 'زَيْدٌ طَالِبٌ', hint: 'Jumlah ismiyyah: mubtada + khabar.' },
    { label: 'Analisis', arabic: 'كَتَبَ الطَّالِبُ', hint: "Jumlah fi'liyyah: fi'il + fa'il." },
  ],
  pronunciation: [
    { label: 'Makharij', arabic: 'ع ح ه ء', hint: 'Fokus tenggorokan: ain, ha kecil, ha besar, hamzah.' },
    { label: 'Minimal pair', arabic: 'قَلْبٌ كَلْبٌ', hint: 'Bedakan qaf yang tebal dengan kaf yang ringan.' },
  ],
};

function getCompleted(levelId: string, skillId: string): number[] {
  try {
    return JSON.parse(localStorage.getItem(`talky_arabic_${levelId}_${skillId}_completed`) || '[]');
  } catch {
    return [];
  }
}

function markComplete(levelId: string, skillId: string, lessonId: number) {
  const completed = getCompleted(levelId, skillId);
  if (!completed.includes(lessonId)) {
    localStorage.setItem(`talky_arabic_${levelId}_${skillId}_completed`, JSON.stringify([...completed, lessonId]));
  }
}

function speakArabic(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

export default function ArabicStaticLessonShell({
  levelId,
  routeLevelId = levelId,
  skillId,
  lessonId,
  LessonComponent,
}: ArabicStaticLessonShellProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const totalLessons = arabicLessonCounts[levelId][skillId];
  const skill = arabicSkills.find((item) => item.id === skillId) ?? arabicSkills[0];
  const progress = Math.min(100, Math.max(0, (lessonId / totalLessons) * 100));
  const listPath = `/modul/arabic/${routeLevelId}/${skillId}`;
  const initialTab = searchParams.get('tab') === 'latihan' || searchParams.get('practice') === '1' ? 'latihan' : 'materi';
  const [activeTab, setActiveTab] = useState<'materi' | 'latihan'>(initialTab);

  const goBack = () => navigate(listPath);
  const completeAndContinue = () => {
    markComplete(levelId, skillId, lessonId);
    if (lessonId < totalLessons) navigate(`/modul/arabic/${routeLevelId}/${skillId}/lesson-${lessonId + 1}`);
    else goBack();
  };

  const legacyNavigate = (view: ViewState) => {
    if (view === ViewState.MODULES_LESSON_LIST) goBack();
  };

  return (
    <div className="arabic-lesson-page min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Inter', 'KFGQPC Uthman Taha Naskh', 'Noto Naskh Arabic', 'Noto Sans Arabic', system-ui, sans-serif" }}>
      <div className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={goBack} className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center transition">
          <ChevronLeft size={20} className="text-slate-700" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F766E] truncate">Arabic {routeLevelId} - {skill.label}</p>
          <h1 className="text-sm md:text-base font-black text-slate-900 truncate">Lesson {lessonId}</h1>
        </div>
        <button onClick={completeAndContinue} className="px-4 h-10 rounded-xl text-xs font-black text-white bg-[#0F766E] shadow-sm shadow-teal-100 hover:bg-[#0B6B63] transition">
          {lessonId < totalLessons ? 'Next' : 'Done'}
        </button>
      </div>
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-[#0F766E] transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 pt-5">
        <div className="mb-4 rounded-2xl border border-teal-100 bg-white p-4 md:p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
              <BookOpen size={21} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">Materi Arabic</p>
              <h2 className="text-lg font-black text-slate-900">{skill.label} - Lesson {lessonId}</h2>
              <p className="text-xs text-slate-500">{Math.round(progress)}% dari {totalLessons} lesson</p>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          {[
            { id: 'materi' as const, label: 'Materi' },
            { id: 'latihan' as const, label: 'Latihan' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-3 text-sm font-black transition ${activeTab === tab.id ? 'bg-[#0F766E] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'latihan' && (
        <>
        <div className="grid gap-3 md:grid-cols-2">
          {quickPractice[skillId].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-teal-200 transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0F766E] flex items-center justify-center shrink-0">
                  {skillId === 'pronunciation' ? <Mic size={19} /> : skillId === 'kalam' ? <Headphones size={19} /> : <CheckCircle size={19} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                  <p dir="rtl" lang="ar" className="mt-1 text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed">{item.arabic}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
                </div>
                <button
                  onClick={() => speakArabic(item.arabic)}
                  className="w-10 h-10 rounded-full border border-teal-100 bg-teal-50 text-[#0F766E] flex items-center justify-center hover:bg-teal-100"
                  title="Dengarkan audio Arabic"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={completeAndContinue} className="mt-4 w-full rounded-xl bg-[#0F766E] py-4 text-white font-black shadow-lg shadow-teal-100 hover:bg-[#0B6B63] transition">
          Tandai Selesai
        </button>
        </>
        )}
      </section>

      {activeTab === 'materi' && (
      <>
      <ArabicLessonSupplement levelId={levelId} skillId={skillId} lessonId={lessonId} />

      <div className="arabic-lesson-content mx-auto max-w-5xl px-4 pb-28">
        <LessonComponent
          apiKey={import.meta.env.VITE_OPENAI_API_KEY || ''}
          onNavigate={legacyNavigate}
          onComplete={completeAndContinue}
          userParams={{ name: 'Learner', isLifetime: true }}
        />
      </div>
      </>
      )}
    </div>
  );
}
