import axios from 'axios'

// Sub Menu Category Actions
import { 
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_RESET,
    SUB_CATEGORY_DETAILS_FAIL,
    SUB_CATEGORY_DETAILS_REQUEST,
    SUB_CATEGORY_DETAILS_SUCCESS,
    SUB_CATEGORY_UPDATE_FAIL,
    SUB_CATEGORY_UPDATE_REQUEST,
    SUB_CATEGORY_CREATE_FAIL,
    SUB_CATEGORY_CREATE_REQUEST,
    SUB_CATEGORY_CREATE_SUCCESS,
    SUB_CATEGORY_DELETE_FAIL,
    SUB_CATEGORY_DELETE_REQUEST,
    SUB_CATEGORY_DELETE_SUCCESS,
    SUB_CATEGORY_UPDATE_ACCESS_REQUEST,
    SUB_CATEGORY_UPDATE_ACCESS_SUCCESS,
    SUB_CATEGORY_UPDATE_ACCESS_FAIL,
} from '../constants/menuSubCategoryConstants'

// View List of Sub-Menu Categories
export const listSubMenuCategories = () => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: SUB_CATEGORY_LIST_REQUEST,
        })

        const { userLogin : { userInfo } } = getState()
        // console.warn(userInfo)

        // Header
        const config = {
            headers: {
                'Authorization':`Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/subcategory`, config)
        
        dispatch({
            type: SUB_CATEGORY_LIST_SUCCESS,
            payload: data
        })

    } catch(error) {
        //
        dispatch({
            type: SUB_CATEGORY_LIST_FAIL,
            payload:    
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Get Menu Sub Category Details
export const getSubMenuCategoryDetails = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: SUB_CATEGORY_DETAILS_REQUEST,
        })

        const { userLogin : { userInfo } } = getState()

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }

        // Call API Request
        const { data } = await axios.get(`/auth/subcategory/${id}/edit`, config)

        dispatch({
            type: SUB_CATEGORY_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: SUB_CATEGORY_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Update Sub-Category
export const updateSubMenuCategory = (subcategory) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: SUB_CATEGORY_UPDATE_REQUEST,
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
        const { data } = await axios.put(`/auth/subcategory/${subcategory.id}`, subcategory, config)

        console.warn(data);
        
    } catch(error) {
        //
        dispatch({
            type: SUB_CATEGORY_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Create New Sub-Menu Category
export const createSubMenuCategory = (subcategory) => async (dispatch) => {
    try {

        dispatch({
            type: SUB_CATEGORY_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post('/auth/subcategory', subcategory, config)

        console.warn(data)

        dispatch({
            type: SUB_CATEGORY_CREATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: SUB_CATEGORY_CREATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Delete Sub-Menu Category
export const deleteSubMenuCategory = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: SUB_CATEGORY_DELETE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            }
        }

        // Call API Request
        const { data } = await axios.delete(`/auth/subcategory/${id}`, config)

        dispatch({
            type: SUB_CATEGORY_DELETE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: SUB_CATEGORY_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.errors 
            : error.message,
        })
    }

}

// Update Sub-Menu 
export const updateSubMenuRoleAccess = (details) => async (dispatch, getState) => {
    //
    try {
        // console.warn(details)
        
        dispatch({
            type: SUB_CATEGORY_UPDATE_ACCESS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            }
        }
        // Call API Request
        const { data } = await axios.post(`/auth/subcategory-per-role/${details.value}`, details, config);
        //
        dispatch({
            type: SUB_CATEGORY_UPDATE_ACCESS_SUCCESS,
        })
        
    } catch(error) {
        //
        dispatch({
            type: SUB_CATEGORY_UPDATE_ACCESS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.errors 
            : error.message,
        })
    } 
}