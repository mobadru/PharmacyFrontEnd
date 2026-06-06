import React, { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("token/", {
        username,
        password,
      });
  
      // Save JWT tokens
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
  
      alert("Login successful");
  
      // Redirect to dashboard
      window.location.href = "/dashboard";
  
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Medicine Reserve System</h2>
        <p style={styles.subtitle}>Staff Login Panel</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter username"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Enter password"
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          © 2026 Pharmacy System
        </p>
      </div>
    </div>
  );
}


const styles = {
    container: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #003366, #00509e, #f5f8ff)",
      position: "relative",
      padding: "20px",
    },
  
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.1)",
    },
  
    card: {
      position: "relative",
      width: "100%",
      maxWidth: "400px",
      background: "white",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
      zIndex: 2,
    },
  
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
  
    title: {
      color: "#003366",
      fontSize: "22px",
      marginBottom: "5px",
    },
  
    subtitle: {
      color: "#666",
      fontSize: "13px",
    },
  
    form: {
      display: "flex",
      flexDirection: "column",
    },
  
    label: {
      fontSize: "13px",
      marginBottom: "5px",
      color: "#003366",
      fontWeight: "500",
    },
  
    input: {
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "10px",
      border: "1px solid #cce0ff",
      outline: "none",
      fontSize: "14px",
      transition: "0.2s",
    },
  
    button: {
      padding: "12px",
      background: "#003366",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "500",
      marginTop: "10px",
      transition: "0.2s",
    },
  
    error: {
      background: "#ffe6e6",
      color: "#b30000",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontSize: "13px",
      textAlign: "center",
    },
  
    footer: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "12px",
      color: "#888",
    },
  };