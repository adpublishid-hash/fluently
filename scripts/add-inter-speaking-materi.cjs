const fs = require('fs');
const path = require('path');

const SPEAKING_SUMMARIES = {
    1: "Bercerita tentang pengalaman pribadi, karir, dan perjalanan masa lalu menggunakan Past Tense dan Present Perfect. Pelajari ragam frasa untuk merespons percakapan kasual.",
    2: "Menavigasi pembicaraan seputar edukasi, wawancara kerja, dan lingkungan kerja profesional. Fokus pada struktur kalimat yang lebih sopan (Formal).",
    3: "Menjelajahi kosa kata era modern: remote work, AI, social media, dan keamanan digital. Praktikkan skenario terkait masalah teknologi harian.",
    4: "Berdiskusi santai maupun serius mengenai olahraga, gaya hidup, hingga janji temu dengan dokter.",
    5: "Mempelajari cara membangun opini ekologis: pemanasan global, polusi, dan gaya hidup berkelanjutan.",
    6: "Tingkatkan kosakata untuk diskusi berat: berita internasional, ekonomi makro, hingga kemiskinan global.",
    7: "Menyampaikan pemikiran kritis mengenai isu sosial seperti kesetaraan, pendidikan, dan hak-hak masyarakat urban.",
    8: "Melatih filter opini: membicarakan berita viral, hoax, liputan jurnalisme, dan bias stasiun berita.",
    9: "Resolusi konflik, memberikan nasehat (advice), dan mengungkapkan simpati (sympathy) kepada sahabat maupun kolega.",
    10: "Simulasi presentasi penelitian, diskusi proyek kuliah, hingga bimbingan dosen.",
    11: "Menyelami emosi. Cara sopan menyampaikan rasa frustrasi, empati, serta merayakan kesuksesan.",
    12: "Mengenal 'Phrasal Verbs' kunci di percakapan sehari-hari seperti 'look into', 'bring up', dan 'turn out'.",
    13: "Berlatih menggunakan kiasan/Idiom (e.g. 'piece of cake', 'under the weather') agar terdengar seperti native speaker.",
    14: "Menyelesaikan masalah mendadak: komplain di hotel, ketinggalan pesawat, hingga kehilangan barang bawaan.",
    15: "Teknik 'Ice Breaking' dan transisi pergantian slide yang mulus untuk public speaking.",
    16: "Merangkai plot. Bagaimana menahan perhatian audiens menggunakan intonasi cerita yang berbobot.",
    17: "Belum tentu setuju? Belajar frasa penolakan sopan (Polite disagreements) dan mendukung argumen dengan data.",
    18: "Teknik tawar menawar (Bargaining) hingga mencari titik temu (Win-Win Solution) dalam negosiasi.",
    19: "Small-talk soal cuaca hingga peristiwa geopolitik dunia saat bertemu teman lama.",
    20: "Waktunya simulasi akhir. Terapkan gabungan idiom, intonasi, dan kosakata tingkat lanjut dalam obrolan panjang!"
};

const UI_UPDATED = `
            <div className="grid gap-6 mb-6">
              {CONVERSATION_SCENARIOS.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Card Header */}
                  <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 uppercase tracking-wide">Dialog {idx + 1}</span>
                        <span className={"text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide " + (item.level?.toLowerCase() === 'formal' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")}>
                          {item.level || 'Casual'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{item.context || item.desc}</p>
                    </div>
                  </div>

                  {/* Dialogue Flow */}
                  <div className="p-5 space-y-4 bg-slate-50/30">
                    {item.dialogue && item.dialogue.map((line: any, i: number) => {
                      const isLeft = line.speaker === 'A';
                      return (
                        <div key={i} className={\`flex flex-col \${isLeft ? 'items-start' : 'items-end'}\`}>
                          <span className="text-[10px] font-bold text-slate-400 mb-1 px-1">{line.name || line.speaker}</span>
                          <div className="flex items-end gap-2 max-w-[85%]">
                            {!isLeft && (
                              <button onClick={() => playSound(line.text)} className="w-6 h-6 shrink-0 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Volume2 className="w-3 h-3" />
                              </button>
                            )}
                            <div className={\`p-3 rounded-2xl \${isLeft ? 'bg-white border border-slate-100 rounded-bl-sm shadow-sm' : 'bg-indigo-600 text-white rounded-br-sm shadow-md'}\`}>
                              <p className={\`text-sm font-medium \${isLeft ? 'text-slate-800' : 'text-white'}\`}>{line.text}</p>
                              {line.translation && (
                                <p className={\`text-xs mt-1 pt-1 border-t \${isLeft ? 'text-slate-500 border-slate-100' : 'text-indigo-200 border-indigo-500/50'}\`}>
                                  {line.translation}
                                </p>
                              )}
                            </div>
                            {isLeft && (
                              <button onClick={() => playSound(line.text)} className="w-6 h-6 shrink-0 rounded-full bg-white border border-slate-200 text-slate-400 flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                <Volume2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>`;

for (let i = 1; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/speaking/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Replace undefined placeholder with summary
  content = content.replace(
      '<p className="text-sm opacity-90 leading-relaxed">undefined...</p>',
      `<p className="text-sm opacity-90 leading-relaxed">${SPEAKING_SUMMARIES[i]}</p>`
  );
  
  // Also handle "Menghubungkan Informasi", "Cerita Anda" replace with accurate titles maybe?
  // We'll leave the title alone if it has one dynamically, or we can replace the block
  
  // Replace the old grid loop starting with <div className="grid gap-4 mb-6">
  // Since regex on big HTML chunks is hard, let's use string indexOf
  const startIdx = content.indexOf('<div className="grid gap-4 mb-6">');
  const endMarker = '</div>\n          </div>\n        </div>';
  const endIdx = content.indexOf(endMarker, startIdx);
  
  if (startIdx !== -1 && endIdx !== -1 && content.includes('{CONVERSATION_SCENARIOS.map')) {
      const beforeStr = content.substring(0, startIdx);
      const afterStr = content.substring(endIdx);
      content = beforeStr + UI_UPDATED + '\n          ' + afterStr;
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Speaking Lesson ' + i);
}
console.log('Done.');
