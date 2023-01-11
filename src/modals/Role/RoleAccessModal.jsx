import React, { useState, useEffect } from 'react'
import { 
  Button, 
  Modal,
  Container,
  Row,
  Col,
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

const RoleAccessModal = ({ show, onHide, roleid, categories, subcategories }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [rolename, setRoleName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const [menucategories, setMenuCategories] = useState([])
  const [menusubcategories, setMenuSubCategories] = useState([])

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
  useEffect(() => {
    //
    setMenuCategories(categories || [])
    setMenuSubCategories(subcategories || [])

    // console.warn(menucategories)
  }, [])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{ mode === 'Add' ? 'Add Role' : 'Edit Role'  }</Modal.Title> */}
        <Modal.Title>{roleid} Role Access Privilege</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid>
                <Row>
                    {/* <Col sm={12} md={6} lg={4} xl={3} > */}
                    <Col md={6}>
                        <h6>Menu Categories</h6>
                        <Form.Group>
                            <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Activate User?"
                            // value={activate}
                            // checked={activate}
                            // onChange={handleCheckboxChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Activate User?"
                            // value={activate}
                            // checked={activate}
                            // onChange={handleCheckboxChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <h6>Sub-Menu Categories</h6>

                    </Col>
                </Row>
            </Container>
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

export default RoleAccessModal