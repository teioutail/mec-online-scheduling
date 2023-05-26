import axios from 'axios'
import { 
    ACTIVITY_UPDATE_CREATE_FAIL, 
    ACTIVITY_UPDATE_CREATE_REQUEST, 
    ACTIVITY_UPDATE_CREATE_SUCCESS,
    ACTIVITY_UPDATE_DETAILS_FAIL,
    ACTIVITY_UPDATE_DETAILS_REQUEST,
    ACTIVITY_UPDATE_DETAILS_SUCCESS,
} from '../../constants/SE/seActivityUpdateConstants'

// Create New Activity Request Update
export const createActivityUpdateRequest = (activity) => async (dispatch) => {
    //
    try {

        dispatch({
            type: ACTIVITY_UPDATE_CREATE_REQUEST,
        })
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
        formData.append('art_id', activity.art_id);
        // Multiple File Upload
        activity.attachment.map(file=> {
            formData.append('attachments[]', file)
        })
        // Employee List
        activity.attachment.map(file=> {
            formData.append('employee_list', JSON.stringify(activity.employee_list))
            // formData.append('employee_list[]', Array.prototype.slice.call(activity.employee_list))
        })
        // Header 
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/se-activity', formData, config)

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

// Get Selected Details
export const getSelectedActivityUpdateDetails = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: ACTIVITY_UPDATE_DETAILS_REQUEST,
        })
        // 
        const { userLogin: { userInfo } } = getState()
        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/se-activity/${id}/edit`, config)
        dispatch({
            type: ACTIVITY_UPDATE_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        // // 
        dispatch({
            type: ACTIVITY_UPDATE_DETAILS_FAIL,
            payload: error.response.data.errors,
        })
    }
}