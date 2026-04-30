import React, { useState } from "react";
import LessonShell, { sectionVariants } from "../../../../../components/shared/LessonShell";
import { motion } from "framer-motion";
import { BookOpen, PenTool, CheckCircle2, XCircle, Volume2, Lightbulb, Info, Clock } from "lucide-react";
const CONVERSATION_SCENARIOS = [
  {
    id: "c1",
    title: "Waking Up & Alarm",
    context: "Membahas bangun terlambat.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Tom", text: "Did your alarm go off this morning?", translation: "Apakah alarmmu berbunyi pagi ini?" },
      { speaker: "B", name: "Jerry", text: "Yes, but I hit snooze three times.", translation: "Ya, tapi aku tekan tombol tunda tiga kali." },
      { speaker: "A", name: "Tom", text: "You will be late for work!", translation: "Kamu akan terlambat kerja!" },
      { speaker: "B", name: "Jerry", text: "I know. I need to get ready fast.", translation: "Aku tahu. Aku harus bersiap cepat-cepat." }
    ]
  },
  {
    id: "c2",
    title: "Morning Coffee Run",
    context: "Terburu-buru di pagi hari.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Sarah", text: "Do you have time for coffee?", translation: "Apa kamu punya waktu untuk ngopi?" },
      { speaker: "B", name: "Mike", text: "No, I am running really late.", translation: "Tidak, aku sangat terlambat." },
      { speaker: "A", name: "Sarah", text: "I can make it to-go for you.", translation: "Aku bisa buatkan untuk dibawa." },
      { speaker: "B", name: "Mike", text: "That would be amazing. Thanks!", translation: "Itu akan sangat membantu. Terima kasih!" }
    ]
  },
  {
    id: "c3",
    title: "The Commute",
    context: "Membicarakan lalu lintas.",
    level: "Formal",
    dialogue: [
      { speaker: "A", name: "Colleague", text: "How do you usually get to the office?", translation: "Biasanya naik apa ke kantor?" },
      { speaker: "B", name: "You", text: "I take the subway to avoid traffic.", translation: "Saya naik kereta bawah tanah untuk menghindari macet." },
      { speaker: "A", name: "Colleague", text: "Is it crowded in the morning?", translation: "Apakah ramai di pagi hari?" },
      { speaker: "B", name: "You", text: "Yes, it is packed. I rarely get a seat.", translation: "Ya, padat sekali. Saya jarang dapat tempat duduk." }
    ]
  },
  {
    id: "c4",
    title: "Arriving at Work",
    context: "Memulai hari kerja.",
    level: "Formal",
    dialogue: [
      { speaker: "A", name: "Boss", text: "Good morning. Have you checked your email?", translation: "Selamat pagi. Sudah cek email Anda?" },
      { speaker: "B", name: "Employee", text: "Not yet. I just arrived at my desk.", translation: "Belum. Saya baru saja sampai di meja saya." },
      { speaker: "A", name: "Boss", text: "We have a team meeting at 10 AM.", translation: "Kita ada rapat tim jam 10 pagi." },
      { speaker: "B", name: "Employee", text: "Okay, I will prepare the presentation now.", translation: "Baik, saya akan siapkan presentasinya sekarang." }
    ]
  },
  {
    id: "c5",
    title: "Lunch Break Routine",
    context: "Membahas kebiasaan makan siang.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Anna", text: "Where do you usually eat lunch?", translation: "Biasanya makan siang di mana?" },
      { speaker: "B", name: "Ben", text: "I usually bring a packed lunch from home.", translation: "Saya biasanya bawa bekal dari rumah." },
      { speaker: "A", name: "Anna", text: "That is healthy and saves money.", translation: "Itu sehat dan hemat uang." },
      { speaker: "B", name: "Ben", text: "Exactly. Do you want to eat together?", translation: "Tepat sekali. Mau makan bareng?" }
    ]
  },
  {
    id: "c6",
    title: "Housework & Chores",
    context: "Membagi tugas di rumah.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Mom", text: "It is your turn to do the dishes.", translation: "Giliranmu mencuci piring." },
      { speaker: "B", name: "Son", text: "I know, but I am so tired right now.", translation: "Aku tahu, tapi aku capek sekali sekarang." },
      { speaker: "A", name: "Mom", text: "If you wash, I will dry them.", translation: "Kalau kamu mencuci, ibu yang mengeringkan." },
      { speaker: "B", name: "Son", text: "Deal. Let's finish it quickly.", translation: "Setuju. Ayo selesaikan dengan cepat." }
    ]
  },
  {
    id: "c7",
    title: "Evening Relaxation",
    context: "Bersantai setelah kerja.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Friend 1", text: "How do you unwind after work?", translation: "Gimana caramu santai pulang kerja?" },
      { speaker: "B", name: "Friend 2", text: "I usually go for a run or read a book.", translation: "Biasanya aku lari atau baca buku." },
      { speaker: "A", name: "Friend 1", text: "I prefer watching Netflix on the sofa.", translation: "Aku lebih suka nonton Netflix di sofa." },
      { speaker: "B", name: "Friend 2", text: "That is also a good way to relax.", translation: "Itu juga cara bagus untuk bersantai." }
    ]
  },
  {
    id: "c8",
    title: "Grocery Shopping",
    context: "Mengecek kebutuhan.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Wife", text: "Do we need anything from the store?", translation: "Apa kita butuh sesuatu dari toko?" },
      { speaker: "B", name: "Husband", text: "We are out of milk and eggs.", translation: "Susu dan telur kita habis." },
      { speaker: "A", name: "Wife", text: "Okay, I will stop by the supermarket.", translation: "Oke, aku mampir ke supermarket." },
      { speaker: "B", name: "Husband", text: "Don't forget to buy bread too.", translation: "Jangan lupa beli roti juga." }
    ]
  },
  {
    id: "c9",
    title: "Weekend Plans",
    context: "Membicarakan rutinitas Sabtu.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Sam", text: "Do you have any plans for Saturday?", translation: "Ada rencana hari Sabtu?" },
      { speaker: "B", name: "Lily", text: "I usually clean the house in the morning.", translation: "Aku biasanya bersihin rumah pagi-pagi." },
      { speaker: "A", name: "Sam", text: "Boring! Let's go to the park instead.", translation: "Membosankan! Ayo ke taman saja." },
      { speaker: "B", name: "Lily", text: "Maybe in the afternoon. I have chores.", translation: "Mungkin sore. Aku ada tugas rumah." }
    ]
  },
  {
    id: "c10",
    title: "Late Night",
    context: "Begadang terlalu larut.",
    level: "Casual",
    dialogue: [
      { speaker: "A", name: "Dad", text: "Why are you still awake? It is midnight.", translation: "Kenapa masih bangun? Sudah tengah malam." },
      { speaker: "B", name: "Kid", text: "I can't sleep. I drank coffee too late.", translation: "Gak bisa tidur. Aku minum kopi kemalaman." },
      { speaker: "A", name: "Dad", text: "You should drink herbal tea next time.", translation: "Harusnya minum teh herbal lain kali." },
      { speaker: "B", name: "Kid", text: "Good idea. Good night, Dad.", translation: "Ide bagus. Selamat tidur, Yah." }
    ]
  }
];
const PRACTICE_QUESTIONS = [
  {
    id: 1,
    prompt: "I hit the ___ button because I wanted to sleep more.",
    options: [
      { text: "start", correct: false },
      { text: "snooze", correct: true },
      { text: "stop", correct: false }
    ],
    explanation: "Tombol 'snooze' pada jam alarm membiarkanmu tidur beberapa menit lagi."
  },
  {
    id: 2,
    prompt: "I take the subway to avoid ___.",
    options: [
      { text: "traffic", correct: true },
      { text: "people", correct: false },
      { text: "walking", correct: false }
    ],
    explanation: "Kereta bawah tanah berjalan di bawah tanah, jadi menghindari macet jalan raya."
  },
  {
    id: 3,
    prompt: "We are ___ of milk. We need to buy more.",
    options: [
      { text: "full", correct: false },
      { text: "off", correct: false },
      { text: "out", correct: true }
    ],
    explanation: "To be 'out of' something berarti kamu tidak punya sisanya lagi (habis)."
  },
  {
    id: 4,
    prompt: "I need to ___ after a long day at work.",
    options: [
      { text: "unwind", correct: true },
      { text: "unlock", correct: false },
      { text: "undo", correct: false }
    ],
    explanation: "'Unwind' berarti bersantai dan melepas stres."
  },
  {
    id: 5,
    prompt: "It is my ___ to wash the dishes.",
    options: [
      { text: "circle", correct: false },
      { text: "turn", correct: true },
      { text: "spin", correct: false }
    ],
    explanation: "'It is my turn' berarti ini waktuku/tanggung jawabku untuk melakukannya."
  }
];
const ElemSpeakingLesson1 = () => {
  const [activeScenario, setActiveScenario] = useState(CONVERSATION_SCENARIOS[0].id);
  const [practiceStep, setPracticeStep] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState(null);
  const [isPracticeChecked, setIsPracticeChecked] = useState(false);
  const currentScenario = CONVERSATION_SCENARIOS.find((c) => c.id === activeScenario) || CONVERSATION_SCENARIOS[0];
  const handlePlayAudio = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };
  const handleCheckPractice = (idx) => {
    if (isPracticeChecked) return;
    setSelectedPracticeOption(idx);
    setIsPracticeChecked(true);
  };
  const nextPractice = () => {
    if (practiceStep < PRACTICE_QUESTIONS.length - 1) {
      setPracticeStep((prev) => prev + 1);
      setIsPracticeChecked(false);
      setSelectedPracticeOption(null);
    } else {
      alert("Latihan Selesai! Kamu telah menguasai kosakata rutinitas harian.");
      setPracticeStep(0);
      setIsPracticeChecked(false);
      setSelectedPracticeOption(null);
    }
  };
  return /* @__PURE__ */ React.createElement(
    LessonShell,
    {
      title: "Kehidupan Sehari-hari & Rutinitas",
      subtitle: "Speaking \uFFFD Pelajaran 1",
      accentColor: "#E74C3C",
      tabs: [{ id: "learn", label: "Pelajari", icon: /* @__PURE__ */ React.createElement(BookOpen, { size: 14 }) }, { id: "practice", label: "Latihan", icon: /* @__PURE__ */ React.createElement(PenTool, { size: 14 }) }],
      footer: () => /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => window.history.back(),
          className: "w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg transition-all hover:opacity-90 active:scale-[0.98]",
          style: { background: "linear-gradient(135deg, #E74C3C, #E74C3Ccc)" }
        },
        /* @__PURE__ */ React.createElement(CheckCircle2, { size: 18 }),
        "Selesai"
      )
    },
    (tabId) => tabId === "learn" ? /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 md:p-8 space-y-8 pb-24 animate-fade-in" }, /* @__PURE__ */ React.createElement(
      motion.section,
      {
        custom: 0,
        variants: sectionVariants,
        initial: "hidden",
        animate: "visible",
        className: "bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden"
      },
      /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 p-4 opacity-20" }, /* @__PURE__ */ React.createElement(Clock, { className: "w-24 h-24" })),
      /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-2" }, "Kehidupan Sehari-hariku"), /* @__PURE__ */ React.createElement("p", { className: "text-sky-100 text-sm leading-relaxed mb-4" }, "Belajar membicarakan kebiasaan sehari-hari, dari bangun tidur hingga tidur malam, mengerjakan tugas rumah, dan perjalanan kerja."), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm" }, "40 Baris"), /* @__PURE__ */ React.createElement("span", { className: "bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm" }, "10 Situasi")))
    ), /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-[var(--color-text-primary)] mb-4 px-1" }, "Pilih Situasi"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 overflow-x-auto pb-4 no-scrollbar" }, CONVERSATION_SCENARIOS.map((scenario) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: scenario.id,
        onClick: () => setActiveScenario(scenario.id),
        className: `flex-shrink-0 px-5 py-3 rounded-xl border transition-all ${activeScenario === scenario.id ? "bg-slate-800 text-white border-slate-800 shadow-md transform scale-105" : "bg-white text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border)]"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: "block text-sm font-bold whitespace-nowrap" }, scenario.title),
      /* @__PURE__ */ React.createElement("span", { className: "block text-[10px] opacity-70 mt-0.5 text-left" }, scenario.level)
    )))), /* @__PURE__ */ React.createElement(
      motion.section,
      {
        custom: 1,
        variants: sectionVariants,
        initial: "hidden",
        animate: "visible",
        className: "bg-white rounded-[2rem] p-6 shadow-[var(--shadow-card)] border border-[var(--color-border)] min-h-[400px]"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-6 border-b border-slate-50 pb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-[var(--color-text-primary)]" }, currentScenario.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[var(--color-text-muted)] font-medium" }, currentScenario.context)), /* @__PURE__ */ React.createElement("div", { className: `px-3 py-1 rounded-full text-xs font-bold ${currentScenario.level === "Formal" ? "bg-purple-50 text-purple-600" : "bg-sky-50 text-sky-600"}` }, currentScenario.level)),
      /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, currentScenario.dialogue.map((line, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: `flex gap-4 ${line.speaker === "B" ? "flex-row-reverse" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-[var(--shadow-card)] ${line.speaker === "A" ? "bg-sky-100 text-sky-600" : "bg-indigo-100 text-indigo-600"}` }, line.speaker), /* @__PURE__ */ React.createElement("div", { className: `flex-1 max-w-[85%] group` }, /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-2xl relative ${line.speaker === "A" ? "bg-[var(--color-background)] text-[var(--color-text-primary)] rounded-tl-sm" : "bg-sky-50 text-sky-900 rounded-tr-sm"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-start gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-bold opacity-50 uppercase tracking-wide" }, line.name), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => handlePlayAudio(line.text),
          className: "text-[var(--color-text-muted)] hover:text-sky-600 transition-colors"
        },
        /* @__PURE__ */ React.createElement(Volume2, { size: 16 })
      )), /* @__PURE__ */ React.createElement("p", { className: "text-base font-medium leading-relaxed" }, line.text), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-[var(--color-text-muted)] mt-2 pt-2 border-t border-[var(--color-border)]/50 italic" }, line.translation))))))
    ), /* @__PURE__ */ React.createElement(
      motion.section,
      {
        custom: 2,
        variants: sectionVariants,
        initial: "hidden",
        animate: "visible",
        className: "bg-white rounded-[2rem] p-6 shadow-lg shadow-sky-900/5 border border-sky-100 relative overflow-hidden"
      },
      /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }),
      /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-sky-100 p-2 rounded-xl text-sky-700" }, /* @__PURE__ */ React.createElement(Lightbulb, { size: 24 })), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold text-[var(--color-text-primary)]" }, "Kuis Cepat")), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-xs font-bold text-[var(--color-text-muted)] mb-2 uppercase tracking-wide" }, /* @__PURE__ */ React.createElement("span", null, "Pertanyaan ", practiceStep + 1, " dari ", PRACTICE_QUESTIONS.length), /* @__PURE__ */ React.createElement("span", null, "Progres")), /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 bg-gray-100 rounded-full overflow-hidden" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "h-full bg-sky-500 transition-all duration-300",
          style: { width: `${(practiceStep + 1) / PRACTICE_QUESTIONS.length * 100}%` }
        }
      ))), /* @__PURE__ */ React.createElement("div", { className: "mb-8" }, /* @__PURE__ */ React.createElement("p", { className: "text-[var(--color-text-muted)] text-sm font-bold mb-2" }, "Isi bagian yang kosong:"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-[var(--color-text-primary)] leading-snug" }, PRACTICE_QUESTIONS[practiceStep].prompt)), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, PRACTICE_QUESTIONS[practiceStep].options.map((opt, idx) => {
        let btnClass = "border-[var(--color-border)] hover:border-sky-300 hover:bg-[var(--color-background)]";
        if (isPracticeChecked) {
          if (opt.correct) btnClass = "bg-green-50 border-green-500 text-green-700";
          else if (idx === selectedPracticeOption) btnClass = "bg-red-50 border-red-500 text-red-700";
          else btnClass = "opacity-50 border-[var(--color-border)]";
        } else if (selectedPracticeOption === idx) {
          btnClass = "border-sky-500 bg-sky-50 text-sky-700";
        }
        return /* @__PURE__ */ React.createElement(
          "button",
          {
            key: idx,
            onClick: () => handleCheckPractice(idx),
            disabled: isPracticeChecked,
            className: `w-full p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnClass}`
          },
          /* @__PURE__ */ React.createElement("span", null, opt.text),
          isPracticeChecked && opt.correct && /* @__PURE__ */ React.createElement(CheckCircle2, { size: 20 }),
          isPracticeChecked && idx === selectedPracticeOption && !opt.correct && /* @__PURE__ */ React.createElement(XCircle, { size: 20 })
        );
      })), isPracticeChecked && /* @__PURE__ */ React.createElement("div", { className: "mt-6 animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-xl text-sm mb-4 ${PRACTICE_QUESTIONS[practiceStep].options[selectedPracticeOption].correct ? "bg-green-50 text-green-800" : "bg-orange-50 text-orange-800"}` }, /* @__PURE__ */ React.createElement("span", { className: "font-bold block mb-1" }, PRACTICE_QUESTIONS[practiceStep].options[selectedPracticeOption].correct ? "Benar!" : "Penjelasan:"), PRACTICE_QUESTIONS[practiceStep].explanation), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: nextPractice,
          className: "w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        },
        "Skenario Berikutnya"
      )))
    ), /* @__PURE__ */ React.createElement(
      motion.section,
      {
        custom: 3,
        variants: sectionVariants,
        initial: "hidden",
        animate: "visible",
        className: "bg-indigo-50 rounded-2xl p-6 border border-indigo-100"
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ React.createElement(Info, { size: 24 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-indigo-900 mb-2" }, "Info Budaya"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-indigo-700 leading-relaxed" }, 'Di banyak tempat kerja Barat, orang mengobrol tentang akhir pekan mereka pada Senin pagi. Merupakan hal sopan untuk bertanya "How was your weekend?" sebelum memulai diskusi kerja.')))
    ))) : /* @__PURE__ */ React.createElement("div", { className: "p-8 text-center animate-fade-in" }, /* @__PURE__ */ React.createElement("p", { className: "text-[var(--color-text-secondary)]" }, "Latihan belum tersedia."))
  );
};
var Lesson1_default = ElemSpeakingLesson1;
export {
  Lesson1_default as default
};
