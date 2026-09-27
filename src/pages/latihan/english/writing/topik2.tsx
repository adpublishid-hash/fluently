import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "daily-journal",
  "title": "Daily Journal",
  "description": "Menulis catatan harian singkat dengan urutan waktu.",
  "task": "write a short journal entry about your day",
  "goal": "describe events, feelings, and one reflection",
  "format": "short journal paragraph",
  "structure": "Time marker + event + feeling + reflection.",
  "sample": "Today, I finished my work early. I felt relieved because I had time to rest.",
  "opening": "Today,",
  "connector": "because",
  "closing": "I learned something useful.",
  "editingTip": "Use past tense for events that already happened.",
  "topicNumber": 2
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis catatan harian singkat dengan urutan waktu.",
      "answer": "write a short journal entry about your day",
      "options": [
        "write a short journal entry about your day",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "daily-journal-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "short journal paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short journal paragraph"
      ],
      "id": "daily-journal-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Time marker + event + feeling + reflection.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "daily-journal-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "Writing is speak fast.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "daily-journal-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a short journal entry about your day",
      "options": [
        "write a short journal entry about your day",
        "describe events, feelings, and one reflection",
        "Use past tense for events that already happened.",
        "avoid the topic completely"
      ],
      "id": "daily-journal-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "Today,",
        "because",
        "I learned something useful.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Daily Journal.",
      "answer": "short journal paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short journal paragraph",
        "casual phone call"
      ],
      "id": "daily-journal-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "And because but however.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Today,",
        "I learned something useful."
      ],
      "id": "daily-journal-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "describe events, feelings, and one reflection",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "daily-journal-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "Today,",
      "options": [
        "I learned something useful.",
        "Finally, therefore, however,",
        "Today,",
        "because"
      ],
      "id": "daily-journal-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "because",
      "options": [
        "Dear",
        "because",
        "Today,",
        "I learned something useful."
      ],
      "id": "daily-journal-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "I learned something useful.",
      "options": [
        "I learned something useful.",
        "Today,",
        "because",
        "Because and because."
      ],
      "id": "daily-journal-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "write a short journal entry about your day",
        "short journal paragraph",
        "write as many words as possible without checking",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: short journal paragraph.",
      "answer": "Today,",
      "options": [
        "Use past tense for events that already happened.",
        "I not sure maybe.",
        "Today,",
        "Today, I finished my work early. I felt relieved because I had time to rest."
      ],
      "id": "daily-journal-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Time marker + event + feeling + reflection.",
      "answer": "because",
      "options": [
        "I learned something useful.",
        "because",
        "!!!",
        "very very"
      ],
      "id": "daily-journal-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Daily Journal.",
      "answer": "I learned something useful.",
      "options": [
        "I learned something useful.",
        "Today,",
        "write a short journal entry about your day",
        "No ending needed."
      ],
      "id": "daily-journal-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a short journal entry about your day.",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "because",
      "options": [
        "I learned something useful.",
        "short journal paragraph",
        "because",
        "Today,"
      ],
      "id": "daily-journal-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "I learned something useful.",
      "options": [
        "because",
        "I learned something useful.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "daily-journal-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Use past tense for events that already happened.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "daily-journal-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "short journal paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short journal paragraph",
        "random informal chat for every task"
      ],
      "id": "daily-journal-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "For example however because in conclusion.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "daily-journal-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Daily Journal.",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Use past tense for events that already happened.",
        "Today,",
        "because",
        "Use punctuation only at the end of the course."
      ],
      "id": "daily-journal-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: describe events, feelings, and one reflection.",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "Today,",
      "options": [
        "I learned something useful.",
        "Use past tense for events that already happened.",
        "Today,",
        "because"
      ],
      "id": "daily-journal-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "because",
      "options": [
        "short journal paragraph",
        "because",
        "there there",
        "grammar"
      ],
      "id": "daily-journal-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Today,",
        "I learned something useful.",
        "No topic no sentence."
      ],
      "id": "daily-journal-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use past tense for events that already happened."
      ],
      "id": "daily-journal-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis catatan harian singkat dengan urutan waktu.",
      "answer": "write a short journal entry about your day",
      "options": [
        "write a short journal entry about your day",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "daily-journal-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "short journal paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short journal paragraph"
      ],
      "id": "daily-journal-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Time marker + event + feeling + reflection.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "daily-journal-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "Writing is speak fast.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "daily-journal-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a short journal entry about your day",
      "options": [
        "write a short journal entry about your day",
        "describe events, feelings, and one reflection",
        "Use past tense for events that already happened.",
        "avoid the topic completely"
      ],
      "id": "daily-journal-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "Today,",
        "because",
        "I learned something useful.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Daily Journal.",
      "answer": "short journal paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short journal paragraph",
        "casual phone call"
      ],
      "id": "daily-journal-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "And because but however.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Today,",
        "I learned something useful."
      ],
      "id": "daily-journal-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "describe events, feelings, and one reflection",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "daily-journal-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "Today,",
      "options": [
        "I learned something useful.",
        "Finally, therefore, however,",
        "Today,",
        "because"
      ],
      "id": "daily-journal-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "because",
      "options": [
        "Dear",
        "because",
        "Today,",
        "I learned something useful."
      ],
      "id": "daily-journal-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "I learned something useful.",
      "options": [
        "I learned something useful.",
        "Today,",
        "because",
        "Because and because."
      ],
      "id": "daily-journal-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "write a short journal entry about your day",
        "short journal paragraph",
        "write as many words as possible without checking",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: short journal paragraph.",
      "answer": "Today,",
      "options": [
        "Use past tense for events that already happened.",
        "I not sure maybe.",
        "Today,",
        "Today, I finished my work early. I felt relieved because I had time to rest."
      ],
      "id": "daily-journal-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Time marker + event + feeling + reflection.",
      "answer": "because",
      "options": [
        "I learned something useful.",
        "because",
        "!!!",
        "very very"
      ],
      "id": "daily-journal-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Daily Journal.",
      "answer": "I learned something useful.",
      "options": [
        "I learned something useful.",
        "Today,",
        "write a short journal entry about your day",
        "No ending needed."
      ],
      "id": "daily-journal-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a short journal entry about your day.",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "because",
      "options": [
        "I learned something useful.",
        "short journal paragraph",
        "because",
        "Today,"
      ],
      "id": "daily-journal-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "I learned something useful.",
      "options": [
        "because",
        "I learned something useful.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "daily-journal-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Use past tense for events that already happened.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "daily-journal-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Time marker + event + feeling + reflection.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Time marker + event + feeling + reflection."
      ],
      "id": "daily-journal-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "short journal paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short journal paragraph",
        "random informal chat for every task"
      ],
      "id": "daily-journal-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "For example however because in conclusion.",
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "daily-journal-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Daily Journal.",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Use past tense for events that already happened.",
        "Today,",
        "because",
        "Use punctuation only at the end of the course."
      ],
      "id": "daily-journal-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: describe events, feelings, and one reflection.",
      "answer": "describe events, feelings, and one reflection",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe events, feelings, and one reflection"
      ],
      "id": "daily-journal-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "Today,",
      "options": [
        "I learned something useful.",
        "Use past tense for events that already happened.",
        "Today,",
        "because"
      ],
      "id": "daily-journal-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "because",
      "options": [
        "short journal paragraph",
        "because",
        "there there",
        "grammar"
      ],
      "id": "daily-journal-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Today, I finished my work early. I felt relieved because I had time to rest.",
      "options": [
        "Today, I finished my work early. I felt relieved because I had time to rest.",
        "Today,",
        "I learned something useful.",
        "No topic no sentence."
      ],
      "id": "daily-journal-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Use past tense for events that already happened.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use past tense for events that already happened."
      ],
      "id": "daily-journal-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik2Page() {
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
