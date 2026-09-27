import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "story-writing",
  "title": "Short Story",
  "description": "Menulis cerita pendek dengan awal, konflik, dan akhir.",
  "task": "write a short story based on a simple event",
  "goal": "show sequence, problem, and resolution",
  "format": "short narrative",
  "structure": "Beginning + problem + action + ending.",
  "sample": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
  "opening": "Last night,",
  "connector": "after that",
  "closing": "In the end, everything was fine.",
  "editingTip": "Keep the time order clear with words like first, then, and finally.",
  "topicNumber": 6
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis cerita pendek dengan awal, konflik, dan akhir.",
      "answer": "write a short story based on a simple event",
      "options": [
        "write a short story based on a simple event",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "story-writing-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "short narrative",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short narrative"
      ],
      "id": "story-writing-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Beginning + problem + action + ending.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "story-writing-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "Writing is speak fast.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "story-writing-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a short story based on a simple event",
      "options": [
        "write a short story based on a simple event",
        "show sequence, problem, and resolution",
        "Keep the time order clear with words like first, then, and finally.",
        "avoid the topic completely"
      ],
      "id": "story-writing-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "Last night,",
        "after that",
        "In the end, everything was fine.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Short Story.",
      "answer": "short narrative",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short narrative",
        "casual phone call"
      ],
      "id": "story-writing-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "And because but however.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Last night,",
        "In the end, everything was fine."
      ],
      "id": "story-writing-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "show sequence, problem, and resolution",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "story-writing-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "Last night,",
      "options": [
        "In the end, everything was fine.",
        "Finally, therefore, however,",
        "Last night,",
        "after that"
      ],
      "id": "story-writing-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "after that",
      "options": [
        "Dear",
        "after that",
        "Last night,",
        "In the end, everything was fine."
      ],
      "id": "story-writing-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "In the end, everything was fine.",
      "options": [
        "In the end, everything was fine.",
        "Last night,",
        "after that",
        "Because and because."
      ],
      "id": "story-writing-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "write a short story based on a simple event",
        "short narrative",
        "write as many words as possible without checking",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: short narrative.",
      "answer": "Last night,",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "I not sure maybe.",
        "Last night,",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook."
      ],
      "id": "story-writing-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Beginning + problem + action + ending.",
      "answer": "after that",
      "options": [
        "In the end, everything was fine.",
        "after that",
        "!!!",
        "very very"
      ],
      "id": "story-writing-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Short Story.",
      "answer": "In the end, everything was fine.",
      "options": [
        "In the end, everything was fine.",
        "Last night,",
        "write a short story based on a simple event",
        "No ending needed."
      ],
      "id": "story-writing-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a short story based on a simple event.",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "after that",
      "options": [
        "In the end, everything was fine.",
        "short narrative",
        "after that",
        "Last night,"
      ],
      "id": "story-writing-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "In the end, everything was fine.",
      "options": [
        "after that",
        "In the end, everything was fine.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "story-writing-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "story-writing-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "short narrative",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short narrative",
        "random informal chat for every task"
      ],
      "id": "story-writing-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "For example however because in conclusion.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "story-writing-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Short Story.",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "Last night,",
        "after that",
        "Use punctuation only at the end of the course."
      ],
      "id": "story-writing-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: show sequence, problem, and resolution.",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "Last night,",
      "options": [
        "In the end, everything was fine.",
        "Keep the time order clear with words like first, then, and finally.",
        "Last night,",
        "after that"
      ],
      "id": "story-writing-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "after that",
      "options": [
        "short narrative",
        "after that",
        "there there",
        "grammar"
      ],
      "id": "story-writing-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Last night,",
        "In the end, everything was fine.",
        "No topic no sentence."
      ],
      "id": "story-writing-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Keep the time order clear with words like first, then, and finally."
      ],
      "id": "story-writing-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis cerita pendek dengan awal, konflik, dan akhir.",
      "answer": "write a short story based on a simple event",
      "options": [
        "write a short story based on a simple event",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "story-writing-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "short narrative",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short narrative"
      ],
      "id": "story-writing-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Beginning + problem + action + ending.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "story-writing-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "Writing is speak fast.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "story-writing-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a short story based on a simple event",
      "options": [
        "write a short story based on a simple event",
        "show sequence, problem, and resolution",
        "Keep the time order clear with words like first, then, and finally.",
        "avoid the topic completely"
      ],
      "id": "story-writing-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "Last night,",
        "after that",
        "In the end, everything was fine.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Short Story.",
      "answer": "short narrative",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short narrative",
        "casual phone call"
      ],
      "id": "story-writing-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "And because but however.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Last night,",
        "In the end, everything was fine."
      ],
      "id": "story-writing-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "show sequence, problem, and resolution",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "story-writing-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "Last night,",
      "options": [
        "In the end, everything was fine.",
        "Finally, therefore, however,",
        "Last night,",
        "after that"
      ],
      "id": "story-writing-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "after that",
      "options": [
        "Dear",
        "after that",
        "Last night,",
        "In the end, everything was fine."
      ],
      "id": "story-writing-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "In the end, everything was fine.",
      "options": [
        "In the end, everything was fine.",
        "Last night,",
        "after that",
        "Because and because."
      ],
      "id": "story-writing-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "write a short story based on a simple event",
        "short narrative",
        "write as many words as possible without checking",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: short narrative.",
      "answer": "Last night,",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "I not sure maybe.",
        "Last night,",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook."
      ],
      "id": "story-writing-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Beginning + problem + action + ending.",
      "answer": "after that",
      "options": [
        "In the end, everything was fine.",
        "after that",
        "!!!",
        "very very"
      ],
      "id": "story-writing-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Short Story.",
      "answer": "In the end, everything was fine.",
      "options": [
        "In the end, everything was fine.",
        "Last night,",
        "write a short story based on a simple event",
        "No ending needed."
      ],
      "id": "story-writing-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a short story based on a simple event.",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "after that",
      "options": [
        "In the end, everything was fine.",
        "short narrative",
        "after that",
        "Last night,"
      ],
      "id": "story-writing-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "In the end, everything was fine.",
      "options": [
        "after that",
        "In the end, everything was fine.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "story-writing-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "story-writing-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Beginning + problem + action + ending.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Beginning + problem + action + ending."
      ],
      "id": "story-writing-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "short narrative",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short narrative",
        "random informal chat for every task"
      ],
      "id": "story-writing-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "For example however because in conclusion.",
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "story-writing-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Short Story.",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Keep the time order clear with words like first, then, and finally.",
        "Last night,",
        "after that",
        "Use punctuation only at the end of the course."
      ],
      "id": "story-writing-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: show sequence, problem, and resolution.",
      "answer": "show sequence, problem, and resolution",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "show sequence, problem, and resolution"
      ],
      "id": "story-writing-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "Last night,",
      "options": [
        "In the end, everything was fine.",
        "Keep the time order clear with words like first, then, and finally.",
        "Last night,",
        "after that"
      ],
      "id": "story-writing-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "after that",
      "options": [
        "short narrative",
        "after that",
        "there there",
        "grammar"
      ],
      "id": "story-writing-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
      "options": [
        "Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.",
        "Last night,",
        "In the end, everything was fine.",
        "No topic no sentence."
      ],
      "id": "story-writing-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Keep the time order clear with words like first, then, and finally.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Keep the time order clear with words like first, then, and finally."
      ],
      "id": "story-writing-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik6Page() {
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
