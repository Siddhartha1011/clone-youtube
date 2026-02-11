import { FiMenu, FiSearch } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

const Header = ({ onToggleSidebar, searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left">
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <FiMenu size={22} />
        </button>
        <Link to="/" className="logo">YouTube</Link>
      </div>

      <div className="center">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch size={20} />
      </div>

      <div className="right">
        {user ? (
          <>
            <span className="header-username">{user.username}</span>
            <button type="button" className="icon-btn" onClick={() => { logout(); navigate("/"); }} aria-label="Sign out">
              <MdAccountCircle size={28} />
            </button>
          </>
        ) : (
          <Link to="/login" className="sign-in-btn">Sign in</Link>
        )}
      </div>
    </header>
  );
};

export default Header;