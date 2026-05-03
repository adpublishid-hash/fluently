export const getSessionScoreCategory = (score: number) => {
  if (score >= 90) return 'Excellent 🌟';
  if (score >= 70) return 'Good 👍';
  return 'Keep Practicing 💪';
};
