import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "work-email",
  "title": "Work Email",
  "description": "Membaca email kantor dan memahami action item.",
  "passageTitle": "Project Reminder",
  "passage": "Hi team, please send your final slides by Thursday afternoon. I will combine them into one deck before Friday morning. If you need design support, contact Nina before noon tomorrow.",
  "mainIdea": "The email reminds the team to send final slides by Thursday afternoon.",
  "detail": "Nina can help with design support before noon tomorrow.",
  "vocabulary": "combine",
  "vocabularyMeaning": "put things together",
  "inference": "The presentation deck must be ready before Friday morning.",
  "purpose": "to remind coworkers about a project deadline",
  "readingSkill": "finding deadlines and required actions",
  "topicNumber": 7
};

const quizTopics = [
  {
    "id": "work-email",
    "title": "Work Email",
    "description": "Membaca email kantor dan memahami action item."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Project Reminder",
      "options": [
        "Project Reminder",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "work-email-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "to remind coworkers about a project deadline",
        "The opposite detail is stated.",
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "combine",
      "options": [
        "meanwhile",
        "combine",
        "therefore",
        "although"
      ],
      "id": "work-email-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Project Reminder\".",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow.",
        "to remind coworkers about a project deadline",
        "A story about an unrelated event."
      ],
      "id": "work-email-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "combine",
      "options": [
        "finding deadlines and required actions",
        "main idea",
        "combine",
        "put things together"
      ],
      "id": "work-email-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Project Reminder",
      "options": [
        "No title is possible.",
        "Project Reminder",
        "Work Email",
        "to remind coworkers about a project deadline"
      ],
      "id": "work-email-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Work Email.",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "work-email-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "put things together",
        "finding deadlines and required actions",
        "The text is only about spelling.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"combine\".",
      "answer": "put things together",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "put things together",
        "a person who asks questions"
      ],
      "id": "work-email-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to advertise a sports team",
        "to remind coworkers about a project deadline",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "work-email-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "finding deadlines and required actions",
      "options": [
        "finding deadlines and required actions",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "work-email-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "The presentation deck must be ready before Friday morning.",
        "A detail not connected to the passage.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"combine\".",
      "answer": "put things together",
      "options": [
        "to remind coworkers about a project deadline",
        "the opposite of the passage meaning",
        "put things together",
        "combine"
      ],
      "id": "work-email-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Project Reminder\".",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to test math formulas",
        "to remind coworkers about a project deadline",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Work Email.",
      "answer": "finding deadlines and required actions",
      "options": [
        "finding deadlines and required actions",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "work-email-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The text says the opposite.",
        "put things together",
        "to remind coworkers about a project deadline",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "put things together",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "a sentence that closes an email",
        "put things together",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "finding deadlines and required actions",
        "to remind coworkers about a project deadline",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "work-email-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "work-email-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "work-email-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to make readers ignore the topic",
        "to remind coworkers about a project deadline",
        "put things together",
        "to hide the main idea"
      ],
      "id": "work-email-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Project Reminder\".",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "Nina can help with design support before noon tomorrow.",
        "to remind coworkers about a project deadline",
        "No inference can be made."
      ],
      "id": "work-email-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "combine",
        "put things together",
        "A conclusion from a different passage.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "finding deadlines and required actions",
      "options": [
        "Nina can help with design support before noon tomorrow.",
        "ignoring supporting details",
        "finding deadlines and required actions",
        "to remind coworkers about a project deadline"
      ],
      "id": "work-email-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "The passage has no purpose.",
        "to remind coworkers about a project deadline",
        "The presentation deck must be ready before Friday morning.",
        "combine"
      ],
      "id": "work-email-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow.",
        "put things together",
        "Only one small word matters."
      ],
      "id": "work-email-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Project Reminder",
      "options": [
        "Project Reminder",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "work-email-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "to remind coworkers about a project deadline",
        "The opposite detail is stated.",
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "combine",
      "options": [
        "meanwhile",
        "combine",
        "therefore",
        "although"
      ],
      "id": "work-email-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Project Reminder\".",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow.",
        "to remind coworkers about a project deadline",
        "A story about an unrelated event."
      ],
      "id": "work-email-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "combine",
      "options": [
        "finding deadlines and required actions",
        "main idea",
        "combine",
        "put things together"
      ],
      "id": "work-email-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Project Reminder",
      "options": [
        "No title is possible.",
        "Project Reminder",
        "Work Email",
        "to remind coworkers about a project deadline"
      ],
      "id": "work-email-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Work Email.",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "work-email-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "put things together",
        "finding deadlines and required actions",
        "The text is only about spelling.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"combine\".",
      "answer": "put things together",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "put things together",
        "a person who asks questions"
      ],
      "id": "work-email-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to advertise a sports team",
        "to remind coworkers about a project deadline",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "work-email-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "finding deadlines and required actions",
      "options": [
        "finding deadlines and required actions",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "work-email-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "The presentation deck must be ready before Friday morning.",
        "A detail not connected to the passage.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"combine\".",
      "answer": "put things together",
      "options": [
        "to remind coworkers about a project deadline",
        "the opposite of the passage meaning",
        "put things together",
        "combine"
      ],
      "id": "work-email-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Project Reminder\".",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to test math formulas",
        "to remind coworkers about a project deadline",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Work Email.",
      "answer": "finding deadlines and required actions",
      "options": [
        "finding deadlines and required actions",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "work-email-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The text says the opposite.",
        "put things together",
        "to remind coworkers about a project deadline",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "put things together",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "a sentence that closes an email",
        "put things together",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "finding deadlines and required actions",
        "to remind coworkers about a project deadline",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "work-email-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "work-email-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Nina can help with design support before noon tomorrow.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Nina can help with design support before noon tomorrow."
      ],
      "id": "work-email-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The email reminds the team to send final slides by Thursday afternoon.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "work-email-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "to make readers ignore the topic",
        "to remind coworkers about a project deadline",
        "put things together",
        "to hide the main idea"
      ],
      "id": "work-email-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Project Reminder\".",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The presentation deck must be ready before Friday morning.",
        "Nina can help with design support before noon tomorrow.",
        "to remind coworkers about a project deadline",
        "No inference can be made."
      ],
      "id": "work-email-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "combine",
        "put things together",
        "A conclusion from a different passage.",
        "The email reminds the team to send final slides by Thursday afternoon."
      ],
      "id": "work-email-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "finding deadlines and required actions",
      "options": [
        "Nina can help with design support before noon tomorrow.",
        "ignoring supporting details",
        "finding deadlines and required actions",
        "to remind coworkers about a project deadline"
      ],
      "id": "work-email-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to remind coworkers about a project deadline",
      "options": [
        "The passage has no purpose.",
        "to remind coworkers about a project deadline",
        "The presentation deck must be ready before Friday morning.",
        "combine"
      ],
      "id": "work-email-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The email reminds the team to send final slides by Thursday afternoon.",
      "options": [
        "The email reminds the team to send final slides by Thursday afternoon.",
        "Nina can help with design support before noon tomorrow.",
        "put things together",
        "Only one small word matters."
      ],
      "id": "work-email-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The presentation deck must be ready before Friday morning.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Nina can help with design support before noon tomorrow.",
        "The presentation deck must be ready before Friday morning."
      ],
      "id": "work-email-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik7Page() {
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
