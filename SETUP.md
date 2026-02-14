# Academy Quest Central - Setup Guide

## 🚀 Production-Ready SaaS Platform Setup

This guide will help you set up and deploy Academy Quest Central, a full-stack financial literacy learning platform with Supabase backend, authentication, and AI chatbot integration.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Database Setup](#database-setup)
5. [Local Development](#local-development)
6. [OpenRouter API Setup](#openrouter-api-setup)
7. [Deployment](#deployment)
8. [Admin Account Setup](#admin-account-setup)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Supabase Account** (free tier works)
- **OpenRouter API Key** (for chatbot, optional)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd academy-quest-central
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://qnkukekvocmncvbbjwnh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## Supabase Configuration

### 1. Access Your Supabase Project

Your Supabase project is already configured:
- **Project URL**: `https://qnkukekvocmncvbbjwnh.supabase.co`
- **Project Dashboard**: https://supabase.com/dashboard/project/qnkukekvocmncvbbjwnh

### 2. Navigate to SQL Editor

Go to: **Dashboard → SQL Editor → New Query**

---

## Database Setup

### Step 1: Run Schema Creation

1. Open `supabase/schema.sql` in your editor
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **Run** to execute

This creates:
- ✅ All database tables
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Triggers for auto-updates
- ✅ Functions for user management

### Step 2: Seed Demo Data

1. Open `supabase/seed.sql`
2. Copy the entire contents
3. Paste into Supabase SQL Editor
4. Click **Run** to execute

This populates:
- ✅ 3 Learning modules
- ✅ 8 Lessons with descriptions
- ✅ 24 Quiz questions
- ✅ Proper relationships and ordering

### Step 3: Verify Database Setup

Run this query to verify:

```sql
-- Check tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check module count
SELECT COUNT(*) FROM modules;

-- Check lesson count
SELECT COUNT(*) FROM lessons;

-- Check quiz question count
SELECT COUNT(*) FROM quiz_questions;
```

Expected results:
- **8 tables**: profiles, modules, lessons, quiz_questions, user_progress, user_stats, leaderboard, chatbot_logs
- **3 modules**
- **8 lessons**
- **24 quiz questions**

---

## Local Development

### Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### Test the Application

1. **Visit**: http://localhost:5173
2. **Click**: "Sign Up" or "Get Started"
3. **Create Account**: Use a real email or test email
4. **Check Email**: For verification link (check spam folder)
5. **Verify**: Click the link in your email
6. **Sign In**: Return to app and sign in

---

## Authentication Setup

### Email Verification (Default)

Supabase Auth is configured for email verification:

1. User signs up with email/password
2. Supabase sends verification email
3. User clicks link to verify
4. User can now sign in

### Magic Link (OTP) Alternative

Users can also sign in using magic links:

1. Click "Magic Link" tab on login page
2. Enter email address
3. Check email for login link
4. Click link to sign in automatically

### Configure Email Templates (Optional)

1. Go to: **Dashboard → Authentication → Email Templates**
2. Customize:
   - Confirmation email
   - Magic link email
   - Password reset email

---

## Admin Account Setup

### Create Admin User

After your first user is created:

1. Go to Supabase Dashboard
2. Navigate to: **Table Editor → profiles**
3. Find your user row
4. Edit the `role` column from `student` to `admin`
5. Save changes

### Access Admin Panel (Coming Soon)

Admin features will be accessible at:
- `/app/admin` (protected route)

---

## OpenRouter API Setup

### Get API Key

1. Visit: https://openrouter.ai/
2. Sign up or log in
3. Go to: **API Keys**
4. Create new API key
5. Copy the key

### Configure in .env

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-...
```

### Test Chatbot

1. Sign in to the app
2. Look for floating chat button (bottom right)
3. Click to open chatbot
4. Send a test message

---

## Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Visit: https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Add environment variables from `.env`
   - Click **Deploy**

3. **Configure Environment Variables**:
   - Go to: **Project Settings → Environment Variables**
   - Add all variables from `.env`:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_OPENROUTER_API_KEY`

### Option 2: Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Add Environment Variables** in Netlify dashboard

### Post-Deployment

1. **Test Authentication**: Create a new account
2. **Verify Database**: Check Supabase dashboard for new user
3. **Test Features**: Complete a lesson, check progress
4. **Monitor**: Check Supabase logs for any errors

---

## Database Schema Overview

### Core Tables

```
profiles (extends auth.users)
├── id (UUID, PK)
├── email (TEXT)
├── full_name (TEXT)
├── role (student|admin)
└── timestamps

modules
├── id (UUID, PK)
├── title (TEXT)
├── emoji (TEXT)
├── color (TEXT)
├── order_index (INT)
└── timestamps

lessons
├── id (UUID, PK)
├── module_id (UUID, FK → modules)
├── title (TEXT)
├── video_id (TEXT)
├── description (TEXT)
├── xp_required (INT)
├── order_index (INT)
└── timestamps

quiz_questions
├── id (UUID, PK)
├── lesson_id (UUID, FK → lessons)
├── question (TEXT)
├── options (JSONB)
├── correct_index (INT)
└── order_index (INT)

user_progress
├── id (UUID, PK)
├── user_id (UUID, FK → profiles)
├── lesson_id (UUID, FK → lessons)
├── video_watched (BOOLEAN)
├── quiz_completed (BOOLEAN)
├── quiz_score (INT)
├── rating (INT)
├── feedback (TEXT)
├── xp_earned (INT)
└── timestamps

user_stats
├── id (UUID, PK)
├── user_id (UUID, FK → profiles)
├── total_xp (INT)
├── level (INT)
├── streak (INT)
├── last_activity_date (DATE)
└── timestamps
```

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: 
- Ensure `.env` file exists in project root
- Verify variables are prefixed with `VITE_`
- Restart dev server after changes

### Issue: User can't sign up

**Solution**:
- Check Supabase Dashboard → Authentication → Email Auth is enabled
- Verify email confirmations are not disabled
- Check spam folder for verification email

### Issue: Database tables not found

**Solution**:
- Re-run `schema.sql` in SQL Editor
- Check for error messages in Supabase
- Verify you're in the correct project

### Issue: No progress being saved

**Solution**:
- Check browser console for errors
- Verify RLS policies are enabled
- Ensure user is authenticated
- Check Supabase logs

### Issue: Chatbot not working

**Solution**:
- Verify OpenRouter API key is set
- Check API credits/quota
- Look for errors in browser console
- Verify API endpoint is correct

---

## Features Checklist

### ✅ Implemented
- [x] Supabase database with proper schema
- [x] Row Level Security (RLS) policies
- [x] Email/Password authentication
- [x] Magic link (OTP) authentication
- [x] User profiles with roles
- [x] Progress tracking system
- [x] XP and leveling system
- [x] Streak tracking
- [x] Leaderboard
- [x] Protected routes
- [x] Dashboard with statistics
- [x] Learning modules and lessons
- [x] Chatbot UI component

### 🚧 In Progress
- [ ] Admin panel
- [ ] Lesson content management
- [ ] Chatbot API integration
- [ ] Quiz management interface

### 📝 Planned
- [ ] Rewards redemption
- [ ] Social features
- [ ] Analytics dashboard
- [ ] Mobile app

---

## Support

For issues or questions:
1. Check this documentation
2. Review Supabase logs
3. Check browser console
4. Contact support

---

## License

All rights reserved © 2024 Academy Quest Central
