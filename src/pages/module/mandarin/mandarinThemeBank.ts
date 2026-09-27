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
    ['Urbanisasi dan gaya hidup', '城市化', [['城市化', 'cheng shi hua', 'urbanisasi'], ['生活节奏', 'sheng huo jie zou', 'ritme hidup'], ['通勤', 'tong qin', 'perjalanan pulang-pergi kerja'], ['人际关系', 'ren ji guan xi', 'hubungan antarpribadi']]],
    ['Etika teknologi', '科技伦理', [['伦理', 'lun li', 'etika'], ['隐私', 'yin si', 'privasi'], ['风险', 'feng xian', 'risiko'], ['边界', 'bian jie', 'batas']]],
    ['Reformasi pendidikan', '教育改革', [['改革', 'gai ge', 'reformasi'], ['考试压力', 'kao shi ya li', 'tekanan ujian'], ['自主学习', 'zi zhu xue xi', 'belajar mandiri'], ['课程', 'ke cheng', 'kurikulum / mata kuliah']]],
    ['Budaya kerja', '职场文化', [['加班', 'jia ban', 'lembur'], ['团队合作', 'tuan dui he zuo', 'kerja tim'], ['沟通', 'gou tong', 'komunikasi'], ['责任感', 'ze ren gan', 'rasa tanggung jawab']]],
    ['Kebijakan lingkungan', '环境政策', [['环保', 'huan bao', 'perlindungan lingkungan'], ['污染', 'wu ran', 'polusi'], ['政策', 'zheng ce', 'kebijakan'], ['资源', 'zi yuan', 'sumber daya']]],
    ['Literasi media', '媒介素养', [['媒体', 'mei ti', 'media'], ['事实', 'shi shi', 'fakta'], ['偏见', 'pian jian', 'bias / prasangka'], ['谣言', 'yao yan', 'rumor / hoaks']]],
    ['Perilaku konsumen', '消费行为', [['消费者', 'xiao fei zhe', 'konsumen'], ['广告', 'guang gao', 'iklan'], ['品牌', 'pin pai', 'merek'], ['性价比', 'xing jia bi', 'rasio harga dan kualitas']]],
    ['Kesehatan mental', '身心平衡', [['心理', 'xin li', 'psikologis'], ['压力', 'ya li', 'tekanan / stres'], ['平衡', 'ping heng', 'keseimbangan'], ['习惯', 'xi guan', 'kebiasaan']]],
    ['Identitas budaya', '文化认同', [['传统', 'chuan tong', 'tradisi'], ['认同', 'ren tong', 'identitas / pengakuan'], ['全球化', 'quan qiu hua', 'globalisasi'], ['适应', 'shi ying', 'beradaptasi']]],
    ['Tren ekonomi', '经济趋势', [['经济增长', 'jing ji zeng zhang', 'pertumbuhan ekonomi'], ['通货膨胀', 'tong huo peng zhang', 'inflasi'], ['投资', 'tou zi', 'investasi'], ['就业', 'jiu ye', 'lapangan kerja']]],
    ['Transportasi publik', '公共交通', [['公共交通', 'gong gong jiao tong', 'transportasi umum'], ['地铁', 'di tie', 'kereta bawah tanah'], ['拥堵', 'yong du', 'kemacetan'], ['票价', 'piao jia', 'harga tiket']]],
    ['Kecerdasan buatan', '人工智能', [['人工智能', 'ren gong zhi neng', 'kecerdasan buatan'], ['算法', 'suan fa', 'algoritma'], ['取代', 'qu dai', 'menggantikan'], ['监管', 'jian guan', 'pengawasan / regulasi']]],
    ['Masyarakat menua', '老龄社会', [['老龄化', 'lao ling hua', 'penuaan penduduk'], ['养老', 'yang lao', 'perawatan lansia'], ['退休', 'tui xiu', 'pensiun'], ['赡养', 'shan yang', 'menafkahi orang tua']]],
    ['Pembelajaran daring', '在线学习', [['网课', 'wang ke', 'kelas daring'], ['自律', 'zi lv', 'disiplin diri'], ['互动', 'hu dong', 'interaksi'], ['灵活', 'ling huo', 'fleksibel']]],
    ['Kerelawanan', '志愿服务', [['志愿者', 'zhi yuan zhe', 'relawan'], ['公益', 'gong yi', 'kegiatan sosial'], ['奉献', 'feng xian', 'pengabdian'], ['社区', 'she qu', 'komunitas']]],
    ['Perencanaan karier', '职业规划', [['职业规划', 'zhi ye gui hua', 'perencanaan karier'], ['兴趣', 'xing qu', 'minat'], ['稳定', 'wen ding', 'stabil'], ['发展空间', 'fa zhan kong jian', 'ruang berkembang']]],
    ['Membaca esai abstrak', '议论文阅读', [['论点', 'lun dian', 'tesis / argumen utama'], ['论据', 'lun ju', 'bukti pendukung'], ['抽象', 'chou xiang', 'abstrak'], ['含义', 'han yi', 'makna tersirat']]],
    ['Menulis formal', '正式写作', [['正式', 'zheng shi', 'formal'], ['段落', 'duan luo', 'paragraf'], ['过渡', 'guo du', 'transisi'], ['结论', 'jie lun', 'kesimpulan']]],
    ['Alur pelafalan lanjutan', '语流训练', [['语调', 'yu diao', 'intonasi'], ['停顿', 'ting dun', 'jeda'], ['重音', 'zhong yin', 'tekanan kata'], ['流利', 'liu li', 'lancar']]],
    ['Portofolio HSK 5', '综合复习', [['总结', 'zong jie', 'rangkuman'], ['反思', 'fan si', 'refleksi'], ['进步', 'jin bu', 'kemajuan'], ['目标', 'mu biao', 'target']]],
  ]),
  'hsk-7': toThemes([
    ['Pembaruan kota', '城市更新', [['城市更新', 'cheng shi geng xin', 'pembaruan kota'], ['旧城改造', 'jiu cheng gai zao', 'renovasi kota lama'], ['公共空间', 'gong gong kong jian', 'ruang publik'], ['社区参与', 'she qu can yu', 'partisipasi komunitas']]],
    ['Kesenjangan digital', '数字鸿沟', [['数字鸿沟', 'shu zi hong gou', 'kesenjangan digital'], ['信息素养', 'xin xi su yang', 'literasi informasi'], ['普惠', 'pu hui', 'inklusif / merata'], ['基础设施', 'ji chu she shi', 'infrastruktur']]],
    ['Penuaan penduduk', '人口老龄化', [['人口老龄化', 'ren kou lao ling hua', 'penuaan penduduk'], ['养老保障', 'yang lao bao zhang', 'jaminan hari tua'], ['代际关系', 'dai ji guan xi', 'relasi antargenerasi'], ['劳动力短缺', 'lao dong li duan que', 'kekurangan tenaga kerja']]],
    ['Keadilan pendidikan', '教育公平', [['教育公平', 'jiao yu gong ping', 'keadilan pendidikan'], ['资源分配', 'zi yuan fen pei', 'distribusi sumber daya'], ['应试教育', 'ying shi jiao yu', 'pendidikan berorientasi ujian'], ['素质教育', 'su zhi jiao yu', 'pendidikan karakter dan kompetensi']]],
    ['Perubahan iklim', '气候变化', [['碳排放', 'tan pai fang', 'emisi karbon'], ['碳中和', 'tan zhong he', 'netralitas karbon'], ['可再生能源', 'ke zai sheng neng yuan', 'energi terbarukan'], ['极端天气', 'ji duan tian qi', 'cuaca ekstrem']]],
    ['Etika kecerdasan buatan', '人工智能伦理', [['算法偏见', 'suan fa pian jian', 'bias algoritma'], ['数据隐私', 'shu ju yin si', 'privasi data'], ['问责机制', 'wen ze ji zhi', 'mekanisme akuntabilitas'], ['透明度', 'tou ming du', 'transparansi']]],
    ['Ekosistem informasi', '信息生态', [['信息茧房', 'xin xi jian fang', 'gelembung informasi'], ['虚假信息', 'xu jia xin xi', 'disinformasi'], ['舆论', 'yu lun', 'opini publik'], ['议程设置', 'yi cheng she zhi', 'penentuan agenda']]],
    ['Konsumerisme', '消费主义', [['消费主义', 'xiao fei zhu yi', 'konsumerisme'], ['符号消费', 'fu hao xiao fei', 'konsumsi simbolik'], ['可持续消费', 'ke chi xu xiao fei', 'konsumsi berkelanjutan'], ['物质主义', 'wu zhi zhu yi', 'materialisme']]],
    ['Identitas budaya global', '文化认同', [['文化认同', 'wen hua ren tong', 'identitas budaya'], ['本土化', 'ben tu hua', 'lokalisasi'], ['文化自信', 'wen hua zi xin', 'kepercayaan diri budaya'], ['文化输出', 'wen hua shu chu', 'ekspor budaya']]],
    ['Kesehatan masyarakat', '公共卫生', [['公共卫生', 'gong gong wei sheng', 'kesehatan masyarakat'], ['疫苗接种', 'yi miao jie zhong', 'vaksinasi'], ['预防为主', 'yu fang wei zhu', 'mengutamakan pencegahan'], ['医疗资源', 'yi liao zi yuan', 'sumber daya medis']]],
    ['Revitalisasi desa', '乡村振兴', [['乡村振兴', 'xiang cun zhen xing', 'revitalisasi desa'], ['城乡差距', 'cheng xiang cha ju', 'kesenjangan kota-desa'], ['农业现代化', 'nong ye xian dai hua', 'modernisasi pertanian'], ['人才回流', 'ren cai hui liu', 'kembalinya talenta']]],
    ['Ekonomi berbagi', '共享经济', [['共享经济', 'gong xiang jing ji', 'ekonomi berbagi'], ['平台经济', 'ping tai jing ji', 'ekonomi platform'], ['零工经济', 'ling gong jing ji', 'ekonomi gig'], ['劳动权益', 'lao dong quan yi', 'hak pekerja']]],
    ['Kesehatan jiwa', '心理健康', [['心理健康', 'xin li jian kang', 'kesehatan mental'], ['焦虑', 'jiao lv', 'kecemasan'], ['社会支持', 'she hui zhi chi', 'dukungan sosial'], ['污名化', 'wu ming hua', 'stigmatisasi']]],
    ['Inovasi sains dan teknologi', '科技创新', [['科技创新', 'ke ji chuang xin', 'inovasi iptek'], ['研发投入', 'yan fa tou ru', 'investasi riset dan pengembangan'], ['知识产权', 'zhi shi chan quan', 'hak kekayaan intelektual'], ['成果转化', 'cheng guo zhuan hua', 'hilirisasi hasil riset']]],
    ['Kebijakan bahasa', '语言政策', [['语言政策', 'yu yan zheng ce', 'kebijakan bahasa'], ['双语教育', 'shuang yu jiao yu', 'pendidikan dwibahasa'], ['方言保护', 'fang yan bao hu', 'pelestarian dialek'], ['语言活力', 'yu yan huo li', 'vitalitas bahasa']]],
    ['Struktur ketenagakerjaan', '就业结构', [['就业结构', 'jiu ye jie gou', 'struktur ketenagakerjaan'], ['产业升级', 'chan ye sheng ji', 'peningkatan industri'], ['技能错配', 'ji neng cuo pei', 'ketidaksesuaian keterampilan'], ['灵活就业', 'ling huo jiu ye', 'kerja fleksibel']]],
    ['Warisan budaya', '文化遗产', [['文化遗产', 'wen hua yi chan', 'warisan budaya'], ['非物质文化遗产', 'fei wu zhi wen hua yi chan', 'warisan budaya takbenda'], ['活态传承', 'huo tai chuan cheng', 'pewarisan hidup'], ['过度开发', 'guo du kai fa', 'eksploitasi berlebihan']]],
    ['Integritas akademik', '学术诚信', [['学术诚信', 'xue shu cheng xin', 'integritas akademik'], ['抄袭', 'chao xi', 'plagiarisme'], ['同行评审', 'tong hang ping shen', 'telaah sejawat'], ['引用规范', 'yin yong gui fan', 'aturan sitasi']]],
    ['Kerja sama internasional', '国际合作', [['国际合作', 'guo ji he zuo', 'kerja sama internasional'], ['多边主义', 'duo bian zhu yi', 'multilateralisme'], ['共同利益', 'gong tong li yi', 'kepentingan bersama'], ['互信', 'hu xin', 'saling percaya']]],
    ['Portofolio seminar HSK 7', '学术答辩', [['综合评述', 'zong he ping shu', 'tinjauan komprehensif'], ['学术报告', 'xue shu bao gao', 'presentasi akademik'], ['论点提炼', 'lun dian ti lian', 'penajaman argumen'], ['答辩', 'da bian', 'sidang pembelaan']]],
  ]),
  'hsk-8': toThemes([
    ['Kebijakan industri', '产业政策', [['产业政策', 'chan ye zheng ce', 'kebijakan industri'], ['补贴', 'bu tie', 'subsidi'], ['市场失灵', 'shi chang shi ling', 'kegagalan pasar'], ['政策工具', 'zheng ce gong ju', 'instrumen kebijakan']]],
    ['Keberlanjutan fiskal', '财政可持续性', [['财政赤字', 'cai zheng chi zi', 'defisit fiskal'], ['债务风险', 'zhai wu feng xian', 'risiko utang'], ['转移支付', 'zhuan yi zhi fu', 'transfer fiskal'], ['税收结构', 'shui shou jie gou', 'struktur pajak']]],
    ['Sistem jaminan sosial', '社会保障体系', [['社会保障', 'she hui bao zhang', 'jaminan sosial'], ['覆盖面', 'fu gai mian', 'cakupan'], ['可携带性', 'ke xie dai xing', 'portabilitas'], ['兜底保障', 'dou di bao zhang', 'jaring pengaman dasar']]],
    ['Urbanisasi dan sistem hukou', '户籍改革', [['户籍制度', 'hu ji zhi du', 'sistem registrasi penduduk'], ['城镇化', 'cheng zhen hua', 'urbanisasi'], ['公共服务均等化', 'gong gong fu wu jun deng hua', 'pemerataan layanan publik'], ['流动人口', 'liu dong ren kou', 'penduduk migran']]],
    ['Transisi energi', '能源转型', [['能源转型', 'neng yuan zhuan xing', 'transisi energi'], ['电网', 'dian wang', 'jaringan listrik'], ['储能', 'chu neng', 'penyimpanan energi'], ['成本曲线', 'cheng ben qu xian', 'kurva biaya']]],
    ['Tata kelola data', '数据治理', [['数据治理', 'shu ju zhi li', 'tata kelola data'], ['数据确权', 'shu ju que quan', 'penetapan hak atas data'], ['跨境流动', 'kua jing liu dong', 'aliran lintas batas'], ['合规', 'he gui', 'kepatuhan regulasi']]],
    ['Evaluasi riset', '科研评价', [['科研评价', 'ke yan ping jia', 'evaluasi riset'], ['影响因子', 'ying xiang yin zi', 'faktor dampak'], ['同行评议', 'tong hang ping yi', 'penilaian sejawat'], ['唯论文', 'wei lun wen', 'orientasi semata pada publikasi']]],
    ['Tata kelola kesehatan publik', '公共卫生治理', [['应急管理', 'ying ji guan li', 'manajemen darurat'], ['风险沟通', 'feng xian gou tong', 'komunikasi risiko'], ['韧性', 'ren xing', 'ketahanan'], ['协同机制', 'xie tong ji zhi', 'mekanisme koordinasi']]],
    ['Reformasi penilaian pendidikan', '教育评价改革', [['评价体系', 'ping jia ti xi', 'sistem penilaian'], ['过程性评价', 'guo cheng xing ping jia', 'penilaian proses'], ['增值评价', 'zeng zhi ping jia', 'penilaian nilai tambah'], ['减负', 'jian fu', 'mengurangi beban belajar']]],
    ['Pasar tenaga kerja', '劳动力市场', [['劳动参与率', 'lao dong can yu lv', 'tingkat partisipasi kerja'], ['结构性失业', 'jie gou xing shi ye', 'pengangguran struktural'], ['最低工资', 'zui di gong zi', 'upah minimum'], ['人力资本', 'ren li zi ben', 'modal manusia']]],
    ['Regulasi keuangan', '金融监管', [['金融监管', 'jin rong jian guan', 'regulasi keuangan'], ['系统性风险', 'xi tong xing feng xian', 'risiko sistemik'], ['杠杆率', 'gang gan lv', 'rasio leverage'], ['宏观审慎', 'hong guan shen shen', 'makroprudensial']]],
    ['Regulasi lingkungan', '环境规制', [['环境规制', 'huan jing gui zhi', 'regulasi lingkungan'], ['外部性', 'wai bu xing', 'eksternalitas'], ['碳交易', 'tan jiao yi', 'perdagangan karbon'], ['执法力度', 'zhi fa li du', 'ketegasan penegakan hukum']]],
    ['Antimonopoli platform', '平台反垄断', [['反垄断', 'fan long duan', 'antimonopoli'], ['市场支配地位', 'shi chang zhi pei di wei', 'posisi dominan di pasar'], ['网络效应', 'wang luo xiao ying', 'efek jaringan'], ['算法合谋', 'suan fa he mou', 'kolusi algoritmik']]],
    ['Kebijakan kependudukan', '人口政策', [['生育率', 'sheng yu lv', 'tingkat kelahiran'], ['人口红利', 'ren kou hong li', 'bonus demografi'], ['育儿成本', 'yu er cheng ben', 'biaya pengasuhan anak'], ['政策效果评估', 'zheng ce xiao guo ping gu', 'evaluasi dampak kebijakan']]],
    ['Pembangunan regional', '区域协调发展', [['区域协调', 'qu yu xie tiao', 'koordinasi regional'], ['产业转移', 'chan ye zhuan yi', 'relokasi industri'], ['辐射效应', 'fu she xiao ying', 'efek limpahan'], ['要素流动', 'yao su liu dong', 'mobilitas faktor produksi']]],
    ['Layanan budaya publik', '公共文化服务', [['公共文化服务', 'gong gong wen hua fu wu', 'layanan budaya publik'], ['文化供给', 'wen hua gong ji', 'penyediaan budaya'], ['参与度', 'can yu du', 'tingkat partisipasi'], ['数字化转型', 'shu zi hua zhuan xing', 'transformasi digital']]],
    ['Aturan perdagangan internasional', '国际贸易规则', [['贸易规则', 'mao yi gui ze', 'aturan perdagangan'], ['关税壁垒', 'guan shui bi lei', 'hambatan tarif'], ['供应链韧性', 'gong ying lian ren xing', 'ketahanan rantai pasok'], ['原产地规则', 'yuan chan di gui ze', 'aturan negara asal']]],
    ['Metode riset empiris', '实证研究方法', [['因果推断', 'yin guo tui duan', 'inferensi kausal'], ['内生性', 'nei sheng xing', 'endogenitas'], ['样本偏差', 'yang ben pian cha', 'bias sampel'], ['稳健性检验', 'wen jian xing jian yan', 'uji robustitas']]],
    ['Evaluasi kebijakan', '政策评估', [['政策评估', 'zheng ce ping gu', 'evaluasi kebijakan'], ['成本收益分析', 'cheng ben shou yi fen xi', 'analisis biaya-manfaat'], ['反事实', 'fan shi shi', 'kontrafaktual'], ['指标体系', 'zhi biao ti xi', 'sistem indikator']]],
    ['Portofolio policy paper HSK 8', '政策研究报告', [['政策建议书', 'zheng ce jian yi shu', 'naskah rekomendasi kebijakan'], ['研究综述', 'yan jiu zong shu', 'tinjauan riset'], ['结论稳健', 'jie lun wen jian', 'kesimpulan yang kokoh'], ['局限性', 'ju xian xing', 'keterbatasan']]],
  ]),
  'hsk-9': toThemes([
    ['Refleksi modernitas', '现代性反思', [['现代性', 'xian dai xing', 'modernitas'], ['理性化', 'li xing hua', 'rasionalisasi'], ['异化', 'yi hua', 'alienasi'], ['反思性', 'fan si xing', 'refleksivitas']]],
    ['Sosiologi pengetahuan', '知识社会学', [['知识建构', 'zhi shi jian gou', 'konstruksi pengetahuan'], ['话语权', 'hua yu quan', 'otoritas wacana'], ['权威', 'quan wei', 'otoritas'], ['认识论', 'ren shi lun', 'epistemologi']]],
    ['Filsafat teknologi', '技术哲学', [['技术决定论', 'ji shu jue ding lun', 'determinisme teknologi'], ['工具理性', 'gong ju li xing', 'rasionalitas instrumental'], ['主体性', 'zhu ti xing', 'subjektivitas'], ['后人类', 'hou ren lei', 'pascamanusia']]],
    ['Nalar publik', '公共理性', [['公共理性', 'gong gong li xing', 'nalar publik'], ['协商民主', 'xie shang min zhu', 'demokrasi deliberatif'], ['共识', 'gong shi', 'konsensus'], ['价值多元', 'jia zhi duo yuan', 'pluralitas nilai']]],
    ['Dialog antarperadaban', '文明互鉴', [['文明互鉴', 'wen ming hu jian', 'saling belajar antarperadaban'], ['文化间性', 'wen hua jian xing', 'interkulturalitas'], ['他者', 'ta zhe', 'liyan / the other'], ['普遍性', 'pu bian xing', 'universalitas']]],
    ['Etika ekologis', '生态伦理', [['生态伦理', 'sheng tai lun li', 'etika ekologis'], ['人类中心主义', 'ren lei zhong xin zhu yi', 'antroposentrisme'], ['代际正义', 'dai ji zheng yi', 'keadilan antargenerasi'], ['可持续性', 'ke chi xu xing', 'keberlanjutan']]],
    ['Narasi dan memori', '叙事与记忆', [['集体记忆', 'ji ti ji yi', 'memori kolektif'], ['叙事建构', 'xu shi jian gou', 'konstruksi naratif'], ['历史书写', 'li shi shu xie', 'penulisan sejarah'], ['身份认同', 'shen fen ren tong', 'identitas diri']]],
    ['Bahasa dan kekuasaan', '语言与权力', [['语言霸权', 'yu yan ba quan', 'hegemoni bahasa'], ['话语分析', 'hua yu fen xi', 'analisis wacana'], ['意识形态', 'yi shi xing tai', 'ideologi'], ['解构', 'jie gou', 'dekonstruksi']]],
    ['Membaca ulang karya klasik', '经典重读', [['经典', 'jing dian', 'karya klasik'], ['阐释', 'chan shi', 'interpretasi'], ['互文性', 'hu wen xing', 'intertekstualitas'], ['语境化', 'yu jing hua', 'kontekstualisasi']]],
    ['Sistem kompleks', '复杂系统', [['复杂系统', 'fu za xi tong', 'sistem kompleks'], ['涌现', 'yong xian', 'emergensi'], ['非线性', 'fei xian xing', 'nonlinearitas'], ['反馈回路', 'fan kui hui lu', 'lingkar umpan balik']]],
    ['Masyarakat risiko', '风险社会', [['风险社会', 'feng xian she hui', 'masyarakat risiko'], ['不确定性', 'bu que ding xing', 'ketidakpastian'], ['专家系统', 'zhuan jia xi tong', 'sistem pakar'], ['信任危机', 'xin ren wei ji', 'krisis kepercayaan']]],
    ['Tata kelola global', '全球治理', [['全球治理', 'quan qiu zhi li', 'tata kelola global'], ['主权', 'zhu quan', 'kedaulatan'], ['公共产品', 'gong gong chan pin', 'barang publik'], ['制度性话语权', 'zhi du xing hua yu quan', 'pengaruh institusional']]],
    ['Estetika', '美学与审美', [['审美经验', 'shen mei jing yan', 'pengalaman estetis'], ['意境', 'yi jing', 'suasana artistik'], ['形式与内容', 'xing shi yu nei rong', 'bentuk dan isi'], ['审美判断', 'shen mei pan duan', 'penilaian estetis']]],
    ['Metodologi sains', '科学方法论', [['可证伪性', 'ke zheng wei xing', 'falsifiabilitas'], ['范式', 'fan shi', 'paradigma'], ['归纳法', 'gui na fa', 'metode induktif'], ['理论负载', 'li lun fu zai', 'muatan teori']]],
    ['Teori keadilan', '正义理论', [['分配正义', 'fen pei zheng yi', 'keadilan distributif'], ['程序正义', 'cheng xu zheng yi', 'keadilan prosedural'], ['机会平等', 'ji hui ping deng', 'kesetaraan kesempatan'], ['应得', 'ying de', 'kelayakan menerima (desert)']]],
    ['Humaniora perkotaan', '城市人文', [['空间正义', 'kong jian zheng yi', 'keadilan spasial'], ['地方感', 'di fang gan', 'rasa tempat'], ['绅士化', 'shen shi hua', 'gentrifikasi'], ['公共性', 'gong gong xing', 'kepublikan']]],
    ['Peradaban digital', '数字文明', [['数字主权', 'shu zi zhu quan', 'kedaulatan digital'], ['注意力经济', 'zhu yi li jing ji', 'ekonomi perhatian'], ['算法治理', 'suan fa zhi li', 'tata kelola algoritma'], ['数字人文', 'shu zi ren wen', 'humaniora digital']]],
    ['Riset lintas disiplin', '跨学科研究', [['跨学科', 'kua xue ke', 'lintas disiplin'], ['方法融合', 'fang fa rong he', 'integrasi metode'], ['问题导向', 'wen ti dao xiang', 'berorientasi masalah'], ['学科壁垒', 'xue ke bi lei', 'sekat antardisiplin']]],
    ['Komunitas akademik', '学术共同体', [['学术共同体', 'xue shu gong tong ti', 'komunitas akademik'], ['学术规范', 'xue shu gui fan', 'norma akademik'], ['公共知识分子', 'gong gong zhi shi fen zi', 'intelektual publik'], ['学术自由', 'xue shu zi you', 'kebebasan akademik']]],
    ['Portofolio mastery HSK 9', '学术对话', [['学术论文', 'xue shu lun wen', 'makalah akademik'], ['理论贡献', 'li lun gong xian', 'kontribusi teoretis'], ['研究问题', 'yan jiu wen ti', 'pertanyaan penelitian'], ['学术对话', 'xue shu dui hua', 'dialog akademik']]],
  ]),
};

export function getMandarinTheme(level: MandarinLevelId, lesson: number): MandarinTheme | undefined {
  return mandarinThemeBank[level]?.[lesson - 1];
}

export function getMandarinLevelThemeWords(level: MandarinLevelId): MandarinThemeWord[] {
  return (mandarinThemeBank[level] ?? []).flatMap((theme) => theme.vocabulary);
}
