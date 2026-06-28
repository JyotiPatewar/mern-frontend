// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Api from "../api/Api";
// import { Link } from "react-router-dom";

// export default function DriverDashboard() {
//   const [tasks, setTasks] = useState([]);
//   const uniqueTasks = [
//   ...new Map(
//     tasks.map((item) => [item._id, item])
//   ).values(),
// ];
// const overdueTasks = uniqueTasks.filter(
//   (task) => task.isOverdue
// );

// const todayTasks = uniqueTasks.filter(
//   (task) => !task.isOverdue
// );
//   const navigate = useNavigate();

//   const getTasks = async () => {
//     try {
//       const res = await axios.get(
//         Api.get_Todays_Task
//       );
//       console.log(res);

//       setTasks(res.data.requests);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#4CBB17]/20">
//    <div className="mb-8 bg-[#4CBB17]/40 px-8 py-2 flex justify-between items-center">
//   <div>
//     <h1 className="flex items-center gap-3 text-5xl font-extrabold text-green-900">
//       <img
//         src="garbageVehicle.jpeg"
//         alt="CleanTrack Logo"
//         className="w-16 h-16 object-contain"
//       />
//       CleanTrack
//     </h1>

//     <p className="text-gray-900 p-2">
//       Smart Waste Management Control Center
//     </p>
//   </div>

// <Link
//   to="/driver-completed-tasks"
//                 className="text-green-900 font-extrabold text-xl semibold hover:text-white-900 transition-all duration-300 hover:scale-105"
// >
//   Completed Tasks
// </Link>
// </div>

//  <div className="text-center mb-10">
//         <h1 className="text-5xl font-extrabold text-black-900">
//           Driver Dashboard
//         </h1>
//       </div>
//    {overdueTasks.length > 0 && (
//   <>
//     <div className="text-center mb-6">
//       <h1 className="text-4xl font-extrabold text-red-600">
//         🚨 Yesterday Pending Tasks
//       </h1>
//     </div>

//     <div className="space-y-5 p-8">
//       {overdueTasks.map((task) => (
//         <div
//           key={task._id}
//           className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-lg p-6 flex justify-between items-center"
//         >
//           <div>
//             <p className="text-sm text-red-700 font-bold">
//               OVERDUE TASK
//             </p>

//             <p className="font-bold text-green-700">
//               📍 {task.location?.locationName}
//             </p>

//             <p className="text-red-600 mt-2">
//               Scheduled:
//               {" "}
//               {new Date(
//                 task.scheduledDate
//               ).toLocaleDateString("en-IN")}
//               {" | "}
//               {task.scheduledTime}
//             </p>
//           </div>

//           <button
//             onClick={() =>
//               navigate(`/driver-route/${task._id}`)
//             }
//             className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold"
//           >
//             Start Route
//           </button>
//         </div>
//       ))}
//     </div>
//   </>
// )}

// <div className="text-center mb-10">
//   <h1 className="text-5xl font-extrabold text-green-900">
//     Today's Tasks
//   </h1>
// </div>

//       {todayTasks.length === 0 ? (
//         <div className="bg-white p-10 rounded-2xl text-center shadow m-8">
//           <h2 className="text-2xl font-bold text-gray-500">
//             No Tasks Available
//           </h2>
//         </div>
//       ) : (
//         <div className="space-y-5 p-8">
//          {todayTasks.map((task) => (
//             <div
//               key={task._id}
//               className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center"
//             >
//               <div>
//            <p className="text-sm text-gray-600 mb-2">
//   <span className="font-bold text-gray-700">
//     Request ID:
//   </span>{" "}
//   #{task._id.slice(-4)}
// </p>

//                 <p className="font-bold text-green-700">
//                   📍 {task.location?.locationName}
//                 </p>

//                 <p className="mt-2 text-gray-600">
//                   Created :
//                   {" "}
//                   {new Date(task.createdAt).toLocaleString()}
//                 </p>
//                  <p className="text-sm text-sky-700 mt-2 font-medium">
//      Scheduled:
//     {" "}
//     {new Date(task.scheduledDate).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     })}
//     {" | "}
//     {task.scheduledTime}
//   </p>
//               </div>

//              <button
//   onClick={() => navigate(`/driver-route/${task._id}`)
//   }
//   className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
// >
//   Start Route
// </button>

//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



























import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function DriverDashboard() {
  const [tasks, setTasks] = useState([]);
  const uniqueTasks = [
  ...new Map(
    tasks.map((item) => [item._id, item])
  ).values(),
];
const overdueTasks = uniqueTasks
  .filter((task) => task.isOverdue)
  .sort((a, b) => {
    const priorityRank = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    const priorityDiff =
      (priorityRank[a.priority] || 999) -
      (priorityRank[b.priority] || 999);

    if (priorityDiff !== 0)
      return priorityDiff;

    return (
      new Date(a.createdAt) -
      new Date(b.createdAt)
    );
  });

const todayTasks = uniqueTasks
  .filter((task) => !task.isOverdue)
  .sort((a, b) => {
    const aDateTime = new Date(
      `${a.scheduledDate?.split("T")[0]}T${a.scheduledTime || "00:00"}`
    );

    const bDateTime = new Date(
      `${b.scheduledDate?.split("T")[0]}T${b.scheduledTime || "00:00"}`
    );

    return aDateTime - bDateTime; // Ascending order
  });
  const navigate = useNavigate();

 const getTasks = async () => {
  try {
    const res = await axios.get(Api.get_Todays_Task);

    if (res.data.success) {
      setTasks(res.data.requests);
    } else {
      toast.error("Failed to load tasks");
    }
  } catch (error) {
    console.log(error);
    toast.error("Unable to fetch today's tasks");
  }
};
  useEffect(() => {
    getTasks();
  }, []);

return (
  <div className="min-h-screen bg-[#4CBB17]/20">

    {/* HEADER */}
    <div className="bg-[#4CBB17]/40 px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="text-center md:text-left">
          <h1 className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-2xl sm:text-3xl md:text-5xl font-extrabold text-green-900">
            <img
              src="garbageVehicle.jpeg"
              alt="logo"
              className="w-10 h-10 md:w-16 md:h-16"
            />
            CleanTrack
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-800 mt-1">
            Smart Waste Management Control Center
          </p>
        </div>

        <Link
          to="/driver-completed-tasks"
          className="bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition"
        >
          Completed Tasks
        </Link>

      </div>
    </div>

    {/* TITLE */}
    <div className="bg-green-700 text-white py-3 shadow-lg">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold">
        Driver Dashboard
      </h1>
    </div>

    {/* OVERDUE */}
    {overdueTasks.length > 0 && (
      <>
        <div className="text-center my-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600">
            Pending Tasks
          </h1>
        </div>

        <div className="space-y-4 px-3 sm:px-5 md:px-8">

          {overdueTasks.map((task) => (
            <div
              key={task._id}
              className="bg-red-50 border-2 border-red-300 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row justify-between gap-5"
            >

              <div className="flex-1">

                <p className="text-red-700 font-bold text-sm">
                  OVERDUE TASK
                </p>

                <p className="font-bold text-green-700 text-lg break-words">
                  📍 {task.location?.locationName}
                </p>

                <p className="text-gray-600 mt-2 text-sm">
                  Created :
                  {new Date(task.createdAt).toLocaleString()}
                </p>

                <p className="text-red-600 mt-2 text-sm">
                  Scheduled :
                  {new Date(task.scheduledDate).toLocaleDateString("en-IN")}
                  {" | "}
                  {task.scheduledTime}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(`/driver-route/${task._id}`)
                }
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Start Route
              </button>

            </div>
          ))}
        </div>
      </>
    )}

    {/* TODAY */}

    <div className="text-center my-8">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-green-900">
        Today's Tasks
      </h1>
    </div>

    {todayTasks.length === 0 ? (
      <div className="bg-white rounded-2xl shadow p-8 mx-3 md:mx-8 text-center">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-500">
          No Tasks Available
        </h2>
      </div>
    ) : (
      <div className="space-y-4 px-3 sm:px-5 md:px-8">

        {todayTasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row justify-between gap-5"
          >

            <div className="flex-1">

              <p className="font-bold text-green-700 text-lg break-words">
                📍 {task.location?.locationName}
              </p>

              <p className="mt-2 text-gray-600 text-sm">
                Created :
                {new Date(task.createdAt).toLocaleString()}
              </p>

              <p className="mt-2 text-sky-700 text-sm font-medium">
                Scheduled :
                {new Date(task.scheduledDate).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
                {" | "}
                {task.scheduledTime}
              </p>

            </div>

            <button
              onClick={() =>
                navigate(`/driver-route/${task._id}`)
              }
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Start Route
            </button>

          </div>
        ))}

      </div>
    )}

  </div>
);
}