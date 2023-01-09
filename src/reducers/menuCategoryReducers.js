import { 
    MENU_CATEGORY_LIST_REQUEST,
    MENU_CATEGORY_LIST_SUCCESS,
    MENU_CATEGORY_LIST_FAIL,
    MENU_CATEGORY_LIST_RESET,
    MENU_CATEGORY_DETAILS_REQUEST,
    MENU_CATEGORY_DETAILS_SUCCESS,
    MENU_CATEGORY_DETAILS_RESET,
    MENU_CATEGORY_DETAILS_FAIL,
    MENU_CATEGORY_UPDATE_REQUEST,
    MENU_CATEGORY_UPDATE_SUCCESS,
    MENU_CATEGORY_UPDATE_FAIL,
    MENU_CATEGORY_UPDATE_RESET,
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

// Get Selected Category Detail
export const menuCategoryDetailsReducer = (state= { category: {} } , action) => {
    //
    switch(action.type) {
        case MENU_CATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true }
        case MENU_CATEGORY_DETAILS_SUCCESS:
            return { loading: false, category: action.payload }
        case MENU_CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case MENU_CATEGORY_DETAILS_RESET:
            return { category: {} }
        default: 
            return state
    }
}

// Category Update Reducer
export const menuCategoryUpdateReducer = (state = { category: {} }, action) => {
    switch(action.type) {
        case MENU_CATEGORY_UPDATE_REQUEST:
            return { loading: true }
        case MENU_CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case MENU_CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case MENU_CATEGORY_UPDATE_RESET:
            return {
                category: {}
            }
        default:
            return state
    }
}
