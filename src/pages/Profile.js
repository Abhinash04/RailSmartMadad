import React, { useState, useRef } from "react";
import img from "../assets/images/profileimg.png";
import img1 from "../assets/images/User2.png";
import { FaCog } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../components/Loader";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("trackConcern");
  const [file, setFile] = useState();
  const { auth } = useAuthStore(state => ({
    auth: state.auth
  }));
  
  const [loading, setLoading] = useState(false);
  const [{ isLoading: fetchLoading, apiData, serverError }] = useFetch(auth.username ? `user/${auth.username}` : null);
  const fileInputRef = useRef(null);
  
  const formik = useFormik({
    initialValues: {
      username: apiData?.username || '',
      firstname: apiData?.firstname || '',
      lastname: apiData?.lastname || '',
      email: apiData?.email || '',
      phNo: apiData?.phNo || '',
      address: apiData?.address || '',
      profile: apiData?.profile || ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phNo: Yup.string().required("Phone Number is required"),
    }),
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('Form is submitting...'); 
      values.profile = file || apiData.profile || '';
      console.log('Updated values:', values);
      try {
        await updateUser(values);
        toast.success('Updated Successfully');
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Could not update!");
      }
    }
  });
  
  const onUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      const base64 = await convertToBase64(selectedFile);
      setFile(base64);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  if (loading) return <Loader />; // Display loader if form submission is in progress
  if (fetchLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>; 

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1200px] mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col gap-6 mt-[100px]">
        <div className="relative h-[600px] lg:h-auto">
          <img src={img} alt="Profile"
            className="w-full h-full flex object-cover rounded-xl"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
          <div className="absolute top-4 right-4">
            {/* Dialog Button */}
            <button
              aria-haspopup="dialog"
              aria-expanded={isDialogOpen}
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full p-2 bg-white shadow hover:shadow-md"
            >
              <FaCog className="h-6 w-6 text-gray-500" />
              <span className="sr-only text-[#762626]">Edit profile</span>
            </button>

            {/* Dialog */}
            {isDialogOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              >
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative">
                  <div className="p-4 border-b">
                    <h2 id="dialog-title" className="text-lg font-semibold text-[#762626]">
                      EDIT PROFILE
                    </h2>
                    <p className="text-sm text-gray-600">
                      Make changes to your profile here. Click save when you're done.
                    </p>
                  </div>

                  {/* Close Icon */}
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                  </button>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="p-3">
                      <div className="flex flex-col items-center">
                        <img
                          src={apiData?.profile || file || img1}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover cursor-pointer"
                          onClick={handleProfileImageClick}
                        />
                        <input
                          type="file"
                          id="profile"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={onUpload}
                        />
                        <button type="button" className="text-sm underline mb-2" onClick={handleProfileImageClick}>
                          Edit Image ✏️
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="username" className="text-right">
                          USERNAME
                        </label>
                        <input
                          {...formik.getFieldProps('username')}
                          type="text"
                          id="username"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="phone" className="text-right">
                          PHONE
                        </label>
                        <input
                          {...formik.getFieldProps('phNo')} 
                          type="text"
                          id="phone"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="email" className="text-right">
                          E-MAIL
                        </label>
                        <input
                          {...formik.getFieldProps('email')}
                          type="text"
                          id="email"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end p-4 border-t">
                      <button
                        type="submit"
                        className="bg-[#762626] text-white px-4 py-2 rounded hover:bg-[#D88080]"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-[100px]">
        <div className="tabs">
          <div className="tabs-list flex" role="tablist" aria-label="Profile Tabs">
            <button
              role="tab"
              aria-selected={activeTab === "trackConcern"}
              aria-controls="track-concern"
              id="track-concern-tab"
              onClick={() => setActiveTab("trackConcern")}
              className={`tabs-trigger flex-1 p-4 border-b-2 ${activeTab === "trackConcern" ? "border-[#762626]" : "border-gray-200 hover:border-gray-400"}`}
            >
              TRACK YOUR CONCERN
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "suggestion"}
              aria-controls="suggestion"
              id="suggestion-tab"
              onClick={() => setActiveTab("suggestion")}
              className={`tabs-trigger flex-1 p-4 border-b-2 ${activeTab === "suggestion" ? "border-[#762626]" : "border-gray-200 hover:border-gray-400"}`}
            >
              SUGGESTION
            </button>
          </div>
          <div className="tabs-content">
            <div
              role="tabpanel"
              id="track-concern"
              aria-labelledby="track-concern-tab"
              hidden={activeTab !== "trackConcern"}
              className="tab-panel"
            >
              <div className="bg-white shadow-md rounded-lg">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">TRACK YOUR CONCERN</h3>
                  <p className="text-sm text-gray-600">Fill out the form below to track your concern.</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="concern-title">CONCERN ID</label>
                    <input
                      id="concern-title"
                      placeholder="Enter your concern ID"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="concern-description">CONCERN DESCRIPTION</label>
                    <textarea
                      id="concern-description"
                      placeholder="Describe your concern in detail"
                      className="w-full border p-2 rounded min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="concern-status">CONCERN STATUS</label>
                    <select id="concern-status" className="w-full border p-2 rounded">
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 border-t flex justify-center">
                  <button className="bg-[#762626] text-white px-4 py-2 w-[300px] rounded hover:bg-[#D88080]">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
            <div
              role="tabpanel"
              id="suggestion"
              aria-labelledby="suggestion-tab"
              hidden={activeTab !== "suggestion"}
              className="tab-panel"
            >
              <div className="bg-white shadow-md rounded-lg">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">SUGGESTION</h3>
                  <p className="text-sm text-gray-600">Fill out the form below to provide a suggestion.</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="suggestion-title">SUGGESTION TITLE</label>
                    <input
                      id="suggestion-title"
                      placeholder="Enter your suggestion title"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="suggestion-description">SUGGESTION DESCRIPTION</label>
                    <textarea
                      id="suggestion-description"
                      placeholder="Describe your suggestion in detail"
                      className="w-full border p-2 rounded min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="suggestion-priority">SUGGESTION PRIORITY</label>
                    <select id="suggestion-priority" className="w-full border p-2 rounded">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 border-t flex justify-center">
                  <button className="bg-[#762626] text-white px-4 py-2 w-[300px] rounded hover:bg-[#D88080]">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
