import React, { useState, useEffect} from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderFullScreen from '../../components/LoaderFullScreen'

// 
const SignInScreen = () => {
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

  //
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // 
  const dispatch = useDispatch()
  // Get Details
  const userLogin = useSelector((state) => state.userLogin)
  // 
  const { loading, error, userInfo } = userLogin
  // useNavigate to redirect the user
  const navigate = useNavigate()
  // 
  const submitHandler = (e) => {
    e.preventDefault()
    // 
    dispatch(login(email, password))
  }

  // 
  useEffect(() => {
    // Show Login Error
    notify(error)

    if(userInfo) {
      // redirect user to home page if already logged-in
      navigate('/home')
    }
    
  }, [userInfo, navigate, error])

  return (
    <>
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

    {/* {error && <Message variant='danger'>{error}</Message>} */}
    { loading && <LoaderFullScreen /> }

      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                      <p className="mb-0">Enter your email and password to sign in</p>
                    </div>
                    <div className="card-body">
                    <form onSubmit={submitHandler}>
                          <label>Email</label>
                          <div className="mb-3">
                            <input 
                              type="email" 
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control" 
                              placeholder="Email" 
                              aria-label="Email" 
                              aria-describedby="email-addon" 
                            />
                          </div>
                          <label>Password</label>
                          <div className="mb-3">
                            <input 
                              type="password"
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control" 
                              placeholder="Password" 
                              aria-label="Password" 
                              aria-describedby="password-addon" 
                            />
                          </div>
                          <div className="form-check form-switch">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="rememberMe" 
                            />
                            <label 
                              className="form-check-label" 
                              >Remember me
                            </label>
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                          </div>
                        </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <Link to="/signup" className="text-info text-gradient font-weight-bold">Sign up</Link>
                      </p>
                    </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                  <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: "url(" + "assets/img/curved-images/curved6.jpg" + ")" }} ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

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
  </>
  )
}

export default SignInScreen