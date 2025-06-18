# 🛡️ Super Admin Dashboard – Access Control & Permissions

A professional admin interface for managing users, roles, and page-level access permissions.  
Built with **React** (frontend) and **Django REST Framework** (backend), this dashboard is optimized for clarity, scalability, and maintainability.

---

## 🚀 Key Features

- 🔐 **JWT Authentication** using access and refresh tokens
- 👤 **Role-Based Access Control** (RBAC): Super Admins vs Regular Users
- 📄 **Granular Page-Level Permissions**: View, Create, Edit, Delete
- 💬 **Comment System** with edit/delete based on permissions
- 🕵️ **Modification History Tooltip** (WIP)
- 📊 **Dynamic User-Role Matrix** in the admin dashboard

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Bootstrap, Axios
- **Authentication:** JWT (`djangorestframework-simplejwt`)
- **Backend:** Django + Django REST Framework
- **Database:** SQLite (dev) – pluggable for PostgreSQL/MySQL
- **UI/UX:** Bootstrap + Custom CSS

---

## ⚙️ Installation & Setup

### 🖥️ Frontend (React)

```bash
cd frontend
npm install
npm start
```

➡️ Open in browser at `http://localhost:3000`

---

### 🐍 Backend (Django)

```bash
cd backend
python -m venv venv

# Activate virtual environment:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # If not already done
python manage.py runserver
```

➡️ Backend running at `http://localhost:8000`

---

### 🔗 Key Backend Routes

| URL                                | Description                            |
| ---------------------------------- | -------------------------------------- |
| `http://localhost:8000/admin/`     | Django Admin Panel (login required)    |
| `http://localhost:8000/api/`       | DRF API root with all endpoints        |
| `http://localhost:8000/api/pages/` | Page management API (CRUD permissions) |

---

## ✅ Backend Progress

| Feature                      | Status         |
| ---------------------------- | -------------- |
| Custom User Model            | ✅ Completed   |
| JWT Authentication           | ✅ Completed   |
| Superadmin Account Support   | ✅ Completed   |
| Django Admin Access          | ✅ Completed   |
| DRF API Root + Browsable API | ✅ Completed   |
| `/api/pages/` CRUD Endpoint  | ✅ Completed   |
| Page-Level Permissions API   | ⏳ In Progress |
| Comment History Tracking     | 🔜 Planned     |
| OTP-based Password Reset     | 🔜 Planned     |

---

## 🧪 Demo Credentials (for Testing)

| Role         | Email               | Password   |
| ------------ | ------------------- | ---------- |
| Super Admin  | `admin@example.com` | `admin123` |
| Regular User | `user@example.com`  | `user123`  |

> Login is mocked in frontend for demo purposes if backend is disconnected.

---

## 📈 Planned Enhancements

- [ ] Finish page-level permissions API
- [ ] Add comment history tracking
- [ ] Implement OTP-based password reset
- [ ] Add pagination & filtering to user table
- [ ] Protect frontend routes based on roles
- [ ] Backend unit tests and validations

---

## 🤝 Contributions Welcome

You're welcome to contribute:

1. Fork this repo
2. Create a new feature branch
3. Push your changes
4. Open a Pull Request

You can also report bugs or suggest features via [GitHub Issues](#)

---

## 📦 Project Submission

**Candidate:** Elvin Vincent  
**Position:** Full Stack Developer  
**Status:** Backend Extended / Frontend Functional  
📅 **Submitted on:** 17 June 2025
