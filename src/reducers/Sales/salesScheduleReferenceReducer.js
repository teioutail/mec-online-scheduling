import { 
    SCHEDULE_REFERENCE_CREATE_FAIL, 
    SCHEDULE_REFERENCE_CREATE_REQUEST, 
    SCHEDULE_REFERENCE_CREATE_RESET, 
    SCHEDULE_REFERENCE_CREATE_SUCCESS, 
    SCHEDULE_REFERENCE_DELETE_FAIL, 
    SCHEDULE_REFERENCE_DELETE_REQUEST, 
    SCHEDULE_REFERENCE_DELETE_SUCCESS, 
    SCHEDULE_REFERENCE_DETAILS_FAIL, 
    SCHEDULE_REFERENCE_DETAILS_REQUEST, 
    SCHEDULE_REFERENCE_DETAILS_RESET, 
    SCHEDULE_REFERENCE_DETAILS_SUCCESS, 
    SCHEDULE_REFERENCE_LIST_FAIL, 
    SCHEDULE_REFERENCE_LIST_REQUEST, 
    SCHEDULE_REFERENCE_LIST_RESET, 
    SCHEDULE_REFERENCE_LIST_SUCCESS, 
    SCHEDULE_REFERENCE_UPDATE_FAIL, 
    SCHEDULE_REFERENCE_UPDATE_REQUEST,
    SCHEDULE_REFERENCE_UPDATE_RESET,
    SCHEDULE_REFERENCE_UPDATE_SUCCESS
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

// Get Selected Schedule Reference Detail
export const scheduleReferenceDetailsReducer = (state= { schedule: {} } , action) => {
    //
    switch(action.type) {
        case SCHEDULE_REFERENCE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SCHEDULE_REFERENCE_DETAILS_SUCCESS:
            return { loading: false, schedule: action.payload }
        case SCHEDULE_REFERENCE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case SCHEDULE_REFERENCE_DETAILS_RESET:
            return { schedule: {} }
        default: 
            return state
    }
}

// Schedule Update Reducer
export const scheduleReferenceUpdateReducer = (state = { schedule: {} }, action) => {
    switch(action.type) {
        case SCHEDULE_REFERENCE_UPDATE_REQUEST:
            return { loading: true }
        case SCHEDULE_REFERENCE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case SCHEDULE_REFERENCE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SCHEDULE_REFERENCE_UPDATE_RESET:
            return {
                schedule: {}
            }
        default:
            return state
    }
}

// Schedule Delete Reducer
export const scheduleReferenceDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case SCHEDULE_REFERENCE_DELETE_REQUEST:
            return { loading: true }
        case SCHEDULE_REFERENCE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case SCHEDULE_REFERENCE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}