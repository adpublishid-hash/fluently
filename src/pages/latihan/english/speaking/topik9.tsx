import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "giving-opinion",
  "title": "Giving Opinions",
  "description": "Mengutarakan pendapat dan alasan secara sopan.",
  "situation": "sharing your opinion in a discussion",
  "goal": "state an opinion, support it, and acknowledge another view",
  "pattern": "I think ___ because ___. However, I understand that ___.",
  "pronunciation": "stress contrast words like however and but",
  "sample": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
  "formalResponse": "From my perspective, the main benefit is flexibility.",
  "casualResponse": "I think it is helpful because it saves time.",
  "repairPhrase": "To clarify, I am not saying it is perfect.",
  "fluencyTip": "Use because for your reason and however for balance.",
  "topicNumber": 9
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: sharing your opinion in a discussion.",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time.",
        "I do not know anything about this topic."
      ],
      "id": "giving-opinion-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "state an opinion, support it, and acknowledge another view",
        "memorize spelling only"
      ],
      "id": "giving-opinion-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "Maybe later, thank you.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "Yes.",
        "No problem."
      ],
      "id": "giving-opinion-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Mengutarakan pendapat dan alasan secara sopan.",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "I think it is helpful because it saves time.",
        "To clarify, I am not saying it is perfect.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "giving-opinion-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "state an opinion, support it, and acknowledge another view",
        "stress contrast words like however and but",
        "Use because for your reason and however for balance.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "stress contrast words like however and but",
        "answer without listening to the question",
        "state an opinion, support it, and acknowledge another view",
        "Mengutarakan pendapat dan alasan secara sopan."
      ],
      "id": "giving-opinion-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I went there yesterday because blue."
      ],
      "id": "giving-opinion-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Giving Opinions\".",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "I think ___ because ___. However, I understand that ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "giving-opinion-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "state an opinion, support it, and acknowledge another view"
      ],
      "id": "giving-opinion-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "Yeah, whatever.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "It is hereby requested that silence continues.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I will stop speaking now."
      ],
      "id": "giving-opinion-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Giving Opinions.",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "No, I do not want to answer.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Giving Opinions.",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "This document has been processed accordingly.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: sharing your opinion in a discussion.",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "Please ignore every mistake.",
        "state an opinion, support it, and acknowledge another view",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Giving Opinions.",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "Laugh and end the conversation.",
        "To clarify, I am not saying it is perfect.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "giving-opinion-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "stress contrast words like however and but",
      "options": [
        "stress contrast words like however and but",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "giving-opinion-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "stress contrast words like however and but",
      "options": [
        "avoid listening to your own recording",
        "stress contrast words like however and but",
        "Mengutarakan pendapat dan alasan secara sopan.",
        "ignore word stress completely"
      ],
      "id": "giving-opinion-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Giving Opinions.",
      "answer": "stress contrast words like however and but",
      "options": [
        "stress contrast words like however and but",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "giving-opinion-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: sharing your opinion in a discussion.",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "stress contrast words like however and but",
        "One word is always enough.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Giving Opinions\".",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support."
      ],
      "id": "giving-opinion-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Use filler sounds after every word.",
        "Use because for your reason and however for balance.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "giving-opinion-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "Fine."
      ],
      "id": "giving-opinion-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "stress contrast words like however and but",
      "options": [
        "Use because for your reason and however for balance.",
        "state an opinion, support it, and acknowledge another view",
        "translation speed",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: sharing your opinion in a discussion.",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time.",
        "I do not know anything about this topic."
      ],
      "id": "giving-opinion-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "state an opinion, support it, and acknowledge another view",
        "memorize spelling only"
      ],
      "id": "giving-opinion-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "Maybe later, thank you.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "Yes.",
        "No problem."
      ],
      "id": "giving-opinion-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Mengutarakan pendapat dan alasan secara sopan.",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "I think it is helpful because it saves time.",
        "To clarify, I am not saying it is perfect.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "giving-opinion-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "state an opinion, support it, and acknowledge another view",
        "stress contrast words like however and but",
        "Use because for your reason and however for balance.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "stress contrast words like however and but",
        "answer without listening to the question",
        "state an opinion, support it, and acknowledge another view",
        "Mengutarakan pendapat dan alasan secara sopan."
      ],
      "id": "giving-opinion-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I went there yesterday because blue."
      ],
      "id": "giving-opinion-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Giving Opinions\".",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "I think ___ because ___. However, I understand that ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "giving-opinion-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "state an opinion, support it, and acknowledge another view",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "state an opinion, support it, and acknowledge another view"
      ],
      "id": "giving-opinion-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "Yeah, whatever.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "It is hereby requested that silence continues.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I will stop speaking now."
      ],
      "id": "giving-opinion-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Giving Opinions.",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "No, I do not want to answer.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Giving Opinions.",
      "answer": "I think it is helpful because it saves time.",
      "options": [
        "This document has been processed accordingly.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: sharing your opinion in a discussion.",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "Please ignore every mistake.",
        "state an opinion, support it, and acknowledge another view",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Giving Opinions.",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "Laugh and end the conversation.",
        "To clarify, I am not saying it is perfect.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "giving-opinion-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "stress contrast words like however and but",
      "options": [
        "stress contrast words like however and but",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "giving-opinion-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use because for your reason and however for balance."
      ],
      "id": "giving-opinion-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "From my perspective, the main benefit is flexibility.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "From my perspective, the main benefit is flexibility.",
        "I think it is helpful because it saves time."
      ],
      "id": "giving-opinion-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "stress contrast words like however and but",
      "options": [
        "avoid listening to your own recording",
        "stress contrast words like however and but",
        "Mengutarakan pendapat dan alasan secara sopan.",
        "ignore word stress completely"
      ],
      "id": "giving-opinion-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Giving Opinions.",
      "answer": "stress contrast words like however and but",
      "options": [
        "stress contrast words like however and but",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "giving-opinion-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: sharing your opinion in a discussion.",
      "answer": "I think ___ because ___. However, I understand that ___.",
      "options": [
        "To clarify, I am not saying it is perfect.",
        "stress contrast words like however and but",
        "One word is always enough.",
        "I think ___ because ___. However, I understand that ___."
      ],
      "id": "giving-opinion-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Giving Opinions\".",
      "answer": "To clarify, I am not saying it is perfect.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "To clarify, I am not saying it is perfect.",
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support."
      ],
      "id": "giving-opinion-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Use because for your reason and however for balance.",
      "options": [
        "Use filler sounds after every word.",
        "Use because for your reason and however for balance.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "giving-opinion-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
      "options": [
        "I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.",
        "I think it is helpful because it saves time.",
        "From my perspective, the main benefit is flexibility.",
        "Fine."
      ],
      "id": "giving-opinion-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "stress contrast words like however and but",
      "options": [
        "Use because for your reason and however for balance.",
        "state an opinion, support it, and acknowledge another view",
        "translation speed",
        "stress contrast words like however and but"
      ],
      "id": "giving-opinion-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik9Page() {
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
