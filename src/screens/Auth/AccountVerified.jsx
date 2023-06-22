
import React from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { verify } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const AccountVerified = () => {
  // Validate
  const { email, token  } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    // 
    dispatch(verify(email, token))
  })
  
  return (
    <div>
        Your email address has been verified. Please contact administrator for activation. 
        <Link to="/signin" className="text-info text-gradient font-weight-bold">Go back</Link> to Sign-in page.
    </div>
  )

}

export default AccountVerified