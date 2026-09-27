import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "travel-blog",
  "title": "Travel Blog",
  "description": "Membaca cerita perjalanan dan memahami opini penulis.",
  "passageTitle": "A Weekend in Yogyakarta",
  "passage": "Last weekend, Arif visited Yogyakarta with two friends. They explored small streets, tried local food, and watched the sunset near the temple. Arif thought the best part was meeting friendly local artists.",
  "mainIdea": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
  "detail": "Arif watched the sunset near the temple.",
  "vocabulary": "explored",
  "vocabularyMeaning": "traveled around a place to learn about it",
  "inference": "Arif enjoys cultural experiences when traveling.",
  "purpose": "to share a personal travel experience",
  "readingSkill": "understanding personal recounts and opinions",
  "topicNumber": 3
};

const quizTopics = [
  {
    "id": "travel-blog",
    "title": "Travel Blog",
    "description": "Membaca cerita perjalanan dan memahami opini penulis."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A Weekend in Yogyakarta",
      "options": [
        "A Weekend in Yogyakarta",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "travel-blog-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "to share a personal travel experience",
        "The opposite detail is stated.",
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "explored",
      "options": [
        "meanwhile",
        "explored",
        "therefore",
        "although"
      ],
      "id": "travel-blog-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple.",
        "to share a personal travel experience",
        "A story about an unrelated event."
      ],
      "id": "travel-blog-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "explored",
      "options": [
        "understanding personal recounts and opinions",
        "main idea",
        "explored",
        "traveled around a place to learn about it"
      ],
      "id": "travel-blog-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A Weekend in Yogyakarta",
      "options": [
        "No title is possible.",
        "A Weekend in Yogyakarta",
        "Travel Blog",
        "to share a personal travel experience"
      ],
      "id": "travel-blog-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Travel Blog.",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "travel-blog-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "traveled around a place to learn about it",
        "understanding personal recounts and opinions",
        "The text is only about spelling.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"explored\".",
      "answer": "traveled around a place to learn about it",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "traveled around a place to learn about it",
        "a person who asks questions"
      ],
      "id": "travel-blog-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to share a personal travel experience",
      "options": [
        "to advertise a sports team",
        "to share a personal travel experience",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "travel-blog-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "understanding personal recounts and opinions",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "travel-blog-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif enjoys cultural experiences when traveling.",
        "A detail not connected to the passage.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"explored\".",
      "answer": "traveled around a place to learn about it",
      "options": [
        "to share a personal travel experience",
        "the opposite of the passage meaning",
        "traveled around a place to learn about it",
        "explored"
      ],
      "id": "travel-blog-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "to share a personal travel experience",
      "options": [
        "to test math formulas",
        "to share a personal travel experience",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Travel Blog.",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "understanding personal recounts and opinions",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "travel-blog-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "The text says the opposite.",
        "traveled around a place to learn about it",
        "to share a personal travel experience",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "traveled around a place to learn about it",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "a sentence that closes an email",
        "traveled around a place to learn about it",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to share a personal travel experience",
      "options": [
        "understanding personal recounts and opinions",
        "to share a personal travel experience",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "travel-blog-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "travel-blog-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "travel-blog-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to share a personal travel experience",
      "options": [
        "to make readers ignore the topic",
        "to share a personal travel experience",
        "traveled around a place to learn about it",
        "to hide the main idea"
      ],
      "id": "travel-blog-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "Arif watched the sunset near the temple.",
        "to share a personal travel experience",
        "No inference can be made."
      ],
      "id": "travel-blog-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "explored",
        "traveled around a place to learn about it",
        "A conclusion from a different passage.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "Arif watched the sunset near the temple.",
        "ignoring supporting details",
        "understanding personal recounts and opinions",
        "to share a personal travel experience"
      ],
      "id": "travel-blog-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to share a personal travel experience",
      "options": [
        "The passage has no purpose.",
        "to share a personal travel experience",
        "Arif enjoys cultural experiences when traveling.",
        "explored"
      ],
      "id": "travel-blog-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple.",
        "traveled around a place to learn about it",
        "Only one small word matters."
      ],
      "id": "travel-blog-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A Weekend in Yogyakarta",
      "options": [
        "A Weekend in Yogyakarta",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "travel-blog-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "to share a personal travel experience",
        "The opposite detail is stated.",
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "explored",
      "options": [
        "meanwhile",
        "explored",
        "therefore",
        "although"
      ],
      "id": "travel-blog-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple.",
        "to share a personal travel experience",
        "A story about an unrelated event."
      ],
      "id": "travel-blog-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "explored",
      "options": [
        "understanding personal recounts and opinions",
        "main idea",
        "explored",
        "traveled around a place to learn about it"
      ],
      "id": "travel-blog-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A Weekend in Yogyakarta",
      "options": [
        "No title is possible.",
        "A Weekend in Yogyakarta",
        "Travel Blog",
        "to share a personal travel experience"
      ],
      "id": "travel-blog-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Travel Blog.",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "travel-blog-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "traveled around a place to learn about it",
        "understanding personal recounts and opinions",
        "The text is only about spelling.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"explored\".",
      "answer": "traveled around a place to learn about it",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "traveled around a place to learn about it",
        "a person who asks questions"
      ],
      "id": "travel-blog-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to share a personal travel experience",
      "options": [
        "to advertise a sports team",
        "to share a personal travel experience",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "travel-blog-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "understanding personal recounts and opinions",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "travel-blog-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif enjoys cultural experiences when traveling.",
        "A detail not connected to the passage.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"explored\".",
      "answer": "traveled around a place to learn about it",
      "options": [
        "to share a personal travel experience",
        "the opposite of the passage meaning",
        "traveled around a place to learn about it",
        "explored"
      ],
      "id": "travel-blog-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "to share a personal travel experience",
      "options": [
        "to test math formulas",
        "to share a personal travel experience",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Travel Blog.",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "understanding personal recounts and opinions",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "travel-blog-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "The text says the opposite.",
        "traveled around a place to learn about it",
        "to share a personal travel experience",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "traveled around a place to learn about it",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "a sentence that closes an email",
        "traveled around a place to learn about it",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to share a personal travel experience",
      "options": [
        "understanding personal recounts and opinions",
        "to share a personal travel experience",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "travel-blog-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "travel-blog-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Arif watched the sunset near the temple.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Arif watched the sunset near the temple."
      ],
      "id": "travel-blog-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "travel-blog-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to share a personal travel experience",
      "options": [
        "to make readers ignore the topic",
        "to share a personal travel experience",
        "traveled around a place to learn about it",
        "to hide the main idea"
      ],
      "id": "travel-blog-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"A Weekend in Yogyakarta\".",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "Arif enjoys cultural experiences when traveling.",
        "Arif watched the sunset near the temple.",
        "to share a personal travel experience",
        "No inference can be made."
      ],
      "id": "travel-blog-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "explored",
        "traveled around a place to learn about it",
        "A conclusion from a different passage.",
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences."
      ],
      "id": "travel-blog-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "understanding personal recounts and opinions",
      "options": [
        "Arif watched the sunset near the temple.",
        "ignoring supporting details",
        "understanding personal recounts and opinions",
        "to share a personal travel experience"
      ],
      "id": "travel-blog-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to share a personal travel experience",
      "options": [
        "The passage has no purpose.",
        "to share a personal travel experience",
        "Arif enjoys cultural experiences when traveling.",
        "explored"
      ],
      "id": "travel-blog-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
      "options": [
        "Arif enjoyed a short trip to Yogyakarta with memorable local experiences.",
        "Arif watched the sunset near the temple.",
        "traveled around a place to learn about it",
        "Only one small word matters."
      ],
      "id": "travel-blog-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Arif enjoys cultural experiences when traveling.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Arif watched the sunset near the temple.",
        "Arif enjoys cultural experiences when traveling."
      ],
      "id": "travel-blog-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik3Page() {
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
