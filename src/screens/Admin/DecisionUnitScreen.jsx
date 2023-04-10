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
import EditDecisionModal from '../../modals/Admin/EditDecisionModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    listDecision,
    deleteDecision,
    getDecisionDetails,
} from '../../actions/Admin/decisionActions'

import { 
    DECISION_CREATE_RESET,
    DECISION_DETAILS_RESET,
    DECISION_UPDATE_RESET,
} from '../../constants/Admin/decisionConstants'

const DecisionUnitScreen = () => {
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
    const headerTitle = 'Decision List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Decision List
    const decisionList = useSelector(state => state.decisionList)
    const { loading, decisions } = decisionList
    
    // Decision Create Error
    const decisionCreate = useSelector(state => state.decisionCreate)
    const { error:errorCreate } = decisionCreate
  
    // Decision Update Error
    const decisionUpdate = useSelector(state => state.decisionUpdate)
    const { error:errorUpdate } = decisionUpdate

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Selected  Decision Info
    const decisionDetails = useSelector(state => state.decisionDetails)
    const { decision: decisionDetail } = decisionDetails

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    // Edit Activity Related To Modal
    const [show, setShow] = useState(false)
    //
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [decisionId, setDecisionId] = useState('')
    const [mode, setMode] = useState('')

    // Add Activity Related To Modal
    const handleDecisionView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: DECISION_DETAILS_RESET,
        })
    }

    // Edit Decision
    const handleEditDecisionView = (state) => {
        setShow(true)
        setDecisionId(state.target.id)
        setMode('Edit')
        // Call API Here...
        dispatch(getDecisionDetails(state.target.id))
    }

    // Delete Decision Modal
    const handleDeleteDecision = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this Decision Record?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Decision
                dispatch(deleteDecision(state.target.id))
                // Refresh Datatable
                dispatch(listDecision())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Decision Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Decision ID',
                selector: row => row.dt_id,
                sortable: true,
            },
            {   name: 'Activity',
                selector: row => row.decision,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.dt_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={['fas', 'ellipsis-vertical']} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditDecisionView} id={row.dt_id}>
                                        <FontAwesomeIcon icon={['fas', 'pen-to-square']} /> Edit Decision
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteDecision} id={row.dt_id}>
                                        <FontAwesomeIcon icon={['fas', 'trash']} /> Delete Decision
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
            dispatch({ type: DECISION_CREATE_RESET })
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
            dispatch({ type: DECISION_UPDATE_RESET })
        }
    }, [errorCreate, errorUpdate])

    // Set Row Value
    useEffect(() => {
        setRows(decisions)
        setPending(loading)
    }, [decisions, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // List Decision
            dispatch(listDecision())
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
                    <Button variant="primary" size="sm" className="float-end" onClick={handleDecisionView}>
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
                    
                    <EditDecisionModal 
                        show={show} 
                        onHide={handleClose} 
                        dtid={decisionId}
                        decisionDetails={decisionDetail}
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

export default DecisionUnitScreen