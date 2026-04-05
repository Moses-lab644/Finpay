import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // 🔥 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setName(res.data.user.name);
      setEmail(res.data.user.email);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔥 UPDATE PROFILE
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("name", res.data.user.name);
      alert("Profile updated ✅");

    } catch (err) {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CHANGE PASSWORD
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/user/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Password changed successfully 🔐");

      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  // 🔥 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.container}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2>FinPay</h2>

        <nav>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/wallet" style={styles.link}>Wallet</Link>
          <Link to="/transactions" style={styles.link}>Transactions</Link>
          <Link to="/settings" style={{ ...styles.link, ...styles.active }}>
            Settings
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        <h1>Settings ⚙️</h1>

        {/* PROFILE */}
        <div style={styles.card}>
          <h3>Profile</h3>

          <form onSubmit={handleProfileUpdate}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />

            <input value={email} disabled style={styles.input} />

            <button style={styles.button}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>

        {/* PASSWORD */}
        <div style={styles.card}>
          <h3>Change Password 🔐</h3>

          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={styles.input}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />

            <button style={styles.button}>
              Change Password
            </button>
          </form>
        </div>

        {/* LOGOUT */}
        <div style={styles.card}>
          <h3>Account</h3>

          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout 🚪
          </button>
        </div>

      </main>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh", fontFamily: "Arial" },

  sidebar: {
    width: "200px",
    background: "#1a73e8",
    color: "#fff",
    padding: "20px",
  },

  link: {
    display: "block",
    color: "#fff",
    margin: "10px 0",
    textDecoration: "none",
  },

  active: {
    fontWeight: "bold",
  },

  main: {
    flex: 1,
    padding: "40px",
    background: "#f5f7fa",
  },

  card: {
    background: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },

  input: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "10px",
  },

  button: {
    padding: "10px",
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },

  logoutBtn: {
    padding: "10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
  },
};

export default Settings;