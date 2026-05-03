// unlock-upper-inter-pages.cjs
// Rewrites Grammar, Pronunciation, and Speaking pages to unlock all lessons
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../src/pages/module/english/upper-intermediate');

const CONFIGS = [
  {
    file: 'grammar/UpperInterGrammarPage.tsx',
    skill: 'grammar',
    label: 'Grammar',
    icon: '/assets/icons/new/21. Pencil & Ruler.png',
    color: '#1A5276',
    bgColor: '#D6EAF8',
    titleKey: 'skill.grammar',
    storageKey: 'upper_intermediate_grammar',
    lessonLabels: {
      1: 'Advanced Perfect Tenses', 2: 'Conditional Sentences', 3: 'Passive Voice Complex',
      4: 'Reported Speech Advanced', 5: 'Inversion & Emphasis', 6: 'Relative Clauses',
      7: 'Gerunds & Infinitives', 8: 'Modal Verbs for Deduction', 9: 'Subjunctive Mood',
      10: 'Cleft Sentences', 11: 'Participle Clauses', 12: 'Articles Advanced',
      13: 'Ellipsis & Substitution', 14: 'Discourse Markers Advanced', 15: 'Nominalization',
      16: 'Comparative Structures', 17: 'Quantifiers Advanced', 18: 'Conjunctions B2',
      19: 'Error Recognition', 20: 'Grammar Review & Application',
    },
  },
  {
    file: 'pronunciation/UpperInterPronunciationPage.tsx',
    skill: 'pronunciation',
    label: 'Pronunciation',
    icon: '/assets/icons/new/17. Learning Method.png',
    color: '#6C3483',
    bgColor: '#E8DAEF',
    titleKey: 'skill.pronunciation',
    storageKey: 'upper_intermediate_pronunciation',
    lessonLabels: {
      1: 'Word Stress: Multi-syllable', 2: 'Connected Speech & Weak Forms', 3: 'Intonation for Questions',
      4: 'Sentence Stress & Rhythm', 5: 'Vowel Reduction & Schwa', 6: 'Consonant Clusters',
      7: 'Linking Sounds', 8: 'Rhythm & Stress Timing', 9: 'British vs American',
      10: 'Stress in Compound Nouns', 11: 'Nuclear Stress & Emphasis', 12: 'Intonation in Complex Sentences',
      13: 'Vowel Sound Distinctions', 14: 'Voiced & Unvoiced Consonants', 15: 'Pitch & Tone',
      16: 'Weak Syllables in Long Words', 17: 'Pronunciation of -ed Endings', 18: 'Numbers & Abbreviations',
      19: 'Academic Vocabulary Pronunciation', 20: 'Pronunciation Review',
    },
  },
  {
    file: 'speaking/UpperInterSpeakingPage.tsx',
    skill: 'speaking',
    label: 'Speaking',
    icon: '/assets/icons/new/7. Webinar.png',
    color: '#1E8449',
    bgColor: '#D5F5E3',
    titleKey: 'skill.speaking',
    storageKey: 'upper_intermediate_speaking',
    lessonLabels: {
      1: 'Expressing Complex Opinions', 2: 'Formal Debates & Argumentation', 3: 'Academic Presentations',
      4: 'Describing Trends & Data', 5: 'Making Formal Suggestions', 6: 'Expressing Concession',
      7: 'Complex Descriptions', 8: 'Narrative Storytelling', 9: 'Giving & Responding to Feedback',
      10: 'Making & Supporting Claims', 11: 'Formal Interview Discourse', 12: 'Group Discussion Leadership',
      13: 'Expressing Hypotheticals', 14: 'Cause & Effect Analysis', 15: 'Comparing Complex Ideas',
      16: 'Hedging Language', 17: 'Summarising & Paraphrasing', 18: 'Intercultural Communication',
      19: 'Critical Thinking in Discussion', 20: 'Integrated Speaking Practice',
    },
  },
];

function buildPage(cfg) {
  const lessonTitlesEntries = Object.entries(cfg.lessonLabels)
    .map(([k, v]) => `  ${k}: '${v.replace(/'/g, "\\'")}',`).join('\n');

  return `import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  label: '${cfg.label}',
  icon: '${cfg.icon}',
  color: '${cfg.color}',
  bgColor: '${cfg.bgColor}',
  totalDays: 20,
};

const LESSON_TITLES: Record<number, string> = {
${lessonTitlesEntries}
};

export default function UpperInter${cfg.label}Page() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const completedSet = new Set(
    Array.from({ length: SKILL.totalDays }, (_, i) => i + 1).filter(n =>
      localStorage.getItem(\`lesson_done_${cfg.storageKey}_\${n}\`) === 'true'
    )
  );
  const completedCount = completedSet.size;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="${cfg.titleKey}" subtitleKey="modul.daysSubtitle" />

        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: \`1px solid \${SKILL.color}20\` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: \`\${SKILL.color}15\` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{SKILL.label}</h3>
              <p className="text-xs text-[#6B7280]">{completedCount}/{SKILL.totalDays} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              🏆 Upper-Intermediate
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: \`\${(completedCount / SKILL.totalDays) * 100}%\` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.daysSubtitle')}</p>
          <div className="space-y-3">
            {Array.from({ length: SKILL.totalDays }, (_, i) => i + 1).map((id, i) => {
              const isCompleted = completedSet.has(id);
              return (
                <motion.button
                  key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all bg-white border-2 shadow-sm cursor-pointer hover:shadow-md"
                  style={{ borderColor: isCompleted ? '#26C76D' : SKILL.color, boxShadow: \`0 2px 8px \${SKILL.color}15\` }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`/modul/english/upper-intermediate/${cfg.skill}/lesson-\${id}\`)}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: isCompleted ? '#26C76D' : SKILL.color }}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                    <p className="text-[12px] text-[#6B7280] truncate">{LESSON_TITLES[id] || \`${cfg.label} B2 · \${id}\`}</p>
                  </div>
                  <span
                    className={\`text-[10px] font-bold px-2 py-1 rounded-full \${isCompleted ? 'bg-[#E8F8F0] text-[#26C76D]' : 'text-white'}\`}
                    style={!isCompleted ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? t('common.completed') : t('common.start')}
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

for (const cfg of CONFIGS) {
  const fp = path.join(BASE, cfg.file);
  fs.writeFileSync(fp, buildPage(cfg), 'utf8');
  console.log(`✅ Unlocked: ${cfg.file}`);
}
console.log('🚀 All 4 Upper-Intermediate skill pages unlocked!');
