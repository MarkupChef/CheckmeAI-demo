// TODO: remove it if it is not used
// const answerFormatAI = `Each item in the list must end with "^^" (double caret).`;

interface levelPrompts {
  [key: string]: string;
}

export const questionsPrompt = {
  rules: {
    mostFrequently: 'questions must be from a list of the most frequently asked interview questions',
    practicalValue: 'questions should be theoretical but must be of practical value',
    notExperience: "questions should not refer to the candidate's personal experience",
    notImageAnalysis: 'questions must not be related to image analysis',
    onlyOneCorrectAnswer: 'only one correct answer could be given to the questions',
    brieflyAnswer: 'the question could be answered briefly',
    notRepeat: 'each question must be unique and not repeated',
  },

  generateRules(): string {
    let rules = 'Questions must be generated in such a way that: ';

    const keys = Object.keys(this.rules) as Array<keyof typeof this.rules>;
    for (const key of keys) {
      rules += `${this.rules[key]}, `;
    }

    rules = rules.trim().replace(/,$/, '.');

    return rules;
  },

  get(numbers: number, level: string, topicName: string): { role: string; message: string } {
    const role = `You are an "${topicName}" expert with years of experience conducting technical interviews for the ${level} "${topicName}" position.`;
    const getQuestionsList = `Generate a list of the best technical questions in "${topicName}" for a ${level} level candidate.`;

    const levelPrompts: levelPrompts = {
      ['junior']:
        'Please generate questions specifically tailored for a junior-level candidate. The difficulty should be appropriate for someone with basic knowledge and limited experience, avoiding overly advanced questions that would be suitable for mid-level or senior candidates.',
      ['middle']: `Please generate questions specifically tailored for a mid-level candidate. The difficulty should match someone with intermediate experience, avoiding basic questions that a junior candidate might easily answer, while not being so advanced that only a senior-level professional could handle them.`,
      ['senior']:
        "Please generate questions specifically tailored for a senior-level candidate. The difficulty should be appropriate for someone with advanced experience, avoiding questions that a mid-level or junior candidate might be able to answer. The questions should challenge a senior candidate's deep technical expertise.",
    };

    const numbersOfQuestions = `The number of questions in the list must be exactly ${numbers}.`;
    const levelOfQuestions = `The questions should be suitable for a ${level} ${topicName} level candidate. ${levelPrompts[level]}`;
    const takeIntoAccount =
      'You need to take into account that for each question there will be 4 possible answers, so each question should be formulated in such a way that the answer can be short, without a detailed explanation';

    return {
      role,
      message: `${getQuestionsList} ${levelOfQuestions} ${numbersOfQuestions} ${this.generateRules()} ${takeIntoAccount}`,
    };
  },
};

export const recommendationPrompt = {
  rules: {
    onlyHTML: 'only as HTML markup without explanations',
    noStyle: 'without classes and styles',
    noScripts: 'without scripts',
    noLinks: 'without links',
    noHeadBodyMain: 'without head, body and main tags',
    divWrap: 'wrapped in a div tag',
    noHTMLwrapper: 'without the "```html" wrapper"',
  },

  generateRules(): string {
    let rules = 'Your answer must be: ';

    const keys = Object.keys(this.rules) as Array<keyof typeof this.rules>;
    for (const key of keys) {
      rules += `${this.rules[key]}, `;
    }

    rules = rules.trim().replace(/,$/, '.');

    return rules;
  },

  get(topic: string, questions: string): { role: string; message: string } {
    const role = `You are ${topic} specialist and mentor with many years of experience.`;
    const getRecommendation = `I took the test for the Junior Javascript position. I couldn't answer the following questions correctly: ${questions}. Analyze the questions and group them by topic. Make recommendations based on them. Advise me which topics I need to study or review and why it is important so that I can easily answer all the questions on the list. Your answer should include 3 blocks: 1 - your short conclusion on my missing knowledge (without a title), 2 - your recommendations (title - my recommendations), 2 a grouped list of questions by topic (title - questions grouped by topic). Also add a little motivation for learning new material to your answer.`;

    return {
      role,
      message: `${getRecommendation} ${this.generateRules()}`,
    };
  },
};
