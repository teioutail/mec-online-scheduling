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

const EditActivityRelatedToModal = ({ show , mode, onHide, attrid, activityRelatedToDetails }) => {
  // Redux
  const dispatch = useDispatch()

  // setState
  const [activityName, setActivityName] = useState('')
  const [relatedTeam, setRelatedTeam] = useState('')

  // Activity Related To Details
  const activityRelatedToDetail = useSelector(state => state.activityRelatedToDetails)
  const { loading:activityRelatedToDetailsLoading } = activityRelatedToDetail
  
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
        // Updated Selected Activity Related To
        const data = {
          id: attrid,
          activity: activityName,
          related_team: relatedTeam,
        }
        // 
        if(mode === 'Add') {
          // Create Activity Related To 
          dispatch(createBusinessUnit(data))
        } else {
          // Update Activity Related To 
          dispatch(updateBusinessUnit(data))
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
    // Selected Activity Related To Details
    const { activity, related_team } = activityRelatedToDetails  
    // setState
    setActivityName(activity || "")
    setRelatedTeam(related_team || "")
  }, [activityRelatedToDetails, dispatch])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Activity Related To' : 'Edit Activity Related To'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { activityRelatedToDetailsLoading ? <Loader /> : 
              <>
                <Form.Group className="mb-3">
                    <Form.Label>Activity</Form.Label>
                    <Form.Control 
                      type='text'
                      placeholder='Activity'
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Related Team</Form.Label>
                    <Form.Control
                        as='select' 
                        aria-label="Related Team"
                        value={relatedTeam}
                        onChange={(e) => setRelatedTeam(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    <option value="Pre-Sales">Pre-Sales</option>
                    <option value="Post-Sales">Post-Sales</option>
                    <option value="Cebu">Cebu</option>
                    <option value="Others">Others</option>
                    </Form.Control>
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

export default EditActivityRelatedToModal