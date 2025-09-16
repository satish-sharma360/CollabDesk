import axios from 'axios'

const api = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}`,
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'
    },


})

// List of all End points

export const sendOTP = (data) => api.post('/v1/api/send-otp',data)
export const verifyOTP = (data) => api.post('v1/api/verify-otp',data)

export default api