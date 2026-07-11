import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function CareTakerDashboard(){

const [requests,setRequests]=useState([]);
const [statusFilter,setStatusFilter]=useState("Active");
const [loading,setLoading]=useState(false);


const { id } = useParams();

console.log("Caretaker Dashboard ID:", id);
const caretakerId = id;


// ================= GET REQUESTS =================

const getRequests = useCallback(async()=>{


try{


setLoading(true);


const res = await axios.get(
`${Api.get_Caretaker_Reqs}/${caretakerId}`
);



setRequests(
res.data?.data || []
);



}

catch(err){


console.log(err);


toast.error(
err.response?.data?.message ||
"Failed to load requests"
);


}


finally{


setLoading(false);


}



},[caretakerId]);





useEffect(()=>{


if(caretakerId)
{

getRequests();

}


},[caretakerId,getRequests]);








// ================= FILTER =================


// Completed ke alawa sabhi status

const activeRequests = requests.filter((req)=>{


return req.status !== "Completed";


});




// Only Completed

const completedRequests = requests.filter((req)=>{


return req.status === "Completed";


});









return (


<div className="min-h-screen bg-[#4CBB17]/20">



<div className="bg-[#4CBB17]/40 px-4 py-4 lg:px-8 mb-6">


<h1 className="
flex items-center gap-3
text-3xl lg:text-5xl
font-extrabold
text-green-900
">


<img

src="/garbageVehicle.jpeg"

className="w-12 h-12 lg:w-16 lg:h-16 object-contain"

/>


CleanTrack


</h1>


<p className="text-gray-800 mt-2">

Smart Waste Management Control Center

</p>


</div>





<div className="bg-green-700 text-white py-4 shadow">


<h1 className="
text-center
text-xl
sm:text-2xl
lg:text-3xl
font-bold
">

Caretaker Dashboard

</h1>


</div>







<div className="p-4 lg:p-8">


<div className="
bg-white
rounded-2xl
shadow
p-5
">






<div className="
flex
flex-col
md:flex-row
justify-between
gap-4
mb-6
">



<div>


<h2 className="
text-3xl
font-bold
text-green-900
">

Pickup Requests

</h2>


<p className="text-gray-500">

Assigned Hostel Cleaning Requests

</p>


</div>





<select


value={statusFilter}


onChange={(e)=>setStatusFilter(e.target.value)}


className="
border
rounded-xl
px-4
py-2
w-full
md:w-60
"


>


<option value="Active">

All Active

</option>


<option value="Completed">

Completed

</option>


</select>




</div>










{

loading ?



<div className="
text-center
py-10
text-blue-600
font-semibold
">

Loading Requests...

</div>






:


statusFilter==="Active"

?




activeRequests.length===0


?


<Empty/>


:




<div>


<h2 className="
text-2xl
font-bold
text-green-700
mb-4
">


Active Requests ({activeRequests.length})


</h2>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">


{


activeRequests.map((req)=>(


<RequestCard

key={req._id}

req={req}

/>


))


}



</div>


</div>







:




completedRequests.length===0


?


<Empty/>


:




<div>


<h2 className="
text-2xl
font-bold
text-blue-700
mb-4
">


Completed Requests ({completedRequests.length})


</h2>




<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">


{


completedRequests.map((req)=>(


<RequestCard

key={req._id}

req={req}

/>


))


}



</div>


</div>



}



</div>


</div>


</div>



);



}









// ================= EMPTY =================


function Empty(){


return (


<div className="
text-center
py-16
">


<div className="text-6xl">

🧹

</div>



<h2 className="
text-2xl
font-bold
text-gray-500
mt-3
">

No Requests Found

</h2>



</div>


)


}









// ================= CARD =================
function RequestCard({req}){

return (

<div
className={`
rounded-2xl
p-5
hover:shadow-lg
transition
border-2

${
req.isOverdue && req.status !== "Completed"
?
"border-red-400 bg-red-50"
:
"border-gray-200 bg-white"
}

`}
>


{/* TOP ROW LOCATION + LABELS */}

<div
className="
flex
justify-between
items-start
gap-4
"
>


{/* LOCATION */}

<h3
className={`
text-xl
font-semibold
leading-tight
break-words

${
req.isOverdue
?
"text-red-700"
:
"text-green-800"
}

`}
>
📍 {req.location?.locationName}
</h3>



{/* RIGHT LABELS */}

{/* RIGHT LABELS */}

<div
className="
flex
flex-col
gap-2
items-end
min-w-[100px]
"
>

{/* Scheduled Only */}

{
req.scheduledDate && !req.isOverdue && req.status !== "Completed" &&

<span
className="
bg-sky-500
text-white
px-3
py-1
rounded-full
text-xs
font-bold
whitespace-nowrap
"
>
Scheduled
</span>

}



{/* Overdue + Scheduled */}

{
req.isOverdue && req.scheduledDate && req.status !== "Completed" &&

<>

<span
className="
bg-sky-500
text-white
px-3
py-1
rounded-full
text-xs
font-bold
whitespace-nowrap
"
>
Scheduled
</span>


<span
className="
bg-red-600
text-white
px-3
py-1
rounded-full
text-xs
font-bold
animate-pulse
whitespace-nowrap
"
>
OVERDUE
</span>

</>

}




{/* Only Overdue */}

{
req.isOverdue && !req.scheduledDate && req.status !== "Completed" &&

<span
className="
bg-red-600
text-white
px-3
py-1
rounded-full
text-xs
font-bold
animate-pulse
whitespace-nowrap
"
>
OVERDUE
</span>

}




{/* Pending / Completed Status */}

{

!req.scheduledDate && !req.isOverdue &&

<span
className={

req.status === "Completed"

?
"bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"

:

"bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"

}
>

{req.status}

</span>

}



{/* Completed (Scheduled request complete ho to bhi Completed dikhe) */}

{

req.status === "Completed" &&

<span
className="
bg-green-600
text-white
px-3
py-1
rounded-full
text-xs
font-bold
whitespace-nowrap
"
>
Completed
</span>

}


</div>


</div>





{/* PRIORITY */}

<div
className="
mt-5
text-sm
"
>

Priority:

<b>
{" "}
{req.priority}
</b>

</div>





{/* CREATED */}

<p
className="
text-sm
text-gray-500
mt-3
"
>

Created:

{" "}

{
new Date(req.createdAt)
.toLocaleString("en-IN",{

day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit",
hour12:true

})
}

</p>





{/* PICKUP DATE */}

{

req.scheduledDate &&

<p
className="
text-sm
text-sky-700
mt-2
font-medium
"
>

Scheduled:

{" "}

{
new Date(req.scheduledDate)
.toLocaleDateString("en-IN",{

day:"2-digit",
month:"short",
year:"numeric"

})
}

{" | "}

{req.scheduledTime}

</p>

}





{/* ARRIVED */}

{

req.arrivedAt &&

<p
className="
text-sm
text-orange-700
mt-2
font-medium
"
>

Arrived:

{" "}

{
new Date(req.arrivedAt)
.toLocaleString("en-IN",{

day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit",
hour12:true

})
}

</p>

}





{/* COMPLETED */}

{

req.completedAt &&

<p
className="
text-sm
text-green-700
mt-2
font-medium
"
>

Completed:

{" "}

{
new Date(req.completedAt)
.toLocaleString("en-IN",{

day:"2-digit",
month:"short",
year:"numeric",
hour:"2-digit",
minute:"2-digit",
hour12:true

})
}

</p>

}





</div>

)

}