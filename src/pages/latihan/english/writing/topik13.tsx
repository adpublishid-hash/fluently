import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "academic-summary",
  "title": "Academic Summary",
  "description": "Merangkum teks akademik dengan singkat dan objektif.",
  "task": "write a brief summary of a text or idea",
  "goal": "capture the main idea without personal opinion",
  "format": "academic summary",
  "structure": "Source/topic + main idea + key point + result.",
  "sample": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
  "opening": "The text explains that",
  "connector": "in addition",
  "closing": "Overall, the main point is clear.",
  "editingTip": "Do not add personal opinions in a summary unless asked.",
  "topicNumber": 13
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Merangkum teks akademik dengan singkat dan objektif.",
      "answer": "write a brief summary of a text or idea",
      "options": [
        "write a brief summary of a text or idea",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "academic-summary-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "academic summary",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "academic summary"
      ],
      "id": "academic-summary-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Source/topic + main idea + key point + result.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "academic-summary-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "Writing is speak fast.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "academic-summary-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a brief summary of a text or idea",
      "options": [
        "write a brief summary of a text or idea",
        "capture the main idea without personal opinion",
        "Do not add personal opinions in a summary unless asked.",
        "avoid the topic completely"
      ],
      "id": "academic-summary-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "The text explains that",
        "in addition",
        "Overall, the main point is clear.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Academic Summary.",
      "answer": "academic summary",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "academic summary",
        "casual phone call"
      ],
      "id": "academic-summary-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "And because but however.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "The text explains that",
        "Overall, the main point is clear."
      ],
      "id": "academic-summary-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "capture the main idea without personal opinion",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "academic-summary-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "The text explains that",
      "options": [
        "Overall, the main point is clear.",
        "Finally, therefore, however,",
        "The text explains that",
        "in addition"
      ],
      "id": "academic-summary-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "in addition",
      "options": [
        "Dear",
        "in addition",
        "The text explains that",
        "Overall, the main point is clear."
      ],
      "id": "academic-summary-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Overall, the main point is clear.",
      "options": [
        "Overall, the main point is clear.",
        "The text explains that",
        "in addition",
        "Because and because."
      ],
      "id": "academic-summary-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "write a brief summary of a text or idea",
        "academic summary",
        "write as many words as possible without checking",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: academic summary.",
      "answer": "The text explains that",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "I not sure maybe.",
        "The text explains that",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning."
      ],
      "id": "academic-summary-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Source/topic + main idea + key point + result.",
      "answer": "in addition",
      "options": [
        "Overall, the main point is clear.",
        "in addition",
        "!!!",
        "very very"
      ],
      "id": "academic-summary-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Academic Summary.",
      "answer": "Overall, the main point is clear.",
      "options": [
        "Overall, the main point is clear.",
        "The text explains that",
        "write a brief summary of a text or idea",
        "No ending needed."
      ],
      "id": "academic-summary-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a brief summary of a text or idea.",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "in addition",
      "options": [
        "Overall, the main point is clear.",
        "academic summary",
        "in addition",
        "The text explains that"
      ],
      "id": "academic-summary-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Overall, the main point is clear.",
      "options": [
        "in addition",
        "Overall, the main point is clear.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "academic-summary-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "academic-summary-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "academic summary",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "academic summary",
        "random informal chat for every task"
      ],
      "id": "academic-summary-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "For example however because in conclusion.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "academic-summary-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Academic Summary.",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "The text explains that",
        "in addition",
        "Use punctuation only at the end of the course."
      ],
      "id": "academic-summary-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: capture the main idea without personal opinion.",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "The text explains that",
      "options": [
        "Overall, the main point is clear.",
        "Do not add personal opinions in a summary unless asked.",
        "The text explains that",
        "in addition"
      ],
      "id": "academic-summary-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "in addition",
      "options": [
        "academic summary",
        "in addition",
        "there there",
        "grammar"
      ],
      "id": "academic-summary-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "The text explains that",
        "Overall, the main point is clear.",
        "No topic no sentence."
      ],
      "id": "academic-summary-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Do not add personal opinions in a summary unless asked."
      ],
      "id": "academic-summary-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Merangkum teks akademik dengan singkat dan objektif.",
      "answer": "write a brief summary of a text or idea",
      "options": [
        "write a brief summary of a text or idea",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "academic-summary-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "academic summary",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "academic summary"
      ],
      "id": "academic-summary-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Source/topic + main idea + key point + result.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "academic-summary-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "Writing is speak fast.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "academic-summary-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a brief summary of a text or idea",
      "options": [
        "write a brief summary of a text or idea",
        "capture the main idea without personal opinion",
        "Do not add personal opinions in a summary unless asked.",
        "avoid the topic completely"
      ],
      "id": "academic-summary-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "The text explains that",
        "in addition",
        "Overall, the main point is clear.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Academic Summary.",
      "answer": "academic summary",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "academic summary",
        "casual phone call"
      ],
      "id": "academic-summary-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "And because but however.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "The text explains that",
        "Overall, the main point is clear."
      ],
      "id": "academic-summary-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "capture the main idea without personal opinion",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "academic-summary-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "The text explains that",
      "options": [
        "Overall, the main point is clear.",
        "Finally, therefore, however,",
        "The text explains that",
        "in addition"
      ],
      "id": "academic-summary-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "in addition",
      "options": [
        "Dear",
        "in addition",
        "The text explains that",
        "Overall, the main point is clear."
      ],
      "id": "academic-summary-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Overall, the main point is clear.",
      "options": [
        "Overall, the main point is clear.",
        "The text explains that",
        "in addition",
        "Because and because."
      ],
      "id": "academic-summary-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "write a brief summary of a text or idea",
        "academic summary",
        "write as many words as possible without checking",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: academic summary.",
      "answer": "The text explains that",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "I not sure maybe.",
        "The text explains that",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning."
      ],
      "id": "academic-summary-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Source/topic + main idea + key point + result.",
      "answer": "in addition",
      "options": [
        "Overall, the main point is clear.",
        "in addition",
        "!!!",
        "very very"
      ],
      "id": "academic-summary-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Academic Summary.",
      "answer": "Overall, the main point is clear.",
      "options": [
        "Overall, the main point is clear.",
        "The text explains that",
        "write a brief summary of a text or idea",
        "No ending needed."
      ],
      "id": "academic-summary-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a brief summary of a text or idea.",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "in addition",
      "options": [
        "Overall, the main point is clear.",
        "academic summary",
        "in addition",
        "The text explains that"
      ],
      "id": "academic-summary-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Overall, the main point is clear.",
      "options": [
        "in addition",
        "Overall, the main point is clear.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "academic-summary-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "academic-summary-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Source/topic + main idea + key point + result.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Source/topic + main idea + key point + result."
      ],
      "id": "academic-summary-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "academic summary",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "academic summary",
        "random informal chat for every task"
      ],
      "id": "academic-summary-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "For example however because in conclusion.",
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "academic-summary-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Academic Summary.",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Do not add personal opinions in a summary unless asked.",
        "The text explains that",
        "in addition",
        "Use punctuation only at the end of the course."
      ],
      "id": "academic-summary-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: capture the main idea without personal opinion.",
      "answer": "capture the main idea without personal opinion",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "capture the main idea without personal opinion"
      ],
      "id": "academic-summary-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "The text explains that",
      "options": [
        "Overall, the main point is clear.",
        "Do not add personal opinions in a summary unless asked.",
        "The text explains that",
        "in addition"
      ],
      "id": "academic-summary-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "in addition",
      "options": [
        "academic summary",
        "in addition",
        "there there",
        "grammar"
      ],
      "id": "academic-summary-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
      "options": [
        "The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.",
        "The text explains that",
        "Overall, the main point is clear.",
        "No topic no sentence."
      ],
      "id": "academic-summary-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Do not add personal opinions in a summary unless asked.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Do not add personal opinions in a summary unless asked."
      ],
      "id": "academic-summary-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik13Page() {
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
