import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGOUT } from '../../constants/userConstants'
import { Link } from 'react-router-dom'

const VerifyEmail = () => {
  // 
  const dispatch = useDispatch()

  const [email, setEmail] = useState('');
  // Get Details
  const userLogin = useSelector((state) => state.userLogin)
  // 
  const { userInfo } = userLogin

  // 
  useEffect(() => {
    // 
    if(userInfo) {
        setEmail(userInfo.user.email)
        localStorage.removeItem('userInfo')
        // Clear Local Storage Data
        dispatch({ type: USER_LOGOUT })
    }
  })

  return (
    <div>
        Your account is not yet verified. Please check your email for a verification link. If your email is already verified, Please contact administrator. 
        <Link to="/request" className="text-info text-gradient font-weight-bold"> Click here to request another.</Link>
    </div>
  )

}

export default VerifyEmail