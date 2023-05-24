import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import FormContainer from '../components/template/FormContainer'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
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

import {
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
  import Swal from 'sweetalert2/dist/sweetalert2.js'
  import EditCalendarScheduleModal from '../modals/Sales/EditCalendarScheduleModal'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { listActivityRelatedToOption } from '../actions/Admin/activityRelatedToActions'
  import { 
    CALENDAR_SCHEDULE_CREATE_RESET, 
    CALENDAR_SCHEDULE_UPDATE_RESET,
  } from '../constants/Sales/salesCalendarScheduleConstants'
import { ACTIVITY_FOR_APPROVER_UPDATE_RESET } from '../constants/Approver/approverActivityRequestConstants'
import UpdateRequestModal from '../modals/SE/UpdateRequestModal'

const CalendarScheduleScreen = () => {
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
    // Calendar Create Error
    const calendarScheduleCreate = useSelector(state => state.calendarScheduleCreate)
    const { error:errorCreate } = calendarScheduleCreate
    // Calendar Update Error
    const calendarScheduleUpdate = useSelector(state => state.calendarScheduleUpdate)
    const { error:errorUpdate } = calendarScheduleUpdate
    //
    const approverActivityUpdate = useSelector(state => state.approverActivityUpdate)
    const { error:approverActivityUpdateError } = approverActivityUpdate
    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Calendar Schedule Lists
    const calendarScheduleList = useSelector(state => state.calendarScheduleList)
    const { loading:loadingList , calendar } = calendarScheduleList

    // Calendar Schedule Details
    const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
    const { calendar:calendarScheduleDetail } = calendarScheduleDetails
 
    // EditRoleModal
    const [show, setShow] = useState(false)
    // UpdateRequestModal
    const [show2, setShow2] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    // Global ID
    const [artid, setArtId] = useState('')
    const [mode, setMode] = useState('')
    const [activityType, setActivityType] = useState('');
    // Add Calendar Modal
    const handleCalendarScheduleView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
    }
    //
    const handleViewCalendarInfo = (state) => {
        // Show Modal
        setShow(true)
        setArtId(state.art_id)
        setMode('Edit')
        // 
        dispatch(getSelectedCalendarDetails(state.art_id))
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
                dispatch(listCalendarSchedule(userInfo.user_role))
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
            dispatch({ type: CALENDAR_SCHEDULE_CREATE_RESET })
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
            dispatch({ type: CALENDAR_SCHEDULE_UPDATE_RESET })
        }

        // Show Update Error on Activity Update
        if(approverActivityUpdateError) {
            // Loop Error Back-End Validation
            for(const key in approverActivityUpdateError) {
                if (approverActivityUpdateError.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${approverActivityUpdateError[key]}`)
                }
            }
            //
            dispatch({ type: ACTIVITY_FOR_APPROVER_UPDATE_RESET })
        }

    }, [errorCreate, 
        errorUpdate, 
        approverActivityUpdateError])

    //
    useEffect(() => {
        // Validate User Login Access
        if(userInfo.mainmenu.find(x => x.url === window.location.pathname)) {
            // Get List of Calendar Schedule
            dispatch(listCalendarSchedule(userInfo.user_role))
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
            <FormContainer>
                <Header headerTitle={headerTitle} />
                
                    {userInfo.user_role !== "Engineer" &&  
                        <Button  size="sm" className="btn btn-sm bg-gradient-info mb-0 float-end" onClick={handleCalendarScheduleView}>
                            <FontAwesomeIcon icon={['fas', 'plus']} /> Add Schedule
                        </Button>
                    }

                    {loadingList ? <Loader/> : <Calendar
                        localizer={localizer}
                        events={calendar}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 700, margin: '50px'}}
                        popup
                        onSelectEvent={handleViewCalendarInfo}
                        eventPropGetter={(calendar) => {
                            const backgroundColor = calendar.colorEvento ? calendar.colorEvento : '#FFFFFF';
                            const color = calendar.color ? calendar.color : '#FFFFFF';
                            return { style: { backgroundColor , color} }
                          }}
                    />}

                    <EditCalendarScheduleModal 
                        size="lg"
                        show={show}
                        setShow2={setShow2} // 
                        onHide={handleClose} 
                        artid={artid}
                        calendarScheduleDetails={calendarScheduleDetail}
                        mode={mode}
                        notify={notify}
                    />

                    <UpdateRequestModal
                        show={show2}
                        artid={artid}
                        setShow2={setShow2}
                        onHide={handleClose}
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