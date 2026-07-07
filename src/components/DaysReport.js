
import React, { useEffect, useState } from "react";
import axios from "axios";
import Api from "../api/Api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";


 function DaysReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
const [reportGenerated, setReportGenerated] = useState(false);
  const [allRequests, setAllRequests] =
    useState([]);
    const [generatedStatus, setGeneratedStatus] = useState("");

  const [filteredData, setFilteredData] =
    useState([]);
  const [statusFilter, setStatusFilter] =
    useState("All");
const today = new Date().toISOString().split("T")[0];
  const fetchCompletedRequests =
    async () => {
      try {
        const res = await axios.get(
          Api.get_All_Emg_Req
        );

        const data =
          res.data?.data ||
          res.data?.requests ||
          res.data ||
          [];

        setAllRequests(data);

      } catch (err) {
  console.log(err);
  toast.error("Failed to fetch requests");
}
    };

  useEffect(() => {
    fetchCompletedRequests();
  }, []);

const handleSearch = () => {

  if (!fromDate || !toDate) {
    return toast.warning("Select From and To Date");
  }

  const today = new Date().toISOString().split("T")[0];

  if (fromDate > today || toDate > today) {
    return toast.warning("Future dates are not allowed.");
  }

  if (fromDate > toDate) {
    return toast.warning("From Date cannot be later than To Date.");
  }


  const filtered = allRequests.filter((req) => {

    const requestDate = req.createdAt
      ? new Date(req.createdAt)
      : null;


    const dateMatch =
      requestDate &&
      requestDate >= new Date(fromDate) &&
      requestDate <= new Date(`${toDate}T23:59:59`);


    let statusMatch = true;


    if (statusFilter === "All") {
      statusMatch = req.status !== "Completed";
    } 
    else if (statusFilter === "Completed") {
      statusMatch = req.status === "Completed";
    }


    return dateMatch && statusMatch;

  });


  setFilteredData(filtered);

  // report generate hone ke baad hi show hoga
setFilteredData(filtered);
setReportGenerated(true);
setGeneratedStatus(statusFilter);

toast.success(
  `Report generated successfully (${filtered.length} records)`
);


};

    const downloadPDF = () => {

      if (filteredData.length === 0) {
      return toast.warning("No Records can't Generate report");
      }

      const doc = new jsPDF();

      doc.setFontSize(18);

      doc.text(
        "CleanTrack Report",
        14,
        15
      );

 autoTable(doc, {
  startY: 25,

  head: [[
    "Location",
    "Priority",
    "Created",
    "Scheduled",
    "Arrived",
    "Completed"
  ]],

  body: filteredData.map((req) => [
    req.location?.locationName || "-",
    req.priority || "-",
    formatDateTime(req.createdAt),
    req.scheduledDate && req.scheduledTime
      ? formatDateTime(
          `${req.scheduledDate}T${req.scheduledTime}`
        )
      : "-",
    formatDateTime(req.arrivedAt),
    formatDateTime(req.completedAt),
  ]),
});

     doc.save(`Report_${fromDate}_${toDate}.pdf`);
toast.success("PDF downloaded successfully");
    };



const formatDateTime = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

        return (
          <div className="bg-[#4CBB17]/20">
      <div className="min-h-screen bg-green-50 ">
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
        <div className="max-w-7xl mx-auto mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h1 className="text-4xl font-bold text-green-900 mb-6">
              Days Report
            </h1>
            <div className="grid md:grid-cols-3 gap-4">

              {/* From Date */}
              <div>
                <label className="font-semibold block mb-2">
                  From Date
                </label>

     <input
  type="date"
  value={fromDate}
  max={today}
  onChange={(e) => setFromDate(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
              </div>

              {/* To Date */}
              <div>
                <label className="font-semibold block mb-2">
                  To Date
                </label>
<input
  type="date"
  value={toDate}
  max={today}
  min={fromDate}
  onChange={(e) => setToDate(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
              </div>

              {/* Status */}
              <div>
                <label className="font-semibold block mb-2">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                >
                <option value="All">All Active</option>
<option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">

              <button
                onClick={handleSearch}
                className="bg-green-800 text-white py-3 px-8 rounded-lg hover:bg-green-900"
              >
                Generate Report
              </button>

              <button
                onClick={downloadPDF}
                className="bg-red-700 text-white py-3 px-8 rounded-lg hover:bg-red-800"
              >
                Download PDF
              </button>

            </div>
          </div>
{reportGenerated && (

<div className="bg-white rounded-2xl shadow-lg p-6">


<div className="flex justify-between mb-6">

<h2 className="text-2xl font-bold text-green-900">
{
 generatedStatus === "Completed"
 ? "Completed Records"
 : "Active Records"
}

</h2>


<span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
Total: {filteredData.length}
</span>


</div>


{
filteredData.length === 0 ? (

<div className="text-center py-10 text-gray-500">
No records found
</div>

) : (
              <div className="overflow-x-auto">

                <table className="w-full border">

                  <thead>
                    <tr className="bg-green-900 text-white">
                      <th className="p-3 text-center">Location</th>
                      <th className="p-3 text-center">Priority</th>
                      <th className="p-3 text-center">Created</th>
                      <th className="p-3 text-center">Scheduled</th>
                      <th className="p-3 text-center">Arrived</th>
                      <th className="p-3 text-center">Completed</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((req) => (
                      <tr
                        key={req._id}
                        className="border-b hover:bg-green-50 text-center"
                      >
                      <td className="p-3">
  {req.location?.locationName || "-"}
</td>
<td className="p-3">
  {req.priority || "-"}
</td>

                      <td className="p-3">
  {formatDateTime(req.createdAt)}
</td>

                       <td className="p-3">
  {req.scheduledDate && req.scheduledTime
    ? formatDateTime(
        `${req.scheduledDate}T${req.scheduledTime}`
      )
    : "-"}
</td>

                        <td className="p-3">
                          {formatDateTime(req.arrivedAt)}
                        </td>

                        <td className="p-3 text-green-700 font-semibold">
                          {formatDateTime(req.completedAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </div>
)}
        </div>
      </div>
      </div>
    );
}

  export default DaysReport;