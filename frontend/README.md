# 🧠 Super Admin Dashboard – Access Control & Permissions

A professional admin interface for managing users, roles, and page-level access controls.  
Built with **React** (frontend) and **Django REST Framework** (backend).  
Designed for clarity, efficiency, and scalability.

---

## 🚀 Key Features

- 🔐 **JWT Authentication** with access/refresh tokens
- 👤 **Role-based user management** (Super Admin vs Regular Users)
- 📄 **Per-page access control**: View, Edit, Create, Delete
- 💬 **Comment system** with permission-based modification
- 🕵️ **Modification history tooltip** for transparency
- 📊 **Dynamic user-role matrix** in the admin dashboard

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + React Bootstrap
- **Authentication:** JWT (via `simplejwt`)
- **Backend:** Django + Django REST Framework
- **Database:** SQLite (dev), pluggable for PostgreSQL/MySQL
- **API Client:** Axios
- **Icons & Styling:** Bootstrap + Custom CSS

---

## 💻 Installation & Setup

### 🔧 Frontend (React)

1. **Navigate to frontend folder**  
   `cd frontend`

2. **Install dependencies**  
   `npm install`

3. **Run development server**  
   `npm start`

4. **Open in browser**  
   Visit `http://localhost:3000`

---

### 🐍 Backend (Django)

1. **Navigate to backend folder**  
   `cd backend`

2. **Create virtual environment**  
   `python -m venv venv`

3. **Activate environment**

   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. **Install dependencies**  
   `pip install -r requirements.txt`

5. **Apply migrations**  
   `python manage.py makemigrations`  
   `python manage.py migrate`

6. **Run development server**  
   `python manage.py runserver`

---

## ⚙️ Current Backend Status

✅ User model  
✅ JWT login endpoint  
✅ Superadmin account support  
⏳ Permissions API (in progress)  
⏳ Comment history tracking (planned)  
⏳ Password reset with OTP (planned)

---

## 🔐 Demo Credentials (for testing)

| Role         | Email             | Password |
| ------------ | ----------------- | -------- |
| Super Admin  | admin@example.com | admin123 |
| Regular User | user@example.com  | user123  |

> These are mocked in the frontend if backend isn't fully connected yet.

---

## ✨ Planned Enhancements

- [ ] Complete all backend APIs (permissions, history)
- [ ] OTP-based password reset
- [ ] Backend testing & validation
- [ ] Pagination and filtering on user table
- [ ] Role-based routing protection on frontend

---

## 🤝 Contribution

Feel free to fork and submit PRs.

1. Fork the repository
2. Create your feature branch
3. Push and open a Pull Request

Report bugs or suggest features via [GitHub Issues](#)

---

# 🎯 Project Submission

**Candidate:** Elvin Vincent  
**Position:** Full Stack Developer  
**Status:** Backend WIP / Frontend Functional  
📅 Submission Date: 17-06-2025
