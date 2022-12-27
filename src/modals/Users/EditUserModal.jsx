import React from 'react'
import { 
  Button, 
  Modal,
  Form,
} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getUserDetails } from '../../actions/userActions'
import axios from 'axios'

const EditUserModal = ({ show, onHide, userid }) => {

  // setState
  const [name, setName] = useState('');

  const handleSubmit = async () =>  {
    
  }

  // 
  useEffect(() => {
    // 
      // alert("tetasdfaasdf");
  }, [])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{userid ? 'Add User' : 'Edit User'}</Modal.Title> */}
        <Modal.Title>{ userid == '' ? 'Add' : 'Edit'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Manage Team</Form.Label>
            <Form.Control placeholder="Manage Team" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reporting Team</Form.Label>
            <Form.Control placeholder="Reporting Team" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>User Type</Form.Label>
            <Form.Control placeholder="User Type" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Select>
              <option>Disabled select</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Can't check this" />
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