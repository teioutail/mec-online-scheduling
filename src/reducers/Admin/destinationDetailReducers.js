import { 
    DESTINATION_CREATE_FAIL,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_CREATE_RESET,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_LIST_FAIL, 
    DESTINATION_LIST_REQUEST, 
    DESTINATION_LIST_RESET, 
    DESTINATION_LIST_SUCCESS,
} from "../../constants/Admin/destinationDetailsConstant"

// LIST DESTINATION REDUCER
export const destinationListReducer = (state = { destination: [] }, action ) => {
    switch(action.type) {
        case DESTINATION_LIST_REQUEST:
            return { loading: true }
        case DESTINATION_LIST_SUCCESS:
            return { loading: false, destination: action.payload }
        case DESTINATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_LIST_RESET:
            return { destination: [] }
        default:
            return state
    }
}

// CREATE DESTINATION REDUCER
export const destinationCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case DESTINATION_CREATE_REQUEST:
            return { loading: true}
        case DESTINATION_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case DESTINATION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_CREATE_RESET:
            return {}
        default:
            return state
    }
}