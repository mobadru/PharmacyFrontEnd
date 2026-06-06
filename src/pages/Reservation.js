import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Reservations() {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      patient: "Tall Badru",
      medicine: "Paracetamol 500mg",
      quantity: 2,
      pickupTime: "2026-05-28 10:00",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Amina Ali",
      medicine: "Amoxicillin 250mg",
      quantity: 1,
      pickupTime: "2026-05-28 12:00",
      status: "Accepted",
    },
    {
      id: 3,
      patient: "Mohamed Said",
      medicine: "Ibuprofen 400mg",
      quantity: 3,
      pickupTime: "2026-05-29 09:00",
      status: "Rejected",
    },
    {
      id: 4,
      patient: "Fatma Hassan",
      medicine: "Loratadine 10mg",
      quantity: 1,
      pickupTime: "2026-05-30 14:00",
      status: "Pending",
    },
    {
      id: 5,
      patient: "Ali Juma",
      medicine: "Metformin 500mg",
      quantity: 2,
      pickupTime: "2026-05-31 11:00",
      status: "Completed",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updated = reservations.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setReservations(updated);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "Accepted":
        return styles.accepted;
      case "Rejected":
        return styles.rejected;
      case "Completed":
        return styles.completed;
      default:
        return {};
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Reservations Management</h2>
          <p style={styles.subtitle}>
            Manage patient medicine reservations
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Medicine</th>
              <th style={styles.th}>Qty</th>
              <th style={styles.th}>Pickup Time</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td style={styles.td}>{r.patient}</td>
                <td style={styles.td}>{r.medicine}</td>
                <td style={styles.td}>{r.quantity}</td>
                <td style={styles.td}>{r.pickupTime}</td>

                <td style={styles.td}>
                  <span style={{ ...styles.status, ...getStatusStyle(r.status) }}>
                    {r.status}
                  </span>
                </td>

                <td style={styles.td}>
                  {r.status === "Pending" && (
                    <>
                      <button
                        style={styles.acceptBtn}
                        onClick={() => updateStatus(r.id, "Accepted")}
                      >
                        Accept
                      </button>

                      <button
                        style={styles.rejectBtn}
                        onClick={() => updateStatus(r.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {r.status === "Accepted" && (
                    <button
                      style={styles.completeBtn}
                      onClick={() => updateStatus(r.id, "Completed")}
                    >
                      Mark Completed
                    </button>
                  )}

                  {(r.status === "Rejected" || r.status === "Completed") && (
                    <span style={{ color: "#777", fontSize: "12px" }}>
                      No actions
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

  tableBox: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    overflowX: "auto",
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

  status: {
    padding: "6px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  pending: {
    background: "#fff3cd",
    color: "#856404",
  },

  accepted: {
    background: "#d4edda",
    color: "#155724",
  },

  rejected: {
    background: "#f8d7da",
    color: "#721c24",
  },

  completed: {
    background: "#cce5ff",
    color: "#004085",
  },

  acceptBtn: {
    background: "#28a745",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },

  rejectBtn: {
    background: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
    marginRight: "5px",
  },

  completeBtn: {
    background: "#00509e",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  },
};