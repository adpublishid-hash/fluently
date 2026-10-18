import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "application-message",
  "title": "Application Message",
  "description": "Menulis pesan lamaran singkat dan meyakinkan.",
  "task": "write a short job or program application message",
  "goal": "introduce yourself, show interest, and mention relevant experience",
  "format": "application message",
  "structure": "Introduction + interest + relevant skill + closing.",
  "sample": "I am interested in applying for this position because I have experience in customer service and communication.",
  "opening": "I am writing to apply for",
  "connector": "because",
  "closing": "I look forward to your response.",
  "editingTip": "Mention one specific skill that matches the opportunity.",
  "topicNumber": 11
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis pesan lamaran singkat dan meyakinkan.",
      "answer": "write a short job or program application message",
      "options": [
        "write a short job or program application message",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "application-message-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "application message",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "application message"
      ],
      "id": "application-message-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Introduction + interest + relevant skill + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Introduction + interest + relevant skill + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "application-message-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "Writing is speak fast.",
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "application-message-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a short job or program application message",
      "options": [
        "write a short job or program application message",
        "introduce yourself, show interest, and mention relevant experience",
        "Mention one specific skill that matches the opportunity.",
        "avoid the topic completely"
      ],
      "id": "application-message-writing-4",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-5",
      "level": "Basic",
      "prompt": "Which opening line is best for an application message?",
      "answer": "My name is Rina, and I would like to apply for the cashier job.",
      "options": [
        "My name is Rina, and I would like to apply for the cashier job.",
        "I need money, so I want this job.",
        "Do you have any jobs at all? I can do almost anything you need, really.",
        "Hi, give me the job, please."
      ]
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Application Message.",
      "answer": "application message",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "application message",
        "casual phone call"
      ],
      "id": "application-message-writing-6",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-7",
      "level": "Basic",
      "prompt": "Which sentence mentions a relevant skill for a waiter job?",
      "answer": "I am friendly and good at working with customers.",
      "options": [
        "My favourite colours are blue, green and a bright shade of yellow.",
        "I like watching films at the weekend.",
        "I am friendly and good at working with customers.",
        "I have a younger sister and a pet cat at home."
      ]
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "introduce yourself, show interest, and mention relevant experience",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "application-message-writing-8",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-9",
      "level": "Basic",
      "prompt": "Choose the correct preposition: 'I have two years of experience ___ customer service.'",
      "answer": "in",
      "options": [
        "in",
        "by",
        "to",
        "on"
      ]
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "I am writing to apply for",
      "options": [
        "I look forward to your response.",
        "Finally, therefore, however,",
        "I am writing to apply for",
        "because"
      ],
      "id": "application-message-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "because",
      "options": [
        "Dear",
        "because",
        "I am writing to apply for",
        "I look forward to your response."
      ],
      "id": "application-message-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "I look forward to your response.",
      "options": [
        "I look forward to your response.",
        "I am writing to apply for",
        "because",
        "Because and because."
      ],
      "id": "application-message-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "write a short job or program application message",
        "application message",
        "write as many words as possible without checking",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: application message.",
      "answer": "I am writing to apply for",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "I not sure maybe.",
        "I am writing to apply for",
        "I am interested in applying for this position because I have experience in customer service and communication."
      ],
      "id": "application-message-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Introduction + interest + relevant skill + closing.",
      "answer": "because",
      "options": [
        "I look forward to your response.",
        "because",
        "!!!",
        "very very"
      ],
      "id": "application-message-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Application Message.",
      "answer": "I look forward to your response.",
      "options": [
        "I look forward to your response.",
        "I am writing to apply for",
        "write a short job or program application message",
        "No ending needed."
      ],
      "id": "application-message-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a short job or program application message.",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "application-message-writing-18",
      "level": "Intermediate",
      "prompt": "Which sentence best shows why you suit a library assistant role?",
      "answer": "I organised the book collection at my school library for two years.",
      "options": [
        "I organised the book collection at my school library for two years.",
        "I can work any time because I have nothing else to do now.",
        "I read some books last year and enjoyed most of them a lot.",
        "I have always liked libraries because they are quiet, calm and very nice places."
      ]
    },
    {
      "id": "application-message-writing-19",
      "level": "Intermediate",
      "prompt": "Which closing line is most professional for an application message?",
      "answer": "Thank you for considering my application.",
      "options": [
        "Please answer me fast because I am waiting.",
        "Hire me and you will not be sorry, trust me.",
        "That's all, bye for now and see you!",
        "Thank you for considering my application."
      ]
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "application-message-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Introduction + interest + relevant skill + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Introduction + interest + relevant skill + closing."
      ],
      "id": "application-message-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "application message",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "application message",
        "random informal chat for every task"
      ],
      "id": "application-message-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "For example however because in conclusion.",
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "application-message-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Application Message.",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "I am writing to apply for",
        "because",
        "Use punctuation only at the end of the course."
      ],
      "id": "application-message-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: introduce yourself, show interest, and mention relevant experience.",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "I am writing to apply for",
      "options": [
        "I look forward to your response.",
        "Mention one specific skill that matches the opportunity.",
        "I am writing to apply for",
        "because"
      ],
      "id": "application-message-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "because",
      "options": [
        "application message",
        "because",
        "there there",
        "grammar"
      ],
      "id": "application-message-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "I am writing to apply for",
        "I look forward to your response.",
        "No topic no sentence."
      ],
      "id": "application-message-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Mention one specific skill that matches the opportunity."
      ],
      "id": "application-message-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis pesan lamaran singkat dan meyakinkan.",
      "answer": "write a short job or program application message",
      "options": [
        "write a short job or program application message",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "application-message-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "application message",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "application message"
      ],
      "id": "application-message-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Introduction + interest + relevant skill + closing.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Introduction + interest + relevant skill + closing.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "application-message-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "Writing is speak fast.",
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "application-message-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a short job or program application message",
      "options": [
        "write a short job or program application message",
        "introduce yourself, show interest, and mention relevant experience",
        "Mention one specific skill that matches the opportunity.",
        "avoid the topic completely"
      ],
      "id": "application-message-writing-4",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-5",
      "level": "Basic",
      "prompt": "Kalimat pembuka mana yang paling tepat untuk pesan lamaran?",
      "answer": "My name is Rina, and I would like to apply for the cashier job.",
      "options": [
        "My name is Rina, and I would like to apply for the cashier job.",
        "I need money, so I want this job.",
        "Do you have any jobs at all? I can do almost anything you need, really.",
        "Hi, give me the job, please."
      ]
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Application Message.",
      "answer": "application message",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "application message",
        "casual phone call"
      ],
      "id": "application-message-writing-6",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-7",
      "level": "Basic",
      "prompt": "Kalimat mana yang menyebutkan keterampilan yang relevan untuk pekerjaan pelayan?",
      "answer": "I am friendly and good at working with customers.",
      "options": [
        "My favourite colours are blue, green and a bright shade of yellow.",
        "I like watching films at the weekend.",
        "I am friendly and good at working with customers.",
        "I have a younger sister and a pet cat at home."
      ]
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "introduce yourself, show interest, and mention relevant experience",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "application-message-writing-8",
      "level": "Basic"
    },
    {
      "id": "application-message-writing-9",
      "level": "Basic",
      "prompt": "Pilih preposisi yang benar: 'I have two years of experience ___ customer service.'",
      "answer": "in",
      "options": [
        "in",
        "by",
        "to",
        "on"
      ]
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "I am writing to apply for",
      "options": [
        "I look forward to your response.",
        "Finally, therefore, however,",
        "I am writing to apply for",
        "because"
      ],
      "id": "application-message-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "because",
      "options": [
        "Dear",
        "because",
        "I am writing to apply for",
        "I look forward to your response."
      ],
      "id": "application-message-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "I look forward to your response.",
      "options": [
        "I look forward to your response.",
        "I am writing to apply for",
        "because",
        "Because and because."
      ],
      "id": "application-message-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "write a short job or program application message",
        "application message",
        "write as many words as possible without checking",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: application message.",
      "answer": "I am writing to apply for",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "I not sure maybe.",
        "I am writing to apply for",
        "I am interested in applying for this position because I have experience in customer service and communication."
      ],
      "id": "application-message-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Introduction + interest + relevant skill + closing.",
      "answer": "because",
      "options": [
        "I look forward to your response.",
        "because",
        "!!!",
        "very very"
      ],
      "id": "application-message-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Application Message.",
      "answer": "I look forward to your response.",
      "options": [
        "I look forward to your response.",
        "I am writing to apply for",
        "write a short job or program application message",
        "No ending needed."
      ],
      "id": "application-message-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a short job or program application message.",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "application-message-writing-18",
      "level": "Intermediate",
      "prompt": "Kalimat mana yang paling baik menunjukkan bahwa Anda cocok untuk posisi asisten perpustakaan?",
      "answer": "I organised the book collection at my school library for two years.",
      "options": [
        "I organised the book collection at my school library for two years.",
        "I can work any time because I have nothing else to do now.",
        "I read some books last year and enjoyed most of them a lot.",
        "I have always liked libraries because they are quiet, calm and very nice places."
      ]
    },
    {
      "id": "application-message-writing-19",
      "level": "Intermediate",
      "prompt": "Kalimat penutup mana yang paling profesional untuk pesan lamaran?",
      "answer": "Thank you for considering my application.",
      "options": [
        "Please answer me fast because I am waiting.",
        "Hire me and you will not be sorry, trust me.",
        "That's all, bye for now and see you!",
        "Thank you for considering my application."
      ]
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "application-message-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Introduction + interest + relevant skill + closing.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Introduction + interest + relevant skill + closing."
      ],
      "id": "application-message-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "application message",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "application message",
        "random informal chat for every task"
      ],
      "id": "application-message-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "For example however because in conclusion.",
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "application-message-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Application Message.",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Mention one specific skill that matches the opportunity.",
        "I am writing to apply for",
        "because",
        "Use punctuation only at the end of the course."
      ],
      "id": "application-message-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: introduce yourself, show interest, and mention relevant experience.",
      "answer": "introduce yourself, show interest, and mention relevant experience",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "introduce yourself, show interest, and mention relevant experience"
      ],
      "id": "application-message-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "I am writing to apply for",
      "options": [
        "I look forward to your response.",
        "Mention one specific skill that matches the opportunity.",
        "I am writing to apply for",
        "because"
      ],
      "id": "application-message-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "because",
      "options": [
        "application message",
        "because",
        "there there",
        "grammar"
      ],
      "id": "application-message-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "I am interested in applying for this position because I have experience in customer service and communication.",
      "options": [
        "I am interested in applying for this position because I have experience in customer service and communication.",
        "I am writing to apply for",
        "I look forward to your response.",
        "No topic no sentence."
      ],
      "id": "application-message-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Mention one specific skill that matches the opportunity.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Mention one specific skill that matches the opportunity."
      ],
      "id": "application-message-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik11Page() {
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
