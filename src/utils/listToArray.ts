export function listToArray(str: string): string[] {
  const items = str.replace(/\n/g, '').split('^^').slice(0, -1);

  // remove number and dot from the start of each element
  return items.map((item) =>
    item
      .replace(/\n/g, '') // remove \n
      .replace(/^\s*\d+(\.\s*|\))/, '') // remove or "n. " or "n)"
      .trim()
  );
}
