const normalizeQuestion = (question: string): string =>
  question
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const getUniqueQuestions = (questions: string[], excludeQuestions: string[] = []): string[] => {
  const usedQuestions = new Set(excludeQuestions.map(normalizeQuestion));
  const uniqueQuestions: string[] = [];

  for (const question of questions) {
    const normalizedQuestion = normalizeQuestion(question);

    if (normalizedQuestion && !usedQuestions.has(normalizedQuestion)) {
      usedQuestions.add(normalizedQuestion);
      uniqueQuestions.push(question);
    }
  }

  return uniqueQuestions;
};
