import React from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import Content from '../components/template/Content'

const RoleListScreen = () => {
    //
    const headerTitle = 'Role List'

    
    return (
        <>
            <SideMenu />
            <FormContainer>
                <Header headerTitle={headerTitle} />
                <div>testing</div>
                <Footer />
            </FormContainer>
        </>
    )
    
}

export default RoleListScreen