import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import DatePicker from 'react-datepicker'
// import moment from 'moment'
import { 
    listScheduleReference,
    getScheduleReferenceDetails,
    deleteScheduleReference,
    listScheduleReferenceId,
  } from '../actions/Sales/salesScheduleReferenceAction'
  
  import { 
      listCalendarSchedule,
      getSelectedCalendarDetails,
  } from '../actions/Sales/salesCalendarScheduleAction'
  
  import {  
      getSeUsersList, 
      getUsersEmailList,
  } from '../actions/userActions'
  
  import { listBusinessUnitOption } from '../actions/businessUnitActions'
  import { listDestinationOption } from '../actions/Admin/destinationDetailsActions'
  
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

    // useState
    const [selectedCalendarDetails, setSelectedCalendarDetails] = useState({})
    // Locales
    const locales = {
        "en-US": require("date-fns/locale/en-US")
    }
    // 
    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })
    // Calendar Event
    // const [newEvent, setNewEvent] = useState({
    //     title: "", 
    //     start: "", 
    //     end:""
    // })
    
    // const [allEvents, setAllEvents] = useState(events)
     
    // const handleAddEvent = () => {
    //     setAllEvents([...allEvents, newEvent])
    // }

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

    // Calendar Schedule Lists
    const calendarScheduleList = useSelector(state => state.calendarScheduleList)
    const { calendar } = calendarScheduleList

    // Calendar Schedule Details
    const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
    const { loading:loadingDetails , calendar:calendarScheduleDetail } = calendarScheduleDetails

    // EditRoleModal
    const [show, setShow] = useState(false)

    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [artid, setArtId] = useState('')
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

    //
    const handleViewCalendarInfo = (state) => {
        // Show Modal
        setShow(true)
        setArtId(state.art_id)
        setMode('Edit')
        dispatch(getSelectedCalendarDetails(state.art_id))
        setSelectedCalendarDetails(calendarScheduleDetail)
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
                dispatch(listCalendarSchedule())
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

    //
    useEffect(() => {
        // Check if user is Sales else, redirect user
        if(userInfo && userInfo.user.user_type === 1) {
            // Get List of Calendar Schedule
            dispatch(listCalendarSchedule())
            // Get List of Destination Option
            dispatch(listDestinationOption())
            // Get List User Reference Id
            dispatch(listScheduleReferenceId())
            // Get List Activity Related To Option
            dispatch(listActivityRelatedToOption())
            // Get Users Email
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
{/* 
                    <div>
                        <input type="text" 
                            placeholder="Add Title" 
                            style={{width: "20%", marginRight: "10px"}} 
                            value={newEvent.title} 
                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        />
                        <DatePicker 
                            placeholderText="Start Date" style={{marginRight: "10px"}}
                            selected={newEvent.start} 
                            onChange={(start) => setNewEvent({...newEvent, start})}
                        />
                        <DatePicker 
                            placeholderText="End Date" style={{marginRight: "10px"}}
                            selected={newEvent.end} 
                            onChange={(end) => setNewEvent({...newEvent, end})}
                        />
                        <button 
                            style={{marginTop: "10px"}}
                            onClick={handleAddEvent}
                        >Add Event</button>
                    </div> */}

                    <Button variant="primary" size="sm" className="float-end" onClick={handleScheduleReferenceView}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add Schedule
                    </Button>

                    <Calendar
                        localizer={localizer}
                        events={calendar}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 , margin: '50px'}}
                        popup
                        onSelectEvent={handleViewCalendarInfo}
                    />

                    <EditCalendarScheduleModal 
                        size="lg"
                        show={show} 
                        onHide={handleClose} 
                        artid={artid}
                        calendarScheduleDetails={calendarScheduleDetail}
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