# iNotebook (WordLoom)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-noticia--livid.vercel.app-blue?style=for-the-badge&logo=vercel)](https://noticia-livid.vercel.app)

> 🚀 **Live Site:** [https://noticia-livid.vercel.app](https://noticia-livid.vercel.app)


A modern full-stack MERN (MongoDB, Express, React, Node.js) web application for capturing, organizing, and managing personal notes and stories with JWT session authentication, profile management, password security policies, and image upload.

---

## Features

- **User Authentication & Authorization:**
  - Secure JWT session-based signup, login, and logout.
  - Multi-layer password security policy (minimum 8 characters, at least 1 uppercase letter, 1 number, and 1 special character `@#$&`).
  - Interactive, real-time visual password strength checklist during registration.
  - Protected routing with automatic token verification and session persistence.

- **Account & Profile Management:**
  - **Edit Profile:** Update Full Name, Email Address, and 10-digit Phone Number with uniqueness validation.
  - **Locked Username:** Username is fixed as unchangeable after registration to preserve unique author identity.
  - **Change Password:** Dedicated security section with current password verification, same-password prevention, and policy checks.
  - **Avatar & Image Upload:** Profile avatar uploads with Cloudinary integration and old image cleanup.

- **Note & Blog Management:**
  - Full CRUD operations (Create, Read, Update, Delete) for notes with titles, tags, descriptions, and banner images.
  - **Enhanced Reading Modal (PopCard):** Unified scroll view combining banner image, author details, and long blog content with a pinned persistent footer and custom scrollbar.
  - Infinite scroll pagination for seamless browsing.

- **Modern & Responsive UI:**
  - Built with Tailwind CSS and FontAwesome / Lucide icons.
  - Dark Mode and Light Mode support with smooth theme transitions.
  - Fully responsive design optimized for mobile, tablet, and desktop.

- **Robust Backend Architecture:**
  - Structured MVC pattern with centralized error handling (`ApiError`, `ApiResponse`, `asyncHandler`).
  - Strict input sanitization and validation using `express-validator`.
  - MongoDB Atlas / Local MongoDB support with Mongoose ODM schemas.

---

## Password Policy

For account security, all passwords (upon registration and update) must fulfill:
- Minimum **8 characters** in length
- At least **1 uppercase letter** (`A-Z`)
- At least **1 numeric digit** (`0-9`)
- At least **1 special character** from (`@#$&`)

---

## Project Structure

```
iNotebook/
│
├── backend/
│   ├── Controller/        # User and Note controllers
│   ├── Database/          # MongoDB connection setup
│   ├── middleware/        # JWT Auth and Multer upload middlewares
│   ├── models/            # Mongoose schemas (User, Note)
│   ├── public/Img/        # Static and uploaded assets
│   ├── Routes/            # Express routers (user, notes)
│   ├── Utils/             # ApiError, ApiResponse, asyncHandler, Mail, Cloudinary
│   ├── .env
│   └── server.js          # Express server entry point
│
└── frontend/
    ├── public/            # Static assets and icons
    ├── src/
    │   ├── components/    # Reusable UI components (Navbar, PopCard, Profile, ChangePassword, etc.)
    │   ├── context/       # React Contexts (UserContext, NotesContext, AlertContext)
    │   ├── pages/         # Page views (Home, About, Account, CreateNote, Landing)
    │   ├── Routes/        # ProtectedRoute wrapper
    │   ├── Api.axios.js   # Centralized Axios client with Bearer interceptor
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local instance or MongoDB Atlas cluster connection string)

---

### 1. Clone the Repository

```bash
git clone https://github.com/hardikrana2515/Noticia.git
cd Noticia
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Configure `.env` in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
Frontend_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
My_Mail=your_email@gmail.com
Paaskey=your_gmail_app_password
```

#### Start the backend server:

```bash
# Development mode (with nodemon):
npm run dev

# Or production mode:
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Configure `.env` in `/frontend`:

```env
VITE_API_URL=http://localhost:5000/iNotebook
```

#### Start the frontend development server:

```bash
npm run dev
```

---

### 4. Build for Production

```bash
# Frontend production build:
cd frontend
npm run build
```

---

## API Endpoints

### User Routes (`/iNotebook/user`)
- `POST /register` — Register a new account (enforces password policy, unique email, phone & username)
- `POST /login` — Authenticate and receive JWT cookie & token
- `POST /logout` — Invalidate session and clear auth cookie
- `GET /getuser` — Fetch authenticated user details (Protected)
- `PUT /updateProfile` — Update user's Name, Email, or Phone (Protected, Username remains unchangeable)
- `PUT /updatePassword` — Update password with current password verification and policy enforcement (Protected)
- `POST /uploadImage` — Upload avatar profile picture to Cloudinary (Protected, `multipart/form-data`)

### Notes Routes (`/iNotebook/Notes`)
- `GET /notes` — Fetch all notes for authenticated user with pagination (Protected)
- `POST /create` — Create a new note with optional banner image (Protected)
- `PUT /updateNote/:id` — Update existing note by ID (Protected)
- `DELETE /deletenote/:id` — Delete note by ID (Protected)

---

## License

MIT

---

## Author

- [Hardik R. Rana](https://github.com/hardikrana2515)
