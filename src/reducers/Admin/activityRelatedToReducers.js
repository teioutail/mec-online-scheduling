import { 
    ACTIVITY_RELATED_CREATE_FAIL,
    ACTIVITY_RELATED_CREATE_REQUEST,
    ACTIVITY_RELATED_CREATE_RESET,
    ACTIVITY_RELATED_CREATE_SUCCESS,
    ACTIVITY_RELATED_DETAILS_FAIL,
    ACTIVITY_RELATED_DETAILS_REQUEST,
    ACTIVITY_RELATED_DETAILS_RESET,
    ACTIVITY_RELATED_DETAILS_SUCCESS,
    ACTIVITY_RELATED_LIST_FAIL, 
    ACTIVITY_RELATED_LIST_REQUEST,
    ACTIVITY_RELATED_LIST_RESET, 
    ACTIVITY_RELATED_LIST_SUCCESS,
    ACTIVITY_RELATED_UPDATE_FAIL,
    ACTIVITY_RELATED_UPDATE_REQUEST,
    ACTIVITY_RELATED_UPDATE_RESET,
    ACTIVITY_RELATED_UPDATE_SUCCESS,
} from "../../constants/Admin/activityRelatedToConstants"

// ACTIVITY RELATED TO REDUCER
export const activityRelatedToListReducer = (state = { activity: [] }, action ) => {
    switch(action.type) {
        case ACTIVITY_RELATED_LIST_REQUEST:
            return { loading: true }
        case ACTIVITY_RELATED_LIST_SUCCESS:
            return { loading: false, activity: action.payload }
        case ACTIVITY_RELATED_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_RELATED_LIST_RESET:
            return { activity: [] }
        default:
            return state
    }
}

// GET SELECTED ACTIVITY RELATED DETAILS
export const activityRelatedToDetailsReducer = (state= { activity: {} } , action) => {
    //
    switch(action.type) {
        case ACTIVITY_RELATED_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ACTIVITY_RELATED_DETAILS_SUCCESS:
            return { loading: false, activity: action.payload }
        case ACTIVITY_RELATED_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_RELATED_DETAILS_RESET:
            return { activity: {} }
        default: 
            return state
    }
}

// CREATE ACTIVITY RELATED TO REDUCER
export const activityRelatedToCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case ACTIVITY_RELATED_CREATE_REQUEST:
            return { loading: true}
        case ACTIVITY_RELATED_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ACTIVITY_RELATED_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_RELATED_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// UPDATE ACTIVITY RELATED TO REDUCER
export const activityRelatedToUpdateReducer = (state = { activity: {} }, action) => {
    switch(action.type) {
        case ACTIVITY_RELATED_UPDATE_REQUEST:
            return { loading: true }
        case ACTIVITY_RELATED_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ACTIVITY_RELATED_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_RELATED_UPDATE_RESET:
            return {
                activity: {}
            }
        default:
            return state
    }
}