import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";


export default function Dashboard() {

  const [stats,setStats] = useState({
    medicines:0,
    reservations:0,
    pending:0,
    accepted:0,
    lowStock:0
  });


  const [loading,setLoading] = useState(true);



  // ==========================
  // FETCH DASHBOARD DATA
  // ==========================

  const fetchDashboard = async()=>{

    try{

      const token = localStorage.getItem("access");


      const config = {
        headers:{
          Authorization:`Bearer ${token}`
        }
      };


      const [
        productRes,
        stockRes,
        reservationRes

      ] = await Promise.all([

        API.get("products/",config),

        API.get("stocks/",config),

        API.get("reservations/",config)

      ]);



      const products = productRes.data || [];

      const stocks = stockRes.data || [];

      const reservations = reservationRes.data || [];



      const lowStock = stocks.filter(
        item=>item.quantity <= 10
      ).length;



      const pending = reservations.filter(
        item=>item.status === "pending"
      ).length;



      const accepted = reservations.filter(
        item=>item.status === "approved"
      ).length;



      setStats({

        medicines:products.length,

        reservations:reservations.length,

        pending,

        accepted,

        lowStock

      });



      setLoading(false);



    }catch(error){

      console.log(
        "Dashboard Error:",
        error.response?.data
      );

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchDashboard();

  },[]);




  return (

    <Layout>


      <div style={styles.header}>


        <div>

          <h2 style={styles.title}>
            Staff Dashboard
          </h2>


          <p style={styles.subtitle}>
            Welcome back, manage reservations and medicine stock easily.
          </p>

        </div>



        <button style={styles.quickButton}>
          + Add Product
        </button>


      </div>





      {/* STATISTICS */}

      <div style={styles.grid}>


        <Card
          title="Total Medicines"
          value={loading ? "..." : stats.medicines}
          color="#00509e"
        />



        <Card
          title="Total Reservations"
          value={loading ? "..." : stats.reservations}
          color="#7b2cbf"
        />



        <Card
          title="Pending Reservations"
          value={loading ? "..." : stats.pending}
          color="#ff8800"
        />



        <Card
          title="Accepted Reservations"
          value={loading ? "..." : stats.accepted}
          color="#2b9348"
        />



        <Card
          title="Low Stock Alert"
          value={loading ? "..." : stats.lowStock}
          color="#d00000"
        />



        <Card
          title="Quick Actions"
          value="Manage"
          color="#003366"
        />



      </div>





      {/* QUICK ACTIONS */}

      <div style={styles.actionContainer}>


        <h3 style={styles.sectionTitle}>
          Quick Actions
        </h3>



        <div style={styles.actionsGrid}>


          <button style={styles.actionButton}>
            Add Product
          </button>



          <button style={styles.actionButton}>
            Update Stock
          </button>



          <button style={styles.actionButton}>
            View Reservations
          </button>



          <button style={styles.actionButton}>
            Generate Reports
          </button>


        </div>


      </div>






      {/* RECENT ACTIVITIES */}


      <div style={styles.activityBox}>


        <h3 style={styles.sectionTitle}>
          Recent Activities
        </h3>



        <div style={styles.activityItem}>
          📦 Stock updated successfully
        </div>



        <div style={styles.activityItem}>
          ⚠️ Low stock products need attention
        </div>



        <div style={styles.activityItem}>
          ✅ Reservations approved
        </div>



        <div style={styles.activityItem}>
          ❌ Reservations rejected
        </div>



      </div>




    </Layout>

  );

}





// =============================
// CARD COMPONENT
// =============================

function Card({title,value,color}){

return(

<div
style={{
...styles.card,
borderTop:`5px solid ${color}`
}}
>


<h4 style={styles.cardTitle}>
{title}
</h4>


<h2
style={{
...styles.cardValue,
color
}}
>

{value}

</h2>


</div>

)

}






const styles={

header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
flexWrap:"wrap",
gap:"15px"
},


title:{
color:"#003366"
},


subtitle:{
color:"#666",
fontSize:"14px"
},


quickButton:{
background:"#003366",
color:"white",
border:"none",
padding:"12px 18px",
borderRadius:"10px"
},


grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginBottom:"30px"
},


card:{
background:"white",
padding:"22px",
borderRadius:"14px",
boxShadow:"0 6px 20px rgba(0,0,0,0.08)"
},


cardTitle:{
color:"#555"
},


cardValue:{
fontSize:"28px"
},


actionContainer:{
background:"white",
padding:"22px",
borderRadius:"14px",
marginBottom:"30px"
},


sectionTitle:{
color:"#003366"
},


actionsGrid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"15px"
},


actionButton:{
padding:"14px",
background:"#f0f7ff",
borderRadius:"10px",
border:"1px solid #dbe9ff",
color:"#003366"
},


activityBox:{
background:"white",
padding:"22px",
borderRadius:"14px"
},


activityItem:{
padding:"12px",
borderBottom:"1px solid #eee"
}


};