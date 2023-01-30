import axios from 'axios'
import { 
    ACTIVITY_RELATED_LIST_FAIL, 
    ACTIVITY_RELATED_LIST_REQUEST, 
    ACTIVITY_RELATED_LIST_SUCCESS,
} from '../../constants/Admin/activityRelatedToContstants'

// View List of Activity Related To
export const listActivityRelatedTo = () => async (dispatch, getState) => {
    // 
    try {
        dispatch({
            type: ACTIVITY_RELATED_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()

        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/activity-related`, config)
        
        dispatch({
            type: ACTIVITY_RELATED_LIST_SUCCESS,
            payload: data
        })

        // console.warn(data)
    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_RELATED_LIST_FAIL,
            payload: error.response.data.errors,
        })
    }
}