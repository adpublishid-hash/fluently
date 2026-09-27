import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "agree-disagree",
  "title": "Agreeing & Disagreeing",
  "description": "Setuju dan tidak setuju tanpa terdengar kasar.",
  "situation": "responding to another person in a discussion",
  "goal": "agree, partly agree, or disagree with a reason",
  "pattern": "I see your point, but I think ___ because ___.",
  "pronunciation": "soft tone before disagreement phrases",
  "sample": "I see your point, but I think remote work is still useful because it saves commuting time.",
  "formalResponse": "I partly agree, although I would add one concern.",
  "casualResponse": "I get that, but I see it a bit differently.",
  "repairPhrase": "I may have explained that too strongly. What I mean is...",
  "fluencyTip": "Acknowledge the other view before giving your own.",
  "topicNumber": 14
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: responding to another person in a discussion.",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently.",
        "I do not know anything about this topic."
      ],
      "id": "agree-disagree-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "agree, partly agree, or disagree with a reason",
        "memorize spelling only"
      ],
      "id": "agree-disagree-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "Maybe later, thank you.",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "Yes.",
        "No problem."
      ],
      "id": "agree-disagree-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Setuju dan tidak setuju tanpa terdengar kasar.",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "I get that, but I see it a bit differently.",
        "I may have explained that too strongly. What I mean is...",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "agree-disagree-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "agree, partly agree, or disagree with a reason",
        "soft tone before disagreement phrases",
        "Acknowledge the other view before giving your own.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "soft tone before disagreement phrases",
        "answer without listening to the question",
        "agree, partly agree, or disagree with a reason",
        "Setuju dan tidak setuju tanpa terdengar kasar."
      ],
      "id": "agree-disagree-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I went there yesterday because blue."
      ],
      "id": "agree-disagree-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Agreeing & Disagreeing\".",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "I see your point, but I think ___ because ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "agree-disagree-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "agree, partly agree, or disagree with a reason"
      ],
      "id": "agree-disagree-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "Yeah, whatever.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "It is hereby requested that silence continues.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I will stop speaking now."
      ],
      "id": "agree-disagree-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Agreeing & Disagreeing.",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "No, I do not want to answer.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Agreeing & Disagreeing.",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "This document has been processed accordingly.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: responding to another person in a discussion.",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "Please ignore every mistake.",
        "agree, partly agree, or disagree with a reason",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Agreeing & Disagreeing.",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "Laugh and end the conversation.",
        "I may have explained that too strongly. What I mean is...",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "agree-disagree-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "soft tone before disagreement phrases",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "agree-disagree-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "avoid listening to your own recording",
        "soft tone before disagreement phrases",
        "Setuju dan tidak setuju tanpa terdengar kasar.",
        "ignore word stress completely"
      ],
      "id": "agree-disagree-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Agreeing & Disagreeing.",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "soft tone before disagreement phrases",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "agree-disagree-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: responding to another person in a discussion.",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "soft tone before disagreement phrases",
        "One word is always enough.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Agreeing & Disagreeing\".",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time."
      ],
      "id": "agree-disagree-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Use filler sounds after every word.",
        "Acknowledge the other view before giving your own.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "agree-disagree-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "Fine."
      ],
      "id": "agree-disagree-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "Acknowledge the other view before giving your own.",
        "agree, partly agree, or disagree with a reason",
        "translation speed",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: responding to another person in a discussion.",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently.",
        "I do not know anything about this topic."
      ],
      "id": "agree-disagree-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "agree, partly agree, or disagree with a reason",
        "memorize spelling only"
      ],
      "id": "agree-disagree-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "Maybe later, thank you.",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "Yes.",
        "No problem."
      ],
      "id": "agree-disagree-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Setuju dan tidak setuju tanpa terdengar kasar.",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "I get that, but I see it a bit differently.",
        "I may have explained that too strongly. What I mean is...",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "agree-disagree-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "agree, partly agree, or disagree with a reason",
        "soft tone before disagreement phrases",
        "Acknowledge the other view before giving your own.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "soft tone before disagreement phrases",
        "answer without listening to the question",
        "agree, partly agree, or disagree with a reason",
        "Setuju dan tidak setuju tanpa terdengar kasar."
      ],
      "id": "agree-disagree-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I went there yesterday because blue."
      ],
      "id": "agree-disagree-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Agreeing & Disagreeing\".",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "I see your point, but I think ___ because ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "agree-disagree-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "agree, partly agree, or disagree with a reason",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "agree, partly agree, or disagree with a reason"
      ],
      "id": "agree-disagree-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "Yeah, whatever.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "It is hereby requested that silence continues.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I will stop speaking now."
      ],
      "id": "agree-disagree-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Agreeing & Disagreeing.",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "No, I do not want to answer.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Agreeing & Disagreeing.",
      "answer": "I get that, but I see it a bit differently.",
      "options": [
        "This document has been processed accordingly.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: responding to another person in a discussion.",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "Please ignore every mistake.",
        "agree, partly agree, or disagree with a reason",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Agreeing & Disagreeing.",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "Laugh and end the conversation.",
        "I may have explained that too strongly. What I mean is...",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "agree-disagree-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "soft tone before disagreement phrases",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "agree-disagree-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Acknowledge the other view before giving your own."
      ],
      "id": "agree-disagree-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "I partly agree, although I would add one concern.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I partly agree, although I would add one concern.",
        "I get that, but I see it a bit differently."
      ],
      "id": "agree-disagree-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "avoid listening to your own recording",
        "soft tone before disagreement phrases",
        "Setuju dan tidak setuju tanpa terdengar kasar.",
        "ignore word stress completely"
      ],
      "id": "agree-disagree-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Agreeing & Disagreeing.",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "soft tone before disagreement phrases",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "agree-disagree-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: responding to another person in a discussion.",
      "answer": "I see your point, but I think ___ because ___.",
      "options": [
        "I may have explained that too strongly. What I mean is...",
        "soft tone before disagreement phrases",
        "One word is always enough.",
        "I see your point, but I think ___ because ___."
      ],
      "id": "agree-disagree-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Agreeing & Disagreeing\".",
      "answer": "I may have explained that too strongly. What I mean is...",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I may have explained that too strongly. What I mean is...",
        "I see your point, but I think remote work is still useful because it saves commuting time."
      ],
      "id": "agree-disagree-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Acknowledge the other view before giving your own.",
      "options": [
        "Use filler sounds after every word.",
        "Acknowledge the other view before giving your own.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "agree-disagree-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I see your point, but I think remote work is still useful because it saves commuting time.",
      "options": [
        "I see your point, but I think remote work is still useful because it saves commuting time.",
        "I get that, but I see it a bit differently.",
        "I partly agree, although I would add one concern.",
        "Fine."
      ],
      "id": "agree-disagree-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "soft tone before disagreement phrases",
      "options": [
        "Acknowledge the other view before giving your own.",
        "agree, partly agree, or disagree with a reason",
        "translation speed",
        "soft tone before disagreement phrases"
      ],
      "id": "agree-disagree-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik14Page() {
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
