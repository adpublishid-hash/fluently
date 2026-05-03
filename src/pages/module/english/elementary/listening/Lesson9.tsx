import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

/* PA Announcement + Voicemail treated as "dialogue" with narrator */
const DIALOGUE: DialogueLine[] = [
  { speaker: '📢 PA System', text: 'Attention all passengers. Flight BA207 to London is now boarding at Gate 14.', translation: 'Perhatian semua penumpang. Penerbangan BA207 ke London sekarang boarding di Gerbang 14.', avatar: '📢' },
  { speaker: '📢 PA System', text: 'Please have your boarding pass and passport ready for inspection.', translation: 'Silakan siapkan boarding pass dan paspor Anda untuk pemeriksaan.', avatar: '📢' },
  { speaker: '📢 PA System', text: 'Due to technical issues, the departure of flight BA207 will be delayed by thirty minutes.', translation: 'Karena masalah teknis, keberangkatan penerbangan BA207 akan tertunda tiga puluh menit.', avatar: '📢' },
  { speaker: '📢 PA System', text: 'We apologize for any inconvenience caused. Refreshments are available at the gate lounge.', translation: 'Kami memohon maaf atas ketidaknyamanan yang ditimbulkan. Minuman tersedia di lounge gerbang.', avatar: '📢' },
  { speaker: '📱 Voicemail', text: 'Hi, this is a message for Ms. Lopez. Your package has arrived at our delivery center.', translation: 'Hai, ini pesan untuk Ms. Lopez. Paket Anda telah tiba di pusat pengiriman kami.', avatar: '📱' },
  { speaker: '📱 Voicemail', text: 'Please collect it within five business days, or it will be returned to the sender.', translation: 'Silakan ambil dalam lima hari kerja, atau akan dikembalikan ke pengirim.', avatar: '📱' },
  { speaker: '📱 Voicemail', text: 'Please bring a valid photo ID when collecting. Our office is open Monday to Saturday, nine to six.', translation: 'Bawa kartu identitas foto yang valid saat mengambil. Kantor kami buka Senin-Sabtu, jam 9 sampai 6.', avatar: '📱' },
  { speaker: '📱 Voicemail', text: 'If you have any questions, please call us at 0800 123 456. Thank you and have a great day!', translation: 'Jika ada pertanyaan, hubungi kami di 0800 123 456. Terima kasih dan semoga harimu menyenangkan!', avatar: '📱' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'Flight BA207 is now ___ at Gate 14.', blank: 'boarding', opts: ['boarding', 'landing', 'departing', 'arriving'], hint: 'Penumpang masuk pesawat = ___' },
  { sentence: 'The departure will be ___ by thirty minutes.', blank: 'delayed', opts: ['delayed', 'cancelled', 'moved', 'changed'], hint: 'Tertunda = ___' },
  { sentence: 'We ___ for any inconvenience caused.', blank: 'apologize', opts: ['apologize', 'sorry', 'excuse', 'forgive'], hint: 'Formal "minta maaf" = ___' },
  { sentence: 'Please collect your package within five ___ days.', blank: 'business', opts: ['business', 'working', 'calendar', 'official'], hint: 'Hari kerja = ___ days' },
  { sentence: 'Bring a valid ___ ID when collecting.', blank: 'photo', opts: ['photo', 'digital', 'passport', 'official'], hint: 'ID yang ada fotonya = ___ ID' },
];

const QUIZ: QuizItem[] = [
  { q: '"Attention all passengers." adalah awal dari...', opts: ['Percakapan biasa', 'Pengumuman publik (PA Announcement)', 'Pesan voicemail', 'Instruksi tertulis'], ans: 'Pengumuman publik (PA Announcement)', exp: '"Attention all..." = umum di pengumuman PA (Public Address) di bandara, stasiun, dll.' },
  { q: '"Now boarding" artinya...', opts: ['Sudah boarding', 'Akan segera boarding', 'Sedang boarding sekarang', 'Boarding dibatalkan'], ans: 'Sedang boarding sekarang', exp: '"Now boarding" = proses boarding sedang berlangsung sekarang.' },
  { q: '"Gate 14" artinya...', opts: ['Nomor penerbangan', 'Gerbang/pintu masuk pesawat nomor 14', 'Nomor tiket', 'Terminal 14'], ans: 'Gerbang/pintu masuk pesawat nomor 14', exp: '"Gate" = gerbang di bandara tempat penumpang masuk ke pesawat.' },
  { q: '"Boarding pass" artinya...', opts: ['Paspor', 'Kartu naik pesawat', 'Tiket biasa', 'Kartu identitas'], ans: 'Kartu naik pesawat', exp: '"Boarding pass" = kartu yang digunakan untuk naik pesawat (bisa fisik atau digital).' },
  { q: '"Due to technical issues" artinya...', opts: ['Karena cuaca buruk', 'Karena masalah teknis', 'Karena terlalu banyak penumpang', 'Karena keterlambatan penerbangan sebelumnya'], ans: 'Karena masalah teknis', exp: '"Due to" = karena, disebabkan oleh. "Technical issues" = masalah teknis.' },
  { q: '"Delayed by thirty minutes" artinya...', opts: ['Dibatalkan', 'Dipercepat 30 menit', 'Tertunda 30 menit', 'Ditunda tanpa batas waktu'], ans: 'Tertunda 30 menit', exp: '"Delayed by [time]" = terlambat/tertunda sebanyak [waktu tersebut].' },
  { q: '"We apologize for any inconvenience caused." adalah...', opts: ['Pemberitahuan biasa', 'Permintaan maaf formal', 'Instruksi', 'Pertanyaan'], ans: 'Permintaan maaf formal', exp: '"We apologize for..." = kami memohon maaf atas... (bahasa formal/resmi).' },
  { q: '"Refreshments" artinya...', opts: ['Hiburan', 'Minuman dan makanan ringan', 'Fasilitas toilet', 'Informasi penerbangan'], ans: 'Minuman dan makanan ringan', exp: '"Refreshments" = minuman dan/atau makanan ringan (polite word).' },
  { q: '"Five business days" artinya...', opts: ['5 hari kalender', '5 hari kerja (Senin-Jumat)', '5 hari kerja termasuk akhir pekan', '5 minggu'], ans: '5 hari kerja (Senin-Jumat)', exp: '"Business days" = hari kerja yaitu Senin sampai Jumat.' },
  { q: '"It will be returned to the sender." artinya...', opts: ['Akan dikembalikan ke pembeli.', 'Akan dikembalikan ke pengirim.', 'Akan disimpan di kantor.', 'Akan dikirim ulang.'], ans: 'Akan dikembalikan ke pengirim.', exp: '"Sender" = pengirim. "Returned" = dikembalikan.' },
  { q: '"Valid photo ID" artinya...', opts: ['Foto profil', 'Kartu identitas foto yang masih berlaku', 'Paspor saja', 'Kartu kredit'], ans: 'Kartu identitas foto yang masih berlaku', exp: '"Valid" = masih berlaku/sah. "Photo ID" = KTP/SIM/paspor yang ada fotonya.' },
  { q: 'Kantor pengiriman buka dari hari...', opts: ['Senin-Jumat', 'Senin-Sabtu', 'Senin-Minggu', 'Selasa-Sabtu'], ans: 'Senin-Sabtu', exp: '"Open Monday to Saturday" = buka Senin sampai Sabtu.' },
  { q: 'Jam operasional kantor pengiriman adalah...', opts: ['08.00-17.00', '08.00-18.00', '09.00-17.00', '09.00-18.00'], ans: '09.00-18.00', exp: '"Nine to six" = jam 9 sampai jam 6 = 09.00-18.00.' },
  { q: '"Have your boarding pass ready." artinya...', opts: ['Tampilkan boarding pass Anda.', 'Siapkan boarding pass Anda.', 'Ambil boarding pass Anda.', 'Periksa boarding pass Anda.'], ans: 'Siapkan boarding pass Anda.', exp: '"Have something ready" = siapkan/persiapkan sesuatu agar dalam kondisi siap digunakan.' },
  { q: '"For inspection" artinya...', opts: ['Untuk disimpan', 'Untuk dijual', 'Untuk pemeriksaan', 'Untuk digunakan'], ans: 'Untuk pemeriksaan', exp: '"Inspection" = pemeriksaan, pengecekan oleh petugas.' },
  { q: '"Package" dalam konteks pengiriman artinya...', opts: ['Surat', 'Paket/kiriman', 'Dokumen', 'Uang'], ans: 'Paket/kiriman', exp: '"Package" = paket/kiriman yang dikirim melalui jasa pengiriman.' },
  { q: '"Please call us at 0800 123 456." nomor ini adalah...', opts: ['Nomor darurat', 'Nomor kantor pengiriman', 'Nomor maskapai', 'Nomor bandara'], ans: 'Nomor kantor pengiriman', exp: 'Konteks voicemail dari pusat pengiriman, jadi nomor telepon kantor pengiriman.' },
  { q: '"Collect" dalam konteks ini artinya...', opts: ['Mengumpulkan barang', 'Mengambil/mengambili kiriman', 'Membayar kiriman', 'Mengirim kembali'], ans: 'Mengambil/mengambili kiriman', exp: '"Collect a parcel/package" = mengambil kiriman di kantor pengiriman.' },
  { q: '"Have a great day!" adalah...', opts: ['Perintah', 'Ekspresi ucapan perpisahan/penutup yang ramah', 'Pertanyaan', 'Permintaan'], ans: 'Ekspresi ucapan perpisahan/penutup yang ramah', exp: '"Have a great day!" = semoga harimu menyenangkan! (ucapan penutup).' },
  { q: 'Paket milik...', opts: ['Ms. Harris', 'Ms. Chen', 'Ms. Lopez', 'Ms. Patel'], ans: 'Ms. Lopez', exp: '"This is a message for Ms. Lopez. Your package has arrived."' },
];

export default function ElemListeningLesson9() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(9));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(9); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 9 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami pengumuman & pesan voicemail dalam bahasa Inggris!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-10'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 10 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Pengumuman & Pesan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L9</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-10')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">📢 Pengumuman & Pesan</h2>
                  <p className="text-sm text-teal-100">Latihan memahami pengumuman bandara (PA) dan pesan voicemail singkat dalam konteks nyata.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Now boarding',id:'Sedang boarding'},{en:'Delayed by...',id:'Tertunda selama...'},{en:'We apologize',id:'Kami memohon maaf'},{en:'Business days',id:'Hari kerja'},{en:'Collect / Pick up',id:'Mengambil (kiriman)'},{en:'Valid ID',id:'ID yang masih berlaku'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Pengumuman Bandara & Voicemail Pengiriman" lines={DIALOGUE} />
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
