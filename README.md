# 🔐 Private Notes Vault

A secure, authenticated personal notes web application where each user can create, view, edit, and delete their own private notes.

This project focuses on authentication, data ownership, and a clean, distraction-free UI rather than advanced productivity features.

---

## 🎯 Objective

Build a private notes application where:

- Notes are strictly tied to the authenticated user
- Users can only access their own data
- The UI feels simple, focused, and private

---

## 🚀 Features

### 🔑 Authentication
- Email & Password authentication
- Google OAuth login
- Powered by Supabase Authentication
- Unauthenticated users cannot access notes

### 📝 Notes
- Create a new note
- View a list of your notes
- Edit an existing note
- Delete a note

Each note contains:
- Title
- Content
- Created timestamp

---

## 🔒 Security & Data Ownership

Security is enforced at the database level using **Supabase Row Level Security (RLS)**.

- Every note is linked to the authenticated user's `user_id`
- Users can only read, insert, update, and delete their own notes
- No public notes
- No sharing
- No cross-user access

**RLS Condition**
```sql
auth.uid() = user_id
