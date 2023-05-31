import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form, Row, Col, Table } from 'react-bootstrap' 
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
  listScheduleReference,
  createScheduleReference,
  updateScheduleReference,
} from '../../actions/Sales/salesScheduleReferenceAction'
import EditEmailBusinessUnit from '../../components/Sales/EditEmailBusinessUnit'
import PostSalesInput
 from '../../components/Sales/PostSalesInput'
import { 
  createMotherFolderInventory,
} from '../../actions/Sales/motherFolderInventoryAction'
import { 
  INVENTORY_CREATE_RESET,
} from '../../constants/Sales/motherFolderInventoryConstants'
import DataTable from 'react-data-table-component'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const ViewInventoryModal = ({ show, onHide, size, scheduleid }) => {
  // Redux
  const dispatch = useDispatch()
  // setState
  const [brand, setBrand] = useState('')
  const [partNo, setPartNo] = useState('')
  const [serialNo, setSerialNo] = useState('')
  // Datatables
  const [pending, setPending] = useState(true)
  const [rows, setRows] = useState([])
  // Schedule Reference Create Success Message
  const motherFolderInventoryCreate = useSelector(state => state.motherFolderInventoryCreate)
  const { success:motherFolderInventoryCreateSuccess, message:motherFolderInventoryCreateMessage } = motherFolderInventoryCreate
  // Mother Folder Inventory List
  const motherFolderInventoryList = useSelector(state => state.motherFolderInventoryList)
  const { loading, inventory } = motherFolderInventoryList  
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // CommonJS
  const Swal = require('sweetalert2')
  // Columns
  const columns = useMemo(
		() => [
            { name: 'Brand',selector: row => row.brand, sortable: true },
            { name: 'Part No',selector: row => row.part_number,sortable: true },
            { name: 'Serial No',selector: row => row.serial_number, sortable: true },
            {
                name: 'Action',
                cell: (row) => {
                    //
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.role_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item" id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Item
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link className="dropdown-item" onClick={handleDeleteScheduleReference} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'clipboard-list']} /> Change Status
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleInventoryView} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'box']} /> Individual Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleGroupInventoryView} id={row.ar_id}>
                                        <FontAwesomeIcon icon={['fas', 'layer-group']} /> Group Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleInventoryListView} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'eye']} /> View Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteScheduleReference} id={row.ar_id}>
                                      <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Schedule
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    </>
                },
                // cell: (row) => <button onClick={handleButtonClick} id={row.id}>Action</button>,
				ignoreRowClick: true,
				allowOverflow: true,
				button: true,
			},
		],
		[],
	);

  // 
  const handleSubmit = async () =>  {
    // Data
    let data = {
      brand: brand,
      part_number: partNo,
      serial_number: serialNo,
      ar_id: scheduleid,
    }

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
      // Show confirm
      if (result.isConfirmed) {
        // Save New Device
        dispatch(createMotherFolderInventory(data))
      }
    })
  }

  // Show Success 
  useEffect(() => {
    // Show Success Adding of new records
    if(motherFolderInventoryCreateSuccess) {
      Swal.fire(
        'Success!',
        motherFolderInventoryCreateMessage,
        'success'
      )
      // Refresh Datatable
      dispatch(listScheduleReference())
      // Close Modal
      onHide()
      // Clear Fields
      setBrand('')
      setPartNo('')
      setSerialNo('')
      // 
      dispatch({
        type: INVENTORY_CREATE_RESET,
      })
    }

    // Show Success Update
    // if(scheduleReferenceUpdateSuccess) {
    //   Swal.fire(
    //     'Success!',
    //     scheduleReferenceUpdateMessage,
    //     'success'
    //   )
    //   // Refresh Datatable
    //   dispatch(listScheduleReference())
    //   // Close Modal
    //   onHide()
    // }

  },[motherFolderInventoryCreateSuccess])

  // Set Row Value
  useEffect(() => {
    setRows(inventory)
    setPending(loading)
  }, [inventory, rows, loading])

  return (
    <>
        <Modal  
          size={size} 
          show={show} 
          onHide={onHide}
          fullscreen={true}
        >
        <Modal.Header 
            closeButton
        >
          {/* <Modal.Title>{ mode === 'Add' ? 'Add Inventory' : 'Edit Inventory'  }</Modal.Title> */}
          <Modal.Title>View Inventory List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DataTable
                // title={headerTitle}
                // selectableRows
                pagination
                responsive
                columns={columns}
                data={rows}
                progressPending={pending}
                progressComponent={<Loader />}
                highlightOnHover
                pointerOnHover
                selectableRowsHighlight
            />
        </Modal.Body>
        <Modal.Footer>
          <Button size='sm' variant="secondary" onClick={onHide}>
              Close
          </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default ViewInventoryModal