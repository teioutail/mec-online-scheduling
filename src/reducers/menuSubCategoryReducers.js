import { 
    SUB_CATEGORY_LIST_REQUEST,
    SUB_CATEGORY_LIST_SUCCESS,
    SUB_CATEGORY_LIST_FAIL,
    SUB_CATEGORY_LIST_RESET,
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
