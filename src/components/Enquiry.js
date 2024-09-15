import React, { useState, useRef } from 'react';
// import { 
//   Button, TextField, Grid, Box, Typography, Divider, 
//   Autocomplete, OutlinedInput, createTheme, ThemeProvider 
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
import { db, storage } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { doc ,serverTimestamp } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';

// Custom styled components
// const WhiteOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '& input': {
//     color: 'black',
//   },
// }));

// const WhiteTextField = styled(TextField)(({ theme }) => ({
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'black',
//   },
//   '& input': {
//     color: 'black',
//   },
// }));

// const theme = createTheme({
//   palette: {
//     background: {
//       default: "#000000",
//     },
//     primary: {
//       main: "#000000",
//     },
//     secondary: {
//       main: "#000000",
//     },
//   },
// });

const grievanceOptions = [
  "Medical Assistance", "Security", "Divyangjan Facilities",
  "Facilities for Women with Special Needs", "Electric Equipment",
  "Coach-Cleanliness", "Punctuality", "Water Availability",
  "Coach Maintenance", "Catering & Vending Service",
  "Staff Behaviour", "Bed Roll", "Corruption/Bribery",
];

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
      // First, add the document to Firestore without the file
      const docRef = await addDoc(collection(db, "Enquiry"), {
        ...formData,
        timestamp: serverTimestamp()
      });

      // If a file was selected, upload it to Firebase Storage
      if (file) {
        const fileRef = ref(storage, `Enquiry/${docRef.id}/${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        // Update the Firestore document with the file URL
        await updateDoc(doc(db, "Enquiry", docRef.id), {
          fileUrl: downloadURL,
          fileName: file.name
        });
      }

      console.log("Form submitted successfully");
      // Reset form after successful submission
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => handleInputChange({ target: { name: 'subType', value: e.target.value } })}
              >
                <option value="">--select--</option>
                {grievanceOptions.map((option, index) => (
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">
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
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#75002b] hover:bg-[#5a0021] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75002b] disabled:opacity-50 disabled:cursor-not-allowed"
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