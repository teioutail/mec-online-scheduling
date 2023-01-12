import { 
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_RESET,
    SUB_CATEGORY_DETAILS_REQUEST,
    SUB_CATEGORY_DETAILS_SUCCESS,
    SUB_CATEGORY_DETAILS_FAIL,
    SUB_CATEGORY_DETAILS_RESET,
    SUB_CATEGORY_UPDATE_REQUEST,
    SUB_CATEGORY_UPDATE_SUCCESS,
    SUB_CATEGORY_UPDATE_FAIL,
    SUB_CATEGORY_UPDATE_RESET,
    SUB_CATEGORY_CREATE_REQUEST,
    SUB_CATEGORY_CREATE_SUCCESS,
    SUB_CATEGORY_CREATE_FAIL,
    SUB_CATEGORY_CREATE_RESET,
    SUB_CATEGORY_DELETE_REQUEST,
    SUB_CATEGORY_DELETE_SUCCESS,
    SUB_CATEGORY_DELETE_FAIL,
    SUB_CATEGORY_UPDATE_ACCESS_REQUEST,
    SUB_CATEGORY_UPDATE_ACCESS_SUCCESS,
    SUB_CATEGORY_UPDATE_ACCESS_FAIL,
} from "../constants/menuSubCategoryConstants";

 // MENU CATEGORY REDUCER
 export const menuSubCategoryListReducer = (state = { subcategories: [] }, action ) => {
    switch(action.type) {
        case SUB_CATEGORY_LIST_REQUEST:
            return { loading: true }
        case SUB_CATEGORY_LIST_SUCCESS:
            return { loading: false, subcategories: action.payload }
        case SUB_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        case SUB_CATEGORY_LIST_RESET:
            return { subcategories: [] }
        default:
            return state
    }
}

// Get Selected Sub Category Detail
export const menuSubCategoryDetailsReducer = (state= { subcategory: {} } , action) => {
    //
    switch(action.type) {
        case SUB_CATEGORY_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SUB_CATEGORY_DETAILS_SUCCESS:
            return { loading: false, subcategory: action.payload }
        case SUB_CATEGORY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case SUB_CATEGORY_DETAILS_RESET:
            return { subcategory: {} }
        default: 
            return state
    }
}

// Sub-Category Update Reducer
export const menuSubCategoryUpdateReducer = (state = { subcategory: {} }, action) => {
    switch(action.type) {
        case SUB_CATEGORY_UPDATE_REQUEST:
            return { loading: true }
        case SUB_CATEGORY_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case SUB_CATEGORY_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SUB_CATEGORY_UPDATE_RESET:
            return {
                subcategory: {}
            }
        default:
            return state
    }
}

// Create Sub-Menu Category Reducer
export const menuSubCategoryCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case SUB_CATEGORY_CREATE_REQUEST:
            return { loading: true}
        case SUB_CATEGORY_CREATE_SUCCESS:
            return { loading: false, success: true, subcategory: action.payload }
        case SUB_CATEGORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SUB_CATEGORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// Delete Sub-Menu Category Reducer
export const menuSubCategoryDeleteReducer = (state = {}, action) => {
    //
    switch(action.type) {
        case SUB_CATEGORY_DELETE_REQUEST:
            return { loading: true }
        case SUB_CATEGORY_DELETE_SUCCESS:
            return { loading: false, success: true }
        case SUB_CATEGORY_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Sub-Menu Category Role Access Reducer
export const menuSubCategoryUpdateRoleAccessReducer = (state = {}, action) => {
    //
    switch(action.type) {
        case SUB_CATEGORY_UPDATE_ACCESS_REQUEST:
            return { loading: true }
        case SUB_CATEGORY_UPDATE_ACCESS_SUCCESS:
            return { loading: false, success: true }
        case SUB_CATEGORY_UPDATE_ACCESS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

