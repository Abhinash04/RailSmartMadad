import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// make api request
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject("Cannot find Token");

    let decode;
    try {
        decode = jwtDecode(token);
        return decode;
    } catch (error) {
        return Promise.reject("Invalid Token");
    }

    //console.log(decode);
}

//authenticate function
export async function authenticate (username){
    try {
        return await axios.post('/api/auth/authenticate', {username});
    }catch (error) {
        return { error : "Username does't exist ...!"}
    }
}

// get user details
export async function getUser({ username }){ 
    try {
       const {data} = await axios.get(`/api/auth/user/${username}`);
       return {data};
    } catch (error) {
        return { error : "Password doesn't match...!"}
    }
}

// register user function
export async function registerUser(credentials){
    try{
       console.log('Credentials:', credentials);
       const { data: { msg }, status } = await axios.post('http://localhost:5001/api/auth/register', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("hello",{ data: { msg }, status })
       let {username, email} = credentials;

    // //    sendmail
    // if(status === 201) {
    //     await axios.post('http://localhost:5001/api/auth/registerMail', {username, userEmail: email, text: msg})
    // }

    return Promise.resolve(msg);
    } catch (error) {
        console.error("registration error", error);
        return Promise.reject({error});
    }
}

//login function
export async function verifyPassword({email , password}){
    try {
        if(email){
            const {data} = await axios.post('http://localhost:5001/api/auth/login', {email, password})
            return Promise.resolve({data});
        }
    } catch(error) {
        return Promise.reject({error : "Password doesn't match...!"})
    }
}

//Update user function
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }
        console.log('Token:', token);
        console.log('Response:', response);

        const data = await axios.put('http://localhost:5001/api/auth/updateuser', response, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log('Data:', data);
        return data; // Return the response data directly
    } catch (error) {
        console.error("Error updating profile:", error);
        return Promise.reject({ error: "Couldn't Update Profile ...!" });
    }
}

//generate OTP
export async function generateOTP(username) {
    try {

      const {data : {code}, status} =  await axios.get('/api/auth/generateOTP', { params : {username}})
     //send the mail with OTP
      if(status === 201){
        let {data : {email}} =  await getUser({username});
        let text = `your Password Recovery OTP is ${code}. Verify and recover your Password.`;
        await axios.post('/api/auth/registerMail', {username, userEmail: email, text, subject: "Password Recovery OTP"});
      }
      return Promise.resolve(code);
    }catch (error) {
        return Promise.reject({ error});
    }
}

//Verify OTP
export async function verifyOTP({username, code}){
    try {
      const {data, status} = await axios.get('/api/auth/verifyOTP', {params : {username, code}})
    return {data, status}
    } catch (error) {
        return Promise.reject(error);
    }
}

// reset password
export async function resetPassword({username, password}) {
    try {
       const {data, status} = await axios.put('/api/auth/password', {username, password});
       return Promise.resolve({data, status})
    } catch (error) {
        return Promise.reject({error})
    }
    
}