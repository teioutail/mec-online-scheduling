import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import { 
  createMotherFolderInventory,
} from '../../actions/Sales/motherFolderInventoryAction'
import { INVENTORY_CREATE_RESET } from '../../constants/Sales/motherFolderInventoryConstants'

const EditInventoryModal = ({ show, onHide, scheduleDetails, size, scheduleid }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [brand, setBrand] = useState('')
  const [partNo, setPartNo] = useState('')
  const [serialNo, setSerialNo] = useState('')

  // Schedule Reference Create Success Message
  const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
  const { success:motherFolderInventoryCreateSuccess, message:motherFolderInventoryCreateMessage } = motherFolderInventoryCreate
  // CommonJS
  const Swal = require('sweetalert2')
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
    if(motherFolderInventoryCreateSuccess) {
      // 
      Swal.fire(
        'Success!',
        motherFolderInventoryCreateMessage,
        'success'
      )
      // Close Modal
      onHide()
      // Clear Fields
      setBrand('')
      setPartNo('')
      setSerialNo('')
      // // 
      dispatch({
        type: INVENTORY_CREATE_RESET,
      })
    }

  },[motherFolderInventoryCreateSuccess])

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
          <Modal.Title>Add Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col sm={12} md={6} lg={4}>
              <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>  
              <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='Brand'
                  value={brand}
                  onChange={(e) => {
                    // 
                    setBrand(e.target.value)
                  }}
              />
              </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={4}>
              <Form.Group className="mb-3">
              <Form.Label>Part No.</Form.Label>  
              <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='Part No.'
                  value={partNo}
                  onChange={(e) => {
                    //
                    setPartNo(e.target.value)
                  }}
              />
              </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={4}>
              <Form.Group className="mb-3">
              <Form.Label>Serial No.</Form.Label>  
              <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='Serial No.'
                  value={serialNo}
                  onChange={(e) => {
                    //
                    setSerialNo(e.target.value)
                  }}
              />
              </Form.Group>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant="btn bg-gradient-secondary" onClick={onHide}>
              Close
          </Button>
          <Button size='sm' variant="btn bg-gradient-info" onClick={handleSubmit} >
              Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditInventoryModal