import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "ordering-food",
  "title": "Ordering Food",
  "description": "Berbicara sopan saat memesan makanan atau minuman.",
  "situation": "ordering at a restaurant or cafe",
  "goal": "order an item, ask for a detail, and confirm politely",
  "pattern": "Could I have ___, please? Also, could you make it ___?",
  "pronunciation": "rising intonation in polite requests",
  "sample": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
  "formalResponse": "Could I please have the grilled fish with rice?",
  "casualResponse": "Can I get a burger and fries?",
  "repairPhrase": "Sorry, I meant the small size, not the large one.",
  "fluencyTip": "Start with could I or can I to sound natural and polite.",
  "topicNumber": 3
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: ordering at a restaurant or cafe.",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?",
        "I do not know anything about this topic."
      ],
      "id": "ordering-food-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "order an item, ask for a detail, and confirm politely",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "order an item, ask for a detail, and confirm politely",
        "memorize spelling only"
      ],
      "id": "ordering-food-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Maybe later, thank you.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Yes.",
        "No problem."
      ],
      "id": "ordering-food-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Berbicara sopan saat memesan makanan atau minuman.",
      "answer": "Can I get a burger and fries?",
      "options": [
        "Can I get a burger and fries?",
        "Sorry, I meant the small size, not the large one.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "ordering-food-speaking-4",
      "level": "Basic"
    },
    {
      "id": "ordering-food-speaking-5",
      "level": "Basic",
      "prompt": "The waiter asks, \"Are you ready to order?\" Which reply is best?",
      "answer": "Yes, I'd like the chicken soup, please.",
      "options": [
        "Yes, I'd like the chicken soup, please.",
        "Yes, I like chicken soup very much.",
        "Yes, the chicken soup was delicious.",
        "Yes, give soup chicken to me now."
      ]
    },
    {
      "id": "ordering-food-speaking-6",
      "level": "Basic",
      "prompt": "Which question asks about the price politely?",
      "answer": "Excuse me, how much is the iced tea?",
      "options": [
        "Excuse me, how many is the iced tea?",
        "Tell me the iced tea money now.",
        "Excuse me, what costs the iced tea?",
        "Excuse me, how much is the iced tea?"
      ]
    },
    {
      "id": "ordering-food-speaking-7",
      "level": "Basic",
      "prompt": "The waiter asks, \"Anything to drink?\" Which reply fits?",
      "answer": "Just a glass of water, please.",
      "options": [
        "Just a glass of water, please.",
        "No, I am not hungry for drinks.",
        "Yes, the bill was very cheap.",
        "Just a plate of water, please."
      ]
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Ordering Food\".",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Could I have ___, please? Also, could you make it ___?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "ordering-food-speaking-8",
      "level": "Basic"
    },
    {
      "id": "ordering-food-speaking-9",
      "level": "Basic",
      "prompt": "Which sentence asks for the bill politely?",
      "answer": "Could we have the bill, please?",
      "options": [
        "Could we have the bill, please?",
        "Could we have the menu now, please?",
        "Give us the bill, quick, quick.",
        "Can we pay the bill yesterday?"
      ]
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Yeah, whatever.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "Can I get a burger and fries?",
      "options": [
        "It is hereby requested that silence continues.",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Could I please have the grilled fish with rice?",
        "I will stop speaking now."
      ],
      "id": "ordering-food-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Ordering Food.",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "No, I do not want to answer.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Ordering Food.",
      "answer": "Can I get a burger and fries?",
      "options": [
        "This document has been processed accordingly.",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: ordering at a restaurant or cafe.",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Please ignore every mistake.",
        "order an item, ask for a detail, and confirm politely",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Ordering Food.",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "ordering-food-speaking-18",
      "level": "Intermediate",
      "prompt": "Your soup arrives cold. Which response is polite and clear?",
      "answer": "Excuse me, my soup is a bit cold. Could you warm it up, please?",
      "options": [
        "This soup is cold. You are a terrible waiter, to be honest.",
        "Excuse me, my soup is a bit cold. That's why I never come here.",
        "Excuse me, my soup is a bit cold. Could you warm it up, please?",
        "Excuse me, could I have some more of the cold soup, please?"
      ]
    },
    {
      "id": "ordering-food-speaking-19",
      "level": "Intermediate",
      "prompt": "You have a nut allergy. Which question checks the dish safely?",
      "answer": "Does the satay sauce contain any peanuts? I have a nut allergy.",
      "options": [
        "Does the satay sauce contain any peanuts? I love extra nuts.",
        "Is the satay sauce spicy, or is it fairly mild today?",
        "Does the satay sauce contain any peanuts? I have a nut allergy.",
        "Could I have extra peanut sauce with the satay, please?"
      ]
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "rising intonation in polite requests",
      "options": [
        "rising intonation in polite requests",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "ordering-food-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "rising intonation in polite requests",
      "options": [
        "avoid listening to your own recording",
        "rising intonation in polite requests",
        "Berbicara sopan saat memesan makanan atau minuman.",
        "ignore word stress completely"
      ],
      "id": "ordering-food-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Ordering Food.",
      "answer": "rising intonation in polite requests",
      "options": [
        "rising intonation in polite requests",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "ordering-food-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: ordering at a restaurant or cafe.",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "rising intonation in polite requests",
        "One word is always enough.",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Ordering Food\".",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Sorry, I meant the small size, not the large one.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?"
      ],
      "id": "ordering-food-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Use filler sounds after every word.",
        "Start with could I or can I to sound natural and polite.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "ordering-food-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "Fine."
      ],
      "id": "ordering-food-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "rising intonation in polite requests",
      "options": [
        "Start with could I or can I to sound natural and polite.",
        "order an item, ask for a detail, and confirm politely",
        "translation speed",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: ordering at a restaurant or cafe.",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?",
        "I do not know anything about this topic."
      ],
      "id": "ordering-food-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "order an item, ask for a detail, and confirm politely",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "order an item, ask for a detail, and confirm politely",
        "memorize spelling only"
      ],
      "id": "ordering-food-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Maybe later, thank you.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Yes.",
        "No problem."
      ],
      "id": "ordering-food-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Berbicara sopan saat memesan makanan atau minuman.",
      "answer": "Can I get a burger and fries?",
      "options": [
        "Can I get a burger and fries?",
        "Sorry, I meant the small size, not the large one.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "ordering-food-speaking-4",
      "level": "Basic"
    },
    {
      "id": "ordering-food-speaking-5",
      "level": "Basic",
      "prompt": "Pelayan bertanya, \"Are you ready to order?\" Balasan mana yang paling tepat?",
      "answer": "Yes, I'd like the chicken soup, please.",
      "options": [
        "Yes, I'd like the chicken soup, please.",
        "Yes, I like chicken soup very much.",
        "Yes, the chicken soup was delicious.",
        "Yes, give soup chicken to me now."
      ]
    },
    {
      "id": "ordering-food-speaking-6",
      "level": "Basic",
      "prompt": "Pertanyaan mana yang menanyakan harga dengan sopan?",
      "answer": "Excuse me, how much is the iced tea?",
      "options": [
        "Excuse me, how many is the iced tea?",
        "Tell me the iced tea money now.",
        "Excuse me, what costs the iced tea?",
        "Excuse me, how much is the iced tea?"
      ]
    },
    {
      "id": "ordering-food-speaking-7",
      "level": "Basic",
      "prompt": "Pelayan bertanya, \"Anything to drink?\" Balasan mana yang cocok?",
      "answer": "Just a glass of water, please.",
      "options": [
        "Just a glass of water, please.",
        "No, I am not hungry for drinks.",
        "Yes, the bill was very cheap.",
        "Just a plate of water, please."
      ]
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Ordering Food\".",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Could I have ___, please? Also, could you make it ___?",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "ordering-food-speaking-8",
      "level": "Basic"
    },
    {
      "id": "ordering-food-speaking-9",
      "level": "Basic",
      "prompt": "Kalimat mana yang meminta tagihan dengan sopan?",
      "answer": "Could we have the bill, please?",
      "options": [
        "Could we have the bill, please?",
        "Could we have the menu now, please?",
        "Give us the bill, quick, quick.",
        "Can we pay the bill yesterday?"
      ]
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Yeah, whatever.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "Can I get a burger and fries?",
      "options": [
        "It is hereby requested that silence continues.",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Could I please have the grilled fish with rice?",
        "I will stop speaking now."
      ],
      "id": "ordering-food-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Ordering Food.",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "No, I do not want to answer.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Ordering Food.",
      "answer": "Can I get a burger and fries?",
      "options": [
        "This document has been processed accordingly.",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: ordering at a restaurant or cafe.",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "Please ignore every mistake.",
        "order an item, ask for a detail, and confirm politely",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Ordering Food.",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-17",
      "level": "Intermediate"
    },
    {
      "id": "ordering-food-speaking-18",
      "level": "Intermediate",
      "prompt": "Supmu datang dalam keadaan dingin. Respons mana yang sopan dan jelas?",
      "answer": "Excuse me, my soup is a bit cold. Could you warm it up, please?",
      "options": [
        "This soup is cold. You are a terrible waiter, to be honest.",
        "Excuse me, my soup is a bit cold. That's why I never come here.",
        "Excuse me, my soup is a bit cold. Could you warm it up, please?",
        "Excuse me, could I have some more of the cold soup, please?"
      ]
    },
    {
      "id": "ordering-food-speaking-19",
      "level": "Intermediate",
      "prompt": "Kamu alergi kacang. Pertanyaan mana yang memastikan hidangan itu aman?",
      "answer": "Does the satay sauce contain any peanuts? I have a nut allergy.",
      "options": [
        "Does the satay sauce contain any peanuts? I love extra nuts.",
        "Is the satay sauce spicy, or is it fairly mild today?",
        "Does the satay sauce contain any peanuts? I have a nut allergy.",
        "Could I have extra peanut sauce with the satay, please?"
      ]
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "rising intonation in polite requests",
      "options": [
        "rising intonation in polite requests",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "ordering-food-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Start with could I or can I to sound natural and polite."
      ],
      "id": "ordering-food-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "Could I please have the grilled fish with rice?",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "Could I please have the grilled fish with rice?",
        "Can I get a burger and fries?"
      ],
      "id": "ordering-food-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "rising intonation in polite requests",
      "options": [
        "avoid listening to your own recording",
        "rising intonation in polite requests",
        "Berbicara sopan saat memesan makanan atau minuman.",
        "ignore word stress completely"
      ],
      "id": "ordering-food-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Ordering Food.",
      "answer": "rising intonation in polite requests",
      "options": [
        "rising intonation in polite requests",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "ordering-food-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: ordering at a restaurant or cafe.",
      "answer": "Could I have ___, please? Also, could you make it ___?",
      "options": [
        "Sorry, I meant the small size, not the large one.",
        "rising intonation in polite requests",
        "One word is always enough.",
        "Could I have ___, please? Also, could you make it ___?"
      ],
      "id": "ordering-food-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Ordering Food\".",
      "answer": "Sorry, I meant the small size, not the large one.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Sorry, I meant the small size, not the large one.",
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?"
      ],
      "id": "ordering-food-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Start with could I or can I to sound natural and polite.",
      "options": [
        "Use filler sounds after every word.",
        "Start with could I or can I to sound natural and polite.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "ordering-food-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
      "options": [
        "Could I have the chicken sandwich, please? Also, could you make it less spicy?",
        "Can I get a burger and fries?",
        "Could I please have the grilled fish with rice?",
        "Fine."
      ],
      "id": "ordering-food-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "rising intonation in polite requests",
      "options": [
        "Start with could I or can I to sound natural and polite.",
        "order an item, ask for a detail, and confirm politely",
        "translation speed",
        "rising intonation in polite requests"
      ],
      "id": "ordering-food-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik3Page() {
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
