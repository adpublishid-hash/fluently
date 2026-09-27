import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "presentation-opening",
  "title": "Presentation Opening",
  "description": "Membuka presentasi dengan tujuan dan struktur.",
  "situation": "starting a short presentation",
  "goal": "greet the audience, introduce the topic, and preview points",
  "pattern": "Good morning. Today, I am going to talk about ___. I will cover ___.",
  "pronunciation": "clear pauses after greeting and topic",
  "sample": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
  "formalResponse": "Today, I would like to present three key points.",
  "casualResponse": "Today, I want to talk about three things.",
  "repairPhrase": "Let me outline the main points first.",
  "fluencyTip": "Use signposting words so listeners know where you are going.",
  "topicNumber": 13
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: starting a short presentation.",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things.",
        "I do not know anything about this topic."
      ],
      "id": "presentation-opening-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "greet the audience, introduce the topic, and preview points",
        "memorize spelling only"
      ],
      "id": "presentation-opening-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Maybe later, thank you.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Yes.",
        "No problem."
      ],
      "id": "presentation-opening-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Membuka presentasi dengan tujuan dan struktur.",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "Today, I want to talk about three things.",
        "Let me outline the main points first.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "presentation-opening-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "greet the audience, introduce the topic, and preview points",
        "clear pauses after greeting and topic",
        "Use signposting words so listeners know where you are going.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "clear pauses after greeting and topic",
        "answer without listening to the question",
        "greet the audience, introduce the topic, and preview points",
        "Membuka presentasi dengan tujuan dan struktur."
      ],
      "id": "presentation-opening-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "I went there yesterday because blue."
      ],
      "id": "presentation-opening-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Presentation Opening\".",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Good morning. Today, I am going to talk about ___. I will cover ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "presentation-opening-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "greet the audience, introduce the topic, and preview points"
      ],
      "id": "presentation-opening-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Let me outline the main points first.",
        "Yeah, whatever.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "It is hereby requested that silence continues.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me outline the main points first.",
      "options": [
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "I will stop speaking now."
      ],
      "id": "presentation-opening-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Presentation Opening.",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "No, I do not want to answer.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Presentation Opening.",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "This document has been processed accordingly.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: starting a short presentation.",
      "answer": "Let me outline the main points first.",
      "options": [
        "Let me outline the main points first.",
        "Please ignore every mistake.",
        "greet the audience, introduce the topic, and preview points",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Presentation Opening.",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me outline the main points first.",
      "options": [
        "Laugh and end the conversation.",
        "Let me outline the main points first.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "presentation-opening-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "clear pauses after greeting and topic",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "presentation-opening-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "avoid listening to your own recording",
        "clear pauses after greeting and topic",
        "Membuka presentasi dengan tujuan dan struktur.",
        "ignore word stress completely"
      ],
      "id": "presentation-opening-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Presentation Opening.",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "clear pauses after greeting and topic",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "presentation-opening-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: starting a short presentation.",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Let me outline the main points first.",
        "clear pauses after greeting and topic",
        "One word is always enough.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Presentation Opening\".",
      "answer": "Let me outline the main points first.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise."
      ],
      "id": "presentation-opening-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Use filler sounds after every word.",
        "Use signposting words so listeners know where you are going.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "presentation-opening-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "Fine."
      ],
      "id": "presentation-opening-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "Use signposting words so listeners know where you are going.",
        "greet the audience, introduce the topic, and preview points",
        "translation speed",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: starting a short presentation.",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things.",
        "I do not know anything about this topic."
      ],
      "id": "presentation-opening-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "greet the audience, introduce the topic, and preview points",
        "memorize spelling only"
      ],
      "id": "presentation-opening-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Maybe later, thank you.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Yes.",
        "No problem."
      ],
      "id": "presentation-opening-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Membuka presentasi dengan tujuan dan struktur.",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "Today, I want to talk about three things.",
        "Let me outline the main points first.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "presentation-opening-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "greet the audience, introduce the topic, and preview points",
        "clear pauses after greeting and topic",
        "Use signposting words so listeners know where you are going.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "clear pauses after greeting and topic",
        "answer without listening to the question",
        "greet the audience, introduce the topic, and preview points",
        "Membuka presentasi dengan tujuan dan struktur."
      ],
      "id": "presentation-opening-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "I went there yesterday because blue."
      ],
      "id": "presentation-opening-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Presentation Opening\".",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Good morning. Today, I am going to talk about ___. I will cover ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "presentation-opening-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "greet the audience, introduce the topic, and preview points",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "greet the audience, introduce the topic, and preview points"
      ],
      "id": "presentation-opening-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Let me outline the main points first.",
        "Yeah, whatever.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "It is hereby requested that silence continues.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me outline the main points first.",
      "options": [
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "I will stop speaking now."
      ],
      "id": "presentation-opening-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Presentation Opening.",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "No, I do not want to answer.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Presentation Opening.",
      "answer": "Today, I want to talk about three things.",
      "options": [
        "This document has been processed accordingly.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: starting a short presentation.",
      "answer": "Let me outline the main points first.",
      "options": [
        "Let me outline the main points first.",
        "Please ignore every mistake.",
        "greet the audience, introduce the topic, and preview points",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Presentation Opening.",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me outline the main points first.",
      "options": [
        "Laugh and end the conversation.",
        "Let me outline the main points first.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "presentation-opening-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "clear pauses after greeting and topic",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "presentation-opening-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use signposting words so listeners know where you are going."
      ],
      "id": "presentation-opening-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "Today, I would like to present three key points.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Today, I would like to present three key points.",
        "Today, I want to talk about three things."
      ],
      "id": "presentation-opening-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "avoid listening to your own recording",
        "clear pauses after greeting and topic",
        "Membuka presentasi dengan tujuan dan struktur.",
        "ignore word stress completely"
      ],
      "id": "presentation-opening-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Presentation Opening.",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "clear pauses after greeting and topic",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "presentation-opening-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: starting a short presentation.",
      "answer": "Good morning. Today, I am going to talk about ___. I will cover ___.",
      "options": [
        "Let me outline the main points first.",
        "clear pauses after greeting and topic",
        "One word is always enough.",
        "Good morning. Today, I am going to talk about ___. I will cover ___."
      ],
      "id": "presentation-opening-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Presentation Opening\".",
      "answer": "Let me outline the main points first.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me outline the main points first.",
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise."
      ],
      "id": "presentation-opening-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Use signposting words so listeners know where you are going.",
      "options": [
        "Use filler sounds after every word.",
        "Use signposting words so listeners know where you are going.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "presentation-opening-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
      "options": [
        "Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.",
        "Today, I want to talk about three things.",
        "Today, I would like to present three key points.",
        "Fine."
      ],
      "id": "presentation-opening-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "clear pauses after greeting and topic",
      "options": [
        "Use signposting words so listeners know where you are going.",
        "greet the audience, introduce the topic, and preview points",
        "translation speed",
        "clear pauses after greeting and topic"
      ],
      "id": "presentation-opening-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik13Page() {
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
