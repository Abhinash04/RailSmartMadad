import React, { useState, useRef } from 'react';
import { 
  Button, TextField, Grid, Box, Typography, 
  Autocomplete, OutlinedInput, createTheme, ThemeProvider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { addDoc, collection } from 'firebase/firestore';
import { ref } from "firebase/storage";
// import { uploadString } from "firebase/storage";

import { db, storage } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { doc ,serverTimestamp } from 'firebase/firestore';
import { uploadBytes } from 'firebase/storage';

// Custom styled components
const WhiteOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '& input': {
    color: 'black',
  },
}));

const WhiteTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '& input': {
    color: 'black',
  },
}));

const theme = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
  },
});
const JourneyOptions = [
  "PNR ", "UTS", 
];
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
  "Coach Cleanliness": [
    "Toilet",
    "Washbasin",
    "Cockroach/Rodents",
    "Coach Interior",
    "Coach Exterior",
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
const trainOptions = [
  "00310 -> DMV-MDN ELECTION SPECIAL [ELECTION SPECIAL]",
  "00290 -> PALACE ON WHEEL [TOURIST TRAIN]",
  "00558 -> SBIB-JJN ELECTION SPL [ELECTION SPECIAL]",
  "00903 -> BDTS - JND  FTR  SPL [TOURIST TRAIN]",
  "00915 -> PRTN - SVDK - PRTN FTR [TOURIST TRAIN]",
  "00184 -> WL-MML ELECTION SPL [ELECTION SPECIAL]",
  "01087 -> VRL-PUNE EXPRESS",
  "01088 -> PUNE-VRL EXPRESS",
  "01209 -> MRJ-KWV SPL [TRAIN ON DEMAND]",
  "01210 -> KWV-MRJ SPL [TRAIN ON DEMAND]",
  "01301 -> SUR-AJNI SPL [TRAIN ON DEMAND]",
  "01655 -> GKP-CDG SPL [TRAIN ON DEMAND]",
  "01656 -> KAWR-YPR SPECIAL [TRAIN ON DEMAND]",
  "01657 -> HBJ-REWA DIWALI POOJA SPL [TRAIN ON DEMAND]",
  "01661 -> MYS-RKMP SUMMER SPECIAL [TRAIN ON DEMAND]",
  "01662 -> RKMP-MYS SUMMER SPECIAL [TRAIN ON DEMAND]",
  "01663 -> RKMP-SHC SUMMER SPECIAL [TRAIN ON DEMAND]",
  "00216 -> TBM-MSB PASS SPL [SUBURBAN]",
  "01664 -> SHC-RKMP SUMMER SPECIAL [TRAIN ON DEMAND]",
  "01665 -> RKMP- AGARTALA EXP [TRAIN ON DEMAND]",
  "01666 -> AGTL-RKMP FESTIVAL SPL [TRAIN ON DEMAND]",
  "01667 -> RKMP-MBDP SUMMER SPECIAL [TRAIN ON DEMAND]",
  "01668 -> MBDP-RKMP SUMMER SPECIAL [TRAIN ON DEMAND]",
  "01705 -> JBP-DNR HOLI SPL [TRAIN ON DEMAND]",
  "01706 -> DNR-JBP HOLI SPL [TRAIN ON DEMAND]",
  "01707 -> JBP-SVDK AMARNATH YATRA S [TRAIN ON DEMAND]",
  "01708 -> SVDK-JBP AMARNATH SPL [TRAIN ON DEMAND]",
  "02193 -> RJT-REWA EXAM SPL [TRAIN ON DEMAND]",
  "02194 -> REWA-RJT EXAM SPL [TRAIN ON DEMAND]",
  "02195 -> RKMP-REWA INAUGRAL SPL [TRAIN ON DEMAND]",
  "02196 -> NZM-JBP MAHAKOSHAL EXP [MAIL/EXPRESS SPECIAL]",
  "02197 -> CBE-JBP SF SPL [TRAIN ON DEMAND]",
  "02198 -> JBP-CBE SF FESTIVAL SPL [TRAIN ON DEMAND]",
  "02375 -> TBM-JSME SF SPECIAL",
  "02376 -> JSME-TBM SF SPECIAL",
  "02485 -> NED SGNR SF SPL",
  "02486 -> SGNR NED SF SPL",
  "02731 -> TPTY-SC EXP [HOLIDAY SPECIAL]",
  "02732 -> SC-TPTY EXP [HOLIDAY SPECIAL]",
  "02834 -> HOWRAH-AHMEDABAD EXP SPL [MAIL/EXPRESS SPECIAL]",
  "02841 -> SHM-MAS SF SPL TOD [TRAIN ON DEMAND]",
  "02842 -> MAS-SRC TOD ONE WAY SPL [TRAIN ON DEMAND]",
  "03011 -> HWH MLDT INT SPL",
  "03012 -> MLDT  HWH INT SPL",
  "03013 -> HWH NJP  SPL TOD [TRAIN ON DEMAND]",
  "03014 -> NJP HWH PUJA SPL [TRAIN ON DEMAND]",
  "03021 -> HWH-RXL EID SPL [TRAIN ON DEMAND]",
  "03022 -> RXL-HWH EID SPL [TRAIN ON DEMAND]",
  "03219 -> PPTA-GTNR EXP SPECIAL [TRAIN ON DEMAND]",
  "03220 -> DNR-JBN INAUGURAL SPL [INAUGURAL SPECIAL]",
  "03301 -> DHN-RXL EXPRESS SPL [TRAIN ON DEMAND]",
  "03302 -> RXL-DHN EXPRESS SPL [TRAIN ON DEMAND]",
  "03601 -> SNDT-DHN PASSENGER [PASSENGER]",
  "03602 -> DHN-SNDT PASSENGER [PASSENGER]",
  "04151 -> CNB-LTT SUF. SPL [TRAIN ON DEMAND]",
  "04211 -> BSB-CDG SPL [TRAIN ON DEMAND]",
  "04221 -> KOAA-LKO EXP SPL",
  "04445 -> PWL-SSB EMU [EMU]",
  "04446 -> SSB-MTJ EMU [EMU]",
  "04767 -> HMH-SGNR PASSENGER [PASSENGER]",
  "04768 -> SGNR-HMH PASSENGER [PASSENGER]",
  "04769 -> HMH-SGNR PASSENGER [PASSENGER]",
  "04770 -> SGNR-HMH PASSENGER [PASSENGER]",
  "04773 -> SGNR-SOG PASSENGER [PASSENGER]",
  "04774 -> SOG-SGNR PASSENGER [PASSENGER]",
  "04775 -> SDLP-HMH PASSENGER [PASSENGER]",
  "04776 -> HMH-SDLP PASSENGER [PASSENGER]",
  "04777 -> SDLP-HMH PASSENGER [PASSENGER]",
  "04778 -> HMH-SDLP PASSENGER [PASSENGER]",
  "04779 -> SGNR-SOG PASSENGER [PASSENGER]",
  "04780 -> SOG-SGNR PASSENGER [PASSENGER]",
  "04801 -> SIKR-JP DMU [DMU]",
  "04802 -> JP-SIKR DMU [DMU]",
  "04831 -> BKN-CUR DMU [DMU]",
  "04851 -> MTD-RTGH DMU [DMU]",
  "04852 -> RTGH-MTD DMU [DMU]",
  "04853 -> SIKR-LHU DMU [DMU]",
  "04854 -> LHU-SIKR DMU [DMU]",
  "05069 -> GKP-NDLS PUJA SPL [TRAIN ON DEMAND]",
  "05070 -> NDLS-GKP PUJA SPL [TRAIN ON DEMAND]",
  "05305 -> CPR-ANVT SUMMER SPL [TRAIN ON DEMAND]",
  "05306 -> ANVT-CPR SUMMER SPL [TRAIN ON DEMAND]",
  "05309 -> MAU-ANVT SUMMER SPL [TRAIN ON DEMAND]",
  "05310 -> ANVT-MAU SUMMER SPL [TRAIN ON DEMAND]",
  "05521 -> VSHI-SEE DMU [DMU]",
  "05522 -> SEE-VSHI DMU [DMU]",
  "05613 -> SC-GHY TOD SPECIAL [TRAIN ON DEMAND]",
  "05614 -> GHY-SC TOD SPECIAL [TRAIN ON DEMAND]",
  "05683 -> MSSN-SCL PASSENGER [PASSENGER]",
  "05684 -> SCL-MSSN PASSENGER [PASSENGER]",
  "05715 -> GAREEB NAWAZ EYRAKE",
  "05716 -> AII-KNE EXPRESS SPECIAL",
  "06001 -> ERS-BNC VB TOD SPL TRI WK [TRAIN ON DEMAND]",
  "06002 -> BNC-ERS VB TOD SPL TRI WK [TRAIN ON DEMAND]",
  "06007 -> TBM-TPJ MEMU UR SPL [MEMU]",
  "06008 -> TPJ-TBM MEMU UR SPL [MEMU]",
  "06011 -> TBM-NCJ SF TOD SPL [TRAIN ON DEMAND]",
  "06012 -> NCJ-TBM SF TOD SPL [TRAIN ON DEMAND]",
  "06029 -> MTP-TEN TOD WKLY SPL [TRAIN ON DEMAND]",
]

export default function Train() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    journey: "",
    PNRUTS: "",
    grievance: "",
    subType: "",
    incidentDate: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTrainNumberDisabled, setIsTrainNumberDisabled] = useState(true);
  const filePickerRef = useRef(null);
  const [subTypeOptions, setSubTypeOptions] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === 'journey' && value === 'UTS') {
      setIsTrainNumberDisabled(false);
    } else {
      setIsTrainNumberDisabled(true);
    }
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
   
      const docRef = await addDoc(collection(db, "Train"), {
        ...formData,
        timestamp: serverTimestamp()
      });

 
      if (file) {
        const fileRef = ref(storage, Train/`${docRef.id}/${file.name}`);
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
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh", placeItems: "center" }}>
        <Box sx={{ width: "650px", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: "#020617" }}>
                    Journey Details <span className="text-red-800">*</span>
                  </Typography>
                  <Autocomplete
                    options={JourneyOptions}
                    renderInput={(params) => <WhiteTextField {...params} placeholder="--select--" fullWidth />}
                    onChange={(event, newValue) => handleInputChange({ target: { name: 'journey', value: newValue } })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ color: "#020617" }} disabled={isTrainNumberDisabled}>
                    Train Number <span className="text-red-800"></span>
                  </Typography>
                  <Autocomplete
                    disabled={isTrainNumberDisabled}
                    options={trainOptions}
                    renderInput={(params) => <WhiteTextField {...params} placeholder="--select--" fullWidth />}
                    onChange={(event, newValue) => handleInputChange({ target: { name: 'UTSDetails', value: newValue } })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className="mt-2">
                  <Typography sx={{ color: "#020617" }}>
                    PNR/UTS Number
                  </Typography>
                  <WhiteOutlinedInput
                    name="PNRUTS"
                    type="number"
                    fullWidth
                    value={formData.PNRUTS}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "#020617" }}>
                  Type <span className="text-red-800">*</span>
                </Typography>
                <Autocomplete
                  options={grievanceOptions}
                  renderInput={(params) => <WhiteTextField {...params} placeholder="--select--" fullWidth />}
                  onChange={(event, newValue) => handleInputChange({ target: { name: 'grievance', value: newValue } })}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "#020617" }}>
                  Sub Type <span className="text-red-800">*</span>
                </Typography>
                <Autocomplete
                  options={subTypeOptions}
                  renderInput={(params) => <WhiteTextField {...params} fullWidth />}
                  onChange={(event, newValue) => handleInputChange({ target: { name: 'subType', value: newValue } })}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "#020617" }}>
                  Incident Date <span className="text-red-800">*</span>
                </Typography>
                <WhiteTextField
                  type="date"
                  fullWidth
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "#020617" }}>
                  Upload File <span className="text-red-800">*</span>
                </Typography>
                <WhiteTextField
                  type="file"
                  fullWidth
                  onChange={handleFileChange}
                  inputRef={filePickerRef}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <Typography sx={{ color: "#020617" }}>
                  Phone Number
                </Typography>
                <WhiteOutlinedInput
                  name="mobileNumber"
                  type="number"
                  fullWidth
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                />
              </Grid>
  
              <Grid item xs={12} sm={6} container alignItems="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#75002b", color: "white" }}
                  disabled={loading}
                  className="rounded-2xl"
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </ThemeProvider>
  );  
}