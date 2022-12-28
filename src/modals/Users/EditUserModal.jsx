import React from 'react'
import { useState, useEffect } from 'react'
import { 
  Button, 
  Modal,
  Form,
} from 'react-bootstrap'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const EditUserModal = ({ show, onHide, userid, userDetails }) => {

  // setState
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  // CommonJS
  const Swal = require('sweetalert2')

  // 
  const handleSubmit = async () =>  {
    // Save Change Here...
    console.warn(userDetails)

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }

  // 
  useEffect(() => {
    // console.warn(userDetails)
    setName(userDetails.name)
    setUsername(userDetails.username)
    setEmail(userDetails.email)
  }, [userDetails])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{userid ? 'Add User' : 'Edit User'}</Modal.Title> */}
        <Modal.Title>{ userid == '' ? 'Add User' : 'Edit User'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Manage Team</Form.Label>
            <Form.Select aria-label="manage team">
            <option value="">- Select -</option>
            <option value="1">Pre-Sales</option>
            <option value="2">Post-Sales</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reporting Team</Form.Label>
            <Form.Select aria-label="reporting team">
            <option value="">- Select -</option>
            <option value="1">Pre-Sales</option>
            <option value="2">Post-Sales</option>
          </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>User Type</Form.Label>
            <Form.Select aria-label="user type">
            <option value="">- Select -</option>
            <option value="1">Sales</option>
            <option value="2">Teamlead</option>
            <option value="3">Supervisor</option>
            <option value="4">Manager</option>
            <option value="5">Engineer</option>
            <option value="6">Admin</option>
          </Form.Select>
          </Form.Group>

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

export default EditUserModal