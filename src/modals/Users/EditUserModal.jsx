import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EditUserModal = ({ show, onHide, userid }) => {

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{userid ? 'Add User' : 'Edit User'}</Modal.Title> */}
        <Modal.Title>{ userid == '' ? 'Add' : 'Edit'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Close
        </Button>
        <Button variant="primary" onClick={onHide}>
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
  )

}

export default EditUserModal