export const getShuffledOptions = (index: number, answers: string[]): string[] => {
  const newOpts: string[] = [];
  newOpts[index] = answers.shift() || '';

  for (let i = 0, z = 0; i <= answers.length; i++) {
    if (!newOpts[i]) {
      newOpts[i] = answers[z];
      z++;
    }
  }

  return newOpts;
};
