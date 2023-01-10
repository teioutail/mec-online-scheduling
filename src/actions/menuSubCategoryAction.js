import axios from 'axios'

// Sub Menu Category Actions
import { 
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_RESET,
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