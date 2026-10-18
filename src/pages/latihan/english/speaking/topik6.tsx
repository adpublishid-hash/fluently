import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "phone-call",
  "title": "Phone Call",
  "description": "Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.",
  "situation": "calling an office or service desk",
  "goal": "state your reason, ask for help, and close politely",
  "pattern": "Hi, I am calling about ___. Could you help me with that?",
  "pronunciation": "clear consonants because the listener cannot see your face",
  "sample": "Hi, I am calling about my appointment. Could you help me reschedule it?",
  "formalResponse": "May I speak with someone from customer support?",
  "casualResponse": "Can I talk to someone about my booking?",
  "repairPhrase": "Sorry, the line is not clear. Could you repeat that?",
  "fluencyTip": "Speak slightly slower on phone calls and chunk your message.",
  "topicNumber": 6
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: calling an office or service desk.",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?",
        "I do not know anything about this topic."
      ],
      "id": "phone-call-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "state your reason, ask for help, and close politely",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "state your reason, ask for help, and close politely",
        "memorize spelling only"
      ],
      "id": "phone-call-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Maybe later, thank you.",
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "Yes.",
        "No problem."
      ],
      "id": "phone-call-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "Can I talk to someone about my booking?",
        "Sorry, the line is not clear. Could you repeat that?",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "phone-call-speaking-4",
      "level": "Basic"
    },
    {
      "id": "phone-call-speaking-5",
      "level": "Basic",
      "prompt": "How should you answer the phone at work?",
      "answer": "Good morning, Hana speaking.",
      "options": [
        "Good morning, this is speak Hana.",
        "Good morning, I am phone Hana.",
        "Good morning, Hana speaking.",
        "Hello, who are you and what?"
      ]
    },
    {
      "id": "phone-call-speaking-6",
      "level": "Basic",
      "prompt": "A caller asks for your manager, who is out. Which reply is best?",
      "answer": "I'm sorry, she's not in. Can I take a message?",
      "options": [
        "I'm sorry, she's not in. Can I take a message?",
        "She is out. I don't know anything. Goodbye.",
        "I'm sorry, she's not in. Can you take a message?",
        "I'm sorry, she's not in. Please never call again."
      ]
    },
    {
      "id": "phone-call-speaking-7",
      "level": "Basic",
      "prompt": "Which phrase asks the caller to wait?",
      "answer": "Could you hold on a moment, please?",
      "options": [
        "Could you hang up a moment, please?",
        "Could you speak a moment, please?",
        "Could you call me yesterday, please?",
        "Could you hold on a moment, please?"
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Phone Call\".",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Hi, I am calling about ___. Could you help me with that?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "phone-call-speaking-8",
      "level": "Basic"
    },
    {
      "id": "phone-call-speaking-9",
      "level": "Basic",
      "prompt": "Which sentence ends a phone call politely?",
      "answer": "Thanks for calling. Have a nice day.",
      "options": [
        "Hello, how can I help you today?",
        "Thanks for calling. Have a nice day.",
        "Thanks for calling. Don't call back.",
        "Okay, I'm hanging up on you now."
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Yeah, whatever.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "It is hereby requested that silence continues.",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "May I speak with someone from customer support?",
        "I will stop speaking now."
      ],
      "id": "phone-call-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Phone Call.",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "No, I do not want to answer.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Phone Call.",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "This document has been processed accordingly.",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: calling an office or service desk.",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Please ignore every mistake.",
        "state your reason, ask for help, and close politely",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Phone Call.",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "phone-call-speaking-18",
      "level": "Intermediate",
      "prompt": "You need to spell your surname on the phone. Which is the clearest way?",
      "answer": "It's Putri, P-U-T-R-I. That's P as in Peter.",
      "options": [
        "It's Putri. You can guess the spelling yourself.",
        "It's Putri, spelt with quite a lot of letters, I think.",
        "It's Putri, P-U-T-R-I, but please don't write it down.",
        "It's Putri, P-U-T-R-I. That's P as in Peter."
      ]
    },
    {
      "id": "phone-call-speaking-19",
      "level": "Intermediate",
      "prompt": "You are leaving a voicemail. Which message is most complete?",
      "answer": "Hi, this is Raka from Nusa Design. Please call me back on 0812 3344 5566.",
      "options": [
        "Hi, this is Raka from Nusa Design. Please call me back on 0812 3344 5566.",
        "Hello? Hello? Is anyone there? Okay, never mind, bye.",
        "Hi, this is Raka. I'll tell you what it's about later, maybe.",
        "Hi, it's me. You know why I'm calling, so just call me back."
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "clear consonants because the listener cannot see your face",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "phone-call-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "avoid listening to your own recording",
        "clear consonants because the listener cannot see your face",
        "Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.",
        "ignore word stress completely"
      ],
      "id": "phone-call-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Phone Call.",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "clear consonants because the listener cannot see your face",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "phone-call-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: calling an office or service desk.",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "clear consonants because the listener cannot see your face",
        "One word is always enough.",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Phone Call\".",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Sorry, the line is not clear. Could you repeat that?",
        "Hi, I am calling about my appointment. Could you help me reschedule it?"
      ],
      "id": "phone-call-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Use filler sounds after every word.",
        "Speak slightly slower on phone calls and chunk your message.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "phone-call-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "Fine."
      ],
      "id": "phone-call-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "Speak slightly slower on phone calls and chunk your message.",
        "state your reason, ask for help, and close politely",
        "translation speed",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: calling an office or service desk.",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?",
        "I do not know anything about this topic."
      ],
      "id": "phone-call-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "state your reason, ask for help, and close politely",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "state your reason, ask for help, and close politely",
        "memorize spelling only"
      ],
      "id": "phone-call-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Maybe later, thank you.",
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "Yes.",
        "No problem."
      ],
      "id": "phone-call-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "Can I talk to someone about my booking?",
        "Sorry, the line is not clear. Could you repeat that?",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "phone-call-speaking-4",
      "level": "Basic"
    },
    {
      "id": "phone-call-speaking-5",
      "level": "Basic",
      "prompt": "Bagaimana sebaiknya kamu menjawab telepon di kantor?",
      "answer": "Good morning, Hana speaking.",
      "options": [
        "Good morning, this is speak Hana.",
        "Good morning, I am phone Hana.",
        "Good morning, Hana speaking.",
        "Hello, who are you and what?"
      ]
    },
    {
      "id": "phone-call-speaking-6",
      "level": "Basic",
      "prompt": "Penelepon mencari manajermu yang sedang keluar. Balasan mana yang paling tepat?",
      "answer": "I'm sorry, she's not in. Can I take a message?",
      "options": [
        "I'm sorry, she's not in. Can I take a message?",
        "She is out. I don't know anything. Goodbye.",
        "I'm sorry, she's not in. Can you take a message?",
        "I'm sorry, she's not in. Please never call again."
      ]
    },
    {
      "id": "phone-call-speaking-7",
      "level": "Basic",
      "prompt": "Frasa mana yang meminta penelepon untuk menunggu?",
      "answer": "Could you hold on a moment, please?",
      "options": [
        "Could you hang up a moment, please?",
        "Could you speak a moment, please?",
        "Could you call me yesterday, please?",
        "Could you hold on a moment, please?"
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Phone Call\".",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Hi, I am calling about ___. Could you help me with that?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "phone-call-speaking-8",
      "level": "Basic"
    },
    {
      "id": "phone-call-speaking-9",
      "level": "Basic",
      "prompt": "Kalimat mana yang menutup panggilan telepon dengan sopan?",
      "answer": "Thanks for calling. Have a nice day.",
      "options": [
        "Hello, how can I help you today?",
        "Thanks for calling. Have a nice day.",
        "Thanks for calling. Don't call back.",
        "Okay, I'm hanging up on you now."
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Yeah, whatever.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "It is hereby requested that silence continues.",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "May I speak with someone from customer support?",
        "I will stop speaking now."
      ],
      "id": "phone-call-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Phone Call.",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "No, I do not want to answer.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Phone Call.",
      "answer": "Can I talk to someone about my booking?",
      "options": [
        "This document has been processed accordingly.",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: calling an office or service desk.",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "Please ignore every mistake.",
        "state your reason, ask for help, and close politely",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Phone Call.",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "phone-call-speaking-18",
      "level": "Intermediate",
      "prompt": "Kamu perlu mengeja nama belakangmu di telepon. Cara mana yang paling jelas?",
      "answer": "It's Putri, P-U-T-R-I. That's P as in Peter.",
      "options": [
        "It's Putri. You can guess the spelling yourself.",
        "It's Putri, spelt with quite a lot of letters, I think.",
        "It's Putri, P-U-T-R-I, but please don't write it down.",
        "It's Putri, P-U-T-R-I. That's P as in Peter."
      ]
    },
    {
      "id": "phone-call-speaking-19",
      "level": "Intermediate",
      "prompt": "Kamu meninggalkan pesan suara. Pesan mana yang paling lengkap?",
      "answer": "Hi, this is Raka from Nusa Design. Please call me back on 0812 3344 5566.",
      "options": [
        "Hi, this is Raka from Nusa Design. Please call me back on 0812 3344 5566.",
        "Hello? Hello? Is anyone there? Okay, never mind, bye.",
        "Hi, this is Raka. I'll tell you what it's about later, maybe.",
        "Hi, it's me. You know why I'm calling, so just call me back."
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "clear consonants because the listener cannot see your face",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "phone-call-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Speak slightly slower on phone calls and chunk your message."
      ],
      "id": "phone-call-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "May I speak with someone from customer support?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "May I speak with someone from customer support?",
        "Can I talk to someone about my booking?"
      ],
      "id": "phone-call-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "avoid listening to your own recording",
        "clear consonants because the listener cannot see your face",
        "Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.",
        "ignore word stress completely"
      ],
      "id": "phone-call-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Phone Call.",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "clear consonants because the listener cannot see your face",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "phone-call-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: calling an office or service desk.",
      "answer": "Hi, I am calling about ___. Could you help me with that?",
      "options": [
        "Sorry, the line is not clear. Could you repeat that?",
        "clear consonants because the listener cannot see your face",
        "One word is always enough.",
        "Hi, I am calling about ___. Could you help me with that?"
      ],
      "id": "phone-call-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Phone Call\".",
      "answer": "Sorry, the line is not clear. Could you repeat that?",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Sorry, the line is not clear. Could you repeat that?",
        "Hi, I am calling about my appointment. Could you help me reschedule it?"
      ],
      "id": "phone-call-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Speak slightly slower on phone calls and chunk your message.",
      "options": [
        "Use filler sounds after every word.",
        "Speak slightly slower on phone calls and chunk your message.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "phone-call-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Hi, I am calling about my appointment. Could you help me reschedule it?",
      "options": [
        "Hi, I am calling about my appointment. Could you help me reschedule it?",
        "Can I talk to someone about my booking?",
        "May I speak with someone from customer support?",
        "Fine."
      ],
      "id": "phone-call-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "clear consonants because the listener cannot see your face",
      "options": [
        "Speak slightly slower on phone calls and chunk your message.",
        "state your reason, ask for help, and close politely",
        "translation speed",
        "clear consonants because the listener cannot see your face"
      ],
      "id": "phone-call-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik6Page() {
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
