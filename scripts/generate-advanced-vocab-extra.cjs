/**
 * generate-advanced-vocab-extra.cjs
 * Generates Vocabulary Lessons 21-50 for Advanced level
 * + Updates AdvancedVocabularyPage.tsx to show 50 lessons
 */
const fs = require('fs');
const path = require('path');

const VOCAB_DIR = path.join(__dirname, '../src/pages/module/english/advanced/vocabulary');
const PAGE_FILE = path.join(__dirname, '../src/pages/module/english/advanced/vocabulary/AdvancedVocabularyPage.tsx');
const ACCENT = '#0B5345';
const STORAGE_KEY = 'talky_advanced_vocabulary_completed';

// ═══════════════════════════════════════════════════════════════
// 30 NEW VOCABULARY TOPICS (Lesson 21-50)
// ═══════════════════════════════════════════════════════════════
const NEW_LESSONS = [
  { n:21, title:'Law & Criminal Justice', subtitle:'Legal Vocabulary for Criminal Law and Justice Systems',
    words:[
      { word:'Acquit', type:'Verb', ipa:'/əˈkwɪt/', meaning:'To formally declare that someone is not guilty of a criminal charge', example:'The jury acquitted the defendant after three days of deliberation.', collocations:['acquit of all charges','acquit on grounds of','verdict to acquit'] },
      { word:'Indictment', type:'Noun', ipa:'/ɪnˈdaɪt.mənt/', meaning:'A formal accusation that a person has committed a crime; a charge', example:'The grand jury issued an indictment against the former official.', collocations:['criminal indictment','face an indictment','issue an indictment'] },
      { word:'Jurisprudence', type:'Noun', ipa:'/ˌdʒʊər.ɪsˈpruː.dəns/', meaning:'The theory or philosophy of law; a body of legal decisions', example:'Legal scholars continue to debate the jurisprudence of human rights law.', collocations:['comparative jurisprudence','jurisprudence of','legal jurisprudence'] },
      { word:'Liable', type:'Adj', ipa:'/ˈlaɪ.ə.bəl/', meaning:'Responsible by law; legally accountable for something', example:'The company was found liable for the data breach and ordered to pay damages.', collocations:['held liable','liable for damages','legally liable'] },
      { word:'Extradite', type:'Verb', ipa:'/ˈek.strə.daɪt/', meaning:'To hand over a person accused of a crime to the jurisdiction of another country', example:'The suspect was extradited to face trial in the country where the crime occurred.', collocations:['extradite to','extradite a suspect','extradition treaty'] },
    ]
  },
  { n:22, title:'Architecture & Urban Design', subtitle:'Vocabulary for Built Environment and Urban Planning',
    words:[
      { word:'Bespoke', type:'Adj', ipa:'/bɪˈspəʊk/', meaning:'Made to order; custom-designed for a specific purpose or person', example:'The firm specialises in bespoke architectural solutions for heritage properties.', collocations:['bespoke design','bespoke solution','bespoke furniture'] },
      { word:'Vernacular', type:'Adj/Noun', ipa:'/vəˈnæk.jʊ.lər/', meaning:'Architecture using local materials and traditions; everyday language of a region', example:'The vernacular architecture of the region reflects centuries of adaptation to the climate.', collocations:['vernacular architecture','vernacular style','local vernacular'] },
      { word:'Gentrification', type:'Noun', ipa:'/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/', meaning:'The process of renovating urban areas so that they attract wealthier residents', example:'Gentrification has transformed the neighbourhood but displaced many long-term residents.', collocations:['rapid gentrification','gentrification of','resist gentrification'] },
      { word:'Infrastructure', type:'Noun', ipa:'/ˈɪn.frə.strʌk.tʃər/', meaning:'The basic physical systems of a country or region: roads, utilities, communications', example:'The government pledged £50bn for infrastructure investment over the next decade.', collocations:['infrastructure investment','critical infrastructure','urban infrastructure'] },
      { word:'Sustainability', type:'Noun', ipa:'/səˌsteɪ.nəˈbɪl.ɪ.ti/', meaning:'The ability to maintain at a certain rate or level without depleting natural resources', example:'Sustainability has become a central criterion in contemporary architectural design.', collocations:['environmental sustainability','sustainability goals','long-term sustainability'] },
    ]
  },
  { n:23, title:'Cognitive Science & Neuroscience', subtitle:'Vocabulary for Brain, Mind, and Cognition',
    words:[
      { word:'Neuroplasticity', type:'Noun', ipa:'/ˌnjʊə.rəʊˌplæsˈtɪs.ɪ.ti/', meaning:'The brain\'s ability to reorganise and form new neural connections throughout life', example:'Research on neuroplasticity has fundamentally changed how we approach rehabilitation after stroke.', collocations:['brain neuroplasticity','promote neuroplasticity','neural plasticity'] },
      { word:'Cognition', type:'Noun', ipa:'/kɒɡˈnɪʃ.ən/', meaning:'The mental action of acquiring knowledge through thought, experience, and the senses', example:'The study examined how ageing affects higher-order cognition.', collocations:['cognitive function','impair cognition','social cognition'] },
      { word:'Synaptic', type:'Adj', ipa:'/sɪˈnæp.tɪk/', meaning:'Relating to synapses — the junctions between nerve cells', example:'Learning is thought to involve the strengthening of synaptic connections.', collocations:['synaptic connection','synaptic plasticity','synaptic transmission'] },
      { word:'Executive function', type:'Noun', ipa:'/ɪɡˈzek.jʊ.tɪv ˈfʌŋk.ʃən/', meaning:'Higher-level cognitive processes including planning, decision-making, and impulse control', example:'Executive function is often impaired in individuals with ADHD.', collocations:['executive function deficit','test executive function','support executive function'] },
      { word:'Proprioception', type:'Noun', ipa:'/ˌprəʊ.pri.əˈsep.ʃən/', meaning:'The sense of the position and movement of one\'s own body', example:'Balance training relies heavily on developing proprioception.', collocations:['proprioception skills','proprioceptive feedback','loss of proprioception'] },
    ]
  },
  { n:24, title:'Sociology & Social Theory', subtitle:'Vocabulary for Sociological Analysis and Theory',
    words:[
      { word:'Stratification', type:'Noun', ipa:'/ˌstræt.ɪ.fɪˈkeɪ.ʃən/', meaning:'The arrangement of society into hierarchical layers based on class, race, or gender', example:'Social stratification remains a defining feature of contemporary capitalist societies.', collocations:['social stratification','class stratification','economic stratification'] },
      { word:'Anomie', type:'Noun', ipa:'/ˈæn.ə.mi/', meaning:'A condition of instability and breakdown of social norms (Durkheim)', example:'Durkheim argued that rapid social change can lead to anomie and increased rates of suicide.', collocations:['social anomie','experience anomie','Durkheimian anomie'] },
      { word:'Commodification', type:'Noun', ipa:'/kəˌmɒd.ɪ.fɪˈkeɪ.ʃən/', meaning:'The process of treating something as if it were a commodity; assigning market value', example:'Critics argue that the commodification of education undermines its intrinsic value.', collocations:['commodification of education','commodification of culture','resist commodification'] },
      { word:'Intersectionality', type:'Noun', ipa:'/ˌɪn.tə.sek.ʃəˈnæl.ɪ.ti/', meaning:'The interconnected nature of social categorisations (race, class, gender) and overlapping disadvantage', example:'An intersectional approach reveals how women of colour face compounded inequalities.', collocations:['intersectional analysis','apply intersectionality','intersectional framework'] },
      { word:'Habitus', type:'Noun', ipa:'/ˈhæb.ɪ.tʊs/', meaning:'(Bourdieu) The habits, skills, and dispositions an individual acquires through their social position', example:'Bourdieu\'s concept of habitus explains how social class is reproduced through everyday behaviour.', collocations:['cultural habitus','reproduce habitus','Bourdieu habitus'] },
    ]
  },
  { n:25, title:'Linguistics & Language Theory', subtitle:'Vocabulary for the Scientific Study of Language',
    words:[
      { word:'Pragmatics', type:'Noun', ipa:'/præɡˈmæt.ɪks/', meaning:'The branch of linguistics dealing with language in use and context', example:'Pragmatics examines how context affects the interpretation of utterances.', collocations:['pragmatic meaning','study pragmatics','pragmatic competence'] },
      { word:'Morphology', type:'Noun', ipa:'/mɔːˈfɒl.ə.dʒi/', meaning:'The study of the form and structure of words; how words are built from smaller units', example:'The morphology of English includes both derivational and inflectional processes.', collocations:['derivational morphology','morphological analysis','word morphology'] },
      { word:'Syntax', type:'Noun', ipa:'/ˈsɪn.tæks/', meaning:'The set of rules governing the structure of sentences; sentence grammar', example:'Generative grammar attempts to describe the underlying syntax of all human languages.', collocations:['syntactic structure','rules of syntax','transformational syntax'] },
      { word:'Sociolinguistics', type:'Noun', ipa:'/ˌsəʊ.si.əʊ.lɪŋˈɡwɪs.tɪks/', meaning:'The study of the relationship between language and society', example:'Sociolinguistics explores how factors like class, gender, and ethnicity shape language use.', collocations:['sociolinguistic variation','study sociolinguistics','sociolinguistic study'] },
      { word:'Deixis', type:'Noun', ipa:'/ˈdaɪk.sɪs/', meaning:'Words or phrases that require context for interpretation (e.g., I, here, now, this)', example:'Deixis in language anchors communication to the specific time, place, and person of the utterance.', collocations:['spatial deixis','temporal deixis','deictic expression'] },
    ]
  },
  { n:26, title:'Economics of Innovation', subtitle:'Vocabulary for Technology Economics and Innovation Policy',
    words:[
      { word:'Spillover effects', type:'Noun', ipa:'/ˈspɪl.əʊvər ɪˈfekts/', meaning:'Benefits or costs of an economic activity that affect third parties outside the transaction', example:'The positive spillover effects of university research benefit the surrounding economy.', collocations:['knowledge spillover','positive spillover','externality/spillover'] },
      { word:'Incumbent', type:'Noun/Adj', ipa:'/ɪnˈkʌm.bənt/', meaning:'An organisation currently holding a dominant market position; holding an office', example:'The incumbent firm resisted the disruptive startup through aggressive pricing strategies.', collocations:['incumbent firm','incumbent advantage','incumbent player'] },
      { word:'Venture capital', type:'Noun', ipa:'/ˈven.tʃər ˈkæp.ɪ.təl/', meaning:'Financing provided to startups and small businesses with high growth potential', example:'The fintech startup secured $20 million in venture capital in its Series B round.', collocations:['venture capital funding','venture capitalist','venture capital investment'] },
      { word:'Economies of scale', type:'Noun', ipa:'/ɪˈkɒn.ə.miz əv skeɪl/', meaning:'Cost advantages obtained from increased levels of production', example:'The merger was primarily driven by a desire to achieve greater economies of scale.', collocations:['achieve economies of scale','economies of scale in','exploit economies of scale'] },
      { word:'Monopolistic', type:'Adj', ipa:'/məˌnɒp.əˈlɪs.tɪk/', meaning:'Relating to monopoly; having characteristics of a monopoly', example:'The regulator determined that the company had engaged in monopolistic practices.', collocations:['monopolistic behaviour','monopolistic market','near-monopolistic'] },
    ]
  },
  { n:27, title:'Climate Science & Policy', subtitle:'Advanced Vocabulary for Climate Change and Environmental Policy',
    words:[
      { word:'Decarbonisation', type:'Noun', ipa:'/diːˌkɑː.bə.naɪˈzeɪ.ʃən/', meaning:'The process of reducing carbon dioxide emissions, especially in energy production', example:'Deep decarbonisation of the energy sector is essential to meet the 1.5°C target.', collocations:['rapid decarbonisation','decarbonisation pathway','decarbonisation target'] },
      { word:'Albedo', type:'Noun', ipa:'/ælˈbiː.dəʊ/', meaning:'The proportion of light or radiation reflected by a surface (especially the Earth)', example:'Arctic ice loss reduces the Earth\'s albedo, creating a positive feedback loop.', collocations:['surface albedo','albedo effect','reducing albedo'] },
      { word:'Tipping point', type:'Noun', ipa:'/ˈtɪp.ɪŋ pɔɪnt/', meaning:'A threshold beyond which a system undergoes rapid, potentially irreversible change', example:'Scientists warn that several key climate tipping points may be closer than previously estimated.', collocations:['climate tipping point','reach a tipping point','cascade of tipping points'] },
      { word:'Carbon offsetting', type:'Noun', ipa:'/ˈkɑː.bən ˈɒf.set.ɪŋ/', meaning:'Compensating for carbon emissions by funding equivalent reductions elsewhere', example:'Critics argue that carbon offsetting delays the structural changes needed for real decarbonisation.', collocations:['carbon offset scheme','voluntary carbon offsetting','offset carbon emissions'] },
      { word:'Loss and damage', type:'Noun', ipa:'/lɒs ənd ˈdæm.ɪdʒ/', meaning:'Climate impacts that cannot be adapted to; a key concept in international climate negotiations', example:'"Loss and damage" funding for vulnerable nations was a central demand at COP28.', collocations:['loss and damage fund','address loss and damage','climate loss and damage'] },
    ]
  },
  { n:28, title:'Medical Research & Clinical Trials', subtitle:'Vocabulary for Evidence-Based Medicine',
    words:[
      { word:'Randomised controlled trial', type:'Noun', ipa:'/ˈræn.də.maɪzd kənˈtrəʊld traɪəl/', meaning:'The gold standard study design: participants randomly assigned to treatment or control groups', example:'The drug\'s efficacy was established through a randomised controlled trial of 3,000 participants.', collocations:['conduct an RCT','double-blind RCT','randomised controlled trial results'] },
      { word:'Efficacy', type:'Noun', ipa:'/ˈef.ɪ.kə.si/', meaning:'The ability to produce a desired or intended result; how well a treatment works in ideal conditions', example:'Vaccine efficacy was estimated at 95% in the pivotal Phase 3 trial.', collocations:['clinical efficacy','high efficacy','vaccine efficacy'] },
      { word:'Placebo', type:'Noun', ipa:'/pləˈsiː.bəʊ/', meaning:'A treatment with no therapeutic effect, used as a control in clinical trials', example:'Participants in the control arm received a placebo indistinguishable from the active drug.', collocations:['placebo effect','placebo arm','placebo-controlled'] },
      { word:'Cohort', type:'Noun', ipa:'/ˈkəʊ.hɔːt/', meaning:'A group of participants sharing a characteristic, followed over time in a study', example:'The study followed a cohort of 10,000 adults over 20 years.', collocations:['cohort study','birth cohort','patient cohort'] },
      { word:'Meta-analysis', type:'Noun', ipa:'/ˌmet.ə.əˈnæl.ɪ.sɪs/', meaning:'A statistical analysis combining results from multiple studies on the same topic', example:'The meta-analysis of 47 trials confirmed the treatment\'s significant clinical benefit.', collocations:['systematic meta-analysis','conduct a meta-analysis','meta-analytic findings'] },
    ]
  },
  { n:29, title:'Postcolonial & Cultural Studies', subtitle:'Vocabulary for Critical Cultural and Postcolonial Theory',
    words:[
      { word:'Diaspora', type:'Noun', ipa:'/daɪˈæs.pər.ə/', meaning:'A population scattered from its original homeland; the communities formed by such dispersal', example:'The South Asian diaspora has maintained strong cultural connections across generations.', collocations:['diasporic community','diaspora literature','African diaspora'] },
      { word:'Hybridity', type:'Noun', ipa:'/haɪˈbrɪd.ɪ.ti/', meaning:'(Bhabha) The creation of new cultural forms from the mixing of colonial and indigenous cultures', example:'Homi Bhabha\'s concept of hybridity challenges the binary of coloniser and colonised.', collocations:['cultural hybridity','hybrid identity','postcolonial hybridity'] },
      { word:'Decolonise', type:'Verb', ipa:'/diːˈkɒl.ə.naɪz/', meaning:'To undo the effects of colonialism; to remove colonial influence from institutions', example:'Efforts to decolonise the curriculum have prompted universities to diversify their reading lists.', collocations:['decolonise the curriculum','decolonise knowledge','decolonisation process'] },
      { word:'Subaltern', type:'Noun/Adj', ipa:'/sʌˈbɔːl.tən/', meaning:'(Spivak) Those excluded from social, political, and geopolitical hegemony; marginalised groups', example:'Spivak famously asked: "Can the subaltern speak?" — questioning whose voices are heard.', collocations:['subaltern voice','subaltern perspective','subaltern studies'] },
      { word:'Orientalism', type:'Noun', ipa:'/ˈɔː.ri.ən.tə.lɪ.z(ə)m/', meaning:'(Said) The Western stereotyped depiction of the East as exotic, backward, and inferior', example:'Edward Said\'s "Orientalism" (1978) is a foundational text in postcolonial studies.', collocations:['critique of orientalism','Saidian orientalism','orientalist discourse'] },
    ]
  },
  { n:30, title:'Leadership & Organisational Behaviour', subtitle:'Vocabulary for Management, Leadership Theory, and HR',
    words:[
      { word:'Transformational', type:'Adj', ipa:'/trænsˌfɔː.məˈʃən.əl/', meaning:'Causing a profound change; in leadership: inspiring followers to exceed expectations', example:'Transformational leadership is associated with higher levels of employee motivation and innovation.', collocations:['transformational leadership','transformational change','transformational leader'] },
      { word:'Accountability', type:'Noun', ipa:'/əˌkaʊn.təˈbɪl.ɪ.ti/', meaning:'The fact of being responsible to others and required to explain decisions', example:'Robust accountability mechanisms are essential for good governance in public institutions.', collocations:['hold accountable','democratic accountability','accountability framework'] },
      { word:'Remuneration', type:'Noun', ipa:'/rɪˌmjuː.nəˈreɪ.ʃən/', meaning:'Money paid for work or a service; compensation', example:'Executive remuneration packages have come under intense scrutiny from shareholders.', collocations:['executive remuneration','fair remuneration','remuneration package'] },
      { word:'Attrition', type:'Noun', ipa:'/əˈtrɪʃ.ən/', meaning:'The gradual reduction in staff through natural means (resignation, retirement)', example:'High attrition rates in tech companies signal widespread employee dissatisfaction.', collocations:['staff attrition','reduce attrition','attrition rate'] },
      { word:'Synergy', type:'Noun', ipa:'/ˈsɪn.ər.dʒi/', meaning:'The combined effect that is greater than the sum of individual parts', example:'The merger was expected to generate significant synergies by eliminating duplicate functions.', collocations:['create synergy','synergistic effect','organisational synergy'] },
    ]
  },
  { n:31, title:'Geopolitics & Security', subtitle:'Vocabulary for International Security and Geopolitical Analysis',
    words:[
      { word:'Deterrence', type:'Noun', ipa:'/dɪˈter.əns/', meaning:'The action of discouraging an action or event through instilling doubt or fear of consequences', example:'Nuclear deterrence was the cornerstone of Cold War strategic stability.', collocations:['nuclear deterrence','deterrence theory','deterrence strategy'] },
      { word:'Asymmetric warfare', type:'Noun', ipa:'/ˌeɪ.sɪˈmet.rɪk ˈwɔː.feər/', meaning:'Conflict between parties of very different military capabilities; guerrilla-style tactics', example:'Asymmetric warfare has characterised most major conflicts since the end of the Cold War.', collocations:['asymmetric threat','asymmetric conflict','asymmetric tactics'] },
      { word:'Proxy war', type:'Noun', ipa:'/ˈprɒk.si wɔːr/', meaning:'A conflict instigated by a major power through a third party', example:'The conflict became a proxy war, with multiple external powers backing rival factions.', collocations:['proxy conflict','external proxy','proxy forces'] },
      { word:'Sanctions', type:'Noun', ipa:'/ˈsæŋk.ʃənz/', meaning:'Measures taken by states to coerce compliance, typically through economic restrictions', example:'Wide-ranging sanctions were imposed following violations of international law.', collocations:['impose sanctions','economic sanctions','targeted sanctions'] },
      { word:'Cyberwarfare', type:'Noun', ipa:'/ˈsaɪ.bə.wɔː.feər/', meaning:'The use of digital attacks to disrupt or damage a nation\'s information systems', example:'State-sponsored cyberwarfare has become a defining feature of 21st-century geopolitical competition.', collocations:['cyberwarfare capabilities','state cyberwarfare','cyberattack/warfare'] },
    ]
  },
  { n:32, title:'Food Science & Nutrition', subtitle:'Vocabulary for Nutrition, Food Technology, and Public Health',
    words:[
      { word:'Macronutrient', type:'Noun', ipa:'/ˈmæk.rəʊˌnjuː.tri.ənt/', meaning:'A nutrient required in large amounts: carbohydrates, proteins, and fats', example:'Dietary guidelines recommend specific ratios of macronutrients for optimal health.', collocations:['macronutrient ratio','macronutrient balance','macronutrient intake'] },
      { word:'Glycaemic index', type:'Noun', ipa:'/ɡlaɪˈsiː.mɪk ˈɪn.deks/', meaning:'A measure of how quickly foods raise blood glucose levels', example:'Low glycaemic index foods are associated with better blood sugar control in type 2 diabetes.', collocations:['low GI','glycaemic load','high glycaemic index'] },
      { word:'Fortification', type:'Noun', ipa:'/ˌfɔː.tɪ.fɪˈkeɪ.ʃən/', meaning:'The addition of nutrients to food to improve its nutritional quality', example:'Fortification of flour with folic acid has significantly reduced neural tube defects.', collocations:['food fortification','vitamin fortification','mandatory fortification'] },
      { word:'Microbiome', type:'Noun', ipa:'/ˈmaɪ.krəʊ.baɪ.əʊm/', meaning:'The community of microorganisms living in and on the body', example:'Emerging research links gut microbiome health to immune function and mental wellbeing.', collocations:['gut microbiome','healthy microbiome','microbiome diversity'] },
      { word:'Ultra-processed', type:'Adj', ipa:'/ˈʌl.trəˈprəʊ.sest/', meaning:'Industrially manufactured food products with multiple added ingredients', example:'High consumption of ultra-processed foods is associated with increased risk of chronic disease.', collocations:['ultra-processed food','ultra-processed diet','avoid ultra-processed'] },
    ]
  },
  { n:33, title:'Space Science & Astronomy', subtitle:'Vocabulary for Astrophysics and Space Exploration',
    words:[
      { word:'Exoplanet', type:'Noun', ipa:'/ˈek.səʊˌplæn.ɪt/', meaning:'A planet orbiting a star outside our solar system', example:'NASA\'s Kepler telescope confirmed thousands of exoplanets, many in habitable zones.', collocations:['habitable exoplanet','detect an exoplanet','exoplanet atmosphere'] },
      { word:'Singularity', type:'Noun', ipa:'/ˌsɪŋ.ɡjʊˈlær.ɪ.ti/', meaning:'A point in space where gravitational forces cause infinite curvature (black hole centre)', example:'The physics of a black hole singularity remains beyond our current theoretical frameworks.', collocations:['gravitational singularity','black hole singularity','technological singularity'] },
      { word:'Dark matter', type:'Noun', ipa:'/dɑːk ˈmæt.ər/', meaning:'Hypothetical matter that cannot be seen but whose gravitational effects can be detected', example:'Dark matter is thought to constitute approximately 27% of the total mass-energy of the universe.', collocations:['dark matter distribution','detect dark matter','dark matter halo'] },
      { word:'Nebula', type:'Noun', ipa:'/ˈneb.jʊ.lə/', meaning:'A cloud of gas and dust in space; the birthplace of stars', example:'The Pillars of Creation, photographed by the Hubble telescope, are towering nebulae in the Eagle Nebula.', collocations:['stellar nebula','planetary nebula','nebula formation'] },
      { word:'Propulsion', type:'Noun', ipa:'/prəˈpʌl.ʃən/', meaning:'The action of driving or pushing forward; the means of doing so', example:'Ion propulsion systems offer greater efficiency than chemical rockets for deep space missions.', collocations:['ion propulsion','propulsion system','jet propulsion'] },
    ]
  },
  { n:34, title:'Financial Markets & Investment', subtitle:'Advanced Vocabulary for Financial Analysis and Trading',
    words:[
      { word:'Portfolio', type:'Noun', ipa:'/pɔːtˈfəʊ.li.əʊ/', meaning:'A range of investments held by an individual or institution', example:'The fund manager restructured the portfolio to reduce exposure to emerging market risk.', collocations:['investment portfolio','diversify a portfolio','portfolio management'] },
      { word:'Derivative', type:'Noun', ipa:'/dɪˈrɪv.ə.tɪv/', meaning:'A financial instrument whose value depends on an underlying asset', example:'Complex mortgage-backed derivatives were at the heart of the 2008 financial crisis.', collocations:['financial derivative','derivatives trading','derivative instrument'] },
      { word:'Arbitrage', type:'Noun', ipa:'/ˈɑː.bɪ.trɑːʒ/', meaning:'The simultaneous purchase and sale of an asset to profit from price differences', example:'High-frequency traders exploit arbitrage opportunities across different exchanges in milliseconds.', collocations:['arbitrage opportunity','statistical arbitrage','regulatory arbitrage'] },
      { word:'Quantitative easing', type:'Noun', ipa:'/ˈkwɒn.tɪ.tə.tɪv ˈiː.zɪŋ/', meaning:'A monetary policy where a central bank creates money to purchase assets', example:'The Bank of England used quantitative easing to stimulate the economy following the 2008 crash.', collocations:['QE programme','quantitative easing measures','reverse quantitative easing'] },
      { word:'Yield curve', type:'Noun', ipa:'/jiːld kɜːv/', meaning:'A graph showing the relationship between interest rates and maturity of debt instruments', example:'An inverted yield curve is traditionally considered a leading indicator of recession.', collocations:['inverted yield curve','yield curve inversion','flat yield curve'] },
    ]
  },
  { n:35, title:'Development Economics', subtitle:'Vocabulary for Economic Development and Poverty Studies',
    words:[
      { word:'Microfinance', type:'Noun', ipa:'/ˈmaɪ.krəʊˌfaɪ.næns/', meaning:'Financial services, especially small loans, provided to low-income individuals', example:'Grameen Bank pioneered microfinance as a tool for poverty alleviation in Bangladesh.', collocations:['microfinance institution','microfinance loan','microfinance programme'] },
      { word:'Remittances', type:'Noun', ipa:'/rɪˈmɪt.əns.ɪz/', meaning:'Money sent by migrants to their home countries', example:'Remittances now exceed foreign direct investment as a source of income for many developing nations.', collocations:['worker remittances','send remittances','remittance flows'] },
      { word:'Structural adjustment', type:'Noun', ipa:'/ˈstrʌk.tʃər.əl əˈdʒʌst.mənt/', meaning:'IMF/World Bank policy conditions for loans, typically requiring market liberalisation', example:'Structural adjustment programmes in the 1980s and 90s are widely criticised for worsening inequality.', collocations:['structural adjustment programme','SAP conditions','structural reform'] },
      { word:'Gini coefficient', type:'Noun', ipa:'/ˈdʒiː.ni ˌkəʊɪˈfɪʃ.ənt/', meaning:'A statistical measure of income or wealth inequality within a population (0 = equality; 1 = max inequality)', example:'The country\'s Gini coefficient has risen steadily since the introduction of austerity measures.', collocations:['high Gini coefficient','measure with Gini','Gini index'] },
      { word:'Human Development Index', type:'Noun', ipa:'/ˈhjuː.mən dɪˈvel.əp.mənt ˈɪn.deks/', meaning:'UN composite measure of life expectancy, education, and income levels', example:'The Human Development Index was developed to shift focus from GDP to broader measures of wellbeing.', collocations:['HDI ranking','high HDI','Human Development Report'] },
    ]
  },
  { n:36, title:'Media & Communication Theory', subtitle:'Vocabulary for Analysing Media, Communication, and Culture',
    words:[
      { word:'Hegemonic', type:'Adj', ipa:'/ˌheg.ɪˈmɒn.ɪk/', meaning:'Relating to cultural or ideological dominance', example:'Hall\'s encoding/decoding theory challenges the hegemonic reading of media texts.', collocations:['hegemonic discourse','dominant/hegemonic reading','hegemonic ideology'] },
      { word:'Semiotics', type:'Noun', ipa:'/ˌsiː.miˈɒt.ɪks/', meaning:'The study of signs and symbols and their use or interpretation', example:'Barthes applied semiotics to popular culture, revealing the hidden ideological myths it perpetuates.', collocations:['apply semiotics','semiotic analysis','visual semiotics'] },
      { word:'Narrative framing', type:'Noun', ipa:'/ˈnær.ə.tɪv ˈfreɪ.mɪŋ/', meaning:'The way a story is structured and positioned to guide audience interpretation', example:'The narrative framing of immigration as a "crisis" has significant policy implications.', collocations:['media framing','frame the narrative','dominant frame'] },
      { word:'Infodemic', type:'Noun', ipa:'/ˌɪn.fəˈdem.ɪk/', meaning:'A rapid spread of both accurate and inaccurate information during an event (e.g., pandemic)', example:'The WHO coined "infodemic" to describe the flood of misinformation during COVID-19.', collocations:['COVID infodemic','combat the infodemic','infodemic management'] },
      { word:'Convergence', type:'Noun', ipa:'/kənˈvɜː.dʒəns/', meaning:'The merging of different media technologies/industries into a single platform', example:'Media convergence has enabled audiences to access television, radio, and print on one device.', collocations:['media convergence','technological convergence','digital convergence'] },
    ]
  },
  { n:37, title:'Bioethics & Medical Ethics', subtitle:'Vocabulary for Ethical Dilemmas in Medicine and Biology',
    words:[
      { word:'Informed consent', type:'Noun', ipa:'/ɪnˈfɔːmd kənˈsent/', meaning:'A patient\'s voluntary, knowledgeable agreement to medical treatment or research', example:'Informed consent is a fundamental ethical requirement in both clinical practice and research.', collocations:['obtain informed consent','informed consent process','breach of informed consent'] },
      { word:'Beneficence', type:'Noun', ipa:'/bɪˈnef.ɪ.səns/', meaning:'The principle of acting in a patient\'s best interest; doing good', example:'The four principles of bioethics — beneficence, non-maleficence, autonomy, and justice — guide clinical decisions.', collocations:['principle of beneficence','beneficent treatment','act with beneficence'] },
      { word:'Non-maleficence', type:'Noun', ipa:'/nɒn məˈlef.ɪ.səns/', meaning:'The principle of "do no harm"; avoiding actions that cause unnecessary injury', example:'Non-maleficence requires clinicians to weigh the risks of treatment against its potential benefits.', collocations:['principle of non-maleficence','"do no harm"','non-maleficent practice'] },
      { word:'Euthanasia', type:'Noun', ipa:'/ˌjuː.θəˈneɪ.zi.ə/', meaning:'The painless killing of a patient suffering from an incurable illness; "mercy killing"', example:'The debate over voluntary euthanasia continues to divide ethicists, clinicians, and lawmakers.', collocations:['voluntary euthanasia','euthanasia legislation','assisted euthanasia'] },
      { word:'Biopiracy', type:'Noun', ipa:'/ˈbaɪ.əʊˌpaɪ.rə.si/', meaning:'The patenting of genetic resources or traditional knowledge without fair compensation', example:'Critics argue that pharmaceutical companies have engaged in biopiracy of indigenous plant medicines.', collocations:['corporate biopiracy','prevent biopiracy','biopiracy of traditional knowledge'] },
    ]
  },
  { n:38, title:'Artificial Intelligence & Machine Learning', subtitle:'Technical Vocabulary for AI, Data Science, and Ethics',
    words:[
      { word:'Neural network', type:'Noun', ipa:'/ˈnjʊər.əl ˈnet.wɜːk/', meaning:'A computing system modelled on the brain, used in machine learning', example:'Deep neural networks underpin modern speech recognition and image classification systems.', collocations:['deep neural network','train a neural network','convolutional neural network'] },
      { word:'Hallucination', type:'Noun', ipa:'/həˌluː.sɪˈneɪ.ʃən/', meaning:'(AI) Confident generation of false information by an AI model', example:'AI hallucination remains a critical challenge for deploying large language models in high-stakes settings.', collocations:['AI hallucination','factual hallucination','reduce hallucinations'] },
      { word:'Bias (AI)', type:'Noun', ipa:'/ˈbaɪ.əs/', meaning:'Systematic errors in AI outputs arising from biased training data or design choices', example:'Facial recognition systems exhibit significantly higher error rates for darker-skinned individuals, revealing algorithmic bias.', collocations:['algorithmic bias','AI bias','bias in training data'] },
      { word:'Large language model', type:'Noun', ipa:'/lɑːdʒ ˈlæŋ.ɡwɪdʒ ˈmɒd.əl/', meaning:'An AI model trained on vast text data to generate and understand human language', example:'GPT-4 is a large language model developed by OpenAI, capable of complex reasoning and text generation.', collocations:['train an LLM','large language model (LLM)','deploy a large language model'] },
      { word:'Generative AI', type:'Noun', ipa:'/ˈdʒen.ər.ə.tɪv eɪ ˈaɪ/', meaning:'AI systems that can create new content (text, images, audio, code)', example:'Generative AI tools have disrupted creative industries, raising urgent questions about authorship and copyright.', collocations:['generative AI tools','generative AI models','use generative AI'] },
    ]
  },
  { n:39, title:'Public Health & Epidemiology', subtitle:'Vocabulary for Population Health and Disease Prevention',
    words:[
      { word:'Incidence', type:'Noun', ipa:'/ˈɪn.sɪ.dəns/', meaning:'The rate of new cases of a disease in a population over a specific period', example:'The incidence of type 2 diabetes has risen sharply over the past two decades.', collocations:['disease incidence','incidence rate','rising incidence'] },
      { word:'Prevalence', type:'Noun', ipa:'/ˈprev.ə.ləns/', meaning:'The proportion of a population with a condition at a specific point in time', example:'The prevalence of obesity among children has reached alarming levels in many OECD countries.', collocations:['disease prevalence','point prevalence','lifetime prevalence'] },
      { word:'Herd immunity', type:'Noun', ipa:'/hɜːd ɪˈmjuː.nɪ.ti/', meaning:'Indirect protection when a sufficient proportion of a population has become immune', example:'Herd immunity thresholds vary depending on the transmissibility of the pathogen.', collocations:['achieve herd immunity','herd immunity threshold','vaccine-derived herd immunity'] },
      { word:'Zoonotic', type:'Adj', ipa:'/ˌzuː.ə.ˈnɒt.ɪk/', meaning:'Relating to diseases that can be transmitted from animals to humans', example:'COVID-19, Ebola, and influenza are examples of zoonotic diseases.', collocations:['zoonotic disease','zoonotic spillover','zoonotic transmission'] },
      { word:'Syndemic', type:'Noun', ipa:'/sɪnˈdem.ɪk/', meaning:'Two or more epidemics interacting in a population and exacerbating health burdens', example:'The obesity-diabetes-cardiovascular disease syndemic represents one of the greatest public health challenges.', collocations:['syndemic theory','COVID syndemic','address the syndemic'] },
    ]
  },
  { n:40, title:'Philosophy of Science', subtitle:'Vocabulary for Scientific Method and Epistemology',
    words:[
      { word:'Falsifiability', type:'Noun', ipa:'/ˌfɔːl.sɪ.faɪ.əˈbɪl.ɪ.ti/', meaning:'(Popper) The ability of a theory to be proven false by observation or experiment', example:'Popper argued that falsifiability is the hallmark of genuine scientific theories.', collocations:['principle of falsifiability','test falsifiability','lack falsifiability'] },
      { word:'Paradigm shift', type:'Noun', ipa:'/ˈpær.ə.daɪm ʃɪft/', meaning:'(Kuhn) A fundamental change in the basic concepts of a scientific discipline', example:'Kuhn argued that science does not progress linearly but through revolutionary paradigm shifts.', collocations:['scientific paradigm shift','trigger a paradigm shift','Kuhnian paradigm shift'] },
      { word:'Reductionism', type:'Noun', ipa:'/rɪˈdʌk.ʃə.nɪ.z(ə)m/', meaning:'The practice of explaining complex phenomena by reducing them to simpler components', example:'Some critics argue that reductionism in neuroscience fails to account for emergent mental phenomena.', collocations:['scientific reductionism','biological reductionism','oppose reductionism'] },
      { word:'Parsimony', type:'Noun', ipa:'/ˈpɑː.sɪ.mə.ni/', meaning:'(Occam\'s Razor) The principle that the simplest explanation is preferable', example:'The parsimony principle guides scientists to favour simpler hypotheses when evidence is equal.', collocations:['principle of parsimony','parsimony in theory','apply parsimony'] },
      { word:'Induction', type:'Noun', ipa:'/ɪnˈdʌk.ʃən/', meaning:'The process of drawing general conclusions from specific observations', example:'Hume\'s problem of induction questions whether past experience can reliably predict future events.', collocations:['inductive reasoning','problem of induction','inductive inference'] },
    ]
  },
  { n:41, title:'Gender Studies & Feminism', subtitle:'Vocabulary for Gender Theory and Feminist Discourse',
    words:[
      { word:'Patriarchy', type:'Noun', ipa:'/ˈpeɪ.tri.ɑː.ki/', meaning:'A social system in which men hold primary power in political, social, and economic spheres', example:'Feminist theorists argue that patriarchy operates through institutional as well as cultural mechanisms.', collocations:['dismantle patriarchy','systemic patriarchy','patriarchal norms'] },
      { word:'Gender performativity', type:'Noun', ipa:'/ˈdʒen.dər pəˌfɔː.məˈtɪv.ɪ.ti/', meaning:'(Butler) The idea that gender is produced through repeated performances, not innate biology', example:'Butler\'s theory of gender performativity has been enormously influential in queer theory.', collocations:['Butler\'s performativity','perform gender','gender as performance'] },
      { word:'Misogyny', type:'Noun', ipa:'/mɪˈsɒdʒ.ɪ.ni/', meaning:'Dislike, contempt, or prejudice against women', example:'Online misogyny has intensified with the rise of anonymous social media platforms.', collocations:['embedded misogyny','casual misogyny','combat misogyny'] },
      { word:'Reproductive rights', type:'Noun', ipa:'/rɪˈprɒd.ʌk.tɪv raɪts/', meaning:'Rights relating to reproductive health, contraception, and abortion', example:'Access to reproductive rights remains deeply contested in many countries worldwide.', collocations:['protect reproductive rights','reproductive rights legislation','bodily autonomy'] },
      { word:'Glass ceiling', type:'Noun', ipa:'/ɡlɑːs ˈsiː.lɪŋ/', meaning:'An invisible barrier preventing women and minorities from rising to senior positions', example:'Despite equal qualifications, women continue to face a glass ceiling in executive leadership roles.', collocations:['break the glass ceiling','glass ceiling effect','shatter the glass ceiling'] },
    ]
  },
  { n:42, title:'Urban Studies & Smart Cities', subtitle:'Vocabulary for Urban Development and Smart Technology',
    words:[
      { word:'Smart city', type:'Noun', ipa:'/smɑːt ˈsɪt.i/', meaning:'An urban area using digital technology to improve efficiency, sustainability, and quality of life', example:'Singapore is frequently cited as a leading example of smart city development.', collocations:['smart city initiative','smart city technology','develop a smart city'] },
      { word:'Urban sprawl', type:'Noun', ipa:'/ˈɜː.bən sprɔːl/', meaning:'The uncontrolled expansion of urban areas into surrounding rural land', example:'Urban sprawl has increased car dependency and decimated green spaces around major cities.', collocations:['curb urban sprawl','suburban sprawl','urban sprawl problem'] },
      { word:'Mixed-use development', type:'Noun', ipa:'/mɪkst juːs dɪˈvel.əp.mənt/', meaning:'Urban development combining residential, commercial, and public uses in one area', example:'Mixed-use development is increasingly promoted as a strategy to create walkable, liveable urban environments.', collocations:['promote mixed-use','mixed-use zoning','mixed-use neighbourhood'] },
      { word:'Densification', type:'Noun', ipa:'/ˌden.sɪ.fɪˈkeɪ.ʃən/', meaning:'The process of increasing the density of development in an urban area', example:'Housing densification around transport hubs is central to sustainable urban planning.', collocations:['urban densification','densification strategy','residential densification'] },
      { word:'Placemaking', type:'Noun', ipa:'/ˈpleɪs.meɪ.kɪŋ/', meaning:'A community-centred approach to planning and designing public spaces', example:'Placemaking initiatives transformed a derelict industrial site into a thriving cultural quarter.', collocations:['urban placemaking','creative placemaking','placemaking project'] },
    ]
  },
  { n:43, title:'Energy Systems & Renewables', subtitle:'Vocabulary for Energy Policy and Renewable Technology',
    words:[
      { word:'Grid parity', type:'Noun', ipa:'/ɡrɪd ˈpær.ɪ.ti/', meaning:'The point at which renewable energy costs equal those of conventional power sources', example:'Solar energy has now reached grid parity in most of the world\'s major economies.', collocations:['achieve grid parity','approach grid parity','cost parity'] },
      { word:'Intermittency', type:'Noun', ipa:'/ˌɪn.tərˈmɪt.ən.si/', meaning:'The variable nature of renewable energy output depending on weather conditions', example:'The intermittency of wind and solar power creates challenges for grid stability.', collocations:['intermittency problem','manage intermittency','address intermittency'] },
      { word:'Energy storage', type:'Noun', ipa:'/ˈen.ər.dʒi ˈstɔː.rɪdʒ/', meaning:'Technologies for storing electrical energy for later use', example:'Advances in battery energy storage are critical for the viability of 100% renewable grids.', collocations:['energy storage system','battery storage','grid-scale energy storage'] },
      { word:'Electrification', type:'Noun', ipa:'/ɪˌlek.trɪ.fɪˈkeɪ.ʃən/', meaning:'The process of powering something with electricity, especially shifting from fossil fuels', example:'Electrification of transport and heating is central to achieving carbon neutrality.', collocations:['electrification of transport','rapid electrification','sector electrification'] },
      { word:'Photovoltaic', type:'Adj/Noun', ipa:'/ˌfəʊ.tə.vɒlˈteɪ.ɪk/', meaning:'Relating to the production of electric current at the junction of two substances exposed to light', example:'Photovoltaic capacity has expanded exponentially as panel costs have plummeted.', collocations:['photovoltaic cell','PV panel','solar photovoltaic'] },
    ]
  },
  { n:44, title:'Human Rights & International Law', subtitle:'Vocabulary for Human Rights, Humanitarian Law, and Justice',
    words:[
      { word:'Jus cogens', type:'Noun', ipa:'/jʊs ˈkoʊ.dʒenz/', meaning:'Peremptory norms of international law from which no derogation is permitted', example:'The prohibition on genocide constitutes a jus cogens norm that is binding on all states.', collocations:['jus cogens norm','violate jus cogens','peremptory norm'] },
      { word:'Non-refoulement', type:'Noun', ipa:'/nɒn rɪˈfuːl.mənt/', meaning:'The principle prohibiting states from returning persons to territories where they face serious harm', example:'Non-refoulement is considered a cornerstone of international refugee law.', collocations:['principle of non-refoulement','violate non-refoulement','obligation of non-refoulement'] },
      { word:'Impunity', type:'Noun', ipa:'/ɪmˈpjuː.nɪ.ti/', meaning:'Exemption from punishment or freedom from the consequences of one\'s actions', example:'The persistence of impunity for war crimes undermines international justice mechanisms.', collocations:['culture of impunity','end impunity','impunity for crimes'] },
      { word:'R2P (Responsibility to Protect)', type:'Noun', ipa:'/ˌɑː.tu.ˈpiː/', meaning:'The international norm that a state must protect its population from mass atrocities', example:'The Responsibility to Protect doctrine was invoked to justify the intervention in Libya in 2011.', collocations:['invoke R2P','R2P framework','responsibility to protect civilians'] },
      { word:'Transitional justice', type:'Noun', ipa:'/træn.ˈzɪʃ.ən.əl ˈdʒʌs.tɪs/', meaning:'Judicial and non-judicial processes addressing legacies of human rights abuses post-conflict', example:'South Africa\'s Truth and Reconciliation Commission became a global model for transitional justice.', collocations:['transitional justice mechanism','post-conflict justice','truth and reconciliation'] },
    ]
  },
  { n:45, title:'Behavioural Economics', subtitle:'Vocabulary for Psychological Aspects of Economic Decision-Making',
    words:[
      { word:'Nudge theory', type:'Noun', ipa:'/nʌdʒ ˈθɪər.i/', meaning:'(Thaler/Sunstein) Using indirect suggestions to influence behaviour without mandating', example:'Governments have used nudge theory to increase organ donation registration and pension savings.', collocations:['apply nudge theory','nudge intervention','behavioural nudge'] },
      { word:'Loss aversion', type:'Noun', ipa:'/lɒs əˈvɜː.ʒən/', meaning:'The tendency to prefer avoiding losses over acquiring equivalent gains', example:'Loss aversion explains why people hold losing investments far longer than is rational.', collocations:['prospect theory / loss aversion','overcome loss aversion','loss-averse behaviour'] },
      { word:'Anchoring bias', type:'Noun', ipa:'/ˈæŋ.kər.ɪŋ ˈbaɪ.əs/', meaning:'The tendency to rely too heavily on the first piece of information encountered', example:'Anchoring bias affects salary negotiations — the first figure stated significantly influences the final outcome.', collocations:['anchoring effect','cognitive anchoring','combat anchoring bias'] },
      { word:'Bounded rationality', type:'Noun', ipa:'/ˌbaʊn.dɪd ˌræʃ.əˈnæl.ɪ.ti/', meaning:'(Simon) The idea that rational decision-making is limited by available information and cognitive capacity', example:'Bounded rationality explains why people use heuristics rather than optimising every decision.', collocations:['concept of bounded rationality','acknowledge bounded rationality','Herbert Simon bounded rationality'] },
      { word:'Sunk cost fallacy', type:'Noun', ipa:'/sʌŋk kɒst ˈfæl.ə.si/', meaning:'Continuing to invest in something because of prior investment, ignoring future utility', example:'The sunk cost fallacy leads businesses to continue failing projects rather than cut their losses.', collocations:['sunk cost effect','avoid the sunk cost fallacy','escalation of commitment'] },
    ]
  },
  { n:46, title:'Supply Chain & Globalisation', subtitle:'Vocabulary for Global Trade, Logistics, and Production',
    words:[
      { word:'Just-in-time', type:'Adj', ipa:'/ˌdʒʌst.ɪnˈtaɪm/', meaning:'A production strategy where components arrive only when needed, minimising inventory', example:'The pandemic exposed the fragility of just-in-time supply chains when disruptions halted production.', collocations:['just-in-time manufacturing','JIT logistics','just-in-time delivery'] },
      { word:'Nearshoring', type:'Noun', ipa:'/ˈnɪər.ʃɔː.rɪŋ/', meaning:'Moving business operations to nearby countries rather than distant ones', example:'Many European companies are nearshoring production to Eastern Europe to reduce supply chain risk.', collocations:['nearshoring strategy','nearshoring vs offshoring','nearshoring trend'] },
      { word:'Reshoring', type:'Noun', ipa:'/ˈriː.ʃɔː.rɪŋ/', meaning:'The return of production and manufacturing back to the home country', example:'Geopolitical tensions have accelerated the reshoring of semiconductor manufacturing.', collocations:['reshoring initiative','manufacturing reshoring','reshoring policy'] },
      { word:'Trade deficit', type:'Noun', ipa:'/treɪd ˈdef.ɪ.sɪt/', meaning:'A shortfall in value when imports exceed exports', example:'The widening trade deficit prompted calls for protectionist measures from domestic manufacturers.', collocations:['reduce the trade deficit','record trade deficit','trade balance/deficit'] },
      { word:'Protectionism', type:'Noun', ipa:'/prəˈtek.ʃə.nɪ.z(ə)m/', meaning:'The economic policy of restricting imports through tariffs, quotas, and other barriers', example:'The rise of protectionism has fragmented the global trading system built since 1945.', collocations:['economic protectionism','trade protectionism','rise of protectionism'] },
    ]
  },
  { n:47, title:'Data Privacy & Digital Rights', subtitle:'Vocabulary for Data Protection, Privacy Law, and Digital Ethics',
    words:[
      { word:'Data sovereignty', type:'Noun', ipa:'/ˈdeɪ.tə ˈsɒv.rɪn.ti/', meaning:'The concept that data is subject to the laws of the country where it is collected', example:'Data sovereignty has become a significant point of contention in international tech regulation.', collocations:['assert data sovereignty','digital sovereignty','data localisation'] },
      { word:'GDPR', type:'Noun', ipa:'/ˌdʒiː.diːˌpiːˈɑːr/', meaning:'General Data Protection Regulation — EU law governing the use of personal data', example:'The GDPR gives EU citizens the right to access, correct, and delete their personal data.', collocations:['GDPR compliance','violate GDPR','GDPR regulation'] },
      { word:'Surveillance capitalism', type:'Noun', ipa:'/səˈveɪ.ləns ˈkæp.ɪ.tə.lɪ.z(ə)m/', meaning:'(Zuboff) The economic system based on the monetisation of personal data by tech corporations', example:'Surveillance capitalism, described by Shoshana Zuboff, treats human experience as a free raw material.', collocations:['critique surveillance capitalism','surveillance capitalist','surveillance economy'] },
      { word:'Encryption', type:'Noun', ipa:'/ɪnˈkrɪp.ʃən/', meaning:'The process of encoding information so only authorised parties can access it', example:'End-to-end encryption protects users from both external hacking and company data mining.', collocations:['end-to-end encryption','strong encryption','encryption keys'] },
      { word:'Anonymisation', type:'Noun', ipa:'/əˌnɒn.ɪ.maɪˈzeɪ.ʃən/', meaning:'The process of removing identifying information from data so individuals cannot be identified', example:'GDPR allows use of anonymised data for research without consent requirements.', collocations:['data anonymisation','anonymise personal data','de-identification'] },
    ]
  },
  { n:48, title:'Conflict Resolution & Mediation', subtitle:'Vocabulary for Peace Studies and Conflict Management',
    words:[
      { word:'Arbitration', type:'Noun', ipa:'/ˌɑː.bɪˈtreɪ.ʃən/', meaning:'A form of alternative dispute resolution where a neutral third party makes a binding decision', example:'The two companies agreed to resolve the contract dispute through international arbitration.', collocations:['commercial arbitration','binding arbitration','international arbitration'] },
      { word:'De-escalation', type:'Noun', ipa:'/diːˌes.kəˈleɪ.ʃən/', meaning:'The process of reducing the intensity of a conflict', example:'Skilled mediators are trained in de-escalation techniques to prevent violent confrontation.', collocations:['de-escalation strategy','conflict de-escalation','de-escalate tensions'] },
      { word:'Ceasefire', type:'Noun', ipa:'/ˈsiːs.faɪər/', meaning:'A temporary or permanent stop to fighting, agreed by warring parties', example:'The UN brokered a fragile ceasefire, though violations were reported within hours.', collocations:['declare a ceasefire','ceasefire agreement','ceasefire violation'] },
      { word:'Rapprochement', type:'Noun', ipa:'/ræˈprɒʃ.mɒ̃/', meaning:'The re-establishment of cordial relations after a period of hostility', example:'Recent diplomatic meetings have been seen as a first step toward rapprochement between the two nations.', collocations:['diplomatic rapprochement','period of rapprochement','begin a rapprochement'] },
      { word:'Track II diplomacy', type:'Noun', ipa:'/træk tuː dɪˈpləʊ.mə.si/', meaning:'Unofficial dialogue between non-governmental actors to promote peace', example:'Track II diplomacy between academics and civil society groups laid the groundwork for formal negotiations.', collocations:['track II process','track II dialogue','informal diplomacy'] },
    ]
  },
  { n:49, title:'Environmental Justice', subtitle:'Vocabulary for Equity in Environmental Policy and Climate Impacts',
    words:[
      { word:'Climate justice', type:'Noun', ipa:'/ˈklaɪ.mɪt ˈdʒʌs.tɪs/', meaning:'The view that climate change is an ethical/political issue about rights and equity, not just environment', example:'Climate justice advocates argue that the poorest nations suffer most from a crisis they did little to cause.', collocations:['climate justice movement','demand climate justice','climate justice framework'] },
      { word:'Environmental racism', type:'Noun', ipa:'/ɪnˌvaɪ.rənˈmen.təl ˈreɪ.sɪ.z(ə)m/', meaning:'The disproportionate siting of hazardous facilities in communities of colour or low income', example:'Research consistently shows that environmental racism places toxic waste sites near marginalised communities.', collocations:['oppose environmental racism','environmental racism in','environmental justice movement'] },
      { word:'Intergenerational equity', type:'Noun', ipa:'/ˌɪn.tə.dʒen.əˈreɪ.ʃən.əl ˈek.wɪ.ti/', meaning:'The principle that future generations have equal rights to natural resources and a healthy environment', example:'Intergenerational equity is a cornerstone of sustainable development theory.', collocations:['principle of intergenerational equity','intergenerational responsibility','rights of future generations'] },
      { word:'Commons', type:'Noun', ipa:'/ˈkɒm.ənz/', meaning:'Resources shared by a community (air, water, land, knowledge)', example:'Ostrom\'s work demonstrated that communities can manage the commons sustainably without privatisation.', collocations:['global commons','manage the commons','tragedy of the commons'] },
      { word:'Degrowth', type:'Noun', ipa:'/ˈdiːɡrəʊθ/', meaning:'A movement advocating planned economic contraction to reduce environmental impact', example:'Degrowth theorists argue that sustainable living requires fundamentally questioning the imperative of GDP growth.', collocations:['degrowth movement','degrowth economics','post-growth degrowth'] },
    ]
  },
  { n:50, title:'C1/C2 Master Vocabulary Test', subtitle:'Comprehensive Assessment Across All Advanced Vocabulary Domains',
    words:[
      { word:'Perspicacity', type:'Noun', ipa:'/ˌpɜː.spɪˈkæs.ɪ.ti/', meaning:'Having a ready insight into things; shrewdness; mental sharpness', example:'Her perspicacity in identifying the flaw in the methodology impressed the entire review panel.', collocations:['remarkable perspicacity','demonstrate perspicacity','analytical perspicacity'] },
      { word:'Apotheosis', type:'Noun', ipa:'/əˌpɒθ.iˈəʊ.sɪs/', meaning:'The highest point in the development of something; the elevation to divine status', example:'This symphony represents the apotheosis of the Romantic orchestral tradition.', collocations:['apotheosis of','reach its apotheosis','cultural apotheosis'] },
      { word:'Equivocate', type:'Verb', ipa:'/ɪˈkwɪv.ə.keɪt/', meaning:'To use ambiguous language to avoid committing to a position; to be deliberately vague', example:'The minister equivocated throughout the press conference, refusing to give a direct answer.', collocations:['equivocate on policy','stop equivocating','equivocation in response'] },
      { word:'Tendentious', type:'Adj', ipa:'/tenˈden.ʃəs/', meaning:'Expressing a particular point of view; partisan; biased', example:'The report was criticised as tendentious — selectively presenting evidence to support a predetermined conclusion.', collocations:['tendentious argument','tendentious account','highly tendentious'] },
      { word:'Inexorable', type:'Adj', ipa:'/ɪnˈek.sər.ə.bəl/', meaning:'Impossible to stop or prevent; relentless', example:'The inexorable rise of inflation began to reshape political discourse during the third quarter.', collocations:['inexorable rise','inexorable pressure','inexorable logic'] },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════
// QUIZ POOL (20 questions for all new lessons)
// ═══════════════════════════════════════════════════════════════
const QUIZ = [
  { q:'What does "acquit" mean in a legal context?', opts:['To formally declare not guilty','To convict and sentence','To arrest someone'], ans:'To formally declare not guilty', exp:'"Acquit" = a jury or court formally declares that the defendant is not guilty. Opposite: convict.' },
  { q:'"Gentrification" refers to:', opts:['A type of architectural style','The renewal of urban areas attracting wealthier residents, often at the expense of existing communities','A government housing subsidy'], ans:'The renewal of urban areas attracting wealthier residents, often at the expense of existing communities', exp:'"Gentrification" typically involves rising property values, displacement of lower-income residents, and demographic change.' },
  { q:'Neuroplasticity refers to:', opts:['Brain damage caused by trauma','The brain\'s ability to reorganise and form new neural connections throughout life','A type of neurodegenerative disease'], ans:'The brain\'s ability to reorganise and form new neural connections throughout life', exp:'Neuroplasticity (also: neural plasticity) means the brain can change its structure in response to experience, learning, and injury.' },
  { q:'In sociology, "anomie" (Durkheim) describes:', opts:['A type of social harmony','A state of normlessness and instability resulting from the breakdown of social norms','A measure of social mobility'], ans:'A state of normlessness and instability resulting from the breakdown of social norms', exp:'Durkheim\'s "anomie" describes the social disconnection and moral confusion that arises when norms collapse — e.g., during rapid industrialisation.' },
  { q:'What does "pragmatics" study in linguistics?', opts:['The sounds of language (phonetics)','Language in use and context — how meaning is shaped by situation','The structure of sentences (syntax)'], ans:'Language in use and context — how meaning is shaped by situation', exp:'Pragmatics examines how context, speaker intention, and social convention affect meaning. It goes beyond what words literally say.' },
  { q:'"Economies of scale" refer to:', opts:['Problems that arise from growing too large','Cost advantages achieved through increased production volume','The division of labour in a factory'], ans:'Cost advantages achieved through increased production volume', exp:'As production scales up, average costs per unit typically fall. This is a key driver of corporate mergers and international trade.' },
  { q:'A "tipping point" in climate science means:', opts:['The point at which renewable energy becomes cheaper than fossil fuels','A threshold beyond which a system undergoes rapid and potentially irreversible change','A measurement of carbon emissions'], ans:'A threshold beyond which a system undergoes rapid and potentially irreversible change', exp:'Climate tipping points (e.g., Arctic ice collapse, Amazon dieback) are thresholds that, once crossed, trigger self-reinforcing change.' },
  { q:'What is the "gold standard" research design in medicine?', opts:['A qualitative case study','A randomised controlled trial (RCT)','A retrospective cohort study'], ans:'A randomised controlled trial (RCT)', exp:'RCTs randomly allocate participants to treatment/control groups, controlling for confounding. They represent the highest level of empirical evidence.' },
  { q:'"Hybridity" in postcolonial theory (Bhabha) refers to:', opts:['A type of biological engineering','The creation of new cultural forms from the mixing of colonial and indigenous cultures','The purity of a cultural tradition'], ans:'The creation of new cultural forms from the mixing of colonial and indigenous cultures', exp:'Homi Bhabha\'s "hybridity" disrupts the binary division between coloniser and colonised, showing culture as always already mixed.' },
  { q:'What is "transformational leadership"?', opts:['A style focused on strict rules and punishment','Leadership that motivates followers by appealing to their values and inspiring change beyond self-interest','Leadership based purely on financial rewards'], ans:'Leadership that motivates followers by appealing to their values and inspiring change beyond self-interest', exp:'Transformational leaders inspire, motivate, and develop followers. Associated with innovation, high morale, and organisational change.' },
  { q:'"Non-refoulement" in international law means:', opts:['The right of states to expel any foreigner','The prohibition on returning someone to a country where they face serious harm','The right to free movement across borders'], ans:'The prohibition on returning someone to a country where they face serious harm', exp:'"Non-refoulement" is a cornerstone of the 1951 Refugee Convention. States cannot send people back to face persecution or torture.' },
  { q:'"Loss aversion" in behavioural economics means:', opts:['The fear of investing in the stock market','The tendency to prefer avoiding losses more strongly than acquiring equivalent gains','The preference for high-risk investments'], ans:'The tendency to prefer avoiding losses more strongly than acquiring equivalent gains', exp:'Loss aversion (Kahneman and Tversky) shows that losing £100 typically hurts about twice as much as gaining £100 feels good.' },
  { q:'What does "just-in-time" production minimise?', opts:['Labour costs','Inventory by receiving goods only when needed for production','Carbon emissions in manufacturing'], ans:'Inventory by receiving goods only when needed for production', exp:'JIT (developed by Toyota) reduces storage costs and waste by having components arrive precisely when needed — but creates supply chain vulnerability.' },
  { q:'"Surveillance capitalism" (Zuboff) refers to:', opts:['Government CCTV monitoring','An economic system that monetises personal data collected by technology companies','Military surveillance technology'], ans:'An economic system that monetises personal data collected by technology companies', exp:'Shoshana Zuboff coined "surveillance capitalism" to describe how companies like Google and Facebook monetise behavioural data at scale.' },
  { q:'"Arbitration" in conflict resolution is:', opts:['A public trial in a court of law','A form of dispute resolution where a neutral third party makes a binding decision outside court','An informal discussion between two parties'], ans:'A form of dispute resolution where a neutral third party makes a binding decision outside court', exp:'Arbitration is faster and cheaper than litigation. Common in commercial disputes and international trade conflicts.' },
  { q:'"Climate justice" emphasises:', opts:['Purely technological solutions to climate change','The ethical dimension of climate change: who causes it, who suffers, and who must act','The economic benefits of green technology'], ans:'The ethical dimension of climate change: who causes it, who suffers, and who must act', exp:'Climate justice connects environmental issues to human rights and equity — particularly the disparity between high-emitting nations and those most vulnerable.' },
  { q:'What does "falsifiability" (Popper) require of scientific theories?', opts:['That they be confirmed by many observations','That they be capable of being proven false by observation or experiment','That they be agreed upon by all scientists'], ans:'That they be capable of being proven false by observation or experiment', exp:'Popper\'s falsifiability criterion distinguishes science from non-science. A theory that cannot be tested and potentially refuted is not scientific.' },
  { q:'Intersectionality in gender/social studies means:', opts:['A traffic intersection metaphor for social conflict','The interconnected nature of race, class, gender and other social categories, producing overlapping systems of discrimination','The study of gender differences in mathematics'], ans:'The interconnected nature of race, class, gender and other social categories, producing overlapping systems of discrimination', exp:'Coined by Kimberlé Crenshaw, intersectionality shows how multiple identities (e.g., Black woman) create unique forms of compounded disadvantage.' },
  { q:'"Grid parity" for renewable energy means:', opts:['When renewable energy is connected to the national grid','When the cost of renewable energy equals that of conventional power sources','When all energy comes from renewable sources'], ans:'When the cost of renewable energy equals that of conventional power sources', exp:'Grid parity is the tipping point at which renewables become economically competitive without subsidies. Solar has reached grid parity in most markets.' },
  { q:'"Inexorable" most closely means:', opts:['Unpredictable and random','Impossible to stop; relentless; inevitable','Gradual and barely perceptible'], ans:'Impossible to stop; relentless; inevitable', exp:'"Inexorable" (Latin: inexorabilis) = that which cannot be moved by entreaty. Often used with: inexorable rise, inexorable decline, inexorable logic.' },
];

// ═══════════════════════════════════════════════════════════════
// LESSON TEMPLATE
// ═══════════════════════════════════════════════════════════════
function buildLesson(lesson) {
  const { n, title, subtitle, words } = lesson;
  const nextPath = n < 50 ? `/modul/english/advanced/vocabulary/lesson-${n+1}` : null;
  const nextCode = nextPath ? JSON.stringify(nextPath) : 'null';
  const wordsCode = words.map(w =>
    `  { word: ${JSON.stringify(w.word)}, type: ${JSON.stringify(w.type)}, ipa: ${JSON.stringify(w.ipa)}, meaning: ${JSON.stringify(w.meaning)}, example: ${JSON.stringify(w.example)}, collocations: [${w.collocations.map(c => JSON.stringify(c)).join(', ')}] }`
  ).join(',\n');
  const quizCode = QUIZ.map(q =>
    `  { q: ${JSON.stringify(q.q)}, opts: [${q.opts.map(o => JSON.stringify(o)).join(', ')}], ans: ${JSON.stringify(q.ans)}, exp: ${JSON.stringify(q.exp)} }`
  ).join(',\n');

  return `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, BookOpen, Volume2 } from 'lucide-react';

const WORDS = [
${wordsCode}
];

const QUIZ: { q: string; opts: string[]; ans: string; exp: string }[] = [
${quizCode}
];

const ACCENT = '${ACCENT}';
const NEXT_PATH = ${nextCode};
const STORAGE_KEY = '${STORAGE_KEY}';
const LESSON_NUM = ${n};

function getCompleted(): number[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } }
function markComplete() { const d = getCompleted(); if (!d.includes(LESSON_NUM)) localStorage.setItem(STORAGE_KEY, JSON.stringify([...d, LESSON_NUM])); }
const tts = (t: string) => { if (!('speechSynthesis' in window)) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = 0.8; window.speechSynthesis.speak(u); };

export default function AdvancedVocabularyLesson${n}() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'materi' | 'kuis'>('materi');
  const [done, setDone] = useState(() => getCompleted().includes(LESSON_NUM));
  const [modal, setModal] = useState(false);
  const [qi, setQi] = useState(0); const [sel, setSel] = useState<string | null>(null);
  const [score, setScore] = useState(0); const [fin, setFin] = useState(false);
  const cur = QUIZ[qi];
  const pickAns = (o: string) => { if (sel) return; setSel(o); if (o === cur.ans) setScore(s => s + 1); };
  const next = () => { if (qi + 1 < QUIZ.length) { setQi(q => q + 1); setSel(null); } else { setFin(true); markComplete(); setDone(true); setModal(true); } };
  const finish = () => { markComplete(); setDone(true); setModal(true); };

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)' }} onClick={() => setModal(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-5xl mb-3">{fin ? (score >= 16 ? '🏆' : '📚') : '✅'}</div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Lesson Selesai!</h2>
            {fin && <p className="text-2xl font-black mb-2" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>}
            <p className="text-slate-500 text-sm mb-6">Advanced Vocabulary — Lesson ${n}: ${title}</p>
            <div className="space-y-3">
              {NEXT_PATH && <button onClick={() => { setModal(false); navigate(NEXT_PATH); }} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
              <button onClick={() => { setModal(false); navigate('/modul/english/advanced/vocabulary'); }} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col h-[100dvh] md:h-full bg-slate-50">
        <header className="bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-slate-100 shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center hover:bg-slate-100"><ChevronLeft className="w-6 h-6 text-slate-600" /></button>
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>C1/C2 Vocabulary — Lesson ${n}/50</p>
              <h1 className="text-sm font-bold text-slate-800 line-clamp-1">${title}</h1>
            </div>
            {NEXT_PATH ? <button onClick={() => navigate(NEXT_PATH)} className="px-3 h-9 rounded-full text-xs font-bold" style={{ color: ACCENT, background: ACCENT + '18' }}>Next ›</button> : <div className="w-14" />}
          </div>
        </header>
        <div className="flex bg-white border-b border-slate-100 p-2 gap-2 sticky top-[65px] z-10">
          {([['materi', '📖 Kosakata'], ['kuis', '🧠 Kuis 20 Soal']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t as 'materi' | 'kuis')} className={'flex-1 py-3 text-sm font-bold rounded-xl transition-all ' + (tab === t ? 'text-white shadow-md' : 'text-slate-500')} style={tab === t ? { background: ACCENT } : {}}>{label}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 pb-28 space-y-4">
            {tab === 'materi' && (
              <div className="space-y-4">
                <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{ background: \`linear-gradient(135deg, \${ACCENT}, \${ACCENT}AA)\` }}>
                  <BookOpen className="absolute top-4 right-4 w-20 h-20 opacity-10" />
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">📚 Advanced Vocabulary — Lesson ${n} of 50</span>
                  <h2 className="text-xl font-black mt-3 mb-1">${title}</h2>
                  <p className="text-sm text-white/85">${subtitle}</p>
                </div>
                {WORDS.map((w, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-black text-slate-800">{w.word}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: ACCENT }}>{w.type}</span>
                          <span className="text-xs text-slate-400 font-mono">{w.ipa}</span>
                        </div>
                      </div>
                      <button onClick={() => tts(w.word)} className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-700 shrink-0 mt-1"><Volume2 size={16} /></button>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{w.meaning}</p>
                    <button onClick={() => tts(w.example)} className="w-full text-left bg-slate-50 rounded-2xl p-3 border border-slate-100 hover:border-slate-300 transition-colors">
                      <p className="text-xs font-semibold mb-1" style={{ color: ACCENT }}>📝 Contoh Kalimat</p>
                      <p className="text-sm text-slate-700 italic">"{w.example}"</p>
                    </button>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">🔗 Collocations</p>
                      <div className="flex flex-wrap gap-2">
                        {w.collocations.map((c, ci) => (
                          <button key={ci} onClick={() => tts(c)} className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100">{c}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'kuis' && (
              <div>
                {!fin ? (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400">Soal {qi + 1}/{QUIZ.length}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>Skor: {score}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: \`\${(qi / QUIZ.length) * 100}%\`, background: ACCENT }} />
                    </div>
                    <p className="text-base font-bold text-slate-800 leading-relaxed">{cur.q}</p>
                    <div className="space-y-3">
                      {cur.opts.map(o => {
                        let cls = 'bg-slate-50 border-slate-200 text-slate-700';
                        if (sel) { if (o === cur.ans) cls = 'bg-green-50 border-green-500 text-green-800 font-bold'; else if (o === sel) cls = 'bg-red-50 border-red-400 text-red-700'; else cls = 'opacity-50 border-slate-100'; }
                        return <button key={o} onClick={() => pickAns(o)} className={\`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all \${cls}\`}>{o}</button>;
                      })}
                    </div>
                    {sel && (<>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-blue-600 mb-1">💡 Penjelasan</p>
                        <p className="text-sm text-blue-700">{cur.exp}</p>
                      </div>
                      <button onClick={next} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>{qi + 1 < QUIZ.length ? 'Soal Berikutnya →' : 'Selesai ✓'}</button>
                    </>)}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                    <div className="text-5xl">{score >= 16 ? '🏆' : '📚'}</div>
                    <h3 className="text-2xl font-black text-slate-800">Kuis Selesai!</h3>
                    <p className="text-4xl font-black" style={{ color: ACCENT }}>{score}/{QUIZ.length}</p>
                    {NEXT_PATH && <button onClick={() => navigate(NEXT_PATH)} className="w-full py-3 rounded-xl font-bold text-white" style={{ background: ACCENT }}>Pelajaran Berikutnya →</button>}
                    <button onClick={() => navigate('/modul/english/advanced/vocabulary')} className="w-full py-3 rounded-xl font-bold text-slate-600 bg-slate-100">Kembali ke Daftar</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4">
          <button onClick={done ? () => navigate(-1) : finish} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2 shadow-lg" style={{ background: done ? 'linear-gradient(135deg,#10B981,#059669)' : \`linear-gradient(135deg,\${ACCENT},\${ACCENT}CC)\` }}>
            <CheckCircle2 className="w-5 h-5" />
            {done ? 'Selesai ✓ — Kembali' : 'Tandai Selesai'}
          </button>
        </div>
      </div>
    </>
  );
}
`;
}

// Write lessons 21-50
for (const lesson of NEW_LESSONS) {
  const filePath = path.join(VOCAB_DIR, `Lesson${lesson.n}.tsx`);
  fs.writeFileSync(filePath, buildLesson(lesson), 'utf8');
  console.log(`✅ vocabulary/Lesson${lesson.n} — ${lesson.title}`);
}
console.log(`\n📚 Generated ${NEW_LESSONS.length} new vocabulary lessons (21-50)!`);

// ═══════════════════════════════════════════════════════════════
// UPDATE AdvancedVocabularyPage.tsx → 50 lessons
// ═══════════════════════════════════════════════════════════════
const LESSON_TITLES_50 = {
  1:'Academic Excellence',2:'Professional Register',3:'Scientific Discourse',4:'Economic & Financial Terms',5:'Political & Legal Language',
  6:'Idiomatic Expressions (Adv)',7:'Collocations (High Frequency)',8:'Formal vs Informal Register',9:'Affixation & Word Formation',10:'Metaphor & Figurative Language',
  11:'Discourse & Rhetoric Vocabulary',12:'Medical & Health Terminology',13:'Technology & Innovation',14:'Environmental & Climate Terms',15:'Philosophical Concepts',
  16:'Literary & Critical Terms',17:'Psychological Language',18:'International Relations',19:'Arts & Culture',20:'C1 Vocabulary Mastery Test',
  21:'Law & Criminal Justice',22:'Architecture & Urban Design',23:'Cognitive Science & Neuroscience',24:'Sociology & Social Theory',25:'Linguistics & Language Theory',
  26:'Economics of Innovation',27:'Climate Science & Policy',28:'Medical Research & Clinical Trials',29:'Postcolonial & Cultural Studies',30:'Leadership & Organisational Behaviour',
  31:'Geopolitics & Security',32:'Food Science & Nutrition',33:'Space Science & Astronomy',34:'Financial Markets & Investment',35:'Development Economics',
  36:'Media & Communication Theory',37:'Bioethics & Medical Ethics',38:'Artificial Intelligence & Machine Learning',39:'Public Health & Epidemiology',40:'Philosophy of Science',
  41:'Gender Studies & Feminism',42:'Urban Studies & Smart Cities',43:'Energy Systems & Renewables',44:'Human Rights & International Law',45:'Behavioural Economics',
  46:'Supply Chain & Globalisation',47:'Data Privacy & Digital Rights',48:'Conflict Resolution & Mediation',49:'Environmental Justice',50:'C1/C2 Master Vocabulary Test',
};

const titlesCode = Object.entries(LESSON_TITLES_50).map(([k,v]) => `  ${k}: '${v.replace(/'/g,"\\'")}',`).join('\n');

const newPage = `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Play } from 'lucide-react';
import PageContainer from '../../../../../components/layout/PageContainer';
import { PageHeader } from '../../../../../components/shared/NavComponents';

const SKILL = {
  label: 'Vocabulary',
  icon: '/assets/icons/new/16. Language Learning.png',
  color: '#0B5345',
  bgColor: '#D5F5E3',
  totalLessons: 50,
};

const LESSON_TITLES: Record<number, string> = {
${titlesCode}
};

const STORAGE_KEY = '${STORAGE_KEY}';

function getCompleted(): number[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

export default function AdvancedVocabularyPage() {
  const navigate = useNavigate();
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  useEffect(() => { setCompletedIds(getCompleted()); }, []);
  const count = completedIds.length;
  const pct = (count / SKILL.totalLessons) * 100;
  const lessons = Array.from({ length: SKILL.totalLessons }, (_, i) => i + 1);

  return (
    <PageContainer>
      <div className="pb-28 md:pb-8">
        <PageHeader titleKey="skill.vocabulary" subtitleKey="modul.daysSubtitle" />
        <motion.div className="mx-5 md:mx-0 mb-6 rounded-2xl p-5 relative overflow-hidden"
          style={{ backgroundColor: SKILL.bgColor, border: \`1px solid \${SKILL.color}20\` }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0" style={{ backgroundColor: \`\${SKILL.color}15\` }}>
              <img src={SKILL.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-[#1A1A2E]">Vocabulary</h3>
              <p className="text-xs text-[#6B7280]">{count}/{SKILL.totalLessons} Pelajaran</p>
            </div>
            <div className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: SKILL.color }}>📚 Advanced</div>
          </div>
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: SKILL.color }}
              initial={{ width: 0 }} animate={{ width: \`\${pct}%\` }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          </div>
          {count > 0 && <p className="text-[11px] font-semibold mt-1.5" style={{ color: SKILL.color }}>{count === SKILL.totalLessons ? '🎉 Semua pelajaran selesai!' : \`\${count} dari \${SKILL.totalLessons} pelajaran selesai\`}</p>}
        </motion.div>

        <div className="px-5 md:px-0">
          <h2 className="text-lg font-extrabold text-[#1A1A2E] mb-1">Learning Path — 50 Lessons</h2>
          <p className="text-[13px] text-[#6B7280] mb-5">50 pelajaran kosakata C1/C2 Advanced — dari akademik hingga spesialis</p>
          <div className="space-y-3">
            {lessons.map((id, i) => {
              const done = completedIds.includes(id);
              return (
                <motion.button key={id}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 shadow-sm hover:shadow-md cursor-pointer"
                  style={{ borderColor: done ? '#26C76D' : \`\${SKILL.color}30\`, backgroundColor: done ? '#F0FDF6' : 'white' }}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.02 * i }}
                  whileHover={{ scale: 1.005, borderColor: done ? '#26C76D' : SKILL.color }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(\`/modul/english/advanced/vocabulary/lesson-\${id}\`)}>
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white transition-colors" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
                    {done ? <Check size={18} strokeWidth={3} /> : <Play size={16} fill="white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#1A1A2E]">Lesson {id}</p>
                      {done && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-[#26C76D]">✓ Selesai</span>}
                    </div>
                    <p className="text-[12px] text-[#6B7280] truncate mt-0.5">{LESSON_TITLES[id]}</p>
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white shrink-0" style={{ backgroundColor: done ? '#26C76D' : SKILL.color }}>
                    {done ? 'Completed' : 'Start'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
`;

fs.writeFileSync(PAGE_FILE, newPage, 'utf8');
console.log('\n✅ AdvancedVocabularyPage.tsx updated to show 50 lessons!');
console.log('\n📌 NEXT STEP: Register routes for Lesson21-50 in App.tsx');
