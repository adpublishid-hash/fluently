import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Lightbulb, Sparkles, Star, Volume2 } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

const SOCIETY_STRUCTURE_VOCAB = [

  { word: "Community", ipa: "/kəˈmjuːnɪti/", meaning: "Komunitas / Masyarakat" },
  { word: "Citizen", ipa: "/ˈsɪtɪzən/", meaning: "Warga negara" },
  { word: "Population", ipa: "/ˌpɒpjʊˈleɪʃən/", meaning: "Populasi / Penduduk" },
  { word: "Diversity", ipa: "/daɪˈvɜːrsɪti/", meaning: "Keberagaman" },
  { word: "Equality", ipa: "/iˈkwɒlɪti/", meaning: "Kesetaraan" },
  { word: "Minority", ipa: "/maɪˈnɒrɪti/", meaning: "Minoritas" },
  { word: "Majority", ipa: "/məˈdʒɒrɪti/", meaning: "Mayoritas" },
  { word: "Generation", ipa: "/ˌdʒɛnəˈreɪʃən/", meaning: "Generasi" },
  { word: "Identity", ipa: "/aɪˈdɛntɪti/", meaning: "Jati diri / Identitas" },
  { word: "Privilege", ipa: "/ˈprɪvɪlɪdʒ/", meaning: "Hak istimewa / Privilese" },

];

const LAW_POLITICS_VOCAB = [

  { word: "Government", ipa: "/ˈɡʌvərnmənt/", meaning: "Pemerintah" },
  { word: "Democracy", ipa: "/dɪˈmɒkrəsi/", meaning: "Demokrasi" },
  { word: "Justice", ipa: "/ˈdʒʌstɪs/", meaning: "Keadilan" },
  { word: "Freedom", ipa: "/ˈfriːdəm/", meaning: "Kebebasan" },
  { word: "Rights", ipa: "/raɪts/", meaning: "Hak (Asasi)" },
  { word: "Policy", ipa: "/ˈpɒlɪsi/", meaning: "Kebijakan" },
  { word: "Election", ipa: "/ɪˈlɛkʃən/", meaning: "Pemilihan umum (Pemilu)" },
  { word: "Protest", ipa: "/ˈproʊtɛst/", meaning: "Protes / Unjuk rasa" },
  { word: "Candidate", ipa: "/ˈkændɪdeɪt/", meaning: "Kandidat / Calon" },
  { word: "Campaign", ipa: "/kæmˈpeɪn/", meaning: "Kampanye" },

];

const SOCIAL_ISSUES_VOCAB = [

  { word: "Poverty", ipa: "/ˈpɒvərti/", meaning: "Kemiskinan" },
  { word: "Homelessness", ipa: "/ˈhoʊmləsnəs/", meaning: "Tunawisma (Gelandangan)" },
  { word: "Unemployment", ipa: "/ˌʌnɪmˈplɔɪmənt/", meaning: "Pengangguran" },
  { word: "Discrimination", ipa: "/dɪˌskrɪmɪˈneɪʃən/", meaning: "Diskriminasi" },
  { word: "Inequality", ipa: "/ˌɪnɪˈkwɒlɪti/", meaning: "Ketidaksetaraan" },
  { word: "Immigration", ipa: "/ˌɪmɪˈɡreɪʃən/", meaning: "Imigrasi" },
  { word: "Refugee", ipa: "/ˌrɛfjuˈdʒiː/", meaning: "Pengungsi" },
  { word: "Charity", ipa: "/ˈtʃærɪti/", meaning: "Amal / Badan amal" },
  { word: "Volunteer", ipa: "/ˌvɒlənˈtɪər/", meaning: "Relawan" },
  { word: "Crime", ipa: "/kraɪm/", meaning: "Kejahatan" },

];

const QUIZ_QUESTIONS = [

  { id: 1, question: "A person who is a legal member of a country is a ___.", options: ['Volunteer', 'Refugee', 'Citizen'], answer: 'Citizen', explanation: "A citizen (Warga negara) memiliki hak penuh di suatu negara." },
  { id: 2, question: "When people vote to choose a leader, it is called an ___.", options: ['Election', 'Exception', 'Infection'], answer: 'Election', explanation: "Election (Pemilihan umum) adalah proses pengambilan keputusan formal." },
  { id: 3, question: "People who do not have a place to live are facing ___.", options: ['Freedom', 'Homelessness', 'Poverty'], answer: 'Homelessness', explanation: "Homelessness (Tunawisma) berarti tidak memiliki rumah." },
  { id: 4, question: "Treating everyone the same way is called ___.", options: ['Diversity', 'Equality', 'Minority'], answer: 'Equality', explanation: "Equality (Kesetaraan) adalah keadaan menjadi setara." },
  { id: 5, question: "He works for free to help others. He is a ___.", options: ['Employee', 'Candidate', 'Volunteer'], answer: 'Volunteer', explanation: "Volunteer (Relawan) menawarkan jasa tanpa bayaran." },
  { id: 6, question: "The ___ of Indonesia is very diverse.", options: ['unemployment', 'poverty', 'community'], answer: 'community', explanation: "Community (Komunitas) adalah kelompok orang yang tinggal di area yang sama." },
  { id: 7, question: "All citizens have basic ___ like freedom of speech.", options: ['protests', 'rights', 'crimes'], answer: 'rights', explanation: "Rights (Hak) adalah hal-hal yang Anda diizinkan untuk lakukan atau miliki secara legal." },
  { id: 8, question: "Unfair treatment based on race or gender is ___.", options: ['equality', 'discrimination', 'diversity'], answer: 'discrimination', explanation: "Discrimination (Diskriminasi) adalah perlakuan tidak adil terhadap kelompok tertentu." },
  { id: 9, question: "People who flee war and seek safety in another country are ___.", options: ['candidates', 'refugees', 'volunteers'], answer: 'refugees', explanation: "Refugees (Pengungsi) melarikan diri dari bahaya ke negara lain." },
  { id: 10, question: "The government's new health ___ will help many people.", options: ['crime', 'protest', 'policy'], answer: 'policy', explanation: "Policy (Kebijakan) adalah rencana tindakan resmi yang diadopsi oleh pemerintah." },
  { id: 11, question: "People went to the streets to ___ against injustice.", options: ['volunteer', 'campaign', 'protest'], answer: 'protest', explanation: "To protest (Memprotes) berarti menunjukkan ketidaksetujuan terhadap sesuatu." },
  { id: 12, question: "The presidential ___ will run for three months.", options: ['charity', 'campaign', 'generation'], answer: 'campaign', explanation: "Campaign (Kampanye) adalah serangkaian kegiatan terencana untuk mencapai tujuan tertentu." },
  { id: 13, question: "There is a big gap between the rich and poor, showing ___.", options: ['privilege', 'inequality', 'equality'], answer: 'inequality', explanation: "Inequality (Ketidaksetaraan) adalah perbedaan dalam status, hak, dan kesempatan." },
  { id: 14, question: "Breaking into someone's house is a ___.", options: ['crime', 'right', 'freedom'], answer: 'crime', explanation: "Crime (Kejahatan) adalah tindakan yang melanggar hukum." },
  { id: 15, question: "Many people lost jobs due to high ___.", options: ['unemployment', 'charity', 'diversity'], answer: 'unemployment', explanation: "Unemployment (Pengangguran) adalah kondisi tidak memiliki pekerjaan." },
  { id: 16, question: "We donated money to ___ to help the poor.", options: ['charity', 'protest', 'crime'], answer: 'charity', explanation: "Charity (Badan amal) adalah organisasi yang membantu orang yang membutuhkan." },
  { id: 17, question: "Living without enough money is called ___.", options: ['justice', 'poverty', 'freedom'], answer: 'poverty', explanation: "Poverty (Kemiskinan) adalah keadaan sangat miskin." },
  { id: 18, question: "A system where people choose their leaders is a ___.", options: ['democracy', 'generation', 'minority'], answer: 'democracy', explanation: "Democracy (Demokrasi) adalah pemerintahan oleh rakyat melalui perwakilan yang dipilih." },
  { id: 19, question: "The ___ will debate the new law tonight.", options: ['government', 'refugee', 'charity'], answer: 'government', explanation: "Government (Pemerintah) adalah kelompok orang yang mengendalikan negara." },
  { id: 20, question: "Fair treatment under the law is called ___.", options: ['discrimination', 'poverty', 'justice'], answer: 'justice', explanation: "Justice (Keadilan) adalah perilaku yang adil atau pengobatan." }

];

const InterVocabLesson7: React.FC = () => {
    const navigate = useNavigate();
    const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('intermediate_vocabulary', 7);
    const nextLessonPath = 7 < 20 ? `/modul/english/intermediate/vocabulary/lesson-${7+1}` : '/modul/english/intermediate';

    const [vocabSection, setVocabSection] = useState<'structure' | string>('structure');

    // Quiz State
    const [quizStep, setQuizStep] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);

    // Audio Handler
    const playSound = (text: string) => { playAudio(text, 0.9); };

    // Quiz Handlers
    const handleCheckQuiz = (option: string) => {
        if (isAnswerChecked) return;
        setSelectedOption(option);
        setIsAnswerChecked(true);
        if (option === QUIZ_QUESTIONS[quizStep].answer) {
            setQuizScore(prev => prev + 1);
            playSound("Correct!");
        } else {
            playSound("Incorrect.");
        }
    };

    const nextQuizQuestion = () => {
        if (quizStep < QUIZ_QUESTIONS.length - 1) {
            setQuizStep(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswerChecked(false);
        } else {
            setShowResult(true);
        }
    };

    const restartQuiz = () => {
        setQuizStep(0);
        setQuizScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswerChecked(false);
    };

    const renderVocabList = (list: any[], colorClass: string) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {list.map((item, idx) => (
                <button
                    key={idx}
                    onClick={() => playSound(item.word)}
                    className={`bg-white p-4 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-card)] flex items-center justify-between group hover:border-${colorClass}-300 hover:shadow-md transition-all active:scale-95 text-left`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full bg-${colorClass}-50 text-${colorClass}-500 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
                            {idx + 1}
                        </div>
                        <div>
                            <p className="font-bold text-[var(--color-text-primary)]">{item.word}</p>
                            <p className="text-xs text-[var(--color-text-muted)] font-mono mb-1">{item.ipa}</p>
                            <p className="text-xs text-[var(--color-text-muted)] italic">{item.meaning}</p>
                        </div>
                    </div>
                    <Volume2 className={`w-5 h-5 text-slate-300 group-hover:text-${colorClass}-500`} />
                </button>
            ))}
        </div>
    );

    return (
        <>
            <LessonCompleteModal
                show={showCompleteModal}
                onClose={() => setShowCompleteModal(false)}
                lessonLabel={"Intermediate Vocabulary Lesson 7"}
                accentColor="#2980B9"
                nextLessonPath={nextLessonPath}
                onNext={nextLessonPath ? () => { setShowCompleteModal(false); navigate(nextLessonPath); } : undefined}
                onBack={() => { setShowCompleteModal(false); navigate(-1); }}
            />
            <LessonShell
                title="Masyarakat & Isu Sosial"
                subtitle="Vocabulary • Pelajaran 7"
                accentColor="#2980B9"
                nextLesson={nextLessonPath}
                tabs={[
                    { id: 'learn', label: 'Pelajari', icon: <BookOpen size={14} /> },
                    { id: 'practice', label: 'Latihan', icon: <PenTool size={14} /> }
                ]}
                footer={() => (
                    <button
                        onClick={isCompleted ? () => navigate(-1) : handleSelesai}
                        className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                        style={{ background: isCompleted ? 'linear-gradient(135deg, #4FA3D1, #1E6F9F)' : 'linear-gradient(135deg, #2980B9, #2980B9cc)' }}
                    >
                        <CheckCircle2 size={18} />
                        {isCompleted ? 'Sudah Selesai ✓' : 'Selesai'}
                    </button>
                )}
            >
                {(tabId) => {
                    if (tabId === 'learn') {
                        return (
                            <div className="space-y-8 animate-fade-in">
                                
              <div className="flex flex-wrap justify-center gap-2 mb-6">

                <button
                  onClick={() => setVocabSection('structure')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'structure' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Masyarakat
                </button>

                <button
                  onClick={() => setVocabSection('politics')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'politics' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Politik
                </button>

                <button
                  onClick={() => setVocabSection('issues')}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${vocabSection === 'issues' ? 'bg-sky-100 text-sky-700 ring-2 ring-sky-200' : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)]'}`}
                >
                  Masalah
                </button>

              </div>
      
                                
              {vocabSection === 'structure' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Struktur Sosial</h3>
                      <p className="text-xs text-sky-700">Orang yang hidup bersama.</p>
                    </div>
                  </div>
                  {renderVocabList(SOCIETY_STRUCTURE_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'politics' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Hukum & Politik</h3>
                      <p className="text-xs text-sky-700">Aturan dan pemerintahan.</p>
                    </div>
                  </div>
                  {renderVocabList(LAW_POLITICS_VOCAB, 'sky')}
                </div>
              )}

              {vocabSection === 'issues' && (
                <div className="animate-fade-in">
                  <div className="bg-sky-50 p-4 rounded-2xl mb-4 border border-sky-100 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-full text-sky-500 shadow-[var(--shadow-card)]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sky-900 text-sm">Masalah Sosial</h3>
                      <p className="text-xs text-sky-700">Masalah modern yang kita hadapi.</p>
                    </div>
                  </div>
                  {renderVocabList(SOCIAL_ISSUES_VOCAB, 'sky')}
                </div>
              )}

                                { /* Bonus: Penggunaan Kata & Kolokasi Section */ }
                                <div className="mt-10 animate-fade-in">
                                    
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-lg font-bold text-slate-800">Penggunaan Kontekstual</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-800 mb-2 text-sm uppercase">Demokrasi & Pemilihan</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"Every <b>citizen</b> has the right to vote in the <b>election</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Setiap <b>warga negara</b> memiliki hak untuk memilih dalam <b>pemilihan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"The <b>candidate</b> promised to fight <b>corruption</b>."</p>
                    <p className="text-xs text-slate-500">(<b>Kandidat</b> berjanji untuk melawan <b>korupsi</b>.)</p>
                  </div>

                  <div className="bg-teal-50 p-4 rounded-xl border border-sky-100">
                    <h3 className="font-bold text-teal-800 mb-2 text-sm uppercase">Membantu Orang Lain</h3>
                    <p className="text-sm text-slate-700 italic mb-1">"We donate money to <b>charity</b> to help fight <b>poverty</b>."</p>
                    <p className="text-xs text-slate-500 mb-2">(Kami menyumbangkan uang untuk <b>amal</b> guna membantu memerangi <b>kemiskinan</b>.)</p>
                    <p className="text-sm text-slate-700 italic">"She works as a <b>volunteer</b> at the local shelter."</p>
                    <p className="text-xs text-slate-500">(Dia bekerja sebagai <b>relawan</b> di penampungan lokal.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
                <h3 className="font-bold text-indigo-800 mb-2 text-sm uppercase tracking-wide">Kolokasi Umum</h3>
                <div className="bg-white p-3 rounded-lg border border-indigo-100/50">
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• <b>Fight</b> for rights (Memperjuangkan hak)</li>
                    <li>• <b>Commit</b> a crime (Melakukan kejahatan)</li>
                    <li>• <b>Bridge</b> the gap (Menjembatani kesenjangan)</li>
                    <li>• <b>Raise</b> awareness (Meningkatkan kesadaran)</li>
                  </ul>
                </div>
              </div>
            
                                </div>
                            </div>
                        );
                    }
                    if (tabId === 'practice') {
                        return (
                            <div className="animate-fade-in">
                                <div className="max-w-xl mx-auto">
                                    {!showResult ? (
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Pertanyaan {quizStep + 1} dari {QUIZ_QUESTIONS.length}</span>
                                                <span className="text-xs font-bold bg-sky-50 text-sky-600 px-2 py-1 rounded">Skor: {quizScore}</span>
                                            </div>

                                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-6">
                                                {QUIZ_QUESTIONS[quizStep].question}
                                            </h3>

                                            <div className="space-y-3">
                                                {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => {
                                                    let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
                                                    if (isAnswerChecked) {
                                                        if (option === QUIZ_QUESTIONS[quizStep].answer) btnClass = "bg-green-50 border-sky-500 text-green-700";
                                                        else if (option === selectedOption) btnClass = "bg-red-50 border-red-500 text-red-700";
                                                        else btnClass = "opacity-50 border-[var(--color-border)]";
                                                    }

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleCheckQuiz(option)}
                                                            disabled={isAnswerChecked}
                                                            className={`w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`}
                                                        >
                                                            <span>{option}</span>
                                                            {isAnswerChecked && option === QUIZ_QUESTIONS[quizStep].answer && <CheckCircle2 size={20} />}
                                                            {isAnswerChecked && option === selectedOption && option !== QUIZ_QUESTIONS[quizStep].answer && <XCircle size={20} />}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {isAnswerChecked && (
                                                <div className="mt-6">
                                                    <div className={`p-3 rounded-lg text-sm mb-4 ${selectedOption === QUIZ_QUESTIONS[quizStep].answer ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'}`}>
                                                        {QUIZ_QUESTIONS[quizStep].explanation}
                                                    </div>
                                                    <button
                                                        onClick={nextQuizQuestion}
                                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                                                    >
                                                        {quizStep < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Lihat Hasil"}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500">
                                                <Star className="w-10 h-10" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Kuis Selesai!</h2>
                                            <p className="text-[var(--color-text-muted)] mb-6">Kamu mendapatkan skor {quizScore} dari {QUIZ_QUESTIONS.length}</p>
                                            <button
                                                onClick={restartQuiz}
                                                className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200"
                                            >
                                                Coba Lagi
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return null;
                }}
            </LessonShell>
        </>
    );
};

export default InterVocabLesson7;
