import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "health-article",
  "title": "Health Article",
  "description": "Membaca artikel kesehatan ringan dengan detail saran.",
  "passageTitle": "Small Habits for Better Sleep",
  "passage": "Many people sleep poorly because they use screens late at night. Doctors suggest turning off phones thirty minutes before bed. A regular bedtime and a dark room can also improve sleep quality.",
  "mainIdea": "Small bedtime habits can improve sleep quality.",
  "detail": "Doctors suggest turning off phones thirty minutes before bed.",
  "vocabulary": "quality",
  "vocabularyMeaning": "how good or bad something is",
  "inference": "Screen use before bed can make sleep worse.",
  "purpose": "to give simple advice for better sleep",
  "readingSkill": "recognizing advice and cause-effect relationships",
  "topicNumber": 4
};

const quizTopics = [
  {
    "id": "health-article",
    "title": "Health Article",
    "description": "Membaca artikel kesehatan ringan dengan detail saran."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Small Habits for Better Sleep",
      "options": [
        "Small Habits for Better Sleep",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "health-article-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "to give simple advice for better sleep",
        "The opposite detail is stated.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "quality",
      "options": [
        "meanwhile",
        "quality",
        "therefore",
        "although"
      ],
      "id": "health-article-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Small Habits for Better Sleep\".",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "to give simple advice for better sleep",
        "A story about an unrelated event."
      ],
      "id": "health-article-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "quality",
      "options": [
        "recognizing advice and cause-effect relationships",
        "main idea",
        "quality",
        "how good or bad something is"
      ],
      "id": "health-article-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Small Habits for Better Sleep",
      "options": [
        "No title is possible.",
        "Small Habits for Better Sleep",
        "Health Article",
        "to give simple advice for better sleep"
      ],
      "id": "health-article-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Health Article.",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "health-article-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "how good or bad something is",
        "recognizing advice and cause-effect relationships",
        "The text is only about spelling.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"quality\".",
      "answer": "how good or bad something is",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "how good or bad something is",
        "a person who asks questions"
      ],
      "id": "health-article-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to advertise a sports team",
        "to give simple advice for better sleep",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "health-article-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "recognizing advice and cause-effect relationships",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "health-article-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Screen use before bed can make sleep worse.",
        "A detail not connected to the passage.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"quality\".",
      "answer": "how good or bad something is",
      "options": [
        "to give simple advice for better sleep",
        "the opposite of the passage meaning",
        "how good or bad something is",
        "quality"
      ],
      "id": "health-article-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Small Habits for Better Sleep\".",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to test math formulas",
        "to give simple advice for better sleep",
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Health Article.",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "recognizing advice and cause-effect relationships",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "health-article-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "The text says the opposite.",
        "how good or bad something is",
        "to give simple advice for better sleep",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "how good or bad something is",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "a sentence that closes an email",
        "how good or bad something is",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "recognizing advice and cause-effect relationships",
        "to give simple advice for better sleep",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "health-article-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "health-article-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Small bedtime habits can improve sleep quality.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "health-article-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to make readers ignore the topic",
        "to give simple advice for better sleep",
        "how good or bad something is",
        "to hide the main idea"
      ],
      "id": "health-article-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Small Habits for Better Sleep\".",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "to give simple advice for better sleep",
        "No inference can be made."
      ],
      "id": "health-article-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "quality",
        "how good or bad something is",
        "A conclusion from a different passage.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "Doctors suggest turning off phones thirty minutes before bed.",
        "ignoring supporting details",
        "recognizing advice and cause-effect relationships",
        "to give simple advice for better sleep"
      ],
      "id": "health-article-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "The passage has no purpose.",
        "to give simple advice for better sleep",
        "Screen use before bed can make sleep worse.",
        "quality"
      ],
      "id": "health-article-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "how good or bad something is",
        "Only one small word matters."
      ],
      "id": "health-article-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Small Habits for Better Sleep",
      "options": [
        "Small Habits for Better Sleep",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "health-article-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "to give simple advice for better sleep",
        "The opposite detail is stated.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "quality",
      "options": [
        "meanwhile",
        "quality",
        "therefore",
        "although"
      ],
      "id": "health-article-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Small Habits for Better Sleep\".",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "to give simple advice for better sleep",
        "A story about an unrelated event."
      ],
      "id": "health-article-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "quality",
      "options": [
        "recognizing advice and cause-effect relationships",
        "main idea",
        "quality",
        "how good or bad something is"
      ],
      "id": "health-article-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Small Habits for Better Sleep",
      "options": [
        "No title is possible.",
        "Small Habits for Better Sleep",
        "Health Article",
        "to give simple advice for better sleep"
      ],
      "id": "health-article-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Health Article.",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "health-article-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "how good or bad something is",
        "recognizing advice and cause-effect relationships",
        "The text is only about spelling.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"quality\".",
      "answer": "how good or bad something is",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "how good or bad something is",
        "a person who asks questions"
      ],
      "id": "health-article-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to advertise a sports team",
        "to give simple advice for better sleep",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "health-article-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "recognizing advice and cause-effect relationships",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "health-article-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Screen use before bed can make sleep worse.",
        "A detail not connected to the passage.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"quality\".",
      "answer": "how good or bad something is",
      "options": [
        "to give simple advice for better sleep",
        "the opposite of the passage meaning",
        "how good or bad something is",
        "quality"
      ],
      "id": "health-article-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Small Habits for Better Sleep\".",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to test math formulas",
        "to give simple advice for better sleep",
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Health Article.",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "recognizing advice and cause-effect relationships",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "health-article-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "The text says the opposite.",
        "how good or bad something is",
        "to give simple advice for better sleep",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "how good or bad something is",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "a sentence that closes an email",
        "how good or bad something is",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "recognizing advice and cause-effect relationships",
        "to give simple advice for better sleep",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "health-article-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "health-article-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Doctors suggest turning off phones thirty minutes before bed.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Doctors suggest turning off phones thirty minutes before bed."
      ],
      "id": "health-article-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Small bedtime habits can improve sleep quality.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "health-article-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "to make readers ignore the topic",
        "to give simple advice for better sleep",
        "how good or bad something is",
        "to hide the main idea"
      ],
      "id": "health-article-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Small Habits for Better Sleep\".",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "Screen use before bed can make sleep worse.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "to give simple advice for better sleep",
        "No inference can be made."
      ],
      "id": "health-article-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "quality",
        "how good or bad something is",
        "A conclusion from a different passage.",
        "Small bedtime habits can improve sleep quality."
      ],
      "id": "health-article-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "recognizing advice and cause-effect relationships",
      "options": [
        "Doctors suggest turning off phones thirty minutes before bed.",
        "ignoring supporting details",
        "recognizing advice and cause-effect relationships",
        "to give simple advice for better sleep"
      ],
      "id": "health-article-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to give simple advice for better sleep",
      "options": [
        "The passage has no purpose.",
        "to give simple advice for better sleep",
        "Screen use before bed can make sleep worse.",
        "quality"
      ],
      "id": "health-article-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Small bedtime habits can improve sleep quality.",
      "options": [
        "Small bedtime habits can improve sleep quality.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "how good or bad something is",
        "Only one small word matters."
      ],
      "id": "health-article-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Screen use before bed can make sleep worse.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Doctors suggest turning off phones thirty minutes before bed.",
        "Screen use before bed can make sleep worse."
      ],
      "id": "health-article-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik4Page() {
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
