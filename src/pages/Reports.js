import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function Reports() {


  const [report,setReport] = useState({

    reservations:0,
    medicines:0,
    lowStock:0,
    expired:0

  });


  const [reservations,setReservations] = useState([]);

  const [loading,setLoading] = useState(true);



  // ==========================
  // FETCH REPORT DATA
  // ==========================

  const fetchReports = async()=>{


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

      const reservationData = reservationRes.data || [];




      const lowStock = stocks.filter(

        item => item.quantity <= 10

      ).length;




      const expired = stocks.filter(item=>{


        if(!item.expiry_date)
          return false;


        return new Date(item.expiry_date) < new Date();


      }).length;




      setReport({

        reservations: reservationData.length,

        medicines: products.length,

        lowStock,

        expired

      });



      setReservations(reservationData);


      setLoading(false);



    }

    catch(error){


      console.log(
        "Report Error:",
        error.response?.data
      );


      setLoading(false);


    }


  };



  useEffect(()=>{

    fetchReports();

  },[]);






// ==========================
// EXPORT PDF
// ==========================

const exportPDF = ()=>{


 const doc = new jsPDF();



 doc.text(
  "Pharmacy System Reservation Report",
  14,
  15
 );



 const data = reservations.map((r)=>[


  r.patient_name || "Unknown",

  r.product_name || "",

  r.quantity,

  r.status,

  r.pharmacy_name || ""


 ]);




 autoTable(doc,{

  head:[

   [
    "Patient",
    "Medicine",
    "Quantity",
    "Status",
    "Pharmacy"
   ]

  ],


  body:data,


  startY:25


 });



 doc.save(
  "pharmacy-report.pdf"
 );


};






// ==========================
// EXPORT EXCEL
// ==========================

const exportExcel = ()=>{


 const data = reservations.map((r)=>(


 {


  Patient:
  r.patient_name || "Unknown",


  Medicine:
  r.product_name || "",


  Quantity:
  r.quantity,


  Status:
  r.status,


  Pharmacy:
  r.pharmacy_name || ""


 }


 ));



 const worksheet =
 XLSX.utils.json_to_sheet(data);



 const workbook =
 XLSX.utils.book_new();



 XLSX.utils.book_append_sheet(

 workbook,

 worksheet,

 "Reservations"

 );



 const excelBuffer =
 XLSX.write(

 workbook,

 {
  bookType:"xlsx",
  type:"array"
 }

 );



 const file = new Blob(

 [excelBuffer],

 {
  type:
  "application/octet-stream"
 }

 );



 saveAs(

 file,

 "pharmacy-report.xlsx"

 );


};return (

  <Layout>
  
  
  {/* HEADER */}
  
  <div style={styles.header}>
  
  
  <div>
  
  <h2 style={styles.title}>
  System Reports
  </h2>
  
  
  <p style={styles.subtitle}>
  Analytics and performance overview of pharmacy system
  </p>
  
  
  </div>
  
  
  
  <div style={styles.actions}>
  
  
  <button
  style={styles.pdfBtn}
  onClick={exportPDF}
  >
  Export PDF
  </button>
  
  
  
  <button
  style={styles.excelBtn}
  onClick={exportExcel}
  >
  Export Excel
  </button>
  
  
  
  </div>
  
  
  </div>
  
  
  
  
  
  {/* STATISTICS CARDS */}
  
  <div style={styles.grid}>
  
  
  <Card
  
  title="Daily Reservations"
  
  value={
  loading ? "..." : report.reservations
  }
  
  color="#003366"
  
  />
  
  
  
  <Card
  
  title="Total Medicines"
  
  value={
  loading ? "..." : report.medicines
  }
  
  color="#00509e"
  
  />
  
  
  
  <Card
  
  title="Low Stock Items"
  
  value={
  loading ? "..." : report.lowStock
  }
  
  color="#d9534f"
  
  />
  
  
  
  <Card
  
  title="Expired Medicines"
  
  value={
  loading ? "..." : report.expired
  }
  
  color="#ff9800"
  
  />
  
  
  
  </div>
  
  
  
  
  
  
  
  {/* RESERVATION TABLE */}
  
  
  <div style={styles.tableBox}>
  
  
  <h3 style={{color:"#003366"}}>
  
  Reservation Report
  
  </h3>
  
  
  
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
  Quantity
  </th>
  
  
  
  <th style={styles.th}>
  Status
  </th>
  
  
  
  <th style={styles.th}>
  Pharmacy
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
  
  {r.product_name}
  
  </td>
  
  
  
  <td style={styles.td}>
  
  {r.quantity}
  
  </td>
  
  
  
  <td style={styles.td}>
  
  
  {
  
  r.status === "pending"
  
  ?
  
  <span style={styles.pending}>
  Pending
  </span>
  
  
  :
  
  
  r.status === "approved"
  
  
  ?
  
  
  <span style={styles.accepted}>
  Accepted
  </span>
  
  
  :
  
  
  <span style={styles.rejected}>
  Rejected
  </span>
  
  
  }
  
  
  
  </td>
  
  
  
  
  <td style={styles.td}>
  
  {r.pharmacy_name}
  
  </td>
  
  
  
  </tr>
  
  
  ))
  
  
  }
  
  
  </tbody>
  
  
  </table>
  
  
  </div>
  
  
  
  </Layout>
  
  
  );
  
  
  }
  
  
  
  
  // =========================
  // CARD COMPONENT
  // =========================
  
  function Card({title,value,color}){
  
  
  return(
  
  <div
  
  style={{
  
  ...styles.card,
  
  borderLeft:`5px solid ${color}`
  
  }}
  
  >
  
  
  <h4 style={{color:"#555"}}>
  
  {title}
  
  </h4>
  
  
  
  <h2 style={{color}}>
  
  {value}
  
  </h2>
  
  
  
  </div>
  
  
  )
  
  }
  
  
  
  
  
  
  
  // =========================
  // STYLES
  // =========================
  
  const styles={
  
  
  header:{
  
  display:"flex",
  
  justifyContent:"space-between",
  
  alignItems:"center",
  
  flexWrap:"wrap",
  
  marginBottom:20
  
  },
  
  
  
  title:{
  
  color:"#003366"
  
  },
  
  
  
  subtitle:{
  
  color:"#666",
  
  fontSize:14
  
  },
  
  
  
  actions:{
  
  display:"flex",
  
  gap:10
  
  },
  
  
  
  pdfBtn:{
  
  background:"#d9534f",
  
  color:"white",
  
  border:"none",
  
  padding:"10px 14px",
  
  borderRadius:8,
  
  cursor:"pointer"
  
  },
  
  
  
  excelBtn:{
  
  background:"#28a745",
  
  color:"white",
  
  border:"none",
  
  padding:"10px 14px",
  
  borderRadius:8,
  
  cursor:"pointer"
  
  },
  
  
  
  grid:{
  
  display:"grid",
  
  gridTemplateColumns:
  "repeat(auto-fit,minmax(200px,1fr))",
  
  gap:15,
  
  marginBottom:20
  
  },
  
  
  
  card:{
  
  background:"white",
  
  padding:20,
  
  borderRadius:12,
  
  boxShadow:
  "0 6px 20px rgba(0,0,0,0.08)"
  
  },
  
  
  
  tableBox:{
  
  background:"white",
  
  padding:20,
  
  borderRadius:12,
  
  boxShadow:
  "0 6px 20px rgba(0,0,0,0.08)",
  
  overflowX:"auto"
  
  },
  
  
  
  table:{
  
  width:"100%",
  
  borderCollapse:"collapse"
  
  },
  
  
  
  th:{
  
  background:"#003366",
  
  color:"white",
  
  padding:10,
  
  textAlign:"left"
  
  },
  
  
  
  td:{
  
  padding:10,
  
  borderBottom:"1px solid #eee"
  
  },
  
  
  
  pending:{
  
  background:"#fff3cd",
  
  color:"#856404",
  
  padding:"5px 10px",
  
  borderRadius:20
  
  },
  
  
  
  accepted:{
  
  background:"#d4edda",
  
  color:"#155724",
  
  padding:"5px 10px",
  
  borderRadius:20
  
  },
  
  
  
  rejected:{
  
  background:"#f8d7da",
  
  color:"#721c24",
  
  padding:"5px 10px",
  
  borderRadius:20
  
  }
  
  
  };