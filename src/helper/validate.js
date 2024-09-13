import { authenticate } from './helper';
import { toast } from 'react-toastify';

// validate signin form
export async function emailPasswordValidate(values) {
    const errors = emailPasswordVerify({}, values);
    return errors;
  }
  
function emailPasswordVerify(error = {}, values) {
  // Validate email
  if (!values.email) {
    error.email = 'Email Required!';
    toast.error('Email Required!');
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.email)) {
    error.email = 'Invalid Email Address!';
    toast.error('Invalid Email Address!');
  }

  // Validate password
  if (!values.password) {
    error.password = 'Password Required!';
    toast.error('Password Required!');
  } else if (values.password.length < 4) {
    error.password = 'Password must be at least 4 characters long!';
    toast.error('Password must be at least 4 characters long!');
  }else if (values.password.includes(" ")) {
    error.password = toast.error('wrong password');
  }else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    error.password = 'Password must contain at least one special character!';
    toast.error('Password must contain at least one special character!');
  }

  return error;
}


// validate register form
export async function registerValidation(values){
  const errors = usernameVerify({}, values);
  emailPasswordVerify(errors, values);
  phoneNumberVerify(errors, values);
  return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = 'Full Name is required!';
    toast.error('Full Name is required!');
  }
  return error;
}
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = 'Email Required!';
    toast.error('Email Required!');
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.email)) {
    error.email = 'Invalid Email Address!';
    toast.error('Invalid Email Address!');
  }
}

function phoneNumberVerify(error = {}, values) {
  if (!values.phNo) {
    error.phNo = 'Phone Number is required!';
    toast.error('Phone Number is required!');
  } else if (!/^\+?[1-9]\d{1,14}$/.test(values.phNo)) {
    error.phNo = 'Invalid Phone Number!';
    toast.error('Invalid Phone Number!');
  }
  return error;
}

// validate profile page  
export async function profileValidation(values){
  const errors = emailVerify({}, values);
  return errors;
}




export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    try {
      const { status } = await authenticate(values.username);

      if (status !== 200) {
        errors.exist = toast.error('User does not exist...!');
      }
    } catch (error) {
      errors.exist = toast.error('An error occurred while verifying the username.');
    }
  }
return errors;
}