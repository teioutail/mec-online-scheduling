import { 
    BUSINESS_UNIT_CREATE_FAIL,
    BUSINESS_UNIT_CREATE_REQUEST,
    BUSINESS_UNIT_CREATE_RESET,
    BUSINESS_UNIT_CREATE_SUCCESS,
    BUSINESS_UNIT_DETAILS_FAIL,
    BUSINESS_UNIT_DETAILS_REQUEST,
    BUSINESS_UNIT_DETAILS_RESET,
    BUSINESS_UNIT_DETAILS_SUCCESS,
    BUSINESS_UNIT_LIST_FAIL,
    BUSINESS_UNIT_LIST_OPTION_FAIL, 
    BUSINESS_UNIT_LIST_OPTION_REQUEST, 
    BUSINESS_UNIT_LIST_OPTION_RESET, 
    BUSINESS_UNIT_LIST_OPTION_SUCCESS, 
    BUSINESS_UNIT_LIST_REQUEST,
    BUSINESS_UNIT_LIST_RESET,
    BUSINESS_UNIT_LIST_SUCCESS,
    BUSINESS_UNIT_UPDATE_FAIL,
    BUSINESS_UNIT_UPDATE_REQUEST,
    BUSINESS_UNIT_UPDATE_SUCCESS
} from "../constants/businessUnitConstants"

// BUSINESS UNIT REDUCER
export const businessUnitListReducer = (state = { business: [] }, action ) => {
    switch(action.type) {
        case BUSINESS_UNIT_LIST_REQUEST:
            return { loading: true }
        case BUSINESS_UNIT_LIST_SUCCESS:
            return { loading: false, business: action.payload }
        case BUSINESS_UNIT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case BUSINESS_UNIT_LIST_RESET:
            return { business: [] }
        default:
            return state
    }
}

// GET SELECTED BUSINESS UNIT DETAILS
export const businessUnitDetailsReducer = (state= { business: {} } , action) => {
    //
    switch(action.type) {
        case BUSINESS_UNIT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case BUSINESS_UNIT_DETAILS_SUCCESS:
            return { loading: false, business: action.payload }
        case BUSINESS_UNIT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case BUSINESS_UNIT_DETAILS_RESET:
            return { business: {} }
        default: 
            return state
    }
}

// BUSINESS UNIT OPTION REDUCER
export const businessUnitListOptionReducer = (state = { business: [] }, action ) => {
    //
    switch(action.type) {
        case BUSINESS_UNIT_LIST_OPTION_REQUEST:
            return { loading: true }
        case BUSINESS_UNIT_LIST_OPTION_SUCCESS:
            return { loading: false, business: action.payload }
        case BUSINESS_UNIT_LIST_OPTION_FAIL:
            return { loading: false, error: action.payload }
        case BUSINESS_UNIT_LIST_OPTION_RESET:
            return { business: [] }
        default:
            return state
    }
}

// CREATE BUSINESS UNIT REDUCER
export const businessUnitCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case BUSINESS_UNIT_CREATE_REQUEST:
            return { loading: true}
        case BUSINESS_UNIT_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case BUSINESS_UNIT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case BUSINESS_UNIT_CREATE_FAIL:
            return {}
        default:
            return state
    }
}

// UPDATE BUSINESS UNIT REDUCER
export const businessUnitUpdateReducer = (state = { business: {} }, action) => {
    switch(action.type) {
        case BUSINESS_UNIT_UPDATE_REQUEST:
            return { loading: true }
        case BUSINESS_UNIT_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case BUSINESS_UNIT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case BUSINESS_UNIT_UPDATE_FAIL:
            return {
                business: {}
            }
        default:
            return state
    }
}