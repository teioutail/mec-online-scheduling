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

const EditRoleModal = ({ show , mode, onHide, roleid, roleDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [rolename, setRoleName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  // Role Create Success Message
  const roleCreate = useSelector(state => state.roleCreate)
  const { success:roleCreateSuccess, message:roleCreateMessage } = roleCreate

  // Role Update Success Message
  const roleUpdate = useSelector(state => state.roleUpdate)
  const { success:roleUpdateSuccess, message:roleUpdateMessage } = roleUpdate

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
        // Updated User Data
        const role = {
          id: roleid,
          rolename: rolename,
          description: description,
          status: status
        }
        // 
        if(mode === 'Add') {
          // Create Role 
          dispatch(createRole(role))
        } else {
          // Update Role
          dispatch(updateRole(role))
        }
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(roleCreateSuccess) {
      Swal.fire(
        'Success!',
        roleCreateMessage,
        'success'
      )
    }
    // Show Success Update
    if(roleUpdateSuccess) {
      Swal.fire(
        'Success!',
        roleUpdateMessage,
        'success'
      )
    }
    // Refresh Datatable
    dispatch(listRoles())
    // Close Modal
    onHide()
  },[roleCreateSuccess, roleUpdateSuccess])

  // 
  useEffect(() => {
    // Selected User Details
    const {  
      name,
      description,
      status
    } = roleDetails
    
    // setState
    setRoleName(name || "")
    setDescription(description || "")
    setStatus(status || "0")
  }, [roleDetails, dispatch])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Role' : 'Edit Role'  }</Modal.Title>
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

export default EditRoleModal