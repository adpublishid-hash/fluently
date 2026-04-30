import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizEngine, DialoguePlayer, FillBlankExercise, getCompletedListeningLessons, markListeningComplete } from './listeningUtils';
import type { QuizItem, DialogueLine, BlankItem } from './listeningUtils';

const DIALOGUE: DialogueLine[] = [
  { speaker: 'Sari', text: 'Tell me about your family, Riko!', translation: 'Ceritakan tentang keluargamu, Riko!', avatar: '👩' },
  { speaker: 'Riko', text: 'Sure! I have a big family. There are six people in my family.', translation: 'Tentu! Aku punya keluarga besar. Ada enam orang dalam keluargaku.', avatar: '👦' },
  { speaker: 'Sari', text: 'Oh wow! Who are they?', translation: 'Oh wow! Siapa saja mereka?', avatar: '👩' },
  { speaker: 'Riko', text: 'There is my father, my mother, my older brother, my younger sister, my grandfather, and me!', translation: 'Ada ayahku, ibuku, kakak laki-lakiku, adik perempuanku, kakek, dan aku!', avatar: '👦' },
  { speaker: 'Sari', text: 'That is wonderful! What does your father do?', translation: 'Itu luar biasa! Apa pekerjaan ayahmu?', avatar: '👩' },
  { speaker: 'Riko', text: 'My father is a doctor. My mother is a teacher.', translation: 'Ayahku seorang dokter. Ibuku seorang guru.', avatar: '👦' },
  { speaker: 'Sari', text: 'How old is your younger sister?', translation: 'Berapa umur adik perempuanmu?', avatar: '👩' },
  { speaker: 'Riko', text: 'She is eight years old. She is very cute and funny!', translation: 'Dia berumur delapan tahun. Dia sangat lucu dan menggemaskan!', avatar: '👦' },
];

const BLANKS: BlankItem[] = [
  { sentence: 'This is my ___ . She is my mom.', blank: 'mother', opts: ['mother', 'father', 'brother', 'sister'], hint: 'Sebutan untuk ibu dalam bahasa Inggris' },
  { sentence: 'I have one older ___ and two younger sisters.', blank: 'brother', opts: ['brother', 'sister', 'father', 'uncle'], hint: 'Kakak laki-laki' },
  { sentence: 'My ___ is seventy years old. He is my dad\'s dad.', blank: 'grandfather', opts: ['grandfather', 'grandmother', 'uncle', 'cousin'], hint: 'Kakek = ayah dari ayah/ibu' },
  { sentence: 'She is my ___. Her mom is my mom\'s sister.', blank: 'cousin', opts: ['cousin', 'niece', 'aunt', 'sister'], hint: 'Anak dari paman/bibi' },
  { sentence: 'My ___ is a nurse. She is my mom.', blank: 'mother', opts: ['mother', 'father', 'sister', 'daughter'], hint: 'Ibu = mother' },
];

const QUIZ: QuizItem[] = [
  { q: '"Mother" artinya...', opts: ['Ayah', 'Nenek', 'Ibu', 'Bibi'], ans: 'Ibu', exp: '"Mother" = ibu. Informal: "mom" atau "mum".' },
  { q: '"Brother" artinya...', opts: ['Saudara perempuan', 'Saudara laki-laki', 'Sepupu', 'Paman'], ans: 'Saudara laki-laki', exp: '"Brother" = saudara laki-laki (kakak atau adik laki-laki).' },
  { q: '"My older sister" artinya...', opts: ['Adik perempuanku', 'Kakak perempuanku', 'Adik laki-lakiku', 'Kakak laki-lakiku'], ans: 'Kakak perempuanku', exp: '"Older" = lebih tua. "Sister" = saudara perempuan. Jadi = kakak perempuan.' },
  { q: '"Grandfather" artinya...', opts: ['Nenek', 'Paman', 'Kakek', 'Ayah'], ans: 'Kakek', exp: '"Grandfather" = kakek. "Grandmother" = nenek.' },
  { q: '"I have two children." artinya...', opts: ['Saya punya dua saudara.', 'Saya punya dua anak.', 'Saya punya dua teman.', 'Saya punya dua kucing.'], ans: 'Saya punya dua anak.', exp: '"Children" = anak-anak (jamak dari "child").' },
  { q: '"Uncle" artinya...', opts: ['Kakek', 'Paman', 'Bibi', 'Sepupu'], ans: 'Paman', exp: '"Uncle" = paman (saudara dari ayah atau ibu).' },
  { q: '"She is my daughter." artinya...', opts: ['Dia anak perempuanku.', 'Dia saudara perempuanku.', 'Dia ibuku.', 'Dia temanku.'], ans: 'Dia anak perempuanku.', exp: '"Daughter" = anak perempuan. "Son" = anak laki-laki.' },
  { q: '"Aunt" artinya...', opts: ['Paman', 'Nenek', 'Bibi', 'Kakek'], ans: 'Bibi', exp: '"Aunt" = bibi (istri paman atau saudara perempuan orang tua).' },
  { q: '"Cousin" artinya...', opts: ['Kakak', 'Adik', 'Sepupu', 'Teman'], ans: 'Sepupu', exp: '"Cousin" = sepupu (anak dari paman atau bibi).' },
  { q: '"My younger brother is ten years old." artinya...', opts: ['Kakak laki-lakiku berumur 10 tahun.', 'Adik laki-lakiku berumur 10 tahun.', 'Kakak perempuanku berumur 10 tahun.', 'Adik perempuanku berumur 10 tahun.'], ans: 'Adik laki-lakiku berumur 10 tahun.', exp: '"Younger" = lebih muda. "Brother" = saudara laki-laki. = adik laki-laki.' },
  { q: '"There are four people in my family." artinya...', opts: ['Ada empat orang dalam keluargaku.', 'Ada empat anak dalam keluargaku.', 'Aku punya empat saudara.', 'Keluargaku tinggal di nomor 4.'], ans: 'Ada empat orang dalam keluargaku.', exp: '"There are four people" = ada empat orang.' },
  { q: '"What does your mother do?" artinya...', opts: ['Di mana ibumu?', 'Apa yang ibumu lakukan / pekerjaannya?', 'Berapa umur ibumu?', 'Siapa nama ibumu?'], ans: 'Apa yang ibumu lakukan / pekerjaannya?', exp: '"What do/does someone do?" = menanyakan pekerjaan.' },
  { q: '"Grandparents" artinya...', opts: ['Ayah dan ibu', 'Kakek dan nenek', 'Paman dan bibi', 'Kakak dan adik'], ans: 'Kakek dan nenek', exp: '"Grandparents" = kakek dan nenek (grandfather + grandmother).' },
  { q: '"My parents are both doctors." artinya...', opts: ['Orang tuaku adalah dokter dan perawat.', 'Keduanya orang tuaku adalah dokter.', 'Salah satu orang tuaku dokter.', 'Kakek nenekku dokter.'], ans: 'Keduanya orang tuaku adalah dokter.', exp: '"Parents" = orang tua (ayah + ibu). "Both" = keduanya.' },
  { q: '"She is my wife." artinya...', opts: ['Dia tunanganku.', 'Dia pacarku.', 'Dia istriku.', 'Dia temanku.'], ans: 'Dia istriku.', exp: '"Wife" = istri. "Husband" = suami.' },
  { q: '"Sibling" artinya...', opts: ['Orang tua', 'Saudara kandung (kakak/adik)', 'Teman', 'Sepupu'], ans: 'Saudara kandung (kakak/adik)', exp: '"Sibling" = saudara kandung (bisa laki-laki atau perempuan).' },
  { q: '"My nephew is very cute." artinya...', opts: ['Sepupuku sangat lucu.', 'Keponakanku (laki-laki) sangat lucu.', 'Adikku sangat lucu.', 'Anak tetanggaku sangat lucu.'], ans: 'Keponakanku (laki-laki) sangat lucu.', exp: '"Nephew" = keponakan laki-laki. "Niece" = keponakan perempuan.' },
  { q: '"Only child" artinya...', opts: ['Anak bungsu', 'Anak pertama', 'Anak tunggal', 'Anak kembar'], ans: 'Anak tunggal', exp: '"Only child" = anak tunggal (tidak punya saudara).' },
  { q: '"My father\'s mother is my ___."', opts: ['aunt', 'cousin', 'grandmother', 'mother'], ans: 'grandmother', exp: 'Ibu dari ayah = nenek = grandmother.' },
  { q: '"Twins" artinya...', opts: ['Anak sulung', 'Anak bungsu', 'Anak kembar', 'Anak tunggal'], ans: 'Anak kembar', exp: '"Twins" = anak kembar (dua anak lahir bersamaan).' },
];

const ListeningLesson3: React.FC = () => {
  const navigate = useNavigate();
  const nextPath = '/modul/english/beginner/listening/lesson-4';
  const [isCompleted, setIsCompleted] = React.useState(() => getCompletedListeningLessons().includes(3));
  const [showModal, setShowModal] = React.useState(false);
  const [activeTab, setActiveTab] = useState<'simak' | 'latihan' | 'kuis'>('simak');
  const handleComplete = () => { markListeningComplete(3); setIsCompleted(true); setShowModal(true); };

  const familyVocab = [
    { en: 'Father / Dad', id: 'Ayah', icon: '👨' }, { en: 'Mother / Mom', id: 'Ibu', icon: '👩' },
    { en: 'Brother', id: 'Saudara laki-laki', icon: '👦' }, { en: 'Sister', id: 'Saudara perempuan', icon: '👧' },
    { en: 'Grandfather', id: 'Kakek', icon: '👴' }, { en: 'Grandmother', id: 'Nenek', icon: '👵' },
    { en: 'Uncle', id: 'Paman', icon: '🧔' }, { en: 'Aunt', id: 'Bibi', icon: '👩‍🦱' },
    { en: 'Cousin', id: 'Sepupu', icon: '🧒' }, { en: 'Son', id: 'Anak laki-laki', icon: '👦' },
    { en: 'Daughter', id: 'Anak perempuan', icon: '👧' }, { en: 'Husband / Wife', id: 'Suami / Istri', icon: '💑' },
  ];

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg,#8E44AD,#6C3483)' }}><span style={{ fontSize: 38 }}>🏆</span></div>
            <h2 className="text-xl font-extrabold mb-1">Lesson 3 Selesai! 🎉</h2>
            <p className="text-sm text-gray-500 mb-5">Kamu sudah bisa memahami percakapan tentang keluarga!</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-purple-500">Lesson 4 ›</button>
              <button onClick={() => { setShowModal(false); navigate(-1); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700">Kembali</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>
            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">Keluargaku</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Listening • Lesson 3</p></div>
            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-purple-500">Next ›</button>
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">
          {(['simak', 'latihan', 'kuis'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-purple-600 border-b-2 border-purple-500' : 'text-slate-400'}`}>
              {tab === 'simak' ? '🎧 Simak' : tab === 'latihan' ? '✏️ Latihan' : '🎯 Kuis'}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-28 space-y-5">
            {activeTab === 'simak' && (
              <>
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-5 text-white shadow-lg">
                  <h2 className="text-lg font-extrabold mb-1">Keluargaku</h2>
                  <p className="text-sm text-purple-100">Pelajari kosakata anggota keluarga dan cara mendengar serta memahami percakapan tentang keluarga!</p>
                </div>
                <div className="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden">
                  <div className="bg-purple-50 px-4 py-2.5 border-b border-purple-100">
                    <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wide">👨‍👩‍👧‍👦 Anggota Keluarga</p>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {familyVocab.map(f => (
                      <div key={f.en} className="bg-slate-50 rounded-xl px-3 py-2 flex items-center gap-2">
                        <span className="text-xl">{f.icon}</span>
                        <div><p className="text-xs font-extrabold text-slate-800">{f.en}</p><p className="text-xs text-purple-600">{f.id}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <DialoguePlayer title="Percakapan: Cerita Tentang Keluarga" lines={DIALOGUE} />
              </>
            )}
            {activeTab === 'latihan' && <FillBlankExercise items={BLANKS} />}
            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}
          </div>
        </div>
        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">
          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]" style={{ background: isCompleted ? 'linear-gradient(135deg,#4FA3D1,#1E6F9F)' : 'linear-gradient(135deg,#8E44AD,#6C3483)' }}>
            {isCompleted ? '✅ Sudah Selesai' : '✅ Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ListeningLesson3;
