import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Star, Mic } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface ExampleItem { word: string; ipa: string; meaning: string; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const EXAMPLES: ExampleItem[] = [
  {
    "word": "of → /əv/",
    "ipa": "/əv/",
    "meaning": "Weak form: 'a lot **of** time' = /ə ˈlɒt əv ˈtaɪm/"
  },
  {
    "word": "to → /tə/",
    "ipa": "/tə/",
    "meaning": "Weak form: 'go **to** school' = /ˈɡəʊ tə ˈskuːl/"
  },
  {
    "word": "for → /fə/",
    "ipa": "/fə/",
    "meaning": "Weak form: 'wait **for** me' = /ˈweɪt fə ˈmiː/"
  },
  {
    "word": "and → /ən/",
    "ipa": "/ən/",
    "meaning": "Weak form: 'fish **and** chips' = /ˈfɪʃ ən ˈtʃɪps/"
  },
  {
    "word": "the → /ðə/",
    "ipa": "/ðə/",
    "meaning": "Weak form (before consonant): '**the** book' = /ðə ˈbʊk/"
  },
  {
    "word": "can → /kən/",
    "ipa": "/kən/",
    "meaning": "Weak form: 'you **can** do it' = /jə kən ˈduː ɪt/"
  },
  {
    "word": "have → /həv/",
    "ipa": "/həv/ or /əv/",
    "meaning": "Weak form: 'they **have** gone' = /ðeɪ həv ˈɡɒn/"
  },
  {
    "word": "want to → /ˈwɒnə/",
    "ipa": "/ˈwɒnə/",
    "meaning": "Reduction (casual): 'I want to go' = /aɪ ˈwɒnə ˈɡəʊ/'"
  },
  {
    "word": "should have → /ˈʃʊdəv/",
    "ipa": "/ˈʃʊdəv/",
    "meaning": "Modal perfect reduction: 'should've done it'"
  },
  {
    "word": "going to → /ˈɡɒnə/",
    "ipa": "/ˈɡɒnə/",
    "meaning": "Reduction (casual): 'I'm going to study' = /aɪm ˈɡɒnə ˈstʌdi/'"
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "In natural speech, \"and\" is often reduced to ___",
    "opts": [
      "/ænd/ always",
      "/ɑːnd/",
      "/ən/ or /n/",
      "/end/"
    ],
    "ans": "/ən/ or /n/",
    "exp": "\"And\" dalam connected speech sering diucapkan sebagai /ən/ atau bahkan hanya /n/ (fish n chips)."
  },
  {
    "q": "What is \"elision\" in connected speech?",
    "opts": [
      "Linking two words together",
      "Making a sound stronger",
      "Adding extra syllables",
      "Dropping a sound completely"
    ],
    "ans": "Dropping a sound completely",
    "exp": "Elision adalah penghilangan suara dalam connected speech: \"next\" + \"day\" → \"nex' day\"."
  },
  {
    "q": "\"Good morning\" → /ɡʊm ˈmɔːnɪŋ/ is an example of ___",
    "opts": [
      "Assimilation",
      "Weak forms",
      "Linking",
      "Elision"
    ],
    "ans": "Assimilation",
    "exp": "Assimilation: /d/ berubah menjadi /m/ karena pengaruh konsonan /m/ yang mengikuti."
  },
  {
    "q": "Which word has a STRONG and a WEAK form?",
    "opts": [
      "Can",
      "Table",
      "Beautiful",
      "Elephant"
    ],
    "ans": "Can",
    "exp": "\"Can\" (bisa): strong /kæn/ vs weak /kən/. Dalam kalimat positif biasanya lemah."
  },
  {
    "q": "\"I want to go\" spoken naturally sounds like ___",
    "opts": [
      "/aɪ wanttu ɡoʊ/",
      "/aɪ wɒnt tuː ɡoʊ/",
      "/aɪ wɒntə ɡoʊ/",
      "/aɪ WONT tuː ɡoʊ/"
    ],
    "ans": "/aɪ wɒntə ɡoʊ/",
    "exp": "\"to\" sebelum konsonan sering diucapkan sebagai /tə/ dalam connected speech."
  },
  {
    "q": "Linking in \"an apple\" makes it sound like ___",
    "opts": [
      "an + apple (two separate words)",
      "ann + apple",
      "a + napple (linked)",
      "anapple (one word)"
    ],
    "ans": "a + napple (linked)",
    "exp": "Konsonan /n/ di akhir \"an\" dihubungkan ke vokal /æ/ awal \"apple\" → \"an-apple\" terdengar seperti \"a-napple\"."
  },
  {
    "q": "Why do native speakers use weak forms?",
    "opts": [
      "To sound uneducated",
      "To speak more naturally, rhythmically, and quickly",
      "To hide their mistakes",
      "To confuse learners"
    ],
    "ans": "To speak more naturally, rhythmically, and quickly",
    "exp": "Weak forms dan connected speech adalah ciri alami bahasa yang membuat percakapan lebih lancar dan ritmis."
  },
  {
    "q": "In \"I'd like a cup of tea\", \"of\" is typically pronounced as ___",
    "opts": [
      "/əv/ or /ə/",
      "/ɔːf/",
      "/ɑːv/",
      "/ɒv/"
    ],
    "ans": "/əv/ or /ə/",
    "exp": "\"Of\" adalah salah satu kata paling umum yang dilemahkan dalam connected speech menjadi /əv/ atau bahkan /ə/."
  },
  {
    "q": "Which phrase demonstrates ELISION (sound deletion)?",
    "opts": [
      "good morning → /ɡʊm mɔːnɪŋ/",
      "next please → /neks pliːz/",
      "fish and chips → /fɪʃ ən tʃɪps/",
      "an apple → /ənæpəl/"
    ],
    "ans": "next please → /neks pliːz/",
    "exp": "\"Next please\": /t/ di akhir \"next\" hilang sebelum konsonan /p/ → \"nex' please\"."
  },
  {
    "q": "The word \"for\" in connected speech often sounds like ___",
    "opts": [
      "/fər/",
      "/fuːr/",
      "/fɒr/",
      "/fɔːr/"
    ],
    "ans": "/fər/",
    "exp": "\"For\" dalam unstressed position: /fɔːr/ → /fər/ (schwa replacement)."
  },
  {
    "q": "Recognizing weak forms helps with ___",
    "opts": [
      "Writing formal essays",
      "Grammar accuracy",
      "Listening comprehension in natural speech",
      "Vocabulary building"
    ],
    "ans": "Listening comprehension in natural speech",
    "exp": "Memahami weak forms sangat penting agar bisa mengikuti percakapan alami antara penutur asli."
  },
  {
    "q": "\"CAN'T\" (stress form) vs \"can\" (weak) – how to tell them apart?",
    "opts": [
      "By context and vowel clarity: /kænt/ vs /kən/",
      "They sound identical",
      "By counting syllables",
      "By spelling"
    ],
    "ans": "By context and vowel clarity: /kænt/ vs /kən/",
    "exp": "CAN'T (negatif) selalu kuat /kænt/. \"Can\" positif dilemahkan /kən/ dalam mid-sentence position."
  },
  {
    "q": "In \"I've been to London\", \"have\" sounds like ___?",
    "opts": [
      "/ɪv/",
      "/hɑːv/",
      "/hæv/",
      "/eɪv/"
    ],
    "ans": "/ɪv/",
    "exp": "Auxiliary \"have\" dalam \"I've\" dikontraksikan menjadi /ɪv/, sebuah bentuk sangat lemah."
  },
  {
    "q": "The process where consonants at end of words link to vowels at start of next is ___",
    "opts": [
      "Linking",
      "Reduction",
      "Assimilation",
      "Elision"
    ],
    "ans": "Linking",
    "exp": "Consonant-to-vowel linking membuat percakapan lebih mulus dan alami dalam bahasa Inggris."
  },
  {
    "q": "Which sentence uses connected speech MOST naturally?",
    "opts": [
      "I WANT TO GO TO THE STORE.",
      "I wants to go to store.",
      "I wanna go t'the store.",
      "I want go to store."
    ],
    "ans": "I wanna go t'the store.",
    "exp": "\"Wanna\" dan pengurangan \"to the\" adalah contoh connected speech alami yang umum terjadi."
  },
  {
    "q": "Pick the stressed (strong) form of \"the\" used before vowel-initial words:",
    "opts": [
      "/ðɪ/",
      "/ðə/",
      "/ðæ/",
      "/ðiː/"
    ],
    "ans": "/ðɪ/",
    "exp": "\"The\" sebelum vokal: /ðɪ/ (strong). Sebelum konsonan: /ðə/ (weak). \"The apple\" = /ðɪ æpəl/."
  },
  {
    "q": "What causes assimilation in English?",
    "opts": [
      "Grammar rules",
      "Formal vs informal settings",
      "Random choice by speakers",
      "Influence of neighboring sounds on each other"
    ],
    "ans": "Influence of neighboring sounds on each other",
    "exp": "Assimilation terjadi karena suara mempengaruhi suara di sebelahnya untuk kemudahan produksi."
  },
  {
    "q": "In \"What do you want?\", natural speech makes \"do you\" sound like ___",
    "opts": [
      "/duː juː/",
      "/dʒuː/ or /djə/",
      "/dəʊ juː/",
      "/dɪd juː/"
    ],
    "ans": "/dʒuː/ or /djə/",
    "exp": "\"do you\" → /dju/ dengan assimilation /d/ + /j/ → menjadi /dʒ/ seperti \"j\" dalam \"jump\"."
  },
  {
    "q": "Connected speech features are important for ___",
    "opts": [
      "Sounding natural and being understood by native speakers",
      "Passing grammar tests only",
      "Formal letter writing",
      "Reading textbooks"
    ],
    "ans": "Sounding natural and being understood by native speakers",
    "exp": "Connected speech adalah inti dari fluency alami dan sangat penting untuk komunikasi lisan yang efektif."
  },
  {
    "q": "In \"last year\", the /t/ in \"last\" before /j/ may become ___",
    "opts": [
      "Lengthened",
      "Replaced by /d/",
      "Dropped entirely",
      "Stressed"
    ],
    "ans": "Dropped entirely",
    "exp": "Elision: /t/ dalam \"last\" sering hilang sebelum konsonan atau dalam cluster konsonan: \"las' year\"."
  }
];
const POINTS: string[] = [
  "**Kata Tugas (Function Words)** seperti 'the, a, of, to, for, and, can, have' hampir SELALU memiliki weak form dalam kalimat.",
  "**Strong form** hanya muncul ketika kata tersebut ditekankan: 'Not BECAUSE of that – FOR that.' – 'for' = strong /fɔː/",
  "**Gunakan weak forms** untuk terdengar lebih alami. Sering menggunakan strong forms membuat ucapan terdengar kaku.",
  "**Hindari di tulisan formal:** Reducsi seperti 'gonna', 'wanna', 'shoulda' = hanya untuk percakapan, TIDAK di tulisan resmi.",
  "**Latihan listening:** Dengarkan podcast atau wawancara BBC dan perhatikan bagaimana penutur asli memperlemah function words.",
  "**Aturan the:** /ðə/ sebelum konsonan ('the book') | /ðiː/ sebelum vokal ('the apple') – ini juga berlaku dalam kecepatan normal."
];

const UpperInterPronLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_pronunciation', 2);
  const nextLessonPath = '/modul/english/upper-intermediate/pronunciation/lesson-3';

  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const playSound = (text: string) => { playAudio(text, 0.8); };

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
        lessonLabel="Upper-Intermediate Pronunciation Lesson 2"
        accentColor="#7D3C98"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Connected Speech & Weak Forms"
        subtitle="Pronunciation B2 • Pelajaran 2"
        accentColor="#7D3C98"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#7D3C98,#5B2882)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,#7D3C98,#4A235A)'}}>
                <div className="text-3xl mb-2">🎙️</div>
                <h2 className="text-xl font-extrabold mb-1">Connected Speech & Weak Forms</h2>
                <p className="text-sm opacity-90">Penghubungan Suara dan Bentuk Lemah</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🔊 CEFR B2 · Pronunciation</div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
                <div className="flex items-center gap-2 mb-4">
                  <Mic className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-slate-800">Panduan & Aturan Kunci</h3>
                </div>
                <ul className="space-y-2">
                  {POINTS.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                      <span dangerouslySetInnerHTML={{__html: p.replace(/\*\*(.*?)\*\*/g,'<strong class=\"text-purple-800\">$1</strong>')}} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
                <h3 className="font-bold text-purple-800 text-sm mb-3">🔊 Contoh & Latihan Pengucapan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button key={i} onClick={() => playSound(ex.word)}
                      className="bg-white p-3 rounded-xl border border-purple-100 flex items-center gap-3 group hover:border-purple-300 hover:shadow-sm transition-all active:scale-95 text-left">
                      <Volume2 className="w-4 h-4 text-purple-400 group-hover:text-purple-600 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{ex.word}</p>
                        <p className="text-xs font-mono text-purple-600">{ex.ipa}</p>
                        <p className="text-xs text-slate-500 italic">{ex.meaning}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                <p className="text-sm text-amber-800">💡 <strong>Tips:</strong> Gunakan fitur Text-to-Speech di browser atau aplikasi seperti Forvo untuk mendengar pengucapan penutur asli dari berbagai aksen.</p>
              </div>
            </div>
          );

          if (tabId === 'practice') return (
            <div className="p-4 animate-fade-in">
              <div className="max-w-xl mx-auto">
                {!showResult ? (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase">Soal {quizStep+1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full">Skor: {quizScore}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5">
                      <div className="h-1.5 rounded-full bg-purple-600 transition-all" style={{width: ((quizStep/QUIZ.length)*100)+'%'}}></div>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-5">{QUIZ[quizStep].q}</h3>
                    <div className="space-y-2">
                      {QUIZ[quizStep].opts.map((opt, i) => {
                        let cls = 'border-slate-200 hover:border-purple-300 hover:bg-purple-50';
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
                          <strong>{selectedOption === QUIZ[quizStep].ans ? '✅ Tepat!' : '❌ Belum tepat.'}</strong> {QUIZ[quizStep].exp}
                        </div>
                        <button onClick={nextQuestion} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
                          {quizStep < QUIZ.length-1 ? 'Lanjut →' : 'Lihat Skor'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Kuis Selesai!</h2>
                    <p className="text-slate-500 mb-2">Skor: <strong className="text-purple-600 text-2xl">{quizScore}</strong> / {QUIZ.length}</p>
                    <p className="text-sm text-slate-400 mb-8">{quizScore >= 16 ? '🎯 Excellent B2 Pronunciation!' : quizScore >= 10 ? '👍 Good job!' : '💪 Review lagi dan coba!'}</p>
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold" style={{backgroundColor:'#7D3C98'}}>Ulangi</button>
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

export default UpperInterPronLesson2;
