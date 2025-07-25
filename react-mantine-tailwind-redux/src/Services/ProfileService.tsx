import axios from 'axios';
const base_url = "http://localhost:8080/profiles"

const getProfile = async (id:number)=>{
    return axios.get(`${base_url}get/${id}`)
        .then(result => result.data)
        .catch(error =>{throw error;});
    
}

const updateProfile = async (id:any)=>{
    return axios.put(`${base_url}update`,profile)
        .then(result => result.data)
        .catch(error =>{throw error;});
    
}
export {getProfile, updateProfile};