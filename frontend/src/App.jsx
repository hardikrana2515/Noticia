import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";
import Privacy from "./pages/Privacy";
import CreateNote from "./pages/CreateNote";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notestate from "./context/NotesContexts/NoteSates";
import Userstate from "./context/UserContext/UserSates";
import ProtectedRoute from "./Routes/protectedRoute";
import "./App.css";

// Inner layout reads location AFTER BrowserRouter is mounted
function AppLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/landing";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hide app Navbar on the Landing page — it renders its own header */}
      {!isLandingPage && <Navbar />}
      <main className={isLandingPage ? "flex-1" : "flex-grow"}>
        <Routes>
          {/* Landing — shown to unauthenticated visitors */}
          <Route path="/landing" element={<Landing />} />

          {/* Dedicated auth routes (Landing links to these) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main app pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/Notes"
            element={<ProtectedRoute Component={CreateNote} />}
          />
          <Route
            path="/Account"
            element={<ProtectedRoute Component={Account} />}
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Userstate>
      <Notestate>
        <AppLayout />
      </Notestate>
    </Userstate>
  );
}

export default App;
