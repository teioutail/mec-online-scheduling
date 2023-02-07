import { 
    DECISION_CREATE_FAIL, 
    DECISION_CREATE_REQUEST, 
    DECISION_CREATE_RESET, 
    DECISION_CREATE_SUCCESS, 
    DECISION_LIST_FAIL, 
    DECISION_LIST_REQUEST, 
    DECISION_LIST_RESET, 
    DECISION_LIST_SUCCESS, 
    DECISION_DETAILS_FAIL, 
    DECISION_DETAILS_REQUEST, 
    DECISION_DETAILS_RESET, 
    DECISION_DETAILS_SUCCESS, 
    DECISION_UPDATE_FAIL, 
    DECISION_UPDATE_REQUEST, 
    DECISION_UPDATE_RESET, 
    DECISION_UPDATE_SUCCESS, 
    DECISION_DELETE_REQUEST, 
    DECISION_DELETE_SUCCESS, 
    DECISION_DELETE_FAIL,
} from "../../constants/Admin/decisionConstants"

// LIST DECISION REDUCER
export const decisionListReducer = (state = { decisions: [] }, action ) => {
    switch(action.type) {
        case DECISION_LIST_REQUEST:
            return { loading: true }
        case DECISION_LIST_SUCCESS:
            return { loading: false, decisions: action.payload }
        case DECISION_LIST_FAIL:
            return { loading: false, error: action.payload }
        case DECISION_LIST_RESET:
            return { decisions: [] }
        default:
            return state
    }
}

// CREATE DECISION REDUCER
export const decisionCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case DECISION_CREATE_REQUEST:
            return { loading: true}
        case DECISION_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case DECISION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DECISION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// UPDATE DECISION REDUCER
export const decisionUpdateReducer = (state = { decision: {} }, action) => {
    switch(action.type) {
        case DECISION_UPDATE_REQUEST:
            return { loading: true }
        case DECISION_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case DECISION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DECISION_UPDATE_RESET:
            return {
                decision: {}
            }
        default:
            return state
    }
}

// GET SELECTED DECISION DETAILS
export const decisionDetailsReducer = (state= { decision: {} } , action) => {
    //
    switch(action.type) {
        case DECISION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DECISION_DETAILS_SUCCESS:
            return { loading: false, decision: action.payload }
        case DECISION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case DECISION_DETAILS_RESET:
            return { decision: {} }
        default: 
            return state
    }
}

// DELETE DECISION REDUCER
export const decisionDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case DECISION_DELETE_REQUEST:
            return { loading: true }
        case DECISION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DECISION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}