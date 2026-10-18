import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "complaint-request",
  "title": "Complaint & Request",
  "description": "Menyampaikan keluhan dengan tetap sopan.",
  "situation": "reporting a problem to customer service",
  "goal": "explain the problem, request a solution, and stay polite",
  "pattern": "I am afraid there is a problem with ___. Could you please ___?",
  "pronunciation": "polite tone on could you please",
  "sample": "I am afraid there is a problem with my order. Could you please check it?",
  "formalResponse": "I would appreciate it if you could look into this issue.",
  "casualResponse": "Could you help me fix this?",
  "repairPhrase": "I do not mean to complain, but I need some help with this.",
  "fluencyTip": "Describe the problem first, then ask for one clear action.",
  "topicNumber": 12
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: reporting a problem to customer service.",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?",
        "I do not know anything about this topic."
      ],
      "id": "complaint-request-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "explain the problem, request a solution, and stay polite",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "explain the problem, request a solution, and stay polite",
        "memorize spelling only"
      ],
      "id": "complaint-request-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "Maybe later, thank you.",
        "I am afraid there is a problem with my order. Could you please check it?",
        "Yes.",
        "No problem."
      ],
      "id": "complaint-request-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Menyampaikan keluhan dengan tetap sopan.",
      "answer": "Could you help me fix this?",
      "options": [
        "Could you help me fix this?",
        "I do not mean to complain, but I need some help with this.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "complaint-request-speaking-4",
      "level": "Basic"
    },
    {
      "id": "complaint-request-speaking-5",
      "level": "Basic",
      "prompt": "Which sentence starts a polite complaint?",
      "answer": "Excuse me, I have a problem with my room.",
      "options": [
        "Excuse me, I has a problem with my room.",
        "Hey, your room is the worst problem ever.",
        "Excuse me, I have a problem with my room.",
        "Excuse me, my room have a problem with it."
      ]
    },
    {
      "id": "complaint-request-speaking-6",
      "level": "Basic",
      "prompt": "Your shirt is too small. What do you say in the shop?",
      "answer": "Can I change this for a bigger size?",
      "options": [
        "Can I change this for a smaller size?",
        "Can I change this to more small size?",
        "Can I buy this for a bigger price?",
        "Can I change this for a bigger size?"
      ]
    },
    {
      "id": "complaint-request-speaking-7",
      "level": "Basic",
      "prompt": "The TV in your room does not work. Which sentence explains this clearly?",
      "answer": "The TV in my room isn't working.",
      "options": [
        "The TV in my room isn't working.",
        "The TV in my room don't working.",
        "The TV is in my room working.",
        "The TV in my room isn't watching."
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Complaint & Request\".",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "I am afraid there is a problem with ___. Could you please ___?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "complaint-request-speaking-8",
      "level": "Basic"
    },
    {
      "id": "complaint-request-speaking-9",
      "level": "Basic",
      "prompt": "Which sentence asks for help politely?",
      "answer": "Could you please send someone?",
      "options": [
        "Could you please send someone?",
        "You must send someone right now.",
        "Could you please sending someone?",
        "Send somebody, okay, quickly?"
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "Yeah, whatever.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Could you help me fix this?",
      "options": [
        "It is hereby requested that silence continues.",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "I am afraid there is a problem with my order. Could you please check it?",
        "I would appreciate it if you could look into this issue.",
        "I will stop speaking now."
      ],
      "id": "complaint-request-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Complaint & Request.",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "No, I do not want to answer.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Complaint & Request.",
      "answer": "Could you help me fix this?",
      "options": [
        "This document has been processed accordingly.",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: reporting a problem to customer service.",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "Please ignore every mistake.",
        "explain the problem, request a solution, and stay polite",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Complaint & Request.",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "complaint-request-speaking-18",
      "level": "Intermediate",
      "prompt": "Your parcel arrived damaged. Which request states the problem and one clear action?",
      "answer": "My parcel arrived damaged. Could you arrange a replacement, please?",
      "options": [
        "My parcel arrived damaged. Could you arrange a replacement, please?",
        "My parcel arrived. Could you arrange something or other, maybe, please?",
        "My parcel arrived damaged. I'm very angry, and that's all I want to say.",
        "Your company always damages everything. I want everything fixed now."
      ]
    },
    {
      "id": "complaint-request-speaking-19",
      "level": "Intermediate",
      "prompt": "The agent says, \"There's nothing I can do.\" Which reply stays polite but firm?",
      "answer": "I understand, but could I speak to a supervisor, please?",
      "options": [
        "I understand. Then I'll just accept it and go home now.",
        "I understand, but could I speak to a supervisor, please?",
        "I understand, but could I speaking to a supervisor, please?",
        "That's ridiculous. You are useless, and so is this company."
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "polite tone on could you please",
      "options": [
        "polite tone on could you please",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "complaint-request-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "polite tone on could you please",
      "options": [
        "avoid listening to your own recording",
        "polite tone on could you please",
        "Menyampaikan keluhan dengan tetap sopan.",
        "ignore word stress completely"
      ],
      "id": "complaint-request-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Complaint & Request.",
      "answer": "polite tone on could you please",
      "options": [
        "polite tone on could you please",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "complaint-request-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: reporting a problem to customer service.",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "polite tone on could you please",
        "One word is always enough.",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Complaint & Request\".",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I do not mean to complain, but I need some help with this.",
        "I am afraid there is a problem with my order. Could you please check it?"
      ],
      "id": "complaint-request-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Use filler sounds after every word.",
        "Describe the problem first, then ask for one clear action.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "complaint-request-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "Fine."
      ],
      "id": "complaint-request-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "polite tone on could you please",
      "options": [
        "Describe the problem first, then ask for one clear action.",
        "explain the problem, request a solution, and stay polite",
        "translation speed",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: reporting a problem to customer service.",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?",
        "I do not know anything about this topic."
      ],
      "id": "complaint-request-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "explain the problem, request a solution, and stay polite",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "explain the problem, request a solution, and stay polite",
        "memorize spelling only"
      ],
      "id": "complaint-request-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "Maybe later, thank you.",
        "I am afraid there is a problem with my order. Could you please check it?",
        "Yes.",
        "No problem."
      ],
      "id": "complaint-request-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Menyampaikan keluhan dengan tetap sopan.",
      "answer": "Could you help me fix this?",
      "options": [
        "Could you help me fix this?",
        "I do not mean to complain, but I need some help with this.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "complaint-request-speaking-4",
      "level": "Basic"
    },
    {
      "id": "complaint-request-speaking-5",
      "level": "Basic",
      "prompt": "Kalimat mana yang memulai keluhan dengan sopan?",
      "answer": "Excuse me, I have a problem with my room.",
      "options": [
        "Excuse me, I has a problem with my room.",
        "Hey, your room is the worst problem ever.",
        "Excuse me, I have a problem with my room.",
        "Excuse me, my room have a problem with it."
      ]
    },
    {
      "id": "complaint-request-speaking-6",
      "level": "Basic",
      "prompt": "Bajumu terlalu kecil. Apa yang kamu katakan di toko?",
      "answer": "Can I change this for a bigger size?",
      "options": [
        "Can I change this for a smaller size?",
        "Can I change this to more small size?",
        "Can I buy this for a bigger price?",
        "Can I change this for a bigger size?"
      ]
    },
    {
      "id": "complaint-request-speaking-7",
      "level": "Basic",
      "prompt": "TV di kamarmu tidak berfungsi. Kalimat mana yang menjelaskannya dengan jelas?",
      "answer": "The TV in my room isn't working.",
      "options": [
        "The TV in my room isn't working.",
        "The TV in my room don't working.",
        "The TV is in my room working.",
        "The TV in my room isn't watching."
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Complaint & Request\".",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "I am afraid there is a problem with ___. Could you please ___?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "complaint-request-speaking-8",
      "level": "Basic"
    },
    {
      "id": "complaint-request-speaking-9",
      "level": "Basic",
      "prompt": "Kalimat mana yang meminta bantuan dengan sopan?",
      "answer": "Could you please send someone?",
      "options": [
        "Could you please send someone?",
        "You must send someone right now.",
        "Could you please sending someone?",
        "Send somebody, okay, quickly?"
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "Yeah, whatever.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Could you help me fix this?",
      "options": [
        "It is hereby requested that silence continues.",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "I am afraid there is a problem with my order. Could you please check it?",
        "I would appreciate it if you could look into this issue.",
        "I will stop speaking now."
      ],
      "id": "complaint-request-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Complaint & Request.",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "No, I do not want to answer.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Complaint & Request.",
      "answer": "Could you help me fix this?",
      "options": [
        "This document has been processed accordingly.",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: reporting a problem to customer service.",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "Please ignore every mistake.",
        "explain the problem, request a solution, and stay polite",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Complaint & Request.",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "complaint-request-speaking-18",
      "level": "Intermediate",
      "prompt": "Paketmu tiba dalam keadaan rusak. Permintaan mana yang menyebutkan masalah dan satu tindakan yang jelas?",
      "answer": "My parcel arrived damaged. Could you arrange a replacement, please?",
      "options": [
        "My parcel arrived damaged. Could you arrange a replacement, please?",
        "My parcel arrived. Could you arrange something or other, maybe, please?",
        "My parcel arrived damaged. I'm very angry, and that's all I want to say.",
        "Your company always damages everything. I want everything fixed now."
      ]
    },
    {
      "id": "complaint-request-speaking-19",
      "level": "Intermediate",
      "prompt": "Petugas berkata, \"There's nothing I can do.\" Balasan mana yang tetap sopan tetapi tegas?",
      "answer": "I understand, but could I speak to a supervisor, please?",
      "options": [
        "I understand. Then I'll just accept it and go home now.",
        "I understand, but could I speak to a supervisor, please?",
        "I understand, but could I speaking to a supervisor, please?",
        "That's ridiculous. You are useless, and so is this company."
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "polite tone on could you please",
      "options": [
        "polite tone on could you please",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "complaint-request-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Describe the problem first, then ask for one clear action."
      ],
      "id": "complaint-request-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "I would appreciate it if you could look into this issue.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I would appreciate it if you could look into this issue.",
        "Could you help me fix this?"
      ],
      "id": "complaint-request-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "polite tone on could you please",
      "options": [
        "avoid listening to your own recording",
        "polite tone on could you please",
        "Menyampaikan keluhan dengan tetap sopan.",
        "ignore word stress completely"
      ],
      "id": "complaint-request-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Complaint & Request.",
      "answer": "polite tone on could you please",
      "options": [
        "polite tone on could you please",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "complaint-request-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: reporting a problem to customer service.",
      "answer": "I am afraid there is a problem with ___. Could you please ___?",
      "options": [
        "I do not mean to complain, but I need some help with this.",
        "polite tone on could you please",
        "One word is always enough.",
        "I am afraid there is a problem with ___. Could you please ___?"
      ],
      "id": "complaint-request-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Complaint & Request\".",
      "answer": "I do not mean to complain, but I need some help with this.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I do not mean to complain, but I need some help with this.",
        "I am afraid there is a problem with my order. Could you please check it?"
      ],
      "id": "complaint-request-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Describe the problem first, then ask for one clear action.",
      "options": [
        "Use filler sounds after every word.",
        "Describe the problem first, then ask for one clear action.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "complaint-request-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I am afraid there is a problem with my order. Could you please check it?",
      "options": [
        "I am afraid there is a problem with my order. Could you please check it?",
        "Could you help me fix this?",
        "I would appreciate it if you could look into this issue.",
        "Fine."
      ],
      "id": "complaint-request-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "polite tone on could you please",
      "options": [
        "Describe the problem first, then ask for one clear action.",
        "explain the problem, request a solution, and stay polite",
        "translation speed",
        "polite tone on could you please"
      ],
      "id": "complaint-request-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik12Page() {
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
