// build-upper-inter-speaking.cjs
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../src/pages/module/english/upper-intermediate/speaking');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ACCENT_COLOR = '#1E8449';

const LESSONS = [
  {
    id: 1, title: 'Expressing Complex Opinions', subtitle: 'Menyatakan Pendapat Kompleks & Terstruktur',
    sections: [
      { name: 'Frasa Opini Formal', icon: '💬', items: [
        { phrase: 'From my perspective,', usage: 'Dari sudut pandang saya, ...' },
        { phrase: 'As far as I\'m aware,', usage: 'Sejauh yang saya ketahui, ...' },
        { phrase: 'It seems to me that...', usage: 'Tampaknya bagi saya bahwa ...' },
        { phrase: 'I would argue that...', usage: 'Saya akan berargumen bahwa ...' },
        { phrase: 'It is my contention that...', usage: 'Saya berpendapat bahwa ... (sangat formal)' },
        { phrase: 'There is a strong case for...', usage: 'Ada argumen kuat untuk ...' },
        { phrase: 'One cannot deny that...', usage: 'Seseorang tidak dapat menyangkal bahwa ...' },
        { phrase: 'The evidence clearly suggests...', usage: 'Bukti dengan jelas menunjukkan ...' },
      ]},
      { name: 'Hedging & Qualification', icon: '⚖️', items: [
        { phrase: 'To some extent,', usage: 'Sampai taraf tertentu, ...' },
        { phrase: 'This may not always be the case,', usage: 'Ini mungkin tidak selalu berlaku demikian, ...' },
        { phrase: 'While X is generally true, ...', usage: 'Meskipun X umumnya benar, ...' },
        { phrase: 'In most, though not all, cases,', usage: 'Dalam sebagian besar, meski tidak semua, kasus, ...' },
        { phrase: 'Broadly speaking, although...', usage: 'Secara umum, meskipun ...' },
        { phrase: 'That said, it is worth noting...', usage: 'Dengan demikian, perlu dicatat ...' },
        { phrase: 'This is a contentious issue, however...', usage: 'Ini adalah isu yang kontroversial, namun ...' },
        { phrase: 'Exceptions aside,', usage: 'Mengecualikan pengecualian, ...' },
      ]},
      { name: 'Contoh Dialog', icon: '🗣️', items: [
        { phrase: 'A: Do you think social media is harmful?', usage: 'Pertanyaan membuka diskusi' },
        { phrase: 'B: From my perspective, it\'s a double-edged sword.', usage: 'Opini dengan frasa formal' },
        { phrase: 'B: To some extent, it enables connection...', usage: 'Hedging untuk keseimbangan argumen' },
        { phrase: 'B: However, I would argue that its long-term psychological impact is underestimated.', usage: 'Argumen berlawanan dengan konektor formal' },
      ]},
    ],
    quiz: [
      { q: 'Which phrase introduces a formal opinion at B2 level?', opts: ['I think maybe...', 'I would argue that...', 'Like, I feel...', 'Kind of, you know...'], ans: 'I would argue that...', exp: '"I would argue that..." adalah frasa formal yang umum dalam debat akademik dan presentasi.' },
      { q: '"To some extent" is used to ___', opts: ['Express 100% certainty', 'Partially qualify or limit a statement', 'Contradict the speaker', 'Begin a narrative'], ans: 'Partially qualify or limit a statement', exp: '"To some extent" menunjukkan bahwa pernyataan hanya berlaku sebagian – teknik hedging yang penting.' },
      { q: 'Which phrase is MOST formal for expressing an opinion?', opts: ['I think...', 'It is my contention that...', 'I guess...', 'Kind of like...'], ans: 'It is my contention that...', exp: '"It is my contention that" adalah salah satu frasa paling formal untuk menyatakan pendapat dalam konteks akademik.' },
      { q: '"The evidence clearly suggests..." is followed by ___', opts: ['A personal preference', 'A data-supported claim or finding', 'A simple yes or no', 'A greeting'], ans: 'A data-supported claim or finding', exp: 'Frasa ini digunakan untuk mengintroduksikan bukti empiris atau kesimpulan berbasis data.' },
      { q: '"That said, it is worth noting that..." serves what purpose?', opts: ['Starting a new topic', 'Conceding a point then adding a nuance or exception', 'Ending the discussion', 'Expressing strong agreement'], ans: 'Conceding a point then adding a nuance or exception', exp: '"That said" mengakui poin sebelumnya sebelum memperkenalkan nuansa atau pengecualian penting.' },
      { q: 'Which phrase is used for balanced argumentation?', opts: ['In my humble opinion', 'While X is generally true, Y must also be considered.', 'I completely disagree.', 'Obviously, everyone knows...'], ans: 'While X is generally true, Y must also be considered.', exp: '"While X is true, Y..." menciptakan struktur argumentasi seimbang yang diharapkan di level B2.' },
      { q: '"There is a strong case for..." introduces ___', opts: ['A weak suggestion', 'A well-supported argument or position', 'A question', 'A personal anecdote only'], ans: 'A well-supported argument or position', exp: '"There is a strong case for" mengintroduksi argumen yang didukung oleh alasan atau bukti yang kuat.' },
      { q: 'What does hedging do in academic speaking?', opts: ['Makes you sound uncertain about everything', 'Provides appropriate caution and balance to claims', 'Weakens your argument completely', 'Is only used in writing'], ans: 'Provides appropriate caution and balance to claims', exp: 'Hedging memberikan nuansa akademik pada klaim, menunjukkan kesadaran bahwa tidak semua generalizations berlaku.' },
      { q: '"From my perspective" signals that the speaker is ___', opts: ['Stating an objective fact', 'Sharing a personal viewpoint', 'Asking a question', 'Disagreeing politely'], ans: 'Sharing a personal viewpoint', exp: '"From my perspective" dengan jelas menandai bahwa yang berikut adalah sudut pandang pribadi pembicara.' },
      { q: 'Which phrase introduces a counterargument?', opts: ['In addition,', 'Furthermore,', 'However, one cannot deny that...', 'As a result,'], ans: 'However, one cannot deny that...', exp: '"However, one cannot deny that..." adalah cara formal untuk memperkenalkan argumen balasan yang kuat.' },
      { q: '"One cannot deny that" is used to ___', opts: ['Weakly suggest something', 'Introduce an undeniable fact or widely accepted point', 'Ask a yes/no question', 'Start a concession only'], ans: 'Introduce an undeniable fact or widely accepted point', exp: '"One cannot deny" digunakan untuk pernyataan yang dianggap sulit dibantah atau sangat kuat.' },
      { q: 'In a formal debate, which opener is most appropriate?', opts: ['Okay guys, so I basically think...', 'It seems to me that the issue of X is often oversimplified.', 'Like, this topic is so complicated...', 'Everyone agrees that...'], ans: 'It seems to me that the issue of X is often oversimplified.', exp: 'Pembukaan formal menggunakan frasa seperti "It seems to me that" dengan sikap analitis.' },
      { q: '"Broadly speaking, although..." shows that the speaker is ___', opts: ['Making a very specific claim', 'Generalizing while acknowledging exceptions', 'Answering directly', 'Refusing to commit to an opinion'], ans: 'Generalizing while acknowledging exceptions', exp: '"Broadly speaking, although" mengkombinasikan generalisasi dengan pengakuan terhadap pengecualian.' },
      { q: 'Which phrase is appropriate for giving a well-supported opinion in a discussion?', opts: ['I dunno, maybe...', 'To be honest, I\'m not sure.', 'As far as I\'m aware, the research indicates...', 'It\'s just my feeling that...'], ans: 'As far as I\'m aware, the research indicates...', exp: '"As far as I\'m aware, the research indicates" menunjukkan dasar pengetahuan yang solid dan referensi ke bukti.' },
      { q: 'Which is NOT a hedging expression?', opts: ['To some extent,', 'This may not always be the case,', 'Absolutely, without question,', 'In most, though not all, cases,'], ans: 'Absolutely, without question,', exp: '"Absolutely, without question" adalah ekspresi kepastian penuh, bukan hedging. Hedging mengkualifikasi pernyataan.' },
      { q: 'How should you introduce a CONTRASTING point in a B2 discussion?', opts: ['And also yes.', 'However, it is important to recognise that...', 'But no.', 'The other thing is if...'], ans: 'However, it is important to recognise that...', exp: '"However, it is important to recognise" adalah frasa formal yang tepat untuk memperkenalkan counterpoint.' },
      { q: '"Exceptions aside, the majority of studies confirm..." means ___', opts: ['All studies agree completely', 'Ignoring some outliers, most evidence agrees', 'No exceptions exist', 'Only one study matters'], ans: 'Ignoring some outliers, most evidence agrees', exp: '"Exceptions aside" mengakui adanya outlier/pengecualian sebelum membuat generalisasi berbasis mayoritas bukti.' },
      { q: 'At B2 level, good oral argumentation includes ___', opts: ['Only stating opinions without support', 'Opinion + supporting reason + concession + conclusion', 'Repeating the same point multiple times', 'Using only simple, short sentences'], ans: 'Opinion + supporting reason + concession + conclusion', exp: 'Argumentasi oral yang baik di B2 mencakup: pendapat, dukungan, konsesi, dan penutup.' },
      { q: 'Which response is most academically appropriate to "Do you agree?"?', opts: ['Yeah totally.', 'Nope.', 'I am largely in agreement, though I would qualify this by noting that...', 'Sure, why not.'], ans: 'I am largely in agreement, though I would qualify this by noting that...', exp: '"Largely in agreement, though I would qualify" menunjukkan persetujuan dengan nuansa yang dikualifikasi.' },
      { q: 'The phrase "I would argue that" is often followed by ___', opts: ['A simple yes/no', 'A question about weather', 'A reasoned position or evidence-based claim', 'An emotional reaction'], ans: 'A reasoned position or evidence-based claim', exp: '"I would argue that" diikuti oleh posisi yang didukung oleh alasan atau bukti – bukan emosi semata.' },
    ]
  },
];

const SPEAKING_TOPICS = [
  { id: 2, title: 'Formal Debates & Argumentation', subtitle: 'Debat Akademik & Struktur Argumen' },
  { id: 3, title: 'Academic Presentations', subtitle: 'Presentasi Formal & Struktur Akademik' },
  { id: 4, title: 'Describing Trends & Data', subtitle: 'Mendeskripsikan Tren & Grafik Secara Lisan' },
  { id: 5, title: 'Making Formal Suggestions', subtitle: 'Saran & Rekomendasi Formal' },
  { id: 6, title: 'Expressing Concession & Disagreement', subtitle: 'Konsesi & Perbedaan Pendapat yang Sopan' },
  { id: 7, title: 'Complex Descriptions', subtitle: 'Deskripsi Detail & Kosakata Tingkat Lanjut' },
  { id: 8, title: 'Narrative Storytelling', subtitle: 'Bercerita dengan Teknik Naratif Berkelas' },
  { id: 9, title: 'Giving & Responding to Feedback', subtitle: 'Memberikan & Merespons Umpan Balik' },
  { id: 10, title: 'Making & Supporting Claims', subtitle: 'Membuat & Mendukung Klaim dengan Bukti' },
  { id: 11, title: 'Formal Interview Discourse', subtitle: 'Bahasa Formal untuk Wawancara & Job Interviews' },
  { id: 12, title: 'Group Discussion Leadership', subtitle: 'Memimpin & Berpartisipasi dalam Diskusi Kelompok' },
  { id: 13, title: 'Expressing Hypotheticals', subtitle: 'Spekulasi & Kondisi Hipotetis dalam Lisan' },
  { id: 14, title: 'Cause & Effect Analysis', subtitle: 'Menganalisis Hubungan Sebab-Akibat Secara Lisan' },
  { id: 15, title: 'Comparing & Contrasting Complex Ideas', subtitle: 'Membandingkan Ide & Konsep Tingkat Lanjut' },
  { id: 16, title: 'Hedging Language in Speaking', subtitle: 'Bahasa Hedging & Kesopanan Akademik' },
  { id: 17, title: 'Summarising & Paraphrasing', subtitle: 'Merangkum & Memparafrase dalam Diskusi' },
  { id: 18, title: 'Intercultural Communication', subtitle: 'Komunikasi Lintas Budaya & Global Awareness' },
  { id: 19, title: 'Critical Thinking in Discussion', subtitle: 'Berpikir Kritis & Analitis dalam Diskusi Lisan' },
  { id: 20, title: 'Integrated Speaking Practice', subtitle: 'Latihan Gabungan: Speaking Review B2' },
];

function fallbackSections(title) {
  return [
    { name: 'Frasa Kunci', icon: '💬', items: [
      { phrase: 'I would like to suggest that...', usage: 'Saya ingin menyarankan bahwa ...' },
      { phrase: 'It is worth considering...', usage: 'Ini layak dipertimbangkan ...' },
      { phrase: 'Looking at this from another angle,', usage: 'Melihat ini dari sudut yang berbeda,' },
      { phrase: 'The key point here is that...', usage: 'Poin kunci di sini adalah bahwa ...' },
      { phrase: 'This raises an important question about...', usage: 'Ini menimbulkan pertanyaan penting tentang ...' },
      { phrase: 'Building on what was said earlier,', usage: 'Melanjutkan apa yang telah dikatakan sebelumnya,' },
      { phrase: 'In light of the evidence,', usage: 'Mengingat bukti yang ada,' },
      { phrase: 'To put it another way,', usage: 'Dengan kata lain,' },
    ]},
    { name: 'Strategi Komunikasi', icon: '🎯', items: [
      { phrase: 'Let me clarify what I mean,', usage: 'Izinkan saya memperjelas maksud saya,' },
      { phrase: 'If I understand correctly,', usage: 'Jika saya pahami dengan benar,' },
      { phrase: 'Could you elaborate on that?', usage: 'Bisakah Anda menjelaskan lebih lanjut tentang itu?' },
      { phrase: 'I see your point, however...', usage: 'Saya memahami poin Anda, namun ...' },
      { phrase: 'That\'s an interesting perspective,', usage: 'Itu adalah perspektif yang menarik,' },
      { phrase: 'To summarise my argument,', usage: 'Untuk merangkum argumen saya,' },
      { phrase: 'What I find most compelling is...', usage: 'Yang paling meyakinkan bagi saya adalah ...' },
      { phrase: 'This is a nuanced issue because...', usage: 'Ini adalah isu yang bernuansa karena ...' },
    ]},
    { name: 'Ekspresi Level B2', icon: '🌟', items: [
      { phrase: `In the context of ${title},`, usage: 'Dalam konteks topik ini,' },
      { phrase: 'The implications of this are significant,', usage: 'Implikasinya sangat signifikan,' },
      { phrase: 'Drawing on current research,', usage: 'Berdasarkan penelitian terkini,' },
      { phrase: 'Stakeholders should be aware that...', usage: 'Para pemangku kepentingan harus menyadari bahwa ...' },
    ]},
  ];
}

function fallbackSpeakingQuiz(title) {
  return [
    { q: `What is the BEST way to introduce your main point when speaking about "${title}"?`, opts: ['Umm, so basically I think...', 'The key point I would like to address is...', 'Like, I dunno what to say...', 'So yeah, my thing is...'], ans: 'The key point I would like to address is...', exp: '"The key point I would like to address" adalah pembuka formal yang langsung dan jelas dalam speaking B2.' },
    { q: 'Which phrase allows you to AGREE and then ADD a qualification?', opts: ['No way.', 'I totally agree. Full stop.', 'I see your point, however, there is also the consideration of...', 'Whatever you say.'], ans: 'I see your point, however, there is also the consideration of...', exp: '"I see your point, however" mengakui argumen lawan sebelum memperkenalkan perspektif tambahan.' },
    { q: 'In formal speaking, what does "To put it another way," signal?', opts: ['Starting a new topic', 'Rephrasing what was said for clarity', 'Disagreeing strongly', 'Ending the conversation'], ans: 'Rephrasing what was said for clarity', exp: '"To put it another way" adalah frasa transisi yang digunakan untuk memparafrase atau menyederhanakan poin.' },
    { q: 'Which phrase appropriately asks someone to develop their idea?', opts: ['What do you mean?', 'Huh?', 'Could you elaborate on that point, please?', 'Say it again.'], ans: 'Could you elaborate on that point, please?', exp: '"Could you elaborate on that?" adalah cara sopan dan formal untuk meminta penjelasan lebih lanjut.' },
    { q: '"Building on what was said earlier" shows that you ___', opts: ['Are changing the subject', 'Cannot remember the conversation', 'Are connecting your point to previous contributions', 'Are ending your speaking turn'], ans: 'Are connecting your point to previous contributions', exp: '"Building on" menunjukkan kemampuan mengikuti diskusi dan mengintegrasikan ide yang telah disampaikan.' },
    { q: 'Which is an effective strategy when you need time to think in a discussion?', opts: ['Going completely silent', 'Using fillers like "That\'s an interesting point; let me consider..."', 'Changing the topic abruptly', 'Saying "I don\'t know" and stopping'], ans: 'Using fillers like "That\'s an interesting point; let me consider..."', exp: '"That\'s an interesting point; let me consider..." memberi Anda waktu berpikir sambil tetap terlibat dalam diskusi.' },
    { q: 'What does hedging in formal speaking indicate?', opts: ['Weak knowledge', 'Academic caution and awareness of complexity', 'Uncertainty about everything', 'Refusal to commit to ideas'], ans: 'Academic caution and awareness of complexity', exp: 'Hedging menunjukkan kesadaran akademik bahwa sebagian besar isu bersifat kompleks dan memiliki nuansa.' },
    { q: '"The implications of this are significant" is used when ___', opts: ['Concluding a story', 'Emphasizing the importance of a point or finding', 'Introducing yourself', 'Asking a question'], ans: 'Emphasizing the importance of a point or finding', exp: 'Frasa ini menekankan bahwa poin yang dibicarakan memiliki konsekuensi atau dampak yang besar.' },
    { q: '"Drawing on current research" shows that your argument is ___', opts: ['Based purely on personal feeling', 'Evidence-based and academically grounded', 'Hypothetical only', 'Informal and chatty'], ans: 'Evidence-based and academically grounded', exp: '"Drawing on current research" menandai bahwa argumen Anda didukung oleh sumber akademik terkini.' },
    { q: 'At B2 level, good speaking involves ___', opts: ['Only using simple vocabulary', 'Using complex structures, varied vocabulary, and appropriate register', 'Speaking as fast as possible', 'Avoiding all opinions'], ans: 'Using complex structures, varied vocabulary, and appropriate register', exp: 'CEFR B2 berbicara: menggunakan struktur kompleks, kosakata bervariasi, dan register yang sesuai konteks.' },
    { q: '"What I find most compelling is..." introduces ___', opts: ['A dismissal of an idea', 'The speaker\'s strongest supporting argument', 'A personal anecdote only', 'A question to the audience'], ans: 'The speaker\'s strongest supporting argument', exp: '"What I find most compelling" memperkenalkan argumen paling kuat atau paling meyakinkan dari pembicara.' },
    { q: 'Which phrase politely challenges a previous statement?', opts: ['That\'s wrong.', 'While I appreciate that perspective, I would question whether...', 'No that\'s false.', 'I disagree completely.'], ans: 'While I appreciate that perspective, I would question whether...', exp: '"While I appreciate that perspective" mengakui sudut pandang sebelum mempertanyakannya secara sopan.' },
    { q: '"This is a nuanced issue because..." prepares the listener for ___', opts: ['A simple answer', 'A complex, multi-faceted discussion with multiple perspectives', 'A conclusion only', 'A personal story'], ans: 'A complex, multi-faceted discussion with multiple perspectives', exp: '"Nuanced" menandakan bahwa isu tidak hitam-putih dan memerlukan pemikiran yang lebih dalam.' },
    { q: '"To summarise my argument" is used ___', opts: ['At the beginning of a discussion', 'To introduce new evidence', 'To signal closure or recapping before concluding', 'To ask a question'], ans: 'To signal closure or recapping before concluding', exp: '"To summarise" menandakan bahwa pembicara akan menyatakan kembali poin-poin utama sebelum menutup.' },
    { q: 'If a stakeholder says something vague, which is the BEST response?', opts: ['Ignore it.', 'Agree immediately.', 'If I understand correctly, you are suggesting that...?', 'Tell them they are wrong.'], ans: 'If I understand correctly, you are suggesting that...?', exp: '"If I understand correctly" memverifikasi pemahaman Anda sebelum merespons, menghindari kesalahpahaman.' },
    { q: '"In light of the evidence" signals that your conclusion is ___', opts: ['Based on random guessing', 'Supported by available data or research', 'Purely emotional', 'Unsupported'], ans: 'Supported by available data or research', exp: '"In light of the evidence" menekankan bahwa kesimpulan Anda didasarkan pada bukti yang tersedia.' },
    { q: 'When presenting in English, how should you structure your main points?', opts: ['Randomly and without order', 'With a clear introduction, signposting, and conclusion', 'Without any signposting or transitions', 'Only with bullet points read aloud'], ans: 'With a clear introduction, signposting, and conclusion', exp: 'Presentasi B2 efektif: pembuka jelas, penanda jalan (signposting), isi terstruktur, dan penutup yang kuat.' },
    { q: 'Which phrase helps maintain your speaking turn politely?', opts: ['Wait, let me finish!', 'If I may continue...', 'Shh!', 'Be quiet please.'], ans: 'If I may continue...', exp: '"If I may continue" adalah cara sopan dan formal untuk meminta ruang untuk menyelesaikan poin Anda.' },
    { q: '"That\'s an interesting perspective" is best followed by ___', opts: ['...and I completely agree.', '...and I have nothing to add.', '...though I think we should also consider X.', '...goodbye.'], ans: '...though I think we should also consider X.', exp: 'Mengakui perspektif orang lain lalu memperluas diskusi dengan "we should also consider" menunjukkan engagement yang baik.' },
    { q: 'Effective B2 discussion participants ___', opts: ['Only talk and never listen', 'Listen actively, build on others\' ideas, and take balanced turns', 'Dominate the conversation entirely', 'Avoid all opinions'], ans: 'Listen actively, build on others\' ideas, and take balanced turns', exp: 'Peserta diskusi yang baik di B2 menunjukkan kemampuan mendengar aktif, membangun argumen kolaboratif, dan bergilir dengan seimbang.' },
  ];
}

function buildFile(id, spec) {
  const nextId = id < 20 ? id + 1 : null;
  const nextPath = nextId ? '/modul/english/upper-intermediate/speaking/lesson-' + nextId : '/modul/english/upper-intermediate/speaking';
  const sections = spec.sections || fallbackSections(spec.title);
  const quiz = spec.quiz || fallbackSpeakingQuiz(spec.title);
  const subtitle = spec.subtitle || spec.title;

  const sectionsData = JSON.stringify(sections, null, 2);
  const quizData = JSON.stringify(quiz, null, 2);

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonShell from '../../../../../components/shared/LessonShell';
import { BookOpen, PenTool, CheckCircle2, XCircle, Star, Mic2, MessageCircle } from 'lucide-react';
import { playAudio } from '../../../../../services/ttsService';
import { useLessonCompletion } from '../../../../../components/shared/lessonCompletion';
import LessonCompleteModal from '../../../../../components/shared/LessonCompleteModal';

interface SpeakingItem { phrase: string; usage: string; }
interface SpeakingSection { name: string; icon: string; items: SpeakingItem[]; }
interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

const SECTIONS: SpeakingSection[] = ${sectionsData};
const QUIZ: QuizItem[] = ${quizData};

const UpperInterSpeakingLesson${id}: React.FC = () => {
  const navigate = useNavigate();
  const { isCompleted, showCompleteModal, setShowCompleteModal, handleSelesai } = useLessonCompletion('upper_intermediate_speaking', ${id});
  const nextLessonPath = '${nextPath}';

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
        lessonLabel="Upper-Intermediate Speaking Lesson ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLessonPath={nextLessonPath}
        onNext={() => { setShowCompleteModal(false); navigate(nextLessonPath); }}
        onBack={() => { setShowCompleteModal(false); navigate(-1); }}
      />
      <LessonShell
        title="${spec.title}"
        subtitle="Speaking B2 • Pelajaran ${id}"
        accentColor="${ACCENT_COLOR}"
        nextLesson={nextLessonPath}
        tabs={[
          { id: 'learn', label: 'Frasa & Teknik', icon: <BookOpen size={14} /> },
          { id: 'practice', label: 'Latihan Soal', icon: <PenTool size={14} /> }
        ]}
        footer={() => (
          <button
            onClick={isCompleted ? () => navigate(-1) : handleSelesai}
            className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#26C76D,#1ea85a)' : 'linear-gradient(135deg,${ACCENT_COLOR},#145A32)' }}
          >
            <CheckCircle2 size={18} />
            {isCompleted ? 'Sudah Selesai ✓' : 'Selesai & Simpan Progress'}
          </button>
        )}
      >
        {(tabId) => {
          if (tabId === 'learn') return (
            <div className="space-y-6 animate-fade-in p-4">
              <div className="rounded-3xl p-6 text-white shadow-xl relative overflow-hidden" style={{background:'linear-gradient(135deg,${ACCENT_COLOR},#0B5345)'}}>
                <div className="text-3xl mb-2">🎙️</div>
                <h2 className="text-xl font-extrabold mb-1">${spec.title}</h2>
                <p className="text-sm opacity-90">${subtitle}</p>
                <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🗣️ CEFR B2 · Speaking</div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {SECTIONS.map((s, i) => (
                  <button key={i} onClick={() => setActiveSection(i)}
                    className={'px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ' + (activeSection === i ? 'text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200')}
                    style={activeSection === i ? {backgroundColor:'${ACCENT_COLOR}'} : {}}>
                    {s.icon} {s.name}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {SECTIONS[activeSection].items.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
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

              <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
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
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
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
                        let cls = 'border-slate-200 hover:border-green-300 hover:bg-green-50';
                        if (isAnswerChecked) {
                          if (opt === QUIZ[quizStep].ans) cls = 'bg-green-50 border-green-500 text-green-800';
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
                    <button onClick={restartQuiz} className="px-8 py-3 text-white rounded-xl font-bold" style={{backgroundColor:'${ACCENT_COLOR}'}}>Ulangi Kuis</button>
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

export default UpperInterSpeakingLesson${id};
`;
}

console.log('Building Upper-Intermediate Speaking (B2) lessons...');
const ALL_LESSONS = [...LESSONS, ...SPEAKING_TOPICS];
for (let id = 1; id <= 20; id++) {
  const spec = ALL_LESSONS.find(l => l.id === id) || { id, title: `Speaking Lesson ${id}`, subtitle: 'B2 Speaking Practice' };
  const code = buildFile(id, spec);
  fs.writeFileSync(path.join(OUT_DIR, `Lesson${id}.tsx`), code, 'utf8');
  console.log(`✅ Speaking Lesson${id}.tsx`);
}
console.log('🚀 All 20 Upper-Intermediate Speaking lessons built!');
