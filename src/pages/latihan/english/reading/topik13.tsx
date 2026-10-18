import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "opinion-column",
  "title": "Opinion Column",
  "description": "Membaca opini dan memahami alasan penulis.",
  "passageTitle": "Why Parks Matter",
  "passage": "City parks are more than places to relax. They give children safe spaces to play and help adults exercise outdoors. In my view, every neighborhood should have a clean and accessible park.",
  "mainIdea": "The writer believes every neighborhood should have a clean park.",
  "detail": "Parks give children safe spaces to play.",
  "vocabulary": "accessible",
  "vocabularyMeaning": "easy to reach or use",
  "inference": "The writer values public spaces that support health and community life.",
  "purpose": "to persuade readers that parks are important",
  "readingSkill": "identifying opinion, reason, and persuasion",
  "topicNumber": 13
};

const quizTopics = [
  {
    "id": "opinion-column",
    "title": "Opinion Column",
    "description": "Membaca opini dan memahami alasan penulis."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Why Parks Matter",
      "options": [
        "Why Parks Matter",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "opinion-column-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The writer believes every neighborhood should have a clean park."
      ],
      "id": "opinion-column-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "to persuade readers that parks are important",
        "The opposite detail is stated.",
        "Parks give children safe spaces to play.",
        "The writer values public spaces that support health and community life."
      ],
      "id": "opinion-column-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "accessible",
      "options": [
        "meanwhile",
        "accessible",
        "therefore",
        "although"
      ],
      "id": "opinion-column-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Why Parks Matter\".",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "Parks give children safe spaces to play.",
        "to persuade readers that parks are important",
        "A story about an unrelated event."
      ],
      "id": "opinion-column-reading-4",
      "level": "Basic"
    },
    {
      "id": "opinion-column-reading-5",
      "level": "Basic",
      "prompt": "According to the writer, who can play safely in parks?",
      "answer": "children",
      "options": [
        "tourists",
        "drivers",
        "pets only",
        "children"
      ]
    },
    {
      "id": "opinion-column-reading-6",
      "level": "Basic",
      "prompt": "What can adults do in parks?",
      "answer": "exercise outdoors",
      "options": [
        "exercise outdoors",
        "work in offices",
        "watch films",
        "park their cars all day"
      ]
    },
    {
      "id": "opinion-column-reading-7",
      "level": "Basic",
      "prompt": "Which phrase shows the writer's opinion?",
      "answer": "In my view",
      "options": [
        "City parks",
        "places to relax",
        "In my view",
        "safe spaces"
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Opinion Column.",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "Parks give children safe spaces to play.",
        "The writer values public spaces that support health and community life.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "opinion-column-reading-8",
      "level": "Basic"
    },
    {
      "id": "opinion-column-reading-9",
      "level": "Basic",
      "prompt": "Which word in the passage means \"not dirty\"?",
      "answer": "clean",
      "options": [
        "every",
        "relax",
        "safe",
        "clean"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"accessible\".",
      "answer": "easy to reach or use",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "easy to reach or use",
        "a person who asks questions"
      ],
      "id": "opinion-column-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to advertise a sports team",
        "to persuade readers that parks are important",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "opinion-column-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "identifying opinion, reason, and persuasion",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "opinion-column-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "The writer values public spaces that support health and community life.",
        "A detail not connected to the passage.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"accessible\".",
      "answer": "easy to reach or use",
      "options": [
        "to persuade readers that parks are important",
        "the opposite of the passage meaning",
        "easy to reach or use",
        "accessible"
      ],
      "id": "opinion-column-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Why Parks Matter\".",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to test math formulas",
        "to persuade readers that parks are important",
        "The writer believes every neighborhood should have a clean park.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Opinion Column.",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "identifying opinion, reason, and persuasion",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "opinion-column-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "opinion-column-reading-17",
      "level": "Intermediate",
      "prompt": "Which reason does the writer give to support the opinion?",
      "answer": "Parks help adults exercise outdoors.",
      "options": [
        "Parks help adults exercise outdoors.",
        "Parks are cheaper than schools.",
        "Parks bring many foreign tourists to the city.",
        "Parks make houses more expensive."
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "easy to reach or use",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "a sentence that closes an email",
        "easy to reach or use",
        "The writer values public spaces that support health and community life."
      ],
      "id": "opinion-column-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "opinion-column-reading-19",
      "level": "Intermediate",
      "prompt": "What does the writer mean by \"more than places to relax\"?",
      "answer": "Parks have other important uses too.",
      "options": [
        "Parks should only be used for sleeping.",
        "Parks are too busy to relax in.",
        "Parks have other important uses too.",
        "Relaxing in parks is not allowed."
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The writer values public spaces that support health and community life.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "opinion-column-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The writer believes every neighborhood should have a clean park.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "opinion-column-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to make readers ignore the topic",
        "to persuade readers that parks are important",
        "easy to reach or use",
        "to hide the main idea"
      ],
      "id": "opinion-column-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Why Parks Matter\".",
      "answer": "The writer values public spaces that support health and community life.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "Parks give children safe spaces to play.",
        "to persuade readers that parks are important",
        "No inference can be made."
      ],
      "id": "opinion-column-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "accessible",
        "easy to reach or use",
        "A conclusion from a different passage.",
        "The writer believes every neighborhood should have a clean park."
      ],
      "id": "opinion-column-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "Parks give children safe spaces to play.",
        "ignoring supporting details",
        "identifying opinion, reason, and persuasion",
        "to persuade readers that parks are important"
      ],
      "id": "opinion-column-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "The passage has no purpose.",
        "to persuade readers that parks are important",
        "The writer values public spaces that support health and community life.",
        "accessible"
      ],
      "id": "opinion-column-reading-27",
      "level": "Advanced"
    },
    {
      "id": "opinion-column-reading-28",
      "level": "Advanced",
      "prompt": "Which argument would a critic most likely use against the writer's view?",
      "answer": "Building and cleaning parks in every area costs a lot.",
      "options": [
        "Building and cleaning parks in every area costs a lot.",
        "Adults benefit greatly from regular exercise outdoors in green spaces.",
        "Children need safe places to play.",
        "Clean parks are pleasant for everyone."
      ]
    },
    {
      "id": "opinion-column-reading-29",
      "level": "Advanced",
      "prompt": "Which word in the final sentence makes the writer's claim strongest?",
      "answer": "should",
      "options": [
        "view",
        "should",
        "clean",
        "park"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Why Parks Matter",
      "options": [
        "Why Parks Matter",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "opinion-column-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The writer believes every neighborhood should have a clean park."
      ],
      "id": "opinion-column-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "to persuade readers that parks are important",
        "The opposite detail is stated.",
        "Parks give children safe spaces to play.",
        "The writer values public spaces that support health and community life."
      ],
      "id": "opinion-column-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "accessible",
      "options": [
        "meanwhile",
        "accessible",
        "therefore",
        "although"
      ],
      "id": "opinion-column-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Why Parks Matter\".",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "Parks give children safe spaces to play.",
        "to persuade readers that parks are important",
        "A story about an unrelated event."
      ],
      "id": "opinion-column-reading-4",
      "level": "Basic"
    },
    {
      "id": "opinion-column-reading-5",
      "level": "Basic",
      "prompt": "Menurut penulis, siapa yang dapat bermain dengan aman di taman?",
      "answer": "children",
      "options": [
        "tourists",
        "drivers",
        "pets only",
        "children"
      ]
    },
    {
      "id": "opinion-column-reading-6",
      "level": "Basic",
      "prompt": "Apa yang dapat dilakukan orang dewasa di taman?",
      "answer": "exercise outdoors",
      "options": [
        "exercise outdoors",
        "work in offices",
        "watch films",
        "park their cars all day"
      ]
    },
    {
      "id": "opinion-column-reading-7",
      "level": "Basic",
      "prompt": "Frasa mana yang menunjukkan opini penulis?",
      "answer": "In my view",
      "options": [
        "City parks",
        "places to relax",
        "In my view",
        "safe spaces"
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Opinion Column.",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "Parks give children safe spaces to play.",
        "The writer values public spaces that support health and community life.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "opinion-column-reading-8",
      "level": "Basic"
    },
    {
      "id": "opinion-column-reading-9",
      "level": "Basic",
      "prompt": "Kata mana dalam bacaan yang berarti \"not dirty\"?",
      "answer": "clean",
      "options": [
        "every",
        "relax",
        "safe",
        "clean"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"accessible\".",
      "answer": "easy to reach or use",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "easy to reach or use",
        "a person who asks questions"
      ],
      "id": "opinion-column-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to advertise a sports team",
        "to persuade readers that parks are important",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "opinion-column-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "identifying opinion, reason, and persuasion",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "opinion-column-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "The writer values public spaces that support health and community life.",
        "A detail not connected to the passage.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"accessible\".",
      "answer": "easy to reach or use",
      "options": [
        "to persuade readers that parks are important",
        "the opposite of the passage meaning",
        "easy to reach or use",
        "accessible"
      ],
      "id": "opinion-column-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Why Parks Matter\".",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to test math formulas",
        "to persuade readers that parks are important",
        "The writer believes every neighborhood should have a clean park.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Opinion Column.",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "identifying opinion, reason, and persuasion",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "opinion-column-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "opinion-column-reading-17",
      "level": "Intermediate",
      "prompt": "Alasan mana yang diberikan penulis untuk mendukung opininya?",
      "answer": "Parks help adults exercise outdoors.",
      "options": [
        "Parks help adults exercise outdoors.",
        "Parks are cheaper than schools.",
        "Parks bring many foreign tourists to the city.",
        "Parks make houses more expensive."
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "easy to reach or use",
      "options": [
        "The writer believes every neighborhood should have a clean park.",
        "a sentence that closes an email",
        "easy to reach or use",
        "The writer values public spaces that support health and community life."
      ],
      "id": "opinion-column-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "opinion-column-reading-19",
      "level": "Intermediate",
      "prompt": "Apa maksud penulis dengan \"more than places to relax\"?",
      "answer": "Parks have other important uses too.",
      "options": [
        "Parks should only be used for sleeping.",
        "Parks are too busy to relax in.",
        "Parks have other important uses too.",
        "Relaxing in parks is not allowed."
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The writer values public spaces that support health and community life.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "opinion-column-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Parks give children safe spaces to play.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Parks give children safe spaces to play."
      ],
      "id": "opinion-column-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The writer believes every neighborhood should have a clean park.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "opinion-column-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "to make readers ignore the topic",
        "to persuade readers that parks are important",
        "easy to reach or use",
        "to hide the main idea"
      ],
      "id": "opinion-column-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Why Parks Matter\".",
      "answer": "The writer values public spaces that support health and community life.",
      "options": [
        "The writer values public spaces that support health and community life.",
        "Parks give children safe spaces to play.",
        "to persuade readers that parks are important",
        "No inference can be made."
      ],
      "id": "opinion-column-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The writer believes every neighborhood should have a clean park.",
      "options": [
        "accessible",
        "easy to reach or use",
        "A conclusion from a different passage.",
        "The writer believes every neighborhood should have a clean park."
      ],
      "id": "opinion-column-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "identifying opinion, reason, and persuasion",
      "options": [
        "Parks give children safe spaces to play.",
        "ignoring supporting details",
        "identifying opinion, reason, and persuasion",
        "to persuade readers that parks are important"
      ],
      "id": "opinion-column-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to persuade readers that parks are important",
      "options": [
        "The passage has no purpose.",
        "to persuade readers that parks are important",
        "The writer values public spaces that support health and community life.",
        "accessible"
      ],
      "id": "opinion-column-reading-27",
      "level": "Advanced"
    },
    {
      "id": "opinion-column-reading-28",
      "level": "Advanced",
      "prompt": "Argumen mana yang kemungkinan besar digunakan pengkritik untuk menentang pandangan penulis?",
      "answer": "Building and cleaning parks in every area costs a lot.",
      "options": [
        "Building and cleaning parks in every area costs a lot.",
        "Adults benefit greatly from regular exercise outdoors in green spaces.",
        "Children need safe places to play.",
        "Clean parks are pleasant for everyone."
      ]
    },
    {
      "id": "opinion-column-reading-29",
      "level": "Advanced",
      "prompt": "Kata mana dalam kalimat terakhir yang membuat klaim penulis paling kuat?",
      "answer": "should",
      "options": [
        "view",
        "should",
        "clean",
        "park"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik13Page() {
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
