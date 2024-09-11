import React, { useState, useRef } from 'react';
import { 
  Button, TextField, Grid, Box, Typography, Divider, 
  Autocomplete, OutlinedInput, createTheme, ThemeProvider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString } from "firebase/storage";
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
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: "100vh", placeItems: "center" }}>
      <Box sx={{ width: "650px", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
               
              </Grid>
              <Grid item xs={12}>
                <Divider />
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
                  options={grievanceOptions}
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
            <Grid item xs={12} sm={6} container alignItems="center">
              <Button 
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#75002b", color: "white" }}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  </ThemeProvider>
  );
}