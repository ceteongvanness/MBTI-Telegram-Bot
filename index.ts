import TelegramBot from 'node-telegram-bot-api';

// MBTI Types and their descriptions
const MBTI_TYPES = {
  'INTJ': {
    name: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    traits: ['Strategic', 'Independent', 'Decisive', 'Hardworking', 'Determined']
  },
  'INTP': {
    name: 'The Thinker',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
    traits: ['Logical', 'Abstract', 'Independent', 'Adaptable', 'Inventive']
  },
  'ENTJ': {
    name: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders.',
    traits: ['Strategic', 'Charismatic', 'Confident', 'Ambitious', 'Stubborn']
  },
  'ENTP': {
    name: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    traits: ['Quick', 'Ingenious', 'Stimulating', 'Alert', 'Outspoken']
  },
  'INFJ': {
    name: 'The Advocate',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    traits: ['Creative', 'Insightful', 'Inspiring', 'Convincing', 'Decisive']
  },
  'INFP': {
    name: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help.',
    traits: ['Idealistic', 'Loyal', 'Adaptable', 'Curious', 'Caring']
  },
  'ENFJ': {
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize listeners.',
    traits: ['Charismatic', 'Altruistic', 'Natural Leaders', 'Reliable', 'Tolerant']
  },
  'ENFP': {
    name: 'The Campaigner',
    description: 'Enthusiastic, creative and sociable free spirits.',
    traits: ['Enthusiastic', 'Creative', 'Sociable', 'Energetic', 'Independent']
  },
  'ISTJ': {
    name: 'The Logistician',
    description: 'Practical and fact-minded, reliability cannot be doubted.',
    traits: ['Honest', 'Direct', 'Strong-willed', 'Dutiful', 'Responsible']
  },
  'ISFJ': {
    name: 'The Protector',
    description: 'Very dedicated and warm protectors, always ready to defend loved ones.',
    traits: ['Supportive', 'Reliable', 'Patient', 'Imaginative', 'Observant']
  },
  'ESTJ': {
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people.',
    traits: ['Dedicated', 'Strong-willed', 'Direct', 'Loyal', 'Patient']
  },
  'ESFJ': {
    name: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
    traits: ['Strong practical skills', 'Loyal', 'Sensitive', 'Warm-hearted', 'Good at connecting']
  },
  'ISTP': {
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
    traits: ['Tolerant', 'Flexible', 'Charming', 'Unpredictable', 'Private']
  },
  'ISFP': {
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities.',
    traits: ['Charming', 'Sensitive', 'Imaginative', 'Passionate', 'Curious']
  },
  'ESTP': {
    name: 'The Entrepreneur',
    description: 'Smart, energetic and perceptive people, truly enjoy living on the edge.',
    traits: ['Bold', 'Rational', 'Practical', 'Original', 'Perceptive']
  },
  'ESFP': {
    name: 'The Entertainer',
    description: 'Spontaneous, energetic and enthusiastic people - life is never boring.',
    traits: ['Bold', 'Original', 'Practical', 'Observant', 'Excellent people skills']
  }
};

// MBTI Test Questions
const MBTI_QUESTIONS = [
  {
    question: "At a party, you're more likely to:",
    options: [
      "A) Interact with many people, including strangers",
      "B) Interact with a few people you know well"
    ],
    dimension: 'EI' // Extraversion vs Introversion
  },
  {
    question: "When learning something new, you prefer:",
    options: [
      "A) Focus on facts and details",
      "B) Focus on possibilities and meanings"
    ],
    dimension: 'SN' // Sensing vs Intuition
  },
  {
    question: "When making decisions, you tend to:",
    options: [
      "A) Use logical analysis",
      "B) Consider people's feelings"
    ],
    dimension: 'TF' // Thinking vs Feeling
  },
  {
    question: "In your daily life, you prefer:",
    options: [
      "A) Having things planned and organized",
      "B) Keeping options open and flexible"
    ],
    dimension: 'JP' // Judging vs Perceiving
  },
  {
    question: "You are more comfortable with:",
    options: [
      "A) Concrete, practical matters",
      "B) Abstract, theoretical concepts"
    ],
    dimension: 'SN'
  },
  {
    question: "When working in a group, you:",
    options: [
      "A) Enjoy being the center of attention",
      "B) Prefer to work behind the scenes"
    ],
    dimension: 'EI'
  },
  {
    question: "You make decisions based on:",
    options: [
      "A) What makes logical sense",
      "B) What feels right to you"
    ],
    dimension: 'TF'
  },
  {
    question: "You prefer to:",
    options: [
      "A) Stick to schedules and deadlines",
      "B) Go with the flow and adapt as needed"
    ],
    dimension: 'JP'
  }
];

interface UserSession {
  currentQuestion: number;
  answers: string[];
  isTestActive: boolean;
}

class MBTIBot {
  private bot: TelegramBot;
  private userSessions: Map<number, UserSession> = new Map();

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
    this.setupCommands();
  }

  private setupCommands(): void {
    // Start command
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const welcomeMessage = `
🧠 Welcome to the MBTI Personality Test Bot! 🧠

I can help you:
• Take the MBTI personality test
• Learn about different personality types
• Get detailed information about your type

Commands:
/test - Start the MBTI personality test
/types - See all 16 personality types
/help - Show this help message

Let's discover your personality type! 🌟
      `;
      this.bot.sendMessage(chatId, welcomeMessage);
    });

    // Help command
    this.bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      const helpMessage = `
📋 Available Commands:

/start - Welcome message and introduction
/test - Begin the MBTI personality test
/types - View all 16 personality types
/help - Show this help message

During the test, simply reply with 'A' or 'B' to answer questions.
      `;
      this.bot.sendMessage(chatId, helpMessage);
    });

    // Test command
    this.bot.onText(/\/test/, (msg) => {
      this.startTest(msg.chat.id);
    });

    // Types command
    this.bot.onText(/\/types/, (msg) => {
      this.showAllTypes(msg.chat.id);
    });

    // Handle test answers
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text?.toLowerCase();

      if (text && ['a', 'b'].includes(text) && this.userSessions.has(chatId)) {
        this.handleTestAnswer(chatId, text);
      }
    });
  }

  private startTest(chatId: number): void {
    const session: UserSession = {
      currentQuestion: 0,
      answers: [],
      isTestActive: true
    };
    
    this.userSessions.set(chatId, session);
    
    const startMessage = `
🎯 MBTI Personality Test Started!

You'll be asked 8 questions. For each question, reply with:
• 'A' for the first option
• 'B' for the second option

Let's begin! 🚀
    `;
    
    this.bot.sendMessage(chatId, startMessage).then(() => {
      this.askQuestion(chatId);
    });
  }

  private askQuestion(chatId: number): void {
    const session = this.userSessions.get(chatId);
    if (!session || !session.isTestActive) return;

    const question = MBTI_QUESTIONS[session.currentQuestion];
    const questionMessage = `
❓ Question ${session.currentQuestion + 1}/8:

${question.question}

${question.options[0]}
${question.options[1]}

Reply with 'A' or 'B'
    `;

    this.bot.sendMessage(chatId, questionMessage);
  }

  private handleTestAnswer(chatId: number, answer: string): void {
    const session = this.userSessions.get(chatId);
    if (!session || !session.isTestActive) return;

    session.answers.push(answer);
    session.currentQuestion++;

    if (session.currentQuestion < MBTI_QUESTIONS.length) {
      this.askQuestion(chatId);
    } else {
      this.calculateAndShowResult(chatId);
    }
  }

  private calculateAndShowResult(chatId: number): void {
    const session = this.userSessions.get(chatId);
    if (!session) return;

    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    // Calculate scores based on answers
    session.answers.forEach((answer, index) => {
      const question = MBTI_QUESTIONS[index];
      const dimension = question.dimension;
      
      if (answer === 'a') {
        if (dimension === 'EI') scores.E++;
        else if (dimension === 'SN') scores.S++;
        else if (dimension === 'TF') scores.T++;
        else if (dimension === 'JP') scores.J++;
      } else {
        if (dimension === 'EI') scores.I++;
        else if (dimension === 'SN') scores.N++;
        else if (dimension === 'TF') scores.F++;
        else if (dimension === 'JP') scores.P++;
      }
    });

    // Determine personality type
    const type = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');

    const typeInfo = MBTI_TYPES[type as keyof typeof MBTI_TYPES];
    
    const resultMessage = `
🎉 Your MBTI Personality Type: ${type}

${typeInfo.name}
"${typeInfo.description}"

✨ Key Traits:
${typeInfo.traits.map(trait => `• ${trait}`).join('\n')}

Want to learn more about other types? Use /types
Want to take the test again? Use /test
    `;

    this.bot.sendMessage(chatId, resultMessage);
    
    // Clean up session
    session.isTestActive = false;
    this.userSessions.delete(chatId);
  }

  private showAllTypes(chatId: number): void {
    let message = "🌈 All 16 MBTI Personality Types:\n\n";
    
    Object.entries(MBTI_TYPES).forEach(([type, info]) => {
      message += `${type} - ${info.name}\n`;
    });
    
    message += "\n💡 Want detailed info about a specific type? Just ask!";
    
    this.bot.sendMessage(chatId, message);
  }
}

// Initialize the bot
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const mbtiBot = new MBTIBot(BOT_TOKEN);

console.log('MBTI Telegram Bot is running...');

export default MBTIBot;