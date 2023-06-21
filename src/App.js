import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/Dashboard'
import SignInScreen from './screens/Auth/SignInScreen'
import SignUpScreen from './screens/Auth/SignUpScreen'
import UserListScreen from './screens/Users/UserListScreen'
import RoleListScreen from './screens/RoleListScreen'
import MenuCategoryScreen from './screens/MenuCategoryScreen'
import SubMenuCategoryScreen from './screens/SubMenuCategoryScreen'
import ScheduleScreen from './screens/Sales/ScheduleScreen'
import BusinessUnitScreen from './screens/BusinessUnitScreen'
import CalendarScheduleScreen from './screens/CalendarScheduleScreen'
import ActivityRelatedToScreen from './screens/Admin/ActivityRelatedToScreen'
import DecisionUnitScreen from './screens/Admin/DecisionUnitScreen'
import DestinationDetailScreen from './screens/Admin/DestinationDetailScreen'
import ApproverForApprovalScreen from './screens/Approvers/ApproverForApprovalScreen'
import ApproverApprovedScreen from './screens/Approvers/ApproverApprovedScreen'
import ApproverRejectedScreen from './screens/Approvers/ApproverRejectedScreen'
import ApproverCanceledScreen from './screens/Approvers/ApproverCanceledScreen'
import ApproverDelegatedScreen from './screens/Approvers/ApproverDelegatedScreen'
import ApproverMyApprovedScreen from './screens/Approvers/ApproverMyApprovedScreen'
import ApproverAllRequestScreen from './screens/Approvers/ApproverAllRequestScreen'
import CasesScreen from './screens/TeamLead/CasesScreen'
import MyScheduleScreen from './screens/SE/MyScheduleScreen'
import MyTrainingScreen from './screens/SE/MyTrainingScreen'
import VerifyEmail from './screens/Auth/VerifyEmail'
import './App.css'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ApproverAllApprovedScreen from './screens/Approvers/ApproverAllApprovedScreen'
import SideMenu from './components/template/SideMenu'
import RequestVerification from './screens/Auth/RequestVerification'
import AccountVerified from './screens/Auth/AccountVerified'

// This exports the whole icon packs for Brand and Solid.
library.add(fas)

// Set main base URL using axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// Authorization Bearer Token Save
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

function App() {

  return (
    <Router>        
      <div className="App">
      <SideMenu />
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/home' element={<HomeScreen/>} />
          <Route path='/signin' element={<SignInScreen/>} />
          <Route path='/signup' element={<SignUpScreen/>} />
          <Route path='/verify' element={<VerifyEmail />} />
          <Route path='/account-verified/:email/:token' element={<AccountVerified />} />
          {/* <Route path='/request' element={<RequestVerification />} /> */}
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/user-list' element={<UserListScreen/>} />
          <Route path='/role-list' element={<RoleListScreen/>} />
          <Route path='/categories' element={<MenuCategoryScreen/>} />
          <Route path='/subcategories' element={<SubMenuCategoryScreen/>} />
          <Route path='/motherfolder' element={<ScheduleScreen/>} />
          <Route path='/business-unit' element={<BusinessUnitScreen/>} />
          <Route path='/calendar-schedule' element={<CalendarScheduleScreen/>} />
          <Route path='/activity-related-to' element={<ActivityRelatedToScreen/>} />
          <Route path='/decision' element={<DecisionUnitScreen/>} />
          <Route path='/destination' element={<DestinationDetailScreen/>} />
          <Route path='/schedule-for-approval' element={<ApproverForApprovalScreen />} />
          <Route path='/schedule-rejected' element={<ApproverRejectedScreen />} />
          <Route path='/schedule-approved' element={<ApproverApprovedScreen />} />
          <Route path='/schedule-canceled' element={<ApproverCanceledScreen />} />
          <Route path='/schedule-delegated' element={<ApproverDelegatedScreen />} />
          <Route path='/schedule-myapproved' element={<ApproverMyApprovedScreen />} />
          <Route path='/schedule-all-approved' element={<ApproverAllApprovedScreen/>} />
          <Route path='/schedule-all-requested' element={<ApproverAllRequestScreen/> } />
          <Route path='/cases' element={<CasesScreen/> } />
          <Route path='/my-schedules' element={<MyScheduleScreen />} />
          <Route path='/my-trainings' element={<MyTrainingScreen />} />
        </Routes>
      </div>
    </Router>
  );
 
}

export default App;
