import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../../actions/userActions'
import Header from '../../components/template/Header'
import Footer from '../../components/template/Footer'
import SideMenu from '../../components/template/SideMenu'
import FormContainer from '../../components/template/FormContainer'
import Content from '../../components/template/Content'
import DataTable from 'react-data-table-component'
import Loader from '../../components/Loader'
import { ButtonGroup, Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

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
    //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Header Title
    const headerTitle = 'User List'
    
    //
    const handleButtonClick = () => {
        alert("testing lang muna")
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
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
				// cell: () => <button onClick={handleButtonClick}>Action</button>,
				cell: (row, i) => {
                    console.log(row);
                    return <>
                        {/* <DropdownButton className='btn-link' variant='secondary' id="dropdown-basic-button" title={ <FontAwesomeIcon icon={faEllipsisV} /> }>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton> */}
                        <div class="dropdown">
                            <button class="btn btn-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>
                    </>
                },
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

    //
    useEffect(() => {
        // Check if user is admin else, redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // console.warn(JSON.stringify(users));
            dispatch(listUsers())
            // setRows(users)
            setPending(loading)
        } else {
            // Redirect to login page
            navigate('/signin')
        }
        // console.warn(userInfo.user.user_type)
    }, [dispatch, userInfo, navigate])

    return (
    <>
        <SideMenu />
        <FormContainer>
          <Header headerTitle={headerTitle} />
            <Button variant="primary" size="sm" className="float-end" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} /> Add New
            </Button>
            <DataTable
                title={headerTitle}
                pagination
                responsive
                columns={columns}
                data={users}
                progressPending={pending}
			    progressComponent={<Loader />}
                selectableRows
                highlightOnHover
                pointerOnHover
                selectableRowsHighlight
            />
          <Footer/>
        </FormContainer>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default UserListScreen