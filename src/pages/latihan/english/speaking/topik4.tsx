import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "asking-directions",
  "title": "Asking for Directions",
  "description": "Minta arah dan memastikan instruksi dengan jelas.",
  "situation": "asking someone how to get to a place",
  "goal": "ask for directions, repeat key landmarks, and thank the person",
  "pattern": "Excuse me, how do I get to ___ from here?",
  "pronunciation": "stress place names and direction words",
  "sample": "Excuse me, how do I get to the train station from here?",
  "formalResponse": "Could you tell me the best way to reach the station?",
  "casualResponse": "How do I get to the station?",
  "repairPhrase": "So I go straight first, then turn left, right?",
  "fluencyTip": "Repeat the route in your own words to confirm understanding.",
  "topicNumber": 4
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: asking someone how to get to a place.",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?",
        "I do not know anything about this topic."
      ],
      "id": "asking-directions-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "ask for directions, repeat key landmarks, and thank the person",
        "memorize spelling only"
      ],
      "id": "asking-directions-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Maybe later, thank you.",
        "Excuse me, how do I get to the train station from here?",
        "Yes.",
        "No problem."
      ],
      "id": "asking-directions-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Minta arah dan memastikan instruksi dengan jelas.",
      "answer": "How do I get to the station?",
      "options": [
        "How do I get to the station?",
        "So I go straight first, then turn left, right?",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "asking-directions-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "ask for directions, repeat key landmarks, and thank the person",
        "stress place names and direction words",
        "Repeat the route in your own words to confirm understanding.",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "stress place names and direction words",
        "answer without listening to the question",
        "ask for directions, repeat key landmarks, and thank the person",
        "Minta arah dan memastikan instruksi dengan jelas."
      ],
      "id": "asking-directions-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "I went there yesterday because blue."
      ],
      "id": "asking-directions-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Asking for Directions\".",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "Excuse me, how do I get to ___ from here?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "asking-directions-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "ask for directions, repeat key landmarks, and thank the person"
      ],
      "id": "asking-directions-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Yeah, whatever.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "How do I get to the station?",
      "options": [
        "It is hereby requested that silence continues.",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "I will stop speaking now."
      ],
      "id": "asking-directions-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Asking for Directions.",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "No, I do not want to answer.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Asking for Directions.",
      "answer": "How do I get to the station?",
      "options": [
        "This document has been processed accordingly.",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: asking someone how to get to a place.",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Please ignore every mistake.",
        "ask for directions, repeat key landmarks, and thank the person",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Asking for Directions.",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "Laugh and end the conversation.",
        "So I go straight first, then turn left, right?",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "asking-directions-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "stress place names and direction words",
      "options": [
        "stress place names and direction words",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "asking-directions-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "stress place names and direction words",
      "options": [
        "avoid listening to your own recording",
        "stress place names and direction words",
        "Minta arah dan memastikan instruksi dengan jelas.",
        "ignore word stress completely"
      ],
      "id": "asking-directions-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Asking for Directions.",
      "answer": "stress place names and direction words",
      "options": [
        "stress place names and direction words",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "asking-directions-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: asking someone how to get to a place.",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "So I go straight first, then turn left, right?",
        "stress place names and direction words",
        "One word is always enough.",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Asking for Directions\".",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?"
      ],
      "id": "asking-directions-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Use filler sounds after every word.",
        "Repeat the route in your own words to confirm understanding.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "asking-directions-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "Fine."
      ],
      "id": "asking-directions-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "stress place names and direction words",
      "options": [
        "Repeat the route in your own words to confirm understanding.",
        "ask for directions, repeat key landmarks, and thank the person",
        "translation speed",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: asking someone how to get to a place.",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?",
        "I do not know anything about this topic."
      ],
      "id": "asking-directions-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "ask for directions, repeat key landmarks, and thank the person",
        "memorize spelling only"
      ],
      "id": "asking-directions-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Maybe later, thank you.",
        "Excuse me, how do I get to the train station from here?",
        "Yes.",
        "No problem."
      ],
      "id": "asking-directions-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Minta arah dan memastikan instruksi dengan jelas.",
      "answer": "How do I get to the station?",
      "options": [
        "How do I get to the station?",
        "So I go straight first, then turn left, right?",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "asking-directions-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "ask for directions, repeat key landmarks, and thank the person",
        "stress place names and direction words",
        "Repeat the route in your own words to confirm understanding.",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "stress place names and direction words",
        "answer without listening to the question",
        "ask for directions, repeat key landmarks, and thank the person",
        "Minta arah dan memastikan instruksi dengan jelas."
      ],
      "id": "asking-directions-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "I went there yesterday because blue."
      ],
      "id": "asking-directions-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Asking for Directions\".",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "Excuse me, how do I get to ___ from here?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "asking-directions-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "ask for directions, repeat key landmarks, and thank the person",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "ask for directions, repeat key landmarks, and thank the person"
      ],
      "id": "asking-directions-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Yeah, whatever.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "How do I get to the station?",
      "options": [
        "It is hereby requested that silence continues.",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "I will stop speaking now."
      ],
      "id": "asking-directions-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Asking for Directions.",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "No, I do not want to answer.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Asking for Directions.",
      "answer": "How do I get to the station?",
      "options": [
        "This document has been processed accordingly.",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: asking someone how to get to a place.",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Please ignore every mistake.",
        "ask for directions, repeat key landmarks, and thank the person",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Asking for Directions.",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "Laugh and end the conversation.",
        "So I go straight first, then turn left, right?",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "asking-directions-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "stress place names and direction words",
      "options": [
        "stress place names and direction words",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "asking-directions-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Repeat the route in your own words to confirm understanding."
      ],
      "id": "asking-directions-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "Could you tell me the best way to reach the station?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Could you tell me the best way to reach the station?",
        "How do I get to the station?"
      ],
      "id": "asking-directions-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "stress place names and direction words",
      "options": [
        "avoid listening to your own recording",
        "stress place names and direction words",
        "Minta arah dan memastikan instruksi dengan jelas.",
        "ignore word stress completely"
      ],
      "id": "asking-directions-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Asking for Directions.",
      "answer": "stress place names and direction words",
      "options": [
        "stress place names and direction words",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "asking-directions-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: asking someone how to get to a place.",
      "answer": "Excuse me, how do I get to ___ from here?",
      "options": [
        "So I go straight first, then turn left, right?",
        "stress place names and direction words",
        "One word is always enough.",
        "Excuse me, how do I get to ___ from here?"
      ],
      "id": "asking-directions-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Asking for Directions\".",
      "answer": "So I go straight first, then turn left, right?",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "So I go straight first, then turn left, right?",
        "Excuse me, how do I get to the train station from here?"
      ],
      "id": "asking-directions-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Repeat the route in your own words to confirm understanding.",
      "options": [
        "Use filler sounds after every word.",
        "Repeat the route in your own words to confirm understanding.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "asking-directions-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Excuse me, how do I get to the train station from here?",
      "options": [
        "Excuse me, how do I get to the train station from here?",
        "How do I get to the station?",
        "Could you tell me the best way to reach the station?",
        "Fine."
      ],
      "id": "asking-directions-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "stress place names and direction words",
      "options": [
        "Repeat the route in your own words to confirm understanding.",
        "ask for directions, repeat key landmarks, and thank the person",
        "translation speed",
        "stress place names and direction words"
      ],
      "id": "asking-directions-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik4Page() {
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
