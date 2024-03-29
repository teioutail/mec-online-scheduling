import { 
    INVENTORY_CREATE_BULK_FAIL,
    INVENTORY_CREATE_BULK_REQUEST,
    INVENTORY_CREATE_BULK_RESET,
    INVENTORY_CREATE_BULK_SUCCESS,
    INVENTORY_CREATE_FAIL, 
    INVENTORY_CREATE_REQUEST, 
    INVENTORY_CREATE_RESET, 
    INVENTORY_CREATE_SUCCESS,
    INVENTORY_CREATE_UPDATE_FAIL,
    INVENTORY_CREATE_UPDATE_REQUEST,
    INVENTORY_CREATE_UPDATE_RESET,
    INVENTORY_CREATE_UPDATE_SUCCESS,
    INVENTORY_DELETE_FAIL,
    INVENTORY_DELETE_REQUEST,
    INVENTORY_DELETE_SUCCESS,
    INVENTORY_LIST_FAIL,
    INVENTORY_LIST_REQUEST,
    INVENTORY_LIST_RESET,
    INVENTORY_LIST_SUCCESS,
    INVENTORY_STATUS_VIEW_DETAILS_FAIL,
    INVENTORY_STATUS_VIEW_DETAILS_REQUEST,
    INVENTORY_STATUS_VIEW_DETAILS_RESET,
    INVENTORY_STATUS_VIEW_DETAILS_SUCCESS,
} from "../../constants/Sales/motherFolderInventoryConstants"

// Create Mother Folder Reducer
export const motherFolderInventoryCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case INVENTORY_CREATE_REQUEST:
            return { loading: true}
        case INVENTORY_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case INVENTORY_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case INVENTORY_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// Create Bulk Inventory Upload Reducer
export const motherFolderInventoryBulkCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case INVENTORY_CREATE_BULK_REQUEST:
            return { loading: true}
        case INVENTORY_CREATE_BULK_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case INVENTORY_CREATE_BULK_FAIL:
            return { loading: false, error: action.payload }
        case INVENTORY_CREATE_BULK_RESET:
            return {}
        default:
            return state
    }
}

// List Inventory Reducer
export const motherFolderInventoryListReducer = (state = { inventory: [] }, action ) => {
    //
    switch(action.type) {
        case INVENTORY_LIST_REQUEST:
            return { loading: true }
        case INVENTORY_LIST_SUCCESS:
            return { loading: false, inventory: action.payload }
        case INVENTORY_LIST_FAIL:
            return { loading: false, error: action.payload }
        case INVENTORY_LIST_RESET:
            return { inventory: [] }
        default:
            return state
    }
}

// Inventory Delete Reducer
export const motherFolderInventoryDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case INVENTORY_DELETE_REQUEST:
            return { loading: true }
        case INVENTORY_DELETE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case INVENTORY_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// View Details Reducer
export const motherFolderInventoryDetailsReducer = (state= { inventory: {} } , action) => {
    //
    switch(action.type) {
        case INVENTORY_STATUS_VIEW_DETAILS_REQUEST:
            return { ...state, loading: true }
        case INVENTORY_STATUS_VIEW_DETAILS_SUCCESS:
            return { loading: false, inventory: action.payload }
        case INVENTORY_STATUS_VIEW_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case INVENTORY_STATUS_VIEW_DETAILS_RESET:
            return { inventory: {} }
        default: 
           return state
    }
}

// 
export const motherFolderInventoryCreateUpdateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case INVENTORY_CREATE_UPDATE_REQUEST:
            return { loading: true}
        case INVENTORY_CREATE_UPDATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case INVENTORY_CREATE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case INVENTORY_CREATE_UPDATE_RESET:
            return {}
        default:
            return state
    }
}