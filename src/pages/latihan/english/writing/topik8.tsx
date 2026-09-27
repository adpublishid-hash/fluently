import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "problem-solution",
  "title": "Problem & Solution",
  "description": "Menulis masalah dan solusi dengan alur logis.",
  "task": "write about a problem and suggest a solution",
  "goal": "identify the issue, explain impact, and offer a practical fix",
  "format": "problem-solution paragraph",
  "structure": "Problem + effect + solution + expected result.",
  "sample": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
  "opening": "One common problem is",
  "connector": "as a result",
  "closing": "This solution can make the situation better.",
  "editingTip": "Connect the solution directly to the problem you introduced.",
  "topicNumber": 8
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis masalah dan solusi dengan alur logis.",
      "answer": "write about a problem and suggest a solution",
      "options": [
        "write about a problem and suggest a solution",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "problem-solution-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "problem-solution paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "problem-solution paragraph"
      ],
      "id": "problem-solution-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Problem + effect + solution + expected result.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "problem-solution-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "Writing is speak fast.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "problem-solution-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write about a problem and suggest a solution",
      "options": [
        "write about a problem and suggest a solution",
        "identify the issue, explain impact, and offer a practical fix",
        "Connect the solution directly to the problem you introduced.",
        "avoid the topic completely"
      ],
      "id": "problem-solution-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "One common problem is",
        "as a result",
        "This solution can make the situation better.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Problem & Solution.",
      "answer": "problem-solution paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "problem-solution paragraph",
        "casual phone call"
      ],
      "id": "problem-solution-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "And because but however.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "One common problem is",
        "This solution can make the situation better."
      ],
      "id": "problem-solution-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "identify the issue, explain impact, and offer a practical fix",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "problem-solution-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "One common problem is",
      "options": [
        "This solution can make the situation better.",
        "Finally, therefore, however,",
        "One common problem is",
        "as a result"
      ],
      "id": "problem-solution-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "as a result",
      "options": [
        "Dear",
        "as a result",
        "One common problem is",
        "This solution can make the situation better."
      ],
      "id": "problem-solution-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "This solution can make the situation better.",
      "options": [
        "This solution can make the situation better.",
        "One common problem is",
        "as a result",
        "Because and because."
      ],
      "id": "problem-solution-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "write about a problem and suggest a solution",
        "problem-solution paragraph",
        "write as many words as possible without checking",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: problem-solution paragraph.",
      "answer": "One common problem is",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "I not sure maybe.",
        "One common problem is",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime."
      ],
      "id": "problem-solution-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Problem + effect + solution + expected result.",
      "answer": "as a result",
      "options": [
        "This solution can make the situation better.",
        "as a result",
        "!!!",
        "very very"
      ],
      "id": "problem-solution-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Problem & Solution.",
      "answer": "This solution can make the situation better.",
      "options": [
        "This solution can make the situation better.",
        "One common problem is",
        "write about a problem and suggest a solution",
        "No ending needed."
      ],
      "id": "problem-solution-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write about a problem and suggest a solution.",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "as a result",
      "options": [
        "This solution can make the situation better.",
        "problem-solution paragraph",
        "as a result",
        "One common problem is"
      ],
      "id": "problem-solution-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "This solution can make the situation better.",
      "options": [
        "as a result",
        "This solution can make the situation better.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "problem-solution-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "problem-solution-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "problem-solution paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "problem-solution paragraph",
        "random informal chat for every task"
      ],
      "id": "problem-solution-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "For example however because in conclusion.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "problem-solution-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Problem & Solution.",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "One common problem is",
        "as a result",
        "Use punctuation only at the end of the course."
      ],
      "id": "problem-solution-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: identify the issue, explain impact, and offer a practical fix.",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "One common problem is",
      "options": [
        "This solution can make the situation better.",
        "Connect the solution directly to the problem you introduced.",
        "One common problem is",
        "as a result"
      ],
      "id": "problem-solution-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "as a result",
      "options": [
        "problem-solution paragraph",
        "as a result",
        "there there",
        "grammar"
      ],
      "id": "problem-solution-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "One common problem is",
        "This solution can make the situation better.",
        "No topic no sentence."
      ],
      "id": "problem-solution-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Connect the solution directly to the problem you introduced."
      ],
      "id": "problem-solution-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis masalah dan solusi dengan alur logis.",
      "answer": "write about a problem and suggest a solution",
      "options": [
        "write about a problem and suggest a solution",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "problem-solution-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "problem-solution paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "problem-solution paragraph"
      ],
      "id": "problem-solution-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Problem + effect + solution + expected result.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "problem-solution-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "Writing is speak fast.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "problem-solution-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write about a problem and suggest a solution",
      "options": [
        "write about a problem and suggest a solution",
        "identify the issue, explain impact, and offer a practical fix",
        "Connect the solution directly to the problem you introduced.",
        "avoid the topic completely"
      ],
      "id": "problem-solution-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "One common problem is",
        "as a result",
        "This solution can make the situation better.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Problem & Solution.",
      "answer": "problem-solution paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "problem-solution paragraph",
        "casual phone call"
      ],
      "id": "problem-solution-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "And because but however.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "One common problem is",
        "This solution can make the situation better."
      ],
      "id": "problem-solution-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "identify the issue, explain impact, and offer a practical fix",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "problem-solution-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "One common problem is",
      "options": [
        "This solution can make the situation better.",
        "Finally, therefore, however,",
        "One common problem is",
        "as a result"
      ],
      "id": "problem-solution-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "as a result",
      "options": [
        "Dear",
        "as a result",
        "One common problem is",
        "This solution can make the situation better."
      ],
      "id": "problem-solution-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "This solution can make the situation better.",
      "options": [
        "This solution can make the situation better.",
        "One common problem is",
        "as a result",
        "Because and because."
      ],
      "id": "problem-solution-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "write about a problem and suggest a solution",
        "problem-solution paragraph",
        "write as many words as possible without checking",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: problem-solution paragraph.",
      "answer": "One common problem is",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "I not sure maybe.",
        "One common problem is",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime."
      ],
      "id": "problem-solution-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Problem + effect + solution + expected result.",
      "answer": "as a result",
      "options": [
        "This solution can make the situation better.",
        "as a result",
        "!!!",
        "very very"
      ],
      "id": "problem-solution-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Problem & Solution.",
      "answer": "This solution can make the situation better.",
      "options": [
        "This solution can make the situation better.",
        "One common problem is",
        "write about a problem and suggest a solution",
        "No ending needed."
      ],
      "id": "problem-solution-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write about a problem and suggest a solution.",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "as a result",
      "options": [
        "This solution can make the situation better.",
        "problem-solution paragraph",
        "as a result",
        "One common problem is"
      ],
      "id": "problem-solution-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "This solution can make the situation better.",
      "options": [
        "as a result",
        "This solution can make the situation better.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "problem-solution-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "problem-solution-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Problem + effect + solution + expected result.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Problem + effect + solution + expected result."
      ],
      "id": "problem-solution-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "problem-solution paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "problem-solution paragraph",
        "random informal chat for every task"
      ],
      "id": "problem-solution-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "For example however because in conclusion.",
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "problem-solution-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Problem & Solution.",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Connect the solution directly to the problem you introduced.",
        "One common problem is",
        "as a result",
        "Use punctuation only at the end of the course."
      ],
      "id": "problem-solution-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: identify the issue, explain impact, and offer a practical fix.",
      "answer": "identify the issue, explain impact, and offer a practical fix",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "identify the issue, explain impact, and offer a practical fix"
      ],
      "id": "problem-solution-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "One common problem is",
      "options": [
        "This solution can make the situation better.",
        "Connect the solution directly to the problem you introduced.",
        "One common problem is",
        "as a result"
      ],
      "id": "problem-solution-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "as a result",
      "options": [
        "problem-solution paragraph",
        "as a result",
        "there there",
        "grammar"
      ],
      "id": "problem-solution-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
      "options": [
        "Many students feel tired because they sleep late. One solution is to set a regular bedtime.",
        "One common problem is",
        "This solution can make the situation better.",
        "No topic no sentence."
      ],
      "id": "problem-solution-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Connect the solution directly to the problem you introduced.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Connect the solution directly to the problem you introduced."
      ],
      "id": "problem-solution-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik8Page() {
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
