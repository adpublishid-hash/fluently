import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { useAuth } from '../../auth/AuthContext';
import {
  applyReview,
  buildReviewQueue,
  dayNumber,
  getDeckWords,
  loadDeckState,
  NEW_CARDS_PER_DAY,
  saveDeckState,
  type ReviewGrade,
} from '../../features/learning/srs';
import { getStudyLevels, studyLanguageFor, studyLanguageLabel, studyLevelIndex, studySpeechLang } from '../../features/learning/studyBank';
import type { StudyWord } from '../../features/learning/studyBank';
import { speak } from '../../utils/speech';

const grades: Array<{ id: ReviewGrade; label: string; hint: string; className: string }> = [
  { id: 'again', label: 'Lupa', hint: 'ulang hari ini', className: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'hard', label: 'Sulit', hint: 'interval pendek', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'good', label: 'Bisa', hint: 'interval normal', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'easy', label: 'Mudah', hint: 'interval panjang', className: 'bg-sky-50 text-sky-700 border-sky-200' },
];

export default function ReviewPage() {
  const navigate = useNavigate();
  const { user, awardXp } = useAuth();
  const language = studyLanguageFor(user?.persona?.targetLanguage);
  const levelIndex = studyLevelIndex(language, user?.persona?.level);
  const levelLabel = getStudyLevels(language)[levelIndex]?.label;
  const today = dayNumber();
  const words = useMemo(() => getDeckWords(language, levelIndex), [language, levelIndex]);
  const [deck, setDeck] = useState(() => loadDeckState(language));
  const [session, setSession] = useState<StudyWord[] | null>(null);
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [xpNote, setXpNote] = useState('');
  const queue = useMemo(() => buildReviewQueue(words, deck, today), [words, deck, today]);
  const learned = Object.keys(deck.cards).length;
  const card = session?.[position];
  const isRtl = language === 'arabic';

  const start = () => {
    setSession([...queue.due, ...queue.fresh]);
    setPosition(0);
    setRevealed(false);
    setXpNote('');
  };

  const grade = (value: ReviewGrade) => {
    if (!session || !card) return;
    const next = applyReview(deck, card, value, today);
    setDeck(next);
    saveDeckState(language, next);
    // Forgotten cards come back at the end of today's session.
    const nextSession = value === 'again' ? [...session, card] : session;
    setSession(nextSession);
    setRevealed(false);
    if (position + 1 < nextSession.length) {
      setPosition(position + 1);
      return;
    }
    setPosition(nextSession.length);
    const dateKey = new Date().toISOString().slice(0, 10);
    void awardXp(20, 'practice', `review/${language}/${dateKey}`).then((result) => {
      setXpNote(result.duplicate ? 'XP review hari ini sudah diklaim.' : result.awarded ? `+${result.awarded} XP` : '');
    });
  };

  if (session && !card) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-md px-5 pb-28 pt-10 text-center md:pb-10">
          <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
          <h1 className="mt-4 text-2xl font-black text-slate-900">Review selesai</h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">{session.length} kartu diulang. Jadwal berikutnya diatur otomatis.</p>
          {xpNote && <p className="mt-3 text-sm font-black text-amber-600">{xpNote}</p>}
          <button onClick={() => { setSession(null); }} className="mt-8 w-full rounded-2xl bg-slate-900 py-3 text-sm font-black text-white">Kembali</button>
        </div>
      </PageContainer>
    );
  }

  if (session && card) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-xl px-5 pb-28 md:px-0 md:pb-10">
          <PageHeader title={`Review ${studyLanguageLabel[language]}`} subtitle={`Kartu ${position + 1}/${session.length}`} onBack={() => setSession(null)} />
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${(position / session.length) * 100}%` }} />
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <p dir={isRtl ? 'rtl' : 'auto'} className="text-4xl font-black leading-relaxed text-slate-900">{card.term}</p>
            {card.reading && <p className="mt-2 text-sm font-bold text-slate-400">{card.reading}</p>}
            <button onClick={() => speak(card.term, studySpeechLang[language])} className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-700">
              <Volume2 size={16} /> Dengarkan
            </button>
            {revealed ? (
              <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-lg font-black text-slate-800">{card.meaning}</p>
            ) : (
              <button onClick={() => setRevealed(true)} className="mt-6 w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white">Lihat arti</button>
            )}
          </div>
          {revealed && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {grades.map((item) => (
                <button key={item.id} onClick={() => grade(item.id)} className={`rounded-2xl border px-3 py-3 text-sm font-black ${item.className}`}>
                  {item.label}
                  <span className="block text-[10px] font-bold opacity-70">{item.hint}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    );
  }

  const total = queue.due.length + queue.fresh.length;
  return (
    <PageContainer>
      <div className="mx-auto max-w-xl px-5 pb-28 md:px-0 md:pb-10">
        <PageHeader title="Review Harian" subtitle={`${studyLanguageLabel[language]} · sampai level ${levelLabel}`} onBack={() => navigate(-1)} />
        <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700"><Brain size={24} /></div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Spaced repetition</h2>
              <p className="text-xs font-semibold text-slate-500">Kata yang hampir terlupa muncul lebih dulu. Maksimal {NEW_CARDS_PER_DAY} kata baru per hari.</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              ['Jatuh tempo', queue.due.length],
              ['Kata baru', queue.fresh.length],
              ['Sudah dipelajari', learned],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-2xl font-black text-slate-900">{value}</p>
                <p className="text-[11px] font-bold text-slate-400">{label}</p>
              </div>
            ))}
          </div>
          <button
            onClick={start}
            disabled={total === 0}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-4 text-sm font-black text-white disabled:opacity-40"
          >
            <RotateCcw size={16} /> {total ? `Mulai review (${total} kartu)` : 'Tidak ada kartu hari ini'}
          </button>
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-slate-400">Deck berisi {words.length} kata dari level yang sudah kamu capai. Progres review disimpan di perangkat ini.</p>
      </div>
    </PageContainer>
  );
}
