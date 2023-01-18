import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  listRoles,
  updateRole,
  createRole,
 } from '../../actions/roleActions'
import { 
  listScheduleReference,
  createScheduleReference,
} from '../../actions/Sales/salesScheduleReferenceAction'



const EditScheduleModal = ({ show , mode, onHide, scheduleid, roleDetails, size }) => {
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
  const [businessUnit, setBusinessUnit] = useState([])
  const [participants, setParticipants] = useState([])

  // Schedule Reference Create Success Message
  const scheduleReferenceCreate = useSelector(state => state.scheduleReferenceCreate)
  const { success:scheduleReferenceCreateSuccess, message:scheduleReferenceCreateMessage } = scheduleReferenceCreate

  // Role Update Success Message
  const roleUpdate = useSelector(state => state.roleUpdate)
  const { success:roleUpdateSuccess, message:roleUpdateMessage } = roleUpdate

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
        // Data 
        const schedule = {
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
          business_unit: businessUnit,
          participants: participants,
        }
        // 
        if(mode === 'Add') {
          // Create Schedule Reference 
          dispatch(createScheduleReference(schedule))
        } else {
          // Update Role
          //   dispatch(updateRole(role))
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
    }
    // Show Success Update
    if(roleUpdateSuccess) {
      Swal.fire(
        'Success!',
        roleUpdateMessage,
        'success'
      )
    }
    // Refresh Datatable
    dispatch(listScheduleReference())
    // Close Modal
    onHide()
  },[scheduleReferenceCreateMessage, roleUpdateSuccess])

  // 
  useEffect(() => {
    // Selected User Details
    const {  
      name,
      description,
      status
    } = roleDetails
    
    // setState
    // setRoleName(name || "")
    // setDescription(description || "")
    // setStatus(status || "0")
  }, [roleDetails, dispatch])

  return (
    <>
        <Modal  size={size} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{ mode === 'Add' ? 'Add Reference Schedule' : 'Edit Reference Schedule'  }</Modal.Title>
            </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Select Activity</Form.Label>
                    <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    <option value="0">Post-Sales Activity</option>
                    <option value="1">Pre-Sales Activity</option>
                    </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>

                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Project Name'
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Projected Amount</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Projected Amount'
                        value={projectedAmount}
                        onChange={(e) => setProjectedAmount(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Partner Company Name</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Partner Company Name'
                        value={partnerCompanyName}
                        onChange={(e) => setPartnerCompanyName(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>End-User Company Name</Form.Label>
                    <Form.Control
                        size='sm'
                        type='text'
                        placeholder='End-User Company Name'
                        value={endUserCompanyName}
                        onChange={(e) => setEndUserCompanyName(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Partner Site Address</Form.Label>
                    <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Partner Site Address'
                        value={partnerSiteAddress}
                        onChange={(e) => setPartnerSiteAddress(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>End-User Site Address</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='End-User Site Address'
                        value={endUserSiteAddress}
                        onChange={(e) => setEndUserSiteAddress(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Partner Contact Person</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Partner Contact Person'
                        value={partnerContactPerson}
                        onChange={(e) => setPartnerContactPerson(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>End-User Contact Person</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='End-User Contact Person'
                        value={endUserContactPerson}
                        onChange={(e) => setEndUserContactPerson(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Partner Contact No.</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Partner Contact No.'
                        value={partnerContactNumber}
                        onChange={(e) => setPartnerContactNumber(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>End-User Contact No.</Form.Label>
                    <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Role Name'
                        value={endUserContactNumber}
                        onChange={(e) => setEndUserContactNumber(e.target.value)}
                    />
                    </Form.Group>
                </Col>
            </Row>
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

export default EditScheduleModal