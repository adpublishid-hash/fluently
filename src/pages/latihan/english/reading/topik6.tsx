import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "restaurant-review",
  "title": "Restaurant Review",
  "description": "Membaca ulasan restoran dan membedakan fakta serta opini.",
  "passageTitle": "Green Bowl Cafe",
  "passage": "Green Bowl Cafe serves fresh salads, soup, and fruit drinks. The service is quick, but the seating area is small. The reviewer recommends visiting before noon because it becomes crowded during lunch.",
  "mainIdea": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
  "detail": "The seating area is small.",
  "vocabulary": "recommends",
  "vocabularyMeaning": "suggests something as a good choice",
  "inference": "The cafe is popular around lunch time.",
  "purpose": "to review a cafe and give a practical suggestion",
  "readingSkill": "separating facts, opinions, and recommendations",
  "topicNumber": 6
};

const quizTopics = [
  {
    "id": "restaurant-review",
    "title": "Restaurant Review",
    "description": "Membaca ulasan restoran dan membedakan fakta serta opini."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Green Bowl Cafe",
      "options": [
        "Green Bowl Cafe",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "restaurant-review-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating."
      ],
      "id": "restaurant-review-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The seating area is small.",
      "options": [
        "to review a cafe and give a practical suggestion",
        "The opposite detail is stated.",
        "The seating area is small.",
        "The cafe is popular around lunch time."
      ],
      "id": "restaurant-review-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "recommends",
      "options": [
        "meanwhile",
        "recommends",
        "therefore",
        "although"
      ],
      "id": "restaurant-review-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Green Bowl Cafe\".",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The seating area is small.",
        "to review a cafe and give a practical suggestion",
        "A story about an unrelated event."
      ],
      "id": "restaurant-review-reading-4",
      "level": "Basic"
    },
    {
      "id": "restaurant-review-reading-5",
      "level": "Basic",
      "prompt": "Which food does Green Bowl Cafe serve?",
      "answer": "fresh salads",
      "options": [
        "pizza",
        "fried chicken",
        "fresh salads",
        "grilled steak"
      ]
    },
    {
      "id": "restaurant-review-reading-6",
      "level": "Basic",
      "prompt": "How does the reviewer describe the service?",
      "answer": "quick",
      "options": [
        "slow",
        "expensive",
        "rude",
        "quick"
      ]
    },
    {
      "id": "restaurant-review-reading-7",
      "level": "Basic",
      "prompt": "When does the cafe become crowded?",
      "answer": "during lunch",
      "options": [
        "during lunch",
        "on Monday evenings",
        "late at night",
        "early in the morning"
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Restaurant Review.",
      "answer": "The seating area is small.",
      "options": [
        "The seating area is small.",
        "The cafe is popular around lunch time.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "restaurant-review-reading-8",
      "level": "Basic"
    },
    {
      "id": "restaurant-review-reading-9",
      "level": "Basic",
      "prompt": "Which drink is mentioned in the review?",
      "answer": "fruit drinks",
      "options": [
        "green tea",
        "hot coffee",
        "fruit drinks",
        "iced lemon tea"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"recommends\".",
      "answer": "suggests something as a good choice",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "suggests something as a good choice",
        "a person who asks questions"
      ],
      "id": "restaurant-review-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to advertise a sports team",
        "to review a cafe and give a practical suggestion",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "restaurant-review-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "separating facts, opinions, and recommendations",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "restaurant-review-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "The seating area is small.",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The cafe is popular around lunch time.",
        "A detail not connected to the passage.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"recommends\".",
      "answer": "suggests something as a good choice",
      "options": [
        "to review a cafe and give a practical suggestion",
        "the opposite of the passage meaning",
        "suggests something as a good choice",
        "recommends"
      ],
      "id": "restaurant-review-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Green Bowl Cafe\".",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to test math formulas",
        "to review a cafe and give a practical suggestion",
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Restaurant Review.",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "separating facts, opinions, and recommendations",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "restaurant-review-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "restaurant-review-reading-17",
      "level": "Intermediate",
      "prompt": "Which sentence from the review is a recommendation?",
      "answer": "Visit before noon because it becomes crowded.",
      "options": [
        "The service is quick.",
        "The seating area is small.",
        "Green Bowl Cafe serves fresh salads, soup, and fruit drinks.",
        "Visit before noon because it becomes crowded."
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "suggests something as a good choice",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "a sentence that closes an email",
        "suggests something as a good choice",
        "The cafe is popular around lunch time."
      ],
      "id": "restaurant-review-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "restaurant-review-reading-19",
      "level": "Intermediate",
      "prompt": "Which point in the review is a negative one?",
      "answer": "The seating area is small.",
      "options": [
        "The service is quick.",
        "The cafe serves fruit drinks.",
        "The seating area is small.",
        "The salads are fresh."
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "The cafe is popular around lunch time.",
      "options": [
        "The cafe is popular around lunch time.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "restaurant-review-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "The seating area is small.",
      "options": [
        "The cafe is popular around lunch time.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "restaurant-review-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to make readers ignore the topic",
        "to review a cafe and give a practical suggestion",
        "suggests something as a good choice",
        "to hide the main idea"
      ],
      "id": "restaurant-review-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Green Bowl Cafe\".",
      "answer": "The cafe is popular around lunch time.",
      "options": [
        "The cafe is popular around lunch time.",
        "The seating area is small.",
        "to review a cafe and give a practical suggestion",
        "No inference can be made."
      ],
      "id": "restaurant-review-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "recommends",
        "suggests something as a good choice",
        "A conclusion from a different passage.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating."
      ],
      "id": "restaurant-review-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "The seating area is small.",
        "ignoring supporting details",
        "separating facts, opinions, and recommendations",
        "to review a cafe and give a practical suggestion"
      ],
      "id": "restaurant-review-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "The passage has no purpose.",
        "to review a cafe and give a practical suggestion",
        "The cafe is popular around lunch time.",
        "recommends"
      ],
      "id": "restaurant-review-reading-27",
      "level": "Advanced"
    },
    {
      "id": "restaurant-review-reading-28",
      "level": "Advanced",
      "prompt": "Why does the reviewer most likely mention the small seating area before the advice about noon?",
      "answer": "It explains why arriving early is a good idea.",
      "options": [
        "It shows that the food is too expensive.",
        "It suggests that the cafe will close down very soon.",
        "It explains why arriving early is a good idea.",
        "It proves that the service is very slow."
      ]
    },
    {
      "id": "restaurant-review-reading-29",
      "level": "Advanced",
      "prompt": "Which statement best describes the reviewer's overall attitude?",
      "answer": "generally positive, with a practical warning",
      "options": [
        "neutral with no opinion at all",
        "completely negative and disappointed about everything",
        "generally positive, with a practical warning",
        "excited but full of complaints"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Green Bowl Cafe",
      "options": [
        "Green Bowl Cafe",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "restaurant-review-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating."
      ],
      "id": "restaurant-review-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The seating area is small.",
      "options": [
        "to review a cafe and give a practical suggestion",
        "The opposite detail is stated.",
        "The seating area is small.",
        "The cafe is popular around lunch time."
      ],
      "id": "restaurant-review-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "recommends",
      "options": [
        "meanwhile",
        "recommends",
        "therefore",
        "although"
      ],
      "id": "restaurant-review-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Green Bowl Cafe\".",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The seating area is small.",
        "to review a cafe and give a practical suggestion",
        "A story about an unrelated event."
      ],
      "id": "restaurant-review-reading-4",
      "level": "Basic"
    },
    {
      "id": "restaurant-review-reading-5",
      "level": "Basic",
      "prompt": "Makanan apa yang disajikan Green Bowl Cafe?",
      "answer": "fresh salads",
      "options": [
        "pizza",
        "fried chicken",
        "fresh salads",
        "grilled steak"
      ]
    },
    {
      "id": "restaurant-review-reading-6",
      "level": "Basic",
      "prompt": "Bagaimana pengulas menggambarkan pelayanannya?",
      "answer": "quick",
      "options": [
        "slow",
        "expensive",
        "rude",
        "quick"
      ]
    },
    {
      "id": "restaurant-review-reading-7",
      "level": "Basic",
      "prompt": "Kapan kafe itu menjadi ramai?",
      "answer": "during lunch",
      "options": [
        "during lunch",
        "on Monday evenings",
        "late at night",
        "early in the morning"
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Restaurant Review.",
      "answer": "The seating area is small.",
      "options": [
        "The seating area is small.",
        "The cafe is popular around lunch time.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "restaurant-review-reading-8",
      "level": "Basic"
    },
    {
      "id": "restaurant-review-reading-9",
      "level": "Basic",
      "prompt": "Minuman apa yang disebutkan dalam ulasan?",
      "answer": "fruit drinks",
      "options": [
        "green tea",
        "hot coffee",
        "fruit drinks",
        "iced lemon tea"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"recommends\".",
      "answer": "suggests something as a good choice",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "suggests something as a good choice",
        "a person who asks questions"
      ],
      "id": "restaurant-review-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to advertise a sports team",
        "to review a cafe and give a practical suggestion",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "restaurant-review-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "separating facts, opinions, and recommendations",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "restaurant-review-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The seating area is small.",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The cafe is popular around lunch time.",
        "A detail not connected to the passage.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"recommends\".",
      "answer": "suggests something as a good choice",
      "options": [
        "to review a cafe and give a practical suggestion",
        "the opposite of the passage meaning",
        "suggests something as a good choice",
        "recommends"
      ],
      "id": "restaurant-review-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Green Bowl Cafe\".",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to test math formulas",
        "to review a cafe and give a practical suggestion",
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Restaurant Review.",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "separating facts, opinions, and recommendations",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "restaurant-review-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "restaurant-review-reading-17",
      "level": "Intermediate",
      "prompt": "Kalimat mana dari ulasan yang merupakan rekomendasi?",
      "answer": "Visit before noon because it becomes crowded.",
      "options": [
        "The service is quick.",
        "The seating area is small.",
        "Green Bowl Cafe serves fresh salads, soup, and fruit drinks.",
        "Visit before noon because it becomes crowded."
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "suggests something as a good choice",
      "options": [
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "a sentence that closes an email",
        "suggests something as a good choice",
        "The cafe is popular around lunch time."
      ],
      "id": "restaurant-review-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "restaurant-review-reading-19",
      "level": "Intermediate",
      "prompt": "Poin mana dalam ulasan yang bersifat negatif?",
      "answer": "The seating area is small.",
      "options": [
        "The service is quick.",
        "The cafe serves fruit drinks.",
        "The seating area is small.",
        "The salads are fresh."
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "The cafe is popular around lunch time.",
      "options": [
        "The cafe is popular around lunch time.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "restaurant-review-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "The seating area is small.",
      "options": [
        "The cafe is popular around lunch time.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The seating area is small."
      ],
      "id": "restaurant-review-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "restaurant-review-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "to make readers ignore the topic",
        "to review a cafe and give a practical suggestion",
        "suggests something as a good choice",
        "to hide the main idea"
      ],
      "id": "restaurant-review-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Green Bowl Cafe\".",
      "answer": "The cafe is popular around lunch time.",
      "options": [
        "The cafe is popular around lunch time.",
        "The seating area is small.",
        "to review a cafe and give a practical suggestion",
        "No inference can be made."
      ],
      "id": "restaurant-review-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Green Bowl Cafe has fresh food and quick service, but limited seating.",
      "options": [
        "recommends",
        "suggests something as a good choice",
        "A conclusion from a different passage.",
        "Green Bowl Cafe has fresh food and quick service, but limited seating."
      ],
      "id": "restaurant-review-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "separating facts, opinions, and recommendations",
      "options": [
        "The seating area is small.",
        "ignoring supporting details",
        "separating facts, opinions, and recommendations",
        "to review a cafe and give a practical suggestion"
      ],
      "id": "restaurant-review-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to review a cafe and give a practical suggestion",
      "options": [
        "The passage has no purpose.",
        "to review a cafe and give a practical suggestion",
        "The cafe is popular around lunch time.",
        "recommends"
      ],
      "id": "restaurant-review-reading-27",
      "level": "Advanced"
    },
    {
      "id": "restaurant-review-reading-28",
      "level": "Advanced",
      "prompt": "Mengapa pengulas kemungkinan besar menyebut area duduk yang kecil sebelum saran untuk datang sebelum siang?",
      "answer": "It explains why arriving early is a good idea.",
      "options": [
        "It shows that the food is too expensive.",
        "It suggests that the cafe will close down very soon.",
        "It explains why arriving early is a good idea.",
        "It proves that the service is very slow."
      ]
    },
    {
      "id": "restaurant-review-reading-29",
      "level": "Advanced",
      "prompt": "Pernyataan mana yang paling tepat menggambarkan sikap pengulas secara keseluruhan?",
      "answer": "generally positive, with a practical warning",
      "options": [
        "neutral with no opinion at all",
        "completely negative and disappointed about everything",
        "generally positive, with a practical warning",
        "excited but full of complaints"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik6Page() {
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
