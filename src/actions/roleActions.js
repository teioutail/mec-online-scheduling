import axios from 'axios'
// Roles Actions
import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_DETAILS_RESET,
    ROLE_DETAILS_REQUEST,
    ROLE_DETAILS_SUCCESS,
    ROLE_DETAILS_FAIL,
    ROLE_UPDATE_REQUEST,
    ROLE_UPDATE_SUCCESS,
    ROLE_UPDATE_FAIL,
    ROLE_CREATE_REQUEST,
    ROLE_CREATE_SUCCESS,
    ROLE_CREATE_FAIL,
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAIL,
} from '../constants/roleConstants'
// View List of Roles
export const listRoles = () => async (dispatch, getState) => {
    // 
    try {

        dispatch({
            type: ROLE_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()
        // console.warn(userInfo)

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }

        // Call API Request
        const { data } = await axios.get(`/auth/roles`, config)
        
        dispatch({
            type: ROLE_LIST_SUCCESS,
            payload: data
        })

        // console.warn(data)

    } catch(error) {
        //
        dispatch({
            type: ROLE_LIST_FAIL,
            payload:    
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Get Role Details Action
export const getRoleDetails = (id) => async(dispatch, getState) => {
    // 
    // console.warn(`it sucks ${id}`)
    try {
        dispatch({
            type: ROLE_DETAILS_RESET,
        })

        dispatch({
            type: ROLE_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        // Header
        const config = {
            headers: {
                'Conent-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }

        // Call API Request
        const { data } = await axios.get(`/auth/roles/${id}`, config)

        dispatch({
            type: ROLE_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: ROLE_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Delete Role
export const deleteRole = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: ROLE_DELETE_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        const { data } = await axios.delete(`/auth/users/${id}`, config)

        console.warn(data)
        
        dispatch({
            type: ROLE_DELETE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: ROLE_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Create New Role
export const createRole = (role) => async (dispatch) => {
   //
   try {
        dispatch({
            type: ROLE_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post(
            '/auth/roles',
            role, 
            config
        )

        dispatch({
            type: ROLE_CREATE_SUCCESS,
            payload: data,
        })

   } catch(error) {
        //
        dispatch({
            type: ROLE_CREATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
   }
}

// Update Role
export const updateRole = (role) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: ROLE_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/auth/roles/${role.id}`, role, config)

        // console.warn(data)

        dispatch({
            type: ROLE_UPDATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: ROLE_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

