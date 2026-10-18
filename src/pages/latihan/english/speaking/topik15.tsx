import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "future-plans",
  "title": "Future Plans",
  "description": "Berbicara tentang rencana, target, dan harapan.",
  "situation": "talking about goals for the next few months",
  "goal": "describe a plan, reason, and expected result",
  "pattern": "I am planning to ___ because ___. I hope it will ___.",
  "pronunciation": "connected speech in going to and planning to",
  "sample": "I am planning to practice English every day because I want to speak more confidently.",
  "formalResponse": "My goal is to improve my speaking fluency over the next three months.",
  "casualResponse": "I want to get better at speaking this year.",
  "repairPhrase": "To be more specific, I want to focus on speaking fluency.",
  "fluencyTip": "Connect your plan to a clear reason and outcome.",
  "topicNumber": 15
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: talking about goals for the next few months.",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year.",
        "I do not know anything about this topic."
      ],
      "id": "future-plans-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe a plan, reason, and expected result",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe a plan, reason, and expected result",
        "memorize spelling only"
      ],
      "id": "future-plans-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "Maybe later, thank you.",
        "I am planning to practice English every day because I want to speak more confidently.",
        "Yes.",
        "No problem."
      ],
      "id": "future-plans-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Berbicara tentang rencana, target, dan harapan.",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "I want to get better at speaking this year.",
        "To be more specific, I want to focus on speaking fluency.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "future-plans-speaking-4",
      "level": "Basic"
    },
    {
      "id": "future-plans-speaking-5",
      "level": "Basic",
      "prompt": "Choose the correct sentence about a future plan.",
      "answer": "I'm going to visit Japan next year.",
      "options": [
        "I'm going to visit Japan next year.",
        "I'm going visit Japan next year.",
        "I going to visit Japan next year.",
        "I'm going to visited Japan next year."
      ]
    },
    {
      "id": "future-plans-speaking-6",
      "level": "Basic",
      "prompt": "A friend asks, \"What are you doing this weekend?\" Which answer fits?",
      "answer": "I'm meeting my cousins on Saturday.",
      "options": [
        "I meet my cousins yesterday.",
        "I'm meet my cousins on Saturday.",
        "I met my cousins last Saturday.",
        "I'm meeting my cousins on Saturday."
      ]
    },
    {
      "id": "future-plans-speaking-7",
      "level": "Basic",
      "prompt": "Which sentence talks about a hope for the future?",
      "answer": "I hope to find a new job soon.",
      "options": [
        "I hope to find a new job soon.",
        "I hope to found a new job soon.",
        "I hoped finding a new job soon.",
        "I hope finding a new job soon."
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Future Plans\".",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "I am planning to ___ because ___. I hope it will ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "future-plans-speaking-8",
      "level": "Basic"
    },
    {
      "id": "future-plans-speaking-9",
      "level": "Basic",
      "prompt": "Which time expression refers to the future?",
      "answer": "next month",
      "options": [
        "next month",
        "last month",
        "a month ago",
        "yesterday"
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "Yeah, whatever.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "It is hereby requested that silence continues.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "I am planning to practice English every day because I want to speak more confidently.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I will stop speaking now."
      ],
      "id": "future-plans-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Future Plans.",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "No, I do not want to answer.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Future Plans.",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "This document has been processed accordingly.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: talking about goals for the next few months.",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "Please ignore every mistake.",
        "describe a plan, reason, and expected result",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Future Plans.",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "future-plans-speaking-18",
      "level": "Intermediate",
      "prompt": "Which answer links a plan to a reason and an expected result?",
      "answer": "I'm taking an online course so that I can apply for data roles.",
      "options": [
        "I took an online course years ago, but I never used it at all.",
        "I'm taking an online course, and I don't know why I'm doing it.",
        "I'm taking an online course so that I can apply for data roles.",
        "I'm taking an online course so that I can't apply for data roles."
      ]
    },
    {
      "id": "future-plans-speaking-19",
      "level": "Intermediate",
      "prompt": "Which sentence expresses a plan with appropriate uncertainty?",
      "answer": "I might move abroad, depending on how my studies go.",
      "options": [
        "I might move abroad, depending on how my studies went.",
        "I might move abroad, depending on how my studies go.",
        "I will definitely move abroad, depending on nothing at all.",
        "I might moving abroad, depending on how my studies go."
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "connected speech in going to and planning to",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "future-plans-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "avoid listening to your own recording",
        "connected speech in going to and planning to",
        "Berbicara tentang rencana, target, dan harapan.",
        "ignore word stress completely"
      ],
      "id": "future-plans-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Future Plans.",
      "answer": "connected speech in going to and planning to",
      "options": [
        "connected speech in going to and planning to",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "future-plans-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: talking about goals for the next few months.",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "connected speech in going to and planning to",
        "One word is always enough.",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Future Plans\".",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "To be more specific, I want to focus on speaking fluency.",
        "I am planning to practice English every day because I want to speak more confidently."
      ],
      "id": "future-plans-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Use filler sounds after every word.",
        "Connect your plan to a clear reason and outcome.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "future-plans-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "Fine."
      ],
      "id": "future-plans-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "Connect your plan to a clear reason and outcome.",
        "describe a plan, reason, and expected result",
        "translation speed",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: talking about goals for the next few months.",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year.",
        "I do not know anything about this topic."
      ],
      "id": "future-plans-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe a plan, reason, and expected result",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe a plan, reason, and expected result",
        "memorize spelling only"
      ],
      "id": "future-plans-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "Maybe later, thank you.",
        "I am planning to practice English every day because I want to speak more confidently.",
        "Yes.",
        "No problem."
      ],
      "id": "future-plans-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Berbicara tentang rencana, target, dan harapan.",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "I want to get better at speaking this year.",
        "To be more specific, I want to focus on speaking fluency.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "future-plans-speaking-4",
      "level": "Basic"
    },
    {
      "id": "future-plans-speaking-5",
      "level": "Basic",
      "prompt": "Pilih kalimat yang benar tentang rencana masa depan.",
      "answer": "I'm going to visit Japan next year.",
      "options": [
        "I'm going to visit Japan next year.",
        "I'm going visit Japan next year.",
        "I going to visit Japan next year.",
        "I'm going to visited Japan next year."
      ]
    },
    {
      "id": "future-plans-speaking-6",
      "level": "Basic",
      "prompt": "Seorang teman bertanya, \"What are you doing this weekend?\" Jawaban mana yang cocok?",
      "answer": "I'm meeting my cousins on Saturday.",
      "options": [
        "I meet my cousins yesterday.",
        "I'm meet my cousins on Saturday.",
        "I met my cousins last Saturday.",
        "I'm meeting my cousins on Saturday."
      ]
    },
    {
      "id": "future-plans-speaking-7",
      "level": "Basic",
      "prompt": "Kalimat mana yang membicarakan harapan untuk masa depan?",
      "answer": "I hope to find a new job soon.",
      "options": [
        "I hope to find a new job soon.",
        "I hope to found a new job soon.",
        "I hoped finding a new job soon.",
        "I hope finding a new job soon."
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Future Plans\".",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "I am planning to ___ because ___. I hope it will ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "future-plans-speaking-8",
      "level": "Basic"
    },
    {
      "id": "future-plans-speaking-9",
      "level": "Basic",
      "prompt": "Ungkapan waktu mana yang merujuk ke masa depan?",
      "answer": "next month",
      "options": [
        "next month",
        "last month",
        "a month ago",
        "yesterday"
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "Yeah, whatever.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "It is hereby requested that silence continues.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "I am planning to practice English every day because I want to speak more confidently.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I will stop speaking now."
      ],
      "id": "future-plans-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Future Plans.",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "No, I do not want to answer.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Future Plans.",
      "answer": "I want to get better at speaking this year.",
      "options": [
        "This document has been processed accordingly.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: talking about goals for the next few months.",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "Please ignore every mistake.",
        "describe a plan, reason, and expected result",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Future Plans.",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "future-plans-speaking-18",
      "level": "Intermediate",
      "prompt": "Jawaban mana yang menghubungkan rencana dengan alasan dan hasil yang diharapkan?",
      "answer": "I'm taking an online course so that I can apply for data roles.",
      "options": [
        "I took an online course years ago, but I never used it at all.",
        "I'm taking an online course, and I don't know why I'm doing it.",
        "I'm taking an online course so that I can apply for data roles.",
        "I'm taking an online course so that I can't apply for data roles."
      ]
    },
    {
      "id": "future-plans-speaking-19",
      "level": "Intermediate",
      "prompt": "Kalimat mana yang menyatakan rencana dengan tingkat ketidakpastian yang tepat?",
      "answer": "I might move abroad, depending on how my studies go.",
      "options": [
        "I might move abroad, depending on how my studies went.",
        "I might move abroad, depending on how my studies go.",
        "I will definitely move abroad, depending on nothing at all.",
        "I might moving abroad, depending on how my studies go."
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "connected speech in going to and planning to",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "future-plans-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Connect your plan to a clear reason and outcome."
      ],
      "id": "future-plans-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "My goal is to improve my speaking fluency over the next three months.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "My goal is to improve my speaking fluency over the next three months.",
        "I want to get better at speaking this year."
      ],
      "id": "future-plans-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "avoid listening to your own recording",
        "connected speech in going to and planning to",
        "Berbicara tentang rencana, target, dan harapan.",
        "ignore word stress completely"
      ],
      "id": "future-plans-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Future Plans.",
      "answer": "connected speech in going to and planning to",
      "options": [
        "connected speech in going to and planning to",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "future-plans-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: talking about goals for the next few months.",
      "answer": "I am planning to ___ because ___. I hope it will ___.",
      "options": [
        "To be more specific, I want to focus on speaking fluency.",
        "connected speech in going to and planning to",
        "One word is always enough.",
        "I am planning to ___ because ___. I hope it will ___."
      ],
      "id": "future-plans-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Future Plans\".",
      "answer": "To be more specific, I want to focus on speaking fluency.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "To be more specific, I want to focus on speaking fluency.",
        "I am planning to practice English every day because I want to speak more confidently."
      ],
      "id": "future-plans-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Connect your plan to a clear reason and outcome.",
      "options": [
        "Use filler sounds after every word.",
        "Connect your plan to a clear reason and outcome.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "future-plans-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I am planning to practice English every day because I want to speak more confidently.",
      "options": [
        "I am planning to practice English every day because I want to speak more confidently.",
        "I want to get better at speaking this year.",
        "My goal is to improve my speaking fluency over the next three months.",
        "Fine."
      ],
      "id": "future-plans-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "connected speech in going to and planning to",
      "options": [
        "Connect your plan to a clear reason and outcome.",
        "describe a plan, reason, and expected result",
        "translation speed",
        "connected speech in going to and planning to"
      ],
      "id": "future-plans-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik15Page() {
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
