import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>Medicine Reservation System</h2>

      <Link style={styles.link} to="/dashboard">Dashboard</Link>
      <Link style={styles.link} to="/products">Products</Link>
      <Link style={styles.link} to="/stock">Stock</Link>
      <Link style={styles.link} to="/reports">Reports</Link>
      <Link style={styles.link} to="/reservation">Reservations</Link>
      <Link style={styles.link} to="/settings">Settings</Link>
      <Link style={styles.link} to="/logout">Logout</Link>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#003366",
    color: "white",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  link: {
    display: "block",
    color: "#cfe6ff",
    textDecoration: "none",
    marginBottom: "15px",
    fontSize: "14px",
  },
};