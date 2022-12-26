import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import SideMenu from '../../components/template/SideMenu'
import FormContainer from '../../components/template/FormContainer'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import AddUser from '../../modals/Users/AddUser'

const UserListScreen = () => {
    // Redux
    const dispatch = useDispatch()
    // useNavigate to redirect the user
    const navigate = useNavigate() 
    // User List
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList
    // User Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // Datatables
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Header Title
    const headerTitle = 'User List'
    
    // Action Event Handler
    const handleButtonClick = (state) => {
        // 
        console.warn(`You Clicked Item ${state.target.id}`);
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
                name: 'Profile',
                selector: row => row.profile_picture,
                sortable: true,
            },
            {
                name: 'User Type',
                selector: row => row.user_type,
                sortable: true,
            },
            {
                name: 'Managing Team',
                selector: row => row.manage_team,
                sortable: true,
            },
            {
                name: 'Reporting Team',
                selector: row => row.reportingteam,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                {/* <li><a className="dropdown-item" href="#" onClick={handleButtonClick(row.id)}>Edit User</a></li> */}
                                <li>
                                    <Link className="dropdown-item" onClick={handleButtonClick} id={row.id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit User
                                    </Link>
                                </li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
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

    // Data 
    const data = [
        {
            id: 1,
            name: 'Beetlejuice',
            email: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            email: '1984',
        },
        {
            id: 3,
            name: 'Ghostbusters',
            email: '1990',
        },
    ]

    // Set Row Value
    useEffect(() => {
        setRows(users)
        setPending(loading)
    }, [users, rows])

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
        <SideMenu />
        <FormContainer>
          <Header headerTitle={headerTitle} />
            <Button variant="primary" size="sm" className="float-end" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Add New
            </Button>
            
            <DataTable
                // title={headerTitle}
                // selectableRows
                pagination
                responsive
                columns={columns}
                // data={users}
                data={rows}
                progressPending={pending}
			    progressComponent={<Loader />}
                highlightOnHover
                pointerOnHover
                selectableRowsHighlight
            />

            <AddUser show={show} onHide={handleClose} />
            
          <Footer/>
        </FormContainer>
    </>
  )
}

export default UserListScreen