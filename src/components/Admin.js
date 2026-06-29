// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Api from "../api/Api";

// function Admin() {
//   const [users, setUsers] = useState([]);
//   const [scheduleMap, setScheduleMap] = useState({});
//   const [editingSchedule, setEditingSchedule] = useState({});
//   const [showRequests, setShowRequests] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [requests, setRequests] = useState([]);
//   const [orderMap, setOrderMap] = useState({});
//   const [isSorted, setIsSorted] = useState(false);


//   const [locations, setLocations] = useState([]);
// const [supervisors, setSupervisors] = useState([]);

// const [selectedSupervisor, setSelectedSupervisor] =
//   useState("");

// const [selectedLocations, setSelectedLocations] =
//   useState([]);
//   // ================= USERS =================
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(Api.get_All_User);
//       setUsers(res.data || []);

// const onlySupervisors =
//   res.data.filter(
//     (u) => u.role === "supervisor"
//   );

// setSupervisors(onlySupervisors);
//     } catch (err) {
//       console.log(err);
//     }
//   };

 


//   const fetchLocations = async () => {
//   try {
//     const res = await axios.get(
//       Api.get_All_Locations
//     );

//     setLocations(res.data);

//   } catch (err) {
//     console.log(err);
//   }
// };
//   // ================= REQUESTS =================
//   const fetchRequests = async () => {
//     try {
//       const res = await axios.get(Api.get_All_Emg_Req);

//       console.log("RAW RESPONSE:", res.data);

//       const data =
//         res.data?.data ||
//         res.data?.requests ||
//         res.data ||
//         [];

//       setRequests(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.log("FETCH ERROR:", err);
//       setRequests([]);
//     }
//   };
// useEffect(() => {
//   fetchUsers();
//   fetchLocations();
// }, []);



// const assignLocations = async () => {
//   try {

//     await axios.put(
//       Api.assign_Supervisor,
//       {
//         supervisorId:
//           selectedSupervisor,

//         locationIds:
//           selectedLocations,
//       }
//     );

//     alert("Locations Assigned");

//   } catch (err) {
//     console.log(err);
//   }
// };

//   // ================= ASSIGN ORDER (LIVE UI UPDATE) =================
//   const handleAssignOrder = async (id) => {
//     try {
//       const order = orderMap[id];

//       if (order === undefined || order === "") {
//         return alert("Enter order first");
//       }

//       const numOrder = Number(order);

//       // 🔥 UI UPDATE FIRST
//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id
//             ? { ...req, scheduleOrder: numOrder }
//             : req
//         )
//       );

//       // 🔥 API CALL (CORRECT)
//       const res = await axios.put(
//         `${Api.update_Emg_Order}/${id}`,
//         {
//           scheduleOrder: numOrder,
//         }
//       );

//       console.log("UPDATE RESPONSE:", res.data);

//       setOrderMap({});
//       setIsSorted(false);

//     } catch (err) {
//       console.log("ASSIGN ERROR:", err.response || err);
//       alert("Assign failed");
//     }
//   };

//   // ================= UPDATE ORDER =================
//   const handleUpdateAssign = async (id) => {
//     try {
//       const order = orderMap[id];

//       if (!order && order !== 0) {
//         return alert("Enter order first");
//       }

//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id
//             ? { ...req, scheduleOrder: Number(order) }
//             : req
//         )
//       );

//       await axios.put(
//         `${Api.update_Emg_Order}/${id}`,
//         {
//           scheduleOrder: Number(order),
//         }
//       );

//       setOrderMap({});
//       setIsSorted(false);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FINAL SORT =================
//   const filteredRequests = requests.filter((req) => {
//     if (statusFilter === "All") {
//       return req.status !== "Completed";
//     }

//     return req.status === statusFilter;
//   });


//  const handleSchedule = async (id) => {
//   try {

//     const data = scheduleMap[id];

//     if (!data?.date || !data?.time) {
//       return alert("Select Date & Time");
//     }

//     const selectedTime = data.time;

//     if (
//       selectedTime < "08:00" ||
//       selectedTime > "18:00"
//     ) {
//       return alert(
//         "Time must be between 8:00 AM and 6:00 PM"
//       );
//     }

//     await axios.put(`${Api.update_Emg_Order}/${id}`, 
//       {
//       scheduledDate: data.date,
//       scheduledTime: data.time,
//       status: "Scheduled",
//     });

//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id
//             ? {
//   ...req,
//   scheduledDate: data.date,
//   scheduledTime: data.time,
//   status: "Scheduled",
//   isOverdue: false,
// }
//             : req
//         )
//       );

//       setEditingSchedule((prev) => ({
//         ...prev,
//         [id]: false,
//       }));

//       setScheduleMap((prev) => ({
//         ...prev,
//         [id]: {},
//       }));

//       alert("Schedule Updated Successfully");
//     } catch (error) {
//       console.log(error);
//       alert("Schedule Failed");
//     }
//   };

//   useEffect(() => {
//   fetchRequests();
// }, []);

// const overdueRequests = filteredRequests
//   .filter(
//     (req) =>
//       req.isOverdue &&
//       req.status !== "Completed"
//   )
//   .sort((a, b) => {
//     const priorityRank = {
//       High: 1,
//       Medium: 2,
//       Low: 3,
//     };

//     const priorityDiff =
//       (priorityRank[a.priority] || 999) -
//       (priorityRank[b.priority] || 999);

//     if (priorityDiff !== 0) {
//       return priorityDiff;
//     }

//     return (
//       new Date(a.createdAt) -
//       new Date(b.createdAt)
//     );
//   });

//   const sortByScheduleTime = (a, b) => {
//   const dateA = a.scheduledDate
//     ? new Date(
//         `${a.scheduledDate}T${a.scheduledTime || "00:00"}`
//       )
//     : new Date(a.createdAt);

//   const dateB = b.scheduledDate
//     ? new Date(
//         `${b.scheduledDate}T${b.scheduledTime || "00:00"}`
//       )
//     : new Date(b.createdAt);

//   return dateA - dateB;
// };
// const highRequests = filteredRequests
//   .filter(
//     (req) =>
//       req.priority === "High" &&
//       (!req.isOverdue || req.status === "Completed")
//   )
//   .sort(sortByScheduleTime);

// const mediumRequests = filteredRequests
//   .filter(
//     (req) =>
//       req.priority === "Medium" &&
//       (!req.isOverdue || req.status === "Completed")
//   )
//   .sort(sortByScheduleTime);

// const lowRequests = filteredRequests
//   .filter(
//     (req) =>
//       req.priority === "Low" &&
//       (!req.isOverdue || req.status === "Completed")
//   )
//   .sort(sortByScheduleTime);
// const displayedRequests = [...filteredRequests].sort((a, b) => {

//   if (a.isOverdue && !b.isOverdue)
//     return -1;

//   if (!a.isOverdue && b.isOverdue)
//     return 1;

//   const priorityRank = {
//     High: 1,
//     Medium: 2,
//     Low: 3,
//   };

//   return (
//     (priorityRank[a.priority] || 999) -
//     (priorityRank[b.priority] || 999)
//   );
// });


// const renderRequestCard = (req) => (
//   <div
//     key={req._id}
//     className="bg-white rounded-2xl border border-[#d6ddd2] p-6 hover:shadow-lg transition m-8"
//   >
//     {/* TOP */}
//     <div className="flex justify-between items-start">
//       <div>
//         {/* <p className="text-xs uppercase tracking-wider text-gray-500">
//           Request #{req._id.slice(-5)}
//         </p> */}

//        <div className="flex items-center min-w-0">
//   <p
//     className="
//       font-bold text-green-700
//       truncate
//       w-full
//     "
//     title={req.location?.locationName}
//   >
//     📍 {req.location?.locationName}
//   </p>
// </div>
//       </div>

//       <span
//         className={
//           req.status === "Completed"
//             ? "bg-green-500 text-white px-4 py-1 rounded-full"
//             : req.status === "Scheduled"
//             ? "bg-sky-500 text-white px-4 py-1 rounded-full"
//             : req.status === "Pending"
//             ? "bg-yellow-500 text-black px-4 py-1 rounded-full"
//             : req.status === "Arrived"
//             ? "bg-orange-500 text-white px-4 py-1 rounded-full"
//             : "bg-gray-500 text-white px-4 py-1 rounded-full"
//         }
//       >
//         {req.status}
//       </span>

//  {req.isOverdue &&
//  req.status !== "Completed" && (
//   <div className="mt-1">
//     <span className="bg-red-600 text-white px-1 py-0 rounded-full text-xs font-bold ml-2">
//       OVERDUE
//     </span>
//   </div>
// )}
//     </div>

//     {/* INFO */}
//     <div className="mt-5 space-y-2">
//       <p>
//         <span className="font-semibold">Priority:</span>{" "}
//         {req.priority}
//       </p>

//       <p className="text-sm text-gray-500 mt-4">
//         Created:
//         {new Date(req.createdAt).toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })}
//       </p>
//     </div>

//     {/* Timeline */}
//     <div className="mt-4 space-y-2 border-t pt-3">
//       {req.arrivedAt && (
//         <p className="text-sm text-yellow-700 font-medium">
//           Arrived:{" "}
//           {new Date(req.arrivedAt).toLocaleString("en-IN")}
//         </p>
//       )}

//       {req.completedAt && (
//         <p className="text-sm text-green-700 font-medium">
//           Completed:{" "}
//           {new Date(req.completedAt).toLocaleString("en-IN")}
//         </p>
//       )}
//     </div>
// {req.status === "Pending" &&
//  req.status !== "Completed" &&
//  !editingSchedule[req._id] && (
//         <button
//           onClick={() =>
//             setEditingSchedule((prev) => ({
//               ...prev,
//               [req._id]: true,
//             }))
//           }
//           className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl font-semibold"
//         >
//           Schedule Pickup
//         </button>
//       )}

// {req.status !== "Completed" &&
//  (req.status === "Scheduled" ||
//   req.isOverdue) &&
//  !editingSchedule[req._id] && (
//         <>
//           <div className="bg-sky-50 p-3 rounded-lg mb-3">
//             <p className="text-sm text-sky-700 font-medium">
//               Scheduled:
//               {" "}
//               {new Date(
//                 req.scheduledDate
//               ).toLocaleDateString("en-IN")}
//               {" | "}
//               {req.scheduledTime}
//             </p>
//           </div>

//          <button
//   onClick={() =>
//     setEditingSchedule((prev) => ({
//       ...prev,
//       [req._id]: true,
//     }))
//   }
//   className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold"
// >
//   {req.isOverdue
//     ? "Reschedule Task"
//     : "Update Schedule"}
// </button>
//         </>
//       )}

//     {req.status !== "Completed" &&
//  editingSchedule[req._id] && (
//       <div className="space-y-3 mt-3">
//       <input
//   type="date"
//   min={new Date().toISOString().split("T")[0]}
//   className="w-full border border-gray-300 rounded-lg p-2"
//   value={scheduleMap[req._id]?.date || ""}
//   onChange={(e) =>
//     setScheduleMap((prev) => ({
//       ...prev,
//       [req._id]: {
//         ...prev[req._id],
//         date: e.target.value,
//       },
//     }))
//   }
// />

//         <input
//   type="time"
//   min="08:00"
//   max="18:00"
//   className="w-full border border-gray-300 rounded-lg p-2"
//   value={scheduleMap[req._id]?.time || ""}
//   onChange={(e) =>
//     setScheduleMap((prev) => ({
//       ...prev,
//       [req._id]: {
//         ...prev[req._id],
//         time: e.target.value,
//       },
//     }))
//   }
// />

//         <button
//           onClick={() => handleSchedule(req._id)}
//           className="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-xl font-semibold"
//         >
//           {req.status === "Scheduled"
//             ? "Save Update"
//             : "Schedule"}
//         </button>

//         <button
//           onClick={() =>
//             setEditingSchedule((prev) => ({
//               ...prev,
//               [req._id]: false,
//             }))
//           }
//           className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-xl font-semibold"
//         >
//           Cancel
//         </button>
//       </div>
//     )}
//   </div>
// );


//   return (
//     <div className="min-h-screen bg-[#4CBB17]/20">

//       <div >

//         {/* HEADER */}
//         {/* HEADER */}
//         <div className="mb-8 bg-[#4CBB17]/40 px-6 ">
//           <div className="flex items-center justify-between">

//             {/* Logo + Title */}
//             <div >
//               <h1 className="flex items-center gap-3 text-5xl font-extrabold text-green-900">
//                 <img
//                   src="garbageVehicle.jpeg"
//                   alt=""
//                   className="w-16 h-16 object-contain"
//                 />
//                 CleanTrack
//               </h1>

//               <p className="text-gray-900 p-2">
//                 Smart Waste Management Control Center
//               </p>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex items-center gap-8 text-lg font-semibold">

//               <Link
//                 to="/create-account"
//                 className="text-green-900 hover:text-white-900 transition-all duration-300 hover:scale-105"
//               >
//                 Create User
//               </Link>

//               <button
//                 onClick={() => {
//                   setShowRequests(!showRequests);
//                   fetchRequests();
//                 }}
//                 className="text-green-900 hover:text-green-900 transition-all duration-300 hover:scale-105"
//               >
//                 View Requests
//               </button>

//               <Link
//   to="/create-location"
//   className="text-green-900 hover:scale-105 transition"
// >
//   Create Locations
// </Link>

//              <Link
//   to="/assign-location"
//   className="text-green-900 hover:scale-105 transition"
// >
//   Assign Location
// </Link>


//             </div>
//           </div>
//         </div>

//         <div className="text-center mb-10">
//         <h1 className="text-5xl font-extrabold text-black-900">
//           Admin Dashboard
//         </h1>
//       </div>

//         {/* USERS */}
//         <div className="bg-white rounded-2xl shadow-sm border border-[#d6ddd2] p-6 mb-8 m-8">

//           <div className="flex justify-between items-center mb-6">

//             <h2 className="text-2xl font-bold text-green-900">
//               User Management
//             </h2>

//             <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
//               {users.length} Users
//             </span>

//           </div>

//           <div className="overflow-x-auto">

//             <table className="w-full">

//               <thead>
//                 <tr className="bg-green-900 text-white">
//                   <th className="p-4 text-left">Name</th>
//                   <th className="p-4 text-left">Mobile</th>
//                   <th className="p-4 text-left">Role</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b hover:bg-green-50 transition"
//                   >
//                     <td className="p-4 font-medium">
//                       {user.name}
//                     </td>

//                     <td className="p-4">
//                       {user.mobile}
//                     </td>

//                     <td className="p-4">
//                       <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                         {user.role}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//             </table>

//           </div>

//         </div>




//         {/* REQUESTS */}
//         {showRequests && (
//           <div>

//             <div className="flex justify-between items-center mb-6 m-8">

//               <div>
//                 <h2 className="text-3xl font-bold text-green-900">
//                   Active Requests
//                 </h2>

//                 <p className="text-gray-500 text-sm">
//                   Pickup Scheduling & Monitoring
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">

//                 <select
//                   value={statusFilter}
//                   onChange={(e) =>
//                     setStatusFilter(e.target.value)
//                   }
//                   className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
//                 >
//                   <option value="All">All Active</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Scheduled">Scheduled</option>
//                   <option value="Arrived">Arrived</option>
//                   <option value="Completed">Completed</option>
//                 </select>

//                 <div className="bg-white border border-[#d6ddd2] px-5 py-3 rounded-xl">
//                   <span className="font-semibold">
//                     Total Requests:
//                   </span>{" "}
//                   {displayedRequests.length}
//                 </div>

//               </div>

//             </div>

//             {displayedRequests.length === 0 ? (

//               <div className="bg-white rounded-2xl shadow-sm border border-[#d6ddd2] p-10 text-center">
//                 No requests found
//               </div>

//             ) : (
// <div>
//   {overdueRequests.length > 0 && (
//   <>
//     <hr className="my-10 border-gray-300" />

//     <div className="flex justify-center mb-6">
//       <div className="w-[380px] text-center py-3 rounded-xl bg-red-50 border border-red-300 text-red-700 font-bold text-lg shadow-sm">
//         Overdue Requests
//       </div>
//     </div>

//     <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
//       {overdueRequests.map(renderRequestCard)}
//     </div>

//     <hr className="my-10 border-gray-300" />
//   </>
// )}
//   {/* HIGH */}
// {highRequests.length > 0 && (
//   <>
//     <div className="flex justify-center mb-6">
//       <div className="w-[350px] text-center py-3 rounded-xl bg-red-50 border border-red-300 text-red-700 font-bold text-lg shadow-sm">
//         🔴 High Priority Requests
//       </div>
//     </div>

//     <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
//       {highRequests.map(renderRequestCard)}
//     </div>

//     <hr className="my-10 border-gray-300" />
//   </>
// )} {/* MEDIUM */}
// {/* MEDIUM */}
// {mediumRequests.length > 0 && (
//   <>
//     <div className="flex justify-center mt-10 mb-6">
//       <div className="w-[350px] text-center py-3 rounded-xl bg-orange-50 border border-orange-300 text-orange-700 font-bold text-lg shadow-sm">
//         🟠 Medium Priority Requests
//       </div>
//     </div>

//     <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
//       {mediumRequests.map(renderRequestCard)}
//     </div>

//     <hr className="my-10 border-gray-300" />
//   </>
// )}

//   {/* LOW */}
// {/* LOW */}
// {lowRequests.length > 0 && (
//   <>
//     <div className="flex justify-center mt-10 mb-6">
//       <div className="w-[350px] text-center py-3 rounded-xl bg-yellow-50 border border-yellow-300 text-yellow-700 font-bold text-lg shadow-sm">
//         🟡 Low Priority Requests
//       </div>
//     </div>

//     <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
//       {lowRequests.map(renderRequestCard)}
//     </div>

//     <hr className="my-10 border-gray-300" />
//   </>
// )}

// </div>
//             )}


//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Admin


















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";

function Admin() {
  const [users, setUsers] = useState([]);
  const [scheduleMap, setScheduleMap] = useState({});
  const [editingSchedule, setEditingSchedule] = useState({});
  const [showRequests, setShowRequests] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [requests, setRequests] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  const [locations, setLocations] = useState([]);
const [supervisors, setSupervisors] = useState([]);

const [selectedSupervisor, setSelectedSupervisor] =
  useState("");

const [selectedLocations, setSelectedLocations] =
  useState([]);
  // ================= USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get(Api.get_All_User);
      setUsers(res.data || []);

const onlySupervisors =
  res.data.filter(
    (u) => u.role === "supervisor"
  );

setSupervisors(onlySupervisors);
    } catch (err) {
      console.log(err);
    }
  };

 


  const fetchLocations = async () => {
  try {
    const res = await axios.get(
      Api.get_All_Locations
    );

    setLocations(res.data);

  } catch (err) {
    console.log(err);
  }
};
  // ================= REQUESTS =================
  const fetchRequests = async () => {
    try {
      const res = await axios.get(Api.get_All_Emg_Req);

      console.log("RAW RESPONSE:", res.data);

      const data =
        res.data?.data ||
        res.data?.requests ||
        res.data ||
        [];

      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setRequests([]);
    }
  };
useEffect(() => {
  fetchUsers();
  fetchLocations();
}, []);







 

  // ================= FINAL SORT =================
const filteredRequests = requests.filter((req) => {
  if (statusFilter === "All") {
    return req.status !== "Completed";
  }

  if (statusFilter === "Overdue") {
    return (
      req.isOverdue &&
      req.status !== "Completed"
    );
  }

  return req.status === statusFilter;
});


 const handleSchedule = async (id) => {
  try {

    const data = scheduleMap[id];

    if (!data?.date || !data?.time) {
toast.warning("Select Date & Time");    }

    const selectedTime = data.time;

    if (
      selectedTime < "08:00" ||
      selectedTime > "18:00"
    ) {
      toast.warning("Time must be between 8:00 AM and 6:00 PM");
    }

    await axios.put(`${Api.update_Emg_Order}/${id}`, 
      {
      scheduledDate: data.date,
      scheduledTime: data.time,
      status: "Scheduled",
    });

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id
            ? {
  ...req,
  scheduledDate: data.date,
  scheduledTime: data.time,
  status: "Scheduled",
  isOverdue: false,
}
            : req
        )
      );

      setEditingSchedule((prev) => ({
        ...prev,
        [id]: false,
      }));

      setScheduleMap((prev) => ({
        ...prev,
        [id]: {},
      }));

toast.success("Schedule updated successfully");    } catch (error) {
      console.log(error);
     toast.error("Schedule failed");
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`${Api.delete_User}/${id}`);

    toast.success("User deleted successfully");

    // UI update without reload
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user._id !== id)
    );

  } catch (error) {
    console.log(error);

 toast.error(
  error.response?.data?.message ||
  "Failed to delete user"
);
  }
};

  useEffect(() => {
  fetchRequests();
}, []);

const overdueRequests = filteredRequests
  .filter(
    (req) =>
      req.isOverdue &&
      req.status !== "Completed"
  )
  .sort((a, b) => {
    const priorityRank = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    const priorityDiff =
      (priorityRank[a.priority] || 999) -
      (priorityRank[b.priority] || 999);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return (
      new Date(a.createdAt) -
      new Date(b.createdAt)
    );
  });

  const sortByScheduleTime = (a, b) => {
  const dateA = a.scheduledDate
    ? new Date(
        `${a.scheduledDate}T${a.scheduledTime || "00:00"}`
      )
    : new Date(a.createdAt);

  const dateB = b.scheduledDate
    ? new Date(
        `${b.scheduledDate}T${b.scheduledTime || "00:00"}`
      )
    : new Date(b.createdAt);

  return dateA - dateB;
};
const highRequests = filteredRequests
  .filter(
    (req) =>
      req.priority === "High" &&
      (!req.isOverdue || req.status === "Completed")
  )
  .sort(sortByScheduleTime);

const mediumRequests = filteredRequests
  .filter(
    (req) =>
      req.priority === "Medium" &&
      (!req.isOverdue || req.status === "Completed")
  )
  .sort(sortByScheduleTime);

const lowRequests = filteredRequests
  .filter(
    (req) =>
      req.priority === "Low" &&
      (!req.isOverdue || req.status === "Completed")
  )
  .sort(sortByScheduleTime);
const displayedRequests = [...filteredRequests].sort((a, b) => {

  if (a.isOverdue && !b.isOverdue)
    return -1;

  if (!a.isOverdue && b.isOverdue)
    return 1;

  const priorityRank = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  return (
    (priorityRank[a.priority] || 999) -
    (priorityRank[b.priority] || 999)
  );
});


const renderRequestCard = (req) => (
  <div
    key={req._id}
    className="bg-white rounded-2xl border border-[#d6ddd2] p-6 hover:shadow-lg transition m-8"
  >
    {/* TOP */}
    <div className="flex justify-between items-start">
      <div>
        {/* <p className="text-xs uppercase tracking-wider text-gray-500">
          Request #{req._id.slice(-5)}
        </p> */}

       <div className="flex items-center min-w-0">
  <p
    className="
      font-bold text-green-700
      truncate
      w-full
    "
    title={req.location?.locationName}
  >
    📍 {req.location?.locationName}
  </p>
</div>
      </div>

      <span
        className={
          req.status === "Completed"
            ? "bg-green-500 text-white px-4 py-1 rounded-full"
            : req.status === "Scheduled"
            ? "bg-sky-500 text-white px-4 py-1 rounded-full"
            : req.status === "Pending"
            ? "bg-yellow-500 text-black px-4 py-1 rounded-full"
            : req.status === "Arrived"
            ? "bg-orange-500 text-white px-4 py-1 rounded-full"
            : "bg-gray-500 text-white px-4 py-1 rounded-full"
        }
      >
        {req.status}
      </span>

 {req.isOverdue &&
 req.status !== "Completed" && (
  <div className="mt-1">
    <span className="bg-red-600 text-white px-1 py-0 rounded-full text-xs font-bold ml-2">
      OVERDUE
    </span>
  </div>
)}
    </div>

    {/* INFO */}
    <div className="mt-5 space-y-2">
      <p>
        <span className="font-semibold">Priority:</span>{" "}
        {req.priority}
      </p>

      <p className="text-sm text-gray-500 mt-4">
        Created:
        {new Date(req.createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </p>
    </div>

    {/* Timeline */}
    <div className="mt-4 space-y-2 border-t pt-3">
      {req.arrivedAt && (
        <p className="text-sm text-yellow-700 font-medium">
          Arrived:{" "}
          {new Date(req.arrivedAt).toLocaleString("en-IN")}
        </p>
      )}

      {req.completedAt && (
        <p className="text-sm text-green-700 font-medium">
          Completed:{" "}
          {new Date(req.completedAt).toLocaleString("en-IN")}
        </p>
      )}
    </div>
{req.status === "Pending" &&
 req.status !== "Completed" &&
 !editingSchedule[req._id] && (
        <button
          onClick={() =>
            setEditingSchedule((prev) => ({
              ...prev,
              [req._id]: true,
            }))
          }
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl font-semibold"
        >
          Schedule Pickup
        </button>
      )}

{req.status !== "Completed" &&
 (req.status === "Scheduled" ||
  req.isOverdue) &&
 !editingSchedule[req._id] && (
        <>
          <div className="bg-sky-50 p-3 rounded-lg mb-3">
            <p className="text-sm text-sky-700 font-medium">
              Scheduled:
              {" "}
              {new Date(
                req.scheduledDate
              ).toLocaleDateString("en-IN")}
              {" | "}
              {req.scheduledTime}
            </p>
          </div>

         <button
  onClick={() =>
    setEditingSchedule((prev) => ({
      ...prev,
      [req._id]: true,
    }))
  }
  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold"
>
  {req.isOverdue
    ? "Reschedule Task"
    : "Update Schedule"}
</button>
        </>
      )}

    {req.status !== "Completed" &&
 editingSchedule[req._id] && (
      <div className="space-y-3 mt-3">
      <input
  type="date"
  min={new Date().toISOString().split("T")[0]}
  className="w-full border border-gray-300 rounded-lg p-2"
  value={scheduleMap[req._id]?.date || ""}
  onChange={(e) =>
    setScheduleMap((prev) => ({
      ...prev,
      [req._id]: {
        ...prev[req._id],
        date: e.target.value,
      },
    }))
  }
/>

        <input
  type="time"
  min="08:00"
  max="18:00"
  className="w-full border border-gray-300 rounded-lg p-2"
  value={scheduleMap[req._id]?.time || ""}
  onChange={(e) =>
    setScheduleMap((prev) => ({
      ...prev,
      [req._id]: {
        ...prev[req._id],
        time: e.target.value,
      },
    }))
  }
/>

        <button
          onClick={() => handleSchedule(req._id)}
          className="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-xl font-semibold"
        >
          {req.status === "Scheduled"
            ? "Save Update"
            : "Schedule"}
        </button>

        <button
          onClick={() =>
            setEditingSchedule((prev) => ({
              ...prev,
              [req._id]: false,
            }))
          }
          className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-xl font-semibold"
        >
          Cancel
        </button>
      </div>
    )}
  </div>
);


  return (
    <div className="min-h-screen bg-[#4CBB17]/20">

      <div >

        {/* HEADER */}
        {/* HEADER */}
       <div className="mb-8 bg-[#4CBB17]/40 px-4 md:px-6 py-3">
  <div className="flex items-center justify-between">

    {/* Logo */}
    <div>
      <h1 className="flex items-center gap-2 md:gap-3 text-3xl md:text-5xl font-extrabold text-green-900">
        <img
          src="/garbageVehicle.jpeg"
          alt=""
          className="w-10 h-10 md:w-16 md:h-16 object-contain"
        />
        CleanTrack
      </h1>

      <p className="text-gray-900 text-xs md:text-base mt-1">
        Smart Waste Management Control Center
      </p>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-3xl font-bold"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-8 text-lg font-semibold">

      <Link
        to="/create-account"
        className="text-green-900 hover:scale-105 transition"
      >
        Create User
      </Link>

      <button
        onClick={() => {
          setShowRequests(!showRequests);
          fetchRequests();
        }}
        className="text-green-900 hover:scale-105 transition"
      >
        View Requests
      </button>

      <Link
        to="/create-location"
        className="text-green-900 hover:scale-105 transition"
      >
        Create Locations
      </Link>

        <Link
        to="/see-all-locations"
        className="text-green-900 hover:scale-105 transition"
      >
        ALL Locations
      </Link>

      <Link
        to="/assign-location"
        className="text-green-900 hover:scale-105 transition"
      >
        Assign Zone
      </Link>

      <Link
        to="/days-report"
        className="text-green-900 hover:scale-105 transition"
      >
        Days Report
      </Link>

    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  {menuOpen && (
    <div className="md:hidden mt-4 flex flex-col gap-4 text-green-900 font-semibold">

      <Link
        to="/create-account"
        onClick={() => setMenuOpen(false)}
      >
        Create User
      </Link>

      <button
        className="text-left"
        onClick={() => {
          setShowRequests(!showRequests);
          fetchRequests();
          setMenuOpen(false);
        }}
      >
        View Requests
      </button>

      <Link
        to="/create-location"
        onClick={() => setMenuOpen(false)}
      >
        Create Locations
      </Link>

      <Link
        to="/see-all-locations"
        onClick={() => setMenuOpen(false)}
      >
        ALL Locations
      </Link>

      <Link
        to="/assign-location"
        onClick={() => setMenuOpen(false)}
      >
        Assign Zone
      </Link>

      <Link
        to="/days-report"
        onClick={() => setMenuOpen(false)}
      >
        Days Report
      </Link>

    </div>
  )}
</div>

        <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-black-900">
          Admin Dashboard
        </h1>
      </div>

        {/* USERS */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#d6ddd2] p-6 mb-8 m-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold text-green-900">
              User Management
            </h2>

            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              {users.length} Users
            </span>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="bg-green-900 text-white">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Role</th>
                   <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.mobile}
                    </td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center">
  <button
    onClick={() => handleDelete(user._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>
</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>




        {/* REQUESTS */}
    {showRequests && (
  <div className="px-3 sm:px-6 lg:px-8 pb-8">

    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
          Active Requests
        </h2>

        <p className="text-gray-500 text-sm">
          Pickup Scheduling & Monitoring
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-52 border border-gray-300 rounded-lg px-4 py-2 bg-white"
        >
          <option value="All">All Active</option>
          <option value="Pending">Pending</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>

        <div className="bg-white border border-[#d6ddd2] rounded-xl px-4 py-3 text-center">
          <span className="font-semibold">
            Total Requests:
          </span>{" "}
          {displayedRequests.length}
        </div>

      </div>

    </div>

    {displayedRequests.length === 0 ? (

      <div className="bg-white rounded-2xl border border-[#d6ddd2] p-8 text-center">
        No requests found
      </div>

    ) : (

      <div>

        {/* OVERDUE */}
        {(statusFilter === "All" ||
          statusFilter === "Overdue") &&
          overdueRequests.length > 0 && (
            <>

              <hr className="my-8" />

              <div className="flex justify-center mb-6">
                <div className="w-full max-w-sm text-center py-3 rounded-xl bg-red-50 border border-red-300 text-red-700 font-bold text-base sm:text-lg">
                  Overdue Requests
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {overdueRequests.map(renderRequestCard)}
              </div>

              <hr className="my-8" />

            </>
          )}

        {/* HIGH */}

        {statusFilter !== "Overdue" &&
          highRequests.length > 0 && (
            <>
              <div className="flex justify-center mb-6">

                <div className="w-full max-w-sm text-center py-3 rounded-xl bg-red-50 border border-red-300 text-red-700 font-bold text-base sm:text-lg">
                  🔴 High Priority Requests
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {highRequests.map(renderRequestCard)}
              </div>

              <hr className="my-8" />
            </>
          )}

        {/* MEDIUM */}

        {statusFilter !== "Overdue" &&
          mediumRequests.length > 0 && (
            <>
              <div className="flex justify-center mt-8 mb-6">

                <div className="w-full max-w-sm text-center py-3 rounded-xl bg-orange-50 border border-orange-300 text-orange-700 font-bold text-base sm:text-lg">
                  🟠 Medium Priority Requests
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {mediumRequests.map(renderRequestCard)}
              </div>

              <hr className="my-8" />
            </>
          )}

        {/* LOW */}

        {statusFilter !== "Overdue" &&
          lowRequests.length > 0 && (
            <>
              <div className="flex justify-center mt-8 mb-6">

                <div className="w-full max-w-sm text-center py-3 rounded-xl bg-yellow-50 border border-yellow-300 text-yellow-700 font-bold text-base sm:text-lg">
                  🟡 Low Priority Requests
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {lowRequests.map(renderRequestCard)}
              </div>

              <hr className="my-8" />
            </>
          )}

      </div>

    )}

  </div>
)}

      </div>

    </div>
  );
}

export default Admin







