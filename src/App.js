import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/Dashboard'
import SignInScreen from './screens/Auth/SignInScreen'
import SignUpScreen from './screens/Auth/SignUpScreen'
import UserListScreen from './screens/Users/UserListScreen'

import axios from 'axios'
// Set main base URL using axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// Authorization Bearer Token Save
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

function App() {

  return (
    <Router>        
      <div className="App">
        <Routes>
          <Route path='/home' element={<HomeScreen/>} />
          <Route path='/signin' element={<SignInScreen/>} />
          <Route path='/signup' element={<SignUpScreen/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/user-list' element={<UserListScreen/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
