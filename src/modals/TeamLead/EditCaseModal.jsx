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
import PostSalesInput
 from '../../components/Sales/PostSalesInput'
import EditBusinessUnitOption from '../../components/Sales/EditBusinessUnitOption'

const EditCaseModal = ({ show , mode, onHide, scheduleid, scheduleDetails, size, emails }) => {
  // PostSalesInput Component Reference
  const postSalesInputRef = useRef()
  // EditEmailBusinessUnit Component Reference
  const EditEmailBusinessUnitRef = useRef()
  // Redux
  const dispatch = useDispatch()
  // setState
  const [activityType, setActivityType] = useState('')
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
    let schedule = {
      id: scheduleid,
      activity_type: activityType,
      project_name: projectName,
      projected_amount: projectedAmount,
      partner_company_name: partnerCompanyName,
      enduser_company_name: endUserCompanyName,
      partner_site_address: partnerSiteAddress,
      enduser_site_address: endUserSiteAddress,
      partner_contact_person: partnerContactPerson,
      enduser_contact_person: endUserContactPerson,
      partner_contact_number: partnerContactNumber,
      enduser_contact_number: endUserContactNumber,
      user_id: userInfo.user.id,
      email_participants: (EditEmailBusinessUnitRef.current === undefined ? '' : EditEmailBusinessUnitRef.current.emailParticipants),
      business_unit: (EditEmailBusinessUnitRef.current === undefined ? '' : EditEmailBusinessUnitRef.current.businessUnit),
    }

    // 
    if(activityType === "Post-Sales") {
      // Post-Sales 
      schedule.project_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.projectNo);
      schedule.case_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.caseNo);
      schedule.sa_no = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.saNo);
      schedule.netsuite_link = (postSalesInputRef.current === undefined ? '' : postSalesInputRef.current.netsuitLink);
    } else {
      // Clear Fields if Pre-Sales
      schedule.project_no = '';
      schedule.case_no = '';
      schedule.sa_no = '';
      schedule.netsuite_link = '';
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
        if(mode === 'Add') {
          // Create Schedule 
          dispatch(createScheduleReference(schedule))
        } else {
          // Update Schedule
          dispatch(updateScheduleReference(schedule))
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
    // const {  
    //   activity_type,
    //   project_name,
    //   projected_amount,
    //   partner_company_name,
    //   enduser_company_name,
    //   partner_site_address,
    //   enduser_site_address,
    //   partner_contact_person,
    //   enduser_contact_person,
    //   partner_contact_number,
    //   enduser_contact_number
    // } = scheduleDetails
    // setState
    // setActivityType(activity_type || "")
    // setProjectName(project_name || "")
    // setProjectedAmount(projected_amount || "")
    // setPartnerCompanyName(partner_company_name || "")
    // setEndUserCompanyName(enduser_company_name || "")
    // setPartnerSiteAddress(partner_site_address || "")
    // setEndUserSiteAddress(enduser_site_address || "")
    // setPartnerContactPerson(partner_contact_person || "")
    // setEndUserContactPerson(enduser_contact_person || "")
    // setPartnerContactNumber(partner_contact_number || "")
    // setEndUserContactNumber(enduser_contact_number || "")
  }, [scheduleDetails, dispatch])

  return (
    <>
        <Modal  
            size="lg"
            show={show} 
            onHide={onHide}
        >
        <Modal.Header closeButton>
            <Modal.Title>{ mode === 'Add' ? 'Add Case' : 'Edit Case'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { scheduleReferenceLoading ? <Loader /> : 
          <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Reference Id</Form.Label>
                    <Form.Control
                        as='select' 
                        size='sm'
                        aria-label="Reference Id"
                        // value={referenceId}
                        // onChange={(e) => {
                        //     handleReferenceIdOption(e)
                        //     setJoRequestFields(fields)
                        // }}
                    >
                    <option value="">- Select -</option>
                    {/* { referenceIdOptions } */}
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Project No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Project No.'
                    // value={projectNo}
                    // onChange={(e) => {
                    //     changeValueHandler('project_no', e.target.value)
                    //     setProjectNo(e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Email Subject</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Email Subject'
                    // value={emailSubject}
                    // onChange={(e) => {
                    //     changeValueHandler('email_subject', e.target.value)
                    //     setEmailSubject(e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>MA No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='MA No.'
                    // value={netsuiteLink}
                    // onChange={(e) => {
                    //     changeValueHandler('netsuite_link', e.target.value)
                    //     // setNetsuitLink(e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Netsuite Link</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Netsuite Link'
                    // value={netsuiteLink}
                    // onChange={(e) => {
                    //     changeValueHandler('netsuite_link', e.target.value)
                    //     setNetsuiteLink(e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
              <h6>Device Information</h6>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
            <Form.Group className="mb-3">
                <Form.Label>Serial No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Serial No.'
                    // value={netsuiteLink}
                    // onChange={(e) => {
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Part No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Part No.'
                    // value={netsuiteLink}
                    // onChange={(e) => {
                    //     changeValueHandler('netsuite_link', e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Warranty</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Reference Id"
                            // value={referenceId}
                            // onChange={(e) => {
                            //     handleReferenceIdOption(e)
                            //     setJoRequestFields(fields)
                            // }}
                        >
                        <option value="">- Select -</option>
                        <option value="Void Warranty">Void Warranty</option>
                        <option value="Out Warranty">Out Warranty</option>
                        <option value="In Warranty">In Warranty</option>
                        <option value="Not Purchased from MEC">Not Purchased from MEC</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Business Unit</Form.Label>
                    <EditBusinessUnitOption 
                        // changeValueHandler={changeValueHandler}
                        mode={mode}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Request</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Request"
                            // value={referenceId}
                            // onChange={(e) => {
                            //     handleReferenceIdOption(e)
                            //     setJoRequestFields(fields)
                            // }}
                        >
                        <option value="">- Select -</option>
                        <option value="Void Warranty">Void Warranty</option>
                        <option value="Out Warranty">Out Warranty</option>
                        <option value="In Warranty">In Warranty</option>
                        <option value="Not Purchased from MEC">Not Purchased from MEC</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Priority"
                            // value={referenceId}
                            // onChange={(e) => {
                            //     handleReferenceIdOption(e)
                            //     setJoRequestFields(fields)
                            // }}
                        >
                        <option value="">- Select -</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Reported Problem</Form.Label>
                <Form.Control 
                    size="sm"
                    as="textarea" 
                    rows={2} 
                    // value={purposeOfActivity}
                    // onChange={(e) => {
                    //     changeValueHandler('purpose_of_activity', e.target.value)
                    //     setPurposeOfActivity(e.target.value)
                    //     setJoRequestFields(fields)
                    // }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                        size="sm"
                        as="textarea" 
                        rows={2}
                        // value={remarks}
                        // onChange={(e) => {
                        //     changeValueHandler('remarks', e.target.value)
                        //     setRemarks(e.target.value)
                        //     setJoRequestFields(fields)
                        // }}
                    />
                </Form.Group>
            </Col>
        </Row>

            {/* <EditEmailBusinessUnit 
              ref={EditEmailBusinessUnitRef}  
              scheduleDetails={scheduleDetails}
            /> */}
            
            {/* { activityType === 'Post-Sales' && 
              <PostSalesInput 
                ref={postSalesInputRef}
                scheduleDetails={scheduleDetails}
              /> 
            } */}
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

export default EditCaseModal