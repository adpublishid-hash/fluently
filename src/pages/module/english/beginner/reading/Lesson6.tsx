import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';
import type { QuizItem, ComprehensionQ } from './readingUtils';

const QUIZ: QuizItem[] = [
  { q: '"Full Name" pada formulir artinya...', opts: ['Nama panggilan', 'Nama lengkap', 'Nama keluarga', 'Nama alias'], ans: 'Nama lengkap', exp: '"Full name" = nama lengkap sesuai identitas.' },
  { q: '"Date of Birth" artinya...', opts: ['Tanggal hari ini', 'Tanggal pernikahan', 'Tanggal lahir', 'Tanggal kadaluarsa'], ans: 'Tanggal lahir', exp: '"Date of birth" = tanggal lahir. Disingkat DOB.' },
  { q: '"Nationality" pada formulir artinya...', opts: ['Nama lengkap', 'Kewarganegaraan', 'Alamat', 'Pekerjaan'], ans: 'Kewarganegaraan', exp: '"Nationality" = kewarganegaraan.' },
  { q: '"Gender" pada formulir artinya...', opts: ['Umur', 'Jenis kelamin', 'Agama', 'Pendidikan'], ans: 'Jenis kelamin', exp: '"Gender" = jenis kelamin (Male = pria, Female = wanita).' },
  { q: '"Address" pada formulir artinya...', opts: ['Nomor telepon', 'Email', 'Alamat', 'Pekerjaan'], ans: 'Alamat', exp: '"Address" = alamat tempat tinggal.' },
  { q: '"Occupation" artinya...', opts: ['Hobi', 'Agama', 'Pekerjaan', 'Pendidikan'], ans: 'Pekerjaan', exp: '"Occupation" = pekerjaan / profesi.' },
  { q: '"Signature" di akhir formulir artinya...', opts: ['Tanggal', 'Nama', 'Tanda tangan', 'Stempel'], ans: 'Tanda tangan', exp: '"Signature" = tanda tangan.' },
  { q: '"Emergency Contact" artinya...', opts: ['Nomor darurat polisi', 'Kontak keadaan darurat', 'Nomor pemadam kebakaran', 'Nomor ambulance'], ans: 'Kontak keadaan darurat', exp: '"Emergency contact" = kontak yang dihubungi dalam keadaan darurat.' },
  { q: '"Passport No." artinya...', opts: ['Nomor KTP', 'Nomor paspor', 'Nomor SIM', 'Nomor rekening'], ans: 'Nomor paspor', exp: '"Passport No." = nomor paspor.' },
  { q: '"Place of Birth" artinya...', opts: ['Tempat tinggal', 'Tempat kerja', 'Tempat lahir', 'Tempat belajar'], ans: 'Tempat lahir', exp: '"Place of birth" = tempat lahir.' },
  { q: '"Please fill in BLOCK LETTERS" artinya...', opts: ['Isi dengan huruf kecil', 'Isi dengan huruf kapital/cetak', 'Isi dengan huruf miring', 'Isi dengan huruf tebal'], ans: 'Isi dengan huruf kapital/cetak', exp: '"Block letters" atau "capital letters" = huruf kapital/cetak.' },
  { q: '"Marital Status" artinya...', opts: ['Status pekerjaan', 'Status pendidikan', 'Status pernikahan', 'Status kewarganegaraan'], ans: 'Status pernikahan', exp: '"Marital status" = status pernikahan (Single/Married/Divorced).' },
  { q: '"Phone Number" artinya...', opts: ['Nomor kamar', 'Nomor paspor', 'Nomor telepon', 'Nomor antrean'], ans: 'Nomor telepon', exp: '"Phone number" = nomor telepon.' },
  { q: '"Religion" pada formulir artinya...', opts: ['Hobi', 'Agama', 'Suku', 'Bahasa'], ans: 'Agama', exp: '"Religion" = agama.' },
  { q: '"SINGLE" dalam marital status artinya...', opts: ['Menikah', 'Belum menikah', 'Bercerai', 'Janda/Duda'], ans: 'Belum menikah', exp: '"Single" = belum menikah / lajang.' },
  { q: '"Next of Kin" artinya...', opts: ['Teman dekat', 'Rekan kerja', 'Keluarga/kerabat terdekat', 'Dokter'], ans: 'Keluarga/kerabat terdekat', exp: '"Next of kin" = kerabat/anggota keluarga terdekat.' },
  { q: '"MALE" dalam gender artinya...', opts: ['Perempuan', 'Laki-laki', 'Anak-anak', 'Remaja'], ans: 'Laki-laki', exp: '"Male" = laki-laki. "Female" = perempuan.' },
  { q: '"Zip Code / Postal Code" artinya...', opts: ['Kode negara', 'Kode pos', 'Kode area', 'Kode telepon'], ans: 'Kode pos', exp: '"Zip code" atau "postal code" = kode pos.' },
  { q: '"Date" pada formulir biasanya ditulis...', opts: ['YYYY/DD/MM', 'DD/MM/YYYY atau MM/DD/YYYY', 'MM-YYYY-DD', 'Semua sama'], ans: 'DD/MM/YYYY atau MM/DD/YYYY', exp: 'Format tanggal internasional: DD/MM/YYYY (Eropa) atau MM/DD/YYYY (Amerika).' },
  { q: '"Please tick (✓) where applicable" artinya...', opts: ['Isi dengan tulisan', 'Beri tanda centang pada yang sesuai', 'Coret yang tidak perlu', 'Lingkari pilihanmu'], ans: 'Beri tanda centang pada yang sesuai', exp: '"Tick" = tanda centang (✓). "Where applicable" = di mana yang sesuai/relevan.' },
];

const FORM_PASSAGE = {
  passageTitle: '📋 Bacaan: Formulir Hotel Check-in',
  passage: (
    <div className="space-y-3">
      <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-5">
        <p className="font-extrabold text-slate-800 text-center mb-4">🏨 HOTEL GRAND JAKARTA — GUEST REGISTRATION</p>
        <div className="space-y-3 text-sm">
          {[
            { f: 'Full Name', v: 'SANTOSO, BUDI PRASETYO' },
            { f: 'Date of Birth', v: '15 / 03 / 1990' },
            { f: 'Nationality', v: 'Indonesian' },
            { f: 'Passport No.', v: 'A2345678' },
            { f: 'Address', v: 'Jl. Sudirman No.10, Surabaya' },
            { f: 'Phone Number', v: '+62 812 3456 7890' },
            { f: 'Occupation', v: 'Engineer' },
            { f: 'Check-in Date', v: '20 April 2025' },
            { f: 'Check-out Date', v: '23 April 2025' },
          ].map(row => (
            <div key={row.f} className="flex items-start gap-3 border-b border-slate-100 pb-2">
              <span className="text-slate-500 w-32 shrink-0 text-xs">{row.f}:</span>
              <b className="text-slate-800 text-xs">{row.v}</b>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  questions: [
    { q: 'Apa nama lengkap tamu hotel ini?', opts: ['Budi Santoso', 'Budi Prasetyo Santoso', 'Prasetyo Santoso', 'Santoso Budi'], ans: 'Santoso Budi' },
    { q: 'Apa kewarganegaraan tamu ini?', opts: ['Malaysian', 'Indonesian', 'Singaporean', 'Australian'], ans: 'Indonesian' },
    { q: 'Kapan tamu ini melakukan check-in?', opts: ['18 April', '19 April', '20 April', '23 April'], ans: '20 April' },
    { q: 'Apa pekerjaan tamu ini?', opts: ['Doctor', 'Lawyer', 'Engineer', 'Teacher'], ans: 'Engineer' },
    { q: 'Berapa malam tamu ini menginap?', opts: ['1 malam', '2 malam', '3 malam', '4 malam'], ans: '3 malam' },
  ] as ComprehensionQ[],
};

const ReadingLesson6: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/reading/lesson-7';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedReadingLessons().includes(6));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');
  const handleComplete = () => { markReadingComplete(6); setIsCompleted(true); setShowModal(true); };

  const formFields = [
    { en: 'Full Name', id: 'Nama lengkap' }, { en: 'Date of Birth (DOB)', id: 'Tanggal lahir' },
    { en: 'Place of Birth', id: 'Tempat lahir' }, { en: 'Nationality', id: 'Kewarganegaraan' },
    { en: 'Gender', id: 'Jenis kelamin' }, { en: 'Marital Status', id: 'Status pernikahan' },
    { en: 'Address', id: 'Alamat' }, { en: 'Zip / Postal Code', id: 'Kode pos' },
    { en: 'Phone Number', id: 'Nomor telepon' }, { en: 'Email Address', id: 'Alamat email' },
    { en: 'Occupation', id: 'Pekerjaan' }, { en: 'Signature', id: 'Tanda tangan' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 6 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa membaca dan memahami formulir!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-green-500">Lesson 7 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Formulir & Tanda Pengenal</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Reading • Lesson 6</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-green-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['baca', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-green-600 border-b-2 border-sky-500' : 'text-slate-400'}`}>
              {tab === 'baca' ? '📖 Baca' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'baca' && (
              <>
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Formulir & Tanda Pengenal</h2>
                  <p className="text-sm text-green-100">Pelajari istilah-istilah yang sering muncul di formulir registrasi hotel, bandara, dan izin masuk.</p>
                </div>
                <ReadingCard title="📝 Istilah dalam Formulir" icon="🗂️">
                  <div className="grid grid-cols-2 gap-2">
                    {formFields.map(f => (<div key={f.en} className="bg-slate-50 rounded-xl px-3 py-2.5"><p className="text-xs font-extrabold text-slate-800">{f.en}</p><p className="text-xs text-green-600">{f.id}</p></div>))}
                  </div>
                </ReadingCard>
                <ReadingCard title="✅ Petunjuk Mengisi Formulir" icon="📌">
                  <div className="space-y-2 text-sm">
                    {[
                      { text: 'Please fill in BLOCK LETTERS', id: 'Isi dengan huruf kapital/cetak' },
                      { text: 'Fields marked * are required', id: 'Kolom bertanda * wajib diisi' },
                      { text: 'Tick (✓) where applicable', id: 'Beri centang yang sesuai' },
                      { text: 'Date format: DD/MM/YYYY', id: 'Format tanggal: Tgl/Bln/Tahun' },
                    ].map((i, idx) => (<div key={idx} className="bg-blue-50 rounded-xl px-3 py-2.5 border border-blue-100"><p className="font-mono text-xs font-bold text-blue-800">{i.text}</p><p className="text-xs text-blue-600 mt-0.5">{i.id}</p></div>))}
                  </div>
                </ReadingCard>
              </>
            )}
            {activeTab === 'latihan' && <ComprehensionSection {...FORM_PASSAGE} />}
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
};

export default ReadingLesson6;
