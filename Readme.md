# iNotebook

A full-stack MERN (MongoDB, Express, React, Node.js) web application for capturing, organizing, and managing personal notes with JWT session authentication, profile management, and image upload.

---

## Features

- **User Authentication:** Secure JWT-based signup, login, and logout.
- **Note Management:** Full CRUD (Create, Read, Update, Delete) for personal notes.
- **Profile Customization:** Profile view with avatar image upload.
- **Cloud Database:** MongoDB Atlas / Local MongoDB with Mongoose ODM.
- **Responsive UI:** Modern, clean styling with Tailwind CSS and RemixIcon.
- **Infinite Scrolling:** Smooth infinite scroll pagination for browsing notes.
- **Protected Routing:** Secure routes accessible only by authenticated users.

---

## Project Structure

```
iNotebook/
│
├── backend/
│   ├── Controller/        # User and Note controllers
│   ├── Database/          # MongoDB connection
│   ├── middleware/        # JWT Auth and Multer upload middlewares
│   ├── models/            # Mongoose schemas (User, Note)
│   ├── public/Img/        # Uploaded profile images
│   ├── Routes/            # API routes (user, notes)
│   ├── Utils/             # ApiError, ApiResponse, asyncHandler, Mail
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── public/            # Static assets and icons
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── context/       # React Contexts (UserContext, NotesContext)
    │   ├── pages/         # Page views (Home, About, Account, CreateNote, Privacy)
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
- MongoDB (Local instance or MongoDB Atlas connection string)

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
- `POST /register` — Register a new account
- `POST /login` — Log in and receive JWT cookie & token
- `POST /logout` — Invalidate session and clear auth cookie
- `GET /getuser` — Fetch current user details (Protected)
- `POST /uploadImage` — Upload avatar image (Protected, `multipart/form-data`)

### Notes Routes (`/iNotebook/Notes`)
- `GET /notes` — Fetch all notes for authenticated user (Protected)
- `POST /create` — Create a new note (Protected)
- `PUT /updateNote/:id` — Update existing note by ID (Protected)
- `DELETE /deletenote/:id` — Delete note by ID (Protected)

---

## License

MIT

---

## Author

- [Hardik R. Rana](https://github.com/hardikrana2515)