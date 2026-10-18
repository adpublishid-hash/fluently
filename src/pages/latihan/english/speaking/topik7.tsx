import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "travel-check-in",
  "title": "Travel Check-in",
  "description": "Latihan bicara saat check-in hotel atau bandara.",
  "situation": "checking in at a hotel or airport counter",
  "goal": "give your name, confirm a booking, and ask one practical question",
  "pattern": "I have a reservation under ___. Could I check in now?",
  "pronunciation": "sentence stress on reservation details",
  "sample": "I have a reservation under Wahib Rohman. Could I check in now?",
  "formalResponse": "I have a reservation under my name, and I would like to check in.",
  "casualResponse": "Hi, I have a booking under Wahib.",
  "repairPhrase": "The reservation is under my last name, Rohman.",
  "fluencyTip": "Keep names and numbers slow enough to be understood.",
  "topicNumber": 7
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: checking in at a hotel or airport counter.",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib.",
        "I do not know anything about this topic."
      ],
      "id": "travel-check-in-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "give your name, confirm a booking, and ask one practical question",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "give your name, confirm a booking, and ask one practical question",
        "memorize spelling only"
      ],
      "id": "travel-check-in-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "Maybe later, thank you.",
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "Yes.",
        "No problem."
      ],
      "id": "travel-check-in-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Latihan bicara saat check-in hotel atau bandara.",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "Hi, I have a booking under Wahib.",
        "The reservation is under my last name, Rohman.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "travel-check-in-speaking-4",
      "level": "Basic"
    },
    {
      "id": "travel-check-in-speaking-5",
      "level": "Basic",
      "prompt": "At the airport counter, the agent says, \"Passport, please.\" Which reply fits?",
      "answer": "Here you are.",
      "options": [
        "Here you are.",
        "You are here.",
        "Here you were.",
        "No, thank you."
      ]
    },
    {
      "id": "travel-check-in-speaking-6",
      "level": "Basic",
      "prompt": "The receptionist asks, \"How many nights?\" Which answer is correct?",
      "answer": "Three nights, please.",
      "options": [
        "Three people, please.",
        "Room three, please.",
        "Three o'clock, please.",
        "Three nights, please."
      ]
    },
    {
      "id": "travel-check-in-speaking-7",
      "level": "Basic",
      "prompt": "Which question asks about breakfast at a hotel?",
      "answer": "What time is breakfast served?",
      "options": [
        "What time breakfast is served?",
        "Where time is breakfast served?",
        "What time is breakfast served?",
        "What time is breakfast serving?"
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Travel Check-in\".",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "I have a reservation under ___. Could I check in now?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "travel-check-in-speaking-8",
      "level": "Basic"
    },
    {
      "id": "travel-check-in-speaking-9",
      "level": "Basic",
      "prompt": "The agent asks, \"Window or aisle?\" Which reply is natural?",
      "answer": "A window seat, please.",
      "options": [
        "A window seat, please.",
        "The aisle of window.",
        "A window room, please.",
        "Yes, both, thank you."
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "Yeah, whatever.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "It is hereby requested that silence continues.",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "I have a reservation under my name, and I would like to check in.",
        "I will stop speaking now."
      ],
      "id": "travel-check-in-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Travel Check-in.",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "No, I do not want to answer.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Travel Check-in.",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "This document has been processed accordingly.",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: checking in at a hotel or airport counter.",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "Please ignore every mistake.",
        "give your name, confirm a booking, and ask one practical question",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Travel Check-in.",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "travel-check-in-speaking-18",
      "level": "Intermediate",
      "prompt": "Your hotel room is not ready yet. Which request is most practical?",
      "answer": "Could I leave my luggage here while I wait for the room?",
      "options": [
        "Could I leave my luggage here while I wait for the room?",
        "Could you cancel my booking because the room isn't ready?",
        "Could you give me another hotel's room instead, right now?",
        "Could I leave my luggage here and never come back for it?"
      ]
    },
    {
      "id": "travel-check-in-speaking-19",
      "level": "Intermediate",
      "prompt": "Your bag weighs 25 kg, but the limit is 23 kg. Which response is most appropriate?",
      "answer": "I see. Could I move a few things into my hand luggage?",
      "options": [
        "I see. Could you just ignore the extra two kilos for me?",
        "I see. Could I take the whole suitcase as hand luggage?",
        "I see. Could I move a few things into my hand luggage?",
        "That's impossible. My scale at home said it was fine."
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "sentence stress on reservation details",
      "options": [
        "sentence stress on reservation details",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "travel-check-in-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "sentence stress on reservation details",
      "options": [
        "avoid listening to your own recording",
        "sentence stress on reservation details",
        "Latihan bicara saat check-in hotel atau bandara.",
        "ignore word stress completely"
      ],
      "id": "travel-check-in-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Travel Check-in.",
      "answer": "sentence stress on reservation details",
      "options": [
        "sentence stress on reservation details",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "travel-check-in-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: checking in at a hotel or airport counter.",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "The reservation is under my last name, Rohman.",
        "sentence stress on reservation details",
        "One word is always enough.",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Travel Check-in\".",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "The reservation is under my last name, Rohman.",
        "I have a reservation under Wahib Rohman. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Use filler sounds after every word.",
        "Keep names and numbers slow enough to be understood.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "travel-check-in-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "Fine."
      ],
      "id": "travel-check-in-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "sentence stress on reservation details",
      "options": [
        "Keep names and numbers slow enough to be understood.",
        "give your name, confirm a booking, and ask one practical question",
        "translation speed",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: checking in at a hotel or airport counter.",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib.",
        "I do not know anything about this topic."
      ],
      "id": "travel-check-in-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "give your name, confirm a booking, and ask one practical question",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "give your name, confirm a booking, and ask one practical question",
        "memorize spelling only"
      ],
      "id": "travel-check-in-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "Maybe later, thank you.",
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "Yes.",
        "No problem."
      ],
      "id": "travel-check-in-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Latihan bicara saat check-in hotel atau bandara.",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "Hi, I have a booking under Wahib.",
        "The reservation is under my last name, Rohman.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "travel-check-in-speaking-4",
      "level": "Basic"
    },
    {
      "id": "travel-check-in-speaking-5",
      "level": "Basic",
      "prompt": "Di konter bandara, petugas berkata, \"Passport, please.\" Balasan mana yang cocok?",
      "answer": "Here you are.",
      "options": [
        "Here you are.",
        "You are here.",
        "Here you were.",
        "No, thank you."
      ]
    },
    {
      "id": "travel-check-in-speaking-6",
      "level": "Basic",
      "prompt": "Resepsionis bertanya, \"How many nights?\" Jawaban mana yang benar?",
      "answer": "Three nights, please.",
      "options": [
        "Three people, please.",
        "Room three, please.",
        "Three o'clock, please.",
        "Three nights, please."
      ]
    },
    {
      "id": "travel-check-in-speaking-7",
      "level": "Basic",
      "prompt": "Pertanyaan mana yang menanyakan tentang sarapan di hotel?",
      "answer": "What time is breakfast served?",
      "options": [
        "What time breakfast is served?",
        "Where time is breakfast served?",
        "What time is breakfast served?",
        "What time is breakfast serving?"
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Travel Check-in\".",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "I have a reservation under ___. Could I check in now?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "travel-check-in-speaking-8",
      "level": "Basic"
    },
    {
      "id": "travel-check-in-speaking-9",
      "level": "Basic",
      "prompt": "Petugas bertanya, \"Window or aisle?\" Balasan mana yang natural?",
      "answer": "A window seat, please.",
      "options": [
        "A window seat, please.",
        "The aisle of window.",
        "A window room, please.",
        "Yes, both, thank you."
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "Yeah, whatever.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "It is hereby requested that silence continues.",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "I have a reservation under my name, and I would like to check in.",
        "I will stop speaking now."
      ],
      "id": "travel-check-in-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Travel Check-in.",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "No, I do not want to answer.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Travel Check-in.",
      "answer": "Hi, I have a booking under Wahib.",
      "options": [
        "This document has been processed accordingly.",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: checking in at a hotel or airport counter.",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "The reservation is under my last name, Rohman.",
        "Please ignore every mistake.",
        "give your name, confirm a booking, and ask one practical question",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Travel Check-in.",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "travel-check-in-speaking-18",
      "level": "Intermediate",
      "prompt": "Kamar hotelmu belum siap. Permintaan mana yang paling praktis?",
      "answer": "Could I leave my luggage here while I wait for the room?",
      "options": [
        "Could I leave my luggage here while I wait for the room?",
        "Could you cancel my booking because the room isn't ready?",
        "Could you give me another hotel's room instead, right now?",
        "Could I leave my luggage here and never come back for it?"
      ]
    },
    {
      "id": "travel-check-in-speaking-19",
      "level": "Intermediate",
      "prompt": "Tasmu beratnya 25 kg, padahal batasnya 23 kg. Respons mana yang paling tepat?",
      "answer": "I see. Could I move a few things into my hand luggage?",
      "options": [
        "I see. Could you just ignore the extra two kilos for me?",
        "I see. Could I take the whole suitcase as hand luggage?",
        "I see. Could I move a few things into my hand luggage?",
        "That's impossible. My scale at home said it was fine."
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "sentence stress on reservation details",
      "options": [
        "sentence stress on reservation details",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "travel-check-in-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Keep names and numbers slow enough to be understood."
      ],
      "id": "travel-check-in-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "I have a reservation under my name, and I would like to check in.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I have a reservation under my name, and I would like to check in.",
        "Hi, I have a booking under Wahib."
      ],
      "id": "travel-check-in-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "sentence stress on reservation details",
      "options": [
        "avoid listening to your own recording",
        "sentence stress on reservation details",
        "Latihan bicara saat check-in hotel atau bandara.",
        "ignore word stress completely"
      ],
      "id": "travel-check-in-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Travel Check-in.",
      "answer": "sentence stress on reservation details",
      "options": [
        "sentence stress on reservation details",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "travel-check-in-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: checking in at a hotel or airport counter.",
      "answer": "I have a reservation under ___. Could I check in now?",
      "options": [
        "The reservation is under my last name, Rohman.",
        "sentence stress on reservation details",
        "One word is always enough.",
        "I have a reservation under ___. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Travel Check-in\".",
      "answer": "The reservation is under my last name, Rohman.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "The reservation is under my last name, Rohman.",
        "I have a reservation under Wahib Rohman. Could I check in now?"
      ],
      "id": "travel-check-in-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Keep names and numbers slow enough to be understood.",
      "options": [
        "Use filler sounds after every word.",
        "Keep names and numbers slow enough to be understood.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "travel-check-in-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "I have a reservation under Wahib Rohman. Could I check in now?",
      "options": [
        "I have a reservation under Wahib Rohman. Could I check in now?",
        "Hi, I have a booking under Wahib.",
        "I have a reservation under my name, and I would like to check in.",
        "Fine."
      ],
      "id": "travel-check-in-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "sentence stress on reservation details",
      "options": [
        "Keep names and numbers slow enough to be understood.",
        "give your name, confirm a booking, and ask one practical question",
        "translation speed",
        "sentence stress on reservation details"
      ],
      "id": "travel-check-in-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik7Page() {
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
