import { 
    CALENDAR_SCHEDULE_CREATE_FAIL, 
    CALENDAR_SCHEDULE_CREATE_REQUEST, 
    CALENDAR_SCHEDULE_CREATE_RESET, 
    CALENDAR_SCHEDULE_CREATE_SUCCESS, 
    CALENDAR_SCHEDULE_LIST_FAIL, 
    CALENDAR_SCHEDULE_LIST_REQUEST,
    CALENDAR_SCHEDULE_LIST_RESET,
    CALENDAR_SCHEDULE_LIST_SUCCESS,
} from "../../constants/Sales/salesCalendarScheduleConstants"

// LIST  CALENDAR SCHEDULE REDUCER
export const calendarScheduleListReducer = (state = { calendar: [] }, action ) => {
    switch(action.type) {
        case CALENDAR_SCHEDULE_LIST_REQUEST:
            return { loading: true }
        case CALENDAR_SCHEDULE_LIST_SUCCESS:
            return { loading: false, calendar: action.payload }
        case CALENDAR_SCHEDULE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case CALENDAR_SCHEDULE_LIST_RESET:
            return { calendar: [] }
        default:
            return state
    }
}

// CREATE CALENDAR SCHEDULE UNIT REDUCER
export const calendarScheduleCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case CALENDAR_SCHEDULE_CREATE_REQUEST:
            return { loading: true}
        case CALENDAR_SCHEDULE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case CALENDAR_SCHEDULE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case CALENDAR_SCHEDULE_CREATE_RESET:
            return {}
        default:
            return state
    }
}