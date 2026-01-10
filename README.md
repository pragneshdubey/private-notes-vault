🔐 Private Notes Vault

A secure, authenticated personal notes web application where each user can create, view, edit, and delete their own private notes.

This project focuses on authentication, data ownership, and a clean, distraction-free UI, rather than advanced productivity features.

🎯 Objective

Build a private notes application where:

Notes are strictly tied to the authenticated user

Users can only access their own data

The UI feels simple, focused, and private

🚀 Features
🔑 Authentication

Email & Password authentication

Google OAuth login

Powered by Supabase Authentication

Unauthenticated users cannot access notes

📝 Notes

Create a new note

View a list of your notes

Edit an existing note

Delete a note

Each note contains:

Title

Content

Created timestamp

🔒 Security & Data Ownership

Security is enforced at the database level using Supabase Row Level Security (RLS).

Every note is linked to the authenticated user's user_id

Users can only read, insert, update, and delete their own notes

No public notes, no sharing, no cross-user access

Row Level Security (RLS)
auth.uid() = user_id

🧠 Tech Stack
Frontend

React (Vite)

React Router

Tailwind CSS

Backend

Supabase (PostgreSQL + Authentication)

Supabase Row Level Security (RLS)

🗄 Database Schema
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz default now()
);

🖥 UI Philosophy

The UI is intentionally:

Minimal

Private

Distraction-free

This app is designed as a personal scratchpad, not a productivity tool.

⚙️ Local Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/private-notes-vault.git
cd private-notes-vault

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


⚠️ Never commit your .env file.

A .env.example file is included for reference.

4️⃣ Start the development server
npm run dev

🌍 Live Demo

Add your deployed link here (Netlify / Vercel)

📁 Project Structure
src/
 ├── components/
 │   └── AuthGuard.jsx
 ├── lib/
 │   └── supabase.js
 ├── pages/
 │   ├── Login.jsx
 │   ├── Signup.jsx
 │   ├── Dashboard.jsx
 │   ├── NewNote.jsx
 │   └── EditNote.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css

📌 Scope & Constraints

This project intentionally avoids:

Public or shared notes

Tags or folders

Complex editors

Advanced productivity features

The focus is on security, clarity, and correctness.

🏁 Status

✅ Core requirements completed
✅ Secure & production-ready
✅ Meets full-stack internship assignment criteria

👨‍💻 Author

Pragnesh Dubey
Full-Stack Internship Assignment
