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
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "launched",
      "options": [
        "summarizing news and identifying product features",
        "main idea",
        "launched",
        "started or introduced something new"
      ],
      "id": "technology-news-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A New Language App",
      "options": [
        "No title is possible.",
        "A New Language App",
        "Technology News",
        "to report the launch of a useful learning app"
      ],
      "id": "technology-news-reading-7",
      "level": "Basic"
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
      "prompt": "What is the main idea of this passage?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "started or introduced something new",
        "summarizing news and identifying product features",
        "The text is only about spelling.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-9",
      "level": "Basic"
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
      "prompt": "Which specific information is correct?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The text says the opposite.",
        "started or introduced something new",
        "to report the launch of a useful learning app",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-17",
      "level": "Intermediate"
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
      "prompt": "What is the writer's purpose?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "summarizing news and identifying product features",
        "to report the launch of a useful learning app",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "technology-news-reading-19",
      "level": "Intermediate"
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
      "prompt": "Which summary is most accurate?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback.",
        "started or introduced something new",
        "Only one small word matters."
      ],
      "id": "technology-news-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-29",
      "level": "Advanced"
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
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "launched",
      "options": [
        "summarizing news and identifying product features",
        "main idea",
        "launched",
        "started or introduced something new"
      ],
      "id": "technology-news-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A New Language App",
      "options": [
        "No title is possible.",
        "A New Language App",
        "Technology News",
        "to report the launch of a useful learning app"
      ],
      "id": "technology-news-reading-7",
      "level": "Basic"
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
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "started or introduced something new",
        "summarizing news and identifying product features",
        "The text is only about spelling.",
        "A new app helps busy learners practice languages in short sessions."
      ],
      "id": "technology-news-reading-9",
      "level": "Basic"
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
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The app gives pronunciation feedback.",
      "options": [
        "The text says the opposite.",
        "started or introduced something new",
        "to report the launch of a useful learning app",
        "The app gives pronunciation feedback."
      ],
      "id": "technology-news-reading-17",
      "level": "Intermediate"
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
      "prompt": "Apa tujuan penulis?",
      "answer": "to report the launch of a useful learning app",
      "options": [
        "summarizing news and identifying product features",
        "to report the launch of a useful learning app",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "technology-news-reading-19",
      "level": "Intermediate"
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
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "A new app helps busy learners practice languages in short sessions.",
      "options": [
        "A new app helps busy learners practice languages in short sessions.",
        "The app gives pronunciation feedback.",
        "started or introduced something new",
        "Only one small word matters."
      ],
      "id": "technology-news-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The app is designed for people with limited time.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "The app gives pronunciation feedback.",
        "The app is designed for people with limited time."
      ],
      "id": "technology-news-reading-29",
      "level": "Advanced"
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
