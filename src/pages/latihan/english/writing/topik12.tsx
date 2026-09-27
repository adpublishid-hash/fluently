import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "review-writing",
  "title": "Review Writing",
  "description": "Menulis ulasan produk, tempat, atau pengalaman.",
  "task": "write a balanced review",
  "goal": "describe experience, mention strengths, and give a recommendation",
  "format": "review paragraph",
  "structure": "Item + experience + positive/negative points + recommendation.",
  "sample": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
  "opening": "I recently tried",
  "connector": "however",
  "closing": "I would recommend it to people who enjoy quiet places.",
  "editingTip": "Balance praise with one useful detail or limitation.",
  "topicNumber": 12
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis ulasan produk, tempat, atau pengalaman.",
      "answer": "write a balanced review",
      "options": [
        "write a balanced review",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "review-writing-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "review paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "review paragraph"
      ],
      "id": "review-writing-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Item + experience + positive/negative points + recommendation.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "review-writing-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "Writing is speak fast.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "review-writing-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a balanced review",
      "options": [
        "write a balanced review",
        "describe experience, mention strengths, and give a recommendation",
        "Balance praise with one useful detail or limitation.",
        "avoid the topic completely"
      ],
      "id": "review-writing-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "I recently tried",
        "however",
        "I would recommend it to people who enjoy quiet places.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Review Writing.",
      "answer": "review paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "review paragraph",
        "casual phone call"
      ],
      "id": "review-writing-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "And because but however.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places."
      ],
      "id": "review-writing-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "describe experience, mention strengths, and give a recommendation",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "review-writing-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "I recently tried",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "Finally, therefore, however,",
        "I recently tried",
        "however"
      ],
      "id": "review-writing-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "however",
      "options": [
        "Dear",
        "however",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places."
      ],
      "id": "review-writing-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "I recently tried",
        "however",
        "Because and because."
      ],
      "id": "review-writing-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "write a balanced review",
        "review paragraph",
        "write as many words as possible without checking",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: review paragraph.",
      "answer": "I recently tried",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "I not sure maybe.",
        "I recently tried",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long."
      ],
      "id": "review-writing-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Item + experience + positive/negative points + recommendation.",
      "answer": "however",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "however",
        "!!!",
        "very very"
      ],
      "id": "review-writing-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Review Writing.",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "I recently tried",
        "write a balanced review",
        "No ending needed."
      ],
      "id": "review-writing-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a balanced review.",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "however",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "review paragraph",
        "however",
        "I recently tried"
      ],
      "id": "review-writing-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "however",
        "I would recommend it to people who enjoy quiet places.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "review-writing-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "review-writing-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "review paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "review paragraph",
        "random informal chat for every task"
      ],
      "id": "review-writing-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "For example however because in conclusion.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "review-writing-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Review Writing.",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "I recently tried",
        "however",
        "Use punctuation only at the end of the course."
      ],
      "id": "review-writing-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: describe experience, mention strengths, and give a recommendation.",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "I recently tried",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "Balance praise with one useful detail or limitation.",
        "I recently tried",
        "however"
      ],
      "id": "review-writing-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "however",
      "options": [
        "review paragraph",
        "however",
        "there there",
        "grammar"
      ],
      "id": "review-writing-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places.",
        "No topic no sentence."
      ],
      "id": "review-writing-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Balance praise with one useful detail or limitation."
      ],
      "id": "review-writing-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis ulasan produk, tempat, atau pengalaman.",
      "answer": "write a balanced review",
      "options": [
        "write a balanced review",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "review-writing-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "review paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "review paragraph"
      ],
      "id": "review-writing-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Item + experience + positive/negative points + recommendation.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "review-writing-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "Writing is speak fast.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "review-writing-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a balanced review",
      "options": [
        "write a balanced review",
        "describe experience, mention strengths, and give a recommendation",
        "Balance praise with one useful detail or limitation.",
        "avoid the topic completely"
      ],
      "id": "review-writing-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "I recently tried",
        "however",
        "I would recommend it to people who enjoy quiet places.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Review Writing.",
      "answer": "review paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "review paragraph",
        "casual phone call"
      ],
      "id": "review-writing-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "And because but however.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places."
      ],
      "id": "review-writing-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "describe experience, mention strengths, and give a recommendation",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "review-writing-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "I recently tried",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "Finally, therefore, however,",
        "I recently tried",
        "however"
      ],
      "id": "review-writing-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "however",
      "options": [
        "Dear",
        "however",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places."
      ],
      "id": "review-writing-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "I recently tried",
        "however",
        "Because and because."
      ],
      "id": "review-writing-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "write a balanced review",
        "review paragraph",
        "write as many words as possible without checking",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: review paragraph.",
      "answer": "I recently tried",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "I not sure maybe.",
        "I recently tried",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long."
      ],
      "id": "review-writing-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Item + experience + positive/negative points + recommendation.",
      "answer": "however",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "however",
        "!!!",
        "very very"
      ],
      "id": "review-writing-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Review Writing.",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "I recently tried",
        "write a balanced review",
        "No ending needed."
      ],
      "id": "review-writing-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a balanced review.",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "however",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "review paragraph",
        "however",
        "I recently tried"
      ],
      "id": "review-writing-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "I would recommend it to people who enjoy quiet places.",
      "options": [
        "however",
        "I would recommend it to people who enjoy quiet places.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "review-writing-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "review-writing-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Item + experience + positive/negative points + recommendation.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Item + experience + positive/negative points + recommendation."
      ],
      "id": "review-writing-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "review paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "review paragraph",
        "random informal chat for every task"
      ],
      "id": "review-writing-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "For example however because in conclusion.",
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "review-writing-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Review Writing.",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Balance praise with one useful detail or limitation.",
        "I recently tried",
        "however",
        "Use punctuation only at the end of the course."
      ],
      "id": "review-writing-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: describe experience, mention strengths, and give a recommendation.",
      "answer": "describe experience, mention strengths, and give a recommendation",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe experience, mention strengths, and give a recommendation"
      ],
      "id": "review-writing-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "I recently tried",
      "options": [
        "I would recommend it to people who enjoy quiet places.",
        "Balance praise with one useful detail or limitation.",
        "I recently tried",
        "however"
      ],
      "id": "review-writing-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "however",
      "options": [
        "review paragraph",
        "however",
        "there there",
        "grammar"
      ],
      "id": "review-writing-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
      "options": [
        "The restaurant has friendly service and fresh food. However, the waiting time was a little long.",
        "I recently tried",
        "I would recommend it to people who enjoy quiet places.",
        "No topic no sentence."
      ],
      "id": "review-writing-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Balance praise with one useful detail or limitation.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Balance praise with one useful detail or limitation."
      ],
      "id": "review-writing-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik12Page() {
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
