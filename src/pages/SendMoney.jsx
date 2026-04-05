import React, { useState } from "react";
import axios from "axios";

function SendMoney() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const form = e.target;
      const email = form.email.value;
      const amount = form.amount.value;

      const res = await axios.post(
        "http://localhost:5000/api/wallet/send",
        {
          email,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      form.reset();

    } catch (err) {
      alert(err.response?.data?.message || "Insufficient funds");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Send Money</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          <label style={styles.label}>Recipient Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@email.com"
            style={styles.input}
            required
          />

          <label style={styles.label}>Amount</label>
          <input
            name="amount"
            type="number"
            placeholder="Enter amount"
            style={styles.input}
            required
          />

          <label style={styles.label}>Currency</label>
          <select style={styles.input} disabled>
            <option>NGN</option>
          </select>

          <label style={styles.label}>Message (Optional)</label>
          <textarea
            placeholder="Add a note..."
            style={styles.textarea}
          />

          <button style={styles.button} disabled={loading}>
            {loading ? "Processing..." : "Send Payment"}
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default SendMoney;