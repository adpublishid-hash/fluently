export type VideoLanguageId = 'english' | 'arabic' | 'mandarin' | 'japanese';
export type VideoLevelId = 'basic' | 'intermediate' | 'advanced';

export type VideoLanguage = {
  id: VideoLanguageId;
  label: string;
  nativeLabel: string;
  subtitle: string;
  accent: string;
  softBg: string;
  icon: string;
};

export type VideoLevel = {
  id: VideoLevelId;
  label: string;
  tag: string;
  subtitle: string;
  accent: string;
};

export type VideoLesson = {
  id: number;
  languageId: VideoLanguageId;
  levelId: VideoLevelId;
  title: string;
  subtitle: string;
  duration: string;
  teacher: string;
  poster: string;
  accent: string;
  outcome: string;
  topics: string[];
  transcript: string[];
  checkpoints: string[];
  videoUrl?: string;
  embedUrl?: string;
};

export const videoLanguages: VideoLanguage[] = [
  {
    id: 'english',
    label: 'English',
    nativeLabel: 'English',
    subtitle: 'Conversation, pronunciation, and study skills',
    accent: '#2563EB',
    softBg: '#EFF6FF',
    icon: '/assets/icons/new/5. Video Lecture.png',
  },
  {
    id: 'arabic',
    label: 'Arabic',
    nativeLabel: 'Al-Arabiyyah',
    subtitle: 'Sounds, expressions, and everyday patterns',
    accent: '#0F766E',
    softBg: '#ECFDF5',
    icon: '/assets/icons/new/16. Language Learning.png',
  },
  {
    id: 'mandarin',
    label: 'Mandarin',
    nativeLabel: 'Putonghua',
    subtitle: 'Tones, useful phrases, and clear responses',
    accent: '#DC2626',
    softBg: '#FEF2F2',
    icon: '/assets/icons/new/7. Webinar.png',
  },
  {
    id: 'japanese',
    label: 'Japanese',
    nativeLabel: 'Nihongo',
    subtitle: 'Kana, sentence rhythm, and polite speech',
    accent: '#7C3AED',
    softBg: '#F5F3FF',
    icon: '/assets/icons/new/12. Interactive Whiteboard.png',
  },
];

export const videoLevels: VideoLevel[] = [
  {
    id: 'basic',
    label: 'Basic',
    tag: 'A1',
    subtitle: 'First phrases and guided listening',
    accent: '#0EA5E9',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    tag: 'B1',
    subtitle: 'Longer answers and natural structure',
    accent: '#F59E0B',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    tag: 'C1',
    subtitle: 'Nuance, argument, and confident delivery',
    accent: '#EC4899',
  },
];

const lessonPlans: Record<VideoLevelId, Array<Omit<VideoLesson, 'languageId' | 'levelId' | 'teacher' | 'poster' | 'accent'>>> = {
  basic: [
    {
      id: 1,
      title: 'First Daily Conversation',
      subtitle: 'Greetings, names, and warm replies',
      duration: '08:20',
      outcome: 'Start a short friendly conversation with a clear opening and closing.',
      topics: ['Greeting flow', 'Name exchange', 'Short response rhythm'],
      transcript: ['Hello, my name is ...', 'Nice to meet you.', 'See you later.'],
      checkpoints: ['Say your name naturally', 'Reply with one complete sentence', 'Close the conversation politely'],
    },
    {
      id: 2,
      title: 'Sound And Rhythm Basics',
      subtitle: 'Listen, repeat, and shape simple sentences',
      duration: '09:45',
      outcome: 'Recognize the core rhythm of simple spoken sentences.',
      topics: ['Slow listening', 'Sentence stress', 'Repeat after model'],
      transcript: ['I am ready.', 'Can you repeat that?', 'I understand.'],
      checkpoints: ['Repeat three model lines', 'Mark the strongest word', 'Record one confident sentence'],
    },
    {
      id: 3,
      title: 'Classroom And Study Phrases',
      subtitle: 'Useful lines for lessons and practice',
      duration: '07:55',
      outcome: 'Use simple study phrases during a live lesson or chat session.',
      topics: ['Asking for help', 'Checking meaning', 'Confirming understanding'],
      transcript: ['What does this mean?', 'Please speak slowly.', 'I have a question.'],
      checkpoints: ['Ask one help question', 'Confirm one answer', 'Write a short study note'],
    },
  ],
  intermediate: [
    {
      id: 1,
      title: 'Tell A Short Story',
      subtitle: 'Past events with a clean beginning, middle, and end',
      duration: '11:10',
      outcome: 'Tell a personal story in a simple but connected structure.',
      topics: ['Time markers', 'Sequence words', 'Story ending'],
      transcript: ['First, I noticed ...', 'After that, I decided ...', 'In the end, it worked well.'],
      checkpoints: ['Use three time markers', 'Add one reason', 'End with a result'],
    },
    {
      id: 2,
      title: 'Give An Opinion With Examples',
      subtitle: 'Build stronger answers with reasons and detail',
      duration: '12:30',
      outcome: 'Share an opinion and support it with one clear example.',
      topics: ['Opinion frame', 'Reason sentence', 'Example detail'],
      transcript: ['In my opinion, ...', 'The main reason is ...', 'For example, ...'],
      checkpoints: ['State one opinion', 'Give one reason', 'Add a specific example'],
    },
    {
      id: 3,
      title: 'Fix Misunderstandings',
      subtitle: 'Clarify meaning when the conversation gets stuck',
      duration: '10:40',
      outcome: 'Repair a conversation without losing confidence.',
      topics: ['Clarifying questions', 'Rephrasing', 'Confirming meaning'],
      transcript: ['Let me say that another way.', 'Do you mean ...?', 'Yes, that is what I mean.'],
      checkpoints: ['Ask one clarification question', 'Rephrase one sentence', 'Confirm the final meaning'],
    },
  ],
  advanced: [
    {
      id: 1,
      title: 'Explain A Complex Idea',
      subtitle: 'Turn abstract topics into clear spoken points',
      duration: '14:05',
      outcome: 'Explain a complex idea with structure, contrast, and examples.',
      topics: ['Framing the issue', 'Contrast language', 'Concrete example'],
      transcript: ['The issue is more complex than it seems.', 'One useful distinction is ...', 'A practical example would be ...'],
      checkpoints: ['Define the issue', 'Make one contrast', 'Use one concrete example'],
    },
    {
      id: 2,
      title: 'Lead A Nuanced Discussion',
      subtitle: 'Balance agreement, disagreement, and perspective',
      duration: '15:20',
      outcome: 'Discuss a topic with balanced language and careful transitions.',
      topics: ['Soft disagreement', 'Adding nuance', 'Returning to the main point'],
      transcript: ['I see the point, but ...', 'That depends on the context.', 'To return to the main point, ...'],
      checkpoints: ['Agree with nuance', 'Disagree politely', 'Summarize the main point'],
    },
    {
      id: 3,
      title: 'Presentation Delivery',
      subtitle: 'Voice, pacing, and confident closing lines',
      duration: '13:35',
      outcome: 'Deliver a short presentation segment with controlled pacing.',
      topics: ['Opening signpost', 'Pacing control', 'Closing statement'],
      transcript: ['Today I will focus on ...', 'Let us look at the key reason.', 'That brings me to my final point.'],
      checkpoints: ['Open with a signpost', 'Pause before a key point', 'Close with a summary'],
    },
  ],
};

const teacherByLanguage: Record<VideoLanguageId, string> = {
  english: 'Fluently English Coach',
  arabic: 'Fluently Arabic Coach',
  mandarin: 'Fluently Mandarin Coach',
  japanese: 'Fluently Japanese Coach',
};

export const videoLessons: VideoLesson[] = videoLanguages.flatMap((language) =>
  videoLevels.flatMap((level) =>
    lessonPlans[level.id].map((lesson) => ({
      ...lesson,
      languageId: language.id,
      levelId: level.id,
      teacher: teacherByLanguage[language.id],
      poster: language.icon,
      accent: language.accent,
      title: `${language.label} ${level.label}: ${lesson.title}`,
    }))
  )
);

export function isVideoLanguageId(value?: string): value is VideoLanguageId {
  return videoLanguages.some((language) => language.id === value);
}

export function isVideoLevelId(value?: string): value is VideoLevelId {
  return videoLevels.some((level) => level.id === value);
}

export function getVideoLanguage(languageId: VideoLanguageId) {
  return videoLanguages.find((language) => language.id === languageId) || videoLanguages[0];
}

export function getVideoLevel(levelId: VideoLevelId) {
  return videoLevels.find((level) => level.id === levelId) || videoLevels[0];
}

export function getVideoLessons(languageId: VideoLanguageId, levelId: VideoLevelId) {
  return videoLessons.filter((lesson) => lesson.languageId === languageId && lesson.levelId === levelId);
}

export function getVideoLesson(languageId: VideoLanguageId, levelId: VideoLevelId, lessonId: number) {
  return videoLessons.find((lesson) =>
    lesson.languageId === languageId &&
    lesson.levelId === levelId &&
    lesson.id === lessonId
  );
}

export function getVideoLessonPath(languageId: VideoLanguageId, levelId: VideoLevelId, lessonId: number) {
  return `/video/${languageId}/${levelId}/lesson${lessonId}.tsx`;
}

export function getVideoLevelPath(languageId: VideoLanguageId, levelId: VideoLevelId) {
  return `/video/${languageId}/${levelId}`;
}

export function getVideoLessonKey(languageId: VideoLanguageId, levelId: VideoLevelId, lessonId: number) {
  return `${languageId}:${levelId}:${lessonId}`;
}

export function parseVideoLessonSlug(slug?: string) {
  const match = slug?.match(/^lesson-?(\d+)(?:\.tsx)?$/i);
  if (!match) return null;
  const lessonId = Number(match[1]);
  return Number.isFinite(lessonId) ? lessonId : null;
}

export function getDefaultVideoLanguage(targetLanguage?: string): VideoLanguageId {
  const normalized = targetLanguage?.toLowerCase();
  return isVideoLanguageId(normalized) ? normalized : 'english';
}
