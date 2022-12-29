import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
    ROLE_DETAILS_REQUEST,
    ROLE_DETAILS_SUCCESS,
    ROLE_DETAILS_FAIL,
    ROLE_DETAILS_RESET,
 } from "../constants/roleConstants";

// ROLE LIST REDUCER
export const roleListReducer = (state = { roles: [] }, action ) => {
    switch(action.type) {
        case ROLE_LIST_REQUEST:
            return { loading: true }
        case ROLE_LIST_SUCCESS:
            return { loading: false, roles: action.payload }
        case ROLE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ROLE_LIST_RESET:
            return { roles: [] }
        default:
            return state
    }
}

// 
export const roleDetailsReducer = (state= { role: {} } , action) => {
    //
    switch(action.type) {
        case ROLE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ROLE_DETAILS_SUCCESS:
            return { loading: false, role: action.payload }
        case ROLE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ROLE_DETAILS_RESET:
            return { role: {} }
        default: 
            return state
    }
}
