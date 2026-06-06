import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div style={styles.main}>
        <Header />

        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f8ff",
  },

  sidebar: {
    width: "260px",
    background: "#003366",
    color: "white",
    minHeight: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: "auto",
    boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
  },

  main: {
    flex: 1,
    marginLeft: "260px",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  content: {
    padding: "24px",
    flex: 1,
  },

  /* RESPONSIVE */
  "@media (max-width: 768px)": {
    sidebar: {
      width: "0",
      position: "absolute",
    },

    main: {
      marginLeft: "0",
    },
  },
};