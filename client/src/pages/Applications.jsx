import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
    loadingApplications
  } = useContext(AppContext);

  // filter applied jobs
  const filteredApplications = userApplications.filter(
    (application) => application?.jobId
  );

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select resume"}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 border border-green-400 px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 px-4 py-2 rounded-lg text-blue-600"
                href={userData?.resume}
                target="_blank"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="border border-gray-300 text-gray-500 px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full border bg-white rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-2 sm:px-4 border-b text-left">Company</th>
              <th className="py-3 px-2 sm:px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-2 sm:px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              loadingApplications ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    <div className="flex justify-center items-center">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) :
                filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((job, index) => (
                    <tr key={index}>
                      <td className="py-2 px-2 sm:px-4 border-b">
                        <div className="flex items-center gap-3">
                          <img
                            className="hidden md:block w-10 h-10 rounded-full object-cover"
                            src={job.companyId.image}
                            alt=""
                          />

                          <span>{job.companyId.name}</span>
                        </div>
                      </td>

                      <td className="py-2 px-2 sm:px-4 border-b">
                        {job.jobId.title}
                      </td>

                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {job.jobId.location}
                      </td>

                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {moment(job.date).format("ll")}
                      </td>

                      <td className="py-2 px-2 sm:px-4 border-b">
                        <span
                          className={`${job.status === "Accepted"
                            ? "bg-green-100"
                            : job.status === "Rejected"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                            } px-4 py-1.5 rounded`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;