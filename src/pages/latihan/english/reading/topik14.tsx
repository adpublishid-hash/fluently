import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "instructions",
  "title": "Instructions",
  "description": "Membaca instruksi dan memahami langkah-langkah.",
  "passageTitle": "How to Reset a Password",
  "passage": "Open the login page and click Forgot Password. Enter your email address, then check your inbox for a reset link. Create a new password and save it in a secure place.",
  "mainIdea": "The text explains how to reset a password.",
  "detail": "Users should check their inbox for a reset link.",
  "vocabulary": "secure",
  "vocabularyMeaning": "safe or protected",
  "inference": "The user needs access to their email account.",
  "purpose": "to give step-by-step password reset instructions",
  "readingSkill": "following procedural steps",
  "topicNumber": 14
};

const quizTopics = [
  {
    "id": "instructions",
    "title": "Instructions",
    "description": "Membaca instruksi dan memahami langkah-langkah."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "How to Reset a Password",
      "options": [
        "How to Reset a Password",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "instructions-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "to give step-by-step password reset instructions",
        "The opposite detail is stated.",
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "secure",
      "options": [
        "meanwhile",
        "secure",
        "therefore",
        "although"
      ],
      "id": "instructions-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"How to Reset a Password\".",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link.",
        "to give step-by-step password reset instructions",
        "A story about an unrelated event."
      ],
      "id": "instructions-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "secure",
      "options": [
        "following procedural steps",
        "main idea",
        "secure",
        "safe or protected"
      ],
      "id": "instructions-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "How to Reset a Password",
      "options": [
        "No title is possible.",
        "How to Reset a Password",
        "Instructions",
        "to give step-by-step password reset instructions"
      ],
      "id": "instructions-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Instructions.",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "instructions-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "safe or protected",
        "following procedural steps",
        "The text is only about spelling.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"secure\".",
      "answer": "safe or protected",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "safe or protected",
        "a person who asks questions"
      ],
      "id": "instructions-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to advertise a sports team",
        "to give step-by-step password reset instructions",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "instructions-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "following procedural steps",
      "options": [
        "following procedural steps",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "instructions-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The text explains how to reset a password.",
        "The user needs access to their email account.",
        "A detail not connected to the passage.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"secure\".",
      "answer": "safe or protected",
      "options": [
        "to give step-by-step password reset instructions",
        "the opposite of the passage meaning",
        "safe or protected",
        "secure"
      ],
      "id": "instructions-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"How to Reset a Password\".",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to test math formulas",
        "to give step-by-step password reset instructions",
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Instructions.",
      "answer": "following procedural steps",
      "options": [
        "following procedural steps",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "instructions-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The text says the opposite.",
        "safe or protected",
        "to give step-by-step password reset instructions",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "safe or protected",
      "options": [
        "The text explains how to reset a password.",
        "a sentence that closes an email",
        "safe or protected",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "following procedural steps",
        "to give step-by-step password reset instructions",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "instructions-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The user needs access to their email account.",
      "options": [
        "The user needs access to their email account.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "instructions-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The user needs access to their email account.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The text explains how to reset a password.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "instructions-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to make readers ignore the topic",
        "to give step-by-step password reset instructions",
        "safe or protected",
        "to hide the main idea"
      ],
      "id": "instructions-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"How to Reset a Password\".",
      "answer": "The user needs access to their email account.",
      "options": [
        "The user needs access to their email account.",
        "Users should check their inbox for a reset link.",
        "to give step-by-step password reset instructions",
        "No inference can be made."
      ],
      "id": "instructions-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The text explains how to reset a password.",
      "options": [
        "secure",
        "safe or protected",
        "A conclusion from a different passage.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "following procedural steps",
      "options": [
        "Users should check their inbox for a reset link.",
        "ignoring supporting details",
        "following procedural steps",
        "to give step-by-step password reset instructions"
      ],
      "id": "instructions-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "The passage has no purpose.",
        "to give step-by-step password reset instructions",
        "The user needs access to their email account.",
        "secure"
      ],
      "id": "instructions-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link.",
        "safe or protected",
        "Only one small word matters."
      ],
      "id": "instructions-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The user needs access to their email account.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "How to Reset a Password",
      "options": [
        "How to Reset a Password",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "instructions-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "to give step-by-step password reset instructions",
        "The opposite detail is stated.",
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "secure",
      "options": [
        "meanwhile",
        "secure",
        "therefore",
        "although"
      ],
      "id": "instructions-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"How to Reset a Password\".",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link.",
        "to give step-by-step password reset instructions",
        "A story about an unrelated event."
      ],
      "id": "instructions-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "secure",
      "options": [
        "following procedural steps",
        "main idea",
        "secure",
        "safe or protected"
      ],
      "id": "instructions-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "How to Reset a Password",
      "options": [
        "No title is possible.",
        "How to Reset a Password",
        "Instructions",
        "to give step-by-step password reset instructions"
      ],
      "id": "instructions-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Instructions.",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "instructions-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "safe or protected",
        "following procedural steps",
        "The text is only about spelling.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"secure\".",
      "answer": "safe or protected",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "safe or protected",
        "a person who asks questions"
      ],
      "id": "instructions-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to advertise a sports team",
        "to give step-by-step password reset instructions",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "instructions-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "following procedural steps",
      "options": [
        "following procedural steps",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "instructions-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The text explains how to reset a password.",
        "The user needs access to their email account.",
        "A detail not connected to the passage.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"secure\".",
      "answer": "safe or protected",
      "options": [
        "to give step-by-step password reset instructions",
        "the opposite of the passage meaning",
        "safe or protected",
        "secure"
      ],
      "id": "instructions-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"How to Reset a Password\".",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to test math formulas",
        "to give step-by-step password reset instructions",
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Instructions.",
      "answer": "following procedural steps",
      "options": [
        "following procedural steps",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "instructions-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The text says the opposite.",
        "safe or protected",
        "to give step-by-step password reset instructions",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "safe or protected",
      "options": [
        "The text explains how to reset a password.",
        "a sentence that closes an email",
        "safe or protected",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "following procedural steps",
        "to give step-by-step password reset instructions",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "instructions-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The user needs access to their email account.",
      "options": [
        "The user needs access to their email account.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "instructions-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Users should check their inbox for a reset link.",
      "options": [
        "The user needs access to their email account.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Users should check their inbox for a reset link."
      ],
      "id": "instructions-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The text explains how to reset a password.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "instructions-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "to make readers ignore the topic",
        "to give step-by-step password reset instructions",
        "safe or protected",
        "to hide the main idea"
      ],
      "id": "instructions-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"How to Reset a Password\".",
      "answer": "The user needs access to their email account.",
      "options": [
        "The user needs access to their email account.",
        "Users should check their inbox for a reset link.",
        "to give step-by-step password reset instructions",
        "No inference can be made."
      ],
      "id": "instructions-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The text explains how to reset a password.",
      "options": [
        "secure",
        "safe or protected",
        "A conclusion from a different passage.",
        "The text explains how to reset a password."
      ],
      "id": "instructions-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "following procedural steps",
      "options": [
        "Users should check their inbox for a reset link.",
        "ignoring supporting details",
        "following procedural steps",
        "to give step-by-step password reset instructions"
      ],
      "id": "instructions-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to give step-by-step password reset instructions",
      "options": [
        "The passage has no purpose.",
        "to give step-by-step password reset instructions",
        "The user needs access to their email account.",
        "secure"
      ],
      "id": "instructions-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The text explains how to reset a password.",
      "options": [
        "The text explains how to reset a password.",
        "Users should check their inbox for a reset link.",
        "safe or protected",
        "Only one small word matters."
      ],
      "id": "instructions-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The user needs access to their email account.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Users should check their inbox for a reset link.",
        "The user needs access to their email account."
      ],
      "id": "instructions-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik14Page() {
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
