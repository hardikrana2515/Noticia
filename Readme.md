# iNotebook

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing personal notes with user authentication, profile management, and image upload.

---

## Features

- User authentication (signup, login, logout)
- JWT-based session management
- Profile page with image upload
- Create, read, update, and delete notes
- Responsive UI with Tailwind CSS
- Protected routes for authenticated users

---

## Project Structure

```
iNotebook/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── Routes/
    │   ├── App.jsx
    │   ├── Api.axios.js
    │   └── main.jsx
    ├── .env
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

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

#### Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

#### Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create a `.env` file in `/frontend`:

```
VITE_API_URL=http://localhost:5000/api/
```

#### Start the frontend dev server:

```bash
npm run dev
```

---

## Usage

- Visit [http://localhost:5173](http://localhost:5173)
- Register a new account or log in.
- Create, edit, and delete notes.
- Update your profile and upload a profile picture.

---

## Tech Stack

- **Frontend:** React, Vite, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer (for image upload)
- **Authentication:** JWT (stored in cookies or sent via Authorization header)

---

## Important Notes

- Make sure both frontend and backend servers are running.
- The backend must allow CORS from the frontend URL.
- Profile image uploads are stored in `/backend/uploads` (or as configured).
- All API endpoints are under `/api/` (as set in `VITE_API_URL`).

---

## Scripts

### Backend

- `npm run dev` — Start backend in development mode

### Frontend

- `npm run dev` — Start frontend dev server

---

## License

MIT

---

## Author

- [Hardik R. Rana](https://github.com/hardikrana2515)