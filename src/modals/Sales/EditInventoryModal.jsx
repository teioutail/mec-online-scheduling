import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col, Table } from 'react-bootstrap' 
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

const EditInventoryModal = ({ show , mode, onHide, scheduleid, scheduleDetails, size }) => {
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
    setActivityType(activity_type || "")
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
        <Modal  size={size} show={show} onHide={onHide}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{ mode === 'Add' ? 'Add Inventory' : 'Edit Inventory'  }</Modal.Title> */}
          <Modal.Title>Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Part No</th>
                    <th>Serial No</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
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

export default EditInventoryModal