import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // FETCH WALLET
  const fetchWallet = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallet(res.data.wallet);
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/wallet/transactions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.logo}>FinPay</h1>

        <nav>
          <Link to="/wallet" style={styles.navLink}>Wallet</Link>
          <Link to="/transactions" style={styles.navLink}>Transactions</Link>
          <Link to="/settings" style={styles.navLink}>Settings</Link>
        </nav>
      </header>

      <main style={styles.main}>

        {/* TOP GRID */}
        <div style={styles.grid}>

          {/* PROFILE */}
          <div style={styles.card}>
            <h3>👤 Profile</h3>
            <p><strong>{name}</strong></p>
            <p style={styles.email}>{email}</p>
          </div>

          {/* BALANCE */}
          <div style={styles.balanceCard}>
            <h3>💰 Balance</h3>
            <p style={styles.balance}>
              ₦{wallet ? wallet.balance : "Loading..."}
            </p>
          </div>

          {/* ACTIONS */}
          <div style={styles.card}>
            <h3>⚡ Quick Actions</h3>
            <div style={styles.actions}>
              <Link to="/send" style={styles.primaryBtn}>Send</Link>
              <Link to="/wallet" style={styles.secondaryBtn}>Wallet</Link>
            </div>
          </div>

        </div>

        {/* TRANSACTIONS */}
        <div style={styles.transactionsCard}>
          <div style={styles.txHeader}>
            <h3>📊 Recent Transactions</h3>
            <Link to="/transactions" style={styles.viewAll}>View All</Link>
          </div>

          {transactions.length === 0 ? (
            <p>No transactions yet</p>
          ) : (
            transactions.slice(0, 5).map((t, i) => {
              const isSender = t.sender_email === email;

              return (
                <div key={i} style={styles.txRow}>
                  <div>
                    <p style={styles.txType}>
                      {isSender ? "Sent" : "Received"}
                    </p>
                    <small>{new Date(t.created_at).toLocaleDateString()}</small>
                  </div>

                  <p
                    style={{
                      ...styles.txAmount,
                      color: isSender ? "red" : "green",
                    }}
                  >
                    {isSender ? "-" : "+"}₦{t.amount}
                  </p>
                </div>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },

  header: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
  },

  navLink: {
    marginLeft: "20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },

  main: {
    padding: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  balanceCard: {
    background: "#1a73e8",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },

  balance: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  email: {
    color: "#777",
    fontSize: "14px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  primaryBtn: {
    padding: "10px 15px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  secondaryBtn: {
    padding: "10px 15px",
    border: "2px solid #1a73e8",
    color: "#1a73e8",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  transactionsCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },

  txHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },

  viewAll: {
    textDecoration: "none",
    color: "#1a73e8",
    fontWeight: "bold",
  },

  txRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },

  txType: {
    margin: 0,
    fontWeight: "bold",
  },

  txAmount: {
    fontWeight: "bold",
  },
};

export default Dashboard;