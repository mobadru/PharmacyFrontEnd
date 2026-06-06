import React from "react";
import Layout from "../components/Layout";

export default function Reports() {
  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>System Reports</h2>
          <p style={styles.subtitle}>
            Analytics and performance overview of pharmacy system
          </p>
        </div>

        <div style={styles.actions}>
          <button style={styles.pdfBtn}>Export PDF</button>
          <button style={styles.excelBtn}>Export Excel</button>
        </div>
      </div>

      {/* CARDS */}
      <div style={styles.grid}>
        <Card title="Daily Reservations" value="18" color="#003366" />
        <Card title="Total Medicines" value="120" color="#00509e" />
        <Card title="Low Stock Items" value="6" color="#d9534f" />
        <Card title="Expired Medicines" value="3" color="#ff9800" />
      </div>

      {/* REPORT TABLE */}
      <div style={styles.tableBox}>
        <h3 style={{ marginBottom: "10px", color: "#003366" }}>
          Today's Reservation Report
        </h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Medicine</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={styles.td}>John Doe</td>
              <td style={styles.td}>Paracetamol</td>
              <td style={styles.td}>2</td>
              <td style={styles.pending}>Pending</td>
              <td style={styles.td}>10:30 AM</td>
            </tr>

            <tr>
              <td style={styles.td}>Amina Ali</td>
              <td style={styles.td}>Amoxicillin</td>
              <td style={styles.td}>1</td>
              <td style={styles.accepted}>Accepted</td>
              <td style={styles.td}>11:00 AM</td>
            </tr>

            <tr>
              <td style={styles.td}>Mohamed Said</td>
              <td style={styles.td}>Ibuprofen</td>
              <td style={styles.td}>3</td>
              <td style={styles.rejected}>Rejected</td>
              <td style={styles.td}>12:15 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `5px solid ${color}` }}>
      <h4 style={{ color: "#555" }}>{title}</h4>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

/* STYLES */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "20px",
    gap: "10px",
  },

  title: {
    color: "#003366",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  pdfBtn: {
    background: "#d9534f",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  excelBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  tableBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },

  th: {
    background: "#003366",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },

  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  pending: {
    color: "#856404",
    background: "#fff3cd",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  accepted: {
    color: "#155724",
    background: "#d4edda",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  rejected: {
    color: "#721c24",
    background: "#f8d7da",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
};