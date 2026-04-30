import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, PostcardWriter, HotelForm } from './writingUtils';
import type { QuizItem, FormField } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const QUIZ: QuizItem[] = [
  { q: '"Sekolah" dalam bahasa Inggris?', opts: ['school', 'hospital', 'office'], ans: 'school', exp: '"School" = sekolah.' },
  { q: '"Saya berada di sekolah." ditulis...', opts: ['I am in school.', 'I am at school.', 'I am on school.'], ans: 'I am at school.', exp: '"At school" untuk tempat spesifik.' },
  { q: '"Belok kiri" dalam bahasa Inggris?', opts: ['Turn right', 'Go straight', 'Turn left'], ans: 'Turn left', exp: '"Turn left" = belok kiri.' },
  { q: '"Rumah sakit" dalam bahasa Inggris?', opts: ['hotel', 'hospital', 'home'], ans: 'hospital', exp: '"Hospital" = rumah sakit.' },
  { q: '"Lurus terus" dalam bahasa Inggris?', opts: ['Turn right', 'Go straight', 'Move forward'], ans: 'Go straight', exp: '"Go straight" = lurus terus.' },
  { q: '"Di mana ___?" ditulis...', opts: ['Where is ___?', 'What is ___?', 'Where ___?'], ans: 'Where is ___?', exp: '"Where is ...?" = Di mana ...?' },
  { q: '"Taman" dalam bahasa Inggris?', opts: ['garden', 'park', 'yard'], ans: 'park', exp: '"Park" = taman umum.' },
  { q: '"Di sebelah kanan" dalam bahasa Inggris?', opts: ['on the right', 'at the right', 'in the right'], ans: 'on the right', exp: '"On the right" = di sebelah kanan.' },
  { q: '"Perpustakaan" dalam bahasa Inggris?', opts: ['bookstore', 'library', 'bookshop'], ans: 'library', exp: '"Library" = perpustakaan.' },
  { q: '"It is near the school." artinya?', opts: ['Itu jauh dari sekolah.', 'Itu di dalam sekolah.', 'Itu dekat sekolah.'], ans: 'Itu dekat sekolah.', exp: '"Near" = dekat.' },
  { q: '"Restoran" dalam bahasa Inggris?', opts: ['cafe', 'restaurant', 'canteen'], ans: 'restaurant', exp: '"Restaurant" = restoran.' },
  { q: '"Belok kanan" dalam bahasa Inggris?', opts: ['Turn left', 'Turn right', 'Go straight'], ans: 'Turn right', exp: '"Turn right" = belok kanan.' },
  { q: '"Bandara" dalam bahasa Inggris?', opts: ['station', 'port', 'airport'], ans: 'airport', exp: '"Airport" = bandara.' },
  { q: '"Pasar" dalam bahasa Inggris?', opts: ['shop', 'store', 'market'], ans: 'market', exp: '"Market" = pasar.' },
  { q: '"Saya tinggal di Jakarta." ditulis...', opts: ['I live at Jakarta.', 'I live in Jakarta.', 'I am live Jakarta.'], ans: 'I live in Jakarta.', exp: '"In" digunakan untuk kota/negara.' },
  { q: '"Where do you live?" artinya?', opts: ['Di mana kamu?', 'Di mana kamu tinggal?', 'Ke mana kamu pergi?'], ans: 'Di mana kamu tinggal?', exp: '"Where do you live?" = Di mana kamu tinggal?' },
  { q: '"at the bank" artinya?', opts: ['di dalam bank', 'di bank', 'ke bank'], ans: 'di bank', exp: '"at the bank" = di bank (preposisi lokasi "at").' },
  { q: '"It is far from here." artinya?', opts: ['Itu dekat dari sini.', 'Itu jauh dari sini.', 'Itu di sini.'], ans: 'Itu jauh dari sini.', exp: '"Far from" = jauh dari.' },
  { q: '"in" digunakan untuk...', opts: ['titik spesifik', 'dalam area/kota', 'di permukaan'], ans: 'dalam area/kota', exp: '"in Jakarta", "in the room" — untuk area yang lebih besar.' },
  { q: '"at" digunakan untuk...', opts: ['titik spesifik/tempat', 'dalam area', 'di atas permukaan'], ans: 'titik spesifik/tempat', exp: '"at school", "at the bank" — untuk lokasi spesifik.' },
];

/* ─── HOTEL FORM ─── */
const HOTEL_FIELDS: FormField[] = [
  { id: 'full_name', label: 'Full Name (Nama Lengkap)', placeholder: 'e.g. SANTOSO BUDI', required: true, hint: 'Tulis nama lengkap dengan huruf kapital.' },
  { id: 'nationality', label: 'Nationality (Kewarganegaraan)', placeholder: 'e.g. Indonesian', required: true, options: ['Indonesian', 'Malaysian', 'Singaporean', 'American', 'British', 'Australian', 'Japanese', 'Korean', 'Other'], hint: 'Pilih kewarganegaraanmu.' },
  { id: 'address', label: 'Home Address (Alamat Asal)', placeholder: 'e.g. Jl. Sudirman No. 10, Surabaya', required: true },
  { id: 'city', label: 'City & Country (Kota & Negara)', placeholder: 'e.g. Surabaya, Indonesia', required: true },
  { id: 'id_number', label: 'ID / Passport Number', placeholder: 'e.g. A1234567', required: true, hint: 'Nomor KTP atau paspor.' },
  { id: 'check_in', label: 'Check-in Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'check_out', label: 'Check-out Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
  { id: 'room_type', label: 'Room Type', placeholder: 'Select room', options: ['Single Room', 'Double Room', 'Twin Room', 'Deluxe Suite'], required: true },
  { id: 'purpose', label: 'Purpose of Visit', placeholder: 'Select...', options: ['Holiday / Tourism', 'Business', 'Education', 'Family Visit', 'Other'] },
];

/* ─── POSTCARD FIELDS ─── */
const POSTCARD_FIELDS = [
  { id: 'greeting', label: 'Greeting', placeholder: 'e.g. Dear Mom, / Hi Desti!', hint: 'Sapa penerimamu terlebih dahulu.' },
  { id: 'opening', label: 'Opening (Di mana & bagaimana?)', placeholder: 'e.g. I am now in Yogyakarta! The city is amazing.', hint: 'Ceritakan di mana kamu sekarang.' },
  { id: 'highlight', label: 'Highlight (Aktivitas terbaik)', placeholder: 'e.g. Yesterday, I visited Borobudur temple. It is very old and beautiful.', multiline: true, hint: 'Ceritakan hal menarik yang kamu lakukan.' },
  { id: 'closing', label: 'Closing (Salam penutup)', placeholder: 'e.g. Miss you! / Wish you were here!', hint: 'Tutup dengan salam hangat.' },
  { id: 'signature', label: 'Your Name', placeholder: 'e.g. Rizky' },
  { id: 'to_name', label: 'To (Nama Penerima)', placeholder: 'e.g. Desti Wulandari' },
  { id: 'to_address', label: 'Address', placeholder: 'e.g. Jl. Kenanga No. 12, Medan' },
  { id: 'to_city', label: 'City & Zip', placeholder: 'e.g. Medan, 20111, Indonesia' },
];

const POSTCARD_EXAMPLE = {
  greeting: 'Hi Desti!',
  opening: 'I am now in Yogyakarta! This city is amazing and full of culture.',
  highlight: 'Yesterday, I visited Borobudur Temple. It is very old and beautiful. There are many stone statues and the view from the top is incredible. Today, I am going to Prambanan Temple.',
  closing: 'Wish you were here! Missing you,',
  signature: 'Rizky',
  to_name: 'Desti Wulandari',
  to_address: 'Jl. Kenanga No. 12, Medan Baru',
  to_city: 'Medan, 20111, Indonesia',
};

const WritingLesson9: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-10';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(9));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'kartupos' | 'hotel' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(9); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 9 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis kartu pos & mengisi formulir hotel!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 10 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Tempat, Kartu Pos & Hotel</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 9</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>
        {/* 4 tabs */}
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm overflow-x-auto">
          {([['learn', '📖'], ['kartupos', '📮 Kartu Pos'], ['hotel', '🏨 Hotel'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all whitespace-nowrap px-2 ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Tempat, Kartu Pos & Hotel</h2><p className="text-sm text-amber-100">Lesson paling LENGKAP! Kamu akan menulis <b>kartu pos liburan</b> dan mengisi <b>formulir registrasi hotel</b> secara nyata!</p></div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-extrabold text-slate-800 mb-3 text-sm">📍 Tempat-tempat Umum</h3>
                  <div className="grid grid-cols-2 gap-2">{[{en:'school',id:'sekolah',icon:'🏫'},{en:'hospital',id:'rumah sakit',icon:'🏥'},{en:'market',id:'pasar',icon:'🛒'},{en:'park',id:'taman',icon:'🌳'},{en:'library',id:'perpustakaan',icon:'📚'},{en:'airport',id:'bandara',icon:'✈️'},{en:'restaurant',id:'restoran',icon:'🍽️'},{en:'hotel',id:'hotel',icon:'🏨'}].map(p=>(<div key={p.en} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-2.5"><span className="text-2xl">{p.icon}</span><div><p className="text-sm font-bold text-slate-800">{p.en}</p><p className="text-xs text-slate-400">{p.id}</p></div></div>))}</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4"><h3 className="font-bold text-blue-800 mb-2 text-sm">🗺️ Petunjuk Arah</h3><ul className="text-sm text-blue-700 space-y-1"><li>⬅️ Turn left — belok kiri</li><li>➡️ Turn right — belok kanan</li><li>⬆️ Go straight — lurus terus</li><li>📍 It is near ___ — Itu dekat dengan ___</li><li>🏁 It is on the right/left — Itu di sebelah kanan/kiri</li></ul></div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setActiveTab('kartupos')} className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center hover:border-amber-400 transition-all">
                    <span className="text-3xl block mb-2">📮</span><p className="text-sm font-bold text-amber-800">Tulis Kartu Pos Liburan</p>
                  </button>
                  <button onClick={() => setActiveTab('hotel')} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-center hover:border-amber-400 transition-all">
                    <span className="text-3xl block mb-2">🏨</span><p className="text-sm font-bold text-slate-700">Isi Formulir Hotel</p>
                  </button>
                </div>
              </>
            )}
            {activeTab === 'kartupos' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
                  <p className="font-bold mb-1">🎯 Situasi:</p>
                  <p>Kamu sedang liburan ke Yogyakarta. Kirim kartu pos ke sahabatmu di kota lain! Ceritakan tempat yang kamu kunjungi.</p>
                </div>
                <PostcardWriter title="Kartu Pos Liburan — Yogyakarta 🏯" stamp="🏯" to="Sahabatmu" fields={POSTCARD_FIELDS} example={POSTCARD_EXAMPLE} />
              </div>
            )}
            {activeTab === 'hotel' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
                  <p className="font-bold mb-1">🎯 Situasi:</p>
                  <p>Kamu check-in di Hotel Malioboro, Yogyakarta. Resepsionis memintamu mengisi formulir tamu. Gunakan data pribadi yang benar!</p>
                </div>
                <HotelForm title="Hotel Malioboro — Guest Check-in" subtitle="Yogyakarta's Premier Hotel | Please complete all fields (*)" fields={HOTEL_FIELDS} />
              </div>
            )}
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

export default WritingLesson9;
