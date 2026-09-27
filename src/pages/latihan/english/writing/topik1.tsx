import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "simple-sentences",
  "title": "Simple Sentences",
  "description": "Latihan membuat kalimat pendek yang jelas dan benar.",
  "task": "write clear sentences about everyday activities",
  "goal": "make a complete sentence with subject, verb, and object or complement",
  "format": "one complete sentence",
  "structure": "Subject + verb + object/complement.",
  "sample": "I study English every morning.",
  "opening": "I usually",
  "connector": "and",
  "closing": "every day.",
  "editingTip": "Check that every sentence has a subject and a verb.",
  "topicNumber": 1
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Latihan membuat kalimat pendek yang jelas dan benar.",
      "answer": "write clear sentences about everyday activities",
      "options": [
        "write clear sentences about everyday activities",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "simple-sentences-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "one complete sentence",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "one complete sentence"
      ],
      "id": "simple-sentences-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Subject + verb + object/complement.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "simple-sentences-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "I study English every morning.",
      "options": [
        "Writing is speak fast.",
        "I study English every morning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "simple-sentences-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write clear sentences about everyday activities",
      "options": [
        "write clear sentences about everyday activities",
        "make a complete sentence with subject, verb, and object or complement",
        "Check that every sentence has a subject and a verb.",
        "avoid the topic completely"
      ],
      "id": "simple-sentences-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "I usually",
        "and",
        "every day.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Simple Sentences.",
      "answer": "one complete sentence",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "one complete sentence",
        "casual phone call"
      ],
      "id": "simple-sentences-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "I study English every morning.",
      "options": [
        "And because but however.",
        "I study English every morning.",
        "I usually",
        "every day."
      ],
      "id": "simple-sentences-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "make a complete sentence with subject, verb, and object or complement",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "simple-sentences-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "I usually",
      "options": [
        "every day.",
        "Finally, therefore, however,",
        "I usually",
        "and"
      ],
      "id": "simple-sentences-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "and",
      "options": [
        "Dear",
        "and",
        "I usually",
        "every day."
      ],
      "id": "simple-sentences-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "every day.",
      "options": [
        "every day.",
        "I usually",
        "and",
        "Because and because."
      ],
      "id": "simple-sentences-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "write clear sentences about everyday activities",
        "one complete sentence",
        "write as many words as possible without checking",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: one complete sentence.",
      "answer": "I usually",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "I not sure maybe.",
        "I usually",
        "I study English every morning."
      ],
      "id": "simple-sentences-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Subject + verb + object/complement.",
      "answer": "and",
      "options": [
        "every day.",
        "and",
        "!!!",
        "very very"
      ],
      "id": "simple-sentences-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Simple Sentences.",
      "answer": "every day.",
      "options": [
        "every day.",
        "I usually",
        "write clear sentences about everyday activities",
        "No ending needed."
      ],
      "id": "simple-sentences-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write clear sentences about everyday activities.",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "and",
      "options": [
        "every day.",
        "one complete sentence",
        "and",
        "I usually"
      ],
      "id": "simple-sentences-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "every day.",
      "options": [
        "and",
        "every day.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "simple-sentences-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "simple-sentences-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "one complete sentence",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "one complete sentence",
        "random informal chat for every task"
      ],
      "id": "simple-sentences-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "I study English every morning.",
      "options": [
        "For example however because in conclusion.",
        "I study English every morning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "simple-sentences-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Simple Sentences.",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "I usually",
        "and",
        "Use punctuation only at the end of the course."
      ],
      "id": "simple-sentences-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: make a complete sentence with subject, verb, and object or complement.",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "I usually",
      "options": [
        "every day.",
        "Check that every sentence has a subject and a verb.",
        "I usually",
        "and"
      ],
      "id": "simple-sentences-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "and",
      "options": [
        "one complete sentence",
        "and",
        "there there",
        "grammar"
      ],
      "id": "simple-sentences-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "I study English every morning.",
      "options": [
        "I study English every morning.",
        "I usually",
        "every day.",
        "No topic no sentence."
      ],
      "id": "simple-sentences-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Check that every sentence has a subject and a verb."
      ],
      "id": "simple-sentences-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Latihan membuat kalimat pendek yang jelas dan benar.",
      "answer": "write clear sentences about everyday activities",
      "options": [
        "write clear sentences about everyday activities",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "simple-sentences-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "one complete sentence",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "one complete sentence"
      ],
      "id": "simple-sentences-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Subject + verb + object/complement.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "simple-sentences-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "I study English every morning.",
      "options": [
        "Writing is speak fast.",
        "I study English every morning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "simple-sentences-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write clear sentences about everyday activities",
      "options": [
        "write clear sentences about everyday activities",
        "make a complete sentence with subject, verb, and object or complement",
        "Check that every sentence has a subject and a verb.",
        "avoid the topic completely"
      ],
      "id": "simple-sentences-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "I usually",
        "and",
        "every day.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Simple Sentences.",
      "answer": "one complete sentence",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "one complete sentence",
        "casual phone call"
      ],
      "id": "simple-sentences-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "I study English every morning.",
      "options": [
        "And because but however.",
        "I study English every morning.",
        "I usually",
        "every day."
      ],
      "id": "simple-sentences-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "make a complete sentence with subject, verb, and object or complement",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "simple-sentences-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "I usually",
      "options": [
        "every day.",
        "Finally, therefore, however,",
        "I usually",
        "and"
      ],
      "id": "simple-sentences-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "and",
      "options": [
        "Dear",
        "and",
        "I usually",
        "every day."
      ],
      "id": "simple-sentences-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "every day.",
      "options": [
        "every day.",
        "I usually",
        "and",
        "Because and because."
      ],
      "id": "simple-sentences-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "write clear sentences about everyday activities",
        "one complete sentence",
        "write as many words as possible without checking",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: one complete sentence.",
      "answer": "I usually",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "I not sure maybe.",
        "I usually",
        "I study English every morning."
      ],
      "id": "simple-sentences-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Subject + verb + object/complement.",
      "answer": "and",
      "options": [
        "every day.",
        "and",
        "!!!",
        "very very"
      ],
      "id": "simple-sentences-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Simple Sentences.",
      "answer": "every day.",
      "options": [
        "every day.",
        "I usually",
        "write clear sentences about everyday activities",
        "No ending needed."
      ],
      "id": "simple-sentences-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write clear sentences about everyday activities.",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "and",
      "options": [
        "every day.",
        "one complete sentence",
        "and",
        "I usually"
      ],
      "id": "simple-sentences-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "every day.",
      "options": [
        "and",
        "every day.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "simple-sentences-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "simple-sentences-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Subject + verb + object/complement.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Subject + verb + object/complement."
      ],
      "id": "simple-sentences-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "one complete sentence",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "one complete sentence",
        "random informal chat for every task"
      ],
      "id": "simple-sentences-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "I study English every morning.",
      "options": [
        "For example however because in conclusion.",
        "I study English every morning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "simple-sentences-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Simple Sentences.",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Check that every sentence has a subject and a verb.",
        "I usually",
        "and",
        "Use punctuation only at the end of the course."
      ],
      "id": "simple-sentences-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: make a complete sentence with subject, verb, and object or complement.",
      "answer": "make a complete sentence with subject, verb, and object or complement",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "make a complete sentence with subject, verb, and object or complement"
      ],
      "id": "simple-sentences-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "I usually",
      "options": [
        "every day.",
        "Check that every sentence has a subject and a verb.",
        "I usually",
        "and"
      ],
      "id": "simple-sentences-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "and",
      "options": [
        "one complete sentence",
        "and",
        "there there",
        "grammar"
      ],
      "id": "simple-sentences-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "I study English every morning.",
      "options": [
        "I study English every morning.",
        "I usually",
        "every day.",
        "No topic no sentence."
      ],
      "id": "simple-sentences-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Check that every sentence has a subject and a verb.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Check that every sentence has a subject and a verb."
      ],
      "id": "simple-sentences-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik1Page() {
  return (
    <VocabularyQuizPage
      topicId={material.id}
      skillId="writing"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Writing"
      introContent={() => <WritingPracticeIntro topic={material} />}
      backPath="/latihan/english/writing"
    />
  );
}
