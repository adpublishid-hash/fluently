import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "storytelling",
  "title": "Storytelling",
  "description": "Menceritakan pengalaman singkat dengan alur jelas.",
  "situation": "telling a short personal story",
  "goal": "explain what happened, how you felt, and what you learned",
  "pattern": "Last week, I ___. At first, ___. In the end, ___.",
  "pronunciation": "past tense endings in happened, learned, and helped",
  "sample": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
  "formalResponse": "That experience taught me to prepare more carefully.",
  "casualResponse": "It taught me to plan better next time.",
  "repairPhrase": "Let me start from the beginning.",
  "fluencyTip": "Use time markers to make your story easy to follow.",
  "topicNumber": 11
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: telling a short personal story.",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time.",
        "I do not know anything about this topic."
      ],
      "id": "storytelling-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "explain what happened, how you felt, and what you learned",
        "memorize spelling only"
      ],
      "id": "storytelling-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Maybe later, thank you.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "Yes.",
        "No problem."
      ],
      "id": "storytelling-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Menceritakan pengalaman singkat dengan alur jelas.",
      "answer": "It taught me to plan better next time.",
      "options": [
        "It taught me to plan better next time.",
        "Let me start from the beginning.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "storytelling-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "explain what happened, how you felt, and what you learned",
        "past tense endings in happened, learned, and helped",
        "Use time markers to make your story easy to follow.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "past tense endings in happened, learned, and helped",
        "answer without listening to the question",
        "explain what happened, how you felt, and what you learned",
        "Menceritakan pengalaman singkat dengan alur jelas."
      ],
      "id": "storytelling-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "I went there yesterday because blue."
      ],
      "id": "storytelling-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Storytelling\".",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Last week, I ___. At first, ___. In the end, ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "storytelling-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "explain what happened, how you felt, and what you learned"
      ],
      "id": "storytelling-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Let me start from the beginning.",
        "Yeah, whatever.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "It taught me to plan better next time.",
      "options": [
        "It is hereby requested that silence continues.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me start from the beginning.",
      "options": [
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "I will stop speaking now."
      ],
      "id": "storytelling-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Storytelling.",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "No, I do not want to answer.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Storytelling.",
      "answer": "It taught me to plan better next time.",
      "options": [
        "This document has been processed accordingly.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: telling a short personal story.",
      "answer": "Let me start from the beginning.",
      "options": [
        "Let me start from the beginning.",
        "Please ignore every mistake.",
        "explain what happened, how you felt, and what you learned",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Storytelling.",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me start from the beginning.",
      "options": [
        "Laugh and end the conversation.",
        "Let me start from the beginning.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "storytelling-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "past tense endings in happened, learned, and helped",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "storytelling-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "avoid listening to your own recording",
        "past tense endings in happened, learned, and helped",
        "Menceritakan pengalaman singkat dengan alur jelas.",
        "ignore word stress completely"
      ],
      "id": "storytelling-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Storytelling.",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "past tense endings in happened, learned, and helped",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "storytelling-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: telling a short personal story.",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Let me start from the beginning.",
        "past tense endings in happened, learned, and helped",
        "One word is always enough.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Storytelling\".",
      "answer": "Let me start from the beginning.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier."
      ],
      "id": "storytelling-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Use filler sounds after every word.",
        "Use time markers to make your story easy to follow.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "storytelling-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "Fine."
      ],
      "id": "storytelling-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "Use time markers to make your story easy to follow.",
        "explain what happened, how you felt, and what you learned",
        "translation speed",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: telling a short personal story.",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time.",
        "I do not know anything about this topic."
      ],
      "id": "storytelling-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "explain what happened, how you felt, and what you learned",
        "memorize spelling only"
      ],
      "id": "storytelling-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Maybe later, thank you.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "Yes.",
        "No problem."
      ],
      "id": "storytelling-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Menceritakan pengalaman singkat dengan alur jelas.",
      "answer": "It taught me to plan better next time.",
      "options": [
        "It taught me to plan better next time.",
        "Let me start from the beginning.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "storytelling-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "explain what happened, how you felt, and what you learned",
        "past tense endings in happened, learned, and helped",
        "Use time markers to make your story easy to follow.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "past tense endings in happened, learned, and helped",
        "answer without listening to the question",
        "explain what happened, how you felt, and what you learned",
        "Menceritakan pengalaman singkat dengan alur jelas."
      ],
      "id": "storytelling-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "I went there yesterday because blue."
      ],
      "id": "storytelling-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Storytelling\".",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Last week, I ___. At first, ___. In the end, ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "storytelling-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "explain what happened, how you felt, and what you learned",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "explain what happened, how you felt, and what you learned"
      ],
      "id": "storytelling-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Let me start from the beginning.",
        "Yeah, whatever.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "It taught me to plan better next time.",
      "options": [
        "It is hereby requested that silence continues.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me start from the beginning.",
      "options": [
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "I will stop speaking now."
      ],
      "id": "storytelling-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Storytelling.",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "No, I do not want to answer.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Storytelling.",
      "answer": "It taught me to plan better next time.",
      "options": [
        "This document has been processed accordingly.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: telling a short personal story.",
      "answer": "Let me start from the beginning.",
      "options": [
        "Let me start from the beginning.",
        "Please ignore every mistake.",
        "explain what happened, how you felt, and what you learned",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Storytelling.",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me start from the beginning.",
      "options": [
        "Laugh and end the conversation.",
        "Let me start from the beginning.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "storytelling-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "past tense endings in happened, learned, and helped",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "storytelling-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use time markers to make your story easy to follow."
      ],
      "id": "storytelling-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "That experience taught me to prepare more carefully.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "That experience taught me to prepare more carefully.",
        "It taught me to plan better next time."
      ],
      "id": "storytelling-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "avoid listening to your own recording",
        "past tense endings in happened, learned, and helped",
        "Menceritakan pengalaman singkat dengan alur jelas.",
        "ignore word stress completely"
      ],
      "id": "storytelling-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Storytelling.",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "past tense endings in happened, learned, and helped",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "storytelling-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: telling a short personal story.",
      "answer": "Last week, I ___. At first, ___. In the end, ___.",
      "options": [
        "Let me start from the beginning.",
        "past tense endings in happened, learned, and helped",
        "One word is always enough.",
        "Last week, I ___. At first, ___. In the end, ___."
      ],
      "id": "storytelling-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Storytelling\".",
      "answer": "Let me start from the beginning.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me start from the beginning.",
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier."
      ],
      "id": "storytelling-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Use time markers to make your story easy to follow.",
      "options": [
        "Use filler sounds after every word.",
        "Use time markers to make your story easy to follow.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "storytelling-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
      "options": [
        "Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.",
        "It taught me to plan better next time.",
        "That experience taught me to prepare more carefully.",
        "Fine."
      ],
      "id": "storytelling-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "past tense endings in happened, learned, and helped",
      "options": [
        "Use time markers to make your story easy to follow.",
        "explain what happened, how you felt, and what you learned",
        "translation speed",
        "past tense endings in happened, learned, and helped"
      ],
      "id": "storytelling-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik11Page() {
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
