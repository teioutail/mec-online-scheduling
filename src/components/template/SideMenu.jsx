import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faDashboard, 
    faUsers,
    faLock,
    faBars,  
    faList,
    faListOl,
} from '@fortawesome/free-solid-svg-icons'
import { 
    useDispatch, 
    useSelector, 
} from 'react-redux'

const SideMenu = () => {

  // Redux
  const dispatch = useDispatch()

  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // useState
  const [mainmenu, setMainMenu] = useState([]);
  const [submenu, setSubMenu] = useState([]);

  // 
  useEffect(() => {
    // Get User Role
    // console.warn(userInfo.user.user_type)
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

    // console.warn(userInfo.mainmenu)
    setMainMenu(userInfo.mainmenu)
    setSubMenu(userInfo.submenu)

  },[userInfo, dispatch]);

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
            {
                mainmenu.length > 0  && (
                    // Map
                    mainmenu.map((row, key) => (
                        <li className="nav-item" key={key}>
                            <Link className="nav-link" to={row.url}>
                                <div className="icon icon-shape icon-sm bg-gradient-primary shadow text-center border-radius-md">
                                    {/* <FontAwesomeIcon icon={row.icon} className="text-light text-lg opacity-10" /> */}
                                    <FontAwesomeIcon icon={['fas', row.icon.toString()]} className="text-light text-lg opacity-10" />
                                </div>
                                    <span className="nav-link-text ms-1">{row.category_name.toString()}</span>
                            </Link>
                        </li>
                    ))
                )
            }
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