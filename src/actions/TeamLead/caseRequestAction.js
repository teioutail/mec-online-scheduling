import axios from 'axios'
import { 
    CASE_LIST_FAIL, 
    CASE_LIST_REQUEST, 
    CASE_LIST_SUCCESS,
} from '../../constants/TeamLead/caseRequestConstants'

// View List of Case
export const listCases = () => async (dispatch, getState) => {
    //
    try {

        dispatch({
            type: CASE_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        
        // Call API Request
        const { data } = await axios.get(`/auth/view-all-cases`, config)

        dispatch({
            type: CASE_LIST_SUCCESS,
            payload: data,
        })

        console.warn(data)

    } catch (error) {
        //
        dispatch({
            type: CASE_LIST_FAIL,
            payload: error.response.data.errors
        })
    }
}
