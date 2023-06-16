import React, { useEffect } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import FormContainer from '../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
  // Redux
  const dispatch = useDispatch()
  // useNavigate to redirect the user
  const navigate = useNavigate() 
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  //
  useEffect(() => {
    // Check if user is admin else, Redirect user
    if( ! userInfo) {
      // Redirect to login page
      navigate('/signin')
    } 
    // console.warn(userInfo.user.user_type)
  }, [dispatch, navigate, userInfo])

  return (
    <>
      {/* <SideMenu /> */}
        <FormContainer>
          <Header />
            {/* Home Page Content Here */}
            <h3>Welcome to MEC Online Scheduling</h3>
          <Footer />
        </FormContainer>
    </>

  )

}

export default HomeScreen