// import { useState } from "react";
// import axios from "axios";
// import Api from "../api/Api";
// import { toast } from "react-toastify";

// export default function ViewLocations() {

//   const [zone, setZone] = useState("");
//   const [locations, setLocations] = useState([]);
//   const [supervisor, setSupervisor] = useState("");

//   const handleShow = async () => {
//    if (!zone) {
//   toast.warning("Please select a zone");
//   return;
// }

//    try {
//   const res = await axios.get(
//     `${Api.get_Locations_By_Zone}/${encodeURIComponent(zone)}`
//   );

//   setSupervisor(res.data.supervisor);
//   setLocations(res.data.locations);

//   toast.success("Locations loaded successfully");
// } catch (err) {
//   toast.error(
//     err.response?.data?.message || "Failed to load locations"
//   );
// }
//   };



//   const handleUpdate = async (id, currentName) => {
//   const newName = prompt("Enter new location name", currentName);

//   if (!newName || newName.trim() === "") return;

//   try {
//     const res = await axios.put(
//       `${Api.updatw_Locations}/${id}`,
//       {
//         locationName: newName.trim(),
//       }
//     );

//     toast.success(res.data.message);

//     setLocations((prev) =>
//       prev.map((loc) =>
//         loc._id === id
//           ? { ...loc, locationName: newName.trim() }
//           : loc
//       )
//     );
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Update Failed");
//   }
// };



// const handleDelete = async (id) => {
//   if (!window.confirm("Delete this location?")) return;

//   try {
//     const res = await axios.delete(
//       `${Api.delete_Locations}/${id}`
//     );

//     toast.success(res.data.message);

//     setLocations((prev) =>
//       prev.filter((loc) => loc._id !== id)
//     );
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Delete Failed");
//   }
// };

//   return (
//     <div className="bg-[#4CBB17]/20">
//     <div className="min-h-screen mx-auto ">
//   <div className="bg-[#4CBB17]/40 px-4 py-4 sm:px-6 lg:px-8">
//   <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
//     <img
//       src="garbageVehicle.jpeg"
//       alt="CleanTrack Logo"
//       className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
//     />

//     <div className="text-center sm:text-left">
//       <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900">
//         CleanTrack
//       </h1>

//       <p className="text-sm sm:text-base text-gray-900 mt-1">
//         Smart Waste Management Control Center
//       </p>
//     </div>
//   </div>
// </div>

// <div className="max-w-6xl mx-auto px-4 py-6">

//   {/* Heading */}
//   <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-green-700 mb-8">
//     📍 See the MANIT Locations
//   </h1>

//   {/* Zone Selection */}
//   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

//     <select
//       value={zone}
//       onChange={(e) => setZone(e.target.value)}
//       className="w-full sm:w-72 border rounded-lg px-4 py-3"
//     >
//       <option value="">Select Zone</option>
//       <option>Hostel Zone 1</option>
//       <option>Hostel Zone 2</option>
//       <option>Academic Zone</option>
//       <option>Colony Zone</option>
//     </select>

//     <button
//       onClick={handleShow}
//       className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
//     >
//       Show
//     </button>

//   </div>

//   {/* Locations */}
//   {locations.length > 0 && (

//     <div className="mt-10 flex flex-col items-center">

      // {/* Supervisor */}
      // <div className="text-xl sm:text-2xl font-semibold mb-6 text-center">
      //   Supervisor :
      //   <span className="text-blue-700 ml-2">
      //     {supervisor}
      //   </span>
      // </div>

//       {/* Location Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">

//         {locations.map((loc) => (

//        <div
//   key={loc._id}
//   className="w-full max-w-xs bg-green-50 border border-green-300 rounded-xl p-4 shadow-md"
// >
//   <h3 className="text-lg font-semibold text-center mb-4">
//     📍 {loc.locationName}
//   </h3>

//   <div className="flex gap-3">
//     <button
//       onClick={() => handleUpdate(loc._id, loc.locationName)}
//       className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
//     >
//       Update
//     </button>

//     <button
//       onClick={() => handleDelete(loc._id)}
//       className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
//     >
//       Delete
//     </button>
//   </div>
// </div>

//         ))}

//       </div>

//     </div>

//   )}

// </div>
// </div>
//     </div>
//   );
// }






import { useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ShowAllLocations() {
  const [zone, setZone] = useState("");
  const [locations, setLocations] = useState([]);
  const [supervisor, setSupervisor] = useState("");

  const navigate = useNavigate();

const handleShow = async () => {
  if (!zone) return toast.warning("Please select a zone");

  try {
    const res = await axios.get(
      `${Api.get_Locations_By_Zone}/${encodeURIComponent(zone)}`
    );

    console.log("API RESPONSE:", res.data);

    setSupervisor(res.data?.supervisor || "No Supervisor Assigned");
    setLocations(res.data?.locations || []);

  } catch (err) {
    toast.error("Failed to load locations");
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this location?")) return;

    try {
      await axios.delete(`${Api.delete_Locations}/${id}`);
      toast.success("Deleted");

      setLocations((prev) => prev.filter((l) => l._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-100">

      {/* HEADER */}
      <div className="mb-6 bg-[#4CBB17]/40 px-4 py-3 lg:px-8">
        <h1 className="flex items-center justify-center lg:justify-start gap-3 text-3xl lg:text-5xl font-extrabold text-green-900">
          <img
            src="garbageVehicle.jpeg"
            className="w-12 h-12 lg:w-16 lg:h-16"
            alt=""
          />
          CleanTrack
        </h1>
        <p className="text-gray-900 mt-1 text-center lg:text-left">
          Smart Waste Management Control Center
        </p>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center mt-4">
        All Locations
      </h1>

      {/* FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-5 px-4">

        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        >
          <option value="">Select Zone</option>
          <option>Hostel Zone 1</option>
          <option>Hostel Zone 2</option>
          <option>Academic Zone</option>
          <option>Colony Zone</option>
        </select>

        <button
          onClick={handleShow}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Show
        </button>
      </div>

      {/* SUPERVISOR (CENTERED ALWAYS) */}
     {supervisor && (
  <div className="text-center text-lg font-semibold mt-4">
    Supervisor:
    <span className="text-blue-700 ml-2">
      {supervisor}
    </span>
  </div>
)}

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block px-6 mt-6">

        <table className="w-full bg-white shadow rounded text-center">

          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">Location</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {locations.map((loc) => (
              <tr key={loc._id} className="border">

                <td className="p-3 font-medium">
                  {loc.locationName}
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() =>
                        navigate(`/update-location/${loc._id}`)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(loc._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden px-4 mt-6 space-y-3">

        {locations.map((loc) => (
          <div
            key={loc._id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >

            <div className="font-semibold text-gray-800">
              {loc.locationName}
            </div>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  navigate(`/update-location/${loc._id}`)
                }
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(loc._id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Del
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}