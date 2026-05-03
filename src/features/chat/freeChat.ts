import { BookOpen, GraduationCap, MessageSquare, Sparkles } from 'lucide-react';

export const quickActions = [
  { id: 'practice', icon: MessageSquare, label: 'Practice Conversation', color: '#2ECC71', bgColor: '#E8F8F0' },
  { id: 'grammar', icon: BookOpen, label: 'Grammar Help', color: '#3498DB', bgColor: '#EBF5FB' },
  { id: 'vocab', icon: GraduationCap, label: 'Vocabulary Quiz', color: '#F39C12', bgColor: '#FEF9E7' },
  { id: 'daily', icon: Sparkles, label: 'Daily Challenge', color: '#9B59B6', bgColor: '#F4ECF7' },
];

export const aiResponses = [
  "That's a great attempt! Let me help you improve that sentence. Try using 'Furthermore' instead of 'Also' for more formal business writing.",
  "Excellent! Your pronunciation is getting better. Let's try another phrase: 'Could you elaborate on that point?'",
  "Here's a useful business phrase: 'I'd like to draw your attention to...' — Try using it in a sentence!",
  "Good question! The difference between 'affect' and 'effect' is: 'affect' is usually a verb, 'effect' is usually a noun.",
  "Let's practice! Complete this sentence: 'The quarterly revenue has ___ by 15% compared to last year.'",
];

export const quickActionResponses: Record<string, string> = {
  'Practice Conversation': "Let's start a conversation practice! Imagine you're at a coffee shop. The barista asks: 'What can I get for you today?' How would you respond?",
  'Grammar Help': "I'd love to help with grammar! What topic would you like to focus on? We can cover:\n\n1. Tenses\n2. Articles (a/an/the)\n3. Prepositions\n4. Conditionals\n\nJust pick a number! 📝",
  'Vocabulary Quiz': "Let's do a vocabulary quiz! 🎯\n\nWhat does the word 'ubiquitous' mean?\n\nA) Very rare\nB) Found everywhere\nC) Extremely loud\nD) Moving quickly",
  'Daily Challenge': "Here's your daily challenge! 🌟\n\nWrite a short paragraph (3-4 sentences) about your morning routine using at least 3 time expressions (e.g., 'first', 'then', 'afterwards').",
};
