import { 
    MENU_CATEGORY_LIST_REQUEST,
    MENU_CATEGORY_LIST_SUCCESS,
    MENU_CATEGORY_LIST_FAIL,
    MENU_CATEGORY_LIST_RESET,
 } from "../constants/menuCategoryConstants";

 // MENU CATEGORY REDUCER
export const menuCategoryListReducer = (state = { categories: [] }, action ) => {
    switch(action.type) {
        case MENU_CATEGORY_LIST_REQUEST:
            return { loading: true }
        case MENU_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload }
        case MENU_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        case MENU_CATEGORY_LIST_RESET:
            return { categories: [] }
        default:
            return state
    }
}