export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  videoId: string;
  description: string;
  quiz: QuizQuestion[];
  xpRequired: number;
}

export interface Module {
  id: string;
  title: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "basics-of-money",
    title: "Basics of Money",
    emoji: "💰",
    color: "primary",
    lessons: [
      {
        id: "what-is-money",
        title: "What is Money?",
        emoji: "🪙",
        videoId: "dQw4w9WgXcQ",
        description: "Learn the fundamentals of what money is, how it works, and why we use it in our daily lives.",
        xpRequired: 0,
        quiz: [
          { question: "What is the primary function of money?", options: ["Decoration", "Medium of exchange", "A toy", "Food"], correctIndex: 1 },
          { question: "Which of these is a form of money?", options: ["Rocks", "Banknotes", "Leaves", "Sand"], correctIndex: 1 },
          { question: "Money helps us to...", options: ["Fly", "Trade goods and services", "Become invisible", "Talk to animals"], correctIndex: 1 },
        ],
      },
      {
        id: "why-saving-matters",
        title: "Why Saving Matters",
        emoji: "🏦",
        videoId: "dQw4w9WgXcQ",
        description: "Discover why putting money aside for the future is one of the smartest things you can do.",
        xpRequired: 25,
        quiz: [
          { question: "Why should you save money?", options: ["For emergencies", "To throw it away", "To eat it", "To burn it"], correctIndex: 0 },
          { question: "Where is a safe place to save money?", options: ["Under a tree", "In a bank", "In the river", "In a pillow"], correctIndex: 1 },
          { question: "What is interest on savings?", options: ["A penalty", "Extra money the bank pays you", "A type of tax", "A game"], correctIndex: 1 },
        ],
      },
      {
        id: "needs-vs-wants",
        title: "Needs vs Wants",
        emoji: "🤔",
        videoId: "dQw4w9WgXcQ",
        description: "Learn to tell the difference between things you need and things you want.",
        xpRequired: 50,
        quiz: [
          { question: "Which is a NEED?", options: ["A new video game", "Food", "A fancy watch", "A sports car"], correctIndex: 1 },
          { question: "Which is a WANT?", options: ["Water", "Shelter", "A designer bag", "Medicine"], correctIndex: 2 },
          { question: "Why is knowing needs vs wants important?", options: ["It's not important", "Helps with budgeting", "Makes you rich instantly", "It's a game"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "understanding-money",
    title: "Understanding Money",
    emoji: "📚",
    color: "secondary",
    lessons: [
      {
        id: "earning-money",
        title: "Earning Money",
        emoji: "💼",
        videoId: "dQw4w9WgXcQ",
        description: "Explore different ways people earn money and how you can start earning too.",
        xpRequired: 75,
        quiz: [
          { question: "How do most adults earn money?", options: ["Finding it on the street", "By working", "By wishing", "By sleeping"], correctIndex: 1 },
          { question: "What is a salary?", options: ["A type of food", "Regular payment for work", "A game", "A hobby"], correctIndex: 1 },
          { question: "Which is an example of earning money?", options: ["Watching TV", "Selling handmade crafts", "Playing games", "Daydreaming"], correctIndex: 1 },
        ],
      },
      {
        id: "budgeting-basics",
        title: "Budgeting Basics",
        emoji: "📊",
        videoId: "dQw4w9WgXcQ",
        description: "Learn how to plan your spending so you always have enough for what matters.",
        xpRequired: 100,
        quiz: [
          { question: "What is a budget?", options: ["A type of food", "A plan for spending money", "A game", "A movie"], correctIndex: 1 },
          { question: "Why is budgeting important?", options: ["It's boring", "Helps track spending", "It wastes time", "It's not important"], correctIndex: 1 },
          { question: "What should you budget first?", options: ["Entertainment", "Needs like food and rent", "Luxury items", "Gifts"], correctIndex: 1 },
        ],
      },
      {
        id: "smart-spending",
        title: "Smart Spending",
        emoji: "🛒",
        videoId: "dQw4w9WgXcQ",
        description: "Tips and tricks to spend your money wisely and get the most value.",
        xpRequired: 125,
        quiz: [
          { question: "What is smart spending?", options: ["Buying everything", "Making thoughtful purchases", "Spending all at once", "Never spending"], correctIndex: 1 },
          { question: "How can you save when shopping?", options: ["Buy the most expensive", "Compare prices", "Never go shopping", "Buy in bulk only"], correctIndex: 1 },
          { question: "What is a good habit before buying?", options: ["Buy immediately", "Ask: Do I really need this?", "Close your eyes", "Ask a stranger"], correctIndex: 1 },
        ],
      },
    ],
  },
  {
    id: "growing-wealth",
    title: "Growing Wealth",
    emoji: "🌱",
    color: "accent",
    lessons: [
      {
        id: "intro-to-investing",
        title: "Intro to Investing",
        emoji: "📈",
        videoId: "dQw4w9WgXcQ",
        description: "A gentle introduction to how investing works and why it matters.",
        xpRequired: 150,
        quiz: [
          { question: "What is investing?", options: ["Hiding money", "Putting money to work to grow", "Spending all money", "Giving money away"], correctIndex: 1 },
          { question: "What is a stock?", options: ["Soup ingredient", "Ownership in a company", "A type of loan", "A bank account"], correctIndex: 1 },
          { question: "Why do people invest?", options: ["To lose money", "To grow wealth over time", "For fun only", "Because they must"], correctIndex: 1 },
        ],
      },
      {
        id: "power-of-compound-interest",
        title: "Compound Interest",
        emoji: "🔄",
        videoId: "dQw4w9WgXcQ",
        description: "Discover the magic of compound interest and how it can multiply your savings.",
        xpRequired: 175,
        quiz: [
          { question: "What is compound interest?", options: ["Interest on interest", "Simple math", "A type of bank", "A tax"], correctIndex: 0 },
          { question: "Compound interest grows money...", options: ["Linearly", "Exponentially", "Not at all", "Randomly"], correctIndex: 1 },
          { question: "Starting to save early is...", options: ["Not important", "Very beneficial due to compounding", "Impossible", "Only for adults"], correctIndex: 1 },
        ],
      },
    ],
  },
];

export const VIDEO_XP = 10;
export const QUIZ_XP = 15;
