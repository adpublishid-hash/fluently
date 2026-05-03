import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { CheckCircleIcon } from '../../../../../components/Icons';

const WRITING_STORAGE_KEY = 'talky_elementary_writing_completed';

function getCompletedWritingLessons(): number[] {
  try {
    return JSON.parse(localStorage.getItem(WRITING_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const LESSONS = [
  {
    title: 'Struktur Kalimat Sederhana',
    textType: 'Sentence building',
    focus: 'Subjek + predikat + objek, to be, present simple, dan urutan kata dasar.',
    output: 'Menulis 8-10 kalimat benar tentang diri dan rutinitas.',
  },
  {
    title: 'Menulis Pesan Singkat',
    textType: 'Short message',
    focus: 'Pesan informal yang langsung, jelas, memakai waktu dan tempat.',
    output: 'Menulis pesan 2-4 kalimat untuk teman atau rekan kerja.',
  },
  {
    title: 'Menulis Catatan Mendesak',
    textType: 'Urgent note',
    focus: 'Memberi alasan singkat, meminta bantuan, dan menyampaikan perubahan rencana.',
    output: 'Menulis catatan mendesak tentang keterlambatan, pembatalan, atau permintaan tolong.',
  },
  {
    title: 'Menulis Email Sederhana',
    textType: 'Basic email',
    focus: 'Subject, greeting, opening sentence, body, closing, dan signature.',
    output: 'Menulis email pendek yang sopan dan terstruktur.',
  },
  {
    title: 'Surat Pribadi: Terima Kasih',
    textType: 'Thank-you note',
    focus: 'Mengucapkan terima kasih, menyebut alasan spesifik, dan menutup dengan hangat.',
    output: 'Menulis kartu terima kasih 4-6 kalimat.',
  },
  {
    title: 'Surat Pribadi: Undangan',
    textType: 'Invitation',
    focus: 'Mengundang, mencantumkan tanggal, waktu, tempat, dan permintaan respons.',
    output: 'Menulis undangan acara sederhana.',
  },
  {
    title: 'Mendeskripsikan Orang/Benda',
    textType: 'Descriptive paragraph',
    focus: 'Adjectives, be/have, physical appearance, personality, dan details.',
    output: 'Menulis deskripsi 1 paragraf tentang orang, benda, atau tempat.',
  },
  {
    title: 'Pengumuman Singkat',
    textType: 'Notice',
    focus: 'Judul jelas, informasi penting, kontak, dan call to action.',
    output: 'Menulis pengumuman barang hilang, barang dijual, atau perubahan jadwal.',
  },
  {
    title: 'Pengalaman Masa Lalu',
    textType: 'Past experience',
    focus: 'Past simple, time markers, urutan kejadian, dan perasaan.',
    output: 'Menulis cerita pendek tentang kegiatan kemarin atau akhir pekan.',
  },
  {
    title: 'Rencana Liburan',
    textType: 'Future plan',
    focus: 'Will, be going to, tempat tujuan, aktivitas, dan alasan.',
    output: 'Menulis rencana liburan 1 paragraf.',
  },
  {
    title: 'Mengisi Formulir Dasar',
    textType: 'Form completion',
    focus: 'First name, surname, date of birth, address, phone number, dan email.',
    output: 'Mengisi formulir pribadi dan menulis data dengan format benar.',
  },
  {
    title: 'Review Sederhana',
    textType: 'Simple review',
    focus: 'Opinion adjectives, alasan, rating, recommendation, dan because.',
    output: 'Menulis review makanan, film, buku, atau produk.',
  },
  {
    title: 'Memberi Arahan/Instruksi',
    textType: 'Instructions',
    focus: 'Imperatives, sequence words, prepositions, dan langkah berurutan.',
    output: 'Menulis instruksi singkat atau petunjuk arah.',
  },
  {
    title: 'Membalas Undangan',
    textType: 'RSVP reply',
    focus: 'Accepting, declining politely, giving reason, dan suggesting another time.',
    output: 'Menulis balasan menerima atau menolak undangan.',
  },
  {
    title: 'Evaluasi Menulis A2',
    textType: 'Final writing review',
    focus: 'Review semua skill: sentence accuracy, message clarity, paragraph structure, dan tone.',
    output: 'Menyelesaikan latihan akhir gabungan A2 Writing.',
  },
];

export default function ElementaryWritingPage() {
  const navigate = useNavigate();
  const completed = getCompletedWritingLessons();
  const total = LESSONS.length;
  const progress = Math.round((completed.length / total) * 100) || 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.writing" subtitle="A2 writing practice for real everyday messages and short texts" />

        <div className="px-5 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Menulis (A2)</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">{completed.length} dari {total} bab selesai</p>
              </div>
              <div className="text-right"><span className="text-3xl font-black text-blue-500">{progress}%</span></div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative z-10">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="px-5 mb-5 space-y-3">
          <div className="mb-4 px-1">
            <h2 className="text-base font-extrabold text-slate-800">Daftar Materi</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">Setiap lesson berisi materi, latihan memperbaiki kalimat, latihan menulis, dan kuis.</p>
          </div>

          {LESSONS.map((lesson, i) => {
            const id = i + 1;
            const isCompleted = completed.includes(id);

            return (
              <button
                key={id}
                onClick={() => navigate(`/modul/english/elementary/writing/lesson-${id}`)}
                className={`w-full flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'border-sky-100 bg-green-50 shadow-sm hover:border-sky-300'
                    : 'border-blue-100 bg-white shadow-sm hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm shrink-0 ${isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : id}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-[15px] text-slate-800">{lesson.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full">A2 Writing</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500">{lesson.textType} - {lesson.output}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed max-w-[560px]">
                      {isCompleted ? 'Tuntas' : lesson.focus}
                    </p>
                  </div>
                </div>

                {!isCompleted && (
                  <div className="text-blue-500 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
