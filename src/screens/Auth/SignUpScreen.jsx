import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { register } from '../../actions/userActions'

const SignUpScreen = () => {
  //
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  //
  const dispatch = useDispatch()

  // Get Details
  const userRegister = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userRegister
  // const { loading, error, userInfo } = userRegister

  // Search 
  const [searchParams] = useSearchParams()
  const redirect = searchParams ? searchParams.get('=') : '/'

  // useNavigate to redirect the user
  const navigate = useNavigate()

  //
  useEffect(() => {
    //
    if(userInfo) {
      navigate('/home')
    }
  }, [navigate, userInfo, password])
  
  //
  const submitHandler = (e) => {
    e.preventDefault()

    if(password !== confirmPassword)
      setMessage('Passwords do not match')
    else
      dispatch(register(name, email, password))
  } 

  return (
    <>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <main className="main-content  mt-0">
        <section className="min-vh-100 mb-8">
          <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url(" + "assets/img/curved-images/curved14.jpg" + ")" }} >
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                  <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-lg-n10 mt-md-n11 mt-n10">
              <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
                <div className="card z-index-0">
                  <div className="card-header text-center pt-4">
                    <h5>Online Scheduling System</h5>
                  </div>
                  <div className="card-body">
                    <form role="form text-left" onSubmit={submitHandler}>
                      <div className="mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Full Name" 
                          aria-label="Full Name" 
                          aria-describedby="fullname-addon" 
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div className="mb-3">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="User Name" 
                          aria-label="User Name" 
                          aria-describedby="username-addon" 
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                        />
                      </div>
                      <div className="mb-3">
                        <input 
                          type="email" 
                          className="form-control" 
                          placeholder="Email" 
                          aria-label="Email" 
                          aria-describedby="email-addon" 
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          placeholder="Password" 
                          aria-label="Password" 
                          aria-describedby="password-addon" 
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <input 
                          type="password" 
                          className="form-control" 
                          placeholder="Confirm Password" 
                          aria-label="Confirm Password" 
                          aria-describedby="confirm-password-addon" 
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-check form-check-info text-left">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" for="flexCheckDefault">
                          I agree the 
                          <a href="#" className="text-dark font-weight-bolder">Terms and Conditions</a>
                        </label>
                      </div>
                      <div className="text-center">
                        <button 
                          type="submit" 
                          className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                      </div>
                      <p className="text-sm mt-3 mb-0">Already have an account? 
                        <Link to="/signin" className="text-dark font-weight-bolder">Sign in</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-4 mx-auto text-center">
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Company
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  About Us
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Team
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Products
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Blog
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
                  Pricing
                </a>
              </div>
              <div className="col-lg-8 mx-auto text-center mb-4 mt-2">
                <a href="#" target="_blank" className="text-secondary me-xl-4 me-4">
                  <span className="text-lg fab fa-dribbble"></span>
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-4 me-4">
                  <span className="text-lg fab fa-twitter"></span>
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-4 me-4">
                  <span className="text-lg fab fa-instagram"></span>
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-4 me-4">
                  <span className="text-lg fab fa-pinterest"></span>
                </a>
                <a href="#" target="_blank" className="text-secondary me-xl-4 me-4">
                  <span className="text-lg fab fa-github"></span>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-8 mx-auto text-center mt-1">
                <p className="mb-0 text-secondary">
                  Copyright © <script>
                    document.write(new Date().getFullYear())
                  </script> Soft by Creative Tim.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
  
}

export default SignUpScreen