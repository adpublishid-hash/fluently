import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "formal-letter",
  "title": "Formal Letter",
  "description": "Menulis surat formal dengan nada profesional.",
  "task": "write a formal letter for an official purpose",
  "goal": "use formal tone, clear purpose, and polite closing",
  "format": "formal letter",
  "structure": "Salutation + purpose + details + request + closing.",
  "sample": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
  "opening": "Dear Manager,",
  "connector": "regarding",
  "closing": "Sincerely,",
  "editingTip": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
  "topicNumber": 10
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis surat formal dengan nada profesional.",
      "answer": "write a formal letter for an official purpose",
      "options": [
        "write a formal letter for an official purpose",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "formal-letter-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "formal letter",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "formal letter"
      ],
      "id": "formal-letter-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Salutation + purpose + details + request + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Salutation + purpose + details + request + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "formal-letter-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "Writing is speak fast.",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "formal-letter-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a formal letter for an official purpose",
      "options": [
        "write a formal letter for an official purpose",
        "use formal tone, clear purpose, and polite closing",
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "avoid the topic completely"
      ],
      "id": "formal-letter-writing-4",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-5",
      "level": "Basic",
      "prompt": "Which salutation is best when you do not know the reader's name?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Hey there,",
        "Dear Sir or Madam,",
        "Yo, manager!",
        "To whoever reads this thing,"
      ]
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Formal Letter.",
      "answer": "formal letter",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "formal letter",
        "casual phone call"
      ],
      "id": "formal-letter-writing-6",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-7",
      "level": "Basic",
      "prompt": "Which closing matches a formal letter that starts 'Dear Mr Hall,'?",
      "answer": "Yours sincerely,",
      "options": [
        "Cheers,",
        "See you soon, mate,",
        "Love,",
        "Yours sincerely,"
      ]
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "use formal tone, clear purpose, and polite closing",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "formal-letter-writing-8",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-9",
      "level": "Basic",
      "prompt": "Which sentence is written in a formal tone?",
      "answer": "I would like to request a meeting with you.",
      "options": [
        "I wanna meet you, OK?",
        "I would like to request a meeting with you.",
        "Gonna need a quick meeting with you, thanks a lot.",
        "Can we hang out and chat soon?"
      ]
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "Dear Manager,",
      "options": [
        "Sincerely,",
        "Finally, therefore, however,",
        "Dear Manager,",
        "regarding"
      ],
      "id": "formal-letter-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "regarding",
      "options": [
        "Dear",
        "regarding",
        "Dear Manager,",
        "Sincerely,"
      ],
      "id": "formal-letter-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Sincerely,",
      "options": [
        "Sincerely,",
        "Dear Manager,",
        "regarding",
        "Because and because."
      ],
      "id": "formal-letter-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "write a formal letter for an official purpose",
        "formal letter",
        "write as many words as possible without checking",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: formal letter.",
      "answer": "Dear Manager,",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "I not sure maybe.",
        "Dear Manager,",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase."
      ],
      "id": "formal-letter-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Salutation + purpose + details + request + closing.",
      "answer": "regarding",
      "options": [
        "Sincerely,",
        "regarding",
        "!!!",
        "very very"
      ],
      "id": "formal-letter-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Formal Letter.",
      "answer": "Sincerely,",
      "options": [
        "Sincerely,",
        "Dear Manager,",
        "write a formal letter for an official purpose",
        "No ending needed."
      ],
      "id": "formal-letter-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a formal letter for an official purpose.",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "formal-letter-writing-18",
      "level": "Intermediate",
      "prompt": "Which sentence states the purpose of the letter most clearly?",
      "answer": "I am writing to apply for a refund on order 4512.",
      "options": [
        "I am writing because of some things that happened.",
        "Please find my thoughts on various matters below.",
        "I would like to tell you about my week and my order.",
        "I am writing to apply for a refund on order 4512."
      ]
    },
    {
      "id": "formal-letter-writing-19",
      "level": "Intermediate",
      "prompt": "Which revision makes this line more formal? Draft: 'Thanks a lot, can't wait to hear back!'",
      "answer": "Thank you for your attention; I look forward to your reply.",
      "options": [
        "Thank you for your attention; I look forward to your reply.",
        "Cheers for that, hope to hear back from you soon, mate.",
        "Thanks a lot, can't wait to hear back from you soon!",
        "Thanks so much, I really can't wait to hear back from you all!"
      ]
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "formal-letter-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Salutation + purpose + details + request + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Salutation + purpose + details + request + closing."
      ],
      "id": "formal-letter-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "formal letter",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "formal letter",
        "random informal chat for every task"
      ],
      "id": "formal-letter-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "For example however because in conclusion.",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "formal-letter-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Formal Letter.",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Dear Manager,",
        "regarding",
        "Use punctuation only at the end of the course."
      ],
      "id": "formal-letter-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: use formal tone, clear purpose, and polite closing.",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "Dear Manager,",
      "options": [
        "Sincerely,",
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Dear Manager,",
        "regarding"
      ],
      "id": "formal-letter-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "regarding",
      "options": [
        "formal letter",
        "regarding",
        "there there",
        "grammar"
      ],
      "id": "formal-letter-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "Dear Manager,",
        "Sincerely,",
        "No topic no sentence."
      ],
      "id": "formal-letter-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Avoid casual contractions like wanna, gonna, or thanks a lot."
      ],
      "id": "formal-letter-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis surat formal dengan nada profesional.",
      "answer": "write a formal letter for an official purpose",
      "options": [
        "write a formal letter for an official purpose",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "formal-letter-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "formal letter",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "formal letter"
      ],
      "id": "formal-letter-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Salutation + purpose + details + request + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Salutation + purpose + details + request + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "formal-letter-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "Writing is speak fast.",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "formal-letter-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a formal letter for an official purpose",
      "options": [
        "write a formal letter for an official purpose",
        "use formal tone, clear purpose, and polite closing",
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "avoid the topic completely"
      ],
      "id": "formal-letter-writing-4",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-5",
      "level": "Basic",
      "prompt": "Salam pembuka mana yang paling tepat jika Anda tidak tahu nama pembaca?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Hey there,",
        "Dear Sir or Madam,",
        "Yo, manager!",
        "To whoever reads this thing,"
      ]
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Formal Letter.",
      "answer": "formal letter",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "formal letter",
        "casual phone call"
      ],
      "id": "formal-letter-writing-6",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-7",
      "level": "Basic",
      "prompt": "Penutup mana yang cocok untuk surat formal yang diawali 'Dear Mr Hall,'?",
      "answer": "Yours sincerely,",
      "options": [
        "Cheers,",
        "See you soon, mate,",
        "Love,",
        "Yours sincerely,"
      ]
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "use formal tone, clear purpose, and polite closing",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "formal-letter-writing-8",
      "level": "Basic"
    },
    {
      "id": "formal-letter-writing-9",
      "level": "Basic",
      "prompt": "Kalimat mana yang ditulis dengan nada formal?",
      "answer": "I would like to request a meeting with you.",
      "options": [
        "I wanna meet you, OK?",
        "I would like to request a meeting with you.",
        "Gonna need a quick meeting with you, thanks a lot.",
        "Can we hang out and chat soon?"
      ]
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "Dear Manager,",
      "options": [
        "Sincerely,",
        "Finally, therefore, however,",
        "Dear Manager,",
        "regarding"
      ],
      "id": "formal-letter-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "regarding",
      "options": [
        "Dear",
        "regarding",
        "Dear Manager,",
        "Sincerely,"
      ],
      "id": "formal-letter-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Sincerely,",
      "options": [
        "Sincerely,",
        "Dear Manager,",
        "regarding",
        "Because and because."
      ],
      "id": "formal-letter-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "write a formal letter for an official purpose",
        "formal letter",
        "write as many words as possible without checking",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: formal letter.",
      "answer": "Dear Manager,",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "I not sure maybe.",
        "Dear Manager,",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase."
      ],
      "id": "formal-letter-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Salutation + purpose + details + request + closing.",
      "answer": "regarding",
      "options": [
        "Sincerely,",
        "regarding",
        "!!!",
        "very very"
      ],
      "id": "formal-letter-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Formal Letter.",
      "answer": "Sincerely,",
      "options": [
        "Sincerely,",
        "Dear Manager,",
        "write a formal letter for an official purpose",
        "No ending needed."
      ],
      "id": "formal-letter-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a formal letter for an official purpose.",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "formal-letter-writing-18",
      "level": "Intermediate",
      "prompt": "Kalimat mana yang menyatakan tujuan surat dengan paling jelas?",
      "answer": "I am writing to apply for a refund on order 4512.",
      "options": [
        "I am writing because of some things that happened.",
        "Please find my thoughts on various matters below.",
        "I would like to tell you about my week and my order.",
        "I am writing to apply for a refund on order 4512."
      ]
    },
    {
      "id": "formal-letter-writing-19",
      "level": "Intermediate",
      "prompt": "Revisi mana yang membuat kalimat ini lebih formal? Draft: 'Thanks a lot, can't wait to hear back!'",
      "answer": "Thank you for your attention; I look forward to your reply.",
      "options": [
        "Thank you for your attention; I look forward to your reply.",
        "Cheers for that, hope to hear back from you soon, mate.",
        "Thanks a lot, can't wait to hear back from you soon!",
        "Thanks so much, I really can't wait to hear back from you all!"
      ]
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "formal-letter-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Salutation + purpose + details + request + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Salutation + purpose + details + request + closing."
      ],
      "id": "formal-letter-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "formal letter",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "formal letter",
        "random informal chat for every task"
      ],
      "id": "formal-letter-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "For example however because in conclusion.",
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "formal-letter-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Formal Letter.",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Dear Manager,",
        "regarding",
        "Use punctuation only at the end of the course."
      ],
      "id": "formal-letter-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: use formal tone, clear purpose, and polite closing.",
      "answer": "use formal tone, clear purpose, and polite closing",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "use formal tone, clear purpose, and polite closing"
      ],
      "id": "formal-letter-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "Dear Manager,",
      "options": [
        "Sincerely,",
        "Avoid casual contractions like wanna, gonna, or thanks a lot.",
        "Dear Manager,",
        "regarding"
      ],
      "id": "formal-letter-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "regarding",
      "options": [
        "formal letter",
        "regarding",
        "there there",
        "grammar"
      ],
      "id": "formal-letter-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
      "options": [
        "Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.",
        "Dear Manager,",
        "Sincerely,",
        "No topic no sentence."
      ],
      "id": "formal-letter-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Avoid casual contractions like wanna, gonna, or thanks a lot.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Avoid casual contractions like wanna, gonna, or thanks a lot."
      ],
      "id": "formal-letter-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik10Page() {
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
