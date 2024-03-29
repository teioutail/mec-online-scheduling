import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import FormContainer from '../../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    listRoles,
    getRoleDetails,
    deleteRole,
} from '../../actions/roleActions'

import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserPen,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons'

import { 
    ROLE_DETAILS_RESET,
    ROLE_CREATE_RESET,
    ROLE_UPDATE_RESET,
 } from '../../constants/roleConstants'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditRoleModal from '../../modals/Role/EditRoleModal'
import RoleAccessModal from '../../modals/Role/RoleAccessModal'
import EditCaseModal from '../../modals/TeamLead/EditCaseModal'

import EditCalendarScheduleModal from '../../modals/Sales/EditCalendarScheduleModal'

import { listMenuCategories } from '../../actions/menuCategoryActions'
import { listSubMenuCategories } from '../../actions/menuSubCategoryAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listBusinessUnitOption } from '../../actions/businessUnitActions'
import { listCases } from '../../actions/TeamLead/caseRequestAction'

const CaseScreen = () => {

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
    const headerTitle = 'Case List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Case List
    const caseRequestList = useSelector(state => state.caseRequestList)
    const { loading, error, cases } = caseRequestList

    // Role List
    // const roleList = useSelector(state => state.roleList)
    // const { loading, error, roles } = roleList
    
    // Role Create Error
    const roleCreate = useSelector(state => state.roleCreate)
    const { error:errorCreate } = roleCreate
  
    // Role Update Error
    const roleUpdate = useSelector(state => state.roleUpdate)
    const { error:errorUpdate } = roleUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Role Info
    const roleDetails = useSelector(state => state.roleDetails)
    const { role: roleDetail } = roleDetails

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
    const [artid, setArtId] = useState('')

    const [mode, setMode] = useState('')

    // Calendar Schedule Details
    const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
    const { calendar:calendarScheduleDetail } = calendarScheduleDetails

    // Add User Modal
    const handleCaseView = (state) => {
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
        setArtId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getRoleDetails(state.target.id))
    }

    // Role Access 
    const handleRoleAccessView = (state) => {
        handleRoleAccessShow()
        setArtId(state.target.id)
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
            {   name: 'Schedule Type',
                selector: row => row.sched_type,
                sortable: true,
            },
            {   name: 'Case No',
                selector: row => row.case_no,
                sortable: true,
            },
            {
                name: 'Partner',
                selector: row => row.partner_company_name,
                sortable: true,
            },
            {
                name: 'End User',
                selector: row => row.enduser_company_name,
                sortable: true,
            },
            {
                name: 'Business Unit',
                selector: row => row.business_unit,
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
            dispatch({ type: ROLE_CREATE_RESET })
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
        setRows(cases)
        setPending(loading)
    }, [cases, rows, loading])

    //
    useEffect(() => {
        // Check / Validate User Access
        if(userInfo.submenu.find(x => x.url === window.location.pathname)) {

            // View all Cases
            dispatch(listCases())
            // Get Business Unit
            dispatch(listBusinessUnitOption())
        } else {
            // Redirect to login page
            navigate('/signin')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <>
            {/* <SideMenu /> */}
            <FormContainer>
                <Header headerTitle={headerTitle} />
                <Button  size="sm" className="btn btn-sm bg-gradient-info mb-1 float-end" onClick={handleCaseView}>
                    <FontAwesomeIcon icon={['fas', 'plus']} /> Add Case
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
                
                {/* <EditCaseModal 
                    show={show} 
                    onHide={handleClose} 
                    roleid={roleid}
                    roleDetails={roleDetail}
                    mode={mode}
                /> */}

                <EditCalendarScheduleModal 
                    size="lg"
                    show={show}
                    onHide={handleClose} 
                    artid={artid}
                    calendarScheduleDetails={calendarScheduleDetail}
                    mode={mode}
                    notify={notify}
                />

                {/* <RoleAccessModal 
                    show={showRoleAccess} 
                    onHide={handleRoleAccessClose} 
                    roleid={roleid}
                    categories={categories}
                    subcategories={subcategories}
                /> */}

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

export default CaseScreen