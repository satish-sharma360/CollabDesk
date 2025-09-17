import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuth } from '../store/authSlice'

const useLoadingWithRefresh = async () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/api/refresh`, { withCredentials: true })
                dispatch(setAuth(data))
                setLoading(false)
                console.log(data)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        })()
    }, [])
    return {loading}
}

export default useLoadingWithRefresh
