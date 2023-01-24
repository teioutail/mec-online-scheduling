import { 
    BUSINESS_UNIT_LIST_FAIL,
    BUSINESS_UNIT_LIST_OPTION_FAIL, 
    BUSINESS_UNIT_LIST_OPTION_REQUEST, 
    BUSINESS_UNIT_LIST_OPTION_RESET, 
    BUSINESS_UNIT_LIST_OPTION_SUCCESS, 
    BUSINESS_UNIT_LIST_REQUEST,
    BUSINESS_UNIT_LIST_RESET,
    BUSINESS_UNIT_LIST_SUCCESS
} from "../constants/businessUnit"

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
