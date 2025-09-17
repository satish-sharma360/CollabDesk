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
export const logout = () => api.post('v1/api/logout')

// Interceptor


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Only retry once per request
        if (
            error.response &&
            error.response.status === 500 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh token
                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/api/refresh`, { withCredentials: true });
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);
                // Optionally, redirect to login or show a message
            }
        }
        // If not handled, propagate error
        return Promise.reject(error);
    }
);

export default api