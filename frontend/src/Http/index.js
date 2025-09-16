import axios from 'axios'

const api = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    },


})

// List of all End points

export const sendOTP = (data) => api.post('/v1/api/send-otp',data)
export const verifyOTP = (data) => api.post('v1/api/verify-otp',data)
export const activate = (data) => api.post('v1/api/activate',data)

export default api