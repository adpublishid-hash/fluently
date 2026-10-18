import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "environment",
  "title": "Environment",
  "description": "Membaca teks lingkungan dengan hubungan sebab-akibat.",
  "passageTitle": "Cleaner Neighborhoods",
  "passage": "Residents in Maple Street started sorting their waste last month. They separate paper, plastic, and food scraps. As a result, the area has less trash, and more families are joining the program.",
  "mainIdea": "Waste sorting helped Maple Street become cleaner.",
  "detail": "Residents separate paper, plastic, and food scraps.",
  "vocabulary": "residents",
  "vocabularyMeaning": "people who live in a place",
  "inference": "The program is becoming more popular.",
  "purpose": "to describe a community recycling effort",
  "readingSkill": "tracking cause and result",
  "topicNumber": 8
};

const quizTopics = [
  {
    "id": "environment",
    "title": "Environment",
    "description": "Membaca teks lingkungan dengan hubungan sebab-akibat."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Cleaner Neighborhoods",
      "options": [
        "Cleaner Neighborhoods",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "environment-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Waste sorting helped Maple Street become cleaner."
      ],
      "id": "environment-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "to describe a community recycling effort",
        "The opposite detail is stated.",
        "Residents separate paper, plastic, and food scraps.",
        "The program is becoming more popular."
      ],
      "id": "environment-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "residents",
      "options": [
        "meanwhile",
        "residents",
        "therefore",
        "although"
      ],
      "id": "environment-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Cleaner Neighborhoods\".",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "Residents separate paper, plastic, and food scraps.",
        "to describe a community recycling effort",
        "A story about an unrelated event."
      ],
      "id": "environment-reading-4",
      "level": "Basic"
    },
    {
      "id": "environment-reading-5",
      "level": "Basic",
      "prompt": "Where do the residents live?",
      "answer": "Maple Street",
      "options": [
        "Oak Avenue",
        "Green Hill Road",
        "Park Road",
        "Maple Street"
      ]
    },
    {
      "id": "environment-reading-6",
      "level": "Basic",
      "prompt": "When did the residents start sorting their waste?",
      "answer": "last month",
      "options": [
        "last month",
        "last year",
        "next week",
        "ten years ago"
      ]
    },
    {
      "id": "environment-reading-7",
      "level": "Basic",
      "prompt": "Which type of waste is NOT mentioned in the passage?",
      "answer": "glass",
      "options": [
        "paper",
        "food scraps",
        "glass",
        "plastic"
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Environment.",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "Residents separate paper, plastic, and food scraps.",
        "The program is becoming more popular.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "environment-reading-8",
      "level": "Basic"
    },
    {
      "id": "environment-reading-9",
      "level": "Basic",
      "prompt": "Which word in the passage means \"dividing into groups\"?",
      "answer": "sorting",
      "options": [
        "joining",
        "program",
        "started",
        "sorting"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"residents\".",
      "answer": "people who live in a place",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "people who live in a place",
        "a person who asks questions"
      ],
      "id": "environment-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to describe a community recycling effort",
      "options": [
        "to advertise a sports team",
        "to describe a community recycling effort",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "environment-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "tracking cause and result",
      "options": [
        "tracking cause and result",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "environment-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "The program is becoming more popular.",
        "A detail not connected to the passage.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"residents\".",
      "answer": "people who live in a place",
      "options": [
        "to describe a community recycling effort",
        "the opposite of the passage meaning",
        "people who live in a place",
        "residents"
      ],
      "id": "environment-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Cleaner Neighborhoods\".",
      "answer": "to describe a community recycling effort",
      "options": [
        "to test math formulas",
        "to describe a community recycling effort",
        "Waste sorting helped Maple Street become cleaner.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Environment.",
      "answer": "tracking cause and result",
      "options": [
        "tracking cause and result",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "environment-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "environment-reading-17",
      "level": "Intermediate",
      "prompt": "According to the passage, what is one result of the program?",
      "answer": "The area has less trash.",
      "options": [
        "The area has less trash.",
        "The street has more cars.",
        "Food prices have gone up.",
        "Families are moving away."
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "people who live in a place",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "a sentence that closes an email",
        "people who live in a place",
        "The program is becoming more popular."
      ],
      "id": "environment-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "environment-reading-19",
      "level": "Intermediate",
      "prompt": "Which phrase in the passage signals a result?",
      "answer": "As a result",
      "options": [
        "As a result",
        "Last month",
        "In addition",
        "For example"
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The program is becoming more popular.",
      "options": [
        "The program is becoming more popular.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "environment-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "The program is becoming more popular.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Waste sorting helped Maple Street become cleaner.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "environment-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to describe a community recycling effort",
      "options": [
        "to make readers ignore the topic",
        "to describe a community recycling effort",
        "people who live in a place",
        "to hide the main idea"
      ],
      "id": "environment-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Cleaner Neighborhoods\".",
      "answer": "The program is becoming more popular.",
      "options": [
        "The program is becoming more popular.",
        "Residents separate paper, plastic, and food scraps.",
        "to describe a community recycling effort",
        "No inference can be made."
      ],
      "id": "environment-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "residents",
        "people who live in a place",
        "A conclusion from a different passage.",
        "Waste sorting helped Maple Street become cleaner."
      ],
      "id": "environment-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "tracking cause and result",
      "options": [
        "Residents separate paper, plastic, and food scraps.",
        "ignoring supporting details",
        "tracking cause and result",
        "to describe a community recycling effort"
      ],
      "id": "environment-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to describe a community recycling effort",
      "options": [
        "The passage has no purpose.",
        "to describe a community recycling effort",
        "The program is becoming more popular.",
        "residents"
      ],
      "id": "environment-reading-27",
      "level": "Advanced"
    },
    {
      "id": "environment-reading-28",
      "level": "Advanced",
      "prompt": "What does the fact that more families are joining suggest about the program?",
      "answer": "Neighbours have noticed its benefits.",
      "options": [
        "The program is too difficult.",
        "The program is about to end.",
        "Neighbours have noticed its benefits.",
        "Families are paid a lot of money to take part."
      ]
    },
    {
      "id": "environment-reading-29",
      "level": "Advanced",
      "prompt": "Which cause-and-effect chain best matches the passage?",
      "answer": "sorting waste, then less trash, then more families join",
      "options": [
        "sorting waste, then more trash, then families complain",
        "sorting waste, then less trash, then more families join",
        "less trash, then sorting waste, then families leave",
        "more families join, then sorting stops, then more trash"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Cleaner Neighborhoods",
      "options": [
        "Cleaner Neighborhoods",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "environment-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Waste sorting helped Maple Street become cleaner."
      ],
      "id": "environment-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "to describe a community recycling effort",
        "The opposite detail is stated.",
        "Residents separate paper, plastic, and food scraps.",
        "The program is becoming more popular."
      ],
      "id": "environment-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "residents",
      "options": [
        "meanwhile",
        "residents",
        "therefore",
        "although"
      ],
      "id": "environment-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Cleaner Neighborhoods\".",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "Residents separate paper, plastic, and food scraps.",
        "to describe a community recycling effort",
        "A story about an unrelated event."
      ],
      "id": "environment-reading-4",
      "level": "Basic"
    },
    {
      "id": "environment-reading-5",
      "level": "Basic",
      "prompt": "Di mana para warga tinggal?",
      "answer": "Maple Street",
      "options": [
        "Oak Avenue",
        "Green Hill Road",
        "Park Road",
        "Maple Street"
      ]
    },
    {
      "id": "environment-reading-6",
      "level": "Basic",
      "prompt": "Kapan para warga mulai memilah sampah mereka?",
      "answer": "last month",
      "options": [
        "last month",
        "last year",
        "next week",
        "ten years ago"
      ]
    },
    {
      "id": "environment-reading-7",
      "level": "Basic",
      "prompt": "Jenis sampah mana yang TIDAK disebutkan dalam bacaan?",
      "answer": "glass",
      "options": [
        "paper",
        "food scraps",
        "glass",
        "plastic"
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Environment.",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "Residents separate paper, plastic, and food scraps.",
        "The program is becoming more popular.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "environment-reading-8",
      "level": "Basic"
    },
    {
      "id": "environment-reading-9",
      "level": "Basic",
      "prompt": "Kata mana dalam bacaan yang berarti \"dividing into groups\"?",
      "answer": "sorting",
      "options": [
        "joining",
        "program",
        "started",
        "sorting"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"residents\".",
      "answer": "people who live in a place",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "people who live in a place",
        "a person who asks questions"
      ],
      "id": "environment-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to describe a community recycling effort",
      "options": [
        "to advertise a sports team",
        "to describe a community recycling effort",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "environment-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "tracking cause and result",
      "options": [
        "tracking cause and result",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "environment-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "The program is becoming more popular.",
        "A detail not connected to the passage.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"residents\".",
      "answer": "people who live in a place",
      "options": [
        "to describe a community recycling effort",
        "the opposite of the passage meaning",
        "people who live in a place",
        "residents"
      ],
      "id": "environment-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Cleaner Neighborhoods\".",
      "answer": "to describe a community recycling effort",
      "options": [
        "to test math formulas",
        "to describe a community recycling effort",
        "Waste sorting helped Maple Street become cleaner.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Environment.",
      "answer": "tracking cause and result",
      "options": [
        "tracking cause and result",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "environment-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "environment-reading-17",
      "level": "Intermediate",
      "prompt": "Menurut bacaan, apa salah satu hasil dari program tersebut?",
      "answer": "The area has less trash.",
      "options": [
        "The area has less trash.",
        "The street has more cars.",
        "Food prices have gone up.",
        "Families are moving away."
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "people who live in a place",
      "options": [
        "Waste sorting helped Maple Street become cleaner.",
        "a sentence that closes an email",
        "people who live in a place",
        "The program is becoming more popular."
      ],
      "id": "environment-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "environment-reading-19",
      "level": "Intermediate",
      "prompt": "Frasa mana dalam bacaan yang menandakan sebuah akibat?",
      "answer": "As a result",
      "options": [
        "As a result",
        "Last month",
        "In addition",
        "For example"
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The program is becoming more popular.",
      "options": [
        "The program is becoming more popular.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "environment-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Residents separate paper, plastic, and food scraps.",
      "options": [
        "The program is becoming more popular.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Residents separate paper, plastic, and food scraps."
      ],
      "id": "environment-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Waste sorting helped Maple Street become cleaner.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "environment-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to describe a community recycling effort",
      "options": [
        "to make readers ignore the topic",
        "to describe a community recycling effort",
        "people who live in a place",
        "to hide the main idea"
      ],
      "id": "environment-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Cleaner Neighborhoods\".",
      "answer": "The program is becoming more popular.",
      "options": [
        "The program is becoming more popular.",
        "Residents separate paper, plastic, and food scraps.",
        "to describe a community recycling effort",
        "No inference can be made."
      ],
      "id": "environment-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Waste sorting helped Maple Street become cleaner.",
      "options": [
        "residents",
        "people who live in a place",
        "A conclusion from a different passage.",
        "Waste sorting helped Maple Street become cleaner."
      ],
      "id": "environment-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "tracking cause and result",
      "options": [
        "Residents separate paper, plastic, and food scraps.",
        "ignoring supporting details",
        "tracking cause and result",
        "to describe a community recycling effort"
      ],
      "id": "environment-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to describe a community recycling effort",
      "options": [
        "The passage has no purpose.",
        "to describe a community recycling effort",
        "The program is becoming more popular.",
        "residents"
      ],
      "id": "environment-reading-27",
      "level": "Advanced"
    },
    {
      "id": "environment-reading-28",
      "level": "Advanced",
      "prompt": "Apa yang ditunjukkan oleh fakta bahwa semakin banyak keluarga bergabung tentang program ini?",
      "answer": "Neighbours have noticed its benefits.",
      "options": [
        "The program is too difficult.",
        "The program is about to end.",
        "Neighbours have noticed its benefits.",
        "Families are paid a lot of money to take part."
      ]
    },
    {
      "id": "environment-reading-29",
      "level": "Advanced",
      "prompt": "Rantai sebab-akibat mana yang paling sesuai dengan bacaan?",
      "answer": "sorting waste, then less trash, then more families join",
      "options": [
        "sorting waste, then more trash, then families complain",
        "sorting waste, then less trash, then more families join",
        "less trash, then sorting waste, then families leave",
        "more families join, then sorting stops, then more trash"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik8Page() {
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
