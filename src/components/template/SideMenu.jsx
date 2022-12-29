import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faDashboard, 
    faUsers,
    faLock
} from '@fortawesome/free-solid-svg-icons'

const SideMenu = () => {
    // 
  useEffect(() => {
    // Delay execution of argon-dashboard.js for sidemenu
    const script = document.createElement("script");
    script.src = "assets/js/soft-ui-dashboard.js";
    script.async = true;
    document.body.appendChild(script);
    // adding multiple classes to body tag
    document.body.classList.add(
      'g-sidenav-show',
      'bg-gray-100'
    );

  }, []);

  return (
    <>
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 " id="sidenav-main">
            <div className="sidenav-header">
            <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
            <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/soft-ui-dashboard/pages/dashboard.html " target="_blank">
                {/* <img src="%PUBLIC_URL%/assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
                {/* <img src="%PUBLIC_URL%/assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
                <span className="ms-1 font-weight-bold">Soft UI Dashboard</span>
            </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <div className="icon icon-shape icon-sm bg-gradient-primary shadow text-center border-radius-md">
                            {/* <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i> */}
                            <FontAwesomeIcon icon={faDashboard} className="text-light text-lg opacity-10" />
                        </div>
                            <span className="nav-link-text ms-1">Dashboard</span>
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/user-list" className="nav-link">
                        {/* <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"> */}
                        <div className="icon icon-shape icon-sm bg-gradient-primary shadow text-center border-radius-md">    
                            <FontAwesomeIcon icon={faUsers} className="text-light text-lg opacity-10" aria-hidden="true"/>
                        </div>
                        <span className="nav-link-text ms-1">User List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/role-list" className="nav-link">
                        {/* <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"> */}
                        <div className="icon icon-shape icon-sm bg-gradient-primary shadow text-center border-radius-md">    
                            <FontAwesomeIcon icon={faLock} className="text-light text-lg opacity-10" aria-hidden="true"/>
                        </div>
                        <span className="nav-link-text ms-1">Role</span>
                    </Link>
                </li>

                <li className="nav-item">
                <a className="nav-link  " href="../pages/virtual-reality.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">

                    </div>
                    <span className="nav-link-text ms-1">Virtual Reality</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link  " href="../pages/rtl.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">

                    </div>
                    <span className="nav-link-text ms-1">RTL</span>
                </a>
                </li>
                <li className="nav-item mt-3">
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
                </li>
                <li className="nav-item">
                <a className="nav-link  " href="../pages/profile.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">

                    </div>
                    <span className="nav-link-text ms-1">Profile</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link  " href="../pages/sign-in.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">

                    </div>
                    <span className="nav-link-text ms-1">Sign In</span>
                </a>
                </li>
                <li className="nav-item">
                <a className="nav-link  " href="../pages/sign-up.html">
                    <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">

                    </div>
                    <span className="nav-link-text ms-1">Sign Up</span>
                </a>
                </li>
            </ul>
            </div>
            
            {/*<div className="sidenav-footer mx-3 ">
            <div className="card card-background shadow-none card-background-mask-secondary" id="sidenavCard">
                <div className="full-background" style="background-image: url('../assets/img/curved-images/white-curved.jpg')"></div>
                <div className="card-body text-start p-3 w-100">
                <div className="icon icon-shape icon-sm bg-white shadow text-center mb-3 d-flex align-items-center justify-content-center border-radius-md">
                    <i className="ni ni-diamond text-dark text-gradient text-lg top-0" aria-hidden="true" id="sidenavCardIcon"></i>
                </div>
                <div className="docs-info">
                    <h6 className="text-white up mb-0">Need help?</h6>
                    <p className="text-xs font-weight-bold">Please check our docs</p>
                    <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/soft-ui-dashboard" target="_blank" className="btn btn-white btn-sm w-100 mb-0">Documentation</a>
                </div>
                </div>
            </div>
            <a className="btn bg-gradient-primary mt-3 w-100" href="https://www.creative-tim.com/product/soft-ui-dashboard-pro?ref=sidebarfree">Upgrade to pro</a>
            </div> */}
        </aside>
    </>
  )

}

export default SideMenu