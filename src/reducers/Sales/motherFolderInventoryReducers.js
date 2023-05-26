import { 
    INVENTORY_CREATE_FAIL, 
    INVENTORY_CREATE_REQUEST, 
    INVENTORY_CREATE_RESET, 
    INVENTORY_CREATE_SUCCESS,
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