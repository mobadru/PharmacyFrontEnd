import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function Stock() {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    product: "",
    quantity: "",
    batch_number: "",
    expiry_date: "",
  });

  // ==========================
  // FETCH DATA
  // ==========================
  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access");

      const stockRes = await API.get("stocks/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productRes = await API.get("products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStocks(stockRes.data || []);
      setProducts(productRes.data || []);

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);

      if (err.response) {
        setError(JSON.stringify(err.response.data));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================
  // OPEN ADD
  // ==========================
  const openAdd = () => {
    setEditId(null);

    setForm({
      product: "",
      quantity: "",
      batch_number: "",
      expiry_date: "",
    });

    setError("");
    setModalOpen(true);
  };

  // ==========================
  // OPEN EDIT
  // ==========================
  const openEdit = (stock) => {
    setEditId(stock.id);

    setForm({
      product: stock.product,
      quantity: stock.quantity,
      batch_number: stock.batch_number || "",
      expiry_date: stock.expiry_date || "",
    });

    setError("");
    setModalOpen(true);
  };

  // ==========================
  // INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // SAVE
  // ==========================
  const saveStock = async () => {
    try {
      const token = localStorage.getItem("access");

      setError("");

      const payload = {
        product: Number(form.product),
        quantity: Number(form.quantity),
        batch_number: form.batch_number || "",
        expiry_date: form.expiry_date || null,
      };

      console.log("Sending:", payload);

      if (editId) {
        await API.put(`stocks/${editId}/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await API.post("stocks/", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);

        if (typeof err.response.data === "object") {
          const message = Object.entries(err.response.data)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");

          setError(message);
        } else {
          setError(err.response.data);
        }
      } else {
        setError("Server not reachable.");
      }
    }
  };

  // ==========================
  // FILTER
  // ==========================
  const filteredStocks = stocks.filter((item) =>
    item.product_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const isExpired = (date) => {
    if (!date) return false;
    return new Date(date) < new Date();
  };

  const isLow = (qty) => qty <= 10;

  return (    <Layout>

    {/* HEADER */}
    <div style={styles.header}>
      <div>
        <h2 style={styles.title}>Stock Management</h2>
        <p style={styles.subtitle}>
          Pharmacy stock management (Auto pharmacy assignment)
        </p>
      </div>

      <button style={styles.addBtn} onClick={openAdd}>
        + Add Stock
      </button>
    </div>


    {/* ERROR MESSAGE */}
    {error && (
      <div style={styles.error}>
        {error}
      </div>
    )}


    {/* SEARCH */}
    <div style={styles.searchBox}>
      <input
        style={styles.input}
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>


    {/* TABLE */}
    <div style={styles.tableBox}>

      {loading ? (
        <p style={{padding:20}}>Loading...</p>
      ) : (

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Unit</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Batch</th>
              <th style={styles.th}>Expiry</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>


          <tbody>

            {filteredStocks.map((s)=>(
              <tr key={s.id}>

                <td style={styles.td}>
                  {s.product_name}
                </td>


                <td style={styles.td}>
                  {s.category}
                </td>


                <td style={styles.td}>
                  {s.unit}
                </td>


                <td style={styles.td}>

                  <span
                    style={{
                      ...styles.qty,
                      background:
                        isLow(s.quantity)
                        ? "#ffe6e6"
                        : "#e6fff0",

                      color:
                        isLow(s.quantity)
                        ? "#b30000"
                        : "#2b9348"
                    }}
                  >
                    {s.quantity}
                  </span>

                </td>


                <td style={styles.td}>
                  {s.batch_number || "-"}
                </td>


                <td style={styles.td}>
                  {s.expiry_date || "-"}
                </td>


                <td style={styles.td}>

                  {
                    isExpired(s.expiry_date)
                    ?
                    <span style={styles.expired}>
                      Expired
                    </span>

                    :

                    isLow(s.quantity)
                    ?

                    <span style={styles.low}>
                      Low Stock
                    </span>

                    :

                    <span style={styles.ok}>
                      Available
                    </span>
                  }

                </td>


                <td style={styles.td}>

                  <button
                    style={styles.updateBtn}
                    onClick={()=>openEdit(s)}
                  >
                    Edit
                  </button>

                </td>


              </tr>
            ))}

          </tbody>


        </table>

      )}

    </div>



    {/* MODAL */}

    {modalOpen && (

      <div style={styles.modalOverlay}>

        <div style={styles.modal}>

          <h3>
            {editId ? "Update Stock" : "Add Stock"}
          </h3>



          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">
              Select Product
            </option>


            {
              products.map((p)=>(

                <option
                  key={p.id}
                  value={p.id}
                >
                  {p.name}
                </option>

              ))
            }


          </select>



          <input
            name="quantity"
            type="number"
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
            name="expiry_date"
            type="date"
            value={form.expiry_date}
            onChange={handleChange}
            style={styles.input}
          />



          <div style={styles.modalActions}>


            <button
              style={styles.saveBtn}
              onClick={saveStock}
            >
              {editId ? "Update" : "Save"}
            </button>



            <button
              onClick={()=>{
                setModalOpen(false);
                setError("");
              }}
            >
              Cancel
            </button>


          </div>


        </div>

      </div>

    )}



  </Layout>
);
}



/* =========================
      STYLES
========================= */


const styles = {


header:{
display:"flex",
justifyContent:"space-between",
marginBottom:20
},


title:{
color:"#003366"
},


subtitle:{
color:"#666",
fontSize:14
},


addBtn:{
background:"#003366",
color:"white",
padding:12,
borderRadius:10,
border:"none",
cursor:"pointer"
},


error:{
background:"#ffe6e6",
color:"#b30000",
padding:12,
borderRadius:10,
marginBottom:15,
whiteSpace:"pre-line"
},


searchBox:{
background:"white",
padding:15,
borderRadius:12,
marginBottom:15
},


input:{
width:"100%",
padding:10,
marginBottom:10,
border:"1px solid #ccc",
borderRadius:8
},


tableBox:{
background:"white",
borderRadius:12,
overflow:"hidden"
},


table:{
width:"100%",
borderCollapse:"collapse"
},


th:{
background:"#003366",
color:"white",
padding:12
},


td:{
padding:12,
borderBottom:"1px solid #eee"
},


qty:{
padding:"6px 12px",
borderRadius:20
},


low:{
background:"#ffe6e6",
color:"#b30000",
padding:6,
borderRadius:20
},


ok:{
background:"#e6fff0",
color:"#2b9348",
padding:6,
borderRadius:20
},


expired:{
background:"#ffcccc",
color:"red",
padding:6,
borderRadius:20
},


updateBtn:{
background:"#00509e",
color:"white",
padding:8,
borderRadius:8,
border:"none",
cursor:"pointer"
},


modalOverlay:{
position:"fixed",
inset:0,
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
},


modal:{
background:"white",
width:400,
padding:20,
borderRadius:12
},


modalActions:{
display:"flex",
justifyContent:"space-between",
marginTop:10
},


saveBtn:{
background:"#003366",
color:"white",
padding:10,
borderRadius:8,
border:"none",
cursor:"pointer"
}


};