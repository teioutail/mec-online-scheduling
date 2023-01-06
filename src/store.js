import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// User Reducer
import { 
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    userDetailsReducer,
    userUpdateReducer,
    userCreateReducer,
    userDeleteReducer,
    userResetPasswordReducer,
} from './reducers/userReducers'

// Role Reducer
import { 
    roleListReducer,
    roleDetailsReducer,
    roleUpdateReducer,
 } from './reducers/roleReducers'

// Menu Category Reducer
import { 
    menuCategoryListReducer,
    menuCategoryDetailsReducer,
} from './reducers/menuCategoryReducers'

// Reducers
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userCreate: userCreateReducer,
    userList: userListReducer,
    userDetails:userDetailsReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userPasswordReset: userResetPasswordReducer,
    roleList: roleListReducer,
    roleDetails: roleDetailsReducer,
    roleUpdate: roleUpdateReducer,
    menuCategoryList: menuCategoryListReducer,
    menuCategoryDetails:menuCategoryDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

// Get User Details
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store