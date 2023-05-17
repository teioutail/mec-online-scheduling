import { 
    SCHEDULE_FOR_SE_LIST_FAIL, 
    SCHEDULE_FOR_SE_LIST_REQUEST, 
    SCHEDULE_FOR_SE_LIST_RESET, 
    SCHEDULE_FOR_SE_LIST_SUCCESS,
} from "../../constants/SE/seScheduleConstants"

// SCHEDULE LIST REDUCER FOR SE
export const seScheduleListReducer = (state = { activity: [] }, action ) => {
    switch(action.type) {
        case SCHEDULE_FOR_SE_LIST_REQUEST:
            return { loading: true }
        case SCHEDULE_FOR_SE_LIST_SUCCESS:
            return { loading: false, activity: action.payload }
        case SCHEDULE_FOR_SE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case SCHEDULE_FOR_SE_LIST_RESET:
            return { activity: [] }
        default:
            return state
    }
}
