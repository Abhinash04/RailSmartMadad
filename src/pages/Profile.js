import React, { useState } from "react";
import img from "../assets/images/profileimg.png";
import { FaCog } from "react-icons/fa";

export default function Profile() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("trackConcern");

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
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                  <div className="p-4 border-b">
                    <h2 id="dialog-title" className="text-lg font-semibold text-[#762626]">
                      EDIT PROFILE
                    </h2>
                    <p className="text-sm text-gray-600">
                      Make changes to your profile here. Click save when you're done.
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="username" className="text-right">
                          USERNAME
                        </label>
                        <input
                          id="username"
                          defaultValue="username"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="phone" className="text-right">
                          PHONE
                        </label>
                        <input
                          id="phone"
                          defaultValue="+91 XXXXXXXXXX"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="email" className="text-right">
                          E-MAIL
                        </label>
                        <input
                          id="email"
                          defaultValue="yourname@gmail.com"
                          className="col-span-3 border p-2 rounded text-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end p-4 border-t">
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="bg-[#762626] text-white px-4 py-2 rounded hover:bg-[#D88080]"
                    >
                      Save changes
                    </button>
                  </div>
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
                    <label htmlFor="concern-title">CONCERN TITLE</label>
                    <input
                      id="concern-title"
                      placeholder="Enter your concern title"
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
