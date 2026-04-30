
export type DialogueLine = {
    speaker: 'A' | 'B';
    name: string;
    text: string;
    translation: string;
};

export type Scenario = {
    id: string;
    title: string;
    context: string;
    level: 'Formal' | 'Casual' | 'Mixed';
    dialogue: DialogueLine[];
};

export type QuestionOption = {
    text: string;
    correct: boolean;
};

export type Question = {
    id: number;
    prompt: string;
    options: QuestionOption[];
    explanation: string;
};

export type LessonData = {
    id: number;
    title: string;
    cultureTip: string;
    scenarios: Scenario[];
    practiceQuestions: Question[];
};

export const BEGINNER_SPEAKING_LESSONS: Record<number, LessonData> = {
    1: {
        id: 1,
        title: "Perkenalan Diri",
        cultureTip: "Dalam budaya berbahasa Inggris, kontak mata sangat penting ketika memperkenalkan diri. Ini menunjukkan kepercayaan diri dan kejujuran. Juga, jabat tangan yang erat (tidak terlalu lemah, tidak terlalu kuat) adalah standar dalam situasi formal.",
        scenarios: [
            {
                id: 'c1', title: "Bertemu Orang Baru (Formal)", context: "Di konferensi bisnis atau kantor.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Mr. Smith', text: "Good morning. My name is John Smith.", translation: "Selamat pagi. Nama saya John Smith." },
                    { speaker: 'B', name: 'Ms. Lee', text: "Good morning, Mr. Smith. I am Sarah Lee.", translation: "Selamat pagi, Pak Smith. Saya Sarah Lee." },
                    { speaker: 'A', name: 'Mr. Smith', text: "Pleased to meet you, Ms. Lee.", translation: "Senang bertemu dengan Anda, Bu Lee." },
                    { speaker: 'B', name: 'Ms. Lee', text: "Pleased to meet you too.", translation: "Senang bertemu dengan Anda juga." },
                ]
            },
            {
                id: 'c2', title: "Mencari Teman (Kasual)", context: "Di kedai kopi atau pesta.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Alex', text: "Hi! I'm Alex.", translation: "Hai! Saya Alex." },
                    { speaker: 'B', name: 'Ben', text: "Hey Alex. I'm Ben. Nice to meet you.", translation: "Hei Alex. Saya Ben. Senang bertemu denganmu." },
                    { speaker: 'A', name: 'Alex', text: "Nice to meet you too. Where are you from?", translation: "Senang bertemu denganmu juga. Dari mana asalmu?" },
                    { speaker: 'B', name: 'Ben', text: "I'm from London. How about you?", translation: "Saya dari London. Bagaimana denganmu?" },
                    { speaker: 'A', name: 'Alex', text: "Cool! I'm from Jakarta.", translation: "Keren! Saya dari Jakarta." }
                ]
            },
            {
                id: 'c3', title: "Menyapa Teman", context: "Melihat seseorang yang Anda kenal di jalan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Jane', text: "Hello, Mary! Long time no see.", translation: "Halo, Mary! Lama tidak bertemu." },
                    { speaker: 'B', name: 'Mary', text: "Hi Jane! How are you?", translation: "Hai Jane! Apa kabar?" },
                    { speaker: 'A', name: 'Jane', text: "I'm fine, thanks. And you?", translation: "Saya baik, terima kasih. Dan kamu?" },
                    { speaker: 'B', name: 'Mary', text: "Not bad. Just busy with work.", translation: "Lumayan. Cuma sibuk kerja." }
                ]
            },
            {
                id: 'c4', title: "Mengucapkan Selamat Tinggal (Formal)", context: "Meninggalkan rapat.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Person A', text: "It was nice meeting you.", translation: "Senang bertemu dengan Anda." },
                    { speaker: 'B', name: 'Person B', text: "Thank you. I hope to see you again.", translation: "Terima kasih. Saya harap bisa bertemu Anda lagi." },
                    { speaker: 'A', name: 'Person A', text: "Have a nice day.", translation: "Semoga harimu menyenangkan." },
                    { speaker: 'B', name: 'Person B', text: "You too. Goodbye.", translation: "Anda juga. Selamat tinggal." }
                ]
            },
            {
                id: 'c5', title: "Mengucapkan Selamat Tinggal (Kasual)", context: "Meninggalkan rumah teman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Mike', text: "I have to go now. Bye!", translation: "Aku harus pergi sekarang. Dah!" },
                    { speaker: 'B', name: 'Tom', text: "Okay. See you later, Mike.", translation: "Oke. Sampai jumpa lagi, Mike." },
                    { speaker: 'A', name: 'Mike', text: "Take care!", translation: "Hati-hati!" },
                    { speaker: 'B', name: 'Tom', text: "See ya!", translation: "Sampai jumpa!" }
                ]
            },
            {
                id: 'c6', title: "Di Gym (Kasual)", context: "Bertanya tentang tempat duduk atau peralatan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Gym User 1', text: "Hi, is this seat taken?", translation: "Hai, apakah kursi ini ada yang menempati?" },
                    { speaker: 'B', name: 'Gym User 2', text: "No, go ahead.", translation: "Tidak, silakan saja." },
                    { speaker: 'A', name: 'Gym User 1', text: "Thanks. I'm David, by the way.", translation: "Terima kasih. Ngomong-ngomong, saya David." },
                    { speaker: 'B', name: 'Gym User 2', text: "I'm Steve. Nice to meet you.", translation: "Saya Steve. Senang bertemu denganmu." }
                ]
            },
            {
                id: 'c7', title: "Tetangga Baru", context: "Bertemu tetangga untuk pertama kalinya.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'New Neighbor', text: "Hello. I am your new neighbor, Sarah.", translation: "Halo. Saya tetangga baru Anda, Sarah." },
                    { speaker: 'B', name: 'Neighbor', text: "Welcome to the neighborhood! I am Linda.", translation: "Selamat datang di lingkungan ini! Saya Linda." },
                    { speaker: 'A', name: 'New Neighbor', text: "Thank you. It is a nice place.", translation: "Terima kasih. Ini tempat yang bagus." },
                    { speaker: 'B', name: 'Neighbor', text: "Yes, it is very quiet here.", translation: "Ya, di sini sangat tenang." }
                ]
            },
            {
                id: 'c8', title: "Menanyakan Kabar", context: "Bertanya kabar teman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend 1', text: "Hey! How is it going?", translation: "Hei! Apa kabar?" },
                    { speaker: 'B', name: 'Friend 2', text: "Pretty good. And you?", translation: "Cukup baik. Dan kamu?" },
                    { speaker: 'A', name: 'Friend 1', text: "I'm doing well, thanks.", translation: "Saya baik-baik saja, terima kasih." },
                    { speaker: 'B', name: 'Friend 2', text: "Glad to hear that.", translation: "Senang mendengarnya." }
                ]
            },
            {
                id: 'c9', title: "Meminta Maaf (Formal)", context: "Datang terlambat ke rapat.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Employee', text: "Good morning. I am sorry I am late.", translation: "Selamat pagi. Maaf saya terlambat." },
                    { speaker: 'B', name: 'Manager', text: "That is okay. Please sit down.", translation: "Tidak apa-apa. Silakan duduk." },
                    { speaker: 'A', name: 'Employee', text: "Thank you.", translation: "Terima kasih." },
                    { speaker: 'B', name: 'Manager', text: "Let's start the meeting.", translation: "Mari kita mulai rapatnya." }
                ]
            },
            {
                id: 'c10', title: "Meninggalkan Pesta", context: "Mengakhiri percakapan dengan sopan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Guest 1', text: "It is getting late. I should go.", translation: "Sudah makin malam. Saya harus pergi." },
                    { speaker: 'B', name: 'Host', text: "Already? Stay a bit longer!", translation: "Sudah? Tinggallah sebentar lagi!" },
                    { speaker: 'A', name: 'Guest 1', text: "I can't. I have work tomorrow.", translation: "Saya tidak bisa. Saya ada kerja besok." },
                    { speaker: 'B', name: 'Host', text: "Alright. See you later!", translation: "Baiklah. Sampai jumpa lagi!" }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Seseorang berkata: 'How do you do?' (Formal)", options: [{ text: "I'm fine.", correct: false }, { text: "How do you do?", correct: true }, { text: "What's up?", correct: false }], explanation: "'How do you do?' sangat formal. Jawaban yang benar juga 'How do you do?'." },
            { id: 2, prompt: "Seseorang berkata: 'What's up?' (Kasual)", options: [{ text: "Good morning.", correct: false }, { text: "Not much, you?", correct: true }, { text: "Pleased to meet you.", correct: false }], explanation: "Untuk 'What's up?', kita biasanya menjawab 'Not much' atau 'Nothing much'." },
            { id: 3, prompt: "Anda ingin memperkenalkan diri dalam rapat.", options: [{ text: "Yo, I'm [Name].", correct: false }, { text: "Hello, my name is [Name].", correct: true }, { text: "Who are you?", correct: false }], explanation: "Gunakan 'Hello, my name is...' untuk perkenalan profesional standar." },
            { id: 4, prompt: "Sudah jam 9 malam. Anda menyapa seseorang.", options: [{ text: "Good night.", correct: false }, { text: "Good evening.", correct: true }, { text: "Good afternoon.", correct: false }], explanation: "'Good evening' untuk sapaan. 'Good night' untuk perpisahan/tidur." },
            { id: 5, prompt: "Seseorang berkata: 'Nice to meet you.'", options: [{ text: "Nice to meet you too.", correct: true }, { text: "You are welcome.", correct: false }, { text: "Yes, I am.", correct: false }], explanation: "Selalu balas sentimen dengan 'too' (juga)." },
            { id: 6, prompt: "Anda terlambat kerja. Apa yang Anda katakan?", options: [{ text: "I am late.", correct: false }, { text: "I am sorry I am late.", correct: true }, { text: "What time is it?", correct: false }], explanation: "Sopan untuk meminta maaf ketika Anda terlambat." },
            { id: 7, prompt: "Teman berkata: 'How is it going?'", options: [{ text: "Pretty good.", correct: true }, { text: "I am going home.", correct: false }, { text: "Nice to meet you.", correct: false }], explanation: "'How is it going?' menanyakan kabar, mirip dengan 'How are you?'." },
            { id: 8, prompt: "Anda ingin duduk di sebelah seseorang di gym.", options: [{ text: "Get up.", correct: false }, { text: "Is this seat taken?", correct: true }, { text: "I want this chair.", correct: false }], explanation: "Bertanya 'Is this seat taken?' adalah cara sopan memastikan kursi kosong." },
            { id: 9, prompt: "Anda bertemu tetangga baru.", options: [{ text: "Go away.", correct: false }, { text: "Welcome to the neighborhood!", correct: true }, { text: "Where are you going?", correct: false }], explanation: "'Welcome to the neighborhood' adalah sambutan hangat untuk tetangga baru." },
            { id: 10, prompt: "Anda perlu meninggalkan percakapan.", options: [{ text: "Bye.", correct: false }, { text: "I should go now. See you later.", correct: true }, { text: "Stop talking.", correct: false }], explanation: "Memberi alasan (cth: 'I should go') sopan sebelum pamit." },
            { id: 11, prompt: "Anda bertemu seseorang di pesta kasual.", options: [{ text: "Who are you?", correct: false }, { text: "Hi, I'm [Name].", correct: true }, { text: "Go away.", correct: false }], explanation: "Dalam situasi kasual, 'Hi, I'm [Name]' adalah cara ramah memperkenalkan diri." },
            { id: 12, prompt: "Jam 2 siang. Seseorang berkata 'Good morning'.", options: [{ text: "Good morning.", correct: false }, { text: "Actually, it's Good Afternoon.", correct: true }, { text: "Good night.", correct: false }], explanation: "Setelah jam 12 siang, sapaan yang benar adalah 'Good Afternoon'." },
            { id: 13, prompt: "Anda ingin tahu nama seseorang dengan sopan.", options: [{ text: "What is your name?", correct: true }, { text: "Name please.", correct: false }, { text: "Who is it?", correct: false }], explanation: "'What is your name?' adalah pertanyaan standar dan sopan." },
            { id: 14, prompt: "Cara sopan pamit pada orang asing.", options: [{ text: "Later.", correct: false }, { text: "Have a nice day.", correct: true }, { text: "Stop talking.", correct: false }], explanation: "'Have a nice day' sangat sopan dan umum dengan orang asing." },
            { id: 15, prompt: "Seseorang berkata 'See you later'. Anda menjawab:", options: [{ text: "See you.", correct: true }, { text: "No.", correct: false }, { text: "I am here.", correct: false }], explanation: "'See you' atau 'See you later' adalah respon alami." },
            { id: 16, prompt: "Menyapa bos di pagi hari (Formal).", options: [{ text: "Hey boss.", correct: false }, { text: "Good morning, Sir/Ma'am.", correct: true }, { text: "What's up?", correct: false }], explanation: "Gunakan sebutan formal (Sir/Ma'am) dan 'Good morning' untuk atasan." },
            { id: 17, prompt: "Cara lain bertanya 'How are you?'", options: [{ text: "How do you do?", correct: true }, { text: "Who are you?", correct: false }, { text: "Are you okay?", correct: false }], explanation: "'How do you do?' adalah alternatif formal. 'How have you been?' juga umum." },
            { id: 18, prompt: "Memperkenalkan teman Anda, Tom.", options: [{ text: "He is Tom.", correct: false }, { text: "This is my friend, Tom.", correct: true }, { text: "Meet Tom.", correct: false }], explanation: "'This is...' adalah frasa standar untuk memperkenalkan orang lain." },
            { id: 19, prompt: "Seseorang berkata 'Thank you'. Anda berkata:", options: [{ text: "You're welcome.", correct: true }, { text: "OK.", correct: false }, { text: "Please.", correct: false }], explanation: "'You're welcome' adalah respon sopan standar untuk ucapan terima kasih." },
            { id: 20, prompt: "Anda butuh perhatian orang asing.", options: [{ text: "Hey you!", correct: false }, { text: "Excuse me.", correct: true }, { text: "Look here.", correct: false }], explanation: "'Excuse me' adalah cara sopan untuk menyela atau menarik perhatian." }
        ]
    },
    2: {
        id: 2,
        title: "Abjad & Ejaan",
        cultureTip: "Jangan pernah mengatakan 'A with a circle' untuk alamat email. Selalu katakan <b>'At'</b> (@). Dan untuk titik di email atau situs web, selalu katakan <b>'Dot'</b> (.), bukan 'point' atau 'period'.",
        scenarios: [
            {
                id: 'c1', title: "Di Resepsionis", context: "Check-in di meja depan.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Receptionist', text: "What is your last name, please?", translation: "Siapa nama belakang Anda?" },
                    { speaker: 'B', name: 'Guest', text: "It is White. W-H-I-T-E.", translation: "White. W-H-I-T-E." },
                    { speaker: 'A', name: 'Receptionist', text: "Thank you, Mr. White.", translation: "Terima kasih, Pak White." },
                    { speaker: 'B', name: 'Guest', text: "You are welcome.", translation: "Sama-sama." }
                ]
            },
            {
                id: 'c2', title: "Kedai Kopi", context: "Memberikan nama untuk pesanan minuman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Barista', text: "Can I get a name for the cup?", translation: "Bisa minta nama untuk di gelas?" },
                    { speaker: 'B', name: 'Customer', text: "Sure, it's Ann.", translation: "Tentu, Ann." },
                    { speaker: 'A', name: 'Barista', text: "Is that A-N-N-E?", translation: "Apakah itu A-N-N-E?" },
                    { speaker: 'B', name: 'Customer', text: "No, just A-double N.", translation: "Tidak, hanya A-N ganda (A-N-N)." }
                ]
            },
            {
                id: 'c3', title: "Memberikan Alamat Email", context: "Berbagi info kontak dengan rekan kerja.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Colleague', text: "What is your email address?", translation: "Apa alamat email Anda?" },
                    { speaker: 'B', name: 'You', text: "It is john.doe@email.com.", translation: "john.doe@email.com" },
                    { speaker: 'A', name: 'Colleague', text: "Sorry, did you say 'dot' or 'dash'?", translation: "Maaf, apakah Anda bilang 'titik' atau 'strip'?" },
                    { speaker: 'B', name: 'You', text: "Dot. John dot Doe.", translation: "Titik. John titik Doe." }
                ]
            },
            {
                id: 'c4', title: "Klarifikasi Telepon", context: "Mengklarifikasi ejaan melalui saluran telepon yang buruk.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Caller', text: "My name is Cinead.", translation: "Nama saya Cinead." },
                    { speaker: 'B', name: 'Support', text: "How do you spell that?", translation: "Bagaimana cara mengejanya?" },
                    { speaker: 'A', name: 'Caller', text: "C for Charlie, I for India...", translation: "C untuk Charlie, I untuk India..." },
                    { speaker: 'B', name: 'Support', text: "Ah, okay. C-I-N-E-A-D.", translation: "Ah, oke. C-I-N-E-A-D." }
                ]
            },
            {
                id: 'c5', title: "Reservasi Hotel", context: "Memperbaiki kesalahan nama.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Clerk', text: "I have a reservation for Mr. Smith.", translation: "Saya ada reservasi untuk Pak Smith." },
                    { speaker: 'B', name: 'Guest', text: "Actually, it is Smythe.", translation: "Sebenarnya, itu Smythe." },
                    { speaker: 'A', name: 'Clerk', text: "Oh, could you spell that?", translation: "Oh, bisakah Anda mengejanya?" },
                    { speaker: 'B', name: 'Guest', text: "S-M-Y-T-H-E.", translation: "S-M-Y-T-H-E." }
                ]
            },
            {
                id: 'c6', title: "Kata Sandi Wi-Fi", context: "Meminta kata sandi internet.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Guest', text: "What is the Wi-Fi password?", translation: "Apa kata sandi Wi-Fi nya?" },
                    { speaker: 'B', name: 'Host', text: "It is 'Guest123'. Capital G.", translation: "Itu 'Guest123'. G besar." },
                    { speaker: 'A', name: 'Guest', text: "Okay, capital G-U-E-S-T-1-2-3.", translation: "Oke, G besar-U-E-S-T-1-2-3." },
                    { speaker: 'B', name: 'Host', text: "That is correct.", translation: "Itu benar." }
                ]
            },
            {
                id: 'c7', title: "Alamat Jalan", context: "Memberikan alamat ke supir taksi.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Driver', text: "Where to?", translation: "Mau ke mana?" },
                    { speaker: 'B', name: 'Passenger', text: "15 Worcester Street, please.", translation: "Jalan Worcester no 15, tolong." },
                    { speaker: 'A', name: 'Driver', text: "How do you spell Worcester?", translation: "Bagaimana mengeja Worcester?" },
                    { speaker: 'B', name: 'Passenger', text: "W-O-R-C-E-S-T-E-R.", translation: "W-O-R-C-E-S-T-E-R." }
                ]
            },
            {
                id: 'c8', title: "Janji Dokter", context: "Check-in di klinik.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Nurse', text: "Date of birth, please?", translation: "Tanggal lahir?" },
                    { speaker: 'B', name: 'Patient', text: "May 5th, 1990.", translation: "5 Mei 1990." },
                    { speaker: 'A', name: 'Nurse', text: "And your middle initial?", translation: "Dan inisial nama tengah Anda?" },
                    { speaker: 'B', name: 'Patient', text: "It is J. Just the letter J.", translation: "Itu J. Hanya huruf J." }
                ]
            },
            {
                id: 'c9', title: "Kode Pemesanan Penerbangan", context: "Mengonfirmasi referensi pemesanan.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Agent', text: "Do you have your booking code?", translation: "Apakah Anda punya kode booking?" },
                    { speaker: 'B', name: 'Traveler', text: "Yes, it is X-Y-Z-9-9.", translation: "Ya, itu X-Y-Z-9-9." },
                    { speaker: 'A', name: 'Agent', text: "Sorry, was that Z or C?", translation: "Maaf, itu Z atau C?" },
                    { speaker: 'B', name: 'Traveler', text: "Z for Zebra.", translation: "Z untuk Zebra." }
                ]
            },
            {
                id: 'c10', title: "Huruf yang Membingungkan", context: "Berlatih vokal yang sulit.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Student A', text: "Is your name spelled with an I or E?", translation: "Apakah namamu dieja dengan I atau E?" },
                    { speaker: 'B', name: 'Student B', text: "With an E. B-E-N.", translation: "Dengan E. B-E-N." },
                    { speaker: 'A', name: 'Student A', text: "Got it. Not B-I-N.", translation: "Mengerti. Bukan B-I-N." },
                    { speaker: 'B', name: 'Student B', text: "Exactly. B-I-N is a trash can!", translation: "Tepat. B-I-N itu tempat sampah!" }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Bagaimana cara membaca: 'john@email.com'?", options: [{ text: "john at email dot com", correct: true }, { text: "john around email point com", correct: false }, { text: "john circle email stop com", correct: false }], explanation: "Dalam alamat email, '@' dibaca 'at' dan '.' dibaca 'dot'." },
            { id: 2, prompt: "Bagaimana mengeja 'Apple' secara alami?", options: [{ text: "A-P-P-L-E", correct: false }, { text: "A-Double P-L-E", correct: true }, { text: "A-Two P-L-E", correct: false }], explanation: "Ketika dua huruf sama, kita biasanya mengatakan 'Double'." },
            { id: 3, prompt: "Seseorang bertanya: 'How do you spell that?'", options: [{ text: "My name is John.", correct: false }, { text: "It is J-O-H-N.", correct: true }, { text: "Yes, it is.", correct: false }], explanation: "Mereka ingin Anda menyebutkan hurufnya satu per satu." },
            { id: 4, prompt: "Huruf mana yang berbunyi seperti 'eye'?", options: [{ text: "A", correct: false }, { text: "E", correct: false }, { text: "I", correct: true }], explanation: "Huruf 'I' diucapkan /aɪ/ (seperti 'eye')." },
            { id: 5, prompt: "Bagaimana memperjelas 'B' vs 'D'?", options: [{ text: "B for Ball, D for Dog", correct: true }, { text: "B for Cat, D for Apple", correct: false }, { text: "Just say it louder", correct: false }], explanation: "Menggunakan kata yang dimulai dengan huruf tersebut (seperti B untuk Ball) membantu memperjelas ejaan." },
            { id: 6, prompt: "Anda perlu mengeja 'Coffee'.", options: [{ text: "C-O-double F-double E", correct: true }, { text: "C-O-F-F-E-E", correct: false }, { text: "C-O-two F-two E", correct: false }], explanation: "Dengan dua set huruf ganda, kita katakan 'double F, double E'." },
            { id: 7, prompt: "Seseorang meminta alamat Anda. Anda menjawab '15'.", options: [{ text: "One five", correct: true }, { text: "Fifteen", correct: false }, { text: "Number fifteen", correct: false }], explanation: "Untuk nomor jalan, kita sering menyebut digit individu (one-five) demi kejelasan, meskipun 'fifteen' juga dapat diterima." },
            { id: 8, prompt: "Bagaimana mengucapkan 'www'?", options: [{ text: "World wide web", correct: false }, { text: "Three Ws", correct: false }, { text: "Double-u double-u double-u", correct: true }], explanation: "Kita ucapkan setiap 'w' secara individu: 'double-u double-u double-u'." },
            { id: 9, prompt: "Eja 'Ms. Green'.", options: [{ text: "M-S Green", correct: true }, { text: "Mrs Green", correct: false }, { text: "Miss Green", correct: false }], explanation: "Ms. dieja M-S." },
            { id: 10, prompt: "Perjelas 'M' untuk agen call center.", options: [{ text: "M for Mother", correct: true }, { text: "M for No", correct: false }, { text: "Mlike em", correct: false }], explanation: "'M for Mother' atau 'M for Mary' adalah klarifikasi standar." },
            { id: 11, prompt: "Perjelas 'N' vs 'M'.", options: [{ text: "N for November", correct: true }, { text: "N for Mom", correct: false }, { text: "N for Apple", correct: false }], explanation: "'N for November' adalah standar fonetik NATO, tapi 'N for Nancy' juga umum." },
            { id: 12, prompt: "Bagaimana membaca 'user_name'?", options: [{ text: "User dash name", correct: false }, { text: "User underscore name", correct: true }, { text: "User down line name", correct: false }], explanation: "Simbol '_' disebut 'underscore'." },
            { id: 13, prompt: "Bagaimana membaca 'user-name'?", options: [{ text: "User dash name", correct: true }, { text: "User underscore name", correct: false }, { text: "User slash name", correct: false }], explanation: "Simbol '-' disebut 'dash' atau 'hyphen'." },
            { id: 14, prompt: "Eja 'Z' dalam Bahasa Inggris British.", options: [{ text: "Zee", correct: false }, { text: "Zed", correct: true }, { text: "Zzz", correct: false }], explanation: "Dalam Bahasa Inggris British/Australia, 'Z' diucapkan 'Zed'. Di Amerika, 'Zee'." },
            { id: 15, prompt: "Eja 'Z' dalam Bahasa Inggris Amerika.", options: [{ text: "Zee", correct: true }, { text: "Zed", correct: false }, { text: "Zea", correct: false }], explanation: "Orang Amerika bilang 'Zee'." },
            { id: 16, prompt: "Huruf 'A' berbunyi seperti...", options: [{ text: "Eye", correct: false }, { text: "Ay (as in day)", correct: true }, { text: "Ah", correct: false }], explanation: "Nama huruf 'A' berbunyi seperti 'Ay' dalam 'Day'." },
            { id: 17, prompt: "Bagaimana membaca 'Smith/Jones'?", options: [{ text: "Smith slash Jones", correct: true }, { text: "Smith or Jones", correct: false }, { text: "Smith dash Jones", correct: false }], explanation: "Simbol '/' disebut 'slash' atau 'forward slash'." },
            { id: 18, prompt: "Anda ingin mengonfirmasi ejaan.", options: [{ text: "Is that T for Tango?", correct: true }, { text: "Are you T?", correct: false }, { text: "T what?", correct: false }], explanation: "Bertanya 'Is that [Letter] for [Word]?' adalah cara sopan untuk mengonfirmasi." },
            { id: 19, prompt: "Eja 'LLC'.", options: [{ text: "L-L-C", correct: false }, { text: "Double L-C", correct: true }, { text: "Two L C", correct: false }], explanation: "Menggunakan 'Double L' lebih cepat dan alami." },
            { id: 20, prompt: "Bagaimana mengatakan 'Tidak, itu salah' dengan sopan tentang ejaan?", options: [{ text: "Wrong.", correct: false }, { text: "No, actually it is...", correct: true }, { text: "You are bad at spelling.", correct: false }], explanation: "'No, actually it is...' mengoreksi seseorang dengan lembut." }
        ]
    },
    3: {
        id: 3,
        title: "Memperkenalkan Diri",
        cultureTip: "Jika seseorang bertanya 'What do you do?', mereka bertanya tentang <b>pekerjaan</b> Anda, bukan apa yang sedang Anda lakukan saat ini. Anda harus menjawab 'I am a teacher' atau 'I work in a bank'.",
        scenarios: [
            {
                id: 'c1', title: "Dari mana asalmu? (Kasual)", context: "Mengobrol dengan teman baru di kafe.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Tom', text: "So, where are you from, Lisa?", translation: "Jadi, kamu asalnya dari mana, Lisa?" },
                    { speaker: 'B', name: 'Lisa', text: "I'm from Canada. How about you?", translation: "Saya dari Kanada. Bagaimana denganmu?" },
                    { speaker: 'A', name: 'Tom', text: "I'm from Australia, but I live here now.", translation: "Saya dari Australia, tapi saya tinggal di sini sekarang." },
                    { speaker: 'B', name: 'Lisa', text: "Oh, cool! I love Australia.", translation: "Oh, keren! Saya suka Australia." }
                ]
            },
            {
                id: 'c2', title: "Di mana Anda tinggal? (Formal)", context: "Mengisi formulir dengan petugas.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Clerk', text: "Where do you currently live, sir?", translation: "Di mana Anda tinggal saat ini, Pak?" },
                    { speaker: 'B', name: 'Man', text: "I live in New York City.", translation: "Saya tinggal di Kota New York." },
                    { speaker: 'A', name: 'Clerk', text: "Do you live in an apartment or a house?", translation: "Apakah Anda tinggal di apartemen atau rumah?" },
                    { speaker: 'B', name: 'Man', text: "I live in an apartment downtown.", translation: "Saya tinggal di apartemen di pusat kota." }
                ]
            },
            {
                id: 'c3', title: "Apa pekerjaanmu? (Kasual)", context: "Bertanya tentang pekerjaan di pesta.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Jack', text: "What do you do for a living?", translation: "Apa pekerjaanmu?" },
                    { speaker: 'B', name: 'Jill', text: "I'm a graphic designer. And you?", translation: "Saya desainer grafis. Dan kamu?" },
                    { speaker: 'A', name: 'Jack', text: "I work as a teacher at the local school.", translation: "Saya bekerja sebagai guru di sekolah setempat." },
                    { speaker: 'B', name: 'Jill', text: "That sounds like a rewarding job.", translation: "Kedengarannya pekerjaan yang memuaskan." }
                ]
            },
            {
                id: 'c4', title: "Menanyakan Profesi (Formal)", context: "Acara jejaring bisnis.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Person A', text: "May I ask what your profession is?", translation: "Bolehkah saya tanya apa profesi Anda?" },
                    { speaker: 'B', name: 'Person B', text: "Certainly. I am a software engineer.", translation: "Tentu. Saya seorang insinyur perangkat lunak." },
                    { speaker: 'A', name: 'Person A', text: "How long have you been in that field?", translation: "Sudah berapa lama Anda di bidang itu?" },
                    { speaker: 'B', name: 'Person B', text: "For about ten years now.", translation: "Sudah sekitar sepuluh tahun." }
                ]
            },
            {
                id: 'c5', title: "Bicara tentang Usia (Kasual)", context: "Teman membahas ulang tahun.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Sarah', text: "When is your birthday?", translation: "Kapan ulang tahunmu?" },
                    { speaker: 'B', name: 'Mike', text: "It's next week! I will be 25.", translation: "Minggu depan! Saya akan berusia 25." },
                    { speaker: 'A', name: 'Sarah', text: "Really? I thought you were younger.", translation: "Benarkah? Saya kira kamu lebih muda." },
                    { speaker: 'B', name: 'Mike', text: "Haha, thanks. How old are you?", translation: "Haha, terima kasih. Berapa umurmu?" }
                ]
            },
            {
                id: 'c6', title: "Status Keluarga", context: "Mengenal rekan kerja.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Colleague', text: "Are you married, David?", translation: "Apakah kamu sudah menikah, David?" },
                    { speaker: 'B', name: 'David', text: "No, I'm single. How about you?", translation: "Tidak, saya lajang. Bagaimana denganmu?" },
                    { speaker: 'A', name: 'Colleague', text: "I'm married. I have two kids.", translation: "Saya sudah menikah. Saya punya dua anak." },
                    { speaker: 'B', name: 'David', text: "Nice! How old are they?", translation: "Bagus! Berapa umur mereka?" }
                ]
            },
            {
                id: 'c7', title: "Hobi & Minat", context: "Mencari kesamaan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Amy', text: "What do you do in your free time?", translation: "Apa yang kamu lakukan di waktu luang?" },
                    { speaker: 'B', name: 'Ben', text: "I like playing guitar and reading.", translation: "Saya suka main gitar dan membaca." },
                    { speaker: 'A', name: 'Amy', text: "Oh, I play guitar too!", translation: "Oh, saya main gitar juga!" },
                    { speaker: 'B', name: 'Ben', text: "We should jam sometime.", translation: "Kita harus main bareng kapan-kapan." }
                ]
            },
            {
                id: 'c8', title: "Memperkenalkan Teman", context: "Memperkenalkan seseorang kepada orang lain.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'You', text: "Hey John, this is my friend, Alice.", translation: "Hei John, ini teman saya, Alice." },
                    { speaker: 'B', name: 'John', text: "Hi Alice. Nice to meet you.", translation: "Hai Alice. Senang bertemu denganmu." },
                    { speaker: 'A', name: 'Alice', text: "Nice to meet you too, John.", translation: "Senang bertemu denganmu juga, John." },
                    { speaker: 'B', name: 'John', text: "Alice, are you also a student?", translation: "Alice, apakah kamu juga mahasiswa?" }
                ]
            },
            {
                id: 'c9', title: "Perkenalan Kelas", context: "Monolog hari pertama kelas.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Student', text: "Hello everyone. My name is Ken.", translation: "Halo semuanya. Nama saya Ken." },
                    { speaker: 'A', name: 'Student', text: "I come from Japan.", translation: "Saya berasal dari Jepang." },
                    { speaker: 'A', name: 'Student', text: "I am excited to learn English here.", translation: "Saya bersemangat belajar bahasa Inggris di sini." },
                    { speaker: 'B', name: 'Teacher', text: "Welcome to the class, Ken.", translation: "Selamat datang di kelas, Ken." }
                ]
            },
            {
                id: 'c10', title: "Cuplikan Wawancara Kerja", context: "Menjawab 'Tell me about yourself'.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Interviewer', text: "Tell me a little about yourself.", translation: "Ceritakan sedikit tentang dirimu." },
                    { speaker: 'B', name: 'Candidate', text: "Well, I am 22 years old and I just graduated.", translation: "Baik, saya berusia 22 tahun dan baru lulus." },
                    { speaker: 'B', name: 'Candidate', text: "I studied marketing at University.", translation: "Saya belajar pemasaran di Universitas." },
                    { speaker: 'A', name: 'Interviewer', text: "Excellent. Why do you want this job?", translation: "Bagus sekali. Kenapa Anda menginginkan pekerjaan ini?" }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Bagaimana cara menyebut usia dengan benar?", options: [{ text: "I have 20 years.", correct: false }, { text: "I am 20 years old.", correct: true }, { text: "My age 20.", correct: false }], explanation: "Dalam bahasa Inggris, selalu gunakan 'I am' (to be) untuk usia, jangan pernah 'I have'." },
            { id: 2, prompt: "Seseorang bertanya: 'What do you do?'", options: [{ text: "I am doing fine.", correct: false }, { text: "I am a doctor.", correct: true }, { text: "I am eating.", correct: false }], explanation: "'What do you do?' biasanya berarti 'Apa pekerjaan Anda?', bukan apa yang sedang Anda lakukan sekarang." },
            { id: 3, prompt: "Anda ingin mengatakan asal Anda.", options: [{ text: "I come from Italy.", correct: true }, { text: "I am come Italy.", correct: false }, { text: "I from Italy.", correct: false }], explanation: "Anda bisa mengatakan 'I come from Italy' atau 'I am from Italy'. 'I from' kurang kata kerja." },
            { id: 4, prompt: "Bagaimana bicara tentang hobi?", options: [{ text: "I like cook.", correct: false }, { text: "I like cooking.", correct: true }, { text: "I like for cook.", correct: false }], explanation: "Setelah 'like', kita biasanya menggunakan kata kerja dengan -ing (Gerund), cth: 'cooking'." },
            { id: 5, prompt: "Di mana Anda tinggal?", options: [{ text: "I live on London.", correct: false }, { text: "I live at London.", correct: false }, { text: "I live in London.", correct: true }], explanation: "Gunakan 'IN' untuk kota dan negara. Gunakan 'ON' untuk jalan. Gunakan 'AT' untuk alamat spesifik." },
            { id: 6, prompt: "Bagaimana menanyakan pekerjaan seseorang?", options: [{ text: "What is your job?", correct: true }, { text: "What you work?", correct: false }, { text: "What job you?", correct: false }], explanation: "'What is your job?' atau 'What do you do for a living?' adalah benar." },
            { id: 7, prompt: "Anda seorang siswa. Seseorang bertanya apa yang Anda lakukan.", options: [{ text: "I am student.", correct: false }, { text: "I am a student.", correct: true }, { text: "I study student.", correct: false }], explanation: "Jangan lupa artikel 'a' sebelum profesi: 'I am a student'." },
            { id: 8, prompt: "Bagaimana memperkenalkan teman?", options: [{ text: "This is my friend.", correct: true }, { text: "He is friend.", correct: false }, { text: "Here is friend.", correct: false }], explanation: "'This is [Name]' adalah cara standar memperkenalkan seseorang." },
            { id: 9, prompt: "Seseorang berkata 'Nice to meet you'. Anda menjawab:", options: [{ text: "Me too.", correct: false }, { text: "Nice to meet you too.", correct: true }, { text: "Same.", correct: false }], explanation: "Sopan untuk mengulang frasa lengkap 'Nice to meet you too'." },
            { id: 10, prompt: "Anda ingin mengatakan Anda sudah menikah.", options: [{ text: "I have married.", correct: false }, { text: "I am marry.", correct: false }, { text: "I am married.", correct: true }], explanation: "Gunakan 'I am' + kata sifat: 'I am married'." },
            { id: 11, prompt: "Menanyakan apakah seseorang punya anak.", options: [{ text: "You have kids?", correct: false }, { text: "Do you have any children?", correct: true }, { text: "Are you have children?", correct: false }], explanation: "Gunakan 'Do you have...?' untuk menanyakan kepemilikan." },
            { id: 12, prompt: "Apa respon sopan untuk 'Where are you from?'", options: [{ text: "Guess.", correct: false }, { text: "I'm from Brazil. And you?", correct: true }, { text: "Brazil.", correct: false }], explanation: "Sopan untuk menjawab lalu balik bertanya 'And you?'." },
            { id: 13, prompt: "Bagaimana mengatakan Anda menganggur dengan halus?", options: [{ text: "I have no job.", correct: false }, { text: "I am currently looking for a job.", correct: true }, { text: "I don't work.", correct: false }], explanation: "'Looking for a job' atau 'between jobs' terdengar lebih positif." },
            { id: 14, prompt: "Bicara tentang ukuran keluarga.", options: [{ text: "We are four.", correct: false }, { text: "There are four people in my family.", correct: true }, { text: "My family four.", correct: false }], explanation: "'There are [number] people in my family' adalah struktur yang benar." },
            { id: 15, prompt: "Seseorang bertanya 'How long have you lived here?'", options: [{ text: "Since 2 years.", correct: false }, { text: "For 2 years.", correct: true }, { text: "During 2 years.", correct: false }], explanation: "Gunakan 'for' dengan durasi waktu (cth: for 2 years)." },
            { id: 16, prompt: "Anda ingin tahu hobi seseorang.", options: [{ text: "What is your hobby?", correct: true }, { text: "You like what?", correct: false }, { text: "What do you like hobby?", correct: false }], explanation: "'What is your hobby?' atau 'What do you do for fun?' adalah pertanyaan bagus." },
            { id: 17, prompt: "Mengatakan Anda menyukai dua hal.", options: [{ text: "I like read and swim.", correct: false }, { text: "I like reading and swimming.", correct: true }, { text: "I like reading and swim.", correct: false }], explanation: "Jaga bentuk tetap konsisten: 'reading and swimming'." },
            { id: 18, prompt: "Bagaimana mengakhiri perkenalan diri?", options: [{ text: "That's all.", correct: false }, { text: "That's a little about me.", correct: true }, { text: "Finish.", correct: false }], explanation: "'That's a little about me' adalah cara bagus untuk menutup." },
            { id: 19, prompt: "Meminta nomor telepon seseorang.", options: [{ text: "Give me number.", correct: false }, { text: "Can I have your phone number?", correct: true }, { text: "Number please.", correct: false }], explanation: "Gunakan 'Can I have...?' agar sopan." },
            { id: 20, prompt: "Merespon 'This is my friend, Tom'.", options: [{ text: "Hi Tom.", correct: true }, { text: "Who is Tom?", correct: false }, { text: "Ok.", correct: false }], explanation: "Sapa orang baru tersebut secara langsung." }
        ]
    },
    4: {
        id: 4,
        title: "Informasi Pribadi",
        cultureTip: "Gunakan <b>IN</b> untuk kota dan negara (In London, In Japan). <br /> Gunakan <b>ON</b> untuk nama jalan (On Maple Street). <br /> Gunakan <b>AT</b> untuk alamat spesifik (At 123 Maple Street).",
        scenarios: [
            {
                id: 'c1', title: "Alamat Lengkap (Formal)", context: "Memberikan detail ke petugas pengiriman.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Clerk', text: "Can I have your full address, please?", translation: "Bisa minta alamat lengkap Anda?" },
                    { speaker: 'B', name: 'Customer', text: "It is 123 Maple Street, Apartment 4B.", translation: "Jalan Maple 123, Apartemen 4B." },
                    { speaker: 'A', name: 'Clerk', text: "And the zip code?", translation: "Dan kode posnya?" },
                    { speaker: 'B', name: 'Customer', text: "It is 10001, New York.", translation: "10001, New York." }
                ]
            },
            {
                id: 'c2', title: "Bertukar Nomor (Kasual)", context: "Membuat rencana dengan teman baru.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Sam', text: "What's your number? I'll text you.", translation: "Berapa nomormu? Aku akan SMS kamu." },
                    { speaker: 'B', name: 'Alex', text: "It's 555-0199.", translation: "555-0199." },
                    { speaker: 'A', name: 'Sam', text: "Got it. I'll send you a message now.", translation: "Oke. Aku kirim pesan sekarang." },
                    { speaker: 'B', name: 'Alex', text: "Thanks, I'll wait for it.", translation: "Trims, aku tunggu." }
                ]
            },
            {
                id: 'c3', title: "Alamat Email (Formal)", context: "Mendaftar di meja depan.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Receptionist', text: "I need your email address for the form.", translation: "Saya butuh alamat email Anda untuk formulir." },
                    { speaker: 'B', name: 'Guest', text: "It is david.jones@email.com.", translation: "david.jones@email.com" },
                    { speaker: 'A', name: 'Receptionist', text: "Is that all lowercase?", translation: "Apakah itu huruf kecil semua?" },
                    { speaker: 'B', name: 'Guest', text: "Yes, all small letters.", translation: "Ya, huruf kecil semua." }
                ]
            },
            {
                id: 'c4', title: "Tanggal Lahir (Medis)", context: "Check-in di klinik.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Nurse', text: "What is your date of birth?", translation: "Berapa tanggal lahir Anda?" },
                    { speaker: 'B', name: 'Patient', text: "January 15th, 1990.", translation: "15 Januari 1990." },
                    { speaker: 'A', name: 'Nurse', text: "Thank you. And your place of birth?", translation: "Terima kasih. Dan tempat lahir Anda?" },
                    { speaker: 'B', name: 'Patient', text: "I was born in London, UK.", translation: "Saya lahir di London, Inggris." }
                ]
            },
            {
                id: 'c5', title: "Status Pernikahan (Resmi)", context: "Wawancara atau sensus.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Officer', text: "Are you single or married?", translation: "Apakah Anda lajang atau menikah?" },
                    { speaker: 'B', name: 'Citizen', text: "I am married.", translation: "Saya sudah menikah." },
                    { speaker: 'A', name: 'Officer', text: "Do you have any children?", translation: "Apakah Anda punya anak?" },
                    { speaker: 'B', name: 'Citizen', text: "Yes, I have one daughter.", translation: "Ya, saya punya satu putri." }
                ]
            },
            {
                id: 'c6', title: "Kontrol Paspor", context: "Di imigrasi bandara.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Officer', text: "Passport, please. What is your nationality?", translation: "Paspor, tolong. Apa kewarganegaraan Anda?" },
                    { speaker: 'B', name: 'Traveler', text: "I am French. Here is my passport.", translation: "Saya orang Prancis. Ini paspor saya." },
                    { speaker: 'A', name: 'Officer', text: "Thank you. Are you here for business?", translation: "Terima kasih. Apakah Anda ke sini untuk bisnis?" },
                    { speaker: 'B', name: 'Traveler', text: "No, just for tourism.", translation: "Tidak, hanya untuk wisata." }
                ]
            },
            {
                id: 'c7', title: "Kontak Darurat", context: "Mengisi formulir HR di tempat kerja.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'HR', text: "Who is your emergency contact?", translation: "Siapa kontak darurat Anda?" },
                    { speaker: 'B', name: 'Employee', text: "My wife, Jane Doe.", translation: "Istri saya, Jane Doe." },
                    { speaker: 'A', name: 'HR', text: "What is her phone number?", translation: "Berapa nomor teleponnya?" },
                    { speaker: 'B', name: 'Employee', text: "It is 077-123-4567.", translation: "077-123-4567." }
                ]
            },
            {
                id: 'c8', title: "Media Sosial (Kasual)", context: "Teman baru bertukar info.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Teen 1', text: "Are you on Instagram?", translation: "Kamu punya Instagram?" },
                    { speaker: 'B', name: 'Teen 2', text: "Yes, my username is @travel_mike.", translation: "Ya, username saya @travel_mike." },
                    { speaker: 'A', name: 'Teen 1', text: "Cool, I will follow you.", translation: "Keren, aku akan follow kamu." },
                    { speaker: 'B', name: 'Teen 2', text: "Thanks! I'll follow you back.", translation: "Trims! Aku akan follow balik." }
                ]
            },
            {
                id: 'c9', title: "Mengonfirmasi Detail", context: "Menelepon bank.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Banker', text: "Let me confirm. Your name is Robert Brown?", translation: "Izinkan saya konfirmasi. Nama Anda Robert Brown?" },
                    { speaker: 'B', name: 'Robert', text: "Yes, that is correct.", translation: "Ya, itu benar." },
                    { speaker: 'A', name: 'Banker', text: "And you live at 45 Oak Avenue?", translation: "Dan Anda tinggal di Jalan Oak no 45?" },
                    { speaker: 'B', name: 'Robert', text: "No, I moved. It is 50 Pine Street now.", translation: "Tidak, saya pindah. Sekarang Jalan Pine no 50." }
                ]
            },
            {
                id: 'c10', title: "Preferensi Kontak", context: "Mengakhiri rapat bisnis.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Client', text: "How can we contact you?", translation: "Bagaimana kami bisa menghubungi Anda?" },
                    { speaker: 'B', name: 'Vendor', text: "You can call me or send an email.", translation: "Anda bisa menelepon atau kirim email." },
                    { speaker: 'A', name: 'Client', text: "Which one do you prefer?", translation: "Mana yang Anda lebih suka?" },
                    { speaker: 'B', name: 'Vendor', text: "Email is better. I check it often.", translation: "Email lebih baik. Saya sering mengeceknya." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Bagaimana membaca tahun 1990?", options: [{ text: "One nine nine zero", correct: false }, { text: "Nineteen ninety", correct: true }, { text: "One thousand nine hundred", correct: false }], explanation: "Tahun biasanya dibagi menjadi dua bagian: 19 (nineteen) dan 90 (ninety)." },
            { id: 2, prompt: "Seseorang meminta alamat Anda. Anda berkata:", options: [{ text: "I live on 123 Main St.", correct: false }, { text: "My address is 123 Main St.", correct: true }, { text: "I live 123 Main St.", correct: false }], explanation: "Anda tinggal 'at' (di) alamat spesifik, atau Anda bisa katakan 'My address is...'. 'On' hanya untuk nama jalan." },
            { id: 3, prompt: "Apa arti 'DOB' di formulir?", options: [{ text: "Date of Birth", correct: true }, { text: "Day of Breakfast", correct: false }, { text: "Doctor of Biology", correct: false }], explanation: "DOB singkatan dari Date of Birth (Tanggal Lahir)." },
            { id: 4, prompt: "Bagaimana mengucapkan '@' di alamat email?", options: [{ text: "Around", correct: false }, { text: "At", correct: true }, { text: "Circle A", correct: false }], explanation: "Simbol @ diucapkan 'At'." },
            { id: 5, prompt: "Jika Anda tidak menikah, Anda...", options: [{ text: "Single", correct: true }, { text: "Singular", correct: false }, { text: "Alone", correct: false }], explanation: "'Single' adalah istilah yang benar untuk status pernikahan. 'Alone' adalah perasaan atau keadaan." },
            { id: 6, prompt: "Bagaimana membaca nomor telepon 555-0199?", options: [{ text: "Five hundred fifty five zero...", correct: false }, { text: "Five five five, oh one nine nine.", correct: true }, { text: "Five five five, zero one ninety nine.", correct: false }], explanation: "Kita biasanya mengucapkan setiap digit secara terpisah. '0' sering diucapkan sebagai 'oh'." },
            { id: 7, prompt: "Apa kewarganegaraan Anda?", options: [{ text: "I am France.", correct: false }, { text: "I am French.", correct: true }, { text: "I come form France.", correct: false }], explanation: "'France' adalah negaranya. 'French' adalah kewarganegaraannya." },
            { id: 8, prompt: "Bagaimana meminta email seseorang dengan sopan?", options: [{ text: "Give me email.", correct: false }, { text: "May I have your email address?", correct: true }, { text: "What your email?", correct: false }], explanation: "'May I have...' atau 'Could I have...' adalah bentuk sopan." },
            { id: 9, prompt: "Anda tidak mendengar nama dengan jelas. Anda bertanya:", options: [{ text: "Spell it.", correct: false }, { text: "How do you spell that?", correct: true }, { text: "Write it.", correct: false }], explanation: "'How do you spell that?' menanyakan huruf-huruf nama tersebut." },
            { id: 10, prompt: "Apa arti 'Place of Birth'?", options: [{ text: "When you were born.", correct: false }, { text: "Where you were born.", correct: true }, { text: "Where you list now.", correct: false }], explanation: "'Place' mengacu pada lokasi (kota, negara)." },
            { id: 11, prompt: "Seseorang memeriksa detail Anda. Anda mengonfirmasi dengan mengatakan:", options: [{ text: "Yes, that is correct.", correct: true }, { text: "Yes, is accurate.", correct: false }, { text: "Yes, true.", correct: false }], explanation: "'That is correct' adalah konfirmasi formal standar." },
            { id: 12, prompt: "Bagaimana mengatakan '.' di alamat email?", options: [{ text: "Point", correct: false }, { text: "Dot", correct: true }, { text: "Period", correct: false }], explanation: "Di alamat email, '.' diucapkan 'dot' (cth: dot com)." },
            { id: 13, prompt: "Anda ingin seseorang menyebutkan nomornya lagi.", options: [{ text: "Repeat.", correct: false }, { text: "Could you repeat that, please?", correct: true }, { text: "Say again.", correct: false }], explanation: "Selalu gunakan bentuk pertanyaan sopan seperti 'Could you...'." },
            { id: 14, prompt: "Menjawab 'Where were you born?'", options: [{ text: "I am born in London.", correct: false }, { text: "I was born in London.", correct: true }, { text: "I born in London.", correct: false }], explanation: "Gunakan bentuk lampau 'was born' untuk kelahiran." },
            { id: 15, prompt: "Apa itu 'Surname'?", options: [{ text: "Your first name.", correct: false }, { text: "Your family name (last name).", correct: true }, { text: "Your nickname.", correct: false }], explanation: "Surname adalah kata formal untuk Nama Belakang atau Nama Keluarga." },
            { id: 16, prompt: "Apa itu 'Zip Code'?", options: [{ text: "A phone code.", correct: false }, { text: "A postal code for addresses.", correct: true }, { text: "A secret password.", correct: false }], explanation: "Zip Code (AS) atau Postcode (UK) digunakan untuk pengiriman surat." },
            { id: 17, prompt: "Di formulir, apa itu 'Gender'?", options: [{ text: "Male or Female.", correct: true }, { text: "Your age.", correct: false }, { text: "Your name.", correct: false }], explanation: "Gender mengacu pada jenis kelamin (Pria/Wanita/Lainnya)." },
            { id: 18, prompt: "Apa itu 'Emergency Contact'?", options: [{ text: "The police number.", correct: false }, { text: "A person to call if you are hurt.", correct: true }, { text: "Your doctor.", correct: false }], explanation: "Itu adalah teman atau anggota keluarga yang dihubungi dalam keadaan darurat." },
            { id: 19, prompt: "Apa yang Anda lakukan di bagian bawah formulir?", options: [{ text: "Sign your signature.", correct: true }, { text: "Write a letter.", correct: false }, { text: "Draw a picture.", correct: false }], explanation: "Anda biasanya perlu memberikan tanda tangan untuk memvalidasi formulir." },
            { id: 20, prompt: "Meminta Instagram seseorang.", options: [{ text: "You have Instagram?", correct: false }, { text: "Are you on Instagram?", correct: true }, { text: "Instagram you?", correct: false }], explanation: "'Are you on [Social Media]?' adalah cara alami untuk bertanya." }
        ]
    },
    5: {
        id: 5,
        title: "Kegiatan Sehari-hari",
        cultureTip: "Gunakan kata keterangan seperti <b>'usually'</b> (biasanya), <b>'always'</b> (selalu), <b>'sometimes'</b> (kadang-kadang), atau <b>'never'</b> (tidak pernah) untuk menggambarkan kebiasaan Anda. Contoh: 'I <i>always</i> brush my teeth, but I <i>sometimes</i> skip breakfast.' (Saya <i>selalu</i> menyikat gigi, tapi saya <i>kadang</i> melewatkan sarapan).",
        scenarios: [
            {
                id: 'c1', title: "Bangun Tidur (Kasual)", context: "Bicara tentang kebiasaan pagi.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Tom', text: "What time do you usually wake up?", translation: "Jam berapa biasanya kamu bangun?" },
                    { speaker: 'B', name: 'Jerry', text: "I wake up at 6 AM every day.", translation: "Saya bangun jam 6 pagi setiap hari." },
                    { speaker: 'A', name: 'Tom', text: "Do you get up right away?", translation: "Apakah kamu langsung bangun (turun dari kasur)?" },
                    { speaker: 'B', name: 'Jerry', text: "No, I usually hit the snooze button first.", translation: "Tidak, biasanya saya tekan tombol tunda dulu." }
                ]
            },
            {
                id: 'c2', title: "Rutinitas Sarapan", context: "Membahas makanan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Anna', text: "Do you have breakfast in the morning?", translation: "Apakah kamu sarapan di pagi hari?" },
                    { speaker: 'B', name: 'Elsa', text: "Yes, I usually have toast and coffee.", translation: "Ya, biasanya saya makan roti panggang dan kopi." },
                    { speaker: 'A', name: 'Anna', text: "I always skip breakfast. I am not hungry.", translation: "Saya selalu melewatkan sarapan. Saya tidak lapar." },
                    { speaker: 'B', name: 'Elsa', text: "That is not healthy! You need energy.", translation: "Itu tidak sehat! Kamu butuh energi." }
                ]
            },
            {
                id: 'c3', title: "Perjalanan Kerja", context: "Pergi bekerja atau sekolah.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Colleague', text: "How do you get to work?", translation: "Bagaimana kamu pergi kerja?" },
                    { speaker: 'B', name: 'You', text: "I take the bus. It takes 30 minutes.", translation: "Saya naik bus. Butuh waktu 30 menit." },
                    { speaker: 'A', name: 'Colleague', text: "Is it crowded in the morning?", translation: "Apakah ramai di pagi hari?" },
                    { speaker: 'B', name: 'You', text: "Yes, it is always packed with people.", translation: "Ya, selalu penuh sesak dengan orang." }
                ]
            },
            {
                id: 'c4', title: "Jadwal Kerja (Formal)", context: "Membahas jam kerja.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Manager', text: "When does your shift start?", translation: "Kapan shift Anda dimulai?" },
                    { speaker: 'B', name: 'Employee', text: "I start work at 9:00 sharp.", translation: "Saya mulai kerja jam 9:00 tepat." },
                    { speaker: 'A', name: 'Manager', text: "Do you have a meeting this morning?", translation: "Apakah Anda ada rapat pagi ini?" },
                    { speaker: 'B', name: 'Employee', text: "Yes, the team meeting is at 9:30.", translation: "Ya, rapat tim jam 9:30." }
                ]
            },
            {
                id: 'c5', title: "Istirahat Makan Siang", context: "Memutuskan kapan makan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Sam', text: "When is your lunch break?", translation: "Kapan jam istirahat makan siangmu?" },
                    { speaker: 'B', name: 'Mia', text: "I take a break at 12:30.", translation: "Saya istirahat jam 12:30." },
                    { speaker: 'A', name: 'Sam', text: "Do you bring your own lunch?", translation: "Apakah kamu bawa bekal sendiri?" },
                    { speaker: 'B', name: 'Mia', text: "Sometimes, but today I will buy a sandwich.", translation: "Kadang-kadang, tapi hari ini saya mau beli sandwich." }
                ]
            },
            {
                id: 'c6', title: "Setelah Kerja", context: "Kegiatan sore hari.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend', text: "What do you do after work?", translation: "Apa yang kamu lakukan pulang kerja?" },
                    { speaker: 'B', name: 'You', text: "I go to the gym for an hour.", translation: "Saya pergi ke gym selama satu jam." },
                    { speaker: 'A', name: 'Friend', text: "Every day? You are very active.", translation: "Setiap hari? Kamu aktif sekali." },
                    { speaker: 'B', name: 'You', text: "I try to go three times a week.", translation: "Saya usahakan pergi tiga kali seminggu." }
                ]
            },
            {
                id: 'c7', title: "Waktu Makan Malam", context: "Tugas rumah tangga.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Guest', text: "Who cooks dinner in your house?", translation: "Siapa yang masak makan malam di rumahmu?" },
                    { speaker: 'B', name: 'Host', text: "My husband cooks, and I wash the dishes.", translation: "Suami saya masak, dan saya mencuci piring." },
                    { speaker: 'A', name: 'Guest', text: "That is a good system.", translation: "Itu sistem yang bagus." },
                    { speaker: 'B', name: 'Host', text: "Yes, we usually eat around 7 PM.", translation: "Ya, kami biasanya makan sekitar jam 7 malam." }
                ]
            },
            {
                id: 'c8', title: "Bersantai Malam Hari", context: "Rutinitas istirahat.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Kim', text: "How do you relax in the evening?", translation: "Bagaimana kamu bersantai di malam hari?" },
                    { speaker: 'B', name: 'Lee', text: "I watch TV or read a book.", translation: "Saya nonton TV atau baca buku." },
                    { speaker: 'A', name: 'Kim', text: "Do you check your emails at night?", translation: "Apa kamu cek email di malam hari?" },
                    { speaker: 'B', name: 'Lee', text: "No, I never work at home.", translation: "Tidak, saya tidak pernah kerja di rumah." }
                ]
            },
            {
                id: 'c9', title: "Rutinitas Akhir Pekan", context: "Rencana Sabtu dan Minggu.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Colleague', text: "Do you sleep in on weekends?", translation: "Apakah kamu bangun siang di akhir pekan?" },
                    { speaker: 'B', name: 'You', text: "Yes, I sleep until 10 AM on Saturdays.", translation: "Ya, saya tidur sampai jam 10 pagi di hari Sabtu." },
                    { speaker: 'A', name: 'Colleague', text: "That sounds nice. I wake up early.", translation: "Kedengarannya enak. Saya bangun pagi." },
                    { speaker: 'B', name: 'You', text: "I love sleeping late on my days off.", translation: "Saya suka tidur larut di hari libur." }
                ]
            },
            {
                id: 'c10', title: "Waktu Tidur", context: "Jadwal tidur.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Mom', text: "What time do you go to bed?", translation: "Jam berapa kamu tidur?" },
                    { speaker: 'B', name: 'Son', text: "Usually around 11 PM.", translation: "Biasanya sekitar jam 11 malam." },
                    { speaker: 'A', name: 'Mom', text: "Do you fall asleep quickly?", translation: "Apakah kamu cepat tertidur?" },
                    { speaker: 'B', name: 'Son', text: "Yes, I am usually very tired.", translation: "Ya, biasanya saya sangat lelah." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "I ___ breakfast at 7 AM.", options: [{ text: "do", correct: false }, { text: "have", correct: true }, { text: "make to", correct: false }], explanation: "Kita mengatakan 'have breakfast', 'have lunch', atau 'have dinner'." },
            { id: 2, prompt: "How do you ___ to work?", options: [{ text: "get", correct: true }, { text: "arrive", correct: false }, { text: "reach", correct: false }], explanation: "'Get to work' artinya bepergian/sampai di tempat kerja. 'Arrive' biasanya tidak menggunakan 'to' dalam struktur ini." },
            { id: 3, prompt: "I ___ the bus to school.", options: [{ text: "go", correct: false }, { text: "take", correct: true }, { text: "drive", correct: false }], explanation: "Untuk transportasi umum, kita gunakan 'take' (take the bus, take the train)." },
            { id: 4, prompt: "On weekends, I like to ___ in.", options: [{ text: "sleep", correct: true }, { text: "wake", correct: false }, { text: "stand", correct: false }], explanation: "'Sleep in' berarti bangun lebih siang dari biasanya." },
            { id: 5, prompt: "I go ___ bed at 10 PM.", options: [{ text: "in", correct: false }, { text: "to", correct: true }, { text: "at", correct: false }], explanation: "Frasanya adalah 'go to bed'." },
            { id: 6, prompt: "Jam berapakah 'Half past seven'?", options: [{ text: "7:15", correct: false }, { text: "7:30", correct: true }, { text: "6:30", correct: false }], explanation: "'Half past' menambahkan 30 menit ke jam tersebut (7:30)." },
            { id: 7, prompt: "I brush my teeth ___ I eat breakfast.", options: [{ text: "after", correct: true }, { text: "next", correct: false }, { text: "then", correct: false }], explanation: "Gunakan 'after' untuk menunjukkan urutan kejadian." },
            { id: 8, prompt: "I put ___ my clothes.", options: [{ text: "in", correct: false }, { text: "on", correct: true }, { text: "at", correct: false }], explanation: "Frasa kerjanya adalah 'put on' (memakai)." },
            { id: 9, prompt: "I brush my ___.", options: [{ text: "tooth", correct: false }, { text: "teeth", correct: true }, { text: "tooths", correct: false }], explanation: "'Teeth' adalah bentuk jamak dari 'tooth'." },
            { id: 10, prompt: "I ___ a shower every morning.", options: [{ text: "make", correct: false }, { text: "take", correct: true }, { text: "do", correct: false }], explanation: "Anda 'take a shower' atau 'have a shower' (mandi)." },
            { id: 11, prompt: "I leave ___ work at 8 AM.", options: [{ text: "for", correct: true }, { text: "to", correct: false }, { text: "at", correct: false }], explanation: "Anda 'leave for' sebuah tujuan (berangkat kerja)." },
            { id: 12, prompt: "I arrive ___ home at 6 PM.", options: [{ text: "at", correct: false }, { text: "to", correct: false }, { text: "---", correct: true }], explanation: "Kita mengatakan 'arrive home' tanpa preposisi." },
            { id: 13, prompt: "I watch ___ in the evening.", options: [{ text: "TV", correct: true }, { text: "the TV", correct: false }, { text: "a TV", correct: false }], explanation: "Kita biasanya mengatakan 'watch TV' (media), bukan objek fisiknya." },
            { id: 14, prompt: "Who ___ dinner tonight?", options: [{ text: "cooks", correct: true }, { text: "cooking", correct: false }, { text: "cook", correct: false }], explanation: "Pertanyaan orang ketiga tunggal: 'Who cooks?'" },
            { id: 15, prompt: "I go ___ on Saturdays.", options: [{ text: "shop", correct: false }, { text: "shopping", correct: true }, { text: "to shop", correct: false }], explanation: "Go + Verb-ing umum untuk aktivitas: 'go shopping'." },
            { id: 16, prompt: "I need to ___ the house.", options: [{ text: "clean", correct: true }, { text: "wash", correct: false }, { text: "clear", correct: false }], explanation: "'Clean the house' berarti membersihkan rumah secara umum." },
            { id: 17, prompt: "I ___ late for work.", options: [{ text: "am always", correct: true }, { text: "always am", correct: false }, { text: "is always", correct: false }], explanation: "Kata keterangan frekuensi biasanya setelah 'to be': 'I am always...'." },
            { id: 18, prompt: "I need to walk the ___.", options: [{ text: "dog", correct: true }, { text: "cat", correct: false }, { text: "fish", correct: false }], explanation: "Tugas harian umum adalah 'walking the dog' (mengajak anjing jalan)." },
            { id: 19, prompt: "I read the ___ every morning.", options: [{ text: "news", correct: true }, { text: "new", correct: false }, { text: "notice", correct: false }], explanation: "'The news' mengacu pada berita/peristiwa terkini." },
            { id: 20, prompt: "I check my ___.", options: [{ text: "messages", correct: true }, { text: "massage", correct: false }, { text: "messengers", correct: false }], explanation: "Anda mengecek 'messages' (pesan) atau 'emails' Anda." }
        ]
    },
    6: {
        id: 6,
        title: "Keluarga & Orang",
        cultureTip: "\"What is he <b>like</b>?\" (Seperti apa dia?) menanyakan tentang <b>kepribadian</b> (baik, lucu, pintar). <br /> \"What does he <b>look like</b>?\" (Seperti apa rupanya?) menanyakan tentang <b>penampilan</b> (tinggi, berambut pendek).",
        scenarios: [
            {
                id: 'c1', title: "Foto Keluarga", context: "Menunjukkan foto ke teman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'You', text: "Who is this in the photo?", translation: "Siapa ini di foto?" },
                    { speaker: 'B', name: 'Friend', text: "That is my older brother, James.", translation: "Itu kakak laki-laki saya, James." },
                    { speaker: 'A', name: 'You', text: "He looks very tall.", translation: "Dia terlihat sangat tinggi." },
                    { speaker: 'B', name: 'Friend', text: "Yes, he is the tallest in our family.", translation: "Ya, dia yang paling tinggi di keluarga kami." }
                ]
            },
            {
                id: 'c2', title: "Saudara Kandung", context: "Berkenalan dengan seseorang.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Tom', text: "Do you have any brothers or sisters?", translation: "Apakah kamu punya saudara?" },
                    { speaker: 'B', name: 'Sarah', text: "I have one younger sister.", translation: "Saya punya satu adik perempuan." },
                    { speaker: 'A', name: 'Tom', text: "Do you get along well?", translation: "Apakah kalian akur?" },
                    { speaker: 'B', name: 'Sarah', text: "Mostly, but sometimes we argue.", translation: "Biasanya, tapi kadang kami bertengkar." }
                ]
            },
            {
                id: 'c3', title: "Pekerjaan Orang Tua", context: "Membahas latar belakang keluarga.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Alex', text: "What do your parents do?", translation: "Apa pekerjaan orang tuamu?" },
                    { speaker: 'B', name: 'Ben', text: "My father is a doctor and my mom is a teacher.", translation: "Ayah saya dokter dan ibu saya guru." },
                    { speaker: 'A', name: 'Alex', text: "That sounds impressive.", translation: "Kedengarannya hebat." },
                    { speaker: 'B', name: 'Ben', text: "They work very hard.", translation: "Mereka bekerja sangat keras." }
                ]
            },
            {
                id: 'c4', title: "Kakek-Nenek", context: "Bicara tentang kerabat.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Kim', text: "Do you live with your grandparents?", translation: "Apa kamu tinggal dengan kakek-nenekmu?" },
                    { speaker: 'B', name: 'Lee', text: "No, they live in the countryside.", translation: "Tidak, mereka tinggal di pedesaan." },
                    { speaker: 'A', name: 'Kim', text: "Do you visit them often?", translation: "Apa kamu sering mengunjungi mereka?" },
                    { speaker: 'B', name: 'Lee', text: "Yes, we visit every Sunday.", translation: "Ya, kami berkunjung setiap hari Minggu." }
                ]
            },
            {
                id: 'c5', title: "Paman dan Bibi", context: "Kumpul keluarga.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Guest', text: "Who is that man over there?", translation: "Siapa pria di sebelah sana?" },
                    { speaker: 'B', name: 'Host', text: "That is my Uncle Bob. He is my dad's brother.", translation: "Itu Paman Bob. Dia saudara laki-laki ayah saya." },
                    { speaker: 'A', name: 'Guest', text: "And the woman next to him?", translation: "Dan wanita di sebelahnya?" },
                    { speaker: 'B', name: 'Host', text: "That is his wife, my Aunt Mary.", translation: "Itu istrinya, Bibi Mary saya." }
                ]
            },
            {
                id: 'c6', title: "Anak-anak", context: "Orang tua mengobrol.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Parent 1', text: "How many children do you have?", translation: "Berapa anak yang Anda punya?" },
                    { speaker: 'B', name: 'Parent 2', text: "I have two children. A son and a daughter.", translation: "Saya punya dua anak. Satu putra dan satu putri." },
                    { speaker: 'A', name: 'Parent 1', text: "How old are they?", translation: "Berapa umur mereka?" },
                    { speaker: 'B', name: 'Parent 2', text: "My son is 5 and my daughter is 3.", translation: "Putra saya 5 tahun dan putri saya 3 tahun." }
                ]
            },
            {
                id: 'c7', title: "Sepupu", context: "Membahas keluarga besar.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Dan', text: "Are you close with your cousins?", translation: "Apa kamu dekat dengan sepupumu?" },
                    { speaker: 'B', name: 'Mia', text: "Yes, I have many cousins.", translation: "Ya, saya punya banyak sepupu." },
                    { speaker: 'A', name: 'Dan', text: "Do you see them often?", translation: "Apa kamu sering bertemu mereka?" },
                    { speaker: 'B', name: 'Mia', text: "We play together every holiday.", translation: "Kami bermain bersama setiap liburan." }
                ]
            },
            {
                id: 'c8', title: "Mendeskripsikan Penampilan", context: "Mendeskripsikan anggota keluarga.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Cop', text: "What does your father look like?", translation: "Seperti apa rupa ayahmu?" },
                    { speaker: 'B', name: 'Boy', text: "He has short gray hair and glasses.", translation: "Dia berambut pendek abu-abu dan berkacamata." },
                    { speaker: 'A', name: 'Cop', text: "Is he tall?", translation: "Apakah dia tinggi?" },
                    { speaker: 'B', name: 'Boy', text: "No, he is average height.", translation: "Tidak, tingginya rata-rata." }
                ]
            },
            {
                id: 'c9', title: "Kepribadian", context: "Mendeskripsikan sifat.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend', text: "What is your sister like?", translation: "Seperti apa sifat kakakmu?" },
                    { speaker: 'B', name: 'You', text: "She is very funny and kind.", translation: "Dia sangat lucu dan baik hati." },
                    { speaker: 'A', name: 'Friend', text: "Is she shy?", translation: "Apakah dia pemalu?" },
                    { speaker: 'B', name: 'You', text: "No, she loves talking to people.", translation: "Tidak, dia suka bicara dengan orang." }
                ]
            },
            {
                id: 'c10', title: "Status Pernikahan", context: "Wawancara formal.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Officer', text: "Please state your marital status.", translation: "Tolong sebutkan status pernikahan Anda." },
                    { speaker: 'B', name: 'Citizen', text: "I am currently single.", translation: "Saya saat ini lajang." },
                    { speaker: 'A', name: 'Officer', text: "Do you have any dependents?", translation: "Apakah Anda punya tanggungan?" },
                    { speaker: 'B', name: 'Citizen', text: "No, I have no children.", translation: "Tidak, saya tidak punya anak." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Saudara perempuan ibu Anda adalah ___ Anda.", options: [{ text: "Uncle", correct: false }, { text: "Aunt", correct: true }, { text: "Cousin", correct: false }], explanation: "Saudara perempuan orang tua Anda adalah Bibi (Aunt) Anda." },
            { id: 2, prompt: "Anak laki-laki saudara Anda adalah ___ Anda.", options: [{ text: "Nephew", correct: true }, { text: "Niece", correct: false }, { text: "Grandson", correct: false }], explanation: "Anak laki-laki dari saudara kandung adalah Keponakan Laki-laki (Nephew)." },
            { id: 3, prompt: "Jika Anda tidak punya saudara kandung, Anda adalah ___.", options: [{ text: "Only child", correct: true }, { text: "Alone child", correct: false }, { text: "One child", correct: false }], explanation: "Istilah yang benar adalah 'Only child' (Anak tunggal)." },
            { id: 4, prompt: "My father has ___ hair.", options: [{ text: "shortly", correct: false }, { text: "short", correct: true }, { text: "shorter", correct: false }], explanation: "Gunakan kata sifat 'short' untuk mendeskripsikan panjang rambut." },
            { id: 5, prompt: "My sister is very ___ (selalu tersenyum).", options: [{ text: "angry", correct: false }, { text: "friendly", correct: true }, { text: "sad", correct: false }], explanation: "Friendly berarti ramah dan menyenangkan." },
            { id: 6, prompt: "Ayah dari ayah Anda adalah ___ Anda.", options: [{ text: "Grandfather", correct: true }, { text: "Uncle", correct: false }, { text: "Brother", correct: false }], explanation: "Grandfather (Kakek) adalah ayah dari orang tua Anda." },
            { id: 7, prompt: "Anak paman Anda adalah ___ Anda.", options: [{ text: "Nephew", correct: false }, { text: "Cousin", correct: true }, { text: "Sibling", correct: false }], explanation: "Anak dari paman dan bibi adalah sepupu (cousin)." },
            { id: 8, prompt: "He ___ tall and thin.", options: [{ text: "is", correct: true }, { text: "has", correct: false }, { text: "does", correct: false }], explanation: "Kita gunakan 'is' untuk kata sifat seperti tinggi, kurus, pendek." },
            { id: 9, prompt: "She ___ blue eyes.", options: [{ text: "is", correct: false }, { text: "has", correct: true }, { text: "got", correct: false }], explanation: "Kita gunakan 'has' untuk bagian tubuh seperti mata, rambut." },
            { id: 10, prompt: "My brother is older ___ me.", options: [{ text: "then", correct: false }, { text: "than", correct: true }, { text: "that", correct: false }], explanation: "Gunakan 'than' (daripada) untuk perbandingan." },
            { id: 11, prompt: "How many ___ do you have?", options: [{ text: "siblings", correct: true }, { text: "sibling", correct: false }, { text: "brother", correct: false }], explanation: "Gunakan jamak 'siblings' (saudara kandung) saat bertanya 'berapa banyak'." },
            { id: 12, prompt: "Nenek saya sangat ___ (sangat baik).", options: [{ text: "kind", correct: true }, { text: "rude", correct: false }, { text: "scary", correct: false }], explanation: "'Kind' berarti baik hati dan penyayang." },
            { id: 13, prompt: "What ___ he look like?", options: [{ text: "is", correct: false }, { text: "does", correct: true }, { text: "do", correct: false }], explanation: "Struktur pertanyaan: 'What does [subject] look like?'" },
            { id: 14, prompt: "What ___ she like? (kepribadian)", options: [{ text: "is", correct: true }, { text: "does", correct: false }, { text: "has", correct: false }], explanation: "Struktur pertanyaan: 'What is [subject] like?' untuk kepribadian." },
            { id: 15, prompt: "He wears ___.", options: [{ text: "glass", correct: false }, { text: "glasses", correct: true }, { text: "glance", correct: false }], explanation: "Kita mengatakan 'glasses' (jamak) untuk kacamata." },
            { id: 16, prompt: "Anak perempuan saudara perempuan Anda adalah ___ Anda.", options: [{ text: "Niece", correct: true }, { text: "Nephew", correct: false }, { text: "Cousin", correct: false }], explanation: "Anak perempuan dari saudara kandung adalah Keponakan Perempuan (Niece)." },
            { id: 17, prompt: "My parents ___ hard working.", options: [{ text: "is", correct: false }, { text: "are", correct: true }, { text: "be", correct: false }], explanation: "Parents (jamak) menggunakan 'are'." },
            { id: 18, prompt: "We are a large ___.", options: [{ text: "family", correct: true }, { text: "families", correct: false }, { text: "familiar", correct: false }], explanation: "Sekelompok kerabat adalah 'family' (kata benda tunggal)." },
            { id: 19, prompt: "She is ___. (belum menikah)", options: [{ text: "single", correct: true }, { text: "singular", correct: false }, { text: "one", correct: false }], explanation: "'Single' mendeskripsikan status pernikahan." },
            { id: 20, prompt: "Dia punya ___ (rambut di atas bibir).", options: [{ text: "beard", correct: false }, { text: "mustache", correct: true }, { text: "hair", correct: false }], explanation: "Rambut di atas bibir adalah kumis (mustache). Rambut di dagu/pipi adalah jenggot (beard)." }
        ]
    },
    7: {
        id: 7,
        title: "Waktu & Hari",
        cultureTip: "Hanya gunakan <b>\"o'clock\"</b> untuk jam yang tepat (contoh: 7:00 adalah \"Seven o'clock\"). <br /> Jangan gunakan itu untuk 7:30. Katakan \"Seven thirty\" atau \"Half past seven\" (Setengah delapan).",
        scenarios: [
            {
                id: 'c1', title: "Menanyakan Waktu (Kasual)", context: "Bertanya pada orang asing di jalan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'You', text: "Excuse me, do you have the time?", translation: "Permisi, apakah Anda tahu jam berapa sekarang?" },
                    { speaker: 'B', name: 'Stranger', text: "Yes, it is half past three.", translation: "Ya, jam tiga lewat setengah (03:30)." },
                    { speaker: 'A', name: 'You', text: "Thank you very much.", translation: "Terima kasih banyak." },
                    { speaker: 'B', name: 'Stranger', text: "No problem.", translation: "Sama-sama." }
                ]
            },
            {
                id: 'c2', title: "Terlambat (Formal)", context: "Menelepon bos atau kolega.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Employee', text: "I am sorry, I am running a bit late.", translation: "Maaf, saya agak terlambat." },
                    { speaker: 'B', name: 'Boss', text: "What time will you arrive?", translation: "Jam berapa Anda akan tiba?" },
                    { speaker: 'A', name: 'Employee', text: "I should be there by 9:15.", translation: "Saya seharusnya sampai jam 9:15." },
                    { speaker: 'B', name: 'Boss', text: "Okay, the meeting starts at 9:30.", translation: "Oke, rapat dimulai jam 9:30." }
                ]
            },
            {
                id: 'c3', title: "Membuat Janji Temu", context: "Memesan kunjungan dokter.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Receptionist', text: "When would you like to come in?", translation: "Kapan Anda ingin datang?" },
                    { speaker: 'B', name: 'Patient', text: "Are you free on Tuesday morning?", translation: "Apakah ada jadwal kosong Selasa pagi?" },
                    { speaker: 'A', name: 'Receptionist', text: "We have an opening at 10 AM.", translation: "Kami ada kosong jam 10 pagi." },
                    { speaker: 'B', name: 'Patient', text: "That works perfectly for me.", translation: "Itu sangat pas buat saya." }
                ]
            },
            {
                id: 'c4', title: "Jam Buka Toko", context: "Bertanya pada pegawai toko.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Customer', text: "What time do you close today?", translation: "Jam berapa Anda tutup hari ini?" },
                    { speaker: 'B', name: 'Clerk', text: "We close at 6 PM sharp.", translation: "Kami tutup jam 6 sore tepat." },
                    { speaker: 'A', name: 'Customer', text: "And when do you open tomorrow?", translation: "Dan kapan Anda buka besok?" },
                    { speaker: 'B', name: 'Clerk', text: "We open at 9 AM every day.", translation: "Kami buka jam 9 pagi setiap hari." }
                ]
            },
            {
                id: 'c5', title: "Jadwal Kereta", context: "Di stasiun kereta.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Traveler', text: "When is the next train to London?", translation: "Kapan kereta selanjutnya ke London?" },
                    { speaker: 'B', name: 'Agent', text: "It leaves in twenty minutes.", translation: "Berangkat dalam dua puluh menit." },
                    { speaker: 'A', name: 'Traveler', text: "How long is the journey?", translation: "Berapa lama perjalanannya?" },
                    { speaker: 'B', name: 'Agent', text: "It takes about two hours.", translation: "Memakan waktu sekitar dua jam." }
                ]
            },
            {
                id: 'c6', title: "Waktu Film", context: "Teman berencana nonton film.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Sam', text: "What time does the movie start?", translation: "Jam berapa filmnya mulai?" },
                    { speaker: 'B', name: 'Alex', text: "It starts at quarter to eight.", translation: "Mulai jam delapan kurang seperempat (7:45)." },
                    { speaker: 'A', name: 'Sam', text: "We should leave now then.", translation: "Kalau begitu kita harus berangkat sekarang." },
                    { speaker: 'B', name: 'Alex', text: "Yes, or we will be late.", translation: "Ya, atau kita akan terlambat." }
                ]
            },
            {
                id: 'c7', title: "Reservasi Makan Malam", context: "Menelepon restoran.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Host', text: "What time would you like to book?", translation: "Jam berapa Anda ingin reservasi?" },
                    { speaker: 'B', name: 'Caller', text: "Table for two at 7:30 PM, please.", translation: "Meja untuk dua orang jam 7:30 malam, tolong." },
                    { speaker: 'A', name: 'Host', text: "Sorry, we are full then. Is 8 PM okay?", translation: "Maaf, kami penuh saat itu. Apakah jam 8 malam oke?" },
                    { speaker: 'B', name: 'Caller', text: "8 PM is fine. Thank you.", translation: "Jam 8 malam tidak apa-apa. Terima kasih." }
                ]
            },
            {
                id: 'c8', title: "Menanyakan Tanggal", context: "Menandatangani dokumen.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Signer', text: "What is the date today?", translation: "Tanggal berapa hari ini?" },
                    { speaker: 'B', name: 'Witness', text: "It is the 15th of March.", translation: "Tanggal 15 Maret." },
                    { speaker: 'A', name: 'Signer', text: "Is it a Wednesday?", translation: "Apakah hari ini Rabu?" },
                    { speaker: 'B', name: 'Witness', text: "No, today is Thursday.", translation: "Tidak, hari ini Kamis." }
                ]
            },
            {
                id: 'c9', title: "Rencana Ulang Tahun", context: "Ngobrol dengan teman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend 1', text: "When is your birthday?", translation: "Kapan ulang tahunmu?" },
                    { speaker: 'B', name: 'Friend 2', text: "It is on July 21st.", translation: "Tanggal 21 Juli." },
                    { speaker: 'A', name: 'Friend 1', text: "That is next week!", translation: "Itu minggu depan!" },
                    { speaker: 'B', name: 'Friend 2', text: "Yes, I am turning 30.", translation: "Ya, saya menginjak usia 30." }
                ]
            },
            {
                id: 'c10', title: "Perbedaan Waktu", context: "Panggilan video ke luar negeri.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Caller', text: "Is it morning there?", translation: "Apakah di sana pagi?" },
                    { speaker: 'B', name: 'Receiver', text: "No, it is already night here.", translation: "Tidak, di sini sudah malam." },
                    { speaker: 'A', name: 'Caller', text: "What time is it exactly?", translation: "Jam berapa tepatnya?" },
                    { speaker: 'B', name: 'Receiver', text: "It is 11 PM. Time to sleep!", translation: "Jam 11 malam. Waktunya tidur!" }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Rapatnya ___ hari Senin.", options: [{ text: "at", correct: false }, { text: "on", correct: true }, { text: "in", correct: false }], explanation: "Gunakan 'ON' untuk hari dalam seminggu (On Monday, On Tuesday)." },
            { id: 2, prompt: "Saya bangun ___ jam 7 tepat.", options: [{ text: "at", correct: true }, { text: "on", correct: false }, { text: "to", correct: false }], explanation: "Gunakan 'AT' untuk jam tertentu (At 7 o'clock, At 5:30)." },
            { id: 3, prompt: "Apa artinya 'Half past two'?", options: [{ text: "2:15", correct: false }, { text: "2:30", correct: true }, { text: "1:30", correct: false }], explanation: "'Half past' berarti 30 menit setelah jam tersebut." },
            { id: 4, prompt: "Ulang tahun saya ___ bulan Agustus.", options: [{ text: "on", correct: false }, { text: "in", correct: true }, { text: "at", correct: false }], explanation: "Gunakan 'IN' untuk bulan dan tahun (In August, In 2024)." },
            { id: 5, prompt: "Toko tutup ___ malam hari.", options: [{ text: "in", correct: false }, { text: "on", correct: false }, { text: "at", correct: true }], explanation: "Kita mengatakan 'at night'. Tapi, 'in the morning', 'in the afternoon', 'in the evening'." },
            { id: 6, prompt: "Ini jam ___ to five (4:45).", options: [{ text: "quarter", correct: true }, { text: "half", correct: false }, { text: "part", correct: false }], explanation: "4:45 adalah 'Quarter to five' (Jam lima kurang seperempat/15 menit)." },
            { id: 7, prompt: "Sampai jumpa ___ akhir pekan.", options: [{ text: "in", correct: false }, { text: "at", correct: true }, { text: "to", correct: false }], explanation: "Bahasa Inggris UK: 'At the weekend'. AS: 'On the weekend'. Keduanya bisa diterima, 'in' salah." },
            { id: 8, prompt: "Pestanya ___ tanggal 10 Mei.", options: [{ text: "in", correct: false }, { text: "at", correct: false }, { text: "on", correct: true }], explanation: "Gunakan 'ON' untuk tanggal spesifik (On 10th May)." },
            { id: 9, prompt: "What ___ is it?", options: [{ text: "clock", correct: false }, { text: "time", correct: true }, { text: "hour", correct: false }], explanation: "Kita bertanya 'What time is it?'" },
            { id: 10, prompt: "Sekarang jam 12:00 PM. Itu adalah ___.", options: [{ text: "midnight", correct: false }, { text: "noon", correct: true }, { text: "night", correct: false }], explanation: "12:00 PM adalah Noon (siang hari). 12:00 AM adalah Midnight (tengah malam)." },
            { id: 11, prompt: "Saya lahir ___ 1995.", options: [{ text: "at", correct: false }, { text: "on", correct: false }, { text: "in", correct: true }], explanation: "Gunakan 'IN' untuk tahun." },
            { id: 12, prompt: "Kereta berangkat ___ 10 menit lagi.", options: [{ text: "in", correct: true }, { text: "at", correct: false }, { text: "on", correct: false }], explanation: "Gunakan 'IN' untuk menyatakan durasi/waktu di masa depan dari sekarang." },
            { id: 13, prompt: "Hari ini adalah ___.", options: [{ text: "Tuesday", correct: true }, { text: "the Tuesday", correct: false }, { text: "a Tuesday", correct: false }], explanation: "Kita mengatakan 'Today is Tuesday' (tanpa artikel)." },
            { id: 14, prompt: "Berapa ___ hari ini?", options: [{ text: "day", correct: false }, { text: "date", correct: true }, { text: "data", correct: false }], explanation: "Saat menanyakan angka kalender (cth: 5 Juli), tanyakan 'date' (tanggal)." },
            { id: 15, prompt: "Sekarang jam 3 lewat 5 menit (3:05). (Five ___ three).", options: [{ text: "past", correct: true }, { text: "to", correct: false }, { text: "after", correct: false }], explanation: "'Five past three' artinya 5 menit setelah jam 3." },
            { id: 16, prompt: "Sampai jumpa ___ minggu depan.", options: [{ text: "at", correct: false }, { text: "on", correct: false }, { text: "---", correct: true }], explanation: "Kita tidak menggunakan preposisi sebelum 'next' (See you next week)." },
            { id: 17, prompt: "Kami makan siang ___ siang hari.", options: [{ text: "at", correct: true }, { text: "in", correct: false }, { text: "on", correct: false }], explanation: "Gunakan 'AT' dengan noon, midnight, night." },
            { id: 18, prompt: "Butuh dua jam ___ sampai sana.", options: [{ text: "for", correct: false }, { text: "to", correct: true }, { text: "at", correct: false }], explanation: "'It takes [waktu] TO [kata kerja]'." },
            { id: 19, prompt: "Tokonya buka ___ jam 9 sampai 5.", options: [{ text: "at", correct: false }, { text: "from", correct: true }, { text: "on", correct: false }], explanation: "Gunakan 'from... to...' untuk rentang waktu." },
            { id: 20, prompt: "___ time do you close?", options: [{ text: "When", correct: false }, { text: "What", correct: true }, { text: "Which", correct: false }], explanation: "'What time' adalah frasa pertanyaan standar." }
        ]
    },
    8: {
        id: 8,
        title: "Tempat & Arah",
        cultureTip: "Gunakan <b>\"Is there a bank...?\"</b> jika Anda tidak tahu apakah ada bank di dekat situ. <br /> Gunakan <b>\"Where is the bank?\"</b> jika Anda tahu bank itu ada tapi tidak tahu lokasinya.",
        scenarios: [
            {
                id: 'c1', title: "Menanyakan Arah (Kasual)", context: "Di jalan.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Tourist', text: "Excuse me, is there a bank near here?", translation: "Permisi, apakah ada bank di dekat sini?" },
                    { speaker: 'B', name: 'Local', text: "Yes, go straight and turn left at the corner.", translation: "Ya, jalan lurus dan belok kiri di pojokan." },
                    { speaker: 'A', name: 'Tourist', text: "Is it far from here?", translation: "Apakah jauh dari sini?" },
                    { speaker: 'B', name: 'Local', text: "No, it is just a two-minute walk.", translation: "Tidak, hanya dua menit jalan kaki." }
                ]
            },
            {
                id: 'c2', title: "Mencari Kamar Kecil", context: "Di restoran.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Customer', text: "Excuse me, where is the restroom?", translation: "Permisi, di mana kamar kecilnya?" },
                    { speaker: 'B', name: 'Waiter', text: "It is down the hall, on the right.", translation: "Ada di ujung lorong, di sebelah kanan." },
                    { speaker: 'A', name: 'Customer', text: "Thank you very much.", translation: "Terima kasih banyak." },
                    { speaker: 'B', name: 'Waiter', text: "You are welcome.", translation: "Sama-sama." }
                ]
            },
            {
                id: 'c3', title: "Naik Taksi (Formal)", context: "Di dalam taksi.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Driver', text: "Where would you like to go?", translation: "Anda ingin pergi ke mana?" },
                    { speaker: 'B', name: 'Passenger', text: "Please take me to the airport, Terminal 2.", translation: "Tolong antar saya ke bandara, Terminal 2." },
                    { speaker: 'A', name: 'Driver', text: "Sure. Do you want to take the highway?", translation: "Baik. Apakah Anda ingin lewat jalan tol?" },
                    { speaker: 'B', name: 'Passenger', text: "Yes, please. I am in a hurry.", translation: "Ya, tolong. Saya sedang terburu-buru." }
                ]
            },
            {
                id: 'c4', title: "Di Mal", context: "Mencari toko tertentu.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Shopper', text: "Do you know where the shoe store is?", translation: "Apakah kamu tahu di mana toko sepatu?" },
                    { speaker: 'B', name: 'Guard', text: "It is on the second floor, next to the cinema.", translation: "Ada di lantai dua, di sebelah bioskop." },
                    { speaker: 'A', name: 'Shopper', text: "Is there an elevator nearby?", translation: "Apakah ada lift di dekat sini?" },
                    { speaker: 'B', name: 'Guard', text: "Yes, just behind you.", translation: "Ya, tepat di belakang Anda." }
                ]
            },
            {
                id: 'c5', title: "Pertanyaan Halte Bus", context: "Menunggu bus.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Commuter', text: "Does this bus go to the city center?", translation: "Apakah bus ini pergi ke pusat kota?" },
                    { speaker: 'B', name: 'Local', text: "No, you need the number 5 bus.", translation: "Tidak, Anda butuh bus nomor 5." },
                    { speaker: 'A', name: 'Commuter', text: "Where can I catch that one?", translation: "Di mana saya bisa naik bus itu?" },
                    { speaker: 'B', name: 'Local', text: "At the stop across the street.", translation: "Di halte seberang jalan." }
                ]
            },
            {
                id: 'c6', title: "Mencari Tempat di Peta", context: "Wisatawan melihat peta.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Alex', text: "We are here. Where is the museum?", translation: "Kita di sini. Di mana museumnya?" },
                    { speaker: 'B', name: 'Ben', text: "It looks like we need to go north.", translation: "Sepertinya kita harus pergi ke utara." },
                    { speaker: 'A', name: 'Alex', text: "So, straight ahead?", translation: "Jadi, lurus ke depan?" },
                    { speaker: 'B', name: 'Ben', text: "Yes, past the big park.", translation: "Ya, melewati taman besar." }
                ]
            },
            {
                id: 'c7', title: "Meminta Rekomendasi", context: "Bertanya pada warga lokal.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Visitor', text: "Is there a good cafe around here?", translation: "Apakah ada kafe yang bagus di sekitar sini?" },
                    { speaker: 'B', name: 'Local', text: "Yes, 'Joe's Coffee' is great.", translation: "Ya, 'Joe's Coffee' sangat bagus." },
                    { speaker: 'A', name: 'Visitor', text: "How do I get there?", translation: "Bagaimana cara ke sana?" },
                    { speaker: 'B', name: 'Local', text: "Turn right at the traffic light.", translation: "Belok kanan di lampu merah." }
                ]
            },
            {
                id: 'c8', title: "Stasiun Kereta Bawah Tanah", context: "Menanyakan stasiun terdekat.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Person A', text: "Where is the nearest subway station?", translation: "Di mana stasiun kereta bawah tanah terdekat?" },
                    { speaker: 'B', name: 'Person B', text: "Go down this street for two blocks.", translation: "Jalan terus di jalan ini sejauh dua blok." },
                    { speaker: 'A', name: 'Person A', text: "Is it on the left or right?", translation: "Apakah di kiri atau kanan?" },
                    { speaker: 'B', name: 'Person B', text: "It is on your left side.", translation: "Ada di sisi kiri Anda." }
                ]
            },
            {
                id: 'c9', title: "Tersesat di Kota", context: "Bertanya pada petugas polisi.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Lost Person', text: "Excuse me, officer. I think I am lost.", translation: "Permisi, petugas. Sepertinya saya tersesat." },
                    { speaker: 'B', name: 'Officer', text: "Where are you trying to go?", translation: "Anda mencoba pergi ke mana?" },
                    { speaker: 'A', name: 'Lost Person', text: "I am looking for the Grand Hotel.", translation: "Saya mencari Hotel Grand." },
                    { speaker: 'B', name: 'Officer', text: "It is just around the corner.", translation: "Itu tepat di tikungan (dekat sekali)." }
                ]
            },
            {
                id: 'c10', title: "Tempat Parkir", context: "Mencari parkir.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Driver', text: "Can I park here?", translation: "Bolehkah saya parkir di sini?" },
                    { speaker: 'B', name: 'Attendant', text: "No, this is a no-parking zone.", translation: "Tidak, ini zona dilarang parkir." },
                    { speaker: 'A', name: 'Driver', text: "Where should I park then?", translation: "Lalu di mana saya harus parkir?" },
                    { speaker: 'B', name: 'Attendant', text: "There is a parking lot behind the building.", translation: "Ada tempat parkir di belakang gedung." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Untuk maju, Anda berjalan ___.", options: [{ text: "Back", correct: false }, { text: "Straight", correct: true }, { text: "Left", correct: false }], explanation: "'Go straight' berarti bergerak maju ke arah yang Anda hadapi." },
            { id: 2, prompt: "Di mana bank? Itu ada ___ pojokan.", options: [{ text: "on", correct: false }, { text: "at", correct: true }, { text: "in", correct: false }], explanation: "Kita mengatakan 'at the corner' (titik spesifik) atau 'on the corner' (permukaan). 'At' sangat umum untuk titik lokasi." },
            { id: 3, prompt: "Toko itu ___ perpustakaan (di sebelah).", options: [{ text: "near", correct: false }, { text: "next", correct: true }, { text: "between", correct: false }], explanation: "Frasanya adalah 'next to' (di sebelah/samping)." },
            { id: 4, prompt: "___ me, di mana stasiunnya?", options: [{ text: "Excuse", correct: true }, { text: "Sorry", correct: false }, { text: "Hello", correct: false }], explanation: "'Excuse me' adalah cara sopan untuk memulai percakapan dengan orang asing." },
            { id: 5, prompt: "Pergi ___ jembatan (melewati atas).", options: [{ text: "over", correct: true }, { text: "on", correct: false }, { text: "above", correct: false }], explanation: "Kita mengatakan 'go over the bridge' (melewati jembatan)." },
            { id: 6, prompt: "Belok ___ di lampu merah.", options: [{ text: "right", correct: true }, { text: "straight", correct: false }, { text: "up", correct: false }], explanation: "Arah melibatkan belok 'left' (kiri) atau 'right' (kanan)." },
            { id: 7, prompt: "Itu ___ dari sini (jarak).", options: [{ text: "long", correct: false }, { text: "far", correct: true }, { text: "distance", correct: false }], explanation: "Kita gunakan 'far' untuk mendeskripsikan jarak yang jauh." },
            { id: 8, prompt: "Apakah ada hotel ___ sini?", options: [{ text: "near", correct: true }, { text: "next", correct: false }, { text: "close to", correct: false }], explanation: "'Near here' adalah frasa umum. 'Close to here' juga oke tapi 'near here' lebih sederhana." },
            { id: 9, prompt: "Bioskop ada di ___ bank dan taman.", options: [{ text: "among", correct: false }, { text: "between", correct: true }, { text: "middle", correct: false }], explanation: "Gunakan 'between' ketika sesuatu berada di tengah dua hal lain." },
            { id: 10, prompt: "Ambil belokan kiri yang ___.", options: [{ text: "one", correct: false }, { text: "first", correct: true }, { text: "once", correct: false }], explanation: "Nomor urut (first, second, third) digunakan untuk belokan." },
            { id: 11, prompt: "Jalan ___ jalan ini (menyusuri).", options: [{ text: "down", correct: true }, { text: "under", correct: false }, { text: "low", correct: false }], explanation: "'Go down the street' berarti berjalan menyusurinya." },
            { id: 12, prompt: "Itu ada di lantai ___.", options: [{ text: "two", correct: false }, { text: "second", correct: true }, { text: "twice", correct: false }], explanation: "Gunakan nomor urut untuk lantai gedung (first, second, third)." },
            { id: 13, prompt: "Seberangi ___.", options: [{ text: "street", correct: true }, { text: "way", correct: false }, { text: "straight", correct: false }], explanation: "Kita 'cross the street' atau 'cross the road'." },
            { id: 14, prompt: "Itu ada di ___ sekolah.", options: [{ text: "front", correct: false }, { text: "in front", correct: true }, { text: "before", correct: false }], explanation: "Frasa preposisinya adalah 'in front of' (di depan)." },
            { id: 15, prompt: "Jalan ___ dua blok.", options: [{ text: "for", correct: true }, { text: "in", correct: false }, { text: "at", correct: false }], explanation: "Gunakan 'for' untuk menunjukkan durasi jarak (Walk for two miles)." },
            { id: 16, prompt: "Museum ada di sebelah kiri (___ the left).", options: [{ text: "in", correct: false }, { text: "at", correct: false }, { text: "on", correct: true }], explanation: "Gunakan 'ON' dengan left/right." },
            { id: 17, prompt: "Bagaimana cara saya ___ ke bandara?", options: [{ text: "get", correct: true }, { text: "go", correct: false }, { text: "arrive", correct: false }], explanation: "'How do I get to...' adalah cara standar menanyakan arah." },
            { id: 18, prompt: "___ gereja (melewati).", options: [{ text: "Come", correct: false }, { text: "Go", correct: true }, { text: "Get", correct: false }], explanation: "'Go past' berarti melewati sesuatu." },
            { id: 19, prompt: "Itu di belakang ___.", options: [{ text: "your", correct: false }, { text: "you", correct: true }, { text: "yours", correct: false }], explanation: "Gunakan kata ganti objek 'you' setelah preposisi." },
            { id: 20, prompt: "Anda tidak mungkin melewatkannya (You can't ___ it).", options: [{ text: "lose", correct: false }, { text: "miss", correct: true }, { text: "lost", correct: false }], explanation: "'You can't miss it' adalah idiom umum yang berarti mudah ditemukan." }
        ]
    },
    9: {
        id: 9,
        title: "Makanan & Minuman",
        cultureTip: "Daripada mengatakan \"I want...\", gunakan <b>\"I'll have...\"</b> atau <b>\"I'd like...\"</b> saat memesan makanan. Itu terdengar jauh lebih sopan dan alami.",
        scenarios: [
            {
                id: 'c1', title: "Memesan Kopi", context: "Di konter kafe.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Barista', text: "What can I get for you today?", translation: "Apa yang bisa saya siapkan untuk Anda hari ini?" },
                    { speaker: 'B', name: 'Customer', text: "I'll have a medium latte, please.", translation: "Saya pesan latte ukuran sedang." },
                    { speaker: 'A', name: 'Barista', text: "Would you like any sugar with that?", translation: "Apakah Anda ingin gula?" },
                    { speaker: 'B', name: 'Customer', text: "No thanks, just milk.", translation: "Tidak terima kasih, hanya susu." }
                ]
            },
            {
                id: 'c2', title: "Reservasi Meja", context: "Menelepon restoran.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Host', text: "Good afternoon, Pizza Palace.", translation: "Selamat siang, Pizza Palace." },
                    { speaker: 'B', name: 'Caller', text: "Hi, I would like to book a table for two.", translation: "Hai, saya ingin memesan meja untuk dua orang." },
                    { speaker: 'A', name: 'Host', text: "Certainly. For what time?", translation: "Tentu. Untuk jam berapa?" },
                    { speaker: 'B', name: 'Caller', text: "Tonight at 7 PM, please.", translation: "Malam ini jam 7 malam, tolong." }
                ]
            },
            {
                id: 'c3', title: "Memesan Makan Malam", context: "Duduk di restoran.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Waiter', text: "Are you ready to order?", translation: "Apakah Anda siap memesan?" },
                    { speaker: 'B', name: 'Guest', text: "Yes, I will have the chicken steak.", translation: "Ya, saya pesan steak ayam." },
                    { speaker: 'A', name: 'Waiter', text: "And for your drink?", translation: "Dan untuk minumannya?" },
                    { speaker: 'B', name: 'Guest', text: "Just mineral water, thank you.", translation: "Air mineral saja, terima kasih." }
                ]
            },
            {
                id: 'c4', title: "Makanan Cepat Saji", context: "Di layanan tanpa turun (drive-thru).", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Staff', text: "Welcome. Can I take your order?", translation: "Selamat datang. Bisa saya catat pesanan Anda?" },
                    { speaker: 'B', name: 'Driver', text: "I want a cheeseburger meal.", translation: "Saya mau paket cheeseburger." },
                    { speaker: 'A', name: 'Staff', text: "What drink do you want with that?", translation: "Minumnya mau apa?" },
                    { speaker: 'B', name: 'Driver', text: "Coke, please. No ice.", translation: "Coca-cola. Tanpa es." }
                ]
            },
            {
                id: 'c5', title: "Membayar Tagihan", context: "Menyelesaikan makan.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Guest', text: "Excuse me, can we have the bill?", translation: "Permisi, boleh minta bon tagihannya?" },
                    { speaker: 'B', name: 'Waiter', text: "Here you go. Paying by cash or card?", translation: "Ini dia. Bayar tunai atau kartu?" },
                    { speaker: 'A', name: 'Guest', text: "Credit card, please.", translation: "Kartu kredit, tolong." },
                    { speaker: 'B', name: 'Waiter', text: "Sure, please enter your PIN.", translation: "Baik, silakan masukkan PIN Anda." }
                ]
            },
            {
                id: 'c6', title: "Pantangan Makanan", context: "Bertanya tentang bahan-bahan.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Diner', text: "Does this soup contain nuts?", translation: "Apakah sup ini mengandung kacang?" },
                    { speaker: 'B', name: 'Chef', text: "Yes, it has peanuts in it.", translation: "Ya, ada kacang tanah di dalamnya." },
                    { speaker: 'A', name: 'Diner', text: "I am allergic to nuts.", translation: "Saya alergi kacang." },
                    { speaker: 'B', name: 'Chef', text: "Then I recommend the tomato soup.", translation: "Kalau begitu saya sarankan sup tomat." }
                ]
            },
            {
                id: 'c7', title: "Belanja Bahan Makanan", context: "Bertanya lokasi barang.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Shopper', text: "Excuse me, where is the milk?", translation: "Permisi, di mana susunya?" },
                    { speaker: 'B', name: 'Clerk', text: "It is in Aisle 3, next to the cheese.", translation: "Ada di Lorong 3, di sebelah keju." },
                    { speaker: 'A', name: 'Shopper', text: "Do you have fresh eggs too?", translation: "Apakah ada telur segar juga?" },
                    { speaker: 'B', name: 'Clerk', text: "Yes, they are right behind you.", translation: "Ya, ada tepat di belakang Anda." }
                ]
            },
            {
                id: 'c8', title: "Menawarkan Makanan", context: "Menjamu tamu.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Host', text: "Would you like some cake?", translation: "Apakah kamu mau kue?" },
                    { speaker: 'B', name: 'Guest', text: "Yes, please. It looks delicious.", translation: "Ya, tolong. Kelihatannya enak." },
                    { speaker: 'A', name: 'Host', text: "Here you go. Do you want tea?", translation: "Ini dia. Mau teh?" },
                    { speaker: 'B', name: 'Guest', text: "No thanks, I am full.", translation: "Tidak terima kasih, saya sudah kenyang." }
                ]
            },
            {
                id: 'c9', title: "Preferensi Makanan", context: "Membahas suka dan tidak suka.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend 1', text: "Do you like spicy food?", translation: "Apa kamu suka makanan pedas?" },
                    { speaker: 'B', name: 'Friend 2', text: "I love it! The hotter the better.", translation: "Saya suka sekali! Makin pedas makin enak." },
                    { speaker: 'A', name: 'Friend 1', text: "I can't eat spicy food at all.", translation: "Saya tidak bisa makan pedas sama sekali." },
                    { speaker: 'B', name: 'Friend 2', text: "We should go for sushi then.", translation: "Kita harus makan sushi kalau begitu." }
                ]
            },
            {
                id: 'c10', title: "Memuji Juru Masak", context: "Makan di rumah teman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Guest', text: "This pasta is amazing!", translation: "Pasta ini luar biasa!" },
                    { speaker: 'B', name: 'Cook', text: "Thank you. Is it salty enough?", translation: "Terima kasih. Apakah cukup asin?" },
                    { speaker: 'A', name: 'Guest', text: "It is perfect. Can I have the recipe?", translation: "Ini sempurna. Boleh minta resepnya?" },
                    { speaker: 'B', name: 'Cook', text: "Sure, I will send it to you.", translation: "Tentu, saya akan kirimkan padamu." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Saya ingin ___ meja (reservasi).", options: [{ text: "buy", correct: false }, { text: "book", correct: true }, { text: "sell", correct: false }], explanation: "'Book a table' berarti membuat reservasi." },
            { id: 2, prompt: "Boleh saya minta ___, tolong? (Untuk membayar)", options: [{ text: "bill", correct: true }, { text: "menu", correct: false }, { text: "order", correct: false }], explanation: "'Bill' (atau check) adalah kertas yang menunjukkan berapa yang harus Anda bayar." },
            { id: 3, prompt: "Saya ___. Ayo makan.", options: [{ text: "thirsty", correct: false }, { text: "hungry", correct: true }, { text: "angry", correct: false }], explanation: "Hungry (lapar) berarti Anda butuh makanan." },
            { id: 4, prompt: "Apakah Anda punya meja ___?", options: [{ text: "empty", correct: false }, { text: "free", correct: true }, { text: "open", correct: false }], explanation: "Meskipun 'empty' masuk akal, kita biasanya meminta 'free table' atau 'available table'." },
            { id: 5, prompt: "Would you ___ some coffee?", options: [{ text: "want", correct: false }, { text: "like", correct: true }, { text: "love", correct: false }], explanation: "'Would you like' adalah cara sopan untuk menawarkan sesuatu." },
            { id: 6, prompt: "Saya pesan (I'll ___) salad ayam.", options: [{ text: "have", correct: true }, { text: "eat", correct: false }, { text: "has", correct: false }], explanation: "'I'll have...' adalah frasa umum saat memesan makanan." },
            { id: 7, prompt: "Boleh saya lihat ___ (daftar makanan)?", options: [{ text: "food list", correct: false }, { text: "menu", correct: true }, { text: "card", correct: false }], explanation: "Daftar makanan disebut 'menu'." },
            { id: 8, prompt: "___ meal, please. (Selamat makan)", options: [{ text: "For", correct: false }, { text: "To", correct: false }, { text: "Enjoy your", correct: true }], explanation: "Kita mengatakan 'Enjoy your meal'." },
            { id: 9, prompt: "Meja ___ dua orang, tolong.", options: [{ text: "for", correct: true }, { text: "to", correct: false }, { text: "of", correct: false }], explanation: "Kita mengatakan 'Table for two', 'Table for four', dst." },
            { id: 10, prompt: "Saya alergi ___ kacang tanah.", options: [{ text: "with", correct: false }, { text: "to", correct: true }, { text: "at", correct: false }], explanation: "Preposisi yang digunakan dengan 'allergic' adalah 'to'." },
            { id: 11, prompt: "Apakah Anda siap untuk ___?", options: [{ text: "cook", correct: false }, { text: "order", correct: true }, { text: "pay", correct: false }], explanation: "Pelayan bertanya 'Are you ready to order?' (Siap untuk memesan?)" },
            { id: 12, prompt: "Ada lagi? (Can I get you anything ___?)", options: [{ text: "else", correct: true }, { text: "other", correct: false }, { text: "more", correct: false }], explanation: "'Anything else?' berarti 'Ada hal lain?'." },
            { id: 13, prompt: "Ambil saja ___ (kembaliannya).", options: [{ text: "money", correct: false }, { text: "change", correct: true }, { text: "cash", correct: false }], explanation: "'Keep the change' diucapkan saat memberi tip." },
            { id: 14, prompt: "Apakah Anda menerima ___ (kartu kredit)?", options: [{ text: "cards", correct: true }, { text: "paper", correct: false }, { text: "money", correct: false }], explanation: "Kita bertanya 'Do you accept credit cards?'" },
            { id: 15, prompt: "Saya memesan ini ___ (20 menit yang lalu).", options: [{ text: "twenty minutes ago", correct: true }, { text: "twenty minutes past", correct: false }, { text: "twenty minutes before", correct: false }], explanation: "Gunakan 'ago' untuk waktu lampau relatif terhadap sekarang." },
            { id: 16, prompt: "Rasanya ___ (enak).", options: [{ text: "delicious", correct: true }, { text: "beautiful", correct: false }, { text: "pretty", correct: false }], explanation: "Kita menggunakan 'delicious' atau 'good' untuk rasa makanan." },
            { id: 17, prompt: "___ atau air soda?", options: [{ text: "Still", correct: true }, { text: "Quite", correct: false }, { text: "Normal", correct: false }], explanation: "'Still water' adalah air tanpa gelembung (air mineral biasa)." },
            { id: 18, prompt: "Saya ___ kenyang (sangat).", options: [{ text: "so", correct: true }, { text: "much", correct: false }, { text: "many", correct: false }], explanation: "'So full' adalah penguat umum." },
            { id: 19, prompt: "___ pedas? (Is it spicy?)", options: [{ text: "Is it", correct: true }, { text: "Does it", correct: false }, { text: "Has it", correct: false }], explanation: "Tanyakan 'Is it spicy?'" },
            { id: 20, prompt: "Boleh minta ___ (serbet)?", options: [{ text: "serviette", correct: false }, { text: "napkin", correct: true }, { text: "towel", correct: false }], explanation: "'Napkin' adalah kata yang paling umum untuk kain/kertas pembersih mulut. 'Serviette' juga digunakan di UK/Aus/NZ tapi Napkin dimengerti secara universal." }
        ]
    },
    10: {
        id: 10,
        title: "Hobi & Minat",
        cultureTip: "Daripada cuma bilang \"I like...\", Anda bisa bilang <b>\"I'm into...\"</b> supaya terdengar lebih luwes/alami. <br /> Contoh: \"I am into rock music.\" (Saya tertarik/suka musik rock).",
        scenarios: [
            {
                id: 'c1', title: "Obrolan Olahraga", context: "Dua teman bicara olahraga.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Tom', text: "Do you like football?", translation: "Apakah kamu suka sepak bola?" },
                    { speaker: 'B', name: 'Ben', text: "Yes, I play every Saturday.", translation: "Ya, saya bermain setiap hari Sabtu." },
                    { speaker: 'A', name: 'Tom', text: "Who is your favorite team?", translation: "Siapa tim favoritmu?" },
                    { speaker: 'B', name: 'Ben', text: "I am a big fan of Manchester United.", translation: "Saya penggemar berat Manchester United." }
                ]
            },
            {
                id: 'c2', title: "Minat Musik", context: "Membahas alat musik.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Sarah', text: "Can you play any musical instruments?", translation: "Bisakah kamu memainkan alat musik?" },
                    { speaker: 'B', name: 'Mike', text: "I play the guitar a little bit.", translation: "Saya main gitar sedikit-sedikit." },
                    { speaker: 'A', name: 'Sarah', text: "That is cool. What kind of music do you play?", translation: "Itu keren. Jenis musik apa yang kamu mainkan?" },
                    { speaker: 'B', name: 'Mike', text: "Mostly rock and pop songs.", translation: "Kebanyakan lagu rock dan pop." }
                ]
            },
            {
                id: 'c3', title: "Malam Nonton Film", context: "Memilih film untuk ditonton.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Jane', text: "What kind of movies do you like?", translation: "Jenis film apa yang kamu suka?" },
                    { speaker: 'B', name: 'Paul', text: "I love action movies and comedies.", translation: "Saya suka film aksi dan komedi." },
                    { speaker: 'A', name: 'Jane', text: "How about horror movies?", translation: "Bagaimana dengan film horor?" },
                    { speaker: 'B', name: 'Paul', text: "No way! They are too scary.", translation: "Tidak mau! Itu terlalu menakutkan." }
                ]
            },
            {
                id: 'c4', title: "Kebiasaan Membaca", context: "Bicara tentang buku.", level: "Formal",
                dialogue: [
                    { speaker: 'A', name: 'Librarian', text: "Are you interested in history books?", translation: "Apakah Anda tertarik dengan buku sejarah?" },
                    { speaker: 'B', name: 'Student', text: "Yes, I enjoy reading about the past.", translation: "Ya, saya menikmati membaca tentang masa lalu." },
                    { speaker: 'A', name: 'Librarian', text: "We have a new collection over there.", translation: "Kami punya koleksi baru di sebelah sana." },
                    { speaker: 'B', name: 'Student', text: "Thank you. I will check it out.", translation: "Terima kasih. Saya akan melihatnya." }
                ]
            },
            {
                id: 'c5', title: "Hobi Akhir Pekan", context: "Merencanakan waktu luang.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Friend 1', text: "What do you do on weekends?", translation: "Apa yang kamu lakukan di akhir pekan?" },
                    { speaker: 'B', name: 'Friend 2', text: "I usually go hiking in the mountains.", translation: "Saya biasanya mendaki di pegunungan." },
                    { speaker: 'A', name: 'Friend 1', text: "Is it difficult?", translation: "Apakah itu sulit?" },
                    { speaker: 'B', name: 'Friend 2', text: "It is tiring, but the view is beautiful.", translation: "Melelahkan, tapi pemandangannya indah." }
                ]
            },
            {
                id: 'c6', title: "Memasak", context: "Berbagi resep.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Chef', text: "Do you enjoy cooking?", translation: "Apakah kamu menikmati memasak?" },
                    { speaker: 'B', name: 'Guest', text: "I love baking cakes.", translation: "Saya suka memanggang kue." },
                    { speaker: 'A', name: 'Chef', text: "What is your specialty?", translation: "Apa spesialisasi kamu?" },
                    { speaker: 'B', name: 'Guest', text: "My chocolate cake is very famous.", translation: "Kue cokelat saya sangat terkenal." }
                ]
            },
            {
                id: 'c7', title: "Bermain Gim", context: "Dua gamer mengobrol.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Gamer 1', text: "Do you play video games?", translation: "Apa kamu main video game?" },
                    { speaker: 'B', name: 'Gamer 2', text: "Yes, I play online games every night.", translation: "Ya, saya main game online setiap malam." },
                    { speaker: 'A', name: 'Gamer 1', text: "What game are you playing now?", translation: "Game apa yang sedang kamu mainkan sekarang?" },
                    { speaker: 'B', name: 'Gamer 2', text: "I am playing a racing game.", translation: "Saya sedang main game balapan." }
                ]
            },
            {
                id: 'c8', title: "Mengoleksi", context: "Menunjukkan koleksi.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Visitor', text: "Wow, you have so many coins!", translation: "Wow, kamu punya banyak koin!" },
                    { speaker: 'B', name: 'Collector', text: "Yes, collecting coins is my hobby.", translation: "Ya, mengoleksi koin adalah hobi saya." },
                    { speaker: 'A', name: 'Visitor', text: "Where are they from?", translation: "Dari mana asalnya?" },
                    { speaker: 'B', name: 'Collector', text: "They are from all over the world.", translation: "Mereka dari seluruh dunia." }
                ]
            },
            {
                id: 'c9', title: "Kelas Seni", context: "Membahas melukis.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Student A', text: "I am terrible at drawing.", translation: "Saya sangat buruk dalam menggambar." },
                    { speaker: 'B', name: 'Student B', text: "Don't worry. Practice makes perfect.", translation: "Jangan khawatir. Latihan membuat sempurna." },
                    { speaker: 'A', name: 'Student A', text: "Do you paint often?", translation: "Apa kamu sering melukis?" },
                    { speaker: 'B', name: 'Student B', text: "Yes, painting relaxes me.", translation: "Ya, melukis membuat saya rileks." }
                ]
            },
            {
                id: 'c10', title: "Berkebun", context: "Bicara tentang tanaman.", level: "Casual",
                dialogue: [
                    { speaker: 'A', name: 'Neighbor 1', text: "Your garden looks amazing.", translation: "Kebunmu terlihat luar biasa." },
                    { speaker: 'B', name: 'Neighbor 2', text: "Thanks. I love gardening.", translation: "Terima kasih. Saya suka berkebun." },
                    { speaker: 'A', name: 'Neighbor 1', text: "What are you growing?", translation: "Apa yang sedang kamu tanam?" },
                    { speaker: 'B', name: 'Neighbor 2', text: "Mostly tomatoes and flowers.", translation: "Kebanyakan tomat dan bunga." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Saya menikmati ___ bola.", options: [{ text: "play", correct: false }, { text: "playing", correct: true }, { text: "played", correct: false }], explanation: "Setelah 'enjoy', kita biasanya menggunakan verb + ing (Gerund)." },
            { id: 2, prompt: "Saya tertarik ___ musik.", options: [{ text: "on", correct: false }, { text: "in", correct: true }, { text: "at", correct: false }], explanation: "Frasa yang benar adalah 'interested in'." },
            { id: 3, prompt: "Apa hobi kamu? (What do you do for ___?)", options: [{ text: "fun", correct: true }, { text: "funny", correct: false }, { text: "happy", correct: false }], explanation: "'What do you do for fun?' artinya 'Apa hobimu?'." },
            { id: 4, prompt: "Hobi saya ___ foto.", options: [{ text: "making", correct: false }, { text: "doing", correct: false }, { text: "taking", correct: true }], explanation: "Kita mengatakan 'taking pictures' atau 'taking photos'." },
            { id: 5, prompt: "Saya ___ berat band itu.", options: [{ text: "fan", correct: true }, { text: "fun", correct: false }, { text: "friend", correct: false }], explanation: "'Fan' adalah penggemar yang mengagumi seseorang, tim, dll." },
            { id: 6, prompt: "Saya ___ ski.", options: [{ text: "go", correct: true }, { text: "do", correct: false }, { text: "play", correct: false }], explanation: "Gunakan 'go' untuk aktivitas berakhiran -ing (go swimming, go skiing)." },
            { id: 7, prompt: "Dia ___ yoga.", options: [{ text: "goes", correct: false }, { text: "does", correct: true }, { text: "plays", correct: false }], explanation: "Gunakan 'do' untuk bela diri, yoga, senam (do yoga)." },
            { id: 8, prompt: "Kami ___ basket.", options: [{ text: "go", correct: false }, { text: "do", correct: false }, { text: "play", correct: true }], explanation: "Gunakan 'play' untuk permainan bola dan permainan kompetitif." },
            { id: 9, prompt: "Saya sangat suka (I am keen ___) fotografi.", options: [{ text: "on", correct: true }, { text: "in", correct: false }, { text: "at", correct: false }], explanation: "Frasanya adalah 'keen on'." },
            { id: 10, prompt: "Apakah kamu memainkan ___ (alat musik)?", options: [{ text: "instruments", correct: true }, { text: "music tools", correct: false }, { text: "equipment", correct: false }], explanation: "Alat musik disebut 'instruments'." },
            { id: 11, prompt: "Saya mendengarkan (listen ___) musik.", options: [{ text: "to", correct: true }, { text: "at", correct: false }, { text: "with", correct: false }], explanation: "Selalu gunakan 'listen to'." },
            { id: 12, prompt: "Hobi saya ___ membaca dan memasak.", options: [{ text: "is", correct: false }, { text: "are", correct: true }, { text: "am", correct: false }], explanation: "Subjek jamak (hobbies) menggunakan kata kerja jamak (are)." },
            { id: 13, prompt: "Dia mengoleksi ___ (perangko).", options: [{ text: "stamps", correct: true }, { text: "letters", correct: false }, { text: "mails", correct: false }], explanation: "Mengoleksi perangko (stamps) adalah hobi umum." },
            { id: 14, prompt: "Saya menghabiskan waktu luang ___ TV.", options: [{ text: "watch", correct: false }, { text: "watching", correct: true }, { text: "watched", correct: false }], explanation: "Spend time + verb-ing." },
            { id: 15, prompt: "Apakah kamu tertarik (Are you ___ ) olahraga?", options: [{ text: "into", correct: true }, { text: "onto", correct: false }, { text: "inside", correct: false }], explanation: "'Into' berarti tertarik pada sesuatu (bahasa gaul/akrab)." },
            { id: 16, prompt: "Saya lebih suka ___ (jalan kaki) daripada lari.", options: [{ text: "walk", correct: false }, { text: "walking", correct: true }, { text: "walked", correct: false }], explanation: "Prefer [Gerund] to [Gerund]." },
            { id: 17, prompt: "Ayo pergi ___ (mendaki).", options: [{ text: "hike", correct: true }, { text: "hiking", correct: false }, { text: "hiker", correct: false }], explanation: "Go for a [kata benda/kegiatan]." },
            { id: 18, prompt: "Apa kamu mau ___ (nonton) film?", options: [{ text: "look", correct: false }, { text: "see", correct: true }, { text: "sight", correct: false }], explanation: "Kita 'see' atau 'watch' film." },
            { id: 19, prompt: "Saya jago ___ catur (good at).", options: [{ text: "in", correct: false }, { text: "at", correct: true }, { text: "on", correct: false }], explanation: "Gunakan 'good at' untuk kemampuan." },
            { id: 20, prompt: "Dia tergila-gila (crazy ___) K-pop.", options: [{ text: "about", correct: true }, { text: "for", correct: false }, { text: "with", correct: false }], explanation: "'Crazy about' berarti sangat menyukai sesuatu." }
        ]
    },
    11: {
        id: 11,
        title: "Tinjauan & Penilaian",
        cultureTip: "<ul><li>Gunakan <b>\"I am\"</b> untuk usia dan pekerjaan (I am 20, I am a student).</li><li>Gunakan <b>\"Have\"</b> untuk makanan/minuman (I have breakfast).</li><li><b>\"IN\"</b> untuk bulan/kota, <b>\"ON\"</b> untuk hari/jalan, <b>\"AT\"</b> untuk waktu/tempat spesifik.</li></ul>",
        scenarios: [
            {
                id: 'c1', title: "Menyapa (Ulasan)", context: "Bertemu orang baru di pesta.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'You', text: "Hello! I don't think we've met. I'm Sarah.", translation: "Halo! Sepertinya kita belum bertemu. Saya Sarah." },
                    { speaker: 'B', name: 'New Friend', text: "Hi Sarah. I'm David. Nice to meet you.", translation: "Hai Sarah. Saya David. Senang bertemu denganmu." },
                    { speaker: 'A', name: 'You', text: "Nice to meet you too. Where are you from?", translation: "Senang bertemu denganmu juga. Dari mana asalmu?" },
                    { speaker: 'B', name: 'New Friend', text: "I'm from Chicago. How about you?", translation: "Saya dari Chicago. Bagaimana denganmu?" }
                ]
            },
            {
                id: 'c2', title: "Detail Pribadi (Ulasan)", context: "Bertukar info kontak.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Colleague', text: "What is your phone number?", translation: "Berapa nomor teleponmu?" },
                    { speaker: 'B', name: 'You', text: "It is 0812-555-0199.", translation: "0812-555-0199." },
                    { speaker: 'A', name: 'Colleague', text: "And how do you spell your last name?", translation: "Dan bagaimana mengeja nama belakangmu?" },
                    { speaker: 'B', name: 'You', text: "It is R-E-I-D. Reid.", translation: "R-E-I-D. Reid." }
                ]
            },
            {
                id: 'c3', title: "Rutinitas Harian (Ulasan)", context: "Bicara tentang jadwal.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Friend', text: "What time do you usually get up?", translation: "Jam berapa biasanya kamu bangun?" },
                    { speaker: 'B', name: 'You', text: "I get up at 7 o'clock.", translation: "Saya bangun jam 7 tepat." },
                    { speaker: 'A', name: 'Friend', text: "And when do you go to work?", translation: "Dan kapan kamu pergi kerja?" },
                    { speaker: 'B', name: 'You', text: "I leave the house at 8:30.", translation: "Saya berangkat dari rumah jam 8:30." }
                ]
            },
            {
                id: 'c4', title: "Keluarga (Ulasan)", context: "Bicara tentang saudara.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Sam', text: "Do you have a big family?", translation: "Apakah kamu punya keluarga besar?" },
                    { speaker: 'B', name: 'Mia', text: "Not really. I have one older brother.", translation: "Tidak juga. Saya punya satu kakak laki-laki." },
                    { speaker: 'A', name: 'Sam', text: "Is he married?", translation: "Apakah dia sudah menikah?" },
                    { speaker: 'B', name: 'Mia', text: "Yes, he has a wife and two sons.", translation: "Ya, dia punya istri dan dua anak laki-laki." }
                ]
            },
            {
                id: 'c5', title: "Waktu & Janji Temu (Ulasan)", context: "Mengatur waktu pertemuan.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Client', text: "Are you free on Monday morning?", translation: "Apakah Anda luang Senin pagi?" },
                    { speaker: 'B', name: 'You', text: "Sorry, I am busy then. How about Tuesday?", translation: "Maaf, saya sibuk saat itu. Bagaimana kalau Selasa?" },
                    { speaker: 'A', name: 'Client', text: "Tuesday at 2 PM works for me.", translation: "Selasa jam 2 siang bisa buat saya." },
                    { speaker: 'B', name: 'You', text: "Great. See you on Tuesday.", translation: "Bagus. Sampai jumpa hari Selasa." }
                ]
            },
            {
                id: 'c6', title: "Arah (Ulasan)", context: "Mencari bank.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Tourist', text: "Excuse me, where is the nearest bank?", translation: "Permisi, di mana bank terdekat?" },
                    { speaker: 'B', name: 'Local', text: "Go straight and turn right at the corner.", translation: "Jalan lurus dan belok kanan di pojokan." },
                    { speaker: 'A', name: 'Tourist', text: "Is it next to the supermarket?", translation: "Apakah di sebelah supermarket?" },
                    { speaker: 'B', name: 'Local', text: "Yes, exactly. It is on your left.", translation: "Ya, tepat sekali. Ada di sebelah kirimu." }
                ]
            },
            {
                id: 'c7', title: "Memesan Makanan (Ulasan)", context: "Di restoran.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Waiter', text: "Are you ready to order?", translation: "Apakah Anda siap memesan?" },
                    { speaker: 'B', name: 'Customer', text: "I'll have the chicken salad, please.", translation: "Saya pesan salad ayam." },
                    { speaker: 'A', name: 'Waiter', text: "Anything to drink?", translation: "Ada minumannya?" },
                    { speaker: 'B', name: 'Customer', text: "Just a glass of water.", translation: "Hanya segelas air." }
                ]
            },
            {
                id: 'c8', title: "Hobi (Ulasan)", context: "Membahas waktu luang.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Tom', text: "What do you do for fun?", translation: "Apa yang kamu lakukan untuk bersenang-senang?" },
                    { speaker: 'B', name: 'Jerry', text: "I enjoy playing video games.", translation: "Saya menikmati main video game." },
                    { speaker: 'A', name: 'Tom', text: "Me too! We should play together.", translation: "Saya juga! Kita harus main bareng." },
                    { speaker: 'B', name: 'Jerry', text: "Sure, let's do it this weekend.", translation: "Tentu, ayo main akhir pekan ini." }
                ]
            },
            {
                id: 'c9', title: "Berbelanja (Ulasan)", context: "Membeli pakaian.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'Clerk', text: "Can I help you find anything?", translation: "Bisa saya bantu carikan sesuatu?" },
                    { speaker: 'B', name: 'Shopper', text: "Yes, do you have this shirt in blue?", translation: "Ya, apakah ada kemeja ini yang warna biru?" },
                    { speaker: 'A', name: 'Clerk', text: "Let me check the size. Medium?", translation: "Biar saya cek ukurannya. Medium?" },
                    { speaker: 'B', name: 'Shopper', text: "Yes, medium please.", translation: "Ya, medium tolong." }
                ]
            },
            {
                id: 'c10', title: "Berpamitan (Ulasan)", context: "Mengakhiri percakapan.", level: "Mixed",
                dialogue: [
                    { speaker: 'A', name: 'You', text: "It was nice talking to you.", translation: "Senang mengobrol denganmu." },
                    { speaker: 'B', name: 'Friend', text: "You too. We should do this again.", translation: "Kamu juga. Kita harus lakukan ini lagi." },
                    { speaker: 'A', name: 'You', text: "Definitely. Have a good night!", translation: "Pasti. Selamat malam!" },
                    { speaker: 'B', name: 'Friend', text: "Bye! Take care.", translation: "Dah! Hati-hati." }
                ]
            }
        ],
        practiceQuestions: [
            { id: 1, prompt: "Sekarang jam 8 pagi. Anda berkata: ___", options: [{ text: "Good evening", correct: false }, { text: "Good morning", correct: true }, { text: "Good night", correct: false }], explanation: "Pagi adalah sampai jam 12 siang." },
            { id: 2, prompt: "Respon untuk 'How do you do?'", options: [{ text: "I'm fine", correct: false }, { text: "How do you do?", correct: true }, { text: "Nice to meet you", correct: false }], explanation: "Respon salam formal adalah frasa yang sama." },
            { id: 3, prompt: "Bagaimana mengeja 'Coffee'?", options: [{ text: "C-O-F-E", correct: false }, { text: "C-O-Double F-Double E", correct: true }, { text: "C-O-F-F-E", correct: false }], explanation: "Huruf ganda (Double) umum digunakan." },
            { id: 4, prompt: "Klarifikasi 'M' vs 'N'", options: [{ text: "M for Mike", correct: true }, { text: "M for No", correct: false }, { text: "M for Apple", correct: false }], explanation: "Gunakan kata yang dimulai dengan huruf tersebut (NATO phonetic atau umum)." },
            { id: 5, prompt: "I ___ from Spain.", options: [{ text: "am", correct: true }, { text: "come", correct: false }, { text: "live", correct: false }], explanation: "'I am from' atau 'I come from'. 'I come' saja salah." },
            { id: 6, prompt: "I work ___ a doctor.", options: [{ text: "in", correct: false }, { text: "at", correct: false }, { text: "as", correct: true }], explanation: "Work as + Pekerjaan." },
            { id: 7, prompt: "Nomor telepon saya adalah... (cara baca 0)", options: [{ text: "Zero", correct: false }, { text: "Oh", correct: true }, { text: "Null", correct: false }], explanation: "Dalam nomor telepon, 0 sering dibaca sebagai 'Oh'." },
            { id: 8, prompt: "Apa status pernikahan Anda? (Belum menikah)", options: [{ text: "Single", correct: true }, { text: "Alone", correct: false }, { text: "One", correct: false }], explanation: "Single berarti belum menikah." },
            { id: 9, prompt: "I ___ breakfast.", options: [{ text: "do", correct: false }, { text: "have", correct: true }, { text: "make to", correct: false }], explanation: "Have breakfast/lunch/dinner." },
            { id: 10, prompt: "Saya pergi kerja ___ bus.", options: [{ text: "on", correct: false }, { text: "by", correct: true }, { text: "in", correct: false }], explanation: "By bus, by car, by train." },
            { id: 11, prompt: "Ibu dari ibu saya adalah...", options: [{ text: "Aunt", correct: false }, { text: "Grandmother", correct: true }, { text: "Sister", correct: false }], explanation: "Grandmother (Nenek)." },
            { id: 12, prompt: "Anak laki-laki paman saya adalah...", options: [{ text: "Nephew", correct: false }, { text: "Cousin", correct: true }, { text: "Brother", correct: false }], explanation: "Cousin (Sepupu)." },
            { id: 13, prompt: "Sampai jumpa ___ Senin.", options: [{ text: "at", correct: false }, { text: "in", correct: false }, { text: "on", correct: true }], explanation: "ON + Hari." },
            { id: 14, prompt: "Film mulai ___ 7 malam.", options: [{ text: "at", correct: true }, { text: "on", correct: false }, { text: "in", correct: false }], explanation: "AT + Waktu." },
            { id: 15, prompt: "Bank ada ___ di pojok.", options: [{ text: "on", correct: true }, { text: "in", correct: false }, { text: "to", correct: false }], explanation: "On the corner / At the corner." },
            { id: 16, prompt: "Belok ___ (lawan dari Kiri).", options: [{ text: "Right", correct: true }, { text: "Straight", correct: false }, { text: "Back", correct: false }], explanation: "Right (Kanan)." },
            { id: 17, prompt: "Saya haus. Saya ingin...", options: [{ text: "Bread", correct: false }, { text: "Water", correct: true }, { text: "Steak", correct: false }], explanation: "Haus butuh minum." },
            { id: 18, prompt: "Bisa minta ___? (Untuk membayar)", options: [{ text: "Menu", correct: false }, { text: "Bill", correct: true }, { text: "Order", correct: false }], explanation: "Bill/Check untuk membayar." },
            { id: 19, prompt: "Saya menikmati ___ buku.", options: [{ text: "read", correct: false }, { text: "reading", correct: true }, { text: "to read", correct: false }], explanation: "Enjoy + -ing." },
            { id: 20, prompt: "Saya tertarik ___ seni.", options: [{ text: "on", correct: false }, { text: "at", correct: false }, { text: "in", correct: true }], explanation: "Interested in." },
            { id: 21, prompt: "Maaf saya ___ (tidak awal).", options: [{ text: "late", correct: true }, { text: "fast", correct: false }, { text: "slow", correct: false }], explanation: "Late (Terlambat)." },
            { id: 22, prompt: "Senang ___ Anda (Meet).", options: [{ text: "meet", correct: true }, { text: "meat", correct: false }, { text: "met", correct: false }], explanation: "Nice to meet you." },
            { id: 23, prompt: "Where ___ you live?", options: [{ text: "are", correct: false }, { text: "do", correct: true }, { text: "is", correct: false }], explanation: "'Where do you live?' (Di mana kamu tinggal?)" },
            { id: 24, prompt: "She ___ two sisters.", options: [{ text: "have", correct: false }, { text: "has", correct: true }, { text: "is", correct: false }], explanation: "She has (Dia mempunyai)." },
            { id: 25, prompt: "I like ___ to music.", options: [{ text: "listen", correct: false }, { text: "listening", correct: true }, { text: "hears", correct: false }], explanation: "Like + -ing." },
            { id: 26, prompt: "Ulang tahun saya ___ Mei.", options: [{ text: "on", correct: false }, { text: "at", correct: false }, { text: "in", correct: true }], explanation: "IN + Bulan." },
            { id: 27, prompt: "What do you do? (Pekerjaan)", options: [{ text: "I am eating.", correct: false }, { text: "I am a student.", correct: true }, { text: "I am fine.", correct: false }], explanation: "Bertanya tentang pekerjaan/profesi." },
            { id: 28, prompt: "Permisi, di mana ___? (Kereta)", options: [{ text: "Airport", correct: false }, { text: "Station", correct: true }, { text: "Stop", correct: false }], explanation: "Train station (Stasiun Kereta)." },
            { id: 29, prompt: "I ___ up at 6 AM.", options: [{ text: "wake", correct: true }, { text: "stand", correct: false }, { text: "go", correct: false }], explanation: "Wake up (Bangun)." },
            { id: 30, prompt: "Sampai jumpa ___.", options: [{ text: "latter", correct: false }, { text: "later", correct: true }, { text: "late", correct: false }], explanation: "See you later (Nanti)." }
        ]
    }
};
