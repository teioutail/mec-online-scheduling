import axios from 'axios'

// Menu Category Actions
import { 
    MENU_CATEGORY_LIST_REQUEST,
    MENU_CATEGORY_LIST_SUCCESS,
    MENU_CATEGORY_LIST_FAIL,
    MENU_CATEGORY_DETAILS_REQUEST,
    MENU_CATEGORY_DETAILS_SUCCESS,
    MENU_CATEGORY_DETAILS_FAIL,
    MENU_CATEGORY_DETAILS_RESET,
    MENU_CATEGORY_UPDATE_FAIL,
    MENU_CATEGORY_UPDATE_REQUEST,
    MENU_CATEGORY_UPDATE_SUCCESS,
    MENU_CATEGORY_CREATE_REQUEST,
    MENU_CATEGORY_CREATE_SUCCESS,
    MENU_CATEGORY_CREATE_FAIL,
    MENU_CATEGORY_CREATE_RESET,
} from '../constants/menuCategoryConstants'

// View List of Menu Categories
export const listMenuCategories = () => async (dispatch, getState) => {
    //
    try {

        dispatch({
            type: MENU_CATEGORY_LIST_REQUEST,
        })

        const { userLogin : { userInfo} } = getState()
        // console.warn(userInfo)

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }

        // Call API Request

        const { data } = await axios.get(`/auth/category`, config)

        dispatch({
            type: MENU_CATEGORY_LIST_SUCCESS,
            payload: data
        })
        // console.warn(data)


    } catch(error) {
        //
        dispatch({
            type: MENU_CATEGORY_LIST_FAIL,
            payload:    
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Get Menu Category Details
export const getMenuCategoryDetails = (id) => async(dispatch, getState) => {
    //
    try {
        dispatch({
            type: MENU_CATEGORY_DETAILS_RESET,
        })

        dispatch({
            type: MENU_CATEGORY_DETAILS_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }

        // Call API Request
        const { data } = await axios.get(`/auth/category/${id}`, config)
        // console.warn(data)

        dispatch({
            type: MENU_CATEGORY_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // 
        dispatch({
            type: MENU_CATEGORY_DETAILS_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

// Update Category
export const updateMenuCategory = (category) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: MENU_CATEGORY_UPDATE_REQUEST
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
        const { data } = await axios.put(`/auth/category/${category.id}`, category, config)

        // console.warn(data)

        dispatch({
            type: MENU_CATEGORY_UPDATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: MENU_CATEGORY_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
} 

// Create New Menu Category
export const createMenuCategory = (category) => async (dispatch) => {
    //
    try {

        dispatch({
            type: MENU_CATEGORY_CREATE_REQUEST,
        })

        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        // Call API Request
        const { data } = await axios.post('/auth/category', category, config)

        dispatch({
            type: MENU_CATEGORY_CREATE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: MENU_CATEGORY_CREATE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}