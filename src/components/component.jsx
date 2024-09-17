import React, { useState } from "react";

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("trackConcern");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-[1200px] mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="relative h-[600px] lg:h-auto">
          <img
            src="/placeholder.svg"
            alt="Profile"
            width={600}
            height={600}
            className="w-full h-full object-cover rounded-xl"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
          <div className="absolute top-4 right-4">
            <button
              aria-haspopup="dialog"
              aria-expanded={isDialogOpen}
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full p-2 bg-white shadow hover:shadow-md"
            >
              <SettingsIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Edit profile</span>
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
                    <h2 id="dialog-title" className="text-lg font-semibold">
                      Edit profile
                    </h2>
                    <p className="text-sm text-gray-600">
                      Make changes to your profile here. Click save when you're done.
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="username" className="text-right">
                          Username
                        </label>
                        <input id="username" defaultValue="jdoe" className="col-span-3 border p-2 rounded" />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="phone" className="text-right">
                          Phone
                        </label>
                        <input id="phone" defaultValue="+1 (555) 555-5555" className="col-span-3 border p-2 rounded" />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <input id="email" defaultValue="jdoe@example.com" className="col-span-3 border p-2 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end p-4 border-t">
                    <button
                      onClick={() => setIsDialogOpen(false)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

      <div className="flex flex-col gap-6">
        <div className="tabs">
          <div className="tabs-list flex" role="tablist" aria-label="Profile Tabs">
            <button
              role="tab"
              aria-selected={activeTab === "trackConcern"}
              aria-controls="track-concern"
              id="track-concern-tab"
              onClick={() => setActiveTab("trackConcern")}
              className={`tabs-trigger flex-1 p-4 border-b-2 ${activeTab === "trackConcern" ? "border-blue-500" : "border-gray-200 hover:border-gray-400"}`}
            >
              Track Your Concern
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "suggestion"}
              aria-controls="suggestion"
              id="suggestion-tab"
              onClick={() => setActiveTab("suggestion")}
              className={`tabs-trigger flex-1 p-4 border-b-2 ${activeTab === "suggestion" ? "border-blue-500" : "border-gray-200 hover:border-gray-400"}`}
            >
              Suggestion
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
                  <h3 className="text-lg font-semibold">Track Your Concern</h3>
                  <p className="text-sm text-gray-600">Fill out the form below to track your concern.</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="concern-title">Concern Title</label>
                    <input id="concern-title" placeholder="Enter your concern title" className="w-full border p-2 rounded" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="concern-description">Concern Description</label>
                    <textarea
                      id="concern-description"
                      placeholder="Describe your concern in detail"
                      className="w-full border p-2 rounded min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="concern-status">Concern Status</label>
                    <select id="concern-status" className="w-full border p-2 rounded">
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <button className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600">
                    Submit
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
                  <h3 className="text-lg font-semibold">Suggestion</h3>
                  <p className="text-sm text-gray-600">Fill out the form below to provide a suggestion.</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="suggestion-title">Suggestion Title</label>
                    <input id="suggestion-title" placeholder="Enter your suggestion title" className="w-full border p-2 rounded" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="suggestion-description">Suggestion Description</label>
                    <textarea
                      id="suggestion-description"
                      placeholder="Describe your suggestion in detail"
                      className="w-full border p-2 rounded min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="suggestion-priority">Suggestion Priority</label>
                    <select id="suggestion-priority" className="w-full border p-2 rounded">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 border-t">
                  <button className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600">
                    Submit
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

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 0-.75 2.62l.06.1a2 2 0 0 1 0 1.81l-.06.1a2 2 0 0 0 .75 2.62l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 0 .75-2.62l-.06-.1a2 2 0 0 1 0-1.81l.06-.1a2 2 0 0 0-.75-2.62l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
