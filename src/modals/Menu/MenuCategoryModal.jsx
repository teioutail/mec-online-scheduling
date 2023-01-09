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
// import { 
//   listmenu,
//   updateRole,
//   createRole,
//  } from '../../actions/roleActions'
import { 
  listMenuCategories,
  updateMenuCategory,
  
} from '../../actions/menuCategoryActions'

const MenuCategoryModal = ({ show , mode, onHide, catid, menuCategoryDetails }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [categoryname, setCategoryName] = useState('')
  const [url, setUrl] = useState('')
  const [remarks, setRemarks] = useState('')
  const [icon, setIcon] = useState('')
  const [status, setStatus] = useState('')
  const [treeview, setTreeView] = useState('')

  // CommonJS
  // const Swal = require('sweetalert2')

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

        // Updated Category Data
        const category = {
          id: catid,
          categoryname: categoryname,
          remarks: remarks,
          url: url,
          status: status,
          treeview: treeview,
          icon: icon,
        }

        // 
        if(mode === 'Add') {
          // Show Success Request
          Swal.fire(
            'Success!',
            'New Menu Category Added Successfully.',
            'success'
          )
          // Create Role 
          //   dispatch(createRole(role))
          // Refresh Datatable
          dispatch(listMenuCategories())
          // Close Modal
          onHide()

        } else {
        // 
        //   if( dispatch(updateRole(role)) ) {
        //     // Show Success Request
        //     Swal.fire(
        //       'Success!',
        //       'Role Updated Successfully.',
        //       'success'
        //     )
        //     // Refresh Datatable
        //     dispatch(listRoles())
        //     // Close Modal
        //     onHide()
        //   }
        }
      }
    })
  }

  // 
  useEffect(() => {
    // console.warn(menuCategoryDetails)
    
    // Selected Menu Category Details
    const {  
        cat_id,
        category_name,
        url,
        access_role,
        users_id,
        status,
        remarks,
        icon,
        sort,
        treeview,
    } = menuCategoryDetails

    // console.warn(category_name)

    // Updated Menu Category Data
    // const category = {
    //     id: categoryid,
    //     categoryname: categoryname,
    //     remarks: remarks,
    //     url: url,
    //     status: status,
    //     treeview: treeview,
    //     icon: icon,
    //     sort: sort,
    //     treeview: treeview
    // }

    // setState
    setCategoryName(category_name || "")
    setUrl(url || "")
    setRemarks(remarks || "")
    setIcon(icon || "")
    setStatus(status || "0")
    setTreeView(treeview || "0")

  }, [menuCategoryDetails])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Category' : 'Edit Category'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Category Name'
              value={categoryname}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control 
              type='text'
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Icon</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Icon'
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
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

          <Form.Group className="mb-3">
            <Form.Label>w/ Menu Treeview</Form.Label>
            <Form.Control
              as='select' 
              aria-label="Treeview"
              value={treeview}
              onChange={(e) => setTreeView(e.target.value)}
            >
            <option value="0">No</option>
            <option value="1">Yes</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Remarks</Form.Label>
            <Form.Control 
              as='textarea'
              rows={3}
              placeholder='Remarks'
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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

export default MenuCategoryModal