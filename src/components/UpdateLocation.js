import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateLocation() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        locationName: "",
        zone: "",
        latitude: "",
        longitude: ""
    });
useEffect(() => {
    const loadData = async () => {
        try {
            const res = await axios.get(`${Api.get_Single_Location}/${id}`);
            setForm(res.data?.location || res.data);
        } catch {
            toast.error("Failed to load location");
        }
    };

    loadData();
}, [id]);
    // // LOAD SINGLE DATA
    // const loadData = async () => {
    //     try {
    //         const res = await axios.get(
    //             `${Api.get_Single_Location}/${id}`
    //         );

    //         // 🔥 IMPORTANT FIX (YOUR BACKEND SHAPE)
    //         setForm(res.data?.location || res.data);

    //     } catch {
    //         toast.error("Failed to load location");
    //     }
    // };

    // useEffect(() => {
    //     loadData();
    // }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${Api.update_Locations}/${id}`,
                form
            );

            toast.success("Updated successfully");

            navigate("/see-all-locations");

        } catch {
            toast.error("Update failed");
        }
    };

 return (
  <div className="min-h-screen bg-[#4CBB17]/20">

    {/* HEADER (UNCHANGED) */}
    <div className="bg-[#4CBB17]/40 px-6 sm:px-8 py-4 shadow-md">
      <h1 className="flex items-center gap-3 text-2xl sm:text-4xl font-extrabold text-green-900">
        <img
          src="/garbageVehicle.jpeg"
          alt="CleanTrack Logo"
          className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        />
        CleanTrack
      </h1>

      <p className="text-gray-800 mt-1 text-sm sm:text-base">
        Smart Waste Management Control Center
      </p>
    </div>

    {/* FORM WRAPPER */}
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-5 sm:p-6 rounded-xl shadow-lg"
      >

        <h2 className="text-lg sm:text-xl font-bold mb-5 text-center">
          Update Location
        </h2>

        <input
          name="locationName"
          value={form.locationName}
          onChange={handleChange}
          className="border w-full p-3 mb-3 rounded-md text-sm sm:text-base"
          placeholder="Location Name"
        />

        <input
          name="zone"
          value={form.zone}
          onChange={handleChange}
          className="border w-full p-3 mb-3 rounded-md text-sm sm:text-base"
          placeholder="Zone"
        />

        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          className="border w-full p-3 mb-3 rounded-md text-sm sm:text-base"
          placeholder="Latitude"
        />

        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          className="border w-full p-3 mb-4 rounded-md text-sm sm:text-base"
          placeholder="Longitude"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition text-white w-full py-3 rounded-md font-semibold"
        >
          Update
        </button>

      </form>

    </div>
  </div>
);
}