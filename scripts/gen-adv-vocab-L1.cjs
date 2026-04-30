const fs=require('fs'),path=require('path');
const DIR=path.join(__dirname,'../src/pages/module/english/advanced/vocabulary');
const AC='#0B5345',SK='talky_advanced_vocabulary_completed';

const LESSONS=[
{n:1,title:'Academic Excellence',sub:'Core Academic Word List — C1/C2 Tier',words:[
{word:'Paradigm',type:'N',ipa:'/ˈpær.ə.daɪm/',meaning:'A typical model or framework of thinking in a field',example:'This discovery represents a paradigm shift in physics.',cols:['paradigm shift','new paradigm','dominant paradigm']},
{word:'Ubiquitous',type:'Adj',ipa:'/juːˈbɪk.wɪ.təs/',meaning:'Present or found everywhere simultaneously',example:'Smartphones have become ubiquitous across all social groups.',cols:['increasingly ubiquitous','ubiquitous presence','seemingly ubiquitous']},
{word:'Mitigate',type:'V',ipa:'/ˈmɪt.ɪ.ɡeɪt/',meaning:'To make something less severe, serious, or painful',example:'Measures were implemented to mitigate the environmental damage.',cols:['mitigate risk','mitigate the effects','mitigate damage']},
{word:'Scrutinise',type:'V',ipa:'/ˈskruː.tɪ.naɪz/',meaning:'To examine or inspect closely and thoroughly',example:'The committee scrutinised every line of the financial report.',cols:['scrutinise closely','scrutinise carefully','come under scrutiny']},
{word:'Inherent',type:'Adj',ipa:'/ɪnˈhɪər.ənt/',meaning:'Existing in something as a permanent, essential attribute',example:'There are inherent risks in any form of financial investment.',cols:['inherent risk','inherent problem','inherent value']},
{word:'Constitute',type:'V',ipa:'/ˈkɒn.stɪ.tjuːt/',meaning:'To make up or form the whole; to be equivalent to',example:'These findings constitute strong evidence of systemic failure.',cols:['constitute a threat','constitute a breach','constitute evidence']},
{word:'Preliminary',type:'Adj',ipa:'/prɪˈlɪm.ɪ.nər.i/',meaning:'Coming before or preparing for the main part',example:'The preliminary results of the trial look very promising.',cols:['preliminary findings','preliminary stage','preliminary investigation']},
{word:'Coherent',type:'Adj',ipa:'/kəʊˈhɪər.ənt/',meaning:'Logical and consistent; forming a unified whole',example:'She presented a coherent argument for structural reform.',cols:['coherent argument','coherent strategy','coherent framework']},
{word:'Nuanced',type:'Adj',ipa:'/ˈnjuː.ɑːnst/',meaning:'Characterised by subtle shades of meaning or expression',example:'A nuanced understanding of the conflict is essential for diplomacy.',cols:['nuanced view','nuanced argument','nuanced approach']},
{word:'Salient',type:'Adj',ipa:'/ˈseɪ.li.ənt/',meaning:'Most noticeable or important; prominent',example:'The most salient finding was the correlation between diet and cognition.',cols:['salient point','salient feature','salient factor']},
{word:'Empirical',type:'Adj',ipa:'/ɪmˈpɪr.ɪ.kəl/',meaning:'Based on observation or experiment rather than theory',example:'The hypothesis requires empirical validation before publication.',cols:['empirical evidence','empirical research','empirical data']},
{word:'Replicate',type:'V',ipa:'/ˈrep.lɪ.keɪt/',meaning:'To reproduce or copy; to repeat an experiment to verify results',example:'The findings could not be replicated under controlled conditions.',cols:['replicate results','replicate a study','replicate findings']},
{word:'Hypothesis',type:'N',ipa:'/haɪˈpɒθ.ɪ.sɪs/',meaning:'A proposed explanation to be tested by further investigation',example:'Researchers formulated a hypothesis based on preliminary observations.',cols:['test a hypothesis','null hypothesis','working hypothesis']},
{word:'Corroborate',type:'V',ipa:'/kəˈrɒb.ə.reɪt/',meaning:'To confirm or give support to a statement or theory',example:'These results corroborate what previous studies have suggested.',cols:['corroborate evidence','corroborate findings','corroborate claims']},
{word:'Discrepancy',type:'N',ipa:'/dɪˈskrep.ən.si/',meaning:'A lack of compatibility or similarity between two facts',example:'The discrepancy between projected and actual results demands investigation.',cols:['significant discrepancy','explain the discrepancy','discrepancy between']},
{word:'Posit',type:'V',ipa:'/ˈpɒz.ɪt/',meaning:'To assume something as a fact; to put forward as a basis',example:'She posited that climate change was the primary causal factor.',cols:['posit a theory','posit an argument','posit that']},
{word:'Elucidate',type:'V',ipa:'/ɪˈluː.sɪ.deɪt/',meaning:'To make something clear; to explain',example:'The lecture elucidated several previously misunderstood concepts.',cols:['elucidate a point','elucidate the meaning','elucidate further']},
{word:'Unequivocal',type:'Adj',ipa:'/ˌʌn.ɪˈkwɪv.ə.kəl/',meaning:'Leaving no doubt; clear and unambiguous',example:'The committee issued an unequivocal condemnation of the violations.',cols:['unequivocal support','unequivocal evidence','unequivocal statement']},
{word:'Ostensibly',type:'Adv',ipa:'/ɒˈsten.sɪ.bli/',meaning:'Apparently or purportedly; as it seems on the surface',example:'The policy was ostensibly designed to protect consumers.',cols:['ostensibly designed to','ostensibly neutral','ostensibly independent']},
{word:'Concomitant',type:'Adj',ipa:'/kɒnˈkɒm.ɪ.tənt/',meaning:'Naturally accompanying or associated; happening simultaneously',example:'Rapid urbanisation and concomitant infrastructure pressures require urgent planning.',cols:['concomitant rise','concomitant challenges','concomitant with']},
{word:'Predicated',type:'Adj',ipa:'/ˈpred.ɪ.keɪ.tɪd/',meaning:'Based on or dependent on a particular assumption or condition',example:'The strategy is predicated on the assumption that demand will grow.',cols:['predicated on the assumption','predicated upon evidence','predicated on data']},
{word:'Delineate',type:'V',ipa:'/dɪˈlɪn.i.eɪt/',meaning:'To describe or indicate something precisely',example:'The report delineates the key areas of policy concern.',cols:['delineate clearly','delineate the scope','delineate boundaries']},
{word:'Substantiate',type:'V',ipa:'/səbˈstæn.ʃi.eɪt/',meaning:'To provide evidence to prove something is true',example:'The journalist substantiated every claim with documentary evidence.',cols:['substantiate a claim','substantiate evidence','substantiate findings']},
{word:'Articulate',type:'Adj/V',ipa:'/ɑːˈtɪk.jʊ.lət/',meaning:'Express thoughts clearly and fluently; able to speak well',example:'She articulated the core problem with great intellectual precision.',cols:['articulate clearly','articulate a view','articulate concerns']},
{word:'Contention',type:'N',ipa:'/kənˈten.ʃən/',meaning:'A heated disagreement; a point argued in debate',example:'His main contention is that the current policy has failed.',cols:['main contention','point of contention','central contention']},
{word:'Disseminate',type:'V',ipa:'/dɪˈsem.ɪ.neɪt/',meaning:'To spread or distribute information widely',example:'Findings were disseminated via peer-reviewed journals and open access.',cols:['disseminate information','disseminate findings','widely disseminated']},
{word:'Exacerbate',type:'V',ipa:'/ɪɡˈzæs.ə.beɪt/',meaning:'To make a problem, bad situation, or negative feeling worse',example:'The new policy risks exacerbating existing inequalities in the system.',cols:['exacerbate the problem','exacerbate tensions','exacerbate inequality']},
{word:'Amalgamate',type:'V',ipa:'/əˈmæl.ɡə.meɪt/',meaning:'To combine or unite to form one organisation or structure',example:'The two departments were amalgamated to reduce administrative costs.',cols:['amalgamate with','amalgamate data','amalgamate organisations']},
{word:'Unprecedented',type:'Adj',ipa:'/ʌnˈpres.ɪ.den.tɪd/',meaning:'Never done or known before; novel and historic',example:'The scale of the global pandemic was genuinely unprecedented.',cols:['unprecedented scale','unprecedented level','unprecedented situation']},
{word:'Rigorous',type:'Adj',ipa:'/ˈrɪɡ.ər.əs/',meaning:'Extremely thorough, careful and accurate',example:'The methodology was subjected to rigorous peer review before publication.',cols:['rigorous analysis','rigorous testing','academically rigorous']},
]},
];

function makeQuiz(words){
  const q=[];
  for(let i=0;i<20;i++){
    const w=words[i];
    const d1=words[(i+7)%30].meaning;
    const d2=words[(i+15)%30].meaning;
    const opts=[w.meaning,d1,d2].sort(()=>0.5-Math.random());
    q.push({q:'What does "'+w.word+'" mean?',opts,ans:w.meaning,exp:'"'+w.word+'": '+w.meaning+'. E.g. "'+w.example+'"'});
  }
  return q;
}

function build(lesson){
  const {n,title,sub,words}=lesson;
  const np=n<50?`"/modul/english/advanced/vocabulary/lesson-${n+1}"`:'null';
  const wj=JSON.stringify(words,null,2);
  const quiz=makeQuiz(words);
  const qj=JSON.stringify(quiz,null,2);
  return `import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CheckCircle2,ChevronLeft,BookOpen,Volume2} from 'lucide-react';
const WORDS=${wj};
const QUIZ=${qj};
const AC='${AC}';const NP=${np};const SK='${SK}';const LN=${n};
function getC(){try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}}
function mark(){const d=getC();if(!d.includes(LN))localStorage.setItem(SK,JSON.stringify([...d,LN]))}
const tts=(t)=>{if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-GB';u.rate=0.8;window.speechSynthesis.speak(u)};
export default function AdvancedVocabularyLesson${n}(){
  const nav=useNavigate();
  const[tab,setTab]=useState('materi');
  const[done,setDone]=useState(()=>getC().includes(LN));
  const[modal,setModal]=useState(false);
  const[qi,setQi]=useState(0);const[sel,setSel]=useState(null);
  const[score,setScore]=useState(0);const[fin,setFin]=useState(false);
  const cur=QUIZ[qi];
  const pick=(o)=>{if(sel)return;setSel(o);if(o===cur.ans)setScore(s=>s+1)};
  const next=()=>{if(qi+1<QUIZ.length){setQi(q=>q+1);setSel(null)}else{setFin(true);mark();setDone(true);setModal(true)}};
  const finish=()=>{mark();setDone(true);setModal(true)};
  return(<>
    {modal&&(<div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.65)',backdropFilter:'blur(10px)'}} onClick={()=>setModal(false)}>
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="text-5xl mb-3">{fin?(score>=16?'🏆':'📚'):'✅'}</div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Selesai!</h2>
        {fin&&<p className="text-2xl font-black mb-2" style={{color:AC}}>{score}/{QUIZ.length}</p>}
        <p className="text-slate-500 text-sm mb-6">Advanced Vocabulary — Lesson ${n}: ${title}</p>
        <div className="space-y-3">
          {NP&&<button onClick={()=>{setModal(false);nav(NP)}} className="w-full py-3 rounded-xl font-bold text-white" style={{background:AC}}>Pelajaran Berikutnya →</button>}
          <button onClick={()=>{setModal(false);nav('/modul/english/advanced/vocabulary')}} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
        </div>
      </div>
    </div>)}
    <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={()=>nav(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100"><ChevronLeft className="w-6 h-6 text-slate-600"/></button>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{color:AC}}>C1/C2 Vocabulary — Lesson ${n}/50</p>
            <h1 className="text-sm font-bold text-slate-800 line-clamp-1">${title}</h1>
          </div>
          {NP?<button onClick={()=>nav(NP)} className="px-3 h-9 rounded-full text-xs font-bold" style={{color:AC,background:AC+'18'}}>Next ›</button>:<div className="w-14"/>}
        </div>
      </header>
      <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
        {[['materi','📖 Kosakata (30)'],['kuis','🧠 Kuis 20 Soal']].map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all '+(tab===t?'text-white shadow-md':'text-slate-500')} style={tab===t?{background:AC}:{}}>{label}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 pb-28 space-y-4">
          {tab==='materi'&&(
            <div className="space-y-4">
              <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{background:AC}}>
                <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10"/>
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">📚 30 Advanced Words — Lesson ${n}</span>
                <h2 className="text-xl font-black mt-3 mb-1">${title}</h2>
                <p className="text-sm text-white/85">${sub}</p>
              </div>
              {WORDS.map((w,i)=>(
                <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-black text-slate-800">{w.word}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{backgroundColor:AC}}>{w.type}</span>
                        <span className="text-xs text-slate-400 font-mono">{w.ipa}</span>
                      </div>
                    </div>
                    <button onClick={()=>tts(w.word)} className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-700 shrink-0 mt-1"><Volume2 size={16}/></button>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{w.meaning}</p>
                  <button onClick={()=>tts(w.example)} className="w-full text-left bg-slate-50 rounded-2xl p-3 border border-slate-100 hover:border-slate-300 transition-colors">
                    <p className="text-xs font-semibold mb-1" style={{color:AC}}>📝 Example</p>
                    <p className="text-sm text-slate-700 italic">&ldquo;{w.example}&rdquo;</p>
                  </button>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">🔗 Collocations</p>
                    <div className="flex flex-wrap gap-2">
                      {w.cols.map((c,ci)=>(
                        <button key={ci} onClick={()=>tts(c)} className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100">{c}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab==='kuis'&&(
            <div>
              {!fin?(
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Soal {qi+1}/{QUIZ.length}</span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{background:AC}}>Skor: {score}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{width:\`\${(qi/QUIZ.length)*100}%\`,background:AC}}/>
                  </div>
                  <p className="text-base font-bold text-slate-800 leading-relaxed">{cur.q}</p>
                  <div className="space-y-3">
                    {cur.opts.map(o=>{
                      let cls='bg-slate-50 border-slate-200 text-slate-700';
                      if(sel){if(o===cur.ans)cls='bg-green-50 border-green-500 text-green-800 font-bold';else if(o===sel)cls='bg-red-50 border-red-400 text-red-700';else cls='opacity-50 border-slate-100';}
                      return<button key={o} onClick={()=>pick(o)} className={\`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all \${cls}\`}>{o}</button>;
                    })}
                  </div>
                  {sel&&(<>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-blue-600 mb-1">💡 Penjelasan</p>
                      <p className="text-sm text-blue-700">{cur.exp}</p>
                    </div>
                    <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{background:AC}}>{qi+1<QUIZ.length?'Soal Berikutnya →':'Selesai ✓'}</button>
                  </>)}
                </div>
              ):(
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                  <div className="text-5xl">{score>=16?'🏆':'📚'}</div>
                  <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                  <p className="text-4xl font-black" style={{color:AC}}>{score}/{QUIZ.length}</p>
                  {NP&&<button onClick={()=>nav(NP)} className="w-full py-3 rounded-xl font-bold text-white" style={{background:AC}}>Pelajaran Berikutnya →</button>}
                  <button onClick={()=>nav('/modul/english/advanced/vocabulary')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
        <button onClick={done?()=>nav(-1):finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{background:done?'linear-gradient(135deg,#10B981,#059669)':\`linear-gradient(135deg,\${AC},\${AC}CC)\`}}>
          <CheckCircle2 className="w-5 h-5"/>
          {done?'Selesai ✓ — Kembali':'Tandai Selesai'}
        </button>
      </div>
    </div>
  </>);
}
`;
}

for(const lesson of LESSONS){
  const p=path.join(DIR,'Lesson'+lesson.n+'.tsx');
  fs.writeFileSync(p,build(lesson),'utf8');
  console.log('✅ Lesson'+lesson.n+' written ('+lesson.words.length+' words)');
}
console.log('Done.');
