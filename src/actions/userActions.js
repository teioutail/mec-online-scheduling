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
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_EMAIL_LIST_FAIL,
    USER_EMAIL_LIST_REQUEST,
    USER_EMAIL_LIST_SUCCESS,
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
export const register = (
        name, 
        email, 
        password, 
        password_confirmation,
        manage_team,
        reporting_team,
        designation,
        username
    ) => async (dispatch) => {

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
            { // Fields
                name,
                email,
                password,
                password_confirmation,
                manage_team,
                reporting_team,
                designation,
                username
            },
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
        
        // Remove userInfo
        document.location.href = '/verify'
        localStorage.removeItem('userInfo')
        // Clear Local Storage Data
        dispatch({ type: USER_LOGOUT })

    } catch(error) {
        //
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.errors,
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

// View Users Email
export const getUsersEmailList = () => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: USER_EMAIL_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()
        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            },
        }

        // API Request
        const { data } = await axios.get(`/auth/useremail`, config)

        dispatch({
            type: USER_EMAIL_LIST_SUCCESS,
            payload: data
        })
        
    } catch(error) {
        // 
        dispatch({
            type: USER_EMAIL_LIST_FAIL,
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

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        
        // Call API Request
        const { data } = await axios.get(`/auth/users/${id}/edit`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

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

// Create New User
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

// RESET USER PASSWORD
export const resetUserPassword = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({ type: USER_RESET_PASSWORD_REQUEST })

        const  { userLogin : { userInfo} } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }
        // Call API Request
        await axios.get(`/auth/users/reset/${id}`, config)

        dispatch({ type: USER_RESET_PASSWORD_SUCCESS })

    } catch(error) {
        // 
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
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

        dispatch({
            type: USER_DELETE_REQUEST,
        })

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
            type: USER_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// // User Account Verification 
// export const verify = (email, token) => async(dispatch, getState) => {
//     // Call API Request
//     const { data } = await axios.post(`/auth/verify/`,{ email, token})
//     console.warn(data)
// }

export const verify = async (email, token) => {
    
    try {

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post(`/auth/verify/`,{ email, token}, config)
        //
        console.warn(data)

    } catch(error) {
        //
        // dispatch({
        //     type: USER_REGISTER_FAIL,
        //     payload: error.response.data.errors,
        // })
        console.warn(error.response.data.errors)
    }
} 

// Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    // Clear Local Storage Data
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/signin'
}