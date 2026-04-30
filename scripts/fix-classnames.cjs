// fix-classnames.cjs
const fs = require('fs');
const file = 'scripts/generate-inter-writing-enhanced.cjs';
let content = fs.readFileSync(file, 'utf8');

// The problematic string:
const badClass = "className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ${isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}";

// We want to replace it with a string concatenation so the template literal backticks do not close the `return \`...\`` outer block
const goodClass = "className={'flex-1 py-3 text-sm font-bold tracking-wide transition-all rounded-xl flex items-center justify-center gap-2 ' + (isActive ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')}";

content = content.replace(badClass, goodClass);

// Wait, we also need to escape dollar brackets that were UN-escaped by my previous script!
// Right now, the file has literally `${isActive ? ...` 
// Which IS fine because we just removed the backticks around it! 
// Now, let's fix ANY other unescaped `$ {` that SHOULD be passed verbatim to React.
// Actually, ${icons[tab]} is interpreted by the node template! Because `icons` is NOT defined outside the return! 
// This causes `ReferenceError: icons is not defined`!
// Wait! So literally all `${}` that I wanted to output to React were unescaped by my script!
// We need to escape every single `${` except for the ones we WANT evaluated:
// ${spec.title}, ${spec.heroEmoji}, ${spec.heroDesc}, ${spec.topic}, ${id}, ${nextPath}, ${quizItems}, ${comprItems}, ${passagesHtml}
// Any other `${` in the return block must be `\${`!

const goodVariables = [
  'spec.title', 'spec.heroEmoji', 'spec.heroDesc', 'spec.topic', 'id', 'nextPath', 'quizItems', 'comprItems', 'passagesHtml'
];

// Let's just escape ALL `${` to `\${` in the entire file...
content = content.replace(/\$\{([^}]+)\}/g, (match, p1) => {
  if (goodVariables.includes(p1)) {
    return match; // keep as `${...}`
  }
  return '\\${' + p1 + '}'; // escape it
});

fs.writeFileSync(file, content);
console.log('Fixed classNames and escapes in ' + file);
