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

import { 
  updateSubMenuRoleAccess
} from '../../actions/menuSubCategoryAction'

const RoleAccessModal = ({ show, onHide, roleid, categories, subcategories }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
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
  const handleMenuCategoryUpdate = async (state) => {
    // Check Status
    const target = state.target
    const checked = target.checked
    // Data
    const details = {
      id: state.target.id, // role id
      value: state.target.value, // subcategory id
      status: checked,
    };
    // console.warn(details)
    //
    dispatch(updateSubMenuRoleAccess(details))
  }
  
  // 
  useEffect(() => {
    // validate categories
    if(categories && (categories !== undefined)) {
      setMenuCategories(categories)
    }
    // validate sub-categories
    if(subcategories && (subcategories !== undefined)) {
      setMenuSubCategories(subcategories)
    }

  }, [categories, menucategories, subcategories, menusubcategories])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        {/* <Modal.Title>{ mode === 'Add' ? 'Add Role' : 'Edit Role'  }</Modal.Title> */}
        <Modal.Title>Role Access Privilege</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid>
                <Row>
                    {/* <Col sm={12} md={6} lg={4} xl={3} > */}
                    <Col md={6}>
                        <h6>Menu Categories</h6>
                        {
                            menucategories.length > 0  && (
                              // map
                              menucategories.map((row, key) => (
                                    <Form.Group key={key}>
                                    <Form.Check 
                                      type="switch"
                                      id={row.subcat_id}
                                      label={row.category_name}
                                      value={row.cat_id}
                                      // checked={activate}
                                    />
                                    </Form.Group>
                                ))
                            )
                        }
                    </Col>
                    <Col md={6}>
                        <h6>Sub-Menu Categories</h6>
                        {
                            menusubcategories.length > 0  && (
                              // map
                              menusubcategories.map((row, key) => (
                                    <Form.Group key={key}>
                                    <Form.Check 
                                      type="switch"
                                      id={roleid} // role id
                                      label={row.subcategory_name}
                                      value={row.subcat_id} // subcategory id
                                      // checked={activate}
                                      onChange={handleMenuCategoryUpdate}
                                    />
                                </Form.Group>
                                ))
                            )
                        }
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