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

const RoleAccessModal = ({ show, onHide }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [rolename, setRoleName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

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

      }

    })
  }

    // 
//   useEffect(() => {

    
//     // setState
//     setRoleName(name || "")
//     setDescription(description || "")
//     setStatus(status || "0")
//   }, [roleDetails])

  return (
    <>
        <Modal>
        {/* <Modal show={show} onHide={onHide}> */}
        <Modal.Header closeButton>
        {/* <Modal.Title>{ mode === 'Add' ? 'Add Role' : 'Edit Role'  }</Modal.Title> */}
        <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Role Name'
              value={rolename}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as='select' 
              aria-label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
            {/* <option value="">- Select -</option> */}
            <option value="0">Disable</option>
            <option value="1">Enable</option>
            </Form.Control>
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary">
        {/* <Button variant="secondary" onClick={onHide}> */}
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

export default RoleAccessModal