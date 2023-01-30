import axios from 'axios'
import { 
    ACTIVITY_RELATED_DELETE_FAIL,
    ACTIVITY_RELATED_DELETE_REQUEST,
    ACTIVITY_RELATED_DELETE_SUCCESS,
    ACTIVITY_RELATED_DETAILS_FAIL,
    ACTIVITY_RELATED_DETAILS_REQUEST,
    ACTIVITY_RELATED_DETAILS_RESET,
    ACTIVITY_RELATED_DETAILS_SUCCESS,
    ACTIVITY_RELATED_LIST_FAIL, 
    ACTIVITY_RELATED_LIST_REQUEST, 
    ACTIVITY_RELATED_LIST_SUCCESS,
} from '../../constants/Admin/activityRelatedToConstants'

// View List of Activity Related To
export const listActivityRelatedTo = () => async (dispatch, getState) => {
    // 
    try {
        dispatch({
            type: ACTIVITY_RELATED_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/activity-related`, config)
        
        dispatch({
            type: ACTIVITY_RELATED_LIST_SUCCESS,
            payload: data
        })

        // console.warn(data)
    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_RELATED_LIST_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Get Activity Related Details Action
export const getActivityRelatedToDetails = (id) => async(dispatch, getState) => {
    // 
    try {
        dispatch({
            type: ACTIVITY_RELATED_DETAILS_RESET,
        })

        dispatch({
            type: ACTIVITY_RELATED_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/auth/activity-related/${id}`, config)

        dispatch({
            type: ACTIVITY_RELATED_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: ACTIVITY_RELATED_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Delete Activity Related To
export const deleteActivityRelatedTo = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: ACTIVITY_RELATED_DELETE_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        await axios.delete(`/auth/business-unit/${id}`, config)

        // console.warn(data)
        dispatch({
            type: ACTIVITY_RELATED_DELETE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_RELATED_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}