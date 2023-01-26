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

import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/home' element={<HomeScreen/>} />
          <Route path='/signin' element={<SignInScreen/>} />
          <Route path='/signup' element={<SignUpScreen/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/user-list' element={<UserListScreen/>} />
          <Route path='/role-list' element={<RoleListScreen/>} />
          <Route path='/categories' element={<MenuCategoryScreen/>} />
          <Route path='/subcategories' element={<SubMenuCategoryScreen/>} />
          <Route path='/saleschedule' element={<ScheduleScreen/>} />
          <Route path='/business-unit' element={<BusinessUnitScreen/>} />
          <Route path='/calendar-schedule' element={<CalendarScheduleScreen/>} />
        </Routes>
      </div>
    </Router>
  );
 
}

export default App;
