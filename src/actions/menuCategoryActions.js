import axios from 'axios'

// Menu Category Actions
import { 
    MENU_CATEGORY_LIST_REQUEST,
    MENU_CATEGORY_LIST_SUCCESS,
    MENU_CATEGORY_LIST_RESET,
    MENU_CATEGORY_LIST_FAIL,
} from '../constants/menuCategoryConstants'

// View List of Menu Categories
export const listMenuCategories = () => async (dispatch, getState) => {
    //
    try {

        alert("testing 231");
        
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