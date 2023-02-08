import axios from 'axios'
import { 
    CALENDAR_SCHEDULE_CREATE_FAIL, 
    CALENDAR_SCHEDULE_CREATE_REQUEST, 
    CALENDAR_SCHEDULE_CREATE_SUCCESS,
    CALENDAR_SCHEDULE_LIST_FAIL,
    CALENDAR_SCHEDULE_LIST_REQUEST,
    CALENDAR_SCHEDULE_LIST_SUCCESS,
} from "../../constants/Sales/salesCalendarScheduleConstants"

// View List of Calendar Schedule
export const listCalendarSchedule = () => async (dispatch, getState) => {
    //
    try {

        dispatch({
            type: CALENDAR_SCHEDULE_LIST_REQUEST,
        })

        const { userLogin : { userInfo }} = getState()
        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/calendar`, config)

        dispatch({
            type: CALENDAR_SCHEDULE_LIST_SUCCESS,
            payload: data,
        })

        // console.warn(data)

    } catch (error) {
        //
        dispatch({
            type: CALENDAR_SCHEDULE_LIST_FAIL,
            payload: error.response.data.errors
        })
    }
}

// Create New Calendar Schedule Request
export const createCalendarSchedule = (calendar) => async (dispatch) => {
    //
    try {
        dispatch({
            type: CALENDAR_SCHEDULE_CREATE_REQUEST,
        })
        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/calendar', calendar, config)

        dispatch({
            type: CALENDAR_SCHEDULE_CREATE_SUCCESS,
            payload: data,
        })

        // console.warn(data);

    } catch(error) {
       //
       dispatch({
        type: CALENDAR_SCHEDULE_CREATE_FAIL,
        payload: error.response.data.errors,
      })
    }
}