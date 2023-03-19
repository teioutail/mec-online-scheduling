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
import { getScheduleReferenceDetails } from '../../actions/Sales/salesScheduleReferenceAction'
import { ACTIVITY_FOR_APPROVER_UPDATE_RESET } from '../../constants/Approver/approverActivityRequestConstants'
import ApproverDetails from '../../components/Approver/ApproverDetails'
import EmailParticipants from '../../components/Approver/EmailParticipants'
import MotherFolder from '../../components/Sales/MotherFolder'
import 'react-toastify/dist/ReactToastify.css';

// import CloseButton from 'react-bootstrap/CloseButton';
const EditCalendarScheduleModal = (props) => {
  //
  const { 
    show, mode, onHide, 
    artid, calendarScheduleDetails, size,
    notify, 
  } = props

  // Redux
  const dispatch = useDispatch()
  // setState
  const [scheduleType, setScheduleType] = useState('')
  const [status, setStatus] = useState('')
  const [userId, setUserId] = useState('')
  // sweet alert 2
  
  // Training Fields
  const [trainingFields , setTrainingFields] = useState({})
  // New Schedule Fields
  const [newScheduleFields, setNewScheduleFields] = useState({})
  // Email Participants
  const [emailParticipantsFields, setEmailParticipantsFields] = useState({})

  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { loading:calendarDetailsLoading, calendar } = calendarScheduleDetailsInfo
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
  const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
  const { schedule: { activity_type } } = scheduleReferenceDetails
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
     // 
     Swal.fire({
       title: 'Cancelation Remarks',
       input: 'text',
       inputAttributes: {
         autocapitalize: 'off'
       },
       showCancelButton: true,
       confirmButtonText: 'Save',
       showLoaderOnConfirm: true,
       preConfirm: (res) => {
         // 
         if(scheduleType === 'New-Schedule')
           data = {...newScheduleFields, schedule_type: scheduleType, reasons: res, status: 'Canceled', user_id: userInfo.user.id}
         else if (scheduleType === 'Training-Schedule')
           data = {...trainingFields, schedule_type: scheduleType, reasons: res, status: 'Canceled', user_id: userInfo.user.id}
        // 
        if(mode === 'Add') {
          // Create Calendar Schedule 
          // dispatch(createCalendarSchedule(data))
        } else {
          // Update Schedule
          dispatch(approverActivityRequest(data))
        }
       },
     }).then((result) => {
       // 
       if (result.isConfirmed) {
         // 
         if(mode === 'Add') {
           // Create Calendar Schedule 
           // dispatch(createCalendarSchedule(data))
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
    const status = ( user_role === 'Pre-Sales Approver' ?'DELEGATED_POSTSALES_SE_APPROVED':'DELEGATED_PRESALES_SE_APPROVED')
    // 
    Swal.fire({
      title: user_role === 'Pre-Sales Approver' ? 'Pre-Sales Manager Remarks' : 
      (user_role === 'Post-Sales Approver' ? 'Post-Sales Manager Remarks' : 'Manager Remarks'),
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (res) => {
        // 
        if(scheduleType === 'New-Schedule')
          
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
          data = {...trainingFields, 
            schedule_type: scheduleType, 
            reasons: emailParticipantsFields.additional_remarks, 
            recipients: emailParticipantsFields.email,
            status: status, 
            email: email_addresses,
            user_id: userInfo.user.id,
            requested_by: userId
          }
      },
    }).then((result) => {
      // 
      if (result.isConfirmed) {
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
      
      if (status) {
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

  /**
   * - 
   */

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

    // View Only on edit mode
    if(mode === 'Edit') {
      dispatch(getScheduleReferenceDetails(ar_id))
    }
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
      // User Role List View 
      const user = {
        'activity_type': userInfo.user.manage_team,
        'status': 'For Approval',
        'list_type': 'view-list'
      }
      // Refresh Datatable
      dispatch(listActivityRequestForApprover(user))
      // Refresh Datatable
      dispatch(listCalendarSchedule())

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

          { 
            (mode === 'Edit' && status != 'For Approval') && 
            <ApproverDetails
              mode={mode} 
              status={status}
            />
          }

          {mode === 'Edit' && 
          (status === 'For Approval' && ['Pre-Sales Approver','Post-Sales Approver','Super-Approver'].includes(userInfo.user_role)) && 
            <>
              {(
                (activity_type === 'Pre-Sales' && userInfo.user_role === 'Pre-Sales Approver') || 
                (activity_type === 'Post-Sales' && userInfo.user_role === 'Post-Sales Approver') || 
                (userInfo.user_role === 'Super-Approver')
                ) &&
                <EmailParticipants 
                  mode={mode}
                  setEmailParticipantsFields={setEmailParticipantsFields}
                /> 
              }
            </>
          }

        </Modal.Body>
        <Modal.Footer>
            <Button size='sm' variant="secondary" onClick={onHide}>
                Close
            </Button>
            {/* Approver Button */}
            {['Pre-Sales Approver','Post-Sales Approver','Super-Approver'].includes(userInfo.user_role) && 
              <>
                {mode === 'Edit' && status === 'For Approval' && 
                  <>
                    {(
                      (activity_type === 'Pre-Sales' && userInfo.user_role === 'Pre-Sales Approver') || 
                      (activity_type === 'Post-Sales' && userInfo.user_role === 'Post-Sales Approver') || 
                      (userInfo.user_role === 'Super-Approver')
                     ) && 
                      <>
                        <Button size='sm' variant="primary" onClick={handleApprovedRequest} >
                          Approve Request
                        </Button>
                        <Button size='sm' variant="danger" onClick={handleRejectRequest} >
                          Reject Request
                        </Button>

                        {(userInfo.user_role === 'Pre-Sales Approver' || userInfo.user_role === 'Post-Sales Approver') && 
                          <>
                            <Button className="test" size='sm' variant="secondary" onClick={handleDelegateRequest} >
                              Delegate Request
                            </Button>
                          </>
                        }

                        {userInfo.user_role === 'Super-Approver' && 
                          <>
                            <Button className="test" size='sm' variant="secondary" onClick={handleDelegateSuperApproverRequest} >
                              Delegate to Approver
                            </Button>
                          </>
                        }
                      </>
                    }
                    
                  </>
                }

                {mode === 'Edit' && 
                ((status === 'DELEGATE_PRESALES_SE_FOR_APPROVAL' && userInfo.user_role === 'Pre-Sales Approver') || 
                 (status === 'DELEGATE_POSTSALES_SE_FOR_APPROVAL' && userInfo.user_role === 'Post-Sales Approver') || 
                 ((status === 'DELEGATE_POSTSALES_SE_FOR_APPROVAL' || status === 'DELEGATE_PRESALES_SE_FOR_APPROVAL') && userInfo.user_role === 'Super-Approver')
                 )  &&
                  <>
                    <Button size='sm' variant="success" onClick={handleDelegatedApprovedRequest} >
                      Approved SE Request
                    </Button>
                  </>
                }

                {mode === 'Edit' && 
                  ((status === 'DELEGATED_PRESALES_SE_APPROVED' && userInfo.user_role === 'Pre-Sales Approver') ||
                   (status === 'DELEGATED_POSTSALES_SE_APPROVED' && userInfo.user_role === 'Post-Sales Approver') ||
                   ((status === 'DELEGATED_POSTSALES_SE_APPROVED' || status === 'DELEGATED_PRESALES_SE_APPROVED') && userInfo.user_role === 'Super-Approver')
                  ) &&
                    <>
                      <Button size='sm' variant="success" onClick={handleApprovedRequest} >
                        Approved Activity Request
                      </Button>
                    </>
                }
                
                {mode === 'Edit' && 
                 status === 'Approved' &&
                //  activity_type === 'Pre-Sales' &&  
                 (userInfo.user_role === 'Post-Sales Approver' || userInfo.user_role === 'Pre-Sales Approver' || userInfo.user_role === 'Super-Approver') && 
                  <>
                    <Button size='sm' variant="warning" onClick={handleCancelRequest} >
                      Cancel Schedule
                    </Button>
                  </>
                }
              </>
            }

            {/* Sales Button */}
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