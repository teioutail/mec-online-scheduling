import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Modal,
  Form,
} from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  listRoles,
  updateRole,
  createRole,
 } from '../../actions/roleActions'

import { createBusinessUnit } from '../../actions/businessUnitActions'

const EditBusinessUnitModal = ({ show , mode, onHide, buid, businessUnitDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [businessUnit, setBusinessUnit] = useState('')
  // Business Unit Details
  const businessUnitDetail = useSelector(state => state.businessUnitDetails)
  const { loading:businessUnitLoading } = businessUnitDetail
  
  // Role Create Success Message
  const roleCreate = useSelector(state => state.roleCreate)
  const { success:roleCreateSuccess, message:roleCreateMessage } = roleCreate

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
        // Updated Selected Business Unit Data
        const business = {
          id: buid,
          business_unit: businessUnit,
        }
        // 
        if(mode === 'Add') {
          // Create Business Unit 
          dispatch(createBusinessUnit(business))
        } else {
          // Update Business Unit 
          dispatch(updateRole(business))
        }
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(roleCreateSuccess) {
      Swal.fire(
        'Success!',
        roleCreateMessage,
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
    dispatch(listRoles())
    // Close Modal
    onHide()
  },[roleCreateSuccess, roleUpdateSuccess])

  // 
  useEffect(() => {
    // Selected Business Details
    const { business_unit } = businessUnitDetails  
    // setState
    setBusinessUnit(business_unit || "")
  }, [businessUnitDetails, dispatch])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Business Unit' : 'Edit Business Unit'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { businessUnitLoading ? <Loader /> : 
            <>
                <Form.Group className="mb-3">
                    <Form.Label>Business Unit</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='Business Unit'
                    value={businessUnit}
                    onChange={(e) => setBusinessUnit(e.target.value)}
                    />
                </Form.Group>
            </>
            }
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} >
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditBusinessUnitModal