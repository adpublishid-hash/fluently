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
    "word": "PHOtograph",
    "ipa": "/ˈfəʊtəɡrɑːf/",
    "meaning": "Foto – tekanan pada suku PERTAMA (noun)"
  },
  {
    "word": "phoTOGraphy",
    "ipa": "/fəˈtɒɡrəfi/",
    "meaning": "Fotografi – tekanan pada suku KEDUA (sebelum -y)"
  },
  {
    "word": "photoGRAPHic",
    "ipa": "/ˌfəʊtəˈɡræfɪk/",
    "meaning": "Fotografis – tekanan pada suku KETIGA (sebelum -ic)"
  },
  {
    "word": "ECOnomy",
    "ipa": "/ɪˈkɒnəmi/",
    "meaning": "Ekonomi – tekanan suku kedua"
  },
  {
    "word": "ecoNOMic",
    "ipa": "/ˌiːkəˈnɒmɪk/",
    "meaning": "Ekonomik – tekanan geser ke suku tiga"
  },
  {
    "word": "econoMIcally",
    "ipa": "/ˌiːkəˈnɒmɪkli/",
    "meaning": "Secara ekonomis – tekanan tetap di posisi sama"
  },
  {
    "word": "COMplex (n/adj)",
    "ipa": "/ˈkɒmpleks/",
    "meaning": "Kompleks (kata benda/sifat) – tekanan suku PERTAMA"
  },
  {
    "word": "comPLEX (v)",
    "ipa": "/kəmˈpleks/",
    "meaning": "Mengkomplekskan (kata kerja) – tekanan suku KEDUA"
  },
  {
    "word": "SYNthesis",
    "ipa": "/ˈsɪnθɪsɪs/",
    "meaning": "Sintesis – tekanan suku pertama"
  },
  {
    "word": "synTHEtic",
    "ipa": "/sɪnˈθetɪk/",
    "meaning": "Sintetis – tekanan geser ke suku dua (-ic rule)"
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "In the word \"photography\", which syllable is stressed?",
    "opts": [
      "pho-to-GRA-phy",
      "pho-TO-gra-phy",
      "PHO-to-gra-phy",
      "pho-to-gra-PHY"
    ],
    "ans": "pho-TO-gra-phy",
    "exp": "\"Photography\" → phOtography. Akhiran -phy mengikuti pola tekanan pada suku ketiga dari belakang."
  },
  {
    "q": "The word \"REBEL\" (noun) vs \"reBEL\" (verb) demonstrates ___",
    "opts": [
      "Stress shift between noun and verb forms",
      "Change in meaning only",
      "Different number of syllables",
      "Different spelling"
    ],
    "ans": "Stress shift between noun and verb forms",
    "exp": "Banyak kata 2 suku berubah tekanan tergantung kata benda (suku 1) atau kata kerja (suku 2)."
  },
  {
    "q": "Where is the stress in \"communication\"?",
    "opts": [
      "com-MU-ni-ca-tion",
      "com-mu-NI-ca-tion",
      "com-mu-ni-CA-tion",
      "COM-mu-ni-ca-tion"
    ],
    "ans": "com-mu-NI-ca-tion",
    "exp": "\"Communication\" → comMUNication. Akhiran -tion diikuti tekanan pada suku sebelumnya."
  },
  {
    "q": "Which pair shows CORRECT stress shift?",
    "opts": [
      "inCREASE (noun) / INcrease (verb)",
      "inCREASE (noun) / inCREASE (verb)",
      "INcrease (noun) / INcrease (verb)",
      "INcrease (noun) / inCREASE (verb)"
    ],
    "ans": "INcrease (noun) / inCREASE (verb)",
    "exp": "INcrease (noun: kenaikan) / inCREASE (verb: meningkat) → stress shift pada 2-syllable words."
  },
  {
    "q": "The suffix \"-ic\" (as in \"economic\") shifts stress to ___",
    "opts": [
      "Two syllables before -ic",
      "The first syllable always",
      "The syllable directly before -ic",
      "The last syllable"
    ],
    "ans": "The syllable directly before -ic",
    "exp": "Akhiran \"-ic\" menarik tekanan ke suku kata tepat sebelumnya: ecoNOmic, photoGRAPHic."
  },
  {
    "q": "How many syllables does \"university\" have?",
    "opts": [
      "6",
      "5",
      "4",
      "3"
    ],
    "ans": "5",
    "exp": "u-ni-VER-si-ty = 5 suku kata, dengan tekanan utama pada suku ketiga (VER)."
  },
  {
    "q": "In \"photograph\" vs \"photography\", the stress ___",
    "opts": [
      "Shifts from syllable 1 to syllable 2",
      "Stays on the same syllable",
      "Disappears entirely",
      "Shifts from syllable 2 to syllable 1"
    ],
    "ans": "Shifts from syllable 1 to syllable 2",
    "exp": "PHOtograph (suku 1) → phoTOgraphy (suku 2). Akhiran -y menggeser tekanan."
  },
  {
    "q": "Which word has stress on the FINAL syllable?",
    "opts": [
      "Compress (verb)",
      "Interesting",
      "Beautiful",
      "Yesterday"
    ],
    "ans": "Compress (verb)",
    "exp": "comPRESS – kata kerja 2 suku biasanya ditekan pada suku kedua (terakhir)."
  },
  {
    "q": "The word \"analyze\" has stress on ___",
    "opts": [
      "AN-a-lyze",
      "an-AL-yze",
      "a-NA-lyze",
      "an-a-LYZE"
    ],
    "ans": "AN-a-lyze",
    "exp": "ANalyze – akhiran -ize: tekanan pada suku KETIGA dari belakang (AN-a-lyze)."
  },
  {
    "q": "Incorrect word stress will most likely cause ___",
    "opts": [
      "Grammar mistakes",
      "Difficulty being understood",
      "Spelling errors",
      "Vocabulary gaps"
    ],
    "ans": "Difficulty being understood",
    "exp": "Tekanan kata yang salah dapat membuat penutur asli sulit memahami ucapan Anda."
  },
  {
    "q": "\"Technology\" is stressed on which syllable?",
    "opts": [
      "TECH-no-lo-gy",
      "tech-no-LO-gy",
      "tech-NO-lo-gy",
      "tech-no-lo-GY"
    ],
    "ans": "tech-NO-lo-gy",
    "exp": "techNOlogy – akhiran -ogy mengikuti pola tekanan pada suku ketiga dari belakang."
  },
  {
    "q": "Which suffixes attract stress to the syllable DIRECTLY BEFORE them?",
    "opts": [
      "-ing, -er, -ed",
      "-ful, -less, -ness",
      "-able, -ible, -al",
      "-tion, -sion, -ic"
    ],
    "ans": "-tion, -sion, -ic",
    "exp": "Akhiran -tion, -sion, -ic secara konsisten menarik tekanan ke suku tepat sebelum mereka."
  },
  {
    "q": "In \"PERMIT\" (noun) vs \"perMIT\" (verb), meaning is ___",
    "opts": [
      "Unclear",
      "The same",
      "Slightly different",
      "Completely different"
    ],
    "ans": "Completely different",
    "exp": "PERMIT = izin (kata benda); perMIT = mengizinkan (kata kerja) – maknanya berbeda sesuai fungsi."
  },
  {
    "q": "Which word is stressed correctly as \"ADvertise\"?",
    "opts": [
      "AD-ver-tise",
      "ad-VER-tise",
      "AD-VER-tise",
      "ad-ver-TISE"
    ],
    "ans": "AD-ver-tise",
    "exp": "ADvertise – akhiran -ise (dalam kata 3 suku) ditekan pada suku pertama."
  },
  {
    "q": "Compound nouns usually have stress on ___",
    "opts": [
      "Both parts equally",
      "The second part",
      "The final syllable",
      "The first part"
    ],
    "ans": "The first part",
    "exp": "Kata benda gabungan (compound noun): BLACKboard, AIRport – tekanan pada bagian pertama."
  },
  {
    "q": "\"Academic\" has its stress on which syllable?",
    "opts": [
      "AC-a-dem-ic",
      "ac-a-dem-IC",
      "ac-a-DEM-ic",
      "ac-A-dem-ic"
    ],
    "ans": "ac-a-DEM-ic",
    "exp": "acaDEMic – akhiran -ic menarik tekanan ke suku tepat sebelumnya: acaDEMic."
  },
  {
    "q": "Where is stress in \"OBject\" vs \"obJECT\"?",
    "opts": [
      "Both on first syllable",
      "OBject=noun, obJECT=verb",
      "OBject=verb, obJECT=noun",
      "Both on second syllable"
    ],
    "ans": "OBject=noun, obJECT=verb",
    "exp": "OBject (keberatan/benda, noun/disuse) vs obJECT (menolak, verb) – classic stress shift."
  },
  {
    "q": "Which sentence demonstrates CORRECT stress use?",
    "opts": [
      "He gave me a PERmit to enter.",
      "She wants to REbel against the rules.",
      "The conFLICT caused many problems.",
      "They need to adVANce quickly."
    ],
    "ans": "He gave me a PERmit to enter.",
    "exp": "PERmit (noun, suku 1). REbel sebagai verb harus reBEL; adVANce memang benar. conFLICT bisa noun atau verb."
  },
  {
    "q": "In \"information\", where is the primary stress?",
    "opts": [
      "in-for-MA-tion",
      "in-FOR-ma-tion",
      "IN-for-ma-tion",
      "in-for-ma-TION"
    ],
    "ans": "in-for-MA-tion",
    "exp": "inforMAtion – akhiran -tion menarik tekanan ke suku tepat sebelumnya: inforMAtion."
  },
  {
    "q": "Which is NOT a rule for English word stress?",
    "opts": [
      "All words end in stressed syllables",
      "Nouns of 2 syllables often stress syllable 1",
      "Verbs of 2 syllables often stress syllable 2",
      "-tion suffixes attract stress before them"
    ],
    "ans": "All words end in stressed syllables",
    "exp": "Tidak ada aturan bahwa semua kata berakhir dengan suku tertekan – ini bukan pola umum bahasa Inggris."
  }
];
const POINTS: string[] = [
  "**Prinsip Dasar:** Word stress bersifat tetap dan mempengaruhi makna. Kata yang sama bisa berganti makna saat stressnya berubah.",
  "**Noun/Adjective vs Verb:** Banyak kata 2 suku dapat berubah stress: **RE**cord (n) → re**CORD** (v) | **PRE**sent (n) → pre**SENT** (v)",
  "**Aturan Akhiran -tion, -sion, -ic, -ical:** Tekanan selalu tepat SEBELUM akhiran: commu**NI**cation | eco**NO**mic | his**TOR**ical",
  "**Akhiran -ity, -ogy, -ography:** Tekanan dua suku sebelum akhiran: **na**tion**AL**ity (no – na**TION**ality) | bi**OL**ogy | pho**TOG**raphy",
  "**Akhiran -ate, -ize, -fy (3+ suku):** Tekanan tiga suku dari akhir: **AP**preciate | **OR**ganize | **CLAR**ify",
  "**Word families – stress bergeser:** Berlatih keluarga kata: **PHO**to → pho**TO**graphy → pho**TO**grapher → pho**TO**graphic – catat pergeserannya!"
];

const UpperInterPronLesson1: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_pronunciation', 1);
  const nextLessonPath = '/modul/english/upper-intermediate/pronunciation/lesson-2';

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
        lessonLabel="Upper-Intermediate Pronunciation Lesson 1"
        accentColor="#7D3C98"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Word Stress in Multi-syllable Words"
        subtitle="Pronunciation B2 • Pelajaran 1"
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
                <h2 className="text-xl font-extrabold mb-1">Word Stress in Multi-syllable Words</h2>
                <p className="text-sm opacity-90">Tekanan Kata pada Kata Bersuku Banyak</p>
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

export default UpperInterPronLesson1;
