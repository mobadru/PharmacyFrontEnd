import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    medicine: "",
    quantity: "",
    batch_number: "",
    expiry_date: "",
  });

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access");

      const stockRes = await API.get("stocks/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const medRes = await API.get("medicines/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStocks(stockRes.data || []);
      setMedicines(medRes.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= OPEN ADD =================
  const openAdd = () => {
    setForm({
      medicine: "",
      quantity: "",
      batch_number: "",
      expiry_date: "",
    });
    setEditId(null);
    setModalOpen(true);
  };

  // ================= OPEN EDIT =================
  const openEdit = (s) => {
    setForm({
      medicine: s.medicine?.id || s.medicine,
      quantity: s.quantity,
      batch_number: s.batch_number || "",
      expiry_date: s.expiry_date || "",
    });

    setEditId(s.id);
    setModalOpen(true);
  };

  // ================= CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD =================
  const handleAddSave = async () => {
    try {
      const token = localStorage.getItem("access");

      const payload = {
        medicine: Number(form.medicine),
        quantity: Number(form.quantity),
        batch_number: form.batch_number,
        expiry_date: form.expiry_date,
      };

      await API.post("stocks/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= UPDATE =================
  const handleUpdateSave = async () => {
    try {
      const token = localStorage.getItem("access");

      const payload = {
        medicine: Number(form.medicine),
        quantity: Number(form.quantity),
        batch_number: form.batch_number,
        expiry_date: form.expiry_date,
      };

      await API.put(`stocks/${editId}/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= FILTER =================
  const filtered = stocks.filter((s) =>
    (s.medicine_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const isLowStock = (qty) => qty <= 10;
  const isExpired = (date) => date && new Date(date) < new Date();

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Stock Management</h2>
          <p style={styles.subtitle}>Auto pharmacy assignment enabled</p>
        </div>

        <button style={styles.addBtn} onClick={openAdd}>
          + Add Stock
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* TABLE */}
      <div style={styles.tableBox}>
        {loading ? (
          <p style={{ padding: 20 }}>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Medicine</th>
                <th style={styles.th}>Qty</th>
                <th style={styles.th}>Batch</th>
                <th style={styles.th}>Expiry</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={styles.td}>{s.medicine_name}</td>

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

                  <td style={styles.td}>{s.batch_number}</td>
                  <td style={styles.td}>{s.expiry_date}</td>

                  <td style={styles.td}>
                    {isExpired(s.expiry_date) ? (
                      <span style={styles.expired}>Expired</span>
                    ) : isLowStock(s.quantity) ? (
                      <span style={styles.low}>Low Stock</span>
                    ) : (
                      <span style={styles.ok}>Available</span>
                    )}
                  </td>

                  <td style={styles.td}>
                    <button style={styles.updateBtn} onClick={() => openEdit(s)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{editId ? "Update Stock" : "Add Stock"}</h3>

            {/* MEDICINE DROPDOWN */}
            <select
              name="medicine"
              value={form.medicine}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Medicine</option>
              {medicines.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <input
              name="quantity"
              placeholder="Quantity"
              value={form.quantity}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="batch_number"
              placeholder="Batch Number"
              value={form.batch_number}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="date"
              name="expiry_date"
              value={form.expiry_date}
              onChange={handleChange}
              style={styles.input}
            />

            <div style={styles.modalActions}>
              {editId ? (
                <button style={styles.saveBtn} onClick={handleUpdateSave}>
                  Update
                </button>
              ) : (
                <button style={styles.saveBtn} onClick={handleAddSave}>
                  Save
                </button>
              )}

              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

/* ================= STYLES ================= */
const styles = {
  header: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  title: { color: "#003366" },
  subtitle: { color: "#666", fontSize: 14 },

  addBtn: {
    background: "#003366",
    color: "white",
    padding: 12,
    borderRadius: 10,
    border: "none",
  },

  searchBox: { padding: 15, background: "white", borderRadius: 12 },
  input: { width: "100%", padding: 10, marginBottom: 10 },

  tableBox: { background: "white", borderRadius: 12 },
  table: { width: "100%", borderCollapse: "collapse" },

  th: { background: "#003366", color: "white", padding: 12 },
  td: { padding: 12, borderBottom: "1px solid #eee" },

  qty: { padding: "6px 10px", borderRadius: 20 },
  low: { background: "#ffe6e6", color: "#b30000", padding: 6, borderRadius: 20 },
  ok: { background: "#e6fff0", color: "#2b9348", padding: 6, borderRadius: 20 },
  expired: { background: "#ffe6e6", color: "red", padding: 6, borderRadius: 20 },

  updateBtn: {
    background: "#00509e",
    color: "white",
    padding: 8,
    borderRadius: 8,
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

  modal: { background: "white", padding: 20, borderRadius: 12, width: 400 },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
  },

  saveBtn: {
    background: "#003366",
    color: "white",
    padding: 10,
    borderRadius: 8,
    border: "none",
  },
};