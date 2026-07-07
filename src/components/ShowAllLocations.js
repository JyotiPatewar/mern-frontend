
import { useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ShowAllLocations() {
  const [zone, setZone] = useState("");
  const [locations, setLocations] = useState([]);
  const [supervisor, setSupervisor] = useState("");
const [search, setSearch] = useState("");
const [filteredLocations, setFilteredLocations] = useState([]);
const [isShown, setIsShown] = useState(false);
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleShow = async () => {
  if (!zone) return toast.warning("Please select a zone");

  setIsShown(true);
  setLoading(true);

  try {
    const res = await axios.get(
      `${Api.get_Locations_By_Zone}/${encodeURIComponent(zone)}`
    );

    setSupervisor(res.data?.supervisor || "No Supervisor Assigned");

    const sorted = (res.data?.locations || []).sort((a,b)=>
      a.locationName.localeCompare(
        b.locationName,
        undefined,
        {
          numeric:true,
          sensitivity:"base"
        }
      )
    );

    setLocations(sorted);
    setFilteredLocations(sorted);

  } catch(err) {
    toast.error("Failed to load locations");
  } finally {
    setLoading(false);
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
  onChange={(e) => {
    setZone(e.target.value);
    setSearch("");
    setLocations([]);
    setFilteredLocations([]);
    setIsShown(false);
    setSupervisor("");
  }}
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

      {locations.length > 0 && (
<div className="flex justify-center mt-5 px-4">

<input
  type="text"
  placeholder="Search location..."
  value={search}
  onChange={(e)=>{

    const value=e.target.value;
    setSearch(value);

  if(value.length < 1){
  setFilteredLocations(locations);
  return;
}

  const result = locations.filter((loc) => {

  const name = String(loc.locationName).toLowerCase();
  const searchValue = String(value).toLowerCase();

  return name.includes(searchValue);

});

    setFilteredLocations(result);

  }}
  className="border p-2 rounded w-full sm:w-96"
/>

</div>
)}

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

{!isShown ? (

<tr>
<td colSpan="2" className="p-5 text-gray-600 font-semibold">
Please select a zone and click Show
</td>
</tr>

) : loading ? (

<tr>
<td colSpan="2" className="p-5 text-blue-600 font-semibold">
Loading locations...
</td>
</tr>

) : filteredLocations.length > 0 ? (

filteredLocations.map((loc)=>(

<tr key={loc._id} className="border">

<td className="p-3 font-medium">
{loc.locationName}
</td>

<td className="p-3">
<div className="flex justify-center gap-2">

<button
onClick={() => navigate(`/create-location/${loc._id}`)}
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

))

) : (

<tr>
<td colSpan="2" className="p-5 text-red-600 font-semibold">
No Location Found
</td>
</tr>

)}

</tbody>

        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden px-4 mt-6 space-y-3">
{!isShown ? (

<div className="bg-white rounded shadow p-4 text-center text-gray-600 font-semibold">
Please select a zone and click Show
</div>

) : loading ? (

<div className="bg-white rounded shadow p-4 text-center text-blue-600 font-semibold">
Loading locations...
</div>

) : filteredLocations.length > 0 ? (

filteredLocations.map((loc)=>(
          <div
            key={loc._id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >

            <div className="font-semibold text-gray-800">
              {loc.locationName}
            </div>

            <div className="flex gap-2">

            <button
  onClick={() => navigate(`/create-location/${loc._id}`)}
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
          ))

) : (

<div className="bg-white rounded shadow p-4 text-center text-red-600 font-semibold">
No Location Found
</div>

)}
        

      </div>

    </div>
  );
}