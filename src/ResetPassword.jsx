import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", padding: "50px" },
  form: { display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px", margin: "0 auto" },
  input: { padding: "10px", fontSize: "16px" },
  button: { padding: "10px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" },
};

export default ResetPassword;