import { useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";

export default function ViewLocations() {

  const [zone, setZone] = useState("");
  const [locations, setLocations] = useState([]);
  const [supervisor, setSupervisor] = useState("");

  const handleShow = async () => {
   if (!zone) {
  toast.warning("Please select a zone");
  return;
}

   try {
  const res = await axios.get(
    `${Api.get_Locations_By_Zone}/${encodeURIComponent(zone)}`
  );

  setSupervisor(res.data.supervisor);
  setLocations(res.data.locations);

  toast.success("Locations loaded successfully");
} catch (err) {
  toast.error(
    err.response?.data?.message || "Failed to load locations"
  );
}
  };

  return (
    <div className="bg-[#4CBB17]/20">
    <div className="min-h-screen mx-auto ">
  <div className="bg-[#4CBB17]/40 px-4 py-4 sm:px-6 lg:px-8">
  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
    <img
      src="garbageVehicle.jpeg"
      alt="CleanTrack Logo"
      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
    />

    <div className="text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-900">
        CleanTrack
      </h1>

      <p className="text-sm sm:text-base text-gray-900 mt-1">
        Smart Waste Management Control Center
      </p>
    </div>
  </div>
</div>

<div className="max-w-6xl mx-auto px-4 py-6">

  {/* Heading */}
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-green-700 mb-8">
    📍 See the MANIT Locations
  </h1>

  {/* Zone Selection */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

    <select
      value={zone}
      onChange={(e) => setZone(e.target.value)}
      className="w-full sm:w-72 border rounded-lg px-4 py-3"
    >
      <option value="">Select Zone</option>
      <option>Hostel Zone 1</option>
      <option>Hostel Zone 2</option>
      <option>Academic Zone</option>
      <option>Colony Zone</option>
    </select>

    <button
      onClick={handleShow}
      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition"
    >
      Show
    </button>

  </div>

  {/* Locations */}
  {locations.length > 0 && (

    <div className="mt-10 flex flex-col items-center">

      {/* Supervisor */}
      <div className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        Supervisor :
        <span className="text-blue-700 ml-2">
          {supervisor}
        </span>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">

        {locations.map((loc) => (

          <div
            key={loc._id}
            className="w-full max-w-xs bg-green-50 border border-green-300 rounded-xl p-4 shadow-md text-center font-medium hover:bg-green-100 hover:shadow-lg transition"
          >
            📍 {loc.locationName}
          </div>

        ))}

      </div>

    </div>

  )}

</div>
</div>
    </div>
  );
}