import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  listScheduleReference,
  createScheduleReference,
  updateScheduleReference,
} from '../../actions/Sales/salesScheduleReferenceAction'
import EditEmailBusinessUnit from '../../components/Sales/EditEmailBusinessUnit'
import PostSalesInput from '../../components/Sales/PostSalesInput'

import TrainingSchedule from '../../components/Sales/TrainingSchedule'
import NewScheduleRequest from '../../components/Sales/NewScheduleRequest'
import CloseButton from 'react-bootstrap/CloseButton';

const EditCalendarScheduleModal = ({ show , mode, onHide, scheduleid, scheduleDetails, size, emails }) => {
  // PostSalesInput Component Reference
  const postSalesInputRef = useRef()
  // EditEmailBusinessUnit Component Reference
  const EditEmailBusinessUnitRef = useRef()
  // Redux
  const dispatch = useDispatch()
  // setState
  const [scheduleType, setScheduleType] = useState('')

  const [projectName, setProjectName] = useState('')
  const [projectedAmount, setProjectedAmount] = useState('')
  const [partnerCompanyName, setPartnerCompanyName] = useState('')
  const [endUserCompanyName, setEndUserCompanyName] = useState('')
  const [partnerSiteAddress, setPartnerSiteAddress] = useState('')
  const [endUserSiteAddress, setEndUserSiteAddress] = useState('')
  const [partnerContactPerson, setPartnerContactPerson] = useState('')
  const [endUserContactPerson, setEndUserContactPerson] = useState('')
  const [partnerContactNumber, setPartnerContactNumber] = useState('')
  const [endUserContactNumber, setEndUserContactNumber] = useState('')
  const [emailParticipants, setEmailParticipants] = useState([])

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
  // 
  const handleSubmit = async () =>  {
    // Data
    // let schedule = {
    //   id: scheduleid,
    //   activity_type: activityType,
    //   project_name: projectName,
    //   projected_amount: projectedAmount,
    //   partner_company_name: partnerCompanyName,
    //   enduser_company_name: endUserCompanyName,
    //   partner_site_address: partnerSiteAddress,
    //   enduser_site_address: endUserSiteAddress,
    //   partner_contact_person: partnerContactPerson,
    //   enduser_contact_person: endUserContactPerson,
    //   partner_contact_number: partnerContactNumber,
    //   enduser_contact_number: endUserContactNumber,
    //   user_id: userInfo.user.id,
    //   email_participants: (EditEmailBusinessUnitRef.current === undefined ? '' : EditEmailBusinessUnitRef.current.emailParticipants),
    //   business_unit: (EditEmailBusinessUnitRef.current === undefined ? '' : EditEmailBusinessUnitRef.current.businessUnit),
    // }
    // 
    // if(activityType === "Post-Sales") {
    //   // Post-Sales 
    //   schedule.project_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.projectNo);
    //   schedule.case_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.caseNo);
    //   schedule.sa_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.saNo);
    //   schedule.netsuite_link = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.netsuitLink);
    // } else {
    //   // Clear Fields if Pre-Sales
    //   schedule.project_no = '';
    //   schedule.case_no = '';
    //   schedule.sa_no = '';
    //   schedule.netsuite_link = '';
    // }
 
    // console.warn(schedule)
    
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
        if(mode === 'Add') {
          // Create Schedule 
        //   dispatch(createScheduleReference(schedule))
        } else {
          // Update Schedule
        //   dispatch(updateScheduleReference(schedule))
        }
      }
    })
  }

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
      dispatch(listScheduleReference())
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
      dispatch(listScheduleReference())
      // Close Modal
      onHide()
    }

  },[scheduleReferenceCreateMessage, scheduleReferenceUpdateSuccess])

  // 
  useEffect(() => {
    // Selected Schedule Details
    const {  
      activity_type,
      project_name,
      projected_amount,
      partner_company_name,
      enduser_company_name,
      partner_site_address,
      enduser_site_address,
      partner_contact_person,
      enduser_contact_person,
      partner_contact_number,
      enduser_contact_number
    } = scheduleDetails

    // setState
    setScheduleType(activity_type || "")
    setProjectName(project_name || "")
    setProjectedAmount(projected_amount || "")
    setPartnerCompanyName(partner_company_name || "")
    setEndUserCompanyName(enduser_company_name || "")
    setPartnerSiteAddress(partner_site_address || "")
    setEndUserSiteAddress(enduser_site_address || "")
    setPartnerContactPerson(partner_contact_person || "")
    setEndUserContactPerson(enduser_contact_person || "")
    setPartnerContactNumber(partner_contact_number || "")
    setEndUserContactNumber(enduser_contact_number || "")

  }, [scheduleDetails, dispatch])

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
            <Modal.Title>{ mode === 'Add' ? 'Calendar Schedule' : 'Edit Calendar Schedule'  }</Modal.Title>
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
            {/* <EditEmailBusinessUnit 
              ref={EditEmailBusinessUnitRef}
              scheduleDetails={scheduleDetails}
            /> */
            }
            { scheduleType === 'New-Schedule' && 
              <NewScheduleRequest 
                ref={postSalesInputRef}
                scheduleDetails={scheduleDetails}
              /> 
            }
            { scheduleType === 'Training-Schedule' && 
              <TrainingSchedule 
                ref={postSalesInputRef}
                scheduleDetails={scheduleDetails}
              /> 
            }
          </>}
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