import React, { useState, useEffect } from 'react'
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
import { 
  createMotherFolderInventory,
} from '../../actions/Sales/motherFolderInventoryAction'
import { INVENTORY_CREATE_RESET } from '../../constants/Sales/motherFolderInventoryConstants'

const EditActivityReferenceStatus = ({ show, onHide, scheduleDetails, size, scheduleid }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [brand, setBrand] = useState('')
  const [partNo, setPartNo] = useState('')
  const [serialNo, setSerialNo] = useState('')

  // Schedule Reference Create Success Message
  const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
  const { success:motherFolderInventoryCreateSuccess, message:motherFolderInventoryCreateMessage } = motherFolderInventoryCreate

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
    let data = {
      brand: brand,
      part_number: partNo,
      serial_number: serialNo,
      ar_id: scheduleid,
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
      // Show confirm
      if (result.isConfirmed) {
        // Save New Device
        dispatch(createMotherFolderInventory(data))
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    
    // if(motherFolderInventoryCreate) {
    //   // 
    //   Swal.fire(
    //     'Success!',
    //     motherFolderInventoryCreateMessage,
    //     'success'
    //   )
    //   // Refresh Datatable
    //   dispatch(listScheduleReference())
    //   // Close Modal
    //   onHide()
    //   // Clear Fields
    //   setBrand('')
    //   setPartNo('')
    //   setSerialNo('')
    //   // 
    //   dispatch({
    //     type: INVENTORY_CREATE_RESET,
    //   })
    // }

  },[motherFolderInventoryCreate])

  return (
    <>
        <Modal  
          size={size} 
          show={show} 
          onHide={onHide}
          centered
        >
        <Modal.Header closeButton>
          {/* <Modal.Title>{ mode === 'Add' ? 'Add Inventory' : 'Edit Inventory'  }</Modal.Title> */}
          <Modal.Title>Activity Reference Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col sm={12} md={6} lg={6}>
              <Form.Group className="mb-3">
              <Form.Label>Win/Close</Form.Label>  
              <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='PO Number'
                  value={brand}
                  onChange={(e) => {
                    // 
                    setBrand(e.target.value)
                  }}
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

export default EditActivityReferenceStatus