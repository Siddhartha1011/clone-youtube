import { MdHomeFilled, MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <MdHomeFilled size={22} />
            <span>Home</span>
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/channel/me" className={location.pathname === "/channel/me" ? "active" : ""}>
              <MdSubscriptions size={22} />
              <span>My channel</span>
            </Link>
          </li>
        )}
        <li>
          <span className="sidebar-item">
            <SiYoutubeshorts size={20} />
            <span>Shorts</span>
          </span>
        </li>
        <li>
          <span className="sidebar-item">
            <MdSubscriptions size={22} />
            <span>Subscriptions</span>
          </span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;