export type SectionId = 'Listening' | 'Structure' | 'Reading';

export type Question = {
  id: string;
  section: SectionId;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  passage?: string;
  skill?: string;
  instruction?: string;
  correction?: string;
  audioSrc?: string;
  audioLabel?: string;
};

export const ANSWER_PENDING = -1;
type AnswerLetter = 'A' | 'B' | 'C' | 'D';

const ANSWER_INDEX: Record<AnswerLetter, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

const KEY_EXPLANATION = 'Kunci jawaban resmi TOEFL Practice Test 2.';

const listeningAnswerLetters = [
  'C', 'C', 'A', 'D', 'B', 'C', 'A', 'B', 'D', 'B',
  'D', 'A', 'C', 'B', 'A', 'B', 'C', 'D', 'A', 'C',
  'D', 'B', 'B', 'B', 'D', 'C', 'D', 'C', 'C', 'A',
  'B', 'C', 'A', 'D', 'D', 'A', 'D', 'A', 'A', 'C',
  'B', 'A', 'B', 'C', 'B', 'D', 'B', 'A', 'D', 'C',
] as const satisfies readonly AnswerLetter[];

const structureAnswerLetters = [
  'A', 'B', 'A', 'D', 'C', 'D', 'A', 'B', 'C', 'A',
  'B', 'C', 'B', 'C', 'D', 'A', 'D', 'D', 'C', 'D',
  'A', 'C', 'B', 'D', 'D', 'A', 'D', 'C', 'C', 'B',
  'C', 'A', 'C', 'A', 'D', 'D', 'C', 'B', 'A', 'B',
] as const satisfies readonly AnswerLetter[];

const readingAnswerLetters = [
  'D', 'A', 'C', 'B', 'D', 'A', 'A', 'B', 'C', 'D',
  'B', 'A', 'A', 'D', 'B', 'C', 'A', 'D', 'A', 'B',
  'C', 'A', 'D', 'C', 'B', 'D', 'D', 'A', 'C', 'D',
  'B', 'C', 'A', 'D', 'B', 'B', 'C', 'A', 'B', 'B',
  'C', 'D', 'A', 'B', 'C', 'C', 'D', 'C', 'A', 'C',
] as const satisfies readonly AnswerLetter[];

function getAnswerFromKey(answerLetters: readonly AnswerLetter[], index: number) {
  const answerLetter = answerLetters[index];
  return answerLetter ? ANSWER_INDEX[answerLetter] : ANSWER_PENDING;
}

const listeningItems = [
  {
    "id": "tp2-l-1",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 1. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He closed the suitcase.",
      "He just left on a trip.",
      "He put the suitcase away.",
      "He packed his clothes."
    ]
  },
  {
    "id": "tp2-l-2",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 2. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He came too late to have lunch.",
      "He is going to eat dinner early.",
      "He's not very hungry.",
      "He's not going to eat anything."
    ]
  },
  {
    "id": "tp2-l-3",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 3. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She adjusted to college life easily.",
      "It was hard for her to get into college.",
      "She no longer attends college.",
      "It doesn't take her long to get to campus."
    ]
  },
  {
    "id": "tp2-l-4",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 4. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Encouraged.",
      "Indifferent.",
      "Insulted.",
      "Responsible."
    ]
  },
  {
    "id": "tp2-l-5",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 5. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Her mistakes weren't serious.",
      "She made mistakes because she rushed.",
      "She must hurry to the laboratory.",
      "Her work in the laboratory isn't finished."
    ]
  },
  {
    "id": "tp2-l-6",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 6. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "The post office.",
      "Monroe Street.",
      "The courthouse.",
      "Fourth Avenue."
    ]
  },
  {
    "id": "tp2-l-7",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 7. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He knew Lynn was majoring in economics.",
      "He doesn't think they have anything in common.",
      "He knows Mitch better than he knows Lynn.",
      "He's planning to study economics himself."
    ]
  },
  {
    "id": "tp2-l-8",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 8. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "How he's going to contact Tony.",
      "Why he needs to speak to Tony.",
      "Where he will meet Tony.",
      "When he's going to call Tony."
    ]
  },
  {
    "id": "tp2-l-9",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 9. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Prepared a meal.",
      "Went to a wedding.",
      "Shopped for groceries.",
      "Worked in a garden."
    ]
  },
  {
    "id": "tp2-l-10",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 10. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He's expecting guests.",
      "He can give the introduction.",
      "He's very well known.",
      "He'll be the main speaker."
    ]
  },
  {
    "id": "tp2-l-11",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 11. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Tea, not coffee.",
      "Either milk or sugar in her coffee.",
      "Nothing to drink right now.",
      "Black coffee without sugar."
    ]
  },
  {
    "id": "tp2-l-12",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 12. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "It was indeed exciting.",
      "It was too frightening.",
      "It was mildly interesting.",
      "It was extremely long."
    ]
  },
  {
    "id": "tp2-l-13",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 13. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He doesn't mind moving.",
      "He won't move for two weeks.",
      "He'd rather not be moving.",
      "He's decided not to move."
    ]
  },
  {
    "id": "tp2-l-14",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 14. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She may telephone Arthur.",
      "Perhaps rehearsal should be canceled.",
      "She can't practice any other evening",
      "Rehearsal has already been postponed."
    ]
  },
  {
    "id": "tp2-l-15",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 15. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Drink some more lemonade.",
      "Put on his glasses.",
      "Make a glass of lemonade.",
      "Buy some more fruit."
    ]
  },
  {
    "id": "tp2-l-16",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 16. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "It's near the entrance.",
      "He doesn't know where it is.",
      "It's not in this building.",
      "The directory doesn't list it."
    ]
  },
  {
    "id": "tp2-l-17",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 17. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "They're always expensive.",
      "They haven't been cleaned.",
      "They're inexpensive now.",
      "There aren't any available."
    ]
  },
  {
    "id": "tp2-l-18",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 18. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Have lunch with the man.",
      "Join a club.",
      "Skip the meeting.",
      "Walk with the man."
    ]
  },
  {
    "id": "tp2-l-19",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 19. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "It may take more than half an hour.",
      "The stadium is the best place to go now.",
      "The stadium will probably be only half full.",
      "It's not a good idea to hurry right now."
    ]
  },
  {
    "id": "tp2-l-20",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 20. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Joan is really an easygoing person.",
      "No one believes Joan.",
      "He's more easygoing than Joan.",
      "No one knows Joan as well as he does."
    ]
  },
  {
    "id": "tp2-l-21",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 21. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Its lyrics are hard to understand.",
      "It needs a stronger melody.",
      "It has become very popular.",
      "Its melody is hard to forget."
    ]
  },
  {
    "id": "tp2-l-22",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 22. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She has a stamp exactly like his.",
      "She knows a lot about stamps.",
      "She thinks the stamp is worthless.",
      "She's never seen this type of stamp."
    ]
  },
  {
    "id": "tp2-l-23",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 23. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "They must go to an orientation session.",
      "They are not new students.",
      "They won't be allowed to register.",
      "They were given the wrong schedule."
    ]
  },
  {
    "id": "tp2-l-24",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 24. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He lives a long way from a good library.",
      "Up to now, he hasn't had any problems.",
      "He's not happy with the quality of the research.",
      "When he's finished the project, he'll be happy."
    ]
  },
  {
    "id": "tp2-l-25",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 25. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "They're both working on a ship.",
      "They're taking summer vacations together.",
      "They own the same type of boat.",
      "They both have summer jobs."
    ]
  },
  {
    "id": "tp2-l-26",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 26. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She thinks Professor Fuller's class is boring.",
      "She doesn't know Professor Fuller.",
      "She agrees with the man's remark.",
      "She doesn't understand the man's comment."
    ]
  },
  {
    "id": "tp2-l-27",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 27. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She doesn't want to be photographed.",
      "The man can have the picture she took.",
      "Not all the pictures are good.",
      "The man may take her photograph."
    ]
  },
  {
    "id": "tp2-l-28",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 28. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "She loves all kinds of books.",
      "She doesn't read poetry anymore.",
      "She doesn't like all poetry.",
      "She writes many types of poems."
    ]
  },
  {
    "id": "tp2-l-29",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 29. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "In a few days.",
      "Before they eat.",
      "During lunch.",
      "When lunch is over."
    ]
  },
  {
    "id": "tp2-l-30",
    "sectionId": "listening-a",
    "prompt": "Part A - soal nomor 30. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "That the man had not bought the motorcycle.",
      "That the weather wouldn't be good today.",
      "That the man would ride to work today.",
      "That the man did not have to work today."
    ]
  },
  {
    "id": "tp2-l-31",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 31. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "He'd lost his driver's license.",
      "His identification wasn't acceptable.",
      "He didn't have his checkbook.",
      "The ticket office was closed."
    ]
  },
  {
    "id": "tp2-l-32",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 32. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "On campus.",
      "In the Midvale Shopping Mall.",
      "On Southland Parkway.",
      "Downtown."
    ]
  },
  {
    "id": "tp2-l-33",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 33. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "A passport.",
      "A check.",
      "A driver's license.",
      "A ticket."
    ]
  },
  {
    "id": "tp2-l-34",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 34. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Drive him to the concert.",
      "Cash his check.",
      "Sell him her tickets.",
      "Lend him some money."
    ]
  },
  {
    "id": "tp2-l-35",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 35. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Doctor and nurse.",
      "Librarian and library patron.",
      "Forest ranger and hiker.",
      "Nurse and patient."
    ]
  },
  {
    "id": "tp2-l-36",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 36. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Saturday.",
      "Sunday.",
      "Monday.",
      "Tuesday."
    ]
  },
  {
    "id": "tp2-l-37",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 37. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "An allergy to animals.",
      "A reaction to toxic chemicals.",
      "An allergy to food.",
      "Contact with a noxious plant."
    ]
  },
  {
    "id": "tp2-l-38",
    "sectionId": "listening-b",
    "prompt": "Part B - soal nomor 38. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Look at photographs in the library.",
      "Take a drug that prevents rashes.",
      "Avoid certain foods.",
      "Stay out of the woods."
    ]
  },
  {
    "id": "tp2-l-39",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 39. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "On a bus.",
      "At Crater Lake National Park.",
      "In a hotel.",
      "In Portland, Oregon."
    ]
  },
  {
    "id": "tp2-l-40",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 40. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Its mineral content.",
      "The reflection of blue sky in the water.",
      "The depth and clarity of the lake.",
      "Its low temperature."
    ]
  },
  {
    "id": "tp2-l-41",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 41. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "It rises rapidly when the snow melts.",
      "It stays more or less the same all year.",
      "It varies greatly from year to year.",
      "It drops quickly because of evaporation and seepage."
    ]
  },
  {
    "id": "tp2-l-42",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 42. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Communications",
      "Mining",
      "Transportation",
      "Journalism"
    ]
  },
  {
    "id": "tp2-l-43",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 43. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Nebraska",
      "California",
      "Utah",
      "Missouri"
    ]
  },
  {
    "id": "tp2-l-44",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 44. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "5",
      "10",
      "50",
      "200"
    ]
  },
  {
    "id": "tp2-l-45",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 45. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Useless",
      "Dangerous",
      "Boring",
      "High-paying"
    ]
  },
  {
    "id": "tp2-l-46",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 46. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "The invention of the telephone.",
      "The beginning of the Civil War.",
      "The expansion of the railroad system.",
      "The completion of the transcontinental telegraph."
    ]
  },
  {
    "id": "tp2-l-47",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 47. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "To urge the audience to attend a play.",
      "To introduce a speaker.",
      "To welcome some new members to a club.",
      "To describe opportunities in acting."
    ]
  },
  {
    "id": "tp2-l-48",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 48. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "At a meeting.",
      "During a drama class.",
      "At a rehearsal.",
      "During auditions for a play."
    ]
  },
  {
    "id": "tp2-l-49",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 49. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Performing in a television series.",
      "Directing a television commercial.",
      "Acting in a New York play.",
      "Appearing in a movie."
    ]
  },
  {
    "id": "tp2-l-50",
    "sectionId": "listening-c",
    "prompt": "Part C - soal nomor 50. Dengarkan audio, lalu pilih jawaban terbaik.",
    "options": [
      "Became president of the Drama Club.",
      "Studied in the Drama Department.",
      "Acted in campus plays.",
      "Directed a number of performances."
    ]
  }
] as const;

const structureItems = [
  {
    "id": "tp2-s-1",
    "sectionId": "structure",
    "prompt": "In 1793, Charles Newbold designed a cast iron plow that _______ than the wooden plows then in use.",
    "options": [
      "was more efficient",
      "was of more efficiency",
      "had more efficiency",
      "it was more efficient"
    ]
  },
  {
    "id": "tp2-s-2",
    "sectionId": "structure",
    "prompt": "_______ think of metallurgy as a modern field of science, but it is actually one of the oldest.",
    "options": [
      "Although many people",
      "Many people",
      "Many people who",
      "In spite of many people"
    ]
  },
  {
    "id": "tp2-s-3",
    "sectionId": "structure",
    "prompt": "Part of Jane Colden's work involved collecting plant specimens, cataloging plants, and _______ with other botanists.",
    "options": [
      "exchanging correspondence",
      "her exchange of correspondence",
      "correspondence exchanging",
      "correspondence was exchanged"
    ]
  },
  {
    "id": "tp2-s-4",
    "sectionId": "structure",
    "prompt": "The walls of arteries _______ into three layers.",
    "options": [
      "they divide",
      "dividing",
      "to be divided",
      "are divided"
    ]
  },
  {
    "id": "tp2-s-5",
    "sectionId": "structure",
    "prompt": "The art of storytelling is _______ humanity.",
    "options": [
      "as old",
      "old as",
      "as old as",
      "old"
    ]
  },
  {
    "id": "tp2-s-6",
    "sectionId": "structure",
    "prompt": "A cloud is a dense mass of _______ water vapor or ice particles.",
    "options": [
      "or",
      "whether",
      "both",
      "either"
    ]
  },
  {
    "id": "tp2-s-7",
    "sectionId": "structure",
    "prompt": "Centuries of erosion have exposed _______ rock surfaces in the Painted Desert of northern Arizona.",
    "options": [
      "rainbow-colored",
      "colored like a rainbow",
      "in colors of the rainbow",
      "a rainbow's coloring"
    ]
  },
  {
    "id": "tp2-s-8",
    "sectionId": "structure",
    "prompt": "Nellie Ross of Wyoming was the first woman _______ governor in the United States.",
    "options": [
      "who elected",
      "to be elected",
      "was elected",
      "her election as"
    ]
  },
  {
    "id": "tp2-s-9",
    "sectionId": "structure",
    "prompt": "Dry farming is a type of agriculture used in areas _______ less than 20 inches of rainfall.",
    "options": [
      "there are",
      "in which is",
      "where there is",
      "which has"
    ]
  },
  {
    "id": "tp2-s-10",
    "sectionId": "structure",
    "prompt": "Once known as the \"Golden State\" because of its gold mines, _______.",
    "options": [
      "North Carolina today mines few metallic minerals",
      "few metallic minerals are mined in North Carolina today",
      "there are few metallic minerals mined in North Carolina today",
      "today in North Carolina few metallic minerals are mined"
    ]
  },
  {
    "id": "tp2-s-11",
    "sectionId": "structure",
    "prompt": "Indoor heating systems have made _______ for people to live and work comfortably in temperate climates.",
    "options": [
      "possible that",
      "it possible",
      "possible",
      "it is possible"
    ]
  },
  {
    "id": "tp2-s-12",
    "sectionId": "structure",
    "prompt": "_______ of liquids through pipes.",
    "options": [
      "The flow controlled by valves",
      "For valves to control the flow",
      "Valves control the flow",
      "Controlled by valves, the flow"
    ]
  },
  {
    "id": "tp2-s-13",
    "sectionId": "structure",
    "prompt": "Honey is the only form of naturally occurring sugar that _______ to be refined before it can be eaten.",
    "options": [
      "has not",
      "does not have",
      "not having",
      "does not"
    ]
  },
  {
    "id": "tp2-s-14",
    "sectionId": "structure",
    "prompt": "_______ species of wild goats, only one, the Rocky Mountain goat, is native to North America.",
    "options": [
      "The ten",
      "Ten of the",
      "Of the ten",
      "There are ten"
    ]
  },
  {
    "id": "tp2-s-15",
    "sectionId": "structure",
    "prompt": "Snare drums produce a sharp, rattling sound _______.",
    "options": [
      "as striking",
      "when are struck",
      "struck",
      "when struck"
    ]
  },
  {
    "id": "tp2-s-16",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nMuch superstitions and symbols are connected with Halloween.",
    "options": [
      "Much",
      "superstitions",
      "are",
      "with"
    ]
  },
  {
    "id": "tp2-s-17",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nLuray Caverns in northern Virginia contain acres of colorful rock formations illumination by electric lights.",
    "options": [
      "northern",
      "acres",
      "colorful",
      "illumination"
    ]
  },
  {
    "id": "tp2-s-18",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nFurniture makers use glue to hold joints together and sometimes to reinforce it.",
    "options": [
      "to hold",
      "together",
      "sometimes",
      "it"
    ]
  },
  {
    "id": "tp2-s-19",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nAnthracite contains a higher percent of carbon than bituminous coal.",
    "options": [
      "contains",
      "higher",
      "percent",
      "carbon"
    ]
  },
  {
    "id": "tp2-s-20",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nSheep have been domesticated for over 5,000 years ago.",
    "options": [
      "Sheep",
      "domesticated",
      "over",
      "years ago"
    ]
  },
  {
    "id": "tp2-s-21",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe hard, out surface of the tooth is called enamel.",
    "options": [
      "out",
      "of",
      "the tooth",
      "is called"
    ]
  },
  {
    "id": "tp2-s-22",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nAneroid barometers are smaller than mercury barometers and are more easy to carry.",
    "options": [
      "are",
      "than",
      "more easy",
      "to carry"
    ]
  },
  {
    "id": "tp2-s-23",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nLiquids take the shape of any container which in they are placed.",
    "options": [
      "the shape",
      "which in",
      "they",
      "are placed"
    ]
  },
  {
    "id": "tp2-s-24",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe earliest form of artificial lighting was fire, which also provided warm and protection.",
    "options": [
      "artificial",
      "lighting",
      "also",
      "warm"
    ]
  },
  {
    "id": "tp2-s-25",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nPublishers of modern encyclopedias employ hundreds of specialists and large editorials staffs.",
    "options": [
      "encyclopedias",
      "hundreds",
      "specialists",
      "editorials"
    ]
  },
  {
    "id": "tp2-s-26",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nAutomobiles begun to be equipped with built-in radios around 1930.",
    "options": [
      "begun",
      "equipped with",
      "built-in",
      "around"
    ]
  },
  {
    "id": "tp2-s-27",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe thread used in knitting may be woolen yarn, cotton, or synthetic fabric such rayon.",
    "options": [
      "in",
      "may be",
      "or",
      "such"
    ]
  },
  {
    "id": "tp2-s-28",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nAll mammals have hair, but not always evident.",
    "options": [
      "All",
      "have",
      "but not",
      "always"
    ]
  },
  {
    "id": "tp2-s-29",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nAsparagus grows well in soil that is too much salty for most crops to grow.",
    "options": [
      "well",
      "that",
      "too much",
      "most"
    ]
  },
  {
    "id": "tp2-s-30",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nA professor of economic and history at Atlanta University, W. E. B. Du Bois promoted full racial equality.",
    "options": [
      "professor",
      "economic",
      "full",
      "equality"
    ]
  },
  {
    "id": "tp2-s-31",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nBubbles of air in ice cream make it soft and enough smooth to eat.",
    "options": [
      "of",
      "make it",
      "enough smooth",
      "to eat"
    ]
  },
  {
    "id": "tp2-s-32",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nHowever type of raw materials are used in making paper, the process is essentially the same.",
    "options": [
      "However",
      "materials",
      "in making",
      "the same"
    ]
  },
  {
    "id": "tp2-s-33",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nDucks are less susceptible to infection than another types of poultry.",
    "options": [
      "less",
      "to",
      "another",
      "poultry"
    ]
  },
  {
    "id": "tp2-s-34",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nLake Tahoe's great deep of 1,600 feet prevents it from freezing in the winter.",
    "options": [
      "deep",
      "feet",
      "it",
      "freezing"
    ]
  },
  {
    "id": "tp2-s-35",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nBy 1675, Boston was the home port for almost 750 ships, ranging in size between 30 to 250 tons.",
    "options": [
      "By",
      "home port",
      "ranging",
      "between"
    ]
  },
  {
    "id": "tp2-s-36",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe silk thread that spiders spin is much finer than the silk that it comes from silkworms.",
    "options": [
      "silk",
      "much",
      "finer",
      "it comes"
    ]
  },
  {
    "id": "tp2-s-37",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nNeedles are simple looking tools, but they are very relatively difficult to make.",
    "options": [
      "simple looking",
      "but they are",
      "very relatively",
      "to make"
    ]
  },
  {
    "id": "tp2-s-38",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nWinslow Homer, who had no formally training in art, became famous for his paintings of the sea and seacoast.",
    "options": [
      "who had",
      "formally",
      "famous for",
      "paintings"
    ]
  },
  {
    "id": "tp2-s-39",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe reflection of sunshines off snow can be so intense that it causes a condition known as \"snow blindness.\"",
    "options": [
      "sunshines",
      "off",
      "so intense",
      "it causes"
    ]
  },
  {
    "id": "tp2-s-40",
    "sectionId": "structure",
    "prompt": "Written Expression - pilih bagian yang harus diperbaiki.\n\nThe first rugs were made by the hand, and the finest ones are still handmade.",
    "options": [
      "The first",
      "by the hand",
      "finest ones",
      "still"
    ]
  }
] as const;

const readingItems = [
  {
    "id": "tp2-r-1",
    "sectionId": "reading",
    "prompt": "What is the author's main purpose in writing?",
    "options": [
      "To describe the tea trade in the 1840s",
      "To contrast clipper ships and steamships",
      "To discuss nineteenth-century shipbuilding techniques",
      "To provide a brief history of clipper ships"
    ],
    "passageTitle": "Clipper Ships",
    "passageText": "Clipper ships were the swiftest sailing ships that were ever put to sea and\nthe most beautiful. These ships had their days of glory in the 1840s and\n1850s. The first were built in Baltimore, but most were constructed in the\nshipyards of New England. It was Chinese tea that brought them into ex-\nistence. Tea loses its flavor quickly when stored in the hold of a vessel, and\nmerchants were willing to pay top prices for fast delivery. American ship-\nhuilders designed clippers to fill this need. Then came the California Gold\nRush of 1849, when clippers took gold seekers from the East Coast to the\nWest by way of Cape Horn.\nClippers were built for speed, and considerations of large carrying capacity\nand economical operation were sacrificed for this purpose. They had long,\nslender hulls with sharp bows. Their three slanted masts carried a huge cloud\nof canvas sail, including topgallants and royal sails, and sometimes skysails\nand moonrakers, to capture the power of the winds. They required a hard driving captain and a large, experienced crew.\nMany records were set by clippers. Sovereign of the Seas made it from San\nFrancisco to New York in eighty-two days. Flying Cloud did 374 miles in\none day. Lightning traveled from New York to Liverpool in thirteen days,\nand Ino made it from New York to Singapore in eighty-six days.\nSome 500 clippers were built in American shipyards. British yards turned\nout some twenty-seven tea clippers, as the British ships were called. Unlike\nthe wooden American ships, British clippers were \"composites\" with iron\nframes and wooden planking. The most famous tea clipper was the Cutty\nSark.\nBy 1860, the age of the clippers was fading. Gold diggings in California\nwere nearly exhausted. American investors found railroad building more\nprofitable than clippers. Most importantly, there was a technological inno-\nvation that doomed the clipper, and in fact, the entire age of sail:, the\ndevelopment of the steamship."
  },
  {
    "id": "tp2-r-2",
    "sectionId": "reading",
    "prompt": "Which of the following is closest in meaning to the word swiftest in line 1?",
    "options": [
      "Fastest",
      "Best armed",
      "Largest",
      "Most expensive"
    ]
  },
  {
    "id": "tp2-r-3",
    "sectionId": "reading",
    "prompt": "According to .the passage, where were the majority of clipper ships built?",
    "options": [
      "California",
      "Baltimore",
      "New England",
      "Great Britain"
    ]
  },
  {
    "id": "tp2-r-4",
    "sectionId": "reading",
    "prompt": "In line 5, the word vessel could best be replaced by which of the following?",
    "options": [
      "Container",
      "Ship",
      "Cargo",
      "Merchant"
    ]
  },
  {
    "id": "tp2-r-5",
    "sectionId": "reading",
    "prompt": "According to the passage, how did the California Gold Rush affect clipper ships?",
    "options": [
      "It encouraged the development of railroads, which competed directly with clipper ships.",
      "The newly discovered gold was used to finance the construction of new ships.",
      "It stimulated the demand for tea on the West Coast.",
      "People who wanted to participate in the Gold Rush became passengers on clipper ships."
    ]
  },
  {
    "id": "tp2-r-6",
    "sectionId": "reading",
    "prompt": "According to the passage, which of the following considerations was of the most importance to the owners of clipper ships?",
    "options": [
      "Maximum speed",
      "Reduced operating costs",
      "Increased cargo capacity",
      "Small crews"
    ]
  },
  {
    "id": "tp2-r-7",
    "sectionId": "reading",
    "prompt": "Which of the following is closest in meaning to the word slanted in line 12?",
    "options": [
      "Tilted",
      "Slerider",
      "Strengthened",
      "Towering"
    ]
  },
  {
    "id": "tp2-r-8",
    "sectionId": "reading",
    "prompt": "What can be inferred from the passage about skysails and moonrakers?",
    "options": [
      "Skysails were the highest sails on the mast, and moonrakers were the lowest.",
      "They were not always used on clipper ships.",
      "They were much larger than royal sails and topgallants.",
      "They were never used on clipper ships."
    ]
  },
  {
    "id": "tp2-r-9",
    "sectionId": "reading",
    "prompt": "According to the passage, the record for the fastest trip between New York and Liverpool was set by",
    "options": [
      "Sovereign of the Sea",
      "Flying Cloud",
      "Lightning",
      "Ino"
    ]
  },
  {
    "id": "tp2-r-10",
    "sectionId": "reading",
    "prompt": "It can be inferred from the passage that the tea clipper Cutty Sark",
    "options": [
      "was faster than most American clippers",
      "had more than three masts",
      "could be powered by steam as well as by sails",
      "had a metal frame and wooden planking"
    ]
  },
  {
    "id": "tp2-r-11",
    "sectionId": "reading",
    "prompt": "All of the following are given in the passage as reasons for the decline of clipper ships EXCEPT",
    "options": [
      "the end of the California Gold Rush",
      "competition with British tea clippers",
      "the development of steamships",
      "investment in railroads"
    ]
  },
  {
    "id": "tp2-r-12",
    "sectionId": "reading",
    "prompt": "In the next paragraph, the author will most likely discuss",
    "options": [
      "the beginnings of the age of steam",
      "railroad travel in the United States",
      "further developments in sailing ships",
      "the relationship between speed and ship design"
    ]
  },
  {
    "id": "tp2-r-13",
    "sectionId": "reading",
    "prompt": "What is the author's main purpose?",
    "options": [
      "To discuss the life and work of an American painter",
      "To compare the art of Ralph Earl and Thomas Gainsborough",
      "To trace Ralph Earl's artistic influences",
      "To describe the art scene in NewYork in the late eighteenth century"
    ],
    "passageTitle": "Ralph Earl, American Painter",
    "passageText": "Ralph Earl was born into a Connecticut farm family in 1751. He chose early\nto become a painter and looked for what training was available in his home\nstate and in Boston. Earl was one of the first American artists to paint\nlandscapes. Among his first paintings were scenes from the Revolutionary\nWar battles of Lexington and Concord. In 1778 Earl went to London to\nstudy with Benjamin West for four years.\nWhen Earl returned to the United States, he was jailed for fourteen\nmonths for outstanding debts. While still a prisoner, he painted portraits of\nsome of New York City's most elegant society women and their husbands.\nAfter his release, he took up the trade of itinerant portrait painter, working\nhis way through southern New England and New York. Earl didn't flatter\nhis subjects, but his portraits show a deep understanding of them, perhaps\nbecause he had sprung from the same roots.\nAmong Earl's most famous paintings is his portrait of Justice Oliver\nEllsworth and his wife, Abigail. To provide counterpoint to the severity of\nthe couple, he accurately details the relative luxury of the Ellsworth's interior\nfurnishings. The view through the window behind them shows sunlit fields,\nwell-kept fences, and a bend of the Connecticut River. One of Earl's paintings\nis something of an anomaly. Reclining Hunter, which.for many years was\nattributed to Thomas Gainsborough, shows a well-dressed gentleman resting\nbeneath a tree. In the foreground, he displays a pile of birds, the result of\na day's hunt. The viewer can also see a farmer's donkey lying in the back-\nground, another of the hunter's victims. This outrageously funny portrait\ncouldn't have been commissioned - no one would have wanted to be portrayed\nin such an absurd way. However, this painting uncharacteristically shows\nEarl's wit as well as his uncommon technical skills."
  },
  {
    "id": "tp2-r-14",
    "sectionId": "reading",
    "prompt": "Which of the following is NOT given in the passage as a subject of one of Earl's paintings?",
    "options": [
      "People",
      "Landscapes",
      "Battle scenes",
      "Fruit and flowers"
    ]
  },
  {
    "id": "tp2-r-15",
    "sectionId": "reading",
    "prompt": "According to the passage, Benjamin West was Ralph Earl's",
    "options": [
      "subject.",
      "teacher.",
      "student.",
      "rival."
    ]
  },
  {
    "id": "tp2-r-16",
    "sectionId": "reading",
    "prompt": "Which of the following could be substituted for outstanding (line 8) without changing the meaning of the sentence?",
    "options": [
      "Excellent",
      "Shocking",
      "Unpaid",
      "Illegal"
    ]
  },
  {
    "id": "tp2-r-17",
    "sectionId": "reading",
    "prompt": "The word itinerant in line 10 is closest in meaning to which of the following?",
    "options": [
      "Traveling",
      "Successful",
      "Talented",
      "Innovative"
    ]
  },
  {
    "id": "tp2-r-18",
    "sectionId": "reading",
    "prompt": "The author uses the phrase sprung from the same roots (lines 13) to indicate that Ralph Earl and his subjects",
    "options": [
      "lived in the same town",
      "were about the same age",
      "were equally successful",
      "had the same background"
    ]
  },
  {
    "id": "tp2-r-19",
    "sectionId": "reading",
    "prompt": "According to the passage, one of the distinguishing features of the portrait of Oliver and Abigail Ellsworth is the contrast between",
    "options": [
      "the plainness of the figures and the luxury of the furnishings",
      "the two styles used to paint the two figures",
      "the sunlit fields and the dark interior",
      "the straight fences and the curving Connecticut River"
    ]
  },
  {
    "id": "tp2-r-20",
    "sectionId": "reading",
    "prompt": "Why does the author refer to Reclining Hunter as \"something of an anomaly\" in line 19?",
    "options": [
      "It is so severe.",
      "It is quite humorous.",
      "It shows Earl's talent.",
      "It was commissioned."
    ]
  },
  {
    "id": "tp2-r-21",
    "sectionId": "reading",
    "prompt": "The word he in line 21 refers to",
    "options": [
      "Ralph Earl",
      "the farmer",
      "the hunter",
      "Thomas Gainsborough"
    ]
  },
  {
    "id": "tp2-r-22",
    "sectionId": "reading",
    "prompt": "The author's attitude toward Ralph Earl is",
    "options": [
      "admiring",
      "antagonistic",
      "neutral",
      "unflattering"
    ]
  },
  {
    "id": "tp2-r-23",
    "sectionId": "reading",
    "prompt": "Which of the following statements describes the organization of the passage?",
    "options": [
      "A popular notion is refuted.",
      "A generalization is made, and examples of it are given.",
      "The significance of an experiment is explained.",
      "A phenomenon is described, and a possible explanation is proposed."
    ],
    "passageTitle": "Mysterious Flashes of Light on the Moon",
    "passageText": "For centuries, sky watchers have reported seeing mysterious flashes of light\non the surface of the Moon. Modern astronomers have observed the same\nphenomenon, but no one has been able to satisfactorily explain how or why\nthe Moon sporadically sparks. However, researchers now believe they have\nfound the cause.\nResearchers have examined the chemnical content of Moon rocks retrieved\nby astronauts during the Apollo missions and have found that they contain\nvolatile gases such as helium, hydrogen, and argon. The researchers suggest\nthat stray electrons, freed when the rock cracks, may ignite these gases.\nIndeed, lunar rock samples, when fractured in the lab, throw off sparks.\nWhat causes these rocks to crack on the lunar surface? The flashes are\nmost often seen at the borders between sunlight and shade on the Moon,\nwhere the surface is being either intensely heated or cooled. A sudden\nchange in temperature may cause thermal cracking. Another possibility is\nthat meteors may strike the rocks and cause them to crack. Finally, lunar\nrocks may be fractured by seismic events - in other words, by tiny moonquakes."
  },
  {
    "id": "tp2-r-24",
    "sectionId": "reading",
    "prompt": "According to the passage, how long have people been aware of the mysterious lights on the moon?",
    "options": [
      "For the last ten years",
      "Since the Apollo moon missions",
      "For hundreds of years",
      "For thousands of years"
    ]
  },
  {
    "id": "tp2-r-25",
    "sectionId": "reading",
    "prompt": "The word sporadically (line 4) is closest in meaning to which of the following?",
    "options": [
      "Reputedly",
      "Occasionally",
      "Mysteriously",
      "Constantly"
    ]
  },
  {
    "id": "tp2-r-26",
    "sectionId": "reading",
    "prompt": "According to the passage, the theory that Moon rocks give off sparks when they crack is supported by",
    "options": [
      "a telescopic study of the Moon",
      "experiments conducted by astronauts",
      "observations made centuries ago",
      "an analysis of rocks from the Moon"
    ]
  },
  {
    "id": "tp2-r-27",
    "sectionId": "reading",
    "prompt": "In line 7, the word they refers to",
    "options": [
      "helium, hydrogen, and argon",
      "researchers",
      "Apollo spacecraft",
      "lunar rocks"
    ]
  },
  {
    "id": "tp2-r-28",
    "sectionId": "reading",
    "prompt": "The word stray in line 9 is closest in meaning to which of the following?",
    "options": [
      "Loose",
      "Speeding",
      "Fiery",
      "Spinning"
    ]
  },
  {
    "id": "tp2-r-29",
    "sectionId": "reading",
    "prompt": "Which of the following situations is an example of \"thermal cracking\" as described in the passage?",
    "options": [
      "A dam breaks when water rises behind it.",
      "A stone cracks open because of the pressure of tree roots.",
      "A cool glass breaks when it is filled with boiling water.",
      "An ice cube melts in the heat of the sun."
    ]
  },
  {
    "id": "tp2-r-30",
    "sectionId": "reading",
    "prompt": "All of the following are given as reasons for Moon rocks cracking EXCEPT",
    "options": [
      "seismic actions",
      "sudden temperature changes",
      "the action of meteors",
      "the pressure of gases"
    ]
  },
  {
    "id": "tp2-r-31",
    "sectionId": "reading",
    "prompt": "What is the author's main purpose in writing this passage?",
    "options": [
      "To trace the career of Amnold Guyot",
      "To describe one feature of the undersea world",
      "To present the results of recent geologic research",
      "To discuss underwater ridges and volcano chains"
    ],
    "passageTitle": "Guyots: Flat-topped Seamounts",
    "passageText": "In addition to the great ridges and volcanic chains, the oceans conceal\nanother form of undersea mountains : the strange guyot, or flat-topped\nseamount. No marine geologist even suspected the existence of these isolated\nmountains until they were discovered by geologist Harry H. Hess in 1946.\nHe was serving at the time as a naval officer on a ship equipped with a\nfathometer. Hess named these truncated peaks for the nineteenth-century\nSwiss-born geologist Arnold Guyot, who had served on the faculty of Princeton\nUniversity for thirty years. Since then, hundreds of guyots have been dis-\ncovered in every ocean but the Arctic. Like offshore canyons, guyots present\na challenge to oceanographic theory.\nThey are believed to be extinct volcanoes. Their flat tops indicate that they once stood above or just below the surface, where the action of waves leveled off their peaks. Yet today, by\ndefinition, their summits are at least 600 feet below the surface, and some\nare as deep as 8,200 feet. Most lie between 3,200 feet and 6,500 feet. Their\ntops are not really flat but slope upward to a low pinnacle at the center.\nDredging from the tops of guyots has recovered basalt and coral rubble, and\nthat would be expected from the eroded tops of what were once islands.\nSome of this material is over 80 million years old. Geologists think the\ndrowning of the guyots involved two processes: The great weight of the volcanic mountains depressed the sea floor beneath them, and the level of\nthe sea rose a number of times, especially when the last Ice Age ended,\nsome 8,000 to 11,000 years ago."
  },
  {
    "id": "tp2-r-32",
    "sectionId": "reading",
    "prompt": "The word conceal in line 1 is closest in meaning to which of the follow- ing?",
    "options": [
      "Contain",
      "Erode",
      "Hide",
      "Create"
    ]
  },
  {
    "id": "tp2-r-33",
    "sectionId": "reading",
    "prompt": "The passage implies that guyots were first detected by means of",
    "options": [
      "a fathometer",
      "computer analysis",
      "a deep-sea diving expedition",
      "research submarines"
    ]
  },
  {
    "id": "tp2-r-34",
    "sectionId": "reading",
    "prompt": "The author indicates that Arnold Guyot",
    "options": [
      "was Harry Hess's instructor",
      "invented the fathometer",
      "named the guyot after himself",
      "taught at Princeton University"
    ]
  },
  {
    "id": "tp2-r-35",
    "sectionId": "reading",
    "prompt": "What does the passage say about the Arctic Ocean?",
    "options": [
      "The first guyot was discovered there.",
      "No guyots have ever been found there.",
      "There are more guyots there than in any other ocean.",
      "It is impossible that guyots were ever formed there."
    ]
  },
  {
    "id": "tp2-r-36",
    "sectionId": "reading",
    "prompt": "The author states that offshore canyons and guyots have which of the following characteristics in common?",
    "options": [
      "Both are found on the ocean floor near continental shelves.",
      "Both present oceanographers with a mystery.",
      "Both were formed by volcanic activity.",
      "Both were, at one time, above the surface of the sea."
    ]
  },
  {
    "id": "tp2-r-37",
    "sectionId": "reading",
    "prompt": "According to the passage, most guyots are found at a depth of",
    "options": [
      "less than 600 feet.",
      "between 600 and 3,200 feet.",
      "between 3,200 and 6,500 feet.",
      "more than 8,200 feet."
    ]
  },
  {
    "id": "tp2-r-38",
    "sectionId": "reading",
    "prompt": "Which of the following is closest in meaning to the word rubble in line 16?",
    "options": [
      "Fragments",
      "Mixture",
      "Columns",
      "Core"
    ]
  },
  {
    "id": "tp2-r-39",
    "sectionId": "reading",
    "prompt": "Which of the following is the best depiction of the top of a guyot?",
    "options": [
      "A perfectly flat, level top",
      "A gently rounded top that slopes up to a low pinnacle at the center",
      "A sharp, cone-shaped peak",
      "A top with a central depression (concave)"
    ]
  },
  {
    "id": "tp2-r-40",
    "sectionId": "reading",
    "prompt": "According to the passage, which of the following two processes were involved in the submersion of guyots?",
    "options": [
      "Erosion and volcanic activity",
      "The sinking of the sea floor and the rising of sea level",
      "Mountain building and the ac- tion of ocean currents",
      "High tides and earthquakes"
    ]
  },
  {
    "id": "tp2-r-41",
    "sectionId": "reading",
    "prompt": "According to the passage, when did sea level significantly rise?",
    "options": [
      "In 1946",
      "In the nineteenth century",
      "From 8,000 to 11,000 years ago",
      "80 million years ago"
    ]
  },
  {
    "id": "tp2-r-42",
    "sectionId": "reading",
    "prompt": "What is the main topic of the passage?",
    "options": [
      "The importance of the Seneca Falls Convention",
      "The role of women in World War",
      "The effects of the Nineteenth Amendment",
      "The campaign by American women to secure the vote"
    ],
    "passageTitle": "The American Women's Suffrage Movement",
    "passageText": "The demand for the vote by American women was first formulated in earnest\nat the Seneca Falls Convention in upstate New York in 1848. After the\nCivil War, agitation for women's suffrage increased. Suffragists Susan B.\nAnthony and Julia Ward Harris founded the National Women's Suffrage\nAssociation to work on the federal level. Lucy Stone created the American\nWomen's Suffrage Association, which worked to secure the ballot through\nstate legislation. In 1890, the two groups united to form the National Ameri-\ncan Women's Suffrage Association (NAWSA). While still a territory, Wyo-\nming enfranchised women in 1869. The first state to enfranchise women\nwas Utah in 1870; the second was Colorado in 1893. By 1920, women were\nvoting in all the Western states except New Mexico.\nAs the pioneer suffragists withdrew from the movement, younger women\nassumed leadership. One of the most astute was Carrie Chapmann Catt,\nwho was named president of NAWSA in 1915. Another prominent suffragist\nwas Alice Paul. Forced to resign from NAWSA because of her insistence\non direct-action techniques, she organized the National Women's Party,\nwhich used such tactics as mass marches and hunger strikes.\nEconomics and the role played by women in World War I also contributed\nto the success of the drive. Women were surging into the workforce. In\n1900, there were 3 million working women. By 1915, there were 8 million.\nDuring the war, women moved into jobs that had once been the province.\nof men.\nIn 1918, the House of Representatives passed the Nineteenth Amend-\nment, which removed voting discrimination on the basis of gender. The\nSenate voted for it the following year. In August 1920, the amendment\nbecame law. The 1920 presidential election was thus the first in which\nwomen voted. Like men, they voted overwhelmingly for Warren G. Harding."
  },
  {
    "id": "tp2-r-43",
    "sectionId": "reading",
    "prompt": "The phrase in earnest in line 1 is closest in meaning to",
    "options": [
      "seriously",
      "originally",
      "theoretically",
      "primarily"
    ]
  },
  {
    "id": "tp2-r-44",
    "sectionId": "reading",
    "prompt": "According to the passage, how did the National Women's Suffrage Association differ from the American Women's Suffrage Association?",
    "options": [
      "It advocated direct-action techniques rather than indirect tactics.",
      "It tried to achieve change at the national level rather than at the state level.",
      "It had more members and more power.",
      "Its members were generally older women rather than younger women."
    ]
  },
  {
    "id": "tp2-r-45",
    "sectionId": "reading",
    "prompt": "Women first won the right to vote in",
    "options": [
      "Utah",
      "Colorado",
      "the Wyoming territory",
      "New Mexico"
    ]
  },
  {
    "id": "tp2-r-46",
    "sectionId": "reading",
    "prompt": "Which of the following is closest in meaning to the phrase most astute in line 13?",
    "options": [
      "Most independent",
      "Youngest",
      "Cleverest",
      "Most experienced"
    ]
  },
  {
    "id": "tp2-r-47",
    "sectionId": "reading",
    "prompt": "According to the passage, which of the following women formed the National Women's Party?",
    "options": [
      "Susan B. Anthony and Julia Ward Harris",
      "Lucy Stone",
      "Carrie Chapmann Catt",
      "Alice Paul"
    ]
  },
  {
    "id": "tp2-r-48",
    "sectionId": "reading",
    "prompt": "The author uses the word province (line 21) to refer to",
    "options": [
      "a region of the country",
      "a group of people with similar backgrounds",
      "a sphere of activity reserved for a certain group",
      "a specific era of history"
    ]
  },
  {
    "id": "tp2-r-49",
    "sectionId": "reading",
    "prompt": "What does the passage imply about Warren G. Harding?",
    "options": [
      "He was elected president in 1920.",
      "He first entered politics in the1920 election.",
      "He strongly supported women's voting rights.",
      "He was favored by women voters but not by men."
    ]
  },
  {
    "id": "tp2-r-50",
    "sectionId": "reading",
    "prompt": "Where in the passage does the author specifically mention the growth of women in the work force?",
    "options": [
      "Lines 3 - 5",
      "Lines 12 - 13",
      "Lines 19 - 20",
      "Lines 23 - 24"
    ]
  }
] as const;

function getListeningPart(sectionId: string) {
  if (sectionId === 'listening-b') return 'Part B';
  if (sectionId === 'listening-c') return 'Part C';
  return 'Part A';
}

function getListeningAudio(sectionId: string) {
  if (sectionId === 'listening-b') return '/toefl/practice2/CD1-Track05.mp3';
  if (sectionId === 'listening-c') return '/toefl/practice2/CD1-Track06.mp3';
  return '/toefl/practice2/CD1-Track04.mp3';
}

const listeningQuestions: Question[] = listeningItems.map((item, index) => {
  const part = getListeningPart(item.sectionId);
  return {
    id: item.id,
    section: 'Listening',
    prompt: item.prompt,
    options: [...item.options],
    answer: getAnswerFromKey(listeningAnswerLetters, index),
    explanation: KEY_EXPLANATION,
    skill: part,
    instruction: 'Dengarkan audio TOEFL Practice 2, lalu pilih jawaban terbaik.',
    audioSrc: getListeningAudio(item.sectionId),
    audioLabel: `TOEFL Practice 2 - ${part}`,
  };
});

const structureQuestions: Question[] = structureItems.map((item, index) => {
  const isWrittenExpression = item.prompt.startsWith('Written Expression');
  return {
    id: item.id,
    section: 'Structure',
    prompt: item.prompt,
    options: [...item.options],
    answer: getAnswerFromKey(structureAnswerLetters, index),
    explanation: KEY_EXPLANATION,
    skill: isWrittenExpression ? 'Written Expression' : 'Sentence Completion',
    instruction: isWrittenExpression
      ? 'Identify the one underlined word or phrase that must be changed for the sentence to be correct.'
      : 'Choose the word or phrase that best completes the sentence.',
  };
});

const readingQuestions: Question[] = [];
let activePassageTitle = '';
let activePassageText = '';

for (const [index, item] of readingItems.entries()) {
  if ('passageTitle' in item && item.passageTitle) activePassageTitle = item.passageTitle;
  if ('passageText' in item && item.passageText) activePassageText = item.passageText;

  readingQuestions.push({
    id: item.id,
    section: 'Reading',
    prompt: item.prompt,
    options: [...item.options],
    answer: getAnswerFromKey(readingAnswerLetters, index),
    explanation: KEY_EXPLANATION,
    passage: activePassageText ? `${activePassageTitle}\n\n${activePassageText}` : undefined,
    skill: 'Reading Comprehension',
    instruction: 'Read the passage and choose the best answer.',
  });
}

export const toeflPractice2Questions: Question[] = [
  ...listeningQuestions,
  ...structureQuestions,
  ...readingQuestions,
];
