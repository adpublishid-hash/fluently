import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "small-talk",
  "title": "Small Talk",
  "description": "Latihan obrolan ringan agar percakapan mengalir.",
  "situation": "starting a friendly short conversation",
  "goal": "open a topic, respond naturally, and ask a follow-up question",
  "pattern": "How has your ___ been? Mine has been ___.",
  "pronunciation": "natural linking in how has your",
  "sample": "How has your week been? Mine has been busy but good.",
  "formalResponse": "How has your week been so far?",
  "casualResponse": "How is your week going?",
  "repairPhrase": "Actually, let me put it another way.",
  "fluencyTip": "Answer briefly, then ask one follow-up question.",
  "topicNumber": 5
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: starting a friendly short conversation.",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "How is your week going?",
        "I do not know anything about this topic."
      ],
      "id": "small-talk-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "open a topic, respond naturally, and ask a follow-up question",
        "memorize spelling only"
      ],
      "id": "small-talk-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "Maybe later, thank you.",
        "How has your week been? Mine has been busy but good.",
        "Yes.",
        "No problem."
      ],
      "id": "small-talk-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Latihan obrolan ringan agar percakapan mengalir.",
      "answer": "How is your week going?",
      "options": [
        "How is your week going?",
        "Actually, let me put it another way.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "small-talk-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "open a topic, respond naturally, and ask a follow-up question",
        "natural linking in how has your",
        "Answer briefly, then ask one follow-up question.",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "natural linking in how has your",
        "answer without listening to the question",
        "open a topic, respond naturally, and ask a follow-up question",
        "Latihan obrolan ringan agar percakapan mengalir."
      ],
      "id": "small-talk-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "I went there yesterday because blue."
      ],
      "id": "small-talk-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Small Talk\".",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "How has your ___ been? Mine has been ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "small-talk-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "open a topic, respond naturally, and ask a follow-up question"
      ],
      "id": "small-talk-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "How has your week been so far?",
      "options": [
        "Actually, let me put it another way.",
        "Yeah, whatever.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "How is your week going?",
      "options": [
        "It is hereby requested that silence continues.",
        "How is your week going?",
        "How has your week been so far?",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "I will stop speaking now."
      ],
      "id": "small-talk-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Small Talk.",
      "answer": "How has your week been so far?",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "No, I do not want to answer.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Small Talk.",
      "answer": "How is your week going?",
      "options": [
        "This document has been processed accordingly.",
        "How is your week going?",
        "How has your week been so far?",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: starting a friendly short conversation.",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Actually, let me put it another way.",
        "Please ignore every mistake.",
        "open a topic, respond naturally, and ask a follow-up question",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Small Talk.",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "How has your week been so far?",
      "options": [
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Laugh and end the conversation.",
        "Actually, let me put it another way.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "small-talk-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "natural linking in how has your",
      "options": [
        "natural linking in how has your",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "small-talk-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "How has your week been so far?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "natural linking in how has your",
      "options": [
        "avoid listening to your own recording",
        "natural linking in how has your",
        "Latihan obrolan ringan agar percakapan mengalir.",
        "ignore word stress completely"
      ],
      "id": "small-talk-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Small Talk.",
      "answer": "natural linking in how has your",
      "options": [
        "natural linking in how has your",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "small-talk-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: starting a friendly short conversation.",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "Actually, let me put it another way.",
        "natural linking in how has your",
        "One word is always enough.",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Small Talk\".",
      "answer": "Actually, let me put it another way.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good."
      ],
      "id": "small-talk-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Use filler sounds after every word.",
        "Answer briefly, then ask one follow-up question.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "small-talk-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "How is your week going?",
        "How has your week been so far?",
        "Fine."
      ],
      "id": "small-talk-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "natural linking in how has your",
      "options": [
        "Answer briefly, then ask one follow-up question.",
        "open a topic, respond naturally, and ask a follow-up question",
        "translation speed",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: starting a friendly short conversation.",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "How is your week going?",
        "I do not know anything about this topic."
      ],
      "id": "small-talk-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "open a topic, respond naturally, and ask a follow-up question",
        "memorize spelling only"
      ],
      "id": "small-talk-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "Maybe later, thank you.",
        "How has your week been? Mine has been busy but good.",
        "Yes.",
        "No problem."
      ],
      "id": "small-talk-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Latihan obrolan ringan agar percakapan mengalir.",
      "answer": "How is your week going?",
      "options": [
        "How is your week going?",
        "Actually, let me put it another way.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "small-talk-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "open a topic, respond naturally, and ask a follow-up question",
        "natural linking in how has your",
        "Answer briefly, then ask one follow-up question.",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "natural linking in how has your",
        "answer without listening to the question",
        "open a topic, respond naturally, and ask a follow-up question",
        "Latihan obrolan ringan agar percakapan mengalir."
      ],
      "id": "small-talk-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "I went there yesterday because blue."
      ],
      "id": "small-talk-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Small Talk\".",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "How has your ___ been? Mine has been ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "small-talk-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "open a topic, respond naturally, and ask a follow-up question",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "open a topic, respond naturally, and ask a follow-up question"
      ],
      "id": "small-talk-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "How has your week been so far?",
      "options": [
        "Actually, let me put it another way.",
        "Yeah, whatever.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "How is your week going?",
      "options": [
        "It is hereby requested that silence continues.",
        "How is your week going?",
        "How has your week been so far?",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "I will stop speaking now."
      ],
      "id": "small-talk-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Small Talk.",
      "answer": "How has your week been so far?",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "No, I do not want to answer.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Small Talk.",
      "answer": "How is your week going?",
      "options": [
        "This document has been processed accordingly.",
        "How is your week going?",
        "How has your week been so far?",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: starting a friendly short conversation.",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Actually, let me put it another way.",
        "Please ignore every mistake.",
        "open a topic, respond naturally, and ask a follow-up question",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Small Talk.",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "How has your week been so far?",
      "options": [
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Actually, let me put it another way.",
      "options": [
        "Laugh and end the conversation.",
        "Actually, let me put it another way.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "small-talk-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "natural linking in how has your",
      "options": [
        "natural linking in how has your",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "small-talk-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Answer briefly, then ask one follow-up question."
      ],
      "id": "small-talk-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "How has your week been so far?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "How has your week been so far?",
        "How is your week going?"
      ],
      "id": "small-talk-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "natural linking in how has your",
      "options": [
        "avoid listening to your own recording",
        "natural linking in how has your",
        "Latihan obrolan ringan agar percakapan mengalir.",
        "ignore word stress completely"
      ],
      "id": "small-talk-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Small Talk.",
      "answer": "natural linking in how has your",
      "options": [
        "natural linking in how has your",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "small-talk-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: starting a friendly short conversation.",
      "answer": "How has your ___ been? Mine has been ___.",
      "options": [
        "Actually, let me put it another way.",
        "natural linking in how has your",
        "One word is always enough.",
        "How has your ___ been? Mine has been ___."
      ],
      "id": "small-talk-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Small Talk\".",
      "answer": "Actually, let me put it another way.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Actually, let me put it another way.",
        "How has your week been? Mine has been busy but good."
      ],
      "id": "small-talk-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Answer briefly, then ask one follow-up question.",
      "options": [
        "Use filler sounds after every word.",
        "Answer briefly, then ask one follow-up question.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "small-talk-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "How has your week been? Mine has been busy but good.",
      "options": [
        "How has your week been? Mine has been busy but good.",
        "How is your week going?",
        "How has your week been so far?",
        "Fine."
      ],
      "id": "small-talk-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "natural linking in how has your",
      "options": [
        "Answer briefly, then ask one follow-up question.",
        "open a topic, respond naturally, and ask a follow-up question",
        "translation speed",
        "natural linking in how has your"
      ],
      "id": "small-talk-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik5Page() {
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
