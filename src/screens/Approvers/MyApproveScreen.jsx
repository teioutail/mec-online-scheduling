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
import { listBusinessUnitOption } from '../../actions/businessUnitActions'
import { 
    ACTIVITY_FOR_APPROVER_UPDATE_RESET,
} from '../../constants/Approver/approverActivityRequestConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ViewCalendarScheduleModal from '../../modals/Approver/ViewCalendarScheduleModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    listActivityRequestForApprover,
} from '../../actions/Approver/approverActivityRequestAction'
import moment from 'moment'
import { 
    getSelectedCalendarDetails,
} from '../../actions/Sales/salesCalendarScheduleAction'

const ApproverForApprovalScreen = () => {
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
    const headerTitle = 'Schedule For Approval'
    // Redux
    const dispatch = useDispatch()
    // useNavigate to redirect the user
    const navigate = useNavigate()
    // For Approval List
    const approverActivityList = useSelector(state => state.approverActivityList)
    const { loading , activity } = approverActivityList
    // Approver Activity Update
    const approverActivityUpdate = useSelector(state => state.approverActivityUpdate)
    const { error:errorUpdate } = approverActivityUpdate
    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // Calendar Schedule Details
    const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
    const { calendar:calendarScheduleDetail } = calendarScheduleDetails
    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    // EditRoleModal
    const [show, setShow] = useState(false)
    // Modal State
    const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)
    // Global ID
    const [artid, setArtId] = useState('')
    const [mode, setMode] = useState('')
    // Edit 
    const handleEditScheduleView = (state) => {
        setShow(true)
        setArtId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getSelectedCalendarDetails(state.target.id))
    }
    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Schedule Reference No',
                selector: row => row.reference_id,
                sortable: true,
            },
            {   name: 'Date Requested',
                selector: row => row.date_requested,
                sortable: true,
            },
            {
                name: 'Activity Related To',
                selector: row => row.activity,
                sortable: true,
            },
            {
                name: 'Related Team',
                selector: row => row.related_team,
                sortable: true,
            },
            {
                name: 'Activity Date',
                selector: row => moment(row.activity_date).format('L'),
                sortable: true,
            },
            {
                name: 'Assigned Engineer',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
                name: 'Action',
                cell: (row) => {
                    //
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.art_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditScheduleView} id={row.art_id}>
                                      <FontAwesomeIcon icon={['fas', 'eye']} /> View Schedule
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
            dispatch({ type: ACTIVITY_FOR_APPROVER_UPDATE_RESET })
        }
    }, [errorUpdate])

    // Set Row Value
    useEffect(() => {
        setRows(activity)
        setPending(loading)
    }, [activity, rows, loading])
    
    //
    useEffect(() => {
        // Check / Validate User Access
        if(userInfo.submenu.find(x => x.url === window.location.pathname)) {
        // if(userInfo && userInfo.user.user_type === 1) {
            // User Role 
            const user = {
                'activity_type': userInfo.user.manage_team,
                'status': 'For Approval',
                'list_type': 'view-for-approval'
            }
            // List All Activity Request
            dispatch(listActivityRequestForApprover(user))
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

                    <ViewCalendarScheduleModal 
                        size="lg"
                        show={show} 
                        onHide={handleClose} 
                        artid={artid}
                        mode={mode}
                        calendarScheduleDetails={calendarScheduleDetail}
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

export default ApproverForApprovalScreen