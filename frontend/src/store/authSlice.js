import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuth:false,
    user:null,
    accessToken: null,
    otp:{
        hash:'',
        phone:''
    }
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state , action) =>{
            const {user ,accessToken} = action.payload;
            state.user = user;
            state.isAuth = true
        },
        setOTP:(state , action) =>{
            const {phone,hash} = action.payload;
            state.otp.phone = phone;
            state.otp.hash = hash;
        },
    }
})

export const {setAuth,setOTP} = authSlice.actions
export default authSlice.reducer