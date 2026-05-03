import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, HotelForm } from './writingUtils';
import type { QuizItem, FormField } from './writingUtils';

const WRITING_STORAGE_KEY = 'talky_beginner_writing_completed';
function getCompletedWritingLessons(): number[] { try { return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]'); } catch { return []; } }
function markWritingComplete(id: number) { const d = getCompletedWritingLessons(); if (!d.includes(id)) localStorage.setItem(WRITING_STORAGE_KEY, JSON.stringify([...d, id])); }

const NUMBERS: { n: number; word: string; id: string }[] = [
  { n: 1, word: 'one', id: 'satu' }, { n: 2, word: 'two', id: 'dua' },
  { n: 3, word: 'three', id: 'tiga' }, { n: 4, word: 'four', id: 'empat' },
  { n: 5, word: 'five', id: 'lima' }, { n: 6, word: 'six', id: 'enam' },
  { n: 7, word: 'seven', id: 'tujuh' }, { n: 8, word: 'eight', id: 'delapan' },
  { n: 9, word: 'nine', id: 'sembilan' }, { n: 10, word: 'ten', id: 'sepuluh' },
  { n: 11, word: 'eleven', id: 'sebelas' }, { n: 12, word: 'twelve', id: 'dua belas' },
  { n: 20, word: 'twenty', id: 'dua puluh' }, { n: 30, word: 'thirty', id: 'tiga puluh' },
  { n: 100, word: 'one hundred', id: 'seratus' },
];

const ORDINALS = [
  { num: '1st', word: 'first' }, { num: '2nd', word: 'second' },
  { num: '3rd', word: 'third' }, { num: '4th', word: 'fourth' }, { num: '5th', word: 'fifth' },
];

const QUIZ: QuizItem[] = [
  { q: '"5" dalam bahasa Inggris ditulis...', opts: ['four', 'five', 'fix'], ans: 'five', exp: '5 = five (lima).' },
  { q: '"12" dalam bahasa Inggris ditulis...', opts: ['twelve', 'twenty', 'eleven'], ans: 'twelve', exp: '12 = twelve (dua belas).' },
  { q: 'Angka berapa yang ditulis "twenty"?', opts: ['12', '20', '30'], ans: '20', exp: 'Twenty = 20 (dua puluh).' },
  { q: '"1st" dibaca...', opts: ['one-st', 'first', 'onest'], ans: 'first', exp: '1st = first (pertama, ordinal).' },
  { q: '"8" dalam bahasa Inggris ditulis...', opts: ['seven', 'eight', 'nine'], ans: 'eight', exp: '8 = eight (delapan).' },
  { q: '"100" ditulis...', opts: ['ten hundred', 'one hundred', 'hundred'], ans: 'one hundred', exp: '100 = one hundred (seratus).' },
  { q: 'Angka berapa yang ditulis "eleven"?', opts: ['10', '11', '12'], ans: '11', exp: 'Eleven = 11 (sebelas).' },
  { q: '"3rd" dibaca...', opts: ['third', 'three-rd', 'thirdy'], ans: 'third', exp: '3rd = third (ketiga, ordinal).' },
  { q: '"50" ditulis...', opts: ['fifteen', 'fifty', 'five'], ans: 'fifty', exp: '50 = fifty (lima puluh).' },
  { q: '"9" dalam bahasa Inggris ditulis...', opts: ['six', 'seven', 'nine'], ans: 'nine', exp: '9 = nine (sembilan).' },
  { q: '"30" ditulis...', opts: ['thirteen', 'thirty', 'three'], ans: 'thirty', exp: '30 = thirty (tiga puluh).' },
  { q: '"2nd" dibaca...', opts: ['two-nd', 'second', 'twice'], ans: 'second', exp: '2nd = second (kedua, ordinal).' },
  { q: '"7" dalam bahasa Inggris ditulis...', opts: ['six', 'seven', 'eight'], ans: 'seven', exp: '7 = seven (tujuh).' },
  { q: '"4" dalam bahasa Inggris ditulis...', opts: ['for', 'four', 'fore'], ans: 'four', exp: '4 = four (empat).' },
  { q: '"5th" dibaca...', opts: ['fiveth', 'fifth', 'five-th'], ans: 'fifth', exp: '5th = fifth (kelima, ordinal).' },
  { q: 'Untuk angka 21, penulisannya?', opts: ['twenty one', 'twenty-one', 'twentyone'], ans: 'twenty-one', exp: 'Angka 21–99 ditulis dengan tanda hubung: twenty-one.' },
  { q: '"6" dalam bahasa Inggris ditulis...', opts: ['sex', 'six', 'sick'], ans: 'six', exp: '6 = six (enam).' },
  { q: '"4th" dibaca...', opts: ['four-th', 'fortieth', 'fourth'], ans: 'fourth', exp: '4th = fourth (keempat).' },
  { q: '"2" dalam bahasa Inggris ditulis...', opts: ['one', 'two', 'three'], ans: 'two', exp: '2 = two (dua).' },
  { q: '"10" dalam bahasa Inggris ditulis...', opts: ['tin', 'ten', 'ton'], ans: 'ten', exp: '10 = ten (sepuluh).' },
];

/* ─── FORM FIELDS (Airline check-in + hotel style numbers) ─── */
const FORM_FIELDS: FormField[] = [
  { id: 'passenger', label: 'Passenger Name', placeholder: 'e.g. SANTOSO/BUDI', required: true, hint: 'Format penerbangan: NAMA BELAKANG/NAMA DEPAN (huruf kapital semua).' },
  { id: 'flight', label: 'Flight Number', placeholder: 'e.g. GA 405', required: true, hint: 'Nomor penerbangan biasanya berupa kode + angka.' },
  { id: 'seat', label: 'Seat Number', placeholder: 'e.g. 12A', required: true, hint: '12 dalam bahasa Inggris: twelve.' },
  { id: 'gate', label: 'Gate Number', placeholder: 'e.g. Gate 5 / Gate Five', hint: 'Coba tulis angka dalam bentuk kata (five, ten, dll).' },
  { id: 'depart', label: 'Departure Time', placeholder: 'e.g. 09:00 / nine o\'clock', hint: '"09:00 AM" = nine o\'clock in the morning.' },
  { id: 'bags', label: 'Number of Bags (in words)', placeholder: 'e.g. two bags', required: true, hint: 'Tulis jumlah tasmu dalam bentuk kata Inggris.' },
  { id: 'date', label: 'Travel Date', placeholder: 'DD/MM/YYYY', type: 'date', required: true },
];

/* ─── WRITING PRACTICE ─── */
function WritingPractice() {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const checkDate = (v: string) => {
    const m: Record<string, string> = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };
    if (!v) return '';
    const [y, mo, d] = v.split('-');
    const ord = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first'];
    return `${m[mo] ?? mo} ${ord[parseInt(d)] ?? d}, ${y}`;
  };
  const [dateVal, setDateVal] = useState('');

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Angka dalam kata */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">🔢</span><h2 className="text-base font-extrabold text-slate-800">Tulis Angka dalam Kata</h2></div>
        <div className="space-y-3">
          {[{n:7, ans:'seven'},{n:15,ans:'fifteen'},{n:42,ans:'forty-two'},{n:100,ans:'one hundred'}].map(item => (
            <div key={item.n} className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3">
              <span className="text-2xl font-extrabold text-amber-600 w-16 shrink-0">{item.n}</span>
              <input type="text" placeholder="Tulis dalam kata Inggris..." className="flex-1 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400" onBlur={e => { if (e.target.value.trim().toLowerCase() === item.ans) e.target.className = 'flex-1 border-2 border-sky-400 bg-green-50 rounded-xl px-3 py-2 text-sm focus:outline-none'; }} />
              <span className="text-xs text-slate-300 shrink-0">→ {item.ans}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tanggal dalam kata */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">📅</span><h2 className="text-base font-extrabold text-slate-800">Tulis Tanggal dalam Bahasa Inggris</h2></div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-3">Pilih tanggal, lalu lihat cara penulisannya dalam bahasa Inggris:</p>
          <input type="date" value={dateVal} onChange={e => setDateVal(e.target.value)} className="w-full border-2 border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 mb-3" />
          {dateVal && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <p className="text-xs text-amber-600 font-bold mb-1">Penulisan dalam bahasa Inggris:</p>
              <p className="text-sm font-bold text-amber-800">{checkDate(dateVal)}</p>
            </div>
          )}
          <p className="text-xs text-slate-400 mt-2">💡 Format: Month Day, Year (contoh: April 16th, 2024)</p>
        </div>
      </div>

      {/* Airline form */}
      <div>
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">✈️</span><h2 className="text-base font-extrabold text-slate-800">Formulir Boarding Pass</h2></div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4 text-sm text-amber-800">
          <p className="font-bold mb-1">🎯 Situasi:</p>
          <p>Kamu di bandara dan harus mengisi formulir boarding pass. Isi angka-angka dengan benar dalam bahasa Inggris!</p>
        </div>
        <HotelForm title="✈️ Flight Check-in Form" subtitle="Please fill in your boarding information" fields={FORM_FIELDS} />
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
const WritingLesson2: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/writing/lesson-3';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedWritingLessons().includes(2));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'menulis' | 'kuis'>('learn');
  const handleComplete = () => { markWritingComplete(2); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#F39C12,#E67E22)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 2 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa menulis angka dan mengisi formulir!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white" style={{ background: '#F39C12' }}>Lesson 3 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Angka dalam Tulisan</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Writing • Lesson 2</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white" style={{ background: '#F39C12' }}>Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {([['learn', '📖 Materi'], ['menulis', '✏️ Latihan'], ['kuis', '🎯 Kuis']] as const).map(([tab, label]) => (
            <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-amber-600 border-b-2 border-amber-500' : 'text-slate-400'}`}>{label as string}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'learn' && (
              <>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg"><h2 className="text-lg font-extrabold mb-1">Angka dalam Tulisan Inggris</h2><p className="text-sm text-amber-100">Menulis angka dengan benar sangat penting dalam formulir, boarding pass, dan surat. Pelajari cara menulis angka 1–100!</p></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">🔢 Angka 1–100</h3><div className="grid grid-cols-2 gap-2">{NUMBERS.map(n => (<div key={n.n} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-3 shadow-sm"><span className="text-xl font-extrabold text-amber-600 w-10 text-center">{n.n}</span><div><p className="text-sm font-bold text-slate-800">{n.word}</p><p className="text-xs text-slate-400">{n.id}</p></div></div>))}</div></div>
                <div><h3 className="font-extrabold text-slate-800 mb-3 text-sm">📅 Angka Urutan (Ordinal)</h3><div className="grid grid-cols-2 gap-2">{ORDINALS.map(o => (<div key={o.num} className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-3"><span className="text-base font-extrabold text-amber-700">{o.num}</span><span className="text-sm text-slate-700">{o.word}</span></div>))}</div></div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4"><h3 className="font-bold text-blue-800 mb-2 text-sm">💡 Aturan Penting</h3><ul className="text-sm text-blue-700 space-y-1"><li>✦ <b>21–99:</b> gunakan tanda hubung → twenty-one, forty-five</li><li>✦ <b>Tanggal:</b> April 16th, 2024 (ordinal + bulan)</li><li>✦ <b>Jam:</b> 9:00 AM = nine o'clock in the morning</li><li>✦ <b>Formulir:</b> tulis angka dalam kata saat diminta</li></ul></div>
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

export default WritingLesson2;
