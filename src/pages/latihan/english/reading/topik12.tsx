import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { ReadingPracticeIntro, type ReadingTopicMaterial } from '../../components/ReadingPracticeIntro';

const material: ReadingTopicMaterial = {
  "id": "event-schedule",
  "title": "Event Schedule",
  "description": "Membaca jadwal acara dan menemukan urutan kegiatan.",
  "passageTitle": "Community Workshop",
  "passage": "The workshop begins at 9 a.m. with registration. A cooking demonstration starts at 10 a.m., followed by a short lunch break. The final session at 1 p.m. focuses on budgeting for healthy meals.",
  "mainIdea": "The community workshop has several scheduled activities.",
  "detail": "The final session focuses on budgeting for healthy meals.",
  "vocabulary": "registration",
  "vocabularyMeaning": "the act of signing up or checking in",
  "inference": "Participants should arrive before the cooking demonstration starts.",
  "purpose": "to show the order of workshop activities",
  "readingSkill": "reading sequence and time information",
  "topicNumber": 12
};

const quizTopics = [
  {
    "id": "event-schedule",
    "title": "Event Schedule",
    "description": "Membaca jadwal acara dan menemukan urutan kegiatan."
  }
];

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Community Workshop",
      "options": [
        "Community Workshop",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "event-schedule-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "to show the order of workshop activities",
        "The opposite detail is stated.",
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "registration",
      "options": [
        "meanwhile",
        "registration",
        "therefore",
        "although"
      ],
      "id": "event-schedule-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage? Passage: \"Community Workshop\".",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals.",
        "to show the order of workshop activities",
        "A story about an unrelated event."
      ],
      "id": "event-schedule-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Which key word appears in the passage?",
      "answer": "registration",
      "options": [
        "reading sequence and time information",
        "main idea",
        "registration",
        "the act of signing up or checking in"
      ],
      "id": "event-schedule-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "What is the title of this reading passage?",
      "answer": "Community Workshop",
      "options": [
        "No title is possible.",
        "Community Workshop",
        "Event Schedule",
        "to show the order of workshop activities"
      ],
      "id": "event-schedule-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Which detail is mentioned in the passage? Topic: Event Schedule.",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "event-schedule-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the main idea of this passage?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "the act of signing up or checking in",
        "reading sequence and time information",
        "The text is only about spelling.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "What does this word mean in context? Word: \"registration\".",
      "answer": "the act of signing up or checking in",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "the act of signing up or checking in",
        "a person who asks questions"
      ],
      "id": "event-schedule-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to show the order of workshop activities",
      "options": [
        "to advertise a sports team",
        "to show the order of workshop activities",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "event-schedule-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage?",
      "answer": "reading sequence and time information",
      "options": [
        "reading sequence and time information",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "event-schedule-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The community workshop has several scheduled activities.",
        "Participants should arrive before the cooking demonstration starts.",
        "A detail not connected to the passage.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context? The word is \"registration\".",
      "answer": "the act of signing up or checking in",
      "options": [
        "to show the order of workshop activities",
        "the opposite of the passage meaning",
        "the act of signing up or checking in",
        "registration"
      ],
      "id": "event-schedule-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose? Passage: \"Community Workshop\".",
      "answer": "to show the order of workshop activities",
      "options": [
        "to test math formulas",
        "to show the order of workshop activities",
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which reading skill fits this passage? Topic: Event Schedule.",
      "answer": "reading sequence and time information",
      "options": [
        "reading sequence and time information",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "event-schedule-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which specific information is correct?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The text says the opposite.",
        "the act of signing up or checking in",
        "to show the order of workshop activities",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "What does this word mean in context?",
      "answer": "the act of signing up or checking in",
      "options": [
        "The community workshop has several scheduled activities.",
        "a sentence that closes an email",
        "the act of signing up or checking in",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "What is the writer's purpose?",
      "answer": "to show the order of workshop activities",
      "options": [
        "reading sequence and time information",
        "to show the order of workshop activities",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "event-schedule-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "event-schedule-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The community workshop has several scheduled activities.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "event-schedule-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention?",
      "answer": "to show the order of workshop activities",
      "options": [
        "to make readers ignore the topic",
        "to show the order of workshop activities",
        "the act of signing up or checking in",
        "to hide the main idea"
      ],
      "id": "event-schedule-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable? Passage: \"Community Workshop\".",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "The final session focuses on budgeting for healthy meals.",
        "to show the order of workshop activities",
        "No inference can be made."
      ],
      "id": "event-schedule-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which answer is best supported by the text? Main idea check.",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "registration",
        "the act of signing up or checking in",
        "A conclusion from a different passage.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate? Best reading skill?",
      "answer": "reading sequence and time information",
      "options": [
        "The final session focuses on budgeting for healthy meals.",
        "ignoring supporting details",
        "reading sequence and time information",
        "to show the order of workshop activities"
      ],
      "id": "event-schedule-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "What is the writer's deeper intention? What does the writer want the reader to understand?",
      "answer": "to show the order of workshop activities",
      "options": [
        "The passage has no purpose.",
        "to show the order of workshop activities",
        "Participants should arrive before the cooking demonstration starts.",
        "registration"
      ],
      "id": "event-schedule-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which summary is most accurate?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals.",
        "the act of signing up or checking in",
        "Only one small word matters."
      ],
      "id": "event-schedule-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which inference is most reasonable?",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Community Workshop",
      "options": [
        "Community Workshop",
        "A Random Conversation",
        "Grammar Practice Only",
        "Unknown Topic"
      ],
      "id": "event-schedule-reading-0",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The passage is mostly about sports results.",
        "The text only explains punctuation.",
        "The passage has no clear topic.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-1",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "to show the order of workshop activities",
        "The opposite detail is stated.",
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-2",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "registration",
      "options": [
        "meanwhile",
        "registration",
        "therefore",
        "although"
      ],
      "id": "event-schedule-reading-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini? Passage: \"Community Workshop\".",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals.",
        "to show the order of workshop activities",
        "A story about an unrelated event."
      ],
      "id": "event-schedule-reading-4",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The passage says the event was canceled.",
        "The text says nothing happened.",
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-5",
      "level": "Basic"
    },
    {
      "prompt": "Kata kunci mana yang muncul dalam bacaan?",
      "answer": "registration",
      "options": [
        "reading sequence and time information",
        "main idea",
        "registration",
        "the act of signing up or checking in"
      ],
      "id": "event-schedule-reading-6",
      "level": "Basic"
    },
    {
      "prompt": "Apa judul bacaan ini?",
      "answer": "Community Workshop",
      "options": [
        "No title is possible.",
        "Community Workshop",
        "Event Schedule",
        "to show the order of workshop activities"
      ],
      "id": "event-schedule-reading-7",
      "level": "Basic"
    },
    {
      "prompt": "Detail mana yang disebutkan dalam bacaan? Topic: Event Schedule.",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts.",
        "The writer gives no details.",
        "All details are unrelated."
      ],
      "id": "event-schedule-reading-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa ide utama bacaan ini?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "the act of signing up or checking in",
        "reading sequence and time information",
        "The text is only about spelling.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-9",
      "level": "Basic"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? Word: \"registration\".",
      "answer": "the act of signing up or checking in",
      "options": [
        "a place for official meetings",
        "a type of punctuation mark",
        "the act of signing up or checking in",
        "a person who asks questions"
      ],
      "id": "event-schedule-reading-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to show the order of workshop activities",
      "options": [
        "to advertise a sports team",
        "to show the order of workshop activities",
        "to confuse readers with unrelated facts",
        "to list grammar formulas only"
      ],
      "id": "event-schedule-reading-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai?",
      "answer": "reading sequence and time information",
      "options": [
        "reading sequence and time information",
        "memorizing pronunciation only",
        "writing a formal letter",
        "speaking without preparation"
      ],
      "id": "event-schedule-reading-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The community workshop has several scheduled activities.",
        "Participants should arrive before the cooking demonstration starts.",
        "A detail not connected to the passage.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks? The word is \"registration\".",
      "answer": "the act of signing up or checking in",
      "options": [
        "to show the order of workshop activities",
        "the opposite of the passage meaning",
        "the act of signing up or checking in",
        "registration"
      ],
      "id": "event-schedule-reading-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis? Passage: \"Community Workshop\".",
      "answer": "to show the order of workshop activities",
      "options": [
        "to test math formulas",
        "to show the order of workshop activities",
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Skill reading mana yang paling sesuai? Topic: Event Schedule.",
      "answer": "reading sequence and time information",
      "options": [
        "reading sequence and time information",
        "essay writing",
        "listening for accent only",
        "drawing a picture"
      ],
      "id": "event-schedule-reading-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Informasi spesifik mana yang benar?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "The text says the opposite.",
        "the act of signing up or checking in",
        "to show the order of workshop activities",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa arti kata ini berdasarkan konteks?",
      "answer": "the act of signing up or checking in",
      "options": [
        "The community workshop has several scheduled activities.",
        "a sentence that closes an email",
        "the act of signing up or checking in",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Apa tujuan penulis?",
      "answer": "to show the order of workshop activities",
      "options": [
        "reading sequence and time information",
        "to show the order of workshop activities",
        "to avoid giving information",
        "to describe unrelated grammar errors"
      ],
      "id": "event-schedule-reading-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "The opposite of the passage is probably true.",
        "The passage gives no clue about this topic.",
        "The writer dislikes all details in the text."
      ],
      "id": "event-schedule-reading-20",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks?",
      "answer": "The final session focuses on budgeting for healthy meals.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "A detail from another topic.",
        "A claim with no textual support.",
        "The final session focuses on budgeting for healthy meals."
      ],
      "id": "event-schedule-reading-21",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The passage is mainly about spelling mistakes.",
        "The passage only asks a question.",
        "The community workshop has several scheduled activities.",
        "The passage gives many unrelated examples without a topic."
      ],
      "id": "event-schedule-reading-22",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam?",
      "answer": "to show the order of workshop activities",
      "options": [
        "to make readers ignore the topic",
        "to show the order of workshop activities",
        "the act of signing up or checking in",
        "to hide the main idea"
      ],
      "id": "event-schedule-reading-23",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal? Passage: \"Community Workshop\".",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "Participants should arrive before the cooking demonstration starts.",
        "The final session focuses on budgeting for healthy meals.",
        "to show the order of workshop activities",
        "No inference can be made."
      ],
      "id": "event-schedule-reading-24",
      "level": "Advanced"
    },
    {
      "prompt": "Jawaban mana yang paling didukung oleh teks? Main idea check.",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "registration",
        "the act of signing up or checking in",
        "A conclusion from a different passage.",
        "The community workshop has several scheduled activities."
      ],
      "id": "event-schedule-reading-25",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat? Best reading skill?",
      "answer": "reading sequence and time information",
      "options": [
        "The final session focuses on budgeting for healthy meals.",
        "ignoring supporting details",
        "reading sequence and time information",
        "to show the order of workshop activities"
      ],
      "id": "event-schedule-reading-26",
      "level": "Advanced"
    },
    {
      "prompt": "Apa maksud penulis secara lebih dalam? What does the writer want the reader to understand?",
      "answer": "to show the order of workshop activities",
      "options": [
        "The passage has no purpose.",
        "to show the order of workshop activities",
        "Participants should arrive before the cooking demonstration starts.",
        "registration"
      ],
      "id": "event-schedule-reading-27",
      "level": "Advanced"
    },
    {
      "prompt": "Ringkasan mana yang paling akurat?",
      "answer": "The community workshop has several scheduled activities.",
      "options": [
        "The community workshop has several scheduled activities.",
        "The final session focuses on budgeting for healthy meals.",
        "the act of signing up or checking in",
        "Only one small word matters."
      ],
      "id": "event-schedule-reading-28",
      "level": "Advanced"
    },
    {
      "prompt": "Kesimpulan mana yang paling masuk akal?",
      "answer": "Participants should arrive before the cooking demonstration starts.",
      "options": [
        "The text proves the opposite.",
        "There is no clue in the passage.",
        "The final session focuses on budgeting for healthy meals.",
        "Participants should arrive before the cooking demonstration starts."
      ],
      "id": "event-schedule-reading-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishReadingTopik12Page() {
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
