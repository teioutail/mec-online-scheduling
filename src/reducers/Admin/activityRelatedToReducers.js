import { 
    ACTIVITY_RELATED_LIST_FAIL, 
    ACTIVITY_RELATED_LIST_REQUEST,
    ACTIVITY_RELATED_LIST_RESET, 
    ACTIVITY_RELATED_LIST_SUCCESS,
} from "../../constants/Admin/activityRelatedToContstants"

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