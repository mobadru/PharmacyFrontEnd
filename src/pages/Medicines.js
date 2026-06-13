import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Medicines() {
  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    requires_prescription: false,
    description: "",
  });

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access");

      const medRes = await API.get("medicines/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const stockRes = await API.get("stocks/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMedicines(medRes.data || []);
      setStocks(stockRes.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ================= SAFE STOCK MATCH =================
  const getStockInfo = (medicineId) => {
    return stocks.find(
      (s) => s?.medicine?.id === medicineId || s?.medicine === medicineId
    );
  };

  // ================= ADD =================
  const openAdd = () => {
    setForm({
      name: "",
      brand: "",
      requires_prescription: false,
      description: "",
    });
    setEditId(null);
    setModalOpen(true);
  };

  // ================= EDIT =================
  const openEdit = (m) => {
    setForm({
      name: m?.name || "",
      brand: m?.brand || "",
      requires_prescription: m?.requires_prescription || false,
      description: m?.description || "",
    });
    setEditId(m.id);
    setModalOpen(true);
  };

  // ================= VIEW =================
  const openView = (m) => {
    const stock = getStockInfo(m.id);
    setViewItem({ ...m, stock });
  };

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access");

      if (editId) {
        await API.put(`medicines/${editId}/`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("medicines/", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= DELETE =================
  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      const token = localStorage.getItem("access");

      await API.delete(`medicines/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMedicines((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER SAFE =================
  const filtered = medicines.filter((m) =>
    (m?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Medicines Management</h2>
        
        </div>

        <button style={styles.addButton} onClick={openAdd}>
          + Add Medicine
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchContainer}>
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        {loading ? (
          <p style={{ padding: 20 }}>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Prescription</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Expiry</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((m) => {
                const stock = getStockInfo(m.id);

                return (
                  <tr key={m.id}>
                    <td style={styles.td}>{m.name}</td>
                    <td style={styles.td}>{m.brand}</td>
                    <td style={styles.td}>{m.description || "-"}</td>
                    <td style={styles.td}>
                      {m.requires_prescription ? "Yes" : "No"}
                    </td>

                    {/* STOCK FIXED */}
                    <td style={styles.td}>
                      <span style={styles.stockBadge}>
                        {stock?.quantity ?? 0}
                      </span>
                    </td>

                    {/* EXPIRY FIXED */}
                    <td style={styles.td}>
                      {stock?.expiry_date || "-"}
                    </td>

                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button style={styles.viewBtn} onClick={() => openView(m)}>
                          View
                        </button>

                        <button style={styles.editBtn} onClick={() => openEdit(m)}>
                          Edit
                        </button>

                        <button
                          style={styles.deleteBtn}
                          onClick={() => deleteMedicine(m.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewItem && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Medicine Details</h3>

            <p><b>Name:</b> {viewItem.name}</p>
            <p><b>Brand:</b> {viewItem.brand}</p>
            <p><b>Description:</b> {viewItem.description}</p>
            <p><b>Stock:</b> {viewItem.stock?.quantity ?? 0}</p>
            <p><b>Expiry:</b> {viewItem.stock?.expiry_date || "-"}</p>

            <button onClick={() => setViewItem(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ================= ADD/EDIT MODAL ================= */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Edit Medicine" : "Add Medicine"}</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              style={styles.input}
            />

            <input
              placeholder="Brand"
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
              style={styles.input}
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={styles.input}
            />

            <label>
              <input
                type="checkbox"
                checked={form.requires_prescription}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requires_prescription: e.target.checked,
                  })
                }
              />
              Requires Prescription
            </label>

            <div style={styles.modalActions}>
              <button style={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
              <button onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

/* ================= STYLES (UNCHANGED) ================= */
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: { color: "#003366" },
  subtitle: { color: "#666", fontSize: "14px" },

  addButton: {
    background: "#003366",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
  },

  searchContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
  },

  searchInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },

  tableContainer: {
    background: "white",
    borderRadius: "14px",
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  th: {
    background: "#003366",
    color: "white",
    padding: "14px",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
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
  },

  viewBtn: {
    background: "#e6f0ff",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
  },

  editBtn: {
    background: "#fff4e6",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
  },

  deleteBtn: {
    background: "#ffe6e6",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "400px",
  },

  input: {
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },

  saveBtn: {
    background: "#003366",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
};