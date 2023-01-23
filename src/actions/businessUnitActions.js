import axios from 'axios'

import { 
    BUSINESS_UNIT_LIST_FAIL, 
    BUSINESS_UNIT_LIST_REQUEST, 
    BUSINESS_UNIT_LIST_SUCCESS,
} from "../constants/businessUnit"

// View List of Business Unit
export const listBusinessUnit = () => async (dispatch, getState) => {
    // 
    try {
        dispatch({
            type: BUSINESS_UNIT_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/business-unit-option`, config)
        
        dispatch({
            type: BUSINESS_UNIT_LIST_SUCCESS,
            payload: data
        })

        // console.warn(data)

    } catch(error) {
        //
        dispatch({
            type: BUSINESS_UNIT_LIST_FAIL,
            payload: error.response.data.errors,
        })
    }
}
