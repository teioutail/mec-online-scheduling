import axios from 'axios'
// Roles Actions
import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
    ROLE_DETAILS_RESET,
    ROLE_DETAILS_REQUEST,
    ROLE_DETAILS_SUCCESS,
    ROLE_DETAILS_FAIL,
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