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
  listMenuCategories,
  updateMenuRoleAccess,
} from '../../actions/menuCategoryActions'

import { 
  listSubMenuCategories,
  updateSubMenuRoleAccess,
} from '../../actions/menuSubCategoryAction'

const RoleAccessModal = (props) => {
  //
  const { 
    show, 
    onHide, 
    roleid, 
    categories, 
    subcategories 
  } = props
  
  // Redux
  const dispatch = useDispatch()
  // setState
  const [menucategories, setMenuCategories] = useState([])
  const [menusubcategories, setMenuSubCategories] = useState([])
  
  const [activate, setActivate] = useState(false)

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

  // Event in checkbox
  const handleCheckboxChange = (event) => {
    const target = event.target
    const checked = target.checked
    const name = target.name
    setActivate(checked)
  }

  // 
  const handleSubMenuCategoryUpdate = async (state) => {
    // Check Status
    const target = state.target
    const checked = target.checked
    // Data
    const details = {
      role_id: state.target.id, // role id
      subcat_id: state.target.value, // subcategory id
      status: checked,
    };
    // Dispatch
    dispatch(updateSubMenuRoleAccess(details))
    dispatch(listSubMenuCategories())
  }

  //
  const handleMenuCategoryUpdate = async (state) => {
    // Check Status
    const target = state.target
    const checked = target.checked
    // Data
    const details = {
      role_id: state.target.id, // role id
      cat_id: state.target.value, // category id
      status: checked,
    };
    // Dispatch
    dispatch(updateMenuRoleAccess(details))
    dispatch(listMenuCategories())
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

  }, [categories, menucategories, subcategories, menusubcategories , dispatch])

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
                              // Map
                              menucategories.map((row, key) => (
                                    <Form.Group key={key}>
                                    <Form.Check 
                                      type="switch"
                                      id={roleid} // role id
                                      label={row.category_name}
                                      value={row.cat_id}
                                      // checked={activate}
                                      defaultChecked={(row.access_role.includes(roleid))}
                                      onChange={handleMenuCategoryUpdate}
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
                                      // checked={(row.access_role.includes(roleid))}
                                      defaultChecked={(row.access_role.includes(roleid))}
                                      onChange={handleSubMenuCategoryUpdate}
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
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default RoleAccessModal