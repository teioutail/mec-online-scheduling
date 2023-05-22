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
        // 
        activity.attachment.map(file=> {
            // console.warn(file)
            formData.append('attachments[]',file)

        })
        

        // const chosenFiles = Array.prototype.slice.call(activity.attachment)

        // console.warn(chosenFiles)
        // console.warn(activity.attachment)

        // console.log(activity.attachment[0]);

        // return false;
        // const tae = []
        // activity.attachment.map(file=> {
        //     console.warn(file)
        //     // tae.push(file);

        //     formData.append('attachments',file.name)

        // })
        
        // formData.append("attachment", tae)
        // activity.attachment.forEach(img => {
        //     // console.warn(img)
        //     const { File } = img
        //     console.warn(File)
        //     // formData.append("productPhotos", img)
        // })

        // for (let i = 0; i < files.length; i++) {
        //     formData.append('files', files[i]);
        // }

        // alert(activity.attachment.length)

        // formData.append("attachment" , selectedFile);
        // formData.append('actions_taken', activity.actions_taken)
        // console.warn()

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