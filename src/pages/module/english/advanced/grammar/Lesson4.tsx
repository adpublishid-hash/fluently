import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, BookOpen, Lightbulb } from 'lucide-react';

const THEORY_LINES = [
    "The **subjunctive** expresses hypothetical, wished-for, or formally required states. It is more common in formal writing and American English.",
    "**Types of Subjunctive:**",
    "**1. Present Subjunctive (base form of verb)**",
    "- After verbs of recommendation/demand/suggestion: *It is imperative that every employee **submit** their timesheet.*",
    "- Verbs that trigger it: *recommend, suggest, insist, demand, propose, request, require*",
    "- ✗ \"It is essential that she submits\" → ✓ \"It is essential that she **submit**\"",
    "**2. Past Subjunctive (\"were\" for all persons)**",
    "- Hypothetical situations: *If I **were** you, I would reconsider.*",
    "- After \"wish\": *I wish she **were** here.*",
    "- After \"as if/as though\": *He behaves as if he **were** the CEO.*",
    "**3. Formulaic Subjunctive**",
    "- Fixed expressions: *God save the Queen. Long live the Republic. Be that as it may. So be it.*"
];

const ITEMS = [

];

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
  { q: "Which structure is an inverted conditional?", opts: ["You need help, contact me.", "If you need help, contact me.", "Should you need help, please contact me."], ans: "Should you need help, please contact me.", exp: "Inverted conditionals replace \"if\" with auxiliary inversion: Should/Were/Had + subject." },
  { q: "Complete: \"She insisted ___ attending the entire symposium.\"", opts: ["to", "on", "for"], ans: "on", exp: "\"Insist on + gerund\" is the fixed collocation." },
  { q: "Which uses the subjunctive correctly?", opts: ["The committee recommends him to submit the report.", "The committee recommends that he submit the report.", "The committee recommends that he submits the report."], ans: "The committee recommends that he submit the report.", exp: "After recommend/insist/suggest/require, use subjunctive: that + subject + base form." },
  { q: "Identify the correct cleft sentence:", opts: ["It was John that broke the record, yes.", "It was John who broke the record.", "John broke the record was it."], ans: "It was John who broke the record.", exp: "It-cleft structure: It + be + focus element + relative clause (who/that)." },
  { q: "\"The ___ of the research proposal was rejected.\" (Nominalize: propose)", opts: ["proposition", "propose", "proposal"], ans: "proposal", exp: "Nominalization of \"propose\" → \"proposal\". Academic writing uses nominalisations for formality." },
  { q: "What type of error is: \"The equipments are outdated.\"?", opts: ["Tense error", "Word order error", "Countability error — equipment is uncountable"], ans: "Countability error — equipment is uncountable", exp: "\"Equipment\" is always uncountable → \"The equipment is outdated.\" No plural form exists." },
  { q: "\"Had they begun earlier, the project ___ by now.\"", opts: ["would complete", "will be completed", "would have been completed"], ans: "would have been completed", exp: "Type 3 inverted conditional: Had + subject + past participle → would have + past participle." },
  { q: "Which sentence uses a participle clause correctly?", opts: ["Reviewed having the manuscript, the editor accepted.", "Having reviewed the manuscript, it was accepted.", "Having reviewed the manuscript, the editor accepted it."], ans: "Having reviewed the manuscript, the editor accepted it.", exp: "The subject of the participle clause must match the main clause subject. \"The editor\" reviewed — not \"it\"." },
  { q: "Choose the correct passive reporting structure:", opts: ["People believe that he resigned.", "It is believed that he resigned.", "It believes that he resigned."], ans: "It is believed that he resigned.", exp: "Passive reporting: \"It + be + past participle + that-clause\". Common verbs: believe, argue, suggest, report." },
  { q: "What does \"should have done\" express?", opts: ["A criticism or regret about a past action that did not happen", "A plan for the future", "Certainty about a past event"], ans: "A criticism or regret about a past action that did not happen", exp: "\"Should have + past participle\" = it was the right thing to do but it did NOT happen (regret/criticism)." },
  { q: "Which is an example of nominalization in academic writing?", opts: ["Scientists found a cure and it was considered.", "The discovery of a cure by the scientists...", "The scientists discovered a cure."], ans: "The discovery of a cure by the scientists...", exp: "Nominalization: \"discovered\" → \"the discovery\". Creates a more formal, dense academic style." },
  { q: "\"Not only ___ she finish the project, but she also trained the team.\"", opts: ["did", "has", "was"], ans: "did", exp: "After \"Not only\" at sentence start, auxiliary inversion is required: Not only did + subject + base verb." },
  { q: "Which hedge is most appropriate in academic writing?", opts: ["The results may suggest support for the hypothesis.", "The results totally prove the hypothesis.", "Obviously, the results confirm everything."], ans: "The results may suggest support for the hypothesis.", exp: "\"May suggest\" is appropriately hedged — academic writing avoids absolute claims. \"May\" + \"suggest\" double-hedges." },
  { q: "Fix: \"She was married with a prominent economist.\"", opts: ["\"Married with\" → \"married to\"", "\"Prominent\" → \"famous\"", "\"Was\" → \"got\""], ans: "\"Married with\" → \"married to\"", exp: "Fixed collocation: \"married to\" (not \"with\"). Portuguese/Spanish cognate interference: \"casado con\" ≠ \"married with\"." },
  { q: "Which sentence correctly uses ellipsis?", opts: ["She applied for the grant and received [the grant].", "She applied and she received.", "She applied for the grant and she received the grant."], ans: "She applied for the grant and received [the grant].", exp: "Ellipsis removes repeated elements. \"She applied for the grant and received [it]\" is the most natural." },
  { q: "What is the function of \"albeit\" in: \"The results were positive, albeit preliminary.\"?", opts: ["To introduce a concession or qualification", "To add more information", "To show cause"], ans: "To introduce a concession or qualification", exp: "\"Albeit\" (= although/even though) introduces a concession within a clause. Formal and C1+ register." },
  { q: "\"The more rigorous the study, ___ credible the findings.\"", opts: ["the more", "most", "the most"], ans: "the more", exp: "Proportional comparisons: \"The more X, the more Y.\" Both clauses use comparative form." },
  { q: "Select the sentence with correct fronting for emphasis:", opts: ["Completely unconvincing argument I find this.", "This argument I find completely unconvincing.", "I find this argument unconvincing completely."], ans: "This argument I find completely unconvincing.", exp: "Fronting moves the object to initial position for emphasis: \"This argument [object] + I find [subject-verb] + completely unconvincing [complement].\"" },
  { q: "Which demonstrates correct use of the mixed conditional?", opts: ["If I had worked harder, I would have succeeded.", "If I had worked harder, I would succeed now.", "If I work harder, I would succeed now."], ans: "If I had worked harder, I would succeed now.", exp: "Mixed conditional: past perfect in if-clause (past condition) + would + base (present result)." },
  { q: "What distinguishes \"needn't have done\" from \"didn't need to do\"?", opts: ["Needn't have = action happened but was unnecessary; didn't need to = action didn't happen", "Didn't need to = action happened but was unnecessary; needn't have = action didn't happen", "No difference"], ans: "Needn't have = action happened but was unnecessary; didn't need to = action didn't happen", exp: "\"Needn't have brought lunch\" = you brought it, but it wasn't needed. \"Didn't need to bring\" = you didn't bring it (correctly)." }
];

const ACCENT = '#1B2631';
const NEXT_PATH = "/modul/english/advanced/grammar/lesson-5";
const STORAGE_KEY = 'talky_advanced_grammar_completed';
const LESSON_NUM = 4;

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function markComplete() {
  const d = getCompleted();
  if (!d.includes(LESSON_NUM)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, LESSON_NUM]));
}

export default function AdvancedGrammarLesson4() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'materi' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(LESSON_NUM));
  const [modal, setModal] = useState(false);
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [fin, setFin] = useState(false);
  const cur = QUIZ[qi];

  const pickAns = (o: string) => {
    if (sel) return;
    setSel(o);
    if (o === cur.ans) setScore(s => s + 1);
  };
  const next = () => {
    if (qi + 1 < QUIZ.length) { setQi(q => q + 1); setSel(null); }
    else { setFin(true); markComplete(); setDone(true); setModal(true); }
  };
  const finish = () => { markComplete(); setDone(true); setModal(true); };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }} onClick={() => setModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">{fin ? (score >= 16 ? '🏆' : '📚') : '✅'}</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Selesai!</h2>
            {fin && <p className="text-2xl font-black mb-2" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>}
            <p className="text-slate-500 text-sm mb-6">Advanced Grammar — Lesson 4: Subjunctive Mood</p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => { setModal(false); navigate('/modul/english/advanced/grammar'); }} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1/C2 Grammar — Lesson 4</p>
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Subjunctive Mood</h1>
            </div>
            {NEXT_PATH ? (
              <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next ›</button>
            ) : <div className="w-14" />}
          </div>
        </header>

        {/* Tabs */}
        <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
          {([['materi', '📖 Materi & Teori'], ['kuis', '🧠 Kuis 20 Soal']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t as 'materi' | 'kuis')}
              className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === t ? 'text-white shadow-md' : 'text-slate-500')}
              style={tab === t ? { background: ACCENT } : {}}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-5">

            {tab === 'materi' && (
              <div className="space-y-5 animate-fade-in">
                {/* Hero */}
                <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}BB)` }}>
                  <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">🎓 C1/C2 Advanced Grammar</span>
                  <h2 className="text-xl font-black mt-3 mb-1">Subjunctive Mood</h2>
                  <p className="text-sm text-white/85 leading-relaxed">Master Subjunctive Mood at CEFR C1/C2 level — essential for sophisticated academic and professional English.</p>
                </div>

                {/* Theory */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5" style={{ color: ACCENT }} />
                    <p className="text-xs font-extrabold uppercase tracking-widest" style={{ color: ACCENT }}>📐 PENJELASAN TEORI</p>
                  </div>
                  <div className="space-y-3">
                    {THEORY_LINES.map((line, i) => {
                      const isBold = line.startsWith('<BOLD>') || line.startsWith('**');
                      const isCode = line.startsWith('✓') || line.startsWith('✗') || line.startsWith('•') || line.startsWith('-');
                      const clean = line.replace(/<BOLD>(.*?)<\/BOLD>/g, '$1').replace(/<EM>(.*?)<\/EM>/g, '$1').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
                      if (!clean.trim()) return null;
                      if (clean.startsWith('**') || (isBold && !isCode)) {
                        return <p key={i} className="text-sm font-extrabold text-slate-800 mt-4 mb-1">{clean.replace(/\*\*/g, '')}</p>;
                      }
                      if (clean.startsWith('✓') || clean.startsWith('✗')) {
                        const isGood = clean.startsWith('✓');
                        return <div key={i} className={`text-sm font-medium px-3 py-2 rounded-lg ${isGood ? 'bg-green-50 text-green-800 border-l-4 border-sky-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>{clean}</div>;
                      }
                      if (clean.startsWith('-') || clean.startsWith('•')) {
                        return <div key={i} className="text-sm text-slate-700 pl-4 py-0.5 border-l-2 border-slate-200">{clean.replace(/^[-•]\s*/, '')}</div>;
                      }
                      return <p key={i} className="text-sm text-slate-700 leading-relaxed">{clean}</p>;
                    })}
                  </div>
                </div>

                {/* Error correction items */}
                {ITEMS.length > 0 && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                    <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: ACCENT }}>🔍 LATIHAN IDENTIFIKASI KESALAHAN</p>
                    <div className="space-y-4">
                      {ITEMS.map((item, i) => (
                        <div key={i} className="rounded-2xl overflow-hidden border border-slate-100">
                          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white" style={{ background: ACCENT }}>{item.label}</div>
                          <div className="bg-slate-50 px-4 py-3 space-y-2">
                            <p className="text-sm font-medium text-red-600 line-through opacity-80">{item.text}</p>
                            {item.fix && <p className="text-sm font-bold text-green-700">{item.fix}</p>}
                            {item.note && <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-200">{item.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tip box */}
                <div className="rounded-2xl p-4 border" style={{ background: ACCENT + '08', borderColor: ACCENT + '25' }}>
                  <p className="text-sm font-bold mb-1" style={{ color: ACCENT }}>💡 Tips C1/C2</p>
                  <p className="text-sm" style={{ color: ACCENT + 'CC' }}>Struktur ini sering muncul dalam IELTS Academic 7.0+, Cambridge C1 Advanced, dan C2 Proficiency. Kuasai penggunaannya dalam tulisan akademik dan lisan formal.</p>
                </div>
              </div>
            )}

            {tab === 'kuis' && (
              <div className="animate-fade-in">
                {!fin ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal {qi + 1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${(qi / QUIZ.length) * 100}%`, background: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed pt-2">{cur.q}</p>
                    <div className="space-y-3">
                      {cur.opts.map(o => {
                        let cls = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (sel) {
                          if (o === cur.ans) cls = 'bg-green-50 border-sky-500 text-green-800 font-bold';
                          else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-50 border-slate-100';
                        }
                        return (
                          <button key={o} onClick={() => pickAns(o)} className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${cls}`}>{o}</button>
                        );
                      })}
                    </div>
                    {sel && (
                      <>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <p className="text-xs font-bold text-blue-600 mb-1">💡 Penjelasan</p>
                          <p className="text-sm text-blue-700">{cur.exp}</p>
                        </div>
                        <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>
                          {qi + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                    <div className="text-5xl">{score >= 16 ? '🏆' : score >= 12 ? '🎯' : '📚'}</div>
                    <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    <p className="text-slate-500">{score >= 16 ? 'Excellent! C1 Grammar mastery tinggi.' : score >= 12 ? 'Good! Review materi untuk penyempurnaan.' : 'Pelajari ulang teori dan coba lagi.'}</p>
                    {NEXT_PATH && <button onClick={() => navigate(NEXT_PATH)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
                    <button onClick={() => navigate('/modul/english/advanced/grammar')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : `linear-gradient(135deg,${ACCENT},${ACCENT}CC)` }}>
            <CheckCircle2 className="w-5 h-5" />
            {done ? 'Selesai ✓ — Kembali' : 'Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
