import { Volume2 } from 'lucide-react';
import { grammarTopicOptions, pronunciationTopicOptions, readingTopicOptions, speakingTopicOptions, topicSelectOptions, writingTopicOptions } from '../english';
import { getLocalizedTopicOptions, getLocalizedTopicSelectCopy, isEnglishChat } from '../languageAdapters';
import type { TargetLanguage } from '../targetLanguage';
import type { PronunciationSentenceRow, SpeakingPromptRow, VocabularyRow } from '../types';
import { playAudio } from '../../../services/ttsService';
import { useLanguage } from '../../../i18n/LanguageContext';

type MessageContentProps = {
  text: string;
  targetLanguage: TargetLanguage;
  onSelectTopic?: (topic: string) => void;
  onSelectGrammarTopic?: (topic: string) => void;
  onSelectPronunciationTopic?: (topic: string) => void;
  onSelectReadingTopic?: (topic: string) => void;
  onSelectSpeakingTopic?: (topic: string) => void;
  onSelectWritingTopic?: (topic: string) => void;
};

const getTopicOptions = (
  targetLanguage: TargetLanguage,
  focus: 'vocabulary' | 'grammar' | 'pronunciation' | 'speaking' | 'reading' | 'writing',
) => {
  if (!isEnglishChat(targetLanguage)) {
    return getLocalizedTopicOptions(targetLanguage, focus);
  }

  if (focus === 'grammar') return grammarTopicOptions;
  if (focus === 'pronunciation') return pronunciationTopicOptions;
  if (focus === 'speaking') return speakingTopicOptions;
  if (focus === 'reading') return readingTopicOptions;
  if (focus === 'writing') return writingTopicOptions;
  return topicSelectOptions;
};

const getTopicCopy = (
  targetLanguage: TargetLanguage,
  focus: 'vocabulary' | 'grammar' | 'pronunciation' | 'speaking' | 'reading' | 'writing',
) => {
  if (!isEnglishChat(targetLanguage)) {
    return getLocalizedTopicSelectCopy(targetLanguage, focus);
  }

  const copy = {
    vocabulary: { title: 'Topik (90 Days Challenge)', placeholder: 'Pilih topik...' },
    grammar: { title: 'Topik Grammar (90 Days Challenge)', placeholder: 'Pilih grammar...' },
    pronunciation: { title: 'Topik Pronunciation (90 Days Challenge)', placeholder: 'Pilih fokus...' },
    speaking: { title: 'Topik Speaking', placeholder: 'Pilih topik...' },
    reading: { title: 'Topik Reading (90 Days Challenge)', placeholder: 'Pilih reading topic...' },
    writing: { title: 'Topik Writing (90 Days Challenge)', placeholder: 'Pilih writing topic...' },
  };

  return copy[focus];
};

function parseVocabularyTable(text: string) {
  const start = text.indexOf('VOCAB_TABLE_START');
  const end = text.indexOf('VOCAB_TABLE_END');
  if (start === -1 || end === -1) {
    return null;
  }

  const before = text.slice(0, start).trim();
  const after = text.slice(end + 'VOCAB_TABLE_END'.length).trim();
  const rows = text
    .slice(start + 'VOCAB_TABLE_START'.length, end)
    .trim()
    .split('\n')
    .map((line) => line.split('|'))
    .filter((parts) => parts.length >= 5)
    .map(([word, phonetic, meaning, pos, example]) => ({ word, phonetic, meaning, pos, example }));

  return { before, after, rows };
}

function parsePronunciationTable(text: string) {
  const start = text.indexOf('PRONUNCIATION_TABLE_START');
  const end = text.indexOf('PRONUNCIATION_TABLE_END');
  if (start === -1 || end === -1) {
    return null;
  }

  const before = text.slice(0, start).trim();
  const after = text.slice(end + 'PRONUNCIATION_TABLE_END'.length).trim();
  const rows = text
    .slice(start + 'PRONUNCIATION_TABLE_START'.length, end)
    .trim()
    .split('\n')
    .map((line) => line.split('|'))
    .filter((parts) => parts.length >= 4)
    .map(([sentence, phonetic, focus, tip]) => ({ sentence, phonetic, focus, tip }));

  return { before, after, rows };
}

function parseSpeakingTable(text: string) {
  const start = text.indexOf('SPEAKING_TABLE_START');
  const end = text.indexOf('SPEAKING_TABLE_END');
  if (start === -1 || end === -1) {
    return null;
  }

  const before = text.slice(0, start).trim();
  const after = text.slice(end + 'SPEAKING_TABLE_END'.length).trim();
  const rows = text
    .slice(start + 'SPEAKING_TABLE_START'.length, end)
    .trim()
    .split('\n')
    .map((line) => line.split('|'))
    .filter((parts) => parts.length >= 4)
    .map(([prompt, grammarFocus, usefulPattern, example]) => ({ prompt, grammarFocus, usefulPattern, example }));

  return { before, after, rows };
}

function parseReadingPassage(text: string) {
  const start = text.indexOf('READING_PASSAGE_START');
  const end = text.indexOf('READING_PASSAGE_END');
  if (start === -1 || end === -1) {
    return null;
  }

  const before = text.slice(0, start).trim();
  const passage = text.slice(start + 'READING_PASSAGE_START'.length, end).trim();
  const after = text.slice(end + 'READING_PASSAGE_END'.length).trim();

  return { before, passage, after };
}

function parseWritingPrompt(text: string) {
  const start = text.indexOf('WRITING_PROMPT_START');
  const end = text.indexOf('WRITING_PROMPT_END');
  if (start === -1 || end === -1) {
    return null;
  }

  const before = text.slice(0, start).trim();
  const prompt = text.slice(start + 'WRITING_PROMPT_START'.length, end).trim();
  const after = text.slice(end + 'WRITING_PROMPT_END'.length).trim();

  return { before, prompt, after };
}

function VocabularyTable({ rows, targetLanguage }: { rows: VocabularyRow[]; targetLanguage: TargetLanguage }) {
  const { t } = useLanguage();
  const wordHeader = targetLanguage === 'English' ? 'English' : targetLanguage;
  const isRtl = targetLanguage === 'Arabic';
  const replaceToken = (copy: string, token: string, value: string | number) => copy.replace(token, String(value));

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="divide-y divide-gray-100 md:hidden">
        {rows.map((row, index) => (
          <div key={`${row.word}-${index}-mobile`} className="p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p dir={isRtl ? 'rtl' : 'auto'} className="break-words text-[14px] font-black leading-snug text-text-primary">
                  <span className="text-text-secondary">{index + 1}.</span> {row.word}
                </p>
                <p className="mt-1 break-words text-[12px] font-semibold text-text-secondary">{row.phonetic}</p>
              </div>
              <button
                type="button"
                onClick={() => playAudio(row.word)}
                title={t('chat.listenProfileVoice')}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-500 ring-1 ring-blue-100 transition hover:bg-blue-500 hover:text-white"
                aria-label={replaceToken(t('chat.playVocabulary'), '{word}', row.word)}
              >
                <Volume2 size={16} />
              </button>
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-text-secondary">
                {row.meaning}
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                {row.pos}
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 p-2.5 text-[12.5px] leading-relaxed text-text-secondary">
              <span dir={isRtl ? 'rtl' : 'auto'} className="min-w-0 flex-1 break-words">{row.example}</span>
              <button
                type="button"
                onClick={() => playAudio(row.example)}
                title={t('chat.listenProfileVoice')}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-blue-500 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-500 hover:text-white"
                aria-label={replaceToken(t('chat.playExample'), '{word}', row.word)}
              >
                <Volume2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden w-full overflow-hidden md:block">
        <table className="w-full table-fixed border-collapse text-left text-[11px] md:text-[12px]">
          <thead className="bg-slate-50 text-text-secondary">
            <tr>
              <th className="w-[22%] px-2 py-2.5 font-black">{wordHeader}</th>
              <th className="w-[16%] px-2 py-2.5 font-black">IPA</th>
              <th className="w-[18%] px-2 py-2.5 font-black">{t('chat.table.indonesian')}</th>
              <th className="w-[12%] px-2 py-2.5 font-black">{t('chat.table.part')}</th>
              <th className="w-[32%] px-2 py-2.5 font-black">{t('chat.table.example')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.word}-${index}`} className="border-t border-gray-200 align-middle">
                <td className="px-2 py-2.5 font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5">
                    <span dir={isRtl ? 'rtl' : 'auto'} className="min-w-0 flex-1 break-words leading-snug">
                      <span className="text-text-secondary">{index + 1}.</span> {row.word}
                    </span>
                    <button
                      type="button"
                      onClick={() => playAudio(row.word)}
                      title={t('chat.listenProfileVoice')}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-500 ring-1 ring-blue-100 transition hover:bg-blue-500 hover:text-white"
                      aria-label={replaceToken(t('chat.playVocabulary'), '{word}', row.word)}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                </td>
                <td className="break-words px-2 py-2.5 text-text-secondary">{row.phonetic}</td>
                <td className="break-words px-2 py-2.5 text-text-secondary">{row.meaning}</td>
                <td className="px-2 py-2.5">
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                    {row.pos}
                  </span>
                </td>
                <td className="bg-blue-50/70 px-2 py-2.5 text-text-secondary">
                  <div className="flex items-center gap-2">
                    <span dir={isRtl ? 'rtl' : 'auto'} className="min-w-0 flex-1 break-words leading-snug">{row.example}</span>
                    <button
                      type="button"
                      onClick={() => playAudio(row.example)}
                      title={t('chat.listenProfileVoice')}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-blue-500 shadow-sm ring-1 ring-blue-100 transition hover:bg-blue-500 hover:text-white"
                      aria-label={replaceToken(t('chat.playExample'), '{word}', row.word)}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PronunciationTable({ rows, targetLanguage }: { rows: PronunciationSentenceRow[]; targetLanguage: TargetLanguage }) {
  const { t } = useLanguage();
  const isRtl = targetLanguage === 'Arabic';
  const replaceToken = (copy: string, token: string, value: string | number) => copy.replace(token, String(value));

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-indigo-100 bg-white">
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full table-fixed border-collapse text-left text-[11px] md:text-[12px]">
          <thead className="sticky top-0 z-10 bg-indigo-50 text-slate-700">
            <tr>
              <th className="w-[36%] px-2 py-2.5 font-black">{t('chat.table.sentence')}</th>
              <th className="w-[26%] px-2 py-2.5 font-black">IPA</th>
              <th className="w-[16%] px-2 py-2.5 font-black">{t('chat.table.focus')}</th>
              <th className="w-[22%] px-2 py-2.5 font-black">{t('chat.table.coachTip')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.sentence}-${index}`} className="border-t border-indigo-100 align-top">
                <td className="px-2 py-2.5 font-semibold text-text-primary">
                  <div className="flex items-start gap-1.5">
                    <span dir={isRtl ? 'rtl' : 'auto'} className="min-w-0 flex-1 break-words leading-snug">
                      <span className="text-text-secondary">{index + 1}.</span> {row.sentence}
                    </span>
                    <button
                      type="button"
                      onClick={() => playAudio(row.sentence)}
                      title={t('chat.listenNativeVoice')}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100 transition hover:bg-indigo-500 hover:text-white"
                      aria-label={replaceToken(t('chat.playPronunciationSentence'), '{number}', index + 1)}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                </td>
                <td className="break-words px-2 py-2.5 font-medium text-text-secondary">{row.phonetic}</td>
                <td className="px-2 py-2.5">
                  <span className="rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-500">
                    {row.focus}
                  </span>
                </td>
                <td className="break-words bg-indigo-50/50 px-2 py-2.5 text-text-secondary">{row.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SpeakingTable({ rows, targetLanguage }: { rows: SpeakingPromptRow[]; targetLanguage: TargetLanguage }) {
  const { t } = useLanguage();
  const isRtl = targetLanguage === 'Arabic';
  const replaceToken = (copy: string, token: string, value: string | number) => copy.replace(token, String(value));

  return (
    <div className="my-3 overflow-hidden rounded-2xl border border-emerald-100 bg-white">
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full table-fixed border-collapse text-left text-[11px] md:text-[12px]">
          <thead className="sticky top-0 z-10 bg-emerald-50 text-slate-700">
            <tr>
              <th className="w-[32%] px-2 py-2.5 font-black">{t('chat.table.speakingPrompt')}</th>
              <th className="w-[18%] px-2 py-2.5 font-black">{t('chat.table.grammar')}</th>
              <th className="w-[22%] px-2 py-2.5 font-black">{t('chat.table.pattern')}</th>
              <th className="w-[28%] px-2 py-2.5 font-black">{t('chat.table.example')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.prompt}-${index}`} className="border-t border-emerald-100 align-top">
                <td className="px-2 py-2.5 font-semibold text-text-primary">
                  <span className="break-words leading-snug">
                    <span className="text-text-secondary">{index + 1}.</span> {row.prompt}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">
                    {row.grammarFocus}
                  </span>
                </td>
                <td className="break-words px-2 py-2.5 font-medium text-text-secondary">{row.usefulPattern}</td>
                <td className="bg-emerald-50/50 px-2 py-2.5 text-text-secondary">
                  <div className="flex items-start gap-1.5">
                    <span dir={isRtl ? 'rtl' : 'auto'} className="min-w-0 flex-1 break-words leading-snug">{row.example}</span>
                    <button
                      type="button"
                      onClick={() => playAudio(row.example)}
                      title={t('chat.listenExample')}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100 transition hover:bg-emerald-500 hover:text-white"
                      aria-label={replaceToken(t('chat.playSpeakingExample'), '{number}', index + 1)}
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TopicSelect({ targetLanguage, onSelectTopic }: { targetLanguage: TargetLanguage; onSelectTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'vocabulary');
  const copy = getTopicCopy(targetLanguage, 'vocabulary');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function GrammarTopicSelect({ targetLanguage, onSelectGrammarTopic }: { targetLanguage: TargetLanguage; onSelectGrammarTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'grammar');
  const copy = getTopicCopy(targetLanguage, 'grammar');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectGrammarTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function PronunciationTopicSelect({ targetLanguage, onSelectPronunciationTopic }: { targetLanguage: TargetLanguage; onSelectPronunciationTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'pronunciation');
  const copy = getTopicCopy(targetLanguage, 'pronunciation');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectPronunciationTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function SpeakingTopicSelect({ targetLanguage, onSelectSpeakingTopic }: { targetLanguage: TargetLanguage; onSelectSpeakingTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'speaking');
  const copy = getTopicCopy(targetLanguage, 'speaking');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectSpeakingTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function ReadingTopicSelect({ targetLanguage, onSelectReadingTopic }: { targetLanguage: TargetLanguage; onSelectReadingTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'reading');
  const copy = getTopicCopy(targetLanguage, 'reading');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectReadingTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function WritingTopicSelect({ targetLanguage, onSelectWritingTopic }: { targetLanguage: TargetLanguage; onSelectWritingTopic?: (topic: string) => void }) {
  const options = getTopicOptions(targetLanguage, 'writing');
  const copy = getTopicCopy(targetLanguage, 'writing');

  return (
    <div className="mt-3 max-w-md rounded-2xl border border-gray-200 bg-slate-50 p-3">
      <label className="mb-2 block text-[12px] font-black text-text-primary">{copy.title}</label>
      <select
        defaultValue=""
        onChange={(event) => {
          if (!event.target.value) return;
          onSelectWritingTopic?.(event.target.value);
          event.target.value = '';
        }}
        className="h-11 w-full rounded-xl border border-primary/40 bg-white px-3 text-[13px] font-semibold text-text-primary outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
      >
        <option value="" disabled>{copy.placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export function MessageContent({
  text,
  targetLanguage,
  onSelectTopic,
  onSelectGrammarTopic,
  onSelectPronunciationTopic,
  onSelectReadingTopic,
  onSelectSpeakingTopic,
  onSelectWritingTopic,
}: MessageContentProps) {
  const table = parseVocabularyTable(text);
  const pronunciationTable = parsePronunciationTable(text);
  const speakingTable = parseSpeakingTable(text);
  const readingPassage = parseReadingPassage(text);
  const writingPrompt = parseWritingPrompt(text);
  if (text.includes('WRITING_TOPIC_SELECT')) {
    const before = text.replace('WRITING_TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <WritingTopicSelect targetLanguage={targetLanguage} onSelectWritingTopic={onSelectWritingTopic} />
      </div>
    );
  }

  if (text.includes('READING_TOPIC_SELECT')) {
    const before = text.replace('READING_TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <ReadingTopicSelect targetLanguage={targetLanguage} onSelectReadingTopic={onSelectReadingTopic} />
      </div>
    );
  }

  if (text.includes('SPEAKING_TOPIC_SELECT')) {
    const before = text.replace('SPEAKING_TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <SpeakingTopicSelect targetLanguage={targetLanguage} onSelectSpeakingTopic={onSelectSpeakingTopic} />
      </div>
    );
  }

  if (text.includes('PRONUNCIATION_TOPIC_SELECT')) {
    const before = text.replace('PRONUNCIATION_TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <PronunciationTopicSelect targetLanguage={targetLanguage} onSelectPronunciationTopic={onSelectPronunciationTopic} />
      </div>
    );
  }

  if (text.includes('GRAMMAR_TOPIC_SELECT')) {
    const before = text.replace('GRAMMAR_TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <GrammarTopicSelect targetLanguage={targetLanguage} onSelectGrammarTopic={onSelectGrammarTopic} />
      </div>
    );
  }

  if (text.includes('TOPIC_SELECT')) {
    const before = text.replace('TOPIC_SELECT', '').trim();
    return (
      <div className="whitespace-normal">
        {before && <p className="whitespace-pre-line">{before}</p>}
        <TopicSelect targetLanguage={targetLanguage} onSelectTopic={onSelectTopic} />
      </div>
    );
  }

  if (!table) {
    if (writingPrompt) {
      return (
        <div className="whitespace-normal">
          {writingPrompt.before && <p className="whitespace-pre-line">{writingPrompt.before}</p>}
          <div className="my-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-[13px] leading-7 text-text-primary shadow-sm">
            <div className="mb-2 text-[11px] font-black uppercase tracking-widest text-orange-600">Writing Prompt</div>
            <p>{writingPrompt.prompt}</p>
          </div>
          {writingPrompt.after && <p className="whitespace-pre-line">{writingPrompt.after}</p>}
        </div>
      );
    }

    if (readingPassage) {
      return (
        <div className="whitespace-normal">
          {readingPassage.before && <p className="whitespace-pre-line">{readingPassage.before}</p>}
          <div className="my-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-[13px] leading-7 text-text-primary shadow-sm">
            <div className="mb-2 text-[11px] font-black uppercase tracking-widest text-amber-600">Reading Passage</div>
            <p dir={targetLanguage === 'Arabic' ? 'rtl' : 'auto'}>{readingPassage.passage}</p>
          </div>
          {readingPassage.after && <p className="whitespace-pre-line">{readingPassage.after}</p>}
        </div>
      );
    }

    if (speakingTable) {
      return (
        <div className="whitespace-normal">
          {speakingTable.before && <p className="whitespace-pre-line">{speakingTable.before}</p>}
          <SpeakingTable rows={speakingTable.rows} targetLanguage={targetLanguage} />
          {speakingTable.after && <p className="whitespace-pre-line">{speakingTable.after}</p>}
        </div>
      );
    }

    if (pronunciationTable) {
      return (
        <div className="whitespace-normal">
          {pronunciationTable.before && <p className="whitespace-pre-line">{pronunciationTable.before}</p>}
          <PronunciationTable rows={pronunciationTable.rows} targetLanguage={targetLanguage} />
          {pronunciationTable.after && <p className="whitespace-pre-line">{pronunciationTable.after}</p>}
        </div>
      );
    }
    return <>{text}</>;
  }

  return (
    <div className="whitespace-normal">
      {table.before && <p className="whitespace-pre-line">{table.before}</p>}
      <VocabularyTable rows={table.rows} targetLanguage={targetLanguage} />
      {table.after && <p className="whitespace-pre-line">{table.after}</p>}
    </div>
  );
}
