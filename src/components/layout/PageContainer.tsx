import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`safe-bottom min-h-screen ${className}`}
        initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(4px)' }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
