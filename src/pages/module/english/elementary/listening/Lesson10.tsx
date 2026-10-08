import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem } from './listeningUtils';

const QUIZ: QuizItem[] = [
  { q: '(L1) "How long have you been playing the guitar?" — struktur tense ini adalah...', opts: ['Present Perfect Continuous', 'Past Continuous', 'Present Perfect', 'Simple Past'], ans: 'Present Perfect Continuous', exp: '"How long have you been + -ing?" = Present Perfect Continuous untuk menanyakan durasi aktivitas yang masih berlangsung.' },
  { q: '(L1) "I enjoy hiking." — "enjoy" harus diikuti...', opts: ['hiking', 'hiked', 'hike', 'to hike'], ans: 'hiking', exp: '"Enjoy" + verb-ing (gerund). Contoh: enjoy swimming, enjoy cooking.' },
  { q: '(L2) "You must be the new manager." — "must be" di sini artinya...', opts: ['Kewajiban', 'Kesimpulan/kemungkinan logis', 'Permintaan', 'Rencana'], ans: 'Kesimpulan/kemungkinan logis', exp: '"Must" untuk kesimpulan = "pasti". Berbeda dengan "must" untuk kewajiban.' },
  { q: '(L2) "He is in a meeting now." — tense ini adalah...', opts: ['Present Continuous', 'Simple Present', 'Past Simple', 'Present Perfect'], ans: 'Present Continuous', exp: '"He is in a meeting" = sedang dalam rapat (keadaan saat ini = Present Continuous).' },
  { q: '(L3) Cara sopan meminta mencoba pakaian adalah...', opts: ['Give me the large.', 'Can I try the large?', 'Could I try the large, please?', 'I want large.'], ans: 'Could I try the large, please?', exp: '"Could I...?" + "please" = cara paling sopan untuk permintaan.' },
  { q: '(L3) "Full refund" artinya...', opts: ['Pengembalian sebagian uang', 'Kredit toko', 'Pengembalian 100% uang', 'Tukar barang'], ans: 'Pengembalian 100% uang', exp: '"Full" = penuh/seluruhnya. "Refund" = pengembalian uang.' },
  { q: '(L4) "Go straight ahead, then turn left." — ini adalah...', opts: ['Permintaan', 'Petunjuk arah', 'Pengumuman', 'Perkenalan'], ans: 'Petunjuk arah', exp: '"Go straight", "turn left/right" = ekspresi memberikan petunjuk arah.' },
  { q: '(L4) "Opposite the park" artinya...', opts: ['Di belakang taman', 'Di dalam taman', 'Di samping taman', 'Di seberang taman'], ans: 'Di seberang taman', exp: '"Opposite" = di seberang, berhadapan langsung.' },
  { q: '(L5) "I\'ve had a fever for three days." — tense dalam kalimat ini?', opts: ['Present Perfect', 'Simple Past', 'Past Perfect', 'Present Continuous'], ans: 'Present Perfect', exp: '"I\'ve (have) had" = Present Perfect. Menyatakan situasi yang dimulai di masa lalu dan masih berlangsung.' },
  { q: '(L5) "Make an appointment" artinya...', opts: ['Membuat perjanjian/janji temu', 'Mencari dokter', 'Mengisi formulir', 'Menemui dokter'], ans: 'Membuat perjanjian/janji temu', exp: '"Make an appointment" = membuat janji temu (di klinik, salon, kantor, dll.).' },
  { q: '(L6) "Departure" adalah lawan kata dari...', opts: ['Boarding', 'Terminal', 'Delay', 'Arrival'], ans: 'Arrival', exp: '"Departure" = keberangkatan. Lawannya "Arrival" = kedatangan.' },
  { q: '(L6) "Free of charge" artinya...', opts: ['Ada biaya tambahan', 'Diskon besar', 'Gratis tanpa biaya', 'Bayar nanti'], ans: 'Gratis tanpa biaya', exp: '"Free of charge" = tidak dipungut biaya, gratis.' },
  { q: '(L7) "Medium rare" dalam konteks steak berarti...', opts: ['Sangat matang', 'Setengah matang (sedikit merah)', 'Hampir mentah', 'Matang penuh'], ans: 'Setengah matang (sedikit merah)', exp: 'Urutan kematangan steak: Rare < Medium Rare < Medium < Medium Well < Well Done.' },
  { q: '(L7) "Could you also bring a vegetarian option?" adalah...', opts: ['Permintaan sopan', 'Pertanyaan informasi', 'Perintah langsung', 'Keluhan'], ans: 'Permintaan sopan', exp: '"Could you...?" = cara sopan meminta seseorang melakukan sesuatu.' },
  { q: '(L8) "Twice a week" artinya...', opts: ['Tiga kali seminggu', 'Dua kali sehari', 'Sekali seminggu', 'Dua kali seminggu'], ans: 'Dua kali seminggu', exp: '"Twice" = dua kali. "Once" = sekali. "Three times" = tiga kali.' },
  { q: '(L8) "Why don\'t you come and watch?" adalah bentuk...', opts: ['Ajakan/saran', 'Pertanyaan informasi', 'Keluhan', 'Perintah'], ans: 'Ajakan/saran', exp: '"Why don\'t you...?" = cara mengajak atau menyarankan seseorang untuk melakukan sesuatu.' },
  { q: '(L9) "Now boarding at Gate 14." — siapa yang biasanya mengucapkan ini?', opts: ['PA/Sistem pengumuman bandara', 'Kasir', 'Penumpang', 'Pilot'], ans: 'PA/Sistem pengumuman bandara', exp: 'Pengumuman PA (Public Address) adalah sistem pengumuman di area publik seperti bandara.' },
  { q: '(L9) "Business days" artinya...', opts: ['Hari kerja (Senin-Jumat)', 'Hari bisnis internasional', 'Hari kalender', 'Hari kerja termasuk Sabtu'], ans: 'Hari kerja (Senin-Jumat)', exp: '"Business days" = hari kerja, yaitu Senin sampai Jumat (tidak termasuk akhir pekan dan hari libur).' },
  { q: 'Mana yang merupakan cara PALING sopan untuk memesan makanan?', opts: ['"Give me the salmon."', '"I\'ll have the grilled salmon, please."', '"Salmon!"', '"I want the salmon."'], ans: '"I\'ll have the grilled salmon, please."', exp: '"I\'ll have..." + "please" = cara yang sopan dan natural untuk memesan di restoran.' },
  { q: 'Kata mana yang BUKAN merupakan frekuensi (frequency adverb)?', opts: ['Usually', 'Always', 'Twice', 'Recently'], ans: 'Recently', exp: '"Recently" = baru-baru ini (time expression), bukan frequency adverb. "Always", "usually", dan "twice a week" menunjukkan frekuensi.' },
];

export default function ElemListeningLesson10() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(10));
  const [showModal, setShowModal] = React.useState(false);
  const handleComplete = () => { markListeningComplete(10); setIsCompleted(true); setShowModal(true); };

  const summary = [
    { n: 1, icon: '🙋', title: 'Tentang Dirimu', key: 'Hobi, minat, present perfect' },
    { n: 2, icon: '💼', title: 'Di Tempat Kerja', key: 'Rapat, laporan, struktur kantor' },
    { n: 3, icon: '🛍️', title: 'Belanja & Layanan', key: 'Ukuran, harga, retur' },
    { n: 4, icon: '🏘️', title: 'Lingkungan Sekitar', key: 'Petunjuk arah, fasilitas' },
    { n: 5, icon: '🏥', title: 'Kesehatan & Dokter', key: 'Janji temu, gejala, asuransi' },
    { n: 6, icon: '✈️', title: 'Perjalanan & Transport', key: 'Tiket, bagasi, check-in' },
    { n: 7, icon: '🍽️', title: 'Makan di Luar', key: 'Menu, pesanan, alergi' },
    { n: 8, icon: '⚽', title: 'Olahraga & Waktu Luang', key: 'Rutinitas, ajakan, frekuensi' },
    { n: 9, icon: '📢', title: 'Pengumuman & Pesan', key: 'PA system, voicemail' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 46 }}>🎓</span></div>
            <h2 className="text-2xl font-extrabold mb-1">🎉 Luar Biasa!</h2>
            <p className="font-bold text-teal-600 mb-1">Elementary Listening Selesai!</p>
            <p className="text-sm text-gray-500 mb-5">Kamu telah menguasai 10 topik listening A2. Kamu siap untuk Intermediate!</p>
            <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary'); }} className="w-full py-3.5 rounded-xl font-bold text-white bg-teal-500">Kembali ke Menu</button>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Latihan Akhir A2</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L10</p></div>
            <div className="w-16" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-28 space-y-5">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
              <h2 className="text-lg font-extrabold mb-1">🎓 Latihan Akhir — Semua Topik A2</h2>
              <p className="text-sm text-teal-100">Uji pemahamanmu dengan 20 pertanyaan pilihan ganda yang mencakup seluruh materi Lesson 1–9!</p>
            </div>
            <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
              <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📋 Ringkasan Materi</p>
              <div className="space-y-2">
                {summary.map(s => (
                  <div key={s.n} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
                    <span className="text-base">{s.icon}</span>
                    <div>
                      <p className="text-xs font-extrabold text-slate-800">L{s.n}: {s.title}</p>
                      <p className="text-[10px] text-slate-500">{s.key}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <QuizEngine items={QUIZ} onComplete={handleComplete} />
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '🎓 Selesaikan Elementary Listening'}
          </button>
        </div>
      </div>
    </>
  );
}
