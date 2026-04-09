import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Wallet() {
  const [wallet, setWallet] = useState(null);

  const fetchWallet = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await axios.get(
        "https://finpay-4.onrender.com/api/wallet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Wallet:", res.data);
      setWallet(res.data.wallet);

    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>FinPay Wallet</h1>
        <nav>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          <Link to="/send" style={styles.navLink}>Send Money</Link>
        </nav>
      </header>

      {/* Main content */}
      <main style={styles.main}>

        {/* Wallet Card */}
        <div style={styles.walletCard}>
          <h2 style={styles.balanceTitle}>Current Balance</h2>

          {/* SAFE RENDER */}
          <p style={styles.balanceAmount}>
            ₦{wallet?.balance || "0.00"}
          </p>

          <div style={styles.actionButtons}>
            <Link to="/send" style={styles.primaryButton}>Send</Link>
            <Link to="/receive" style={styles.secondaryButton}>Receive</Link>
          </div>
        </div>

        {/* Transactions */}
        <div style={styles.transactionContainer}>
          <h3 style={styles.transactionTitle}>Recent Transactions</h3>
          <p>No transactions yet</p>
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
  navLink: {
    color: "#fff",
    marginLeft: "20px",
    textDecoration: "none",
    fontWeight: "bold"
  },
  main: {
    flex: 1,
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  walletCard: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  balanceTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#555"
  },
  balanceAmount: {
    fontSize: "36px",
    fontWeight: "bold",
    margin: "15px 0"
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px"
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "#1a73e8",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "#fff",
    color: "#1a73e8",
    border: "2px solid #1a73e8",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  transactionContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  transactionTitle: {
    margin: "0 0 20px 0",
    fontSize: "22px"
  },
};

export default Wallet;