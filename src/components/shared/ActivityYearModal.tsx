import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { FocusSession } from '../../utils/focusTimer';

const DAY_MS = 24 * 60 * 60 * 1000;

interface Cell {
  date: Date;
  minutes: number; // -1 = outside the selected range (not tracked)
}

interface ActivityYearModalProps {
  open: boolean;
  onClose: () => void;
  sessions: FocusSession[];
  streak: number;
}

/* Same thresholds as the sidebar widget */
function levelOf(minutes: number) {
  if (minutes <= 0) return 0;
  if (minutes < 10) return 1;
  if (minutes < 25) return 2;
  if (minutes < 50) return 3;
  return 4;
}

const LEVEL_COLORS = ['#EBEDF0', '#BBF7D0', '#86EFAC', '#4ADE80', '#22C55E'];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Monday = 0 … Sunday = 6 */
function mondayIndex(d: Date) {
  return (d.getDay() + 6) % 7;
}

export default function ActivityYearModal({ open, onClose, sessions, streak }: ActivityYearModalProps) {
  const { language, t } = useLanguage();
  const locale = language === 'id' ? 'id-ID' : 'en-US';

  const today = startOfDay(new Date());
  const currentYear = today.getFullYear();

  // '365d' | a four digit year
  const [range, setRange] = useState<string>('365d');

  // minutes per local day
  const minutesByDay = useMemo(() => {
    const map = new Map<string, number>();
    sessions.forEach((session) => {
      const key = startOfDay(new Date(session.completedAt)).toDateString();
      map.set(key, (map.get(key) ?? 0) + session.minutes);
    });
    return map;
  }, [sessions]);

  const { weeks, monthLabels, activeDays, totalMinutes } = useMemo(() => {
    let start: Date;
    let end: Date;
    if (range === '365d') {
      end = today;
      start = new Date(today.getTime() - 364 * DAY_MS);
    } else {
      const year = Number(range);
      start = new Date(year, 0, 1);
      end = year === currentYear ? today : new Date(year, 11, 31);
    }

    // Align grid to whole weeks (Monday → Sunday)
    const gridStart = new Date(start);
    gridStart.setDate(gridStart.getDate() - mondayIndex(gridStart));
    const gridEnd = new Date(end);
    gridEnd.setDate(gridEnd.getDate() + (6 - mondayIndex(gridEnd)));

    const cols: Cell[][] = [];
    let activeCount = 0;
    let minutesSum = 0;
    const cursor = new Date(gridStart);

    while (cursor <= gridEnd) {
      const week: Cell[] = [];
      for (let i = 0; i < 7; i += 1) {
        const inRange = cursor >= start && cursor <= end;
        const minutes = inRange ? minutesByDay.get(cursor.toDateString()) ?? 0 : -1;
        if (minutes > 0) {
          activeCount += 1;
          minutesSum += minutes;
        }
        week.push({ date: new Date(cursor), minutes });
        cursor.setDate(cursor.getDate() + 1);
      }
      cols.push(week);
    }

    // One month label per column, placed when the Monday's month changes
    const labels: (string | null)[] = [];
    let lastMonth = -1;
    cols.forEach((week) => {
      const month = week[0].date.getMonth();
      if (month !== lastMonth) {
        labels.push(week[0].date.toLocaleDateString(locale, { month: 'short' }));
        lastMonth = month;
      } else {
        labels.push(null);
      }
    });

    return { weeks: cols, monthLabels: labels, activeDays: activeCount, totalMinutes: minutesSum };
  }, [range, minutesByDay, today, currentYear, locale]);

  const dayLabels =
    language === 'id'
      ? ['Sen', '', 'Rab', '', 'Jum', '', '']
      : ['Mon', '', 'Wed', '', 'Fri', '', ''];

  const ranges = ['365d', String(currentYear), String(currentYear - 1)];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center bg-slate-950/30 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            className="max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-3xl border border-slate-100 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.18)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl">
                    📅
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#101828]">{t('sidebar.activity')}</h2>
                    <p className="mt-0.5 text-xs font-semibold text-slate-500">{t('activity.subtitle')}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-amber-50 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Flame size={15} className="text-[#F59E0B]" />
                    <span className="text-lg font-black text-[#101828]">{streak}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{t('activity.dayStreak')}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                  <span className="text-lg font-black text-[#101828]">{activeDays}</span>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{t('activity.activeDays')}</p>
                </div>
                <div className="rounded-2xl bg-blue-50 px-4 py-3">
                  <span className="text-lg font-black text-[#101828]">{totalMinutes}</span>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{t('activity.minFocused')}</p>
                </div>
              </div>

              {/* Range tabs */}
              <div className="mt-5 inline-flex rounded-xl border border-slate-100 bg-slate-50 p-1">
                {ranges.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRange(r)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-black transition-colors ${
                      range === r ? 'bg-white text-[#101828] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {r === '365d' ? t('activity.last365') : r}
                  </button>
                ))}
              </div>

              {/* Heatmap */}
              <div className="mt-5 overflow-x-auto pb-1">
                <div className="flex gap-1.5">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[3px] pt-[18px]">
                    {dayLabels.map((label, i) => (
                      <div
                        key={i}
                        className="flex h-[12px] items-center text-[9px] font-semibold leading-none text-slate-400"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <div>
                    {/* Month labels */}
                    <div className="relative mb-1 flex h-[14px] gap-[3px]">
                      {monthLabels.map((label, i) => (
                        <div key={i} className="relative w-[12px]">
                          {label && (
                            <span className="absolute left-0 top-0 whitespace-nowrap text-[10px] font-semibold text-slate-400">
                              {label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Cells */}
                    <div className="flex gap-[3px]">
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col gap-[3px]">
                          {week.map((cell, di) => {
                            const tracked = cell.minutes >= 0;
                            const dateLabel = cell.date.toLocaleDateString(locale, {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            });
                            const title = !tracked
                              ? `${t('activity.notTracked')} · ${dateLabel}`
                              : cell.minutes > 0
                                ? `${cell.minutes} ${t('activity.minutes')} · ${dateLabel}`
                                : `${t('activity.noActivity')} · ${dateLabel}`;
                            return (
                              <div
                                key={di}
                                title={title}
                                className="h-[12px] w-[12px] rounded-[3px]"
                                style={
                                  tracked
                                    ? { backgroundColor: LEVEL_COLORS[levelOf(cell.minutes)] }
                                    : { backgroundColor: 'transparent', border: '1px dashed #E2E8F0' }
                                }
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-[12px] w-[12px] rounded-[3px]"
                    style={{ backgroundColor: 'transparent', border: '1px dashed #E2E8F0' }}
                  />
                  <span>{t('activity.notTracked')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>{t('activity.less')}</span>
                  {LEVEL_COLORS.map((color) => (
                    <span
                      key={color}
                      className="h-[12px] w-[12px] rounded-[3px]"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <span>{t('activity.more')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
