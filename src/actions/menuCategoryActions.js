import axios from 'axios'

// Menu Category Actions
import { 
    MENU_CATEGORY_LIST_REQUEST,
    MENU_CATEGORY_LIST_SUCCESS,
    MENU_CATEGORY_LIST_FAIL,
    MENU_CATEGORY_DETAILS_REQUEST,
    MENU_CATEGORY_DETAILS_SUCCESS,
    MENU_CATEGORY_DETAILS_FAIL,
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
        alert("abc123 testing lang");

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