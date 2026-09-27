import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "descriptive-place",
  "title": "Describing a Place",
  "description": "Mendeskripsikan tempat dengan detail sensorik.",
  "task": "write a description of a place you know",
  "goal": "describe location, appearance, and atmosphere",
  "format": "descriptive paragraph",
  "structure": "Place + details + atmosphere + personal impression.",
  "sample": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
  "opening": "One place I like is",
  "connector": "also",
  "closing": "That is why I enjoy going there.",
  "editingTip": "Use specific adjectives instead of vague words like nice or good.",
  "topicNumber": 5
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Mendeskripsikan tempat dengan detail sensorik.",
      "answer": "write a description of a place you know",
      "options": [
        "write a description of a place you know",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "descriptive-place-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "descriptive paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "descriptive paragraph"
      ],
      "id": "descriptive-place-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Place + details + atmosphere + personal impression.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "descriptive-place-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "Writing is speak fast.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "descriptive-place-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a description of a place you know",
      "options": [
        "write a description of a place you know",
        "describe location, appearance, and atmosphere",
        "Use specific adjectives instead of vague words like nice or good.",
        "avoid the topic completely"
      ],
      "id": "descriptive-place-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "One place I like is",
        "also",
        "That is why I enjoy going there.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Describing a Place.",
      "answer": "descriptive paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "descriptive paragraph",
        "casual phone call"
      ],
      "id": "descriptive-place-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "And because but however.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "One place I like is",
        "That is why I enjoy going there."
      ],
      "id": "descriptive-place-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "describe location, appearance, and atmosphere",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "descriptive-place-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "One place I like is",
      "options": [
        "That is why I enjoy going there.",
        "Finally, therefore, however,",
        "One place I like is",
        "also"
      ],
      "id": "descriptive-place-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "also",
      "options": [
        "Dear",
        "also",
        "One place I like is",
        "That is why I enjoy going there."
      ],
      "id": "descriptive-place-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "That is why I enjoy going there.",
      "options": [
        "That is why I enjoy going there.",
        "One place I like is",
        "also",
        "Because and because."
      ],
      "id": "descriptive-place-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "write a description of a place you know",
        "descriptive paragraph",
        "write as many words as possible without checking",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: descriptive paragraph.",
      "answer": "One place I like is",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "I not sure maybe.",
        "One place I like is",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music."
      ],
      "id": "descriptive-place-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Place + details + atmosphere + personal impression.",
      "answer": "also",
      "options": [
        "That is why I enjoy going there.",
        "also",
        "!!!",
        "very very"
      ],
      "id": "descriptive-place-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Describing a Place.",
      "answer": "That is why I enjoy going there.",
      "options": [
        "That is why I enjoy going there.",
        "One place I like is",
        "write a description of a place you know",
        "No ending needed."
      ],
      "id": "descriptive-place-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a description of a place you know.",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "also",
      "options": [
        "That is why I enjoy going there.",
        "descriptive paragraph",
        "also",
        "One place I like is"
      ],
      "id": "descriptive-place-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "That is why I enjoy going there.",
      "options": [
        "also",
        "That is why I enjoy going there.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "descriptive-place-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "descriptive-place-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "descriptive paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "descriptive paragraph",
        "random informal chat for every task"
      ],
      "id": "descriptive-place-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "For example however because in conclusion.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "descriptive-place-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Describing a Place.",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "One place I like is",
        "also",
        "Use punctuation only at the end of the course."
      ],
      "id": "descriptive-place-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: describe location, appearance, and atmosphere.",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "One place I like is",
      "options": [
        "That is why I enjoy going there.",
        "Use specific adjectives instead of vague words like nice or good.",
        "One place I like is",
        "also"
      ],
      "id": "descriptive-place-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "also",
      "options": [
        "descriptive paragraph",
        "also",
        "there there",
        "grammar"
      ],
      "id": "descriptive-place-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "One place I like is",
        "That is why I enjoy going there.",
        "No topic no sentence."
      ],
      "id": "descriptive-place-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use specific adjectives instead of vague words like nice or good."
      ],
      "id": "descriptive-place-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Mendeskripsikan tempat dengan detail sensorik.",
      "answer": "write a description of a place you know",
      "options": [
        "write a description of a place you know",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "descriptive-place-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "descriptive paragraph",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "descriptive paragraph"
      ],
      "id": "descriptive-place-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Place + details + atmosphere + personal impression.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "descriptive-place-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "Writing is speak fast.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "descriptive-place-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a description of a place you know",
      "options": [
        "write a description of a place you know",
        "describe location, appearance, and atmosphere",
        "Use specific adjectives instead of vague words like nice or good.",
        "avoid the topic completely"
      ],
      "id": "descriptive-place-writing-4",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "One place I like is",
        "also",
        "That is why I enjoy going there.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-5",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Describing a Place.",
      "answer": "descriptive paragraph",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "descriptive paragraph",
        "casual phone call"
      ],
      "id": "descriptive-place-writing-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "And because but however.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "One place I like is",
        "That is why I enjoy going there."
      ],
      "id": "descriptive-place-writing-7",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "describe location, appearance, and atmosphere",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "descriptive-place-writing-8",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "No structure is needed.",
        "Only use a closing sentence.",
        "Repeat the first word five times.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-9",
      "level": "Basic"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "One place I like is",
      "options": [
        "That is why I enjoy going there.",
        "Finally, therefore, however,",
        "One place I like is",
        "also"
      ],
      "id": "descriptive-place-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "also",
      "options": [
        "Dear",
        "also",
        "One place I like is",
        "That is why I enjoy going there."
      ],
      "id": "descriptive-place-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "That is why I enjoy going there.",
      "options": [
        "That is why I enjoy going there.",
        "One place I like is",
        "also",
        "Because and because."
      ],
      "id": "descriptive-place-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "write a description of a place you know",
        "descriptive paragraph",
        "write as many words as possible without checking",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: descriptive paragraph.",
      "answer": "One place I like is",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "I not sure maybe.",
        "One place I like is",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music."
      ],
      "id": "descriptive-place-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Place + details + atmosphere + personal impression.",
      "answer": "also",
      "options": [
        "That is why I enjoy going there.",
        "also",
        "!!!",
        "very very"
      ],
      "id": "descriptive-place-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Describing a Place.",
      "answer": "That is why I enjoy going there.",
      "options": [
        "That is why I enjoy going there.",
        "One place I like is",
        "write a description of a place you know",
        "No ending needed."
      ],
      "id": "descriptive-place-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a description of a place you know.",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "also",
      "options": [
        "That is why I enjoy going there.",
        "descriptive paragraph",
        "also",
        "One place I like is"
      ],
      "id": "descriptive-place-writing-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "That is why I enjoy going there.",
      "options": [
        "also",
        "That is why I enjoy going there.",
        "Start with no context.",
        "Add an unrelated question."
      ],
      "id": "descriptive-place-writing-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "descriptive-place-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Place + details + atmosphere + personal impression.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Place + details + atmosphere + personal impression."
      ],
      "id": "descriptive-place-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "descriptive paragraph",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "descriptive paragraph",
        "random informal chat for every task"
      ],
      "id": "descriptive-place-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "For example however because in conclusion.",
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "descriptive-place-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Describing a Place.",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Use specific adjectives instead of vague words like nice or good.",
        "One place I like is",
        "also",
        "Use punctuation only at the end of the course."
      ],
      "id": "descriptive-place-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: describe location, appearance, and atmosphere.",
      "answer": "describe location, appearance, and atmosphere",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "describe location, appearance, and atmosphere"
      ],
      "id": "descriptive-place-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "One place I like is",
      "options": [
        "That is why I enjoy going there.",
        "Use specific adjectives instead of vague words like nice or good.",
        "One place I like is",
        "also"
      ],
      "id": "descriptive-place-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "also",
      "options": [
        "descriptive paragraph",
        "also",
        "there there",
        "grammar"
      ],
      "id": "descriptive-place-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
      "options": [
        "My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.",
        "One place I like is",
        "That is why I enjoy going there.",
        "No topic no sentence."
      ],
      "id": "descriptive-place-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Use specific adjectives instead of vague words like nice or good.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Use specific adjectives instead of vague words like nice or good."
      ],
      "id": "descriptive-place-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik5Page() {
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
