import type { MandarinLevelId } from './mandarinModuleData';

export type MandarinThemeWord = { hanzi: string; pinyin: string; meaning: string };
export type MandarinTheme = { title: string; hanzi: string; vocabulary: MandarinThemeWord[] };

type WordTuple = [hanzi: string, pinyin: string, meaning: string];
type ThemeTuple = [title: string, hanzi: string, words: WordTuple[]];

const toThemes = (themes: ThemeTuple[]): MandarinTheme[] =>
  themes.map(([title, hanzi, words]) => ({
    title,
    hanzi,
    vocabulary: words.map(([word, pinyin, meaning]) => ({ hanzi: word, pinyin, meaning })),
  }));

// One theme per lesson number (1-20). Pinyin follows the file-wide toneless,
// syllable-spaced convention used by mandarinLessonContent.ts.
export const mandarinThemeBank: Partial<Record<MandarinLevelId, MandarinTheme[]>> = {
  advanced: toThemes([
    ['Urbanisasi dan gaya hidup', '城市化', [['城市化', 'chéngshìhuà', 'urbanisasi'], ['生活节奏', 'shēnghuó jiézòu', 'ritme hidup'], ['通勤', 'tōngqín', 'perjalanan pulang-pergi kerja'], ['人际关系', 'rénjì guānxì', 'hubungan antarpribadi']]],
    ['Etika teknologi', '科技伦理', [['伦理', 'lúnlǐ', 'etika'], ['隐私', 'yǐnsī', 'privasi'], ['风险', 'fēngxiǎn', 'risiko'], ['边界', 'biānjiè', 'batas']]],
    ['Reformasi pendidikan', '教育改革', [['改革', 'gǎigé', 'reformasi'], ['考试压力', 'kǎoshì yālì', 'tekanan ujian'], ['自主学习', 'zìzhǔ xuéxí', 'belajar mandiri'], ['课程', 'kèchéng', 'kurikulum / mata kuliah']]],
    ['Budaya kerja', '职场文化', [['加班', 'jiābān', 'lembur'], ['团队合作', 'tuánduì hézuò', 'kerja tim'], ['沟通', 'gōutōng', 'komunikasi'], ['责任感', 'zérèngǎn', 'rasa tanggung jawab']]],
    ['Kebijakan lingkungan', '环境政策', [['环保', 'huánbǎo', 'perlindungan lingkungan'], ['污染', 'wūrǎn', 'polusi'], ['政策', 'zhèngcè', 'kebijakan'], ['资源', 'zīyuán', 'sumber daya']]],
    ['Literasi media', '媒介素养', [['媒体', 'méitǐ', 'media'], ['事实', 'shìshí', 'fakta'], ['偏见', 'piānjiàn', 'bias / prasangka'], ['谣言', 'yáoyán', 'rumor / hoaks']]],
    ['Perilaku konsumen', '消费行为', [['消费者', 'xiāofèizhě', 'konsumen'], ['广告', 'guǎnggào', 'iklan'], ['品牌', 'pǐnpái', 'merek'], ['性价比', 'xìngjià bǐ', 'rasio harga dan kualitas']]],
    ['Kesehatan mental', '身心平衡', [['心理', 'xīnlǐ', 'psikologis'], ['压力', 'yālì', 'tekanan / stres'], ['平衡', 'pínghéng', 'keseimbangan'], ['习惯', 'xíguàn', 'kebiasaan']]],
    ['Identitas budaya', '文化认同', [['传统', 'chuántǒng', 'tradisi'], ['认同', 'rèntóng', 'identitas / pengakuan'], ['全球化', 'quánqiúhuà', 'globalisasi'], ['适应', 'shìyìng', 'beradaptasi']]],
    ['Tren ekonomi', '经济趋势', [['经济增长', 'jīngjì zēngzhǎng', 'pertumbuhan ekonomi'], ['通货膨胀', 'tōnghuò péngzhàng', 'inflasi'], ['投资', 'tóuzī', 'investasi'], ['就业', 'jiùyè', 'lapangan kerja']]],
    ['Transportasi publik', '公共交通', [['公共交通', 'gōnggòng jiāotōng', 'transportasi umum'], ['地铁', 'dìtiě', 'kereta bawah tanah'], ['拥堵', 'yōngdǔ', 'kemacetan'], ['票价', 'piàojià', 'harga tiket']]],
    ['Kecerdasan buatan', '人工智能', [['人工智能', 'réngōng zhìnéng', 'kecerdasan buatan'], ['算法', 'suànfǎ', 'algoritma'], ['取代', 'qǔdài', 'menggantikan'], ['监管', 'jiānguǎn', 'pengawasan / regulasi']]],
    ['Masyarakat menua', '老龄社会', [['老龄化', 'lǎolínghuà', 'penuaan penduduk'], ['养老', 'yǎnglǎo', 'perawatan lansia'], ['退休', 'tuìxiū', 'pensiun'], ['赡养', 'shànyǎng', 'menafkahi orang tua']]],
    ['Pembelajaran daring', '在线学习', [['网课', 'wǎngkè', 'kelas daring'], ['自律', 'zìlǜ', 'disiplin diri'], ['互动', 'hùdòng', 'interaksi'], ['灵活', 'línghuó', 'fleksibel']]],
    ['Kerelawanan', '志愿服务', [['志愿者', 'zhìyuànzhě', 'relawan'], ['公益', 'gōngyì', 'kegiatan sosial'], ['奉献', 'fèngxiàn', 'pengabdian'], ['社区', 'shèqū', 'komunitas']]],
    ['Perencanaan karier', '职业规划', [['职业规划', 'zhíyè guīhuà', 'perencanaan karier'], ['兴趣', 'xìngqù', 'minat'], ['稳定', 'wěndìng', 'stabil'], ['发展空间', 'fāzhǎn kōngjiān', 'ruang berkembang']]],
    ['Membaca esai abstrak', '议论文阅读', [['论点', 'lùndiǎn', 'tesis / argumen utama'], ['论据', 'lùnjù', 'bukti pendukung'], ['抽象', 'chōuxiàng', 'abstrak'], ['含义', 'hányì', 'makna tersirat']]],
    ['Menulis formal', '正式写作', [['正式', 'zhèngshì', 'formal'], ['段落', 'duànluò', 'paragraf'], ['过渡', 'guòdù', 'transisi'], ['结论', 'jiélùn', 'kesimpulan']]],
    ['Alur pelafalan lanjutan', '语流训练', [['语调', 'yǔdiào', 'intonasi'], ['停顿', 'tíngdùn', 'jeda'], ['重音', 'zhòngyīn', 'tekanan kata'], ['流利', 'liúlì', 'lancar']]],
    ['Portofolio HSK 5', '综合复习', [['总结', 'zǒngjié', 'rangkuman'], ['反思', 'fǎnsī', 'refleksi'], ['进步', 'jìnbù', 'kemajuan'], ['目标', 'mùbiāo', 'target']]],
  ]),
  'hsk-7': toThemes([
    ['Pembaruan kota', '城市更新', [['城市更新', 'chéngshì gēngxīn', 'pembaruan kota'], ['旧城改造', 'jiùchéng gǎizào', 'renovasi kota lama'], ['公共空间', 'gōnggòng kōngjiān', 'ruang publik'], ['社区参与', 'shèqū cānyù', 'partisipasi komunitas']]],
    ['Kesenjangan digital', '数字鸿沟', [['数字鸿沟', 'shùzì hónggōu', 'kesenjangan digital'], ['信息素养', 'xìnxī sùyǎng', 'literasi informasi'], ['普惠', 'pǔhuì', 'inklusif / merata'], ['基础设施', 'jīchǔ shèshī', 'infrastruktur']]],
    ['Penuaan penduduk', '人口老龄化', [['人口老龄化', 'rénkǒu lǎolínghuà', 'penuaan penduduk'], ['养老保障', 'yǎnglǎo bǎozhàng', 'jaminan hari tua'], ['代际关系', 'dàijì guānxì', 'relasi antargenerasi'], ['劳动力短缺', 'láodòng lì duǎnquē', 'kekurangan tenaga kerja']]],
    ['Keadilan pendidikan', '教育公平', [['教育公平', 'jiàoyù gōngpíng', 'keadilan pendidikan'], ['资源分配', 'zīyuán fēnpèi', 'distribusi sumber daya'], ['应试教育', 'yìngshì jiàoyù', 'pendidikan berorientasi ujian'], ['素质教育', 'sùzhì jiàoyù', 'pendidikan karakter dan kompetensi']]],
    ['Perubahan iklim', '气候变化', [['碳排放', 'tàn páifàng', 'emisi karbon'], ['碳中和', 'tànzhōng hé', 'netralitas karbon'], ['可再生能源', 'kězàishēng néngyuán', 'energi terbarukan'], ['极端天气', 'jíduān tiānqì', 'cuaca ekstrem']]],
    ['Etika kecerdasan buatan', '人工智能伦理', [['算法偏见', 'suànfǎ piānjiàn', 'bias algoritma'], ['数据隐私', 'shùjù yǐnsī', 'privasi data'], ['问责机制', 'wènzé jīzhì', 'mekanisme akuntabilitas'], ['透明度', 'tòumíngdù', 'transparansi']]],
    ['Ekosistem informasi', '信息生态', [['信息茧房', 'xìnxī jiǎnfáng', 'gelembung informasi'], ['虚假信息', 'xūjiǎ xìnxī', 'disinformasi'], ['舆论', 'yúlùn', 'opini publik'], ['议程设置', 'yìchéng shèzhì', 'penentuan agenda']]],
    ['Konsumerisme', '消费主义', [['消费主义', 'xiāofèi zhǔyì', 'konsumerisme'], ['符号消费', 'fúhào xiāofèi', 'konsumsi simbolik'], ['可持续消费', 'kěchíxù xiāofèi', 'konsumsi berkelanjutan'], ['物质主义', 'wùzhì zhǔyì', 'materialisme']]],
    ['Identitas budaya global', '文化认同', [['文化认同', 'wénhuà rèntóng', 'identitas budaya'], ['本土化', 'běntǔhuà', 'lokalisasi'], ['文化自信', 'wénhuà zìxìn', 'kepercayaan diri budaya'], ['文化输出', 'wénhuà shūchū', 'ekspor budaya']]],
    ['Kesehatan masyarakat', '公共卫生', [['公共卫生', 'gōnggòng wèishēng', 'kesehatan masyarakat'], ['疫苗接种', 'yìmiáo jiēzhòng', 'vaksinasi'], ['预防为主', 'yùfáng wéizhǔ', 'mengutamakan pencegahan'], ['医疗资源', 'yīliáo zīyuán', 'sumber daya medis']]],
    ['Revitalisasi desa', '乡村振兴', [['乡村振兴', 'xiāngcūn zhènxīng', 'revitalisasi desa'], ['城乡差距', 'chéngxiāng chājù', 'kesenjangan kota-desa'], ['农业现代化', 'nóngyè xiàndàihuà', 'modernisasi pertanian'], ['人才回流', 'réncái huíliú', 'kembalinya talenta']]],
    ['Ekonomi berbagi', '共享经济', [['共享经济', 'gòngxiǎng jīngjì', 'ekonomi berbagi'], ['平台经济', 'píngtái jīngjì', 'ekonomi platform'], ['零工经济', 'línggōng jīngjì', 'ekonomi gig'], ['劳动权益', 'láodòng quányì', 'hak pekerja']]],
    ['Kesehatan jiwa', '心理健康', [['心理健康', 'xīnlǐ jiànkāng', 'kesehatan mental'], ['焦虑', 'jiāolǜ', 'kecemasan'], ['社会支持', 'shèhuì zhīchí', 'dukungan sosial'], ['污名化', 'wūmínghuà', 'stigmatisasi']]],
    ['Inovasi sains dan teknologi', '科技创新', [['科技创新', 'kējì chuàngxīn', 'inovasi iptek'], ['研发投入', 'yánfā tóurù', 'investasi riset dan pengembangan'], ['知识产权', 'zhīshi chǎnquán', 'hak kekayaan intelektual'], ['成果转化', 'chéngguǒ zhuǎnhuà', 'hilirisasi hasil riset']]],
    ['Kebijakan bahasa', '语言政策', [['语言政策', 'yǔyán zhèngcè', 'kebijakan bahasa'], ['双语教育', 'shuāngyǔ jiàoyù', 'pendidikan dwibahasa'], ['方言保护', 'fāngyán bǎohù', 'pelestarian dialek'], ['语言活力', 'yǔyán huólì', 'vitalitas bahasa']]],
    ['Struktur ketenagakerjaan', '就业结构', [['就业结构', 'jiùyè jiégòu', 'struktur ketenagakerjaan'], ['产业升级', 'chǎnyè shēngjí', 'peningkatan industri'], ['技能错配', 'jìnéng cuòpèi', 'ketidaksesuaian keterampilan'], ['灵活就业', 'línghuó jiùyè', 'kerja fleksibel']]],
    ['Warisan budaya', '文化遗产', [['文化遗产', 'wénhuà yíchǎn', 'warisan budaya'], ['非物质文化遗产', 'fēiwùzhì wénhuà yíchǎn', 'warisan budaya takbenda'], ['活态传承', 'huótài chuánchéng', 'pewarisan hidup'], ['过度开发', 'guòdù kāifā', 'eksploitasi berlebihan']]],
    ['Integritas akademik', '学术诚信', [['学术诚信', 'xuéshù chéngxìn', 'integritas akademik'], ['抄袭', 'chāoxí', 'plagiarisme'], ['同行评审', 'tóngháng píngshěn', 'telaah sejawat'], ['引用规范', 'yǐnyòng guīfàn', 'aturan sitasi']]],
    ['Kerja sama internasional', '国际合作', [['国际合作', 'guójì hézuò', 'kerja sama internasional'], ['多边主义', 'duōbiān zhǔyì', 'multilateralisme'], ['共同利益', 'gòngtóng lìyì', 'kepentingan bersama'], ['互信', 'hùxìn', 'saling percaya']]],
    ['Portofolio seminar HSK 7', '学术答辩', [['综合评述', 'zōnghé píngshù', 'tinjauan komprehensif'], ['学术报告', 'xuéshù bàogào', 'presentasi akademik'], ['论点提炼', 'lùndiǎn tíliàn', 'penajaman argumen'], ['答辩', 'dábiàn', 'sidang pembelaan']]],
  ]),
  'hsk-8': toThemes([
    ['Kebijakan industri', '产业政策', [['产业政策', 'chǎnyè zhèngcè', 'kebijakan industri'], ['补贴', 'bǔtiē', 'subsidi'], ['市场失灵', 'shìchǎng shīlíng', 'kegagalan pasar'], ['政策工具', 'zhèngcè gōngjù', 'instrumen kebijakan']]],
    ['Keberlanjutan fiskal', '财政可持续性', [['财政赤字', 'cáizhèng chìzì', 'defisit fiskal'], ['债务风险', 'zhàiwù fēngxiǎn', 'risiko utang'], ['转移支付', 'zhuǎnyí zhīfù', 'transfer fiskal'], ['税收结构', 'shuìshōu jiégòu', 'struktur pajak']]],
    ['Sistem jaminan sosial', '社会保障体系', [['社会保障', 'shèhuì bǎozhàng', 'jaminan sosial'], ['覆盖面', 'fùgài miàn', 'cakupan'], ['可携带性', 'kěxiédàixìng', 'portabilitas'], ['兜底保障', 'dōudǐ bǎozhàng', 'jaring pengaman dasar']]],
    ['Urbanisasi dan sistem hukou', '户籍改革', [['户籍制度', 'hùjí zhìdù', 'sistem registrasi penduduk'], ['城镇化', 'chéngzhènhuà', 'urbanisasi'], ['公共服务均等化', 'gōnggòng fúwù jūnděnghuà', 'pemerataan layanan publik'], ['流动人口', 'liúdòng rénkǒu', 'penduduk migran']]],
    ['Transisi energi', '能源转型', [['能源转型', 'néngyuán zhuǎnxíng', 'transisi energi'], ['电网', 'diànwǎng', 'jaringan listrik'], ['储能', 'chǔnéng', 'penyimpanan energi'], ['成本曲线', 'chéngběn qūxiàn', 'kurva biaya']]],
    ['Tata kelola data', '数据治理', [['数据治理', 'shùjù zhìlǐ', 'tata kelola data'], ['数据确权', 'shùjù quèquán', 'penetapan hak atas data'], ['跨境流动', 'kuàjìng liúdòng', 'aliran lintas batas'], ['合规', 'héguī', 'kepatuhan regulasi']]],
    ['Evaluasi riset', '科研评价', [['科研评价', 'kēyán píngjià', 'evaluasi riset'], ['影响因子', 'yǐngxiǎng yīnzǐ', 'faktor dampak'], ['同行评议', 'tóngháng píngyì', 'penilaian sejawat'], ['唯论文', 'wéi lùnwén', 'orientasi semata pada publikasi']]],
    ['Tata kelola kesehatan publik', '公共卫生治理', [['应急管理', 'yìngjí guǎnlǐ', 'manajemen darurat'], ['风险沟通', 'fēngxiǎn gōutōng', 'komunikasi risiko'], ['韧性', 'rènxìng', 'ketahanan'], ['协同机制', 'xiétóng jīzhì', 'mekanisme koordinasi']]],
    ['Reformasi penilaian pendidikan', '教育评价改革', [['评价体系', 'píngjià tǐxì', 'sistem penilaian'], ['过程性评价', 'guòchéngxìng píngjià', 'penilaian proses'], ['增值评价', 'zēngzhí píngjià', 'penilaian nilai tambah'], ['减负', 'jiǎnfù', 'mengurangi beban belajar']]],
    ['Pasar tenaga kerja', '劳动力市场', [['劳动参与率', 'láodòng cānyùlǜ', 'tingkat partisipasi kerja'], ['结构性失业', 'jiégòuxìng shīyè', 'pengangguran struktural'], ['最低工资', 'zuìdī gōngzī', 'upah minimum'], ['人力资本', 'rénlì zīběn', 'modal manusia']]],
    ['Regulasi keuangan', '金融监管', [['金融监管', 'jīnróng jiānguǎn', 'regulasi keuangan'], ['系统性风险', 'xìtǒngxìng fēngxiǎn', 'risiko sistemik'], ['杠杆率', 'gànggǎnlǜ', 'rasio leverage'], ['宏观审慎', 'hóngguān shěnshèn', 'makroprudensial']]],
    ['Regulasi lingkungan', '环境规制', [['环境规制', 'huánjìng guīzhì', 'regulasi lingkungan'], ['外部性', 'wàibùxìng', 'eksternalitas'], ['碳交易', 'tàn jiāoyì', 'perdagangan karbon'], ['执法力度', 'zhífǎ lìdù', 'ketegasan penegakan hukum']]],
    ['Antimonopoli platform', '平台反垄断', [['反垄断', 'fǎnlǒngduàn', 'antimonopoli'], ['市场支配地位', 'shìchǎng zhīpèi dìwèi', 'posisi dominan di pasar'], ['网络效应', 'wǎngluò xiàoyìng', 'efek jaringan'], ['算法合谋', 'suànfǎ hémóu', 'kolusi algoritmik']]],
    ['Kebijakan kependudukan', '人口政策', [['生育率', 'shēngyùlǜ', 'tingkat kelahiran'], ['人口红利', 'rénkǒu hónglì', 'bonus demografi'], ['育儿成本', 'yù\'érchéngběn', 'biaya pengasuhan anak'], ['政策效果评估', 'zhèngcè xiàoguǒ pínggū', 'evaluasi dampak kebijakan']]],
    ['Pembangunan regional', '区域协调发展', [['区域协调', 'qūyù xiétiáo', 'koordinasi regional'], ['产业转移', 'chǎnyè zhuǎnyí', 'relokasi industri'], ['辐射效应', 'fúshè xiàoyìng', 'efek limpahan'], ['要素流动', 'yàosù liúdòng', 'mobilitas faktor produksi']]],
    ['Layanan budaya publik', '公共文化服务', [['公共文化服务', 'gōnggòng wénhuà fúwù', 'layanan budaya publik'], ['文化供给', 'wénhuà gōngjǐ', 'penyediaan budaya'], ['参与度', 'cānyùdù', 'tingkat partisipasi'], ['数字化转型', 'shùzìhuà zhuǎnxíng', 'transformasi digital']]],
    ['Aturan perdagangan internasional', '国际贸易规则', [['贸易规则', 'màoyì guīzé', 'aturan perdagangan'], ['关税壁垒', 'guānshuì bìlěi', 'hambatan tarif'], ['供应链韧性', 'gōngyìng liàn rènxìng', 'ketahanan rantai pasok'], ['原产地规则', 'yuánchǎndì guīzé', 'aturan negara asal']]],
    ['Metode riset empiris', '实证研究方法', [['因果推断', 'yīnguǒ tuīduàn', 'inferensi kausal'], ['内生性', 'nèishēngxìng', 'endogenitas'], ['样本偏差', 'yàngběn piānchā', 'bias sampel'], ['稳健性检验', 'wěnjiànxìng jiǎnyàn', 'uji robustitas']]],
    ['Evaluasi kebijakan', '政策评估', [['政策评估', 'zhèngcè pínggū', 'evaluasi kebijakan'], ['成本收益分析', 'chéngběn shōuyì fēnxī', 'analisis biaya-manfaat'], ['反事实', 'fǎnshìshí', 'kontrafaktual'], ['指标体系', 'zhǐbiāo tǐxì', 'sistem indikator']]],
    ['Portofolio policy paper HSK 8', '政策研究报告', [['政策建议书', 'zhèngcè jiànyì shū', 'naskah rekomendasi kebijakan'], ['研究综述', 'yánjiū zōngshù', 'tinjauan riset'], ['结论稳健', 'jiélùn wěnjiàn', 'kesimpulan yang kokoh'], ['局限性', 'júxiànxìng', 'keterbatasan']]],
  ]),
  'hsk-9': toThemes([
    ['Refleksi modernitas', '现代性反思', [['现代性', 'xiàndàixìng', 'modernitas'], ['理性化', 'lǐxìnghuà', 'rasionalisasi'], ['异化', 'yìhuà', 'alienasi'], ['反思性', 'fǎnsīxìng', 'refleksivitas']]],
    ['Sosiologi pengetahuan', '知识社会学', [['知识建构', 'zhīshi jiàngòu', 'konstruksi pengetahuan'], ['话语权', 'huàyǔ quán', 'otoritas wacana'], ['权威', 'quánwēi', 'otoritas'], ['认识论', 'rènshilùn', 'epistemologi']]],
    ['Filsafat teknologi', '技术哲学', [['技术决定论', 'jìshù juédìnglùn', 'determinisme teknologi'], ['工具理性', 'gōngjù lǐxìng', 'rasionalitas instrumental'], ['主体性', 'zhǔtǐxìng', 'subjektivitas'], ['后人类', 'hòu rénlèi', 'pascamanusia']]],
    ['Nalar publik', '公共理性', [['公共理性', 'gōnggòng lǐxìng', 'nalar publik'], ['协商民主', 'xiéshāng mínzhǔ', 'demokrasi deliberatif'], ['共识', 'gòngshí', 'konsensus'], ['价值多元', 'jiàzhí duōyuán', 'pluralitas nilai']]],
    ['Dialog antarperadaban', '文明互鉴', [['文明互鉴', 'wénmíng hùjiàn', 'saling belajar antarperadaban'], ['文化间性', 'wénhuà jiānxìng', 'interkulturalitas'], ['他者', 'tāzhě', 'liyan / the other'], ['普遍性', 'pǔbiànxìng', 'universalitas']]],
    ['Etika ekologis', '生态伦理', [['生态伦理', 'shēngtài lúnlǐ', 'etika ekologis'], ['人类中心主义', 'rénlèi zhōngxīn zhǔyì', 'antroposentrisme'], ['代际正义', 'dàijì zhèngyì', 'keadilan antargenerasi'], ['可持续性', 'kěchíxùxìng', 'keberlanjutan']]],
    ['Narasi dan memori', '叙事与记忆', [['集体记忆', 'jítǐ jìyì', 'memori kolektif'], ['叙事建构', 'xùshì jiàngòu', 'konstruksi naratif'], ['历史书写', 'lìshǐ shūxiě', 'penulisan sejarah'], ['身份认同', 'shēnfèn rèntóng', 'identitas diri']]],
    ['Bahasa dan kekuasaan', '语言与权力', [['语言霸权', 'yǔyán bàquán', 'hegemoni bahasa'], ['话语分析', 'huàyǔ fēnxī', 'analisis wacana'], ['意识形态', 'yìshí xíngtài', 'ideologi'], ['解构', 'jiěgòu', 'dekonstruksi']]],
    ['Membaca ulang karya klasik', '经典重读', [['经典', 'jīngdiǎn', 'karya klasik'], ['阐释', 'chǎnshì', 'interpretasi'], ['互文性', 'hùwénxìng', 'intertekstualitas'], ['语境化', 'yǔjìnghuà', 'kontekstualisasi']]],
    ['Sistem kompleks', '复杂系统', [['复杂系统', 'fùzá xìtǒng', 'sistem kompleks'], ['涌现', 'yǒngxiàn', 'emergensi'], ['非线性', 'fēixiànxìng', 'nonlinearitas'], ['反馈回路', 'fǎnkuì huílù', 'lingkar umpan balik']]],
    ['Masyarakat risiko', '风险社会', [['风险社会', 'fēngxiǎn shèhuì', 'masyarakat risiko'], ['不确定性', 'bù quèdìngxìng', 'ketidakpastian'], ['专家系统', 'zhuānjiā xìtǒng', 'sistem pakar'], ['信任危机', 'xìnrèn wēijī', 'krisis kepercayaan']]],
    ['Tata kelola global', '全球治理', [['全球治理', 'quánqiú zhìlǐ', 'tata kelola global'], ['主权', 'zhǔquán', 'kedaulatan'], ['公共产品', 'gōnggòng chǎnpǐn', 'barang publik'], ['制度性话语权', 'zhìdùxìng huàyǔ quán', 'pengaruh institusional']]],
    ['Estetika', '美学与审美', [['审美经验', 'shěnměi jīngyàn', 'pengalaman estetis'], ['意境', 'yìjìng', 'suasana artistik'], ['形式与内容', 'xíngshì yǔ nèiróng', 'bentuk dan isi'], ['审美判断', 'shěnměi pànduàn', 'penilaian estetis']]],
    ['Metodologi sains', '科学方法论', [['可证伪性', 'kězhèng wěixìng', 'falsifiabilitas'], ['范式', 'fànshì', 'paradigma'], ['归纳法', 'guīnàfǎ', 'metode induktif'], ['理论负载', 'lǐlùn fùzài', 'muatan teori']]],
    ['Teori keadilan', '正义理论', [['分配正义', 'fēnpèi zhèngyì', 'keadilan distributif'], ['程序正义', 'chéngxù zhèngyì', 'keadilan prosedural'], ['机会平等', 'jīhuì píngděng', 'kesetaraan kesempatan'], ['应得', 'yīngdé', 'kelayakan menerima (desert)']]],
    ['Humaniora perkotaan', '城市人文', [['空间正义', 'kōngjiān zhèngyì', 'keadilan spasial'], ['地方感', 'dìfānggǎn', 'rasa tempat'], ['绅士化', 'shēnshìhuà', 'gentrifikasi'], ['公共性', 'gōnggòngxìng', 'kepublikan']]],
    ['Peradaban digital', '数字文明', [['数字主权', 'shùzì zhǔquán', 'kedaulatan digital'], ['注意力经济', 'zhùyìlì jīngjì', 'ekonomi perhatian'], ['算法治理', 'suànfǎ zhìlǐ', 'tata kelola algoritma'], ['数字人文', 'shùzì rénwén', 'humaniora digital']]],
    ['Riset lintas disiplin', '跨学科研究', [['跨学科', 'kuà xuékē', 'lintas disiplin'], ['方法融合', 'fāngfǎ rónghé', 'integrasi metode'], ['问题导向', 'wèntí dǎoxiàng', 'berorientasi masalah'], ['学科壁垒', 'xuékē bìlěi', 'sekat antardisiplin']]],
    ['Komunitas akademik', '学术共同体', [['学术共同体', 'xuéshù gòngtóng tǐ', 'komunitas akademik'], ['学术规范', 'xuéshù guīfàn', 'norma akademik'], ['公共知识分子', 'gōnggòng zhīshi fēnzǐ', 'intelektual publik'], ['学术自由', 'xuéshù zìyóu', 'kebebasan akademik']]],
    ['Portofolio mastery HSK 9', '学术对话', [['学术论文', 'xuéshù lùnwén', 'makalah akademik'], ['理论贡献', 'lǐlùn gòngxiàn', 'kontribusi teoretis'], ['研究问题', 'yánjiū wèntí', 'pertanyaan penelitian'], ['学术对话', 'xuéshù duìhuà', 'dialog akademik']]],
  ]),
};

export function getMandarinTheme(level: MandarinLevelId, lesson: number): MandarinTheme | undefined {
  return mandarinThemeBank[level]?.[lesson - 1];
}

export function getMandarinLevelThemeWords(level: MandarinLevelId): MandarinThemeWord[] {
  return (mandarinThemeBank[level] ?? []).flatMap((theme) => theme.vocabulary);
}
