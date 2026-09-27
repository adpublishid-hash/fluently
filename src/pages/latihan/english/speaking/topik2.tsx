import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "daily-routine",
  "title": "Daily Routine",
  "description": "Bercerita tentang rutinitas harian dengan present simple.",
  "situation": "talking about your normal day",
  "goal": "describe morning, work or study, and evening habits",
  "pattern": "I usually ___ in the morning, then I ___ before ___.",
  "pronunciation": "final -s in third-person routine verbs",
  "sample": "I usually check my schedule in the morning, then I study before lunch.",
  "formalResponse": "My routine is fairly consistent during the week.",
  "casualResponse": "My days are pretty simple.",
  "repairPhrase": "What I mean is, this is what I usually do.",
  "fluencyTip": "Use sequence words like first, then, after that, and finally.",
  "topicNumber": 2
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: talking about your normal day.",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple.",
        "I do not know anything about this topic."
      ],
      "id": "daily-routine-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe morning, work or study, and evening habits",
        "memorize spelling only"
      ],
      "id": "daily-routine-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "Maybe later, thank you.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "Yes.",
        "No problem."
      ],
      "id": "daily-routine-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Bercerita tentang rutinitas harian dengan present simple.",
      "answer": "My days are pretty simple.",
      "options": [
        "My days are pretty simple.",
        "What I mean is, this is what I usually do.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "daily-routine-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "describe morning, work or study, and evening habits",
        "final -s in third-person routine verbs",
        "Use sequence words like first, then, after that, and finally.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "final -s in third-person routine verbs",
        "answer without listening to the question",
        "describe morning, work or study, and evening habits",
        "Bercerita tentang rutinitas harian dengan present simple."
      ],
      "id": "daily-routine-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "I went there yesterday because blue."
      ],
      "id": "daily-routine-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Daily Routine\".",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "I usually ___ in the morning, then I ___ before ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "daily-routine-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe morning, work or study, and evening habits"
      ],
      "id": "daily-routine-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "What I mean is, this is what I usually do.",
        "Yeah, whatever.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "My days are pretty simple.",
      "options": [
        "It is hereby requested that silence continues.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "I will stop speaking now."
      ],
      "id": "daily-routine-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Daily Routine.",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "No, I do not want to answer.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Daily Routine.",
      "answer": "My days are pretty simple.",
      "options": [
        "This document has been processed accordingly.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: talking about your normal day.",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "What I mean is, this is what I usually do.",
        "Please ignore every mistake.",
        "describe morning, work or study, and evening habits",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Daily Routine.",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "Laugh and end the conversation.",
        "What I mean is, this is what I usually do.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "daily-routine-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "final -s in third-person routine verbs",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "daily-routine-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "avoid listening to your own recording",
        "final -s in third-person routine verbs",
        "Bercerita tentang rutinitas harian dengan present simple.",
        "ignore word stress completely"
      ],
      "id": "daily-routine-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Daily Routine.",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "final -s in third-person routine verbs",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "daily-routine-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: talking about your normal day.",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "What I mean is, this is what I usually do.",
        "final -s in third-person routine verbs",
        "One word is always enough.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Daily Routine\".",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch."
      ],
      "id": "daily-routine-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Use filler sounds after every word.",
        "Use sequence words like first, then, after that, and finally.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "daily-routine-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "Fine."
      ],
      "id": "daily-routine-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "Use sequence words like first, then, after that, and finally.",
        "describe morning, work or study, and evening habits",
        "translation speed",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: talking about your normal day.",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple.",
        "I do not know anything about this topic."
      ],
      "id": "daily-routine-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe morning, work or study, and evening habits",
        "memorize spelling only"
      ],
      "id": "daily-routine-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "Maybe later, thank you.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "Yes.",
        "No problem."
      ],
      "id": "daily-routine-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Bercerita tentang rutinitas harian dengan present simple.",
      "answer": "My days are pretty simple.",
      "options": [
        "My days are pretty simple.",
        "What I mean is, this is what I usually do.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "daily-routine-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "describe morning, work or study, and evening habits",
        "final -s in third-person routine verbs",
        "Use sequence words like first, then, after that, and finally.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "final -s in third-person routine verbs",
        "answer without listening to the question",
        "describe morning, work or study, and evening habits",
        "Bercerita tentang rutinitas harian dengan present simple."
      ],
      "id": "daily-routine-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "I went there yesterday because blue."
      ],
      "id": "daily-routine-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Daily Routine\".",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "I usually ___ in the morning, then I ___ before ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "daily-routine-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe morning, work or study, and evening habits",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe morning, work or study, and evening habits"
      ],
      "id": "daily-routine-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "What I mean is, this is what I usually do.",
        "Yeah, whatever.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "My days are pretty simple.",
      "options": [
        "It is hereby requested that silence continues.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "I will stop speaking now."
      ],
      "id": "daily-routine-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Daily Routine.",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "No, I do not want to answer.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Daily Routine.",
      "answer": "My days are pretty simple.",
      "options": [
        "This document has been processed accordingly.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: talking about your normal day.",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "What I mean is, this is what I usually do.",
        "Please ignore every mistake.",
        "describe morning, work or study, and evening habits",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Daily Routine.",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "Laugh and end the conversation.",
        "What I mean is, this is what I usually do.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "daily-routine-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "final -s in third-person routine verbs",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "daily-routine-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use sequence words like first, then, after that, and finally."
      ],
      "id": "daily-routine-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "My routine is fairly consistent during the week.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "My routine is fairly consistent during the week.",
        "My days are pretty simple."
      ],
      "id": "daily-routine-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "avoid listening to your own recording",
        "final -s in third-person routine verbs",
        "Bercerita tentang rutinitas harian dengan present simple.",
        "ignore word stress completely"
      ],
      "id": "daily-routine-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Daily Routine.",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "final -s in third-person routine verbs",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "daily-routine-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: talking about your normal day.",
      "answer": "I usually ___ in the morning, then I ___ before ___.",
      "options": [
        "What I mean is, this is what I usually do.",
        "final -s in third-person routine verbs",
        "One word is always enough.",
        "I usually ___ in the morning, then I ___ before ___."
      ],
      "id": "daily-routine-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Daily Routine\".",
      "answer": "What I mean is, this is what I usually do.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "What I mean is, this is what I usually do.",
        "I usually check my schedule in the morning, then I study before lunch."
      ],
      "id": "daily-routine-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Use sequence words like first, then, after that, and finally.",
      "options": [
        "Use filler sounds after every word.",
        "Use sequence words like first, then, after that, and finally.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "daily-routine-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I usually check my schedule in the morning, then I study before lunch.",
      "options": [
        "I usually check my schedule in the morning, then I study before lunch.",
        "My days are pretty simple.",
        "My routine is fairly consistent during the week.",
        "Fine."
      ],
      "id": "daily-routine-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "final -s in third-person routine verbs",
      "options": [
        "Use sequence words like first, then, after that, and finally.",
        "describe morning, work or study, and evening habits",
        "translation speed",
        "final -s in third-person routine verbs"
      ],
      "id": "daily-routine-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik2Page() {
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
