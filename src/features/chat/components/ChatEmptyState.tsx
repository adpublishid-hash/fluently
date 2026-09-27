import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';

export function ChatEmptyState() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring' }}
        className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4 mx-auto"
      >
        <MessageSquare size={34} className="text-primary/70" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-extrabold text-[15px] text-text-primary mb-2"
      >
        {t('chat.startConversationTitle')}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-[13px] text-text-muted max-w-[200px] leading-relaxed"
      >
        {t('chat.startConversationSubtitle')}
      </motion.p>
    </div>
  );
}
