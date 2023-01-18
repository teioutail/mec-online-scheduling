import axios from 'axios'
import { 
    SCHEDULE_REFERENCE_CREATE_FAIL,
    SCHEDULE_REFERENCE_CREATE_REQUEST,
    SCHEDULE_REFERENCE_CREATE_SUCCESS,
    SCHEDULE_REFERENCE_DETAILS_FAIL,
    SCHEDULE_REFERENCE_DETAILS_REQUEST,
    SCHEDULE_REFERENCE_DETAILS_RESET,
    SCHEDULE_REFERENCE_DETAILS_SUCCESS,
    SCHEDULE_REFERENCE_LIST_FAIL, 
    SCHEDULE_REFERENCE_LIST_REQUEST, 
    SCHEDULE_REFERENCE_LIST_SUCCESS 
} from '../../constants/Sales/salesScheduleReference'

// Schedule Reference

// View List of Schedule Reference
export const listScheduleReference = () => async (dispatch, getState) => {
    //
    try {

        dispatch({
            type: SCHEDULE_REFERENCE_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()
        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/schedulereference`, config)

        dispatch({
            type: SCHEDULE_REFERENCE_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        //
        dispatch({
            type: SCHEDULE_REFERENCE_LIST_FAIL,
            payload: error.response.data.errors
        })
    }
}

// Create New Schedule Reference
export const createScheduleReference = (schedule) => async (dispatch) => {
    //
    try 
    {
        dispatch({
            type: SCHEDULE_REFERENCE_CREATE_REQUEST,
        })
        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/schedulereference', schedule, config)

        dispatch({
            type: SCHEDULE_REFERENCE_CREATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: SCHEDULE_REFERENCE_CREATE_FAIL,
            payload: error.response.data.errors,
        })
    }
} 


// Get Schedule Reference Details Action
export const scheduleReferenceDetails = (id) => async(dispatch, getState) => {
    // 
    try {
        dispatch({
            type: SCHEDULE_REFERENCE_DETAILS_RESET,
        })

        dispatch({
            type: SCHEDULE_REFERENCE_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/auth/schedulereference/${id}`, config)

        dispatch({
            type: SCHEDULE_REFERENCE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch(error) {
        // 
        dispatch({
            type: SCHEDULE_REFERENCE_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}