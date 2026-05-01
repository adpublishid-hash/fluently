import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, CheckCircle2, ClipboardList, RotateCcw, Target, XCircle } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { PageHeader, NavCard } from '../../components/shared/NavComponents';
import { practiceQuestionTypes } from '../../data/mockData';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

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

type TopicTerm = {
  word: string;
  meaning: string;
};

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

function rotateOptions(options: string[], amount: number) {
  const offset = amount % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

function buildQuestions(topicId: string): VocabQuestion[] {
  const topic = topics.find((item) => item.id === topicId) || topics[0];
  const terms = topicTerms[topic.id] || topicTerms.general;
  const levelPrompts: Record<QuizLevel, (term: TopicTerm) => string> = {
    Basic: (term) => `Which word means "${term.meaning}"?`,
    Intermediate: (term) => `Choose the best vocabulary item for this idea in ${topic.title}: "${term.meaning}".`,
    Advanced: (term) => `In a more formal ${topic.title.toLowerCase()} context, which term best matches: "${term.meaning}"?`,
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

function VocabularyTopicList({ levelId }: { levelId?: string }) {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="rounded-[6px] border border-[#CBD5E1] bg-white px-5 py-6 shadow-sm md:px-8">
          <div className="mb-6 flex items-start gap-3">
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowLeft size={17} />
            </motion.button>
            <div className="flex-1 text-center">
              <h1 className="text-[22px] font-black text-[#0F172A]">Daftar Isi Latihan Vocabulary</h1>
              <p className="mt-1 text-xs font-semibold text-gray-500">Pilih topik latihan yang ingin kamu kerjakan.</p>
            </div>
            <div className="h-9 w-9 shrink-0" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                type="button"
                onClick={() => navigate(`/latihan/${levelId || 'basic'}/vocabulary?topic=${topic.id}`)}
                className="group min-h-[150px] rounded-[6px] border border-[#CBD5E1] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7EC3E6]/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.015 * index }}
              >
                <span className="inline-flex rounded bg-[#EEF2FF] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#2563EB]">
                  Topic {index + 1}
                </span>
                <h2 className="mt-3 text-sm font-black text-[#0F172A]">{topic.title}</h2>
                <p className="mt-2 min-h-[34px] text-xs font-semibold leading-relaxed text-gray-500">{topic.description}</p>
                <div className="mt-4 border-t border-gray-100 pt-3 text-xs font-black text-[#2563EB]">
                  Mulai Latihan -&gt;
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function VocabularyQuizPage({ topicId, levelId }: { topicId: string; levelId?: string }) {
  const navigate = useNavigate();
  const topic = topics.find((item) => item.id === topicId) || topics[0];
  const questions = useMemo(() => buildQuestions(topic.id), [topic.id]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);
  const levelStats = (['Basic', 'Intermediate', 'Advanced'] as QuizLevel[]).map((level) => {
    const levelQuestions = questions.filter((question) => question.level === level);
    const answered = levelQuestions.filter((question) => answers[question.id]).length;
    const correct = levelQuestions.filter((question) => answers[question.id] === question.answer).length;

    return { level, answered, correct, total: levelQuestions.length };
  });

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const scrollToQuestion = (questionId: string) => {
    document.getElementById(questionId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-0 md:pb-8">
        <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white shadow-sm">
          <div className="bg-[#F8FAFC] px-5 py-4 md:px-8">
          <div className="mb-5 text-xs font-semibold text-gray-500">
            Latihan Soal <span className="mx-1">/</span> Vocabulary <span className="mx-1">/</span>{' '}
            <span className="font-black text-[#2563EB]">{topic.title}</span>
          </div>

          <div className="flex items-start gap-3">
            <motion.button
              type="button"
              onClick={() => navigate(`/latihan/${levelId || 'basic'}/vocabulary`)}
              className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50"
              whileTap={{ scale: 0.92 }}
            >
              <ArrowLeft size={17} />
            </motion.button>
            <div className="flex-1">
              <div className="inline-flex rounded bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#2563EB]">
                30 multiple choice questions
              </div>
              <h1 className="mt-3 text-[24px] font-black leading-tight text-[#0F172A]">Latihan Soal: Vocabulary ({topic.title})</h1>
              <p className="mt-1 max-w-2xl text-sm font-semibold leading-relaxed text-gray-500">
                Kerjakan campuran soal Basic, Intermediate, dan Advanced. Pilih satu jawaban paling tepat untuk setiap nomor.
              </p>
            </div>
            <div className="h-9 w-9 shrink-0" />
          </div>
          </div>

          <div className="px-5 py-6 md:px-8">
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
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}

          {submitted && (
            <div className="mb-5 rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">Hasil Akhir</p>
                  <p className="mt-1 text-2xl font-black text-[#0F172A]">{score}/30 benar</p>
                </div>
                <div className="rounded-[8px] bg-white px-4 py-3 text-sm font-black text-[#2563EB]">
                  Nilai: {Math.round((score / questions.length) * 100)}
                </div>
              </div>
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
              onClick={() => setSubmitted(true)}
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

export default function LatihanSkillPage() {
  const { t } = useLanguage();
  const { levelId, skillId } = useParams<{ levelId: string; skillId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topicId = searchParams.get('topic');

  if (skillId === 'vocabulary') {
    return topicId ? <VocabularyQuizPage topicId={topicId} levelId={levelId} /> : <VocabularyTopicList levelId={levelId} />;
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
                onClick={() => navigate(`/latihan/${levelId}/${skillId}/start`)}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
