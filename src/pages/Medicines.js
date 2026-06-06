import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Medicines() {
  const [search, setSearch] = useState("");

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Painkiller",
      price: 5000,
      stock: 84,
      expiry: "2027-01-12",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      price: 12000,
      stock: 12,
      expiry: "2026-11-20",
    },
    {
      id: 3,
      name: "Ibuprofen 400mg",
      category: "Painkiller",
      price: 8000,
      stock: 43,
      expiry: "2027-03-18",
    },
    {
      id: 4,
      name: "Loratadine 10mg",
      category: "Allergy",
      price: 7500,
      stock: 36,
      expiry: "2026-09-15",
    },
  ]);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteMedicine = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (confirmDelete) {
      setMedicines(medicines.filter((medicine) => medicine.id !== id));
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Medicines Management</h2>

          <p style={styles.subtitle}>
            Manage all medicines in the pharmacy system.
          </p>
        </div>

        <button style={styles.addButton}>
          + Add Medicine
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Medicine</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Expiry</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td style={styles.td}>{medicine.name}</td>

                <td style={styles.td}>{medicine.category}</td>

                <td style={styles.td}>
                  TSh {medicine.price}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.stockBadge,
                      background:
                        medicine.stock < 20
                          ? "#ffe6e6"
                          : "#e6fff0",
                      color:
                        medicine.stock < 20
                          ? "#b30000"
                          : "#2b9348",
                    }}
                  >
                    {medicine.stock}
                  </span>
                </td>

                <td style={styles.td}>
                  {medicine.expiry}
                </td>

                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button style={styles.viewBtn}>
                      View
                    </button>

                    <button style={styles.editBtn}>
                      Edit
                    </button>

                    <button
                      style={styles.deleteBtn}
                      onClick={() =>
                        deleteMedicine(medicine.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  title: {
    color: "#003366",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#666",
    fontSize: "14px",
  },

  addButton: {
    background: "#003366",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  searchContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #dbe9ff",
    outline: "none",
    fontSize: "14px",
  },

  tableContainer: {
    overflowX: "auto",
    background: "white",
    borderRadius: "14px",
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
    textAlign: "left",
    padding: "14px",
    fontSize: "14px",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#444",
  },

  stockBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "12px",
  },

  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  viewBtn: {
    background: "#e6f0ff",
    color: "#00509e",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  editBtn: {
    background: "#fff4e6",
    color: "#ff8800",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },

  deleteBtn: {
    background: "#ffe6e6",
    color: "#d00000",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
};