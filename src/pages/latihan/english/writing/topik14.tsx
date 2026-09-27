import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "argument-essay",
  "title": "Argument Essay",
  "description": "Menulis argumen dengan thesis, alasan, dan counterpoint.",
  "task": "write a short argumentative essay response",
  "goal": "present a claim, support it, and address another view",
  "format": "argument essay paragraph",
  "structure": "Thesis + reason + evidence/example + counterpoint + conclusion.",
  "sample": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
  "opening": "This essay argues that",
  "connector": "on the other hand",
  "closing": "Therefore, this approach is reasonable.",
  "editingTip": "Make the thesis specific enough to guide the whole paragraph.",
  "topicNumber": 14
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis argumen dengan thesis, alasan, dan counterpoint.",
      "answer": "write a short argumentative essay response",
      "options": [
        "write a short argumentative essay response",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "argument-essay-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "argument essay paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "argument essay paragraph"
      ],
      "id": "argument-essay-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Thesis + reason + evidence/example + counterpoint + conclusion.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "argument-essay-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "Writing is speak fast.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "argument-essay-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a short argumentative essay response",
      "options": [
        "write a short argumentative essay response",
        "present a claim, support it, and address another view",
        "Make the thesis specific enough to guide the whole paragraph.",
        "avoid the topic completely"
      ],
      "id": "argument-essay-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "This essay argues that",
        "on the other hand",
        "Therefore, this approach is reasonable.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Argument Essay.",
      "answer": "argument essay paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "argument essay paragraph",
        "casual phone call"
      ],
      "id": "argument-essay-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "And because but however.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "This essay argues that",
        "Therefore, this approach is reasonable."
      ],
      "id": "argument-essay-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "present a claim, support it, and address another view",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "argument-essay-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "This essay argues that",
      "options": [
        "Therefore, this approach is reasonable.",
        "Finally, therefore, however,",
        "This essay argues that",
        "on the other hand"
      ],
      "id": "argument-essay-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "on the other hand",
      "options": [
        "Dear",
        "on the other hand",
        "This essay argues that",
        "Therefore, this approach is reasonable."
      ],
      "id": "argument-essay-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "Therefore, this approach is reasonable.",
        "This essay argues that",
        "on the other hand",
        "Because and because."
      ],
      "id": "argument-essay-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "write a short argumentative essay response",
        "argument essay paragraph",
        "write as many words as possible without checking",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: argument essay paragraph.",
      "answer": "This essay argues that",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "I not sure maybe.",
        "This essay argues that",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance."
      ],
      "id": "argument-essay-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Thesis + reason + evidence/example + counterpoint + conclusion.",
      "answer": "on the other hand",
      "options": [
        "Therefore, this approach is reasonable.",
        "on the other hand",
        "!!!",
        "very very"
      ],
      "id": "argument-essay-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Argument Essay.",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "Therefore, this approach is reasonable.",
        "This essay argues that",
        "write a short argumentative essay response",
        "No ending needed."
      ],
      "id": "argument-essay-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a short argumentative essay response.",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "on the other hand",
      "options": [
        "Therefore, this approach is reasonable.",
        "argument essay paragraph",
        "on the other hand",
        "This essay argues that"
      ],
      "id": "argument-essay-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "on the other hand",
        "Therefore, this approach is reasonable.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "argument-essay-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "argument-essay-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "argument essay paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "argument essay paragraph",
        "random informal chat for every task"
      ],
      "id": "argument-essay-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "For example however because in conclusion.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "argument-essay-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Argument Essay.",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "This essay argues that",
        "on the other hand",
        "Use punctuation only at the end of the course."
      ],
      "id": "argument-essay-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: present a claim, support it, and address another view.",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "This essay argues that",
      "options": [
        "Therefore, this approach is reasonable.",
        "Make the thesis specific enough to guide the whole paragraph.",
        "This essay argues that",
        "on the other hand"
      ],
      "id": "argument-essay-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "on the other hand",
      "options": [
        "argument essay paragraph",
        "on the other hand",
        "there there",
        "grammar"
      ],
      "id": "argument-essay-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "This essay argues that",
        "Therefore, this approach is reasonable.",
        "No topic no sentence."
      ],
      "id": "argument-essay-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Make the thesis specific enough to guide the whole paragraph."
      ],
      "id": "argument-essay-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis argumen dengan thesis, alasan, dan counterpoint.",
      "answer": "write a short argumentative essay response",
      "options": [
        "write a short argumentative essay response",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "argument-essay-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "argument essay paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "argument essay paragraph"
      ],
      "id": "argument-essay-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Thesis + reason + evidence/example + counterpoint + conclusion.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "argument-essay-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "Writing is speak fast.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "argument-essay-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a short argumentative essay response",
      "options": [
        "write a short argumentative essay response",
        "present a claim, support it, and address another view",
        "Make the thesis specific enough to guide the whole paragraph.",
        "avoid the topic completely"
      ],
      "id": "argument-essay-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "This essay argues that",
        "on the other hand",
        "Therefore, this approach is reasonable.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Argument Essay.",
      "answer": "argument essay paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "argument essay paragraph",
        "casual phone call"
      ],
      "id": "argument-essay-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "And because but however.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "This essay argues that",
        "Therefore, this approach is reasonable."
      ],
      "id": "argument-essay-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "present a claim, support it, and address another view",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "argument-essay-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "This essay argues that",
      "options": [
        "Therefore, this approach is reasonable.",
        "Finally, therefore, however,",
        "This essay argues that",
        "on the other hand"
      ],
      "id": "argument-essay-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "on the other hand",
      "options": [
        "Dear",
        "on the other hand",
        "This essay argues that",
        "Therefore, this approach is reasonable."
      ],
      "id": "argument-essay-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "Therefore, this approach is reasonable.",
        "This essay argues that",
        "on the other hand",
        "Because and because."
      ],
      "id": "argument-essay-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "write a short argumentative essay response",
        "argument essay paragraph",
        "write as many words as possible without checking",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: argument essay paragraph.",
      "answer": "This essay argues that",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "I not sure maybe.",
        "This essay argues that",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance."
      ],
      "id": "argument-essay-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Thesis + reason + evidence/example + counterpoint + conclusion.",
      "answer": "on the other hand",
      "options": [
        "Therefore, this approach is reasonable.",
        "on the other hand",
        "!!!",
        "very very"
      ],
      "id": "argument-essay-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Argument Essay.",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "Therefore, this approach is reasonable.",
        "This essay argues that",
        "write a short argumentative essay response",
        "No ending needed."
      ],
      "id": "argument-essay-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a short argumentative essay response.",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "on the other hand",
      "options": [
        "Therefore, this approach is reasonable.",
        "argument essay paragraph",
        "on the other hand",
        "This essay argues that"
      ],
      "id": "argument-essay-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "Therefore, this approach is reasonable.",
      "options": [
        "on the other hand",
        "Therefore, this approach is reasonable.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "argument-essay-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "argument-essay-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Thesis + reason + evidence/example + counterpoint + conclusion.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Thesis + reason + evidence/example + counterpoint + conclusion."
      ],
      "id": "argument-essay-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "argument essay paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "argument essay paragraph",
        "random informal chat for every task"
      ],
      "id": "argument-essay-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "For example however because in conclusion.",
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "argument-essay-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Argument Essay.",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Make the thesis specific enough to guide the whole paragraph.",
        "This essay argues that",
        "on the other hand",
        "Use punctuation only at the end of the course."
      ],
      "id": "argument-essay-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: present a claim, support it, and address another view.",
      "answer": "present a claim, support it, and address another view",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "present a claim, support it, and address another view"
      ],
      "id": "argument-essay-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "This essay argues that",
      "options": [
        "Therefore, this approach is reasonable.",
        "Make the thesis specific enough to guide the whole paragraph.",
        "This essay argues that",
        "on the other hand"
      ],
      "id": "argument-essay-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "on the other hand",
      "options": [
        "argument essay paragraph",
        "on the other hand",
        "there there",
        "grammar"
      ],
      "id": "argument-essay-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
      "options": [
        "Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.",
        "This essay argues that",
        "Therefore, this approach is reasonable.",
        "No topic no sentence."
      ],
      "id": "argument-essay-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Make the thesis specific enough to guide the whole paragraph.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Make the thesis specific enough to guide the whole paragraph."
      ],
      "id": "argument-essay-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik14Page() {
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
