import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "biography",
  "title": "Short Biography",
  "description": "Membaca biografi singkat dan memahami pencapaian tokoh.",
  "passageTitle": "The Young Inventor",
  "passage": "Lina built her first simple robot when she was twelve. At sixteen, she won a national science competition. She now teaches younger students how to design small machines using recycled materials.",
  "mainIdea": "Lina is a young inventor who now helps other students learn.",
  "detail": "Lina won a national science competition at sixteen.",
  "vocabulary": "inventor",
  "vocabularyMeaning": "a person who creates something new",
  "inference": "Lina is interested in both science and education.",
  "purpose": "to introduce an inspiring young inventor",
  "readingSkill": "understanding timeline and achievements",
  "topicNumber": 9
};

const quizTopics = [
  {
    "id": "biography",
    "title": "Short Biography",
    "description": "Membaca biografi singkat dan memahami pencapaian tokoh."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "The Young Inventor",
      "options": [
        "The Young Inventor",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "biography-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Lina is a young inventor who now helps other students learn."
      ],
      "id": "biography-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "to introduce an inspiring young inventor",
        "The opposite detail is stated.",
        "Lina won a national science competition at sixteen.",
        "Lina is interested in both science and education."
      ],
      "id": "biography-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "inventor",
      "options": [
        "meanwhile",
        "inventor",
        "therefore",
        "although"
      ],
      "id": "biography-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"The Young Inventor\".",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "Lina won a national science competition at sixteen.",
        "to introduce an inspiring young inventor",
        "A story about an unrelated event."
      ],
      "id": "biography-reading-4",
      "level": "Basic"
    },
    {
      "id": "biography-reading-5",
      "level": "Basic",
      "prompt": "How old was Lina when she built her first robot?",
      "answer": "twelve",
      "options": [
        "ten",
        "twenty",
        "twelve",
        "sixteen"
      ]
    },
    {
      "id": "biography-reading-6",
      "level": "Basic",
      "prompt": "What did Lina build first?",
      "answer": "a simple robot",
      "options": [
        "a small car",
        "a simple robot",
        "a science book",
        "a computer game"
      ]
    },
    {
      "id": "biography-reading-7",
      "level": "Basic",
      "prompt": "What does Lina do now?",
      "answer": "She teaches younger students.",
      "options": [
        "She teaches younger students.",
        "She studies at a university abroad.",
        "She sells robots online.",
        "She works in a car factory."
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Short Biography.",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina won a national science competition at sixteen.",
        "Lina is interested in both science and education.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "biography-reading-8",
      "level": "Basic"
    },
    {
      "id": "biography-reading-9",
      "level": "Basic",
      "prompt": "What materials does Lina use with her students?",
      "answer": "recycled materials",
      "options": [
        "new plastic parts",
        "wooden blocks only",
        "recycled materials",
        "expensive metals"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"inventor\".",
      "answer": "a person who creates something new",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a person who creates something new",
        "a person who asks questions"
      ],
      "id": "biography-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to advertise a sports team",
        "to introduce an inspiring young inventor",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "biography-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "understanding timeline and achievements",
      "options": [
        "understanding timeline and achievements",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "biography-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "Lina is interested in both science and education.",
        "A detail not connected to the passage.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"inventor\".",
      "answer": "a person who creates something new",
      "options": [
        "to introduce an inspiring young inventor",
        "the opposite of the passage meaning",
        "a person who creates something new",
        "inventor"
      ],
      "id": "biography-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"The Young Inventor\".",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to test math formulas",
        "to introduce an inspiring young inventor",
        "Lina is a young inventor who now helps other students learn.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Short Biography.",
      "answer": "understanding timeline and achievements",
      "options": [
        "understanding timeline and achievements",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "biography-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "biography-reading-17",
      "level": "Intermediate",
      "prompt": "Which event happened second in Lina's life?",
      "answer": "She won a national science competition.",
      "options": [
        "She built her first simple robot.",
        "She won a national science competition.",
        "She designed small machines for a big company.",
        "She started teaching younger students."
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "a person who creates something new",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "a sentence that closes an email",
        "a person who creates something new",
        "Lina is interested in both science and education."
      ],
      "id": "biography-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "biography-reading-19",
      "level": "Intermediate",
      "prompt": "What does \"design\" mean in the last sentence?",
      "answer": "plan and create",
      "options": [
        "sell to others",
        "paint with colours",
        "break into pieces",
        "plan and create"
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Lina is interested in both science and education.",
      "options": [
        "Lina is interested in both science and education.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "biography-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina is interested in both science and education.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Lina is a young inventor who now helps other students learn.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "biography-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to make readers ignore the topic",
        "to introduce an inspiring young inventor",
        "a person who creates something new",
        "to hide the main idea"
      ],
      "id": "biography-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"The Young Inventor\".",
      "answer": "Lina is interested in both science and education.",
      "options": [
        "Lina is interested in both science and education.",
        "Lina won a national science competition at sixteen.",
        "to introduce an inspiring young inventor",
        "No inference can be made."
      ],
      "id": "biography-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "inventor",
        "a person who creates something new",
        "A conclusion from a different passage.",
        "Lina is a young inventor who now helps other students learn."
      ],
      "id": "biography-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "understanding timeline and achievements",
      "options": [
        "Lina won a national science competition at sixteen.",
        "ignoring supporting details",
        "understanding timeline and achievements",
        "to introduce an inspiring young inventor"
      ],
      "id": "biography-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "The passage has no purpose.",
        "to introduce an inspiring young inventor",
        "Lina is interested in both science and education.",
        "inventor"
      ],
      "id": "biography-reading-27",
      "level": "Advanced"
    },
    {
      "id": "biography-reading-28",
      "level": "Advanced",
      "prompt": "Which sentence best shows how Lina's role has changed over time?",
      "answer": "She went from building robots to teaching others.",
      "options": [
        "She stopped liking science after sixteen.",
        "She has always worked only as a teacher.",
        "She moved from teaching to selling her robots in shops online.",
        "She went from building robots to teaching others."
      ]
    },
    {
      "id": "biography-reading-29",
      "level": "Advanced",
      "prompt": "Why does the writer most likely mention recycled materials?",
      "answer": "to show that Lina also cares about the environment",
      "options": [
        "to complain about the cost of robots",
        "to show that Lina's robots are cheap and of very poor quality",
        "to show that Lina also cares about the environment",
        "to explain why Lina lost the competition"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "The Young Inventor",
      "options": [
        "The Young Inventor",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "biography-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Lina is a young inventor who now helps other students learn."
      ],
      "id": "biography-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "to introduce an inspiring young inventor",
        "The opposite detail is stated.",
        "Lina won a national science competition at sixteen.",
        "Lina is interested in both science and education."
      ],
      "id": "biography-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "inventor",
      "options": [
        "meanwhile",
        "inventor",
        "therefore",
        "although"
      ],
      "id": "biography-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"The Young Inventor\".",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "Lina won a national science competition at sixteen.",
        "to introduce an inspiring young inventor",
        "A story about an unrelated event."
      ],
      "id": "biography-reading-4",
      "level": "Basic"
    },
    {
      "id": "biography-reading-5",
      "level": "Basic",
      "prompt": "Berapa usia Lina ketika ia membuat robot pertamanya?",
      "answer": "twelve",
      "options": [
        "ten",
        "twenty",
        "twelve",
        "sixteen"
      ]
    },
    {
      "id": "biography-reading-6",
      "level": "Basic",
      "prompt": "Apa yang pertama kali dibuat Lina?",
      "answer": "a simple robot",
      "options": [
        "a small car",
        "a simple robot",
        "a science book",
        "a computer game"
      ]
    },
    {
      "id": "biography-reading-7",
      "level": "Basic",
      "prompt": "Apa yang Lina lakukan sekarang?",
      "answer": "She teaches younger students.",
      "options": [
        "She teaches younger students.",
        "She studies at a university abroad.",
        "She sells robots online.",
        "She works in a car factory."
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Short Biography.",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina won a national science competition at sixteen.",
        "Lina is interested in both science and education.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "biography-reading-8",
      "level": "Basic"
    },
    {
      "id": "biography-reading-9",
      "level": "Basic",
      "prompt": "Bahan apa yang digunakan Lina bersama murid-muridnya?",
      "answer": "recycled materials",
      "options": [
        "new plastic parts",
        "wooden blocks only",
        "recycled materials",
        "expensive metals"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"inventor\".",
      "answer": "a person who creates something new",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a person who creates something new",
        "a person who asks questions"
      ],
      "id": "biography-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to advertise a sports team",
        "to introduce an inspiring young inventor",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "biography-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "understanding timeline and achievements",
      "options": [
        "understanding timeline and achievements",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "biography-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "Lina is interested in both science and education.",
        "A detail not connected to the passage.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"inventor\".",
      "answer": "a person who creates something new",
      "options": [
        "to introduce an inspiring young inventor",
        "the opposite of the passage meaning",
        "a person who creates something new",
        "inventor"
      ],
      "id": "biography-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"The Young Inventor\".",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to test math formulas",
        "to introduce an inspiring young inventor",
        "Lina is a young inventor who now helps other students learn.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Short Biography.",
      "answer": "understanding timeline and achievements",
      "options": [
        "understanding timeline and achievements",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "biography-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "biography-reading-17",
      "level": "Intermediate",
      "prompt": "Peristiwa mana yang terjadi kedua dalam hidup Lina?",
      "answer": "She won a national science competition.",
      "options": [
        "She built her first simple robot.",
        "She won a national science competition.",
        "She designed small machines for a big company.",
        "She started teaching younger students."
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "a person who creates something new",
      "options": [
        "Lina is a young inventor who now helps other students learn.",
        "a sentence that closes an email",
        "a person who creates something new",
        "Lina is interested in both science and education."
      ],
      "id": "biography-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "biography-reading-19",
      "level": "Intermediate",
      "prompt": "Apa arti kata \"design\" pada kalimat terakhir?",
      "answer": "plan and create",
      "options": [
        "sell to others",
        "paint with colours",
        "break into pieces",
        "plan and create"
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Lina is interested in both science and education.",
      "options": [
        "Lina is interested in both science and education.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "biography-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Lina won a national science competition at sixteen.",
      "options": [
        "Lina is interested in both science and education.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Lina won a national science competition at sixteen."
      ],
      "id": "biography-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Lina is a young inventor who now helps other students learn.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "biography-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "to make readers ignore the topic",
        "to introduce an inspiring young inventor",
        "a person who creates something new",
        "to hide the main idea"
      ],
      "id": "biography-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"The Young Inventor\".",
      "answer": "Lina is interested in both science and education.",
      "options": [
        "Lina is interested in both science and education.",
        "Lina won a national science competition at sixteen.",
        "to introduce an inspiring young inventor",
        "No inference can be made."
      ],
      "id": "biography-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Lina is a young inventor who now helps other students learn.",
      "options": [
        "inventor",
        "a person who creates something new",
        "A conclusion from a different passage.",
        "Lina is a young inventor who now helps other students learn."
      ],
      "id": "biography-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "understanding timeline and achievements",
      "options": [
        "Lina won a national science competition at sixteen.",
        "ignoring supporting details",
        "understanding timeline and achievements",
        "to introduce an inspiring young inventor"
      ],
      "id": "biography-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to introduce an inspiring young inventor",
      "options": [
        "The passage has no purpose.",
        "to introduce an inspiring young inventor",
        "Lina is interested in both science and education.",
        "inventor"
      ],
      "id": "biography-reading-27",
      "level": "Advanced"
    },
    {
      "id": "biography-reading-28",
      "level": "Advanced",
      "prompt": "Kalimat mana yang paling menunjukkan bagaimana peran Lina berubah dari waktu ke waktu?",
      "answer": "She went from building robots to teaching others.",
      "options": [
        "She stopped liking science after sixteen.",
        "She has always worked only as a teacher.",
        "She moved from teaching to selling her robots in shops online.",
        "She went from building robots to teaching others."
      ]
    },
    {
      "id": "biography-reading-29",
      "level": "Advanced",
      "prompt": "Mengapa penulis kemungkinan besar menyebut bahan daur ulang?",
      "answer": "to show that Lina also cares about the environment",
      "options": [
        "to complain about the cost of robots",
        "to show that Lina's robots are cheap and of very poor quality",
        "to show that Lina also cares about the environment",
        "to explain why Lina lost the competition"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik9Page() {
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
