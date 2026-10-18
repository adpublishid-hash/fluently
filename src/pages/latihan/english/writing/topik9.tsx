import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { WritingPracticeIntro, type WritingTopicMaterial } from '../../components/WritingPracticeIntro';

const material: WritingTopicMaterial = {
  "id": "social-media-caption",
  "title": "Social Media Caption",
  "description": "Menulis caption singkat yang natural dan menarik.",
  "task": "write a short caption for a post",
  "goal": "make the message concise, friendly, and clear",
  "format": "short caption",
  "structure": "Hook + detail + feeling or call to action.",
  "sample": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
  "opening": "A little moment from",
  "connector": "with",
  "closing": "What a day.",
  "editingTip": "Cut unnecessary words so the caption feels clean.",
  "topicNumber": 9
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "What is the main writing task for this topic?: Menulis caption singkat yang natural dan menarik.",
      "answer": "write a short caption for a post",
      "options": [
        "write a short caption for a post",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "social-media-caption-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Which writing format fits this topic best?",
      "answer": "short caption",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short caption"
      ],
      "id": "social-media-caption-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Which structure should be used?",
      "answer": "Hook + detail + feeling or call to action.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Hook + detail + feeling or call to action.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "social-media-caption-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Which writing sample is the best fit?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "Writing is speak fast.",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "social-media-caption-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "write a short caption for a post",
      "options": [
        "write a short caption for a post",
        "make the message concise, friendly, and clear",
        "Cut unnecessary words so the caption feels clean.",
        "avoid the topic completely"
      ],
      "id": "social-media-caption-writing-4",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-5",
      "level": "Basic",
      "prompt": "Which caption best fits a photo of a birthday cake?",
      "answer": "Another year older! Thanks for the lovely cake.",
      "options": [
        "Cake. Food. Table. Plate.",
        "Please read my very long essay about baking in the comments.",
        "Another year older! Thanks for the lovely cake.",
        "This is a photo that I took of a cake."
      ]
    },
    {
      "prompt": "Which writing format fits this topic best? Topic: Social Media Caption.",
      "answer": "short caption",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short caption",
        "casual phone call"
      ],
      "id": "social-media-caption-writing-6",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-7",
      "level": "Basic",
      "prompt": "Which hashtag fits a beach holiday post?",
      "answer": "#BeachDays",
      "options": [
        "#BeachDays",
        "#MondayMeeting",
        "#Homework",
        "#WinterCoat"
      ]
    },
    {
      "prompt": "What is the main writing task for this topic?",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "make the message concise, friendly, and clear",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "social-media-caption-writing-8",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-9",
      "level": "Basic",
      "prompt": "Which caption is friendly and short?",
      "answer": "Sunday picnic with my best friends!",
      "options": [
        "This is a picnic. It was on Sunday. Friends were there.",
        "Picnic photo number 4 of 27.",
        "Sunday picnic with my best friends!",
        "Today we went, we ate, we sat, we talked, we went home."
      ]
    },
    {
      "prompt": "Which opening fits this writing task?",
      "answer": "A little moment from",
      "options": [
        "What a day.",
        "Finally, therefore, however,",
        "A little moment from",
        "with"
      ],
      "id": "social-media-caption-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best?",
      "answer": "with",
      "options": [
        "Dear",
        "with",
        "A little moment from",
        "What a day."
      ],
      "id": "social-media-caption-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable?",
      "answer": "What a day.",
      "options": [
        "What a day.",
        "A little moment from",
        "with",
        "Because and because."
      ],
      "id": "social-media-caption-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct?",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "write a short caption for a post",
        "short caption",
        "write as many words as possible without checking",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which opening fits this writing task? Format: short caption.",
      "answer": "A little moment from",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "I not sure maybe.",
        "A little moment from",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day."
      ],
      "id": "social-media-caption-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which connector fits best? Structure: Hook + detail + feeling or call to action.",
      "answer": "with",
      "options": [
        "What a day.",
        "with",
        "!!!",
        "very very"
      ],
      "id": "social-media-caption-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Which closing is most suitable? Topic: Social Media Caption.",
      "answer": "What a day.",
      "options": [
        "What a day.",
        "A little moment from",
        "write a short caption for a post",
        "No ending needed."
      ],
      "id": "social-media-caption-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which writing goal is correct? Task: write a short caption for a post.",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "social-media-caption-writing-18",
      "level": "Intermediate",
      "prompt": "Which call to action best ends a caption for a new bakery?",
      "answer": "Pop in this weekend and try our fresh croissants!",
      "options": [
        "Pop in this weekend and try our fresh croissants!",
        "Our bakery opened, and the oven is very large.",
        "Croissants are a type of French pastry with butter.",
        "We sell bread, and the shop has four tables."
      ]
    },
    {
      "id": "social-media-caption-writing-19",
      "level": "Intermediate",
      "prompt": "Which revision makes this caption more concise? Draft: 'This is a picture of the sunset that I saw yesterday evening when I was at the beach.'",
      "answer": "Last night's beach sunset. Pure magic.",
      "options": [
        "This is a picture of a sunset that I saw at the beach.",
        "A picture. Sunset. Beach. Yesterday. Evening.",
        "Sunset picture from yesterday evening when I was at the beach.",
        "Last night's beach sunset. Pure magic."
      ]
    },
    {
      "prompt": "Which editing tip is most helpful?",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "social-media-caption-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer?",
      "answer": "Hook + detail + feeling or call to action.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Hook + detail + feeling or call to action."
      ],
      "id": "social-media-caption-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format?",
      "answer": "short caption",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short caption",
        "random informal chat for every task"
      ],
      "id": "social-media-caption-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "For example however because in conclusion.",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "social-media-caption-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Topic: Social Media Caption.",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "A little moment from",
        "with",
        "Use punctuation only at the end of the course."
      ],
      "id": "social-media-caption-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Goal: make the message concise, friendly, and clear.",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone appropriate for the format? Best opening?",
      "answer": "A little moment from",
      "options": [
        "What a day.",
        "Cut unnecessary words so the caption feels clean.",
        "A little moment from",
        "with"
      ],
      "id": "social-media-caption-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Which revision is strongest? Best connector?",
      "answer": "with",
      "options": [
        "short caption",
        "with",
        "there there",
        "grammar"
      ],
      "id": "social-media-caption-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice makes the writing clearer? Best complete model?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "A little moment from",
        "What a day.",
        "No topic no sentence."
      ],
      "id": "social-media-caption-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which editing tip is most helpful? Final check?",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Cut unnecessary words so the caption feels clean."
      ],
      "id": "social-media-caption-writing-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Apa tugas writing utama untuk topik ini?: Menulis caption singkat yang natural dan menarik.",
      "answer": "write a short caption for a post",
      "options": [
        "write a short caption for a post",
        "write a random list of words",
        "copy the prompt without changing it",
        "translate only one word"
      ],
      "id": "social-media-caption-writing-0",
      "level": "Basic"
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai?",
      "answer": "short caption",
      "options": [
        "voice recording",
        "multiple unrelated phrases",
        "pronunciation drill only",
        "short caption"
      ],
      "id": "social-media-caption-writing-1",
      "level": "Basic"
    },
    {
      "prompt": "Struktur mana yang sebaiknya dipakai?",
      "answer": "Hook + detail + feeling or call to action.",
      "options": [
        "One word + comma + no verb.",
        "Question + unrelated answer + emoji.",
        "Hook + detail + feeling or call to action.",
        "Conclusion + random detail + no topic sentence."
      ],
      "id": "social-media-caption-writing-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh tulisan mana yang paling tepat?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "Writing is speak fast.",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "Good yes because maybe.",
        "I am very very very."
      ],
      "id": "social-media-caption-writing-3",
      "level": "Basic"
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "write a short caption for a post",
      "options": [
        "write a short caption for a post",
        "make the message concise, friendly, and clear",
        "Cut unnecessary words so the caption feels clean.",
        "avoid the topic completely"
      ],
      "id": "social-media-caption-writing-4",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-5",
      "level": "Basic",
      "prompt": "Caption mana yang paling sesuai untuk foto kue ulang tahun?",
      "answer": "Another year older! Thanks for the lovely cake.",
      "options": [
        "Cake. Food. Table. Plate.",
        "Please read my very long essay about baking in the comments.",
        "Another year older! Thanks for the lovely cake.",
        "This is a photo that I took of a cake."
      ]
    },
    {
      "prompt": "Format tulisan mana yang paling sesuai? Topic: Social Media Caption.",
      "answer": "short caption",
      "options": [
        "listening transcript only",
        "vocabulary flashcard",
        "short caption",
        "casual phone call"
      ],
      "id": "social-media-caption-writing-6",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-7",
      "level": "Basic",
      "prompt": "Hashtag mana yang cocok untuk unggahan liburan di pantai?",
      "answer": "#BeachDays",
      "options": [
        "#BeachDays",
        "#MondayMeeting",
        "#Homework",
        "#WinterCoat"
      ]
    },
    {
      "prompt": "Apa tugas writing utama untuk topik ini?",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "make the message concise, friendly, and clear",
        "make the writing unclear",
        "use no main idea",
        "choose the longest answer only"
      ],
      "id": "social-media-caption-writing-8",
      "level": "Basic"
    },
    {
      "id": "social-media-caption-writing-9",
      "level": "Basic",
      "prompt": "Caption mana yang ramah dan singkat?",
      "answer": "Sunday picnic with my best friends!",
      "options": [
        "This is a picnic. It was on Sunday. Friends were there.",
        "Picnic photo number 4 of 27.",
        "Sunday picnic with my best friends!",
        "Today we went, we ate, we sat, we talked, we went home."
      ]
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini?",
      "answer": "A little moment from",
      "options": [
        "What a day.",
        "Finally, therefore, however,",
        "A little moment from",
        "with"
      ],
      "id": "social-media-caption-writing-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai?",
      "answer": "with",
      "options": [
        "Dear",
        "with",
        "A little moment from",
        "What a day."
      ],
      "id": "social-media-caption-writing-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai?",
      "answer": "What a day.",
      "options": [
        "What a day.",
        "A little moment from",
        "with",
        "Because and because."
      ],
      "id": "social-media-caption-writing-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar?",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "write a short caption for a post",
        "short caption",
        "write as many words as possible without checking",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Opening mana yang paling tepat untuk tulisan ini? Format: short caption.",
      "answer": "A little moment from",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "I not sure maybe.",
        "A little moment from",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day."
      ],
      "id": "social-media-caption-writing-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Connector mana yang paling sesuai? Structure: Hook + detail + feeling or call to action.",
      "answer": "with",
      "options": [
        "What a day.",
        "with",
        "!!!",
        "very very"
      ],
      "id": "social-media-caption-writing-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Closing mana yang paling sesuai? Topic: Social Media Caption.",
      "answer": "What a day.",
      "options": [
        "What a day.",
        "A little moment from",
        "write a short caption for a post",
        "No ending needed."
      ],
      "id": "social-media-caption-writing-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Tujuan tulisan mana yang benar? Task: write a short caption for a post.",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "ignore the reader",
        "hide the main point",
        "use only informal slang",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-17",
      "level": "Intermediate"
    },
    {
      "id": "social-media-caption-writing-18",
      "level": "Intermediate",
      "prompt": "Call to action mana yang paling tepat untuk menutup caption toko roti baru?",
      "answer": "Pop in this weekend and try our fresh croissants!",
      "options": [
        "Pop in this weekend and try our fresh croissants!",
        "Our bakery opened, and the oven is very large.",
        "Croissants are a type of French pastry with butter.",
        "We sell bread, and the shop has four tables."
      ]
    },
    {
      "id": "social-media-caption-writing-19",
      "level": "Intermediate",
      "prompt": "Revisi mana yang membuat caption ini lebih ringkas? Draft: 'This is a picture of the sunset that I saw yesterday evening when I was at the beach.'",
      "answer": "Last night's beach sunset. Pure magic.",
      "options": [
        "This is a picture of a sunset that I saw at the beach.",
        "A picture. Sunset. Beach. Yesterday. Evening.",
        "Sunset picture from yesterday evening when I was at the beach.",
        "Last night's beach sunset. Pure magic."
      ]
    },
    {
      "prompt": "Editing tip mana yang paling membantu?",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "Never revise after writing.",
        "Add more words even if they repeat the idea.",
        "Ignore the task after the first sentence."
      ],
      "id": "social-media-caption-writing-20",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas?",
      "answer": "Hook + detail + feeling or call to action.",
      "options": [
        "Use several unrelated structures at once.",
        "Remove the main idea.",
        "Put the conclusion before the topic is introduced.",
        "Hook + detail + feeling or call to action."
      ],
      "id": "social-media-caption-writing-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format?",
      "answer": "short caption",
      "options": [
        "audio conversation only",
        "word list without sentences",
        "short caption",
        "random informal chat for every task"
      ],
      "id": "social-media-caption-writing-22",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "For example however because in conclusion.",
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "I thing good very because.",
        "This text no clear but yes."
      ],
      "id": "social-media-caption-writing-23",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Topic: Social Media Caption.",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Cut unnecessary words so the caption feels clean.",
        "A little moment from",
        "with",
        "Use punctuation only at the end of the course."
      ],
      "id": "social-media-caption-writing-24",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Goal: make the message concise, friendly, and clear.",
      "answer": "make the message concise, friendly, and clear",
      "options": [
        "write with no reader in mind",
        "make every sentence the same",
        "choose complex words even when simple words work better",
        "make the message concise, friendly, and clear"
      ],
      "id": "social-media-caption-writing-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone sesuai format? Best opening?",
      "answer": "A little moment from",
      "options": [
        "What a day.",
        "Cut unnecessary words so the caption feels clean.",
        "A little moment from",
        "with"
      ],
      "id": "social-media-caption-writing-26",
      "level": "Advanced"
    },
    {
      "prompt": "Revisi mana yang paling kuat? Best connector?",
      "answer": "with",
      "options": [
        "short caption",
        "with",
        "there there",
        "grammar"
      ],
      "id": "social-media-caption-writing-27",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang membuat tulisan lebih jelas? Best complete model?",
      "answer": "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
      "options": [
        "A slow morning, a good book, and fresh coffee. Perfect start to the day.",
        "A little moment from",
        "What a day.",
        "No topic no sentence."
      ],
      "id": "social-media-caption-writing-28",
      "level": "Advanced"
    },
    {
      "prompt": "Editing tip mana yang paling membantu? Final check?",
      "answer": "Cut unnecessary words so the caption feels clean.",
      "options": [
        "Submit without reading.",
        "Delete the main idea.",
        "Use only one long sentence for everything.",
        "Cut unnecessary words so the caption feels clean."
      ],
      "id": "social-media-caption-writing-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishWritingTopik9Page() {
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
