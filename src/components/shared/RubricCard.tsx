import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ClipboardCheck, Sparkles, Volume2 } from 'lucide-react';
import { getLevelRubric, rubricCriteria, rubricScale, type RubricLanguage, type RubricSkill } from '../../features/rubrics';
import { studySpeechLang } from '../../features/learning/studyLanguages';
import { speak } from '../../utils/speech';

type Props = { language: RubricLanguage; level: string; skill: RubricSkill; accentColor?: string };

/** Level rubric + model answer for speaking/writing lessons, with a link to AI assessment. */
export default function RubricCard({ language, level, skill, accentColor = '#4F46E5' }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const levelRubric = getLevelRubric(language, level);
  if (!levelRubric) return null;
  const rubric = levelRubric[skill];
  const rtl = language === 'arabic';

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <button onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-3 text-left">
        <span className="flex items-center gap-2">
          <ClipboardCheck size={18} style={{ color: accentColor }} />
          <span>
            <span className="block text-sm font-black text-slate-900">Rubrik {skill === 'speaking' ? 'berbicara' : 'menulis'} · {levelRubric.label}</span>
            <span className="block text-xs font-semibold text-slate-500">Target: {rubric.target}</span>
          </span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Harapan level</p>
            <ul className="mt-2 space-y-1.5">
              {rubric.expectations.map((item) => <li key={item} className="text-sm text-slate-700">• {item}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Kriteria (skor 1–4)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {rubricCriteria[skill].map((item) => <span key={item.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{item.label}</span>)}
            </div>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {rubricScale.map((band) => (
                <p key={band.score} className="rounded-xl bg-slate-50 p-2 text-xs text-slate-600"><b className="text-slate-800">{band.score} · {band.label}:</b> {band.descriptor}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Contoh jawaban model</p>
              <div className="flex gap-2">
                <button onClick={() => speak(rubric.model, studySpeechLang[language])} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                  <Volume2 size={13} /> Dengar
                </button>
                <button onClick={() => setShowTranslation((value) => !value)} className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm">
                  {showTranslation ? 'Sembunyikan arti' : 'Arti'}
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs font-semibold text-slate-500">Tugas: <span dir={rtl ? 'rtl' : undefined}>{rubric.prompt}</span></p>
            <p dir={rtl ? 'rtl' : undefined} className={`mt-2 whitespace-pre-line text-slate-900 ${rtl ? 'text-xl leading-loose' : 'text-sm leading-relaxed'}`}>{rubric.model}</p>
            {showTranslation && <p className="mt-2 text-sm leading-relaxed text-slate-600">{rubric.translation}</p>}
          </div>
          <button
            onClick={() => navigate(`/nilai/${language}?level=${levelRubric.id}&skill=${skill}`)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-white"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles size={16} /> Nilai jawabanku dengan AI
          </button>
        </div>
      )}
    </section>
  );
}
