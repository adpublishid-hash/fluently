import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "technology-news",
  "title": "Technology News",
  "description": "Membaca berita singkat tentang teknologi dan dampaknya.",
  "passageTitle": "A New Language App",
  "passage": "A local startup launched a language app for busy learners. The app gives short lessons, daily reminders, and pronunciation feedback. The team hopes it will help users practice even when they only have ten minutes.",
  "mainIdea": "A new app helps busy learners practice languages in short sessions.",
  "detail": "The app gives pronunciation feedback.",
  "vocabulary": "launched",
  "vocabularyMeaning": "started or introduced something new",
  "inference": "The app is designed for people with limited time.",
  "purpose": "to report the launch of a useful learning app",
  "readingSkill": "summarizing news and identifying product features",
  "topicNumber": 5
};

const quizTopics = [
  {
    "id": "technology-news",
    "title": "Technology News",
    "description": "Membaca berita singkat tentang teknologi dan dampaknya."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A New Language App",
      "options": [
        "A New Language App",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "technology-news-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "to report the launch of a useful learning app",
        "The opposite detail is stated.",
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "launched",
      "options": [
        "meanwhile",
        "launched",
        "therefore",
        "although"
      ],
      "id": "technology-news-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"A New Language App\".",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback.",
        "to report the launch of a useful learning app",
        "A story about an unrelated event."
      ],
      "id": "technology-news-reading-4",
      "level": "Basic"
    },
    {
      "id": "technology-news-reading-5",
      "level": "Basic",
      "prompt": "Who launched the language app?",
      "answer": "a local startup",
      "options": [
        "a famous university",
        "a large bank",
        "a school teacher",
        "a local startup"
      ]
    },
    {
      "id": "technology-news-reading-6",
      "level": "Basic",
      "prompt": "Who is the app designed for?",
      "answer": "busy learners",
      "options": [
        "busy learners",
        "young children only",
        "professional athletes",
        "retired teachers"
      ]
    },
    {
      "id": "technology-news-reading-7",
      "level": "Basic",
      "prompt": "How long might users practise when they are busy?",
      "answer": "ten minutes",
      "options": [
        "one full day",
        "ten minutes",
        "two hours",
        "thirty minutes"
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Technology News.",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "technology-news-reading-8",
      "level": "Basic"
    },
    {
      "id": "technology-news-reading-9",
      "level": "Basic",
      "prompt": "Which feature is NOT mentioned in the news?",
      "answer": "video chat with teachers",
      "options": [
        "short lessons for busy users",
        "daily reminders",
        "pronunciation feedback",
        "video chat with teachers"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"launched\".",
      "answer": "started or introduced something new",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "started or introduced something new",
        "a person who asks questions"
      ],
      "id": "technology-news-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to advertise a sports team",
        "to report the launch of a useful learning app",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "technology-news-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "summarizing news and identifying product features",
      "options": [
        "summarizing news and identifying product features",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "technology-news-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app is designed for people with limited time.",
        "A detail not connected to the passage.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"launched\".",
      "answer": "started or introduced something new",
      "options": [
        "to report the launch of a useful learning app",
        "the opposite of the passage meaning",
        "started or introduced something new",
        "launched"
      ],
      "id": "technology-news-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"A New Language App\".",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to test math formulas",
        "to report the launch of a useful learning app",
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Technology News.",
      "answer": "summarizing news and identifying product features",
      "options": [
        "summarizing news and identifying product features",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "technology-news-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "technology-news-reading-17",
      "level": "Intermediate",
      "prompt": "What is the most likely purpose of the daily reminders?",
      "answer": "to help users practise regularly",
      "options": [
        "to help users practise regularly",
        "to correct users' pronunciation",
        "to replace the short lessons",
        "to sell extra products to users"
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "started or introduced something new",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "a sentence that closes an email",
        "started or introduced something new",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "technology-news-reading-19",
      "level": "Intermediate",
      "prompt": "In the last sentence, what does \"it\" refer to?",
      "answer": "the app",
      "options": [
        "the app",
        "the team",
        "the lesson",
        "the startup"
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The app is designed for people with limited time.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "technology-news-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The app is designed for people with limited time.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "A new app helps busy learners practice languages in short sessions.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "technology-news-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to make readers ignore the topic",
        "to report the launch of a useful learning app",
        "started or introduced something new",
        "to hide the main idea"
      ],
      "id": "technology-news-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"A New Language App\".",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The app is designed for people with limited time.",
        "The app gives pronunciation feedback.",
        "to report the launch of a useful learning app",
        "No inference can be made."
      ],
      "id": "technology-news-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "launched",
        "started or introduced something new",
        "A conclusion from a different passage.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "summarizing news and identifying product features",
      "options": [
        "The app gives pronunciation feedback.",
        "ignoring supporting details",
        "summarizing news and identifying product features",
        "to report the launch of a useful learning app"
      ],
      "id": "technology-news-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "The passage has no purpose.",
        "to report the launch of a useful learning app",
        "The app is designed for people with limited time.",
        "launched"
      ],
      "id": "technology-news-reading-27",
      "level": "Advanced"
    },
    {
      "id": "technology-news-reading-28",
      "level": "Advanced",
      "prompt": "Which statement goes beyond what the news report says?",
      "answer": "The app is already the most popular one in the country.",
      "options": [
        "The team wants the app to fit into busy days.",
        "The app offers lessons that do not take long.",
        "The app is already the most popular one in the country.",
        "The app helps users improve how they pronounce new words."
      ]
    },
    {
      "id": "technology-news-reading-29",
      "level": "Advanced",
      "prompt": "Which phrase shows that the team's goal is not yet proven?",
      "answer": "The team hopes",
      "options": [
        "busy learners",
        "The team hopes",
        "A local startup",
        "daily reminders"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A New Language App",
      "options": [
        "A New Language App",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "technology-news-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "to report the launch of a useful learning app",
        "The opposite detail is stated.",
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "launched",
      "options": [
        "meanwhile",
        "launched",
        "therefore",
        "although"
      ],
      "id": "technology-news-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"A New Language App\".",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback.",
        "to report the launch of a useful learning app",
        "A story about an unrelated event."
      ],
      "id": "technology-news-reading-4",
      "level": "Basic"
    },
    {
      "id": "technology-news-reading-5",
      "level": "Basic",
      "prompt": "Siapa yang meluncurkan aplikasi bahasa itu?",
      "answer": "a local startup",
      "options": [
        "a famous university",
        "a large bank",
        "a school teacher",
        "a local startup"
      ]
    },
    {
      "id": "technology-news-reading-6",
      "level": "Basic",
      "prompt": "Untuk siapa aplikasi ini dirancang?",
      "answer": "busy learners",
      "options": [
        "busy learners",
        "young children only",
        "professional athletes",
        "retired teachers"
      ]
    },
    {
      "id": "technology-news-reading-7",
      "level": "Basic",
      "prompt": "Berapa lama pengguna mungkin berlatih saat mereka sibuk?",
      "answer": "ten minutes",
      "options": [
        "one full day",
        "ten minutes",
        "two hours",
        "thirty minutes"
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Technology News.",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "technology-news-reading-8",
      "level": "Basic"
    },
    {
      "id": "technology-news-reading-9",
      "level": "Basic",
      "prompt": "Fitur mana yang TIDAK disebutkan dalam berita?",
      "answer": "video chat with teachers",
      "options": [
        "short lessons for busy users",
        "daily reminders",
        "pronunciation feedback",
        "video chat with teachers"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"launched\".",
      "answer": "started or introduced something new",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "started or introduced something new",
        "a person who asks questions"
      ],
      "id": "technology-news-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to advertise a sports team",
        "to report the launch of a useful learning app",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "technology-news-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "summarizing news and identifying product features",
      "options": [
        "summarizing news and identifying product features",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "technology-news-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app is designed for people with limited time.",
        "A detail not connected to the passage.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"launched\".",
      "answer": "started or introduced something new",
      "options": [
        "to report the launch of a useful learning app",
        "the opposite of the passage meaning",
        "started or introduced something new",
        "launched"
      ],
      "id": "technology-news-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"A New Language App\".",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to test math formulas",
        "to report the launch of a useful learning app",
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Technology News.",
      "answer": "summarizing news and identifying product features",
      "options": [
        "summarizing news and identifying product features",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "technology-news-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "technology-news-reading-17",
      "level": "Intermediate",
      "prompt": "Apa tujuan yang paling mungkin dari pengingat harian?",
      "answer": "to help users practise regularly",
      "options": [
        "to help users practise regularly",
        "to correct users' pronunciation",
        "to replace the short lessons",
        "to sell extra products to users"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "started or introduced something new",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "a sentence that closes an email",
        "started or introduced something new",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "technology-news-reading-19",
      "level": "Intermediate",
      "prompt": "Pada kalimat terakhir, kata \"it\" merujuk pada apa?",
      "answer": "the app",
      "options": [
        "the app",
        "the team",
        "the lesson",
        "the startup"
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The app is designed for people with limited time.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "technology-news-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The app is designed for people with limited time.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "A new app helps busy learners practice languages in short sessions.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "technology-news-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "to make readers ignore the topic",
        "to report the launch of a useful learning app",
        "started or introduced something new",
        "to hide the main idea"
      ],
      "id": "technology-news-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"A New Language App\".",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The app is designed for people with limited time.",
        "The app gives pronunciation feedback.",
        "to report the launch of a useful learning app",
        "No inference can be made."
      ],
      "id": "technology-news-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "launched",
        "started or introduced something new",
        "A conclusion from a different passage.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "summarizing news and identifying product features",
      "options": [
        "The app gives pronunciation feedback.",
        "ignoring supporting details",
        "summarizing news and identifying product features",
        "to report the launch of a useful learning app"
      ],
      "id": "technology-news-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "The passage has no purpose.",
        "to report the launch of a useful learning app",
        "The app is designed for people with limited time.",
        "launched"
      ],
      "id": "technology-news-reading-27",
      "level": "Advanced"
    },
    {
      "id": "technology-news-reading-28",
      "level": "Advanced",
      "prompt": "Pernyataan mana yang melampaui isi laporan berita?",
      "answer": "The app is already the most popular one in the country.",
      "options": [
        "The team wants the app to fit into busy days.",
        "The app offers lessons that do not take long.",
        "The app is already the most popular one in the country.",
        "The app helps users improve how they pronounce new words."
      ]
    },
    {
      "id": "technology-news-reading-29",
      "level": "Advanced",
      "prompt": "Frasa mana yang menunjukkan bahwa tujuan tim belum terbukti?",
      "answer": "The team hopes",
      "options": [
        "busy learners",
        "The team hopes",
        "A local startup",
        "daily reminders"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik5Page() {
  return (
    <VocabularyQuizPage
      topicId={material.id}
      skillId="reading"
      quizTopics={quizTopics}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Reading"
      introContent={() => <ReadingPracticeIntro topic={material} />}
      backPath="/latihan/english/reading"
    />
  );
}
