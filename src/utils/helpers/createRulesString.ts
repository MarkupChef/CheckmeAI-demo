function createRulesString(prefix: string, rules: { [key: string]: string }): string {
  let rulesString = prefix;

  const keys = Object.keys(rules) as Array<keyof typeof rules>;
  for (const key of keys) {
    rulesString += `${rules[key]}, `;
  }

  rulesString = rulesString.trim().replace(/,$/, '.');

  return rulesString;
}

export default createRulesString;
