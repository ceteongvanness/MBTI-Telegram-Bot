# MBTI Telegram Bot 🧠

A TypeScript-based Telegram bot that helps users discover their Myers-Briggs Type Indicator (MBTI) personality type through an interactive quiz.

## Features ✨

- **Interactive MBTI Test**: 8-question personality assessment
- **16 Personality Types**: Complete database with descriptions and key traits
- **Session Management**: Tracks user progress through the test
- **User-friendly Commands**: Simple command interface
- **Detailed Results**: Comprehensive personality type analysis
- **Real-time Responses**: Instant feedback and results

## Available Commands 📋

| Command | Description |
|---------|-------------|
| `/start` | Welcome message and bot introduction |
| `/test` | Begin the MBTI personality test |
| `/types` | View all 16 personality types |
| `/help` | Show available commands |

## Installation 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Telegram Bot Token (from @BotFather)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ceteongvanness/mbti-telegram-bot.git
   cd mbti-telegram-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages**
   ```bash
   npm install node-telegram-bot-api
   npm install @types/node-telegram-bot-api --save-dev
   npm install typescript ts-node --save-dev
   ```

4. **Create a Telegram Bot**
   - Open Telegram and search for @BotFather
   - Start a chat and use the `/newbot` command
   - Follow the instructions to create your bot
   - Copy the bot token provided

5. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

   Or set the environment variable directly:
   ```bash
   export TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

6. **Run the bot**
   ```bash
   npx ts-node index.ts
   ```

## Project Structure 📁

```
mbti-telegram-bot/
├── index.ts              # Main bot file
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables (not in repo)
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Usage 💡

1. Start a chat with your bot on Telegram
2. Use `/start` to begin
3. Use `/test` to take the MBTI personality test
4. Answer each question with 'A' or 'B'
5. Receive your personality type with detailed description
6. Use `/types` to explore all 16 personality types

## MBTI Types Included 🌈

The bot includes all 16 MBTI personality types:

### Analysts (NT)
- **INTJ** - The Architect
- **INTP** - The Thinker  
- **ENTJ** - The Commander
- **ENTP** - The Debater

### Diplomats (NF)
- **INFJ** - The Advocate
- **INFP** - The Mediator
- **ENFJ** - The Protagonist
- **ENFP** - The Campaigner

### Sentinels (SJ)
- **ISTJ** - The Logistician
- **ISFJ** - The Protector
- **ESTJ** - The Executive
- **ESFJ** - The Consul

### Explorers (SP)
- **ISTP** - The Virtuoso
- **ISFP** - The Adventurer
- **ESTP** - The Entrepreneur
- **ESFP** - The Entertainer

## Configuration ⚙️

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Package.json Scripts
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node index.ts",
    "build": "tsc",
    "watch": "tsc --watch"
  }
}
```

## Development 🛠️

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Adding New Features

1. **Add new questions**: Modify the `MBTI_QUESTIONS` array
2. **Add new types**: Update the `MBTI_TYPES` object
3. **Add new commands**: Use `bot.onText()` for new command patterns

## Error Handling 🚨

The bot includes basic error handling for:
- Invalid user inputs during tests
- Session management
- Command processing

## Security Considerations 🔒

- Never commit your bot token to version control
- Use environment variables for sensitive data
- Consider rate limiting for production use
- Validate user inputs

## Deployment 🌐

### Heroku Deployment
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git or GitHub integration

### VPS Deployment
1. Upload files to your server
2. Install Node.js and dependencies
3. Set environment variables
4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name mbti-bot
   ```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

If you encounter any issues or have questions:
- Create an issue on GitHub
- Check the Telegram Bot API documentation
- Review the MBTI assessment methodology

## Acknowledgments 🙏

- Myers-Briggs Type Indicator for the personality framework
- Telegram Bot API for the platform
- TypeScript community for excellent tooling

---

**Note**: This bot is for educational and entertainment purposes. For professional personality assessment, consult with qualified practitioners.
