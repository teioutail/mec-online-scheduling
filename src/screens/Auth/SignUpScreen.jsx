import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import { ToastContainer, toast } from 'react-toastify';
import LoaderFullScreen from '../../components/LoaderFullScreen'
import { USER_REGISTER_RESET } from '../../constants/userConstants'

const SignUpScreen = () => {

  // Toastify
  const notify = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  // Email
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setConfirmPassword] = useState('')
  // New
  const [manage_team , setManageTeam] = useState('')
  const [reporting_team , setReportingTeam] = useState('')
  const [designation, setDesignation] = useState('')

  //
  const dispatch = useDispatch()

  // Get Details
  const userRegister = useSelector((state) => state.userRegister)
  const { loading , error } = userRegister

  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  // useNavigate to redirect the user
  const navigate = useNavigate()

  //
  useEffect(() => {
    //
    // if() {

    // }

    // Show Create Error
    if(error) {
      // Loop Error Back-End Validation
      for(const key in error) {
          if (error.hasOwnProperty(key)) {
            // Show Error
            notify(`${error[key]}`)
          }
      }
      //
      dispatch({ type: USER_REGISTER_RESET })
    }

    if(userInfo) {
      // redirect user to home page if already logged-in
      navigate('/home')
    }

  }, [navigate, error , userInfo])
  
  //
  const submitHandler = (e) => {
    e.preventDefault()
    // Register User
    dispatch(register(
        name, 
        email, 
        password, 
        password_confirmation,
        manage_team,
        reporting_team,
        designation,
        username,
    ))
  } 

  return (
    <>
      {/* {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}

      {<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />}

    { loading && <LoaderFullScreen /> }

      <main className="main-content  mt-0">
        <section className="min-vh-100 mb-8">
          <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{ backgroundImage: "url(" + "assets/img/curved-images/curved14.jpg" + ")" }} >
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 text-center mx-auto">
                  <h1 className="text-white mb-2 mt-5">Welcome to MEC Online Scheduling</h1>
                  {/* <p className="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p> */}
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

                      <div className="mb-3">
                       <label>Manage Team</label>
                        <select 
                          class="form-select" 
                          aria-label="Manage Team"
                          onChange={(e) => setManageTeam(e.target.value)}
                          >
                        <option value="">- Select -</option>
                        <option value="1">Pre-Sales</option>
                        <option value="2">Post-Sales</option>
                        </select>
                      </div>

                      <div className="mb-3">
                       <label>Reporting Team</label>
                        <select 
                          class="form-select" 
                          aria-label="Reporting Team"
                          onChange={(e) => setReportingTeam(e.target.value)}
                        >
                        <option value="">- Select -</option>
                        <option value="1">Pre-Sales</option>
                        <option value="2">Post-Sales</option>
                        </select>
                      </div>

                      <div className="mb-3">
                       <label>Designation</label>
                        <select 
                          class="form-select" 
                          aria-label="Designation"
                          onChange={(e) => setDesignation(e.target.value)}
                        >
                        <option value="">- Select -</option>
                        <option value="1">Sales</option>
                        <option value="2">Teamlead</option>
                        <option value="3">Supervisor</option>
                        <option value="5">System Engineer</option>
                        <option value="7">Pre-Sales Approver</option>
                        <option value="8">Post-Sales Approver</option>
                        <option value="9">Super-Approver</option>
                        <option value="10">Custodian</option>
                        <option value="11">Training Approver</option>
                        <option value="12">TCC</option>
                        <option value="13">RMA</option>
                        <option value="14">Project Lead</option>
                        </select>
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
              <div className="col-8 mx-auto text-center mt-1">
                <p className="mb-0 text-secondary">
                  Copyright © <script>
                    document.write(new Date().getFullYear())
                  </script> MEC Network Corporation - TPO Systems.
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