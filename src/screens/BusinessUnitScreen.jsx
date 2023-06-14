import React, { useState, useEffect, useMemo } from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Loader from '../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    listBusinessUnit,
    getBusinessUnitDetails,
    deleteBusinessUnit,
} from '../actions/businessUnitActions'

import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditBusinessUnitModal from '../modals/Admin/EditBusinessUnitModal'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    BUSINESS_UNIT_CREATE_RESET,
    BUSINESS_UNIT_UPDATE_RESET,
    BUSINESS_UNIT_DETAILS_RESET,
} from '../constants/businessUnitConstants'

const BusinessUnitScreen = () => {
    // Toastify
    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });   

    // CommonJS
    const Swal = require('sweetalert2')
    //
    const headerTitle = 'Business Unit'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Business Unit List
    const businessUnitList = useSelector(state => state.businessUnitList)
    const { loading, business } = businessUnitList
    
    // Business Unit Create Error
    const businessUnitCreate = useSelector(state => state.businessUnitCreate)
    const { error:errorCreate } = businessUnitCreate
  
    // Business Unit Update Error
    const businessUnitUpdate = useSelector(state => state.businessUnitUpdate)
    const { error:errorUpdate } = businessUnitUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Business Unit Info
    const businessUnitDetails = useSelector(state => state.businessUnitDetails)
    const { business: businessUnitDetail } = businessUnitDetails

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    // Edit Business Unit Modal
    const [show, setShow] = useState(false)
    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [businessUnitId, setBusinessUnitId] = useState('')
    const [mode, setMode] = useState('')

    // Add Business Unit Modal
    const handleBusinessUnitView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: BUSINESS_UNIT_DETAILS_RESET,
        })
    }

    // Edit Business Unit
    const handleEditBusinessUnitView = (state) => {
        setShow(true)
        setBusinessUnitId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getBusinessUnitDetails(state.target.id))
    }

    // Delete Business Unit Modal
    const handleDeleteBusinessUnit = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this Business Unit?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Business Unit
                dispatch(deleteBusinessUnit(state.target.id))
                // Refresh Datatable
                dispatch(listBusinessUnit())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Business Unit Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'BU ID',
                selector: row => row.bu_id,
                sortable: true,
            },
            {   name: 'Business Unit',
                selector: row => row.business_unit,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.bu_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditBusinessUnitView} id={row.bu_id}>
                                        <FontAwesomeIcon icon={['fas', 'pen-to-square']} /> Edit Business Unit
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteBusinessUnit} id={row.bu_id}>
                                        <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Business Unit
                                    </Link>
                                </li>
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

    // useEffect for Error Message
    useEffect(() => {
        // Show Create Error
        if(errorCreate) {
            // Loop Error Back-End Validation
            for(const key in errorCreate) {
                if (errorCreate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${errorCreate[key]}`)
                }
            }
            //
            dispatch({ type: BUSINESS_UNIT_CREATE_RESET })
        }
        
        // Show Update Error
        if(errorUpdate) {
            // Loop Error Back-End Validation
            for(const key in errorUpdate) {
                if (errorUpdate.hasOwnProperty(key)) {
                    // Show Error
                    notify(`${errorUpdate[key]}`)
                }
            }
            dispatch({ type: BUSINESS_UNIT_UPDATE_RESET })
        }
    }, [errorCreate, errorUpdate])

    // Set Row Value
    useEffect(() => {
        setRows(business)
        setPending(loading)
    }, [business, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // Business Unit List
            dispatch(listBusinessUnit())

        } else {
            // Redirect to login page
            navigate('/signin')
        }
    }, [dispatch, navigate, userInfo])

    return (
        <>
            {/* <SideMenu /> */}
            <FormContainer>
                <Header headerTitle={headerTitle} />
                    <Button variant="btn bg-gradient-info" size="sm" className="float-end" onClick={handleBusinessUnitView}>
                        <FontAwesomeIcon icon={['fas', 'plus']} /> Add New
                    </Button>

                    <DataTable
                        // title={headerTitle}
                        // selectableRows
                        // data={users}
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
                    
                    <EditBusinessUnitModal 
                        show={show} 
                        onHide={handleClose} 
                        buid={businessUnitId}
                        businessUnitDetails={businessUnitDetail}
                        mode={mode}
                    />

                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                <Footer />
            </FormContainer>
        </>
    )
}

export default BusinessUnitScreen