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
    roleDeleteReducer,
    roleCreateReducer,
 } from './reducers/roleReducers'

// Menu Category Reducer
import { 
    menuCategoryListReducer,
    menuCategoryDetailsReducer,
    menuCategoryUpdateReducer,
    menuCategoryDeleteReducer,
    menuCategoryCreateReducer,
    menuCategoryOptionsReducer,
    menuCategoryUpdateRoleAccessReducer,
} from './reducers/menuCategoryReducers'

// Sub-Menu Category Reducer
import { 
    menuSubCategoryListReducer,
    menuSubCategoryDetailsReducer,
    menuSubCategoryUpdateReducer,
    menuSubCategoryCreateReducer,
    menuSubCategoryDeleteReducer,
    menuSubCategoryUpdateRoleAccessReducer,
} from './reducers/menuSubCategoryReducers'
// Schedule Reference Reducer
import { 
    scheduleReferenceCreateReducer,
    scheduleReferenceListReducer,
} from './reducers/Sales/salesScheduleReferenceReducer'

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
    roleDelete: roleDeleteReducer,
    roleCreate: roleCreateReducer,
    menuCategoryList: menuCategoryListReducer,
    menuCategoryDetails:menuCategoryDetailsReducer,
    menuCategoryUpdate:menuCategoryUpdateReducer,
    menuCategoryDelete:menuCategoryDeleteReducer,
    menuCategoryCreate:menuCategoryCreateReducer,
    menuCategoryOption:menuCategoryOptionsReducer,
    submenuCategoryList: menuSubCategoryListReducer,
    submenuCategoryDetails: menuSubCategoryDetailsReducer,
    submenuCategoryUpdate: menuSubCategoryUpdateReducer,
    submenuCategoryCreate: menuSubCategoryCreateReducer,
    submenuCategoryDelete: menuSubCategoryDeleteReducer,
    submenuCategoryRoleAccessUpdate: menuSubCategoryUpdateRoleAccessReducer,
    menuCategoryRoleAccessUpdate: menuCategoryUpdateRoleAccessReducer,
    scheduleReferenceList: scheduleReferenceListReducer,
    scheduleReferenceCreate: scheduleReferenceCreateReducer,
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