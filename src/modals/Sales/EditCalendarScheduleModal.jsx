import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  listCalendarSchedule,
  createCalendarSchedule,
  updateCalendarSchedule,
} from '../../actions/Sales/salesCalendarScheduleAction'
import { approverActivityRequest } from '../../actions/Approver/approverActivityRequestAction'
import TrainingSchedule from '../../components/Sales/TrainingSchedule'
import NewScheduleRequest from '../../components/Sales/NewScheduleRequest'
import { 
  CALENDAR_SCHEDULE_CREATE_RESET,
  CALENDAR_SCHEDULE_UPDATE_RESET,
} from '../../constants/Sales/salesCalendarScheduleConstants'
import { listActivityRequestForApprover } from '../../actions/Approver/approverActivityRequestAction'
import MotherFolder from '../../components/Sales/MotherFolder'
import { getScheduleReferenceDetails } from '../../actions/Sales/salesScheduleReferenceAction'
import { ACTIVITY_FOR_APPROVER_UPDATE_RESET } from '../../constants/Approver/approverActivityRequestConstants'
// import CloseButton from 'react-bootstrap/CloseButton';
const EditCalendarScheduleModal = (props) => {
  //
  const { 
    show, mode, onHide, 
    artid, calendarScheduleDetails, size,
  } = props

  // Redux
  const dispatch = useDispatch()
  // setState
  const [scheduleType, setScheduleType] = useState('')
  const [status, setStatus] = useState('')
  const [userId, setUserId] = useState('')
  // Training Fields
  const [trainingFields , setTrainingFields] = useState({})
  // New Schedule Fields
  const [newScheduleFields, setNewScheduleFields] = useState({})
  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { loading:calendarDetailsLoading } = calendarScheduleDetailsInfo
  // Calendar Schedule Create Success Message
  const calendarScheduleCreate = useSelector(state => state.calendarScheduleCreate)
  const { success:calendarScheduleCreateSuccess, message:calendarScheduleCreateMessage } = calendarScheduleCreate
  // Calendar Schedule Update Success Message
  const calendarScheduleUpdate = useSelector(state => state.calendarScheduleUpdate)
  const { success:calendarScheduleUpdateSuccess, message:calendarScheduleUpdateMessage } = calendarScheduleUpdate
  // Cancel Schedule
  const approverActivityUpdate = useSelector(state => state.approverActivityUpdate)
  const { success:approverActivityUpdateSuccess , message:approverActivityUpdateMessage } = approverActivityUpdate
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // CommonJS
  const Swal = require('sweetalert2')

  const handleSubmit = async () =>  {
    // Data Object
    let data = {}
    // Save Change Here...
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      if (result.isConfirmed) {
        // 
        if(scheduleType === 'New-Schedule')
          data = {...newScheduleFields, schedule_type: scheduleType, user_id: userInfo.user.id}
        else if (scheduleType === 'Training-Schedule')
          data = {...trainingFields, schedule_type: scheduleType, user_id: userInfo.user.id}
        // 
        if(mode === 'Add') {
          // Create Calendar Schedule 
          dispatch(createCalendarSchedule(data))
        } else {
          // Update Schedule
          dispatch(updateCalendarSchedule(data, artid))
        }
      }
    })
  }

  /**
   * - Approved Request
   */
  const handleCancelRequest = () => {
    // Data Object
    let data = {}
    // Save Change Here...
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(scheduleType === 'New-Schedule')
              data = {...newScheduleFields, schedule_type: scheduleType, status: 'Canceled', user_id: userInfo.user.id}
            else if (scheduleType === 'Training-Schedule')
              data = {...trainingFields, schedule_type: scheduleType, status: 'Canceled', user_id: userInfo.user.id}
            // 
            if(mode === 'Add') {
              // Create Calendar Schedule 
              dispatch(createCalendarSchedule(data))
            } else {
              // Update Schedule
              dispatch(approverActivityRequest(data))
              // Refresh Datatable
              dispatch(listCalendarSchedule())
            }
        }
    })
  }
  
  /**
   * - Approved Request
   */
  const handleApprovedRequest = () => {
    // Data Object
    let data = {}
    // Save Change Here...
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(scheduleType === 'New-Schedule')
                data = {...newScheduleFields, schedule_type: scheduleType, status: 'Approved', user_id: userInfo.user.id}
            else if (scheduleType === 'Training-Schedule')
                data = {...trainingFields, schedule_type: scheduleType, status: 'Approved', user_id: userInfo.user.id}
            // 
            if(mode === 'Add') {
                // Create Calendar Schedule 
                dispatch(createCalendarSchedule(data))
            } else {
                // Update Schedule
                dispatch(approverActivityRequest(data))
            }
        }
    })
  }
  /**
   * - Reject Request
   */
  const handleRejectRequest = () => {
       // Data Object
       let data = {}
       // Save Change Here...
       Swal.fire({
           title: 'Are you sure?',
           text: "You won't be able to revert this!",
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes, Proceed!'
       }).then((result) => {
           if (result.isConfirmed) {
            if(scheduleType === 'New-Schedule')
                data = {...newScheduleFields, schedule_type: scheduleType, status: 'Rejected', user_id: userInfo.user.id}
            else if (scheduleType === 'Training-Schedule')
                data = {...trainingFields, schedule_type: scheduleType, status: 'Rejected', user_id: userInfo.user.id}
                // 
                if(mode === 'Add') {
                    // Create Calendar Schedule 
                    // dispatch(createCalendarSchedule(data))
                } else {
                    // Update Schedule
                    dispatch(approverActivityRequest(data))
                }
            }
       })
  }

  // Selected Calendar Details
  useEffect(() => {
    // 
    const { 
      sched_type, 
      ar_id, 
      status,
      user_id,
    } = calendarScheduleDetails
    
    // setState
    setScheduleType(sched_type || '')
    setStatus(status || '')
    setUserId(user_id || '')
    //
    dispatch(getScheduleReferenceDetails(ar_id))
  },[calendarScheduleDetails])

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(calendarScheduleCreateSuccess) {
      Swal.fire(
        'Success!',
        calendarScheduleCreateMessage,
        'success'
      )
      // User Role 
      const user = {
        'activity_type': 'Pre-Sales',
        'status': 'For Approval',
        'list_type': 'view-for-approval'
      }
      // Refresh Datatable
      dispatch(listActivityRequestForApprover(user))
      
      dispatch({
        type: CALENDAR_SCHEDULE_CREATE_RESET,
      })
      // Close Modal
      onHide()
    }

    // Show Success Update
    if(calendarScheduleUpdateSuccess) {
      Swal.fire(
        'Success!',
        calendarScheduleUpdateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listCalendarSchedule())
      dispatch({
        type: CALENDAR_SCHEDULE_UPDATE_RESET,
      })
      // Close Modal
      onHide()
    }

    // Show Success Update
    if(approverActivityUpdateSuccess) {
      Swal.fire(
        'Success!',
        approverActivityUpdateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listCalendarSchedule())
      dispatch({
        type: ACTIVITY_FOR_APPROVER_UPDATE_RESET,
      })
      // Close Modal
      onHide()
    }

  },[calendarScheduleCreateSuccess,
     calendarScheduleUpdateSuccess,
     approverActivityUpdateSuccess,])

  return (
    <>
        <Modal  
          size={size} 
          show={show} 
          onHide={onHide}
          backdrop="static"
          keyboard={false}
          // autoFocus={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>{ mode === 'Add' ? 'Add Calendar Schedule' : 'Edit Calendar Schedule'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>{mode} Select Schedule Type</Form.Label>
                    <Form.Control
                      size='sm'
                      as='select' 
                      aria-label="Status"
                      value={scheduleType}
                      disabled={(mode === 'Edit')}
                      onChange={(e) => setScheduleType(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    <option value="New-Schedule">New Schedule Request</option>
                    <option value="Training-Schedule">Training Schedule</option>
                    </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                </Col>
            </Row>
          { calendarDetailsLoading ? <Loader /> : 
            <>
              { scheduleType === 'New-Schedule' && 
                <NewScheduleRequest
                  artid={artid}
                  setNewScheduleFields={setNewScheduleFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                /> 
              }
              { scheduleType === 'Training-Schedule' && 
                <TrainingSchedule 
                  artid={artid}
                  setTrainingFields={setTrainingFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                />
              }
            </>
          }

          { mode === 'Edit' && <MotherFolder mode={mode} /> }

        </Modal.Body>
        <Modal.Footer>
            <Button size='sm' variant="secondary" onClick={onHide}>
                Close
            </Button>

            {/* Approver Button */}
            {['Pre-Sales Approver','Post-Sales Approver','Super Approver'].includes(userInfo.user_role) && 
              <>
                {status === 'For-Approval' && (userId === userInfo.user.id) &&
                  <>
                    <Button size='sm' variant="danger" onClick={handleRejectRequest} >
                      Reject Request
                    </Button>
                    <Button size='sm' variant="info" onClick={handleApprovedRequest} >
                        Approve Request
                    </Button>
                  </>
                }
              </>
            }

            {/* Approver Button */}
            {['Sales'].includes(userInfo.user_role) && 
              <>
                {status !== 'For-Approval' && (userId === userInfo.user.id) &&
                  <>
                    <Button size='sm' variant="warning" onClick={handleCancelRequest} >
                      Cancel Schedule
                    </Button>
                  </>
                }
            
                {mode === 'Edit' && userId === userInfo.user.id &&
                  <>
                    <Button size='sm' variant="primary" onClick={handleSubmit} >
                        Save Changes
                    </Button>
                  </>
                }
              </>
            }

            {/* Show Save Change Button */}
            {mode === 'Add' && 
              <>
                <Button size='sm' variant="primary" onClick={handleSubmit} >
                    Save Schedule
                </Button>
              </>
            }
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditCalendarScheduleModal
