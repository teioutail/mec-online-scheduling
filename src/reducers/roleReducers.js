import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
    ROLE_DETAILS_REQUEST,
    ROLE_DETAILS_SUCCESS,
    ROLE_DETAILS_FAIL,
    ROLE_DETAILS_RESET,
    ROLE_UPDATE_REQUEST,
    ROLE_UPDATE_SUCCESS,
    ROLE_UPDATE_FAIL,
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

// Get Selected Role Detail
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

// Role Update Reducer
export const roleUpdateReducer = (state = { role: {} }, action) => {
    switch(action.type) {
        case ROLE_UPDATE_REQUEST:
            return { loading: true }
        case ROLE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ROLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ROLE_UPDATE_FAIL:
            return {
                role: {}
            }
        default:
            return state
    }
}
