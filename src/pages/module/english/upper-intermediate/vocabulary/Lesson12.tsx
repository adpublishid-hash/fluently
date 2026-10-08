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
    "word": "Cognitive dissonance",
    "ipa": "/ˈkɒɡnɪtɪv ˈdɪsənəns/",
    "meaning": "Disonansi kognitif – ketidaknyamanan mental saat dua keyakinan bertentangan. Contoh: **Cognitive dissonance** arises when smokers know the health risks but continue smoking."
  },
  {
    "word": "Intrinsic motivation",
    "ipa": "/ɪnˈtrɪnsɪk ˌməʊtɪˈveɪʃən/",
    "meaning": "Motivasi intrinsik – dorongan dari dalam diri, bukan hadiah eksternal. Contoh: **Intrinsic motivation** produces more sustained engagement than external rewards alone."
  },
  {
    "word": "Metacognition",
    "ipa": "/ˌmetəkɒɡˈnɪʃən/",
    "meaning": "Metakognisi – kemampuan berpikir tentang proses berpikir sendiri. Contoh: Developing **metacognition** helps students become more effective and self-directed learners."
  },
  {
    "word": "Self-efficacy",
    "ipa": "/self ˈefɪkəsi/",
    "meaning": "Efikasi diri – keyakinan seseorang terhadap kemampuannya sendiri. Contoh: High **self-efficacy** is strongly correlated with academic achievement and resilience."
  },
  {
    "word": "Behavioural patterns",
    "ipa": "/bɪˈheɪvjərəl ˈpætənz/",
    "meaning": "Pola perilaku – cara bertindak yang muncul secara konsisten. Contoh: Identifying negative **behavioural patterns** is the first step in effective therapy."
  },
  {
    "word": "Attachment theory",
    "ipa": "/əˈtætʃmənt ˈθɪəri/",
    "meaning": "Teori keterikatan – hubungan emosional antara bayi dan pengasuh. Contoh: **Attachment theory** explains how early relationships shape adult emotional bonds."
  },
  {
    "word": "Conformity",
    "ipa": "/kənˈfɔːmɪti/",
    "meaning": "Konformitas – menyesuaikan perilaku dengan norma kelompok. Contoh: Milgram's classic studies revealed the disturbing power of **conformity** and authority."
  },
  {
    "word": "Neurological",
    "ipa": "/ˌnjʊərəˈlɒdʒɪkəl/",
    "meaning": "Neurologis – berkaitan dengan sistem saraf. Contoh: **Neurological** research has revealed the biological basis of anxiety disorders."
  },
  {
    "word": "Resilience",
    "ipa": "/rɪˈzɪliəns/",
    "meaning": "Ketahanan – kemampuan pulih dari kesulitan. Contoh: Psychological **resilience** can be cultivated through mindfulness and social support."
  },
  {
    "word": "Cognitive bias",
    "ipa": "/ˈkɒɡnɪtɪv ˈbaɪəs/",
    "meaning": "Bias kognitif – kecenderungan pikiran yang menyimpang dari rasionalitas. Contoh: Confirmation bias is one of the most well-documented **cognitive biases** in human decision-making."
  }
];
const CAT2: VocabItem[] = [
  {
    "word": "Emerge",
    "ipa": "/ɪˈmɜːrdʒ/",
    "meaning": "Muncul – menjadi terlihat atau dikenal"
  },
  {
    "word": "Advocate",
    "ipa": "/ˈædvəkeɪt/",
    "meaning": "Mengadvokasi – mendukung secara aktif sebuah cause"
  },
  {
    "word": "Navigate",
    "ipa": "/ˈnævɪɡeɪt/",
    "meaning": "Menavigasi – menemukan jalan melalui suatu situasi"
  },
  {
    "word": "Substantial",
    "ipa": "/səbˈstænʃəl/",
    "meaning": "Substansial – besar atau penting secara signifikan"
  },
  {
    "word": "Acknowledge",
    "ipa": "/əkˈnɒlɪdʒ/",
    "meaning": "Mengakui / mengakui keberadaan sesuatu"
  },
  {
    "word": "Implement",
    "ipa": "/ˈɪmplɪment/",
    "meaning": "Mengimplementasikan – menerapkan rencana"
  },
  {
    "word": "Controversy",
    "ipa": "/ˈkɒntrəvɜːrsi/",
    "meaning": "Kontroversi – perdebatan publik yang serius"
  },
  {
    "word": "Implication",
    "ipa": "/ˌɪmplɪˈkeɪʃən/",
    "meaning": "Implikasi – konsekuensi tidak langsung"
  },
  {
    "word": "Perspective",
    "ipa": "/pərˈspektɪv/",
    "meaning": "Perspektif – sudut pandang tertentu"
  },
  {
    "word": "Innovate",
    "ipa": "/ˈɪnəveɪt/",
    "meaning": "Berinovasi – memperkenalkan perubahan baru"
  }
];
const CAT3: VocabItem[] = [
  {
    "word": "Innovate",
    "ipa": "/ˈɪnəveɪt/",
    "meaning": "Berinovasi – memperkenalkan perubahan baru"
  },
  {
    "word": "Perspective",
    "ipa": "/pərˈspektɪv/",
    "meaning": "Perspektif – sudut pandang tertentu"
  },
  {
    "word": "Implication",
    "ipa": "/ˌɪmplɪˈkeɪʃən/",
    "meaning": "Implikasi – konsekuensi tidak langsung"
  },
  {
    "word": "Controversy",
    "ipa": "/ˈkɒntrəvɜːrsi/",
    "meaning": "Kontroversi – perdebatan publik yang serius"
  },
  {
    "word": "Implement",
    "ipa": "/ˈɪmplɪment/",
    "meaning": "Mengimplementasikan – menerapkan rencana"
  },
  {
    "word": "Acknowledge",
    "ipa": "/əkˈnɒlɪdʒ/",
    "meaning": "Mengakui / mengakui keberadaan sesuatu"
  },
  {
    "word": "Substantial",
    "ipa": "/səbˈstænʃəl/",
    "meaning": "Substansial – besar atau penting secara signifikan"
  },
  {
    "word": "Navigate",
    "ipa": "/ˈnævɪɡeɪt/",
    "meaning": "Menavigasi – menemukan jalan melalui suatu situasi"
  },
  {
    "word": "Advocate",
    "ipa": "/ˈædvəkeɪt/",
    "meaning": "Mengadvokasi – mendukung secara aktif sebuah cause"
  },
  {
    "word": "Emerge",
    "ipa": "/ɪˈmɜːrdʒ/",
    "meaning": "Muncul – menjadi terlihat atau dikenal"
  }
];
const QUIZ: QuizItem[] = shuffledAuthored(upperInterVocabularyQuizBank[12], 'upper-intermediate/vocabulary/12');

const UpperInterVocabLesson12: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', 12);
  const nextLessonPath = '/modul/english/upper-intermediate/vocabulary/lesson-13';

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
  const LABELS = { cat1: 'Kosakata Utama', cat2: 'Kata Kerja Penting', cat3: 'Frasa & Ekspresi' };
  const DESCS = { cat1: 'Istilah kunci topik ini.', cat2: 'Verba aktif di topik ini.', cat3: 'Kolokasi dan ekspresi tingkat lanjut.' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Vocabulary Lesson 12"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Psychology & Behavior"
        subtitle="Vocabulary B2 • Pelajaran 12"
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
                <h2 className="text-xl font-extrabold mb-1">Psychology & Behavior</h2>
                <p className="text-sm opacity-90">Psikologi & Perilaku Manusia</p>
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
                <p className="text-sm text-slate-700">Psikologi akademik menggunakan hedging yang cermat: 'Research **suggests** that...' | '**According to** the findings...' | 'This **may indicate**...' Bedakan 'psychologist' (non-medis) vs 'psychiatrist' (dokter spesialis). Dalam B2, kuasai compound terms: cognitive dissonance, intrinsic motivation, self-efficacy.</p>
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

export default UpperInterVocabLesson12;
