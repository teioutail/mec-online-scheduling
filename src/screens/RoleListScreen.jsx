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
    listRoles,
    getRoleDetails 
} from '../actions/roleActions'

import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserPen,
} from '@fortawesome/free-solid-svg-icons'
import EditRoleModal from '../modals/Role/EditRoleModal'

const RoleListScreen = () => {
    //
    const headerTitle = 'Role List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Role List
    const roleList = useSelector(state => state.roleList)
    const { loading, error, roles } = roleList

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])

    // EditRoleModal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [roleid, setRoleId] = useState('')

    // Edit Role
    const handleEditRoleView = (state) => {
        setShow(true)
        setRoleId(state.target.id)
        // Call API Here...
        dispatch(getRoleDetails(state.target.id))
    }

    // Delete Role
    const handleDeleteRole = (state) => {
        alert('testing lang muna')
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Role ID',
                selector: row => row.role_id,
                sortable: true,
            },
            {   name: 'Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Description',
                selector: row => row.description,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.role_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditRoleView} id={row.role_id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit Role
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteRole} id={row.role_id}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete Role
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

    // Set Row Value
    useEffect(() => {
        setRows(roles)
        setPending(loading)
    }, [roles, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // console.warn(JSON.stringify(users));
            dispatch(listRoles())
        } else {
            // Redirect to login page
            navigate('/signin')
        }
        // console.warn(userInfo.user.user_type)
    }, [dispatch, navigate, userInfo])


    return (
        <>
            <SideMenu />
            <FormContainer>
                <Header headerTitle={headerTitle} />
                    <Button variant="primary" size="sm" className="float-end">
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

                <EditRoleModal 
                    show={show} 
                    onHide={handleClose} 
                    roleid={roleid} 
                />

                <Footer />
            </FormContainer>
        </>
    )

}

export default RoleListScreen