import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "editing-proofreading",
  "title": "Editing & Proofreading",
  "description": "Melatih memperbaiki kalimat agar jelas dan akurat.",
  "task": "edit sentences for grammar, clarity, and punctuation",
  "goal": "find weak parts and choose a cleaner version",
  "format": "edited sentence or paragraph",
  "structure": "Read + identify issue + revise + check meaning.",
  "sample": "She does not like coffee, but she drinks tea every morning.",
  "opening": "The corrected sentence is",
  "connector": "but",
  "closing": "The meaning is now clear.",
  "editingTip": "Check verb agreement, punctuation, and word order before submitting.",
  "topicNumber": 15
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Melatih memperbaiki kalimat agar jelas dan akurat.",
      "answer": "edit sentences for grammar, clarity, and punctuation",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "editing-proofreading-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "edited sentence or paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "edited sentence or paragraph"
      ],
      "id": "editing-proofreading-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Read + identify issue + revise + check meaning.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "editing-proofreading-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "Writing is speak fast.",
        "She does not like coffee, but she drinks tea every morning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "editing-proofreading-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "edit sentences for grammar, clarity, and punctuation",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "find weak parts and choose a cleaner version",
        "Check verb agreement, punctuation, and word order before submitting.",
        "avoid the topic completely"
      ],
      "id": "editing-proofreading-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "The corrected sentence is",
        "but",
        "The meaning is now clear.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Editing & Proofreading.",
      "answer": "edited sentence or paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "edited sentence or paragraph",
        "casual phone call"
      ],
      "id": "editing-proofreading-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "And because but however.",
        "She does not like coffee, but she drinks tea every morning.",
        "The corrected sentence is",
        "The meaning is now clear."
      ],
      "id": "editing-proofreading-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "find weak parts and choose a cleaner version",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "editing-proofreading-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "The corrected sentence is",
      "options": [
        "The meaning is now clear.",
        "Finally, therefore, however,",
        "The corrected sentence is",
        "but"
      ],
      "id": "editing-proofreading-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "but",
      "options": [
        "Dear",
        "but",
        "The corrected sentence is",
        "The meaning is now clear."
      ],
      "id": "editing-proofreading-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "The meaning is now clear.",
      "options": [
        "The meaning is now clear.",
        "The corrected sentence is",
        "but",
        "Because and because."
      ],
      "id": "editing-proofreading-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "edited sentence or paragraph",
        "write as many words as possible without checking",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: edited sentence or paragraph.",
      "answer": "The corrected sentence is",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "I not sure maybe.",
        "The corrected sentence is",
        "She does not like coffee, but she drinks tea every morning."
      ],
      "id": "editing-proofreading-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Read + identify issue + revise + check meaning.",
      "answer": "but",
      "options": [
        "The meaning is now clear.",
        "but",
        "!!!",
        "very very"
      ],
      "id": "editing-proofreading-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Editing & Proofreading.",
      "answer": "The meaning is now clear.",
      "options": [
        "The meaning is now clear.",
        "The corrected sentence is",
        "edit sentences for grammar, clarity, and punctuation",
        "No ending needed."
      ],
      "id": "editing-proofreading-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: edit sentences for grammar, clarity, and punctuation.",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "but",
      "options": [
        "The meaning is now clear.",
        "edited sentence or paragraph",
        "but",
        "The corrected sentence is"
      ],
      "id": "editing-proofreading-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "The meaning is now clear.",
      "options": [
        "but",
        "The meaning is now clear.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "editing-proofreading-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "editing-proofreading-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "edited sentence or paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "edited sentence or paragraph",
        "random informal chat for every task"
      ],
      "id": "editing-proofreading-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "For example however because in conclusion.",
        "She does not like coffee, but she drinks tea every morning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "editing-proofreading-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Editing & Proofreading.",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "The corrected sentence is",
        "but",
        "Use punctuation only at the end of the course."
      ],
      "id": "editing-proofreading-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: find weak parts and choose a cleaner version.",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "The corrected sentence is",
      "options": [
        "The meaning is now clear.",
        "Check verb agreement, punctuation, and word order before submitting.",
        "The corrected sentence is",
        "but"
      ],
      "id": "editing-proofreading-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "but",
      "options": [
        "edited sentence or paragraph",
        "but",
        "there there",
        "grammar"
      ],
      "id": "editing-proofreading-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "She does not like coffee, but she drinks tea every morning.",
        "The corrected sentence is",
        "The meaning is now clear.",
        "No topic no sentence."
      ],
      "id": "editing-proofreading-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Check verb agreement, punctuation, and word order before submitting."
      ],
      "id": "editing-proofreading-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Melatih memperbaiki kalimat agar jelas dan akurat.",
      "answer": "edit sentences for grammar, clarity, and punctuation",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "editing-proofreading-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "edited sentence or paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "edited sentence or paragraph"
      ],
      "id": "editing-proofreading-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Read + identify issue + revise + check meaning.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "editing-proofreading-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "Writing is speak fast.",
        "She does not like coffee, but she drinks tea every morning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "editing-proofreading-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "edit sentences for grammar, clarity, and punctuation",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "find weak parts and choose a cleaner version",
        "Check verb agreement, punctuation, and word order before submitting.",
        "avoid the topic completely"
      ],
      "id": "editing-proofreading-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "The corrected sentence is",
        "but",
        "The meaning is now clear.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Editing & Proofreading.",
      "answer": "edited sentence or paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "edited sentence or paragraph",
        "casual phone call"
      ],
      "id": "editing-proofreading-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "And because but however.",
        "She does not like coffee, but she drinks tea every morning.",
        "The corrected sentence is",
        "The meaning is now clear."
      ],
      "id": "editing-proofreading-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "find weak parts and choose a cleaner version",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "editing-proofreading-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "The corrected sentence is",
      "options": [
        "The meaning is now clear.",
        "Finally, therefore, however,",
        "The corrected sentence is",
        "but"
      ],
      "id": "editing-proofreading-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "but",
      "options": [
        "Dear",
        "but",
        "The corrected sentence is",
        "The meaning is now clear."
      ],
      "id": "editing-proofreading-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "The meaning is now clear.",
      "options": [
        "The meaning is now clear.",
        "The corrected sentence is",
        "but",
        "Because and because."
      ],
      "id": "editing-proofreading-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "edit sentences for grammar, clarity, and punctuation",
        "edited sentence or paragraph",
        "write as many words as possible without checking",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: edited sentence or paragraph.",
      "answer": "The corrected sentence is",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "I not sure maybe.",
        "The corrected sentence is",
        "She does not like coffee, but she drinks tea every morning."
      ],
      "id": "editing-proofreading-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Read + identify issue + revise + check meaning.",
      "answer": "but",
      "options": [
        "The meaning is now clear.",
        "but",
        "!!!",
        "very very"
      ],
      "id": "editing-proofreading-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Editing & Proofreading.",
      "answer": "The meaning is now clear.",
      "options": [
        "The meaning is now clear.",
        "The corrected sentence is",
        "edit sentences for grammar, clarity, and punctuation",
        "No ending needed."
      ],
      "id": "editing-proofreading-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: edit sentences for grammar, clarity, and punctuation.",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "but",
      "options": [
        "The meaning is now clear.",
        "edited sentence or paragraph",
        "but",
        "The corrected sentence is"
      ],
      "id": "editing-proofreading-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "The meaning is now clear.",
      "options": [
        "but",
        "The meaning is now clear.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "editing-proofreading-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "editing-proofreading-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Read + identify issue + revise + check meaning.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Read + identify issue + revise + check meaning."
      ],
      "id": "editing-proofreading-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "edited sentence or paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "edited sentence or paragraph",
        "random informal chat for every task"
      ],
      "id": "editing-proofreading-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "For example however because in conclusion.",
        "She does not like coffee, but she drinks tea every morning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "editing-proofreading-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Editing & Proofreading.",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Check verb agreement, punctuation, and word order before submitting.",
        "The corrected sentence is",
        "but",
        "Use punctuation only at the end of the course."
      ],
      "id": "editing-proofreading-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: find weak parts and choose a cleaner version.",
      "answer": "find weak parts and choose a cleaner version",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "find weak parts and choose a cleaner version"
      ],
      "id": "editing-proofreading-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "The corrected sentence is",
      "options": [
        "The meaning is now clear.",
        "Check verb agreement, punctuation, and word order before submitting.",
        "The corrected sentence is",
        "but"
      ],
      "id": "editing-proofreading-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "but",
      "options": [
        "edited sentence or paragraph",
        "but",
        "there there",
        "grammar"
      ],
      "id": "editing-proofreading-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "She does not like coffee, but she drinks tea every morning.",
      "options": [
        "She does not like coffee, but she drinks tea every morning.",
        "The corrected sentence is",
        "The meaning is now clear.",
        "No topic no sentence."
      ],
      "id": "editing-proofreading-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Check verb agreement, punctuation, and word order before submitting.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Check verb agreement, punctuation, and word order before submitting."
      ],
      "id": "editing-proofreading-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik15Page() {
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
