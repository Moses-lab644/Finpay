import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://finpay-4.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Reset Link</button>
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

export default ForgotPassword;