import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
    createOrUpdateInventoryStatus,
} from '../../actions/Sales/motherFolderInventoryAction'
import { inventoryStatus, } from '../../actions/commonAction'

const EditActivityReferenceStatus = ({ show, onHide, scheduleDetails, size, scheduleid }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [radioStatus, setRadioStatus] = useState('')
  const [reason, setReason] = useState('')
  // 
  const [poNumber , setPoNumber] = useState('')
  const [coaDate, setCoaDate] = useState('')

  // Schedule Reference Create Success Message
  const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
  const { success:motherFolderInventoryCreateSuccess, message:motherFolderInventoryCreateMessage } = motherFolderInventoryCreate
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // CommonJS
  const Swal = require('sweetalert2')

  // 
  const handleSubmit = async () =>  {
    // Data
    let info = {
      status: radioStatus,
      ar_id: scheduleid,
      po_number: poNumber,
      coa_date: coaDate,
      reason: reason,
    }
    
    // let data = inventoryStatus(info)
    console.warn(info)

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
        // Save or Update Device
        dispatch(createOrUpdateInventoryStatus(info))
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
                <Col>
                    <Form.Group className="mb-3">  
                    <Form.Check
                        type='radio'
                        value='Win/Close'
                        checked={radioStatus === 'Win/Close'}
                        label='Win/Close'
                        name='status'
                        onChange={(e) => {
                            setRadioStatus(e.target.value)

                        }}
                    />
                    {radioStatus === 'Win/Close' &&  
                        <>
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='PO Number'
                                className='mb-1'
                                value={poNumber}
                                onChange={(e) => {
                                    // 
                                    setPoNumber(e.target.value)
                                }}
                            />
                            <Form.Control
                                size='sm'
                                type='text'
                                placeholder='COA Date'
                                className='mb-1'
                                value={coaDate}
                                onChange={(e) => {
                                    // 
                                    setCoaDate(e.target.value)
                                }}
                            />
                            <Form.Control
                                size='sm'
                                type='text'
                                placeholder='Reason'
                                className='mb-1'
                                value={reason}
                                onChange={(e) => {
                                    // 
                                    setReason(e.target.value)
                                }}
                            />
                        </>
                    }
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Check
                        type='radio'
                        value='Lose/Cancelled'
                        checked={radioStatus === 'Lose/Cancelled'}
                        label='Lose/Cancelled'
                        name='status'
                        onChange={(e) => { 
                            setRadioStatus(e.target.value) 
                        }}
                    /> 
                    {radioStatus === 'Lose/Cancelled' &&  
                        <Form.Control 
                            size='sm'
                            type='text'
                            placeholder='Reason'
                            className='mb-1'
                            value={reason}
                            onChange={(e) => {
                                // 
                                setReason(e.target.value)
                            }}
                        />
                    }
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                    {/* <Form.Label>On Hold</Form.Label>   */}
                    <Form.Check
                        type='radio'
                        value='On Hold'
                        checked={radioStatus === 'On Hold'}
                        label='On Hold'
                        name='status'
                        onChange={(e) => {setRadioStatus(e.target.value)}}
                    /> 
                    {radioStatus === 'On Hold' &&  
                        <Form.Control 
                            size='sm'
                            type='text'
                            placeholder='Reason'
                            className='mb-1'
                            value={reason}
                            onChange={(e) => {
                                // 
                                setReason(e.target.value)
                            }}
                        />
                    }
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

export default EditActivityReferenceStatus