import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "self-introduction",
  "title": "Self Introduction",
  "description": "Latihan memperkenalkan diri dengan natural dan percaya diri.",
  "situation": "meeting a new classmate or coworker",
  "goal": "introduce your name, background, and one personal detail",
  "pattern": "Hi, I am ___. I am from ___, and I am interested in ___.",
  "pronunciation": "clear word stress in introduction phrases",
  "sample": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
  "formalResponse": "It is a pleasure to meet you.",
  "casualResponse": "Nice to meet you.",
  "repairPhrase": "Let me say that again more clearly.",
  "fluencyTip": "Pause briefly after your name and keep the ending clear.",
  "topicNumber": 1
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: meeting a new classmate or coworker.",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "It is a pleasure to meet you.",
        "Nice to meet you.",
        "I do not know anything about this topic."
      ],
      "id": "self-introduction-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "introduce your name, background, and one personal detail",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "introduce your name, background, and one personal detail",
        "memorize spelling only"
      ],
      "id": "self-introduction-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Maybe later, thank you.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "Yes.",
        "No problem."
      ],
      "id": "self-introduction-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Latihan memperkenalkan diri dengan natural dan percaya diri.",
      "answer": "Nice to meet you.",
      "options": [
        "Nice to meet you.",
        "Let me say that again more clearly.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "self-introduction-speaking-4",
      "level": "Basic"
    },
    {
      "id": "self-introduction-speaking-5",
      "level": "Basic",
      "prompt": "A new classmate asks, \"What's your name?\" Which reply is best?",
      "answer": "My name is Dina. Nice to meet you.",
      "options": [
        "My name is Dina. Nice to meet you.",
        "I am fine, thank you very much.",
        "It is Monday today, I think.",
        "Yes, I like my name a lot."
      ]
    },
    {
      "id": "self-introduction-speaking-6",
      "level": "Basic",
      "prompt": "Someone asks, \"Where are you from?\" Which answer is correct?",
      "answer": "I am from Surabaya, in East Java.",
      "options": [
        "I go to work by bus every day.",
        "I am at the office on Mondays.",
        "I am twenty-one years old now.",
        "I am from Surabaya, in East Java."
      ]
    },
    {
      "id": "self-introduction-speaking-7",
      "level": "Basic",
      "prompt": "Which question can you ask to keep an introduction going?",
      "answer": "What do you do in your free time?",
      "options": [
        "How much money do you earn now?",
        "Can you leave me alone, please?",
        "What do you do in your free time?",
        "Why are you so late again today?"
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Self Introduction\".",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Hi, I am ___. I am from ___, and I am interested in ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "self-introduction-speaking-8",
      "level": "Basic"
    },
    {
      "id": "self-introduction-speaking-9",
      "level": "Basic",
      "prompt": "Complete the introduction: \"Hi, I ___ Sara, and I ___ a nurse.\"",
      "answer": "am / work as",
      "options": [
        "am / work as",
        "are / working",
        "is / works as",
        "be / work at"
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "Let me say that again more clearly.",
        "Yeah, whatever.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Nice to meet you.",
      "options": [
        "It is hereby requested that silence continues.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me say that again more clearly.",
      "options": [
        "Let me say that again more clearly.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "It is a pleasure to meet you.",
        "I will stop speaking now."
      ],
      "id": "self-introduction-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Self Introduction.",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "No, I do not want to answer.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Self Introduction.",
      "answer": "Nice to meet you.",
      "options": [
        "This document has been processed accordingly.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: meeting a new classmate or coworker.",
      "answer": "Let me say that again more clearly.",
      "options": [
        "Let me say that again more clearly.",
        "Please ignore every mistake.",
        "introduce your name, background, and one personal detail",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Self Introduction.",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "self-introduction-speaking-18",
      "level": "Intermediate",
      "prompt": "A new coworker says, \"I'm Leo from the sales team.\" Which reply introduces you and continues the conversation best?",
      "answer": "Nice to meet you, Leo. I'm Ana from finance. How long have you been here?",
      "options": [
        "Nice to meet you, Leo. I'm Ana from finance. How long have you been here?",
        "Okay. I'm Ana. I don't really need to know anything else about you.",
        "Nice to meet you too, Leo. Sales must be really boring work, though.",
        "I'm Ana. I have nothing else to say about myself, so see you around."
      ]
    },
    {
      "id": "self-introduction-speaking-19",
      "level": "Intermediate",
      "prompt": "At a job orientation, which sentence adds a relevant personal detail to your introduction?",
      "answer": "Outside work, I enjoy hiking, so I'd love to hear about trails nearby.",
      "options": [
        "I don't really have any hobbies or interests at all, sorry.",
        "Outside work, I enjoy hiking, so I'd love to hear about trails nearby.",
        "Outside work, I enjoy hiking, but I won't talk about anything else.",
        "My salary at my last job was higher than everyone's here."
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "clear word stress in introduction phrases",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "self-introduction-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "avoid listening to your own recording",
        "clear word stress in introduction phrases",
        "Latihan memperkenalkan diri dengan natural dan percaya diri.",
        "ignore word stress completely"
      ],
      "id": "self-introduction-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Self Introduction.",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "clear word stress in introduction phrases",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "self-introduction-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: meeting a new classmate or coworker.",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Let me say that again more clearly.",
        "clear word stress in introduction phrases",
        "One word is always enough.",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Self Introduction\".",
      "answer": "Let me say that again more clearly.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me say that again more clearly.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design."
      ],
      "id": "self-introduction-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Use filler sounds after every word.",
        "Pause briefly after your name and keep the ending clear.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "self-introduction-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "Fine."
      ],
      "id": "self-introduction-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "Pause briefly after your name and keep the ending clear.",
        "introduce your name, background, and one personal detail",
        "translation speed",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: meeting a new classmate or coworker.",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "It is a pleasure to meet you.",
        "Nice to meet you.",
        "I do not know anything about this topic."
      ],
      "id": "self-introduction-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "introduce your name, background, and one personal detail",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "introduce your name, background, and one personal detail",
        "memorize spelling only"
      ],
      "id": "self-introduction-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Maybe later, thank you.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "Yes.",
        "No problem."
      ],
      "id": "self-introduction-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Latihan memperkenalkan diri dengan natural dan percaya diri.",
      "answer": "Nice to meet you.",
      "options": [
        "Nice to meet you.",
        "Let me say that again more clearly.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "self-introduction-speaking-4",
      "level": "Basic"
    },
    {
      "id": "self-introduction-speaking-5",
      "level": "Basic",
      "prompt": "Teman sekelas baru bertanya, \"What's your name?\" Balasan mana yang paling tepat?",
      "answer": "My name is Dina. Nice to meet you.",
      "options": [
        "My name is Dina. Nice to meet you.",
        "I am fine, thank you very much.",
        "It is Monday today, I think.",
        "Yes, I like my name a lot."
      ]
    },
    {
      "id": "self-introduction-speaking-6",
      "level": "Basic",
      "prompt": "Seseorang bertanya, \"Where are you from?\" Jawaban mana yang benar?",
      "answer": "I am from Surabaya, in East Java.",
      "options": [
        "I go to work by bus every day.",
        "I am at the office on Mondays.",
        "I am twenty-one years old now.",
        "I am from Surabaya, in East Java."
      ]
    },
    {
      "id": "self-introduction-speaking-7",
      "level": "Basic",
      "prompt": "Pertanyaan mana yang bisa kamu ajukan agar perkenalan terus berlanjut?",
      "answer": "What do you do in your free time?",
      "options": [
        "How much money do you earn now?",
        "Can you leave me alone, please?",
        "What do you do in your free time?",
        "Why are you so late again today?"
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Self Introduction\".",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Hi, I am ___. I am from ___, and I am interested in ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "self-introduction-speaking-8",
      "level": "Basic"
    },
    {
      "id": "self-introduction-speaking-9",
      "level": "Basic",
      "prompt": "Lengkapi perkenalan ini: \"Hi, I ___ Sara, and I ___ a nurse.\"",
      "answer": "am / work as",
      "options": [
        "am / work as",
        "are / working",
        "is / works as",
        "be / work at"
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "Let me say that again more clearly.",
        "Yeah, whatever.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Nice to meet you.",
      "options": [
        "It is hereby requested that silence continues.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me say that again more clearly.",
      "options": [
        "Let me say that again more clearly.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "It is a pleasure to meet you.",
        "I will stop speaking now."
      ],
      "id": "self-introduction-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Self Introduction.",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "No, I do not want to answer.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Self Introduction.",
      "answer": "Nice to meet you.",
      "options": [
        "This document has been processed accordingly.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: meeting a new classmate or coworker.",
      "answer": "Let me say that again more clearly.",
      "options": [
        "Let me say that again more clearly.",
        "Please ignore every mistake.",
        "introduce your name, background, and one personal detail",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Self Introduction.",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "self-introduction-speaking-18",
      "level": "Intermediate",
      "prompt": "Rekan kerja baru berkata, \"I'm Leo from the sales team.\" Balasan mana yang paling baik untuk memperkenalkan diri dan melanjutkan obrolan?",
      "answer": "Nice to meet you, Leo. I'm Ana from finance. How long have you been here?",
      "options": [
        "Nice to meet you, Leo. I'm Ana from finance. How long have you been here?",
        "Okay. I'm Ana. I don't really need to know anything else about you.",
        "Nice to meet you too, Leo. Sales must be really boring work, though.",
        "I'm Ana. I have nothing else to say about myself, so see you around."
      ]
    },
    {
      "id": "self-introduction-speaking-19",
      "level": "Intermediate",
      "prompt": "Saat orientasi kerja, kalimat mana yang menambahkan detail pribadi yang relevan pada perkenalanmu?",
      "answer": "Outside work, I enjoy hiking, so I'd love to hear about trails nearby.",
      "options": [
        "I don't really have any hobbies or interests at all, sorry.",
        "Outside work, I enjoy hiking, so I'd love to hear about trails nearby.",
        "Outside work, I enjoy hiking, but I won't talk about anything else.",
        "My salary at my last job was higher than everyone's here."
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "clear word stress in introduction phrases",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "self-introduction-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Pause briefly after your name and keep the ending clear."
      ],
      "id": "self-introduction-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "It is a pleasure to meet you.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "It is a pleasure to meet you.",
        "Nice to meet you."
      ],
      "id": "self-introduction-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "avoid listening to your own recording",
        "clear word stress in introduction phrases",
        "Latihan memperkenalkan diri dengan natural dan percaya diri.",
        "ignore word stress completely"
      ],
      "id": "self-introduction-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Self Introduction.",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "clear word stress in introduction phrases",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "self-introduction-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: meeting a new classmate or coworker.",
      "answer": "Hi, I am ___. I am from ___, and I am interested in ___.",
      "options": [
        "Let me say that again more clearly.",
        "clear word stress in introduction phrases",
        "One word is always enough.",
        "Hi, I am ___. I am from ___, and I am interested in ___."
      ],
      "id": "self-introduction-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Self Introduction\".",
      "answer": "Let me say that again more clearly.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me say that again more clearly.",
        "Hi, I am Raka. I am from Bandung, and I am interested in product design."
      ],
      "id": "self-introduction-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Pause briefly after your name and keep the ending clear.",
      "options": [
        "Use filler sounds after every word.",
        "Pause briefly after your name and keep the ending clear.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "self-introduction-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
      "options": [
        "Hi, I am Raka. I am from Bandung, and I am interested in product design.",
        "Nice to meet you.",
        "It is a pleasure to meet you.",
        "Fine."
      ],
      "id": "self-introduction-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "clear word stress in introduction phrases",
      "options": [
        "Pause briefly after your name and keep the ending clear.",
        "introduce your name, background, and one personal detail",
        "translation speed",
        "clear word stress in introduction phrases"
      ],
      "id": "self-introduction-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik1Page() {
  return (
    <VocabularyQuizPage
      topicId={material.id}
      skillId="speaking"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Speaking"
      introContent={() => <SpeakingPracticeIntro topic={material} />}
      backPath="/latihan/english/speaking"
    />
  );
}
