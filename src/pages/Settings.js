import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [profile, setProfile] = useState({
    name: "Staff User",
    email: "staff@pharmacy.com",
    phone: "+255 712 345 678",
  });

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Settings</h2>
          <p style={styles.subtitle}>
            Manage your account and system preferences
          </p>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* PROFILE */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Profile Information</h3>

          <label>Name</label>
          <input
            style={styles.input}
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            style={styles.input}
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <label>Phone</label>
          <input
            style={styles.input}
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />

          <button style={styles.saveBtn}>Save Profile</button>
        </div>

        {/* PASSWORD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Change Password</h3>

          <label>Current Password</label>
          <input type="password" style={styles.input} />

          <label>New Password</label>
          <input type="password" style={styles.input} />

          <label>Confirm Password</label>
          <input type="password" style={styles.input} />

          <button style={styles.saveBtn}>Update Password</button>
        </div>

        {/* SETTINGS */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>System Settings</h3>

          {/* NOTIFICATIONS */}
          <div style={styles.row}>
            <span>Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>

          {/* DARK MODE */}
          <div style={styles.row}>
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>

          <p style={styles.note}>
            System preferences will apply to dashboard UI (future upgrade)
          </p>
        </div>

      </div>
    </Layout>
  );
}

/* STYLES */
const styles = {
  header: {
    marginBottom: "20px",
  },

  title: {
    color: "#003366",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    color: "#003366",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "#003366",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    background: "#f5f8ff",
    borderRadius: "8px",
  },

  note: {
    fontSize: "12px",
    color: "#777",
    marginTop: "10px",
  },
};