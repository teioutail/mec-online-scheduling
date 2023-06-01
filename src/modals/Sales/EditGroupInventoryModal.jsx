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

import { 
    createMotherFolderBulkInventory,
} from '../../actions/Sales/motherFolderInventoryAction'

import { 
  INVENTORY_CREATE_BULK_RESET,
} from '../../constants/Sales/motherFolderInventoryConstants'

const EditGroupInventoryModal = (props) => {
  
  const { show, 
    onHide,
    size, 
    scheduleid 
  } = props

  // Redux
  const dispatch = useDispatch()
  // setState
  const [selectedFile, setSelectedFile] = useState()
//   const [isFilePicked, setIsFilePicked] = useState(false)

  // Schedule Reference Details
  const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
  const { loading:scheduleReferenceLoading } = scheduleReferenceDetails

  // Schedule Reference Create Success Message
  const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
  const { success:motherFolderInventoryCreateSuccess, message:motherFolderInventoryCreateMessage } = motherFolderInventoryCreate

  // Schedule Reference Update Success Message
  const scheduleReferenceUpdate = useSelector(state => state.scheduleReferenceUpdate)
  const { success:scheduleReferenceUpdateSuccess, message:scheduleReferenceUpdateMessage } = scheduleReferenceUpdate
  
  // Inventory Bulk Upload
  const motherFolderInventoryBulkCreate = useSelector(state => state.motherFolderInventoryBulkCreate)
  const { success:motherFolderInventoryBulkCreateSuccess, message:motherFolderInventoryBulkCreateMessage} = motherFolderInventoryBulkCreate
  
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
  const changeHandler = (e) => {
    // 
    setSelectedFile(e.target.files[0])
    // setIsSelected(true)
  }

  // 
  const handleSubmit = async () =>  {
    // Save Change Here...
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert thiss!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      // Show confirm
      if (result.isConfirmed) {
        // Save New Device
        dispatch(createMotherFolderBulkInventory(selectedFile, scheduleid))
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(motherFolderInventoryBulkCreateSuccess) {
      // 
      Swal.fire(
        'Success!',
        motherFolderInventoryBulkCreateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listScheduleReference())
      // Close Modal
      onHide()
      // 
      dispatch({
        type: INVENTORY_CREATE_BULK_RESET,
      })
    }

  },[motherFolderInventoryBulkCreateSuccess])

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
          <Modal.Title>Group Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload Inventory</Form.Label>
                    <Form.Control 
                        type="file" 
                        size="lg" 
                        onChange={changeHandler}
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
              UPLOAD INVENTORY
          </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditGroupInventoryModal