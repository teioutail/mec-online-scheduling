import axios from 'axios'
import { 
    ACTIVITY_UPDATE_CREATE_FAIL, 
    ACTIVITY_UPDATE_CREATE_REQUEST, 
    ACTIVITY_UPDATE_CREATE_SUCCESS,
} from '../../constants/SE/seActivityUpdateConstants'

// Create New Activity Request Update
export const createActivityUpdateRequest = (activity) => async (dispatch) => {
    //
    try {

        dispatch({
            type: ACTIVITY_UPDATE_CREATE_REQUEST,
        })

        // console.warn(activity)

        /**
         *  sr_no: '',
            actions_taken: '',
            findings: '',
            pending: '',
            recommendation: '',
            remarks: '',
            conforme: '',
            attachment: [],
            employee_list:[],
         */
        // console.warn(activity.actions_taken)
        // const chosenFiles = Array.prototype.slice.call(e)

        // Form Data
        let formData = new FormData()
        formData.append('sr_no', activity.sr_no)
        formData.append('actions_taken', activity.actions_taken)
        formData.append('findings', activity.findings)
        formData.append('pending', activity.pending)
        formData.append('recommendation', activity.recommendation)
        formData.append('remarks', activity.remarks)
        formData.append('conforme', activity.conforme)
        formData.append('updated_by', activity.updated_by)
        // Multiple File Upload
        activity.attachment.map(file=> {
            formData.append('attachments[]', file)
        })
        
        // Header 
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        // Call API Request
        const { data } = await axios.post('/auth/se-activity', formData, config)
        console.warn(data)

        dispatch({
            type: ACTIVITY_UPDATE_CREATE_SUCCESS,
        })

    } catch(error) {
        //
        dispatch({
            type: ACTIVITY_UPDATE_CREATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}