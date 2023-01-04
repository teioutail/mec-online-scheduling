import React from 'react'
import { useState, useEffect } from 'react'
import { 
  Button, 
  Modal,
  Form,
} from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  updateUser, 
  listUsers,
} from '../../actions/userActions'

const EditRoleModal = ({ show , mode, onHide, roleid }) => {

  // Redux
  const dispatch = useDispatch()

  // setState
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [manage, setManage] = useState('')
  const [reporting, setReporting] = useState('')
  const [utype, setUserType] = useState('')

  // CommonJS
  const Swal = require('sweetalert2')
  // 
  const handleSubmit = async () =>  {
    // Save Change Here...
    // console.warn(userDetails)

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
        const user = {
          id: roleid,
          name: name,
          username: username,
          email: email,
          manage_team: manage,
          reporting_team: reporting,
          user_type: utype,
        }

        // 
        if( dispatch(updateUser(user)) ) {
          // Show Success Request
          Swal.fire(
            'Success!',
            'Your file has been deleted.',
            'success'
          )
          // Refresh Datatable
          dispatch(listUsers())
          // Close Modal
          onHide()
        }
        
      }

    })
  }

// 
//   useEffect(() => {
//     // Selected User Details
//     const { 
//       name, 
//       username, 
//       email, 
//       manage_team, 
//       reporting_team,
//       user_type,
//     } = userDetails

//     // 
//     setName(name || "")
//     setUsername(username || "")
//     setEmail(email || "")
//     setManage(manage_team || "")
//     setReporting(reporting_team || "")
//     setUserType(user_type || "")

//   }, [userDetails])

useEffect(() => {

})

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ roleid == '' ? 'Add Role' : 'Edit Role'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Role Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Description'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Status'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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

export default EditRoleModal