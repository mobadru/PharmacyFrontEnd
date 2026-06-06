import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Stock() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      medicine: "Paracetamol 500mg",
      quantity: 84,
      pharmacy: "City Pharmacy",
      batch: "BCH-001",
      expiry: "2027-01-10",
    },
    {
      id: 2,
      medicine: "Amoxicillin 250mg",
      quantity: 12,
      pharmacy: "City Pharmacy",
      batch: "BCH-002",
      expiry: "2026-09-12",
    },
    {
      id: 3,
      medicine: "Ibuprofen 400mg",
      quantity: 5,
      pharmacy: "Central Pharmacy",
      batch: "BCH-003",
      expiry: "2025-12-01",
    },
    {
      id: 4,
      medicine: "Loratadine 10mg",
      quantity: 40,
      pharmacy: "Health Pharmacy",
      batch: "BCH-004",
      expiry: "2026-11-20",
    },
  ]);

  const [search, setSearch] = useState("");

  const filtered = stocks.filter((s) =>
    s.medicine.toLowerCase().includes(search.toLowerCase())
  );

  const isLowStock = (qty) => qty <= 10;

  const isExpired = (date) => new Date(date) < new Date();

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Stock Management</h2>
          <p style={styles.subtitle}>
            Manage medicine stock, batches and expiry tracking
          </p>
        </div>

        <button style={styles.addBtn}>
          + Add Stock
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search medicine stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Medicine</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Pharmacy</th>
              <th style={styles.th}>Batch</th>
              <th style={styles.th}>Expiry</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} style={styles.tr}>
                <td style={styles.td}>{s.medicine}</td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.qty,
                      background: isLowStock(s.quantity)
                        ? "#ffe6e6"
                        : "#e6fff0",
                      color: isLowStock(s.quantity)
                        ? "#b30000"
                        : "#2b9348",
                    }}
                  >
                    {s.quantity}
                  </span>
                </td>

                <td style={styles.td}>{s.pharmacy}</td>
                <td style={styles.td}>{s.batch}</td>
                <td style={styles.td}>{s.expiry}</td>

                <td style={styles.td}>
                  {isExpired(s.expiry) ? (
                    <span style={styles.expired}>
                      Expired
                    </span>
                  ) : isLowStock(s.quantity) ? (
                    <span style={styles.low}>
                      Low Stock
                    </span>
                  ) : (
                    <span style={styles.ok}>
                      Available
                    </span>
                  )}
                </td>

                <td style={styles.td}>
                  <button style={styles.updateBtn}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ALERT BOX */}
      <div style={styles.alertBox}>
        ⚠ System Alert:
        Low stock and expired medicines are automatically flagged.
      </div>
    </Layout>
  );
}

/* STYLES */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },

  title: {
    color: "#003366",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  addBtn: {
    background: "#003366",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  searchBox: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
  },

  tableBox: {
    overflowX: "auto",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },

  th: {
    background: "#003366",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
  },

  tr: {
    transition: "0.2s",
  },

  qty: {
    padding: "6px 10px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "12px",
  },

  low: {
    color: "#b30000",
    background: "#ffe6e6",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  ok: {
    color: "#2b9348",
    background: "#e6fff0",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  expired: {
    color: "#ff0000",
    background: "#ffe6e6",
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  updateBtn: {
    background: "#00509e",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
  },

  alertBox: {
    marginTop: "15px",
    padding: "12px",
    background: "#fff5e6",
    border: "1px solid #ffd699",
    borderRadius: "10px",
    fontSize: "13px",
    color: "#8a5a00",
  },
};