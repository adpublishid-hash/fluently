import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "email-request",
  "title": "Email Request",
  "description": "Menulis email permintaan dengan sopan dan rapi.",
  "task": "write a polite email asking for help or information",
  "goal": "state the request clearly and close politely",
  "format": "short formal email",
  "structure": "Greeting + reason + request + thanks + closing.",
  "sample": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
  "opening": "Dear Sir or Madam,",
  "connector": "I am writing to",
  "closing": "Thank you for your time.",
  "editingTip": "Keep the request direct, polite, and easy to answer.",
  "topicNumber": 3
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis email permintaan dengan sopan dan rapi.",
      "answer": "write a polite email asking for help or information",
      "options": [
        "write a polite email asking for help or information",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "email-request-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "short formal email",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short formal email"
      ],
      "id": "email-request-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Greeting + reason + request + thanks + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "email-request-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "Writing is speak fast.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "email-request-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a polite email asking for help or information",
      "options": [
        "write a polite email asking for help or information",
        "state the request clearly and close politely",
        "Keep the request direct, polite, and easy to answer.",
        "avoid the topic completely"
      ],
      "id": "email-request-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "Dear Sir or Madam,",
        "I am writing to",
        "Thank you for your time.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Email Request.",
      "answer": "short formal email",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short formal email",
        "casual phone call"
      ],
      "id": "email-request-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "And because but however.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Dear Sir or Madam,",
        "Thank you for your time."
      ],
      "id": "email-request-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "state the request clearly and close politely",
      "options": [
        "state the request clearly and close politely",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "email-request-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Thank you for your time.",
        "Finally, therefore, however,",
        "Dear Sir or Madam,",
        "I am writing to"
      ],
      "id": "email-request-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "I am writing to",
      "options": [
        "Dear",
        "I am writing to",
        "Dear Sir or Madam,",
        "Thank you for your time."
      ],
      "id": "email-request-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Thank you for your time.",
      "options": [
        "Thank you for your time.",
        "Dear Sir or Madam,",
        "I am writing to",
        "Because and because."
      ],
      "id": "email-request-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "state the request clearly and close politely",
      "options": [
        "write a polite email asking for help or information",
        "short formal email",
        "write as many words as possible without checking",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: short formal email.",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "I not sure maybe.",
        "Dear Sir or Madam,",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help."
      ],
      "id": "email-request-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Greeting + reason + request + thanks + closing.",
      "answer": "I am writing to",
      "options": [
        "Thank you for your time.",
        "I am writing to",
        "!!!",
        "very very"
      ],
      "id": "email-request-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Email Request.",
      "answer": "Thank you for your time.",
      "options": [
        "Thank you for your time.",
        "Dear Sir or Madam,",
        "write a polite email asking for help or information",
        "No ending needed."
      ],
      "id": "email-request-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a polite email asking for help or information.",
      "answer": "state the request clearly and close politely",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "I am writing to",
      "options": [
        "Thank you for your time.",
        "short formal email",
        "I am writing to",
        "Dear Sir or Madam,"
      ],
      "id": "email-request-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Thank you for your time.",
      "options": [
        "I am writing to",
        "Thank you for your time.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "email-request-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "email-request-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "short formal email",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short formal email",
        "random informal chat for every task"
      ],
      "id": "email-request-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "For example however because in conclusion.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "email-request-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Email Request.",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "Dear Sir or Madam,",
        "I am writing to",
        "Use punctuation only at the end of the course."
      ],
      "id": "email-request-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: state the request clearly and close politely.",
      "answer": "state the request clearly and close politely",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Thank you for your time.",
        "Keep the request direct, polite, and easy to answer.",
        "Dear Sir or Madam,",
        "I am writing to"
      ],
      "id": "email-request-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "I am writing to",
      "options": [
        "short formal email",
        "I am writing to",
        "there there",
        "grammar"
      ],
      "id": "email-request-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Dear Sir or Madam,",
        "Thank you for your time.",
        "No topic no sentence."
      ],
      "id": "email-request-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Keep the request direct, polite, and easy to answer."
      ],
      "id": "email-request-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis email permintaan dengan sopan dan rapi.",
      "answer": "write a polite email asking for help or information",
      "options": [
        "write a polite email asking for help or information",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "email-request-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "short formal email",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short formal email"
      ],
      "id": "email-request-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Greeting + reason + request + thanks + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "email-request-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "Writing is speak fast.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "email-request-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a polite email asking for help or information",
      "options": [
        "write a polite email asking for help or information",
        "state the request clearly and close politely",
        "Keep the request direct, polite, and easy to answer.",
        "avoid the topic completely"
      ],
      "id": "email-request-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "Dear Sir or Madam,",
        "I am writing to",
        "Thank you for your time.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Email Request.",
      "answer": "short formal email",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short formal email",
        "casual phone call"
      ],
      "id": "email-request-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "And because but however.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Dear Sir or Madam,",
        "Thank you for your time."
      ],
      "id": "email-request-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "state the request clearly and close politely",
      "options": [
        "state the request clearly and close politely",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "email-request-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Thank you for your time.",
        "Finally, therefore, however,",
        "Dear Sir or Madam,",
        "I am writing to"
      ],
      "id": "email-request-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "I am writing to",
      "options": [
        "Dear",
        "I am writing to",
        "Dear Sir or Madam,",
        "Thank you for your time."
      ],
      "id": "email-request-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Thank you for your time.",
      "options": [
        "Thank you for your time.",
        "Dear Sir or Madam,",
        "I am writing to",
        "Because and because."
      ],
      "id": "email-request-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "state the request clearly and close politely",
      "options": [
        "write a polite email asking for help or information",
        "short formal email",
        "write as many words as possible without checking",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: short formal email.",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "I not sure maybe.",
        "Dear Sir or Madam,",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help."
      ],
      "id": "email-request-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Greeting + reason + request + thanks + closing.",
      "answer": "I am writing to",
      "options": [
        "Thank you for your time.",
        "I am writing to",
        "!!!",
        "very very"
      ],
      "id": "email-request-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Email Request.",
      "answer": "Thank you for your time.",
      "options": [
        "Thank you for your time.",
        "Dear Sir or Madam,",
        "write a polite email asking for help or information",
        "No ending needed."
      ],
      "id": "email-request-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a polite email asking for help or information.",
      "answer": "state the request clearly and close politely",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "I am writing to",
      "options": [
        "Thank you for your time.",
        "short formal email",
        "I am writing to",
        "Dear Sir or Madam,"
      ],
      "id": "email-request-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Thank you for your time.",
      "options": [
        "I am writing to",
        "Thank you for your time.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "email-request-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "email-request-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Greeting + reason + request + thanks + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Greeting + reason + request + thanks + closing."
      ],
      "id": "email-request-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "short formal email",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short formal email",
        "random informal chat for every task"
      ],
      "id": "email-request-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "For example however because in conclusion.",
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "email-request-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Email Request.",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Keep the request direct, polite, and easy to answer.",
        "Dear Sir or Madam,",
        "I am writing to",
        "Use punctuation only at the end of the course."
      ],
      "id": "email-request-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: state the request clearly and close politely.",
      "answer": "state the request clearly and close politely",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "state the request clearly and close politely"
      ],
      "id": "email-request-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "Dear Sir or Madam,",
      "options": [
        "Thank you for your time.",
        "Keep the request direct, polite, and easy to answer.",
        "Dear Sir or Madam,",
        "I am writing to"
      ],
      "id": "email-request-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "I am writing to",
      "options": [
        "short formal email",
        "I am writing to",
        "there there",
        "grammar"
      ],
      "id": "email-request-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
      "options": [
        "Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.",
        "Dear Sir or Madam,",
        "Thank you for your time.",
        "No topic no sentence."
      ],
      "id": "email-request-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Keep the request direct, polite, and easy to answer.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Keep the request direct, polite, and easy to answer."
      ],
      "id": "email-request-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik3Page() {
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
