import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h2 style={styles.text}>Logging out...</h2>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f8ff",
  },

  text: {
    color: "#003366",
    fontSize: "18px",
  },
};