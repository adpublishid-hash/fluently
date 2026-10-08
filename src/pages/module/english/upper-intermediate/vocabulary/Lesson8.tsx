import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Sparkles, Star, Lightbulb } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface VocabItem { word: string; ipa: string; meaning: string; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const CAT1: VocabItem[] = [
  {
    "word": "Epistemology",
    "ipa": "/ɪˌpɪstɪˈmɒlədʒi/",
    "meaning": "Epistemologi – cabang filsafat yang mempelajari pengetahuan. Contoh: **Epistemology** asks fundamental questions: What can we know, and how do we know it?"
  },
  {
    "word": "Ontology",
    "ipa": "/ɒnˈtɒlədʒi/",
    "meaning": "Ontologi – studi tentang keberadaan dan hakikat realitas. Contoh: **Ontological** arguments for the existence of God have been debated for centuries."
  },
  {
    "word": "Utilitarianism",
    "ipa": "/juːˌtɪlɪˈteəriənɪzəm/",
    "meaning": "Utilitarianisme – etika yang bertujuan memaksimalkan kebahagiaan. Contoh: **Utilitarianism** judges actions by their consequences for overall well-being."
  },
  {
    "word": "Metaphysics",
    "ipa": "/ˌmetəˈfɪzɪks/",
    "meaning": "Metafisika – filsafat yang mempelajari hakikat realitas. Contoh: Questions about the mind-body problem fall within the domain of **metaphysics**."
  },
  {
    "word": "Determinism",
    "ipa": "/dɪˈtɜːmɪnɪzəm/",
    "meaning": "Determinisme – pandangan bahwa semua peristiwa ditentukan oleh sebab-sebab sebelumnya. Contoh: **Determinism** challenges our intuitive belief in free will and moral responsibility."
  },
  {
    "word": "Deontological",
    "ipa": "/ˌdiːɒntəˈlɒdʒɪkəl/",
    "meaning": "Deontologis – berkaitan dengan etika berbasis kewajiban/aturan. Contoh: Kant's **deontological** ethics holds that some actions are inherently right or wrong regardless of outcomes."
  },
  {
    "word": "Autonomy",
    "ipa": "/ɔːˈtɒnəmi/",
    "meaning": "Otonomi – kemampuan bertindak berdasarkan pilihan sendiri. Contoh: Respecting patient **autonomy** is a cornerstone of modern medical ethics."
  },
  {
    "word": "Cognition",
    "ipa": "/kɒɡˈnɪʃən/",
    "meaning": "Kognisi – proses mental untuk memperoleh pengetahuan. Contoh: Advances in neuroscience are transforming our understanding of human **cognition**."
  },
  {
    "word": "Nihilism",
    "ipa": "/ˈnaɪɪlɪzəm/",
    "meaning": "Nihilisme – keyakinan bahwa hidup tidak memiliki makna intrinsik. Contoh: Nietzsche's philosophy transcends simple **nihilism** by proposing the creation of new values."
  },
  {
    "word": "Pragmatism",
    "ipa": "/ˈpræɡmətɪzəm/",
    "meaning": "Pragmatisme – pendekatan yang menilai sesuatu berdasarkan kepraktisan. Contoh: **Pragmatism**, as a philosophical tradition, prioritises practical consequences over abstract principles."
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
const QUIZ: QuizItem[] = [
  {
    "q": "Which word best describes introducing a new idea in the field of Philosophy & Ethics?",
    "opts": [
      "Innovate",
      "Emerge",
      "Acknowledge",
      "Navigate"
    ],
    "ans": "Innovate",
    "exp": "To innovate berarti memperkenalkan ide, metode, atau produk baru yang mengubah cara sesuatu dilakukan."
  },
  {
    "q": "A point of view or way of thinking is called a ___",
    "opts": [
      "Controversy",
      "Advocate",
      "Perspective",
      "Implication"
    ],
    "ans": "Perspective",
    "exp": "Perspective adalah cara melihat atau memaknai sesuatu berdasarkan sudut pandang tertentu."
  },
  {
    "q": "The indirect consequence of an action is its ___",
    "opts": [
      "Substantial",
      "Navigate",
      "Implement",
      "Implication"
    ],
    "ans": "Implication",
    "exp": "Implication adalah efek atau konsekuensi tidak langsung dari suatu tindakan atau pernyataan."
  },
  {
    "q": "A public debate where people strongly disagree is called a ___",
    "opts": [
      "Controversy",
      "Implementation",
      "Emergence",
      "Perspective"
    ],
    "ans": "Controversy",
    "exp": "Controversy adalah perdebatan atau perselisihan publik yang hangat dan seringkali berlangsung lama."
  },
  {
    "q": "To put a plan or policy into action is to ___ it.",
    "opts": [
      "Acknowledge",
      "Implement",
      "Navigate",
      "Advocate"
    ],
    "ans": "Implement",
    "exp": "To implement berarti menerapkan atau melaksanakan suatu rencana, kebijakan, atau sistem."
  },
  {
    "q": "To admit or recognize something officially is to ___ it.",
    "opts": [
      "Emerge",
      "Acknowledge",
      "Innovate",
      "Implement"
    ],
    "ans": "Acknowledge",
    "exp": "To acknowledge berarti mengakui atau mengakui secara resmi keberadaan atau kebenaran sesuatu."
  },
  {
    "q": "A ___ amount is one that is large and significant.",
    "opts": [
      "Substantial",
      "Emerging",
      "Potential",
      "Controversial"
    ],
    "ans": "Substantial",
    "exp": "Substantial berarti besar, signifikan, atau cukup penting untuk diperhatikan."
  },
  {
    "q": "To ___ a complex situation means to successfully manage your way through it.",
    "opts": [
      "Emerge",
      "Innovate",
      "Navigate",
      "Advocate"
    ],
    "ans": "Navigate",
    "exp": "To navigate berarti menemukan cara untuk melewati situasi yang kompleks atau sulit."
  },
  {
    "q": "Someone who publicly supports a cause is called an ___",
    "opts": [
      "Advocate",
      "Innovator",
      "Enabler",
      "Perspective"
    ],
    "ans": "Advocate",
    "exp": "An advocate adalah orang yang secara aktif mendukung atau membela sebuah cause atauide."
  },
  {
    "q": "When a new trend ___ it becomes gradually visible in society.",
    "opts": [
      "Innovates",
      "Emerges",
      "Navigates",
      "Implements"
    ],
    "ans": "Emerges",
    "exp": "To emerge berarti muncul atau menjadi terlihat secara bertahap, seringkali dari situasi tersembunyi."
  },
  {
    "q": "The act of putting a strategy into practice is called its ___",
    "opts": [
      "Implementation",
      "Controversy",
      "Innovation",
      "Implication"
    ],
    "ans": "Implementation",
    "exp": "Implementation adalah proses penerapan nyata dari rencana, kebijakan, atau sistem."
  },
  {
    "q": "To look at a problem from a different ___ can reveal new solutions.",
    "opts": [
      "Perspective",
      "Innovation",
      "Advocacy",
      "Implication"
    ],
    "ans": "Perspective",
    "exp": "Perspective berbeda berarti melihat masalah dari sudut pandang yang berbeda untuk mendapatkan solusi baru."
  },
  {
    "q": "Which adjective describes something that is significant and important in size or scale?",
    "opts": [
      "Substantial",
      "Innovative",
      "Controversial",
      "Emerging"
    ],
    "ans": "Substantial",
    "exp": "Substantial digunakan untuk menggambarkan sesuatu yang besar, bermakna, atau signifikan."
  },
  {
    "q": "New technologies ___ from scientific research constantly.",
    "opts": [
      "Advocate",
      "Innovate",
      "Emerge",
      "Navigate"
    ],
    "ans": "Emerge",
    "exp": "Teknologi baru emerge (muncul) dari penelitian ilmiah secara terus-menerus."
  },
  {
    "q": "The ___ of a new policy on society must be carefully considered.",
    "opts": [
      "Innovation",
      "Navigation",
      "Implications",
      "Controversy"
    ],
    "ans": "Implications",
    "exp": "Implications of a policy adalah dampak atau konsekuensi tidak langsung yang perlu dianalisis."
  },
  {
    "q": "To ___ a cause means to speak in its defense publicly.",
    "opts": [
      "Implement",
      "Advocate",
      "Navigate",
      "Acknowledge"
    ],
    "ans": "Advocate",
    "exp": "To advocate for something berarti berbicara atau bertindak mendukung sebuah tujuan atau cause."
  },
  {
    "q": "A solution that is creative and uses new methods is called ___",
    "opts": [
      "Controversial",
      "Innovative",
      "Navigable",
      "Substantial"
    ],
    "ans": "Innovative",
    "exp": "Innovative berarti menggunakan pendekatan atau ide baru yang kreatif dan berbeda dari yang sudah ada."
  },
  {
    "q": "Accepting and admitting mistakes is important for ___",
    "opts": [
      "Innovation",
      "Navigation",
      "Controversy",
      "Acknowledgement"
    ],
    "ans": "Acknowledgement",
    "exp": "Acknowledgement of mistakes berarti pengakuan resmi atas kesalahan, penting untuk kepercayaan dan integritas."
  },
  {
    "q": "The new policy promised to ___ a national digital education programme.",
    "opts": [
      "Navigate",
      "Implement",
      "Acknowledge",
      "Emerge"
    ],
    "ans": "Implement",
    "exp": "To implement a programme berarti menerapkan dan menjalankan program tersebut secara aktif."
  },
  {
    "q": "An issue that causes strong public disagreement is described as ___",
    "opts": [
      "Controversial",
      "Navigable",
      "Innovative",
      "Substantial"
    ],
    "ans": "Controversial",
    "exp": "Controversial mendeskripsikan topik atau isu yang memancing perdebatan kuat dan perbedaan pendapat."
  }
];

const UpperInterVocabLesson8: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', 8);
  const nextLessonPath = '/modul/english/upper-intermediate/vocabulary/lesson-9';

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
        lessonLabel="Upper-Intermediate Vocabulary Lesson 8"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Philosophy & Ethics"
        subtitle="Vocabulary B2 • Pelajaran 8"
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
                <h2 className="text-xl font-extrabold mb-1">Philosophy & Ethics</h2>
                <p className="text-sm opacity-90">Filsafat & Dilema Etika</p>
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
                <p className="text-sm text-slate-700">Dalam esai filsafat, hindari pernyataan absolut. Gunakan hedging: 'It could be argued that...' | 'One interpretation is...' | 'This presupposes that...' Filosofi B2 menuntut keakuratan: bedakan 'ethics' (apa yang harus dilakukan) vs 'metaethics' (apa itu 'seharusnya') vs 'applied ethics' (kasus spesifik).</p>
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

export default UpperInterVocabLesson8;
