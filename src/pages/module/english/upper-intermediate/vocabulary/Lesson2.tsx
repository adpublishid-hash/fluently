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
    "word": "Liquidate",
    "ipa": "/ˈlɪkwɪdeɪt/",
    "meaning": "Melikuidasi – menjual aset untuk membayar hutang. Contoh: The company had to **liquidate** its assets after declaring bankruptcy."
  },
  {
    "word": "Portfolio",
    "ipa": "/pɔːtˈfəʊliəʊ/",
    "meaning": "Portofolio – kumpulan investasi atau proyek. Contoh: She manages a diverse **portfolio** of assets worth over $10 million."
  },
  {
    "word": "Stakeholder",
    "ipa": "/ˈsteɪkhəʊldə/",
    "meaning": "Pemangku kepentingan – semua pihak yang berkepentingan. Contoh: All **stakeholders** were consulted before the merger was finalised."
  },
  {
    "word": "Dividend",
    "ipa": "/ˈdɪvɪdend/",
    "meaning": "Dividen – bagian keuntungan yang dibagikan ke pemegang saham. Contoh: The company announced a record **dividend** payment this quarter."
  },
  {
    "word": "Leverage",
    "ipa": "/ˈliːvərɪdʒ/",
    "meaning": "Leverage – menggunakan modal pinjaman untuk memperbesar keuntungan. Contoh: The firm used significant **leverage** to fund its ambitious expansion."
  },
  {
    "word": "Venture capital",
    "ipa": "/ˈventʃə ˈkæpɪtəl/",
    "meaning": "Modal ventura – investasi berisiko tinggi di perusahaan rintisan. Contoh: The startup secured **venture capital** funding to scale its operations globally."
  },
  {
    "word": "Fiscal policy",
    "ipa": "/ˈfɪskəl ˈpɒlɪsi/",
    "meaning": "Kebijakan fiskal – penggunaan pajak dan belanja pemerintah. Contoh: The government tightened its **fiscal policy** in response to rising inflation."
  },
  {
    "word": "Recession",
    "ipa": "/rɪˈseʃən/",
    "meaning": "Resesi – penurunan aktivitas ekonomi yang berkelanjutan. Contoh: The economy entered its deepest **recession** in over two decades."
  },
  {
    "word": "Monetary",
    "ipa": "/ˈmɒnɪtri/",
    "meaning": "Moneter – berkaitan dengan uang dan keuangan. Contoh: The central bank implemented expansionary **monetary** policy to stimulate growth."
  },
  {
    "word": "Acquisition",
    "ipa": "/ˌækwɪˈzɪʃən/",
    "meaning": "Akuisisi – pengambilalihan perusahaan lain. Contoh: The tech giant announced the **acquisition** of its main competitor for $5 billion."
  }
];
const CAT2: VocabItem[] = [
  {
    "word": "Negotiate",
    "ipa": "/nɪˈɡoʊʃieɪt/",
    "meaning": "Bernegosiasi untuk mencapai kesepakatan"
  },
  {
    "word": "Mitigate",
    "ipa": "/ˈmɪtɪɡeɪt/",
    "meaning": "Mengurangi dampak negatif / risiko"
  },
  {
    "word": "Acquire",
    "ipa": "/əˈkwaɪər/",
    "meaning": "Mengakuisisi – membeli perusahaan lain"
  },
  {
    "word": "Allocate",
    "ipa": "/ˈæləkeɪt/",
    "meaning": "Mengalokasikan dana/sumber daya"
  },
  {
    "word": "Diversify",
    "ipa": "/daɪˈvɜːrsɪfaɪ/",
    "meaning": "Mendiversifikasi – memperluas ke berbagai area"
  },
  {
    "word": "Forecast",
    "ipa": "/ˈfɔːrkæst/",
    "meaning": "Memperkirakan hasil di masa depan"
  },
  {
    "word": "Outsource",
    "ipa": "/ˈaʊtsɔːrs/",
    "meaning": "Menggunakan pihak ketiga untuk pekerjaan tertentu"
  },
  {
    "word": "Streamline",
    "ipa": "/ˈstriːmlaɪn/",
    "meaning": "Memperlancar / mengefisienkan proses"
  },
  {
    "word": "Leverage",
    "ipa": "/ˈlevərɪdʒ/",
    "meaning": "Memanfaatkan aset/posisi untuk keuntungan"
  },
  {
    "word": "Restructure",
    "ipa": "/riːˈstrʌktʃər/",
    "meaning": "Merestrukturisasi organisasi atau utang"
  }
];
const CAT3: VocabItem[] = [
  {
    "word": "Bottom line",
    "ipa": "/ˈbɒtəm laɪn/",
    "meaning": "Laba bersih / kesimpulan akhir"
  },
  {
    "word": "Blue-chip company",
    "ipa": "/bluː tʃɪp ˈkʌmpəni/",
    "meaning": "Perusahaan besar dan terpercaya"
  },
  {
    "word": "Cash flow",
    "ipa": "/kæʃ floʊ/",
    "meaning": "Arus kas – pergerakan uang masuk dan keluar"
  },
  {
    "word": "Break even",
    "ipa": "/breɪk ˈiːvən/",
    "meaning": "Impas – tidak untung tidak rugi"
  },
  {
    "word": "Return on investment",
    "ipa": "/rɪˈtɜːn ɒn ɪnˈvestmənt/",
    "meaning": "Keuntungan dari modal yang diinvestasikan (ROI)"
  },
  {
    "word": "Market share",
    "ipa": "/ˈmɑːrkɪt ʃeər/",
    "meaning": "Pangsa pasar – persentase penjualan di pasar"
  },
  {
    "word": "Supply chain",
    "ipa": "/səˈplaɪ tʃeɪn/",
    "meaning": "Rantai pasok – alur produksi hingga konsumen"
  },
  {
    "word": "Due diligence",
    "ipa": "/djuː ˈdɪlɪdʒəns/",
    "meaning": "Uji tuntas – riset menyeluruh sebelum transaksi"
  },
  {
    "word": "Stakeholder",
    "ipa": "/ˈsteɪkhoʊldər/",
    "meaning": "Pemangku kepentingan (pemegang saham, karyawan, dll)"
  },
  {
    "word": "Fiscal year",
    "ipa": "/ˈfɪskəl jɪər/",
    "meaning": "Tahun fiskal – periode akuntansi resmi perusahaan"
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "The total income generated by a company is called its ___",
    "opts": [
      "Deficit",
      "Dividend",
      "Equity",
      "Revenue"
    ],
    "ans": "Revenue",
    "exp": "Revenue adalah total pendapatan yang diperoleh perusahaan dari aktivitas bisnisnya."
  },
  {
    "q": "When a company spends more than it earns, it runs a ___",
    "opts": [
      "Deficit",
      "Commodity",
      "Portfolio",
      "Dividend"
    ],
    "ans": "Deficit",
    "exp": "Deficit terjadi ketika pengeluaran melebihi pendapatan, menghasilkan kekurangan dana."
  },
  {
    "q": "To ___ risks means to take actions to reduce their potential impact.",
    "opts": [
      "Acquire",
      "Mitigate",
      "Leverage",
      "Outsource"
    ],
    "ans": "Mitigate",
    "exp": "To mitigate risk berarti mengambil langkah-langkah untuk mengurangi kemungkinan atau dampak risiko."
  },
  {
    "q": "The ___ refers to the net profit - the final number on a financial statement.",
    "opts": [
      "Blue-chip",
      "Bottom line",
      "Cash flow",
      "Market share"
    ],
    "ans": "Bottom line",
    "exp": "\"Bottom line\" secara literal adalah baris terakhir laporan keuangan yang menunjukkan laba/rugi bersih."
  },
  {
    "q": "Companies ___ their investments to spread risk across different assets.",
    "opts": [
      "Restructure",
      "Forecast",
      "Allocate",
      "Diversify"
    ],
    "ans": "Diversify",
    "exp": "To diversify berarti menyebar investasi ke berbagai jenis aset untuk mengurangi risiko."
  },
  {
    "q": "The point where income equals expenses is called ___",
    "opts": [
      "Due diligence",
      "Fiscal year",
      "Supply chain",
      "Break even"
    ],
    "ans": "Break even",
    "exp": "Break even adalah titik impas di mana pendapatan sama persis dengan pengeluaran."
  },
  {
    "q": "All the parties with an interest in a company are called ___",
    "opts": [
      "Dividends",
      "Liabilities",
      "Stakeholders",
      "Commodities"
    ],
    "ans": "Stakeholders",
    "exp": "Stakeholders mencakup semua pihak yang memiliki kepentingan: pemegang saham, karyawan, pelanggan, pemerintah."
  },
  {
    "q": "Thorough research conducted before a business deal is called ___",
    "opts": [
      "ROI",
      "Due diligence",
      "Leverage",
      "Cash flow"
    ],
    "ans": "Due diligence",
    "exp": "Due diligence adalah proses investigasi menyeluruh sebelum penandatanganan kontrak atau akuisisi."
  },
  {
    "q": "The ___ of a company refers to the chain from raw materials to the final customer.",
    "opts": [
      "Portfolio",
      "Market share",
      "Fiscal year",
      "Supply chain"
    ],
    "ans": "Supply chain",
    "exp": "Supply chain mencakup semua proses dari produksi bahan baku hingga pengiriman ke konsumen akhir."
  },
  {
    "q": "To ___ a business function means to hire an external company to do that work.",
    "opts": [
      "Outsource",
      "Acquire",
      "Negotiate",
      "Streamline"
    ],
    "ans": "Outsource",
    "exp": "Outsourcing berarti mempekerjakan pihak ketiga untuk melakukan pekerjaan tertentu demi efisiensi biaya."
  },
  {
    "q": "The money flowing in and out of a business is called ___",
    "opts": [
      "Cash flow",
      "Blue-chip",
      "Dividend",
      "Equity"
    ],
    "ans": "Cash flow",
    "exp": "Cash flow (arus kas) adalah ukuran pergerakan uang masuk dan keluar dari sebuah bisnis."
  },
  {
    "q": "To ___ means to formally buy another company.",
    "opts": [
      "Mitigate",
      "Forecast",
      "Leverage",
      "Acquire"
    ],
    "ans": "Acquire",
    "exp": "To acquire berarti mengambil alih kepemilikan perusahaan lain melalui pembelian."
  },
  {
    "q": "A company's percentage of total industry sales is its ___",
    "opts": [
      "Equity",
      "ROI",
      "Inflation",
      "Market share"
    ],
    "ans": "Market share",
    "exp": "Market share adalah persentase penjualan perusahaan dibandingkan total penjualan industri."
  },
  {
    "q": "Raw materials like oil, gold, and wheat are called ___",
    "opts": [
      "Commodities",
      "Liabilities",
      "Dividends",
      "Interest rates"
    ],
    "ans": "Commodities",
    "exp": "Commodities adalah barang komoditas primer yang diperdagangkan di pasar internasional."
  },
  {
    "q": "A company's official accounting period is called its ___",
    "opts": [
      "Fiscal year",
      "Deficit",
      "Equity",
      "Portfolio"
    ],
    "ans": "Fiscal year",
    "exp": "Fiscal year adalah periode akuntansi resmi (12 bulan) yang tidak selalu sama dengan tahun kalender."
  },
  {
    "q": "To ___ a process means to make it more efficient and less complicated.",
    "opts": [
      "Forecast",
      "Streamline",
      "Allocate",
      "Restructure"
    ],
    "ans": "Streamline",
    "exp": "To streamline berarti menyederhanakan dan mengefisienkan proses sehingga lebih cepat dan murah."
  },
  {
    "q": "The debts and financial obligations of a company are called its ___",
    "opts": [
      "Liabilities",
      "Dividends",
      "Revenues",
      "Equities"
    ],
    "ans": "Liabilities",
    "exp": "Liabilities adalah semua kewajiban finansial perusahaan, termasuk utang dan pinjaman."
  },
  {
    "q": "The profit earned for every dollar invested is called ___",
    "opts": [
      "Return on investment",
      "Cash flow",
      "Market share",
      "Break even"
    ],
    "ans": "Return on investment",
    "exp": "ROI (Return on Investment) mengukur profitabilitas relatif dari setiap modal yang diinvestasikan."
  },
  {
    "q": "A ___ company is a large, well-known company with a strong financial history.",
    "opts": [
      "Blue-chip",
      "Supply chain",
      "Stakeholder",
      "Bottom-line"
    ],
    "ans": "Blue-chip",
    "exp": "Blue-chip company adalah perusahaan besar, mapan, dan terpercaya yang memiliki rekam jejak finansial kuat."
  },
  {
    "q": "Money paid to shareholders from company profits are called ___",
    "opts": [
      "Commodities",
      "Revenue",
      "Equity",
      "Dividends"
    ],
    "ans": "Dividends",
    "exp": "Dividends adalah pembayaran dari keuntungan perusahaan kepada para pemegang saham."
  }
];

const UpperInterVocabLesson2: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', 2);
  const nextLessonPath = '/modul/english/upper-intermediate/vocabulary/lesson-3';

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
  const LABELS = { cat1: 'Financial Terms', cat2: 'Business Actions', cat3: 'Business Phrases' };
  const DESCS = { cat1: 'Istilah keuangan penting di dunia bisnis.', cat2: 'Kata kerja konteks bisnis formal.', cat3: 'Frasa formal dalam konteks bisnis internasional.' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Vocabulary Lesson 2"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Business & Finance"
        subtitle="Vocabulary B2 • Pelajaran 2"
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
                <h2 className="text-xl font-extrabold mb-1">Business & Finance</h2>
                <p className="text-sm opacity-90">Bahasa Inggris Bisnis & Keuangan</p>
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

export default UpperInterVocabLesson2;
