import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import SideMenu from '../../components/template/SideMenu'
import FormContainer from '../../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { 
//     listRoles,
//     getRoleDetails,
//     deleteRole,
// } from '../../actions/roleActions'
import { 
  listScheduleReference,
  scheduleReferenceDetails,
} from '../../actions/Sales/salesScheduleReferenceAction'

import { 
  SCHEDULE_REFERENCE_CREATE_RESET,
  SCHEDULE_REFERENCE_DETAILS_RESET,
  SCHEDULE_REFERENCE_LIST_RESET,
} from '../../constants/Sales/salesScheduleReference'

import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserLock,
    faFilePen,
    faEye,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

import { 
    ROLE_DETAILS_RESET
} from '../../constants/roleConstants'

import { 
    ROLE_CREATE_RESET
} from '../../constants/roleConstants'

import { 
    ROLE_UPDATE_RESET
} from '../../constants/roleConstants'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditScheduleModal from '../../modals/Sales/EditScheduleModal'
import RoleAccessModal from '../../modals/Role/RoleAccessModal'

import { listMenuCategories } from '../../actions/menuCategoryActions'
import { listSubMenuCategories } from '../../actions/menuSubCategoryAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ScheduleScreen = () => {
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
    const headerTitle = 'Schedule Reference'
    // Redux
    const dispatch = useDispatch()
    // useNavigate to redirect the user
    const navigate = useNavigate()

    // Schedule List
    const scheduleReferenceList = useSelector(state => state.scheduleReferenceList)
    const { loading , schedules } = scheduleReferenceList
    
    // Schedule Create Error
    const scheduleReferenceCreate = useSelector(state => state.scheduleReferenceCreate)
    const { error:errorCreate } = scheduleReferenceCreate
  
    // Schedule Update Error
    const roleUpdate = useSelector(state => state.roleUpdate)
    const { error:errorUpdate } = roleUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Schedule Info / Details
    const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
    const { schedule:scheduleDetail } = scheduleReferenceDetails

    // Menu Category List
    const menuCategoryList = useSelector(state => state.menuCategoryList)
    const { categories } = menuCategoryList

    // Sub-Menu Category List
    const submenuCategoryList = useSelector(state => state.submenuCategoryList)
    const { subcategories } = submenuCategoryList

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
    const [scheduleid, setScheduleId] = useState('')
    const [mode, setMode] = useState('')

    // Add User Modal
    const handleScheduleReferenceView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        // 
        dispatch({
            type: SCHEDULE_REFERENCE_DETAILS_RESET,
        })
    }

    // Edit Role
    const handleEditScheduleReferenceView = (state) => {
        setShow(true)
        setScheduleId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(scheduleReferenceDetails(state.target.id))
    }

    // Role Access 
    const handleRoleAccessView = (state) => {
        handleRoleAccessShow()
        setScheduleId(state.target.id)
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
                // dispatch(deleteRole(state.target.id))
                // Refresh Datatable
                // dispatch(listRoles())
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
            {   name: 'Schedule Reference No',
                selector: row => row.reference_id,
                sortable: true,
            },
            {   name: 'Project Name',
                selector: row => row.project_name,
                sortable: true,
            },
            {
                name: 'Project No',
                selector: row => row.project_no,
                sortable: true,
            },
            {
                name: 'Case No',
                selector: row => row.case_no,
                sortable: true,
            },
            {
                name: 'SA No',
                selector: row => row.sa_no,
                sortable: true,
            },
            {
                name: 'Partner',
                selector: row => row.partner_company_name,
                sortable: true,
            },
            {
                name: 'End-User',
                selector: row => row.enduser_company_name,
                sortable: true,
            },
            {
                name: 'Action',
                cell: (row) => {
                    //
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.role_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditScheduleReferenceView} id={row.ar_id}>
                                        <FontAwesomeIcon icon={faFilePen} /> Edit Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteRole} id={row.role_id}>
                                        <FontAwesomeIcon icon={faTrash} /> Change Status
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleRoleAccessView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faUserLock} /> Individual Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleRoleAccessView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faLayerGroup} /> Group Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleRoleAccessView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faEye} /> View Inventory
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
        // Show Create Error
        if(errorCreate) {
            // Loop Error Back-End Validation
            for(const key in errorCreate) {
                if (errorCreate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${errorCreate[key]}`)
                }
            }
            //
            dispatch({ type: SCHEDULE_REFERENCE_CREATE_RESET })
        }
        
        // Show Update Error
        if(errorUpdate) {
            // Loop Error Back-End Validation
            for(const key in errorUpdate) {
                if (errorUpdate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${errorUpdate[key]}`)
                }
            }
            dispatch({ type: ROLE_UPDATE_RESET })
        }
    }, [errorCreate, errorUpdate])

    // Set Row Value
    useEffect(() => {
        setRows(schedules)
        setPending(loading)
    }, [schedules, rows, loading])

    //
    useEffect(() => {
        // Check if user is sales else, redirect user
        if(userInfo && userInfo.user.user_type === 1) {
            //
            dispatch(listScheduleReference())
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
                    <Button variant="primary" size="sm" className="float-end" onClick={handleScheduleReferenceView}>
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

                    <EditScheduleModal 
                        size="lg"
                        show={show} 
                        onHide={handleClose} 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
                        mode={mode}
                    />

                    <RoleAccessModal 
                        show={showRoleAccess} 
                        onHide={handleRoleAccessClose} 
                        scheduleid={scheduleid}
                        categories={categories}
                        subcategories={subcategories}
                    />

                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
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

export default ScheduleScreen