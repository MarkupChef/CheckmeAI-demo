function getSecretKeyByDate(date: string): string {
  const input = `${date}`;
  const targetLength = 32;

  if (input.length >= targetLength) {
    return input;
  }

  const paddingLength = targetLength - input.length;
  const padding = Math.pow(10, paddingLength).toString().slice(1);

  return `${input}${padding}`;
}

export default getSecretKeyByDate;
