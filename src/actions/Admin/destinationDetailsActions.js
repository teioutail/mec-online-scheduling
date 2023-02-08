import axios from 'axios'
import { 
    DESTINATION_CREATE_FAIL,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_DELETE_FAIL,
    DESTINATION_DELETE_REQUEST,
    DESTINATION_DELETE_SUCCESS,
    DESTINATION_DETAILS_FAIL,
    DESTINATION_DETAILS_REQUEST,
    DESTINATION_DETAILS_RESET,
    DESTINATION_DETAILS_SUCCESS,
    DESTINATION_LIST_FAIL,
    DESTINATION_LIST_OPTION_FAIL,
    DESTINATION_LIST_OPTION_REQUEST,
    DESTINATION_LIST_OPTION_SUCCESS,
    DESTINATION_LIST_REQUEST, 
    DESTINATION_LIST_SUCCESS,
    DESTINATION_UPDATE_FAIL,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_SUCCESS,
} from '../../constants/Admin/destinationDetailsConstant'

// View List of Destination
export const listDestination = () => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: DESTINATION_LIST_REQUEST
        })

        const { userLogin : { userInfo }} = getState()
        // 
        const config = {
            headers: {
                'Authorization' : `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/destination`, config)

        dispatch({
            type: DESTINATION_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        //
        dispatch({
            type: DESTINATION_LIST_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Create New Destination Reference
export const createDestination = (destination) => async (dispatch) => {
    //
    try 
    {
        dispatch({
            type: DESTINATION_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post('/auth/destination', destination, config)

        dispatch({
            type: DESTINATION_CREATE_SUCCESS,
            payload: data,
        })

        // console.warn(data)

    } catch(error) {
        //
        dispatch({
            type: DESTINATION_CREATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// UPDATE DESTINATION
export const updateDestination = (destination) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: DESTINATION_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/auth/destination/${destination.id}`, destination, config)
        // console.warn(data)

        dispatch({
            type: DESTINATION_UPDATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: DESTINATION_UPDATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Get Destination Details Action
export const getDestinationDetails = (id) => async(dispatch, getState) => {
    // 
    try {
        dispatch({
            type: DESTINATION_DETAILS_RESET,
        })

        dispatch({
            type: DESTINATION_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/auth/destination/${id}/edit`, config)

        dispatch({
            type: DESTINATION_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: DESTINATION_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// DELETE DESTINATION
export const deleteDestination = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: DESTINATION_DELETE_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }

        // Call API Request
        await axios.delete(`/auth/destination/${id}`, config)

        dispatch({
            type: DESTINATION_DELETE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: DESTINATION_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// View List of Destination
export const listDestinationOption = () => async (dispatch, getState) => {
    // 
    try {
        dispatch({
            type: DESTINATION_LIST_OPTION_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/destination-option`, config)

        dispatch({
            type: DESTINATION_LIST_OPTION_SUCCESS,
            payload: data
        })

    } catch(error) {
        //
        dispatch({
            type: DESTINATION_LIST_OPTION_FAIL,
            payload: error.response.data.errors,
        })
    }
}