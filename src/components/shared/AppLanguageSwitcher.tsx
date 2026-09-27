import { Check, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useId } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Language, TranslationKey } from '../../i18n/translations';

type LanguageSwitcherVariant = 'compact' | 'card';

const APP_LANGUAGE_OPTIONS: Array<{
  value: Language;
  labelKey: TranslationKey;
  fallbackLabel: string;
  shortLabel: string;
  descriptionKey: TranslationKey;
}> = [
  {
    value: 'id',
    labelKey: 'language.indonesian',
    fallbackLabel: 'Bahasa Indonesia',
    shortLabel: 'ID',
    descriptionKey: 'language.indonesianDescription',
  },
  {
    value: 'en',
    labelKey: 'language.english',
    fallbackLabel: 'English',
    shortLabel: 'EN',
    descriptionKey: 'language.englishDescription',
  },
];

export function getAppLanguageLabel(language: Language) {
  return APP_LANGUAGE_OPTIONS.find((option) => option.value === language)?.fallbackLabel || 'English';
}

interface AppLanguageSwitcherProps {
  variant?: LanguageSwitcherVariant;
  onChange?: (language: Language) => void;
}

export default function AppLanguageSwitcher({ variant = 'compact', onChange }: AppLanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const switcherId = useId();
  const activeOption = APP_LANGUAGE_OPTIONS.find((option) => option.value === language) || APP_LANGUAGE_OPTIONS[1];
  const activeLabel = t(activeOption.labelKey);

  const chooseLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    onChange?.(nextLanguage);
  };

  if (variant === 'card') {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
              <Globe2 size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-text-primary">{t('language.appTitle')}</p>
              <p className="text-xs font-semibold text-text-muted">{t('language.appSubtitle')}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {APP_LANGUAGE_OPTIONS.map((option) => {
            const isActive = language === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => chooseLanguage(option.value)}
                aria-pressed={isActive}
                className={`rounded-2xl border-2 p-4 text-left transition ${
                  isActive ? 'border-primary bg-primary/10' : 'border-gray-100 bg-gray-50 hover:border-primary/30 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${isActive ? 'bg-primary text-white' : 'bg-white text-text-muted'}`}>
                        {option.shortLabel}
                      </span>
                      <p className="font-black text-text-primary">{t(option.labelKey)}</p>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-text-muted">{t(option.descriptionKey)}</p>
                  </div>
                  {isActive && <Check className="shrink-0 text-primary" size={20} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-2">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
            <Globe2 size={15} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-text-muted">{t('language.appTitle')}</p>
            <p className="truncate text-xs font-bold text-text-primary">{activeLabel}</p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-black text-primary shadow-sm">
          {language.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 rounded-xl bg-white p-1 shadow-sm">
        {APP_LANGUAGE_OPTIONS.map((option) => {
          const isActive = language === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => chooseLanguage(option.value)}
              aria-pressed={isActive}
              className={`relative rounded-lg px-2 py-2 text-xs font-black transition ${
                isActive ? 'text-white' : 'text-text-muted hover:text-text-primary'
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {isActive && (
                <motion.span
                  layoutId={`appLanguageSwitcherActive-${switcherId}`}
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative block truncate">{t(option.labelKey)}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
