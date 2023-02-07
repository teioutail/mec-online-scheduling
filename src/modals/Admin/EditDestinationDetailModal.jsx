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
    createDecision,
    listDecision,
    updateDecision,
} from '../../actions/Admin/decisionActions'

import { 
    createDestination,
} from '../../actions/Admin/destinationDetailsActions'

const EditDestinationDetailModal = ({ show , mode, onHide, ddid, destinationDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [destination, setDestination] = useState('')
  // Decision Details
  const decisionDetail = useSelector(state => state.decisionDetails)
  const { loading:decisionLoading } = decisionDetail
  
  // Decision Create Success Message
  const decisionCreate = useSelector(state => state.decisionCreate)
  const { success:decisionCreateSuccess, message:decisionCreateMessage } = decisionCreate

  // Decision Update Success Message
  const decisionUpdate = useSelector(state => state.decisionUpdate)
  const { success:decisionUpdateSuccess, message:decisionUpdateMessage } = decisionUpdate

  // CommonJS
  const Swal = require('sweetalert2')

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
        // Updated Selected Destination Data
        const data = {
          id: ddid,
          destination:destination,
        }
        // 
        if(mode === 'Add') {
          // Create Destination
          dispatch(createDestination(data))
        } else {
          // Update Decision
          dispatch(updateDecision(data))
        }
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(decisionCreateSuccess) {
      Swal.fire(
        'Success!',
        decisionCreateMessage,
        'success'
      )
    }

    // Show Success Update
    if(decisionUpdateSuccess) {
      Swal.fire(
        'Success!',
        decisionUpdateMessage,
        'success'
      )
    }
    // Refresh Datatable
    dispatch(listDecision())
    // Close Modal
    onHide()
  },[decisionCreateSuccess, decisionUpdateSuccess])

  // 
  useEffect(() => {
        // Selected Destination Details
        const { destination } = destinationDetails  
        // setState
        setDestination(destination || "")
  }, [destinationDetails, dispatch])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Destination' : 'Edit Destination'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { decisionLoading ? <Loader /> : 
              <>
                <Form.Group className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control 
                      type='text'
                      placeholder='Destination'
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
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

export default EditDestinationDetailModal