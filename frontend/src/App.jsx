import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Account from "./pages/Account";
import Privacy from "./pages/Privacy";
import CreateNote from "./pages/CreateNote";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Notestate from "./context/NotesContexts/NoteSates";
import Userstate from "./context/UserContext/UserSates";
import ProtectedRoute from "./Routes/protectedRoute";
import "./App.css";

function App() {
  return (
    <Userstate>
      <Notestate>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
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
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Notestate>
    </Userstate>
  );
}

export default App;
