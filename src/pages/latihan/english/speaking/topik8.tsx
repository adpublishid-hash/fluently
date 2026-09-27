import { VocabularyQuizPage, type VocabQuestion } from '../../components/PracticeQuizPage';
import { SpeakingPracticeIntro, type SpeakingTopicMaterial } from '../../components/SpeakingPracticeIntro';

const material: SpeakingTopicMaterial = {
  "id": "job-interview",
  "title": "Job Interview",
  "description": "Menjawab pertanyaan interview dengan terstruktur.",
  "situation": "answering a common interview question",
  "goal": "describe experience, strength, and motivation clearly",
  "pattern": "In my previous role, I ___. That helped me ___.",
  "pronunciation": "confident falling intonation in final statements",
  "sample": "In my previous role, I handled user feedback. That helped me improve product decisions.",
  "formalResponse": "I believe my experience in communication would be valuable for this role.",
  "casualResponse": "I think my communication skills fit this role well.",
  "repairPhrase": "Let me give a more specific example.",
  "fluencyTip": "Use one concrete example instead of listing too many points.",
  "topicNumber": 8
};

const quizQuestionsByLanguage: Record<'en' | 'id', VocabQuestion[]> = {
  "en": [
    {
      "prompt": "Choose the best response for this situation: answering a common interview question.",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well.",
        "I do not know anything about this topic."
      ],
      "id": "job-interview-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe experience, strength, and motivation clearly",
        "memorize spelling only"
      ],
      "id": "job-interview-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "Maybe later, thank you.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "Yes.",
        "No problem."
      ],
      "id": "job-interview-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: Menjawab pertanyaan interview dengan terstruktur.",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "I think my communication skills fit this role well.",
        "Let me give a more specific example.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "job-interview-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Which sentence pattern fits this speaking practice?",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "describe experience, strength, and motivation clearly",
        "confident falling intonation in final statements",
        "Use one concrete example instead of listing too many points.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "confident falling intonation in final statements",
        "answer without listening to the question",
        "describe experience, strength, and motivation clearly",
        "Menjawab pertanyaan interview dengan terstruktur."
      ],
      "id": "job-interview-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Which sample answer sounds most natural?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I went there yesterday because blue."
      ],
      "id": "job-interview-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Choose the best response for this situation: start speaking about \"Job Interview\".",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "In my previous role, I ___. That helped me ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "job-interview-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "What is the speaking goal for this topic?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe experience, strength, and motivation clearly"
      ],
      "id": "job-interview-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "Let me give a more specific example.",
        "Yeah, whatever.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation?",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "It is hereby requested that silence continues.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me give a more specific example.",
      "options": [
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I will stop speaking now."
      ],
      "id": "job-interview-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite? Topic: Job Interview.",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "No, I do not want to answer.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response fits a casual conversation? Topic: Job Interview.",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "This document has been processed accordingly.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer? Situation: answering a common interview question.",
      "answer": "Let me give a more specific example.",
      "options": [
        "Let me give a more specific example.",
        "Please ignore every mistake.",
        "describe experience, strength, and motivation clearly",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Which strategy helps the answer sound more fluent? Topic: Job Interview.",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Which response sounds more formal and polite?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "If you misspeak, which phrase helps you repair your answer?",
      "answer": "Let me give a more specific example.",
      "options": [
        "Laugh and end the conversation.",
        "Let me give a more specific example.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "job-interview-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "confident falling intonation in final statements",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "job-interview-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "avoid listening to your own recording",
        "confident falling intonation in final statements",
        "Menjawab pertanyaan interview dengan terstruktur.",
        "ignore word stress completely"
      ],
      "id": "job-interview-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Topic: Job Interview.",
      "answer": "confident falling intonation in final statements",
      "options": [
        "confident falling intonation in final statements",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "job-interview-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Situation: answering a common interview question.",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "Let me give a more specific example.",
        "confident falling intonation in final statements",
        "One word is always enough.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Which choice keeps the tone natural? When speaking about \"Job Interview\".",
      "answer": "Let me give a more specific example.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions."
      ],
      "id": "job-interview-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "In advanced practice, which habit helps the most?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Use filler sounds after every word.",
        "Use one concrete example instead of listing too many points.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "job-interview-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "To make the answer more structured, what should the speaker do? Best full model answer?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "Fine."
      ],
      "id": "job-interview-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Which pronunciation focus fits this topic best? Final speaking focus?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "Use one concrete example instead of listing too many points.",
        "describe experience, strength, and motivation clearly",
        "translation speed",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-29",
      "level": "Advanced"
    }
  ],
  "id": [
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: answering a common interview question.",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well.",
        "I do not know anything about this topic."
      ],
      "id": "job-interview-speaking-0",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "Because I think it is good.",
        "Yes, I agree with you.",
        "Can you repeat the price?",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-1",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "translate every word silently",
        "avoid answering follow-up questions",
        "describe experience, strength, and motivation clearly",
        "memorize spelling only"
      ],
      "id": "job-interview-speaking-2",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "Maybe later, thank you.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "Yes.",
        "No problem."
      ],
      "id": "job-interview-speaking-3",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: Menjawab pertanyaan interview dengan terstruktur.",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "I think my communication skills fit this role well.",
        "Let me give a more specific example.",
        "I disagree with all grammar rules.",
        "Please cancel my account immediately."
      ],
      "id": "job-interview-speaking-4",
      "level": "Basic"
    },
    {
      "prompt": "Pola kalimat mana yang cocok untuk latihan speaking ini?",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "describe experience, strength, and motivation clearly",
        "confident falling intonation in final statements",
        "Use one concrete example instead of listing too many points.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-5",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "confident falling intonation in final statements",
        "answer without listening to the question",
        "describe experience, strength, and motivation clearly",
        "Menjawab pertanyaan interview dengan terstruktur."
      ],
      "id": "job-interview-speaking-6",
      "level": "Basic"
    },
    {
      "prompt": "Contoh jawaban mana yang paling natural?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "The pronunciation is difficult but no answer.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I went there yesterday because blue."
      ],
      "id": "job-interview-speaking-7",
      "level": "Basic"
    },
    {
      "prompt": "Pilih respons paling tepat untuk situasi ini: start speaking about \"Job Interview\".",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "In my previous role, I ___. That helped me ___.",
        "What time is the airport?",
        "I am sorry for your lost ticket.",
        "There is no reason to speak."
      ],
      "id": "job-interview-speaking-8",
      "level": "Basic"
    },
    {
      "prompt": "Apa tujuan speaking dari topik ini?",
      "answer": "describe experience, strength, and motivation clearly",
      "options": [
        "speak with no pauses at all",
        "use random advanced vocabulary",
        "avoid giving details",
        "describe experience, strength, and motivation clearly"
      ],
      "id": "job-interview-speaking-9",
      "level": "Basic"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "Let me give a more specific example.",
        "Yeah, whatever.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-10",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai?",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "It is hereby requested that silence continues.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-11",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me give a more specific example.",
      "options": [
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I will stop speaking now."
      ],
      "id": "job-interview-speaking-12",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Read every sentence in your first language.",
        "Use the longest word in every sentence.",
        "Speak without checking meaning.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-13",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan? Topic: Job Interview.",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "No, I do not want to answer.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-14",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang cocok untuk percakapan santai? Topic: Job Interview.",
      "answer": "I think my communication skills fit this role well.",
      "options": [
        "This document has been processed accordingly.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-15",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki? Situation: answering a common interview question.",
      "answer": "Let me give a more specific example.",
      "options": [
        "Let me give a more specific example.",
        "Please ignore every mistake.",
        "describe experience, strength, and motivation clearly",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-16",
      "level": "Intermediate"
    },
    {
      "prompt": "Strategi mana yang membantu jawaban lebih lancar? Topic: Job Interview.",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Stop after every word.",
        "Never use examples.",
        "Only repeat the question.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-17",
      "level": "Intermediate"
    },
    {
      "prompt": "Respons mana yang terdengar lebih formal dan sopan?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-18",
      "level": "Intermediate"
    },
    {
      "prompt": "Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?",
      "answer": "Let me give a more specific example.",
      "options": [
        "Laugh and end the conversation.",
        "Let me give a more specific example.",
        "Say nothing until the listener guesses.",
        "Change topic immediately."
      ],
      "id": "job-interview-speaking-19",
      "level": "Intermediate"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "confident falling intonation in final statements",
        "silent reading without voice",
        "only spelling each letter",
        "speaking as fast as possible"
      ],
      "id": "job-interview-speaking-20",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Answer with unrelated vocabulary.",
        "Use no transitions or examples.",
        "Repeat the same sentence four times.",
        "Use one concrete example instead of listing too many points."
      ],
      "id": "job-interview-speaking-21",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural?",
      "answer": "I believe my experience in communication would be valuable for this role.",
      "options": [
        "I refuse to explain my idea.",
        "Your question is not important.",
        "I believe my experience in communication would be valuable for this role.",
        "I think my communication skills fit this role well."
      ],
      "id": "job-interview-speaking-22",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "avoid listening to your own recording",
        "confident falling intonation in final statements",
        "Menjawab pertanyaan interview dengan terstruktur.",
        "ignore word stress completely"
      ],
      "id": "job-interview-speaking-23",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Topic: Job Interview.",
      "answer": "confident falling intonation in final statements",
      "options": [
        "confident falling intonation in final statements",
        "focus only on handwriting",
        "skip pronunciation practice",
        "use flat intonation for every sentence"
      ],
      "id": "job-interview-speaking-24",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Situation: answering a common interview question.",
      "answer": "In my previous role, I ___. That helped me ___.",
      "options": [
        "Let me give a more specific example.",
        "confident falling intonation in final statements",
        "One word is always enough.",
        "In my previous role, I ___. That helped me ___."
      ],
      "id": "job-interview-speaking-25",
      "level": "Advanced"
    },
    {
      "prompt": "Pilihan mana yang menjaga tone tetap natural? When speaking about \"Job Interview\".",
      "answer": "Let me give a more specific example.",
      "options": [
        "I will not repeat anything.",
        "The listener should understand everything automatically.",
        "Let me give a more specific example.",
        "In my previous role, I handled user feedback. That helped me improve product decisions."
      ],
      "id": "job-interview-speaking-26",
      "level": "Advanced"
    },
    {
      "prompt": "Saat latihan level advanced, kebiasaan mana yang paling membantu?",
      "answer": "Use one concrete example instead of listing too many points.",
      "options": [
        "Use filler sounds after every word.",
        "Use one concrete example instead of listing too many points.",
        "Memorize answers without meaning.",
        "Avoid eye contact and pauses."
      ],
      "id": "job-interview-speaking-27",
      "level": "Advanced"
    },
    {
      "prompt": "Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan? Best full model answer?",
      "answer": "In my previous role, I handled user feedback. That helped me improve product decisions.",
      "options": [
        "In my previous role, I handled user feedback. That helped me improve product decisions.",
        "I think my communication skills fit this role well.",
        "I believe my experience in communication would be valuable for this role.",
        "Fine."
      ],
      "id": "job-interview-speaking-28",
      "level": "Advanced"
    },
    {
      "prompt": "Fokus pronunciation mana yang paling sesuai? Final speaking focus?",
      "answer": "confident falling intonation in final statements",
      "options": [
        "Use one concrete example instead of listing too many points.",
        "describe experience, strength, and motivation clearly",
        "translation speed",
        "confident falling intonation in final statements"
      ],
      "id": "job-interview-speaking-29",
      "level": "Advanced"
    }
  ]
};

function buildQuizQuestions(_topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  return quizQuestionsByLanguage[language];
}

export default function EnglishSpeakingTopik8Page() {
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
