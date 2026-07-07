import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";


export default function Reservations() {

  const [reservations,setReservations] = useState([]);
  const [loading,setLoading] = useState(true);



  // ================= FETCH =================

  const fetchReservations = async()=>{

    try{

      const token = localStorage.getItem("access");


      const response = await API.get(
        "reservations/",
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      console.log("Reservations:",response.data);


      setReservations(response.data || []);


    }
    catch(error){

      console.log(
        "Reservation Error:",
        error.response?.data
      );

    }
    finally{

      setLoading(false);

    }

  };



  useEffect(()=>{

    fetchReservations();

  },[]);





  // ================= APPROVE =================


  const approveReservation = async(id)=>{


    try{

      const token = localStorage.getItem("access");


      await API.post(

        `reservations/${id}/approve/`,

        {},

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchReservations();


    }
    catch(error){

      console.log(
        error.response?.data
      );

    }

  };





  // ================= REJECT =================


  const rejectReservation = async(id)=>{


    try{


      const token = localStorage.getItem("access");


      await API.post(

        `reservations/${id}/reject/`,

        {},

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );


      fetchReservations();


    }
    catch(error){

      console.log(
        error.response?.data
      );

    }

  };





  const statusStyle=(status)=>{


    if(status==="pending")
      return styles.pending;


    if(status==="approved")
      return styles.accepted;


    if(status==="rejected")
      return styles.rejected;


    if(status==="completed")
      return styles.completed;


    return {};

  };





return (

<Layout>


<div style={styles.header}>

<h2 style={styles.title}>
Reservations Management
</h2>


<p style={styles.subtitle}>
Manage patient medicine reservations
</p>


</div>






<div style={styles.tableBox}>


{

loading ?


<p style={{padding:20}}>
Loading reservations...
</p>



:


<table style={styles.table}>


<thead>

<tr>

<th style={styles.th}>
Patient
</th>


<th style={styles.th}>
Medicine
</th>


<th style={styles.th}>
Category
</th>


<th style={styles.th}>
Quantity
</th>


<th style={styles.th}>
Pharmacy
</th>


<th style={styles.th}>
Status
</th>


<th style={styles.th}>
Action
</th>


</tr>


</thead>





<tbody>


{

reservations.map((r)=>(


<tr key={r.id}>


<td style={styles.td}>

{r.patient_name || "Unknown"}

</td>



<td style={styles.td}>

{r.product_name || "Unknown"}

</td>



<td style={styles.td}>

{r.category || "-"}

</td>




<td style={styles.td}>

{r.quantity}

</td>




<td style={styles.td}>

{r.pharmacy_name || "-"}

</td>





<td style={styles.td}>


<span

style={{

...styles.status,

...statusStyle(r.status)

}}

>

{r.status}

</span>


</td>






<td style={styles.td}>


{

r.status==="pending"

&&

<>

<button

style={styles.acceptBtn}

onClick={()=>approveReservation(r.id)}

>

Approve

</button>



<button

style={styles.rejectBtn}

onClick={()=>rejectReservation(r.id)}

>

Reject

</button>


</>


}





{

r.status!=="pending"

&&

<span style={{color:"#777"}}>

Completed

</span>


}



</td>





</tr>


))


}



</tbody>



</table>


}


</div>



</Layout>


);

}







const styles={


header:{
marginBottom:20
},


title:{
color:"#003366"
},


subtitle:{
color:"#666",
fontSize:14
},


tableBox:{
background:"white",
borderRadius:12,
boxShadow:"0 6px 20px rgba(0,0,0,0.08)",
overflowX:"auto"
},


table:{
width:"100%",
borderCollapse:"collapse",
minWidth:900
},


th:{
background:"#003366",
color:"white",
padding:12,
textAlign:"left"
},


td:{
padding:12,
borderBottom:"1px solid #eee"
},



status:{
padding:"6px 12px",
borderRadius:20,
fontSize:12,
fontWeight:"600"
},


pending:{
background:"#fff3cd",
color:"#856404"
},


accepted:{
background:"#d4edda",
color:"#155724"
},


rejected:{
background:"#f8d7da",
color:"#721c24"
},


completed:{
background:"#cce5ff",
color:"#004085"
},



acceptBtn:{
background:"#28a745",
color:"white",
border:"none",
padding:"7px 12px",
borderRadius:6,
marginRight:5,
cursor:"pointer"
},



rejectBtn:{
background:"#dc3545",
color:"white",
border:"none",
padding:"7px 12px",
borderRadius:6,
cursor:"pointer"
}



};