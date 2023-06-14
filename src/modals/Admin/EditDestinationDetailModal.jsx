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
    createDestination,
    listDestination,
    updateDestination,
} from '../../actions/Admin/destinationDetailsActions'

const EditDestinationDetailModal = ({ show , mode, onHide, ddid, destinationDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [destination, setDestination] = useState('')
  // Destination Details
  const destinationDetail = useSelector(state => state.destinationDetails)
  const { loading:destinationLoading } = destinationDetail
  
  // Destination Create Success Message
  const destinationCreate = useSelector(state => state.destinationCreate)
  const { success:destinationCreateSuccess, message:destinationCreateMessage } = destinationCreate

  // Destination Update Success Message
  const destinationUpdate = useSelector(state => state.destinationUpdate)
  const { success:destinationUpdateSuccess, message:destinationUpdateMessage } = destinationUpdate

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
          // Update Destination
          dispatch(updateDestination(data))
        }
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(destinationCreateSuccess) {
      Swal.fire(
        'Success!',
        destinationCreateMessage,
        'success'
      )
    }

    // Show Success Update
    if(destinationUpdateSuccess) {
      Swal.fire(
        'Success!',
        destinationUpdateMessage,
        'success'
      )
    }
    // Refresh Datatable
    dispatch(listDestination())
    // Close Modal
    onHide()
  },[destinationCreateSuccess, destinationUpdateSuccess])

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
            { destinationLoading ? <Loader /> : 
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
        <Button variant="btn bg-gradient-secondary" onClick={onHide}>
            Close
        </Button>
        <Button variant="btn bg-gradient-info" onClick={handleSubmit} >
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditDestinationDetailModal