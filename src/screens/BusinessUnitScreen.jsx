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
    // listRoles,
    getRoleDetails,
    deleteRole,
} from '../actions/roleActions'

import { 
    listBusinessUnit,
    getBusinessUnitDetails,
} from '../actions/businessUnitActions'

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
 } from '../constants/roleConstants'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditRoleModal from '../modals/Role/EditRoleModal'
import RoleAccessModal from '../modals/Role/RoleAccessModal'
import EditBusinessUnitModal from '../modals/Admin/EditBusinessUnitModal'

import { listMenuCategories } from '../actions/menuCategoryActions'
import { listSubMenuCategories } from '../actions/menuSubCategoryAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BUSINESS_UNIT_DETAILS_RESET } from '../constants/businessUnitConstants'

const BusinessUnitScreen = () => {
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
    const headerTitle = 'Business Unit'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Business Unit List
    const businessUnitList = useSelector(state => state.businessUnitList)
    const { loading, business } = businessUnitList
    
    // Role Create Error
    const roleCreate = useSelector(state => state.roleCreate)
    const { error:errorCreate } = roleCreate
  
    // Role Update Error
    const roleUpdate = useSelector(state => state.roleUpdate)
    const { error:errorUpdate } = roleUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Business Unit Info
    const businessUnitDetails = useSelector(state => state.businessUnitDetails)
    const { business: businessUnitDetail } = businessUnitDetails

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
    const [businessUnitId, setBusinessUnitId] = useState('')
    const [mode, setMode] = useState('')

    // Add User Modal
    const handlebusinessUnitView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: BUSINESS_UNIT_DETAILS_RESET,
        })
    }

    // Edit Business Unit
    const handleEditBusinessUnitView = (state) => {
        setShow(true)
        setBusinessUnitId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getBusinessUnitDetails(state.target.id))
    }

    // Delete Business Unit Modal
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
                dispatch(listBusinessUnit())
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
            {   name: 'BU ID',
                selector: row => row.bu_id,
                sortable: true,
            },
            {   name: 'Business Unit',
                selector: row => row.business_unit,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.bu_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditBusinessUnitView} id={row.bu_id}>
                                        <FontAwesomeIcon icon={['fas', 'pen-to-square']} /> Edit Business Unit
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteRole} id={row.bu_id}>
                                        <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Business Unit
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
        setRows(business)
        setPending(loading)
    }, [business, rows, loading])


    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // Business Unit List
            dispatch(listBusinessUnit())

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
                    <Button variant="primary" size="sm" className="float-end" onClick={handlebusinessUnitView}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add New
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
                    
                    <EditBusinessUnitModal 
                        show={show} 
                        onHide={handleClose} 
                        buid={businessUnitId}
                        businessUnitDetails={businessUnitDetail}
                        mode={mode}
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

export default BusinessUnitScreen