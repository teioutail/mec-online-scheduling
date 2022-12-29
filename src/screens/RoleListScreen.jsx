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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { listRoles } from '../actions/roleActions'

const RoleListScreen = () => {
    //
    const headerTitle = 'Role List'
    // Redux
    const dispatch = useDispatch()

    // useNavigate to redirect the user
    const navigate = useNavigate() 

    // User Info
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

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
            }
		],
		[],
	);

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
                    columns={columns}
                    // data={rows}
                    // progressPending={pending}
                    pagination
                    responsive
                    progressComponent={<Loader />}
                    highlightOnHover
                    pointerOnHover
                    selectableRowsHighlight
                />

                <Footer />
            </FormContainer>
        </>
    )

}

export default RoleListScreen