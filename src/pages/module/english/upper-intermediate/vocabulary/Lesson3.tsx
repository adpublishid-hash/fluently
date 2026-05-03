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
    "word": "Biodiversity",
    "ipa": "/ˌbaɪəʊdaɪˈvɜːsɪti/",
    "meaning": "Keanekaragaman hayati – variasi kehidupan di bumi. Contoh: Tropical rainforests are critical for maintaining global **biodiversity**."
  },
  {
    "word": "Emissions",
    "ipa": "/ɪˈmɪʃənz/",
    "meaning": "Emisi – pelepasan gas (terutama CO₂) ke atmosfer. Contoh: The country pledged to reduce carbon **emissions** by 45% before 2030."
  },
  {
    "word": "Renewable",
    "ipa": "/rɪˈnjuːəbəl/",
    "meaning": "Terbarukan – sumber daya yang dapat dipulihkan secara alami. Contoh: Investment in **renewable** energy has tripled over the past decade."
  },
  {
    "word": "Deforestation",
    "ipa": "/ˌdiːˌfɒrɪˈsteɪʃən/",
    "meaning": "Deforestasi – penebangan hutan secara besar-besaran. Contoh: Rampant **deforestation** in the Amazon threatens global climate stability."
  },
  {
    "word": "Carbon footprint",
    "ipa": "/ˈkɑːbən ˈfʊtprɪnt/",
    "meaning": "Jejak karbon – total emisi gas rumah kaca dari seseorang/perusahaan. Contoh: Airlines are under pressure to reduce their **carbon footprint** significantly."
  },
  {
    "word": "Ecosystem",
    "ipa": "/ˈiːkəʊsɪstəm/",
    "meaning": "Ekosistem – komunitas organisme dan lingkungannya. Contoh: Coral bleaching has devastated the ocean **ecosystem** along the Great Barrier Reef."
  },
  {
    "word": "Sustainability",
    "ipa": "/səˌsteɪnəˈbɪlɪti/",
    "meaning": "Keberlanjutan – kemampuan memenuhi kebutuhan tanpa merusak masa depan. Contoh: Corporate **sustainability** is now a key factor in investment decisions."
  },
  {
    "word": "Climate change",
    "ipa": "/ˈklaɪmɪt tʃeɪndʒ/",
    "meaning": "Perubahan iklim – perubahan jangka panjang pola cuaca global. Contoh: **Climate change** is driving more frequent and severe weather events worldwide."
  },
  {
    "word": "Mitigation",
    "ipa": "/ˌmɪtɪˈɡeɪʃən/",
    "meaning": "Mitigasi – tindakan untuk mengurangi dampak negatif. Contoh: **Mitigation** strategies include transitioning to clean energy and reforestation."
  },
  {
    "word": "Ecological",
    "ipa": "/ˌiːkəˈlɒdʒɪkəl/",
    "meaning": "Ekologis – berkaitan dengan hubungan makhluk hidup dan lingkungannya. Contoh: The oil spill caused long-lasting **ecological** damage to the coastal region."
  }
];
const CAT2: VocabItem[] = [
  {
    "word": "Conserve",
    "ipa": "/kənˈsɜːrv/",
    "meaning": "Melestarikan / menghemat sumber daya"
  },
  {
    "word": "Contaminate",
    "ipa": "/kənˈtæmɪneɪt/",
    "meaning": "Mencemari (air, tanah, udara)"
  },
  {
    "word": "Deplete",
    "ipa": "/dɪˈpliːt/",
    "meaning": "Menguras / mengurangi secara besar-besaran"
  },
  {
    "word": "Emit",
    "ipa": "/ɪˈmɪt/",
    "meaning": "Mengeluarkan / memancarkan (gas, panas)"
  },
  {
    "word": "Recycle",
    "ipa": "/ˌriːˈsaɪkəl/",
    "meaning": "Mendaur ulang bahan untuk digunakan kembali"
  },
  {
    "word": "Restore",
    "ipa": "/rɪˈstɔːr/",
    "meaning": "Memulihkan ekosistem yang rusak"
  },
  {
    "word": "Mitigate",
    "ipa": "/ˈmɪtɪɡeɪt/",
    "meaning": "Mengurangi dampak negatif lingkungan"
  },
  {
    "word": "Pollute",
    "ipa": "/pəˈluːt/",
    "meaning": "Mencemari lingkungan"
  },
  {
    "word": "Degrade",
    "ipa": "/dɪˈɡreɪd/",
    "meaning": "Menurunkan kualitas lingkungan secara bertahap"
  },
  {
    "word": "Harness",
    "ipa": "/ˈhɑːrnɪs/",
    "meaning": "Memanfaatkan (energi surya, angin, dll)"
  }
];
const CAT3: VocabItem[] = [
  {
    "word": "Sustainable development",
    "ipa": "/səˈsteɪnəbəl dɪˈveləpmənt/",
    "meaning": "Pembangunan berkelanjutan"
  },
  {
    "word": "Climate justice",
    "ipa": "/ˈklaɪmɪt ˈdʒʌstɪs/",
    "meaning": "Keadilan iklim – pembagian beban perubahan iklim yang adil"
  },
  {
    "word": "Carbon neutral",
    "ipa": "/ˈkɑːrbən ˈnjuːtrəl/",
    "meaning": "Netral karbon – tidak menambah emisi bersih"
  },
  {
    "word": "Circular economy",
    "ipa": "/ˈsɜːrkyələr ɪˈkɒnəmi/",
    "meaning": "Ekonomi sirkular – tanpa limbah, semua didaur ulang"
  },
  {
    "word": "Greenwashing",
    "ipa": "/ˈɡriːnwɒʃɪŋ/",
    "meaning": "Greenwashing – klaim ramah lingkungan yang menyesatkan"
  },
  {
    "word": "Tipping point",
    "ipa": "/ˈtɪpɪŋ pɔɪnt/",
    "meaning": "Titik kritis – ambang batas perubahan iklim yang tidak dapat dipulihkan"
  },
  {
    "word": "Net zero",
    "ipa": "/net ˈzɪəroʊ/",
    "meaning": "Net zero – target menghilangkan total emisi karbon bersih"
  },
  {
    "word": "Biodegradable",
    "ipa": "/ˌbaɪoʊdɪˈɡreɪdəbəl/",
    "meaning": "Dapat terurai secara biologis"
  },
  {
    "word": "Ecological footprint",
    "ipa": "/ˌiːkəˈlɒdʒɪkəl ˈfʊtprɪnt/",
    "meaning": "Jejak ekologis – total sumber daya alam yang dikonsumsi"
  },
  {
    "word": "Anthropogenic",
    "ipa": "/ˌænθrəpəˈdʒenɪk/",
    "meaning": "Disebabkan oleh aktivitas manusia"
  }
];
const QUIZ: QuizItem[] = [
  {
    "q": "CO2 released from your daily activities is called your ___",
    "opts": [
      "Ecosystem",
      "Carbon footprint",
      "Biodiversity",
      "Net zero"
    ],
    "ans": "Carbon footprint",
    "exp": "Carbon footprint adalah total emisi gas rumah kaca yang dihasilkan oleh aktivitas seseorang atau organisasi."
  },
  {
    "q": "To ___ the ozone layer means to reduce or use it up significantly.",
    "opts": [
      "Emit",
      "Conserve",
      "Deplete",
      "Restore"
    ],
    "ans": "Deplete",
    "exp": "To deplete berarti menguras atau mengurangi sesuatu secara signifikan, seperti lapisan ozon."
  },
  {
    "q": "Energy from sources like wind and solar that will not run out is called ___",
    "opts": [
      "Fossil fuel",
      "Greenhouse gas",
      "Renewable energy",
      "Carbon offset"
    ],
    "ans": "Renewable energy",
    "exp": "Renewable energy berasal dari sumber-sumber alam yang dapat diperbaharui dan tidak habis."
  },
  {
    "q": "A company claiming to be eco-friendly without evidence is called ___",
    "opts": [
      "Carbon neutral",
      "Greenwashing",
      "Net zero",
      "Tipping point"
    ],
    "ans": "Greenwashing",
    "exp": "Greenwashing adalah praktik menyesatkan konsumen tentang komitmen lingkungan perusahaan."
  },
  {
    "q": "The goal of having no net carbon emissions is called ___",
    "opts": [
      "Circular economy",
      "Carbon offset",
      "Net zero",
      "Ecological footprint"
    ],
    "ans": "Net zero",
    "exp": "Net zero adalah komitmen untuk menyeimbangkan emisi yang dihasilkan dengan emisi yang dihapus."
  },
  {
    "q": "An economy where waste is eliminated and resources are reused is called ___",
    "opts": [
      "Sustainable development",
      "Fossil fuel",
      "Circular economy",
      "Climate justice"
    ],
    "ans": "Circular economy",
    "exp": "Circular economy adalah model ekonomi yang menghilangkan limbah dan memaksimalkan penggunaan ulang sumber daya."
  },
  {
    "q": "The wide variety of plant and animal species in an area is called ___",
    "opts": [
      "Ecosystem",
      "Biodiversity",
      "Habitat loss",
      "Deforestation"
    ],
    "ans": "Biodiversity",
    "exp": "Biodiversity mengacu pada keanekaragaman semua kehidupan di suatu daerah atau planet."
  },
  {
    "q": "Chemicals released into the environment by factories ___ the water supply.",
    "opts": [
      "Restore",
      "Harness",
      "Contaminate",
      "Recycle"
    ],
    "ans": "Contaminate",
    "exp": "To contaminate berarti memasukkan zat berbahaya ke lingkungan, menjadikannya tidak aman."
  },
  {
    "q": "Climate change caused by human activity is described as ___",
    "opts": [
      "Ecological",
      "Biodegradable",
      "Anthropogenic",
      "Circular"
    ],
    "ans": "Anthropogenic",
    "exp": "Anthropogenic berarti disebabkan atau dipengaruhi oleh aktivitas manusia."
  },
  {
    "q": "A material that can naturally decompose is called ___",
    "opts": [
      "Carbon neutral",
      "Biodegradable",
      "Renewable",
      "Tipping point"
    ],
    "ans": "Biodegradable",
    "exp": "Biodegradable materials dapat terurai secara alami oleh organisme biologis."
  },
  {
    "q": "The critical threshold beyond which changes become irreversible is the ___",
    "opts": [
      "Net zero",
      "Greenwashing",
      "Tipping point",
      "Carbon offset"
    ],
    "ans": "Tipping point",
    "exp": "Tipping point adalah batas kritis di mana perubahan iklim menjadi tidak dapat dikembalikan ke kondisi semula."
  },
  {
    "q": "To ___ solar energy means to capture and use it effectively.",
    "opts": [
      "Emit",
      "Deplete",
      "Pollute",
      "Harness"
    ],
    "ans": "Harness",
    "exp": "To harness energy berarti menangkap dan mengubah sumber daya alam menjadi bentuk energi yang dapat digunakan."
  },
  {
    "q": "The cutting down of large areas of forest is called ___",
    "opts": [
      "Soil erosion",
      "Deforestation",
      "Habitat loss",
      "Ecosystem"
    ],
    "ans": "Deforestation",
    "exp": "Deforestation adalah penebangan hutan secara besar-besaran, seringkali untuk pertanian atau pembangunan."
  },
  {
    "q": "To ___ a damaged ecosystem means to bring it back to its original state.",
    "opts": [
      "Degrade",
      "Conserve",
      "Restore",
      "Distribute"
    ],
    "ans": "Restore",
    "exp": "To restore an ecosystem berarti memulihkannya dari kerusakan menuju kondisi yang lebih sehat dan alami."
  },
  {
    "q": "Development that meets present needs without compromising future generations is called ___",
    "opts": [
      "Climate justice",
      "Net zero",
      "Sustainable development",
      "Circular economy"
    ],
    "ans": "Sustainable development",
    "exp": "Sustainable development memenuhi kebutuhan saat ini tanpa mengorbankan kemampuan generasi mendatang."
  },
  {
    "q": "The community of living things and their environment is called an ___",
    "opts": [
      "Fossil fuel",
      "Ecosystem",
      "Carbon footprint",
      "Biodiversity"
    ],
    "ans": "Ecosystem",
    "exp": "Ecosystem adalah sistem yang terdiri dari semua organisme hidup beserta lingkungan fisik tempat mereka tinggal."
  },
  {
    "q": "Buying carbon offsets means paying to ___ emissions you create elsewhere.",
    "opts": [
      "Increase",
      "Match",
      "Compensate for",
      "Emit"
    ],
    "ans": "Compensate for",
    "exp": "Carbon offset berarti membayar untuk proyek lingkungan yang mengurangi emisi setara dengan yang Anda hasilkan."
  },
  {
    "q": "Which phrase means \"impartial distribution of climate change burdens and benefits\"?",
    "opts": [
      "Carbon neutral",
      "Greenwashing",
      "Climate justice",
      "Net zero"
    ],
    "ans": "Climate justice",
    "exp": "Climate justice menyerukan pembagian yang adil atas beban perubahan iklim, terutama antara negara kaya dan miskin."
  },
  {
    "q": "Gases like CO2 and methane that trap heat in the atmosphere are called ___",
    "opts": [
      "Fossil fuels",
      "Carbon offsets",
      "Greenhouse gases",
      "Renewable energy"
    ],
    "ans": "Greenhouse gases",
    "exp": "Greenhouse gases adalah gas yang memerangkap panas di atmosfer, menyebabkan pemanasan global."
  },
  {
    "q": "The total natural resources consumed by a person or country is called their ___",
    "opts": [
      "Carbon footprint",
      "Ecological footprint",
      "Net zero",
      "Biodiversity"
    ],
    "ans": "Ecological footprint",
    "exp": "Ecological footprint mengukur seluruh sumber daya alam yang dibutuhkan untuk mendukung gaya hidup seseorang."
  }
];

const UpperInterVocabLesson3: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_vocabulary', 3);
  const nextLessonPath = '/modul/english/upper-intermediate/vocabulary/lesson-4';

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
  const LABELS = { cat1: 'Environmental Nouns', cat2: 'Environmental Verbs', cat3: 'Environmental Concepts' };
  const DESCS = { cat1: 'Istilah utama dalam wacana lingkungan hidup global.', cat2: 'Kata kerja tindakan lingkungan yang penting.', cat3: 'Konsep penting dalam kebijakan dan gerakan lingkungan.' };

  return (
    <>
      <LessonCompleteModal
        show={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        lessonLabel="Upper-Intermediate Vocabulary Lesson 3"
        accentColor="#4FA3D1"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="Environment & Sustainability"
        subtitle="Vocabulary B2 • Pelajaran 3"
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
                <h2 className="text-xl font-extrabold mb-1">Environment & Sustainability</h2>
                <p className="text-sm opacity-90">Kosakata Lingkungan & Keberlanjutan</p>
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

export default UpperInterVocabLesson3;
