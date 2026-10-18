import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "opinion-paragraph",
  "title": "Opinion Paragraph",
  "description": "Menulis pendapat dengan alasan dan contoh.",
  "task": "write one paragraph giving your opinion",
  "goal": "state an opinion, support it, and add an example",
  "format": "opinion paragraph",
  "structure": "Opinion + reason + example + concluding sentence.",
  "sample": "I think online learning is useful because it is flexible. For example, students can study from home.",
  "opening": "In my opinion,",
  "connector": "for example",
  "closing": "For these reasons, I agree with this idea.",
  "editingTip": "Make sure your reason clearly supports your opinion.",
  "topicNumber": 4
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis pendapat dengan alasan dan contoh.",
      "answer": "write one paragraph giving your opinion",
      "options": [
        "write one paragraph giving your opinion",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "opinion-paragraph-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "opinion paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "opinion paragraph"
      ],
      "id": "opinion-paragraph-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Opinion + reason + example + concluding sentence.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Opinion + reason + example + concluding sentence.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "opinion-paragraph-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "Writing is speak fast.",
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "opinion-paragraph-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write one paragraph giving your opinion",
      "options": [
        "write one paragraph giving your opinion",
        "state an opinion, support it, and add an example",
        "Make sure your reason clearly supports your opinion.",
        "avoid the topic completely"
      ],
      "id": "opinion-paragraph-writing-4",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-5",
      "level": "Basic",
      "prompt": "Which sentence clearly states an opinion?",
      "answer": "I believe school uniforms are a good idea.",
      "options": [
        "Uniforms are usually blue or white.",
        "Students wear uniforms from Monday to Friday.",
        "Many schools in Indonesia have uniforms.",
        "I believe school uniforms are a good idea."
      ]
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Opinion Paragraph.",
      "answer": "opinion paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "opinion paragraph",
        "casual phone call"
      ],
      "id": "opinion-paragraph-writing-6",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-7",
      "level": "Basic",
      "prompt": "Choose the best word to introduce a reason: 'I like cycling ___ it keeps me healthy.'",
      "answer": "because",
      "options": [
        "but",
        "or",
        "because",
        "although"
      ]
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "state an opinion, support it, and add an example",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "opinion-paragraph-writing-8",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-9",
      "level": "Basic",
      "prompt": "Which phrase is used to give an opinion?",
      "answer": "I think that",
      "options": [
        "Once upon a time",
        "Dear Sir or Madam",
        "Yours sincerely",
        "I think that"
      ]
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "In my opinion,",
      "options": [
        "For these reasons, I agree with this idea.",
        "Finally, therefore, however,",
        "In my opinion,",
        "for example"
      ],
      "id": "opinion-paragraph-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "for example",
      "options": [
        "Dear",
        "for example",
        "In my opinion,",
        "For these reasons, I agree with this idea."
      ],
      "id": "opinion-paragraph-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "For these reasons, I agree with this idea.",
      "options": [
        "For these reasons, I agree with this idea.",
        "In my opinion,",
        "for example",
        "Because and because."
      ],
      "id": "opinion-paragraph-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "write one paragraph giving your opinion",
        "opinion paragraph",
        "write as many words as possible without checking",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: opinion paragraph.",
      "answer": "In my opinion,",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "I not sure maybe.",
        "In my opinion,",
        "I think online learning is useful because it is flexible. For example, students can study from home."
      ],
      "id": "opinion-paragraph-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Opinion + reason + example + concluding sentence.",
      "answer": "for example",
      "options": [
        "For these reasons, I agree with this idea.",
        "for example",
        "!!!",
        "very very"
      ],
      "id": "opinion-paragraph-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Opinion Paragraph.",
      "answer": "For these reasons, I agree with this idea.",
      "options": [
        "For these reasons, I agree with this idea.",
        "In my opinion,",
        "write one paragraph giving your opinion",
        "No ending needed."
      ],
      "id": "opinion-paragraph-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write one paragraph giving your opinion.",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "opinion-paragraph-writing-18",
      "level": "Intermediate",
      "prompt": "Which example best supports this opinion? 'Public libraries are still important today.'",
      "answer": "For example, they offer free internet to people without it at home.",
      "options": [
        "For example, many people prefer to buy books online these days.",
        "For example, they offer free internet to people without it at home.",
        "For example, some libraries have very old wooden doors and big windows.",
        "For example, I visited a library once when I was a small child."
      ]
    },
    {
      "id": "opinion-paragraph-writing-19",
      "level": "Intermediate",
      "prompt": "Which concluding sentence best fits an opinion paragraph about working from home?",
      "answer": "Overall, working from home saves time and improves balance.",
      "options": [
        "Overall, working from home saves time and improves balance.",
        "Many people work from home, and many people do not.",
        "Also, some offices have a free coffee machine for staff.",
        "Overall, I am not really sure what I think about this topic at all."
      ]
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "opinion-paragraph-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Opinion + reason + example + concluding sentence.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Opinion + reason + example + concluding sentence."
      ],
      "id": "opinion-paragraph-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "opinion paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "opinion paragraph",
        "random informal chat for every task"
      ],
      "id": "opinion-paragraph-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "For example however because in conclusion.",
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "opinion-paragraph-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Opinion Paragraph.",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "In my opinion,",
        "for example",
        "Use punctuation only at the end of the course."
      ],
      "id": "opinion-paragraph-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: state an opinion, support it, and add an example.",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "In my opinion,",
      "options": [
        "For these reasons, I agree with this idea.",
        "Make sure your reason clearly supports your opinion.",
        "In my opinion,",
        "for example"
      ],
      "id": "opinion-paragraph-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "for example",
      "options": [
        "opinion paragraph",
        "for example",
        "there there",
        "grammar"
      ],
      "id": "opinion-paragraph-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "In my opinion,",
        "For these reasons, I agree with this idea.",
        "No topic no sentence."
      ],
      "id": "opinion-paragraph-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Make sure your reason clearly supports your opinion."
      ],
      "id": "opinion-paragraph-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis pendapat dengan alasan dan contoh.",
      "answer": "write one paragraph giving your opinion",
      "options": [
        "write one paragraph giving your opinion",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "opinion-paragraph-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "opinion paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "opinion paragraph"
      ],
      "id": "opinion-paragraph-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Opinion + reason + example + concluding sentence.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Opinion + reason + example + concluding sentence.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "opinion-paragraph-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "Writing is speak fast.",
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "opinion-paragraph-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write one paragraph giving your opinion",
      "options": [
        "write one paragraph giving your opinion",
        "state an opinion, support it, and add an example",
        "Make sure your reason clearly supports your opinion.",
        "avoid the topic completely"
      ],
      "id": "opinion-paragraph-writing-4",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-5",
      "level": "Basic",
      "prompt": "Kalimat mana yang jelas menyatakan pendapat?",
      "answer": "I believe school uniforms are a good idea.",
      "options": [
        "Uniforms are usually blue or white.",
        "Students wear uniforms from Monday to Friday.",
        "Many schools in Indonesia have uniforms.",
        "I believe school uniforms are a good idea."
      ]
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Opinion Paragraph.",
      "answer": "opinion paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "opinion paragraph",
        "casual phone call"
      ],
      "id": "opinion-paragraph-writing-6",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-7",
      "level": "Basic",
      "prompt": "Pilih kata terbaik untuk memperkenalkan alasan: 'I like cycling ___ it keeps me healthy.'",
      "answer": "because",
      "options": [
        "but",
        "or",
        "because",
        "although"
      ]
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "state an opinion, support it, and add an example",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "opinion-paragraph-writing-8",
      "level": "Basic"
    },
    {
      "id": "opinion-paragraph-writing-9",
      "level": "Basic",
      "prompt": "Frasa mana yang digunakan untuk memberikan pendapat?",
      "answer": "I think that",
      "options": [
        "Once upon a time",
        "Dear Sir or Madam",
        "Yours sincerely",
        "I think that"
      ]
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "In my opinion,",
      "options": [
        "For these reasons, I agree with this idea.",
        "Finally, therefore, however,",
        "In my opinion,",
        "for example"
      ],
      "id": "opinion-paragraph-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "for example",
      "options": [
        "Dear",
        "for example",
        "In my opinion,",
        "For these reasons, I agree with this idea."
      ],
      "id": "opinion-paragraph-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "For these reasons, I agree with this idea.",
      "options": [
        "For these reasons, I agree with this idea.",
        "In my opinion,",
        "for example",
        "Because and because."
      ],
      "id": "opinion-paragraph-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "write one paragraph giving your opinion",
        "opinion paragraph",
        "write as many words as possible without checking",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: opinion paragraph.",
      "answer": "In my opinion,",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "I not sure maybe.",
        "In my opinion,",
        "I think online learning is useful because it is flexible. For example, students can study from home."
      ],
      "id": "opinion-paragraph-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Opinion + reason + example + concluding sentence.",
      "answer": "for example",
      "options": [
        "For these reasons, I agree with this idea.",
        "for example",
        "!!!",
        "very very"
      ],
      "id": "opinion-paragraph-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Opinion Paragraph.",
      "answer": "For these reasons, I agree with this idea.",
      "options": [
        "For these reasons, I agree with this idea.",
        "In my opinion,",
        "write one paragraph giving your opinion",
        "No ending needed."
      ],
      "id": "opinion-paragraph-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write one paragraph giving your opinion.",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "opinion-paragraph-writing-18",
      "level": "Intermediate",
      "prompt": "Contoh mana yang paling mendukung pendapat ini? 'Public libraries are still important today.'",
      "answer": "For example, they offer free internet to people without it at home.",
      "options": [
        "For example, many people prefer to buy books online these days.",
        "For example, they offer free internet to people without it at home.",
        "For example, some libraries have very old wooden doors and big windows.",
        "For example, I visited a library once when I was a small child."
      ]
    },
    {
      "id": "opinion-paragraph-writing-19",
      "level": "Intermediate",
      "prompt": "Kalimat penutup mana yang paling sesuai untuk paragraf opini tentang bekerja dari rumah?",
      "answer": "Overall, working from home saves time and improves balance.",
      "options": [
        "Overall, working from home saves time and improves balance.",
        "Many people work from home, and many people do not.",
        "Also, some offices have a free coffee machine for staff.",
        "Overall, I am not really sure what I think about this topic at all."
      ]
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "opinion-paragraph-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Opinion + reason + example + concluding sentence.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Opinion + reason + example + concluding sentence."
      ],
      "id": "opinion-paragraph-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "opinion paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "opinion paragraph",
        "random informal chat for every task"
      ],
      "id": "opinion-paragraph-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "For example however because in conclusion.",
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "opinion-paragraph-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Opinion Paragraph.",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Make sure your reason clearly supports your opinion.",
        "In my opinion,",
        "for example",
        "Use punctuation only at the end of the course."
      ],
      "id": "opinion-paragraph-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: state an opinion, support it, and add an example.",
      "answer": "state an opinion, support it, and add an example",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "state an opinion, support it, and add an example"
      ],
      "id": "opinion-paragraph-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "In my opinion,",
      "options": [
        "For these reasons, I agree with this idea.",
        "Make sure your reason clearly supports your opinion.",
        "In my opinion,",
        "for example"
      ],
      "id": "opinion-paragraph-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "for example",
      "options": [
        "opinion paragraph",
        "for example",
        "there there",
        "grammar"
      ],
      "id": "opinion-paragraph-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "I think online learning is useful because it is flexible. For example, students can study from home.",
      "options": [
        "I think online learning is useful because it is flexible. For example, students can study from home.",
        "In my opinion,",
        "For these reasons, I agree with this idea.",
        "No topic no sentence."
      ],
      "id": "opinion-paragraph-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Make sure your reason clearly supports your opinion.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Make sure your reason clearly supports your opinion."
      ],
      "id": "opinion-paragraph-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik4Page() {
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
