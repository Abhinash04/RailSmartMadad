// import React, { useState, useEffect } from 'react';
// import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyA_BgON9SBy42Cq47zSNXRRyKEUCiv7SJY",
//     authDomain: "rail-madad-5a0ba.firebaseapp.com",
//     projectId: "rail-madad-5a0ba",
//     storageBucket: "rail-madad-5a0ba.appspot.com",
//     messagingSenderId: "345076049770",npm 
//     appId: "1:345076049770:web:2217422a48b28f45992713"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const stationTypes = [
//   "Medical Assistance",
//   "Security",
//   "Divyangjan Facilities",
//   "Facilities for Women with Special needs",
//   "Unreserved Ticketing",
//   "Luggage / Parcels",
//   "Reserved Ticketing",
//   "Refund of Tickets",
//   "Passenger Amenities",
//   "Electrical Equipment",
//   "Staff Behaviour",
//   "Cleanliness",
//   "Catering & Vending Services",
//   "Water Availability",
//   "Goods",
//   "Corruption / Bribery",
//   "Miscellaneous"
// ];

// const stationSubtypes = {
//   "Medical Assistance": ["First Aid", "Ambulance", "Doctor"],
//   "Security": ["Theft", "Harassment", "Lost and Found"],
//   "Divyangjan Facilities": ["Wheelchair", "Ramp", "Special Assistance"],
//   "Facilities for Women with Special needs": ["Nursing Room", "Women's Waiting Room"],
//   "Unreserved Ticketing": ["Long Queue", "Counter Closed", "Overcharging"],
//   "Luggage / Parcels": ["Lost Luggage", "Damaged Parcel", "Delayed Delivery"],
//   "Reserved Ticketing": ["Reservation Issues", "Tatkal Booking", "Cancellation"],
//   "Refund of Tickets": ["Delayed Refund", "Incorrect Refund Amount"],
//   "Passenger Amenities": ["Waiting Room", "Seating", "Platforms"],
//   "Electrical Equipment": ["Faulty Lights", "Non-functional Fans", "Escalator Issues"],
//   "Staff Behaviour": ["Rude Behaviour", "Non-cooperative Staff"],
//   "Cleanliness": ["Dirty Platform", "Unclean Toilets", "Garbage Disposal"],
//   "Catering & Vending Services": ["Food Quality", "Overpricing", "Hygiene Issues"],
//   "Water Availability": ["No Water", "Contaminated Water"],
//   "Goods": ["Booking Issues", "Delivery Delays"],
//   "Corruption / Bribery": ["Bribe Demand", "Unfair Practices"],
//   "Miscellaneous": ["Other Issues"]
// };

// export default function RailMadadForm() {
//   const [mode, setMode] = useState('train');
//   const [formData, setFormData] = useState({
//     phone: "",
//     detail: "",
//     identifier: "",
//     type: "",
//     subtype: "",
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const loadRecaptcha = () => {
//       window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//         size: 'invisible',
//         callback: (response) => {
//           console.log('reCAPTCHA verified.');
//         }
//       }, auth);
//     };

//     loadRecaptcha();
//   }, []);

//   const handleModeChange = (newMode) => {
//     setMode(newMode);
//     setFormData(prev => ({ ...prev, type: "", subtype: "", identifier: "" }));
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));
//   };

//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     const phoneNumber = formData.phone;
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const recaptchaResponse = grecaptcha.getResponse();
//       if (!recaptchaResponse) {
//         setError('Please complete the reCAPTCHA challenge.');
//         return;
//       }

//       const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       setVerificationId(result.verificationId);
//       console.log("SMS sent. Prompt user to type the code from the message.");
//     } catch (error) {
//       console.error("Error sending SMS:", error);
//       setError('Failed to send verification code. Please try again.');
//     }
//   };

//   const handleVerifyCode = async (e) => {
//     e.preventDefault();
//     try {
//       const credential = await auth.signInWithCredential(
//         auth.PhoneAuthProvider.credential(verificationId, verificationCode)
//       );
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error("Error verifying code:", error);
//     }
//   };

//   const renderForm = () => (
//     <div className="stationName1">
//       <p>Enter your Number</p>
//       <input
//         className="bg-slate-200 rounded-xl shadow-sm shadow-black h-10 w-full"
//         id='phone'
//         onChange={handleInputChange}
//         value={formData.phone}
//       />
//       {!isAuthenticated && (
//         <button onClick={handlePhoneSubmit} className="mt-2 bg-red-700 text-white px-4 py-2 rounded">
//           Send Verification Code
//         </button>
//       )}
//       {verificationId && !isAuthenticated && (
//         <div className="mt-4">
//           <input
//             className="bg-slate-200 rounded-xl shadow-sm shadow-black h-10 w-full"
//             type="text"
//             placeholder="Enter verification code"
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//           />
//           <button onClick={handleVerifyCode} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
//             Verify Code
//           </button>
//         </div>
//       )}
//       <div className='flex justify-between mt-7'>
//         <div>
//           <p className='mt-3'>Enter your {mode === 'train' ? 'Train Number' : mode === 'station' ? 'Station Name' : 'Enquiry ID'}</p>
//           <input
//             className="bg-slate-200 rounded-xl h-10 w-full"
//             id='identifier'
//             onChange={handleInputChange}
//             value={formData.identifier}
//             disabled={!isAuthenticated}
//             list={mode === 'station' ? 'stationNameList' : null}
//           />
//           {mode === 'station' && (
//             <datalist id="stationNameList" className="stationName1">
//               <option value="Ambur"></option>
//               <option value="Akbarpur"></option>
//               <option value="Abu Road"></option>
//               {/* Add more station names here */}
//             </datalist>
//           )}
//         </div>
//       </div>
//       <div className='flex justify-between mt-7'>
//         <select
//           className='mt-3 h-10 bg-slate-200 rounded-xl w-40 p-2'
//           id='type'
//           onChange={handleInputChange}
//           value={formData.type}
//           disabled={!isAuthenticated}
//         >
//           <option value="">Select Type</option>
//           {mode === 'station' ? 
//             stationTypes.map((type, index) => (
//               <option key={index} value={type}>{type}</option>
//             )) : 
//             <option value="default">Default Type</option>
//           }
//         </select>
//         <select
//           className='mt-3 mx-4 bg-slate-200 rounded-xl w-40 p-2'
//           id='subtype'
//           onChange={handleInputChange}
//           value={formData.subtype}
//           disabled={!isAuthenticated || !formData.type}
//         >
//           <option value="">Select Subtype</option>
//           {mode === 'station' && formData.type && 
//             stationSubtypes[formData.type].map((subtype, index) => (
//               <option key={index} value={subtype}>{subtype}</option>
//             ))
//           }
//         </select>
//       </div>
//       <p className='mt-9'>Grievances in detail</p>
//       <textarea
//         className="rounded-md h-32 w-full bg-slate-200 p-2"
//         id='detail'
//         onChange={handleInputChange}
//         value={formData.detail}
//         disabled={!isAuthenticated}
//       />
//     </div>
//   );

//   return (
//     <div className="flex flex-col sm:flex-row">
//       <div id="recaptcha-container"></div>
//       <div className="flex-shrink-0 sm:w-64 bg-white border-r border-gray-200">
//         <nav className="flex flex-col h-full">
//           <button
//             className={`py-4 px-6 text-left hover:bg-gray-100 focus:outline-none ${mode === 'train' ? 'bg-gray-100' : ''}`}
//             onClick={() => handleModeChange('train')}
//           >
//             Train
//           </button>
//           <button
//             className={`py-4 px-6 text-left hover:bg-gray-100 focus:outline-none ${mode === 'station' ? 'bg-gray-100' : ''}`}
//             onClick={() => handleModeChange('station')}
//           >
//             Station
//           </button>
//           <button
//             className={`py-4 px-6 text-left hover:bg-gray-100 focus:outline-none ${mode === 'enquiry' ? 'bg-gray-100' : ''}`}
//             onClick={() => handleModeChange('enquiry')}
//           >
//             Enquiry
//           </button>
//         </nav>
//       </div>
//       <div className="flex-grow p-6">
//         <form className='flex flex-col gap-4'>
//           {renderForm()}
//         </form>
//       </div>
//     </div>
//   );
// }

import React from 'react'

const Verticaltabs = () => {
  return (
    <div>Verticaltabs</div>
  )
}

export default Verticaltabs