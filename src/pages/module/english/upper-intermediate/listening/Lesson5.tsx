import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';
import { Headphones, PenTool, CheckCircle2, ChevronLeft } from 'lucide-react';

const DIALOGUE: DialogueLine[] = [
  { "speaker": "Dr. Afolabi", "avatar": "👩‍🏫", "text": "Good afternoon. Today's lecture addresses one of the defining challenges of the 21st century: how do we design cities that are simultaneously sustainable, equitable, and liveable, given that by 2050 two-thirds of humanity will live in urban areas? The concept of the 'smart city' has emerged as one influential answer — but it is not without significant critique.", "translation": "Selamat siang. Kuliah hari ini membahas salah satu tantangan paling menentukan abad ke-21: bagaimana kita merancang kota yang secara bersamaan berkelanjutan, adil, dan layak huni, mengingat bahwa pada tahun 2050 dua pertiga umat manusia akan tinggal di daerah perkotaan? Konsep 'kota pintar' telah muncul sebagai salah satu jawaban berpengaruh — tetapi tidak luput dari kritik yang signifikan." },
  { "speaker": "Dr. Afolabi", "avatar": "👩‍🏫", "text": "Smart cities use digital technology — sensors, data analytics, Internet of Things infrastructure — to optimise urban systems. Traffic flows can be managed in real-time, energy grids can respond dynamically to demand, public safety systems can be enhanced through data integration. Singapore and Barcelona are often cited as leading examples.", "translation": "Kota pintar menggunakan teknologi digital — sensor, analitik data, infrastruktur Internet of Things — untuk mengoptimalkan sistem perkotaan. Arus lalu lintas dapat dikelola secara real-time, jaringan energi dapat merespons secara dinamis terhadap permintaan, sistem keselamatan publik dapat ditingkatkan melalui integrasi data. Singapura dan Barcelona sering disebut sebagai contoh-contoh terkemuka." },
  { "speaker": "Student A", "avatar": "🙋", "text": "But doesn't the surveillance aspect of smart cities raise serious privacy concerns?", "translation": "Tapi bukankah aspek pengawasan kota pintar menimbulkan kekhawatiran privasi yang serius?" },
  { "speaker": "Dr. Afolabi", "avatar": "👩‍🏫", "text": "Absolutely — and this is the central tension. The more data you collect to optimise a city, the greater the surveillance capability. China's smart city initiatives, for example, integrate facial recognition at a level that most Western democracies would find deeply problematic. There is a fundamental question of who controls the data, for what purpose, and with what oversight.", "translation": "Tentu saja — dan inilah ketegangan sentralnya. Semakin banyak data yang Anda kumpulkan untuk mengoptimalkan kota, semakin besar kemampuan pengawasannya. Inisiatif kota pintar Tiongkok, misalnya, mengintegrasikan pengenalan wajah pada tingkat yang sebagian besar demokrasi Barat akan menganggapnya sangat bermasalah. Ada pertanyaan mendasar tentang siapa yang mengontrol data, untuk tujuan apa, dan dengan pengawasan apa." },
  { "speaker": "Student B", "avatar": "🙋‍♀️", "text": "What about the 15-minute city concept? Is that more about social design than technology?", "translation": "Bagaimana dengan konsep kota 15 menit? Apakah itu lebih tentang desain sosial daripada teknologi?" },
  { "speaker": "Dr. Afolabi", "avatar": "👩‍🏫", "text": "Excellent question. The 15-minute city, associated with Paris and Carlos Moreno's work, proposes that all essential services — work, schools, healthcare, parks, shops — should be accessible within a 15-minute walk or cycle from home. It prioritises human scale, mixed-use zoning, and public space over car-centric infrastructure. Paris has been implementing this vision, transforming roads into cycle lanes and pedestrian areas under Mayor Hidalgo.", "translation": "Pertanyaan yang sangat bagus. Kota 15 menit, yang terkait dengan Paris dan karya Carlos Moreno, mengusulkan bahwa semua layanan penting — kerja, sekolah, perawatan kesehatan, taman, toko — harus dapat diakses dalam 15 menit berjalan kaki atau bersepeda dari rumah. Ini mengutamakan skala manusia, zonasi campuran, dan ruang publik daripada infrastruktur yang berpusat pada mobil. Paris telah menerapkan visi ini, mengubah jalan menjadi jalur sepeda dan area pejalan kaki di bawah Walikota Hidalgo." },
  { "speaker": "Student A", "avatar": "🙋", "text": "And gentrification? Improving urban areas seems to inevitably price out original residents.", "translation": "Dan gentrifikasi? Memperbaiki kawasan perkotaan tampaknya secara tak terhindarkan menggulingkan penghuni asli." },
  { "speaker": "Dr. Afolabi", "avatar": "👩‍🏫", "text": "This is the deepest tension in urban regeneration. Evidence consistently shows that improving an area increases property values, which can displace lower-income residents who created the community character that made the area attractive in the first place. Mitigating gentrification requires protected affordable housing stock, community land trusts, and policies that ensure existing residents benefit from improvements rather than being displaced by them.", "translation": "Ini adalah ketegangan terdalam dalam regenerasi perkotaan. Bukti secara konsisten menunjukkan bahwa meningkatkan suatu kawasan meningkatkan nilai properti, yang dapat memindahkan penduduk berpendapatan lebih rendah yang menciptakan karakter komunitas yang membuat kawasan tersebut menarik sejak awal. Mitigasi gentrifikasi membutuhkan stok perumahan terjangkau yang dilindungi, kepercayaan tanah komunitas, dan kebijakan yang memastikan penduduk yang ada mendapat manfaat dari peningkatan daripada dipindahkan olehnya." }
];

const BLANKS: BlankItem[] = [
  { "sentence": "By 2050, two-thirds of humanity will live in ___ areas.", "blank": "urban", "opts": ["urban", "rural", "coastal", "forest"], "hint": "Kawasan perkotaan / kota" },
  { "sentence": "Smart cities use ___ to optimise city systems.", "blank": "sensors", "opts": ["sensors", "teachers", "lawyers", "markers"], "hint": "Alat yang mengumpulkan data lingkungan" },
  { "sentence": "The 15-minute city is associated with Paris and Carlos ___.", "blank": "Moreno", "opts": ["Moreno", "Martinez", "Murphy", "Monroe"], "hint": "Nama ilmuwan perkotaan yang mengembangkan konsep ini" },
  { "sentence": "Paris has transformed roads into ___ lanes and pedestrian areas.", "blank": "cycle", "opts": ["cycle", "bus", "taxi", "train"], "hint": "Jalur untuk sepeda" },
  { "sentence": "Gentrification displaces ___ residents from improved areas.", "blank": "lower-income", "opts": ["lower-income", "high-income", "elderly", "foreign"], "hint": "Penduduk dengan penghasilan rendah yang tidak mampu membayar harga baru" },
  { "sentence": "___ land trusts help protect affordable housing from gentrification.", "blank": "Community", "opts": ["Community", "Corporate", "Central", "Cultural"], "hint": "Kepemilikan tanah yang dikelola bersama oleh komunitas" },
  { "sentence": "Singapore and Barcelona are cited as ___ of smart cities.", "blank": "examples", "opts": ["examples", "enemies", "experiments", "extremes"], "hint": "Contoh yang sering disebutkan" }
];

const QUIZ: QuizItem[] = [
  { "q": "What percentage of humanity is projected to live in urban areas by 2050?", "opts": ["One third", "One half", "Two thirds", "Three quarters"], "ans": "Two thirds", "exp": "Dr. Afolabi states: 'by 2050 two-thirds of humanity will live in urban areas.'" },
  { "q": "Which of the following technologies are mentioned as part of smart city infrastructure?", "opts": ["Nuclear power and space technology", "Sensors, data analytics, and Internet of Things", "Drone delivery and 3D printing", "Cryptocurrency and blockchain"], "ans": "Sensors, data analytics, and Internet of Things", "exp": "The lecture names 'sensors, data analytics, Internet of Things infrastructure' as smart city technologies." },
  { "q": "Which two cities are cited as leading smart city examples?", "opts": ["New York and London", "Tokyo and Seoul", "Singapore and Barcelona", "Dubai and Amsterdam"], "ans": "Singapore and Barcelona", "exp": "Dr. Afolabi says: 'Singapore and Barcelona are often cited as leading examples.'" },
  { "q": "What is identified as the 'central tension' of smart cities?", "opts": ["The high cost of sensors", "The more data collected to optimise, the greater the surveillance capability", "The difficulty of training engineers", "The incompatibility with traditional architecture"], "ans": "The more data collected to optimise, the greater the surveillance capability", "exp": "Dr. Afolabi says this is 'the central tension' — optimisation requires data collection which enables surveillance." },
  { "q": "Whose work is the '15-minute city' concept associated with?", "opts": ["Elon Musk", "Carlos Moreno", "Jeff Bezos", "Angela Merkel"], "ans": "Carlos Moreno", "exp": "The lecturer says: 'the 15-minute city, associated with Paris and Carlos Moreno's work.'" },
  { "q": "What does the 15-minute city concept propose?", "opts": ["All city services accessible by car in 15 minutes", "All essential services accessible within 15 minutes walking or cycling from home", "City centres rebuilt every 15 years", "15 minutes of free transport for all residents"], "ans": "All essential services accessible within 15 minutes walking or cycling from home", "exp": "It proposes 'all essential services — work, schools, healthcare, parks, shops — should be accessible within a 15-minute walk or cycle from home.'" },
  { "q": "Paris implemented the 15-minute city vision by:", "opts": ["Building more motorways and car parks", "Installing smart traffic lights", "Transforming roads into cycle lanes and pedestrian areas under Mayor Hidalgo", "Moving government offices to the suburbs"], "ans": "Transforming roads into cycle lanes and pedestrian areas under Mayor Hidalgo", "exp": "The lecturer says Paris has been 'transforming roads into cycle lanes and pedestrian areas under Mayor Hidalgo.'" },
  { "q": "What is 'gentrification'?", "opts": ["When governments force poor people to move", "When improving an area increases property values, displacing lower-income original residents", "When wealthy people move to rural areas", "A type of urban farming"], "ans": "When improving an area increases property values, displacing lower-income original residents", "exp": "The lecturer says evidence shows improving an area 'increases property values, which can displace lower-income residents who created the community character.'" },
  { "q": "What three mechanisms does the lecture suggest for mitigating gentrification?", "opts": ["Higher taxes, more police, and better schools", "Protected affordable housing, community land trusts, and policies ensuring residents benefit", "Rent freezes, income limits, and building bans", "Tourism restrictions, noise regulations, and parking restrictions"], "ans": "Protected affordable housing, community land trusts, and policies ensuring residents benefit", "exp": "The lecture names 'protected affordable housing stock, community land trusts, and policies that ensure existing residents benefit.'" },
  { "q": "What concern does Student A raise about smart cities?", "opts": ["The high cost to taxpayers", "Privacy concerns from surveillance data collection", "Environmental damage from sensor networks", "Unfair access for disabled citizens"], "ans": "Privacy concerns from surveillance data collection", "exp": "Student A asks: 'doesn't the surveillance aspect of smart cities raise serious privacy concerns?'" },
  { "q": "Which country's smart city initiatives are criticised for integrating facial recognition at a problematic level?", "opts": ["United States", "Japan", "China", "Germany"], "ans": "China", "exp": "Dr. Afolabi says: 'China's smart city initiatives... integrate facial recognition at a level that most Western democracies would find deeply problematic.'" },
  { "q": "What is 'mixed-use zoning'?", "opts": ["Industrial zones with recycling facilities", "Areas where residential, commercial, and public uses coexist rather than separated", "City districts designated for technology firms only", "Historic preservation zones"], "ans": "Areas where residential, commercial, and public uses coexist rather than separated", "exp": "Mixed-use zoning allows different functions — homes, shops, offices, parks — to exist in the same zone rather than separated into different districts." },
  { "q": "The 15-minute city prioritises what over car-centric infrastructure?", "opts": ["Economic efficiency", "Political control", "Human scale, mixed-use zoning, and public space", "Digital connectivity"], "ans": "Human scale, mixed-use zoning, and public space", "exp": "The lecture says it 'prioritises human scale, mixed-use zoning, and public space over car-centric infrastructure.'" },
  { "q": "What is a 'community land trust'?", "opts": ["A government department managing public lands", "A trust company investing in property", "A community-managed system of land ownership that protects affordable housing", "An international agreement on urban planning standards"], "ans": "A community-managed system of land ownership that protects affordable housing", "exp": "Community land trusts are mentioned as a mechanism to protect existing affordable housing from market-driven price increases." },
  { "q": "What fundamental question does Dr. Afolabi raise about smart city data?", "opts": ["Whether technology companies will profit", "Who controls the data, for what purpose, and with what oversight", "How much the infrastructure will cost", "Whether sensors can survive extreme weather"], "ans": "Who controls the data, for what purpose, and with what oversight", "exp": "She says: 'There is a fundamental question of who controls the data, for what purpose, and with what oversight.'" },
  { "q": "What can traffic flows do in a smart city?", "opts": ["Be controlled only by traffic police", "Be managed in real-time through digital systems", "Only be monitored, not managed", "Be completely eliminated through urban design"], "ans": "Be managed in real-time through digital systems", "exp": "The lecture states: 'Traffic flows can be managed in real-time' — one of the smart city optimisation examples." },
  { "q": "What irony about gentrification does Dr. Afolabi identify?", "opts": ["Improvements make cities less safe", "Improvements displace the very residents whose character made the area attractive", "Developers always lose money on regeneration projects", "Smart technology makes areas less liveable"], "ans": "Improvements displace the very residents whose character made the area attractive", "exp": "She says lower-income residents 'created the community character that made the area attractive in the first place' — but improvements then price them out." },
  { "q": "What does 'urban resilience' mean in city planning?", "opts": ["The strength of city buildings", "A city's ability to withstand, adapt to, and recover from crises", "The number of emergency services available", "Urban tree coverage and green infrastructure"], "ans": "A city's ability to withstand, adapt to, and recover from crises", "exp": "Urban resilience refers to a city's capacity to cope with and recover from shocks — floods, economic crises, pandemics, etc." },
  { "q": "The lecture's approach to urban planning is best described as:", "opts": ["Uncritically pro-technology", "Anti-technology and nostalgic", "Balanced — presenting both innovations and their tensions and limitations", "Focused only on environmental sustainability"], "ans": "Balanced — presenting both innovations and their tensions and limitations", "exp": "Dr. Afolabi presents smart cities and the 15-minute city positively but critically explores privacy concerns and gentrification tensions." },
  { "q": "The word 'liveable' in the context of urban planning means:", "opts": ["Legally permissible as a residence", "Affordable to buy", "Creating a comfortable, enjoyable, and sustainable quality of life for residents", "Built to strict safety standards"], "ans": "Creating a comfortable, enjoyable, and sustainable quality of life for residents", "exp": "'Liveable' cities are those designed around human wellbeing — safe, clean, accessible, and providing high quality of life." }
];

const VOCAB = [
  { "en": "Urban density", "id": "Kepadatan urban – jumlah penduduk per unit area kota" },
  { "en": "Smart grid", "id": "Jaringan pintar – sistem energi terkelola berbasis teknologi" },
  { "en": "Transit-oriented development", "id": "Pembangunan berorientasi transit – berpusat di transportasi publik" },
  { "en": "Gentrification", "id": "Gentrifikasi – pembaruan kota yang menggeser penghuni asli" },
  { "en": "Urban resilience", "id": "Ketahanan perkotaan – kemampuan kota pulih dari krisis" },
  { "en": "Mixed-use zoning", "id": "Zonasi campuran – area dengan berbagai fungsi bangunan" },
  { "en": "Congestion pricing", "id": "Harga kemacetan – biaya untuk memasuki zona padat kota" },
  { "en": "15-minute city", "id": "Kota 15 menit – konsep semua kebutuhan dalam jarak berjalan kaki" }
];

export default function UpperInterListeningLesson5() {
  const navigate = useNavigate();
  const nextPath = '/modul/english/upper-intermediate/listening/lesson-6';
  const STORAGE_KEY = 'talky_upper_intermediate_listening_completed';

  const getCompleted = (): number[] => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
  };
  const markComplete = (n: number) => {
    const d = getCompleted();
    if (!d.includes(n)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, n]));
  };

  const [isCompleted, setIsCompleted] = useState(() => getCompleted().includes(5));
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');

  const handleComplete = () => { markComplete(5); setIsCompleted(true); setShowModal(true); };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-32 rounded-t-[2rem] -z-10 bg-gradient-to-br from-sky-600 to-blue-500" />
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 bg-white shadow-xl border-4 border-white/80 mt-4"><span className="text-5xl">🎧</span></div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Lesson Selesai! 🎉</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">Selamat! Anda berhasil memahami materi B2 tentang: <strong>Lecture: Smart Cities and Sustainable Urban Design</strong>.</p>
            <div className="space-y-3">
              {nextPath && <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95" style={{ backgroundColor: '#059669' }}>Pelajari Materi Selanjutnya</button>}
              <button onClick={() => setShowModal(false)} className="w-full py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"><ChevronLeft className="w-6 h-6" /></button>
            <div className="text-center">
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">Lecture: Smart Cities and Sustainable Urban Design</h1>
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#059669' }}>Upper-Intermediate Listening • L5</p>
            </div>
            {nextPath && <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold transition-colors" style={{ color: '#059669', backgroundColor: '#05966918' }}>Next ›</button>}
            {!nextPath && <div className="w-14" />}
          </div>
        </header>

        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 p-2 gap-2 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => {
            const labels = { simak: 'Simak TTS', latihan: 'Isi Rumpang', kuis: 'Kuis 20 Soal' };
            const icons = { simak: <Headphones className="w-4 h-4" />, latihan: <PenTool className="w-4 h-4" />, kuis: <CheckCircle2 className="w-4 h-4" /> };
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'text-white shadow-md' : 'text-slate-500 hover:bg-slate-50')}
                style={isActive ? { backgroundColor: '#059669' } : {}}>
                {icons[tab]} {labels[tab]}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-6">
            {activeTab === 'simak' && (
              <div className="animate-fade-in space-y-6">
                <div className="bg-gradient-to-br from-sky-600 to-blue-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-20"><Headphones className="w-24 h-24" /></div>
                  <h2 className="text-xl md:text-2xl font-extrabold mb-2 relative z-10">B2 Listening: Lecture: Smart Cities and Sustainable Urban Design</h2>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg relative z-10">Kuliah: Kota Pintar dan Desain Perkotaan Berkelanjutan</p>
                  <div className="mt-3 inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">🎧 CEFR B2 · Upper-Intermediate Listening</div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-3xl" style={{ backgroundColor: '#059669' }} />
                  <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: '#059669' }}>📖 KOSAKATA B2 KUNCI</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {VOCAB.map((v: { en: string; id: string }) => (
                      <div key={v.en} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-slate-100 transition-colors">
                        <span className="text-sm font-bold text-slate-800">{v.en}</span>
                        <span className="text-xs font-medium text-right max-w-[60%] leading-tight" style={{ color: '#059669' }}>{v.id}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <DialoguePlayer title="Lecture: Smart Cities and Sustainable Urban Design" lines={DIALOGUE} />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">💡 Tips Listening B2</p>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Fokus pada <strong>argumen utama</strong>, bukan setiap kata</li>
                    <li>• Perhatikan <strong>signal words</strong>: however, therefore, despite, in contrast</li>
                    <li>• Catat <strong>data dan angka kunci</strong> yang disebutkan pembicara</li>
                    <li>• Identifikasi <strong>perspektif berbeda</strong> dari setiap pembicara</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'latihan' && (
              <div className="animate-fade-in">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Isi Rumpang (Fill in the Blank)</h3>
                  <p className="text-sm text-slate-500">Gunakan konteks dari dialog di atas untuk memilih kata yang tepat. Topik: Perencanaan Kota & Inovasi</p>
                </div>
                <FillBlankExercise items={BLANKS} />
              </div>
            )}

            {activeTab === 'kuis' && (
              <div className="animate-fade-in">
                <QuizEngine items={QUIZ} onComplete={handleComplete} />
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete}
            className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all hover:shadow-xl"
            style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#059669,#059669CC)' }}>
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Sudah Selesai ✓ (Kembali)' : 'Tandai Selesai ✓'}
          </button>
        </div>
      </div>
    </>
  );
}
