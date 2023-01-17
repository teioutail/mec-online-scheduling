import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Loader from '../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    listRoles,
    getRoleDetails,
    deleteRole,
} from '../actions/roleActions'

import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserPen,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons'
import { 
    ROLE_DETAILS_RESET 
} from '../constants/roleConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditRoleModal from '../modals/Role/EditRoleModal'
import RoleAccessModal from '../modals/Role/RoleAccessModal'

import { listMenuCategories } from '../actions/menuCategoryActions'
import { listSubMenuCategories } from '../actions/menuSubCategoryAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleListScreen = () => {
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

    // CommonJS
    const Swal = require('sweetalert2')
    //
    const headerTitle = 'Role List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Role List
    const roleList = useSelector(state => state.roleList)
    const { loading, error, roles } = roleList
    
    // Role Create Error
    const roleCreate = useSelector(state => state.roleCreate)
    const { error:errorCreate } = roleCreate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Role Info
    const roleDetails = useSelector(state => state.roleDetails)
    const { role: roleDetail } = roleDetails

    // Menu Category List
    const menuCategoryList = useSelector(state => state.menuCategoryList)
    const { loading:loadingcat, error:errorcat, categories } = menuCategoryList

    // Sub-Menu Category List
    const submenuCategoryList = useSelector(state => state.submenuCategoryList)
    const { loading:loadingsub, error:errorsub, subcategories } = submenuCategoryList

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])

    // EditRoleModal
    const [show, setShow] = useState(false)
    // 
    const [showRoleAccess, setShowRoleAccess] = useState()
    // Role Access View Modal
    const handleRoleAccessClose = () => setShowRoleAccess(false)
    const handleRoleAccessShow = () => setShowRoleAccess(true)
    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [roleid, setRoleId] = useState('')
    const [mode, setMode] = useState('')

    // Add User Modal
    const handleRoleView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: ROLE_DETAILS_RESET,
        })
    }

    // Edit Role
    const handleEditRoleView = (state) => {
        setShow(true)
        setRoleId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getRoleDetails(state.target.id))
    }

    // Role Access 
    const handleRoleAccessView = (state) => {
        handleRoleAccessShow()
        setRoleId(state.target.id)
        setMode('Edit')
        // Call API Here...
    }

    // Delete Role
    const handleDeleteRole = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this role?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Role
                dispatch(deleteRole(state.target.id))
                // Refresh Datatable
                dispatch(listRoles())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Role Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Role ID',
                selector: row => row.role_id,
                sortable: true,
            },
            {   name: 'Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Description',
                selector: row => row.description,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.activated,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.role_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditRoleView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit Role
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteRole} id={row.role_id}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete Role
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleRoleAccessView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faUserLock} /> Role Access Privilege
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                },
                // cell: (row) => <button onClick={handleButtonClick} id={row.id}>Action</button>,
				ignoreRowClick: true,
				allowOverflow: true,
				button: true,
			},
		],
		[],
	);

    // useEffect for Error Message
    useEffect(() => {
        // Show Login Error
        if(errorCreate) 
        {
            // Loop Error Back-End Validation
            for(const key in errorCreate) {
                if (errorCreate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${errorCreate[key]}`)
                }
            }
        }
    }, [errorCreate])

    // Set Row Value
    useEffect(() => {
        setRows(roles)
        setPending(loading)
    }, [roles, rows, loading])


    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            //
            dispatch(listRoles())
            dispatch(listMenuCategories())
            dispatch(listSubMenuCategories())
        } else {
            // Redirect to login page
            navigate('/signin')
        }

    }, [dispatch, navigate, userInfo])


    return (
        <>
            <SideMenu />
            <FormContainer>
                <Header headerTitle={headerTitle} />
                    <Button variant="primary" size="sm" className="float-end" onClick={handleRoleView}>
                        <FontAwesomeIcon icon={faPlus} /> Add New
                    </Button>

                    <DataTable
                        // title={headerTitle}
                        // selectableRows
                        // data={users}
                        pagination
                        responsive
                        columns={columns}
                        data={rows}
                        progressPending={pending}
                        progressComponent={<Loader />}
                        highlightOnHover
                        pointerOnHover
                        selectableRowsHighlight
                    />

                    <EditRoleModal 
                        show={show} 
                        onHide={handleClose} 
                        roleid={roleid}
                        roleDetails={roleDetail}
                        mode={mode}
                    />

                    <RoleAccessModal 
                        show={showRoleAccess} 
                        onHide={handleRoleAccessClose} 
                        roleid={roleid}
                        categories={categories}
                        subcategories={subcategories}
                    />

                    <ToastContainer
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
                    />

                <Footer />
            </FormContainer>
        </>
    )

}

export default RoleListScreen