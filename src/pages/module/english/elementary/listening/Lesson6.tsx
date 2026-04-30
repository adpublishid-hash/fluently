import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Nina', text: 'Hello, I\'d like to book two tickets to Paris for next Friday, please.', translation: 'Halo, saya ingin memesan dua tiket ke Paris untuk Jumat depan.', avatar: '👩' },
  { speaker: 'Agent', text: 'Certainly. Would you prefer a morning or afternoon departure?', translation: 'Tentu. Apakah Anda lebih suka keberangkatan pagi atau sore?', avatar: '🧑' },
  { speaker: 'Nina', text: 'Morning, please. And I\'d prefer a window seat if possible.', translation: 'Pagi, tolong. Dan saya lebih suka kursi jendela jika memungkinkan.', avatar: '👩' },
  { speaker: 'Agent', text: 'We have a flight at eight forty-five. It arrives in Paris at eleven thirty local time.', translation: 'Kami punya penerbangan jam 8.45. Tiba di Paris jam 11.30 waktu setempat.', avatar: '🧑' },
  { speaker: 'Nina', text: 'Perfect. How much is the ticket? And is luggage included?', translation: 'Sempurna. Berapa harga tiketnya? Dan apakah bagasi sudah termasuk?', avatar: '👩' },
  { speaker: 'Agent', text: 'The ticket is two hundred euros per person. One bag up to twenty kilos is included free of charge.', translation: 'Tiketnya 200 euro per orang. Satu tas hingga 20 kilo sudah termasuk gratis.', avatar: '🧑' },
  { speaker: 'Nina', text: 'Great! Can I choose my seat now?', translation: 'Bagus! Bisakah saya memilih kursi sekarang?', avatar: '👩' },
  { speaker: 'Agent', text: 'Yes, of course. Please check in online at least two hours before departure to confirm your seat.', translation: 'Ya, tentu saja. Silakan check-in online setidaknya dua jam sebelum keberangkatan untuk konfirmasi kursi Anda.', avatar: '🧑' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I\'d like to ___ two tickets to Paris.', blank: 'book', opts: ['book', 'buy', 'order', 'get'], hint: 'Memesan tiket = ___ tickets' },
  { sentence: 'Would you prefer a morning or afternoon ___?', blank: 'departure', opts: ['departure', 'arrival', 'flight', 'seat'], hint: 'Keberangkatan = ___' },
  { sentence: 'I\'d prefer a ___ seat if possible.', blank: 'window', opts: ['window', 'aisle', 'front', 'back'], hint: 'Kursi di sisi jendela = ___ seat' },
  { sentence: 'One bag ___ to twenty kilos is included.', blank: 'up', opts: ['up', 'down', 'until', 'under'], hint: 'Hingga/sampai = ___ to' },
  { sentence: 'Please check in ___ at least two hours before departure.', blank: 'online', opts: ['online', 'early', 'now', 'quickly'], hint: 'Check-in melalui internet = check in ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"I\'d like to book two tickets." artinya...', opts: ['Saya sudah punya tiket.', 'Saya ingin memesan dua tiket.', 'Tolong carikan tiket.', 'Berapa harga dua tiket?'], ans: 'Saya ingin memesan dua tiket.', exp: '"Book" dalam konteks ini = memesan (reservasi).' },
  { q: '"Departure" artinya...', opts: ['Kedatangan', 'Keberangkatan', 'Terminal', 'Penerbangan'], ans: 'Keberangkatan', exp: '"Departure" = keberangkatan. Lawan kata: "Arrival" = kedatangan.' },
  { q: '"Window seat" artinya...', opts: ['Kursi aisle', 'Kursi tengah', 'Kursi jendela', 'Kursi depan'], ans: 'Kursi jendela', exp: '"Window seat" = kursi di sisi jendela pesawat.' },
  { q: 'Penerbangan berangkat jam...', opts: ['07.45', '08.00', '08.45', '09.15'], ans: '08.45', exp: '"Eight forty-five" = 8:45.' },
  { q: 'Penerbangan tiba di Paris jam...', opts: ['10.30', '11.00', '11.30', '12.00'], ans: '11.30', exp: '"Eleven thirty" = 11:30.' },
  { q: 'Harga tiket per orang...', opts: ['150 euro', '200 euro', '250 euro', '300 euro'], ans: '200 euro', exp: '"Two hundred euros per person" = 200 euro per orang.' },
  { q: '"Free of charge" artinya...', opts: ['Berbayar', 'Gratis', 'Diskon', 'Ekstra biaya'], ans: 'Gratis', exp: '"Free of charge" = gratis, tanpa biaya tambahan.' },
  { q: 'Berat bagasi yang diizinkan gratis...', opts: ['15 kg', '20 kg', '25 kg', '30 kg'], ans: '20 kg', exp: '"Up to twenty kilos" = hingga 20 kilogram.' },
  { q: '"Check in online" berarti...', opts: ['Check-in di bandara', 'Check-in melalui aplikasi/website', 'Check-in via telepon', 'Check-in lebih awal'], ans: 'Check-in melalui aplikasi/website', exp: '"Online check-in" = proses check-in melalui internet/aplikasi.' },
  { q: '"At least two hours before departure" artinya...', opts: ['Tepat 2 jam sebelum berangkat', 'Setidaknya 2 jam sebelum berangkat', 'Setelah 2 jam berangkat', 'Kurang dari 2 jam'], ans: 'Setidaknya 2 jam sebelum berangkat', exp: '"At least" = setidaknya, minimal.' },
  { q: '"Local time" artinya...', opts: ['Waktu internasional', 'Waktu setempat', 'Waktu standar', 'Waktu penerbangan'], ans: 'Waktu setempat', exp: '"Local time" = waktu di zona waktu tujuan (setempat).' },
  { q: '"Is luggage included?" artinya...', opts: ['Apakah bagasi gratis?', 'Apakah bagasi termasuk dalam harga?', 'Berapa biaya bagasi?', 'Di mana saya menaruh bagasi?'], ans: 'Apakah bagasi termasuk dalam harga?', exp: '"Included" = sudah termasuk. "Luggage" = bagasi.' },
  { q: '"Would you prefer...?" adalah cara...', opts: ['Memberi perintah', 'Menanyakan preferensi/pilihan', 'Menyatakan fakta', 'Meminta maaf'], ans: 'Menanyakan preferensi/pilihan', exp: '"Would you prefer A or B?" = menanyakan pilihan dengan sopan.' },
  { q: '"If possible" artinya...', opts: ['Tidak bisa', 'Jika memungkinkan', 'Sebaiknya', 'Seharusnya'], ans: 'Jika memungkinkan', exp: '"If possible" = jika bisa/memungkinkan (menambahkan permintaan dengan sopan).' },
  { q: '"Per person" artinya...', opts: ['Per penerbangan', 'Per tiket', 'Per orang', 'Per grup'], ans: 'Per orang', exp: '"Per person" = untuk setiap orang/per kepala.' },
  { q: '"Certaintly!" dalam konteks pelayanan berarti...', opts: ['Tidak bisa.', 'Mungkin.', 'Tentu saja, dengan senang hati.', 'Mohon tunggu.'], ans: 'Tentu saja, dengan senang hati.', exp: '"Certainly!" = tentu saja (ekspresi profesional staf layanan).' },
  { q: 'Nina memesan berapa tiket?', opts: ['1', '2', '3', '4'], ans: '2', exp: '"I\'d like to book two tickets." = dua tiket.' },
  { q: '"Confirm your seat" artinya...', opts: ['Memilih kursi baru', 'Mengkonfirmasi / memastikan kursi', 'Menukar kursi', 'Membatalkan kursi'], ans: 'Mengkonfirmasi / memastikan kursi', exp: '"Confirm" = mengkonfirmasi, memastikan.' },
  { q: '"Aisle seat" adalah kebalikan dari...', opts: ['Middle seat', 'Window seat', 'Front seat', 'Back seat'], ans: 'Window seat', exp: '"Aisle seat" = kursi lorong (dekat gang). Kebalikannya "window seat" = kursi jendela.' },
  { q: '"Please check in online at least two hours before departure." ini adalah...', opts: ['Pertanyaan', 'Instruksi/saran', 'Keluhan', 'Janji'], ans: 'Instruksi/saran', exp: '"Please + verb" = instruksi atau permintaan yang sopan.' },
];

export default function ElemListeningLesson6() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(6));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(6); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 6 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan pemesanan tiket & info perjalanan!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-7'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 7 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Perjalanan & Transport</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L6</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-7')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-teal-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>
              {tab === 'simak' ? '🎧 Simak' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-28 space-y-5">
            {activeTab === 'simak' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">✈️ Perjalanan & Transport</h2>
                  <p className="text-sm text-teal-100">Pahami percakapan memesan tiket pesawat: jadwal, harga, bagasi & check-in.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Book/Reserve',id:'Memesan'},{en:'Departure',id:'Keberangkatan'},{en:'Window seat',id:'Kursi jendela'},{en:'Luggage included',id:'Bagasi sudah termasuk'},{en:'Free of charge',id:'Gratis'},{en:'Online check-in',id:'Check-in online'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Memesan Tiket Pesawat" lines={DIALOGUE} />
              </>
            )}
            {activeTab === 'latihan' && <FillBlankExercise items={BLANKS} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
