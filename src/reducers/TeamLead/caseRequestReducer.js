import { 
    CASE_LIST_FAIL, 
    CASE_LIST_REQUEST, 
    CASE_LIST_RESET, 
    CASE_LIST_SUCCESS,
} from "../../constants/TeamLead/caseRequestConstants"

// CASE REQUEST LIST REDUCER
export const caseRequestListReducer = (state = { cases: [] }, action ) => {
    // 
    switch(action.type) {
        case CASE_LIST_REQUEST:
            return { loading: true }
        case CASE_LIST_SUCCESS:
            return { loading: false, cases: action.payload }
        case CASE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case CASE_LIST_RESET:
            return { cases: [] }
        default:
            return state
    }
}
