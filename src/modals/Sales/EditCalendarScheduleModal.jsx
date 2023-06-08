import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col, ButtonGroup } from 'react-bootstrap' 
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
import { getScheduleReferenceDetails, listScheduleReferenceId } from '../../actions/Sales/salesScheduleReferenceAction'
import { ACTIVITY_FOR_APPROVER_UPDATE_RESET } from '../../constants/Approver/approverActivityRequestConstants'
import ApproverDetails from '../../components/Approver/ApproverDetails'
import EmailParticipants from '../../components/Approver/EmailParticipants'
import MotherFolder from '../../components/Sales/MotherFolder'
import 'react-toastify/dist/ReactToastify.css';
import { listActivityRelatedToOption } from '../../actions/Admin/activityRelatedToActions'
import JobOrderRequest from '../../components/Sales/JobOrderRequest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSelectedActivityUpdateDetails } from '../../actions/SE/seActivityUpdateAction'

// import CloseButton from 'react-bootstrap/CloseButton';
const EditCalendarScheduleModal = (props) => {
  //
  const { 
    show, mode, onHide, 
    artid, calendarScheduleDetails, size,
    notify, setShow2, setShowInventory
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
  // JO Request
  const [joRequestFields, setJoRequestFields] = useState({})
  // Email Participants
  const [emailParticipantsFields, setEmailParticipantsFields] = useState({})
  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { loading:calendarDetailsLoading, calendar: { reference_act_type, art_id, activity_count }} = calendarScheduleDetailsInfo
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
  // Schedule Reference Details
  
  // CommonJS
  const Swal = require('sweetalert2')

  const handleSubmit = async () =>  {
    // Data Object
    let data = {}
    // Data Object
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    let userListId = [];
    //

    // Email All Recipients
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
    }
    
    // - New Schedule Validation
    if(scheduleType === 'New-Schedule') {
      // Get Employee List 
      let emplist = newScheduleFields.employee_list
      // Get user Id only
      userListId = emplist.map(empid => empid.employeeId )
    }

    // Training Schedule Validation
    if(scheduleType === 'Training-Schedule') {
        // Get Employee List 
        let emplist = trainingFields.employee_list
        // Get user Id only
        userListId = emplist.map(empid => empid.employeeId )
    }

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
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            email: email_addresses,
            user_id: userInfo.user.id,
            user_list_id: userListId,
            art_id: artid,
          }
        else if (scheduleType === 'Training-Schedule')
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            email: email_addresses,
            user_id: userInfo.user.id,
            user_list_id: userListId,
            art_id: artid,
          }
        else if (scheduleType === 'JO-Request')
          data = {...joRequestFields,
            schedule_type: scheduleType,
          }
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

  // View Selected Details
  const handleViewDetails = async () => {
    // Show Selected Activity 
    dispatch(getSelectedActivityUpdateDetails(art_id))
    setShow2(true)
  }
  // 
  const handleViewInventory = () => {
    // Show Selected Inventory
    setShowInventory(true)
  }

  /**
   * - Approved Request
   */
  const handleCancelRequest = () => {
    // 
    let data = {}
    // Data Object
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    // Email All Recipients
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
    }
    // 
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // 
      if (result.isConfirmed) {
        // Schedule
        if(scheduleType === 'New-Schedule')
          //
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Canceled', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          } 
        else if (scheduleType === 'Training-Schedule')
          // 
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Canceled', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      }

      // 
      if(mode === 'Add') {
        // Create Calendar Schedule 
        // dispatch(createCalendarSchedule(data))
      } else {
        // Update Schedule
        dispatch(approverActivityRequest(data))
      }
    })
  }

  /**
   * - Approved Request
   */
  const handleApprovedRequest = () => {
    //
    let data = {}
    // Data Object
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    // Email All Recipients
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);

    }
     // 
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // 
      if (result.isConfirmed) {
        // Schedule
        if(scheduleType === 'New-Schedule')
          //
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Approved', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
        else if (scheduleType === 'Training-Schedule')
          // 
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Approved', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      }
      // 
      if(mode === 'Add') {
        // Create Calendar Schedule 
        // dispatch(createCalendarSchedule(data))
      } else {
        // Update Schedule
        dispatch(approverActivityRequest(data))
      }
    })
  }

  /**
   * - 
   */
  const handleDelegatedApprovedRequest = (state) => {
    // Data Object
    let data = {}
    // Data Object
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    // Email All Recipients
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
    }
    // 
    let user_role = userInfo.user_role
    // 
    const status = ( user_role === 'Pre-Sales Approver' ? 'DELEGATED_POSTSALES_SE_APPROVED':'DELEGATED_PRESALES_SE_APPROVED')
    // 
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // 
      if (result.isConfirmed) {
        // Schedule
        if(scheduleType === 'New-Schedule')
          //
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: status, 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          } 
        else if (scheduleType === 'Training-Schedule')
          // 
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: status, 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      }
      // 
      if(mode === 'Add') {
        // Create Calendar Schedule 
        // dispatch(createCalendarSchedule(data))
      } else {
        // Update Schedule
        dispatch(approverActivityRequest(data))
      }
    })
  }

  /**
   * - Reject Request
   */
  const handleRejectRequest = () => {
    // 
    let data = {}
    // Data Object
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    // Email All Recipients
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
    }
     // 
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // 
      if (result.isConfirmed) {
        // Schedule
        if(scheduleType === 'New-Schedule')
          //
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Rejected', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          } 
        else if (scheduleType === 'Training-Schedule')
          // 
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: 'Rejected', 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      }
      // 
      if(mode === 'Add') {
        // Create Calendar Schedule 
        // dispatch(createCalendarSchedule(data))
      } else {
        // Update Schedule
        dispatch(approverActivityRequest(data))
      }
    })

  }

  /**
   * -  Delegate Request
   */
  const handleDelegateRequest = () => {
    // Data Object
    let data = {}
    // 
    let emails = emailParticipantsFields.email
    let email_addresses = ''
    // Email All Recipients 
    if(emails) {
        // Extract Email Address Only, Email mo
        email_addresses = emails.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
      }, []);
    }
    // 
    const status = (userInfo.user_role === 'Pre-Sales Approver' ? 
      'DELEGATE_POSTSALES_SE_FOR_APPROVAL' : 
      'DELEGATE_PRESALES_SE_FOR_APPROVAL'
    )

     // 
     Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // 
      if (result.isConfirmed) {
        // Schedule
        if(scheduleType === 'New-Schedule')
          //
          data = {...newScheduleFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: status, 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          } 
        else if (scheduleType === 'Training-Schedule')
          // 
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: status, 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      }
      // 
      if(mode === 'Add') {
        // Create Calendar Schedule 
        // dispatch(createCalendarSchedule(data))
      } else {
        // Update Schedule
        dispatch(approverActivityRequest(data))
      }
    })

  }

  /**
   * -  Delegate Request (Super Approver Role)
  */
    const handleDelegateSuperApproverRequest = async () => {
      // Data Object
      let data = {}
      // 
      let emails = emailParticipantsFields.email
      let email_addresses = ''
      // Email All Recipients 
      if(emails) {
          // Extract Email Address Only, Email mo
          email_addresses = emails.reduce((acc, curr) => {
          acc.push(curr.value);
          return acc;
        }, []);
      }

      // 
      const { value: status } = await Swal.fire({
        title: 'Select Manager Type',
        input: 'select',
        inputOptions: {
          'DELEGATE_PRESALES_SE_FOR_APPROVAL': 'Pre-Sales Manager',
          'DELEGATE_POSTSALES_SE_FOR_APPROVAL': 'Post-Sales Manager'
        },
        inputPlaceholder: '- Select -',
        showCancelButton: true,
        inputValidator: (status) => {
          // 
          return new Promise((resolve) => {
            resolve()
          })
        },
      })
      
      if(status) {
          // 
          if(scheduleType === 'New-Schedule')
            // 
            data = {...newScheduleFields, 
              schedule_type: scheduleType, 
              reasons: emailParticipantsFields.additional_remarks, 
              recipients: emailParticipantsFields.email,
              status: status, 
              email: email_addresses,
              user_id: userInfo.user.id,
              requested_by: userId
            }
          else if (scheduleType === 'Training-Schedule')
            // 
            data = {...trainingFields, 
              schedule_type: scheduleType, 
              reasons: emailParticipantsFields.additional_remarks, 
              recipients: emailParticipantsFields.email,
              status: status, 
              email: email_addresses,
              user_id: userInfo.user.id,
              requested_by: userId
            }
          // 
          if(mode === 'Add') {
            // Create Calendar Schedule 
            // dispatch(createCalendarSchedule(data))
          } else {
            // Update Schedule
            dispatch(approverActivityRequest(data))
          }
      } else {
        // Show Error
        notify(`Please Select Manager Type`)
      }
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

    // Comment mo muna
    if(mode === 'Add') {
      // RMA, TCC, Sales - New Schedule Only
      if(['RMA','TCC','Sales','Teamlead','Project Lead'].includes(userInfo.user_role)) {
        setScheduleType('New-Schedule')
      }
      // 
      if(['Training-Approver'].includes(userInfo.user_role)) {
        setScheduleType('Training-Schedule')
      }
    }

    // View Only on Edit Mode and New Schedule
    if(mode === 'Edit' && ar_id)
      dispatch(getScheduleReferenceDetails(ar_id))

  },[calendarScheduleDetails, mode])

  // Show Success 
  useEffect(() => {
    // Get List User Reference Id
    dispatch(listScheduleReferenceId())
    // Get List Activity Related To Option
    dispatch(listActivityRelatedToOption())
    // Show Success Adding of new records
    if(calendarScheduleCreateSuccess) {
      Swal.fire(
        'Success!',
        calendarScheduleCreateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listCalendarSchedule())
      // 
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
      // 
      Swal.fire(
        'Success!',
        approverActivityUpdateMessage,
        'success'
      )

      // Refresh Datatable if exists
      if((['/schedule-for-approval','/schedule-delegated'].includes(window.location.pathname))) {
        // User Role List View 
        const user = {
          'activity_type': userInfo.user.manage_team,
          'status': requestType(window.location.pathname),
          'list_type': 'view-list'
        }
        // Refresh Datatable
        dispatch(listActivityRequestForApprover(user))
      }

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
  
  //
  const requestType = (location) => {
    //
    switch(location) {
      case '/schedule-for-approval':
        return 'For Approval'
      case '/schedule-delegated':
        return 'Delegate'
      default:
        return ''
    }
  }

  return (
    <>
        <Modal  
          size={size} 
          show={show} 
          onHide={onHide}
          backdrop="static"
          keyboard={false}
          autoFocus={false}
          enforceFocus={false}
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
                      disabled={(mode === 'Edit' || (mode === 'Add' && ['RMA','TCC'].includes(userInfo.user_role)))}
                      onChange={(e) => setScheduleType(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    <option value="New-Schedule">New Schedule Request</option>
                    <option value="Training-Schedule">Training Schedule</option>
                    {/* <option value="JO-Request">Job Order Request</option> */}
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
                  scheduleType={scheduleType}
                  userId={userId}
                /> 
              }
              { scheduleType === 'Training-Schedule' && 
                <TrainingSchedule 
                  artid={artid}
                  setTrainingFields={setTrainingFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                  scheduleType={scheduleType}
                />
              }
              {
                scheduleType === 'JO-Request' && 
                <JobOrderRequest 
                  artid={artid}
                  setJoRequestFields={setJoRequestFields}
                  calendarScheduleDetails={calendarScheduleDetails}
                  mode={mode}
                  scheduleType={scheduleType}
                />
              }
            </>
          }

          { (mode === 'Edit' && scheduleType === 'New-Schedule') && <MotherFolder mode={mode} /> }

          { 
            (mode === 'Edit' && status !== 'For Approval') && 
            <ApproverDetails
              mode={mode} 
              status={status}
            />
          }

          {/* {scheduleType &&  */}
          {scheduleType && ['Pre-Sales Approver','Post-Sales Approver','Super-Approver','Training-Approver'].includes(userInfo.user_role) && 
            <EmailParticipants
              mode={mode}
              setEmailParticipantsFields={setEmailParticipantsFields}
            /> 
          }
          
          {/* Sales, RMA, TCC, Project Lead  Button */}
          {['Sales','RMA','TCC','Teamlead','Project Lead'].includes(userInfo.user_role) && 
              <>
                {/* {((mode === 'Add' && scheduleType) || (mode === 'Edit' && status === 'For Approval')) &&  */}
                {((mode === 'Add' && scheduleType !== 'JO-Request') || (mode === 'Edit' && status === 'For Approval')) && 
                  <EmailParticipants 
                    mode={mode}
                    setEmailParticipantsFields={setEmailParticipantsFields}
                  /> 
                }
              </>
          }

          {/* Sales, RMA, TCC, Project Lead  Button */}
          {/* {['Training-Approver'].includes(userInfo.user_role) && 
              <>
                {((mode === 'Add' && scheduleType) || (mode === 'Edit' && status === 'For Approval')) && 
                  <EmailParticipants 
                    mode={mode}
                    setEmailParticipantsFields={setEmailParticipantsFields}
                    
                  /> 
                }
              </>
          } */}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <ButtonGroup aria-label="Buttons" className="flex-wrap">
              {/* <ButtonGroup aria-label="Buttons"> */}
                {calendarDetailsLoading ? <></> : <>
                  {/* Training Approver */}
                  {['Training-Approver','Super-Approver'].includes(userInfo.user_role) && 
                    <>
                      {scheduleType === 'Training-Schedule' && 
                      mode === 'Edit' && 
                      ( ['Approved'].includes(status)) &&
                      userId === userInfo.user.id &&
                        <>
                          <Button size='sm' variant="btn bg-gradient-info" onClick={handleSubmit} >
                              Save Changes
                          </Button>
                        </>
                      }

                      {scheduleType === 'Training-Schedule' && 
                      mode === 'Edit' && 
                      status === 'Approved' &&                     
                        <>
                          <Button size='sm' variant="btn bg-gradient-warning" onClick={handleCancelRequest} >
                            Cancel Schedule
                          </Button>
                        </>
                      }

                      {scheduleType === 'Training-Schedule' && 
                      mode === 'Edit' &&
                      status === 'For Approval' && 
                      <>
                        {/* <Button size='sm' variant="primary" onClick={handleApprovedRequest} >
                          Approve Request
                        </Button>
                        <Button size='sm' variant="danger" onClick={handleRejectRequest} >
                          Reject Request
                        </Button> */}
                          <Button size='sm' variant="btn bg-gradient-primary" onClick={handleApprovedRequest} >
                            <FontAwesomeIcon icon={['fas', 'check']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                            &nbsp;Approve
                          </Button>
                          <Button size='sm' variant="btn bg-gradient-danger" onClick={handleRejectRequest} >
                            <FontAwesomeIcon icon={['fas', 'circle-xmark']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                            &nbsp;Reject
                          </Button>
                      </>
                      }
                    </>
                  }

                  {/* Approver Button */}
                  {['Pre-Sales Approver','Post-Sales Approver','Super-Approver'].includes(userInfo.user_role) && 
                    <>
                      {scheduleType === 'New-Schedule' && 
                      mode === 'Edit' && 
                      status === 'For Approval' && 
                        <>
                          {(
                            (reference_act_type === 'Pre-Sales' && userInfo.user_role === 'Pre-Sales Approver') || 
                            (reference_act_type === 'Post-Sales' && userInfo.user_role === 'Post-Sales Approver') || 
                            (userInfo.user_role === 'Super-Approver')
                          ) && 
                            <>
                            <Button size='sm' variant="btn bg-gradient-info" onClick={handleSubmit} >
                              <FontAwesomeIcon icon={['fas', 'floppy-disk']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                                 &nbsp;Save
                              </Button>
                              <Button size='sm' variant="btn bg-gradient-primary" onClick={handleApprovedRequest} >
                                <FontAwesomeIcon icon={['fas', 'check']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                                &nbsp;Approve
                              </Button>
                              <Button size='sm' variant="btn bg-gradient-danger" onClick={handleRejectRequest} >
                                <FontAwesomeIcon icon={['fas', 'circle-xmark']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                                &nbsp;Reject
                              </Button>

                              {(userInfo.user_role === 'Pre-Sales Approver' || userInfo.user_role === 'Post-Sales Approver') && 
                                <>
                                  <Button size='sm' variant="btn bg-gradient-warning" onClick={handleDelegateRequest} >
                                  <FontAwesomeIcon icon={['fas', 'users']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                                    &nbsp;Delegate
                                  </Button>
                                </>
                              }

                              {userInfo.user_role === 'Super-Approver' && 
                                <>
                                  <Button size='sm' variant="btn bg-gradient-secondary" onClick={handleDelegateSuperApproverRequest} >
                                    Delegate to Approver
                                  </Button>
                                </>
                              }
                            </>
                          }
                          
                        </>
                      }

                      {scheduleType === 'New-Schedule' && 
                      mode === 'Edit' && 
                      ((status === 'DELEGATE_PRESALES_SE_FOR_APPROVAL' && userInfo.user_role === 'Pre-Sales Approver') || 
                      (status === 'DELEGATE_POSTSALES_SE_FOR_APPROVAL' && userInfo.user_role === 'Post-Sales Approver') || 
                      ((status === 'DELEGATE_POSTSALES_SE_FOR_APPROVAL' || status === 'DELEGATE_PRESALES_SE_FOR_APPROVAL') && userInfo.user_role === 'Super-Approver')
                      )  &&
                        <>
                          <Button size='sm' variant="btn bg-gradient-success" onClick={handleDelegatedApprovedRequest} >
                            Approved SE Request
                          </Button>
                        </>
                      }

                      {scheduleType === 'New-Schedule' && 
                      mode === 'Edit' && 
                        ((status === 'DELEGATED_PRESALES_SE_APPROVED' && userInfo.user_role === 'Pre-Sales Approver') ||
                        (status === 'DELEGATED_POSTSALES_SE_APPROVED' && userInfo.user_role === 'Post-Sales Approver') ||
                        ((status === 'DELEGATED_POSTSALES_SE_APPROVED' || status === 'DELEGATED_PRESALES_SE_APPROVED') && userInfo.user_role === 'Super-Approver')
                        ) &&
                          <>
                            <Button size='sm' variant="btn bg-gradient-success" onClick={handleApprovedRequest} >
                              Approved Activity Request
                            </Button>
                          </>
                      }
                      
                      {scheduleType === 'New-Schedule' && 
                      mode === 'Edit' && 
                      status === 'Approved' &&
                      (['Pre-Sales Approver','Post-Sales Approver','Super-Approver'].includes(userInfo.user_role)) && 
                        <>
                          <Button size='sm' variant="btn bg-gradient-warning" onClick={handleCancelRequest} >
                            Cancel Schedule
                          </Button>
                        </>
                      }
                    </>
                  }

                  {/* Sales, RMA, TCC, Project Lead  Button */}

                  {['Sales','RMA','TCC','Teamlead','Project Lead'].includes(userInfo.user_role) && status !== 'Canceled' && 
                    <>
                      {mode !== 'Add' && (userId === userInfo.user.id) &&
                        <>
                          <Button size='sm' variant="btn bg-gradient-warning" onClick={handleCancelRequest} >
                            Cancel Schedule
                          </Button>
                          <Button size='sm' variant="btn bg-gradient-primary" onClick={handleSubmit} >
                              Save Changes
                          </Button>
                        </>
                      }
                    </>
                  }

                  {/* Engineer */}
                  {(['Engineer'].includes(userInfo.user_role)) && 
                    <>
                      {( ! ['For Approval','Completed'].includes(status)) && 
                        <Button size='sm' variant="btn bg-gradient-primary" onClick={() => setShow2(true)} >
                          Update Request
                        </Button>
                      }

                      {/* { ['Completed'].includes(status) && 
                        <Button size='sm' variant="btn bg-gradient-secondary" onClick={handleViewDetails}>
                          View Activity Update
                        </Button>
                      } */}

                      {/* Tuloy mo bukas */}
                      {activity_count > 0 ? 
                        <Button size='sm' variant="btn bg-gradient-secondary" onClick={handleViewInventory} >
                          View Inventory
                        </Button> : 
                        <Button size='sm' variant="btn bg-gradient-info" onClick={handleViewInventory} >
                          Update Inventory
                        </Button>
                      }
                      
                    </> 
                  }

                  { (scheduleType === 'New-Schedule' && ['Completed'].includes(status) && mode !== 'Add') && 
                    <Button size='sm' variant="btn bg-gradient-secondary" onClick={handleViewDetails}>
                      View Activity Update
                    </Button>
                  }           
                  
                  {/* Show Save Change Button */}
                  {mode === 'Add' && 
                    <>
                      <Button size='sm' variant="btn bg-gradient-primary" onClick={handleSubmit} >
                          Save Schedule
                      </Button>
                    </>
                  }
                </> }
                <Button size='sm' variant="btn bg-gradient-secondary" onClick={onHide}>
                  <FontAwesomeIcon icon={['fas', 'xmark']} className="text-light text-lg opacity-10" aria-hidden="true"/>
                  &nbsp;Close
                </Button>
              </ButtonGroup> 
            </Col>
          </Row>

        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditCalendarScheduleModal