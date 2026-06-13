import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await API.get("reservations/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const approveReservation = async (id) => {
    try {
      const token = localStorage.getItem("access");

      await API.post(
        `reservations/${id}/approve/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReservations();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const rejectReservation = async (id) => {
    try {
      const token = localStorage.getItem("access");

      await API.post(
        `reservations/${id}/reject/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReservations();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return styles.pending;

      case "approved":
        return styles.accepted;

      case "rejected":
        return styles.rejected;

      case "completed":
        return styles.completed;

      default:
        return {};
    }
  };

  return (
    <Layout>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Reservations Management</h2>
          <p style={styles.subtitle}>
            Manage patient medicine reservations
          </p>
        </div>
      </div>

      <div style={styles.tableBox}>
        {loading ? (
          <p style={{ padding: 20 }}>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Medicine</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Expiry Time</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.patient_name}</td>

                  <td style={styles.td}>{r.medicine_name}</td>

                  <td style={styles.td}>{r.quantity}</td>

                  <td style={styles.td}>
                    {new Date(r.expiry_time).toLocaleString()}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        ...getStatusStyle(r.status),
                      }}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {r.status === "pending" && (
                      <>
                        <button
                          style={styles.acceptBtn}
                          onClick={() => approveReservation(r.id)}
                        >
                          Approve
                        </button>

                        <button
                          style={styles.rejectBtn}
                          onClick={() => rejectReservation(r.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {r.status !== "pending" && (
                      <span
                        style={{
                          color: "#777",
                          fontSize: "12px",
                        }}
                      >
                        No actions
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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