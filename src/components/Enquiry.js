import React, { useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
import { db, storage } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { doc ,serverTimestamp } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';

const grievanceOptions = [
  "Medical Assistance", "Security", "Divyangjan Facilities", "Facilities for Women with Special needs", "Electrical Equipment",
    "Coach Cleanliness", "Punctuality", "Water Availability", "Coach Maintenance", "Catering & Vending Services",
    "Staff Behaviour", "Corruption / Bribery", "Bed Roll", "Miscellaneous"
     
  ];
  
  const grievanceMatrix = {
    "Security": [
      "Eve-teasing/Misbehaviour with lady passengers/Rape",
      "Theft of Passengers Belongings/Snatching",
      "Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach",
      "Harassment/Extortion by Security Personnel/Railway personnel",
      "Nuisance by Hawkers/Beggar/Eunuch",
      "Luggage Left Behind/Unclaimed/Suspected Articles",
      "Passenger Missing/Not responding call",
      "Smoking/Drinking Alcohol/Narcotics",
      "Dacoity/Robbery/Murder/Riots",
      "Quarrelling/Hooliganism",
      "Passenger fallen down",
      "Nuisance by passenger",
      "Misbehaviour",
      "Others"
    ],
    "Electrical Equipment": [
      "Air Conditioner",
      "Fans",
      "Lights",
      "Charging Points",
      "Others"
    ],
    "Catering & Vending Services": [
      "Overcharging",
      "Service Quality & Hygiene",
      "Food Quality & Quantity",
      "E-Catering",
      "Food & Water Not Available",
      "Others"
    ],
    "Coach Maintenance": [
      "Window/Seat Broken",
      "Window/Door locking problem",
      "Tap leaking/Tap not working",
      "Broken/Missing Toilet Fittings",
      "Jerks/Abnormal Sound",
      "Others"
    ],
    "Water Availability": [
      "Packaged Drinking Water / Rail Neer",
      "Toilet",
      "Washbasin",
      "Others"
    ],
    "Punctuality":[
      "NTES APP",
      "Late Running",
      "Others",
    ],
    "Bed Roll":[
      "Dirty / Torn",
      "Overcharging",
      "Non Availability",
      "Others",
    ],
    "Divyangjan Facilities":[
      "Divyangjan coach unavailability",
      "Divyangjan toilet/washbasin",
      "Braille signage in coach",
      "Others",
    ],
    "Corruption / Bribery":[
      "Corruption / Bribery",
    ],
    "Facilities for Women with Special needs":[
      "Baby Food",
    ],
    "Medical Assistances":[
      "Medical Assistance",
    ],
    "Staff Behaviour":[
      "Staff Behaviour",
    ],
    "Miscellaneous":[
      "Miscellaneous",
    ],
  };

export default function Enquiry() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    grievance: "",
    subType: "",
    incidentDate: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const [subTypeOptions, setSubTypeOptions] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
   
    if (name === 'grievance') {
      setSubTypeOptions(grievanceMatrix[value] || []);
    }
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "Enquiry"), {
        ...formData,
        timestamp: serverTimestamp()
      });

      if (file) {
        const fileRef = ref(storage, `Enquiry/${docRef.id}/${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        await updateDoc(doc(db, "Enquiry", docRef.id), {
          fileUrl: downloadURL,
          fileName: file.name
        });
      }

      console.log("Form submitted successfully");
      setFormData({
        mobileNumber: "",
        grievance: "",
        subType: "",
        incidentDate: "",
      });
      setFile(null);
      if (filePickerRef.current) {
        filePickerRef.current.value = "";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <hr className="my-4" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Type <span className="text-red-600">*</span>
              </label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-red-950 h-[40px]"
                onChange={(e) => handleInputChange({ target: { name: 'grievance', value: e.target.value } })}
              >
                <option value="">--select--</option>
                {grievanceOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-800">
                Sub Type <span className="text-red-600">*</span>
              </label>
              <select 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-red-950 h-[40px]"
                onChange={(e) => handleInputChange({ target: { name: 'subType', value: e.target.value } })}
              >
                <option value="">--select--</option>
                {subTypeOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
                Incident Date <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-red-950 h-[40px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Upload File <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                ref={filePickerRef}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#762626] file:text-white
                  hover:file:bg-[#D88080]"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#762626] hover:bg-[#D88080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D88080]"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};