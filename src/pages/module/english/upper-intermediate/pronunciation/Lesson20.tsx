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
    "word": "Review: Word Stress",
    "ipa": "Lessons 1, 4, 10, 11",
    "meaning": "Latih: ekonomi keluarga kata (economy/economic/economically) & compound nouns (BLACKbird vs black BIRD)"
  },
  {
    "word": "Review: Weak Forms",
    "ipa": "Lesson 2",
    "meaning": "Latih: of/to/for/and + schwa (Lesson 5) dalam kalimat yang sama"
  },
  {
    "word": "Review: Intonation",
    "ipa": "Lessons 3, 12, 15",
    "meaning": "Latih: Y/N? ↗ | Wh? ↘ | Complex sentences | Hedging fall-rise ↘↗"
  },
  {
    "word": "Review: Connected Speech",
    "ipa": "Lessons 7, 8",
    "meaning": "Latih: linking sounds + rhythm & stress-timing dalam teks akademik"
  },
  {
    "word": "Review: Vowels",
    "ipa": "Lessons 5, 13",
    "meaning": "Latih: schwa di semua suku tak bertekanan + minimal pairs (bit/beat, bad/bed, etc.)"
  },
  {
    "word": "Review: Consonants",
    "ipa": "Lessons 6, 14",
    "meaning": "Latih: cluster /str-, -ngths/ + voiced/unvoiced pairs (/θ/ vs /ð/, /s/ vs /z/)"
  },
  {
    "word": "Review: -ed endings",
    "ipa": "Lesson 17",
    "meaning": "Latih: /t/ vs /d/ vs /ɪd/ dalam teks yang mengandung banyak kata lampau"
  },
  {
    "word": "Review: Academic vocab",
    "ipa": "Lesson 19",
    "meaning": "Latih: paradigm, hypothesis, algorithm, liaison, genre, phenomena"
  },
  {
    "word": "Self-assessment criteria",
    "ipa": "Checklist B2",
    "meaning": "Nilai diri: stress accuracy | schwa | connected speech | intonation | consonant clarity"
  },
  {
    "word": "Recording practice",
    "ipa": "2-minute academic talk",
    "meaning": "Rekam diri berbicara selama 2 menit tentang topik akademik, lalu evaluasi 9 kriteria"
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "Why is mastering Pronunciation Review & Self-Assessment important at B2 level?",
    "opts": [
      "It is not important",
      "It helps you sound natural and be easily understood",
      "It only matters for writing",
      "It is only for advanced learners"
    ],
    "ans": "It helps you sound natural and be easily understood",
    "exp": "Menguasai Pronunciation Review & Self-Assessment di level B2 membuat Anda terdengar lebih alami dan mudah dipahami oleh penutur asli."
  },
  {
    "q": "What does \"IPA\" stand for in pronunciation?",
    "opts": [
      "International Phonetic Alphabet",
      "Internal Pronunciation Aid",
      "Important Phonics Assessment",
      "International Pronunciation Application"
    ],
    "ans": "International Phonetic Alphabet",
    "exp": "IPA (International Phonetic Alphabet) adalah sistem simbol standar untuk merepresentasikan bunyi bahasa."
  },
  {
    "q": "The best way to improve pronunciation is to ___",
    "opts": [
      "Only read textbooks",
      "Listen to and mimic native speakers' natural speech",
      "Memorize all phonetic rules",
      "Speak only in your first language"
    ],
    "ans": "Listen to and mimic native speakers' natural speech",
    "exp": "Mendengarkan dan meniru penutur asli (shadowing) adalah teknik paling efektif untuk pronunciation."
  },
  {
    "q": "A \"minimal pair\" is ___",
    "opts": [
      "Two words with identical pronunciation",
      "Two words that differ by only one sound",
      "Two words with the same spelling",
      "Two words from the same word family"
    ],
    "ans": "Two words that differ by only one sound",
    "exp": "Contoh minimal pair: ship/sheep, bad/bed, cat/cut – hanya satu bunyi yang berbeda."
  },
  {
    "q": "In English, stress usually falls on ___",
    "opts": [
      "The last syllable always",
      "Content words (nouns, verbs, adjectives)",
      "Only prepositions and articles",
      "Every third word"
    ],
    "ans": "Content words (nouns, verbs, adjectives)",
    "exp": "Dalam kalimat, kata konten (noun, verb, adjective, adverb) biasanya mendapat tekanan lebih kuat."
  },
  {
    "q": "Rising intonation at the end of a sentence typically signals ___",
    "opts": [
      "A statement of fact",
      "A yes/no question or uncertainty",
      "A completed thought",
      "An exclamation"
    ],
    "ans": "A yes/no question or uncertainty",
    "exp": "Intonasi naik di akhir kalimat umumnya menandakan pertanyaan yes/no atau ekspresi ketidakpastian."
  },
  {
    "q": "The schwa sound /ə/ is ___",
    "opts": [
      "The loudest vowel sound",
      "The most common unstressed vowel in English",
      "Found only in stressed syllables",
      "Never found in connected speech"
    ],
    "ans": "The most common unstressed vowel in English",
    "exp": "Schwa /ə/ adalah suara paling umum dalam bahasa Inggris, selalu muncul dalam suku kata tidak bertekanan."
  },
  {
    "q": "Which tool helps you check the pronunciation of an unfamiliar word?",
    "opts": [
      "A grammar book",
      "A phonetic dictionary with IPA",
      "A synonym finder",
      "A spell checker"
    ],
    "ans": "A phonetic dictionary with IPA",
    "exp": "Kamus fonetik dengan tulisan IPA (seperti Cambridge Dictionary online) membantu verifikasi pengucapan."
  },
  {
    "q": "Recording yourself practice is useful because ___",
    "opts": [
      "It is entertaining only",
      "You can identify errors you cannot hear when speaking",
      "It replaces teacher feedback completely",
      "It is required for B2 certification"
    ],
    "ans": "You can identify errors you cannot hear when speaking",
    "exp": "Merekam dan mendengarkan kembali bicara Anda membantu mendeteksi kesalahan yang tidak terasa saat berbicara."
  },
  {
    "q": "Which element of speech makes English sound natural and rhythmic?",
    "opts": [
      "Syllable counting",
      "Stress-timed rhythm (stressed syllables at regular intervals)",
      "Speaking very slowly",
      "Pronouncing every syllable equally"
    ],
    "ans": "Stress-timed rhythm (stressed syllables at regular intervals)",
    "exp": "English adalah bahasa stress-timed: suku kata bertekanan muncul pada interval yang relatif teratur."
  },
  {
    "q": "Which sound is a voiced fricative?",
    "opts": [
      "/p/",
      "/t/",
      "/v/",
      "/k/"
    ],
    "ans": "/v/",
    "exp": "/v/ adalah konsonan frikatif bersuara. Pasangannya yang tidak bersuara adalah /f/."
  },
  {
    "q": "In \"butter\", the \"t\" in American English is often pronounced as ___",
    "opts": [
      "/t/ (full stop)",
      "/d/ (flapped)",
      "/θ/ (th sound)",
      "/r/ (rhotic)"
    ],
    "ans": "/d/ (flapped)",
    "exp": "Dalam American English, /t/ di antara dua vokal sering diucapkan sebagai flap /d/: \"butter\" → \"budder\"."
  },
  {
    "q": "The word \"beautiful\" has how many syllables?",
    "opts": [
      "2",
      "3",
      "4",
      "5"
    ],
    "ans": "3",
    "exp": "\"Beautiful\" = beau-ti-ful = 3 suku kata, dengan tekanan pada BEAUtiful."
  },
  {
    "q": "Which is a correct IPA transcription for \"thought\"?",
    "opts": [
      "/θɒt/",
      "/θaʊt/",
      "/ðɒt/",
      "/θuːt/"
    ],
    "ans": "/θɒt/",
    "exp": "\"Thought\" = /θɒt/ – pengucapan dengan /θ/ (tidak bersuara) dan vokal pendek /ɒ/."
  },
  {
    "q": "The difference between /iː/ (sheep) and /ɪ/ (ship) is ___",
    "opts": [
      "Consonant type",
      "Vowel length and position",
      "Stress placement",
      "Number of syllables"
    ],
    "ans": "Vowel length and position",
    "exp": "/iː/ adalah vowel panjang, /ɪ/ adalah vowel pendek. Lidah lebih tinggi untuk /iː/ daripada /ɪ/."
  },
  {
    "q": "Falling intonation in English typically indicates ___",
    "opts": [
      "A question needing a yes/no answer",
      "Uncertainty",
      "A completed statement or an information question (WH)",
      "Agreement"
    ],
    "ans": "A completed statement or an information question (WH)",
    "exp": "Intonasi turun biasanya menandakan kalimat berita yang selesai atau pertanyaan information (wh-question)."
  },
  {
    "q": "Which word has a SILENT consonant?",
    "opts": [
      "Garden",
      "Know",
      "Speak",
      "Table"
    ],
    "ans": "Know",
    "exp": "\"Know\" /noʊ/ – huruf \"k\" tidak diucapkan. Pola /kn-/ di awal kata selalu hanya /n/ dalam bahasa Inggris modern."
  },
  {
    "q": "B2 pronunciation competence means you can ___",
    "opts": [
      "Speak with a perfect native accent",
      "Speak clearly enough to be consistently understood with occasional errors",
      "Never make pronunciation mistakes",
      "Only speak slowly and carefully"
    ],
    "ans": "Speak clearly enough to be consistently understood with occasional errors",
    "exp": "CEFR B2: dapat berbicara dengan jelas dan konsisten dipahami, meski dengan sedikit aksen."
  },
  {
    "q": "What is \"shadowing\" in language learning?",
    "opts": [
      "Repeating word lists",
      "Speaking simultaneously with or immediately after a recording",
      "Writing pronunciation notes",
      "Reading texts aloud slowly"
    ],
    "ans": "Speaking simultaneously with or immediately after a recording",
    "exp": "Shadowing adalah teknik di mana Anda mengikuti/meniru speaker secara langsung untuk melatih pronunciation dan ritme."
  },
  {
    "q": "To make /θ/ (as in \"think\"), you place your tongue ___",
    "opts": [
      "Behind your upper teeth",
      "Between or behind your teeth with air flowing over it",
      "At the roof of your mouth",
      "Against your lower teeth"
    ],
    "ans": "Between or behind your teeth with air flowing over it",
    "exp": "/θ/ dibuat dengan meletakkan lidah di atau di belakang gigi atas, memungkinkan udara mengalir – bunyi \"th\" tidak bersuara."
  }
];
const POINTS: string[] = [
  "**Checklist Penilaian Diri B2:** (1) Tekanan kata ✓ (2) Weak forms/schwa ✓ (3) Connected speech ✓ (4) Intonasi bervariasi ✓ (5) Vokal dibedakan ✓ (6) Konsonan jelas ✓ (7) Akhiran -ed benar ✓ (8) Kata akademik tepat ✓ (9) Ritme alami ✓",
  "**Strategi peningkatan:** Fokus pada SATU area setiap minggu. Jangan mencoba memperbaiki semua sekaligus. Rekam dan dengarkan progres Anda.",
  "**Latihan terbaik:** Shadowing – mendengarkan penutur asli dan langsung meniru, termasuk kecepatan, intonasi, dan ritme. Ini lebih efektif dari belajar aturan saja.",
  "**Ukur kemajuan:** Rekam suara Anda membaca teks akademik 3 bulan yang lalu dan sekarang. Perubahan yang terdengar adalah bukti kemajuan.",
  "**Target B2 pronunciation:** Bukan meniru penutur asli sepenuhnya, tetapi diucapkan dengan cukup jelas sehingga penutur asli BERBAGAI aksen dapat memahami Anda dengan mudah.",
  "**Selamat!** Anda telah menyelesaikan seluruh 20 lesson Pronunciation Upper-Intermediate. Terus berlatih dan ingat: pronunciation terbaik datang dari listening yang banyak dan praktik yang konsisten."
];

const UpperInterPronLesson20: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_pronunciation', 20);
  const nextLessonPath = '/modul/english/upper-intermediate/pronunciation';

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
        lessonLabel="Upper-Intermediate Pronunciation Lesson 20"
        accentColor="#7D3C98"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Pronunciation Review & Self-Assessment"
        subtitle="Pronunciation B2 • Pelajaran 20"
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
                <h2 className="text-xl font-extrabold mb-1">Pronunciation Review & Self-Assessment</h2>
                <p className="text-sm opacity-90">Pronunciation Review & Self-Assessment</p>
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

export default UpperInterPronLesson20;
