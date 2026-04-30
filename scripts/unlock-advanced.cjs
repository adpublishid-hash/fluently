/**
 * unlock-advanced.cjs
 * Rewrites all 4 Advanced skill index pages so:
 *  - ALL 20 lessons are unlocked (no more sequential locking)
 *  - Progress is tracked via localStorage
 *  - Completed lessons show ✓ Selesai badge
 */
const fs = require('fs');
const path = require('path');

const SKILLS = [
  {
    file: path.join(__dirname, '../src/pages/module/english/advanced/grammar/AdvancedGrammarPage.tsx'),
    skill: 'grammar',
    label: 'Grammar',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#1B2631',
    bgColor: '#D5D8DC',
    badge: '🎓 Advanced',
    subtitleKey: 'skill.grammar',
    storageKey: 'talky_advanced_grammar_completed',
    basePath: '/modul/english/advanced/grammar/lesson',
    titles: {
      1:'C1 Grammar Diagnostic',2:'Inverted Conditionals',3:'Mixed Conditionals',4:'Subjunctive Mood',5:'Cleft Sentences',
      6:'Participle Clauses',7:'Nominalization',8:'Ellipsis & Substitution',9:'Fronting & Inversion',10:'Passive Reporting Verbs',
      11:'Complex Relative Clauses',12:'Emphatic Structures',13:'Modal Perfects',14:'Discourse Markers',15:'Concessive Clauses',
      16:'Advanced Comparison',17:'Reported Speech (Advanced)',18:'Academic Hedging',19:'Lexical Grammar Collocations',20:'C1 Grammar Integration Test'
    },
  },
  {
    file: path.join(__dirname, '../src/pages/module/english/advanced/speaking/AdvancedSpeakingPage.tsx'),
    skill: 'speaking',
    label: 'Speaking',
    icon: '/assets/icons/new/7. Webinar.png',
    color: '#922B21',
    bgColor: '#FADBD8',
    badge: '🎤 Advanced',
    subtitleKey: 'skill.speaking',
    storageKey: 'talky_advanced_speaking_completed',
    basePath: '/modul/english/advanced/speaking/lesson',
    titles: {
      1:'Fluency Benchmark',2:'Debate & Argumentation',3:'Speculating & Hedging',4:'Narrating & Storytelling',5:'Describing Trends & Data',
      6:'Problem-Solution Discussion',7:'Compare & Contrast',8:'Diplomatic Language',9:'Academic Presentation',10:'Interview & Professional Talk',
      11:'Abstract Thinking',12:'Cultural & Social Issues',13:'Counterfactual & Hypothetical',14:'Persuasion & Rhetoric',15:'Critical Evaluation',
      16:'Humour & Irony',17:'Media & Technology',18:'Ethics & Philosophy',19:'Environmental Discourse',20:'C1 Speaking Assessment'
    },
  },
  {
    file: path.join(__dirname, '../src/pages/module/english/advanced/vocabulary/AdvancedVocabularyPage.tsx'),
    skill: 'vocabulary',
    label: 'Vocabulary',
    icon: '/assets/icons/new/16. Language Learning.png',
    color: '#0B5345',
    bgColor: '#D5F5E3',
    badge: '📚 Advanced',
    subtitleKey: 'skill.vocabulary',
    storageKey: 'talky_advanced_vocabulary_completed',
    basePath: '/modul/english/advanced/vocabulary/lesson',
    titles: {
      1:'Academic Excellence',2:'Professional Register',3:'Scientific Discourse',4:'Economic & Financial Terms',5:'Political & Legal Language',
      6:'Idiomatic Expressions (Adv)',7:'Collocations (High Frequency)',8:'Formal vs Informal Register',9:'Affixation & Word Formation',10:'Metaphor & Figurative Language',
      11:'Discourse & Rhetoric Vocabulary',12:'Medical & Health Terminology',13:'Technology & Innovation',14:'Environmental & Climate Terms',15:'Philosophical Concepts',
      16:'Literary & Critical Terms',17:'Psychological Language',18:'International Relations',19:'Arts & Culture',20:'C1 Vocabulary Mastery Test'
    },
  },
  {
    file: path.join(__dirname, '../src/pages/module/english/advanced/pronunciation/AdvancedPronunciationPage.tsx'),
    skill: 'pronunciation',
    label: 'Pronunciation',
    icon: '/assets/icons/new/17. Learning Method.png',
    color: '#4A235A',
    bgColor: '#E8DAEF',
    badge: '🔊 Advanced',
    subtitleKey: 'skill.pronunciation',
    storageKey: 'talky_advanced_pronunciation_completed',
    basePath: '/modul/english/advanced/pronunciation/lesson',
    titles: {
      1:'Advanced Diagnostic',2:'Vowel Precision (IPA)',3:'Consonant Clusters',4:'Word Stress Patterns',5:'Sentence Stress & Rhythm',
      6:'Connected Speech: Linking',7:'Connected Speech: Elision',8:'Connected Speech: Assimilation',9:'Weak Forms & Reduction',10:'Intonation Patterns',
      11:'Nuclear Stress & Focus',12:'Discourse Intonation',13:'Intrusion & Liaison',14:'Contrastive Stress',15:'Pronunciation of -ed & -s Endings',
      16:'Shifts in Word-class Stress',17:'Consonant Precision',18:'Supra-segmental Features',19:'Accent & Intelligibility',20:'C1 Pronunciation Assessment'
    },
  },
];

function makePageContent({skill, label, icon, color, bgColor, badge, subtitleKey, storageKey, basePath, titles}) {
  const funcName = `Advanced${label.charAt(0).toUpperCase() + label.slice(1)}Page`;
  const titlesCode = Object.entries(titles).map(([k,v]) => `  ${k}: '${v.replace(/'/g,"\\'")}',`).join('\n');

  return `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';

const SKILL = {
  label: '${label}',
  icon: '${icon}',
  color: '${color}',
  bgColor: '${bgColor}',
  totalLessons: 20,
};

const LESSON_TITLES: Record<number, string> = {
${titlesCode}
};

const STORAGE_KEY = '${storageKey}';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function ${funcName}() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => { setCompletedIds(getCompleted()); }, []);

  const count = completedIds.length;
  const pct = (count / SKILL.totalLessons) * 100;
  const lessons = Array.from({ length: SKILL.totalLessons }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="${subtitleKey}" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: \`1px solid \${SKILL.color}20\` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: \`\${SKILL.color}15\` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">{count}/{SKILL.totalLessons} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              ${badge}
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: \`\${pct}%\` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          {count > 0 && (
            <p className="text-[11px] font-semibold mt-1.5" style={{ color: SKILL.color }}>
              {count === SKILL.totalLessons ? '🎉 Semua pelajaran selesai!' : \`\${count} dari \${SKILL.totalLessons} pelajaran selesai\`}
            </p>
          )}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">20 pelajaran CEFR C1/C2 Advanced</p>

          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{
                    borderColor: done ? '#26C76D' : \`\${SKILL.color}30\`,
                    backgroundColor: done ? '#F0FDF6' : 'white',
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`${basePath}-\${id}\`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{LESSON_TITLES[id]}</p>
                  </div>

                  <span
                    className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0"
                    style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}
                  >
                    {done ? 'Completed' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
`;
}

for (const cfg of SKILLS) {
  fs.writeFileSync(cfg.file, makePageContent(cfg), 'utf8');
  console.log(`✅ ${cfg.label} page unlocked & updated`);
}

console.log('\n🔓 Done! All 4 Advanced skill pages are now fully unlocked.');
