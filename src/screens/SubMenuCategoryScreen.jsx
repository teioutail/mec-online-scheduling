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
    listSubMenuCategories,
    getSubMenuCategoryDetails,
    deleteSubMenuCategory,
} from '../actions/menuSubCategoryAction'
import { 
    faPlus,
    faEllipsisV,
    faTrash,
    faUserPen,
} from '@fortawesome/free-solid-svg-icons'
import { 
    SUB_CATEGORY_DETAILS_RESET
} from '../constants/menuSubCategoryConstants'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SubMenuCategoryModal from '../modals/Menu/SubMenuCategoryModal'
import { 
    getMenuCategoryOptions,
} from '../actions/menuCategoryActions'

const SubMenuCategoryScreen = () => {
    // CommonJS
    const Swal = require('sweetalert2')
    //
    const headerTitle = 'Sub-Menu Categories'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // Sub-Menu Category List
    const submenuCategoryList = useSelector(state => state.submenuCategoryList)
    const { loading, error, subcategories } = submenuCategoryList

    // Menu Category Options
    const menuCategoryOption = useSelector(state => state.menuCategoryOption)
    const { loading:loadingOption, categories } = menuCategoryOption

    // User Login Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // Menu Sub Category Details
    const submenuCategoryDetails = useSelector(state => state.submenuCategoryDetails)
    const { subcategory: submenuCategoryDetail } = submenuCategoryDetails

    // Datatables
    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])

    // EditRoleModal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Global ID
    const [subcatid, setSubCatId] = useState('')
    const [mode, setMode] = useState('')

    // Menu Category
    const handleMenuCategoryView = (state) => {
        // Show Modal
        handleShow()
        // setMode State to Add
        setMode('Add')
        //
        dispatch({
            type: SUB_CATEGORY_DETAILS_RESET,
        })
    }

    // Edit Sub-Menu Category 
    const handleEditSubMenuCategoryView = (state) => {
        setShow(true)
        setSubCatId(state.target.id)
        setMode('Edit')
        // alert(state.target.id);
        // Call API Here...
        dispatch(getSubMenuCategoryDetails(state.target.id))
    }

    // Delete Role
    const handleDeleteMenuSubCategory = (state) => {
        // Save Change Here...
        Swal.fire({
            title: 'Delete this Menu Category?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Proceed!'
        }).then((result) => {
            //
            if (result.isConfirmed) {
                // Delete Sub-Menu Category
                dispatch(deleteSubMenuCategory(state.target.id))
                // Refresh Datatable
                dispatch(listSubMenuCategories())
                // Show Success Request
                Swal.fire(
                    'Success!',
                    'Menu Category Successfully Deleted.',
                    'success'
                )
            }
        })
    }

    // Columns
    const columns = useMemo(
		() => [
            {   name: 'Sub-Category ID',
                selector: row => row.subcat_id,
                sortable: true,
            },
            {   name: 'Sub-Category Name',
                selector: row => row.subcategory_name,
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
                name: 'Category',
                selector: row => row.cat_id,
                sortable: true,
            },
            {
                name: 'Action',
				cell: (row) => {
                    // console.log(row.id);
                    return <>
                        {/* <div className="dropdown" style={{ position: 'absolute', zIndex: '1' }}> */}
                        <div className="dropdown">
                            <button className="btn btn-link" id={row.subcat_id} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={handleEditSubMenuCategoryView} id={row.subcat_id}>
                                        <FontAwesomeIcon icon={faUserPen} /> Edit Sub-Category
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={handleDeleteMenuSubCategory} id={row.subcat_id}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete Sub-Category
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
        setRows(subcategories)
        setPending(loading)
    }, [subcategories, rows, loading])

    //
    useEffect(() => {
        // Check if user is admin else, Redirect user
        if(userInfo && userInfo.user.user_type === 6) {
            // console.warn(JSON.stringify(users));
            dispatch(listSubMenuCategories())
            // Get Menu Categories
            dispatch(getMenuCategoryOptions())
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
                    <Button variant="btn bg-gradient-info" size="sm" className="z-3 float-end" onClick={handleMenuCategoryView}>
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

                <SubMenuCategoryModal 
                    show={show} 
                    onHide={handleClose} 
                    subcatid={subcatid}
                    submenuCategoryDetails={submenuCategoryDetail}
                    menuCategoryOptions={categories}
                    mode={mode}
                />

                <Footer />
            </FormContainer>
        </>
    )
}

export default SubMenuCategoryScreen