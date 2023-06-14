import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import SideMenu from '../../components/template/SideMenu'
import FormContainer from '../../components/template/FormContainer'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
    listUsers, 
    getUserDetails,
    deleteUser,
    resetUserPassword,
} from '../../actions/userActions'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faEllipsisV,
    faUserPen,
    faUniversalAccess,
    faTrash,
    faUnlock,
} from '@fortawesome/free-solid-svg-icons'

import { 
    USER_DETAILS_RESET 
} from '../../constants/userConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EditUserModal from '../../modals/Users/EditUserModal'

const UserListScreen = () => {
    // CommonJS
    const Swal = require('sweetalert2')

    // Header Title
    const headerTitle = 'User List'

    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // User List
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // User Info
    const userDetails = useSelector(state => state.userDetails)
    const { user:userDetail } = userDetails

    // Datatables
    const [pending, setPending] = useState(true)
	const [rows, setRows] = useState([])

    // EditUserModal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [userid, setUserId] = useState('')
    const [mode, setMode] = useState('')

    // Action Event Handler
    const handleButtonClick = (state) => {
        // 
        console.warn(`You Clicked Item ${state.target.id}`);
    }

    // Add User Modal
    const handleAddUserView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        // 
        dispatch({
            type: USER_DETAILS_RESET,
        })
    }

    // Edit User
    const handleEditUserView = (state) => {
       // console.warn(`You Clicked Item ${state.target.id}`)
       setShow(true)
       setUserId(state.target.id)
       setMode('Edit')
       // Call API Here...
       dispatch(getUserDetails(state.target.id))
    }

    // Delete User
    const handleDeleteUser = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this user?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete User
                dispatch(deleteUser(state.target.id))
                // Refresh Datatable
                dispatch(listUsers())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'User Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Reset User Pasword
    const handleResetPassword = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Reset password to default?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // // Delete User
                // dispatch(deleteUser(state.target.id))
                // // Refresh Datatable
                // dispatch(listUsers())
                // // Show Success Request

                dispatch(resetUserPassword(state.target.id))

                Swal.fire(
                    'Success!',
                    'Password successfully reset to default.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'User ID',
                selector: row => row.id,
                sortable: true,
            },
            {   name: 'Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
                sortable: true,
            },
            {
                name: 'Username',
                selector: row => row.username,
                sortable: true,
            },
            {
                name: 'User Type',
                selector: row => row.rolename,
                sortable: true,
            },
            {
                name: 'Managing Team',
                selector: row => row.manage_name,
                sortable: true,
            },
            {
                name: 'Reporting Team',
                selector: row => row.report_name,
                sortable: true,
            },
            {
                name: 'Status',
                // <span class="badge badge-sm bg-gradient-success">
                selector: row => row.activated,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                {/* <li><a className="dropdown-item" href="#" onClick={handleButtonClick(row.id)}>Edit User</a></li> */}
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditUserView} id={row.id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit User
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleButtonClick} id={row.id}>
                                        <FontAwesomeIcon icon={faUniversalAccess} /> Access Rights
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleResetPassword} id={row.id}>
                                        <FontAwesomeIcon icon={faUnlock} /> Reset Password
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteUser} id={row.id}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete User
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

    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                color: '#202124',
                fontSize: '14px',
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        },
        pagination: {
            style: {
                border: 'none',
            },
        },
    };

    // Set Row Value
    useEffect(() => {
        setRows(users)
        setPending(loading)
    }, [users, rows, loading, userDetail])

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // console.warn(JSON.stringify(users));
            dispatch(listUsers())
        } else {
            // Redirect to login page
            navigate('/signin')
        }
        // console.warn(userInfo.user.user_type)
    }, [dispatch, navigate, userInfo])

    return (
    <>
        {/* <SideMenu /> */}
        <FormContainer>
          <Header headerTitle={headerTitle} />
            <Button variant="btn bg-gradient-info" size="sm" className="float-end" onClick={handleAddUserView}>
                <FontAwesomeIcon icon={faPlus} /> Add New
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

            <EditUserModal 
                show={show} 
                onHide={handleClose} 
                userid={userid}
                userDetails={userDetail}
                mode={mode}
            />

          <Footer/>
        </FormContainer>
    </>
  )
}

export default UserListScreen