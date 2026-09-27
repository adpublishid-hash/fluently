import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "culture",
  "title": "Culture",
  "description": "Membaca teks budaya dan memahami makna kebiasaan.",
  "passageTitle": "Sharing Food",
  "passage": "In many families, sharing food is a way to welcome guests. A simple meal can show kindness, respect, and friendship. Even when the food is not expensive, the gesture often feels meaningful.",
  "mainIdea": "Sharing food can be an important gesture of welcome and respect.",
  "detail": "A simple meal can show kindness, respect, and friendship.",
  "vocabulary": "gesture",
  "vocabularyMeaning": "an action that shows a feeling or intention",
  "inference": "The meaning of sharing food is not only about price.",
  "purpose": "to explain the cultural meaning of sharing food",
  "readingSkill": "interpreting meaning beyond literal details",
  "topicNumber": 15
};

const quizTopics = [
  {
    "id": "culture",
    "title": "Culture",
    "description": "Membaca teks budaya dan memahami makna kebiasaan."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Sharing Food",
      "options": [
        "Sharing Food",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "culture-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "to explain the cultural meaning of sharing food",
        "The opposite detail is stated.",
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "gesture",
      "options": [
        "meanwhile",
        "gesture",
        "therefore",
        "although"
      ],
      "id": "culture-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Sharing Food\".",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship.",
        "to explain the cultural meaning of sharing food",
        "A story about an unrelated event."
      ],
      "id": "culture-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "gesture",
      "options": [
        "interpreting meaning beyond literal details",
        "main idea",
        "gesture",
        "an action that shows a feeling or intention"
      ],
      "id": "culture-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Sharing Food",
      "options": [
        "No title is possible.",
        "Sharing Food",
        "Culture",
        "to explain the cultural meaning of sharing food"
      ],
      "id": "culture-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Culture.",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "culture-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "an action that shows a feeling or intention",
        "interpreting meaning beyond literal details",
        "The text is only about spelling.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"gesture\".",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "an action that shows a feeling or intention",
        "a person who asks questions"
      ],
      "id": "culture-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to advertise a sports team",
        "to explain the cultural meaning of sharing food",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "culture-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "interpreting meaning beyond literal details",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "culture-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "The meaning of sharing food is not only about price.",
        "A detail not connected to the passage.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"gesture\".",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "to explain the cultural meaning of sharing food",
        "the opposite of the passage meaning",
        "an action that shows a feeling or intention",
        "gesture"
      ],
      "id": "culture-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Sharing Food\".",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to test math formulas",
        "to explain the cultural meaning of sharing food",
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Culture.",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "interpreting meaning beyond literal details",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "culture-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The text says the opposite.",
        "an action that shows a feeling or intention",
        "to explain the cultural meaning of sharing food",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "a sentence that closes an email",
        "an action that shows a feeling or intention",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "interpreting meaning beyond literal details",
        "to explain the cultural meaning of sharing food",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "culture-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "culture-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Sharing food can be an important gesture of welcome and respect.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "culture-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to make readers ignore the topic",
        "to explain the cultural meaning of sharing food",
        "an action that shows a feeling or intention",
        "to hide the main idea"
      ],
      "id": "culture-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Sharing Food\".",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "A simple meal can show kindness, respect, and friendship.",
        "to explain the cultural meaning of sharing food",
        "No inference can be made."
      ],
      "id": "culture-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "gesture",
        "an action that shows a feeling or intention",
        "A conclusion from a different passage.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "A simple meal can show kindness, respect, and friendship.",
        "ignoring supporting details",
        "interpreting meaning beyond literal details",
        "to explain the cultural meaning of sharing food"
      ],
      "id": "culture-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "The passage has no purpose.",
        "to explain the cultural meaning of sharing food",
        "The meaning of sharing food is not only about price.",
        "gesture"
      ],
      "id": "culture-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship.",
        "an action that shows a feeling or intention",
        "Only one small word matters."
      ],
      "id": "culture-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Sharing Food",
      "options": [
        "Sharing Food",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "culture-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "to explain the cultural meaning of sharing food",
        "The opposite detail is stated.",
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "gesture",
      "options": [
        "meanwhile",
        "gesture",
        "therefore",
        "although"
      ],
      "id": "culture-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Sharing Food\".",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship.",
        "to explain the cultural meaning of sharing food",
        "A story about an unrelated event."
      ],
      "id": "culture-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "gesture",
      "options": [
        "interpreting meaning beyond literal details",
        "main idea",
        "gesture",
        "an action that shows a feeling or intention"
      ],
      "id": "culture-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Sharing Food",
      "options": [
        "No title is possible.",
        "Sharing Food",
        "Culture",
        "to explain the cultural meaning of sharing food"
      ],
      "id": "culture-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Culture.",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "culture-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "an action that shows a feeling or intention",
        "interpreting meaning beyond literal details",
        "The text is only about spelling.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"gesture\".",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "an action that shows a feeling or intention",
        "a person who asks questions"
      ],
      "id": "culture-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to advertise a sports team",
        "to explain the cultural meaning of sharing food",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "culture-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "interpreting meaning beyond literal details",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "culture-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "The meaning of sharing food is not only about price.",
        "A detail not connected to the passage.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"gesture\".",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "to explain the cultural meaning of sharing food",
        "the opposite of the passage meaning",
        "an action that shows a feeling or intention",
        "gesture"
      ],
      "id": "culture-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Sharing Food\".",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to test math formulas",
        "to explain the cultural meaning of sharing food",
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Culture.",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "interpreting meaning beyond literal details",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "culture-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The text says the opposite.",
        "an action that shows a feeling or intention",
        "to explain the cultural meaning of sharing food",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "an action that shows a feeling or intention",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "a sentence that closes an email",
        "an action that shows a feeling or intention",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "interpreting meaning beyond literal details",
        "to explain the cultural meaning of sharing food",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "culture-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "culture-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "A simple meal can show kindness, respect, and friendship.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "A simple meal can show kindness, respect, and friendship."
      ],
      "id": "culture-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Sharing food can be an important gesture of welcome and respect.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "culture-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "to make readers ignore the topic",
        "to explain the cultural meaning of sharing food",
        "an action that shows a feeling or intention",
        "to hide the main idea"
      ],
      "id": "culture-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Sharing Food\".",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The meaning of sharing food is not only about price.",
        "A simple meal can show kindness, respect, and friendship.",
        "to explain the cultural meaning of sharing food",
        "No inference can be made."
      ],
      "id": "culture-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "gesture",
        "an action that shows a feeling or intention",
        "A conclusion from a different passage.",
        "Sharing food can be an important gesture of welcome and respect."
      ],
      "id": "culture-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "interpreting meaning beyond literal details",
      "options": [
        "A simple meal can show kindness, respect, and friendship.",
        "ignoring supporting details",
        "interpreting meaning beyond literal details",
        "to explain the cultural meaning of sharing food"
      ],
      "id": "culture-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to explain the cultural meaning of sharing food",
      "options": [
        "The passage has no purpose.",
        "to explain the cultural meaning of sharing food",
        "The meaning of sharing food is not only about price.",
        "gesture"
      ],
      "id": "culture-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Sharing food can be an important gesture of welcome and respect.",
      "options": [
        "Sharing food can be an important gesture of welcome and respect.",
        "A simple meal can show kindness, respect, and friendship.",
        "an action that shows a feeling or intention",
        "Only one small word matters."
      ],
      "id": "culture-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The meaning of sharing food is not only about price.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "A simple meal can show kindness, respect, and friendship.",
        "The meaning of sharing food is not only about price."
      ],
      "id": "culture-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik15Page() {
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
