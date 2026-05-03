const slugTopic = (label: string) =>
  label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const topicChallengeLabels = [
  'Greetings, Introductions & Personal Info',
  'Family Dynamics & Relationships',
  'Daily Habits & Routines',
  'House, Furniture & Chores',
  'Food, Cooking & Dining',
  'Clothing, Fashion & Accessories',
  'Jobs, Careers & Office Objects',
  'Places in the City & Directions',
  'Transportation & Commuting',
  'Shopping, Prices & Payment',
  'Weather, Seasons & Climate',
  'Health, Body & Medical Symptoms',
  'Physical Appearance',
  'Personality & Character Traits',
  'Travel, Holidays & Past Events',
  'Feelings, Moods & Emotions',
  'Technology, Internet & Social Media',
  'School, Education & Learning',
  'Describing Places',
  'Money, Banking & Finance',
  'Giving Opinions & Preferences',
  'Time Expressions & Frequency',
  'Useful Connectors & Linking Words',
  'Essential Phrasal Verbs (Daily Life)',
  'Essential Phrasal Verbs (Work)',
  'Advanced Feelings & Emotions',
  'Professional Business Basics',
  'Common Idioms for Daily Situations',
  'Transition Words for Speaking',
  'Future Goals, Dreams & Ambitions',
  'Environmental Issues & Recycling',
  'Crime, Law & Justice',
  'Politics & Government',
  'Arts, Music & Literature',
  'Science & Space Exploration',
  'Media, News & Journalism',
  'Sports, Fitness & Nutrition',
  'Holidays, Festivals & Celebrations',
  'Religion, Faith & Beliefs',
  'Psychology & Mental Health',
  'Advertising & Marketing Terms',
  'Customer Service & Complaints',
  'Job Interviews & Resumes',
  'Meetings & Negotiations',
  'Presentations & Public Speaking',
  'Describing Trends & Graphs',
  'Computer Hardware & Software',
  'Agriculture & Farming',
  'Animals & Wildlife Conservation',
  'Natural Disasters & Emergencies',
  'History & Historical Events',
  'Geography & Landscapes',
  'Architecture & Buildings',
  'Household Repairs & Tools',
  'Gardening & Plants',
  'Weddings & Marriage',
  'Parenting & Childcare',
  'Hobbies & Leisure Activities',
  'Sleep & Dreams',
  "Phrasal Verbs with 'Get', 'Take', 'Make'",
  'Advanced Idioms: Success & Failure',
  'Advanced Idioms: Time & Money',
  'Advanced Idioms: Communication',
  'Proverbs & Sayings',
  'Slang & Colloquialisms',
  'Formal vs Informal Language',
  'Academic Vocabulary: Analysis',
  'Academic Vocabulary: Research',
  'Debate & Argumentation Terms',
  'Expressing Doubt & Certainty',
  'Describing Cause & Effect',
  'Comparing & Contrasting',
  'Hypothesizing & Speculating',
  'Persuasion & Influence',
  'Ethics & Morality',
  'Globalization & Culture',
  'Artificial Intelligence & Robotics',
  'Social Issues (Poverty, Equality)',
  'Business Strategy & Management',
  'Leadership & Teamwork',
  'Conflict Resolution',
  'Creative Writing Terms',
  'Cinema & Film Production',
  'Fashion Industry & Trends',
  'Hospitality & Tourism Industry',
  'Real Estate & Housing Market',
  'Legal Terminology',
  'Medical & Healthcare Terms',
  'Synonyms & Antonyms Challenge',
  'Review & Mastery Check',
];

export const topicSelectOptions = [
  ...topicChallengeLabels.map((label, index) => ({
    value: slugTopic(label),
    label: `Day ${index + 1} - ${label}`,
  })),
  { value: 'custom-topic', label: 'Custom Topic - Tulis topik sendiri' },
];

export const topicVocabulary: Record<string, string[]> = {
  'daily life': ['routine', 'breakfast', 'commute', 'appointment', 'errand', 'neighbor', 'laundry', 'groceries', 'schedule', 'habit', 'chores', 'alarm', 'shower', 'meal', 'snack', 'traffic', 'wallet', 'keys', 'umbrella', 'weather', 'weekend', 'weekday', 'exercise', 'relax', 'clean', 'cook', 'prepare', 'finish', 'usually', 'sometimes'],
  school: ['assignment', 'classmate', 'deadline', 'notebook', 'presentation', 'subject', 'grade', 'library', 'exam', 'attendance', 'teacher', 'student', 'lesson', 'homework', 'quiz', 'project', 'whiteboard', 'textbook', 'dictionary', 'question', 'answer', 'practice', 'review', 'study', 'learn', 'pass', 'fail', 'semester', 'campus', 'schedule'],
  business: ['meeting', 'deadline', 'client', 'revenue', 'proposal', 'invoice', 'strategy', 'contract', 'feedback', 'negotiation', 'budget', 'profit', 'loss', 'manager', 'employee', 'colleague', 'agenda', 'report', 'presentation', 'target', 'growth', 'market', 'brand', 'customer', 'supplier', 'agreement', 'priority', 'solution', 'performance', 'decision'],
  travel: ['departure', 'arrival', 'luggage', 'passport', 'booking', 'itinerary', 'customs', 'destination', 'boarding pass', 'accommodation', 'ticket', 'flight', 'gate', 'terminal', 'delay', 'cancel', 'hotel', 'reservation', 'tourist', 'map', 'guide', 'souvenir', 'currency', 'exchange', 'taxi', 'train', 'platform', 'journey', 'suitcase', 'visa'],
  technology: ['device', 'software', 'update', 'password', 'privacy', 'network', 'platform', 'download', 'cloud', 'feature', 'application', 'browser', 'website', 'database', 'screen', 'keyboard', 'charger', 'battery', 'storage', 'account', 'login', 'logout', 'notification', 'setting', 'security', 'backup', 'upload', 'connection', 'bug', 'solution'],
  slang: ['awesome', 'hang out', 'no worries', 'kind of', 'catch up', 'chill', 'my bad', 'for sure', 'sounds good', 'what\'s up', 'got it', 'no big deal', 'I guess', 'pretty good', 'totally', 'seriously', 'right away', 'by the way', 'come on', 'just kidding', 'take it easy', 'see you', 'long time no see', 'that makes sense', 'I am down', 'same here', 'not really', 'all set', 'good call', 'fair enough'],
};

export const cefrLevelVocabulary: Record<string, string[]> = {
  a1: ['name', 'friend', 'home', 'food', 'water', 'school', 'book', 'happy', 'go', 'learn', 'day', 'night', 'morning', 'house', 'room', 'family', 'teacher', 'student', 'city', 'shop', 'bag', 'phone', 'table', 'chair', 'big', 'small', 'new', 'old', 'like', 'want'],
  a2: ['usually', 'prepare', 'invite', 'borrow', 'choose', 'simple', 'travel', 'practice', 'favorite', 'message', 'plan', 'visit', 'arrive', 'leave', 'order', 'pay', 'helpful', 'busy', 'early', 'late', 'nearby', 'during', 'because', 'before', 'after', 'bring', 'carry', 'check', 'change', 'enough'],
  b1: ['improve', 'explain', 'request', 'compare', 'support', 'confident', 'decision', 'experience', 'opportunity', 'solution', 'suggest', 'avoid', 'manage', 'describe', 'recommend', 'organize', 'advantage', 'disadvantage', 'comfortable', 'necessary', 'available', 'probably', 'especially', 'instead', 'although', 'however', 'require', 'include', 'depend', 'consider'],
  b2: ['approach', 'highlight', 'maintain', 'reliable', 'challenge', 'priority', 'effective', 'adapt', 'outcome', 'perspective', 'assess', 'clarify', 'contribute', 'negotiate', 'resolve', 'strategy', 'efficient', 'significant', 'flexible', 'consistent', 'context', 'impact', 'benefit', 'drawback', 'alternative', 'regarding', 'whereas', 'therefore', 'overall', 'specifically'],
  c1: ['subtle', 'substantial', 'evaluate', 'implication', 'constraint', 'coherent', 'distinction', 'assumption', 'justify', 'precise', 'facilitate', 'anticipate', 'emphasize', 'undermine', 'enhance', 'comprehensive', 'ambitious', 'credible', 'inherent', 'inevitable', 'framework', 'insight', 'criterion', 'tendency', 'controversy', 'nevertheless', 'consequently', 'arguably', 'notably', 'primarily'],
  c2: ['nuanced', 'meticulous', 'convey', 'scrutinize', 'detrimental', 'arbitrary', 'sophisticated', 'ambiguous', 'compelling', 'resilient', 'articulate', 'substantiate', 'reconcile', 'exacerbate', 'dispel', 'profound', 'impeccable', 'elusive', 'plausible', 'redundant', 'paradigm', 'rationale', 'discrepancy', 'interpretation', 'phenomenon', 'notwithstanding', 'ostensibly', 'invariably', 'intrinsically', 'conversely'],
};

export const topicVocabularyByLevel: Record<string, Record<string, string[]>> = {
  travel: {
    a1: ['trip', 'hotel', 'bus', 'train', 'taxi', 'ticket', 'map', 'bag', 'passport', 'airport', 'station', 'beach', 'city', 'room', 'food', 'water', 'shop', 'go', 'come', 'visit', 'leave', 'arrive', 'near', 'far', 'open', 'closed', 'cheap', 'expensive', 'today', 'tomorrow'],
    a2: ['flight', 'luggage', 'suitcase', 'booking', 'reservation', 'tourist', 'guide', 'souvenir', 'delay', 'gate', 'terminal', 'journey', 'platform', 'destination', 'visa', 'currency', 'exchange', 'cancel', 'check-in', 'single ticket', 'return ticket', 'travel agency', 'city center', 'train station', 'bus stop', 'hotel room', 'travel plan', 'safe trip', 'local food', 'travel app'],
    b1: ['departure', 'arrival', 'boarding pass', 'accommodation', 'customs', 'itinerary', 'transportation', 'connection', 'insurance', 'backpack', 'landmark', 'route', 'schedule', 'tour', 'reservation desk', 'travel document', 'lost luggage', 'public transport', 'direct flight', 'round trip', 'book online', 'check out', 'get around', 'look for', 'pick up', 'drop off', 'take off', 'set off', 'run late', 'miss a flight'],
    b2: ['layover', 'overbooked', 'cancellation', 'travel restriction', 'entry requirement', 'travel advisory', 'peak season', 'off-season', 'connecting flight', 'baggage allowance', 'departure lounge', 'immigration officer', 'rental car', 'guided tour', 'travel budget', 'hidden fee', 'cultural difference', 'local custom', 'remote destination', 'sustainable tourism', 'arrange accommodation', 'confirm a booking', 'claim compensation', 'navigate a city', 'extend a stay', 'upgrade a seat', 'travel independently', 'avoid delays', 'compare fares', 'plan ahead'],
    c1: ['reimbursement', 'cancellation policy', 'visa waiver', 'travel authorization', 'itinerary adjustment', 'border control', 'travel disruption', 'comprehensive insurance', 'tourism infrastructure', 'cultural immersion', 'carbon footprint', 'seasonal fluctuation', 'accessibility requirement', 'destination management', 'consumer protection', 'long-haul flight', 'short-haul flight', 'travel entitlement', 'policy exception', 'risk assessment', 'mitigate disruption', 'facilitate entry', 'coordinate logistics', 'revise an itinerary', 'justify expenses', 'anticipate delays', 'enhance accessibility', 'minimize costs', 'evaluate options', 'negotiate compensation'],
    c2: ['repatriation', 'extraterritorial regulation', 'consular assistance', 'jurisdictional requirement', 'logistical bottleneck', 'contingency planning', 'tourism commodification', 'heritage preservation', 'regulatory ambiguity', 'cross-border mobility', 'discretionary waiver', 'visa reciprocity', 'itinerary feasibility', 'environmental stewardship', 'over-tourism', 'cultural homogenization', 'frictionless travel', 'seamless transit', 'redress mechanism', 'precarious itinerary', 'scrutinize documentation', 'substantiate a claim', 'reconcile regulations', 'exacerbate delays', 'navigate bureaucracy', 'articulate concerns', 'dispel uncertainty', 'convey urgency', 'secure reimbursement', 'streamline procedures'],
  },
};

export const fallbackVocabulary = [
  'greeting', 'introduction', 'family', 'relationship', 'activity', 'routine', 'conversation', 'question', 'answer', 'opinion',
  'reason', 'example', 'detail', 'choice', 'plan', 'goal', 'problem', 'solution', 'feeling', 'experience',
  'place', 'object', 'person', 'event', 'change', 'habit', 'interest', 'skill', 'practice', 'progress',
];

export const fallbackPartsOfSpeech = ['noun', 'verb', 'adjective', 'noun', 'verb'];
