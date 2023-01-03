import axios from 'axios'
// User Actions
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_RESET,
    USER_CREATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL, 
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {

    // Process Login
    try {

        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        // Set Header Configuration
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        // Call API Request
        const { data } = await axios.post(
            '/auth/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // Store in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        //
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Register Action
export const register = (name, email, password) => async (dispatch) => {
    // console.warn(name, email , password) 
    try {
        
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post(
            '/auth/register',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // Save in local storage
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch(error) {
        //
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// View List of Users
export const listUsers = () => async (dispatch, getState) => {
    //
    try {

        dispatch({
            type: USER_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            },
        }

        // API Request
        const { data } = await axios.get(`/auth/users`, config)
        // console.warn(data)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
        // console.warn(userInfo.access_token)

    } catch(error) {
        //
        dispatch({
            type: USER_LIST_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Get User Details Action
export const getUserDetails = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: USER_DETAILS_RESET,
        })
        
        dispatch({
            type: USER_DETAILS_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        // console.log(user)

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        
        // Call API Request
        const { data } = await axios.get(`/auth/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

        // // Get User Details
        // const { userDetails: { user } } = getState()

        // console.warn(user)

    } catch(error) {
        // 
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Add User
export const createUser = (user) => async (dispatch) => {
    //
    try {
        dispatch({
            type: USER_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post(
            '/auth/users',
            user,
            config
        )

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        //
        dispatch({
            type: USER_CREATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Update User
export const updateUser = (user) => async (dispatch, getState) => {
    //
    try {
        // console.warn(user)
        dispatch({ 
            type: USER_UPDATE_REQUEST,
        })

        // Get Login User Info
        const { 
            userLogin: { userInfo },
        } = getState()

        // Header
        const config = {
            headers : {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        const { data } = await axios.put(`/auth/users/${user.id}`, user, config)
        // 
        dispatch({ type: USER_UPDATE_SUCCESS })

    } catch(error) {
        //
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Delete User
export const deleteUser = (id) => async(dispatch, getState) => {
    //
    try {

        dispatch({type: USER_DELETE_REQUEST})

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        await axios.delete(`/auth/users/${id}`, config)
        
        dispatch({ type: USER_DELETE_SUCCESS })

    } catch(error) {
        // 
        dispatch({
            type: USER_DELETE_REQUEST,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    // Clear Local Storage Data
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/signin'
}