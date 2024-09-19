import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import logo from "../assets/images/registerlogo.png";
import user from "../assets/images/user1.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast ,ToastContainer} from "react-toastify";
import Loader from "./Loader";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import {registerUser} from "../helper/helper";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phNo: "",
      password: "",
      profile: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phNo: Yup.string().required("Phone Number is required"),
      password: Yup.string().required("Required"),
    }),
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      // console.log('Form is submitting...'); 
      values = await Object.assign(values, { profile: file || '' });
      console.log('Form values:', values);
      let registerPromise = registerUser(values);
      
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: 'Registered Successfully...! Please signin to register for complaint',
        error: 'Could not Register.'
      }).then(() => {
        setTimeout(() => {
          navigate('/signin');
        }, 3000); // Delay navigation by 2 seconds
      }).catch(error => {
        console.error('Registration error:', error);
      });
    }
  });

  const onUpload = async (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      console.error('File size exceeds the 5MB limit');
      return;
    }
  
    try {
      const base64 = await convertToBase64(selectedFile);
      console.log('Base64 string:', base64);
      setFile(base64);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const loginwithgoogle = () => {
    window.open("http://localhost:5001/auth/google/callback", "_self");
  }

  return (
    <>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
        {loading && <Loader />}
        <div
          id="register"
          className={
            loading
              ? "content blurred flex justify-center"
              : "content flex justify-center"
          }
          style={{ marginBottom: "150px" }}
        >
          <div id="signintext" className="registertext">
            <div id="signintextcontainer" style={{ padding: "0px 16px 10px 16px" }}>
              <div id="signintextheading">
                <span id="sub-heading" className="animate-pulse">
                  रेल मदद में पंजीकरण करें
                </span>
                <span id="heading" className="heading">
                  Register
                </span>
              </div>
              <div>
                <span className="text-sm text-black">
                  Have already registered?{" "}
                  <NavLink
                    to="/signin"
                    className="font-semibold"
                    style={{ color: "#762626" }}
                  >
                    Log in
                  </NavLink>
                </span>
              </div>
            </div>
            <div className="lg:hidden mt-4 mb-4">
              <img src={logo} alt="logo" />
            </div>

            <form id="signininput" onSubmit={formik.handleSubmit}>
              <div id="register-inputs-div flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || user}
                    alt="Profile Preview"
                    style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "50%" }}
                    onClick={handleProfileImageClick}
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profile"
                  name="profile"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={onUpload}
                />
              </div>

              <div>
                <input
                  {...formik.getFieldProps('username')}
                  className="white-placeholder"
                  name="username"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="flex flex-wrap justify-between">
                <div
                  id="register-inputs-div"
                  className="full-length full-lengthitem1"
                >
                  <input
                    {...formik.getFieldProps('email')}
                    className="white-placeholder"
                    name="email"
                    type="email"
                    placeholder="E - mail"
                    required
                  />
                </div>
                <div id="register-inputs-div" className="full-length relative mt-3">
                  <input
                    {...formik.getFieldProps('password')}
                    className="white-placeholder"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Set a password"
                    name="password"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div id="register-inputs-div">
                  <input
                    {...formik.getFieldProps('phNo')}
                    className="white-placeholder"
                    name="phNo"
                    type="text"
                    placeholder="Phone Number (e.g., +197863XXXX)"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center btn btn-primary justify-center gap-1 text-white"
                style={{
                  color: "#303030",
                  border: "#303030",
                  width: "300px",
                  fontSize: "12px",
                  fontWeight: "550",
                }}
              >
                Create Account
                <GoArrowRight />
              </button>
              <div className="text-black" style={{ width: "90px", fontSize: "20px", fontWeight: "700" }}>OR</div>
              <button type="button" className='login-with-goggle-button justify-center border border-black btn btn-primary' onClick={loginwithgoogle} style={{ width: "300px", fontSize: "12px", fontWeight: "700" }}>
                Sign Up with Google
              </button>
            </form>

            <div className="flex lg:justify-end justify-between gap-4 mt-8">
              <NavLink
                to="/"
                className="flex items-center h-8 no-underline text-black border-black rounded border pl-4 pr-4 justify-center gap-1"
                style={{ width: "90px", fontSize: "12px", fontWeight: "550" }}
              >
                <GoArrowLeft />
                <span>Back</span>
              </NavLink>
            </div>
          </div>
          <div>
            <img src={logo} alt="logo" id="registerlogo" />
          </div>
        </div>
        <ToastContainer />
      </GoogleOAuthProvider>
    </>
  );
};

export default Register;