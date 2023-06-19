import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_LIST_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_RESET,
    USER_UPDATE_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_CREATE_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_EMAIL_LIST_REQUEST,
    USER_EMAIL_LIST_SUCCESS,
    USER_EMAIL_LIST_FAIL,
    USER_EMAIL_LIST_RESET,
    USER_REGISTER_RESET,
} from '../constants/userConstants'
 
// USER LOGIN REDUCER 
export const userLoginReducer = (state= {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default: 
            return state
    }
}

// REGISTER REDUCER
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_REGISTER_RESET:
            return {}
        default:
            return state
    }
}

// USER LIST REDUCER
export const userListReducer = (state = { users: [] }, action ) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

// 
export const userDetailsReducer = (state= { user: {} } , action) => {
    //
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default: 
            return state
    }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}

export const userCreateReducer = (state = {}, action) => {
    // 
    switch(action.type) {
        case USER_CREATE_REQUEST:
            return { loading: true}
        case USER_CREATE_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userResetPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true }
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// USER EMAIL LIST REDUCER
export const userEmailListReducer = (state = { emails: [] }, action ) => {
    switch(action.type) {
        case USER_EMAIL_LIST_REQUEST:
            return { loading: true }
        case USER_EMAIL_LIST_SUCCESS:
            return { loading: false, emails: action.payload }
        case USER_EMAIL_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_EMAIL_LIST_RESET:
            return { emails: [] }
        default:
            return state
    }
}