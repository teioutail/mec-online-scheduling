import axios from 'axios'
import { 
    ACTIVITY_FOR_APPROVER_APPROVED_FAIL,
    ACTIVITY_FOR_APPROVER_APPROVED_REQUEST,
    ACTIVITY_FOR_APPROVER_APPROVED_SUCCESS,
    ACTIVITY_FOR_APPROVER_LIST_FAIL,
    ACTIVITY_FOR_APPROVER_LIST_REQUEST,
    ACTIVITY_FOR_APPROVER_LIST_SUCCESS,
    ACTIVITY_FOR_APPROVER_UPDATE_FAIL,
    ACTIVITY_FOR_APPROVER_UPDATE_REQUEST,
    ACTIVITY_FOR_APPROVER_UPDATE_SUCCESS,
} from '../../constants/Approver/approverActivityRequestConstants'

// Approver Activity Request Actions

// View List of Activity Request for Approval
export const listActivityRequestForApprover = (user) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: ACTIVITY_FOR_APPROVER_LIST_REQUEST
        }) 

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.post(`/auth/${user.list_type}`, user, config)

        console.warn(data)

        dispatch({
            type: ACTIVITY_FOR_APPROVER_LIST_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_FOR_APPROVER_LIST_FAIL,
            payload:    
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Update Activity Request(Approved, Rejected)
export const approverActivityRequest = (status) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: ACTIVITY_FOR_APPROVER_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/auth/approver-activity-request/${status.id}`, status, config)
        // console.warn(data)

        dispatch({
            type: ACTIVITY_FOR_APPROVER_UPDATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_FOR_APPROVER_UPDATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}