import axios from 'axios'
import { 
    DESTINATION_CREATE_FAIL,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_LIST_FAIL,
    DESTINATION_LIST_REQUEST, 
    DESTINATION_LIST_SUCCESS,
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