import { getLevelLabel } from './vocabulary';
import { getSessionScoreCategory } from './scoring';

const speakingTopicOptions = [
  { value: 'daily conversation', label: 'Daily Conversation' },
  { value: 'self introduction', label: 'Self Introduction' },
  { value: 'school and work', label: 'School & Work' },
  { value: 'travel situation', label: 'Travel Situation' },
  { value: 'opinion practice', label: 'Opinion Practice' },
  { value: 'custom-speaking', label: 'Tulis topik sendiri' },
];

type SpeakingPrompt = {
  prompt: string;
  grammarFocus: string;
  usefulPattern: string;
  example: string;
};

const basePrompts: Record<string, SpeakingPrompt[]> = {
  'daily conversation': [
    { prompt: 'Introduce your day in two sentences.', grammarFocus: 'simple present', usefulPattern: 'I usually + verb...', example: 'I usually wake up at six. I have breakfast at home.' },
    { prompt: 'Tell me what you are doing now.', grammarFocus: 'present continuous', usefulPattern: 'I am + verb-ing...', example: 'I am practicing English with Fluently AI.' },
    { prompt: 'Describe your favorite food.', grammarFocus: 'adjectives + simple present', usefulPattern: 'My favorite food is...', example: 'My favorite food is noodles because it is warm and tasty.' },
    { prompt: 'Ask a polite question to a friend.', grammarFocus: 'question form', usefulPattern: 'Could you + verb...?', example: 'Could you help me with this task?' },
    { prompt: 'Tell me about yesterday.', grammarFocus: 'simple past', usefulPattern: 'Yesterday, I + V2...', example: 'Yesterday, I studied English and watched a movie.' },
    { prompt: 'Talk about tomorrow’s plan.', grammarFocus: 'future tense', usefulPattern: 'I will / I am going to...', example: 'Tomorrow, I am going to meet my friend.' },
    { prompt: 'Give one reason why you like English.', grammarFocus: 'because clause', usefulPattern: 'I like... because...', example: 'I like English because it helps me talk to more people.' },
    { prompt: 'Describe your room.', grammarFocus: 'there is / there are', usefulPattern: 'There is... / There are...', example: 'There is a desk near my bed.' },
    { prompt: 'Compare two things you like.', grammarFocus: 'comparative adjective', usefulPattern: 'A is + adjective-er than B', example: 'Tea is cheaper than coffee.' },
    { prompt: 'Talk about a habit you want to improve.', grammarFocus: 'want to + verb', usefulPattern: 'I want to...', example: 'I want to read English every morning.' },
    { prompt: 'Make a short apology.', grammarFocus: 'sorry + reason', usefulPattern: 'I am sorry because...', example: 'I am sorry because I was late.' },
    { prompt: 'Invite someone to do something.', grammarFocus: 'invitation', usefulPattern: 'Do you want to...?', example: 'Do you want to practice English with me?' },
    { prompt: 'Explain a simple problem.', grammarFocus: 'subject + be + adjective', usefulPattern: 'The problem is...', example: 'The problem is difficult, but I can try.' },
    { prompt: 'Give advice to a beginner.', grammarFocus: 'should + verb', usefulPattern: 'You should...', example: 'You should practice speaking every day.' },
    { prompt: 'End the conversation politely.', grammarFocus: 'polite closing', usefulPattern: 'Thank you for...', example: 'Thank you for your time. See you tomorrow.' },
  ],
  'self introduction': [
    { prompt: 'Say your name and where you are from.', grammarFocus: 'be verb', usefulPattern: 'My name is... I am from...', example: 'My name is Indah. I am from Yogyakarta.' },
    { prompt: 'Tell me your age or role.', grammarFocus: 'be verb + noun', usefulPattern: 'I am a/an...', example: 'I am a student.' },
    { prompt: 'Describe your daily activity.', grammarFocus: 'simple present', usefulPattern: 'I + V1 every...', example: 'I study English every evening.' },
    { prompt: 'Talk about your hobby.', grammarFocus: 'like + verb-ing', usefulPattern: 'I like + verb-ing...', example: 'I like reading books and watching films.' },
    { prompt: 'Explain why you learn English.', grammarFocus: 'because clause', usefulPattern: 'I learn English because...', example: 'I learn English because I want to travel.' },
    { prompt: 'Describe your personality.', grammarFocus: 'adjective after be', usefulPattern: 'I am...', example: 'I am friendly and curious.' },
    { prompt: 'Talk about your family shortly.', grammarFocus: 'have/has', usefulPattern: 'I have...', example: 'I have one brother and one sister.' },
    { prompt: 'Mention your favorite place.', grammarFocus: 'favorite + noun', usefulPattern: 'My favorite place is...', example: 'My favorite place is the library.' },
    { prompt: 'Say what you can do well.', grammarFocus: 'can + verb', usefulPattern: 'I can...', example: 'I can write simple English sentences.' },
    { prompt: 'Say what you want to improve.', grammarFocus: 'want to + verb', usefulPattern: 'I want to improve...', example: 'I want to improve my speaking.' },
    { prompt: 'Tell me one past achievement.', grammarFocus: 'simple past', usefulPattern: 'I + V2...', example: 'I finished a beginner course last month.' },
    { prompt: 'Talk about your future goal.', grammarFocus: 'future tense', usefulPattern: 'I will...', example: 'I will speak English confidently.' },
    { prompt: 'Make one polite request.', grammarFocus: 'could + subject + verb', usefulPattern: 'Could you...?', example: 'Could you correct my grammar?' },
    { prompt: 'Describe your English level.', grammarFocus: 'be + adjective', usefulPattern: 'My English is...', example: 'My English is basic, but I am improving.' },
    { prompt: 'Close your introduction naturally.', grammarFocus: 'closing expression', usefulPattern: 'Nice to meet you...', example: 'Nice to meet you. I am happy to practice today.' },
  ],
  'school and work': [
    { prompt: 'Describe your school or workplace.', grammarFocus: 'there is / there are', usefulPattern: 'There are...', example: 'There are many students in my class.' },
    { prompt: 'Talk about your daily task.', grammarFocus: 'simple present', usefulPattern: 'I usually...', example: 'I usually check emails in the morning.' },
    { prompt: 'Explain what you are working on now.', grammarFocus: 'present continuous', usefulPattern: 'I am working on...', example: 'I am working on a new project.' },
    { prompt: 'Tell me about a meeting yesterday.', grammarFocus: 'simple past', usefulPattern: 'Yesterday, we...', example: 'Yesterday, we discussed the plan.' },
    { prompt: 'Make a polite request at work.', grammarFocus: 'could / would', usefulPattern: 'Could you please...?', example: 'Could you please send the file?' },
    { prompt: 'Explain a deadline.', grammarFocus: 'preposition of time', usefulPattern: 'It is due on...', example: 'The task is due on Friday.' },
    { prompt: 'Describe a problem at work.', grammarFocus: 'be + adjective', usefulPattern: 'The problem is...', example: 'The problem is urgent.' },
    { prompt: 'Give a solution.', grammarFocus: 'should + verb', usefulPattern: 'We should...', example: 'We should review the document again.' },
    { prompt: 'Compare two tasks.', grammarFocus: 'comparative', usefulPattern: 'This task is... than...', example: 'This task is easier than the last one.' },
    { prompt: 'Talk about teamwork.', grammarFocus: 'because clause', usefulPattern: 'Teamwork is important because...', example: 'Teamwork is important because we can share ideas.' },
    { prompt: 'Ask for clarification.', grammarFocus: 'question form', usefulPattern: 'What do you mean by...?', example: 'What do you mean by final report?' },
    { prompt: 'Report a completed task.', grammarFocus: 'present perfect', usefulPattern: 'I have + V3...', example: 'I have finished the presentation.' },
    { prompt: 'Talk about tomorrow’s plan.', grammarFocus: 'future tense', usefulPattern: 'I am going to...', example: 'I am going to call the client tomorrow.' },
    { prompt: 'Give feedback politely.', grammarFocus: 'polite sentence', usefulPattern: 'I think we can...', example: 'I think we can make the design simpler.' },
    { prompt: 'End a work conversation.', grammarFocus: 'closing expression', usefulPattern: 'Thank you for...', example: 'Thank you for your help. I will update you later.' },
  ],
  'travel situation': [
    { prompt: 'Say where you want to go.', grammarFocus: 'want to + verb', usefulPattern: 'I want to go to...', example: 'I want to go to Tokyo.' },
    { prompt: 'Ask for directions.', grammarFocus: 'question form', usefulPattern: 'How can I get to...?', example: 'How can I get to the station?' },
    { prompt: 'Book a hotel room.', grammarFocus: 'would like to', usefulPattern: 'I would like to...', example: 'I would like to book a room.' },
    { prompt: 'Explain your travel plan.', grammarFocus: 'future tense', usefulPattern: 'I am going to...', example: 'I am going to visit the museum.' },
    { prompt: 'Talk about your last trip.', grammarFocus: 'simple past', usefulPattern: 'I went to...', example: 'I went to Bali last year.' },
    { prompt: 'Ask about price.', grammarFocus: 'how much', usefulPattern: 'How much is...?', example: 'How much is this ticket?' },
    { prompt: 'Order food while traveling.', grammarFocus: 'would like', usefulPattern: 'I would like...', example: 'I would like a sandwich and water.' },
    { prompt: 'Describe a place.', grammarFocus: 'adjectives', usefulPattern: 'It is...', example: 'It is beautiful and quiet.' },
    { prompt: 'Explain a problem at the airport.', grammarFocus: 'simple present', usefulPattern: 'I cannot find...', example: 'I cannot find my luggage.' },
    { prompt: 'Ask for help politely.', grammarFocus: 'could + verb', usefulPattern: 'Could you help me...?', example: 'Could you help me find the gate?' },
    { prompt: 'Compare two transport options.', grammarFocus: 'comparative', usefulPattern: 'The train is... than...', example: 'The train is faster than the bus.' },
    { prompt: 'Talk about weather.', grammarFocus: 'be + adjective', usefulPattern: 'The weather is...', example: 'The weather is sunny today.' },
    { prompt: 'Make a simple complaint.', grammarFocus: 'present simple', usefulPattern: 'There is a problem with...', example: 'There is a problem with my room.' },
    { prompt: 'Tell someone your arrival time.', grammarFocus: 'preposition of time', usefulPattern: 'I arrive at...', example: 'I arrive at seven o’clock.' },
    { prompt: 'End a travel conversation politely.', grammarFocus: 'polite closing', usefulPattern: 'Thank you for...', example: 'Thank you for your help. Have a nice day.' },
  ],
  'opinion practice': [
    { prompt: 'Give your opinion about learning English.', grammarFocus: 'I think + clause', usefulPattern: 'I think...', example: 'I think English is useful.' },
    { prompt: 'Agree with an idea.', grammarFocus: 'agreement', usefulPattern: 'I agree because...', example: 'I agree because practice is important.' },
    { prompt: 'Disagree politely.', grammarFocus: 'polite disagreement', usefulPattern: 'I understand, but...', example: 'I understand, but I have a different opinion.' },
    { prompt: 'Give one reason.', grammarFocus: 'because clause', usefulPattern: '... because ...', example: 'Speaking is hard because I feel nervous.' },
    { prompt: 'Give one example.', grammarFocus: 'for example', usefulPattern: 'For example,...', example: 'For example, I practice with AI every day.' },
    { prompt: 'Compare two choices.', grammarFocus: 'comparative', usefulPattern: 'A is better than B because...', example: 'Speaking practice is better than memorizing because it feels real.' },
    { prompt: 'Talk about a benefit.', grammarFocus: 'can + verb', usefulPattern: 'It can help...', example: 'It can help me speak more confidently.' },
    { prompt: 'Talk about a problem.', grammarFocus: 'be + adjective', usefulPattern: 'The problem is...', example: 'The problem is pronunciation.' },
    { prompt: 'Suggest a solution.', grammarFocus: 'should + verb', usefulPattern: 'We should...', example: 'We should practice a little every day.' },
    { prompt: 'Talk about a personal preference.', grammarFocus: 'prefer + noun/verb-ing', usefulPattern: 'I prefer...', example: 'I prefer short lessons.' },
    { prompt: 'Explain a goal.', grammarFocus: 'want to + verb', usefulPattern: 'I want to...', example: 'I want to speak clearly in meetings.' },
    { prompt: 'Make a prediction.', grammarFocus: 'will + verb', usefulPattern: 'I think... will...', example: 'I think AI will help many students.' },
    { prompt: 'Mention a condition.', grammarFocus: 'if clause', usefulPattern: 'If I practice..., I will...', example: 'If I practice daily, I will improve.' },
    { prompt: 'Summarize your opinion.', grammarFocus: 'summary phrase', usefulPattern: 'In short,...', example: 'In short, speaking practice is very helpful.' },
    { prompt: 'Ask for another opinion.', grammarFocus: 'question form', usefulPattern: 'What do you think about...?', example: 'What do you think about online learning?' },
  ],
};

const normalizeSpeakingTopic = (value: string) => {
  const text = value.toLowerCase().trim();
  if (text.includes('self') || text.includes('introduc')) return 'self introduction';
  if (text.includes('school') || text.includes('work')) return 'school and work';
  if (text.includes('travel')) return 'travel situation';
  if (text.includes('opinion')) return 'opinion practice';
  if (text.includes('daily') || text.includes('conversation')) return 'daily conversation';
  return text || 'daily conversation';
};

const getSpeakingPrompts = (topic: string) =>
  basePrompts[normalizeSpeakingTopic(topic)] || basePrompts['daily conversation'];

const getSpeakingBatch = (topic: string, batchIndex: number) =>
  getSpeakingPrompts(topic).slice(batchIndex * 2, batchIndex * 2 + 2);

const buildSpeakingTable = (prompts: SpeakingPrompt[]) => [
  'SPEAKING_TABLE_START',
  ...prompts.map((item) => `${item.prompt}|${item.grammarFocus}|${item.usefulPattern}|${item.example}`),
  'SPEAKING_TABLE_END',
].join('\n');

const buildSpeakingPracticeInstruction = (topic: string, batchIndex: number) => {
  const batch = getSpeakingBatch(topic, batchIndex);
  const start = batchIndex * 2 + 1;
  const end = start + batch.length - 1;
  if (!batch.length) return '';
  return `Sekarang wajib pakai microphone ya 🎙️
Jawab speaking prompt ${start}${end > start ? ` dan ${end}` : ''}. Boleh jawab 1-2 kalimat per prompt. Setelah selesai bicara, berhenti sebentar supaya transcript terkirim otomatis.`;
};

const buildSpeakingGreeting = () => 'Hi! Sebelum mulai speaking practice, siapa namamu? 😊';

const buildSpeakingTopicQuestion = (name: string) => `Hai, ${name}! 👋
Makasih sudah latihan hari ini. Kita akan speaking practice seperti ngobrol dengan tutor, lalu aku koreksi grammar kamu 😄🔥

${name}, kamu mau speaking tentang apa hari ini?
SPEAKING_TOPIC_SELECT`;

const buildSpeakingLesson = (name: string, topic: string, levelId?: string) => {
  const normalized = normalizeSpeakingTopic(topic);
  const prompts = getSpeakingPrompts(normalized);

  return `Siap, ${name}! Aku jadi speaking coach kamu hari ini 🎙️

Topik: ${normalized}
Level: ${getLevelLabel(levelId)}

Cara mainnya:
Aku kasih 15 speaking prompts. Kamu jawab lewat microphone, lalu aku koreksi grammar, word order, tense, dan natural sentence-nya.

${buildSpeakingTable(prompts)}

${buildSpeakingPracticeInstruction(normalized, 0)}`;
};

const splitSentences = (answer: string) =>
  answer.split(/\n+|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);

const buildSpeakingFeedback = (name: string, answer: string, topic: string, turn: number) => {
  const currentBatch = getSpeakingBatch(topic, turn);
  const nextBatch = getSpeakingBatch(topic, turn + 1);
  const sentences = splitSentences(answer);
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasSubject = /\b(i|you|we|they|he|she|it|my|the|a|an|there)\b/i.test(answer);
  const hasVerb = /\b(am|is|are|was|were|will|have|has|had|do|does|did|go|goes|went|study|studies|studied|learn|learns|learned|work|works|worked|like|likes|liked|want|wants|wanted|can|should|would|could)\b/i.test(answer);
  const hasConnector = /\b(because|but|and|so|when|if|for example)\b/i.test(answer);
  const score = Math.min(96, Math.max(58, 50 + (wordCount >= 10 ? 15 : 5) + (hasSubject ? 10 : 0) + (hasVerb ? 15 : 0) + (hasConnector ? 6 : 0)));
  const currentNumbers = currentBatch.map((_, index) => turn * 2 + index + 1).join(' dan ');
  const grammarFocus = currentBatch.map((item, index) => `${turn * 2 + index + 1}. ${item.grammarFocus}: pakai pola "${item.usefulPattern}"`).join('\n');
  const firstSentence = sentences[0] || answer.trim();
  const improved = firstSentence
    .replace(/\bi\b/g, 'I')
    .replace(/\s+/g, ' ')
    .replace(/[.!?]?$/, '.');
  const status = hasSubject && hasVerb ? '✅' : hasSubject || hasVerb ? '⚠️' : '❌';

  if (!nextBatch.length) {
    return `Mantap, ${name}! Ini feedback grammar untuk speaking prompt ${currentNumbers}.

Transcript kamu:
"${answer}"

Grammar correction:
${status} Struktur utama: ${hasSubject && hasVerb ? 'sudah punya subject dan verb.' : 'perlu subject + verb yang lebih jelas.'}
Versi lebih rapi dari salah satu kalimat:
"${improved}"

Fokus grammar batch ini:
${grammarFocus}

Speaking score sementara: ${score}/100

🎉 Kamu sudah menyelesaikan 15 speaking prompts hari ini.

🔥 Speaking Grammar Challenge, ${name}!
1. Mana yang benar?
   A) She go to school every day.
   B) She goes to school every day.
   C) She going school every day.

2. Perbaiki kalimat:
   I am go to office yesterday.

3. Buat satu kalimat opini dengan "because".`;
  }

  return `Good job, ${name}! Ini feedback grammar untuk speaking prompt ${currentNumbers}.

Transcript kamu:
"${answer}"

Grammar correction:
${status} Struktur utama: ${hasSubject && hasVerb ? 'sudah cukup jelas.' : 'buat lebih lengkap dengan subject + verb.'}
Versi lebih natural:
"${improved}"

Fokus grammar batch ini:
${grammarFocus}

Tips tutor:
Jawaban speaking tidak harus panjang. Yang penting: subject jelas, verb tepat, dan tense konsisten.

Speaking score sementara: ${score}/100

${buildSpeakingPracticeInstruction(topic, turn + 1)}`;
};

const buildSpeakingGameFeedback = (name: string, answer: string) => {
  const text = answer.toLowerCase();
  let score = 45;
  if (text.includes('b') || text.includes('goes')) score += 20;
  if (text.includes('went') || text.includes('office')) score += 20;
  if (text.includes('because')) score += 15;
  const finalScore = Math.min(100, score);

  return `Koreksi Speaking Grammar Challenge:
1. Jawaban terbaik: B) She goes to school every day.
2. Perbaikan: I went to the office yesterday.
3. Kalimat opini yang bagus memakai pola: I think + opinion + because + reason.

Skor kamu: ${finalScore}/100
Kategori: ${getSessionScoreCategory(finalScore)}

Mau lanjut, ${name}?
- Latihan speaking lagi 🔁
- Ganti topik 🔄
- Naik level 🚀`;
};

export {
  speakingTopicOptions,
  normalizeSpeakingTopic,
  buildSpeakingGreeting,
  buildSpeakingTopicQuestion,
  buildSpeakingLesson,
  buildSpeakingFeedback,
  buildSpeakingGameFeedback,
};
