import createRulesString from '@utils/helpers/createRulesString';

const answerOptionsPrompt = {
  getRole: (topicName: string) =>
    `You are an helpful ${topicName} assistant that generates answers to technical questions.`,
  prefix: 'The answer options must be: ',
  rules: {
    short: `short`,
    withoutExplanation: 'without explanation',
    sameLength: 'about the same length',
  },
  output:
    'Provide the answers in the following JSON format: { "options": ["answer1", "answer2", "answer3", "answer4"] }.',
  clarification: 'Do not include any labels or explanations in the answers.',
  sort: 'The first answer must be correct, and the other three must be incorrect but plausible.',

  get(topicName: string, question: string): { role: string; message: string } {
    const input = `Generate a JSON object with a list of 4 possible answers to the question "${question}" for the "${topicName}" topic.`;
    const rules = createRulesString(this.prefix, this.rules);
    const output = this.output;
    const clarification = this.clarification;

    const prompt = `${input} ${this.sort} ${rules} ${output} ${clarification}`;

    return {
      role: this.getRole(topicName),
      message: prompt,
    };
  },
};

export default answerOptionsPrompt;
