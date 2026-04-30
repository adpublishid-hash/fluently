const fs = require('fs');
const path = require('path');

const UI_UPDATED = `
            {/* Scenario Selector */}
            <section className="mb-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Pilih Situasi</h3>
              <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                {CONVERSATION_SCENARIOS.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenario(scenario.id)}
                    className={\`flex-shrink-0 px-5 py-3 rounded-xl border transition-all \${activeScenario === scenario.id
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md transform scale-105'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                      }\`}
                  >
                    <span className="block text-sm font-bold whitespace-nowrap">{scenario.title}</span>
                    <span className="block text-[10px] opacity-70 mt-0.5 text-left">{scenario.level}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Active Conversation Display */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{currentScenario.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{currentScenario.context || currentScenario.desc}</p>
                </div>
                <div className={\`px-3 py-1 rounded-full text-xs font-bold \${currentScenario.level?.toLowerCase() === 'formal' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}\`}>
                  {currentScenario.level || 'Casual'}
                </div>
              </div>

              <div className="space-y-6">
                {currentScenario.dialogue?.map((line: any, idx: number) => {
                  const isLeft = line.speaker === 'A';
                  return (
                    <div key={idx} className={\`flex gap-4 \${!isLeft ? 'flex-row-reverse' : ''}\`}>
                      <div className={\`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-sm \${isLeft ? 'bg-sky-100 text-sky-600' : 'bg-indigo-100 text-indigo-600'}\`}>
                        {line.speaker}
                      </div>

                      <div className="flex-1 max-w-[85%] group">
                        <div className={\`p-4 rounded-2xl relative \${isLeft
                            ? 'bg-slate-50 text-slate-800 rounded-tl-sm border border-slate-100'
                            : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'
                          }\`}>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className={\`text-[10px] font-bold opacity-70 uppercase tracking-wide \${isLeft ? 'text-slate-400' : 'text-indigo-200'}\`}>{line.name}</span>
                            <button
                              onClick={() => playSound(line.text)}
                              className={\`transition-colors \${isLeft ? 'text-slate-400 hover:text-sky-600' : 'text-indigo-300 hover:text-white'}\`}
                            >
                              <Volume2 size={16} />
                            </button>
                          </div>
                          <p className="text-base font-medium leading-relaxed">{line.text}</p>
                          {line.translation && (
                            <p className={\`text-xs mt-2 pt-2 border-t italic \${isLeft ? 'text-slate-500 border-slate-200' : 'text-indigo-200 border-indigo-500/50'}\`}>
                              {line.translation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>`;

for (let i = 1; i <= 20; i++) {
  const file = path.join(__dirname, '../src/pages/module/english/intermediate/speaking/Lesson' + i + '.tsx');
  if (!fs.existsSync(file)) continue;

  let content = fs.readFileSync(file, 'utf8');

  // Insert state hooks if they don't exist
  if (!content.includes('const [activeScenario')) {
      const hookInjection = `  const [activeScenario, setActiveScenario] = useState<string>(CONVERSATION_SCENARIOS[0].id);\n  const currentScenario = CONVERSATION_SCENARIOS.find(c => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];\n`;
      content = content.replace(/(const playSound =)/, hookInjection + '\n  $1');
  }

  // Find the old grid mapping manually and replace with our new UI block
  const oldGridStart = '<div className="grid gap-6 mb-6">';
  const gridStartIdx = content.indexOf(oldGridStart);
  if (gridStartIdx !== -1) {
      // Find the closing of this grid. The old grid ended with:
      //             </div>
      //           </div>
      //         </div>
      //       ) : (
      const endMarkerRegex = /<\/div>\s*<\/div>\s*<\/div>\s*\)\s*:\s*\(/;
      
      const match = endMarkerRegex.exec(content.substring(gridStartIdx));
      if (match) {
          const beforeGrid = content.substring(0, gridStartIdx);
          const afterGrid = content.substring(gridStartIdx + match.index);
          content = beforeGrid + UI_UPDATED + '\n          ' + afterGrid;
      }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed Tab Upgrade for Speaking Lesson ' + i);
}
console.log('Done.');
