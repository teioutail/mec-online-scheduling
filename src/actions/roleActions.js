import axios from 'axios'
// Roles Actions
import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
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
    console.warn(`it sucks ${id}`)
}