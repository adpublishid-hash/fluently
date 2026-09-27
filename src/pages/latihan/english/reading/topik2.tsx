import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "school-notice",
  "title": "School Notice",
  "description": "Membaca pengumuman sekolah dan menangkap informasi penting.",
  "passageTitle": "Library Hours Update",
  "passage": "Starting Monday, the school library will close at 5 p.m. instead of 4 p.m. Students may use the extra hour for group projects, reading, or computer access. Food and drinks are still not allowed inside.",
  "mainIdea": "The school library will stay open one hour longer.",
  "detail": "Food and drinks are still not allowed inside the library.",
  "vocabulary": "access",
  "vocabularyMeaning": "the ability or permission to use something",
  "inference": "Students will have more time to study after class.",
  "purpose": "to inform students about a change in library hours",
  "readingSkill": "identifying specific information in a notice",
  "topicNumber": 2
};

const quizTopics = [
  {
    "id": "school-notice",
    "title": "School Notice",
    "description": "Membaca pengumuman sekolah dan menangkap informasi penting."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Library Hours Update",
      "options": [
        "Library Hours Update",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "school-notice-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "to inform students about a change in library hours",
        "The opposite detail is stated.",
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "access",
      "options": [
        "meanwhile",
        "access",
        "therefore",
        "although"
      ],
      "id": "school-notice-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Library Hours Update\".",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library.",
        "to inform students about a change in library hours",
        "A story about an unrelated event."
      ],
      "id": "school-notice-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "access",
      "options": [
        "identifying specific information in a notice",
        "main idea",
        "access",
        "the ability or permission to use something"
      ],
      "id": "school-notice-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Library Hours Update",
      "options": [
        "No title is possible.",
        "Library Hours Update",
        "School Notice",
        "to inform students about a change in library hours"
      ],
      "id": "school-notice-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: School Notice.",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "school-notice-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "the ability or permission to use something",
        "identifying specific information in a notice",
        "The text is only about spelling.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"access\".",
      "answer": "the ability or permission to use something",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "the ability or permission to use something",
        "a person who asks questions"
      ],
      "id": "school-notice-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to advertise a sports team",
        "to inform students about a change in library hours",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "school-notice-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "identifying specific information in a notice",
      "options": [
        "identifying specific information in a notice",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "school-notice-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The school library will stay open one hour longer.",
        "Students will have more time to study after class.",
        "A detail not connected to the passage.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"access\".",
      "answer": "the ability or permission to use something",
      "options": [
        "to inform students about a change in library hours",
        "the opposite of the passage meaning",
        "the ability or permission to use something",
        "access"
      ],
      "id": "school-notice-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Library Hours Update\".",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to test math formulas",
        "to inform students about a change in library hours",
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: School Notice.",
      "answer": "identifying specific information in a notice",
      "options": [
        "identifying specific information in a notice",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "school-notice-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The text says the opposite.",
        "the ability or permission to use something",
        "to inform students about a change in library hours",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "the ability or permission to use something",
      "options": [
        "The school library will stay open one hour longer.",
        "a sentence that closes an email",
        "the ability or permission to use something",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "identifying specific information in a notice",
        "to inform students about a change in library hours",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "school-notice-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Students will have more time to study after class.",
      "options": [
        "Students will have more time to study after class.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "school-notice-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "Students will have more time to study after class.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The school library will stay open one hour longer.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "school-notice-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to make readers ignore the topic",
        "to inform students about a change in library hours",
        "the ability or permission to use something",
        "to hide the main idea"
      ],
      "id": "school-notice-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Library Hours Update\".",
      "answer": "Students will have more time to study after class.",
      "options": [
        "Students will have more time to study after class.",
        "Food and drinks are still not allowed inside the library.",
        "to inform students about a change in library hours",
        "No inference can be made."
      ],
      "id": "school-notice-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "access",
        "the ability or permission to use something",
        "A conclusion from a different passage.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "identifying specific information in a notice",
      "options": [
        "Food and drinks are still not allowed inside the library.",
        "ignoring supporting details",
        "identifying specific information in a notice",
        "to inform students about a change in library hours"
      ],
      "id": "school-notice-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "The passage has no purpose.",
        "to inform students about a change in library hours",
        "Students will have more time to study after class.",
        "access"
      ],
      "id": "school-notice-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library.",
        "the ability or permission to use something",
        "Only one small word matters."
      ],
      "id": "school-notice-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Students will have more time to study after class.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Library Hours Update",
      "options": [
        "Library Hours Update",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "school-notice-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "to inform students about a change in library hours",
        "The opposite detail is stated.",
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "access",
      "options": [
        "meanwhile",
        "access",
        "therefore",
        "although"
      ],
      "id": "school-notice-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Library Hours Update\".",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library.",
        "to inform students about a change in library hours",
        "A story about an unrelated event."
      ],
      "id": "school-notice-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "access",
      "options": [
        "identifying specific information in a notice",
        "main idea",
        "access",
        "the ability or permission to use something"
      ],
      "id": "school-notice-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Library Hours Update",
      "options": [
        "No title is possible.",
        "Library Hours Update",
        "School Notice",
        "to inform students about a change in library hours"
      ],
      "id": "school-notice-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: School Notice.",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "school-notice-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "the ability or permission to use something",
        "identifying specific information in a notice",
        "The text is only about spelling.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"access\".",
      "answer": "the ability or permission to use something",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "the ability or permission to use something",
        "a person who asks questions"
      ],
      "id": "school-notice-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to advertise a sports team",
        "to inform students about a change in library hours",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "school-notice-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "identifying specific information in a notice",
      "options": [
        "identifying specific information in a notice",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "school-notice-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The school library will stay open one hour longer.",
        "Students will have more time to study after class.",
        "A detail not connected to the passage.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"access\".",
      "answer": "the ability or permission to use something",
      "options": [
        "to inform students about a change in library hours",
        "the opposite of the passage meaning",
        "the ability or permission to use something",
        "access"
      ],
      "id": "school-notice-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Library Hours Update\".",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to test math formulas",
        "to inform students about a change in library hours",
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: School Notice.",
      "answer": "identifying specific information in a notice",
      "options": [
        "identifying specific information in a notice",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "school-notice-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "The text says the opposite.",
        "the ability or permission to use something",
        "to inform students about a change in library hours",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "the ability or permission to use something",
      "options": [
        "The school library will stay open one hour longer.",
        "a sentence that closes an email",
        "the ability or permission to use something",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "identifying specific information in a notice",
        "to inform students about a change in library hours",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "school-notice-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Students will have more time to study after class.",
      "options": [
        "Students will have more time to study after class.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "school-notice-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Food and drinks are still not allowed inside the library.",
      "options": [
        "Students will have more time to study after class.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Food and drinks are still not allowed inside the library."
      ],
      "id": "school-notice-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The school library will stay open one hour longer.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "school-notice-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "to make readers ignore the topic",
        "to inform students about a change in library hours",
        "the ability or permission to use something",
        "to hide the main idea"
      ],
      "id": "school-notice-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Library Hours Update\".",
      "answer": "Students will have more time to study after class.",
      "options": [
        "Students will have more time to study after class.",
        "Food and drinks are still not allowed inside the library.",
        "to inform students about a change in library hours",
        "No inference can be made."
      ],
      "id": "school-notice-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "access",
        "the ability or permission to use something",
        "A conclusion from a different passage.",
        "The school library will stay open one hour longer."
      ],
      "id": "school-notice-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "identifying specific information in a notice",
      "options": [
        "Food and drinks are still not allowed inside the library.",
        "ignoring supporting details",
        "identifying specific information in a notice",
        "to inform students about a change in library hours"
      ],
      "id": "school-notice-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to inform students about a change in library hours",
      "options": [
        "The passage has no purpose.",
        "to inform students about a change in library hours",
        "Students will have more time to study after class.",
        "access"
      ],
      "id": "school-notice-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The school library will stay open one hour longer.",
      "options": [
        "The school library will stay open one hour longer.",
        "Food and drinks are still not allowed inside the library.",
        "the ability or permission to use something",
        "Only one small word matters."
      ],
      "id": "school-notice-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Students will have more time to study after class.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Food and drinks are still not allowed inside the library.",
        "Students will have more time to study after class."
      ],
      "id": "school-notice-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik2Page() {
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
