import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Transactions() {
  const [filter, setFilter] = useState("All");
  const [transactions, setTransactions] = useState([]);

  // 🔥 FETCH FROM BACKEND
  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://finpay-4.onrender.com/api/wallet/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.transactions);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  //  GET CURRENT USER EMAIL FROM TOKEN (optional improvement later)
  const userEmail = localStorage.getItem("email");

  //  FORMAT DATA
  const formattedTransactions = transactions.map((t) => {
    const isSender = t.sender_email === userEmail;

    return {
      date: new Date(t.created_at).toLocaleDateString(),
      type: isSender ? "Sent" : "Received",
      amount: Number(t.amount),
      status: "Completed",
    };
  });

  // 🔥 FILTER
  const filteredTransactions = formattedTransactions.filter(
    (t) => filter === "All" || t.type === filter
  );

  return (
    <div style={styles.container}>

      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Transactions</h1>
        <nav>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          <Link to="/wallet" style={styles.navLink}>Wallet</Link>
        </nav>
      </header>

      {/* Main */}
      <main style={styles.main}>

        <div style={styles.filterContainer}>
          <button style={filter === "All" ? styles.activeFilter : styles.filterButton} onClick={() => setFilter("All")}>All</button>
          <button style={filter === "Sent" ? styles.activeFilter : styles.filterButton} onClick={() => setFilter("Sent")}>Sent</button>
          <button style={filter === "Received" ? styles.activeFilter : styles.filterButton} onClick={() => setFilter("Received")}>Received</button>
        </div>

        <div style={styles.transactionContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.td}>No transactions yet</td>
                </tr>
              ) : (
                filteredTransactions.map((t, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{t.date}</td>
                    <td style={styles.td}>{t.type}</td>
                    <td style={styles.td}>₦{t.amount.toFixed(2)}</td>
                    <td style={styles.td}>{t.status}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { margin: 0 },
  navLink: { color: "#fff", marginLeft: "20px", textDecoration: "none", fontWeight: "bold" },
  main: {
    flex: 1,
    padding: "40px",
  },
  filterContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  filterButton: {
    padding: "10px 20px",
    border: "2px solid #1a73e8",
    backgroundColor: "#fff",
    color: "#1a73e8",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  activeFilter: {
    padding: "10px 20px",
    border: "2px solid #1a73e8",
    backgroundColor: "#1a73e8",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  transactionContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "12px", borderBottom: "1px solid #ddd" },
  td: { padding: "12px", borderBottom: "1px solid #f1f1f1" },
};

export default Transactions;