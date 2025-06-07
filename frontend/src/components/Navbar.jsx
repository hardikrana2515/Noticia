import React, { useEffect , useContext , useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import userContext from '../context/UserContext/userContext';

const Navbar = () => {
  const location = useLocation();
  const {GetUser,img,setImg} = useContext(userContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
   
    const fetchImageOnce = async () => {
      if (!img) {
        const userData = await GetUser();
        if (userData?.data) {
          setImg(userData.data.image);
        }
      }
      
    };
    fetchImageOnce();
  }, []);

  const getNavClass = (path) =>
    location.pathname === path
      ? 'px-3 py-2 rounded-md bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition duration-300'
      : 'px-3 py-2 rounded-md text-blue-900 hover:bg-blue-300 transition duration-300';

  return (
    <header className="bg-gradient-to-br from-blue-300 to-white backdrop-blur-md text-blue-800 px-4 py-4 sticky top-0 z-50 shadow-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo1.png" alt="Notica" className="h-12 w-12 object-cover rounded-full shadow" />
          <span className="font-bold text-xl tracking-wide">Notica</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className={getNavClass('/')}>Home</Link>
          <Link to="/Notes" className={getNavClass('/Notes')}>Create</Link>
          <Link to="/About" className={getNavClass('/About')}>About</Link>
          <Link to="/Account">
            <img
              src={img ? `http://localhost:5000${img}` : "/user.png"}
              alt="User"
              className="h-8 w-8 rounded-full object-cover shadow"
            />
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-3xl focus:outline-none text-blue-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4 flex flex-col bg-white rounded-lg shadow-lg border border-blue-200">
          <div className="flex items-center justify-baseline">
          <Link to="/" className={getNavClass('/')} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/Notes" className={getNavClass('/Notes')} onClick={() => setMenuOpen(false)}>Create</Link>
          <Link to="/About" className={getNavClass('/About')} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/Account" onClick={() => setMenuOpen(false)}>
            <div className="flex items-center space-x-2">
              <img
                src={img ? `http://localhost:5000${img}` : "/user.png"}
                alt="User"
                className="h-8 w-8 rounded-full object-cover shadow"
              />
            </div>
          </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
