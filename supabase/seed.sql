-- =============================================
-- Academy Quest Central - Seed Data
-- Realistic Demo Data for Development
-- =============================================

-- Clear existing data (be careful in production!)
-- TRUNCATE modules, lessons, quiz_questions CASCADE;

-- =============================================
-- MODULES
-- =============================================

INSERT INTO modules (id, title, emoji, color, order_index) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Basics of Money', '💰', 'primary', 1),
  ('22222222-2222-2222-2222-222222222222', 'Understanding Money', '📚', 'secondary', 2),
  ('33333333-3333-3333-3333-333333333333', 'Growing Wealth', '🌱', 'accent', 3);

-- =============================================
-- LESSONS - Module 1: Basics of Money
-- =============================================

INSERT INTO lessons (id, module_id, title, emoji, video_id, description, xp_required, order_index) VALUES
  ('l1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 
   'What is Money?', '🪙', 'dQw4w9WgXcQ', 
   'Learn the fundamentals of what money is, how it works, and why we use it in our daily lives.', 
   0, 1),
  ('l1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 
   'Why Saving Matters', '🏦', 'dQw4w9WgXcQ', 
   'Discover why putting money aside for the future is one of the smartest things you can do.', 
   25, 2),
  ('l1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 
   'Needs vs Wants', '🤔', 'dQw4w9WgXcQ', 
   'Learn to tell the difference between things you need and things you want.', 
   50, 3);

-- =============================================
-- LESSONS - Module 2: Understanding Money
-- =============================================

INSERT INTO lessons (id, module_id, title, emoji, video_id, description, xp_required, order_index) VALUES
  ('l2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 
   'Earning Money', '💼', 'dQw4w9WgXcQ', 
   'Explore different ways people earn money and how you can start earning too.', 
   75, 1),
  ('l2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 
   'Budgeting Basics', '📊', 'dQw4w9WgXcQ', 
   'Learn how to plan your spending so you always have enough for what matters.', 
   100, 2),
  ('l2222222-2222-2222-2222-222222222223', '22222222-2222-2222-2222-222222222222', 
   'Smart Spending', '🛒', 'dQw4w9WgXcQ', 
   'Tips and tricks to spend your money wisely and get the most value.', 
   125, 3);

-- =============================================
-- LESSONS - Module 3: Growing Wealth
-- =============================================

INSERT INTO lessons (id, module_id, title, emoji, video_id, description, xp_required, order_index) VALUES
  ('l3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 
   'Intro to Investing', '📈', 'dQw4w9WgXcQ', 
   'A gentle introduction to how investing works and why it matters.', 
   150, 1),
  ('l3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 
   'Compound Interest', '🔄', 'dQw4w9WgXcQ', 
   'Discover the magic of compound interest and how it can multiply your savings.', 
   175, 2);

-- =============================================
-- QUIZ QUESTIONS - Lesson 1: What is Money?
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l1111111-1111-1111-1111-111111111111', 
   'What is the primary function of money?',
   '["Decoration", "Medium of exchange", "A toy", "Food"]'::jsonb,
   1, 1),
  ('l1111111-1111-1111-1111-111111111111', 
   'Which of these is a form of money?',
   '["Rocks", "Banknotes", "Leaves", "Sand"]'::jsonb,
   1, 2),
  ('l1111111-1111-1111-1111-111111111111', 
   'Money helps us to...',
   '["Fly", "Trade goods and services", "Become invisible", "Talk to animals"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 2: Why Saving Matters
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l1111111-1111-1111-1111-111111111112', 
   'Why should you save money?',
   '["For emergencies", "To throw it away", "To eat it", "To burn it"]'::jsonb,
   0, 1),
  ('l1111111-1111-1111-1111-111111111112', 
   'Where is a safe place to save money?',
   '["Under a tree", "In a bank", "In the river", "In a pillow"]'::jsonb,
   1, 2),
  ('l1111111-1111-1111-1111-111111111112', 
   'What is interest on savings?',
   '["A penalty", "Extra money the bank pays you", "A type of tax", "A game"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 3: Needs vs Wants
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l1111111-1111-1111-1111-111111111113', 
   'Which is a NEED?',
   '["A new video game", "Food", "A fancy watch", "A sports car"]'::jsonb,
   1, 1),
  ('l1111111-1111-1111-1111-111111111113', 
   'Which is a WANT?',
   '["Water", "Shelter", "A designer bag", "Medicine"]'::jsonb,
   2, 2),
  ('l1111111-1111-1111-1111-111111111113', 
   'Why is knowing needs vs wants important?',
   '["It''s not important", "Helps with budgeting", "Makes you rich instantly", "It''s a game"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 4: Earning Money
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l2222222-2222-2222-2222-222222222221', 
   'How do most adults earn money?',
   '["Finding it on the street", "By working", "By wishing", "By sleeping"]'::jsonb,
   1, 1),
  ('l2222222-2222-2222-2222-222222222221', 
   'What is a salary?',
   '["A type of food", "Regular payment for work", "A game", "A hobby"]'::jsonb,
   1, 2),
  ('l2222222-2222-2222-2222-222222222221', 
   'Which is an example of earning money?',
   '["Watching TV", "Selling handmade crafts", "Playing games", "Daydreaming"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 5: Budgeting Basics
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l2222222-2222-2222-2222-222222222222', 
   'What is a budget?',
   '["A type of food", "A plan for spending money", "A game", "A movie"]'::jsonb,
   1, 1),
  ('l2222222-2222-2222-2222-222222222222', 
   'Why is budgeting important?',
   '["It''s boring", "Helps track spending", "It wastes time", "It''s not important"]'::jsonb,
   1, 2),
  ('l2222222-2222-2222-2222-222222222222', 
   'What should you budget first?',
   '["Entertainment", "Needs like food and rent", "Luxury items", "Gifts"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 6: Smart Spending
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l2222222-2222-2222-2222-222222222223', 
   'What is smart spending?',
   '["Buying everything", "Making thoughtful purchases", "Spending all at once", "Never spending"]'::jsonb,
   1, 1),
  ('l2222222-2222-2222-2222-222222222223', 
   'How can you save when shopping?',
   '["Buy the most expensive", "Compare prices", "Never go shopping", "Buy in bulk only"]'::jsonb,
   1, 2),
  ('l2222222-2222-2222-2222-222222222223', 
   'What is a good habit before buying?',
   '["Buy immediately", "Ask: Do I really need this?", "Close your eyes", "Ask a stranger"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 7: Intro to Investing
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l3333333-3333-3333-3333-333333333331', 
   'What is investing?',
   '["Hiding money", "Putting money to work to grow", "Spending all money", "Giving money away"]'::jsonb,
   1, 1),
  ('l3333333-3333-3333-3333-333333333331', 
   'What is a stock?',
   '["Soup ingredient", "Ownership in a company", "A type of loan", "A bank account"]'::jsonb,
   1, 2),
  ('l3333333-3333-3333-3333-333333333331', 
   'Why do people invest?',
   '["To lose money", "To grow wealth over time", "For fun only", "Because they must"]'::jsonb,
   1, 3);

-- =============================================
-- QUIZ QUESTIONS - Lesson 8: Compound Interest
-- =============================================

INSERT INTO quiz_questions (lesson_id, question, options, correct_index, order_index) VALUES
  ('l3333333-3333-3333-3333-333333333332', 
   'What is compound interest?',
   '["Interest on interest", "Simple math", "A type of bank", "A tax"]'::jsonb,
   0, 1),
  ('l3333333-3333-3333-3333-333333333332', 
   'Compound interest grows money...',
   '["Linearly", "Exponentially", "Not at all", "Randomly"]'::jsonb,
   1, 2),
  ('l3333333-3333-3333-3333-333333333332', 
   'Starting to save early is...',
   '["Not important", "Very beneficial due to compounding", "Impossible", "Only for adults"]'::jsonb,
   1, 3);

-- =============================================
-- DEMO USERS (Optional - for testing only)
-- Note: You should create these through the Supabase Auth UI
-- or signup flow, not directly in SQL
-- =============================================

-- After creating users through Auth, you can manually set admin role:
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@example.com';
