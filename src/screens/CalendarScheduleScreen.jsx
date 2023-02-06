import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  listScheduleReference,
  getScheduleReferenceDetails,
  deleteScheduleReference,
  listScheduleReferenceId,
} from '../actions/Sales/salesScheduleReferenceAction'
import {  getUsersEmailList } from '../actions/userActions'
import { listBusinessUnitOption } from '../actions/businessUnitActions'
import { 
  SCHEDULE_REFERENCE_CREATE_RESET,
  SCHEDULE_REFERENCE_DETAILS_RESET,
  SCHEDULE_REFERENCE_UPDATE_RESET,
} from '../constants/Sales/salesScheduleReferenceConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditCalendarScheduleModal from '../modals/Sales/EditCalendarScheduleModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listActivityRelatedToOption } from '../actions/Admin/activityRelatedToActions'

const CalendarScheduleScreen = () => {
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
    // Moment
    const localizer = momentLocalizer(moment)
    // CommonJS
    const Swal = require('sweetalert2')
    // Header
    const headerTitle = 'Calendar Schedule'
    // Redux
    const dispatch = useDispatch()
    // useNavigate to redirect the user
    const navigate = useNavigate()

    // Schedule Create Error
    const scheduleReferenceCreate = useSelector(state => state.scheduleReferenceCreate)
    const { error:errorCreate } = scheduleReferenceCreate
  
    // Schedule Update Error
    const scheduleReferenceUpdate = useSelector(state => state.scheduleReferenceUpdate)
    const { error:errorUpdate } = scheduleReferenceUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Schedule Info / Details
    const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
    const { schedule:scheduleDetail } = scheduleReferenceDetails

    // EditRoleModal
    const [show, setShow] = useState(false)

    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [scheduleid, setScheduleId] = useState('')
    const [mode, setMode] = useState('')

    // Add Calendar Modal
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

    // Role Access 
    const handleRoleAccessView = (state) => {
        setScheduleId(state.target.id)
        setMode('Edit')
        // Call API Here...
        
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
    }, [errorCreate, errorUpdate])

    // Set Row Value
    // useEffect(() => {
    //     setRows(schedules)
    //     setPending(loading)
    // }, [schedules, rows, loading])

    //
    useEffect(() => {
        // Check if user is sales else, redirect user
        if(userInfo && userInfo.user.user_type === 1) {
            // Get List User Reference Id
            dispatch(listScheduleReferenceId())
            // Get List Activity Related To Option
            dispatch(listActivityRelatedToOption())
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
            <SideMenu />
            <FormContainer>
                <Header headerTitle={headerTitle} />
                    <Button variant="primary" size="sm" className="float-end" onClick={handleScheduleReferenceView}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add Schedule
                    </Button>

                    <Calendar
                        localizer={localizer}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 , marginTop: '50px'}}
                    />

                    <EditCalendarScheduleModal 
                        size="lg"
                        show={show} 
                        onHide={handleClose} 
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

export default CalendarScheduleScreen