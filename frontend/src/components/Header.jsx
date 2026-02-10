import { FiMenu, FiSearch } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <FiMenu size={22} />
        <span className="logo">YouTube</span>
      </div>

      <div className="center">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
        <FiSearch size={20} />
      </div>

      <MdAccountCircle size={28} />
    </header>
  );
};

export default Header;