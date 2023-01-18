import { 
    SCHEDULE_REFERENCE_CREATE_FAIL, 
    SCHEDULE_REFERENCE_CREATE_REQUEST, 
    SCHEDULE_REFERENCE_CREATE_RESET, 
    SCHEDULE_REFERENCE_CREATE_SUCCESS, 
    SCHEDULE_REFERENCE_LIST_FAIL, 
    SCHEDULE_REFERENCE_LIST_REQUEST, 
    SCHEDULE_REFERENCE_LIST_RESET, 
    SCHEDULE_REFERENCE_LIST_SUCCESS 
} from "../../constants/Sales/salesScheduleReference"

// SCHEDULE REFERENCE REDUCER
export const scheduleReferenceListReducer = (state = { schedules: [] }, action ) => {
    //
    switch(action.type) {
        case SCHEDULE_REFERENCE_LIST_REQUEST:
            return { loading: true }
        case SCHEDULE_REFERENCE_LIST_SUCCESS:
            return { loading: false, schedules: action.payload }
        case SCHEDULE_REFERENCE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case SCHEDULE_REFERENCE_LIST_RESET:
            return { schedules: [] }
        default:
            return state
    }
}

// Create Schedule Reference Reducer
export const scheduleReferenceCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case SCHEDULE_REFERENCE_CREATE_REQUEST:
            return { loading: true}
        case SCHEDULE_REFERENCE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case SCHEDULE_REFERENCE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SCHEDULE_REFERENCE_CREATE_RESET:
            return {}
        default:
            return state
    }
}