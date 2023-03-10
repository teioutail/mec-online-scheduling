import { 
    CALENDAR_SCHEDULE_CREATE_FAIL, 
    CALENDAR_SCHEDULE_CREATE_REQUEST, 
    CALENDAR_SCHEDULE_CREATE_RESET, 
    CALENDAR_SCHEDULE_CREATE_SUCCESS, 
    CALENDAR_SCHEDULE_DETAILS_FAIL, 
    CALENDAR_SCHEDULE_DETAILS_REQUEST, 
    CALENDAR_SCHEDULE_DETAILS_RESET, 
    CALENDAR_SCHEDULE_DETAILS_SUCCESS, 
    CALENDAR_SCHEDULE_LIST_FAIL, 
    CALENDAR_SCHEDULE_LIST_REQUEST,
    CALENDAR_SCHEDULE_LIST_RESET,
    CALENDAR_SCHEDULE_LIST_SUCCESS,
    CALENDAR_SCHEDULE_UPDATE_FAIL,
    CALENDAR_SCHEDULE_UPDATE_REQUEST,
    CALENDAR_SCHEDULE_UPDATE_RESET,
    CALENDAR_SCHEDULE_UPDATE_SUCCESS,
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

// Get Selected Calendar Detail
export const calendarScheduleDetailsReducer = (state= { calendar: {} } , action) => {
    //
    switch(action.type) {
        case CALENDAR_SCHEDULE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case CALENDAR_SCHEDULE_DETAILS_SUCCESS:
            return { loading: false, calendar: action.payload }
        case CALENDAR_SCHEDULE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case CALENDAR_SCHEDULE_DETAILS_RESET:
            return { calendar: {} }
        default: 
            return state
    }
}

// UPDATE CALENDAR SCHEDULE REDUCER
export const calendarScheduleUpdateReducer = (state = { calendar: {} }, action) => {
    switch(action.type) {
        case CALENDAR_SCHEDULE_UPDATE_REQUEST:
            return { loading: true }
        case CALENDAR_SCHEDULE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case CALENDAR_SCHEDULE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case CALENDAR_SCHEDULE_UPDATE_RESET:
            return {
                calendar: {}
            }
        default:
            return state
    }
}