import { em } from "@mantine/core";
import axios from "axios";
import { error } from "console";

const base_url = "http://localhost:8080/api/users/";

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

const registerUser = async (user: any) => {
    try {
        console.log('Sending registration data:', user); // Debug log
        const response = await axios.post(`${base_url}register`, user);
        return response.data;
    } catch (error: any) {
        console.error('Registration error:', error.response || error); // Debug log
        // Extract the error message from the response
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: error.message || 'Registration failed' };
    }
};

const loginUser = async (login: any) => {
    try {
        console.log('Sending login data:', login); // Debug log
        const response = await axios.post(`${base_url}login`, login);
        return response.data;
    } catch (error: any) {
        console.error('Login error:', error.response || error); // Debug log
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: error.message || 'Login failed' };
    }
};

const sentOtp = async (email: any) => {
  return axios
    .post(`${base_url}sendOtp`, { email }) 
    .then(result => result.data)
    .catch(error => { throw error; });
};

const verifyOtp = async(email:any,otp:any) => {
    return axios.get(`${base_url} verifyOtp/${email}/${otp}`)
    .then(result => result.data)
    .catch(error => {throw error;});
}

const changePass = async(email:string,password:string)=>{
    return axios.post(`${base_url} changePass`,{email, password})
    .then(result => result.data)
    .catch(error => {throw error;});
}

export { registerUser, loginUser ,sentOtp,verifyOtp,changePass};