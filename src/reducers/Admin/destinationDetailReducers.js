import { 
    DESTINATION_CREATE_FAIL,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_CREATE_RESET,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_DELETE_FAIL,
    DESTINATION_DELETE_REQUEST,
    DESTINATION_DELETE_SUCCESS,
    DESTINATION_DETAILS_FAIL,
    DESTINATION_DETAILS_REQUEST,
    DESTINATION_DETAILS_RESET,
    DESTINATION_DETAILS_SUCCESS,
    DESTINATION_LIST_FAIL, 
    DESTINATION_LIST_REQUEST, 
    DESTINATION_LIST_RESET, 
    DESTINATION_LIST_SUCCESS,
    DESTINATION_UPDATE_FAIL,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_RESET,
    DESTINATION_UPDATE_SUCCESS,
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

// UPDATE DESTINATION REDUCER
export const destinationUpdateReducer = (state = { destination: {} }, action) => {
    switch(action.type) {
        case DESTINATION_UPDATE_REQUEST:
            return { loading: true }
        case DESTINATION_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case DESTINATION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_UPDATE_RESET:
            return {
                destination: {}
            }
        default:
            return state
    }
}


// DELETE DESTINATION REDUCER
export const destinationDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case DESTINATION_DELETE_REQUEST:
            return { loading: true }
        case DESTINATION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DESTINATION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// GET SELECTED DESTINATION DETAILS
export const destinationDetailsReducer = (state= { destination: {} } , action) => {
    //
    switch(action.type) {
        case DESTINATION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DESTINATION_DETAILS_SUCCESS:
            return { loading: false, destination: action.payload }
        case DESTINATION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_DETAILS_RESET:
            return { destination: {} }
        default: 
            return state
    }
}