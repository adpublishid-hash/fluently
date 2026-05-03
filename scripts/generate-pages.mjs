/**
 * Generate landing pages + sub-module pages + App.tsx routes
 * for upper-intermediate, advanced, proficiency
 */
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

const TALKY_SRC = 'D:\\talky-main\\talky-main\\src';
const PAGES_BASE = join(TALKY_SRC, 'pages', 'module', 'english');

// ── config ─────────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: 'upper-intermediate',
    label: 'Upper-Intermediate',
    cefr: 'B2 – C1',
    color: '#1A5276',
    bgBadge: '#1A5276',
    badgeIcon: '/assets/icons/new/20. Completion Certificate.png',
    emoji: '🏆',
    submodules: [
      { id: 'grammar',       label: 'Grammar',       icon: '/assets/icons/new/21. Pencil & Ruler.png',     color: '#1A5276', bg: '#D6EAF8', lessons: 20, sub: 'Tata Bahasa Lanjut' },
      { id: 'speaking',      label: 'Speaking',      icon: '/assets/icons/new/7. Webinar.png',              color: '#C0392B', bg: '#FADBD8', lessons: 20, sub: 'Percakapan Tingkat Tinggi' },
      { id: 'vocabulary',    label: 'Vocabulary',    icon: '/assets/icons/new/16. Language Learning.png',   color: '#117A65', bg: '#D5F5E3', lessons: 20, sub: 'Kosakata Akademik' },
      { id: 'pronunciation', label: 'Pronunciation', icon: '/assets/icons/new/17. Learning Method.png',     color: '#6C3483', bg: '#E8DAEF', lessons: 20, sub: 'Pelafalan Alami' },
    ],
    importPrefix: 'UpperInter',
    routeBase: '/modul/english/upper-intermediate',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    cefr: 'C1 – C2',
    color: '#1B2631',
    bgBadge: '#1B2631',
    badgeIcon: '/assets/icons/new/30. Badge & Achievement.png',
    emoji: '🎓',
    submodules: [
      { id: 'grammar',       label: 'Grammar',       icon: '/assets/icons/new/21. Pencil & Ruler.png',     color: '#1B2631', bg: '#D5D8DC', lessons: 20, sub: 'Tata Bahasa Mahir' },
      { id: 'speaking',      label: 'Speaking',      icon: '/assets/icons/new/7. Webinar.png',              color: '#922B21', bg: '#FADBD8', lessons: 20, sub: 'Fluency & Accuracy' },
      { id: 'vocabulary',    label: 'Vocabulary',    icon: '/assets/icons/new/16. Language Learning.png',   color: '#0B5345', bg: '#D5F5E3', lessons: 20, sub: 'Kosakata Profesional' },
      { id: 'pronunciation', label: 'Pronunciation', icon: '/assets/icons/new/17. Learning Method.png',     color: '#4A235A', bg: '#E8DAEF', lessons: 20, sub: 'Aksen & Intonasi' },
    ],
    importPrefix: 'Advanced',
    routeBase: '/modul/english/advanced',
  },
  {
    id: 'proficiency',
    label: 'Proficiency',
    cefr: 'C2+',
    color: '#1C2833',
    bgBadge: '#1C2833',
    badgeIcon: '/assets/icons/new/30. Badge & Achievement.png',
    emoji: '💎',
    submodules: [
      { id: 'grammar', label: 'Grammar', icon: '/assets/icons/new/21. Pencil & Ruler.png', color: '#1C2833', bg: '#D5D8DC', lessons: 20, sub: 'Tata Bahasa Sempurna' },
    ],
    importPrefix: 'Proficiency',
    routeBase: '/modul/english/proficiency',
  },
];

// ── sub-module page template ────────────────────────────────────────────────

function subModulePageContent(level, sub) {
  const compName = `${level.importPrefix}${sub.label.replace(/ /g,'')}Page`;
  return `import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Lock, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../../i18n/LanguageContext';

const SKILL = {
  label: '${sub.label}',
  icon: '${sub.icon}',
  color: '${sub.color}',
  bgColor: '${sub.bg}',
  totalDays: ${sub.lessons},
  completedDays: 0,
};

function generateDays(completedDays: number, totalDays: number) {
  return Array.from({ length: totalDays }, (_, i) => ({
    id: i + 1,
    status: i < completedDays ? 'completed' as const : i === completedDays ? 'available' as const : 'locked' as const,
  }));
}

export default function ${compName}() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const days = generateDays(SKILL.completedDays, SKILL.totalDays);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.${sub.id}" subtitleKey="modul.daysSubtitle" />

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
              <p className="text-xs text-[#6B7280]">{SKILL.completedDays}/{SKILL.totalDays} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>
              ${level.emoji} ${level.label}
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }}
              animate={{ width: \`\${(SKILL.completedDays / SKILL.totalDays) * 100}%\` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.daysSubtitle')}</p>
          <div className="space-y-3">
            {days.map((day, i) => {
              const isCompleted = day.status === 'completed';
              const isAvailable = day.status === 'available';
              const isLocked    = day.status === 'locked';
              return (
                <motion.button
                  key={day.id}
                  className={\`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all \${
                    isCompleted ? 'bg-white border border-gray-100' :
                    isAvailable ? 'bg-white border-2 shadow-md cursor-pointer' :
                    'bg-gray-50/80 border border-gray-100 opacity-60 cursor-not-allowed'
                  }\`}
                  style={isAvailable ? { borderColor: SKILL.color, boxShadow: \`0 4px 16px \${SKILL.color}20\` } : {}}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isLocked ? 0.6 : 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={isAvailable ? { scale: 1.01 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => { if (!isLocked) navigate(\`${level.routeBase}/${sub.id}/lesson-\${day.id}\`); }}
                  disabled={isLocked}
                >
                  <div
                    className={\`w-11 h-11 rounded-full flex items-center justify-center shrink-0 \${
                      isCompleted || isAvailable ? 'text-white' : 'bg-gray-200 text-gray-400'
                    }\`}
                    style={isCompleted || isAvailable ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> :
                     isAvailable ? <Play size={16} fill="white" /> :
                     <Lock size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={\`font-bold text-sm \${isLocked ? 'text-gray-400' : 'text-[#1A1A2E]'}\`}>
                      Lesson {day.id}
                    </p>
                    <p className="text-[12px] text-[#6B7280] truncate">${sub.sub} {day.id}</p>
                  </div>
                  <span
                    className={\`text-[10px] font-bold px-2 py-1 rounded-full \${
                      isCompleted ? 'bg-[#E8F8F0] text-[#26C76D]' :
                      isAvailable ? 'text-white' :
                      'bg-gray-100 text-gray-400'
                    }\`}
                    style={isAvailable ? { backgroundColor: SKILL.color } : {}}
                  >
                    {isCompleted ? t('common.completed') : isAvailable ? t('common.start') : t('common.locked')}
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

// ── landing page template ──────────────────────────────────────────────────

function landingPageContent(level) {
  const compName = `${level.importPrefix}Page`;
  const subCards = level.submodules.map((sub, i) => ({...sub, delay: 0.05 * i}));

  return `import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../../../components/shared/NavComponents';
import { useLanguage } from '../../../../i18n/LanguageContext';

const SUBMODULES = [
${subCards.map(s => `  { id: '${s.id}', label: '${s.label}', sublabel: '${s.lessons} Pelajaran • ${s.sub}', icon: '${s.icon}', color: '${s.color}', bgColor: '${s.bg}', delay: ${s.delay} },`).join('\n')}
];

export default function ${compName}() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="cefr.advanced" subtitleKey="modul.skillsSubtitle" />

        <div className="px-5 md:px-0 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white" style={{ backgroundColor: '${level.color}' }}>
            <img src="${level.badgeIcon}" alt="" className="w-5 h-5 object-contain inline-block -mt-0.5" /> ${level.cefr}
          </div>
        </div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.skillsTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.skillsSubtitle')}</p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SUBMODULES.map((skill) => (
              <NavCard
                key={skill.id}
                icon={skill.icon}
                label={skill.label}
                sublabel={skill.sublabel}
                color={skill.color}
                bgColor={skill.bgColor}
                progress={0}
                onClick={() => navigate(\`${level.routeBase}/\${skill.id}\`)}
                delay={skill.delay}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
`;
}

// ── write files ─────────────────────────────────────────────────────────────

const routes = [];
const imports = [];

for (const level of LEVELS) {
  const levelDir = join(PAGES_BASE, level.id);
  if (!existsSync(levelDir)) mkdirSync(levelDir, { recursive: true });

  // Landing page
  const landingComp = `${level.importPrefix}Page`;
  const landingFile = join(levelDir, `${landingComp}.tsx`);
  writeFileSync(landingFile, landingPageContent(level), 'utf-8');
  console.log(`✅ ${level.id}/${landingComp}.tsx`);

  imports.push(`import ${landingComp} from './pages/module/english/${level.id}/${landingComp}';`);
  routes.push(`                  <Route path="${level.routeBase}" element={<${landingComp} />} />`);

  // Sub-module pages
  for (const sub of level.submodules) {
    const subDir = join(levelDir, sub.id);
    if (!existsSync(subDir)) mkdirSync(subDir, { recursive: true });

    const subComp = `${level.importPrefix}${sub.label.replace(/ /g,'')}Page`;
    const subFile = join(subDir, `${subComp}.tsx`);
    writeFileSync(subFile, subModulePageContent(level, sub), 'utf-8');
    console.log(`  ✅ ${level.id}/${sub.id}/${subComp}.tsx`);

    imports.push(`import ${subComp} from './pages/module/english/${level.id}/${sub.id}/${subComp}';`);
    routes.push(`                  <Route path="${level.routeBase}/${sub.id}" element={<${subComp} />} />`);

    // Lesson routes
    for (let n = 1; n <= sub.lessons; n++) {
      const lessonComp = `${level.importPrefix}${sub.label.replace(/ /g,'')}Lesson${n}`;
      imports.push(`import ${lessonComp} from './pages/module/english/${level.id}/${sub.id}/Lesson${n}';`);
      routes.push(`                  <Route path="${level.routeBase}/${sub.id}/lesson-${n}" element={<${lessonComp} />} />`);
    }
  }
}

// Write import/route snippet for App.tsx
const snippet = `
// ============================================================
// ADD THESE IMPORTS TO App.tsx (after existing imports):
// ============================================================
${imports.join('\n')}

// ============================================================
// ADD THESE ROUTES TO App.tsx (inside the Routes block):
// ============================================================
${routes.join('\n')}
`;

writeFileSync(join(process.cwd(), 'scripts', '_app_tsx_additions.txt'), snippet, 'utf-8');
console.log('\n✨ All landing/sub-module pages created!');
console.log('📄 Route/import additions saved to scripts/_app_tsx_additions.txt');
