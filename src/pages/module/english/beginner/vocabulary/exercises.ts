
import type { Question } from './QuizSection';

export const LESSON_EXERCISES: Record<number, Question[]> = {
    1: [
        {
            question: "Which greeting is most appropriate to use at 8:00 AM?",
            options: ["Good afternoon", "Good night", "Good morning", "Good evening"],
            correctAnswer: "Good morning",
            explanation: "Good morning is used from sunrise until noon (12:00 PM)."
        },
        {
            question: "When meeting someone for the first time, what do you usually say?",
            options: ["Goodbye", "Nice to meet you", "See you later", "I'm sorry"],
            correctAnswer: "Nice to meet you",
            explanation: "Nice to meet you is the standard polite phrase used when introduced to someone new."
        },
        {
            question: "Which of these is an INFORMAL greeting?",
            options: ["Good morning", "Hello", "Hi", "Good evening"],
            correctAnswer: "Hi",
            explanation: "Hi is casual and informal, suitable for friends and family. Hello is more neutral/formal."
        },
        {
            question: "You are leaving your friend. What do you say?",
            options: ["Hello", "Nice to meet you", "Goodbye", "Good morning"],
            correctAnswer: "Goodbye",
            explanation: "Goodbye is a farewell phrase used when leaving."
        },
        {
            question: "What is the correct response to 'How are you?'",
            options: ["I am fine, thanks", "My name is John", "Nice to meet you", "Good night"],
            correctAnswer: "I am fine, thanks",
            explanation: "When asked about your well-being, 'I am fine, thanks' is a standard polite response."
        },
        {
            question: "When is 'Good evening' typically used?",
            options: ["At 10:00 AM", "At 2:00 PM", "At 7:00 PM", "At 11:00 PM (when sleeping)"],
            correctAnswer: "At 7:00 PM",
            explanation: "Good evening is used roughly from 6:00 PM onwards until you say good night to sleep or leave."
        },
        {
            question: "What does 'See you later' mean?",
            options: ["Selamat pagi", "Sampai jumpa lagi", "Terima kasih", "Maaf"],
            correctAnswer: "Sampai jumpa lagi",
            explanation: "See you later translates to 'Sampai jumpa lagi' in Indonesian."
        },
        {
            question: "If someone says 'Thank you', you should reply:",
            options: ["No problem", "You're welcome", "It's okay", "All of the above"],
            correctAnswer: "All of the above",
            explanation: "You're welcome is the most standard, but No problem and It's okay are also common responses."
        },
        {
            question: "Which phrase is used to ask for someone's name?",
            options: ["Who are you?", "What is your name?", "Call me...", "He is..."],
            correctAnswer: "What is your name?",
            explanation: "What is your name? is the polite and standard question to ask for a name."
        },
        {
            question: "Which greeting is used specifically before going to sleep?",
            options: ["Good evening", "Good afternoon", "Good night", "Goodbye"],
            correctAnswer: "Good night",
            explanation: "Good night is used exclusively as a farewell at night or before sleeping."
        },
        {
            question: "Formal way to say 'Hello' is:",
            options: ["Hi", "Hey", "Hello", "Yo"],
            correctAnswer: "Hello",
            explanation: "Hello is the standard greeting acceptable in formal situations, unlike Hi or Hey."
        },
        {
            question: "Translate: 'Senang bertemu denganmu'",
            options: ["Nice to meet you", "Good luck", "See you", "Welcome"],
            correctAnswer: "Nice to meet you",
            explanation: "The direct translation of Senang bertemu denganmu is Nice to meet you."
        },
        {
            question: "It is 2:00 PM. How do you greet your teacher?",
            options: ["Good morning", "Good afternoon", "Good evening", "Good night"],
            correctAnswer: "Good afternoon",
            explanation: "From 12:00 PM to roughly 6:00 PM, we use Good afternoon."
        },
        {
            question: "How do you say 'Maaf' in English?",
            options: ["Excuse me", "Please", "I'm sorry", "Thank you"],
            correctAnswer: "I'm sorry",
            explanation: "I'm sorry is used to apologize. Excuse me is for getting attention or passing by."
        },
        {
            question: "How do you say 'Permisi' in English?",
            options: ["Excuse me", "Sorry", "Hello", "Bye"],
            correctAnswer: "Excuse me",
            explanation: "Excuse me is the polite way to say Permisi."
        },
        {
            question: "Someone says 'Good morning'. You reply:",
            options: ["Good night", "Good morning", "Yes", "Fine"],
            correctAnswer: "Good morning",
            explanation: "Usually you repeat the greeting back to them."
        },
        {
            question: "'Please' in Indonesian is:",
            options: ["Silakan / Tolong", "Terima kasih", "Maaf", "Halo"],
            correctAnswer: "Silakan / Tolong",
            explanation: "Please can mean Tolong (request) or Silakan (offer)."
        },
        {
            question: "To introduce yourself, you start with:",
            options: ["Her name is...", "My name is...", "You are...", "He is..."],
            correctAnswer: "My name is...",
            explanation: "When introducing yourself, you use the first person possessive 'My'."
        },
        {
            question: "Which of these is NOT a greeting?",
            options: ["Hi", "Hello", "Goodbye", "Good morning"],
            correctAnswer: "Goodbye",
            explanation: "Goodbye is a farewell (parting words), not a greeting (meeting words)."
        },
        {
            question: "Formal version of 'Bye' is:",
            options: ["See ya", "Later", "Goodbye", "Cheerio"],
            correctAnswer: "Goodbye",
            explanation: "Goodbye is the full, formal form. Bye is informal."
        }
    ],
    2: [
        {
            question: "How many letters are in the English alphabet?",
            options: ["20", "26", "24", "28"],
            correctAnswer: "26",
            explanation: "There are 26 letters in the English alphabet (A-Z)."
        },
        {
            question: "Which of these is a vowel (huruf vokal)?",
            options: ["B", "K", "A", "Z"],
            correctAnswer: "A",
            explanation: "The vowels are A, E, I, O, U."
        },
        {
            question: "Which of these is a consonant (huruf konsonan)?",
            options: ["E", "I", "M", "U"],
            correctAnswer: "M",
            explanation: "M is a consonant. E, I, U are vowels."
        },
        {
            question: "How do you spell 'CAT'?",
            options: ["See-Ay-Tee", "Kay-Ah-Te", "Ce-A-Te", "Si-Ei-Ti"],
            correctAnswer: "See-Ay-Tee",
            explanation: "In English pronunciation: C (/siː/), A (/eɪ/), T (/tiː/)."
        },
        {
            question: "What comes after the letter 'H'?",
            options: ["G", "I", "J", "F"],
            correctAnswer: "I",
            explanation: "The order is ... F, G, H, I, J ..."
        },
        {
            question: "Which letter sounds like 'Eye'?",
            options: ["A", "E", "I", "Y"],
            correctAnswer: "I",
            explanation: "The letter I is pronounced /aɪ/ which sounds like 'Eye'."
        },
        {
            question: "How is 'Z' acceptedly pronounced in American English?",
            options: ["Zed", "Zee", "Zet", "Zi"],
            correctAnswer: "Zee",
            explanation: "In US English, Z is pronounced 'Zee'. In UK English, it is 'Zed'."
        },
        {
            question: "Spell the word 'BOOK'.",
            options: ["Bee-Oh-Oh-Kay", "Bi-Ou-Ou-Key", "Be-O-O-Ka", "Bee-Double O-Kay"],
            correctAnswer: "Bee-Double O-Kay",
            explanation: "Commonly we say 'Double O' for OO, or Bee-Oh-Oh-Kay."
        },
        {
            question: "What is the 5th letter of the alphabet?",
            options: ["D", "E", "F", "C"],
            correctAnswer: "E",
            explanation: "A(1), B(2), C(3), D(4), E(5)."
        },
        {
            question: "How do you ask someone to spell their name?",
            options: ["Spell it!", "Can you spell your name, please?", "Write your name", "What is spelling?"],
            correctAnswer: "Can you spell your name, please?",
            explanation: "This is the polite way to ask for spelling."
        },
        {
            question: "The letter 'Y' is sometimes considered a:",
            options: ["Vowel", "Consonant", "Both", "Number"],
            correctAnswer: "Vowel",
            explanation: "Y acts as a vowel in words like 'Sky' or 'Happy'."
        },
        {
            question: "Which letter is silent in the word 'Knife'?",
            options: ["K", "n", "i", "f"],
            correctAnswer: "K",
            explanation: "Knife is pronounced /naɪf/. The K is silent."
        },
        {
            question: "What comes before the letter 'M'?",
            options: ["L", "N", "K", "O"],
            correctAnswer: "L",
            explanation: "The order is J, K, L, M, N."
        },
        {
            question: "How is 'G' pronounced?",
            options: ["Jee", "Gay", "Gee", "Gi"],
            correctAnswer: "Gee",
            explanation: "G is pronounced /dʒiː/ (Gee)."
        },
        {
            question: "How is 'J' pronounced?",
            options: ["Gay", "Jay", "Jee", "Ji"],
            correctAnswer: "Jay",
            explanation: "J is pronounced /dʒeɪ/ (Jay)."
        },
        {
            question: "Spell your 'Surname' means:",
            options: ["Eja nama depanmu", "Eja nama marga/belakangmu", "Eja namamu", "Tuliskan nama"],
            correctAnswer: "Eja nama marga/belakangmu",
            explanation: "Surname means family name or last name."
        },
        {
            question: "Which pair rhymes?",
            options: ["A and B", "B and C", "C and G", "All of the above"],
            correctAnswer: "All of the above",
            explanation: "B, C, D, E, G, P, T, V, Z(US) all rhyme with the 'ee' sound."
        },
        {
            question: "Which letter sounds like a vegetable 'Pea'?",
            options: ["P", "B", "C", "D"],
            correctAnswer: "P",
            explanation: "The letter P is pronounced /piː/, exactly like the vegetable pea."
        },
        {
            question: "Which word starts with a Vowel?",
            options: ["Union", "Apple", "Hour", "Yellow"],
            correctAnswer: "Apple",
            explanation: "Apple starts with 'A' and makes a vowel sound. Union starts with a 'Y' sound (/j/). Hour starts with a vowel sound but 'H' is consonant letter (tricky context, but Apple is clearest)."
        },
        {
            question: "Q is always followed by which letter in English words?",
            options: ["W", "U", "I", "O"],
            correctAnswer: "U",
            explanation: "Almost always, Q is followed by U (Queen, Quick, Question)."
        }
    ],
    3: [
        {
            question: "Choose the correct sentence:",
            options: ["I is a student", "I am a student", "I be a student", "I are a student"],
            correctAnswer: "I am a student",
            explanation: "With 'I', the correct verb 'to be' is 'am'."
        },
        {
            question: "Which is correct?",
            options: ["She is my friend", "She am my friend", "She are my friend", "She be my friend"],
            correctAnswer: "She is my friend",
            explanation: "With singular third person (She/He/It), use 'is'."
        },
        {
            question: "'Where are you from?' asks about your:",
            options: ["Name", "Origin / Country", "Age", "Job"],
            correctAnswer: "Origin / Country",
            explanation: "It asks for your place of origin."
        },
        {
            question: "Translate: 'Saya dari Indonesia'",
            options: ["I from Indonesia", "I am from Indonesia", "I come Indonesia", "Me from Indonesia"],
            correctAnswer: "I am from Indonesia",
            explanation: "You need the verb 'am' before 'from'."
        },
        {
            question: "To ask about age, we say:",
            options: ["How old is you?", "How many years you?", "How old are you?", "What is your age year?"],
            correctAnswer: "How old are you?",
            explanation: "This is the standard question for age."
        },
        {
            question: "Answer: 'How old are you?'",
            options: ["I have 20 years", "I am 20 years old", "My age 20", "I 20 years"],
            correctAnswer: "I am 20 years old",
            explanation: "In English we use 'to be' (am) for age, not 'have'."
        },
        {
            question: "He ____ a teacher.",
            options: ["are", "am", "is", "be"],
            correctAnswer: "is",
            explanation: "He is."
        },
        {
            question: "They ____ happy.",
            options: ["is", "am", "are", "was"],
            correctAnswer: "are",
            explanation: "They are (plural form)."
        },
        {
            question: "'Nice to meet you'",
            options: ["Senang bertemu denganmu", "Apa kabar", "Siapa namamu", "Terima kasih"],
            correctAnswer: "Senang bertemu denganmu",
            explanation: "Standard introduction phrase."
        },
        {
            question: "My name ____ Sarah.",
            options: ["am", "are", "is", "were"],
            correctAnswer: "is",
            explanation: "My name (it) is."
        },
        {
            question: "Which contraction is correct?",
            options: ["I'm", "I're", "I's", "Im"],
            correctAnswer: "I'm",
            explanation: "I'm is the contraction for I am."
        },
        {
            question: "Contraction of 'She is':",
            options: ["She're", "She's", "Shes", "She is"],
            correctAnswer: "She's",
            explanation: "She's = She is."
        },
        {
            question: "'Are you a student?' - Yes, ____.",
            options: ["I are", "I am", "I is", "I be"],
            correctAnswer: "I am",
            explanation: "Short answer: Yes, I am."
        },
        {
            question: "We ____ friends.",
            options: ["am", "is", "are", "be"],
            correctAnswer: "are",
            explanation: "We are."
        },
        {
            question: "What is your job?",
            options: ["Where do you live?", "What do you do?", "How are you?", "Who are you?"],
            correctAnswer: "What do you do?",
            explanation: "'What do you do?' is a common way to ask about someone's profession."
        },
        {
            question: "I live ____ Jakarta.",
            options: ["on", "at", "in", "from"],
            correctAnswer: "in",
            explanation: "Use 'in' for cities and countries."
        },
        {
            question: "He lives ____ Jl. Sudirman.",
            options: ["in", "on", "at", "by"],
            correctAnswer: "on",
            explanation: "Use 'on' for street names (without specific number)."
        },
        {
            question: "She is ____ nurse.",
            options: ["an", "a", "two", "the"],
            correctAnswer: "a",
            explanation: "Use 'a' before consonant sounds (nurse)."
        },
        {
            question: "I am ____ engineer.",
            options: ["a", "an", "the", "one"],
            correctAnswer: "an",
            explanation: "Use 'an' before vowel sounds (engineer)."
        },
        {
            question: "'It' refers to:",
            options: ["A man", "A woman", "A thing or animal", "A group"],
            correctAnswer: "A thing or animal",
            explanation: "It is the neutral pronoun."
        }
    ],
    4: [
        {
            question: "Which creates a question?",
            options: ["You are married?", "Are you married?", "Married you are?", "Is you married?"],
            correctAnswer: "Are you married?",
            explanation: "Invert the subject and verb 'to be' for questions."
        },
        {
            question: "What is your phone number?",
            options: ["It's 0812...", "I am 0812...", "My number are...", "I have 0812..."],
            correctAnswer: "It's 0812...",
            explanation: "We usually refer to the number as 'It'."
        },
        {
            question: "Meaning of 'Address':",
            options: ["Alamat", "Nama", "Umur", "Pekerjaan"],
            correctAnswer: "Alamat",
            explanation: "Address = Alamat."
        },
        {
            question: "How do you say '@' in an email address?",
            options: ["At", "A round", "Circle A", "Around"],
            correctAnswer: "At",
            explanation: "The symbol @ is pronounced 'at'."
        },
        {
            question: "How do you say '.' in an email address?",
            options: ["Period", "Dot", "Point", "Spot"],
            correctAnswer: "Dot",
            explanation: "In email/web addresses, '.' is pronounced 'dot'."
        },
        {
            question: "Marital Status options usually are:",
            options: ["Single / Married", "Tall / Short", "Rich / Poor", "Good / Bad"],
            correctAnswer: "Single / Married",
            explanation: "Marital status asks if you are wed or not."
        },
        {
            question: "Nationality of Japan is:",
            options: ["Japan", "Japanese", "Japanish", "Japanian"],
            correctAnswer: "Japanese",
            explanation: "Country: Japan -> Nationality: Japanese."
        },
        {
            question: "Nationality of USA:",
            options: ["United States", "American", "English", "USAn"],
            correctAnswer: "American",
            explanation: "People from the USA are called Americans."
        },
        {
            question: "I was born ____ 1990.",
            options: ["on", "at", "in", "to"],
            correctAnswer: "in",
            explanation: "Use 'in' for years."
        },
        {
            question: "My birthday is ____ May.",
            options: ["in", "on", "at", "of"],
            correctAnswer: "in",
            explanation: "Use 'in' for months alone."
        },
        {
            question: "My birthday is ____ May 5th.",
            options: ["in", "on", "at", "by"],
            correctAnswer: "on",
            explanation: "Use 'on' for specific dates."
        },
        {
            question: "Gender means:",
            options: ["Jenis Kelamin", "Umur", "Agama", "Suku"],
            correctAnswer: "Jenis Kelamin",
            explanation: "Gender = Male / Female."
        },
        {
            question: "Male means:",
            options: ["Perempuan", "Laki-laki", "Anak", "Orang tua"],
            correctAnswer: "Laki-laki",
            explanation: "Male = Laki-laki."
        },
        {
            question: "Female means:",
            options: ["Perempuan", "Laki-laki", "Hewan", "Benda"],
            correctAnswer: "Perempuan",
            explanation: "Female = Perempuan."
        },
        {
            question: "Postcode / Zip code means:",
            options: ["Kode Area", "Kode Pos", "Nomor Rumah", "Nomor Telepon"],
            correctAnswer: "Kode Pos",
            explanation: "Postcode is Kode Pos."
        },
        {
            question: "What is your surname?",
            options: ["My first name", "My nickname", "My family name", "My pet's name"],
            correctAnswer: "My family name",
            explanation: "Surname is your last name or family name."
        },
        {
            question: "Which is a valid email?",
            options: ["john.gmail.com", "john@gmail", "john@gmail.com", "john#gmail.com"],
            correctAnswer: "john@gmail.com",
            explanation: "Must have @ and a domain with a dot."
        },
        {
            question: "Are you single?",
            options: ["Yes, I do", "Yes, I am", "Yes, I have", "Yes, I is"],
            correctAnswer: "Yes, I am",
            explanation: "Question starts with 'Are', answer uses 'am/are'."
        },
        {
            question: "He ____ from China.",
            options: ["come", "comes", "is", "are"],
            correctAnswer: "is",
            explanation: "He is from China. (Or He comes from China, but 'is' is simplest here)."
        },
        {
            question: "They are ____ (Indonesian).",
            options: ["Indonesia", "Indonesians", "Indonesian", "Indonesien"],
            correctAnswer: "Indonesian",
            explanation: "As an adjective describing nationality, we say They are Indonesian."
        }
    ],
    5: [
        {
            question: "What do you do in the morning?",
            options: ["Go to sleep", "Wake up", "Have dinner", "Watch stars"],
            correctAnswer: "Wake up",
            explanation: "First thing in the morning is waking up."
        },
        {
            question: "I ____ breakfast at 7 AM.",
            options: ["do", "make", "have", "go"],
            correctAnswer: "have",
            explanation: "We say 'have breakfast' (or eat breakfast)."
        },
        {
            question: "She ____ to school by bus.",
            options: ["go", "goes", "going", "gone"],
            correctAnswer: "goes",
            explanation: "Third person singular (She) adds -es to go."
        },
        {
            question: "They ____ TV in the evening.",
            options: ["watches", "watch", "seeing", "look"],
            correctAnswer: "watch",
            explanation: "Use 'watch' for TV. Plural subject 'They' uses base verb."
        },
        {
            question: "He ____ a shower.",
            options: ["takes", "take", "taking", "do"],
            correctAnswer: "takes",
            explanation: "He takes a shower."
        },
        {
            question: "We ____ lunch at 12:00.",
            options: ["eat", "eats", "ate", "eating"],
            correctAnswer: "eat",
            explanation: "We eat (base form)."
        },
        {
            question: "Translate: 'Saya menyikat gigi'",
            options: ["I brush my teeth", "I wash my teeth", "I clean my teeth", "I scrub my teeth"],
            correctAnswer: "I brush my teeth",
            explanation: "Brush is the correct verb for teeth."
        },
        {
            question: "I ____ to bed at 10 PM.",
            options: ["go", "goes", "sleep", "walk"],
            correctAnswer: "go",
            explanation: "Go to bed usually implies going to sleep."
        },
        {
            question: "He ____ early.",
            options: ["wake up", "wakes up", "woke up", "waking up"],
            correctAnswer: "wakes up",
            explanation: "He wakes up (present simple)."
        },
        {
            question: "What time do you ____ work?",
            options: ["start", "starts", "starting", "started"],
            correctAnswer: "start",
            explanation: "After 'do you', use base verb."
        },
        {
            question: "I ____ coffee every morning.",
            options: ["drink", "drinks", "drunk", "drinking"],
            correctAnswer: "drink",
            explanation: "I drink."
        },
        {
            question: "She ____ homework in the afternoon.",
            options: ["does", "do", "make", "makes"],
            correctAnswer: "does",
            explanation: "Do homework -> She does homework."
        },
        {
            question: "They ____ dinner together.",
            options: ["cook", "cooks", "cooking", "cooked"],
            correctAnswer: "cook",
            explanation: "They cook."
        },
        {
            question: "My father ____ newspaper.",
            options: ["read", "reads", "watching", "see"],
            correctAnswer: "reads",
            explanation: "He reads."
        },
        {
            question: "I get dressed.",
            options: ["Saya mandi", "Saya berpakaian", "Saya bangun", "Saya tidur"],
            correctAnswer: "Saya berpakaian",
            explanation: "Get dressed = berpakaian."
        },
        {
            question: "I ____ the bus to work.",
            options: ["take", "go", "ride", "drive"],
            correctAnswer: "take",
            explanation: "Take the bus."
        },
        {
            question: "She ____ her hair.",
            options: ["combs", "comb", "wash", "clean"],
            correctAnswer: "combs",
            explanation: "Combs (menyisir). Wash needs 'es' (washes) if used."
        },
        {
            question: "We ____ English.",
            options: ["study", "studies", "studying", "learns"],
            correctAnswer: "study",
            explanation: "We study."
        },
        {
            question: "He ____ pray five times a day.",
            options: ["doesn't", "don't", "isn't", "aren't"],
            correctAnswer: "doesn't",
            explanation: "Negative present simple for He is 'doesn't'. Wait, the sentence structure implies 'He prays'. If negative: He doesn't pray. If question: Does he pray? Assuming affirmative with missing specific verb? Or maybe intent is frequency? Actually 'He prays' is correct. If the option is meant to fill a gap like 'He ___ pray': 'does' emphasizes. If simple sentence, 'prays' is word. Let's assume question asks for negative auxiliary or 'does' emphatic? Given options, 'doesn't' fits if it was 'He ____ pray' (negative). Or maybe options are just auxiliary. Let's pick 'doesn't' as plausible negative fill-in. 'He doesn't pray'."
        },
        {
            question: "Daily Routine means:",
            options: ["Rutinitas Harian", "Pekerjaan Rumah", "Jadwal Sekolah", "Liburan"],
            correctAnswer: "Rutinitas Harian",
            explanation: "Daily Routine = Rutinitas Harian."
        }
    ],
    6: [
        {
            question: "Mother and Father are:",
            options: ["Parents", "Siblings", "Cousins", "Grandparents"],
            correctAnswer: "Parents",
            explanation: "Parents = Orang tua (Ayah & Ibu)."
        },
        {
            question: "Your brother is your parents' ____.",
            options: ["Daughter", "Son", "Uncle", "Aunt"],
            correctAnswer: "Son",
            explanation: "Male child = Son."
        },
        {
            question: "Your father's brother is your:",
            options: ["Uncle", "Aunt", "Cousin", "Grandfather"],
            correctAnswer: "Uncle",
            explanation: "Father's/Mother's brother = Uncle (Paman)."
        },
        {
            question: "Your sister is your parents' ____.",
            options: ["Son", "Daughter", "Niece", "Wife"],
            correctAnswer: "Daughter",
            explanation: "Female child = Daughter."
        },
        {
            question: "Wife means:",
            options: ["Suami", "Istri", "Anak", "Bibi"],
            correctAnswer: "Istri",
            explanation: "Wife = Istri. Husband = Suami."
        },
        {
            question: "Your aunt's child is your:",
            options: ["Sibling", "Cousin", "Nephew", "Niece"],
            correctAnswer: "Cousin",
            explanation: "Child of aunt/uncle = Cousin (Sepupu)."
        },
        {
            question: "Grandmother means:",
            options: ["Kakek", "Nenek", "Ibu", "Bibi"],
            correctAnswer: "Nenek",
            explanation: "Grandmother = Nenek."
        },
        {
            question: "Siblings means:",
            options: ["Orang tua", "Saudara kandung", "Sepupu", "Tetangga"],
            correctAnswer: "Saudara kandung",
            explanation: "Siblings = Brothers and sisters."
        },
        {
            question: "My sister's husband is my:",
            options: ["Brother-in-law", "Father-in-law", "Step-brother", "Uncle"],
            correctAnswer: "Brother-in-law",
            explanation: "Brother by marriage = Brother-in-law (Ipar)."
        },
        {
            question: "Nephew means:",
            options: ["Keponakan Laki-laki", "Keponakan Perempuan", "Sepupu", "Cucu"],
            correctAnswer: "Keponakan Laki-laki",
            explanation: "Nephew = Keponakan LK. Niece = Keponakan PR."
        },
        {
            question: "Married couple:",
            options: ["Husband and Wife", "More and Father", "Brother and Sister", "Uncle and Aunt"],
            correctAnswer: "Husband and Wife",
            explanation: "Husband and Wife."
        },
        {
            question: "I have two ____ (child).",
            options: ["childs", "children", "child", "childrens"],
            correctAnswer: "children",
            explanation: "Plural of child is children."
        },
        {
            question: "Grandson means:",
            options: ["Cucu laki-laki", "Cucu perempuan", "Kakek", "Ayah"],
            correctAnswer: "Cucu laki-laki",
            explanation: "Grandson."
        },
        {
            question: "Who is the 'head' of the family traditionally?",
            options: ["Baby", "Father", "Pet", "Neighbor"],
            correctAnswer: "Father",
            explanation: "Traditionally Father."
        },
        {
            question: "Your mother's mother is your:",
            options: ["Grandmother", "Aunt", "Sister", "Mother-in-law"],
            correctAnswer: "Grandmother",
            explanation: "Mother's mother = Grandmother."
        },
        {
            question: "Twins means:",
            options: ["Kembar", "Kakak", "Adik", "Tunggal"],
            correctAnswer: "Kembar",
            explanation: "Twins = Kembar."
        },
        {
            question: "Step-mother means:",
            options: ["Ibu kandung", "Ibu tiri", "Ibu mertua", "Nenek"],
            correctAnswer: "Ibu tiri",
            explanation: "Step-mother = Ibu tiri."
        },
        {
            question: "Identify the pronoun: 'Sarah loves her brother.'",
            options: ["Sarah", "loves", "her", "brother"],
            correctAnswer: "her",
            explanation: "Her is the possessive pronoun/adjective."
        },
        {
            question: "Relative means:",
            options: ["Teman", "Kerabat / Keluarga", "Tetangga", "Musuh"],
            correctAnswer: "Kerabat / Keluarga",
            explanation: "Relative = Family member."
        },
        {
            question: "Who are your 'folks'?",
            options: ["Your parents/family", "Your enemies", "Your teachers", "Your pets"],
            correctAnswer: "Your parents/family",
            explanation: "Folks is a colloquial term for parents or family."
        }
    ],
    7: [
        {
            question: "What day comes after Monday?",
            options: ["Sunday", "Tuesday", "Wednesday", "Thursday"],
            correctAnswer: "Tuesday",
            explanation: "Mon, Tue, Wed..."
        },
        {
            question: "How many days are in a week?",
            options: ["5", "6", "7", "12"],
            correctAnswer: "7",
            explanation: "Seven days."
        },
        {
            question: "What is the 3rd month of the year?",
            options: ["March", "April", "February", "May"],
            correctAnswer: "March",
            explanation: "Jan, Feb, March."
        },
        {
            question: "Saturday and Sunday are called the:",
            options: ["Weekdays", "Weekend", "Workdays", "Holidays"],
            correctAnswer: "Weekend",
            explanation: "Sat & Sun = Weekend (Akhir pekan)."
        },
        {
            question: "What time is 12:00 PM?",
            options: ["Midnight", "Noon", "Morning", "Evening"],
            correctAnswer: "Noon",
            explanation: "12:00 PM is Noon (Siang). 12:00 AM is Midnight."
        },
        {
            question: "Quarter past five means:",
            options: ["5:15", "5:45", "5:30", "4:45"],
            correctAnswer: "5:15",
            explanation: "Quarter past = 15 minutes after."
        },
        {
            question: "Half past two means:",
            options: ["2:15", "2:30", "2:45", "1:30"],
            correctAnswer: "2:30",
            explanation: "Half past = 30 minutes after."
        },
        {
            question: "It is 6:45. We say:",
            options: ["Quarter to seven", "Quarter past six", "Half past six", "Seven forty-five"],
            correctAnswer: "Quarter to seven",
            explanation: "15 mins before 7 = Quarter to seven."
        },
        {
            question: "Translate: 'Besok'",
            options: ["Today", "Tomorrow", "Yesterday", "Tonight"],
            correctAnswer: "Tomorrow",
            explanation: "Tomorrow = Besok."
        },
        {
            question: "Translate: 'Kemarin'",
            options: ["Yesterday", "Tomorrow", "Today", "Now"],
            correctAnswer: "Yesterday",
            explanation: "Yesterday = Kemarin."
        },
        {
            question: "How many hours are in a day?",
            options: ["12", "20", "24", "48"],
            correctAnswer: "24",
            explanation: "24 hours."
        },
        {
            question: "a.m. stands for:",
            options: ["After Morning", "Ante Meridiem", "At Midday", "After Midnight"],
            correctAnswer: "Ante Meridiem",
            explanation: "Latin for 'Before Noon'."
        },
        {
            question: "p.m. stands for:",
            options: ["Past Morning", "Post Meridiem", "Pre Midnight", "Post Midnight"],
            correctAnswer: "Post Meridiem",
            explanation: "Latin for 'After Noon'."
        },
        {
            question: "What month is Halloween in?",
            options: ["October", "November", "December", "January"],
            correctAnswer: "October",
            explanation: "October 31st."
        },
        {
            question: "What day is today if yesterday was Friday?",
            options: ["Thursday", "Saturday", "Sunday", "Monday"],
            correctAnswer: "Saturday",
            explanation: "After Friday comes Saturday."
        },
        {
            question: "I was born ____ July.",
            options: ["in", "on", "at", "to"],
            correctAnswer: "in",
            explanation: "Months take 'in'."
        },
        {
            question: "See you ____ Monday.",
            options: ["in", "on", "at", "by"],
            correctAnswer: "on",
            explanation: "Days take 'on'."
        },
        {
            question: "The movie starts ____ 8:00.",
            options: ["in", "on", "at", "over"],
            correctAnswer: "at",
            explanation: "Specific times take 'at'."
        },
        {
            question: "A leap year has ____ days.",
            options: ["365", "366", "364", "360"],
            correctAnswer: "366",
            explanation: "Leap year adds Feb 29th."
        },
        {
            question: "Fortnight means:",
            options: ["Four nights", "Two weeks", "Forty nights", "One week"],
            correctAnswer: "Two weeks",
            explanation: "A fortnight is 14 days / 2 weeks."
        }
    ],
    8: [
        {
            question: "Where do you buy medicine?",
            options: ["Bakery", "Pharmacy", "Library", "Gym"],
            correctAnswer: "Pharmacy",
            explanation: "Pharmacy / Drugstore."
        },
        {
            question: "Where do you borrow books?",
            options: ["Bookstore", "Library", "School", "Office"],
            correctAnswer: "Library",
            explanation: "Library is for borrowing, Bookstore is for buying."
        },
        {
            question: "Where do you buy bread?",
            options: ["Butcher", "Bakery", "Florist", "Bank"],
            correctAnswer: "Bakery",
            explanation: "Bakery sells bread and cakes."
        },
        {
            question: "Where do you keep money?",
            options: ["Bank", "Hospital", "Cinema", "Park"],
            correctAnswer: "Bank",
            explanation: "Bank."
        },
        {
            question: "Turn left means:",
            options: ["Belok kanan", "Belok kiri", "Lurus", "Putar balik"],
            correctAnswer: "Belok kiri",
            explanation: "Left = Kiri."
        },
        {
            question: "Go straight means:",
            options: ["Jalan terus / Lurus", "Belok", "Berhenti", "Mundur"],
            correctAnswer: "Jalan terus / Lurus",
            explanation: "Go straight."
        },
        {
            question: "The book is ____ the table.",
            options: ["in", "on", "at", "through"],
            correctAnswer: "on",
            explanation: "On the surface of the table."
        },
        {
            question: "He is standing ____ the door.",
            options: ["on", "at", "in", "over"],
            correctAnswer: "at",
            explanation: "At a specific point/location."
        },
        {
            question: "Where do you watch movies?",
            options: ["Cinema", "Gym", "Church", "Market"],
            correctAnswer: "Cinema",
            explanation: "Cinema / Movie theater."
        },
        {
            question: "Where do you see a doctor?",
            options: ["Hospital", "School", "Post Office", "Airport"],
            correctAnswer: "Hospital",
            explanation: "Hospital or Clinic."
        },
        {
            question: "To catch a plane, you go to the:",
            options: ["Station", "Port", "Airport", "Stop"],
            correctAnswer: "Airport",
            explanation: "Airport."
        },
        {
            question: "Opposite of 'Near' is:",
            options: ["Close", "Far", "Next to", "Here"],
            correctAnswer: "Far",
            explanation: "Near (Dekat) >< Far (Jauh)."
        },
        {
            question: "The cat is ____ (under) the bed.",
            options: ["on", "above", "under", "beside"],
            correctAnswer: "under",
            explanation: "Under = Di bawah."
        },
        {
            question: "Between means:",
            options: ["Di antara", "Di depan", "Di belakang", "Di samping"],
            correctAnswer: "Di antara",
            explanation: "Between two objects."
        },
        {
            question: "Where do students learn?",
            options: ["School", "Factory", "Police Station", "Fire Station"],
            correctAnswer: "School",
            explanation: "School."
        },
        {
            question: "Traffic lights colors are:",
            options: ["Red, Blue, Green", "Red, Yellow, Green", "White, Black, Red", "Purple, Pink, Orange"],
            correctAnswer: "Red, Yellow, Green",
            explanation: "Standard traffic colors."
        },
        {
            question: "Excuse me, where is the toilet?",
            options: ["Yes, please", "It is over there", "I am fine", "Thank you"],
            correctAnswer: "It is over there",
            explanation: "Providing direction."
        },
        {
            question: "Next to means:",
            options: ["Jauh", "Di sebelah / Samping", "Di atas", "Di dalam"],
            correctAnswer: "Di sebelah / Samping",
            explanation: "Next to / Beside."
        },
        {
            question: "City means:",
            options: ["Negara", "Kota", "Desa", "Kecamatan"],
            correctAnswer: "Kota",
            explanation: "City = Kota."
        },
        {
            question: "Village means:",
            options: ["Kota Besar", "Desa", "Ibukota", "Pulau"],
            correctAnswer: "Desa",
            explanation: "Village = Desa."
        }
    ],
    9: [
        {
            question: "Which of these is a fruit?",
            options: ["Carrot", "Apple", "Potato", "Broccoli"],
            correctAnswer: "Apple",
            explanation: "Apple is a fruit, others are vegetables."
        },
        {
            question: "Which is a drink?",
            options: ["Bread", "Coffee", "Cheese", "Chicken"],
            correctAnswer: "Coffee",
            explanation: "Coffee is a liquid drink."
        },
        {
            question: "Breakfast, Lunch, ____",
            options: ["Supper", "Dinner", "Snack", "Feast"],
            correctAnswer: "Dinner",
            explanation: "The three main meals."
        },
        {
            question: "I want a glass of ____.",
            options: ["Rice", "Water", "Bread", "Meat"],
            correctAnswer: "Water",
            explanation: "Water is a liquid served in a glass."
        },
        {
            question: "Vegetarian does not eat:",
            options: ["Vegetables", "Meat", "Fruit", "Rice"],
            correctAnswer: "Meat",
            explanation: "Vegetarians do not eat meat."
        },
        {
            question: "Sweet food usually contains:",
            options: ["Salt", "Sugar", "Pepper", "Chili"],
            correctAnswer: "Sugar",
            explanation: "Sugar makes things sweet."
        },
        {
            question: "Lemon tastes:",
            options: ["Sweet", "Sour", "Salty", "Spicy"],
            correctAnswer: "Sour",
            explanation: "Lemons are sour (asam)."
        },
        {
            question: "Fried Rice means:",
            options: ["Nasi Putih", "Nasi Goreng", "Nasi Kuning", "Nasi Uduk"],
            correctAnswer: "Nasi Goreng",
            explanation: "Fried = Goreng."
        },
        {
            question: "Spicy means:",
            options: ["Manis", "Pedas", "Asin", "Pahit"],
            correctAnswer: "Pedas",
            explanation: "Spicy = Pedas."
        },
        {
            question: "I am hungry. I want to ____.",
            options: ["Drink", "Sleep", "Eat", "Run"],
            correctAnswer: "Eat",
            explanation: "Hungry -> Eat."
        },
        {
            question: "I am thirsty. I want to ____.",
            options: ["Eat", "Drink", "Play", "Cook"],
            correctAnswer: "Drink",
            explanation: "Thirsty -> Drink."
        },
        {
            question: "Knife and Fork are:",
            options: ["Cutlery", "Furniture", "Stationery", "Clothes"],
            correctAnswer: "Cutlery",
            explanation: "Eating utensils."
        },
        {
            question: "Noodle means:",
            options: ["Nasi", "Mie", "Roti", "Dondat"],
            correctAnswer: "Mie",
            explanation: "Noodle = Mie."
        },
        {
            question: "Chicken is a type of:",
            options: ["Vegetable", "Meat / Poultry", "Fruit", "Drink"],
            correctAnswer: "Meat / Poultry",
            explanation: "Chicken is meat."
        },
        {
            question: "Salt and ____.",
            options: ["Sugar", "Pepper", "Water", "Rice"],
            correctAnswer: "Pepper",
            explanation: "Common pairing: Salt and Pepper."
        },
        {
            question: "Dessert is eaten:",
            options: ["Before the meal", "After the meal", "During the meal", "Never"],
            correctAnswer: "After the meal",
            explanation: "Dessert is the final sweet course."
        },
        {
            question: "Which one is dairy (dairy product)?",
            options: ["Apple", "Milk", "Beef", "Rice"],
            correctAnswer: "Milk",
            explanation: "Dairy products are made from milk."
        },
        {
            question: "Delicious means:",
            options: ["Enak / Lezat", "Tidak enak", "Busuk", "Rambar"],
            correctAnswer: "Enak / Lezat",
            explanation: "Delicious = Enak."
        },
        {
            question: "Menu is found in a:",
            options: ["Library", "Restaurant", "Gym", "Pharmacy"],
            correctAnswer: "Restaurant",
            explanation: "To order food."
        },
        {
            question: "Chef is someone who:",
            options: ["Serves food", "Cooks food", "Buys food", "Eats food"],
            correctAnswer: "Cooks food",
            explanation: "Chef is a professional cook."
        }
    ],
    10: [
        {
            question: "Hobby means:",
            options: ["Pekerjaan", "Kegemaran / Hobi", "Cita-cita", "Kewajiban"],
            correctAnswer: "Kegemaran / Hobi",
            explanation: "Hobby = Kegemaran."
        },
        {
            question: "I like ____ football.",
            options: ["play", "playing", "plays", "played"],
            correctAnswer: "playing",
            explanation: "Like + Verb-ing (Gerund). 'Like to play' is also possible, but 'playing' is common for hobbies."
        },
        {
            question: "She enjoys ____ music.",
            options: ["listen", "listening to", "hear", "hearing"],
            correctAnswer: "listening to",
            explanation: "Enjoy + Gerund. Listen is followed by 'to'."
        },
        {
            question: "Which is an outdoor hobby?",
            options: ["Reading", "Hiking", "Gaming", "Cooking"],
            correctAnswer: "Hiking",
            explanation: "Hiking is done outside in nature."
        },
        {
            question: "A person who likes painting is an:",
            options: ["Artist / Painter", "Writer", "Singer", "Dancer"],
            correctAnswer: "Artist / Painter",
            explanation: "One who paints."
        },
        {
            question: "I am interested ____ photography.",
            options: ["on", "in", "at", "of"],
            correctAnswer: "in",
            explanation: "Interested in."
        },
        {
            question: "Collecting stamps is a popular ____.",
            options: ["Job", "Hobby", "Sport", "Chore"],
            correctAnswer: "Hobby",
            explanation: "Classic hobby."
        },
        {
            question: "Swimming involves:",
            options: ["Running", "Water", "Ball", "Racket"],
            correctAnswer: "Water",
            explanation: "Swimming is in water."
        },
        {
            question: "Do you have any hobbies?",
            options: ["Yes, I do", "Yes, I have", "Yes, I am", "Yes, I like"],
            correctAnswer: "Yes, I do",
            explanation: "Do you... -> Yes, I do."
        },
        {
            question: "He likes watching movies at the ____.",
            options: ["Cinema", "Gym", "Park", "Pool"],
            correctAnswer: "Cinema",
            explanation: "Cinema is for movies."
        },
        {
            question: "Gardening means:",
            options: ["Memancing", "Berkebun", "Memasak", "Menjahit"],
            correctAnswer: "Berkebun",
            explanation: "Gardening = Berkebun."
        },
        {
            question: "Fishing means:",
            options: ["Memancing", "Berkebun", "Berenang", "Berlari"],
            correctAnswer: "Memancing",
            explanation: "Fishing = Memancing."
        },
        {
            question: "My hobby is reading ____.",
            options: ["Movies", "Books", "Music", "Food"],
            correctAnswer: "Books",
            explanation: "We read books."
        },
        {
            question: "Cycling means riding a:",
            options: ["Car", "Bicycle", "Bus", "Train"],
            correctAnswer: "Bicycle",
            explanation: "Cycling = Bersepeda."
        },
        {
            question: "Photography uses a:",
            options: ["Brush", "Camera", "Pen", "Guitar"],
            correctAnswer: "Camera",
            explanation: "To take photos."
        },
        {
            question: "Playing the guitar is valid if you:",
            options: ["Have a drum", "Have a guitar", "Have a piano", "Have a violin"],
            correctAnswer: "Have a guitar",
            explanation: "Guitar needs a guitar."
        },
        {
            question: "Travel means:",
            options: ["Bepergian / Jalan-jalan", "Tidur", "Bekerja", "Belajar"],
            correctAnswer: "Bepergian / Jalan-jalan",
            explanation: "Travel."
        },
        {
            question: "Chess is a ____ game.",
            options: ["Board", "Field", "Water", "Video"],
            correctAnswer: "Board",
            explanation: "Board game (Catur)."
        },
        {
            question: "Which is a team sport?",
            options: ["Swimming (Solo)", "Football", "Reading", "Yoga"],
            correctAnswer: "Football",
            explanation: "Football requires a team."
        },
        {
            question: "Free time / Spare time means:",
            options: ["Waktu Sibuk", "Waktu Luang", "Waktu Kerja", "Waktu Sekolah"],
            correctAnswer: "Waktu Luang",
            explanation: "Time when you can do hobbies."
        }
    ],
    11: [
        {
            question: "What is the past tense of 'Go'?",
            options: ["Goed", "Gone", "Went", "Goes"],
            correctAnswer: "Went",
            explanation: "Irregular verb: Go -> Went."
        },
        {
            question: "Plural of 'Man' is:",
            options: ["Mans", "Men", "Man", "Mens"],
            correctAnswer: "Men",
            explanation: "Irregular plural: Man -> Men."
        },
        {
            question: "Which word is an Adjective (Kata Sifat)?",
            options: ["Run", "Happy", "Chair", "Quickly"],
            correctAnswer: "Happy",
            explanation: "Happy describes a noun."
        },
        {
            question: "Which word is a Verb (Kata Kerja)?",
            options: ["Eat", "Table", "Big", "Slowly"],
            correctAnswer: "Eat",
            explanation: "Eat is an action."
        },
        {
            question: "Opposite of 'Hot':",
            options: ["Warm", "Cold", "Dry", "Wet"],
            correctAnswer: "Cold",
            explanation: "Hot >< Cold."
        },
        {
            question: "Synonym of 'Big':",
            options: ["Small", "Large", "Tiny", "Little"],
            correctAnswer: "Large",
            explanation: "Big = Large."
        },
        {
            question: "I ____ (buy) a new car yesterday.",
            options: ["buy", "bought", "buys", "buying"],
            correctAnswer: "bought",
            explanation: "Past simple of buy is bought."
        },
        {
            question: "She ____ not like apples.",
            options: ["do", "does", "is", "have"],
            correctAnswer: "does",
            explanation: "She does not (doesn't) like."
        },
        {
            question: "They ____ playing football right now.",
            options: ["is", "am", "are", "be"],
            correctAnswer: "are",
            explanation: "Present continuous: They are playing."
        },
        {
            question: "Can you help me?",
            options: ["Yes, I can", "Yes, I do", "Yes, I am", "Yes, I have"],
            correctAnswer: "Yes, I can",
            explanation: "Question with Can -> Answer with Can."
        },
        {
            question: "This is ____ book (Saya punya).",
            options: ["me", "I", "my", "mine"],
            correctAnswer: "my",
            explanation: "My book (adjective). This book is mine (pronoun)."
        },
        {
            question: "There ____ a pen on the table.",
            options: ["is", "are", "were", "have"],
            correctAnswer: "is",
            explanation: "Singular subject (a pen) -> There is."
        },
        {
            question: "There ____ two cars outside.",
            options: ["is", "are", "was", "has"],
            correctAnswer: "are",
            explanation: "Plural subject (two cars) -> There are."
        },
        {
            question: "What is this?",
            options: ["It is a cat", "They are cats", "He is cat", "I am cat"],
            correctAnswer: "It is a cat",
            explanation: "Singular object -> It is."
        },
        {
            question: "Translate: 'Saya tidak tahu'",
            options: ["I no know", "I don't know", "I not know", "I am not know"],
            correctAnswer: "I don't know",
            explanation: "Correct negation for know."
        },
        {
            question: "How much is this?",
            options: ["It refers to price", "It refers to time", "It refers to age", "It refers to size"],
            correctAnswer: "It refers to price",
            explanation: "How much asks for price (or quantity)."
        },
        {
            question: "I have ____ idea.",
            options: ["a", "an", "the", "two"],
            correctAnswer: "an",
            explanation: "Idea starts with vowel sound."
        },
        {
            question: "Sun rises in the:",
            options: ["West", "East", "North", "South"],
            correctAnswer: "East",
            explanation: "East (Timur)."
        },
        {
            question: "How do you spell 'School'?",
            options: ["Scool", "Skool", "School", "Shool"],
            correctAnswer: "School",
            explanation: "School."
        },
        {
            question: "Good luck means:",
            options: ["Semoga beruntung", "Selamat jalan", "Hati-hati", "Kerja bagus"],
            correctAnswer: "Semoga beruntung",
            explanation: "Good luck."
        }
    ],
    12: [
        {
            question: "Which greeting is correct at 9:00 AM?",
            options: ["Good evening", "Good night", "Good morning", "Good afternoon"],
            correctAnswer: "Good morning",
            explanation: "Good morning is used from sunrise until noon."
        },
        {
            question: "How many vowels are in the English alphabet?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "5",
            explanation: "The vowels are A, E, I, O, U."
        },
        {
            question: "Translate: 'Nama saya Budi'",
            options: ["My name are Budi", "My name is Budi", "I name Budi", "Name my is Budi"],
            correctAnswer: "My name is Budi",
            explanation: "Use 'My name is' to introduce yourself."
        },
        {
            question: "Which is a daily routine activity?",
            options: ["Climb a mountain", "Brush teeth", "Go to the moon", "Fight a dragon"],
            correctAnswer: "Brush teeth",
            explanation: "Brushing teeth is a typical daily routine activity."
        },
        {
            question: "Your father's sister is your:",
            options: ["Uncle", "Cousin", "Grandmother", "Aunt"],
            correctAnswer: "Aunt",
            explanation: "Your father's or mother's sister is your Aunt (Bibi)."
        },
        {
            question: "Half past three means:",
            options: ["3:15", "3:45", "3:30", "2:30"],
            correctAnswer: "3:30",
            explanation: "Half past = 30 minutes after the hour."
        },
        {
            question: "A place where you buy medicine is called a:",
            options: ["Bakery", "Pharmacy", "Library", "Restaurant"],
            correctAnswer: "Pharmacy",
            explanation: "Pharmacy (Apotek) is where you get medicine."
        },
        {
            question: "Which food is a beverage (minuman)?",
            options: ["Rice", "Bread", "Juice", "Noodles"],
            correctAnswer: "Juice",
            explanation: "Juice is a drink (minuman), not solid food."
        },
        {
            question: "How do you say the price is too expensive?",
            options: ["It's very cheap", "It's on sale", "It's too expensive", "It's free"],
            correctAnswer: "It's too expensive",
            explanation: "'Too expensive' = Terlalu mahal."
        },
        {
            question: "I enjoy ____. (swim)",
            options: ["swim", "swam", "swimming", "swims"],
            correctAnswer: "swimming",
            explanation: "After 'enjoy', use the gerund (-ing form)."
        },
        {
            question: "What is the opposite of 'cheap'?",
            options: ["Expensive", "Free", "Sale", "Discount"],
            correctAnswer: "Expensive",
            explanation: "Cheap (murah) ↔ Expensive (mahal)."
        },
        {
            question: "Aisles in a supermarket means:",
            options: ["Lorong / Lajur", "Kasir", "Pintu masuk", "Parkir"],
            correctAnswer: "Lorong / Lajur",
            explanation: "Aisles are the walkways between shelves in a store."
        },
        {
            question: "Which word describes a direction?",
            options: ["Happy", "East", "Tall", "Hungry"],
            correctAnswer: "East",
            explanation: "East, West, North, South are directions."
        },
        {
            question: "She ____ every morning.",
            options: ["exercise", "exercises", "exercised", "exercising"],
            correctAnswer: "exercises",
            explanation: "Third person singular (She) takes -es."
        },
        {
            question: "'Excuse me' is used to:",
            options: ["Say goodbye", "Get someone's attention or pass by", "Thank someone", "Introduce yourself"],
            correctAnswer: "Get someone's attention or pass by",
            explanation: "Excuse me = Permisi (for attention or passing)."
        },
        {
            question: "What is the plural of 'child'?",
            options: ["Childs", "Childes", "Children", "Childrens"],
            correctAnswer: "Children",
            explanation: "Child is an irregular plural: child → children."
        },
        {
            question: "Translate: 'Berapa harganya?'",
            options: ["How much is it?", "Is it cheap?", "Can I have it?", "Where is it?"],
            correctAnswer: "How much is it?",
            explanation: "'How much is it?' = Berapa harganya?"
        },
        {
            question: "Which sentence uses 'there is' correctly?",
            options: ["There is many books", "There is a cat", "There is cats", "There are a dog"],
            correctAnswer: "There is a cat",
            explanation: "'There is' is used with singular nouns."
        },
        {
            question: "Which is NOT a family member term?",
            options: ["Nephew", "Cousin", "Neighbor", "Sibling"],
            correctAnswer: "Neighbor",
            explanation: "Neighbor (tetangga) is not a family member."
        },
        {
            question: "What is the correct farewell phrase for nighttime?",
            options: ["Good morning", "Good night", "Good afternoon", "See you tomorrow morning"],
            correctAnswer: "Good night",
            explanation: "Good night is the farewell phrase used at night or before sleeping."
        }
    ]
};
