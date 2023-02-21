import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { 
  listCalendarSchedule,
  createCalendarSchedule,
} from '../../actions/Sales/salesCalendarScheduleAction'

import TrainingSchedule from '../../components/Sales/TrainingSchedule'
import NewScheduleRequest from '../../components/Sales/NewScheduleRequest'
import moment from 'moment'

// import CloseButton from 'react-bootstrap/CloseButton';
const EditCalendarScheduleModal = ({ show , mode, onHide, artid, calendarScheduleDetails, size }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [scheduleType, setScheduleType] = useState('')
  // Training Fields
  const [trainingFields , setTrainingFields] = useState({})
  // New Schedule Fields
  const [newScheduleFields, setNewScheduleFields] = useState({})
  // Schedule Reference Details
  const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
  const { loading:scheduleReferenceLoading } = scheduleReferenceDetails
  // Schedule Reference Create Success Message
  const scheduleReferenceCreate = useSelector(state => state.scheduleReferenceCreate)
  const { success:scheduleReferenceCreateSuccess, message:scheduleReferenceCreateMessage } = scheduleReferenceCreate
  // Schedule Reference Update Success Message
  const scheduleReferenceUpdate = useSelector(state => state.scheduleReferenceUpdate)
  const { success:scheduleReferenceUpdateSuccess, message:scheduleReferenceUpdateMessage } = scheduleReferenceUpdate
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  // Schedule Type
  const { sched_type } = calendarScheduleDetails

  // CommonJS
  const Swal = require('sweetalert2')

  // Event in select dropdown
  const handleSelectedChange = (event) => {
    //
    const target = event.target
    const selected = event.currentTarget.value
    // const selected = target.selected
    const name = target.name
    // setStatus(selected)
  }

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
          data = {...newScheduleFields, schedule_type: scheduleType}
        else if (scheduleType === 'Training-Schedule')
          data = {...trainingFields, schedule_type: scheduleType}

        // 
        if(mode === 'Add') {
            // Create Calendar Schedule 
            dispatch(createCalendarSchedule(data))
        } else {

          
          // Update Schedule
          console.warn(data)
        }
      }
    })
  }

  // Get Destination
  useEffect(() => {
    // Selected Calendar Details
    const { sched_type } = calendarScheduleDetails
    
    // setState
    setScheduleType(sched_type || '')
  },[calendarScheduleDetails])

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(scheduleReferenceCreateSuccess) {
      Swal.fire(
        'Success!',
        scheduleReferenceCreateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listCalendarSchedule())
      // Close Modal
      onHide()
    }

    // Show Success Update
    if(scheduleReferenceUpdateSuccess) {
      Swal.fire(
        'Success!',
        scheduleReferenceUpdateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listCalendarSchedule())
      // Close Modal
      onHide()
    }

  },[scheduleReferenceCreateMessage, scheduleReferenceUpdateSuccess])

  return (
    <>
        <Modal  
          size={size} 
          show={show} 
          onHide={onHide}
          backdrop="static"
          keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>{ mode === 'Add' ? 'Add Calendar Schedule' : 'Edit Calendar Schedule'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Select Schedule Type</Form.Label>
                    <Form.Control
                      size='sm'
                      as='select' 
                      aria-label="Status"
                      
                      value={scheduleType}
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
          { scheduleReferenceLoading ? <Loader /> : 
            <>
              { scheduleType === 'New-Schedule' && 
                <NewScheduleRequest
                  setNewScheduleFields={setNewScheduleFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                /> 
              }
              { scheduleType === 'Training-Schedule' && 
                <TrainingSchedule 
                  setTrainingFields={setTrainingFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                />
              }
            </>
          }
        </Modal.Body>
        <Modal.Footer>
            <Button size='sm' variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button size='sm' variant="primary" onClick={handleSubmit} >
                Save Changes
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditCalendarScheduleModal
