export default function Header() {
    return (
      <div style={styles.header}>
        <h3>Medicine Reservation System</h3>
        <div>Staff</div>
      </div>
    );
  }
  
  const styles = {
    header: {
      background: "#00509e",
      color: "white",
      padding: "15px 20px",
      display: "flex",
      justifyContent: "space-between",
    },
  };