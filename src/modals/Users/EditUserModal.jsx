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
  createUser,
} from '../../actions/userActions'

const EditUserModal = ({ show, mode , onHide, userid, userDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [manage, setManage] = useState('')
  const [reporting, setReporting] = useState('')
  const [utype, setUserType] = useState('')
  const [activate, setActivate] = useState(false)

  // CommonJS
  const Swal = require('sweetalert2')

  // Event in checkbox
  const handleCheckboxChange = (event) => {
    const target = event.target
    const checked = target.checked
    const name = target.name
    setActivate(checked)
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
        const user = {
          id: userid,
          name: name,
          username: username,
          email: email,
          manage_team: manage,
          reporting_team: reporting,
          user_type: utype,
          activated: activate,
        }

        // dito update
        // console.warn(user)
        // 
        if(mode === 'Add') {
          // Show Success Request
          Swal.fire(
            'Success!',
            'New User Successfully Added.',
            'success'
          )

          // 
          dispatch(createUser(user))
          // Refresh Datatable
          dispatch(listUsers())
          // Close Modal
          onHide()
        } else {
          // 
          dispatch(updateUser(user))
          // Show Success Request
          Swal.fire(
            'Success!',
            'User Details Successfully Updated.',
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
  useEffect(() => {
    // Selected User Details
    const { 
      name, 
      username, 
      email, 
      manage_team, 
      reporting_team,
      user_type,
      approved,
    } = userDetails

    // 
    setName(name || "")
    setUsername(username || "")
    setEmail(email || "")
    setManage(manage_team || "")
    setReporting(reporting_team || "")
    setUserType(user_type || "")
    setActivate(approved === 0 ? false : true)

  }, [userDetails])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{userid ? 'Add User' : 'Edit User'}</Modal.Title> */}
        <Modal.Title>{ mode === 'Add' ? 'Add User' : 'Edit User'  }</Modal.Title>
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
            <Form.Label>Username</Form.Label>
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
            <Form.Control 
              as='select' 
              aria-label="manage team"
              value={manage}
              onChange={(e) => setManage(e.target.value)}
            >
            <option value="">- Select -</option>
            <option value="1">Pre-Sales</option>
            <option value="2">Post-Sales</option>
          </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reporting Team</Form.Label>
            <Form.Control 
              as='select' 
              aria-label="reporting team"
              value={reporting}
              onChange={(e) => setReporting(e.target.value)}
            >
            <option value="">- Select -</option>
            <option value="1">Pre-Sales</option>
            <option value="2">Post-Sales</option>
          </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control 
              as='select' 
              aria-label="user type"
              value={utype}
              onChange={(e) => setUserType(e.target.value)}
            >
            <option value="">- Select -</option>
            <option value="1">Sales</option>
            <option value="2">Teamlead</option>
            <option value="3">Supervisor</option>
            <option value="4">Manager</option>
            <option value="5">Engineer</option>
            <option value="6">Admin</option>
            <option value="7">Pre-Sales Approver</option>
            <option value="8">Post-Sales Approver</option>
            <option value="9">Super-Approver</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check 
              type="switch"
              id="custom-switch"
              label="Activate User?"
              value={activate}
              checked={activate}
              onChange={handleCheckboxChange}
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

export default EditUserModal