import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  const user = {
    name: "Moses Udofia",
    email: "moses@email.com",
    phone: "+234 800 000 0000",
    accountNumber: "FP-839201",
    balance: "$4,250.00",
    status: "Verified"
  };

  return (
    <div style={styles.container}>

      {/* Top Navbar */}
      <div style={styles.navbar}>
        <h2>FinPay</h2>

        <div>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
          <Link to="/settings" style={styles.navLink}>Settings</Link>
        </div>
      </div>

      {/* Profile Content */}
      <div style={styles.content}>

        <h1 style={styles.title}>My Profile</h1>

        <div style={styles.profileCard}>

          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            style={styles.avatar}
          />

          <h2>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>

        </div>

        <div style={styles.infoCard}>

          <div style={styles.row}>
            <span>Phone</span>
            <span>{user.phone}</span>
          </div>

          <div style={styles.row}>
            <span>Account Number</span>
            <span>{user.accountNumber}</span>
          </div>

          <div style={styles.row}>
            <span>Wallet Balance</span>
            <span style={styles.balance}>{user.balance}</span>
          </div>

          <div style={styles.row}>
            <span>Account Status</span>
            <span style={styles.status}>{user.status}</span>
          </div>

        </div>

      </div>
    </div>
  );
}

const styles = {

container:{
minHeight:"100vh",
background:"#f5f7fb",
fontFamily:"Arial"
},

navbar:{
height:"70px",
background:"#ffffff",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"0 40px",
borderBottom:"1px solid #eee"
},

navLink:{
marginLeft:"20px",
textDecoration:"none",
color:"#2563eb",
fontWeight:"bold"
},

content:{
padding:"40px",
maxWidth:"900px",
margin:"auto"
},

title:{
marginBottom:"30px"
},

profileCard:{
background:"white",
padding:"30px",
borderRadius:"10px",
textAlign:"center",
boxShadow:"0 8px 20px rgba(0,0,0,0.05)",
marginBottom:"30px"
},

avatar:{
borderRadius:"50%",
marginBottom:"15px"
},

email:{
color:"#666"
},

infoCard:{
background:"white",
padding:"30px",
borderRadius:"10px",
boxShadow:"0 8px 20px rgba(0,0,0,0.05)"
},

row:{
display:"flex",
justifyContent:"space-between",
padding:"15px 0",
borderBottom:"1px solid #eee"
},

balance:{
color:"#2563eb",
fontWeight:"bold"
},

status:{
color:"green",
fontWeight:"bold"
}

};

export default Profile;