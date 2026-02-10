import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "16px" }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;