import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "shopping-policy",
  "title": "Shopping Policy",
  "description": "Membaca aturan toko dan memahami syarat penting.",
  "passageTitle": "Return Policy",
  "passage": "Customers may return unused items within fourteen days. The original receipt is required. Sale items cannot be returned, but they may be exchanged for a different size if stock is available.",
  "mainIdea": "The store allows returns and exchanges under certain conditions.",
  "detail": "The original receipt is required for returns.",
  "vocabulary": "exchanged",
  "vocabularyMeaning": "replaced with another item",
  "inference": "A sale item can only be changed if another size is in stock.",
  "purpose": "to explain the store return policy",
  "readingSkill": "reading rules and conditions carefully",
  "topicNumber": 10
};

const quizTopics = [
  {
    "id": "shopping-policy",
    "title": "Shopping Policy",
    "description": "Membaca aturan toko dan memahami syarat penting."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Return Policy",
      "options": [
        "Return Policy",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "shopping-policy-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The store allows returns and exchanges under certain conditions."
      ],
      "id": "shopping-policy-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "to explain the store return policy",
        "The opposite detail is stated.",
        "The original receipt is required for returns.",
        "A sale item can only be changed if another size is in stock."
      ],
      "id": "shopping-policy-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "exchanged",
      "options": [
        "meanwhile",
        "exchanged",
        "therefore",
        "although"
      ],
      "id": "shopping-policy-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Return Policy\".",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "The original receipt is required for returns.",
        "to explain the store return policy",
        "A story about an unrelated event."
      ],
      "id": "shopping-policy-reading-4",
      "level": "Basic"
    },
    {
      "id": "shopping-policy-reading-5",
      "level": "Basic",
      "prompt": "How many days do customers have to return unused items?",
      "answer": "fourteen days",
      "options": [
        "fourteen days",
        "thirty days",
        "seven days",
        "twenty-one days"
      ]
    },
    {
      "id": "shopping-policy-reading-6",
      "level": "Basic",
      "prompt": "What must customers bring to return an item?",
      "answer": "the original receipt",
      "options": [
        "a photo of the item",
        "a store membership card",
        "a letter from the bank",
        "the original receipt"
      ]
    },
    {
      "id": "shopping-policy-reading-7",
      "level": "Basic",
      "prompt": "Which items cannot be returned?",
      "answer": "sale items",
      "options": [
        "new items",
        "small items",
        "sale items",
        "unused items"
      ]
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Shopping Policy.",
      "answer": "The original receipt is required for returns.",
      "options": [
        "The original receipt is required for returns.",
        "A sale item can only be changed if another size is in stock.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "shopping-policy-reading-8",
      "level": "Basic"
    },
    {
      "id": "shopping-policy-reading-9",
      "level": "Basic",
      "prompt": "Which word in the policy means \"needed\"?",
      "answer": "required",
      "options": [
        "required",
        "original",
        "available",
        "unused"
      ]
    },
    {
      "prompt": "What does this word mean in context? Word: \"exchanged\".",
      "answer": "replaced with another item",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "replaced with another item",
        "a person who asks questions"
      ],
      "id": "shopping-policy-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to explain the store return policy",
      "options": [
        "to advertise a sports team",
        "to explain the store return policy",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "shopping-policy-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "reading rules and conditions carefully",
      "options": [
        "reading rules and conditions carefully",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "shopping-policy-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "A sale item can only be changed if another size is in stock.",
        "A detail not connected to the passage.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"exchanged\".",
      "answer": "replaced with another item",
      "options": [
        "to explain the store return policy",
        "the opposite of the passage meaning",
        "replaced with another item",
        "exchanged"
      ],
      "id": "shopping-policy-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Return Policy\".",
      "answer": "to explain the store return policy",
      "options": [
        "to test math formulas",
        "to explain the store return policy",
        "The store allows returns and exchanges under certain conditions.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Shopping Policy.",
      "answer": "reading rules and conditions carefully",
      "options": [
        "reading rules and conditions carefully",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "shopping-policy-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "shopping-policy-reading-17",
      "level": "Intermediate",
      "prompt": "A customer bought a sale shirt in the wrong size. What can they do?",
      "answer": "exchange it for another size if one is in stock",
      "options": [
        "return it for a full refund at any time after the sale",
        "return it without a receipt",
        "keep it and get a free gift",
        "exchange it for another size if one is in stock"
      ]
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "replaced with another item",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "a sentence that closes an email",
        "replaced with another item",
        "A sale item can only be changed if another size is in stock."
      ],
      "id": "shopping-policy-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "shopping-policy-reading-19",
      "level": "Intermediate",
      "prompt": "Which condition applies to all returns?",
      "answer": "The item must be unused.",
      "options": [
        "The item must be on sale.",
        "The item must be unused.",
        "The item must be returned in a gift box.",
        "The item must be bought online."
      ]
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "A sale item can only be changed if another size is in stock.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "shopping-policy-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The store allows returns and exchanges under certain conditions.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "shopping-policy-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to explain the store return policy",
      "options": [
        "to make readers ignore the topic",
        "to explain the store return policy",
        "replaced with another item",
        "to hide the main idea"
      ],
      "id": "shopping-policy-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Return Policy\".",
      "answer": "A sale item can only be changed if another size is in stock.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "The original receipt is required for returns.",
        "to explain the store return policy",
        "No inference can be made."
      ],
      "id": "shopping-policy-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "exchanged",
        "replaced with another item",
        "A conclusion from a different passage.",
        "The store allows returns and exchanges under certain conditions."
      ],
      "id": "shopping-policy-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "reading rules and conditions carefully",
      "options": [
        "The original receipt is required for returns.",
        "ignoring supporting details",
        "reading rules and conditions carefully",
        "to explain the store return policy"
      ],
      "id": "shopping-policy-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to explain the store return policy",
      "options": [
        "The passage has no purpose.",
        "to explain the store return policy",
        "A sale item can only be changed if another size is in stock.",
        "exchanged"
      ],
      "id": "shopping-policy-reading-27",
      "level": "Advanced"
    },
    {
      "id": "shopping-policy-reading-28",
      "level": "Advanced",
      "prompt": "A customer returns an unused, full-price jacket after ten days but has lost the receipt. What is the most likely outcome?",
      "answer": "The return will be refused.",
      "options": [
        "The customer receives extra store credit.",
        "The return will be refused.",
        "The customer gets a full refund.",
        "The jacket is exchanged for a sale item."
      ]
    },
    {
      "id": "shopping-policy-reading-29",
      "level": "Advanced",
      "prompt": "Which phrase limits when a sale item can be exchanged?",
      "answer": "if stock is available",
      "options": [
        "Sale items cannot",
        "Customers may return",
        "if stock is available",
        "for a different size"
      ]
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Return Policy",
      "options": [
        "Return Policy",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "shopping-policy-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The store allows returns and exchanges under certain conditions."
      ],
      "id": "shopping-policy-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "to explain the store return policy",
        "The opposite detail is stated.",
        "The original receipt is required for returns.",
        "A sale item can only be changed if another size is in stock."
      ],
      "id": "shopping-policy-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "exchanged",
      "options": [
        "meanwhile",
        "exchanged",
        "therefore",
        "although"
      ],
      "id": "shopping-policy-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Return Policy\".",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "The original receipt is required for returns.",
        "to explain the store return policy",
        "A story about an unrelated event."
      ],
      "id": "shopping-policy-reading-4",
      "level": "Basic"
    },
    {
      "id": "shopping-policy-reading-5",
      "level": "Basic",
      "prompt": "Berapa hari waktu yang dimiliki pelanggan untuk mengembalikan barang yang belum dipakai?",
      "answer": "fourteen days",
      "options": [
        "fourteen days",
        "thirty days",
        "seven days",
        "twenty-one days"
      ]
    },
    {
      "id": "shopping-policy-reading-6",
      "level": "Basic",
      "prompt": "Apa yang harus dibawa pelanggan untuk mengembalikan barang?",
      "answer": "the original receipt",
      "options": [
        "a photo of the item",
        "a store membership card",
        "a letter from the bank",
        "the original receipt"
      ]
    },
    {
      "id": "shopping-policy-reading-7",
      "level": "Basic",
      "prompt": "Barang mana yang tidak dapat dikembalikan?",
      "answer": "sale items",
      "options": [
        "new items",
        "small items",
        "sale items",
        "unused items"
      ]
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Shopping Policy.",
      "answer": "The original receipt is required for returns.",
      "options": [
        "The original receipt is required for returns.",
        "A sale item can only be changed if another size is in stock.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "shopping-policy-reading-8",
      "level": "Basic"
    },
    {
      "id": "shopping-policy-reading-9",
      "level": "Basic",
      "prompt": "Kata mana dalam kebijakan ini yang berarti \"needed\"?",
      "answer": "required",
      "options": [
        "required",
        "original",
        "available",
        "unused"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"exchanged\".",
      "answer": "replaced with another item",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "replaced with another item",
        "a person who asks questions"
      ],
      "id": "shopping-policy-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to explain the store return policy",
      "options": [
        "to advertise a sports team",
        "to explain the store return policy",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "shopping-policy-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "reading rules and conditions carefully",
      "options": [
        "reading rules and conditions carefully",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "shopping-policy-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "A sale item can only be changed if another size is in stock.",
        "A detail not connected to the passage.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"exchanged\".",
      "answer": "replaced with another item",
      "options": [
        "to explain the store return policy",
        "the opposite of the passage meaning",
        "replaced with another item",
        "exchanged"
      ],
      "id": "shopping-policy-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Return Policy\".",
      "answer": "to explain the store return policy",
      "options": [
        "to test math formulas",
        "to explain the store return policy",
        "The store allows returns and exchanges under certain conditions.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Shopping Policy.",
      "answer": "reading rules and conditions carefully",
      "options": [
        "reading rules and conditions carefully",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "shopping-policy-reading-16",
      "level": "Intermediate"
    },
    {
      "id": "shopping-policy-reading-17",
      "level": "Intermediate",
      "prompt": "Seorang pelanggan membeli kemeja diskon dengan ukuran yang salah. Apa yang dapat ia lakukan?",
      "answer": "exchange it for another size if one is in stock",
      "options": [
        "return it for a full refund at any time after the sale",
        "return it without a receipt",
        "keep it and get a free gift",
        "exchange it for another size if one is in stock"
      ]
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "replaced with another item",
      "options": [
        "The store allows returns and exchanges under certain conditions.",
        "a sentence that closes an email",
        "replaced with another item",
        "A sale item can only be changed if another size is in stock."
      ],
      "id": "shopping-policy-reading-18",
      "level": "Intermediate"
    },
    {
      "id": "shopping-policy-reading-19",
      "level": "Intermediate",
      "prompt": "Syarat mana yang berlaku untuk semua pengembalian?",
      "answer": "The item must be unused.",
      "options": [
        "The item must be on sale.",
        "The item must be unused.",
        "The item must be returned in a gift box.",
        "The item must be bought online."
      ]
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "A sale item can only be changed if another size is in stock.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "shopping-policy-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "The original receipt is required for returns.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The original receipt is required for returns."
      ],
      "id": "shopping-policy-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The store allows returns and exchanges under certain conditions.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "shopping-policy-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to explain the store return policy",
      "options": [
        "to make readers ignore the topic",
        "to explain the store return policy",
        "replaced with another item",
        "to hide the main idea"
      ],
      "id": "shopping-policy-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Return Policy\".",
      "answer": "A sale item can only be changed if another size is in stock.",
      "options": [
        "A sale item can only be changed if another size is in stock.",
        "The original receipt is required for returns.",
        "to explain the store return policy",
        "No inference can be made."
      ],
      "id": "shopping-policy-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The store allows returns and exchanges under certain conditions.",
      "options": [
        "exchanged",
        "replaced with another item",
        "A conclusion from a different passage.",
        "The store allows returns and exchanges under certain conditions."
      ],
      "id": "shopping-policy-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "reading rules and conditions carefully",
      "options": [
        "The original receipt is required for returns.",
        "ignoring supporting details",
        "reading rules and conditions carefully",
        "to explain the store return policy"
      ],
      "id": "shopping-policy-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to explain the store return policy",
      "options": [
        "The passage has no purpose.",
        "to explain the store return policy",
        "A sale item can only be changed if another size is in stock.",
        "exchanged"
      ],
      "id": "shopping-policy-reading-27",
      "level": "Advanced"
    },
    {
      "id": "shopping-policy-reading-28",
      "level": "Advanced",
      "prompt": "Seorang pelanggan mengembalikan jaket harga normal yang belum dipakai setelah sepuluh hari, tetapi kehilangan struknya. Apa hasil yang paling mungkin?",
      "answer": "The return will be refused.",
      "options": [
        "The customer receives extra store credit.",
        "The return will be refused.",
        "The customer gets a full refund.",
        "The jacket is exchanged for a sale item."
      ]
    },
    {
      "id": "shopping-policy-reading-29",
      "level": "Advanced",
      "prompt": "Frasa mana yang membatasi kapan barang diskon dapat ditukar?",
      "answer": "if stock is available",
      "options": [
        "Sale items cannot",
        "Customers may return",
        "if stock is available",
        "for a different size"
      ]
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik10Page() {
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
