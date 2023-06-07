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
    userEmailListReducer,
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
    scheduleReferenceDeleteReducer,
    scheduleReferenceDetailsReducer,
    scheduleReferenceListIdReducer,
    scheduleReferenceListReducer,
    scheduleReferenceUpdateReducer,
} from './reducers/Sales/salesScheduleReferenceReducer'

// Business Unit Reducer
import { 
    businessUnitCreateReducer,
    businessUnitDeleteReducer,
    businessUnitDetailsReducer,
    businessUnitListOptionReducer, 
    businessUnitListReducer,
    businessUnitUpdateReducer,
} from './reducers/businessUnitReducers'

// Activity Related Reducer
import { 
    activityRelatedToCreateReducer,
    activityRelatedToDetailsReducer,
    activityRelatedToListReducer,
    activityRelatedToUpdateReducer,
    activityRelatedToDeleteReducer,
    activityRelatedToListOptionReducer,
} from './reducers/Admin/activityRelatedToReducers'

// Decision Reducer
import { 
    decisionCreateReducer,
    decisionDeleteReducer,
    decisionDetailsReducer,
    decisionListReducer, 
    decisionUpdateReducer
} from './reducers/Admin/decisionReducers'

// Calendar Schedule Reducer
import { 
    calendarScheduleListReducer,
    calendarScheduleCreateReducer,
    calendarScheduleDetailsReducer,
    calendarScheduleUpdateReducer, 
} from './reducers/Sales/salesCalendarScheduleReducer'

// Destination Detail Reducers
import { 
    destinationCreateReducer,
    destinationDeleteReducer,
    destinationDetailsReducer,
    destinationListOptionReducer,
    destinationListReducer,
    destinationUpdateReducer,
} from './reducers/Admin/destinationDetailReducers'

// Schedule Approver Reducers
import { 
    approverActivityListReducer, 
    approverActivityUpdateReducer,
} from './reducers/Approver/approverActivityRequestReducers'

// Case Reducers
import { 
    caseRequestListReducer,
} from './reducers/TeamLead/caseRequestReducer'

// SE Activity Update Reducer
import { 
    seActivityUpdateCreateReducer, 
    seActivityUpdateDetailsReducer,
} from './reducers/SE/seActivityUpdateReducer'

// Mother Folder Inventory Reducer
import { 
    motherFolderInventoryBulkCreateReducer, 
    motherFolderInventoryCreateReducer,
    motherFolderInventoryCreateUpdateReducer,
    motherFolderInventoryDeleteReducer,
    motherFolderInventoryDetailsReducer,
    motherFolderInventoryListReducer,
} from './reducers/Sales/motherFolderInventoryReducers'

// Reducers
const reducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userCreate:userCreateReducer,
    userList:userListReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userDelete:userDeleteReducer,
    userPasswordReset:userResetPasswordReducer,
    userEmail:userEmailListReducer,
    roleList:roleListReducer,
    roleDetails:roleDetailsReducer,
    roleUpdate:roleUpdateReducer,
    roleDelete:roleDeleteReducer,
    roleCreate:roleCreateReducer,
    menuCategoryList:menuCategoryListReducer,
    menuCategoryDetails:menuCategoryDetailsReducer,
    menuCategoryUpdate:menuCategoryUpdateReducer,
    menuCategoryDelete:menuCategoryDeleteReducer,
    menuCategoryCreate:menuCategoryCreateReducer,
    menuCategoryOption:menuCategoryOptionsReducer,
    submenuCategoryList:menuSubCategoryListReducer,
    submenuCategoryDetails:menuSubCategoryDetailsReducer,
    submenuCategoryUpdate:menuSubCategoryUpdateReducer,
    submenuCategoryCreate:menuSubCategoryCreateReducer,
    submenuCategoryDelete:menuSubCategoryDeleteReducer,
    submenuCategoryRoleAccessUpdate:menuSubCategoryUpdateRoleAccessReducer,
    menuCategoryRoleAccessUpdate:menuCategoryUpdateRoleAccessReducer,
    scheduleReferenceList:scheduleReferenceListReducer,
    scheduleReferenceCreate:scheduleReferenceCreateReducer,
    scheduleReferenceDetails:scheduleReferenceDetailsReducer,
    scheduleReferenceUpdate:scheduleReferenceUpdateReducer,
    scheduleReferenceDelete:scheduleReferenceDeleteReducer,
    scheduleReferenceIdList:scheduleReferenceListIdReducer,
    businessUnitList:businessUnitListReducer,
    businessUnitDetails:businessUnitDetailsReducer,
    businessUnitListOption:businessUnitListOptionReducer,
    businessUnitCreate:businessUnitCreateReducer,
    businessUnitUpdate:businessUnitUpdateReducer,
    businessUnitDelete:businessUnitDeleteReducer,
    activityRelatedToList:activityRelatedToListReducer,
    activityRelatedToDetails:activityRelatedToDetailsReducer,
    activityRelatedToCreate:activityRelatedToCreateReducer,
    activityRelatedToUpdate:activityRelatedToUpdateReducer,
    activityRelatedToDelete:activityRelatedToDeleteReducer,
    activityRelatedToListOption:activityRelatedToListOptionReducer,
    decisionList:decisionListReducer,
    decisionCreate:decisionCreateReducer,
    decisionUpdate:decisionUpdateReducer,
    decisionDetails:decisionDetailsReducer,
    decisionDelete:decisionDeleteReducer,
    calendarScheduleList:calendarScheduleListReducer,
    calendarScheduleCreate:calendarScheduleCreateReducer,
    calendarScheduleUpdate:calendarScheduleUpdateReducer,
    calendarScheduleDetails:calendarScheduleDetailsReducer,
    destinationList:destinationListReducer,
    destinationCreate:destinationCreateReducer,
    destinationUpdate:destinationUpdateReducer,
    destinationDetails:destinationDetailsReducer,
    destinationDelete:destinationDeleteReducer,
    destinationListOption:destinationListOptionReducer,
    approverActivityList: approverActivityListReducer,
    approverActivityUpdate: approverActivityUpdateReducer,
    caseRequestList: caseRequestListReducer,
    seActivityUpdateCreate:seActivityUpdateCreateReducer,
    seActivityUpdateDetails:seActivityUpdateDetailsReducer,
    motherFolderInventoryCreate: motherFolderInventoryCreateReducer,
    motherFolderInventoryBulkCreate:motherFolderInventoryBulkCreateReducer,
    motherFolderInventoryList:motherFolderInventoryListReducer,
    motherFolderInventoryDelete:motherFolderInventoryDeleteReducer,
    motherFolderInventoryDetails:motherFolderInventoryDetailsReducer,
    motherFolderInventoryCreateUpdate:motherFolderInventoryCreateUpdateReducer,
})
// 
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