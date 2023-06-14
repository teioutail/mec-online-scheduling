import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import SideMenu from '../../components/template/SideMenu'
import FormContainer from '../../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditDestinationDetailModal from '../../modals/Admin/EditDestinationDetailModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
    listDestination,
    getDestinationDetails,
    deleteDestination,
} from '../../actions/Admin/destinationDetailsActions'

import { 
    DESTINATION_CREATE_RESET, 
    DESTINATION_DETAILS_RESET,
    DESTINATION_UPDATE_RESET,
} from '../../constants/Admin/destinationDetailsConstant'

const DestinationDetailScreen = () => {

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
    const headerTitle = 'Destination Detail List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Destination List
    const destinationList = useSelector(state => state.destinationList)
    const { loading, destination } = destinationList
    
    // Destination Create Error
    const destinationCreate = useSelector(state => state.destinationCreate)
    const { error:errorCreate } = destinationCreate
  
    // Destination Update Error
    const destinationUpdate = useSelector(state => state.destinationUpdate)
    const { error:errorUpdate } = destinationUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Selected Destination Info
    const destinationDetails = useSelector(state => state.destinationDetails)
    const { destination: destinationDetail } = destinationDetails

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    
    // Edit Destination Modal
    const [show, setShow] = useState(false)
    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [destinationId, setDestinationId] = useState('')
    const [mode, setMode] = useState('')

    // Add Destination Modal
    const handleDestinationView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: DESTINATION_DETAILS_RESET,
        })
    }

    // Edit Destination
    const handleEditDestinationView = (state) => {
        setShow(true)
        setDestinationId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getDestinationDetails(state.target.id))
    }

    // Delete Destination Modal
    const handleDeleteDestination = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this Destination Record?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Destination
                dispatch(deleteDestination(state.target.id))
                // Refresh Datatable
                dispatch(listDestination())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Destination Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Destination ID',
                selector: row => row.dd_id,
                sortable: true,
            },
            {   name: 'Destination',
                selector: row => row.destination,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.dd_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditDestinationView} id={row.dd_id}>
                                        <FontAwesomeIcon icon={['fas', 'pen-to-square']} /> Edit Destination
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteDestination} id={row.dd_id}>
                                        <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Destination
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
            dispatch({ type: DESTINATION_CREATE_RESET })
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
            dispatch({ type: DESTINATION_UPDATE_RESET })
        }
    }, [errorCreate, errorUpdate])

    // Set Row Value
    useEffect(() => {
        setRows(destination)
        setPending(loading)
    }, [destination, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // List Destination
            dispatch(listDestination())
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
                    <Button variant="btn bg-gradient-info" size="sm" className="float-end" onClick={handleDestinationView}>
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
                    
                    <EditDestinationDetailModal 
                        show={show} 
                        onHide={handleClose} 
                        ddid={destinationId}
                        destinationDetails={destinationDetail}
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

export default DestinationDetailScreen