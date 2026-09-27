import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "science-fact",
  "title": "Science Fact",
  "description": "Membaca fakta sains singkat dan menarik kesimpulan.",
  "passageTitle": "Why Plants Need Light",
  "passage": "Plants use sunlight to make food through a process called photosynthesis. Without enough light, many plants grow slowly or become weak. This is why indoor plants are often placed near windows.",
  "mainIdea": "Plants need sunlight to make food and grow well.",
  "detail": "Indoor plants are often placed near windows.",
  "vocabulary": "process",
  "vocabularyMeaning": "a series of actions or changes",
  "inference": "A dark room is not ideal for many plants.",
  "purpose": "to explain why light matters for plant growth",
  "readingSkill": "understanding explanations and scientific terms",
  "topicNumber": 11
};

const quizTopics = [
  {
    "id": "science-fact",
    "title": "Science Fact",
    "description": "Membaca fakta sains singkat dan menarik kesimpulan."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Why Plants Need Light",
      "options": [
        "Why Plants Need Light",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "science-fact-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "to explain why light matters for plant growth",
        "The opposite detail is stated.",
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "process",
      "options": [
        "meanwhile",
        "process",
        "therefore",
        "although"
      ],
      "id": "science-fact-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Why Plants Need Light\".",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows.",
        "to explain why light matters for plant growth",
        "A story about an unrelated event."
      ],
      "id": "science-fact-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "process",
      "options": [
        "understanding explanations and scientific terms",
        "main idea",
        "process",
        "a series of actions or changes"
      ],
      "id": "science-fact-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Why Plants Need Light",
      "options": [
        "No title is possible.",
        "Why Plants Need Light",
        "Science Fact",
        "to explain why light matters for plant growth"
      ],
      "id": "science-fact-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Science Fact.",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "science-fact-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "a series of actions or changes",
        "understanding explanations and scientific terms",
        "The text is only about spelling.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"process\".",
      "answer": "a series of actions or changes",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a series of actions or changes",
        "a person who asks questions"
      ],
      "id": "science-fact-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to advertise a sports team",
        "to explain why light matters for plant growth",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "science-fact-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "understanding explanations and scientific terms",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "science-fact-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "A dark room is not ideal for many plants.",
        "A detail not connected to the passage.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"process\".",
      "answer": "a series of actions or changes",
      "options": [
        "to explain why light matters for plant growth",
        "the opposite of the passage meaning",
        "a series of actions or changes",
        "process"
      ],
      "id": "science-fact-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Why Plants Need Light\".",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to test math formulas",
        "to explain why light matters for plant growth",
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Science Fact.",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "understanding explanations and scientific terms",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "science-fact-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "The text says the opposite.",
        "a series of actions or changes",
        "to explain why light matters for plant growth",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "a series of actions or changes",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "a sentence that closes an email",
        "a series of actions or changes",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "understanding explanations and scientific terms",
        "to explain why light matters for plant growth",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "science-fact-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "A dark room is not ideal for many plants.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "science-fact-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "A dark room is not ideal for many plants.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Plants need sunlight to make food and grow well.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "science-fact-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to make readers ignore the topic",
        "to explain why light matters for plant growth",
        "a series of actions or changes",
        "to hide the main idea"
      ],
      "id": "science-fact-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Why Plants Need Light\".",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "A dark room is not ideal for many plants.",
        "Indoor plants are often placed near windows.",
        "to explain why light matters for plant growth",
        "No inference can be made."
      ],
      "id": "science-fact-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "process",
        "a series of actions or changes",
        "A conclusion from a different passage.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "Indoor plants are often placed near windows.",
        "ignoring supporting details",
        "understanding explanations and scientific terms",
        "to explain why light matters for plant growth"
      ],
      "id": "science-fact-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "The passage has no purpose.",
        "to explain why light matters for plant growth",
        "A dark room is not ideal for many plants.",
        "process"
      ],
      "id": "science-fact-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows.",
        "a series of actions or changes",
        "Only one small word matters."
      ],
      "id": "science-fact-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Why Plants Need Light",
      "options": [
        "Why Plants Need Light",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "science-fact-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "to explain why light matters for plant growth",
        "The opposite detail is stated.",
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "process",
      "options": [
        "meanwhile",
        "process",
        "therefore",
        "although"
      ],
      "id": "science-fact-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Why Plants Need Light\".",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows.",
        "to explain why light matters for plant growth",
        "A story about an unrelated event."
      ],
      "id": "science-fact-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "process",
      "options": [
        "understanding explanations and scientific terms",
        "main idea",
        "process",
        "a series of actions or changes"
      ],
      "id": "science-fact-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Why Plants Need Light",
      "options": [
        "No title is possible.",
        "Why Plants Need Light",
        "Science Fact",
        "to explain why light matters for plant growth"
      ],
      "id": "science-fact-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Science Fact.",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "science-fact-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "a series of actions or changes",
        "understanding explanations and scientific terms",
        "The text is only about spelling.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"process\".",
      "answer": "a series of actions or changes",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a series of actions or changes",
        "a person who asks questions"
      ],
      "id": "science-fact-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to advertise a sports team",
        "to explain why light matters for plant growth",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "science-fact-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "understanding explanations and scientific terms",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "science-fact-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "A dark room is not ideal for many plants.",
        "A detail not connected to the passage.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"process\".",
      "answer": "a series of actions or changes",
      "options": [
        "to explain why light matters for plant growth",
        "the opposite of the passage meaning",
        "a series of actions or changes",
        "process"
      ],
      "id": "science-fact-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Why Plants Need Light\".",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to test math formulas",
        "to explain why light matters for plant growth",
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Science Fact.",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "understanding explanations and scientific terms",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "science-fact-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "The text says the opposite.",
        "a series of actions or changes",
        "to explain why light matters for plant growth",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "a series of actions or changes",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "a sentence that closes an email",
        "a series of actions or changes",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "understanding explanations and scientific terms",
        "to explain why light matters for plant growth",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "science-fact-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "A dark room is not ideal for many plants.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "science-fact-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Indoor plants are often placed near windows.",
      "options": [
        "A dark room is not ideal for many plants.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Indoor plants are often placed near windows."
      ],
      "id": "science-fact-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Plants need sunlight to make food and grow well.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "science-fact-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "to make readers ignore the topic",
        "to explain why light matters for plant growth",
        "a series of actions or changes",
        "to hide the main idea"
      ],
      "id": "science-fact-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Why Plants Need Light\".",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "A dark room is not ideal for many plants.",
        "Indoor plants are often placed near windows.",
        "to explain why light matters for plant growth",
        "No inference can be made."
      ],
      "id": "science-fact-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "process",
        "a series of actions or changes",
        "A conclusion from a different passage.",
        "Plants need sunlight to make food and grow well."
      ],
      "id": "science-fact-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "understanding explanations and scientific terms",
      "options": [
        "Indoor plants are often placed near windows.",
        "ignoring supporting details",
        "understanding explanations and scientific terms",
        "to explain why light matters for plant growth"
      ],
      "id": "science-fact-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to explain why light matters for plant growth",
      "options": [
        "The passage has no purpose.",
        "to explain why light matters for plant growth",
        "A dark room is not ideal for many plants.",
        "process"
      ],
      "id": "science-fact-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Plants need sunlight to make food and grow well.",
      "options": [
        "Plants need sunlight to make food and grow well.",
        "Indoor plants are often placed near windows.",
        "a series of actions or changes",
        "Only one small word matters."
      ],
      "id": "science-fact-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "A dark room is not ideal for many plants.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Indoor plants are often placed near windows.",
        "A dark room is not ideal for many plants."
      ],
      "id": "science-fact-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik11Page() {
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
