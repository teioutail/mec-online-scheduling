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
  listScheduleReference,
  getScheduleReferenceDetails,
  deleteScheduleReference,
} from '../../actions/Sales/salesScheduleReferenceAction'
import { getUsersEmailList } from '../../actions/userActions'
import { listBusinessUnitOption } from '../../actions/businessUnitActions'
import { 
  SCHEDULE_REFERENCE_CREATE_RESET,
  SCHEDULE_REFERENCE_DETAILS_RESET,
  SCHEDULE_REFERENCE_UPDATE_RESET,
} from '../../constants/Sales/salesScheduleReferenceConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditScheduleModal from '../../modals/Sales/EditScheduleModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditInventoryModal from '../../modals/Sales/EditInventoryModal'
import { 
    INVENTORY_CREATE_BULK_RESET, 
    INVENTORY_CREATE_RESET,
} from '../../constants/Sales/motherFolderInventoryConstants'
import EditGroupInventoryModal from '../../modals/Sales/EditGroupInventoryModal'
import ViewInventoryModal from '../../modals/Sales/ViewInventoryModal'
import { 
    getSelectedInventoryStatus,
    listMotherFolderInventory,
} from '../../actions/Sales/motherFolderInventoryAction'
import EditActivityReferenceStatus from '../../modals/Sales/EditActivityReferenceStatus'

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
    const headerTitle = 'Mother Folder'
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
    const scheduleReferenceUpdate = useSelector(state => state.scheduleReferenceUpdate)
    const { error:errorUpdate } = scheduleReferenceUpdate
    // Mother Folder Create Error Message
    const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
    const { error:motherFolderInventoryErrorCreate, message:motherFolderInventoryErrorMessage } = motherFolderInventoryCreate
    // Mother Folder Bulk Upload Create Error Message
    const motherFolderInventoryBulkCreate = useSelector(state => state.motherFolderInventoryBulkCreate)
    const { error:motherFolderInventoryBulkCreateError, message:motherFolderInventoryBulkCreateMessage } = motherFolderInventoryBulkCreate
    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // Schedule Info / Details
    const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
    const { schedule:scheduleDetail } = scheduleReferenceDetails
    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    // EditRoleModal
    const [show, setShow] = useState(false)
    // Inventory
    const [showInventory, setShowInventory] = useState(false)
    const [showGroupInventory, setShowGroupInventory] = useState(false)
    const [showInventoryList, setShowInventoryList] = useState(false)
    const [showInventoryStatus, setShowInventoryStatus] = useState(false);
    //
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
        dispatch(getScheduleReferenceDetails(state.target.id))
    }
    // Inventory 
    const handleInventoryView = (state) => {
        setShowInventory(true);
        setScheduleId(state.target.id)
        setMode('Edit')
        // Call API Here...
    }
    // Group Inventory
    const handleGroupInventoryView = (state) => {
        setShowGroupInventory(true);
        setScheduleId(state.target.id)
        setMode('Edit')
        // Call API Here...
    }
    // View Inventory List
    const handleInventoryListView = (state) => {
        setShowInventoryList(true)
        setScheduleId(state.target.id)
        dispatch(listMotherFolderInventory(state.target.id))
        setMode('Edit')
    }
    // View Status
    const handleInventoryStatus = (state) => {
        setShowInventoryStatus(true)
        setScheduleId(state.target.id)
        dispatch(getSelectedInventoryStatus(state.target.id))
        setMode('Edit')
    }
    // Delete Schedule Reference
    const handleDeleteScheduleReference = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this schedule?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            // 
            if (result.isConfirmed) {
                // Delete Schedule
                dispatch(deleteScheduleReference(state.target.id))
                // Refresh Datatable
                dispatch(listScheduleReference())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Schedule Successfully Deleted.', 
                    'success'
                )
            }
        })
    }
    // Columns
    const columns = useMemo(
		() => [
            { name: 'Reference No',selector: row => row.reference_id, sortable: true },
            { name: 'Project Name',selector: row => row.project_name,sortable: true },
            { name: 'Project No',selector: row => row.project_no, sortable: true },
            { name: 'Case No',selector: row => row.case_no, sortable: true },
            { name: 'SA No',selector: row => row.sa_no, sortable: true },
            // { name: 'Partner',selector: row => row.partner_company_name,sortable: true },
            // { name: 'End-User',selector: row => row.enduser_company_name, sortable: true},
            {
                name: 'Action',
                cell: (row) => {
                    //
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.role_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditScheduleReferenceView} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'pen-to-square']} /> Edit Schedule
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleInventoryStatus} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'clipboard-list']} /> Change Status
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleInventoryView} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'box']} /> Individual Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleGroupInventoryView} id={row.ar_id}>
                                        <FontAwesomeIcon icon={['fas', 'layer-group']} /> Group Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleInventoryListView} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'eye']} /> View Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteScheduleReference} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Schedule
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                },
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
            //
            dispatch({ type: SCHEDULE_REFERENCE_UPDATE_RESET })
        }

        // Show Mother Folder Error
        if(motherFolderInventoryErrorCreate) {
            // Loop Error Back-End Validation
            for(const key in motherFolderInventoryErrorCreate) {
                if (motherFolderInventoryErrorCreate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${motherFolderInventoryErrorCreate[key]}`)
                }
            }
            //
            dispatch({ type: INVENTORY_CREATE_RESET })
        }

        // Show Bulk Upload Error
        if(motherFolderInventoryBulkCreateError) {
            alert("adsf");
            // Loop Error Back-End Validation
            for(const key in motherFolderInventoryBulkCreateError) {
                if (motherFolderInventoryBulkCreateError.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${motherFolderInventoryBulkCreateError[key]}`)
                }
            }
            //
            dispatch({ type: INVENTORY_CREATE_BULK_RESET })
        }

    },[errorCreate, 
        errorUpdate,
        motherFolderInventoryErrorCreate,
        motherFolderInventoryBulkCreateError])

    // Set Row Value
    useEffect(() => {
        setRows(schedules)
        setPending(loading)
    }, [schedules, rows, loading])
    
    //
    useEffect(() => {
        // Check / Validate User Access
        if(userInfo.mainmenu.find(x => x.url === window.location.pathname)) {
        // if(userInfo && userInfo.user.user_type === 1) {
            dispatch(listScheduleReference())
            // Get User Email List
            dispatch(getUsersEmailList())
            // Get Business Unit
            dispatch(listBusinessUnitOption())
        } else {
            // Redirect to login page
            navigate('/signin')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <>
            <FormContainer>
                <Header headerTitle={headerTitle} />
                
                    <Button className="btn btn-sm bg-gradient-info mb-2 float-end" size="sm" onClick={handleScheduleReferenceView}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add Mother Folder
                    </Button>
    
                    <DataTable
                        // title={headerTitle}
                        // selectableRows
                        // data={users}
                        pagination
                        responsive
                        columns={columns}
                        data={rows}
                        // data={rows ? [rows[0]] : []}
                        progressPending={pending}
                        progressComponent={<Loader />}
                        highlightOnHover
                        pointerOnHover
                        selectableRowsHighlight
                    />

                    <EditScheduleModal 
                        size="lg"
                        show={show} 
                        onHide={() => setShow(false)} 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
                        mode={mode}
                    />

                    <EditInventoryModal 
                        size="lg"
                        show={showInventory} 
                        onHide={() => setShowInventory(false) } 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
                        mode={mode}
                    />

                    <EditGroupInventoryModal
                        size="lg"
                        show={showGroupInventory} 
                        onHide={() => setShowGroupInventory(false) } 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
                        mode={mode}
                    />

                    <ViewInventoryModal
                        show={showInventoryList} 
                        onHide={() => setShowInventoryList(false) } 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
                        mode={mode}
                    />

                    <EditActivityReferenceStatus 
                        show={showInventoryStatus} 
                        onHide={() => setShowInventoryStatus(false) } 
                        scheduleid={scheduleid}
                        scheduleDetails={scheduleDetail}
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

export default ScheduleScreen