import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
    createOrUpdateInventoryStatus,
} from '../../actions/Sales/motherFolderInventoryAction'
import { inventoryStatus, } from '../../actions/commonAction'
import Loader from '../../components/Loader'
import { INVENTORY_CREATE_UPDATE_RESET } from '../../constants/Sales/motherFolderInventoryConstants'

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
  const motherFolderInventoryCreateUpdate = useSelector(state => state.motherFolderInventoryCreateUpdate)
  const { success:motherFolderInventoryCreateUpdateSuccess, message:motherFolderInventoryCreateUpdateMessage } = motherFolderInventoryCreateUpdate
  // Mother Folder Status Details
  const motherFolderInventoryDetails = useSelector(state => state.motherFolderInventoryDetails)
  const { loading, inventory } = motherFolderInventoryDetails

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
        if(motherFolderInventoryCreateUpdateSuccess) {
          Swal.fire(
            'Success!',
            motherFolderInventoryCreateUpdateMessage,
            'success'
          )
         dispatch({
            type: INVENTORY_CREATE_UPDATE_RESET,
         })
          // Close Modal
          onHide()
        }
    },[motherFolderInventoryCreateUpdateSuccess])
      
  // Show Success 
  useEffect(() => {
    // Get the first object
    if(inventory[0]) {
        // Get Selected Details
        const { 
            status, 
            reasons, 
            po_number, 
            coa_date,
        } = inventory[0]
        // set State value
        setRadioStatus(status || "")
        setReason(reasons || "")
        setPoNumber(po_number || "")
        setCoaDate(coa_date || "")
    }
  },[inventory])

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
           {loading ? <Loader/> : <>
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
           </>
           }
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