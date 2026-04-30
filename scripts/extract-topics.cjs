const fs=require('fs');
let res='';
for(let i=1;i<=20;i++){
  const f='src/pages/module/english/intermediate/grammar/Lesson'+i+'.tsx';
  if(!fs.existsSync(f)) continue;
  const c=fs.readFileSync(f,'utf8');
  const t=c.match(/title=\"([^\"]+)\"/);
  if(t) res+=`Lesson ${i}: ${t[1]}\n`;
}
fs.writeFileSync('topics.txt', res);
console.log('done');
