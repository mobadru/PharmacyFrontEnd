import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Staff Dashboard</h2>
          <p style={styles.subtitle}>
            Welcome back, manage reservations and medicine stock easily.
          </p>
        </div>

        <button style={styles.quickButton}>
          + Add Medicine
        </button>
      </div>

      {/* STATISTICS */}
      <div style={styles.grid}>
        <Card
          title="Total Medicines"
          value="120"
          color="#00509e"
        />

        <Card
          title="Total Reservations"
          value="34"
          color="#7b2cbf"
        />

        <Card
          title="Pending Reservations"
          value="12"
          color="#ff8800"
        />

        <Card
          title="Accepted Reservations"
          value="18"
          color="#2b9348"
        />

        <Card
          title="Low Stock Alert"
          value="5"
          color="#d00000"
        />

        <Card
          title="Quick Actions"
          value="Manage"
          color="#003366"
        />
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actionContainer}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>

        <div style={styles.actionsGrid}>
          <button style={styles.actionButton}>
            Add Medicine
          </button>

          <button style={styles.actionButton}>
            Update Stock
          </button>

          <button style={styles.actionButton}>
            View Reservations
          </button>

          <button style={styles.actionButton}>
            Generate Reports
          </button>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div style={styles.activityBox}>
        <h3 style={styles.sectionTitle}>Recent Activities</h3>

        <div style={styles.activityItem}>
          ✅ Reservation for Paracetamol accepted
        </div>

        <div style={styles.activityItem}>
          ⚠️ Amoxicillin stock is running low
        </div>

        <div style={styles.activityItem}>
          📦 New medicine added successfully
        </div>

        <div style={styles.activityItem}>
          ❌ Reservation rejected due to unavailable stock
        </div>
      </div>
    </Layout>
  );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    <div
      style={{
        ...styles.card,
        borderTop: `5px solid ${color}`,
      }}
    >
      <h4 style={styles.cardTitle}>{title}</h4>

      <h2 style={{ ...styles.cardValue, color }}>
        {value}
      </h2>
    </div>
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

  quickButton: {
    background: "#003366",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  cardTitle: {
    color: "#555",
    marginBottom: "10px",
    fontSize: "15px",
  },

  cardValue: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
  },

  actionContainer: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  sectionTitle: {
    color: "#003366",
    marginBottom: "18px",
  },

  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
  },

  actionButton: {
    padding: "14px",
    background: "#f0f7ff",
    border: "1px solid #dbe9ff",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#003366",
  },

  activityBox: {
    background: "white",
    padding: "22px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  activityItem: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
    color: "#444",
  },
};