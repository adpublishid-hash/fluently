const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'elementary', 'reading');
if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR, { recursive: true });
}

// Data Array untuk 15 lesson Reading A2
const LESSONS = [
  { id: 1, title: 'Iklan Sederhana', subtitle: 'Memahami teks diskon & promo', icon: '🏷️' },
  { id: 2, title: 'Label Makanan', subtitle: 'Membaca detail produk', icon: '🥫' },
  { id: 3, title: 'Jadwal Kereta & Pesawat', subtitle: 'Membaca tabel waktu perjalanan', icon: '🚆' },
  { id: 4, title: 'Jadwal Aktivitas & Kelas', subtitle: 'Membaca rundown event harian', icon: '📋' },
  { id: 5, title: 'Menu Restoran', subtitle: 'Memahami kategori makanan & harga', icon: '🍔' },
  { id: 6, title: 'Brosur Wisata Pantai', subtitle: 'Memahami brosur liburan sederhana', icon: '🏖️' },
  { id: 7, title: 'Papan Peringatan (Warning)', subtitle: 'Memahami larangan & aturan A2', icon: '⚠️' },
  { id: 8, title: 'Email Pribadi', subtitle: 'Memahami cerita liburan dalam email', icon: '📧' },
  { id: 9, title: 'Kartu Pos', subtitle: 'Pesan pendek dari luar negeri', icon: '📭' },
  { id: 10, title: 'Pengumuman Barang Hilang', subtitle: 'Memahami ciri barang di pengumuman', icon: '🎒' },
  { id: 11, title: 'Teks Petunjuk Arah', subtitle: 'Memahami navigasi tertulis', icon: '🗺️' },
  { id: 12, title: 'Ulasan Produk (Review)', subtitle: 'Membaca pengalaman pelanggan', icon: '⭐' },
  { id: 13, title: 'Boarding Pass Penerbangan', subtitle: 'Membaca tiket pesawat dengan detail', icon: '✈️' },
  { id: 14, title: 'Resep Makanan Ringan', subtitle: 'Memahami langkah instruksional', icon: '🥣' },
  { id: 15, title: 'Evaluasi Membaca A2', subtitle: 'Uji komprehensif teks pendek', icon: '🎓' },
];

// Definisi konten bacaan untuk tiap lesson agar lebih realistis
const CONTENT_BANK = {
  1: {
    title: "Sale at Megamart",
    text: "<div className='text-center border-4 border-red-500 p-4 mb-4'><h2 className='text-2xl font-black text-red-600 uppercase'>End of Year Sale!</h2><p className='text-xl font-bold'>Up to 50% OFF</p><ul className='my-3 space-y-1 text-left bg-red-50 p-3'><li>👟 <b>Shoes:</b> $30 (was $60)</li><li>👕 <b>T-Shirts:</b> $10 (Buy 2 Get 1 Free)</li><li>📱 <b>Electronics:</b> 20% OFF</li></ul><p className='text-sm italic'>Valid until December 31st. Limited stock!</p></div>",
    qPool: [
      { q: "What is on sale?", a: "Shoes, T-shirts, and Electronics", w: ["Only shoes", "Food and drinks", "Cars and bikes"] },
      { q: "How much are the shoes now?", a: "$30", w: ["$60", "$50", "$10"] },
      { q: "What is the discount for Electronics?", a: "20% OFF", w: ["50% OFF", "10% OFF", "30% OFF"] },
      { q: "When does the sale end?", a: "December 31st", w: ["Tomorrow", "Next week", "January 1st"] },
      { q: "What happens if you buy 2 T-shirts?", a: "You get 1 free", w: ["You pay double", "You get 50% off", "Nothing"] }
    ]
  },
  2: {
    title: "Nutrition Facts: Tomato Soup",
    text: "<div className='border-2 border-black p-3 bg-white max-w-xs mx-auto'><h3 className='font-black text-lg border-b-8 border-black mb-1'>Nutrition Facts</h3><p className='font-bold flex justify-between'><span>Serving Size</span><span>1 cup (240ml)</span></p><div className='border-b-4 border-black my-1'></div><p className='font-black text-sm flex justify-between'><span>Calories</span><span>90</span></p><div className='border-b-2 border-black mb-1'></div><ul className='space-y-1 text-sm'><li><b>Total Fat:</b> 2g</li><li><b>Sodium:</b> 480mg</li><li><b>Total Carbohydrate:</b> 15g</li><li><b>Protein:</b> 3g</li></ul><p className='text-xs mt-2'>Ingredients: Water, Tomato Paste, Wheat Flour, Sugar, Salt.</p></div>",
    qPool: [
      { q: "How many calories are in one serving?", a: "90", w: ["240", "480", "15"] },
      { q: "What is the serving size?", a: "1 cup (240ml)", w: ["1 bowl", "1 can", "1 liter"] },
      { q: "How much protein does it have?", a: "3g", w: ["15g", "2g", "90g"] },
      { q: "What is the first ingredient listed?", a: "Water", w: ["Tomato Paste", "Salt", "Sugar"] },
      { q: "How much sodium is in the soup?", a: "480mg", w: ["15g", "2g", "90mg"] }
    ]
  },
  3: {
    title: "Train Schedule: London to Paris",
    text: "<table className='w-full text-sm text-left border-collapse'><thead><tr className='bg-blue-800 text-white'><th>Train No.</th><th>Departs</th><th>Arrives</th><th>Platform</th></tr></thead><tbody><tr className='bg-blue-50'><td>EuroStar 101</td><td>08:30 AM</td><td>11:45 AM</td><td>5</td></tr><tr><td>EuroStar 103</td><td>12:15 PM</td><td>03:30 PM</td><td>4</td></tr><tr className='bg-blue-50'><td>EuroStar 105</td><td>04:00 PM</td><td>07:15 PM</td><td>5</td></tr></tbody></table><p className='text-xs mt-3 text-slate-500'>* Please arrive 45 minutes before departure.</p>",
    qPool: [
      { q: "What time does Train 103 depart?", a: "12:15 PM", w: ["08:30 AM", "04:00 PM", "03:30 PM"] },
      { q: "Which platform does Train 101 use?", a: "Platform 5", w: ["Platform 4", "Platform 1", "Platform 3"] },
      { q: "When should passengers arrive at the station?", a: "45 minutes before departure", w: ["1 hour early", "Just in time", "10 minutes before"] },
      { q: "How long is the journey for EuroStar 105?", a: "3 hours 15 minutes", w: ["2 hours", "4 hours", "3 hours 30 minutes"] },
      { q: "Which train leaves in the morning?", a: "EuroStar 101", w: ["EuroStar 103", "EuroStar 105", "None"] }
    ]
  },
  4: {
    title: "Summer Camp Schedule",
    text: "<div className='bg-orange-50 p-4 rounded-xl border border-orange-200'><b>Monday Activities</b><ul className='mt-2 space-y-2 text-sm'><li><b>09:00</b> - Welcome and Registration 📝</li><li><b>10:30</b> - Team Building Games 🏃</li><li><b>12:00</b> - Lunch Break 🍎</li><li><b>13:00</b> - Arts and Crafts 🎨</li><li><b>15:00</b> - Swimming 🏊</li><li><b>16:30</b> - Go Home 🏡</li></ul></div>",
    qPool: [
      { q: "What happens at 12:00?", a: "Lunch Break", w: ["Swimming", "Go Home", "Arts and Crafts"] },
      { q: "What is the very first activity of the day?", a: "Welcome and Registration", w: ["Team Building Games", "Lunch", "Swimming"] },
      { q: "When do the children go swimming?", a: "15:00", w: ["13:00", "10:30", "16:30"] },
      { q: "What do they do right before going home?", a: "Swimming", w: ["Lunch", "Arts and Crafts", "Team games"] },
      { q: "What activity is planned for 13:00?", a: "Arts and Crafts", w: ["Lunch Break", "Team Building Games", "Swimming"] }
    ]
  },
  5: {
    title: "Luigi's Italian Restaurant",
    text: "<div className='bg-red-50 p-4 border-2 border-red-800 rounded-lg text-center font-serif'><h2 className='text-xl text-red-800 mb-2 border-b-2 border-red-800'>MENU</h2><div className='text-left text-sm space-y-3'><div><b>🍕 Margherita Pizza</b> ................ $12.00<br/><span className='text-xs text-gray-500'>Tomato sauce, fresh mozzarella, basil</span></div><div><b>🍝 Spaghetti Carbonara</b> ............ $14.50<br/><span className='text-xs text-gray-500'>Pasta with egg, cheese, and bacon</span></div><div><b>🥗 Caesar Salad</b> ..................... $8.00<br/><span className='text-xs text-gray-500'>Lettuce, croutons, parmesan cheese</span></div><div><b>☕ Espresso</b> ......................... $3.00</div></div></div>",
    qPool: [
      { q: "How much does the Margherita Pizza cost?", a: "$12.00", w: ["$14.50", "$8.00", "$3.00"] },
      { q: "Which dish has bacon in it?", a: "Spaghetti Carbonara", w: ["Margherita Pizza", "Caesar Salad", "Espresso"] },
      { q: "What do you get in a Caesar Salad?", a: "Lettuce, croutons, parmesan", w: ["Tomato and mozzarella", "Egg and bacon", "Pasta and cheese"] },
      { q: "What is the cheapest item on this menu?", a: "Espresso", w: ["Caesar Salad", "Pizza", "Spaghetti"] },
      { q: "What kind of restaurant is Luigi's?", a: "Italian", w: ["French", "Mexican", "Japanese"] }
    ]
  },
  6: {
    title: "Sunny Beach Resort",
    text: "<div className='bg-cyan-50 p-4 rounded-xl border border-cyan-300'><h2 className='text-lg font-bold text-cyan-800 mb-2'>🏖️ Welcome to Sunny Beach!</h2><p className='text-sm mb-2'>Enjoy the best summer holiday with us. We offer:</p><ul className='list-disc pl-5 text-sm space-y-1 mb-3'><li>Free Wi-Fi in all rooms</li><li>Breakfast buffet from 7 AM to 10 AM</li><li>Swimming pool access (closes at 8 PM)</li><li>Private beach access</li></ul><p className='text-xs font-bold text-red-600'>NO PETS ALLOWED.</p></div>",
    qPool: [
      { q: "What time does the breakfast buffet close?", a: "10 AM", w: ["7 AM", "8 PM", "12 PM"] },
      { q: "Can you bring a dog to the resort?", a: "No, pets are not allowed", w: ["Yes, anytime", "Yes, but only in the room", "Yes, but not at the beach"] },
      { q: "When does the swimming pool close?", a: "8 PM", w: ["10 AM", "7 AM", "Midnight"] },
      { q: "Is the Wi-Fi free?", a: "Yes, in all rooms", w: ["No, you have to pay", "Only at the beach", "Only during breakfast"] },
      { q: "What kind of access does the resort have?", a: "Private beach access", w: ["Public pool only", "No beach", "Only a lake"] }
    ]
  },
  7: {
    title: "Library Rules",
    text: "<div className='p-5 border-4 border-yellow-500 bg-yellow-50 text-center'><h1 className='text-xl text-yellow-800 font-bold mb-3'>⚠ LIBRARY RULES ⚠</h1><ul className='text-left space-y-2 text-sm font-medium'><li>🤫 Please keep quiet at all times.</li><li>📵 Turn your mobile phone to silent mode.</li><li>🍔 No eating or drinking inside (except bottled water).</li><li>📚 Return books to the front desk after reading.</li></ul></div>",
    qPool: [
      { q: "Are you allowed to eat a sandwich in the library?", a: "No, eating is not allowed", w: ["Yes, anytime", "Only at the front desk", "Yes, if you share"] },
      { q: "What should you do with your phone?", a: "Turn it to silent mode", w: ["Turn it off completely", "Leave it outside", "Talk quietly"] },
      { q: "What drink is allowed in the library?", a: "Bottled water", w: ["Coffee", "Soda", "Tea"] },
      { q: "Where should you put books when finished?", a: "Return them to the front desk", w: ["Put them back on the shelf", "Leave them on the table", "Take them home"] },
      { q: "What is the general atmosphere rule?", a: "Keep quiet", w: ["Play music", "Talk loudly", "Laugh freely"] }
    ]
  },
  8: {
    title: "Email from John",
    text: "<div className='bg-gray-100 p-4 text-sm rounded-lg border border-gray-300'><b>To:</b> sarah@example.com<br/><b>From:</b> john@example.com<br/><b>Subject:</b> Hello from Tokyo!<hr className='my-2 border-gray-300'/>Hi Sarah,<br/><br/>I am having a great time in Tokyo! The weather is a bit cold, but the food is amazing. Yesterday, I visited the Tokyo Tower and ate delicious sushi.<br/><br/>I will buy some green tea for you. See you next week!<br/><br/>Best,<br/>John</div>",
    qPool: [
      { q: "Who is sending the email?", a: "John", w: ["Sarah", "Tokyo Tower", "Nobody"] },
      { q: "Where is John currently?", a: "Tokyo", w: ["London", "New York", "Paris"] },
      { q: "How is the weather there?", a: "A bit cold", w: ["Very hot", "Raining all day", "Snowing"] },
      { q: "What did John eat yesterday?", a: "Sushi", w: ["Pizza", "Burger", "Green tea"] },
      { q: "What will John buy for Sarah?", a: "Green tea", w: ["Sushi", "A Tokyo Tower souvenir", "A fresh coat"] }
    ]
  },
  9: {
    title: "Postcard from Bali",
    text: "<div className='bg-[url(https://www.transparenttextures.com/patterns/cream-paper.png)] bg-amber-50 p-5 rounded font-serif shadow-md text-sm italic'>Dear Mom & Dad,<br/><br/>Bali is beautiful! We go to the beach every morning. The sun is very bright and hot.<br/>Yesterday, we saw a traditional dance. It was wonderful.<br/><br/>Miss you both!<br/>Love, Emma</div>",
    qPool: [
      { q: "Who is Emma writing to?", a: "Mom & Dad", w: ["Her sister", "Her boss", "Her teacher"] },
      { q: "Where is Emma right now?", a: "Bali", w: ["Hawaii", "Lombok", "Jakarta"] },
      { q: "What does Emma do every morning?", a: "Goes to the beach", w: ["Eats breakfast", "Sleeps in", "Dances"] },
      { q: "How is the weather in Bali according to Emma?", a: "Bright and hot", w: ["Rainy and cold", "Very windy", "Cloudy"] },
      { q: "What did Emma see yesterday?", a: "A traditional dance", w: ["A concert", "A movie", "A museum"] }
    ]
  },
  10: {
    title: "Lost Dog Notice",
    text: "<div className='text-center p-5 bg-white border-4 border-dashed border-red-500'><h1 className='text-3xl font-black text-red-600 mb-2'>LOST DOG</h1><p className='text-left text-sm mb-3'><b>Name:</b> Max<br/><b>Breed:</b> Golden Retriever<br/><b>Color:</b> Light Brown<br/><b>Details:</b> Wearing a blue collar. Very friendly.</p><p className='font-bold bg-yellow-200 inline-block px-2 text-sm'>Lost on Monday near Central Park.</p><p className='mt-3 text-lg'><b>REWARD:</b> $100<br/>Call: 555-0192</p></div>",
    qPool: [
      { q: "What is the dog's name?", a: "Max", w: ["Goldie", "Buddy", "Rex"] },
      { q: "What breed is the dog?", a: "Golden Retriever", w: ["Poodle", "Bulldog", "Beagle"] },
      { q: "What color is the dog's collar?", a: "Blue", w: ["Red", "Light Brown", "Green"] },
      { q: "Where was the dog lost?", a: "Near Central Park", w: ["At the beach", "In the mall", "At home"] },
      { q: "How much is the reward?", a: "$100", w: ["$50", "$200", "No reward"] }
    ]
  },
  11: {
    title: "Directions to the Hospital",
    text: "<div className='bg-green-50 p-4 rounded-xl border border-green-200'><h2 className='font-bold text-green-800 mb-2'>How to find City Hospital:</h2><p className='text-sm leading-relaxed'>1. Go straight on Main Street.<br/>2. Turn left at the traffic light onto Elm Street.<br/>3. Walk past the supermarket.<br/>4. The hospital is on your right, next to the pharmacy.</p></div>",
    qPool: [
      { q: "Which street do you walk on first?", a: "Main Street", w: ["Elm Street", "Hospital Street", "Supermarket Street"] },
      { q: "Which way do you turn at the traffic light?", a: "Left", w: ["Right", "Go straight", "Turn around"] },
      { q: "What building do you walk past?", a: "The supermarket", w: ["The pharmacy", "The bank", "The school"] },
      { q: "What is next to the hospital?", a: "The pharmacy", w: ["The traffic light", "Elm Street", "The supermarket"] },
      { q: "On which side is the hospital located?", a: "On your right", w: ["On your left", "In front of you", "Behind you"] }
    ]
  },
  12: {
    title: "Review of 'SmartWatch 3000'",
    text: "<div className='bg-slate-50 p-4 border rounded'><h3 className='font-bold flex items-center justify-between'><span>⭐⭐⭐⭐ (4/5)</span><span>By: TechLover99</span></h3><p className='text-sm mt-2'>I like this watch. The screen is very clear and the battery lasts for two days. However, it is a bit heavy on my arm. Good price for the features.</p></div>",
    qPool: [
      { q: "How many stars did the reviewer give?", a: "4 out of 5", w: ["5 out of 5", "3 out of 5", "1 out of 5"] },
      { q: "What does the user like about the screen?", a: "It is very clear", w: ["It is colorful", "It is small", "It is broken"] },
      { q: "How long does the battery last?", a: "Two days", w: ["One day", "A week", "A few hours"] },
      { q: "What is a negative point mentioned?", a: "It is a bit heavy", w: ["It is expensive", "It has bad features", "It is ugly"] },
      { q: "Who wrote the review?", a: "TechLover99", w: ["A tech expert", "John", "SmartWatch 3000"] }
    ]
  },
  13: {
    title: "Boarding Pass",
    text: "<div className='border-2 border-indigo-200 bg-white rounded-xl overflow-hidden'><div className='bg-indigo-600 text-white p-2 font-bold flex justify-between'><span>SKY AIRLINES</span><span>BOARDING PASS</span></div><div className='p-4 text-sm flex gap-4'><div className='flex-1'><b>Passenger:</b> SMITH/ALEX<br/><b>From:</b> JFK (New York)<br/><b>To:</b> LHR (London)</div><div><b>Flight:</b> SK404<br/><b>Date:</b> 12 OCT<br/><b>Gate:</b> 22B</div></div><div className='bg-indigo-50 p-2 text-center text-xs font-bold text-indigo-800'>BOARDING TIME: 09:15 AM</div></div>",
    qPool: [
      { q: "What is the passenger's name?", a: "Alex Smith", w: ["John Doe", "Sky Airlines", "JFK"] },
      { q: "Where is the flight going?", a: "London (LHR)", w: ["New York (JFK)", "Gate 22B", "Paris"] },
      { q: "What is the flight number?", a: "SK404", w: ["JFK", "LHR", "22B"] },
      { q: "What time does boarding start?", a: "09:15 AM", w: ["12 OCT", "09:00 AM", "10:15 AM"] },
      { q: "Which gate should the passenger go to?", a: "22B", w: ["SK404", "12", "JFK"] }
    ]
  },
  14: {
    title: "Recipe: Simple Pancakes",
    text: "<div className='bg-orange-50 p-4 rounded-lg'><h2 className='font-serif text-lg font-bold text-orange-900 mb-2'>Pancake Recipe 🥞</h2><p className='text-sm mb-2 font-bold'>Ingredients: Flour, Milk, 1 Egg, Butter.</p><p className='text-sm leading-relaxed'>1. Mix the flour, milk, and egg in a bowl.<br/>2. Melt some butter in a pan.<br/>3. Pour the mix into the pan.<br/>4. Cook for 2 minutes, then flip it.<br/>5. Serve with honey or sugar.</p></div>",
    qPool: [
      { q: "How many eggs are needed?", a: "1", w: ["2", "3", "None"] },
      { q: "What do you do first?", a: "Mix flour, milk, and egg in a bowl", w: ["Melt butter in a pan", "Pour the mix", "Cook for 2 minutes"] },
      { q: "Where do you melt the butter?", a: "In a pan", w: ["In a bowl", "In the oven", "On a plate"] },
      { q: "How long should you cook it before flipping?", a: "2 minutes", w: ["1 minute", "5 minutes", "Until it burns"] },
      { q: "What can you serve the pancakes with?", a: "Honey or sugar", w: ["Jam or butter", "Chocolate", "Fruit"] }
    ]
  },
  15: {
    title: "University Notice",
    text: "<div className='border-l-4 border-red-600 bg-gray-50 p-4'><h3 className='text-red-700 font-bold mb-1'>IMPORTANT NOTICE</h3><p className='text-sm'>Due to heavy snow, all morning classes on Tuesday are canceled. The library will remain open. Afternoon classes will start at 1:00 PM as usual. Please check your student email for updates.</p></div>",
    qPool: [
      { q: "Why are the classes canceled?", a: "Due to heavy snow", w: ["Because of the rain", "Teacher is sick", "It's a holiday"] },
      { q: "Which classes are canceled?", a: "Morning classes on Tuesday", w: ["Afternoon classes", "All classes on Tuesday", "Wednesday classes"] },
      { q: "Is the library closed?", a: "No, it will remain open", w: ["Yes, it is closed", "Only in the morning", "Only in the afternoon"] },
      { q: "When will afternoon classes start?", a: "At 1:00 PM", w: ["At 2:00 PM", "At 12:00 PM", "They are canceled"] },
      { q: "Where should students check for updates?", a: "Their student email", w: ["The library", "The teacher", "The news"] }
    ]
  }
};

// Generate Kuis 20 Soal menggunakan kombinasi pertanyaan dari pool agar bervariasi
function generateExpandedQuiz(lessonId) {
  const content = CONTENT_BANK[lessonId] || CONTENT_BANK[1];
  const pool = content.qPool;
  const templates = [
    { type: 'A', prefix: '(Review)' },
    { type: 'B', prefix: '(Pemahaman Cepat)' },
    { type: 'C', prefix: '(Analisis Singkat)' },
    { type: 'D', prefix: '(Mencari Fakta)' }
  ];
  
  const quiz = [];
  
  for (let i = 0; i < 20; i++) {
    // Pilih pertanyaan dari pool secara berulang untuk capai 20 soal
    const baseQ = pool[i % pool.length];
    const tpl = templates[i % templates.length];
    
    // Acak posisi pilihan jawaban
    const allOpts = [baseQ.a, ...baseQ.w].sort(() => Math.random() - 0.5);
    
    const escapedQ = baseQ.q.replace(/'/g, "\\'");
    const escapedA = baseQ.a.replace(/'/g, "\\'");
    quiz.push(`{ q: '${tpl.prefix} Latihan ${i + 1} - ${escapedQ}', opts: ${JSON.stringify(allOpts)}, ans: ${JSON.stringify(baseQ.a)}, exp: 'Latihan menemukan detail spesifik (A2) dari teks berbahasa Inggris.' }`);
  }
  
  return quiz.join(',\n    ');
}

// Generate readingUtils.tsx
const UTILS_CONTENT = `import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '../../../../../components/Icons';

export const READING_KEY = 'talky_elementary_reading_completed';
export function getCompletedReadingLessons(): number[] { try { return JSON.parse(localStorage.getItem(READING_KEY) || '[]'); } catch { return []; } }
export function markReadingComplete(id: number) { const d = getCompletedReadingLessons(); if (!d.includes(id)) localStorage.setItem(READING_KEY, JSON.stringify([...d, id])); }

/* ─────────────── QUIZ ENGINE ─────────────── */
export interface QuizItem { q: string; opts: string[]; ans: string; exp: string; }

export function QuizEngine({ items, onComplete }: { items: QuizItem[]; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const pick = (o: string) => { if (checked) return; setSel(o); setChecked(true); if (o === items[step].ans) setScore(s => s + 1); };
  const next = () => { if (step < items.length - 1) { setStep(s => s + 1); setSel(null); setChecked(false); } else setDone(true); };
  const restart = () => { setStep(0); setScore(0); setDone(false); setSel(null); setChecked(false); };

  if (done) return (
    <div className="text-center py-8 max-w-md mx-auto">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"><StarIcon className="w-12 h-12 text-blue-500" /></div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Latihan Selesai! 🎉</h2>
      <p className="text-slate-500 mb-1">Skor: <span className="font-extrabold text-blue-600 text-3xl">{score}</span><span className="text-xl">/{items.length}</span></p>
      <p className="text-sm text-slate-400 mb-6">{score >= Math.round(items.length * 0.8) ? '🏆 Pemahaman membaca sangat baik!' : score >= Math.round(items.length * 0.6) ? '👍 Cukup baik!' : '📚 Coba pahami teksnya lagi!'}</p>
      <button onClick={restart} className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold mr-3 cursor-pointer hover:bg-blue-600">Ulangi</button>
      <button onClick={onComplete} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer hover:bg-indigo-700">Tandai Selesai ✓</button>
    </div>
  );

  const q = items[step];
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-400">Soal {step + 1} dari {items.length}</span>
          <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">Skor: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div className="h-full bg-blue-500 transition-all rounded-full" style={{ width: \`\${((step + 1) / items.length) * 100}%\` }} />
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-5">{q.q}</h3>
        <div className="space-y-2.5">
          {q.opts.map((o, i) => {
            let cls = 'border-slate-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
            if (checked) { if (o === q.ans) cls = 'bg-blue-50 border-blue-400 text-blue-800'; else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
            return (
              <button key={i} onClick={() => pick(o)} disabled={checked} className={\`w-full p-3.5 rounded-xl border-2 text-left text-sm font-medium transition-all flex items-center justify-between \${cls}\`}>
                <span>{o}</span>
                {checked && o === q.ans && <CheckCircleIcon className="w-5 h-5 text-blue-600 shrink-0" />}
                {checked && o === sel && o !== q.ans && <XCircleIcon className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="mt-4">
            <div className={\`p-3 rounded-xl text-sm mb-4 border \${sel === q.ans ? 'bg-blue-50 text-blue-800 border-blue-100' : 'bg-orange-50 text-orange-800 border-orange-100'}\`}>
              💡 {q.exp}
            </div>
            <button onClick={next} className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all cursor-pointer">
              {step < items.length - 1 ? 'Selanjutnya →' : 'Lihat Rekap'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── READING CARD ─────────────── */
export function ReadingCard({ title, icon, children, highlight }: { title?: string; icon?: string; children: React.ReactNode; highlight?: string; }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden mb-4 hover:border-blue-100 transition-all">
      {title && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-blue-100 flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <p className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">{title}</p>
          {highlight && <span className="ml-auto text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">{highlight}</span>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─────────────── COMPREHENSION Q&A ─────────────── */
export interface ComprehensionQ { q: string; opts: string[]; ans: string; }

export function ComprehensionSection({ passageTitle, passage, questions }: {
  passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[];
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showAns, setShowAns] = useState(false);
  const correctCount = questions.filter((q, i) => answers[i] === q.ans).length;

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <ReadingCard title={passageTitle} icon="📄">
        <div className="text-sm text-slate-700 leading-relaxed space-y-2">{passage}</div>
      </ReadingCard>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-slate-800">✏️ Pemahaman Membaca (A2)</h3>
          {Object.keys(answers).length === questions.length && !showAns && (
            <button onClick={() => setShowAns(true)} className="text-xs font-bold px-3 py-1.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer">Cek Jawaban</button>
          )}
          {showAns && <span className="text-xs font-bold text-blue-700">{correctCount}/{questions.length} benar</span>}
        </div>
        <div className="space-y-3">
          {questions.map((q, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-800 mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.opts.map((opt, j) => {
                  let cls = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
                  if (showAns) { if (opt === q.ans) cls = 'bg-blue-50 border-blue-400 text-blue-800 font-bold'; else if (opt === answers[i]) cls = 'bg-red-50 border-red-300 text-red-700'; else cls = 'opacity-40 border-slate-100 cursor-default'; }
                  else if (answers[i] === opt) cls = 'border-blue-400 bg-blue-50 text-blue-800';
                  return (
                    <button key={j} onClick={() => !showAns && setAnswers(p => ({ ...p, [i]: opt }))} disabled={showAns} className={\`w-full text-left text-sm px-3 py-2 rounded-lg border-2 transition-all \${cls}\`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {showAns && (
          <button onClick={() => { setAnswers({}); setShowAns(false); }} className="w-full mt-3 py-2.5 border-2 border-blue-400 text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 cursor-pointer">
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(DIR, 'readingUtils.tsx'), UTILS_CONTENT, 'utf8');

// Generate 15 Lessons - using string concatenation to avoid nested template literal escaping
function generateLesson(lesson) {
  const isLast = lesson.id === 15;
  const nextPath = isLast ? '/modul/english/elementary' : '/modul/english/elementary/reading/lesson-' + (lesson.id + 1);
  const quizData = generateExpandedQuiz(lesson.id, lesson.title);
  
  const lines = [
    "import React, { useState } from 'react';",
    "import { useNavigate } from 'react-router-dom';",
    "import { QuizEngine, ReadingCard, ComprehensionSection, getCompletedReadingLessons, markReadingComplete } from './readingUtils';",
    "import type { QuizItem, ComprehensionQ } from './readingUtils';",
    "",
    "/* \u2550\u2550 DATA \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */",
    "const QUIZ: QuizItem[] = [",
    "    " + quizData,
    "];",
    "",
    "const COMPREHENSION: { passageTitle: string; passage: React.ReactNode; questions: ComprehensionQ[] } = {",
    "  passageTitle: '" + lesson.icon + " Bacaan: " + lesson.title + "',",
    "  passage: (",
    "    <>",
    "      " + (CONTENT_BANK[lesson.id]?.text || "No content available"),
    "    </>",
    "  ),",
    "  questions: [",
    ...(CONTENT_BANK[lesson.id] ? CONTENT_BANK[lesson.id].qPool.map(q => {
      const opts = [q.a, ...q.w].sort(() => Math.random() - 0.5);
      return `    { q: '${q.q.replace(/'/g, "\\'")}', opts: ${JSON.stringify(opts)}, ans: '${q.a.replace(/'/g, "\\'")}' },`;
    }) : []),
    "  ],",
    "};",
    "",
    "/* \u2550\u2550 MAIN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */",
    "export default function ReadingLesson" + lesson.id + "(): React.ReactElement {",
    "  const navigate = useNavigate();",
    "  const nextPath = '" + nextPath + "';",
    "  const [isCompleted, setIsCompleted] = useState(() => getCompletedReadingLessons().includes(" + lesson.id + "));",
    "  const [showModal, setShowModal] = useState(false);",
    "  const [activeTab, setActiveTab] = useState<'baca' | 'latihan' | 'kuis'>('baca');",
    "",
    "  const handleComplete = () => { markReadingComplete(" + lesson.id + "); setIsCompleted(true); setShowModal(true); };",
    "",
    "  return (",
    "    <>",
    "      {showModal && (",
    '        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: \'rgba(0,0,0,0.5)\', backdropFilter: \'blur(6px)\' }} onClick={() => setShowModal(false)}>',
    '          <div className="bg-white rounded-3xl p-8 max-w-xs w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>',
    '            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: \'linear-gradient(135deg,#3B82F6,#2563EB)\' }}><span style={{ fontSize: 38 }}>🏆</span></div>',
    '            <h2 className="text-xl font-extrabold mb-1">Materi Selesai! 🎉</h2>',
    '            <p className="text-sm text-gray-500 mb-5">Kamu berhasil menyelesaikan latihan A2 Reading ini.</p>',
    '            <div className="flex gap-3">',
    '              <button onClick={() => { setShowModal(false); navigate(nextPath); }} className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition">Lanjut \u203a</button>',
    '              <button onClick={() => { setShowModal(false); }} className="flex-1 py-3 rounded-xl font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Tutup</button>',
    "            </div>",
    "          </div>",
    "        </div>",
    "      )}",
    "",
    '      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">',
    '        <header className="flex-none bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">',
    '          <div className="px-4 py-3 flex items-center justify-between">',
    '            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg></button>',
    '            <div className="text-center"><h1 className="text-sm font-bold text-slate-800">' + lesson.title + '</h1><p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">A2 Reading \u2022 Latihan ' + lesson.id + '</p></div>',
    '            <button onClick={() => navigate(nextPath)} className="px-3 h-9 rounded-full text-xs font-bold text-white bg-blue-500 hover:bg-blue-600">Next \u203a</button>',
    "          </div>",
    "        </header>",
    "",
    '        <div className="flex bg-white border-b border-slate-100 sticky top-[65px] z-10 shadow-sm">',
    "          {(['baca', 'latihan', 'kuis'] as const).map((tab) => {",
    "            const labels = { baca: '\uD83D\uDCD6 Baca', latihan: '\u270F\uFE0F Latihan', kuis: '\uD83C\uDFAF Kuis 20 Soal' };",
    "            return (",
    "              <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-bold tracking-wide transition-all ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-500' : 'text-slate-400 hover:text-slate-600'}`}>{labels[tab]}</button>",
    "            )",
    "          })}",
    "        </div>",
    "",
    '        <div className="flex-1 overflow-y-auto">',
    '          <div className="p-4 md:p-6 pb-28 space-y-5">',
    "            {activeTab === 'baca' && (",
    "              <>",
    '                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">',
    '                  <h2 className="text-lg font-extrabold mb-1">' + lesson.subtitle + '</h2>',
    '                  <p className="text-sm text-blue-100">Pemahaman membaca level A2 mengharuskan kamu untuk bisa menemukan informasi dengan cepat dan tepat pada dokumen tertulis.</p>',
    "                </div>",
    "",
    '                <ReadingCard title="Informasi Konteks" icon="' + lesson.icon + '">',
    '                  <p className="text-sm text-slate-700 mb-2">Pada sesi materi ini, silakan klik tab <b>Latihan</b> untuk melihat contoh bacaan interaktif yang berfokus pada informasi keseharian seperti iklan, jadwal, atau pesanan.</p>',
    '                  <p className="text-sm text-slate-700">Gunakan tab <b>Kuis 20 Soal</b> untuk melatih kemampuanmu dalam menjawab variasi pertanyaan pilihan ganda terkait berbagai skenario.</p>',
    "                </ReadingCard>",
    "              </>",
    "            )}",
    "",
    "            {activeTab === 'latihan' && <ComprehensionSection {...COMPREHENSION} />}",
    "            {activeTab === 'kuis' && <QuizEngine items={QUIZ} onComplete={handleComplete} />}",
    "          </div>",
    "        </div>",
    "",
    '        <div className="sticky bottom-0 z-30 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3">',
    "          <button onClick={isCompleted ? () => navigate(-1) : handleComplete} className=\"w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all\" style={{ background: isCompleted ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#3B82F6,#2563EB)' }}>",
    "            {isCompleted ? '\u2705 Selesai (Kembali)' : '\u2705 Tandai Selesai'}",
    "          </button>",
    "        </div>",
    "      </div>",
    "    </>",
    "  );",
    "}",
  ];

  return lines.join('\n');
}

LESSONS.forEach(lesson => {

  const content = generateLesson(lesson);
  fs.writeFileSync(path.join(DIR, 'Lesson' + lesson.id + '.tsx'), content, 'utf8');
  console.log('Generated Lesson ' + lesson.id);
});


const PAGE_CONTENT = `import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';
import { CheckCircleIcon } from '../../../../../components/Icons';
import { getCompletedReadingLessons } from './readingUtils';

export default function ElementaryReadingPage() {
  const navigate = useNavigate();
  const completed = getCompletedReadingLessons();
  const total = 15;
  const progress = Math.round((completed.length / total) * 100) || 0;

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.reading" subtitleKey="skill.readingSub" />

        <div className="px-5 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl" />
            <div className="flex justify-between items-end mb-4 relative z-10">
              <div><h2 className="text-xl font-extrabold text-slate-800">Membaca (A2)</h2><p className="text-sm text-slate-500 font-medium mt-1">{completed.length} dari {total} bab selesai</p></div>
              <div className="text-right"><span className="text-3xl font-black text-blue-500">{progress}%</span></div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative z-10">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: \`\${progress}%\` }} />
            </div>
          </div>
        </div>

        <div className="px-5 mb-5 space-y-3">
          <h2 className="text-base font-extrabold text-slate-800 mb-4 px-1">Daftar Materi</h2>
          {[...Array(total)].map((_, i) => {
            const id = i + 1;
            const isCompleted = completed.includes(id);
            const isAvailable = true;

            return (
              <button key={id} disabled={!isAvailable} onClick={() => isAvailable && navigate(\`/modul/english/elementary/reading/lesson-\${id}\`)} className={\`w-full flex items-center justify-between p-4 rounded-2xl border transition-all \${isAvailable ? isCompleted ? 'border-green-100 bg-green-50 shadow-sm hover:border-green-300' : 'border-blue-100 bg-white shadow-sm cursor-pointer hover:border-blue-400' : 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'}\`}>
                <div className="flex items-center gap-4">
                  <div className={\`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm \${isCompleted ? 'bg-green-500 text-white' : isAvailable ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-400'}\`}>
                    {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : !isAvailable ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> : id}
                  </div>
                  <div className="text-left">
                    <h3 className={\`font-bold text-[15px] \${isAvailable ? 'text-slate-800' : 'text-slate-500'}\`}>A2 Reading • Latihan {id}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{isCompleted ? 'Tuntas' : '20 Latihan & Bacaan'}</p>
                  </div>
                </div>
                {isAvailable && !isCompleted && <div className="text-blue-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></div>}
              </button>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
}
`;

fs.writeFileSync(path.join(DIR, 'ElementaryReadingPage.tsx'), PAGE_CONTENT, 'utf8');

console.log('Script execution finished!');
