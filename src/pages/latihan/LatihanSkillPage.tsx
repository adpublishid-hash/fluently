import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, ClipboardList, Headphones, Lock, Play, RotateCcw, Target, Volume2, XCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { practiceQuestionTypes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { playAudio, stopCurrentAudio } from '../../services/ttsService';
import { useAuth } from '../../auth/AuthContext';
import { FREE_PRACTICE_TOPIC_IDS, hasFullAccess } from '../../utils/accessControl';

type QuizLevel = 'Basic' | 'Intermediate' | 'Advanced';

type Topic = {
  id: string;
  title: string;
  description: string;
};

type VocabQuestion = {
  id: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  options: string[];
};

type MistakeRecord = {
  id: string;
  skillId: string;
  topicTitle: string;
  level: QuizLevel;
  prompt: string;
  answer: string;
  selected: string;
  options?: string[];
  savedAt: string;
};

type PracticeAttempt = {
  id: string;
  skillId: string;
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
  weakestLevel: QuizLevel;
  completedAt: string;
};

type TopicTerm = {
  word: string;
  meaning: string;
};

type GrammarSeed = {
  prompt: string;
  answer: string;
  options: string[];
};

type SpeakingTopic = Topic & {
  situation: string;
  goal: string;
  pattern: string;
  pronunciation: string;
  sample: string;
  formalResponse: string;
  casualResponse: string;
  repairPhrase: string;
  fluencyTip: string;
};

type WritingTopic = Topic & {
  task: string;
  goal: string;
  format: string;
  structure: string;
  sample: string;
  opening: string;
  connector: string;
  closing: string;
  editingTip: string;
};

type ReadingTopic = Topic & {
  passageTitle: string;
  passage: string;
  mainIdea: string;
  detail: string;
  vocabulary: string;
  vocabularyMeaning: string;
  inference: string;
  purpose: string;
  readingSkill: string;
};

type ListeningTopic = Topic & {
  level: string;
  accent: string;
  goal: string;
  lines: Array<{ speaker: string; text: string; note: string }>;
  focus: string[];
  questions?: VocabQuestion[];
};

const mistakeBankKey = 'fluently-mistake-bank-v1';
const practiceHistoryKey = 'fluently-practice-history-v1';

function loadMistakeBank(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(mistakeBankKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMistakeBank(records: MistakeRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(mistakeBankKey, JSON.stringify(records.slice(0, 120)));
}

function loadPracticeHistory(): PracticeAttempt[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(practiceHistoryKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePracticeAttempt(attempt: PracticeAttempt) {
  if (typeof window === 'undefined') return;
  const nextHistory = [attempt, ...loadPracticeHistory()].slice(0, 200);
  window.localStorage.setItem(practiceHistoryKey, JSON.stringify(nextHistory));
}

function buildQuestionExplanation(question: VocabQuestion, selected?: string) {
  if (selected === question.answer) {
    return `Jawaban benar karena "${question.answer}" paling sesuai dengan instruksi soal.`;
  }

  return `Jawaban yang tepat adalah "${question.answer}". Pilihanmu "${selected || '-'}" belum sesuai dengan konteks soal, jadi ulangi pola pada pertanyaan ini saat review.`;
}

const topics: Topic[] = [
  { id: 'general', title: 'General Vocabulary', description: 'Kata dasar untuk situasi umum sehari-hari.' },
  { id: 'business-office', title: 'Business & Office English', description: 'Kata kerja kantor, meeting, dan email.' },
  { id: 'travel-tourism', title: 'Travel & Tourism', description: 'Kosakata perjalanan, hotel, arah, dan liburan.' },
  { id: 'food-restaurant', title: 'Foods, Cooking & Restaurant', description: 'Kosakata makanan, memasak, dan restoran.' },
  { id: 'health-body', title: 'Health, Medicine & The Body', description: 'Kosakata tubuh, sakit, obat, dan perawatan.' },
  { id: 'technology-social', title: 'Technology & Social Media', description: 'Kosakata internet, perangkat, dan media sosial.' },
  { id: 'personality', title: 'Personality & Character', description: 'Kata sifat tentang sifat, karakter, dan watak.' },
  { id: 'feelings', title: 'Feelings & Emotions', description: 'Kosakata untuk mengungkapkan perasaan dan emosi.' },
  { id: 'education', title: 'Education & Academic', description: 'Kosakata sekolah, universitas, dan dunia akademik.' },
  { id: 'environment', title: 'Environment & Nature', description: 'Kosakata alam, cuaca, lingkungan, dan energi.' },
  { id: 'weather', title: 'Weather & Climate', description: 'Kosakata tentang cuaca, musim, dan iklim.' },
  { id: 'shopping', title: 'Shopping, Fashion & Money', description: 'Kosakata belanja, pakaian, uang, dan harga.' },
  { id: 'house', title: 'House, Home & Chores', description: 'Kosakata rumah, ruangan, benda, dan pekerjaan rumah.' },
  { id: 'sports', title: 'Sports & Fitness', description: 'Kosakata olahraga, pertandingan, dan kebugaran.' },
  { id: 'music-arts', title: 'Music, Movies & Arts', description: 'Kosakata hiburan, film, musik, dan seni.' },
  { id: 'law-crime', title: 'Law & Crime', description: 'Kosakata hukum, pengadilan, dan kriminalitas.' },
  { id: 'media', title: 'Media & Journalism', description: 'Kosakata berita, koran, laporan, dan penyiaran.' },
  { id: 'science', title: 'Science & Space', description: 'Kosakata sains, eksperimen, dan luar angkasa.' },
  { id: 'animals', title: 'Animals & Wildlife', description: 'Kosakata hewan, habitat, dan alam liar.' },
  { id: 'fashion', title: 'Fashion & Style', description: 'Kosakata tren, pakaian, dan gaya.' },
  { id: 'history', title: 'History & Time', description: 'Kosakata sejarah, zaman, dan peristiwa masa lalu.' },
  { id: 'geography', title: 'Geography & Landscapes', description: 'Kosakata alam, peta, negara, dan bentang lahan.' },
  { id: 'money-finance', title: 'Money & Finance', description: 'Kosakata bank, investasi, dan keuangan.' },
  { id: 'transportation', title: 'Transportation & Vehicles', description: 'Kosakata kendaraan, lalu lintas, dan perjalanan.' },
  { id: 'politics', title: 'Politics & Government', description: 'Kosakata pemerintahan, pemilu, dan kebijakan.' },
  { id: 'family', title: 'Family & Relationships', description: 'Kosakata keluarga, hubungan, dan relasi sosial.' },
];

const topicTerms: Record<string, TopicTerm[]> = {
  general: [
    { word: 'Breakfast', meaning: 'a meal eaten in the morning' },
    { word: 'Umbrella', meaning: 'an object used to protect you from rain' },
    { word: 'Uncle', meaning: "your father's or mother's brother" },
    { word: 'Doctor', meaning: 'a person who treats sick people' },
    { word: 'Cinema', meaning: 'a place where people watch movies' },
    { word: 'Student', meaning: 'a person who studies at school' },
    { word: 'Schedule', meaning: 'a plan that shows when things happen' },
    { word: 'Improve', meaning: 'to become better' },
    { word: 'Confident', meaning: 'feeling sure about yourself' },
    { word: 'Opportunity', meaning: 'a good chance to do something' },
  ],
  'business-office': [
    { word: 'Meeting', meaning: 'a formal discussion at work' },
    { word: 'Deadline', meaning: 'the latest time something must be finished' },
    { word: 'Client', meaning: 'a customer who uses professional services' },
    { word: 'Invoice', meaning: 'a document requesting payment' },
    { word: 'Negotiate', meaning: 'to discuss terms before reaching agreement' },
    { word: 'Revenue', meaning: 'money earned by a company' },
    { word: 'Proposal', meaning: 'a suggested plan for business' },
    { word: 'Colleague', meaning: 'a person you work with' },
    { word: 'Strategy', meaning: 'a plan for achieving a goal' },
    { word: 'Productivity', meaning: 'the ability to complete useful work efficiently' },
  ],
  'travel-tourism': [
    { word: 'Passport', meaning: 'an official document for international travel' },
    { word: 'Itinerary', meaning: 'a planned route or travel schedule' },
    { word: 'Reservation', meaning: 'an arrangement to keep a room or seat' },
    { word: 'Luggage', meaning: 'bags used for travel' },
    { word: 'Destination', meaning: 'the place someone is travelling to' },
    { word: 'Accommodation', meaning: 'a place to stay while travelling' },
    { word: 'Tourist', meaning: 'a person visiting a place for pleasure' },
    { word: 'Departure', meaning: 'the act of leaving for a trip' },
    { word: 'Landmark', meaning: 'a famous or easily recognized place' },
    { word: 'Excursion', meaning: 'a short trip for pleasure or learning' },
  ],
  'food-restaurant': [
    { word: 'Menu', meaning: 'a list of food and drinks in a restaurant' },
    { word: 'Appetizer', meaning: 'a small dish eaten before the main meal' },
    { word: 'Ingredient', meaning: 'one item used to make food' },
    { word: 'Recipe', meaning: 'instructions for cooking a dish' },
    { word: 'Waiter', meaning: 'a person who serves food in a restaurant' },
    { word: 'Dessert', meaning: 'sweet food eaten after the main course' },
    { word: 'Spicy', meaning: 'having a hot taste from spices' },
    { word: 'Beverage', meaning: 'a drink' },
    { word: 'Cuisine', meaning: 'a style of cooking' },
    { word: 'Reservation', meaning: 'an arrangement for a restaurant table' },
  ],
  'health-body': [
    { word: 'Symptom', meaning: 'a sign that someone may be ill' },
    { word: 'Medicine', meaning: 'something taken to treat illness' },
    { word: 'Pulse', meaning: 'the beat felt from the heart' },
    { word: 'Injury', meaning: 'damage to the body' },
    { word: 'Prescription', meaning: 'written instructions for medicine' },
    { word: 'Recovery', meaning: 'the process of becoming healthy again' },
    { word: 'Treatment', meaning: 'medical care for a problem' },
    { word: 'Diagnosis', meaning: 'identifying an illness' },
    { word: 'Immune', meaning: 'related to the body fighting disease' },
    { word: 'Therapy', meaning: 'treatment to improve health' },
  ],
  'technology-social': [
    { word: 'Device', meaning: 'a piece of electronic equipment' },
    { word: 'Password', meaning: 'a secret code used to access an account' },
    { word: 'Upload', meaning: 'to send a file to the internet' },
    { word: 'Download', meaning: 'to get a file from the internet' },
    { word: 'Notification', meaning: 'a message alert from an app' },
    { word: 'Algorithm', meaning: 'a set of rules used by software' },
    { word: 'Privacy', meaning: 'control over personal information' },
    { word: 'Platform', meaning: 'an online service where people interact' },
    { word: 'Streaming', meaning: 'watching or listening online in real time' },
    { word: 'Encryption', meaning: 'protecting data by turning it into code' },
  ],
  personality: [
    { word: 'Friendly', meaning: 'kind and pleasant to others' },
    { word: 'Honest', meaning: 'telling the truth' },
    { word: 'Patient', meaning: 'able to wait calmly' },
    { word: 'Brave', meaning: 'not afraid of danger' },
    { word: 'Reliable', meaning: 'able to be trusted' },
    { word: 'Generous', meaning: 'willing to give or share' },
    { word: 'Stubborn', meaning: 'not willing to change your mind' },
    { word: 'Ambitious', meaning: 'strongly wanting success' },
    { word: 'Considerate', meaning: "thinking about other people's feelings" },
    { word: 'Resilient', meaning: 'able to recover after difficulty' },
  ],
  feelings: [
    { word: 'Happy', meaning: 'feeling pleasure or joy' },
    { word: 'Nervous', meaning: 'worried or uneasy' },
    { word: 'Excited', meaning: 'very enthusiastic' },
    { word: 'Lonely', meaning: 'sad because you are alone' },
    { word: 'Relieved', meaning: 'happy because worry has ended' },
    { word: 'Frustrated', meaning: 'annoyed because something is difficult' },
    { word: 'Anxious', meaning: 'very worried about something' },
    { word: 'Grateful', meaning: 'thankful for something' },
    { word: 'Overwhelmed', meaning: 'feeling unable to handle too much' },
    { word: 'Content', meaning: 'calmly satisfied' },
  ],
  education: [
    { word: 'Lesson', meaning: 'a period of learning' },
    { word: 'Homework', meaning: 'school work done at home' },
    { word: 'Subject', meaning: 'an area of study' },
    { word: 'Exam', meaning: 'a formal test' },
    { word: 'Assignment', meaning: 'a task given by a teacher' },
    { word: 'Curriculum', meaning: 'the subjects taught in a course' },
    { word: 'Scholarship', meaning: 'money awarded for study' },
    { word: 'Lecture', meaning: 'a formal educational talk' },
    { word: 'Research', meaning: 'careful study to discover information' },
    { word: 'Thesis', meaning: 'a long academic paper or main argument' },
  ],
  environment: [
    { word: 'Forest', meaning: 'a large area with many trees' },
    { word: 'Pollution', meaning: 'harmful substances in air, water, or soil' },
    { word: 'Recycle', meaning: 'to use waste materials again' },
    { word: 'Wildlife', meaning: 'animals living in nature' },
    { word: 'Conservation', meaning: 'protecting nature and resources' },
    { word: 'Ecosystem', meaning: 'living things and their environment' },
    { word: 'Renewable', meaning: 'able to be naturally replaced' },
    { word: 'Habitat', meaning: 'the natural home of an animal or plant' },
    { word: 'Biodiversity', meaning: 'the variety of living things' },
    { word: 'Sustainability', meaning: 'using resources without harming the future' },
  ],
  weather: [
    { word: 'Cloudy', meaning: 'covered with clouds' },
    { word: 'Rainfall', meaning: 'the amount of rain that falls' },
    { word: 'Storm', meaning: 'violent weather with wind or rain' },
    { word: 'Forecast', meaning: 'a prediction about future weather' },
    { word: 'Humidity', meaning: 'the amount of water in the air' },
    { word: 'Temperature', meaning: 'how hot or cold something is' },
    { word: 'Drought', meaning: 'a long period with little rain' },
    { word: 'Climate', meaning: 'typical weather in a place over time' },
    { word: 'Heatwave', meaning: 'a period of unusually hot weather' },
    { word: 'Precipitation', meaning: 'rain, snow, or hail falling from the sky' },
  ],
  shopping: [
    { word: 'Price', meaning: 'the amount of money something costs' },
    { word: 'Receipt', meaning: 'proof that you paid for something' },
    { word: 'Discount', meaning: 'a reduced price' },
    { word: 'Cashier', meaning: 'a person who takes payment in a shop' },
    { word: 'Refund', meaning: 'money returned after buying something' },
    { word: 'Bargain', meaning: 'something bought for a low price' },
    { word: 'Budget', meaning: 'a plan for spending money' },
    { word: 'Purchase', meaning: 'something bought' },
    { word: 'Installment', meaning: 'one payment in a series' },
    { word: 'Warranty', meaning: 'a promise to repair or replace a product' },
  ],
  house: [
    { word: 'Kitchen', meaning: 'a room used for cooking' },
    { word: 'Bedroom', meaning: 'a room used for sleeping' },
    { word: 'Furniture', meaning: 'large movable items in a room' },
    { word: 'Laundry', meaning: 'clothes that need washing' },
    { word: 'Appliance', meaning: 'a machine used in the home' },
    { word: 'Renovate', meaning: 'to repair or improve a building' },
    { word: 'Mortgage', meaning: 'a loan used to buy a house' },
    { word: 'Tenant', meaning: 'a person who rents a place' },
    { word: 'Household', meaning: 'all the people living in one home' },
    { word: 'Maintenance', meaning: 'work done to keep something in good condition' },
  ],
  sports: [
    { word: 'Team', meaning: 'a group playing together' },
    { word: 'Coach', meaning: 'a person who trains athletes' },
    { word: 'Match', meaning: 'a sports competition' },
    { word: 'Score', meaning: 'points gained in a game' },
    { word: 'Tournament', meaning: 'a series of competitions' },
    { word: 'Fitness', meaning: 'physical health and strength' },
    { word: 'Endurance', meaning: 'the ability to continue for a long time' },
    { word: 'Referee', meaning: 'a person who enforces rules in a game' },
    { word: 'Stamina', meaning: 'energy to keep doing physical activity' },
    { word: 'Championship', meaning: 'a competition to decide the best player or team' },
  ],
  'music-arts': [
    { word: 'Song', meaning: 'music with words' },
    { word: 'Artist', meaning: 'a person who creates art' },
    { word: 'Stage', meaning: 'a raised area for performance' },
    { word: 'Gallery', meaning: 'a place where art is shown' },
    { word: 'Melody', meaning: 'a sequence of musical notes' },
    { word: 'Exhibition', meaning: 'a public display of art' },
    { word: 'Performance', meaning: 'an act of presenting music or drama' },
    { word: 'Composition', meaning: 'a piece of music or art' },
    { word: 'Critique', meaning: 'a careful review of art' },
    { word: 'Aesthetic', meaning: 'related to beauty or artistic style' },
  ],
  'law-crime': [
    { word: 'Law', meaning: 'a rule made by government' },
    { word: 'Crime', meaning: 'an illegal act' },
    { word: 'Judge', meaning: 'a person who decides cases in court' },
    { word: 'Court', meaning: 'a place where legal cases are heard' },
    { word: 'Witness', meaning: 'a person who saw an event' },
    { word: 'Evidence', meaning: 'information used to prove something' },
    { word: 'Verdict', meaning: 'a court decision' },
    { word: 'Sentence', meaning: 'a punishment given by a court' },
    { word: 'Prosecution', meaning: 'the side accusing someone in court' },
    { word: 'Jurisdiction', meaning: 'legal authority over an area or case' },
  ],
  media: [
    { word: 'News', meaning: 'new information about events' },
    { word: 'Headline', meaning: 'the title of a news story' },
    { word: 'Reporter', meaning: 'a person who gathers news' },
    { word: 'Interview', meaning: 'a formal question-and-answer conversation' },
    { word: 'Broadcast', meaning: 'to send a program by TV, radio, or internet' },
    { word: 'Article', meaning: 'a written piece in a newspaper or website' },
    { word: 'Source', meaning: 'where information comes from' },
    { word: 'Editorial', meaning: 'an opinion article from a publication' },
    { word: 'Censorship', meaning: 'control over what can be published' },
    { word: 'Investigative', meaning: 'involving deep research to uncover facts' },
  ],
  science: [
    { word: 'Planet', meaning: 'a large object orbiting a star' },
    { word: 'Experiment', meaning: 'a test done to learn something' },
    { word: 'Gravity', meaning: 'the force that pulls objects together' },
    { word: 'Telescope', meaning: 'a tool used to see distant objects' },
    { word: 'Hypothesis', meaning: 'an idea tested by research' },
    { word: 'Laboratory', meaning: 'a place for scientific work' },
    { word: 'Orbit', meaning: 'the path of an object around another object' },
    { word: 'Molecule', meaning: 'a group of atoms joined together' },
    { word: 'Astronomy', meaning: 'the study of space' },
    { word: 'Quantum', meaning: 'related to very small units of energy or matter' },
  ],
  animals: [
    { word: 'Pet', meaning: 'an animal kept at home' },
    { word: 'Bird', meaning: 'an animal with feathers and wings' },
    { word: 'Predator', meaning: 'an animal that hunts other animals' },
    { word: 'Prey', meaning: 'an animal hunted by another animal' },
    { word: 'Species', meaning: 'a group of similar living things' },
    { word: 'Habitat', meaning: 'the natural home of an animal' },
    { word: 'Migration', meaning: 'movement of animals from one area to another' },
    { word: 'Extinct', meaning: 'no longer existing as a species' },
    { word: 'Conservation', meaning: 'protecting wildlife and nature' },
    { word: 'Nocturnal', meaning: 'active at night' },
  ],
  fashion: [
    { word: 'Shirt', meaning: 'clothing worn on the upper body' },
    { word: 'Dress', meaning: 'one-piece clothing often worn by women' },
    { word: 'Fabric', meaning: 'material used to make clothes' },
    { word: 'Pattern', meaning: 'a repeated design' },
    { word: 'Accessory', meaning: 'an extra item worn for style' },
    { word: 'Trend', meaning: 'a popular style at a time' },
    { word: 'Tailor', meaning: 'a person who makes or adjusts clothes' },
    { word: 'Wardrobe', meaning: 'a collection of clothes' },
    { word: 'Minimalist', meaning: 'simple in style with few details' },
    { word: 'Elegance', meaning: 'graceful and stylish beauty' },
  ],
  history: [
    { word: 'Past', meaning: 'time before now' },
    { word: 'Century', meaning: 'one hundred years' },
    { word: 'Empire', meaning: 'a group of territories ruled by one power' },
    { word: 'Ancient', meaning: 'from a very long time ago' },
    { word: 'Revolution', meaning: 'a major political or social change' },
    { word: 'Artifact', meaning: 'an object made by people in the past' },
    { word: 'Chronology', meaning: 'the order of events in time' },
    { word: 'Heritage', meaning: 'traditions and history passed down' },
    { word: 'Civilization', meaning: 'an advanced organized society' },
    { word: 'Archaeology', meaning: 'the study of ancient people through objects' },
  ],
  geography: [
    { word: 'River', meaning: 'a large natural flow of water' },
    { word: 'Mountain', meaning: 'a very high area of land' },
    { word: 'Island', meaning: 'land surrounded by water' },
    { word: 'Desert', meaning: 'a very dry area of land' },
    { word: 'Valley', meaning: 'low land between hills or mountains' },
    { word: 'Coast', meaning: 'land next to the sea' },
    { word: 'Continent', meaning: "one of the world's large land areas" },
    { word: 'Latitude', meaning: 'distance north or south of the equator' },
    { word: 'Topography', meaning: 'the physical shape of land' },
    { word: 'Archipelago', meaning: 'a group of islands' },
  ],
  'money-finance': [
    { word: 'Cash', meaning: 'money in coins or notes' },
    { word: 'Bank', meaning: 'a place that keeps and lends money' },
    { word: 'Savings', meaning: 'money kept for future use' },
    { word: 'Debt', meaning: 'money owed to someone' },
    { word: 'Interest', meaning: 'extra money paid for borrowing' },
    { word: 'Investment', meaning: 'money put into something to gain profit' },
    { word: 'Profit', meaning: 'money gained after costs' },
    { word: 'Expense', meaning: 'money spent on something' },
    { word: 'Inflation', meaning: 'a rise in general prices' },
    { word: 'Portfolio', meaning: 'a collection of investments' },
  ],
  transportation: [
    { word: 'Bus', meaning: 'a large vehicle for passengers' },
    { word: 'Ticket', meaning: 'proof of payment for travel' },
    { word: 'Station', meaning: 'a place where trains or buses stop' },
    { word: 'Traffic', meaning: 'vehicles moving on roads' },
    { word: 'Commute', meaning: 'travel between home and work' },
    { word: 'Vehicle', meaning: 'a machine used for transport' },
    { word: 'Route', meaning: 'the path taken to reach a place' },
    { word: 'Departure', meaning: 'the act of leaving' },
    { word: 'Congestion', meaning: 'too much traffic in one area' },
    { word: 'Infrastructure', meaning: 'basic transport systems and facilities' },
  ],
  politics: [
    { word: 'Vote', meaning: 'to choose in an election' },
    { word: 'Leader', meaning: 'a person who guides a group' },
    { word: 'Election', meaning: 'a process of choosing leaders' },
    { word: 'Policy', meaning: 'a plan or rule made by authority' },
    { word: 'Government', meaning: 'the system that runs a country' },
    { word: 'Citizen', meaning: 'a legal member of a country' },
    { word: 'Campaign', meaning: 'organized actions to win support' },
    { word: 'Democracy', meaning: 'government chosen by the people' },
    { word: 'Legislation', meaning: 'laws made by a government' },
    { word: 'Accountability', meaning: 'responsibility for decisions and actions' },
  ],
  family: [
    { word: 'Parent', meaning: 'a mother or father' },
    { word: 'Sibling', meaning: 'a brother or sister' },
    { word: 'Cousin', meaning: 'a child of your aunt or uncle' },
    { word: 'Marriage', meaning: 'a legal relationship between partners' },
    { word: 'Relative', meaning: 'a member of your family' },
    { word: 'Supportive', meaning: 'helpful and encouraging' },
    { word: 'Conflict', meaning: 'a serious disagreement' },
    { word: 'Relationship', meaning: 'a connection between people' },
    { word: 'Commitment', meaning: 'a strong promise or responsibility' },
    { word: 'Reconciliation', meaning: 'repairing a damaged relationship' },
  ],
};

const grammarTopics: Topic[] = [
  { id: 'general-grammar', title: 'General Grammar', description: 'Kumpulan soal tata bahasa umum untuk semua level.' },
  { id: 'be-auxiliary', title: 'Mastering "To Be" & Auxiliary Verbs', description: 'Latihan fokus pada Do/Does/Did vs Is/Am/Are/Was/Were.' },
  { id: 'nouns-articles', title: 'Nouns & Articles (A/An/The)', description: 'Latihan Countable/Uncountable Nouns dan penggunaan artikel.' },
  { id: 'prepositions-time-place', title: 'Prepositions of Time & Place', description: 'Latihan fokus pada penggunaan preposisi waktu dan tempat.' },
  { id: 'quantifiers', title: 'Quantifiers (Much/Many/Some/Any)', description: 'Latihan penggunaan kata penunjuk jumlah.' },
  { id: 'comparison', title: 'Degrees of Comparison', description: 'Latihan Comparative dan Superlative (Better/Best, More/Most).' },
  { id: 'tenses', title: 'The 12 Tenses Challenge', description: 'Uji pemahamanmu tentang 12 tenses dasar Bahasa Inggris.' },
  { id: 'pronouns-possessives', title: 'Pronouns & Possessives', description: 'Latihan Subjek, Objek, Kepemilikan (my/mine), dan Reflexive.' },
  { id: 'adjectives-adverbs', title: 'Adjectives vs. Adverbs', description: 'Latihan perbedaan kata sifat (-er/more) dan kata keterangan (-ly).' },
  { id: 'question-tags', title: 'Question Tags', description: 'Latihan membuat pertanyaan penegas di akhir kalimat.' },
  { id: 'relative-clauses', title: 'Relative Clauses (Who/Which/That)', description: 'Latihan menggabungkan kalimat dengan kata hubung relatif.' },
  { id: 'intensifiers', title: 'So / Such / Too / Enough', description: 'Latihan penggunaan intensifier dan penunjuk kecukupan.' },
  { id: 'participles', title: 'Participles (-ed vs -ing)', description: 'Latihan membedakan Bored vs Boring, Excited vs Exciting.' },
  { id: 'used-to', title: 'Used to / Be used to', description: 'Latihan kebiasaan masa lalu dan adaptasi kebiasaan.' },
  { id: 'modal-verbs', title: 'Modal Verbs', description: 'Latihan Can, Should, Must, May, dan bentuk lampaunya.' },
  { id: 'active-passive', title: 'Active vs. Passive Voice', description: 'Latihan mengubah kalimat aktif menjadi pasif (di-/ter-).' },
  { id: 'gerunds-infinitives', title: 'Gerunds vs. Infinitives', description: 'Latihan kapan pakai V-ing dan kapan pakai to V1.' },
  { id: 'conditionals', title: 'Conditional Sentences', description: 'Latihan pengandaian (jika... maka...) Type 0, 1, 2, & 3.' },
  { id: 'conjunctions', title: 'Conjunctions (Kata Sambung)', description: 'Latihan kata hubung seperti and, but, because, although, dll.' },
];

const speakingTopics: SpeakingTopic[] = [
  {
    id: 'self-introduction',
    title: 'Self Introduction',
    description: 'Latihan memperkenalkan diri dengan natural dan percaya diri.',
    situation: 'meeting a new classmate or coworker',
    goal: 'introduce your name, background, and one personal detail',
    pattern: 'Hi, I am ___. I am from ___, and I am interested in ___.',
    pronunciation: 'clear word stress in introduction phrases',
    sample: 'Hi, I am Raka. I am from Bandung, and I am interested in product design.',
    formalResponse: 'It is a pleasure to meet you.',
    casualResponse: 'Nice to meet you.',
    repairPhrase: 'Let me say that again more clearly.',
    fluencyTip: 'Pause briefly after your name and keep the ending clear.',
  },
  {
    id: 'daily-routine',
    title: 'Daily Routine',
    description: 'Bercerita tentang rutinitas harian dengan present simple.',
    situation: 'talking about your normal day',
    goal: 'describe morning, work or study, and evening habits',
    pattern: 'I usually ___ in the morning, then I ___ before ___.',
    pronunciation: 'final -s in third-person routine verbs',
    sample: 'I usually check my schedule in the morning, then I study before lunch.',
    formalResponse: 'My routine is fairly consistent during the week.',
    casualResponse: 'My days are pretty simple.',
    repairPhrase: 'What I mean is, this is what I usually do.',
    fluencyTip: 'Use sequence words like first, then, after that, and finally.',
  },
  {
    id: 'ordering-food',
    title: 'Ordering Food',
    description: 'Berbicara sopan saat memesan makanan atau minuman.',
    situation: 'ordering at a restaurant or cafe',
    goal: 'order an item, ask for a detail, and confirm politely',
    pattern: 'Could I have ___, please? Also, could you make it ___?',
    pronunciation: 'rising intonation in polite requests',
    sample: 'Could I have the chicken sandwich, please? Also, could you make it less spicy?',
    formalResponse: 'Could I please have the grilled fish with rice?',
    casualResponse: 'Can I get a burger and fries?',
    repairPhrase: 'Sorry, I meant the small size, not the large one.',
    fluencyTip: 'Start with could I or can I to sound natural and polite.',
  },
  {
    id: 'asking-directions',
    title: 'Asking for Directions',
    description: 'Minta arah dan memastikan instruksi dengan jelas.',
    situation: 'asking someone how to get to a place',
    goal: 'ask for directions, repeat key landmarks, and thank the person',
    pattern: 'Excuse me, how do I get to ___ from here?',
    pronunciation: 'stress place names and direction words',
    sample: 'Excuse me, how do I get to the train station from here?',
    formalResponse: 'Could you tell me the best way to reach the station?',
    casualResponse: 'How do I get to the station?',
    repairPhrase: 'So I go straight first, then turn left, right?',
    fluencyTip: 'Repeat the route in your own words to confirm understanding.',
  },
  {
    id: 'small-talk',
    title: 'Small Talk',
    description: 'Latihan obrolan ringan agar percakapan mengalir.',
    situation: 'starting a friendly short conversation',
    goal: 'open a topic, respond naturally, and ask a follow-up question',
    pattern: 'How has your ___ been? Mine has been ___.',
    pronunciation: 'natural linking in how has your',
    sample: 'How has your week been? Mine has been busy but good.',
    formalResponse: 'How has your week been so far?',
    casualResponse: 'How is your week going?',
    repairPhrase: 'Actually, let me put it another way.',
    fluencyTip: 'Answer briefly, then ask one follow-up question.',
  },
  {
    id: 'phone-call',
    title: 'Phone Call',
    description: 'Berbicara di telepon untuk membuka, menahan, dan menutup panggilan.',
    situation: 'calling an office or service desk',
    goal: 'state your reason, ask for help, and close politely',
    pattern: 'Hi, I am calling about ___. Could you help me with that?',
    pronunciation: 'clear consonants because the listener cannot see your face',
    sample: 'Hi, I am calling about my appointment. Could you help me reschedule it?',
    formalResponse: 'May I speak with someone from customer support?',
    casualResponse: 'Can I talk to someone about my booking?',
    repairPhrase: 'Sorry, the line is not clear. Could you repeat that?',
    fluencyTip: 'Speak slightly slower on phone calls and chunk your message.',
  },
  {
    id: 'travel-check-in',
    title: 'Travel Check-in',
    description: 'Latihan bicara saat check-in hotel atau bandara.',
    situation: 'checking in at a hotel or airport counter',
    goal: 'give your name, confirm a booking, and ask one practical question',
    pattern: 'I have a reservation under ___. Could I check in now?',
    pronunciation: 'sentence stress on reservation details',
    sample: 'I have a reservation under Wahib Rohman. Could I check in now?',
    formalResponse: 'I have a reservation under my name, and I would like to check in.',
    casualResponse: 'Hi, I have a booking under Wahib.',
    repairPhrase: 'The reservation is under my last name, Rohman.',
    fluencyTip: 'Keep names and numbers slow enough to be understood.',
  },
  {
    id: 'job-interview',
    title: 'Job Interview',
    description: 'Menjawab pertanyaan interview dengan terstruktur.',
    situation: 'answering a common interview question',
    goal: 'describe experience, strength, and motivation clearly',
    pattern: 'In my previous role, I ___. That helped me ___.',
    pronunciation: 'confident falling intonation in final statements',
    sample: 'In my previous role, I handled user feedback. That helped me improve product decisions.',
    formalResponse: 'I believe my experience in communication would be valuable for this role.',
    casualResponse: 'I think my communication skills fit this role well.',
    repairPhrase: 'Let me give a more specific example.',
    fluencyTip: 'Use one concrete example instead of listing too many points.',
  },
  {
    id: 'giving-opinion',
    title: 'Giving Opinions',
    description: 'Mengutarakan pendapat dan alasan secara sopan.',
    situation: 'sharing your opinion in a discussion',
    goal: 'state an opinion, support it, and acknowledge another view',
    pattern: 'I think ___ because ___. However, I understand that ___.',
    pronunciation: 'stress contrast words like however and but',
    sample: 'I think online learning is useful because it is flexible. However, I understand that some students need face-to-face support.',
    formalResponse: 'From my perspective, the main benefit is flexibility.',
    casualResponse: 'I think it is helpful because it saves time.',
    repairPhrase: 'To clarify, I am not saying it is perfect.',
    fluencyTip: 'Use because for your reason and however for balance.',
  },
  {
    id: 'describing-picture',
    title: 'Describing a Picture',
    description: 'Mendeskripsikan gambar dengan urutan dan detail.',
    situation: 'describing an image in a speaking test',
    goal: 'describe people, place, action, and possible meaning',
    pattern: 'In the picture, I can see ___. It looks like ___.',
    pronunciation: 'smooth linking in it looks like',
    sample: 'In the picture, I can see two people working in a cafe. It looks like they are planning a project.',
    formalResponse: 'The image appears to show a professional discussion.',
    casualResponse: 'It looks like two friends are working together.',
    repairPhrase: 'I am not completely sure, but it seems like they are discussing work.',
    fluencyTip: 'Move from general details to specific observations.',
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    description: 'Menceritakan pengalaman singkat dengan alur jelas.',
    situation: 'telling a short personal story',
    goal: 'explain what happened, how you felt, and what you learned',
    pattern: 'Last week, I ___. At first, ___. In the end, ___.',
    pronunciation: 'past tense endings in happened, learned, and helped',
    sample: 'Last week, I missed my bus. At first, I felt stressed. In the end, I learned to leave earlier.',
    formalResponse: 'That experience taught me to prepare more carefully.',
    casualResponse: 'It taught me to plan better next time.',
    repairPhrase: 'Let me start from the beginning.',
    fluencyTip: 'Use time markers to make your story easy to follow.',
  },
  {
    id: 'complaint-request',
    title: 'Complaint & Request',
    description: 'Menyampaikan keluhan dengan tetap sopan.',
    situation: 'reporting a problem to customer service',
    goal: 'explain the problem, request a solution, and stay polite',
    pattern: 'I am afraid there is a problem with ___. Could you please ___?',
    pronunciation: 'polite tone on could you please',
    sample: 'I am afraid there is a problem with my order. Could you please check it?',
    formalResponse: 'I would appreciate it if you could look into this issue.',
    casualResponse: 'Could you help me fix this?',
    repairPhrase: 'I do not mean to complain, but I need some help with this.',
    fluencyTip: 'Describe the problem first, then ask for one clear action.',
  },
  {
    id: 'presentation-opening',
    title: 'Presentation Opening',
    description: 'Membuka presentasi dengan tujuan dan struktur.',
    situation: 'starting a short presentation',
    goal: 'greet the audience, introduce the topic, and preview points',
    pattern: 'Good morning. Today, I am going to talk about ___. I will cover ___.',
    pronunciation: 'clear pauses after greeting and topic',
    sample: 'Good morning. Today, I am going to talk about healthy habits. I will cover sleep, food, and exercise.',
    formalResponse: 'Today, I would like to present three key points.',
    casualResponse: 'Today, I want to talk about three things.',
    repairPhrase: 'Let me outline the main points first.',
    fluencyTip: 'Use signposting words so listeners know where you are going.',
  },
  {
    id: 'agree-disagree',
    title: 'Agreeing & Disagreeing',
    description: 'Setuju dan tidak setuju tanpa terdengar kasar.',
    situation: 'responding to another person in a discussion',
    goal: 'agree, partly agree, or disagree with a reason',
    pattern: 'I see your point, but I think ___ because ___.',
    pronunciation: 'soft tone before disagreement phrases',
    sample: 'I see your point, but I think remote work is still useful because it saves commuting time.',
    formalResponse: 'I partly agree, although I would add one concern.',
    casualResponse: 'I get that, but I see it a bit differently.',
    repairPhrase: 'I may have explained that too strongly. What I mean is...',
    fluencyTip: 'Acknowledge the other view before giving your own.',
  },
  {
    id: 'future-plans',
    title: 'Future Plans',
    description: 'Berbicara tentang rencana, target, dan harapan.',
    situation: 'talking about goals for the next few months',
    goal: 'describe a plan, reason, and expected result',
    pattern: 'I am planning to ___ because ___. I hope it will ___.',
    pronunciation: 'connected speech in going to and planning to',
    sample: 'I am planning to practice English every day because I want to speak more confidently.',
    formalResponse: 'My goal is to improve my speaking fluency over the next three months.',
    casualResponse: 'I want to get better at speaking this year.',
    repairPhrase: 'To be more specific, I want to focus on speaking fluency.',
    fluencyTip: 'Connect your plan to a clear reason and outcome.',
  },
];

const writingTopics: WritingTopic[] = [
  {
    id: 'simple-sentences',
    title: 'Simple Sentences',
    description: 'Latihan membuat kalimat pendek yang jelas dan benar.',
    task: 'write clear sentences about everyday activities',
    goal: 'make a complete sentence with subject, verb, and object or complement',
    format: 'one complete sentence',
    structure: 'Subject + verb + object/complement.',
    sample: 'I study English every morning.',
    opening: 'I usually',
    connector: 'and',
    closing: 'every day.',
    editingTip: 'Check that every sentence has a subject and a verb.',
  },
  {
    id: 'daily-journal',
    title: 'Daily Journal',
    description: 'Menulis catatan harian singkat dengan urutan waktu.',
    task: 'write a short journal entry about your day',
    goal: 'describe events, feelings, and one reflection',
    format: 'short journal paragraph',
    structure: 'Time marker + event + feeling + reflection.',
    sample: 'Today, I finished my work early. I felt relieved because I had time to rest.',
    opening: 'Today,',
    connector: 'because',
    closing: 'I learned something useful.',
    editingTip: 'Use past tense for events that already happened.',
  },
  {
    id: 'email-request',
    title: 'Email Request',
    description: 'Menulis email permintaan dengan sopan dan rapi.',
    task: 'write a polite email asking for help or information',
    goal: 'state the request clearly and close politely',
    format: 'short formal email',
    structure: 'Greeting + reason + request + thanks + closing.',
    sample: 'Dear Ms. Lee, I am writing to ask for more information about the schedule. Thank you for your help.',
    opening: 'Dear Sir or Madam,',
    connector: 'I am writing to',
    closing: 'Thank you for your time.',
    editingTip: 'Keep the request direct, polite, and easy to answer.',
  },
  {
    id: 'opinion-paragraph',
    title: 'Opinion Paragraph',
    description: 'Menulis pendapat dengan alasan dan contoh.',
    task: 'write one paragraph giving your opinion',
    goal: 'state an opinion, support it, and add an example',
    format: 'opinion paragraph',
    structure: 'Opinion + reason + example + concluding sentence.',
    sample: 'I think online learning is useful because it is flexible. For example, students can study from home.',
    opening: 'In my opinion,',
    connector: 'for example',
    closing: 'For these reasons, I agree with this idea.',
    editingTip: 'Make sure your reason clearly supports your opinion.',
  },
  {
    id: 'descriptive-place',
    title: 'Describing a Place',
    description: 'Mendeskripsikan tempat dengan detail sensorik.',
    task: 'write a description of a place you know',
    goal: 'describe location, appearance, and atmosphere',
    format: 'descriptive paragraph',
    structure: 'Place + details + atmosphere + personal impression.',
    sample: 'My favorite cafe is small but comfortable. It has warm lights, wooden tables, and quiet music.',
    opening: 'One place I like is',
    connector: 'also',
    closing: 'That is why I enjoy going there.',
    editingTip: 'Use specific adjectives instead of vague words like nice or good.',
  },
  {
    id: 'story-writing',
    title: 'Short Story',
    description: 'Menulis cerita pendek dengan awal, konflik, dan akhir.',
    task: 'write a short story based on a simple event',
    goal: 'show sequence, problem, and resolution',
    format: 'short narrative',
    structure: 'Beginning + problem + action + ending.',
    sample: 'Last night, I lost my keys. After searching for twenty minutes, I found them under my notebook.',
    opening: 'Last night,',
    connector: 'after that',
    closing: 'In the end, everything was fine.',
    editingTip: 'Keep the time order clear with words like first, then, and finally.',
  },
  {
    id: 'compare-contrast',
    title: 'Compare & Contrast',
    description: 'Membandingkan dua hal dengan connector yang tepat.',
    task: 'write a paragraph comparing two options',
    goal: 'explain similarities and differences clearly',
    format: 'comparison paragraph',
    structure: 'Similarity + difference + preference or conclusion.',
    sample: 'Both buses and trains are affordable. However, trains are usually faster and more comfortable.',
    opening: 'Both options',
    connector: 'however',
    closing: 'Overall, I prefer the second option.',
    editingTip: 'Use however for contrast and both for similarity.',
  },
  {
    id: 'problem-solution',
    title: 'Problem & Solution',
    description: 'Menulis masalah dan solusi dengan alur logis.',
    task: 'write about a problem and suggest a solution',
    goal: 'identify the issue, explain impact, and offer a practical fix',
    format: 'problem-solution paragraph',
    structure: 'Problem + effect + solution + expected result.',
    sample: 'Many students feel tired because they sleep late. One solution is to set a regular bedtime.',
    opening: 'One common problem is',
    connector: 'as a result',
    closing: 'This solution can make the situation better.',
    editingTip: 'Connect the solution directly to the problem you introduced.',
  },
  {
    id: 'social-media-caption',
    title: 'Social Media Caption',
    description: 'Menulis caption singkat yang natural dan menarik.',
    task: 'write a short caption for a post',
    goal: 'make the message concise, friendly, and clear',
    format: 'short caption',
    structure: 'Hook + detail + feeling or call to action.',
    sample: 'A slow morning, a good book, and fresh coffee. Perfect start to the day.',
    opening: 'A little moment from',
    connector: 'with',
    closing: 'What a day.',
    editingTip: 'Cut unnecessary words so the caption feels clean.',
  },
  {
    id: 'formal-letter',
    title: 'Formal Letter',
    description: 'Menulis surat formal dengan nada profesional.',
    task: 'write a formal letter for an official purpose',
    goal: 'use formal tone, clear purpose, and polite closing',
    format: 'formal letter',
    structure: 'Salutation + purpose + details + request + closing.',
    sample: 'Dear Manager, I am writing to request a copy of the official receipt for my recent purchase.',
    opening: 'Dear Manager,',
    connector: 'regarding',
    closing: 'Sincerely,',
    editingTip: 'Avoid casual contractions like wanna, gonna, or thanks a lot.',
  },
  {
    id: 'application-message',
    title: 'Application Message',
    description: 'Menulis pesan lamaran singkat dan meyakinkan.',
    task: 'write a short job or program application message',
    goal: 'introduce yourself, show interest, and mention relevant experience',
    format: 'application message',
    structure: 'Introduction + interest + relevant skill + closing.',
    sample: 'I am interested in applying for this position because I have experience in customer service and communication.',
    opening: 'I am writing to apply for',
    connector: 'because',
    closing: 'I look forward to your response.',
    editingTip: 'Mention one specific skill that matches the opportunity.',
  },
  {
    id: 'review-writing',
    title: 'Review Writing',
    description: 'Menulis ulasan produk, tempat, atau pengalaman.',
    task: 'write a balanced review',
    goal: 'describe experience, mention strengths, and give a recommendation',
    format: 'review paragraph',
    structure: 'Item + experience + positive/negative points + recommendation.',
    sample: 'The restaurant has friendly service and fresh food. However, the waiting time was a little long.',
    opening: 'I recently tried',
    connector: 'however',
    closing: 'I would recommend it to people who enjoy quiet places.',
    editingTip: 'Balance praise with one useful detail or limitation.',
  },
  {
    id: 'academic-summary',
    title: 'Academic Summary',
    description: 'Merangkum teks akademik dengan singkat dan objektif.',
    task: 'write a brief summary of a text or idea',
    goal: 'capture the main idea without personal opinion',
    format: 'academic summary',
    structure: 'Source/topic + main idea + key point + result.',
    sample: 'The text explains that regular sleep improves focus and memory. It also shows that poor sleep affects learning.',
    opening: 'The text explains that',
    connector: 'in addition',
    closing: 'Overall, the main point is clear.',
    editingTip: 'Do not add personal opinions in a summary unless asked.',
  },
  {
    id: 'argument-essay',
    title: 'Argument Essay',
    description: 'Menulis argumen dengan thesis, alasan, dan counterpoint.',
    task: 'write a short argumentative essay response',
    goal: 'present a claim, support it, and address another view',
    format: 'argument essay paragraph',
    structure: 'Thesis + reason + evidence/example + counterpoint + conclusion.',
    sample: 'Technology can improve education because it gives students access to many resources. However, it should be used with clear guidance.',
    opening: 'This essay argues that',
    connector: 'on the other hand',
    closing: 'Therefore, this approach is reasonable.',
    editingTip: 'Make the thesis specific enough to guide the whole paragraph.',
  },
  {
    id: 'editing-proofreading',
    title: 'Editing & Proofreading',
    description: 'Melatih memperbaiki kalimat agar jelas dan akurat.',
    task: 'edit sentences for grammar, clarity, and punctuation',
    goal: 'find weak parts and choose a cleaner version',
    format: 'edited sentence or paragraph',
    structure: 'Read + identify issue + revise + check meaning.',
    sample: 'She does not like coffee, but she drinks tea every morning.',
    opening: 'The corrected sentence is',
    connector: 'but',
    closing: 'The meaning is now clear.',
    editingTip: 'Check verb agreement, punctuation, and word order before submitting.',
  },
];

const readingTopics: ReadingTopic[] = [
  {
    id: 'daily-life',
    title: 'Daily Life',
    description: 'Bacaan pendek tentang rutinitas dan kebiasaan sehari-hari.',
    passageTitle: 'A Quiet Morning',
    passage: 'Mira wakes up early every weekday. She drinks water, checks her schedule, and walks to the bus stop before seven. She likes quiet mornings because they help her feel ready for the day.',
    mainIdea: 'Mira has a calm morning routine that helps her prepare for the day.',
    detail: 'Mira walks to the bus stop before seven.',
    vocabulary: 'schedule',
    vocabularyMeaning: 'a plan that shows when things happen',
    inference: 'Mira probably values being organized.',
    purpose: 'to describe a simple daily routine',
    readingSkill: 'finding the main idea and supporting details',
  },
  {
    id: 'school-notice',
    title: 'School Notice',
    description: 'Membaca pengumuman sekolah dan menangkap informasi penting.',
    passageTitle: 'Library Hours Update',
    passage: 'Starting Monday, the school library will close at 5 p.m. instead of 4 p.m. Students may use the extra hour for group projects, reading, or computer access. Food and drinks are still not allowed inside.',
    mainIdea: 'The school library will stay open one hour longer.',
    detail: 'Food and drinks are still not allowed inside the library.',
    vocabulary: 'access',
    vocabularyMeaning: 'the ability or permission to use something',
    inference: 'Students will have more time to study after class.',
    purpose: 'to inform students about a change in library hours',
    readingSkill: 'identifying specific information in a notice',
  },
  {
    id: 'travel-blog',
    title: 'Travel Blog',
    description: 'Membaca cerita perjalanan dan memahami opini penulis.',
    passageTitle: 'A Weekend in Yogyakarta',
    passage: 'Last weekend, Arif visited Yogyakarta with two friends. They explored small streets, tried local food, and watched the sunset near the temple. Arif thought the best part was meeting friendly local artists.',
    mainIdea: 'Arif enjoyed a short trip to Yogyakarta with memorable local experiences.',
    detail: 'Arif watched the sunset near the temple.',
    vocabulary: 'explored',
    vocabularyMeaning: 'traveled around a place to learn about it',
    inference: 'Arif enjoys cultural experiences when traveling.',
    purpose: 'to share a personal travel experience',
    readingSkill: 'understanding personal recounts and opinions',
  },
  {
    id: 'health-article',
    title: 'Health Article',
    description: 'Membaca artikel kesehatan ringan dengan detail saran.',
    passageTitle: 'Small Habits for Better Sleep',
    passage: 'Many people sleep poorly because they use screens late at night. Doctors suggest turning off phones thirty minutes before bed. A regular bedtime and a dark room can also improve sleep quality.',
    mainIdea: 'Small bedtime habits can improve sleep quality.',
    detail: 'Doctors suggest turning off phones thirty minutes before bed.',
    vocabulary: 'quality',
    vocabularyMeaning: 'how good or bad something is',
    inference: 'Screen use before bed can make sleep worse.',
    purpose: 'to give simple advice for better sleep',
    readingSkill: 'recognizing advice and cause-effect relationships',
  },
  {
    id: 'technology-news',
    title: 'Technology News',
    description: 'Membaca berita singkat tentang teknologi dan dampaknya.',
    passageTitle: 'A New Language App',
    passage: 'A local startup launched a language app for busy learners. The app gives short lessons, daily reminders, and pronunciation feedback. The team hopes it will help users practice even when they only have ten minutes.',
    mainIdea: 'A new app helps busy learners practice languages in short sessions.',
    detail: 'The app gives pronunciation feedback.',
    vocabulary: 'launched',
    vocabularyMeaning: 'started or introduced something new',
    inference: 'The app is designed for people with limited time.',
    purpose: 'to report the launch of a useful learning app',
    readingSkill: 'summarizing news and identifying product features',
  },
  {
    id: 'restaurant-review',
    title: 'Restaurant Review',
    description: 'Membaca ulasan restoran dan membedakan fakta serta opini.',
    passageTitle: 'Green Bowl Cafe',
    passage: 'Green Bowl Cafe serves fresh salads, soup, and fruit drinks. The service is quick, but the seating area is small. The reviewer recommends visiting before noon because it becomes crowded during lunch.',
    mainIdea: 'Green Bowl Cafe has fresh food and quick service, but limited seating.',
    detail: 'The seating area is small.',
    vocabulary: 'recommends',
    vocabularyMeaning: 'suggests something as a good choice',
    inference: 'The cafe is popular around lunch time.',
    purpose: 'to review a cafe and give a practical suggestion',
    readingSkill: 'separating facts, opinions, and recommendations',
  },
  {
    id: 'work-email',
    title: 'Work Email',
    description: 'Membaca email kantor dan memahami action item.',
    passageTitle: 'Project Reminder',
    passage: 'Hi team, please send your final slides by Thursday afternoon. I will combine them into one deck before Friday morning. If you need design support, contact Nina before noon tomorrow.',
    mainIdea: 'The email reminds the team to send final slides by Thursday afternoon.',
    detail: 'Nina can help with design support before noon tomorrow.',
    vocabulary: 'combine',
    vocabularyMeaning: 'put things together',
    inference: 'The presentation deck must be ready before Friday morning.',
    purpose: 'to remind coworkers about a project deadline',
    readingSkill: 'finding deadlines and required actions',
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Membaca teks lingkungan dengan hubungan sebab-akibat.',
    passageTitle: 'Cleaner Neighborhoods',
    passage: 'Residents in Maple Street started sorting their waste last month. They separate paper, plastic, and food scraps. As a result, the area has less trash, and more families are joining the program.',
    mainIdea: 'Waste sorting helped Maple Street become cleaner.',
    detail: 'Residents separate paper, plastic, and food scraps.',
    vocabulary: 'residents',
    vocabularyMeaning: 'people who live in a place',
    inference: 'The program is becoming more popular.',
    purpose: 'to describe a community recycling effort',
    readingSkill: 'tracking cause and result',
  },
  {
    id: 'biography',
    title: 'Short Biography',
    description: 'Membaca biografi singkat dan memahami pencapaian tokoh.',
    passageTitle: 'The Young Inventor',
    passage: 'Lina built her first simple robot when she was twelve. At sixteen, she won a national science competition. She now teaches younger students how to design small machines using recycled materials.',
    mainIdea: 'Lina is a young inventor who now helps other students learn.',
    detail: 'Lina won a national science competition at sixteen.',
    vocabulary: 'inventor',
    vocabularyMeaning: 'a person who creates something new',
    inference: 'Lina is interested in both science and education.',
    purpose: 'to introduce an inspiring young inventor',
    readingSkill: 'understanding timeline and achievements',
  },
  {
    id: 'shopping-policy',
    title: 'Shopping Policy',
    description: 'Membaca aturan toko dan memahami syarat penting.',
    passageTitle: 'Return Policy',
    passage: 'Customers may return unused items within fourteen days. The original receipt is required. Sale items cannot be returned, but they may be exchanged for a different size if stock is available.',
    mainIdea: 'The store allows returns and exchanges under certain conditions.',
    detail: 'The original receipt is required for returns.',
    vocabulary: 'exchanged',
    vocabularyMeaning: 'replaced with another item',
    inference: 'A sale item can only be changed if another size is in stock.',
    purpose: 'to explain the store return policy',
    readingSkill: 'reading rules and conditions carefully',
  },
  {
    id: 'science-fact',
    title: 'Science Fact',
    description: 'Membaca fakta sains singkat dan menarik kesimpulan.',
    passageTitle: 'Why Plants Need Light',
    passage: 'Plants use sunlight to make food through a process called photosynthesis. Without enough light, many plants grow slowly or become weak. This is why indoor plants are often placed near windows.',
    mainIdea: 'Plants need sunlight to make food and grow well.',
    detail: 'Indoor plants are often placed near windows.',
    vocabulary: 'process',
    vocabularyMeaning: 'a series of actions or changes',
    inference: 'A dark room is not ideal for many plants.',
    purpose: 'to explain why light matters for plant growth',
    readingSkill: 'understanding explanations and scientific terms',
  },
  {
    id: 'event-schedule',
    title: 'Event Schedule',
    description: 'Membaca jadwal acara dan menemukan urutan kegiatan.',
    passageTitle: 'Community Workshop',
    passage: 'The workshop begins at 9 a.m. with registration. A cooking demonstration starts at 10 a.m., followed by a short lunch break. The final session at 1 p.m. focuses on budgeting for healthy meals.',
    mainIdea: 'The community workshop has several scheduled activities.',
    detail: 'The final session focuses on budgeting for healthy meals.',
    vocabulary: 'registration',
    vocabularyMeaning: 'the act of signing up or checking in',
    inference: 'Participants should arrive before the cooking demonstration starts.',
    purpose: 'to show the order of workshop activities',
    readingSkill: 'reading sequence and time information',
  },
  {
    id: 'opinion-column',
    title: 'Opinion Column',
    description: 'Membaca opini dan memahami alasan penulis.',
    passageTitle: 'Why Parks Matter',
    passage: 'City parks are more than places to relax. They give children safe spaces to play and help adults exercise outdoors. In my view, every neighborhood should have a clean and accessible park.',
    mainIdea: 'The writer believes every neighborhood should have a clean park.',
    detail: 'Parks give children safe spaces to play.',
    vocabulary: 'accessible',
    vocabularyMeaning: 'easy to reach or use',
    inference: 'The writer values public spaces that support health and community life.',
    purpose: 'to persuade readers that parks are important',
    readingSkill: 'identifying opinion, reason, and persuasion',
  },
  {
    id: 'instructions',
    title: 'Instructions',
    description: 'Membaca instruksi dan memahami langkah-langkah.',
    passageTitle: 'How to Reset a Password',
    passage: 'Open the login page and click Forgot Password. Enter your email address, then check your inbox for a reset link. Create a new password and save it in a secure place.',
    mainIdea: 'The text explains how to reset a password.',
    detail: 'Users should check their inbox for a reset link.',
    vocabulary: 'secure',
    vocabularyMeaning: 'safe or protected',
    inference: 'The user needs access to their email account.',
    purpose: 'to give step-by-step password reset instructions',
    readingSkill: 'following procedural steps',
  },
  {
    id: 'culture',
    title: 'Culture',
    description: 'Membaca teks budaya dan memahami makna kebiasaan.',
    passageTitle: 'Sharing Food',
    passage: 'In many families, sharing food is a way to welcome guests. A simple meal can show kindness, respect, and friendship. Even when the food is not expensive, the gesture often feels meaningful.',
    mainIdea: 'Sharing food can be an important gesture of welcome and respect.',
    detail: 'A simple meal can show kindness, respect, and friendship.',
    vocabulary: 'gesture',
    vocabularyMeaning: 'an action that shows a feeling or intention',
    inference: 'The meaning of sharing food is not only about price.',
    purpose: 'to explain the cultural meaning of sharing food',
    readingSkill: 'interpreting meaning beyond literal details',
  },
];

const sharedGrammarSeeds: GrammarSeed[] = [
  { prompt: 'Choose the correct sentence.', answer: 'She goes to school every day.', options: ['She goes to school every day.', 'She go to school every day.', 'She going to school every day.', 'She gone to school every day.'] },
  { prompt: 'Complete the sentence: They ____ watching a movie now.', answer: 'are', options: ['are', 'is', 'do', 'does'] },
  { prompt: 'Choose the correct past form: I ____ my homework yesterday.', answer: 'finished', options: ['finished', 'finish', 'finishes', 'am finishing'] },
  { prompt: 'Which option is grammatically correct?', answer: 'There are many books on the table.', options: ['There are many books on the table.', 'There is many books on the table.', 'There are much books on the table.', 'There be many books on the table.'] },
  { prompt: 'Complete the question: ____ you speak English?', answer: 'Do', options: ['Do', 'Are', 'Is', 'Does'] },
];

const grammarQuestionSeeds: Record<string, GrammarSeed[]> = {
  'be-auxiliary': [
    { prompt: 'Complete: She ____ a teacher.', answer: 'is', options: ['is', 'are', 'do', 'does'] },
    { prompt: 'Complete: ____ they at home yesterday?', answer: 'Were', options: ['Were', 'Was', 'Do', 'Does'] },
    { prompt: 'Complete: He ____ not like coffee.', answer: 'does', options: ['does', 'is', 'are', 'was'] },
  ],
  'nouns-articles': [
    { prompt: 'Complete: I saw ____ elephant at the zoo.', answer: 'an', options: ['an', 'a', 'the', '-'] },
    { prompt: 'Complete: ____ sun rises in the east.', answer: 'The', options: ['The', 'A', 'An', '-'] },
    { prompt: 'Choose the correct phrase.', answer: 'some information', options: ['some information', 'an information', 'many information', 'a few information'] },
  ],
  'prepositions-time-place': [
    { prompt: 'Complete: The meeting is ____ Monday.', answer: 'on', options: ['on', 'in', 'at', 'by'] },
    { prompt: 'Complete: She lives ____ Jakarta.', answer: 'in', options: ['in', 'on', 'at', 'to'] },
    { prompt: 'Complete: I wake up ____ 6 a.m.', answer: 'at', options: ['at', 'on', 'in', 'from'] },
  ],
  quantifiers: [
    { prompt: 'Complete: How ____ water do you drink?', answer: 'much', options: ['much', 'many', 'few', 'several'] },
    { prompt: 'Complete: I have ____ friends in this city.', answer: 'many', options: ['many', 'much', 'any', 'little'] },
    { prompt: 'Complete: We do not have ____ sugar left.', answer: 'any', options: ['any', 'some', 'many', 'few'] },
  ],
  comparison: [
    { prompt: 'Complete: This book is ____ than that one.', answer: 'more interesting', options: ['more interesting', 'most interesting', 'interestingest', 'interestinger'] },
    { prompt: 'Complete: She is the ____ student in class.', answer: 'best', options: ['best', 'better', 'gooder', 'more good'] },
    { prompt: 'Complete: My bag is ____ than yours.', answer: 'heavier', options: ['heavier', 'heaviest', 'more heavy', 'heavyer'] },
  ],
  tenses: [
    { prompt: 'Complete: I ____ dinner when you called.', answer: 'was cooking', options: ['was cooking', 'cook', 'have cooked', 'am cook'] },
    { prompt: 'Complete: She ____ in Bali since 2020.', answer: 'has lived', options: ['has lived', 'lives', 'lived', 'is living'] },
    { prompt: 'Complete: They ____ tomorrow morning.', answer: 'will arrive', options: ['will arrive', 'arrived', 'arrives', 'have arrived'] },
  ],
  'pronouns-possessives': [
    { prompt: 'Complete: This book is ____.', answer: 'mine', options: ['mine', 'my', 'me', 'myself'] },
    { prompt: 'Complete: I gave ____ a present.', answer: 'her', options: ['her', 'she', 'hers', 'herself'] },
    { prompt: 'Complete: He fixed the computer by ____.', answer: 'himself', options: ['himself', 'him', 'his', 'he'] },
  ],
  'adjectives-adverbs': [
    { prompt: 'Complete: She speaks English ____.', answer: 'fluently', options: ['fluently', 'fluent', 'more fluent', 'fluency'] },
    { prompt: 'Complete: This is a ____ answer.', answer: 'clear', options: ['clear', 'clearly', 'clearerly', 'clearness'] },
    { prompt: 'Complete: Drive ____ in the rain.', answer: 'carefully', options: ['carefully', 'careful', 'care', 'more careful'] },
  ],
  'question-tags': [
    { prompt: 'Complete: You are tired, ____?', answer: "aren't you", options: ["aren't you", "are you", "don't you", "weren't you"] },
    { prompt: 'Complete: She likes tea, ____?', answer: "doesn't she", options: ["doesn't she", "isn't she", "does she", "didn't she"] },
    { prompt: 'Complete: They did not come, ____?', answer: 'did they', options: ['did they', "didn't they", 'do they', 'are they'] },
  ],
  'relative-clauses': [
    { prompt: 'Complete: The woman ____ teaches us is kind.', answer: 'who', options: ['who', 'which', 'where', 'when'] },
    { prompt: 'Complete: This is the phone ____ I bought yesterday.', answer: 'that', options: ['that', 'who', 'where', 'when'] },
    { prompt: 'Complete: The city ____ I was born is beautiful.', answer: 'where', options: ['where', 'which', 'who', 'that'] },
  ],
  intensifiers: [
    { prompt: 'Complete: It was ____ a beautiful day.', answer: 'such', options: ['such', 'so', 'too', 'enough'] },
    { prompt: 'Complete: The coffee is ____ hot to drink.', answer: 'too', options: ['too', 'so', 'such', 'enough'] },
    { prompt: 'Complete: She is old ____ to drive.', answer: 'enough', options: ['enough', 'too', 'such', 'so'] },
  ],
  participles: [
    { prompt: 'Complete: I am ____ in science.', answer: 'interested', options: ['interested', 'interesting', 'interest', 'interests'] },
    { prompt: 'Complete: The movie was very ____.', answer: 'boring', options: ['boring', 'bored', 'bore', 'bores'] },
    { prompt: 'Complete: The children were ____ by the story.', answer: 'excited', options: ['excited', 'exciting', 'excite', 'excitement'] },
  ],
  'used-to': [
    { prompt: 'Complete: I ____ play football every weekend.', answer: 'used to', options: ['used to', 'am used to', 'use to', 'used'] },
    { prompt: 'Complete: She is used to ____ early.', answer: 'waking up', options: ['waking up', 'wake up', 'woke up', 'wakes up'] },
    { prompt: 'Complete: Did you ____ live here?', answer: 'use to', options: ['use to', 'used to', 'are used to', 'using to'] },
  ],
  'modal-verbs': [
    { prompt: 'Complete: You ____ wear a helmet.', answer: 'must', options: ['must', 'can', 'may', 'would'] },
    { prompt: 'Complete: ____ I borrow your pen?', answer: 'May', options: ['May', 'Must', 'Should', 'Have'] },
    { prompt: 'Complete: You ____ see a doctor if you feel worse.', answer: 'should', options: ['should', 'can', 'may', 'will'] },
  ],
  'active-passive': [
    { prompt: 'Choose the passive sentence.', answer: 'The letter was written by Ana.', options: ['The letter was written by Ana.', 'Ana wrote the letter.', 'Ana was writing the letter.', 'The letter wrote Ana.'] },
    { prompt: 'Complete: The room ____ every day.', answer: 'is cleaned', options: ['is cleaned', 'cleans', 'cleaned', 'is cleaning'] },
    { prompt: 'Complete: The cake ____ by my mother yesterday.', answer: 'was made', options: ['was made', 'is made', 'made', 'makes'] },
  ],
  'gerunds-infinitives': [
    { prompt: 'Complete: I enjoy ____ music.', answer: 'listening to', options: ['listening to', 'to listen', 'listen to', 'listened to'] },
    { prompt: 'Complete: She decided ____ abroad.', answer: 'to study', options: ['to study', 'studying', 'study', 'studied'] },
    { prompt: 'Complete: He avoided ____ late.', answer: 'being', options: ['being', 'to be', 'be', 'been'] },
  ],
  conditionals: [
    { prompt: 'Complete: If it rains, we ____ at home.', answer: 'will stay', options: ['will stay', 'stayed', 'would stay', 'stay'] },
    { prompt: 'Complete: If I had more time, I ____ more books.', answer: 'would read', options: ['would read', 'will read', 'read', 'have read'] },
    { prompt: 'Complete: If water reaches 100°C, it ____.', answer: 'boils', options: ['boils', 'will boil', 'would boil', 'boiled'] },
  ],
  conjunctions: [
    { prompt: 'Complete: I stayed home ____ I was sick.', answer: 'because', options: ['because', 'but', 'although', 'and'] },
    { prompt: 'Complete: She is tired ____ she keeps working.', answer: 'but', options: ['but', 'because', 'so', 'and'] },
    { prompt: 'Complete: ____ it was raining, we went out.', answer: 'Although', options: ['Although', 'Because', 'So', 'And'] },
  ],
};

const listeningTopics: ListeningTopic[] = [
  {
    id: 'coffee-order',
    title: 'Ordering Coffee',
    description: 'Percakapan cepat saat memesan minuman di cafe.',
    level: 'Daily',
    accent: 'Natural American',
    goal: 'Tangkap pesanan, pilihan ukuran, dan klarifikasi singkat.',
    focus: ['Could I get...', 'Would you like...', 'That comes to...'],
    lines: [
      { speaker: 'Barista', text: 'Hi there. What can I get started for you?', note: 'Opening service question' },
      { speaker: 'Customer', text: 'Could I get a medium latte with oat milk, please?', note: 'Polite order' },
      { speaker: 'Barista', text: 'Sure. Would you like that hot or iced?', note: 'Choice question' },
      { speaker: 'Customer', text: 'Iced, please. And could you make it half sweet?', note: 'Extra request' },
      { speaker: 'Barista', text: 'Absolutely. That comes to five fifty.', note: 'Price phrase' },
    ],
  },
  {
    id: 'hotel-check-in',
    title: 'Hotel Check-in',
    description: 'Dialog resepsionis dan tamu saat check-in.',
    level: 'Travel',
    accent: 'Native service English',
    goal: 'Pahami nama reservasi, dokumen, dan instruksi kamar.',
    focus: ['reservation under...', 'photo ID', 'elevator is on your left'],
    lines: [
      { speaker: 'Receptionist', text: 'Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?', note: 'Greeting and request' },
      { speaker: 'Guest', text: 'Yes, it should be under Daniel Park.', note: 'Reservation name' },
      { speaker: 'Receptionist', text: 'Great. May I see a photo ID and a credit card for incidentals?', note: 'Common check-in phrase' },
      { speaker: 'Guest', text: 'Of course. Also, is breakfast included?', note: 'Follow-up question' },
      { speaker: 'Receptionist', text: 'Yes. It is served from six thirty to ten on the second floor.', note: 'Time detail' },
    ],
  },
  {
    id: 'job-interview',
    title: 'Job Interview Small Talk',
    description: 'Pembuka interview sebelum pertanyaan utama.',
    level: 'Professional',
    accent: 'Natural workplace English',
    goal: 'Kenali sapaan, respon sopan, dan transisi interview.',
    focus: ['Thanks for coming in', 'I appreciate the opportunity', 'walk me through'],
    lines: [
      { speaker: 'Interviewer', text: 'Thanks for coming in today. Did you find the office okay?', note: 'Small talk' },
      { speaker: 'Candidate', text: 'Yes, absolutely. The directions were very clear.', note: 'Positive response' },
      { speaker: 'Interviewer', text: 'Great. Before we begin, would you like some water?', note: 'Offer' },
      { speaker: 'Candidate', text: 'No, thank you. I am all set.', note: 'Polite refusal' },
      { speaker: 'Interviewer', text: 'Perfect. Could you walk me through your recent experience?', note: 'Interview transition' },
    ],
  },
  {
    id: 'doctor-appointment',
    title: 'Doctor Appointment',
    description: 'Pasien menjelaskan gejala ke dokter.',
    level: 'Health',
    accent: 'Clear native English',
    goal: 'Dengar gejala, durasi, dan saran awal.',
    focus: ['How long have you...', 'mild fever', 'take it easy'],
    lines: [
      { speaker: 'Doctor', text: 'What seems to be the problem today?', note: 'Medical opening' },
      { speaker: 'Patient', text: 'I have had a sore throat and a mild fever since Monday.', note: 'Symptoms and duration' },
      { speaker: 'Doctor', text: 'Any coughing or trouble breathing?', note: 'Follow-up symptoms' },
      { speaker: 'Patient', text: 'A little coughing, but no trouble breathing.', note: 'Contrast detail' },
      { speaker: 'Doctor', text: 'Okay. Drink plenty of fluids and take it easy for a couple of days.', note: 'Advice' },
    ],
  },
  {
    id: 'directions',
    title: 'Asking for Directions',
    description: 'Minta arah ke stasiun dan memahami instruksi.',
    level: 'Travel',
    accent: 'Everyday English',
    goal: 'Tangkap belokan, jarak, dan landmark.',
    focus: ['go straight', 'turn left', 'you cannot miss it'],
    lines: [
      { speaker: 'Traveler', text: 'Excuse me. Is there a train station nearby?', note: 'Polite interruption' },
      { speaker: 'Local', text: 'Yes. Go straight for two blocks, then turn left at the bakery.', note: 'Directions' },
      { speaker: 'Traveler', text: 'At the bakery, turn left. Got it.', note: 'Confirming detail' },
      { speaker: 'Local', text: 'After that, you will see the station across from the park.', note: 'Landmark' },
      { speaker: 'Traveler', text: 'Thanks. That is really helpful.', note: 'Closing thanks' },
    ],
  },
  {
    id: 'meeting-update',
    title: 'Project Meeting Update',
    description: 'Update singkat dalam meeting kantor.',
    level: 'Work',
    accent: 'Business English',
    goal: 'Pahami status, deadline, dan blocker.',
    focus: ['quick update', 'on track', 'waiting on feedback'],
    lines: [
      { speaker: 'Manager', text: 'Could you give us a quick update on the landing page?', note: 'Meeting prompt' },
      { speaker: 'Designer', text: 'Sure. The layout is done, and the mobile version is almost finished.', note: 'Progress update' },
      { speaker: 'Manager', text: 'Are we still on track for Friday?', note: 'Deadline check' },
      { speaker: 'Designer', text: 'Yes, as long as we get feedback by tomorrow morning.', note: 'Condition' },
      { speaker: 'Manager', text: 'Okay, I will follow up with the client today.', note: 'Next action' },
    ],
  },
  {
    id: 'airport-security',
    title: 'Airport Security',
    description: 'Instruksi petugas keamanan bandara.',
    level: 'Travel',
    accent: 'Clear public-service English',
    goal: 'Tangkap instruksi singkat dan urutan tindakan.',
    focus: ['boarding pass', 'take off your jacket', 'place it in the tray'],
    lines: [
      { speaker: 'Officer', text: 'Please have your boarding pass and passport ready.', note: 'Preparation instruction' },
      { speaker: 'Passenger', text: 'Sure. Do I need to take my laptop out?', note: 'Clarifying question' },
      { speaker: 'Officer', text: 'Yes, please place it in a separate tray.', note: 'Specific instruction' },
      { speaker: 'Passenger', text: 'And should I take off my jacket?', note: 'Follow-up' },
      { speaker: 'Officer', text: 'Yes, jacket and belt off, please.', note: 'Short instruction' },
    ],
  },
  {
    id: 'restaurant-complaint',
    title: 'Restaurant Complaint',
    description: 'Komplain sopan tentang pesanan restoran.',
    level: 'Daily',
    accent: 'Polite native English',
    goal: 'Kenali komplain halus dan solusi layanan.',
    focus: ['I am sorry, but...', 'I ordered...', 'I will fix that'],
    lines: [
      { speaker: 'Customer', text: 'Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta.', note: 'Polite complaint' },
      { speaker: 'Server', text: 'Oh, I apologize. Let me check that right away.', note: 'Apology' },
      { speaker: 'Customer', text: 'No worries. I just wanted to make sure.', note: 'Softening phrase' },
      { speaker: 'Server', text: 'You are right. I will bring the correct dish out as soon as possible.', note: 'Solution' },
      { speaker: 'Customer', text: 'Thank you. I appreciate it.', note: 'Closing' },
    ],
  },
  {
    id: 'shopping-return',
    title: 'Returning an Item',
    description: 'Mengembalikan barang ke toko.',
    level: 'Daily',
    accent: 'Retail English',
    goal: 'Dengar alasan return, receipt, dan refund.',
    focus: ['return this item', 'receipt', 'refund to your card'],
    lines: [
      { speaker: 'Customer', text: 'Hi. I would like to return this jacket.', note: 'Return request' },
      { speaker: 'Clerk', text: 'No problem. Do you still have the receipt?', note: 'Receipt question' },
      { speaker: 'Customer', text: 'Yes, here it is. I bought it two days ago.', note: 'Purchase detail' },
      { speaker: 'Clerk', text: 'Was there anything wrong with it?', note: 'Reason question' },
      { speaker: 'Customer', text: 'It is just a little too small.', note: 'Reason' },
    ],
  },
  {
    id: 'phone-call',
    title: 'Making a Phone Call',
    description: 'Telepon kantor dan meninggalkan pesan.',
    level: 'Work',
    accent: 'Phone English',
    goal: 'Pahami pembuka telepon, unavailable, dan pesan.',
    focus: ['speaking', 'not available', 'leave a message'],
    lines: [
      { speaker: 'Assistant', text: 'Good morning, GreenTech Solutions. This is Maya speaking.', note: 'Phone greeting' },
      { speaker: 'Caller', text: 'Hi Maya. Could I speak with Mr. Allen, please?', note: 'Request' },
      { speaker: 'Assistant', text: 'I am sorry, he is not available at the moment.', note: 'Unavailable phrase' },
      { speaker: 'Caller', text: 'Could I leave a message?', note: 'Message request' },
      { speaker: 'Assistant', text: 'Of course. I will make sure he gets it.', note: 'Confirmation' },
    ],
  },
  {
    id: 'weekend-plans',
    title: 'Weekend Plans',
    description: 'Percakapan santai tentang rencana akhir pekan.',
    level: 'Social',
    accent: 'Casual native English',
    goal: 'Tangkap rencana, preferensi, dan ajakan.',
    focus: ['thinking of...', 'sounds good', 'want to join'],
    lines: [
      { speaker: 'Ava', text: 'Do you have any plans this weekend?', note: 'Opening topic' },
      { speaker: 'Ben', text: 'Not really. I was thinking of going hiking if the weather is nice.', note: 'Tentative plan' },
      { speaker: 'Ava', text: 'That sounds good. Where are you planning to go?', note: 'Interest question' },
      { speaker: 'Ben', text: 'Probably Pine Hill. It is close and not too crowded.', note: 'Reason' },
      { speaker: 'Ava', text: 'Nice. Let me know, I might join you.', note: 'Soft plan' },
    ],
  },
  {
    id: 'apartment-viewing',
    title: 'Apartment Viewing',
    description: 'Melihat apartemen dan bertanya fasilitas.',
    level: 'Housing',
    accent: 'Natural city English',
    goal: 'Dengar harga sewa, fasilitas, dan aturan.',
    focus: ['utilities included', 'laundry room', 'move in'],
    lines: [
      { speaker: 'Agent', text: 'This is a one-bedroom apartment with a lot of natural light.', note: 'Description' },
      { speaker: 'Renter', text: 'It looks nice. Are utilities included in the rent?', note: 'Cost question' },
      { speaker: 'Agent', text: 'Water is included, but electricity and internet are separate.', note: 'Details' },
      { speaker: 'Renter', text: 'Got it. Is there a laundry room in the building?', note: 'Facilities' },
      { speaker: 'Agent', text: 'Yes, it is on the first floor, next to the mailboxes.', note: 'Location detail' },
    ],
  },
  {
    id: 'tech-support',
    title: 'Tech Support',
    description: 'Percakapan support saat aplikasi bermasalah.',
    level: 'Technology',
    accent: 'Support English',
    goal: 'Pahami problem, troubleshooting, dan solusi.',
    focus: ['restart the app', 'clear the cache', 'try again'],
    lines: [
      { speaker: 'User', text: 'Hi. The app keeps freezing when I open the dashboard.', note: 'Problem report' },
      { speaker: 'Support', text: 'Thanks for letting us know. Have you tried restarting the app?', note: 'First troubleshooting step' },
      { speaker: 'User', text: 'Yes, but the same thing happened again.', note: 'Result' },
      { speaker: 'Support', text: 'Okay. Please clear the cache and sign in again.', note: 'Instruction' },
      { speaker: 'User', text: 'All right. I will try that now.', note: 'Action' },
    ],
  },
  {
    id: 'class-discussion',
    title: 'Class Discussion',
    description: 'Diskusi kelas tentang tugas kelompok.',
    level: 'Academic',
    accent: 'Campus English',
    goal: 'Tangkap opini, pembagian tugas, dan deadline.',
    focus: ['I can handle...', 'due next week', 'sounds fair'],
    lines: [
      { speaker: 'Student A', text: 'We need to divide the presentation into three parts.', note: 'Task planning' },
      { speaker: 'Student B', text: 'I can handle the introduction and background research.', note: 'Offering task' },
      { speaker: 'Student C', text: 'Great. I will prepare the examples and visuals.', note: 'Taking role' },
      { speaker: 'Student A', text: 'Then I will do the conclusion and edit the slides.', note: 'Remaining role' },
      { speaker: 'Student B', text: 'Sounds fair. Let us finish the first draft by Friday.', note: 'Deadline' },
    ],
  },
  {
    id: 'news-briefing',
    title: 'Short News Briefing',
    description: 'Mendengar ringkasan berita singkat.',
    level: 'Media',
    accent: 'Broadcast-style English',
    goal: 'Dengar topik utama, angka, dan dampak.',
    focus: ['according to...', 'expected to', 'as a result'],
    lines: [
      { speaker: 'Anchor', text: 'According to city officials, the new bus route will start next Monday.', note: 'Source phrase' },
      { speaker: 'Reporter', text: 'The route is expected to reduce travel time by about fifteen minutes.', note: 'Expected impact' },
      { speaker: 'Anchor', text: 'How many neighborhoods will it serve?', note: 'Detail question' },
      { speaker: 'Reporter', text: 'It will connect five neighborhoods with the central station.', note: 'Number detail' },
      { speaker: 'Anchor', text: 'As a result, commuters should have more options during rush hour.', note: 'Conclusion' },
    ],
  },
];

function buildListeningQuestions(topic: ListeningTopic): VocabQuestion[] {
  const speakerNames = Array.from(new Set(topic.lines.map((line) => line.speaker)));
  const firstLine = topic.lines[0];
  const secondLine = topic.lines[1] || topic.lines[0];
  const thirdLine = topic.lines[2] || topic.lines[0];
  const fourthLine = topic.lines[3] || topic.lines[1] || topic.lines[0];
  const lastLine = topic.lines[topic.lines.length - 1];
  const firstFocus = topic.focus[0] || firstLine.text;
  const secondFocus = topic.focus[1] || secondLine.text;
  const thirdFocus = topic.focus[2] || lastLine.text;
  const lineTexts = topic.lines.map((line) => line.text);
  const lineNotes = topic.lines.map((line) => line.note);
  const distractors = [
    'The speaker changes the subject.',
    'The speaker cancels the plan.',
    'The speaker refuses to answer.',
    'The speaker asks for payment first.',
    'The speaker gives unrelated personal news.',
    'The conversation becomes a formal speech.',
    'The speakers discuss a sports result.',
    'The listener should ignore the audio.',
  ];

  const makeOptions = (answer: string, wrongs: string[], seed: number) => {
    const fallback = [
      ...distractors,
      'A weather report',
      'A school announcement',
      'Translate every word first.',
      'Skip the full conversation.',
    ];
    const uniqueWrongs = [...wrongs, ...fallback].filter((option, index, list) => option !== answer && list.indexOf(option) === index);
    return rotateOptions([answer, ...uniqueWrongs].slice(0, 4), seed);
  };

  const baseQuestions: VocabQuestion[] = [
    {
      id: `${topic.id}-listening-main-idea`,
      level: 'Basic',
      prompt: 'What is the main situation in this conversation?',
      answer: topic.title,
      options: makeOptions(topic.title, ['A weather report', 'A sports interview', 'A school announcement'], 0),
    },
    {
      id: `${topic.id}-listening-speakers`,
      level: 'Basic',
      prompt: 'Who speaks first in the conversation?',
      answer: firstLine.speaker,
      options: makeOptions(firstLine.speaker, [...speakerNames.filter((name) => name !== firstLine.speaker), 'Narrator', 'Teacher'], 1),
    },
    {
      id: `${topic.id}-listening-first-response`,
      level: 'Basic',
      prompt: `What does ${secondLine.speaker} say near the beginning?`,
      answer: secondLine.text,
      options: makeOptions(secondLine.text, [firstLine.text, thirdLine.text, lastLine.text], 2),
    },
    {
      id: `${topic.id}-listening-third-speaker`,
      level: 'Basic',
      prompt: `Who says: "${thirdLine.text}"?`,
      answer: thirdLine.speaker,
      options: makeOptions(thirdLine.speaker, [...speakerNames.filter((name) => name !== thirdLine.speaker), 'Narrator', 'Customer service agent'], 3),
    },
    {
      id: `${topic.id}-listening-focus-1`,
      level: 'Intermediate',
      prompt: `Which phrase is one of the focus chunks for "${topic.title}"?`,
      answer: firstFocus,
      options: makeOptions(firstFocus, ['by the way', 'as soon as possible', 'never mind'], 4),
    },
    {
      id: `${topic.id}-listening-detail`,
      level: 'Intermediate',
      prompt: 'Which line appears in the conversation?',
      answer: lastLine.text,
      options: makeOptions(lastLine.text, [firstLine.text, secondLine.text, distractors[1]], 5),
    },
    {
      id: `${topic.id}-listening-note`,
      level: 'Intermediate',
      prompt: `What is the function of this line: "${firstLine.text}"?`,
      answer: firstLine.note,
      options: makeOptions(firstLine.note, ['Closing thanks', 'Price disagreement', 'A grammar correction', ...lineNotes], 6),
    },
    {
      id: `${topic.id}-listening-sequence`,
      level: 'Intermediate',
      prompt: `What comes right after: "${thirdLine.text}"?`,
      answer: fourthLine.text,
      options: makeOptions(fourthLine.text, lineTexts.filter((text) => text !== fourthLine.text), 7),
    },
    {
      id: `${topic.id}-listening-purpose`,
      level: 'Intermediate',
      prompt: 'What listening goal matches this topic?',
      answer: topic.goal,
      options: makeOptions(topic.goal, ['Memorize random word lists only.', 'Practice silent reading without audio.', 'Focus only on spelling rules.'], 8),
    },
    {
      id: `${topic.id}-listening-focus-2`,
      level: 'Advanced',
      prompt: `Listen for natural chunks. Which chunk should you shadow in this topic?`,
      answer: secondFocus,
      options: makeOptions(secondFocus, ['I have no idea', 'That is impossible', 'See you next year', firstFocus], 9),
    },
    {
      id: `${topic.id}-listening-focus-3`,
      level: 'Advanced',
      prompt: 'Which phrase is useful for native-speed recognition in this conversation?',
      answer: thirdFocus,
      options: makeOptions(thirdFocus, ['Let me sleep on it', 'It depends on the weather', 'That sounds impossible'], 10),
    },
    {
      id: `${topic.id}-listening-final-function`,
      level: 'Advanced',
      prompt: `What is the function of the final line: "${lastLine.text}"?`,
      answer: lastLine.note,
      options: makeOptions(lastLine.note, ['Opening service question', 'A disagreement', 'A topic change', ...lineNotes], 11),
    },
    {
      id: `${topic.id}-listening-inference`,
      level: 'Advanced',
      prompt: 'What should you do first in the recommended practice flow?',
      answer: 'Listen without reading.',
      options: makeOptions('Listen without reading.', ['Translate every word first.', 'Skip the full conversation.', 'Only read the transcript silently.'], 12),
    },
  ];

  return topic.questions ?? baseQuestions;
}

function rotateOptions(options: string[], amount: number) {
  const offset = amount % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

function buildQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = topics.find((item) => item.id === topicId) || topics[0];
  const terms = topicTerms[topic.id] || topicTerms.general;
  const levelPrompts: Record<QuizLevel, (term: TopicTerm) => string> = {
    Basic: (term) => language === 'id' ? `Kata mana yang berarti "${term.meaning}"?` : `Which word means "${term.meaning}"?`,
    Intermediate: (term) => language === 'id'
      ? `Pilih kosakata terbaik untuk ide ini dalam topik ${topic.title}: "${term.meaning}".`
      : `Choose the best vocabulary item for this idea in ${topic.title}: "${term.meaning}".`,
    Advanced: (term) => language === 'id'
      ? `Dalam konteks ${topic.title.toLowerCase()} yang lebih formal, istilah mana yang paling sesuai dengan: "${term.meaning}"?`
      : `In a more formal ${topic.title.toLowerCase()} context, which term best matches: "${term.meaning}"?`,
  };

  return (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).flatMap((level, levelIndex) =>
    Array.from({ length: 10 }, (_, index) => {
      const term = terms[(index + levelIndex * 3) % terms.length];
      const distractors = terms.filter((item) => item.word !== term.word);
      const options = rotateOptions(
        [
          term.word,
          distractors[(index + 2) % distractors.length].word,
          distractors[(index + 5) % distractors.length].word,
          distractors[(index + 8) % distractors.length].word,
        ],
        index + levelIndex
      );

      return {
        id: `${topic.id}-${level}-${index}`,
        level,
        prompt: levelPrompts[level](term),
        answer: term.word,
        options,
      };
    })
  );
}

function buildGrammarQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = grammarTopics.find((item) => item.id === topicId) || grammarTopics[0];
  const seeds = [...(grammarQuestionSeeds[topic.id] || []), ...sharedGrammarSeeds];
  const levelPrefixes: Record<QuizLevel, string> = {
    Basic: language === 'id' ? 'Cek grammar dasar' : 'Basic grammar check',
    Intermediate: language === 'id' ? 'Pilih struktur terbaik' : 'Choose the best structure',
    Advanced: language === 'id' ? 'Akurasi grammar formal' : 'Formal grammar accuracy',
  };

  return (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).flatMap((level, levelIndex) =>
    Array.from({ length: 10 }, (_, index) => {
      const seed = seeds[(index + levelIndex * 2) % seeds.length];
      return {
        id: `${topic.id}-${level}-${index}`,
        level,
        prompt: `${levelPrefixes[level]} (${topic.title}): ${seed.prompt}`,
        answer: seed.answer,
        options: rotateOptions(seed.options, index + levelIndex),
      };
    })
  );
}

function buildSpeakingQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = speakingTopics.find((item) => item.id === topicId) || speakingTopics[0];
  const allAnswers = Array.from(
    new Set(
      speakingTopics.flatMap((item) => [
        item.pattern,
        item.sample,
        item.formalResponse,
        item.casualResponse,
        item.repairPhrase,
        item.fluencyTip,
        item.goal,
        item.pronunciation,
      ])
    )
  );

  const optionSet = (answer: string, wrongs: string[], seed: number) => {
    const fallback = [
      ...allAnswers,
      'Speak faster so you can finish quickly.',
      'Use only one-word answers.',
      'Avoid pausing between ideas.',
      'Ignore the listener and continue talking.',
      'Start with unrelated personal information.',
    ];
    const uniqueWrongs = [...wrongs, ...fallback].filter((option, index, list) => option !== answer && list.indexOf(option) === index);
    return rotateOptions([answer, ...uniqueWrongs].slice(0, 4), seed);
  };

  const text = {
    Basic: {
      bestResponse: language === 'id' ? 'Pilih respons paling tepat untuk situasi ini' : 'Choose the best response for this situation',
      pattern: language === 'id' ? 'Pola kalimat mana yang cocok untuk latihan speaking ini?' : 'Which sentence pattern fits this speaking practice?',
      goal: language === 'id' ? 'Apa tujuan speaking dari topik ini?' : 'What is the speaking goal for this topic?',
      sample: language === 'id' ? 'Contoh jawaban mana yang paling natural?' : 'Which sample answer sounds most natural?',
    },
    Intermediate: {
      formal: language === 'id' ? 'Respons mana yang terdengar lebih formal dan sopan?' : 'Which response sounds more formal and polite?',
      casual: language === 'id' ? 'Respons mana yang cocok untuk percakapan santai?' : 'Which response fits a casual conversation?',
      repair: language === 'id' ? 'Jika kamu salah ucap, frasa mana yang bisa dipakai untuk memperbaiki?' : 'If you misspeak, which phrase helps you repair your answer?',
      flow: language === 'id' ? 'Strategi mana yang membantu jawaban lebih lancar?' : 'Which strategy helps the answer sound more fluent?',
    },
    Advanced: {
      pronunciation: language === 'id' ? 'Fokus pronunciation mana yang paling sesuai?' : 'Which pronunciation focus fits this topic best?',
      structure: language === 'id' ? 'Agar jawaban lebih terstruktur, apa yang sebaiknya dilakukan?' : 'To make the answer more structured, what should the speaker do?',
      nuance: language === 'id' ? 'Pilihan mana yang menjaga tone tetap natural?' : 'Which choice keeps the tone natural?',
      performance: language === 'id' ? 'Saat latihan level advanced, kebiasaan mana yang paling membantu?' : 'In advanced practice, which habit helps the most?',
    },
  };

  const seeds: Array<Omit<VocabQuestion, 'id' | 'level'>> = [
    {
      prompt: `${text.Basic.bestResponse}: ${topic.situation}.`,
      answer: topic.sample,
      options: optionSet(topic.sample, [topic.formalResponse, topic.casualResponse, 'I do not know anything about this topic.'], 0),
    },
    {
      prompt: text.Basic.pattern,
      answer: topic.pattern,
      options: optionSet(topic.pattern, ['Because I think it is good.', 'Yes, I agree with you.', 'Can you repeat the price?'], 1),
    },
    {
      prompt: text.Basic.goal,
      answer: topic.goal,
      options: optionSet(topic.goal, ['memorize spelling only', 'translate every word silently', 'avoid answering follow-up questions'], 2),
    },
    {
      prompt: text.Basic.sample,
      answer: topic.sample,
      options: optionSet(topic.sample, ['Yes.', 'No problem.', 'Maybe later, thank you.'], 3),
    },
    {
      prompt: `${text.Basic.bestResponse}: ${topic.description}`,
      answer: topic.casualResponse,
      options: optionSet(topic.casualResponse, [topic.repairPhrase, 'I disagree with all grammar rules.', 'Please cancel my account immediately.'], 4),
    },
    {
      prompt: text.Basic.pattern,
      answer: topic.pattern,
      options: optionSet(topic.pattern, [topic.goal, topic.pronunciation, topic.fluencyTip], 5),
    },
    {
      prompt: text.Basic.goal,
      answer: topic.goal,
      options: optionSet(topic.goal, [topic.description, topic.pronunciation, 'answer without listening to the question'], 6),
    },
    {
      prompt: text.Basic.sample,
      answer: topic.sample,
      options: optionSet(topic.sample, [topic.formalResponse, 'I went there yesterday because blue.', 'The pronunciation is difficult but no answer.'], 7),
    },
    {
      prompt: `${text.Basic.bestResponse}: start speaking about "${topic.title}".`,
      answer: topic.pattern,
      options: optionSet(topic.pattern, ['What time is the airport?', 'I am sorry for your lost ticket.', 'There is no reason to speak.'], 8),
    },
    {
      prompt: text.Basic.goal,
      answer: topic.goal,
      options: optionSet(topic.goal, ['speak with no pauses at all', 'use random advanced vocabulary', 'avoid giving details'], 9),
    },
    {
      prompt: text.Intermediate.formal,
      answer: topic.formalResponse,
      options: optionSet(topic.formalResponse, [topic.casualResponse, topic.repairPhrase, 'Yeah, whatever.'], 10),
    },
    {
      prompt: text.Intermediate.casual,
      answer: topic.casualResponse,
      options: optionSet(topic.casualResponse, [topic.formalResponse, topic.pronunciation, 'It is hereby requested that silence continues.'], 11),
    },
    {
      prompt: text.Intermediate.repair,
      answer: topic.repairPhrase,
      options: optionSet(topic.repairPhrase, [topic.sample, topic.formalResponse, 'I will stop speaking now.'], 12),
    },
    {
      prompt: text.Intermediate.flow,
      answer: topic.fluencyTip,
      options: optionSet(topic.fluencyTip, ['Read every sentence in your first language.', 'Use the longest word in every sentence.', 'Speak without checking meaning.'], 13),
    },
    {
      prompt: `${text.Intermediate.formal} Topic: ${topic.title}.`,
      answer: topic.formalResponse,
      options: optionSet(topic.formalResponse, [topic.casualResponse, topic.sample, 'No, I do not want to answer.'], 14),
    },
    {
      prompt: `${text.Intermediate.casual} Topic: ${topic.title}.`,
      answer: topic.casualResponse,
      options: optionSet(topic.casualResponse, [topic.formalResponse, topic.pattern, 'This document has been processed accordingly.'], 15),
    },
    {
      prompt: `${text.Intermediate.repair} Situation: ${topic.situation}.`,
      answer: topic.repairPhrase,
      options: optionSet(topic.repairPhrase, ['Please ignore every mistake.', topic.goal, topic.pronunciation], 16),
    },
    {
      prompt: `${text.Intermediate.flow} Topic: ${topic.title}.`,
      answer: topic.fluencyTip,
      options: optionSet(topic.fluencyTip, ['Stop after every word.', 'Never use examples.', 'Only repeat the question.'], 17),
    },
    {
      prompt: text.Intermediate.formal,
      answer: topic.formalResponse,
      options: optionSet(topic.formalResponse, [topic.casualResponse, topic.repairPhrase, topic.sample], 18),
    },
    {
      prompt: text.Intermediate.repair,
      answer: topic.repairPhrase,
      options: optionSet(topic.repairPhrase, ['Say nothing until the listener guesses.', 'Change topic immediately.', 'Laugh and end the conversation.'], 19),
    },
    {
      prompt: text.Advanced.pronunciation,
      answer: topic.pronunciation,
      options: optionSet(topic.pronunciation, ['silent reading without voice', 'only spelling each letter', 'speaking as fast as possible'], 20),
    },
    {
      prompt: text.Advanced.structure,
      answer: topic.fluencyTip,
      options: optionSet(topic.fluencyTip, ['Answer with unrelated vocabulary.', 'Use no transitions or examples.', 'Repeat the same sentence four times.'], 21),
    },
    {
      prompt: text.Advanced.nuance,
      answer: topic.formalResponse,
      options: optionSet(topic.formalResponse, [topic.casualResponse, 'I refuse to explain my idea.', 'Your question is not important.'], 22),
    },
    {
      prompt: text.Advanced.performance,
      answer: topic.pronunciation,
      options: optionSet(topic.pronunciation, [topic.description, 'ignore word stress completely', 'avoid listening to your own recording'], 23),
    },
    {
      prompt: `${text.Advanced.pronunciation} Topic: ${topic.title}.`,
      answer: topic.pronunciation,
      options: optionSet(topic.pronunciation, ['focus only on handwriting', 'skip pronunciation practice', 'use flat intonation for every sentence'], 24),
    },
    {
      prompt: `${text.Advanced.structure} Situation: ${topic.situation}.`,
      answer: topic.pattern,
      options: optionSet(topic.pattern, [topic.repairPhrase, topic.pronunciation, 'One word is always enough.'], 25),
    },
    {
      prompt: `${text.Advanced.nuance} When speaking about "${topic.title}".`,
      answer: topic.repairPhrase,
      options: optionSet(topic.repairPhrase, [topic.sample, 'I will not repeat anything.', 'The listener should understand everything automatically.'], 26),
    },
    {
      prompt: text.Advanced.performance,
      answer: topic.fluencyTip,
      options: optionSet(topic.fluencyTip, ['Memorize answers without meaning.', 'Avoid eye contact and pauses.', 'Use filler sounds after every word.'], 27),
    },
    {
      prompt: `${text.Advanced.structure} Best full model answer?`,
      answer: topic.sample,
      options: optionSet(topic.sample, [topic.casualResponse, topic.formalResponse, 'Fine.'], 28),
    },
    {
      prompt: `${text.Advanced.pronunciation} Final speaking focus?`,
      answer: topic.pronunciation,
      options: optionSet(topic.pronunciation, [topic.fluencyTip, topic.goal, 'translation speed'], 29),
    },
  ];

  return seeds.map((seed, index) => ({
    ...seed,
    id: `${topic.id}-speaking-${index}`,
    level: index < 10 ? 'Basic' : index < 20 ? 'Intermediate' : 'Advanced',
  }));
}

function buildWritingQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = writingTopics.find((item) => item.id === topicId) || writingTopics[0];
  const allAnswers = Array.from(
    new Set(
      writingTopics.flatMap((item) => [
        item.task,
        item.goal,
        item.format,
        item.structure,
        item.sample,
        item.opening,
        item.connector,
        item.closing,
        item.editingTip,
      ])
    )
  );

  const optionSet = (answer: string, wrongs: string[], seed: number) => {
    const fallback = [
      ...allAnswers,
      'Write without checking grammar or meaning.',
      'Use random connectors in every sentence.',
      'Make the paragraph longer by repeating the same idea.',
      'Ignore punctuation and capitalization.',
      'Start with a sentence that does not match the task.',
    ];
    const uniqueWrongs = [...wrongs, ...fallback].filter((option, index, list) => option !== answer && list.indexOf(option) === index);
    return rotateOptions([answer, ...uniqueWrongs].slice(0, 4), seed);
  };

  const text = {
    Basic: {
      task: language === 'id' ? 'Apa tugas writing utama untuk topik ini?' : 'What is the main writing task for this topic?',
      format: language === 'id' ? 'Format tulisan mana yang paling sesuai?' : 'Which writing format fits this topic best?',
      structure: language === 'id' ? 'Struktur mana yang sebaiknya dipakai?' : 'Which structure should be used?',
      sample: language === 'id' ? 'Contoh tulisan mana yang paling tepat?' : 'Which writing sample is the best fit?',
    },
    Intermediate: {
      opening: language === 'id' ? 'Opening mana yang paling tepat untuk tulisan ini?' : 'Which opening fits this writing task?',
      connector: language === 'id' ? 'Connector mana yang paling sesuai?' : 'Which connector fits best?',
      closing: language === 'id' ? 'Closing mana yang paling sesuai?' : 'Which closing is most suitable?',
      goal: language === 'id' ? 'Tujuan tulisan mana yang benar?' : 'Which writing goal is correct?',
    },
    Advanced: {
      editing: language === 'id' ? 'Editing tip mana yang paling membantu?' : 'Which editing tip is most helpful?',
      clarity: language === 'id' ? 'Pilihan mana yang membuat tulisan lebih jelas?' : 'Which choice makes the writing clearer?',
      tone: language === 'id' ? 'Pilihan mana yang menjaga tone sesuai format?' : 'Which choice keeps the tone appropriate for the format?',
      revision: language === 'id' ? 'Revisi mana yang paling kuat?' : 'Which revision is strongest?',
    },
  };

  const seeds: Array<Omit<VocabQuestion, 'id' | 'level'>> = [
    {
      prompt: `${text.Basic.task}: ${topic.description}`,
      answer: topic.task,
      options: optionSet(topic.task, ['write a random list of words', 'copy the prompt without changing it', 'translate only one word'], 0),
    },
    {
      prompt: text.Basic.format,
      answer: topic.format,
      options: optionSet(topic.format, ['voice recording', 'multiple unrelated phrases', 'pronunciation drill only'], 1),
    },
    {
      prompt: text.Basic.structure,
      answer: topic.structure,
      options: optionSet(topic.structure, ['Conclusion + random detail + no topic sentence.', 'One word + comma + no verb.', 'Question + unrelated answer + emoji.'], 2),
    },
    {
      prompt: text.Basic.sample,
      answer: topic.sample,
      options: optionSet(topic.sample, ['Good yes because maybe.', 'I am very very very.', 'Writing is speak fast.'], 3),
    },
    {
      prompt: text.Basic.task,
      answer: topic.task,
      options: optionSet(topic.task, [topic.goal, topic.editingTip, 'avoid the topic completely'], 4),
    },
    {
      prompt: text.Basic.structure,
      answer: topic.structure,
      options: optionSet(topic.structure, [topic.opening, topic.connector, topic.closing], 5),
    },
    {
      prompt: `${text.Basic.format} Topic: ${topic.title}.`,
      answer: topic.format,
      options: optionSet(topic.format, ['casual phone call', 'listening transcript only', 'vocabulary flashcard'], 6),
    },
    {
      prompt: text.Basic.sample,
      answer: topic.sample,
      options: optionSet(topic.sample, [topic.opening, topic.closing, 'And because but however.'], 7),
    },
    {
      prompt: text.Basic.task,
      answer: topic.goal,
      options: optionSet(topic.goal, ['make the writing unclear', 'use no main idea', 'choose the longest answer only'], 8),
    },
    {
      prompt: text.Basic.structure,
      answer: topic.structure,
      options: optionSet(topic.structure, ['No structure is needed.', 'Only use a closing sentence.', 'Repeat the first word five times.'], 9),
    },
    {
      prompt: text.Intermediate.opening,
      answer: topic.opening,
      options: optionSet(topic.opening, [topic.connector, topic.closing, 'Finally, therefore, however,'], 10),
    },
    {
      prompt: text.Intermediate.connector,
      answer: topic.connector,
      options: optionSet(topic.connector, [topic.opening, topic.closing, 'Dear'], 11),
    },
    {
      prompt: text.Intermediate.closing,
      answer: topic.closing,
      options: optionSet(topic.closing, [topic.opening, topic.connector, 'Because and because.'], 12),
    },
    {
      prompt: text.Intermediate.goal,
      answer: topic.goal,
      options: optionSet(topic.goal, [topic.task, topic.format, 'write as many words as possible without checking'], 13),
    },
    {
      prompt: `${text.Intermediate.opening} Format: ${topic.format}.`,
      answer: topic.opening,
      options: optionSet(topic.opening, [topic.sample, topic.editingTip, 'I not sure maybe.'], 14),
    },
    {
      prompt: `${text.Intermediate.connector} Structure: ${topic.structure}`,
      answer: topic.connector,
      options: optionSet(topic.connector, ['!!!', 'very very', topic.closing], 15),
    },
    {
      prompt: `${text.Intermediate.closing} Topic: ${topic.title}.`,
      answer: topic.closing,
      options: optionSet(topic.closing, [topic.opening, topic.task, 'No ending needed.'], 16),
    },
    {
      prompt: `${text.Intermediate.goal} Task: ${topic.task}.`,
      answer: topic.goal,
      options: optionSet(topic.goal, ['ignore the reader', 'hide the main point', 'use only informal slang'], 17),
    },
    {
      prompt: text.Intermediate.connector,
      answer: topic.connector,
      options: optionSet(topic.connector, [topic.opening, topic.closing, topic.format], 18),
    },
    {
      prompt: text.Intermediate.closing,
      answer: topic.closing,
      options: optionSet(topic.closing, ['Start with no context.', 'Add an unrelated question.', topic.connector], 19),
    },
    {
      prompt: text.Advanced.editing,
      answer: topic.editingTip,
      options: optionSet(topic.editingTip, ['Never revise after writing.', 'Add more words even if they repeat the idea.', 'Ignore the task after the first sentence.'], 20),
    },
    {
      prompt: text.Advanced.clarity,
      answer: topic.structure,
      options: optionSet(topic.structure, ['Use several unrelated structures at once.', 'Remove the main idea.', 'Put the conclusion before the topic is introduced.'], 21),
    },
    {
      prompt: text.Advanced.tone,
      answer: topic.format,
      options: optionSet(topic.format, ['random informal chat for every task', 'audio conversation only', 'word list without sentences'], 22),
    },
    {
      prompt: text.Advanced.revision,
      answer: topic.sample,
      options: optionSet(topic.sample, ['I thing good very because.', 'This text no clear but yes.', 'For example however because in conclusion.'], 23),
    },
    {
      prompt: `${text.Advanced.editing} Topic: ${topic.title}.`,
      answer: topic.editingTip,
      options: optionSet(topic.editingTip, [topic.opening, topic.connector, 'Use punctuation only at the end of the course.'], 24),
    },
    {
      prompt: `${text.Advanced.clarity} Goal: ${topic.goal}.`,
      answer: topic.goal,
      options: optionSet(topic.goal, ['write with no reader in mind', 'make every sentence the same', 'choose complex words even when simple words work better'], 25),
    },
    {
      prompt: `${text.Advanced.tone} Best opening?`,
      answer: topic.opening,
      options: optionSet(topic.opening, [topic.connector, topic.closing, topic.editingTip], 26),
    },
    {
      prompt: `${text.Advanced.revision} Best connector?`,
      answer: topic.connector,
      options: optionSet(topic.connector, ['there there', 'grammar', topic.format], 27),
    },
    {
      prompt: `${text.Advanced.clarity} Best complete model?`,
      answer: topic.sample,
      options: optionSet(topic.sample, [topic.opening, topic.closing, 'No topic no sentence.'], 28),
    },
    {
      prompt: `${text.Advanced.editing} Final check?`,
      answer: topic.editingTip,
      options: optionSet(topic.editingTip, ['Submit without reading.', 'Delete the main idea.', 'Use only one long sentence for everything.'], 29),
    },
  ];

  return seeds.map((seed, index) => ({
    ...seed,
    id: `${topic.id}-writing-${index}`,
    level: index < 10 ? 'Basic' : index < 20 ? 'Intermediate' : 'Advanced',
  }));
}

function buildReadingQuestions(topicId: string, language: 'en' | 'id' = 'en'): VocabQuestion[] {
  const topic = readingTopics.find((item) => item.id === topicId) || readingTopics[0];
  const allAnswers = Array.from(
    new Set(
      readingTopics.flatMap((item) => [
        item.mainIdea,
        item.detail,
        item.vocabulary,
        item.vocabularyMeaning,
        item.inference,
        item.purpose,
        item.readingSkill,
        item.passageTitle,
      ])
    )
  );

  const optionSet = (answer: string, wrongs: string[], seed: number) => {
    const fallback = [
      ...allAnswers,
      'The text gives no useful information.',
      'The reader should ignore the details.',
      'The passage is mainly a list of unrelated words.',
      'The author wants readers to memorize grammar rules only.',
      'The correct answer cannot be found or inferred from the text.',
    ];
    const uniqueWrongs = [...wrongs, ...fallback].filter((option, index, list) => option !== answer && list.indexOf(option) === index);
    return rotateOptions([answer, ...uniqueWrongs].slice(0, 4), seed);
  };

  const text = {
    Basic: {
      title: language === 'id' ? 'Apa judul bacaan ini?' : 'What is the title of this reading passage?',
      mainIdea: language === 'id' ? 'Apa ide utama bacaan ini?' : 'What is the main idea of this passage?',
      detail: language === 'id' ? 'Detail mana yang disebutkan dalam bacaan?' : 'Which detail is mentioned in the passage?',
      vocab: language === 'id' ? 'Kata kunci mana yang muncul dalam bacaan?' : 'Which key word appears in the passage?',
    },
    Intermediate: {
      meaning: language === 'id' ? 'Apa arti kata ini berdasarkan konteks?' : 'What does this word mean in context?',
      purpose: language === 'id' ? 'Apa tujuan penulis?' : "What is the writer's purpose?",
      skill: language === 'id' ? 'Skill reading mana yang paling sesuai?' : 'Which reading skill fits this passage?',
      detail: language === 'id' ? 'Informasi spesifik mana yang benar?' : 'Which specific information is correct?',
    },
    Advanced: {
      inference: language === 'id' ? 'Kesimpulan mana yang paling masuk akal?' : 'Which inference is most reasonable?',
      evidence: language === 'id' ? 'Jawaban mana yang paling didukung oleh teks?' : 'Which answer is best supported by the text?',
      summary: language === 'id' ? 'Ringkasan mana yang paling akurat?' : 'Which summary is most accurate?',
      author: language === 'id' ? 'Apa maksud penulis secara lebih dalam?' : "What is the writer's deeper intention?",
    },
  };

  const seeds: Array<Omit<VocabQuestion, 'id' | 'level'>> = [
    {
      prompt: text.Basic.title,
      answer: topic.passageTitle,
      options: optionSet(topic.passageTitle, ['A Random Conversation', 'Grammar Practice Only', 'Unknown Topic'], 0),
    },
    {
      prompt: text.Basic.mainIdea,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, ['The passage is mostly about sports results.', 'The text only explains punctuation.', 'The passage has no clear topic.'], 1),
    },
    {
      prompt: text.Basic.detail,
      answer: topic.detail,
      options: optionSet(topic.detail, [topic.inference, topic.purpose, 'The opposite detail is stated.'], 2),
    },
    {
      prompt: text.Basic.vocab,
      answer: topic.vocabulary,
      options: optionSet(topic.vocabulary, ['therefore', 'although', 'meanwhile'], 3),
    },
    {
      prompt: `${text.Basic.mainIdea} Passage: "${topic.passageTitle}".`,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, [topic.detail, topic.purpose, 'A story about an unrelated event.'], 4),
    },
    {
      prompt: text.Basic.detail,
      answer: topic.detail,
      options: optionSet(topic.detail, ['The passage says the event was canceled.', 'The text says nothing happened.', topic.mainIdea], 5),
    },
    {
      prompt: text.Basic.vocab,
      answer: topic.vocabulary,
      options: optionSet(topic.vocabulary, [topic.vocabularyMeaning, topic.readingSkill, 'main idea'], 6),
    },
    {
      prompt: text.Basic.title,
      answer: topic.passageTitle,
      options: optionSet(topic.passageTitle, [topic.title, topic.purpose, 'No title is possible.'], 7),
    },
    {
      prompt: `${text.Basic.detail} Topic: ${topic.title}.`,
      answer: topic.detail,
      options: optionSet(topic.detail, [topic.inference, 'The writer gives no details.', 'All details are unrelated.'], 8),
    },
    {
      prompt: text.Basic.mainIdea,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, [topic.vocabularyMeaning, topic.readingSkill, 'The text is only about spelling.'], 9),
    },
    {
      prompt: `${text.Intermediate.meaning} Word: "${topic.vocabulary}".`,
      answer: topic.vocabularyMeaning,
      options: optionSet(topic.vocabularyMeaning, ['a person who asks questions', 'a place for official meetings', 'a type of punctuation mark'], 10),
    },
    {
      prompt: text.Intermediate.purpose,
      answer: topic.purpose,
      options: optionSet(topic.purpose, ['to confuse readers with unrelated facts', 'to list grammar formulas only', 'to advertise a sports team'], 11),
    },
    {
      prompt: text.Intermediate.skill,
      answer: topic.readingSkill,
      options: optionSet(topic.readingSkill, ['memorizing pronunciation only', 'writing a formal letter', 'speaking without preparation'], 12),
    },
    {
      prompt: text.Intermediate.detail,
      answer: topic.detail,
      options: optionSet(topic.detail, [topic.mainIdea, topic.inference, 'A detail not connected to the passage.'], 13),
    },
    {
      prompt: `${text.Intermediate.meaning} The word is "${topic.vocabulary}".`,
      answer: topic.vocabularyMeaning,
      options: optionSet(topic.vocabularyMeaning, [topic.vocabulary, topic.purpose, 'the opposite of the passage meaning'], 14),
    },
    {
      prompt: `${text.Intermediate.purpose} Passage: "${topic.passageTitle}".`,
      answer: topic.purpose,
      options: optionSet(topic.purpose, [topic.mainIdea, topic.detail, 'to test math formulas'], 15),
    },
    {
      prompt: `${text.Intermediate.skill} Topic: ${topic.title}.`,
      answer: topic.readingSkill,
      options: optionSet(topic.readingSkill, ['essay writing', 'listening for accent only', 'drawing a picture'], 16),
    },
    {
      prompt: text.Intermediate.detail,
      answer: topic.detail,
      options: optionSet(topic.detail, ['The text says the opposite.', topic.vocabularyMeaning, topic.purpose], 17),
    },
    {
      prompt: text.Intermediate.meaning,
      answer: topic.vocabularyMeaning,
      options: optionSet(topic.vocabularyMeaning, [topic.inference, topic.mainIdea, 'a sentence that closes an email'], 18),
    },
    {
      prompt: text.Intermediate.purpose,
      answer: topic.purpose,
      options: optionSet(topic.purpose, ['to avoid giving information', 'to describe unrelated grammar errors', topic.readingSkill], 19),
    },
    {
      prompt: text.Advanced.inference,
      answer: topic.inference,
      options: optionSet(topic.inference, ['The opposite of the passage is probably true.', 'The passage gives no clue about this topic.', 'The writer dislikes all details in the text.'], 20),
    },
    {
      prompt: text.Advanced.evidence,
      answer: topic.detail,
      options: optionSet(topic.detail, [topic.inference, 'A detail from another topic.', 'A claim with no textual support.'], 21),
    },
    {
      prompt: text.Advanced.summary,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, ['The passage gives many unrelated examples without a topic.', 'The passage is mainly about spelling mistakes.', 'The passage only asks a question.'], 22),
    },
    {
      prompt: text.Advanced.author,
      answer: topic.purpose,
      options: optionSet(topic.purpose, [topic.vocabularyMeaning, 'to hide the main idea', 'to make readers ignore the topic'], 23),
    },
    {
      prompt: `${text.Advanced.inference} Passage: "${topic.passageTitle}".`,
      answer: topic.inference,
      options: optionSet(topic.inference, [topic.detail, topic.purpose, 'No inference can be made.'], 24),
    },
    {
      prompt: `${text.Advanced.evidence} Main idea check.`,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, [topic.vocabulary, topic.vocabularyMeaning, 'A conclusion from a different passage.'], 25),
    },
    {
      prompt: `${text.Advanced.summary} Best reading skill?`,
      answer: topic.readingSkill,
      options: optionSet(topic.readingSkill, [topic.purpose, topic.detail, 'ignoring supporting details'], 26),
    },
    {
      prompt: `${text.Advanced.author} What does the writer want the reader to understand?`,
      answer: topic.purpose,
      options: optionSet(topic.purpose, [topic.inference, topic.vocabulary, 'The passage has no purpose.'], 27),
    },
    {
      prompt: text.Advanced.summary,
      answer: topic.mainIdea,
      options: optionSet(topic.mainIdea, [topic.detail, topic.vocabularyMeaning, 'Only one small word matters.'], 28),
    },
    {
      prompt: text.Advanced.inference,
      answer: topic.inference,
      options: optionSet(topic.inference, ['The text proves the opposite.', 'There is no clue in the passage.', topic.detail], 29),
    },
  ];

  return seeds.map((seed, index) => ({
    ...seed,
    id: `${topic.id}-reading-${index}`,
    level: index < 10 ? 'Basic' : index < 20 ? 'Intermediate' : 'Advanced',
  }));
}

function TopicListPage({
  levelId,
  skillId,
  title,
  topics: items,
}: {
  levelId?: string;
  skillId: string;
  title: string;
  topics: Topic[];
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fullAccess = hasFullAccess(user);
  const freeTopicIds = FREE_PRACTICE_TOPIC_IDS[skillId] || items.slice(0, 3).map((topic) => topic.id);

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="rounded-[6px] border border-[#CBD5E1] bg-white px-5 py-6 shadow-sm md:px-8">
          <div className="mb-6 flex items-start gap-3">
            <motion.button
              type="button"
              onClick={() => navigate('/latihan')}
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowLeft size={17} />
            </motion.button>
            <div className="flex-1 text-center">
              <h1 className="text-[22px] font-black text-[#0F172A]">{title}</h1>
              <p className="mt-1 text-xs font-semibold text-gray-500">Pilih topik latihan yang ingin kamu kerjakan.</p>
            </div>
            <div className="h-9 w-9 shrink-0" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((topic, index) => {
              const locked = !fullAccess && !freeTopicIds.includes(topic.id);
              return (
                <motion.button
                  key={topic.id}
                  type="button"
                  onClick={() => locked ? navigate('/upgrade') : navigate(`/latihan/${skillId}?topic=${topic.id}`)}
                  className={`group relative min-h-[150px] rounded-[6px] border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/40 ${locked ? 'border-gray-200 opacity-80' : 'border-[#CBD5E1] hover:border-[#2563EB]'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.015 * index }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex rounded bg-[#EEF2FF] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#2563EB]">
                      Topik {index + 1}
                    </span>
                    {locked && <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-1 text-[10px] font-black text-amber-600"><Lock size={11} /> Pro</span>}
                  </div>
                  <h2 className="mt-3 text-sm font-black text-[#0F172A]">{topic.title}</h2>
                  <p className="mt-2 min-h-[34px] text-xs font-semibold leading-relaxed text-gray-500">{topic.description}</p>
                  <div className={`mt-4 border-t border-gray-100 pt-3 text-xs font-black ${locked ? 'text-amber-600' : 'text-[#2563EB]'}`}>
                    {locked ? 'Upgrade untuk akses' : 'Mulai Latihan ->'}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function VocabularyTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="vocabulary" title="Daftar Isi Latihan Vocabulary" topics={topics} />;
}

function GrammarTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="grammar" title="Daftar Isi Latihan Grammar" topics={grammarTopics} />;
}

function SpeakingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="speaking" title="Daftar Isi Latihan Speaking" topics={speakingTopics} />;
}

function WritingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="writing" title="Daftar Isi Latihan Writing" topics={writingTopics} />;
}

function ReadingTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="reading" title="Daftar Isi Latihan Reading" topics={readingTopics} />;
}

function ListeningTopicList({ levelId }: { levelId?: string }) {
  return <TopicListPage levelId={levelId} skillId="listening" title="Native AI Conversation Practice" topics={listeningTopics} />;
}

function ListeningPracticePage({ topicId }: { topicId: string }) {
  const navigate = useNavigate();
  const topic = listeningTopics.find((item) => item.id === topicId) || listeningTopics[0];
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mistakeBankCount, setMistakeBankCount] = useState(() => loadMistakeBank().length);

  const script = topic.lines.map((line) => `${line.speaker}: ${line.text}`).join('\n');
  const questions = useMemo(() => buildListeningQuestions(topic), [topic]);
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);
  const listeningLevelStats = (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const correct = levelQuestions.filter((question) => answers[question.id] === question.answer).length;
    return { level, correct, total: Math.max(1, levelQuestions.length) };
  });
  const weakestListeningLevel = listeningLevelStats.reduce((weakest, stat) => {
    const statRate = stat.correct / stat.total;
    const weakestRate = weakest.correct / weakest.total;
    return statRate < weakestRate ? stat : weakest;
  }, listeningLevelStats[0]);
  const listeningRecommendation = score >= Math.ceil(questions.length * 0.85)
    ? 'Bagus. Lanjut ke topic listening berikutnya atau ulangi conversation tanpa membaca script.'
    : score >= Math.ceil(questions.length * 0.6)
      ? 'Dengarkan ulang conversation, lalu fokus ke baris yang menjadi dasar soal salah.'
      : 'Ulangi Listen First 2 kali sebelum membaca script, lalu kerjakan quiz lagi.';

  const playFullConversation = () => {
    setActiveLine(null);
    playAudio(script, 0.92);
  };

  const playLine = (index: number) => {
    setActiveLine(index);
    playAudio(topic.lines[index].text, 0.92);
  };

  const submitListeningQuiz = () => {
    const wrongRecords: MistakeRecord[] = wrongQuestions.map((question) => ({
      id: `listening-${topic.id}-${question.id}`,
      skillId: 'listening',
      topicTitle: topic.title,
      level: question.level,
      prompt: question.prompt,
      answer: question.answer,
      selected: answers[question.id],
      options: question.options,
      savedAt: new Date().toISOString(),
    }));
    const existing = loadMistakeBank().filter((record) => !wrongRecords.some((item) => item.id === record.id));
    const nextBank = [...wrongRecords, ...existing];
    saveMistakeBank(nextBank);
    setMistakeBankCount(nextBank.length);
    savePracticeAttempt({
      id: `listening-${topic.id}-${Date.now()}`,
      skillId: 'listening',
      topicId: topic.id,
      topicTitle: topic.title,
      score,
      total: questions.length,
      weakestLevel: weakestListeningLevel.level,
      completedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-5 md:px-8">
            <div className="mb-5 flex items-start gap-3">
              <motion.button
                type="button"
                onClick={() => navigate('/latihan/listening', { replace: true })}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
                whileTap={{ scale: 0.92 }}
              >
                <ArrowLeft size={17} />
              </motion.button>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex rounded bg-[#E0F2FE] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">
                    Native AI Conversation
                  </span>
                  <span className="inline-flex rounded bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-gray-500">
                    {topic.level}
                  </span>
                </div>
                <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">{topic.title}</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">{topic.goal}</p>
              </div>
              <div className="h-9 w-9 shrink-0" />
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                { label: 'Conversation', value: `${topic.lines.length} lines`, icon: Headphones },
                { label: 'Accent', value: topic.accent, icon: Volume2 },
                { label: 'Focus', value: `${topic.focus.length} chunks`, icon: Target },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#E0F2FE] text-[#0891B2]">
                        <Icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                        <p className="mt-0.5 truncate text-sm font-black text-[#0F172A]">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-6 md:px-8">
            <div className="mb-5 flex flex-col gap-3 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-[#0F172A]">Listen First</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">Dengarkan full conversation 1-2 kali sebelum membaca detail per baris.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={playFullConversation}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#0891B2] px-4 text-sm font-black text-white transition hover:bg-[#0E7490]"
                >
                  <Play size={16} fill="currentColor" />
                  Play Conversation
                </button>
                <button
                  type="button"
                  onClick={stopCurrentAudio}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-white"
                >
                  Stop
                </button>
              </div>
            </div>

            <section className="mb-6 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="mb-4 flex flex-col gap-1 border-b-2 border-[#0891B2] pb-3">
                <h2 className="text-base font-black text-[#0F172A]">Conversation Script</h2>
                <p className="text-xs font-semibold text-gray-500">Klik tiap baris untuk mendengar ulang bagian pendek.</p>
              </div>

              <div className="space-y-3">
                {topic.lines.map((line, index) => (
                  <div
                    key={`${line.speaker}-${index}`}
                    className={`rounded-[8px] border p-4 transition ${activeLine === index ? 'border-[#0891B2] bg-[#ECFEFF]' : 'border-gray-100 bg-white'}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">{line.speaker}</p>
                        <p className="mt-1 text-sm font-black leading-relaxed text-[#0F172A]">{line.text}</p>
                        <p className="mt-2 text-xs font-semibold text-gray-500">{line.note}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => playLine(index)}
                        className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-3 text-xs font-black text-[#0F172A] transition hover:border-[#0891B2] hover:text-[#0891B2]"
                      >
                        <Volume2 size={15} />
                        Listen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <section className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                <h2 className="text-base font-black text-[#0F172A]">Focus Chunks</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topic.focus.map((chunk) => (
                    <button
                      key={chunk}
                      type="button"
                      onClick={() => playAudio(chunk, 0.86)}
                      className="rounded-full border border-[#BAE6FD] bg-white px-3 py-1.5 text-xs font-black text-[#0E7490] transition hover:bg-[#ECFEFF]"
                    >
                      {chunk}
                    </button>
                  ))}
                </div>
              </section>

              <section className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                <h2 className="text-base font-black text-[#0F172A]">Shadowing Drill</h2>
                <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
                  <p>1. Listen without reading.</p>
                  <p>2. Listen again and mark words you missed.</p>
                  <p>3. Play each line, pause, then repeat with the same rhythm.</p>
                  <p>4. Play full conversation and shadow at native speed.</p>
                </div>
              </section>
            </div>

            <section className="mt-6 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="mb-4 flex flex-col gap-3 border-b-2 border-[#0891B2] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-black text-[#0F172A]">Listening Quiz</h2>
                  <p className="mt-1 text-xs font-semibold text-gray-500">Jawab pilihan ganda berdasarkan conversation yang kamu dengar.</p>
                </div>
                <span className="rounded bg-[#E0F2FE] px-2.5 py-1 text-xs font-black text-[#0E7490]">
                  {answeredCount}/{questions.length} answered
                </span>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => {
                  const selected = answers[question.id];
                  const correct = selected === question.answer;

                  return (
                    <div
                      key={question.id}
                      className={`rounded-[8px] border p-4 transition ${
                        submitted
                          ? correct
                            ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                            : 'border-[#FECACA] bg-[#FFFBFB]'
                          : selected
                            ? 'border-[#BAE6FD] bg-[#F8FAFC]'
                            : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E0F2FE] text-xs font-black text-[#0891B2]">
                            {index + 1}
                          </span>
                          <p className="pt-1 text-sm font-black leading-relaxed text-[#0F172A]">{question.prompt}</p>
                        </div>
                        {submitted && (
                          <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-black ${correct ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                            {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {correct ? 'Benar' : 'Salah'}
                          </span>
                        )}
                      </div>

                      <div className="grid gap-2">
                        {question.options.map((option, optionIndex) => {
                          const optionLabel = String.fromCharCode(65 + optionIndex);
                          const isSelected = selected === option;
                          const showCorrect = submitted && option === question.answer;
                          const showWrong = submitted && isSelected && option !== question.answer;

                          return (
                            <label
                              key={`${question.id}-${option}`}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                showCorrect
                                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                  : showWrong
                                    ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                    : isSelected
                                      ? 'border-[#0891B2] bg-[#ECFEFF] text-[#0E7490]'
                                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#0891B2]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                checked={isSelected}
                                disabled={submitted}
                                onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                                className="h-3.5 w-3.5"
                              />
                              <span>{optionLabel}. {option}</span>
                            </label>
                          );
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pembahasan</p>
                          <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-600">
                            {buildQuestionExplanation(question, selected)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Hasil Listening</p>
                    <p className="mt-1 text-xl font-black text-[#0F172A]">{score}/{questions.length} benar</p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-600">{listeningRecommendation}</p>
                  </div>
                  <div className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Mistake Bank</p>
                    <p className="mt-1 text-xl font-black text-[#0F172A]">{mistakeBankCount} soal tersimpan</p>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-500">{wrongQuestions.length} soal listening dari topic ini masuk review.</p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                  }}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
                >
                  <RotateCcw size={16} />
                  Reset Quiz
                </button>
                <button
                  type="button"
                  onClick={submitListeningQuiz}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] bg-[#0891B2] px-5 text-sm font-black text-white transition hover:bg-[#0E7490] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={answeredCount < questions.length}
                >
                  {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Quiz'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function SpeakingPracticeIntro({ topic }: { topic: SpeakingTopic }) {
  const drillItems = [
    { label: 'Pattern', value: topic.pattern },
    { label: 'Model Answer', value: topic.sample },
    { label: 'Formal', value: topic.formalResponse },
    { label: 'Casual', value: topic.casualResponse },
    { label: 'Repair Phrase', value: topic.repairPhrase },
  ];

  const playSpeakingPack = () => {
    playAudio(
      [
        `Situation: ${topic.situation}.`,
        `Goal: ${topic.goal}.`,
        `Pattern: ${topic.pattern}.`,
        `Model answer: ${topic.sample}`,
      ].join(' '),
      0.9
    );
  };

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex rounded bg-[#E0F2FE] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">
              Speaking Studio
            </span>
            <h2 className="mt-3 text-lg font-black text-[#0F172A]">{topic.title}</h2>
            <p className="mt-1 max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.goal}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={playSpeakingPack}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#0891B2] px-4 text-sm font-black text-white transition hover:bg-[#0E7490]"
            >
              <Play size={16} fill="currentColor" />
              Listen Model
            </button>
            <button
              type="button"
              onClick={stopCurrentAudio}
              className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-white"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Situation Prompt</p>
          <p className="mt-2 text-base font-black leading-relaxed text-[#0F172A]">{topic.situation}</p>
          <div className="mt-4 rounded-[8px] bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">Model Answer</p>
            <p className="mt-2 text-sm font-black leading-relaxed text-[#0F172A]">{topic.sample}</p>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pronunciation Focus</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.pronunciation}</p>
            </div>
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Fluency Tip</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.fluencyTip}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Repeat Bank</h3>
            <div className="mt-3 space-y-2">
              {drillItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => playAudio(item.value, 0.88)}
                  className="flex w-full items-center justify-between gap-3 rounded-[6px] border border-[#CBD5E1] px-3 py-2 text-left transition hover:border-[#0891B2] hover:bg-[#ECFEFF]"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</span>
                    <span className="mt-0.5 block text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</span>
                  </span>
                  <Volume2 className="shrink-0 text-[#0891B2]" size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Practice Flow</h3>
            <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
              <p>1. Listen to the model answer once.</p>
              <p>2. Repeat the pattern slowly, then at natural speed.</p>
              <p>3. Replace the blank with your own detail.</p>
              <p>4. Answer the 30 multiple choice questions to lock the structure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WritingPracticeIntro({ topic }: { topic: WritingTopic }) {
  const writingParts = [
    { label: 'Opening', value: topic.opening },
    { label: 'Connector', value: topic.connector },
    { label: 'Closing', value: topic.closing },
    { label: 'Structure', value: topic.structure },
    { label: 'Editing Tip', value: topic.editingTip },
  ];

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit rounded bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">
            Writing Studio
          </span>
          <h2 className="text-lg font-black text-[#0F172A]">{topic.title}</h2>
          <p className="max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.goal}</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Writing Task</p>
          <p className="mt-2 text-base font-black leading-relaxed text-[#0F172A]">{topic.task}</p>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Format</p>
              <p className="mt-1 text-sm font-black text-[#0F172A]">{topic.format}</p>
            </div>
            <div className="rounded-[8px] bg-white p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Structure</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{topic.structure}</p>
            </div>
          </div>

          <div className="mt-4 rounded-[8px] bg-white p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">Model Writing</p>
            <p className="mt-2 text-sm font-black leading-relaxed text-[#0F172A]">{topic.sample}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Writing Builder</h3>
            <div className="mt-3 space-y-2">
              {writingParts.map((item) => (
                <div key={item.label} className="rounded-[6px] border border-[#CBD5E1] px-3 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                  <p className="mt-0.5 text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Draft Flow</h3>
            <div className="mt-3 space-y-2 text-sm font-semibold text-gray-600">
              <p>1. Read the task and decide the format.</p>
              <p>2. Write one clear main idea first.</p>
              <p>3. Add one connector and one supporting detail.</p>
              <p>4. Check grammar, punctuation, and tone before submitting.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadingPracticeIntro({ topic }: { topic: ReadingTopic }) {
  const readingSteps = [
    'Skim judul dan kalimat pertama untuk menangkap arah teks.',
    'Baca passage lengkap tanpa berhenti terlalu lama di satu kata.',
    `Perhatikan kata "${topic.vocabulary}" dan tebak maknanya dari konteks.`,
    'Cari satu detail pendukung sebelum masuk ke pilihan ganda.',
  ];

  const playPassage = () => {
    playAudio(`${topic.passageTitle}. ${topic.passage}`, 0.9);
  };

  return (
    <section className="mb-6 overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-flex rounded bg-[#DCFCE7] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#15803D]">
              Reading Lab
            </span>
            <h2 className="mt-3 text-lg font-black text-[#0F172A]">{topic.passageTitle}</h2>
            <p className="mt-1 max-w-3xl text-sm font-semibold leading-relaxed text-gray-600">{topic.description}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={playPassage}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[4px] bg-[#15803D] px-4 text-sm font-black text-white transition hover:bg-[#166534]"
            >
              <Play size={16} fill="currentColor" />
              Read Aloud
            </button>
            <button
              type="button"
              onClick={stopCurrentAudio}
              className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#CBD5E1] px-4 text-sm font-black text-[#0F172A] transition hover:bg-white"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Passage</p>
          <h3 className="mt-2 text-base font-black text-[#0F172A]">{topic.passageTitle}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-gray-700">{topic.passage}</p>
        </article>

        <div className="space-y-4">
          <div className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Reading Focus</h3>
            <div className="mt-3 grid gap-2">
              {[
                { label: 'Skill', value: topic.readingSkill },
                { label: 'Question Types', value: 'Main idea, detail, vocabulary, inference, purpose' },
                { label: 'Key Word', value: topic.vocabulary },
              ].map((item) => (
                <div key={item.label} className="rounded-[6px] border border-[#CBD5E1] px-3 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                  <p className="mt-0.5 text-xs font-black leading-relaxed text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
            <h3 className="text-sm font-black text-[#0F172A]">Before You Answer</h3>
            <div className="mt-3 space-y-2">
              {readingSteps.map((step, index) => (
                <div key={step} className="flex gap-2 text-sm font-semibold leading-relaxed text-gray-600">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#DCFCE7] text-[10px] font-black text-[#15803D]">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VocabularyQuizPage({
  topicId,
  levelId,
  skillId = 'vocabulary',
  quizTopics = topics,
  buildQuizQuestions = buildQuestions,
  quizLabel = 'Vocabulary',
  introContent,
}: {
  topicId: string;
  levelId?: string;
  skillId?: string;
  quizTopics?: Topic[];
  buildQuizQuestions?: (topicId: string, language?: 'en' | 'id') => VocabQuestion[];
  quizLabel?: string;
  introContent?: (topic: Topic) => ReactNode;
}) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const topic = quizTopics.find((item) => item.id === topicId) || quizTopics[0];
  const questions = useMemo(() => buildQuizQuestions(topic.id, language), [buildQuizQuestions, language, topic.id]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [mistakeBankCount, setMistakeBankCount] = useState(() => loadMistakeBank().length);

  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const wrongQuestions = questions.filter((question) => answers[question.id] && answers[question.id] !== question.answer);
  const levelStats = (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const answered = levelQuestions.filter((question) => answers[question.id]).length;
    const correct = levelQuestions.filter((question) => answers[question.id] === question.answer).length;

    return { level, answered, correct, total: levelQuestions.length };
  });
  const weakestLevel = levelStats.reduce((weakest, stat) => {
    const statRate = stat.correct / stat.total;
    const weakestRate = weakest.correct / weakest.total;
    return statRate < weakestRate ? stat : weakest;
  }, levelStats[0]);
  const recommendation = score >= 26
    ? `Mantap. Lanjut ke topik ${quizLabel} berikutnya atau coba ulang mode Advanced.`
    : score >= 18
      ? `Fokus ulang level ${weakestLevel.level}; level ini skormu ${weakestLevel.correct}/${weakestLevel.total}.`
      : `Perkuat Basic dulu sebelum lanjut. Mulai dari review ${wrongQuestions.length} soal yang salah.`;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const scrollToQuestion = (questionId: string) => {
    document.getElementById(questionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submitQuiz = () => {
    const wrongRecords: MistakeRecord[] = wrongQuestions.map((question) => ({
      id: `${skillId}-${topic.id}-${question.id}`,
      skillId,
      topicTitle: topic.title,
      level: question.level,
      prompt: question.prompt,
      answer: question.answer,
      selected: answers[question.id],
      options: question.options,
      savedAt: new Date().toISOString(),
    }));
    const existing = loadMistakeBank().filter((record) => !wrongRecords.some((item) => item.id === record.id));
    const nextBank = [...wrongRecords, ...existing];
    saveMistakeBank(nextBank);
    setMistakeBankCount(nextBank.length);
    savePracticeAttempt({
      id: `${skillId}-${topic.id}-${Date.now()}`,
      skillId,
      topicId: topic.id,
      topicTitle: topic.title,
      score,
      total: questions.length,
      weakestLevel: weakestLevel.level,
      completedAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-4 md:px-8">
          <div className="mb-5 text-xs font-semibold text-gray-500">
            Latihan Soal <span className="mx-1">/</span> {quizLabel} <span className="mx-1">/</span>{' '}
            <span className="font-black text-[#2563EB]">{topic.title}</span>
          </div>

          <div className="flex items-start gap-3">
            <motion.button
              type="button"
              onClick={() => navigate(`/latihan/${skillId}`, { replace: true })}
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowLeft size={17} />
            </motion.button>
            <div className="flex-1">
              <div className="inline-flex rounded bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">
                30 multiple choice questions
              </div>
              <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">Latihan Soal: {quizLabel} ({topic.title})</h1>
              <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">
                Kerjakan campuran soal Basic, Intermediate, dan Advanced. Pilih satu jawaban paling tepat untuk setiap nomor.
              </p>
            </div>
            <div className="h-9 w-9 shrink-0" />
          </div>
          </div>

          <div className="px-5 py-6 md:px-8">
          {introContent?.(topic)}

          <div className="mb-5 grid gap-3 md:grid-cols-4">
            {[
              { label: 'Total Soal', value: '30', icon: ClipboardList, color: '#2563EB', bg: '#DBEAFE' },
              { label: 'Terjawab', value: `${answeredCount}/30`, icon: Target, color: '#0F766E', bg: '#CCFBF1' },
              { label: 'Progress', value: `${progressPercent}%`, icon: CheckCircle2, color: '#7C3AED', bg: '#EDE9FE' },
              { label: 'Skor', value: submitted ? `${score}/30` : '-', icon: Award, color: '#F59E0B', bg: '#FEF3C7' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                    </div>
                    <div className="grid h-9 w-9 place-items-center rounded-[8px]" style={{ backgroundColor: item.bg, color: item.color }}>
                      <Icon size={17} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-6 rounded-[8px] border border-[#CBD5E1] bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-[#0F172A]">Question Navigator</p>
              <p className="text-xs font-bold text-gray-500">{answeredCount} of 30 answered</p>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-[#2563EB]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(32px, 1fr))' }}>
              {questions.map((question, index) => {
                const answered = Boolean(answers[question.id]);
                const correct = answers[question.id] === question.answer;

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => scrollToQuestion(question.id)}
                    className={`h-8 rounded-[6px] border text-xs font-black transition ${
                      submitted
                        ? correct
                          ? 'border-[#10B981] bg-[#ECFDF5] text-[#047857]'
                          : 'border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]'
                        : answered
                          ? 'border-[#2563EB] bg-[#DBEAFE] text-[#1D4ED8]'
                          : 'border-[#CBD5E1] bg-white text-gray-400 hover:border-[#2563EB]'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-7 grid gap-3 md:grid-cols-3">
            {levelStats.map((stat) => (
              <div key={stat.level} className="rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-black text-[#0F172A]">{stat.level}</p>
                  <span className="text-xs font-black text-gray-500">
                    {submitted ? `${stat.correct}/${stat.total}` : `${stat.answered}/${stat.total}`}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white">
                  <motion.div
                    className="h-full rounded-full bg-[#2563EB]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stat.answered / stat.total) * 100}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {(['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => (
            <section key={level} className="mb-8 rounded-[10px] border border-[#CBD5E1] bg-white p-4">
              <div className="flex flex-col gap-2 border-b-2 border-[#2563EB] pb-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-black text-[#0F172A]">{level} Level</h2>
                <span className="text-xs font-bold text-gray-500">
                  {questions.filter((question) => question.level === level && answers[question.id]).length}/10 answered
                </span>
              </div>

              <div className="mt-4 space-y-5">
                {questions
                  .filter((question) => question.level === level)
                  .map((question) => {
                    const selected = answers[question.id];
                    const correct = selected === question.answer;

                    return (
                      <div
                        key={question.id}
                        id={question.id}
                        className={`scroll-mt-24 rounded-[8px] border p-4 transition ${
                          submitted
                            ? correct
                              ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                              : 'border-[#FECACA] bg-[#FFFBFB]'
                            : selected
                              ? 'border-[#BFDBFE] bg-[#F8FAFC]'
                              : 'border-gray-100 bg-white'
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div className="flex min-w-0 gap-3">
                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-xs font-black text-[#2563EB]">
                              {questions.findIndex((item) => item.id === question.id) + 1}
                            </span>
                            <p className="pt-1 text-sm font-black leading-relaxed text-[#0F172A]">{question.prompt}</p>
                          </div>
                          {submitted && (
                            <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-black ${correct ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                              {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                              {correct ? 'Benar' : 'Salah'}
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => {
                            const optionLabel = String.fromCharCode(65 + optionIndex);
                            const isSelected = selected === option;
                            const showCorrect = submitted && option === question.answer;
                            const showWrong = submitted && isSelected && option !== question.answer;

                            return (
                              <label
                                key={option}
                                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                  showCorrect
                                    ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                    : showWrong
                                      ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                      : isSelected
                                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]'
                                        : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB]'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  checked={isSelected}
                                  disabled={submitted}
                                  onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                                  className="h-3.5 w-3.5"
                                />
                                <span>{optionLabel}. {option}</span>
                              </label>
                            );
                          })}
                        </div>

                        {submitted && (
                          <div className="mt-3 rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pembahasan</p>
                            <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-600">
                              {buildQuestionExplanation(question, selected)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}

          {submitted && (
            <div className="mb-5 space-y-4">
              <div className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Hasil Akhir</p>
                    <p className="mt-1 text-2xl font-black text-[#0F172A]">{score}/30 benar</p>
                    <p className="mt-2 text-sm font-semibold text-gray-600">{recommendation}</p>
                  </div>
                  <div className="rounded-[8px] bg-white px-4 py-3 text-sm font-black text-[#2563EB]">
                    Nilai: {Math.round((score / questions.length) * 100)}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Mistake Bank</p>
                      <p className="mt-1 text-lg font-black text-[#0F172A]">{mistakeBankCount} soal tersimpan</p>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#FEF2F2] text-[#DC2626]">
                      <XCircle size={18} />
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-gray-500">
                    Soal yang salah otomatis disimpan di perangkat ini, jadi nanti bisa dibuat mode Review Mistakes.
                  </p>
                </div>

                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Adaptive Focus</p>
                  <p className="mt-1 text-lg font-black text-[#0F172A]">{weakestLevel.level}</p>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-gray-500">
                    Level terlemahmu di topik ini adalah {weakestLevel.level} dengan skor {weakestLevel.correct}/{weakestLevel.total}. Prioritaskan level ini sebelum lanjut.
                  </p>
                </div>
              </div>

              {wrongQuestions.length > 0 && (
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <div className="mb-3 flex flex-col gap-1 border-b border-gray-100 pb-3">
                    <h3 className="text-base font-black text-[#0F172A]">Review Soal Salah</h3>
                    <p className="text-xs font-semibold text-gray-500">Mulai dari daftar ini saat mengulang topik.</p>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {wrongQuestions.slice(0, 8).map((question) => (
                      <button
                        key={`review-${question.id}`}
                        type="button"
                        onClick={() => scrollToQuestion(question.id)}
                        className="rounded-[6px] border border-[#FECACA] bg-[#FFFBFB] px-3 py-2 text-left transition hover:border-[#EF4444]"
                      >
                        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#DC2626]">{question.level}</span>
                        <span className="mt-1 line-clamp-2 block text-xs font-black leading-relaxed text-[#0F172A]">{question.prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="sticky bottom-0 -mx-5 flex flex-col gap-3 border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:-mx-8 md:px-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-5 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
            >
              <RotateCcw size={16} />
              Reset Jawaban
            </button>
            <button
              type="button"
              onClick={submitQuiz}
              className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#2563EB] px-6 text-sm font-black text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={answeredCount < questions.length}
            >
              {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Jawaban'}
            </button>
          </div>
        </div>
      </div>
      </div>
    </PageContainer>
  );
}

function ReviewMistakesPage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState<MistakeRecord[]>(() => loadMistakeBank());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = records.slice(0, 30).map((record): VocabQuestion => {
    const fallbackOptions = Array.from(new Set([record.answer, record.selected, 'Review this pattern again.', 'I am not sure.'])).filter(Boolean);
    return {
      id: record.id,
      level: record.level,
      prompt: record.prompt,
      answer: record.answer,
      options: record.options?.length ? record.options : fallbackOptions,
    };
  });
  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);

  const clearBank = () => {
    saveMistakeBank([]);
    setRecords([]);
    setAnswers({});
    setSubmitted(false);
  };

  const submitReview = () => {
    const remaining = records.filter((record) => answers[record.id] !== record.answer);
    saveMistakeBank(remaining);
    setRecords(remaining);
    setSubmitted(true);
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-5 md:px-8">
            <div className="flex items-start gap-3">
              <motion.button
                type="button"
                onClick={() => navigate('/latihan', { replace: true })}
                className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
                whileTap={{ scale: 0.92 }}
              >
                <ArrowLeft size={17} />
              </motion.button>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded bg-[#FEF2F2] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#DC2626]">
                  Mistake Review
                </span>
                <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">Review Mistakes</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">
                  Latih ulang soal yang sebelumnya salah. Jawaban benar akan otomatis keluar dari bank setelah submit.
                </p>
              </div>
              <div className="h-9 w-9 shrink-0" />
            </div>
          </div>

          <div className="px-5 py-6 md:px-8">
            <div className="mb-5 grid gap-3 md:grid-cols-3">
              {[
                { label: 'Tersimpan', value: records.length, icon: XCircle, color: '#DC2626', bg: '#FEF2F2' },
                { label: 'Review Set', value: questions.length, icon: ClipboardList, color: '#2563EB', bg: '#DBEAFE' },
                { label: 'Skor', value: submitted ? `${score}/${questions.length}` : '-', icon: Award, color: '#F59E0B', bg: '#FEF3C7' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                        <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-[8px]" style={{ backgroundColor: item.bg, color: item.color }}>
                        <Icon size={17} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {questions.length === 0 ? (
              <div className="rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
                <p className="text-lg font-black text-[#0F172A]">Belum ada mistake yang perlu direview.</p>
                <p className="mt-2 text-sm font-semibold text-gray-500">Kerjakan quiz, lalu soal yang salah akan muncul di sini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const selected = answers[question.id];
                  const correct = selected === question.answer;

                  return (
                    <div
                      key={question.id}
                      className={`rounded-[8px] border p-4 ${
                        submitted
                          ? correct
                            ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                            : 'border-[#FECACA] bg-[#FFFBFB]'
                          : selected
                            ? 'border-[#BFDBFE] bg-[#F8FAFC]'
                            : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-xs font-black text-[#2563EB]">
                            {index + 1}
                          </span>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{records[index]?.skillId} / {question.level}</p>
                            <p className="mt-1 text-sm font-black leading-relaxed text-[#0F172A]">{question.prompt}</p>
                          </div>
                        </div>
                        {submitted && (
                          <span className={`inline-flex shrink-0 items-center gap-1 text-xs font-black ${correct ? 'text-[#047857]' : 'text-[#DC2626]'}`}>
                            {correct ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                            {correct ? 'Clear' : 'Review'}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const optionLabel = String.fromCharCode(65 + optionIndex);
                          const isSelected = selected === option;
                          const showCorrect = submitted && option === question.answer;
                          const showWrong = submitted && isSelected && option !== question.answer;

                          return (
                            <label
                              key={`${question.id}-${option}`}
                              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[6px] border px-3 py-2 text-sm font-semibold transition ${
                                showCorrect
                                  ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46]'
                                  : showWrong
                                    ? 'border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]'
                                    : isSelected
                                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]'
                                      : 'border-[#CBD5E1] bg-white text-[#0F172A] hover:border-[#2563EB]'
                              }`}
                            >
                              <input
                                type="radio"
                                name={question.id}
                                checked={isSelected}
                                disabled={submitted}
                                onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                                className="h-3.5 w-3.5"
                              />
                              <span>{optionLabel}. {option}</span>
                            </label>
                          );
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 rounded-[6px] border border-[#CBD5E1] bg-white px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Pembahasan</p>
                          <p className="mt-1 text-xs font-semibold leading-relaxed text-gray-600">
                            {buildQuestionExplanation(question, selected)}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="sticky bottom-0 -mx-5 mt-5 flex flex-col gap-3 border-t border-gray-100 bg-white/95 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between md:-mx-8 md:px-8">
              <button
                type="button"
                onClick={clearBank}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#CBD5E1] px-5 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
              >
                <RotateCcw size={16} />
                Clear Bank
              </button>
              <button
                type="button"
                onClick={submitReview}
                className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#2563EB] px-6 text-sm font-black text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={questions.length === 0 || answeredCount < questions.length || submitted}
              >
                {answeredCount < questions.length ? `Jawab ${questions.length - answeredCount} soal lagi` : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default function LatihanSkillPage() {
  const { t } = useLanguage();
  const { levelId, skillId } = useParams<{ levelId: string; skillId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicId = searchParams.get('topic');
  const activeSkillId = skillId || levelId;

  if (activeSkillId === 'review-mistakes') {
    return <ReviewMistakesPage />;
  }

  if (activeSkillId === 'vocabulary') {
    return topicId ? <VocabularyQuizPage topicId={topicId} levelId={levelId} /> : <VocabularyTopicList levelId={levelId} />;
  }

  if (activeSkillId === 'grammar') {
    return topicId ? (
      <VocabularyQuizPage
        topicId={topicId}
        levelId={levelId}
        skillId="grammar"
        quizTopics={grammarTopics}
        buildQuizQuestions={buildGrammarQuestions}
        quizLabel="Grammar"
      />
    ) : (
      <GrammarTopicList levelId={levelId} />
    );
  }

  if (activeSkillId === 'speaking') {
    return topicId ? (
      <VocabularyQuizPage
        topicId={topicId}
        levelId={levelId}
        skillId="speaking"
        quizTopics={speakingTopics}
        buildQuizQuestions={buildSpeakingQuestions}
        quizLabel="Speaking"
        introContent={(topic) => <SpeakingPracticeIntro topic={topic as SpeakingTopic} />}
      />
    ) : (
      <SpeakingTopicList levelId={levelId} />
    );
  }

  if (activeSkillId === 'writing') {
    return topicId ? (
      <VocabularyQuizPage
        topicId={topicId}
        levelId={levelId}
        skillId="writing"
        quizTopics={writingTopics}
        buildQuizQuestions={buildWritingQuestions}
        quizLabel="Writing"
        introContent={(topic) => <WritingPracticeIntro topic={topic as WritingTopic} />}
      />
    ) : (
      <WritingTopicList levelId={levelId} />
    );
  }

  if (activeSkillId === 'reading') {
    return topicId ? (
      <VocabularyQuizPage
        topicId={topicId}
        levelId={levelId}
        skillId="reading"
        quizTopics={readingTopics}
        buildQuizQuestions={buildReadingQuestions}
        quizLabel="Reading"
        introContent={(topic) => <ReadingPracticeIntro topic={topic as ReadingTopic} />}
      />
    ) : (
      <ReadingTopicList levelId={levelId} />
    );
  }

  if (activeSkillId === 'listening') {
    return topicId ? <ListeningPracticePage topicId={topicId} /> : <ListeningTopicList levelId={levelId} />;
  }

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="latihan.questionTypes" subtitleKey="latihan.questionTypesSub" />

        <div className="px-5 md:px-0">
          <div className="grid gap-3 md:grid-cols-2">
            {practiceQuestionTypes.map((qt, i) => (
              <NavCard
                key={qt.id}
                icon={qt.icon}
                label={t(qt.labelKey as TranslationKey)}
                sublabel={t(qt.sublabelKey as TranslationKey)}
                color={qt.color}
                bgColor={qt.bgColor}
                onClick={() => navigate(`/latihan/${activeSkillId}/start`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
