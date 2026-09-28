import { illustrate } from '../../features/illustrations';

/** Small emoji illustration for a vocabulary item; renders nothing when no concept matches. */
export default function WordIllustration({ meaning, term, className = '' }: { meaning: string; term?: string; className?: string }) {
  const emoji = illustrate(meaning, term);
  if (!emoji) return null;
  return (
    <span aria-hidden="true" className={`pointer-events-none select-none text-2xl leading-none ${className}`}>{emoji}</span>
  );
}
