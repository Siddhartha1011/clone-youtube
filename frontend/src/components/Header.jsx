import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">YouTube</div>

      <input
        type="text"
        placeholder="Search"
        className="search-input"
      />

      <div className="profile">👤</div>
    </header>
  );
};

export default Header;