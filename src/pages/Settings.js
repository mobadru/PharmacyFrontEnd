import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";


export default function Settings() {


const [darkMode,setDarkMode] = useState(false);

const [notifications,setNotifications] = useState(true);


const [profile,setProfile] = useState({

name:"",
email:"",
phone:""

});


const [password,setPassword] = useState({

current:"",
new:"",
confirm:""

});



const [message,setMessage] = useState("");




// ==========================
// LOAD PROFILE
// ==========================

const fetchProfile = async()=>{


try{


const token =
localStorage.getItem("access");


const res = await API.get(
"profile/",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);



setProfile({

name:
res.data.username || "",


email:
res.data.email || "",


phone:
res.data.phone || ""

});



}

catch(error){

console.log(
error.response?.data
);

}


};





useEffect(()=>{

fetchProfile();

},[]);







// ==========================
// UPDATE PROFILE
// ==========================

const saveProfile = async()=>{


try{


const token =
localStorage.getItem("access");



await API.put(

"profile/",

profile,

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



setMessage(
"Profile updated successfully"
);



}

catch(error){

console.log(
error.response?.data
);

}



};









// ==========================
// CHANGE PASSWORD
// ==========================

const updatePassword = async()=>{


if(password.new !== password.confirm){

setMessage(
"Password does not match"
);

return;

}



try{


const token =
localStorage.getItem("access");



await API.post(

"change-password/",

{

old_password:
password.current,


new_password:
password.new

},


{

headers:{
Authorization:`Bearer ${token}`
}

}

);



setMessage(
"Password changed successfully"
);



setPassword({

current:"",
new:"",
confirm:""

});



}


catch(error){


console.log(
error.response?.data
);


}



};






return (

<Layout>



<div style={styles.header}>


<h2 style={styles.title}>
Settings
</h2>


<p style={styles.subtitle}>
Manage your account and system preferences
</p>


</div>





{
message &&

<div style={styles.message}>
{message}
</div>

}







<div style={styles.grid}>


{/* PROFILE */}

<div style={styles.card}>


<h3 style={styles.cardTitle}>
Profile Information
</h3>



<label>
Name
</label>


<input

style={styles.input}

value={profile.name}

onChange={(e)=>

setProfile({

...profile,

name:e.target.value

})

}

/>



<label>
Email
</label>


<input

style={styles.input}

value={profile.email}

onChange={(e)=>

setProfile({

...profile,

email:e.target.value

})

}

/>




<label>
Phone
</label>


<input

style={styles.input}

value={profile.phone}

onChange={(e)=>

setProfile({

...profile,

phone:e.target.value

})

}

/>



<button

style={styles.saveBtn}

onClick={saveProfile}

>

Save Profile

</button>



</div>









{/* PASSWORD */}


<div style={styles.card}>


<h3 style={styles.cardTitle}>
Change Password
</h3>



<input

type="password"

placeholder="Current Password"

style={styles.input}

value={password.current}

onChange={(e)=>

setPassword({

...password,

current:e.target.value

})

}

/>





<input

type="password"

placeholder="New Password"

style={styles.input}

value={password.new}

onChange={(e)=>

setPassword({

...password,

new:e.target.value

})

}

/>





<input

type="password"

placeholder="Confirm Password"

style={styles.input}

value={password.confirm}

onChange={(e)=>

setPassword({

...password,

confirm:e.target.value

})

}

/>



<button

style={styles.saveBtn}

onClick={updatePassword}

>

Update Password

</button>



</div>









{/* SYSTEM SETTINGS */}


<div style={styles.card}>


<h3 style={styles.cardTitle}>
System Settings
</h3>



<div style={styles.row}>


<span>
Notifications
</span>


<input

type="checkbox"

checked={notifications}

onChange={()=>setNotifications(!notifications)}

/>


</div>






<div style={styles.row}>


<span>
Dark Mode
</span>


<input

type="checkbox"

checked={darkMode}

onChange={()=>setDarkMode(!darkMode)}

/>


</div>





<p style={styles.note}>

Preferences saved locally

</p>



</div>




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


message:{
background:"#d4edda",
padding:10,
borderRadius:8,
marginBottom:15,
color:"#155724"
},


grid:{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(300px,1fr))",
gap:15
},


card:{
background:"white",
padding:20,
borderRadius:12,
boxShadow:
"0 6px 20px rgba(0,0,0,0.08)"
},


cardTitle:{
color:"#003366"
},


input:{
width:"100%",
padding:10,
marginBottom:10,
borderRadius:8,
border:"1px solid #ddd"
},


saveBtn:{
width:"100%",
padding:10,
background:"#003366",
color:"white",
border:"none",
borderRadius:8,
cursor:"pointer"
},


row:{
display:"flex",
justifyContent:"space-between",
padding:10,
background:"#f5f8ff",
borderRadius:8,
marginBottom:15
},


note:{
fontSize:12,
color:"#777"
}


};