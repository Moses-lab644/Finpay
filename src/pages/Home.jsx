import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>

      {/* NAVBAR */}

      <nav style={styles.navbar}>
        <div style={styles.logo}>FinPay</div>

        <div style={styles.navLinks}>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.signup}>Sign Up</Link>
        </div>
      </nav>


      {/* HERO SECTION */}

      <section style={styles.hero}>

        <div style={styles.heroText}>

          <h1 style={styles.title}>
            The smarter way to send and receive money
          </h1>

          <p style={styles.subtitle}>
            Secure payments, instant transfers, and powerful wallet
            management — all in one platform.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/signup" style={styles.primaryBtn}>
              Create Account
            </Link>

            <Link to="/login" style={styles.secondaryBtn}>
              Login
            </Link>
          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section style={styles.features}>

        <div style={styles.card}>
          <h3>Instant Transfers</h3>
          <p>Send money anywhere in seconds.</p>
        </div>

        <div style={styles.card}>
          <h3>Secure Wallet</h3>
          <p>Advanced encryption protects your funds.</p>
        </div>

        <div style={styles.card}>
          <h3>Track Payments</h3>
          <p>View all your transactions in real time.</p>
        </div>

      </section>


      {/* FOOTER */}

      <footer style={styles.footer}>
        © 2026 FinPay
      </footer>

    </div>
  );
}


const styles = {

container:{
width:"100%",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
background:"#f6f8fc"
},

navbar:{
width:"100%",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"20px 80px",
background:"#fff",
boxShadow:"0 2px 10px rgba(0,0,0,0.05)"
},

logo:{
fontSize:"24px",
fontWeight:"bold",
color:"#2563eb"
},

navLinks:{
display:"flex",
alignItems:"center",
gap:"20px"
},

link:{
textDecoration:"none",
color:"#333",
fontWeight:"500"
},

signup:{
background:"#2563eb",
color:"#fff",
padding:"8px 18px",
borderRadius:"6px",
textDecoration:"none",
fontWeight:"500"
},

hero:{
flex:1,
display:"flex",
alignItems:"center",
justifyContent:"center",
padding:"80px",
background:"linear-gradient(135deg,#f6f8fc,#eef2ff)"
},

heroText:{
maxWidth:"700px",
textAlign:"center"
},

title:{
fontSize:"48px",
fontWeight:"700",
marginBottom:"20px"
},

subtitle:{
fontSize:"18px",
color:"#555",
marginBottom:"40px"
},

heroButtons:{
display:"flex",
justifyContent:"center",
gap:"20px"
},

primaryBtn:{
background:"#2563eb",
color:"#fff",
padding:"14px 28px",
borderRadius:"8px",
textDecoration:"none",
fontWeight:"600"
},

secondaryBtn:{
border:"1px solid #2563eb",
color:"#2563eb",
padding:"14px 28px",
borderRadius:"8px",
textDecoration:"none",
fontWeight:"600"
},

features:{
display:"flex",
justifyContent:"center",
gap:"30px",
padding:"80px"
},

card:{
background:"#fff",
padding:"30px",
width:"260px",
borderRadius:"10px",
boxShadow:"0 10px 30px rgba(0,0,0,0.06)",
textAlign:"center"
},

footer:{
textAlign:"center",
padding:"20px",
background:"#fff"
}

};

export default Home;