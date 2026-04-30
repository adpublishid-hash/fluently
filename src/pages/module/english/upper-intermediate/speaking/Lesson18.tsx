import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Mic2, MessageCircle } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface SpeakingItem { phrase: string; usage: string; }
interface SpeakingSection { name: string; icon: string; items: SpeakingItem[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const SECTIONS: SpeakingSection[] = [
  {
    name: "Kesadaran Budaya",
    icon: "🌍",
    items: [
      { phrase: "It is important to recognise that cultural norms vary significantly across contexts.", usage: "Mengakui keragaman norma budaya" },
      { phrase: "What may be considered appropriate in one cultural context can be perceived very differently in another.", usage: "Kontekstualisasi norma budaya" },
      { phrase: "I am mindful that my perspective here is shaped by my own cultural background.", usage: "Kesadaran terhadap bias budaya sendiri" },
      { phrase: "Cross-cultural communication requires sensitivity and a willingness to adapt.", usage: "Komponen komunikasi lintas budaya yang efektif" },
      { phrase: "The concept of directness, for example, is valued very differently across cultures.", usage: "Contoh perbedaan konseptual lintas budaya" },
      { phrase: "It would be reductive to generalise about cultural practices without acknowledging diversity within cultures.", usage: "Menghindari stereotip budaya" },
      { phrase: "From a cultural perspective, this gesture carries very different connotations in...", usage: "Kontekstualisasi gestur atau praktik spesifik" },
      { phrase: "Building intercultural competence requires constant learning and self-reflection.", usage: "Kompetensi lintas budaya sebagai proses berkelanjutan" }
    ]
  },
  {
    name: "Bahasa Lintas Budaya",
    icon: "🤝",
    items: [
      { phrase: "I hope this translation captures the intended meaning accurately.", usage: "Kehati-hatian dalam terjemahan dan makna" },
      { phrase: "There is no direct equivalent in [language] for this concept.", usage: "Keterbatasan ekuivalensi linguistik" },
      { phrase: "Could you clarify what you mean by that term in your cultural context?", usage: "Meminta klarifikasi berbasis konteks budaya" },
      { phrase: "The concept may require some unpacking for those from different cultural backgrounds.", usage: "Mengantisipasi kesenjangan pemahaman budaya" },
      { phrase: "Communication styles tend to differ between high-context and low-context cultures.", usage: "Perbedaan gaya komunikasi high vs low context" },
      { phrase: "Silence, in some cultural contexts, conveys respect rather than disinterest.", usage: "Reinterpretasi perilaku dari lensa budaya berbeda" },
      { phrase: "The degree of formality expected in this type of interaction varies by culture.", usage: "Variasi tingkat formalitas berbasis budaya" },
      { phrase: "I appreciate you sharing that. It gives me a richer understanding of your perspective.", usage: "Apresiasi terhadap berbagi perspektif budaya" }
    ]
  },
  {
    name: "Dialog Antar Budaya",
    icon: "💬",
    items: [
      { phrase: "A: In our culture, direct disagreement is generally avoided in formal settings.", usage: "Menjelaskan norma budaya sendiri" },
      { phrase: "B: That is a fascinating insight. Can you help me understand how disagreement is typically expressed?", usage: "Rasa ingin tahu yang genuini tentang norma budaya" },
      { phrase: "A: Typically, we would signal discomfort indirectly by...", usage: "Menjelaskan komunikasi tidak langsung" },
      { phrase: "B: I appreciate that. I should mention that in my context, directness is generally valued as a sign of respect.", usage: "Menjelaskan norma budaya sendiri sebagai kontras" },
      { phrase: "A: That is very helpful context. How should I interpret your silence during discussions?", usage: "Practical question tentang komunikasi" },
      { phrase: "B: In our interactions, feel free to interpret my silence as thoughtful consideration rather than disagreement.", usage: "Menetapkan kode komunikasi bersama" }
    ]
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "What is the BEST way to introduce your main point when speaking about \"Intercultural Communication\"?",
    "opts": [
      "Umm, so basically I think...",
      "The key point I would like to address is...",
      "Like, I dunno what to say...",
      "So yeah, my thing is..."
    ],
    "ans": "The key point I would like to address is...",
    "exp": "\"The key point I would like to address\" adalah pembuka formal yang langsung dan jelas dalam speaking B2."
  },
  {
    "q": "Which phrase allows you to AGREE and then ADD a qualification?",
    "opts": [
      "No way.",
      "I totally agree. Full stop.",
      "I see your point, however, there is also the consideration of...",
      "Whatever you say."
    ],
    "ans": "I see your point, however, there is also the consideration of...",
    "exp": "\"I see your point, however\" mengakui argumen lawan sebelum memperkenalkan perspektif tambahan."
  },
  {
    "q": "In formal speaking, what does \"To put it another way,\" signal?",
    "opts": [
      "Starting a new topic",
      "Rephrasing what was said for clarity",
      "Disagreeing strongly",
      "Ending the conversation"
    ],
    "ans": "Rephrasing what was said for clarity",
    "exp": "\"To put it another way\" adalah frasa transisi yang digunakan untuk memparafrase atau menyederhanakan poin."
  },
  {
    "q": "Which phrase appropriately asks someone to develop their idea?",
    "opts": [
      "What do you mean?",
      "Huh?",
      "Could you elaborate on that point, please?",
      "Say it again."
    ],
    "ans": "Could you elaborate on that point, please?",
    "exp": "\"Could you elaborate on that?\" adalah cara sopan dan formal untuk meminta penjelasan lebih lanjut."
  },
  {
    "q": "\"Building on what was said earlier\" shows that you ___",
    "opts": [
      "Are changing the subject",
      "Cannot remember the conversation",
      "Are connecting your point to previous contributions",
      "Are ending your speaking turn"
    ],
    "ans": "Are connecting your point to previous contributions",
    "exp": "\"Building on\" menunjukkan kemampuan mengikuti diskusi dan mengintegrasikan ide yang telah disampaikan."
  },
  {
    "q": "Which is an effective strategy when you need time to think in a discussion?",
    "opts": [
      "Going completely silent",
      "Using fillers like \"That's an interesting point; let me consider...\"",
      "Changing the topic abruptly",
      "Saying \"I don't know\" and stopping"
    ],
    "ans": "Using fillers like \"That's an interesting point; let me consider...\"",
    "exp": "\"That's an interesting point; let me consider...\" memberi Anda waktu berpikir sambil tetap terlibat dalam diskusi."
  },
  {
    "q": "What does hedging in formal speaking indicate?",
    "opts": [
      "Weak knowledge",
      "Academic caution and awareness of complexity",
      "Uncertainty about everything",
      "Refusal to commit to ideas"
    ],
    "ans": "Academic caution and awareness of complexity",
    "exp": "Hedging menunjukkan kesadaran akademik bahwa sebagian besar isu bersifat kompleks dan memiliki nuansa."
  },
  {
    "q": "\"The implications of this are significant\" is used when ___",
    "opts": [
      "Concluding a story",
      "Emphasizing the importance of a point or finding",
      "Introducing yourself",
      "Asking a question"
    ],
    "ans": "Emphasizing the importance of a point or finding",
    "exp": "Frasa ini menekankan bahwa poin yang dibicarakan memiliki konsekuensi atau dampak yang besar."
  },
  {
    "q": "\"Drawing on current research\" shows that your argument is ___",
    "opts": [
      "Based purely on personal feeling",
      "Evidence-based and academically grounded",
      "Hypothetical only",
      "Informal and chatty"
    ],
    "ans": "Evidence-based and academically grounded",
    "exp": "\"Drawing on current research\" menandai bahwa argumen Anda didukung oleh sumber akademik terkini."
  },
  {
    "q": "At B2 level, good speaking involves ___",
    "opts": [
      "Only using simple vocabulary",
      "Using complex structures, varied vocabulary, and appropriate register",
      "Speaking as fast as possible",
      "Avoiding all opinions"
    ],
    "ans": "Using complex structures, varied vocabulary, and appropriate register",
    "exp": "CEFR B2 berbicara: menggunakan struktur kompleks, kosakata bervariasi, dan register yang sesuai konteks."
  },
  {
    "q": "\"What I find most compelling is...\" introduces ___",
    "opts": [
      "A dismissal of an idea",
      "The speaker's strongest supporting argument",
      "A personal anecdote only",
      "A question to the audience"
    ],
    "ans": "The speaker's strongest supporting argument",
    "exp": "\"What I find most compelling\" memperkenalkan argumen paling kuat atau paling meyakinkan dari pembicara."
  },
  {
    "q": "Which phrase politely challenges a previous statement?",
    "opts": [
      "That's wrong.",
      "While I appreciate that perspective, I would question whether...",
      "No that's false.",
      "I disagree completely."
    ],
    "ans": "While I appreciate that perspective, I would question whether...",
    "exp": "\"While I appreciate that perspective\" mengakui sudut pandang sebelum mempertanyakannya secara sopan."
  },
  {
    "q": "\"This is a nuanced issue because...\" prepares the listener for ___",
    "opts": [
      "A simple answer",
      "A complex, multi-faceted discussion with multiple perspectives",
      "A conclusion only",
      "A personal story"
    ],
    "ans": "A complex, multi-faceted discussion with multiple perspectives",
    "exp": "\"Nuanced\" menandakan bahwa isu tidak hitam-putih dan memerlukan pemikiran yang lebih dalam."
  },
  {
    "q": "\"To summarise my argument\" is used ___",
    "opts": [
      "At the beginning of a discussion",
      "To introduce new evidence",
      "To signal closure or recapping before concluding",
      "To ask a question"
    ],
    "ans": "To signal closure or recapping before concluding",
    "exp": "\"To summarise\" menandakan bahwa pembicara akan menyatakan kembali poin-poin utama sebelum menutup."
  },
  {
    "q": "If a stakeholder says something vague, which is the BEST response?",
    "opts": [
      "Ignore it.",
      "Agree immediately.",
      "If I understand correctly, you are suggesting that...?",
      "Tell them they are wrong."
    ],
    "ans": "If I understand correctly, you are suggesting that...?",
    "exp": "\"If I understand correctly\" memverifikasi pemahaman Anda sebelum merespons, menghindari kesalahpahaman."
  },
  {
    "q": "\"In light of the evidence\" signals that your conclusion is ___",
    "opts": [
      "Based on random guessing",
      "Supported by available data or research",
      "Purely emotional",
      "Unsupported"
    ],
    "ans": "Supported by available data or research",
    "exp": "\"In light of the evidence\" menekankan bahwa kesimpulan Anda didasarkan pada bukti yang tersedia."
  },
  {
    "q": "When presenting in English, how should you structure your main points?",
    "opts": [
      "Randomly and without order",
      "With a clear introduction, signposting, and conclusion",
      "Without any signposting or transitions",
      "Only with bullet points read aloud"
    ],
    "ans": "With a clear introduction, signposting, and conclusion",
    "exp": "Presentasi B2 efektif: pembuka jelas, penanda jalan (signposting), isi terstruktur, dan penutup yang kuat."
  },
  {
    "q": "Which phrase helps maintain your speaking turn politely?",
    "opts": [
      "Wait, let me finish!",
      "If I may continue...",
      "Shh!",
      "Be quiet please."
    ],
    "ans": "If I may continue...",
    "exp": "\"If I may continue\" adalah cara sopan dan formal untuk meminta ruang untuk menyelesaikan poin Anda."
  },
  {
    "q": "\"That's an interesting perspective\" is best followed by ___",
    "opts": [
      "...and I completely agree.",
      "...and I have nothing to add.",
      "...though I think we should also consider X.",
      "...goodbye."
    ],
    "ans": "...though I think we should also consider X.",
    "exp": "Mengakui perspektif orang lain lalu memperluas diskusi dengan \"we should also consider\" menunjukkan engagement yang baik."
  },
  {
    "q": "Effective B2 discussion participants ___",
    "opts": [
      "Only talk and never listen",
      "Listen actively, build on others' ideas, and take balanced turns",
      "Dominate the conversation entirely",
      "Avoid all opinions"
    ],
    "ans": "Listen actively, build on others' ideas, and take balanced turns",
    "exp": "Peserta diskusi yang baik di B2 menunjukkan kemampuan mendengar aktif, membangun argumen kolaboratif, dan bergilir dengan seimbang."
  }
];

const UpperInterSpeakingLesson18: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_speaking', 18);
  const nextLessonPath = '/modul/english/upper-intermediate/speaking/lesson-19';

  const [activeSection, setActiveSection] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handlePlay = (text: string) => { playAudio(text, 0.85); };

  const handleCheckQuiz = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(opt);
    setIsAnswerChecked(true);
    if (opt === QUIZ[quizStep].ans) setQuizScore(p => p + 1);
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ.length - 1) { setQuizStep(p => p+1); setSelectedOption(null); setIsAnswerChecked(false); }
    else setShowResult(true);
  };

  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Speaking Lesson 18"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Intercultural Communication"
        subtitle="Speaking B2 • Pelajaran 18"
        accentColor="#4FA3D1"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Frasa & Teknik', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan Soal', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#2F86B5)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,#4FA3D1,#0B5345)'}}>
                <div className="text-3xl mb-2">🎙️</div>
                <h2 className="text-xl font-extrabold mb-1">Intercultural Communication</h2>
                <p className="text-sm opacity-90">Komunikasi Lintas Budaya & Global Awareness</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🗣️ CEFR B2 · Speaking</div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {SECTIONS.map((s, i) => (
                  <button key={i} onClick={() => setActiveSection(i)}
                    className={'px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ' + (activeSection === i ? 'text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200')}
                    style={activeSection === i ? {backgroundColor:'#4FA3D1'} : {}}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {SECTIONS[activeSection].items.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-sky-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <button onClick={() => handlePlay(item.phrase)}
                        className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0 hover:bg-green-100 transition-colors">
                        <Mic2 className="w-4 h-4 text-green-600" />
                      </button>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.phrase}</p>
                        <p className="text-xs text-slate-500 mt-0.5 italic">{item.usage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 rounded-2xl p-4 border border-sky-100">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-800 text-sm">💡 Tips Speaking B2</h3>
                </div>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Gunakan frasa ini dalam percakapan nyata atau latihan role-play.</li>
                  <li>• Rekam dan putar ulang untuk menilai kelancaran dan ketepatan.</li>
                  <li>• Fokus pada register (formal/informal) sesuai konteks situasi.</li>
                </ul>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-green-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-2">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-sky-300 hover:bg-green-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-sky-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-3 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between text-sm ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={16} className="text-green-600 shrink-0" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={16} className="text-red-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-4">
                        <div className={'p-3 rounded-xl text-sm mb-3 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Benar!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Soal Berikutnya →' : 'Lihat Skor Akhir'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Speaking Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-green-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎙️ Outstanding B2 Speaker!' : quizScore >= 10 ? '👍 Keep practising!' : '💪 Review the phrases and try again!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold" style={{backgroundColor:'#4FA3D1'}}>Ulangi Kuis</button>
                  </div>
                )}
              </div>
            </div>
          );
          return null;
        }}
      </LessonShell>
    </>
  );
};

export default UpperInterSpeakingLesson18;
