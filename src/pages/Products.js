import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stockModal, setStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    quantity: 0,
    expiry_date: "",
    batch_number: "",
  });

  // ================= FETCH =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access");

      const productRes = await API.get("products/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const stockRes = await API.get("stocks/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(productRes.data || []);
      setStocks(stockRes.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // ================= GET STOCK =================
  const getStock = (productId) => {
    return stocks.find((s) => s.product === productId);
  };

  // ================= OPEN MODAL =================
  const openStockModal = (product) => {
    setSelectedProduct(product);
    setForm({
      quantity: 0,
      expiry_date: "",
      batch_number: "",
    });
    setStockModal(true);
  };

  // ================= ADD STOCK =================
  const addToStock = async () => {
    try {
      const token = localStorage.getItem("access");

      await API.post(
        "stocks/",
        {
          product: selectedProduct.id,
          quantity: form.quantity,
          expiry_date: form.expiry_date,
          batch_number: form.batch_number,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStockModal(false);
      fetchData();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ================= FILTER =================
  const filtered = products.filter((p) =>
    (p?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Products List</h2>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          placeholder="Search product..."
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
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Brand</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => {
                const stock = getStock(p.id);

                return (
                  <tr key={p.id}>
                    <td style={styles.td}>{p.name}</td>
                    <td style={styles.td}>{p.brand}</td>
                    <td style={styles.td}>{p.category}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: "20px",
                          background:
                            (stock?.quantity ?? 0) > 10 ? "#e6fff0" : "#ffe6e6",
                          color:
                            (stock?.quantity ?? 0) > 10 ? "#2b9348" : "#b30000",
                        }}
                      >
                        {stock?.quantity ?? 0}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <button
                        style={styles.addBtn}
                        onClick={() => openStockModal(p)}
                      >
                        Add to Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {stockModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Add to Stock</h3>

            <p>
              Product: <b>{selectedProduct?.name}</b>
            </p>

            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              style={styles.input}
            />

            <input
              type="date"
              value={form.expiry_date}
              onChange={(e) =>
                setForm({ ...form, expiry_date: e.target.value })
              }
              style={styles.input}
            />

            <input
              placeholder="Batch Number"
              value={form.batch_number}
              onChange={(e) =>
                setForm({ ...form, batch_number: e.target.value })
              }
              style={styles.input}
            />

            <div style={styles.modalActions}>
              <button onClick={addToStock} style={styles.saveBtn}>
                Save
              </button>
              <button onClick={() => setStockModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

/* ================= STYLES ================= */
const styles = {
  header: {
    marginBottom: 20,
  },

  title: {
    color: "#003366",
  },

  searchBox: {
    background: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },

  tableBox: {
    background: "white",
    borderRadius: 12,
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 700,
  },

  th: {
    background: "#003366",
    color: "white",
    padding: 12,
    textAlign: "left",
  },

  td: {
    padding: 12,
    borderBottom: "1px solid #eee",
  },

  addBtn: {
    background: "#003366",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
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
    padding: 20,
    borderRadius: 12,
    width: 350,
  },

  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  saveBtn: {
    background: "#003366",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
  },
};