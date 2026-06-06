import Layout from "../components/Layout";

export default function DrugSearch() {
  return (
    <Layout>
      <h2 style={{ color: "#003366" }}>Search Medicines</h2>

      <div style={searchBox}>
        <input placeholder="Search drugs..." style={input} />
        <button className="btn-primary">Search</button>
      </div>

      <div style={list}>
        <Drug name="Paracetamol 500mg" stock="84" price="5000" />
        <Drug name="Amoxicillin 250mg" stock="12" price="12000" />
      </div>
    </Layout>
  );
}

function Drug({ name, stock, price }) {
  return (
    <div style={drug}>
      <div>
        <h4>{name}</h4>
        <p>Stock: {stock}</p>
      </div>
      <div>
        <b>TSh {price}</b>
        <button className="btn-primary">Reserve</button>
      </div>
    </div>
  );
}

const searchBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const drug = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "space-between",
};