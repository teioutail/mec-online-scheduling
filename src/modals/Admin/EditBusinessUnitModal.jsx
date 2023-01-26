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
  createBusinessUnit,
  listBusinessUnit,
  updateBusinessUnit,
} from '../../actions/businessUnitActions'

const EditBusinessUnitModal = ({ show , mode, onHide, buid, businessUnitDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [businessUnit, setBusinessUnit] = useState('')
  // Business Unit Details
  const businessUnitDetail = useSelector(state => state.businessUnitDetails)
  const { loading:businessUnitLoading } = businessUnitDetail
  
  // Busines Unit Create Success Message
  const businessUnitCreate = useSelector(state => state.businessUnitCreate)
  const { success:businessUnitCreateSuccess, message:businessUnitCreateMessage } = businessUnitCreate

  // Business Unit Update Success Message
  const businessUnitUpdate = useSelector(state => state.businessUnitUpdate)
  const { success:businessUnitUpdateSuccess, message:businessUnitUpdateMessage } = businessUnitUpdate

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
          dispatch(updateBusinessUnit(business))
        }
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(businessUnitCreateSuccess) {
      Swal.fire(
        'Success!',
        businessUnitCreateMessage,
        'success'
      )
    }
    // Show Success Update
    if(businessUnitUpdateSuccess) {
      Swal.fire(
        'Success!',
        businessUnitUpdateMessage,
        'success'
      )
    }
    // Refresh Datatable
    dispatch(listBusinessUnit())
    // Close Modal
    onHide()
  },[businessUnitCreateSuccess, businessUnitUpdateSuccess])

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