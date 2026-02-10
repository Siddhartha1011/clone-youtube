import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children, searchTerm, setSearchTerm }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div style={{ display: "flex" }}>
        {sidebarOpen && <Sidebar />}
        <main style={{ flex: 1, padding: "16px" }}>{children}</main>
      </div>
    </>
  );
};

export default Layout;