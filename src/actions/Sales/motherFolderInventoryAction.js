import axios from 'axios'
import { 
    INVENTORY_CREATE_BULK_FAIL,
    INVENTORY_CREATE_BULK_REQUEST,
    INVENTORY_CREATE_BULK_SUCCESS,
    INVENTORY_CREATE_FAIL, 
    INVENTORY_CREATE_REQUEST, 
    INVENTORY_CREATE_SUCCESS,
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

    } catch(error) {
        //
        dispatch({
            type: INVENTORY_CREATE_FAIL,
            payload: error.response.data.errors,
        })
    }
}

// Upload Bulk Records 
export const createMotherFolderBulkInventory = (file) => async (dispatch) => {
    // 
    try {
        dispatch({
            type: INVENTORY_CREATE_BULK_REQUEST,
        })
        // Form Data
        let formData = new FormData();
        formData.append('file', file);
        // Header 
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        // Call API Request
        const { data } = await axios.post('/auth/inventory-bulk-upload', formData, config)
        console.warn(data)
        dispatch({
            type: INVENTORY_CREATE_BULK_SUCCESS,
            payload: data,
        })

    } catch(error) {
        //
        dispatch({
            type: INVENTORY_CREATE_BULK_FAIL,
            payload: error.response.data.errorfss,
        })
    }
}

// View List of Schedule Reference
export const listMotherFolderInventory = () => async (dispatch, getState) => {
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
        const { data } = await axios.get(`/auth/inventory/`, config)

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