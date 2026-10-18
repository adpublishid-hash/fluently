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
      "id": "science-fact-reading-5",
      "level": "Basic",
      "prompt": "What do plants use to make food?",
      "answer": "sunlight",
      "options": [
        "moonlight",
        "plastic",
        "sunlight",
        "sand"
      ]
    },
    {
      "id": "science-fact-reading-6",
      "level": "Basic",
      "prompt": "Where are indoor plants often placed?",
      "answer": "near windows",
      "options": [
        "near windows",
        "inside a cupboard",
        "in a dark corner",
        "under the bed"
      ]
    },
    {
      "id": "science-fact-reading-7",
      "level": "Basic",
      "prompt": "What is the name of the process in the passage?",
      "answer": "photosynthesis",
      "options": [
        "evaporation",
        "pollination",
        "digestion",
        "photosynthesis"
      ]
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
      "id": "science-fact-reading-9",
      "level": "Basic",
      "prompt": "Which word in the passage means \"not strong\"?",
      "answer": "weak",
      "options": [
        "slowly",
        "enough",
        "weak",
        "indoor"
      ]
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
      "id": "science-fact-reading-17",
      "level": "Intermediate",
      "prompt": "What happens to many plants without enough light?",
      "answer": "They grow slowly or become weak.",
      "options": [
        "They make more food than usual.",
        "They grow faster and taller.",
        "They grow slowly or become weak.",
        "They change colour to bright red."
      ]
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
      "id": "science-fact-reading-19",
      "level": "Intermediate",
      "prompt": "Which phrase in the last sentence links the cause to its result?",
      "answer": "This is why",
      "options": [
        "This is why",
        "indoor plants",
        "near windows",
        "often placed"
      ]
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
      "id": "science-fact-reading-28",
      "level": "Advanced",
      "prompt": "A plant kept in a windowless room looks pale and small. Which explanation best fits the passage?",
      "answer": "It cannot make enough food without light.",
      "options": [
        "It cannot make enough food without light.",
        "It needs to be placed further from windows.",
        "It is growing faster than normal plants.",
        "It is getting too much sunlight."
      ]
    },
    {
      "id": "science-fact-reading-29",
      "level": "Advanced",
      "prompt": "How is the information in the passage mainly organised?",
      "answer": "a fact, then its effect, then a real-life example",
      "options": [
        "a list of opinions from experts",
        "a problem followed by several complaints from gardeners",
        "a story told in time order",
        "a fact, then its effect, then a real-life example"
      ]
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
      "id": "science-fact-reading-5",
      "level": "Basic",
      "prompt": "Apa yang digunakan tumbuhan untuk membuat makanan?",
      "answer": "sunlight",
      "options": [
        "moonlight",
        "plastic",
        "sunlight",
        "sand"
      ]
    },
    {
      "id": "science-fact-reading-6",
      "level": "Basic",
      "prompt": "Di mana tanaman dalam ruangan sering diletakkan?",
      "answer": "near windows",
      "options": [
        "near windows",
        "inside a cupboard",
        "in a dark corner",
        "under the bed"
      ]
    },
    {
      "id": "science-fact-reading-7",
      "level": "Basic",
      "prompt": "Apa nama proses yang disebutkan dalam bacaan?",
      "answer": "photosynthesis",
      "options": [
        "evaporation",
        "pollination",
        "digestion",
        "photosynthesis"
      ]
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
      "id": "science-fact-reading-9",
      "level": "Basic",
      "prompt": "Kata mana dalam bacaan yang berarti \"not strong\"?",
      "answer": "weak",
      "options": [
        "slowly",
        "enough",
        "weak",
        "indoor"
      ]
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
      "id": "science-fact-reading-17",
      "level": "Intermediate",
      "prompt": "Apa yang terjadi pada banyak tumbuhan tanpa cahaya yang cukup?",
      "answer": "They grow slowly or become weak.",
      "options": [
        "They make more food than usual.",
        "They grow faster and taller.",
        "They grow slowly or become weak.",
        "They change colour to bright red."
      ]
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
      "id": "science-fact-reading-19",
      "level": "Intermediate",
      "prompt": "Frasa mana dalam kalimat terakhir yang menghubungkan sebab dengan akibatnya?",
      "answer": "This is why",
      "options": [
        "This is why",
        "indoor plants",
        "near windows",
        "often placed"
      ]
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
      "id": "science-fact-reading-28",
      "level": "Advanced",
      "prompt": "Sebuah tanaman yang disimpan di ruangan tanpa jendela terlihat pucat dan kecil. Penjelasan mana yang paling sesuai dengan bacaan?",
      "answer": "It cannot make enough food without light.",
      "options": [
        "It cannot make enough food without light.",
        "It needs to be placed further from windows.",
        "It is growing faster than normal plants.",
        "It is getting too much sunlight."
      ]
    },
    {
      "id": "science-fact-reading-29",
      "level": "Advanced",
      "prompt": "Bagaimana informasi dalam bacaan terutama disusun?",
      "answer": "a fact, then its effect, then a real-life example",
      "options": [
        "a list of opinions from experts",
        "a problem followed by several complaints from gardeners",
        "a story told in time order",
        "a fact, then its effect, then a real-life example"
      ]
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
