import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "daily-life",
  "title": "Daily Life",
  "description": "Bacaan pendek tentang rutinitas dan kebiasaan sehari-hari.",
  "passageTitle": "A Quiet Morning",
  "passage": "Mira wakes up early every weekday. She drinks water, checks her schedule, and walks to the bus stop before seven. She likes quiet mornings because they help her feel ready for the day.",
  "mainIdea": "Mira has a calm morning routine that helps her prepare for the day.",
  "detail": "Mira walks to the bus stop before seven.",
  "vocabulary": "schedule",
  "vocabularyMeaning": "a plan that shows when things happen",
  "inference": "Mira probably values being organized.",
  "purpose": "to describe a simple daily routine",
  "readingSkill": "finding the main idea and supporting details",
  "topicNumber": 1
};

const quizTopics = [
  {
    "id": "daily-life",
    "title": "Daily Life",
    "description": "Bacaan pendek tentang rutinitas dan kebiasaan sehari-hari."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A Quiet Morning",
      "options": [
        "A Quiet Morning",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "daily-life-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "to describe a simple daily routine",
        "The opposite detail is stated.",
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "schedule",
      "options": [
        "meanwhile",
        "schedule",
        "therefore",
        "although"
      ],
      "id": "daily-life-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"A Quiet Morning\".",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven.",
        "to describe a simple daily routine",
        "A story about an unrelated event."
      ],
      "id": "daily-life-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "schedule",
      "options": [
        "finding the main idea and supporting details",
        "main idea",
        "schedule",
        "a plan that shows when things happen"
      ],
      "id": "daily-life-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "A Quiet Morning",
      "options": [
        "No title is possible.",
        "A Quiet Morning",
        "Daily Life",
        "to describe a simple daily routine"
      ],
      "id": "daily-life-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Daily Life.",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "daily-life-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "a plan that shows when things happen",
        "finding the main idea and supporting details",
        "The text is only about spelling.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"schedule\".",
      "answer": "a plan that shows when things happen",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a plan that shows when things happen",
        "a person who asks questions"
      ],
      "id": "daily-life-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to describe a simple daily routine",
      "options": [
        "to advertise a sports team",
        "to describe a simple daily routine",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "daily-life-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "finding the main idea and supporting details",
      "options": [
        "finding the main idea and supporting details",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "daily-life-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira probably values being organized.",
        "A detail not connected to the passage.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"schedule\".",
      "answer": "a plan that shows when things happen",
      "options": [
        "to describe a simple daily routine",
        "the opposite of the passage meaning",
        "a plan that shows when things happen",
        "schedule"
      ],
      "id": "daily-life-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"A Quiet Morning\".",
      "answer": "to describe a simple daily routine",
      "options": [
        "to test math formulas",
        "to describe a simple daily routine",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Daily Life.",
      "answer": "finding the main idea and supporting details",
      "options": [
        "finding the main idea and supporting details",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "daily-life-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "The text says the opposite.",
        "a plan that shows when things happen",
        "to describe a simple daily routine",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "a plan that shows when things happen",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "a sentence that closes an email",
        "a plan that shows when things happen",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to describe a simple daily routine",
      "options": [
        "finding the main idea and supporting details",
        "to describe a simple daily routine",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "daily-life-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Mira probably values being organized.",
      "options": [
        "Mira probably values being organized.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "daily-life-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira probably values being organized.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "daily-life-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to describe a simple daily routine",
      "options": [
        "to make readers ignore the topic",
        "to describe a simple daily routine",
        "a plan that shows when things happen",
        "to hide the main idea"
      ],
      "id": "daily-life-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"A Quiet Morning\".",
      "answer": "Mira probably values being organized.",
      "options": [
        "Mira probably values being organized.",
        "Mira walks to the bus stop before seven.",
        "to describe a simple daily routine",
        "No inference can be made."
      ],
      "id": "daily-life-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "schedule",
        "a plan that shows when things happen",
        "A conclusion from a different passage.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "finding the main idea and supporting details",
      "options": [
        "Mira walks to the bus stop before seven.",
        "ignoring supporting details",
        "finding the main idea and supporting details",
        "to describe a simple daily routine"
      ],
      "id": "daily-life-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to describe a simple daily routine",
      "options": [
        "The passage has no purpose.",
        "to describe a simple daily routine",
        "Mira probably values being organized.",
        "schedule"
      ],
      "id": "daily-life-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven.",
        "a plan that shows when things happen",
        "Only one small word matters."
      ],
      "id": "daily-life-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Mira probably values being organized.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A Quiet Morning",
      "options": [
        "A Quiet Morning",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "daily-life-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "to describe a simple daily routine",
        "The opposite detail is stated.",
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "schedule",
      "options": [
        "meanwhile",
        "schedule",
        "therefore",
        "although"
      ],
      "id": "daily-life-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"A Quiet Morning\".",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven.",
        "to describe a simple daily routine",
        "A story about an unrelated event."
      ],
      "id": "daily-life-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "schedule",
      "options": [
        "finding the main idea and supporting details",
        "main idea",
        "schedule",
        "a plan that shows when things happen"
      ],
      "id": "daily-life-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "A Quiet Morning",
      "options": [
        "No title is possible.",
        "A Quiet Morning",
        "Daily Life",
        "to describe a simple daily routine"
      ],
      "id": "daily-life-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Daily Life.",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "daily-life-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "a plan that shows when things happen",
        "finding the main idea and supporting details",
        "The text is only about spelling.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"schedule\".",
      "answer": "a plan that shows when things happen",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "a plan that shows when things happen",
        "a person who asks questions"
      ],
      "id": "daily-life-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to describe a simple daily routine",
      "options": [
        "to advertise a sports team",
        "to describe a simple daily routine",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "daily-life-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "finding the main idea and supporting details",
      "options": [
        "finding the main idea and supporting details",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "daily-life-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira probably values being organized.",
        "A detail not connected to the passage.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"schedule\".",
      "answer": "a plan that shows when things happen",
      "options": [
        "to describe a simple daily routine",
        "the opposite of the passage meaning",
        "a plan that shows when things happen",
        "schedule"
      ],
      "id": "daily-life-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"A Quiet Morning\".",
      "answer": "to describe a simple daily routine",
      "options": [
        "to test math formulas",
        "to describe a simple daily routine",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Daily Life.",
      "answer": "finding the main idea and supporting details",
      "options": [
        "finding the main idea and supporting details",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "daily-life-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "The text says the opposite.",
        "a plan that shows when things happen",
        "to describe a simple daily routine",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "a plan that shows when things happen",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "a sentence that closes an email",
        "a plan that shows when things happen",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to describe a simple daily routine",
      "options": [
        "finding the main idea and supporting details",
        "to describe a simple daily routine",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "daily-life-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Mira probably values being organized.",
      "options": [
        "Mira probably values being organized.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "daily-life-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "Mira walks to the bus stop before seven.",
      "options": [
        "Mira probably values being organized.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "Mira walks to the bus stop before seven."
      ],
      "id": "daily-life-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "Mira has a calm morning routine that helps her prepare for the day.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "daily-life-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to describe a simple daily routine",
      "options": [
        "to make readers ignore the topic",
        "to describe a simple daily routine",
        "a plan that shows when things happen",
        "to hide the main idea"
      ],
      "id": "daily-life-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"A Quiet Morning\".",
      "answer": "Mira probably values being organized.",
      "options": [
        "Mira probably values being organized.",
        "Mira walks to the bus stop before seven.",
        "to describe a simple daily routine",
        "No inference can be made."
      ],
      "id": "daily-life-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "schedule",
        "a plan that shows when things happen",
        "A conclusion from a different passage.",
        "Mira has a calm morning routine that helps her prepare for the day."
      ],
      "id": "daily-life-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "finding the main idea and supporting details",
      "options": [
        "Mira walks to the bus stop before seven.",
        "ignoring supporting details",
        "finding the main idea and supporting details",
        "to describe a simple daily routine"
      ],
      "id": "daily-life-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to describe a simple daily routine",
      "options": [
        "The passage has no purpose.",
        "to describe a simple daily routine",
        "Mira probably values being organized.",
        "schedule"
      ],
      "id": "daily-life-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "Mira has a calm morning routine that helps her prepare for the day.",
      "options": [
        "Mira has a calm morning routine that helps her prepare for the day.",
        "Mira walks to the bus stop before seven.",
        "a plan that shows when things happen",
        "Only one small word matters."
      ],
      "id": "daily-life-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Mira probably values being organized.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "Mira walks to the bus stop before seven.",
        "Mira probably values being organized."
      ],
      "id": "daily-life-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik1Page() {
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
