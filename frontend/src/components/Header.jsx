import { FiMenu, FiSearch } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import "../styles/header.css";

const Header = ({ onToggleSidebar, searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <div className="left">
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <FiMenu size={22} />
        </button>
        <span className="logo">YouTube</span>
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

      <MdAccountCircle size={28} />
    </header>
  );
};

export default Header;