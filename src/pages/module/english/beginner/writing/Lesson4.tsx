import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, HotelForm } from './writingUtils';
import type { QuizItem, FormField } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

/* ─── HOTEL INTRO FORM FIELDS ─── */
const HOTEL_FIELDS: FormField[] = [
  { id: 'full_name', label: 'Full Name', placeholder: 'e.g. Budi Santoso', required: true, hint: 'Tulis nama lengkap dengan huruf kapital di setiap kata.' },
  { id: 'nationality', label: 'Nationality (Kewarganegaraan)', placeholder: 'e.g. Indonesian', required: true, options: ['Indonesian', 'Malaysian', 'Singaporean', 'American', 'British', 'Australian', 'Japanese', 'Korean', 'German', 'French', 'Other'], hint: 'Pilih kewarganegaraanmu.' },
  { id: 'dob', label: 'Date of Birth (Tanggal Lahir)', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'address', label: 'Home Address (Alamat Rumah)', placeholder: 'e.g. Jl. Sudirman No. 5, Jakarta', required: true, hint: 'Tuliskan nama jalan, nomor, dan kota.' },
  { id: 'email', label: 'Email Address', placeholder: 'e.g. budi@example.com', type: 'email' },
  { id: 'phone', label: 'Phone Number', placeholder: 'e.g. +62 812 3456 7890' },
  { id: 'check_in', label: 'Check-in Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'check_out', label: 'Check-out Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'room_type', label: 'Room Type', placeholder: 'Select room type', options: ['Single Room', 'Double Room', 'Twin Room', 'Suite'], required: true },
];

/* ─── INTRO TEMPLATES ─── */
const TEMPLATES = [
  { label: 'Nama', template: 'My name is ___.' },
  { label: 'Asal', template: 'I am from ___ (kota), ___ (negara).' },
  { label: 'Umur', template: 'I am ___ years old.' },
  { label: 'Pekerjaan', template: 'I am a ___.' },
  { label: 'Hobi', template: 'I like ___.' },
];

/* ─── QUIZ ─── */
const QUIZ: QuizItem[] = [
  { q: '"Saya berusia 17 tahun." ditulis...', opts: ['I am 17 age.', 'I have 17 years.', 'I am 17 years old.'], ans: 'I am 17 years old.', exp: 'Pola: I am + umur + years old.' },
  { q: '"Saya seorang pelajar." ditulis...', opts: ['I student.', 'I am student.', 'I am a student.'], ans: 'I am a student.', exp: 'Gunakan "a" sebelum profesi tunggal.' },
  { q: '"Saya dari Bandung." ditulis...', opts: ['I from Bandung.', 'I at Bandung.', 'I am from Bandung.'], ans: 'I am from Bandung.', exp: '"I am from + kota/negara" untuk asal.' },
  { q: '"Nama saya Rina." ditulis...', opts: ['Name me is Rina.', 'I name Rina.', 'My name is Rina.'], ans: 'My name is Rina.', exp: '"My name is + nama" adalah pola yang benar.' },
  { q: '"Nice to meet you" artinya...', opts: ['Senang bertemu denganmu', 'Apa kabar?', 'Sampai jumpa'], ans: 'Senang bertemu denganmu', exp: '"Nice to meet you" = Senang berkenalan.' },
  { q: '"I like + ___" diikuti oleh...', opts: ['verb (kata kerja biasa)', 'adjective saja', 'noun atau verb+ing'], ans: 'noun atau verb+ing', exp: '"I like football" atau "I like playing football".' },
  { q: '"What is your name?" artinya...', opts: ['Di mana kamu?', 'Berapa umurmu?', 'Siapa namamu?'], ans: 'Siapa namamu?', exp: '"What is your name?" = Siapa namamu?' },
  { q: '"Where are you from?" artinya...', opts: ['Di mana kamu?', 'Ke mana kamu pergi?', 'Dari mana asalmu?'], ans: 'Dari mana asalmu?', exp: '"Where are you from?" = Dari mana asalmu?' },
  { q: '"How old are you?" artinya...', opts: ['Seberapa tinggi?', 'Bagaimana kabarmu?', 'Berapa umurmu?'], ans: 'Berapa umurmu?', exp: '"How old are you?" = Berapa umurmu?' },
  { q: '"I am a doctor." Profesi dalam kalimat ini?', opts: ['am', 'doctor', 'I'], ans: 'doctor', exp: '"Doctor" adalah profesi. "a" adalah artikel.' },
  { q: 'Untuk menyebutkan hobi, pola yang benar...', opts: ['I like + noun/verb-ing', 'I am like + verb', 'I likes + verb'], ans: 'I like + noun/verb-ing', exp: '"I like swimming" atau "I like music."' },
  { q: '"Kewarganegaraan Indonesia" dalam bahasa Inggris...', opts: ['Indonesia', 'Indonesians', 'Indonesian'], ans: 'Indonesian', exp: 'Kewarganegaraan: Indonesian, Malaysian, etc. (pakai -an).' },
  { q: '"Saya lahir di Surabaya." ditulis...', opts: ['I born in Surabaya.', 'I was born in Surabaya.', 'I am born in Surabaya.'], ans: 'I was born in Surabaya.', exp: '"I was born in + kota" adalah pola yang benar.' },
  { q: '"My hobby is reading." artinya...', opts: ['Aku suka membaca.', 'Saya membaca buku.', 'Hobiku adalah membaca.'], ans: 'Hobiku adalah membaca.', exp: '"My hobby is + verb-ing" = hobiku adalah...' },
  { q: 'Date of Birth (DOB) artinya...', opts: ['Tanggal kematian', 'Tanggal lahir', 'Tanggal pernikahan'], ans: 'Tanggal lahir', exp: 'DOB = Date of Birth = Tanggal lahir.' },
  { q: '"Nationality" dalam bahasa Indonesia artinya...', opts: ['Negara', 'Alamat', 'Kewarganegaraan'], ans: 'Kewarganegaraan', exp: '"Nationality" = kewarganegaraan (misal: Indonesian, British).' },
  { q: '"Address" dalam formulir hotel artinya...', opts: ['Alamat', 'Tanggal check-in', 'Nama lengkap'], ans: 'Alamat', exp: '"Address" = alamat tempat tinggal.' },
  { q: 'Kalimat perkenalan yang BENAR...', opts: ['Me name is Sari.', 'My name is Sari.', 'I am name Sari.'], ans: 'My name is Sari.', exp: '"My name is + nama" adalah satu-satunya yang benar.' },
  { q: '"I am interested in music." artinya...', opts: ['Saya pandai bermain musik.', 'Saya belajar musik.', 'Saya tertarik dengan musik.'], ans: 'Saya tertarik dengan musik.', exp: '"I am interested in + noun" = Saya tertarik dengan...' },
  { q: '"Room type" dalam formulir hotel artinya...', opts: ['Nama rumahmu', 'Tipe kamarmu', 'Nomor kamarmu'], ans: 'Tipe kamarmu', exp: '"Room type" = jenis kamar (Single, Double, Suite, etc.).' },
];

/* ─── WRITING SECTION ─── */
function WritingPractice() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Mini free writing */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📝</span>
          <h2 className="text-base font-extrabold text-slate-800">Tulis Perkenalanmu</h2>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <p className="text-sm text-slate-500">Lengkapi kalimat-kalimat berikut tentang dirimu sendiri:</p>
          {TEMPLATES.map(t => (
            <div key={t.label} className="space-y-1">
              <label className="text-xs font-bold text-amber-700">{t.label}</label>
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                <span className="text-xs text-slate-400 font-mono shrink-0">{t.template.split('___')[0]}</span>
                <input type="text" value={answers[t.label] ?? ''} onChange={e => setAnswers(p => ({ ...p, [t.label]: e.target.value }))} placeholder="isi di sini..." className="flex-1 bg-transparent text-sm focus:outline-none text-slate-700" />
                {t.template.split('___')[1] && <span className="text-xs text-slate-400 font-mono shrink-0">{t.template.split('___').slice(1).join('')}</span>}
              </div>
            </div>
          ))}
          <div className="mt-2 pt-3 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 mb-2">Pratinjau Perkenalan Lengkap:</p>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800 min-h-[60px] font-medium italic leading-relaxed">
              {Object.values(answers).filter(Boolean).length > 0
                ? TEMPLATES.filter(t => answers[t.label]).map(t => t.template.replace('___', answers[t.label] ?? '___').replace('___', answers[t.label+'2'] ?? '___')).join(' ')
                : 'Perkenalan kamu akan muncul di sini...'}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Form Intro */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🏨</span>
          <h2 className="text-base font-extrabold text-slate-800">Formulir Registrasi Hotel</h2>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 text-sm text-amber-800">
          <p className="font-bold mb-1">🎯 Situasi:</p>
          <p>Kamu baru tiba di sebuah hotel di Bali. Resepsionis memintamu mengisi formulir tamu. Isi formulir di bawah ini dengan data pribadi yang benar!</p>
        </div>
        <HotelForm
          title="Grand Bali Hotel — Guest Registration"
          subtitle="Welcome! Please complete all required fields (*)"
          fields={HOTEL_FIELDS}
        />
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
const WritingLesson4: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-5';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(4));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');

  const handleComplete = () => { markWritingComplete(4); setIsCompleted(true); setShowModal(true); };

  const VOCAB = [
    { en: 'Full Name', id: 'Nama Lengkap' }, { en: 'Date of Birth', id: 'Tanggal Lahir' },
    { en: 'Nationality', id: 'Kewarganegaraan' }, { en: 'Address', id: 'Alamat' },
    { en: 'Occupation', id: 'Pekerjaan' }, { en: 'Email Address', id: 'Alamat Email' },
    { en: 'Phone Number', id: 'Nomor Telepon' }, { en: 'Check-in Date', id: 'Tanggal Masuk' },
    { en: 'Check-out Date', id: 'Tanggal Keluar' }, { en: 'Room Type', id: 'Tipe Kamar' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 4 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis perkenalan & isi formulir hotel!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 5 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800">Perkenalan & Formulir Hotel</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 4</p>
            </div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Formulir'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">

            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Perkenalan Diri & Formulir Hotel</h2>
                  <p className="text-sm text-amber-100">Di lesson ini kamu belajar dua hal penting: <b>menulis perkenalan diri</b> dan <b>mengisi formulir registrasi hotel</b> — keahlian yang sangat berguna saat traveling!</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 mb-3">📋 Pola Perkenalan Diri</h3>
                  <div className="space-y-2.5">
                    {[
                      { pattern: 'My name is ___', use: 'Nama' },
                      { pattern: 'I am from ___ (city), ___ (country)', use: 'Asal' },
                      { pattern: 'I am ___ years old', use: 'Umur' },
                      { pattern: 'I am a ___', use: 'Profesi' },
                      { pattern: 'I like ___', use: 'Hobi' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                        <span className="text-xs font-bold text-amber-600 w-16 shrink-0">{p.use}</span>
                        <span className="text-sm font-mono text-slate-700">{p.pattern} .</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 mb-3">🏨 Kosakata Formulir Hotel</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {VOCAB.map(v => (
                      <div key={v.en} className="bg-amber-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-bold text-amber-800">{v.en}</p>
                        <p className="text-xs text-amber-600">{v.id}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-5 text-white">
                  <h3 className="font-bold text-amber-400 mb-3">📄 Contoh Perkenalan Lengkap</h3>
                  <p className="text-sm text-slate-200 italic leading-relaxed">"My name is Riko Pratama. I am from Yogyakarta, Indonesia. I am 22 years old. I am a college student. I like traveling and photography. Nice to meet you!"</p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-800">
                  <p className="font-bold mb-2">🎯 Setelah lesson ini kamu bisa:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>✦ Memperkenalkan diri secara tertulis</li>
                    <li>✦ Mengisi formulir registrasi hotel</li>
                    <li>✦ Memahami istilah-istilah dalam formulir</li>
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'menulis' && <WritingPractice />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#F39C12,#E67E22)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default WritingLesson4;
