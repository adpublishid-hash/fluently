import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "compare-contrast",
  "title": "Compare & Contrast",
  "description": "Membandingkan dua hal dengan connector yang tepat.",
  "task": "write a paragraph comparing two options",
  "goal": "explain similarities and differences clearly",
  "format": "comparison paragraph",
  "structure": "Similarity + difference + preference or conclusion.",
  "sample": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
  "opening": "Both options",
  "connector": "however",
  "closing": "Overall, I prefer the second option.",
  "editingTip": "Use however for contrast and both for similarity.",
  "topicNumber": 7
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Membandingkan dua hal dengan connector yang tepat.",
      "answer": "write a paragraph comparing two options",
      "options": [
        "write a paragraph comparing two options",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "compare-contrast-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "comparison paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "comparison paragraph"
      ],
      "id": "compare-contrast-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Similarity + difference + preference or conclusion.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "compare-contrast-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "Writing is speak fast.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "compare-contrast-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a paragraph comparing two options",
      "options": [
        "write a paragraph comparing two options",
        "explain similarities and differences clearly",
        "Use however for contrast and both for similarity.",
        "avoid the topic completely"
      ],
      "id": "compare-contrast-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "Both options",
        "however",
        "Overall, I prefer the second option.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Compare & Contrast.",
      "answer": "comparison paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "comparison paragraph",
        "casual phone call"
      ],
      "id": "compare-contrast-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "And because but however.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Both options",
        "Overall, I prefer the second option."
      ],
      "id": "compare-contrast-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "explain similarities and differences clearly",
      "options": [
        "explain similarities and differences clearly",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "compare-contrast-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "Both options",
      "options": [
        "Overall, I prefer the second option.",
        "Finally, therefore, however,",
        "Both options",
        "however"
      ],
      "id": "compare-contrast-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "however",
      "options": [
        "Dear",
        "however",
        "Both options",
        "Overall, I prefer the second option."
      ],
      "id": "compare-contrast-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "Overall, I prefer the second option.",
        "Both options",
        "however",
        "Because and because."
      ],
      "id": "compare-contrast-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "explain similarities and differences clearly",
      "options": [
        "write a paragraph comparing two options",
        "comparison paragraph",
        "write as many words as possible without checking",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: comparison paragraph.",
      "answer": "Both options",
      "options": [
        "Use however for contrast and both for similarity.",
        "I not sure maybe.",
        "Both options",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable."
      ],
      "id": "compare-contrast-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Similarity + difference + preference or conclusion.",
      "answer": "however",
      "options": [
        "Overall, I prefer the second option.",
        "however",
        "!!!",
        "very very"
      ],
      "id": "compare-contrast-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Compare & Contrast.",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "Overall, I prefer the second option.",
        "Both options",
        "write a paragraph comparing two options",
        "No ending needed."
      ],
      "id": "compare-contrast-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a paragraph comparing two options.",
      "answer": "explain similarities and differences clearly",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "however",
      "options": [
        "Overall, I prefer the second option.",
        "comparison paragraph",
        "however",
        "Both options"
      ],
      "id": "compare-contrast-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "however",
        "Overall, I prefer the second option.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "compare-contrast-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Use however for contrast and both for similarity.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "compare-contrast-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "comparison paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "comparison paragraph",
        "random informal chat for every task"
      ],
      "id": "compare-contrast-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "For example however because in conclusion.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "compare-contrast-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Compare & Contrast.",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Use however for contrast and both for similarity.",
        "Both options",
        "however",
        "Use punctuation only at the end of the course."
      ],
      "id": "compare-contrast-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: explain similarities and differences clearly.",
      "answer": "explain similarities and differences clearly",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "Both options",
      "options": [
        "Overall, I prefer the second option.",
        "Use however for contrast and both for similarity.",
        "Both options",
        "however"
      ],
      "id": "compare-contrast-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "however",
      "options": [
        "comparison paragraph",
        "however",
        "there there",
        "grammar"
      ],
      "id": "compare-contrast-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Both options",
        "Overall, I prefer the second option.",
        "No topic no sentence."
      ],
      "id": "compare-contrast-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use however for contrast and both for similarity."
      ],
      "id": "compare-contrast-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Membandingkan dua hal dengan connector yang tepat.",
      "answer": "write a paragraph comparing two options",
      "options": [
        "write a paragraph comparing two options",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "compare-contrast-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "comparison paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "comparison paragraph"
      ],
      "id": "compare-contrast-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Similarity + difference + preference or conclusion.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "compare-contrast-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "Writing is speak fast.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "compare-contrast-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a paragraph comparing two options",
      "options": [
        "write a paragraph comparing two options",
        "explain similarities and differences clearly",
        "Use however for contrast and both for similarity.",
        "avoid the topic completely"
      ],
      "id": "compare-contrast-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "Both options",
        "however",
        "Overall, I prefer the second option.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Compare & Contrast.",
      "answer": "comparison paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "comparison paragraph",
        "casual phone call"
      ],
      "id": "compare-contrast-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "And because but however.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Both options",
        "Overall, I prefer the second option."
      ],
      "id": "compare-contrast-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "explain similarities and differences clearly",
      "options": [
        "explain similarities and differences clearly",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "compare-contrast-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "Both options",
      "options": [
        "Overall, I prefer the second option.",
        "Finally, therefore, however,",
        "Both options",
        "however"
      ],
      "id": "compare-contrast-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "however",
      "options": [
        "Dear",
        "however",
        "Both options",
        "Overall, I prefer the second option."
      ],
      "id": "compare-contrast-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "Overall, I prefer the second option.",
        "Both options",
        "however",
        "Because and because."
      ],
      "id": "compare-contrast-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "explain similarities and differences clearly",
      "options": [
        "write a paragraph comparing two options",
        "comparison paragraph",
        "write as many words as possible without checking",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: comparison paragraph.",
      "answer": "Both options",
      "options": [
        "Use however for contrast and both for similarity.",
        "I not sure maybe.",
        "Both options",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable."
      ],
      "id": "compare-contrast-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Similarity + difference + preference or conclusion.",
      "answer": "however",
      "options": [
        "Overall, I prefer the second option.",
        "however",
        "!!!",
        "very very"
      ],
      "id": "compare-contrast-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Compare & Contrast.",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "Overall, I prefer the second option.",
        "Both options",
        "write a paragraph comparing two options",
        "No ending needed."
      ],
      "id": "compare-contrast-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a paragraph comparing two options.",
      "answer": "explain similarities and differences clearly",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "however",
      "options": [
        "Overall, I prefer the second option.",
        "comparison paragraph",
        "however",
        "Both options"
      ],
      "id": "compare-contrast-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Overall, I prefer the second option.",
      "options": [
        "however",
        "Overall, I prefer the second option.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "compare-contrast-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Use however for contrast and both for similarity.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "compare-contrast-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Similarity + difference + preference or conclusion.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Similarity + difference + preference or conclusion."
      ],
      "id": "compare-contrast-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "comparison paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "comparison paragraph",
        "random informal chat for every task"
      ],
      "id": "compare-contrast-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "For example however because in conclusion.",
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "compare-contrast-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Compare & Contrast.",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Use however for contrast and both for similarity.",
        "Both options",
        "however",
        "Use punctuation only at the end of the course."
      ],
      "id": "compare-contrast-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: explain similarities and differences clearly.",
      "answer": "explain similarities and differences clearly",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "explain similarities and differences clearly"
      ],
      "id": "compare-contrast-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "Both options",
      "options": [
        "Overall, I prefer the second option.",
        "Use however for contrast and both for similarity.",
        "Both options",
        "however"
      ],
      "id": "compare-contrast-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "however",
      "options": [
        "comparison paragraph",
        "however",
        "there there",
        "grammar"
      ],
      "id": "compare-contrast-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
      "options": [
        "Both buses and trains are affordable. However, trains are usually faster and more comfortable.",
        "Both options",
        "Overall, I prefer the second option.",
        "No topic no sentence."
      ],
      "id": "compare-contrast-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Use however for contrast and both for similarity.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use however for contrast and both for similarity."
      ],
      "id": "compare-contrast-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik7Page() {
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
