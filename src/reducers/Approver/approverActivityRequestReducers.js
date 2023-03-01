import { 
    ACTIVITY_FOR_APPROVER_LIST_FAIL, 
    ACTIVITY_FOR_APPROVER_LIST_REQUEST, 
    ACTIVITY_FOR_APPROVER_LIST_RESET, 
    ACTIVITY_FOR_APPROVER_LIST_SUCCESS,
    ACTIVITY_FOR_APPROVER_UPDATE_FAIL,
    ACTIVITY_FOR_APPROVER_UPDATE_REQUEST,
    ACTIVITY_FOR_APPROVER_UPDATE_RESET,
    ACTIVITY_FOR_APPROVER_UPDATE_SUCCESS,
} from "../../constants/Approver/approverActivityRequestConstants"

// ACTIVITY REQUEST LIST REDUCER
export const approverActivityListReducer = (state = { activity: [] }, action ) => {
    switch(action.type) {
        case ACTIVITY_FOR_APPROVER_LIST_REQUEST:
            return { loading: true }
        case ACTIVITY_FOR_APPROVER_LIST_SUCCESS:
            return { loading: false, activity: action.payload }
        case ACTIVITY_FOR_APPROVER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_FOR_APPROVER_LIST_RESET:
            return { activity: [] }
        default:
            return state
    }
}

// ACTIVITY REQUEST UPDATE REDUCER
export const approverActivityUpdateReducer = (state = { activity: {} }, action) => {
    switch(action.type) {
        case ACTIVITY_FOR_APPROVER_UPDATE_REQUEST:
            return { loading: true }
        case ACTIVITY_FOR_APPROVER_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case ACTIVITY_FOR_APPROVER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ACTIVITY_FOR_APPROVER_UPDATE_RESET:
            return {
                activity: {}
            }
        default:
            return state
    }
}