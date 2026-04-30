import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Lock, Play } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader } from '../../components/shared/NavComponents';
import { skills, generateDays } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

export default function ModulSkillPage() {
  const { t } = useLanguage();
  const { levelId, skillId } = useParams<{ levelId: string; skillId: string }>();
  const navigate = useNavigate();
  const skill = skills.find((s) => s.id === skillId);

  if (!skill) return null;

  const days = generateDays(skill.completedDays, skill.totalDays);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey={skill.labelKey as TranslationKey} subtitleKey="modul.daysSubtitle" />

        {/* Skill info banner */}
        <motion.div
          className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: skill.bgColor, border: `1px solid ${skill.color}20` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${skill.color}15` }}>
              {skill.icon}
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">{t(skill.labelKey as TranslationKey)}</h3>
              <p className="text-xs text-[#6B7280]">{skill.completedDays}/{skill.totalDays} {t('modul.days')}</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={{ width: `${(skill.completedDays / skill.totalDays) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Day Timeline */}
        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">{t('modul.daysTitle')}</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">{t('modul.daysSubtitle')}</p>

          <div className="space-y-3">
            {days.map((day, i) => {
              const isCompleted = day.status === 'completed';
              const isAvailable = day.status === 'available';
              const isLocked = day.status === 'locked';

              return (
                <motion.button
                  key={day.id}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all ${
                    isCompleted ? 'bg-white border border-gray-100' :
                    isAvailable ? 'bg-white border-2 shadow-md cursor-pointer' :
                    'bg-gray-50/80 border border-gray-100 opacity-60 cursor-not-allowed'
                  }`}
                  style={isAvailable ? { borderColor: skill.color, boxShadow: `0 4px 16px ${skill.color}20` } : {}}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isLocked ? 0.6 : 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  whileHover={isAvailable ? { scale: 1.01 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => {
                    if (!isLocked) navigate(`/modul/${levelId}/${skillId}/day-${day.id}`);
                  }}
                  disabled={isLocked}
                >
                  {/* Day number circle */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                      isCompleted ? 'text-white' : isAvailable ? 'text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                    style={isCompleted || isAvailable ? { backgroundColor: skill.color } : {}}
                  >
                    {isCompleted ? <Check size={18} strokeWidth={3} /> :
                     isAvailable ? <Play size={16} fill="white" /> :
                     <Lock size={14} />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${isLocked ? 'text-gray-400' : 'text-[#1A1A2E]'}`}>
                      {t('modul.dayLabel')} {day.id}
                    </p>
                    <p className="text-[12px] text-[#6B7280] truncate">
                      {t(day.subtitleKey as TranslationKey)}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    isCompleted ? 'bg-[#E8F8F0] text-[#26C76D]' :
                    isAvailable ? 'text-white' :
                    'bg-gray-100 text-gray-400'
                  }`} style={isAvailable ? { backgroundColor: skill.color } : {}}>
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
