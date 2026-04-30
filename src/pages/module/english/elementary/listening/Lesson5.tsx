import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Kevin', text: 'Good morning. I\'d like to make an appointment with Dr. Patel, please.', translation: 'Selamat pagi. Saya ingin membuat janji temu dengan Dr. Patel.', avatar: '👨' },
  { speaker: 'Receptionist', text: 'Of course. Can I have your name and date of birth?', translation: 'Tentu. Boleh saya tahu nama dan tanggal lahir Anda?', avatar: '👩' },
  { speaker: 'Kevin', text: 'Kevin Harris, born on the fifteenth of March, nineteen ninety.', translation: 'Kevin Harris, lahir tanggal 15 Maret 1990.', avatar: '👨' },
  { speaker: 'Receptionist', text: 'Thank you. What seems to be the problem, Mr. Harris?', translation: 'Terima kasih. Apa masalahnya, Pak Harris?', avatar: '👩' },
  { speaker: 'Kevin', text: 'I\'ve had a sore throat and a fever for three days. I also feel very tired.', translation: 'Saya sudah sakit tenggorokan dan demam selama tiga hari. Saya juga merasa sangat lelah.', avatar: '👨' },
  { speaker: 'Receptionist', text: 'I see. Dr. Patel has an opening at two-thirty this afternoon. Does that work for you?', translation: 'Saya mengerti. Dr. Patel ada slot jam 2.30 sore ini. Apakah itu cocok untuk Anda?', avatar: '👩' },
  { speaker: 'Kevin', text: 'Yes, that\'s perfect. Do I need to bring anything?', translation: 'Ya, itu sempurna. Apakah saya perlu membawa sesuatu?', avatar: '👨' },
  { speaker: 'Receptionist', text: 'Please bring your insurance card and ID. Arrive a few minutes early to fill in the forms.', translation: 'Tolong bawa kartu asuransi dan KTP. Datanglah beberapa menit lebih awal untuk mengisi formulir.', avatar: '👩' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'I\'d like to make an ___ with the doctor.', blank: 'appointment', opts: ['appointment', 'order', 'agreement', 'application'], hint: 'Membuat janji temu = make an ___' },
  { sentence: 'I\'ve had a sore ___ and a fever for three days.', blank: 'throat', opts: ['throat', 'head', 'back', 'stomach'], hint: 'Sakit tenggorokan = sore ___' },
  { sentence: 'Dr. Patel has an ___ at two-thirty.', blank: 'opening', opts: ['opening', 'appointment', 'slot', 'space'], hint: '"Ada slot kosong" = has an ___' },
  { sentence: 'Please bring your ___ card and ID.', blank: 'insurance', opts: ['insurance', 'credit', 'loyalty', 'student'], hint: 'Kartu asuransi = ___ card' },
  { sentence: 'Arrive a few minutes ___ to fill in the forms.', blank: 'early', opts: ['early', 'late', 'before', 'ahead'], hint: 'Datang lebih awal = arrive ___' },
];

const QUIZ: QuizItem[] = [
  { q: '"I\'d like to make an appointment." artinya...', opts: ['Saya sudah punya janji.', 'Saya ingin membuat janji temu.', 'Saya perlu janji segera.', 'Apakah ada janji?'], ans: 'Saya ingin membuat janji temu.', exp: '"I\'d like to..." = "I would like to..." = saya ingin (sopan).' },
  { q: '"What seems to be the problem?" artinya...', opts: ['Apa penyakitnya?', 'Apa yang tampaknya menjadi masalah?', 'Mengapa kamu sakit?', 'Apakah ada masalah?'], ans: 'Apa yang tampaknya menjadi masalah?', exp: 'Ekspresi dokter/staf medis untuk menanyakan keluhan pasien.' },
  { q: '"I\'ve had a sore throat for three days." — Kevin sakit tenggorokan selama...', opts: ['1 hari', '2 hari', '3 hari', '5 hari'], ans: '3 hari', exp: '"For three days" = selama tiga hari.' },
  { q: '"I\'ve had" menggunakan tense...', opts: ['Simple Past', 'Present Perfect', 'Past Perfect', 'Present Continuous'], ans: 'Present Perfect', exp: '"I\'ve had" = "I have had" = Present Perfect (keadaan yang mulai di masa lalu dan masih terjadi).' },
  { q: '"A fever" artinya...', opts: ['Pilek', 'Demam', 'Batuk', 'Pusing'], ans: 'Demam', exp: '"Fever" = demam (suhu tubuh tinggi).' },
  { q: '"Sore throat" artinya...', opts: ['Sakit kepala', 'Sakit perut', 'Sakit tenggorokan', 'Sakit punggung'], ans: 'Sakit tenggorokan', exp: '"Sore throat" = sakit/nyeri tenggorokan.' },
  { q: '"Dr. Patel has an opening at two-thirty." jam berapa tersedia?', opts: ['02.13', '13.00', '14.30', '15.00'], ans: '14.30', exp: '"Two-thirty" = 2:30 = 14:30 (jam setengah tiga siang).' },
  { q: '"Does that work for you?" artinya...', opts: ['Apakah itu efektif?', 'Apakah itu cocok/sesuai untuk Anda?', 'Apakah Anda bekerja?', 'Apakah Anda bisa?'], ans: 'Apakah itu cocok/sesuai untuk Anda?', exp: '"Does that work for you?" = cara informal menanyakan apakah jadwal/rencana cocok.' },
  { q: '"Insurance card" artinya...', opts: ['Kartu kredit', 'Kartu pelajar', 'Kartu asuransi', 'Kartu anggota'], ans: 'Kartu asuransi', exp: '"Insurance card" = kartu yang membuktikan kepemilikan asuransi kesehatan.' },
  { q: '"ID" dalam konteks ini artinya...', opts: ['Internet Data', 'Identification Document (KTP/paspor)', 'Individual Discount', 'Insurance Deductible'], ans: 'Identification Document (KTP/paspor)', exp: '"ID" = Identification = dokumen identitas seperti KTP atau paspor.' },
  { q: '"Fill in the forms" artinya...', opts: ['Menyerahkan formulir', 'Mengisi formulir', 'Mengambil formulir', 'Mengembalikan formulir'], ans: 'Mengisi formulir', exp: '"Fill in" (atau "fill out") = mengisi (formulir/dokumen).' },
  { q: '"Arrive a few minutes early" artinya...', opts: ['Datang tepat waktu', 'Datang terlambat sedikit', 'Datang beberapa menit lebih awal', 'Datang kapan saja'], ans: 'Datang beberapa menit lebih awal', exp: '"A few minutes early" = beberapa menit lebih awal dari waktu yang dijadwalkan.' },
  { q: 'Kevin merasa...', opts: ['Sakit tenggorokan saja', 'Demam saja', 'Sakit tenggorokan, demam, dan sangat lelah', 'Sangat pusing'], ans: 'Sakit tenggorokan, demam, dan sangat lelah', exp: 'Kevin menyebutkan "sore throat", "fever", dan "feel very tired".' },
  { q: '"Receptionist" artinya...', opts: ['Dokter', 'Perawat', 'Resepsionis/penerima tamu', 'Apoteker'], ans: 'Resepsionis/penerima tamu', exp: '"Receptionist" = resepsionis, orang yang menerima tamu di klinik/hotel/kantor.' },
  { q: '"Date of birth" artinya...', opts: ['Tempat lahir', 'Tanggal lahir', 'Nama ibu', 'Alamat'], ans: 'Tanggal lahir', exp: '"Date of birth" = tanggal lahir (DOB).' },
  { q: 'Kevin lahir tanggal...', opts: ['15 Maret 1990', '5 Maret 1990', '15 Mei 1990', '15 Maret 1999'], ans: '15 Maret 1990', exp: '"Fifteenth of March, nineteen ninety" = 15 Maret 1990.' },
  { q: '"I see." dalam konteks ini artinya...', opts: ['Saya bisa melihat.', 'Saya mengerti.', 'Saya setuju.', 'Saya tidak tahu.'], ans: 'Saya mengerti.', exp: '"I see." = saya mengerti / saya paham (ungkapan bahwa informasi telah diterima).' },
  { q: '"Can I have your name?" artinya...', opts: ['Siapa namamu?', 'Apa nama bayi kamu?', 'Boleh saya tahu namamu?', 'Tuliskan namamu.'], ans: 'Boleh saya tahu namamu?', exp: '"Can I have your...?" = cara sopan meminta informasi dari seseorang.' },
  { q: 'Kevin membuat janji temu dengan...', opts: ['Dr. Kim', 'Dr. Patel', 'Dr. Smith', 'Dr. Harris'], ans: 'Dr. Patel', exp: '"I\'d like to make an appointment with Dr. Patel."' },
  { q: '"That\'s perfect." artinya...', opts: ['Itu buruk.', 'Itu cukup baik.', 'Itu sempurna.', 'Itu tidak cocok.'], ans: 'Itu sempurna.', exp: '"Perfect!" = sempurna! (ekspresi kepuasan atau setuju penuh).' },
];

export default function ElemListeningLesson5() {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(5));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(5); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 5 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu bisa memahami percakapan dengan dokter dan klinik!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate('/modul/english/elementary/listening/lesson-6'); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-teal-500">Lesson 6 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Kesehatan & Dokter</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Elementary Listening • L5</p></div>
            <button onClick={() => navigate('/modul/english/elementary/listening/lesson-6')} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-teal-500">Next ›</button>
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
                  <h2 className="text-lg font-extrabold mb-1">🏥 Kesehatan & Dokter</h2>
                  <p className="text-sm text-teal-100">Pahami cara menyampaikan keluhan kesehatan & membuat janji temu dokter dalam bahasa Inggris.</p>
                </div>
                <div className="bg-white rounded-2xl border border-sky-100 shadow-sm p-4">
                  <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wide mb-3">📖 Kosakata Penting</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[{en:'Make an appointment',id:'Membuat janji temu'},{en:'Sore throat',id:'Sakit tenggorokan'},{en:'Fever',id:'Demam'},{en:'Insurance card',id:'Kartu asuransi'},{en:'Fill in the forms',id:'Mengisi formulir'},{en:'Date of birth',id:'Tanggal lahir'}].map(v => (<div key={v.en} className="bg-slate-50 rounded-xl px-3 py-2"><p className="text-xs font-extrabold text-slate-800">{v.en}</p><p className="text-xs text-teal-600">{v.id}</p></div>))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Membuat Janji Temu Dokter" lines={DIALOGUE} />
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
