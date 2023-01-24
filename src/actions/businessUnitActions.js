import axios from 'axios'
import { 
    BUSINESS_UNIT_CREATE_FAIL,
    BUSINESS_UNIT_CREATE_REQUEST,
    BUSINESS_UNIT_CREATE_SUCCESS,
    BUSINESS_UNIT_DETAILS_FAIL,
    BUSINESS_UNIT_DETAILS_REQUEST,
    BUSINESS_UNIT_DETAILS_RESET,
    BUSINESS_UNIT_DETAILS_SUCCESS,
    BUSINESS_UNIT_LIST_FAIL,
    BUSINESS_UNIT_LIST_OPTION_FAIL, 
    BUSINESS_UNIT_LIST_OPTION_REQUEST, 
    BUSINESS_UNIT_LIST_OPTION_SUCCESS,
    BUSINESS_UNIT_LIST_REQUEST,
    BUSINESS_UNIT_LIST_SUCCESS,
} from "../constants/businessUnitConstants"

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
        const { data } = await axios.get(`/auth/business-unit`, config)
        
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

// Get Role Details Action
export const getBusinessUnitDetails = (id) => async(dispatch, getState) => {
    // 
    try {
        dispatch({
            type: BUSINESS_UNIT_DETAILS_RESET,
        })

        dispatch({
            type: BUSINESS_UNIT_DETAILS_REQUEST,
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
        const { data } = await axios.get(`/auth/business-unit/${id}`, config)

        dispatch({
            type: BUSINESS_UNIT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: BUSINESS_UNIT_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// CREATE NEW BUSINESS UNIT
export const createBusinessUnit = (business) => async (dispatch) => {
   //
   try {
        dispatch({
            type: BUSINESS_UNIT_CREATE_REQUEST,
        })
        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post(
            `/auth/business-unit`,
            business,
            config
        )

        console.warn(data)
        
        dispatch({
            type: BUSINESS_UNIT_CREATE_SUCCESS,
            payload: data,
        })

   } catch(error) {
        //
        dispatch({
            type: BUSINESS_UNIT_CREATE_FAIL,
            payload: error.response.data.errors,
        })
   }
}

// View List of Business Unit
export const listBusinessUnitOption = () => async (dispatch, getState) => {
    // 
    try {
        dispatch({
            type: BUSINESS_UNIT_LIST_OPTION_REQUEST,
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
            type: BUSINESS_UNIT_LIST_OPTION_SUCCESS,
            payload: data
        })

    } catch(error) {
        //
        dispatch({
            type: BUSINESS_UNIT_LIST_OPTION_FAIL,
            payload: error.response.data.errors,
        })
    }
}
