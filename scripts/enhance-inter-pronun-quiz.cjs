const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'pages', 'module', 'english', 'intermediate', 'pronunciation');

const BANK = [
  { q: "Apa ciri utama intonasi pada kalimat tanya 'Yes/No Questions'?", o: ["Turun di akhir", "Datar saja", "Naik di akhir"], a: "Naik di akhir", e: "Pertanyaan Yes/No biasanya menggunakan 'Rising Intonation' (nada naik)." },
  { q: "Dalam frasa 'an apple', bagaimana kedua kata ini dihubungkan dalam ucapan cepat?", o: ["an-y-apple", "a-n-apple (Konsonan ke Vokal)", "Dipisah dengan jeda"], a: "a-n-apple (Konsonan ke Vokal)", e: "Bunyi /n/ pada huruf terakhir bergabung dengan vokal awal /æ/." },
  { q: "Mana dari berikut ini yang merupakan contoh Elision (penghilangan bunyi)?", o: ["Family diucapkan Fam-lee", "Apple diucapkan Ap-pel", "Go out diucapkan Go-w-out"], a: "Family diucapkan Fam-lee", e: "Vokal di tengah kata 'Family' sering dihilangkan dalam penutur asli berbahasa Inggris cepat." },
  { q: "Dalam kata 'Chocolate', berapa banyak suku kata yang sebenarnya diucapkan oleh penutur asli pada umumnya?", o: ["4 suku kata", "3 suku kata", "2 suku kata (Choc-late)"], a: "2 suku kata (Choc-late)", e: "Suku kata tengah 'o' mengalami elisi (menghilang)." },
  { q: "Apa fungsi utama teknik 'Shadowing' dalam belajar Pronunciation?", o: ["Membaca lebih cepat", "Meniru ritme dan intonasi secara langsung", "Menghafal kosakata"], a: "Meniru ritme dan intonasi secara langsung", e: "Shadowing melatih otot vokal untuk beradaptasi dengan alur alami bahasa." },
  { q: "Jika kata benda gabungan (Compound Noun) memiliki dua unsur, di mana tekanan biasanya jatuh?", o: ["Pada kata pertama (contoh: BLACK-bird)", "Pada kata kedua", "Sama kuat pada keduanya"], a: "Pada kata pertama (contoh: BLACK-bird)", e: "Compound nouns biasanya menekan elemen pertama mereka." },
  { q: "Apa yang terjadi pada suara /t/ dalam pengucapan Amerika saat berada di antara dua vokal (seperti 'Water')?", o: ["Menjadi suara /d/ lembut (Flap T)", "Dihilangkan sama sekali", "Menjadi suara /k/"], a: "Menjadi suara /d/ lembut (Flap T)", e: "American English sering menggunakan Flap T yang terdengar mirip dengan /d/ cepat." },
  { q: "Bunyi schwa /ə/ paling sering muncul pada...", o: ["Suku kata yang mendapat tekanan kuat", "Awal setiap kalimat", "Suku kata yang lemah/tidak ditekan"], a: "Suku kata yang lemah/tidak ditekan", e: "Schwa adalah suara dominan pada Unstressed Syllables." },
  { q: "Apa yang dimaksud dengan 'Content Words' yang biasanya ditekan dalam alur kalimat?", o: ["Preposisi dan konjungsi", "Kata benda, kata kerja, dan kata sifat", "Artikel (a, an, the)"], a: "Kata benda, kata kerja, dan kata sifat", e: "Content words membawa arti utama, sehingga diucapkan lebih keras." },
  { q: "Bagaimana cara membaca frasa 'Go away' dalam connected speech?", o: ["Go-y-away", "Go-w-away", "Go-away secara terpisah"], a: "Go-w-away", e: "Ini adalah pengikatan / Intrusion dengan suara sisipan /w/." },
  { q: "Ketika mengucapkan 'I see it', suara tambahan apa yang biasanya muncul di antara 'see' dan 'it'?", o: ["Suara /w/", "Suara /y/", "Suara /r/"], a: "Suara /y/", e: "Gerakan bibir dari bunyi vokal melebar beralih dengan suara /y/ (Intrusion)." },
  { q: "Apa itu 'Dark L' dalam Bahasa Inggris?", o: ["Huruf L yang diucapkan di bagian belakang tenggorokan (seperti di akhir 'Full')", "Huruf L yang diam", "Huruf L di awal kalimat"], a: "Huruf L yang diucapkan di bagian belakang tenggorokan (seperti di akhir 'Full')", e: "Dark L lebih berat dan diproduksi jauh di belakang rongga mulut." },
  { q: "Dalam kata 'Comfortable', suku kata mana yang mendapat tekanan utama?", o: ["COM", "FOR", "BLE"], a: "COM", e: "Kata sifat ini memiliki tekanan kuat di awal, lalu mengalami elisi: COM-ft-bl." },
  { q: "Bagaimana suara ujung kata 'Wanted' (Past Tense) diucapkan?", o: ["Hanya /t/", "Hanya /d/", "Sebagai ekstra suku kata /id/"], a: "Sebagai ekstra suku kata /id/", e: "Kata kerja berakhiran T atau D menambahkan suku kata baru di masa lalu (-id)." },
  { q: "Apa pengaruh 'Silent E' dalam kata 'Make'?", o: ["Tidak ada", "Itu membuat vokal /a/ sebelumnya menjadi pendek", "Itu membuat vokal /a/ berbunyi seperti nama huruf alfabetnya /eɪ/"], a: "Itu membuat vokal /a/ berbunyi seperti nama huruf alfabetnya /eɪ/", e: "Magic E mengubah vokal pendek menjadi panjang (diftong)." },
  { q: "Mengapa penting menggunakan jeda (pauses) dalam 'Thought Groups'?", o: ["Agar berbicara lebih lama", "Membantu pendengar memproses makna bagian demi bagian", "Itu membuat suara lebih keras"], a: "Membantu pendengar memproses makna bagian demi bagian", e: "Chunking/Thought groups memberi ruang napas dan kejelasan pikiran." },
  { q: "Jika Anda berbicara dengan monoton sempurna, apa resikonya?", o: ["Pendengar sangat tertarik", "Dianggap fasih", "Terdengar sangat tidak alami dan membosankan kepada penutur asli"], a: "Terdengar sangat tidak alami dan membosankan kepada penutur asli", e: "Bahasa Inggris adalah bahasa melodis ber-ritme (Stress-timed language)." },
  { q: "Pada kalimat 'I DO like grammar', apa efek dari tekanan pada kata DO?", o: ["Penolakan", "Bertanya", "Penegasan kontrastif yang kuat (Emphatic)"], a: "Penegasan kontrastif yang kuat (Emphatic)", e: "Ini menekankan kepastian mutlak atau membantah keraguan orang sebelumnya." },
  { q: "Bunyi /th/ dalam kata 'Think' adalah...", o: ["Voiced (bergetar pita suara)", "Voiceless (tidak bergetar)", "Sama dengan bunyi /f/"], a: "Voiceless (tidak bergetar)", e: "Bunyi dental fricative tidak bersuara, berbeda dengan The (Voiced)." },
  { q: "Kata homograf 'Record': bagaimana tekanan untuk kata benda (Catatan) vs kata kerja (Merekam)?", o: ["RE-cord (benda) vs re-CORD (kerja)", "Sama saja keduanya", "re-CORD (benda) vs RE-cord (kerja)"], a: "RE-cord (benda) vs re-CORD (kerja)", e: "Aksen maju / mundur membedakan peran tata bahasanya." },
  { q: "Dalam 'Want to', sering disederhanakan (Reduction) menjadi apa?", o: ["Wana", "Wanna", "Won"], a: "Wanna", e: "Reduksi ini lazim terjadi dalam percakapan informal sehari-hari yang bergaya lisan." },
  { q: "Penggunaan 'Glottal Stop' lazim menggantikan huruf T di Inggris (seperti 'Water' dibaca 'Wa-er'). Apa itu Glottal Stop?", o: ["Terdengar seperti desisan ulat", "Penutupan aliran udara secara singkat di tenggorokan", "Getaran tebal di bibir"], a: "Penutupan aliran udara secara singkat di tenggorokan", e: "Glottal stop diwakili oleh penghentian napas mendadak dari faring." },
  { q: "Intonasi menurun (Falling Intonation) biasanya digunakan pada situasi...", o: ["Kalimat pernyataan (Statements) & Pertanyaan WH", "Ketika menunjukkan kebingungan", "Setiap kali mengambil jeda antar klausa"], a: "Kalimat pernyataan (Statements) & Pertanyaan WH", e: "Falling intonation menyatakan kepastian atau penutupan sebuah pikiran." },
  { q: "Perbedaan minimal antara Ship vs Sheep terletak pada...", o: ["Panjang/Kualitas Vokal", "Konsonan awal Sh", "Konsonan akhir p"], a: "Panjang/Kualitas Vokal", e: "Ship menggunakan vokal pendek dan kaku /ɪ/, Sheep menggunakan panjang dan relaks /iː/." },
  { q: "Bagaimana suara plural 'S' pada kata 'Dogs' diucapkan?", o: ["Sebagai huruf /s/ biasa", "Sebagai bunyi mendesis /z/", "Sebagai /iz/"], a: "Sebagai bunyi mendesis /z/", e: "Karena 'g' adalah voiced consonant, akhiran S berbaur rute getarannya menjadi /z/." },
  { q: "Kata 'Photograph', 'Photographer', & 'Photographic' memiliki tekanan...", o: ["Di suku kata pertama semua", "Suku kata yang berbeda-beda untuk tiap turunan katanya", "Pada akhir kata"], a: "Suku kata yang berbeda-beda untuk tiap turunan katanya", e: "Word Stress dinamis: PHO-to-graph vs pho-TOG-ra-pher vs pho-to-GRAPH-ic." },
  { q: "Sibilant consonants (bunyi mendesis spt s, z, sh, ch) jika ditambahkan akhiran plural S akan menjadi...", o: ["Silent S", "/s/", "/iz/ atau /ɪz/"], a: "/iz/ atau /ɪz/", e: "Contoh: Bus -> Buses (/bʌsɪz/) untuk memisahkan desisan beruntun." },
  { q: "Pada 'Tell him' dalam percakapan cepat natural, sering kali terdengar seperti...", o: ["Tell yim", "Tell 'im (Penghilangan H)", "Telling him"], a: "Tell 'im (Penghilangan H)", e: "H-dropping sangat umum pada kata ganti he/him/her/his yang tidak ditekan." },
  { q: "Bagaimana mengucapkan 'Temperature' dengan elisi (elision)?", o: ["Tem-pe-ra-ture (4)", "Tem-prə-chər (3)", "Ter-per (2)"], a: "Tem-prə-chər (3)", e: "Penutur asli umumnya mereduksinya menjadi tiga suku kata saja." },
  { q: "Kalimat mana yang memuat contoh Syllabic /n/?", o: ["Sun (Matahari)", "Button (Bat-n)", "Night (Malam)"], a: "Button (Bat-n)", e: "Pada 'Button', vokal sebelum n dihilangkan, menempatkan 'n' langsung sebagai peran suku kata." }
];

function processAll() {
  let bankIndex = 0;
  
  for (let i = 1; i <= 20; i++) {
    const filePath = path.join(DIR, `Lesson${i}.tsx`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where the array starts and ends
    // Match the QUIZ array. E.g. const QUIZ_QUESTIONS = [ ... ];
    const arrayStartMatch = content.match(/const\s+(QUIZ_QUESTIONS|FINAL_QUIZ)\s*=\s*\[/);
    if (!arrayStartMatch) {
       console.log(`Skipping Lesson ${i}: no array found.`);
       continue;
    }

    const arrayStartIdx = arrayStartMatch.index;
    
    // Find the closing bracket of the array. It ends with "];\n" or "];"
    const afterStart = content.substring(arrayStartIdx);
    const arrayEndMatch = afterStart.match(/\];/);
    
    if (!arrayEndMatch) {
       console.log(`Skipping Lesson ${i}: no end found.`);
       continue;
    }

    const fullArrayStr = afterStart.substring(0, arrayEndMatch.index + 2);
    
    // Count objects using a simpler method
    const qMatches = fullArrayStr.match(/\{\s*id:/g);
    let count = qMatches ? qMatches.length : 0;
    
    let injectedString = "";
    if (count < 20) {
        let lastId = count;
        let toGenerate = 20 - count;
        let injectedQuestions = [];

        for(let j=0; j<toGenerate; j++) {
            lastId++;
            if(bankIndex >= BANK.length) bankIndex = 0; // loop
            let data = BANK[bankIndex++];
            
            let obj = `  { id: ${lastId}, question: "${data.q}", options: ['${data.o[0]}', '${data.o[1]}', '${data.o[2]}'], answer: '${data.a}', explanation: "${data.e}" }`;
            injectedQuestions.push(obj);
        }

        // We need to inject these before the closing \`];\` of the array.
        // It could be that the last element ends with \`}\` or \`},\`.
        
        let targetSegment = fullArrayStr;
        // Strip trailing bracket
        targetSegment = targetSegment.replace(/\s*\];\s*$/, '');
        
        // Ensure there is a comma after the last existing item
        if (count > 0 && !targetSegment.trim().endsWith(',')) {
             targetSegment = targetSegment.trim() + ",\\n";
        } else if (count > 0) {
             targetSegment = targetSegment.trim() + "\\n";
        }
        
        targetSegment = targetSegment + injectedQuestions.join(',\\n') + "\\n];";
        
        // Rebuild code
        const newContent = content.substring(0, arrayStartIdx) + targetSegment + afterStart.substring(arrayEndMatch.index + 2);
        
        fs.writeFileSync(filePath, newContent);
        console.log(`Lesson ${i}: Enhanced with ${toGenerate} questions (now 20).`);
    } else {
        console.log(`Lesson ${i}: Already has 20 questions.`);
    }
  }
}

processAll();
