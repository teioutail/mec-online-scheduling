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
    listSubMenuCategories,
    updateSubMenuCategory,
    createSubMenuCategory,
} from '../../actions/menuSubCategoryAction'

const SubMenuCategoryModal = ({ show , mode, onHide, subcatid, submenuCategoryDetails, menuCategoryOptions }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [subcategoryname, setSubCategoryName] = useState('')
  const [url, setUrl] = useState('')
  const [remarks, setRemarks] = useState('')
  const [iconMenu, setIconMenu] = useState('')
  const [status, setStatus] = useState('')
  const [categoryid, setCategoryId] = useState('')
  const [subcategoryid, setSubCategoryId] = useState('');
  const [menuCatOptions, setMenuCatOptions] = useState([])
  
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
        const subcategory = {
          id: subcategoryid,
          subcategoryname: subcategoryname,
          remarks: remarks,
          url: url,
          status: status,
          icon: iconMenu,
          cat_id: categoryid,
        }

        // 
        if(mode === 'Add') {
          // Show Success Request
          Swal.fire(
            'Success!',
            'New Menu Category Added Successfully.',
            'success'
          )
          // Create Menu Category 
          dispatch(createSubMenuCategory(subcategory))
          
          // Refresh Datatable
          dispatch(listSubMenuCategories())
          // Close 
          onHide()
        } else {
          // Update Menu Category
          dispatch(updateSubMenuCategory(subcategory))

          Swal.fire(
            'Success!',
            'Menu Category Updated Successfully.',
            'success'
          )
          
          // Refresh Datatable
          dispatch(listSubMenuCategories())
          // Close Modal
          onHide()
        }
      }
    })
  }

  // 
  useEffect(() => {
    // Selected Menu Category Details
    const {  
        subcat_id,
        subcategory_name,
        url,
        access_role,
        users_id,
        status,
        remarks,
        icon:iconMenu,
        sort,
        cat_id:categoryid,
    } = submenuCategoryDetails

    // setState
    setSubCategoryName(subcategory_name || "")
    setUrl(url || "")
    setRemarks(remarks || "")
    setIconMenu(iconMenu || "")
    setStatus(status || "0")
    setMenuCatOptions(menuCategoryOptions || [])
    setCategoryId(categoryid || "")
    setSubCategoryId(subcatid || "")

  }, [submenuCategoryDetails, menuCategoryOptions])

  return (
    <>
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{ mode === 'Add' ? 'Add Sub-Category' : 'Edit Sub-Category'  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3">
            <Form.Label>Menu Category</Form.Label>
            <Form.Control
              as='select' 
              aria-label="Menu Category"
              value={categoryid}
              onChange={(e) => setCategoryId(e.target.value)}
            >
            <option value="">- Select -</option>
            {
                menuCatOptions.length > 0  && (
                    menuCatOptions.map((row, key) => (
                        <option key={key} value={ row.cat_id }>{ row.category_name }</option>
                    ))
                )
            }
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub-Category Name</Form.Label>
            <Form.Control 
              type='text'
              placeholder='Sub-Category Name'
              value={subcategoryname}
              onChange={(e) => setSubCategoryName(e.target.value)}
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
              value={iconMenu}
              onChange={(e) => setIconMenu(e.target.value)}
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

export default SubMenuCategoryModal