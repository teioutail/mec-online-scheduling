import axios from 'axios'
// Roles Actions
import { 
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_LIST_FAIL,
    ROLE_LIST_RESET,
} from '../constants/roleConstants'

// View List of Roles
export const listRoles = () => async (dispatch, getState) => {
    // 
    try {

        dispatch({
            type: ROLE_LIST_REQUEST,
        })

        const { data } = await axios.get()
         

        alert("testing lang test....");

    } catch(error) {
        //
        dispatch({
            type: ROLE_LIST_FAIL,
            payload:    
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}