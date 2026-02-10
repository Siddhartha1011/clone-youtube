import { MdHomeFilled, MdSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <MdHomeFilled size={22} />
          <span>Home</span>
        </li>

        <li>
          <SiYoutubeshorts size={20} />
          <span>Shorts</span>
        </li>

        <li>
          <MdSubscriptions size={22} />
          <span>Subscriptions</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;