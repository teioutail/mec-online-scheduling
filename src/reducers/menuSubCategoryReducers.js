import { 
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_RESET,
    SUB_CATEGORY_DETAILS_REQUEST,
    SUB_CATEGORY_DETAILS_SUCCESS,
    SUB_CATEGORY_DETAILS_FAIL,
    SUB_CATEGORY_DETAILS_RESET,
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