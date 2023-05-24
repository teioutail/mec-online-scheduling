import { 
    ACTIVITY_UPDATE_CREATE_FAIL, 
    ACTIVITY_UPDATE_CREATE_REQUEST, 
    ACTIVITY_UPDATE_CREATE_RESET, 
    ACTIVITY_UPDATE_CREATE_SUCCESS,
    ACTIVITY_UPDATE_DETAILS_FAIL,
    ACTIVITY_UPDATE_DETAILS_REQUEST,
    ACTIVITY_UPDATE_DETAILS_RESET,
    ACTIVITY_UPDATE_DETAILS_SUCCESS,
    
} from "../../constants/SE/seActivityUpdateConstants"

// Create Activity Update Reducer
export const seActivityUpdateCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case ACTIVITY_UPDATE_CREATE_REQUEST:
            return { loading: true}
        case ACTIVITY_UPDATE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ACTIVITY_UPDATE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_UPDATE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// Get Selected Activity Update Details
export const seActivityUpdateDetailsReducer = (state= { activity: {} } , action) => {
    //
    switch(action.type) {
        case ACTIVITY_UPDATE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ACTIVITY_UPDATE_DETAILS_SUCCESS:
            return { loading: false, activity: action.payload }
        case ACTIVITY_UPDATE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_UPDATE_DETAILS_RESET:
            return { activity: {} }
        default: 
            return state
    }
}