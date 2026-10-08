import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Sparkles, Star, Lightbulb } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

import { shuffledAuthored } from '../../advanced/shared/authoredQuiz';
import { upperInterVocabularyQuizBank } from './quizBank';
interface VocabItem { word: string; ipa: string; meaning: string; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const CAT1: VocabItem[] = [
  {
    "word": "Hypothesis",
    "ipa": "/haɪˈpɒθɪsɪs/",
    "meaning": "Hipotesis – dugaan sementara yang diuji. Contoh: The study tested the **hypothesis** that exercise improves cognitive function."
  },
  {
    "word": "Methodology",
    "ipa": "/ˌmeθəˈdɒlədʒi/",
    "meaning": "Metodologi – cara/sistem penelitian. Contoh: The **methodology** of the survey involved both qualitative and quantitative data collection."
  },
  {
    "word": "Dissertation",
    "ipa": "/ˌdɪsəˈteɪʃən/",
    "meaning": "Disertasi – karya tulis ilmiah panjang. Contoh: She spent three years writing her doctoral **dissertation** on climate policy."
  },
  {
    "word": "Inference",
    "ipa": "/ˈɪnfərəns/",
    "meaning": "Inferensi – kesimpulan logis dari bukti. Contoh: The researchers made a cautious **inference** based on the available data."
  },
  {
    "word": "Paradigm",
    "ipa": "/ˈpærədaɪm/",
    "meaning": "Paradigma – kerangka berpikir dominan. Contoh: The discovery triggered a **paradigm** shift in modern biology."
  },
  {
    "word": "Variable",
    "ipa": "/ˈveəriəbəl/",
    "meaning": "Variabel – faktor yang dapat berubah. Contoh: The researchers controlled all **variables** to ensure a fair experiment."
  },
  {
    "word": "Correlation",
    "ipa": "/ˌkɒrəˈleɪʃən/",
    "meaning": "Korelasi – hubungan statistik antar variabel. Contoh: There is a strong **correlation** between sleep deprivation and academic performance."
  },
  {
    "word": "Abstract",
    "ipa": "/ˈæbstrækt/",
    "meaning": "Abstrak – ringkasan karya ilmiah. Contoh: Always read the **abstract** first to determine if the paper is relevant."
  },
  {
    "word": "Citation",
    "ipa": "/saɪˈteɪʃən/",
    "meaning": "Kutipan – referensi sumber. Contoh: The essay requires a minimum of ten academic **citations** in APA format."
  },
  {
    "word": "Peer review",
    "ipa": "/pɪr rɪˈvjuː/",
    "meaning": "Tinjauan sejawat – evaluasi oleh peneliti lain. Contoh: The paper was accepted after rigorous **peer review** by three independent experts."
  }
];
const CAT2: VocabItem[] = [
  {
    "word": "Analyse",
    "ipa": "/ˈænəlaɪz/",
    "meaning": "Menganalisis secara mendalam"
  },
  {
    "word": "Synthesise",
    "ipa": "/ˈsɪnθəsaɪz/",
    "meaning": "Mensintesis – menggabungkan informasi"
  },
  {
    "word": "Evaluate",
    "ipa": "/ɪˈvæljueɪt/",
    "meaning": "Mengevaluasi secara kritis"
  },
  {
    "word": "Substantiate",
    "ipa": "/səbˈstænʃieɪt/",
    "meaning": "Mensubstansiasi – membuktikan dengan fakta"
  },
  {
    "word": "Contradict",
    "ipa": "/ˌkɒntrəˈdɪkt/",
    "meaning": "Bertentangan dengan pernyataan lain"
  },
  {
    "word": "Propose",
    "ipa": "/prəˈpoʊz/",
    "meaning": "Mengusulkan sebuah teori atau ide"
  },
  {
    "word": "Validate",
    "ipa": "/ˈvælɪdeɪt/",
    "meaning": "Memvalidasi – memastikan kebenaran"
  },
  {
    "word": "Cite",
    "ipa": "/saɪt/",
    "meaning": "Mengutip sumber"
  },
  {
    "word": "Deduce",
    "ipa": "/dɪˈdjuːs/",
    "meaning": "Menyimpulkan secara logis"
  },
  {
    "word": "Interpret",
    "ipa": "/ɪnˈtɜːrprɪt/",
    "meaning": "Menginterpretasikan data/teks"
  }
];
const CAT3: VocabItem[] = [
  {
    "word": "Based on evidence",
    "ipa": "/beɪst ɒn ˈevɪdəns/",
    "meaning": "Berdasarkan bukti"
  },
  {
    "word": "In contrast to",
    "ipa": "/ɪn ˈkɒntrɑːst tuː/",
    "meaning": "Berbeda dengan / bertolak belakang"
  },
  {
    "word": "It can be argued that",
    "ipa": "/ɪt kæn biː ˈɑːrgjuːd ðæt/",
    "meaning": "Dapat diargumentasikan bahwa"
  },
  {
    "word": "To a significant extent",
    "ipa": "/tuː ə sɪɡˈnɪfɪkənt ɪkˈstent/",
    "meaning": "Hingga tingkat yang signifikan"
  },
  {
    "word": "Further research is needed",
    "ipa": "/ˈfɜːðər rɪˈsɜːrʃ ɪz ˈniːdɪd/",
    "meaning": "Diperlukan penelitian lebih lanjut"
  },
  {
    "word": "The data suggests that",
    "ipa": "/ðə ˈdeɪtə səˈdʒests ðæt/",
    "meaning": "Data menunjukkan bahwa"
  },
  {
    "word": "According to the findings",
    "ipa": "/əˈkɔːrdɪŋ tuː ðə ˈfaɪndɪŋz/",
    "meaning": "Menurut temuan/hasil penelitian"
  },
  {
    "word": "This raises the question of",
    "ipa": "/ðɪs reɪzɪz ðə ˈkwestʃən ɒv/",
    "meaning": "Ini menimbulkan pertanyaan tentang"
  },
  {
    "word": "Despite the limitations",
    "ipa": "/dɪˈspaɪt ðə ˌlɪmɪˈteɪʃənz/",
    "meaning": "Terlepas dari keterbatasan"
  },
  {
    "word": "Broadly speaking",
    "ipa": "/ˈbrɔːdli ˈspiːkɪŋ/",
    "meaning": "Secara umum / garis besar"
  }
];
const QUIZ: QuizItem[] = shuffledAuthored(upperInterVocabularyQuizBank[1], 'upper-intermediate/vocabulary/1');

const UpperInterVocabLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', 1);
  const nextLessonPath = '/modul/english/upper-intermediate/vocabulary/lesson-2';

  const [activeSection, setActiveSection] = useState<'cat1'|'cat2'|'cat3'>('cat1');
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const playSound = (text: string) => { playAudio(text, 0.9); };

  const handleCheckQuiz = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);
    if (option === QUIZ[quizStep].ans) { setQuizScore(p => p + 1); playSound('Correct!'); }
    else { playSound('Incorrect.'); }
  };

  const nextQuestion = () => {
    if (quizStep < QUIZ.length - 1) { setQuizStep(p => p + 1); setSelectedOption(null); setIsAnswerChecked(false); }
    else { setShowResult(true); }
  };

  const restartQuiz = () => { setQuizStep(0); setQuizScore(0); setShowResult(false); setSelectedOption(null); setIsAnswerChecked(false); };

  const SECTIONS = { cat1: CAT1, cat2: CAT2, cat3: CAT3 };
  const LABELS = { cat1: 'Nouns', cat2: 'Verbs', cat3: 'Academic Phrases' };
  const DESCS = { cat1: 'Kata benda dalam konteks riset akademik.', cat2: 'Kata kerja dalam konteks analisis akademik.', cat3: 'Frasa penting untuk karya tulis formal.' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Vocabulary Lesson 1"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Academic Research"
        subtitle="Vocabulary B2 • Pelajaran 1"
        accentColor="#4FA3D1"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#4FA3D1cc)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white relative overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg,#4FA3D1,#0E5A4F)' }}>
                <div className="text-3xl mb-2">📚</div>
                <h2 className="text-xl font-extrabold mb-1">Academic Research</h2>
                <p className="text-sm opacity-90">Kosakata Penelitian & Studi</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎯 CEFR B2 · 30 Kosakata</div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {(['cat1','cat2','cat3'] as const).map(k => (
                  <button key={k} onClick={() => setActiveSection(k)}
                    className={'px-4 py-2 rounded-full text-xs font-bold transition-all ' + (activeSection === k ? 'text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200')}
                    style={activeSection === k ? {backgroundColor:'#4FA3D1'} : {}}>
                    {LABELS[k]}
                  </button>
                ))}
              </div>

              <div className="bg-teal-50 p-4 rounded-2xl border border-sky-100 flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-teal-600 shrink-0" />
                <p className="text-sm text-teal-800 font-medium">{DESCS[activeSection]}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SECTIONS[activeSection].map((item, i) => (
                  <button key={i} onClick={() => playSound(item.word)}
                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-sky-300 hover:shadow-md transition-all active:scale-95 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                      <div>
                        <p className="font-bold text-slate-800">{item.word}</p>
                        <p className="text-xs text-slate-400 font-mono mb-0.5">{item.ipa}</p>
                        <p className="text-xs text-slate-500 italic">{item.meaning}</p>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-teal-500 shrink-0" />
                  </button>
                ))}
              </div>

              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-amber-800 text-sm">💡 Tips B2</h3>
                </div>
                <p className="text-sm text-slate-700">Gunakan kosakata level ini dalam konteks formal: laporan, presentasi, dan esai akademik. Semakin sering dipraktikkan dalam kalimat nyata, semakin cepat terkuasai!</p>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soal {quizStep+1} / {QUIZ.length}</span>
                      <span className="text-xs font-bold bg-teal-50 text-teal-600 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
                      <div className="h-1.5 rounded-full transition-all" style={{width: ((quizStep/(QUIZ.length-1))*100)+'%', backgroundColor:'#4FA3D1'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-3">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-sky-300 hover:bg-teal-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-sky-500 text-green-800';
                          else if (opt === selectedOption) cls = 'bg-red-50 border-red-400 text-red-700';
                          else cls = 'opacity-40 border-slate-200';
                        }
                        return (
                          <button key={i} onClick={() => handleCheckQuiz(opt)} disabled={isAnswerChecked}
                            className={'w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between ' + cls}>
                            <span>{opt}</span>
                            {isAnswerChecked && opt === QUIZ[quizStep].ans && <CheckCircle2 size={18} className="text-green-600" />}
                            {isAnswerChecked && opt === selectedOption && opt !== QUIZ[quizStep].ans && <XCircle size={18} className="text-red-500" />}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswerChecked && (
                      <div className="mt-5">
                        <div className={'p-3 rounded-xl text-sm mb-4 ' + (selectedOption === QUIZ[quizStep].ans ? 'bg-green-50 text-green-800 border border-sky-100' : 'bg-orange-50 text-orange-800 border border-orange-100')}>
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Tepat!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjut →' : 'Lihat Skor Akhir'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor kamu: <strong className="text-teal-600 text-xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎉 Luar biasa! Kosakata B2 kamu sangat kuat.' : quizScore >= 10 ? '👍 Bagus! Terus berlatih.' : '💪 Jangan menyerah, coba lagi!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold transition-all" style={{backgroundColor:'#4FA3D1'}}>Ulangi Kuis</button>
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

export default UpperInterVocabLesson1;
