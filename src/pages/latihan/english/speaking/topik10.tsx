import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "describing-picture",
  "title": "Describing a Picture",
  "description": "Mendeskripsikan gambar dengan urutan dan detail.",
  "situation": "describing an image in a speaking test",
  "goal": "describe people, place, action, and possible meaning",
  "pattern": "In the picture, I can see ___. It looks like ___.",
  "pronunciation": "smooth linking in it looks like",
  "sample": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
  "formalResponse": "The image appears to show a professional discussion.",
  "casualResponse": "It looks like two friends are working together.",
  "repairPhrase": "I am not completely sure, but it seems like they are discussing work.",
  "fluencyTip": "Move from general details to specific observations.",
  "topicNumber": 10
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: describing an image in a speaking test.",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together.",
        "I do not know anything about this topic."
      ],
      "id": "describing-picture-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe people, place, action, and possible meaning",
        "memorize spelling only"
      ],
      "id": "describing-picture-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "Maybe later, thank you.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "Yes.",
        "No problem."
      ],
      "id": "describing-picture-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Mendeskripsikan gambar dengan urutan dan detail.",
      "answer": "It looks like two friends are working together.",
      "options": [
        "It looks like two friends are working together.",
        "I am not completely sure, but it seems like they are discussing work.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "describing-picture-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "describe people, place, action, and possible meaning",
        "smooth linking in it looks like",
        "Move from general details to specific observations.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "smooth linking in it looks like",
        "answer without listening to the question",
        "describe people, place, action, and possible meaning",
        "Mendeskripsikan gambar dengan urutan dan detail."
      ],
      "id": "describing-picture-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "I went there yesterday because blue."
      ],
      "id": "describing-picture-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Describing a Picture\".",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "In the picture, I can see ___. It looks like ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "describing-picture-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe people, place, action, and possible meaning"
      ],
      "id": "describing-picture-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "Yeah, whatever.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "It looks like two friends are working together.",
      "options": [
        "It is hereby requested that silence continues.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "I will stop speaking now."
      ],
      "id": "describing-picture-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Describing a Picture.",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "No, I do not want to answer.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Describing a Picture.",
      "answer": "It looks like two friends are working together.",
      "options": [
        "This document has been processed accordingly.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: describing an image in a speaking test.",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "Please ignore every mistake.",
        "describe people, place, action, and possible meaning",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Describing a Picture.",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "Laugh and end the conversation.",
        "I am not completely sure, but it seems like they are discussing work.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "describing-picture-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "smooth linking in it looks like",
      "options": [
        "smooth linking in it looks like",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "describing-picture-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "smooth linking in it looks like",
      "options": [
        "avoid listening to your own recording",
        "smooth linking in it looks like",
        "Mendeskripsikan gambar dengan urutan dan detail.",
        "ignore word stress completely"
      ],
      "id": "describing-picture-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Describing a Picture.",
      "answer": "smooth linking in it looks like",
      "options": [
        "smooth linking in it looks like",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "describing-picture-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: describing an image in a speaking test.",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "smooth linking in it looks like",
        "One word is always enough.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Describing a Picture\".",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project."
      ],
      "id": "describing-picture-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Use filler sounds after every word.",
        "Move from general details to specific observations.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "describing-picture-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "Fine."
      ],
      "id": "describing-picture-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "smooth linking in it looks like",
      "options": [
        "Move from general details to specific observations.",
        "describe people, place, action, and possible meaning",
        "translation speed",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: describing an image in a speaking test.",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together.",
        "I do not know anything about this topic."
      ],
      "id": "describing-picture-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe people, place, action, and possible meaning",
        "memorize spelling only"
      ],
      "id": "describing-picture-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "Maybe later, thank you.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "Yes.",
        "No problem."
      ],
      "id": "describing-picture-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Mendeskripsikan gambar dengan urutan dan detail.",
      "answer": "It looks like two friends are working together.",
      "options": [
        "It looks like two friends are working together.",
        "I am not completely sure, but it seems like they are discussing work.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "describing-picture-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "describe people, place, action, and possible meaning",
        "smooth linking in it looks like",
        "Move from general details to specific observations.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "smooth linking in it looks like",
        "answer without listening to the question",
        "describe people, place, action, and possible meaning",
        "Mendeskripsikan gambar dengan urutan dan detail."
      ],
      "id": "describing-picture-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "I went there yesterday because blue."
      ],
      "id": "describing-picture-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Describing a Picture\".",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "In the picture, I can see ___. It looks like ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "describing-picture-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe people, place, action, and possible meaning",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe people, place, action, and possible meaning"
      ],
      "id": "describing-picture-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "Yeah, whatever.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "It looks like two friends are working together.",
      "options": [
        "It is hereby requested that silence continues.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "I will stop speaking now."
      ],
      "id": "describing-picture-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Describing a Picture.",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "No, I do not want to answer.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Describing a Picture.",
      "answer": "It looks like two friends are working together.",
      "options": [
        "This document has been processed accordingly.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: describing an image in a speaking test.",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "Please ignore every mistake.",
        "describe people, place, action, and possible meaning",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Describing a Picture.",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "Laugh and end the conversation.",
        "I am not completely sure, but it seems like they are discussing work.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "describing-picture-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "smooth linking in it looks like",
      "options": [
        "smooth linking in it looks like",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "describing-picture-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Move from general details to specific observations."
      ],
      "id": "describing-picture-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "The image appears to show a professional discussion.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "The image appears to show a professional discussion.",
        "It looks like two friends are working together."
      ],
      "id": "describing-picture-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "smooth linking in it looks like",
      "options": [
        "avoid listening to your own recording",
        "smooth linking in it looks like",
        "Mendeskripsikan gambar dengan urutan dan detail.",
        "ignore word stress completely"
      ],
      "id": "describing-picture-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Describing a Picture.",
      "answer": "smooth linking in it looks like",
      "options": [
        "smooth linking in it looks like",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "describing-picture-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: describing an image in a speaking test.",
      "answer": "In the picture, I can see ___. It looks like ___.",
      "options": [
        "I am not completely sure, but it seems like they are discussing work.",
        "smooth linking in it looks like",
        "One word is always enough.",
        "In the picture, I can see ___. It looks like ___."
      ],
      "id": "describing-picture-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Describing a Picture\".",
      "answer": "I am not completely sure, but it seems like they are discussing work.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "I am not completely sure, but it seems like they are discussing work.",
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project."
      ],
      "id": "describing-picture-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Move from general details to specific observations.",
      "options": [
        "Use filler sounds after every word.",
        "Move from general details to specific observations.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "describing-picture-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
      "options": [
        "In the picture, I can see two people working in a cafe. It looks like they are planning a project.",
        "It looks like two friends are working together.",
        "The image appears to show a professional discussion.",
        "Fine."
      ],
      "id": "describing-picture-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "smooth linking in it looks like",
      "options": [
        "Move from general details to specific observations.",
        "describe people, place, action, and possible meaning",
        "translation speed",
        "smooth linking in it looks like"
      ],
      "id": "describing-picture-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik10Page() {
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
