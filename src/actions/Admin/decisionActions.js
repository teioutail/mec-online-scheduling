import axios from 'axios'
import { 
    DECISION_CREATE_FAIL, 
    DECISION_CREATE_REQUEST, 
    DECISION_CREATE_SUCCESS, 
    DECISION_LIST_FAIL,
    DECISION_LIST_REQUEST, 
    DECISION_LIST_SUCCESS,
    DECISION_DETAILS_FAIL,
    DECISION_DETAILS_REQUEST,
    DECISION_DETAILS_RESET,
    DECISION_DETAILS_SUCCESS,
    DECISION_UPDATE_FAIL,
    DECISION_UPDATE_REQUEST,
    DECISION_UPDATE_SUCCESS,
    DECISION_DELETE_REQUEST,
    DECISION_DELETE_SUCCESS,
    DECISION_DELETE_FAIL,
} from '../../constants/Admin/decisionConstants'

// View List of Decision
export const listDecision = () => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: DECISION_LIST_REQUEST
        })

        const { userLogin : { userInfo }} = getState()
        // 
        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/decision`, config)

        dispatch({
            type: DECISION_LIST_SUCCESS,
            payload: data
        })

        console.warn(data)

    } catch(error) {
        //
        dispatch({
            type: DECISION_LIST_FAIL,
            payload: error.response.data.errors,
        })
    }
} 

// CREATE NEW DECISION
export const createDecision = (decision) => async (dispatch) => {
    //
    try {
        dispatch({
            type: DECISION_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
 
        // Call API Request
        const { data } = await axios.post(
            `/auth/decision`,
            decision,
            config
        )
 
        //  console.warn(data)
 
        dispatch({
            type: DECISION_CREATE_SUCCESS,
            payload: data,
        })
 
    } catch(error) {
         //
         dispatch({
             type: DECISION_CREATE_FAIL,
             payload: error.response.data.errors,
         })
    }
 }

// UPDATE DECISION
export const updateDecision = (decision) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: DECISION_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/auth/decision/${decision.id}`, decision, config)
        // console.warn(data)

        dispatch({
            type: DECISION_UPDATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: DECISION_UPDATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Get Decision Details Action
export const getDecisionDetails = (id) => async(dispatch, getState) => {
    // 
    try {
        dispatch({
            type: DECISION_DETAILS_RESET,
        })

        dispatch({
            type: DECISION_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/auth/decision/${id}/edit`, config)

        dispatch({
            type: DECISION_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: DECISION_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// DELETE DECISION
export const deleteDecision = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: DECISION_DELETE_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        await axios.delete(`/auth/decision/${id}`, config)

        // console.warn(data)
        dispatch({
            type: DECISION_DELETE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: DECISION_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}