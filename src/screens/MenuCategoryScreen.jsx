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
    listMenuCategories,
    getMenuCategoryDetails,
} from '../actions/menuCategoryActions'
import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserPen,
} from '@fortawesome/free-solid-svg-icons'
import { 
    MENU_CATEGORY_DETAILS_RESET,
} from '../constants/menuCategoryConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import MenuCategoryModal from '../modals/Menu/MenuCategoryModal'

const MenuCategoryScreen = () => {
    // CommonJS
    const Swal = require('sweetalert2')
    //
    const headerTitle = 'Menu Categories'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Menu Category List
    const menuCategoryList = useSelector(state => state.menuCategoryList)
    const { loading, error, categories } = menuCategoryList

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Menu Category Details
    const menuCategoryDetails = useSelector(state => state.menuCategoryDetails)
    const { category: menuCategoryDetail } = menuCategoryDetails

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])

    // EditRoleModal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [catid, setCatId] = useState('')
    const [mode, setMode] = useState('')

    // Add User Modal
    const handleMenuCategoryView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: MENU_CATEGORY_DETAILS_RESET,
        })
    }

    // Edit Menu Category 
    const handleEditMenuCategoryView = (state) => {
        setShow(true)
        setCatId(state.target.id)
        setMode('Edit')
        // alert(state.target.id);
        // Call API Here...
        dispatch(getMenuCategoryDetails(state.target.id))
    }

    // Delete Role
    const handleDeleteRole = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this role?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Role
                // dispatch(deleteRole(state.target.id))
                // Refresh Datatable
                // dispatch(listRoles())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Role Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Category ID',
                selector: row => row.cat_id,
                sortable: true,
            },
            {   name: 'Category Name',
                selector: row => row.category_name,
                sortable: true,
            },
            {
                name: 'URL',
                selector: row => row.url,
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => row.status,
                sortable: true,
            },
            {
                name: 'Icon',
                selector: row => row.icon,
                sortable: true,
            },
            {
                name: 'Sort',
                selector: row => row.sort,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.cat_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditMenuCategoryView} id={row.cat_id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit Category
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteRole} id={row.cat_id}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete Category
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
        setRows(categories)
        setPending(loading)
    }, [categories, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, Redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // console.warn(JSON.stringify(users));
            dispatch(listMenuCategories())
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
                    <Button variant="primary" size="sm" className="float-end" onClick={handleMenuCategoryView}>
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

                <MenuCategoryModal 
                    show={show} 
                    onHide={handleClose} 
                    catid={catid}
                    menuCategoryDetails={menuCategoryDetail}
                    mode={mode}
                />

                <Footer />
            </FormContainer>
        </>
    )
}

export default MenuCategoryScreen