import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EditUserModal = ({ show, onHide, userid }) => {

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>Modal heading ${userid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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