import axios from 'axios'
import { 
    INVENTORY_CREATE_BULK_FAIL,
    INVENTORY_CREATE_BULK_REQUEST,
    INVENTORY_CREATE_BULK_RESET,
    INVENTORY_CREATE_BULK_SUCCESS,
    INVENTORY_CREATE_FAIL, 
    INVENTORY_CREATE_REQUEST, 
    INVENTORY_CREATE_RESET, 
    INVENTORY_CREATE_SUCCESS,
    INVENTORY_DELETE_FAIL,
    INVENTORY_DELETE_REQUEST,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_LIST_FAIL,
    INVENTORY_LIST_REQUEST,
    INVENTORY_LIST_SUCCESS,
} from "../../constants/Sales/motherFolderInventoryConstants"

// Create New Inventory Item
export const createMotherFolderInventory = (device) => async (dispatch) => {
    //
    try {
        dispatch({
            type: INVENTORY_CREATE_REQUEST,
        })
        // Header
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/inventory', device, config)

        dispatch({
            type: INVENTORY_CREATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: INVENTORY_CREATE_RESET,
        })
    } catch(error) {
        //
        dispatch({
            type: INVENTORY_CREATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Upload Bulk Records 
export const createMotherFolderBulkInventory = (file, scheduleid) => async (dispatch) => {
    //
    try {
        dispatch({
            type: INVENTORY_CREATE_BULK_REQUEST,
        })

        // Form Data
        let formData = new FormData()
        formData.append('file', file)
        formData.append('ar_id', scheduleid);

        // Header 
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/inventory-bulk-upload', formData, config)

        dispatch({
            type: INVENTORY_CREATE_BULK_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: INVENTORY_CREATE_BULK_FAIL,
            payload: error.response.data.error,
        })
    }
}

// View List of Schedule Reference
export const listMotherFolderInventory = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: INVENTORY_LIST_REQUEST,
        })
        const { userLogin : { userInfo }} = getState()
        // Header
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.access_token}`
            }
        }
        // Call API Request
        const { data } = await axios.get(`/auth/select-inventory/${id}`, config)

        dispatch({
            type: INVENTORY_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        //
        dispatch({
            type: INVENTORY_LIST_FAIL,
            payload: error.response.data.errors
        })
    }
}

// Delete Inventory Item
export const deleteInventory = (id) => async (dispatch, getState) => {
    //
    try {
        dispatch({
            type: INVENTORY_DELETE_REQUEST,
        })
        
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers : {
                Authorization: `Bearer ${userInfo.access_token}`,
            },
        }
        
        // Call API Request
        const { data } = await axios.delete(`/auth/inventory/${id}`, config)

        dispatch({
            type: INVENTORY_DELETE_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: INVENTORY_DELETE_FAIL,
            payload: 
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        })
    }
}

