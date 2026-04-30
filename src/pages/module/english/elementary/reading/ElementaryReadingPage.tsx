import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { CheckCircleIcon } from '../../../../../components/Icons';
import { getCompletedReadingLessons } from './readingUtils';

const LESSONS = [
  { title: 'Iklan Sederhana', textType: 'Iklan promosi', focus: 'Menemukan produk, harga, diskon, tanggal akhir promo, dan penawaran khusus.' },
  { title: 'Label Makanan', textType: 'Label produk', focus: 'Membaca informasi nutrisi, bahan, ukuran saji, tanggal kedaluwarsa, dan instruksi penyimpanan.' },
  { title: 'Jadwal Kereta & Pesawat', textType: 'Jadwal transportasi', focus: 'Mencari waktu keberangkatan, tujuan, nomor perjalanan, platform/gate, dan perubahan jadwal.' },
  { title: 'Jadwal Aktivitas & Kelas', textType: 'Agenda harian', focus: 'Memahami hari, jam, lokasi, durasi kegiatan, dan urutan aktivitas.' },
  { title: 'Menu Restoran', textType: 'Menu makanan', focus: 'Membaca nama menu, bahan utama, harga, kategori makanan, dan pilihan termurah.' },
  { title: 'Brosur Wisata Pantai', textType: 'Brosur wisata', focus: 'Mengidentifikasi fasilitas, aktivitas, lokasi, biaya, dan informasi pengunjung.' },
  { title: 'Papan Peringatan', textType: 'Rules and warning sign', focus: 'Memahami larangan, instruksi, modal verbs, dan tindakan yang harus dilakukan.' },
  { title: 'Email Pribadi', textType: 'Email informal', focus: 'Menangkap tujuan email, detail rencana, waktu, tempat, dan respons yang sesuai.' },
  { title: 'Kartu Pos', textType: 'Postcard perjalanan', focus: 'Mengenali tempat, cuaca, aktivitas liburan, perasaan penulis, dan urutan kejadian.' },
  { title: 'Pengumuman Barang Hilang', textType: 'Lost item notice', focus: 'Mencari ciri benda/hewan, lokasi hilang, kontak, hadiah, dan detail identitas.' },
  { title: 'Teks Petunjuk Arah', textType: 'Directions', focus: 'Mengikuti instruksi arah, landmark, prepositions of place, dan urutan langkah.' },
  { title: 'Ulasan Produk', textType: 'Product review', focus: 'Membedakan opini dan fakta, kelebihan, kekurangan, rating, dan rekomendasi.' },
  { title: 'Boarding Pass Penerbangan', textType: 'Travel document', focus: 'Membaca nama penumpang, nomor penerbangan, tujuan, gate, seat, dan boarding time.' },
  { title: 'Resep Makanan Ringan', textType: 'Recipe', focus: 'Memahami bahan, jumlah, langkah memasak, urutan instruksi, dan waktu persiapan.' },
  { title: 'Evaluasi Membaca A2', textType: 'Review test', focus: 'Mengulang scanning, skimming, detail spesifik, kosakata konteks, dan inferensi ringan.' },
];

export default function ElementaryReadingPage() {
  const navigate = useNavigate();
  const completed = getCompletedReadingLessons();
  const total = LESSONS.length;
  const progress = Math.round((completed.length / total) * 100) || 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.reading" subtitle="A2 reading practice with real everyday texts" />

        <div className="px-5 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800">Membaca (A2)</h2>
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
            <p className="text-xs text-slate-500 font-medium mt-1">Setiap lesson berisi bacaan pendek, latihan pemahaman, dan kuis 20 soal.</p>
          </div>

          {LESSONS.map((lesson, i) => {
            const id = i + 1;
            const isCompleted = completed.includes(id);
            const isAvailable = true;

            return (
              <button
                key={id}
                disabled={!isAvailable}
                onClick={() => isAvailable && navigate(`/modul/english/elementary/reading/lesson-${id}`)}
                className={`w-full flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'border-sky-100 bg-green-50 shadow-sm hover:border-sky-300'
                    : 'border-blue-100 bg-white shadow-sm cursor-pointer hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm shrink-0 ${isCompleted ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : id}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-[15px] text-slate-800">{lesson.title}</h3>
                      <span className="text-[10px] font-black uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full">A2 Reading</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500">{lesson.textType} - 20 latihan pemahaman</p>
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
