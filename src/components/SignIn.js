import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import logo from "../assets/images/signinlogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import avatar from "../assets/images/profileimg.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { emailPasswordValidate } from "../helper/validate";
import useFetch from '../hooks/fetch.hook';
import {verifyPassword} from '../helper/helper';
import {useAuthStore} from '../store/store';
import { jwtDecode } from 'jwt-decode';

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
const { setAuth, auth } = useAuthStore(state => ({
  setAuth: state.setAuth,
  auth: state.auth
}));
const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    validate: emailPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
     let loginPromise = verifyPassword({email : values.email, password : values.password});
     toast.promise(loginPromise, {
      loading: "checking..",
      success: "login Successfully...!",
      error: "password do not match"
     });

     loginPromise.then(res => {
      // let { token, username } = res.data;
      // localStorage.setItem('token', token);
      // setAuth({ username, active: true });
      let { token } = res.data;
        const user = jwtDecode(token); // Decode the token to get user details
        setAuth(user); // Set the auth state with user details
        localStorage.setItem('token', token); // Store the token in localStorage


      // Introduce a delay before navigation
      setTimeout(() => {
        navigate('/profile');
      }, 3000); // Delay navigation by 2 seconds
    }).catch(error => {
      toast.error("Login failed. Please check your credentials.");
      console.error('Login error:', error);
    });
  }
});

const [{ isLoading: fetchLoading, apiData, serverError }] = useFetch(auth.username ? `user/${auth.username}` : null);
  //console.log("username after successful login", auth.username);
  if (loading) return <Loader />; // Display loader if form submission is in progress
  if (fetchLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  //if (serverError) return <h1 className="text-xl text-red-500">{serverError.message}</h1>; 

return (
    <>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div
        id="signin"
        className={
          loading
            ? "content blurred flex justify-center"
            : "content flex justify-center"
        }
      >
        <div id="signintext">
          <div
            id="signintextcontainer"
            style={{ padding: "0px 16px 10px 16px" }}
          >
            <div id="signintextheading">
              <span id="sub-heading" className="animate-pulse">
                Welcome back!!
              </span>
              {/* <span id="heading" className="heading">
                LOG IN
              </span> */}
            </div>
            <div>
              <span className="text-sm text-black">
                Haven't registered yet?{" "}
                <Link
                  to="/register"
                  className="font-semibold"
                  style={{ color: "#762626" }}
                >
                  Register
                </Link>
              </span>
            </div>
          </div>
          <div className="lg:hidden">
            <img src={logo} alt="logo" />
          </div>
          <div id="signininput">
            <form action="POST" onSubmit={formik.handleSubmit}>
              {/* <div className="profile flex justify-center py-4">
                <img src={avatar} alt="avatar" />
              </div> */}
              <div>
                <input
                  {...formik.getFieldProps("email")}
                  name="email"
                  className="white-placeholder"
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <br></br>

              <div style={{ position: "relative" }}>
                <input
                  {...formik.getFieldProps("password")}
                  className="white-placeholder"
                  type={formik.values.passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() =>
                    formik.setFieldValue(
                      "passwordVisible",
                      !formik.values.passwordVisible
                    )
                  }
                >
                  {formik.values.passwordVisible ? "Hide" : "Show"}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </div>
              <div id="forgotpassworddiv" className="text-right">
                <Link
                  to="/recovery"
                  className="cursor-help"
                  style={{ color: "#762626" }}
                >
                  Forgot Password ?
                </Link>
              </div>
              <div
                id="help"
                className="text-right text-black font-semibold hidden-text"
              >
                Call on 139 or else Please Visit Your Nearest Railway station
              </div>

              <div className="flex lg:justify-end justify-between gap-4 mt-8">
                <Link
                  to="/"
                  className="flex items-center h-7 no-underline text-black border-black rounded border pl-4 pr-4 justify-center gap-1"
                  style={{ width: "90px", fontSize: "12px", fontWeight: "550" }}
                >
                  <GoArrowLeft />
                  Back
                </Link>
                <button
                  type="submit" // This will trigger the form submission
                  className="flex items-center h-7 bg-[#762626] no-underline rounded border pt-1 pb-1 pl-4 pr-4 justify-center gap-1"
                  style={{
                    color: "#ffffff",
                    border: "#303030",
                    width: "90px",
                    fontSize: "12px",
                    fontWeight: "550",
                  }}
                >
                  Log In
                  <GoArrowRight />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <img src={logo} alt="logo" id="signinlogo" />
        </div>
      </div>
    </>
  );
};

export default SignIn;