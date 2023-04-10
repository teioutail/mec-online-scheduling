import React from 'react'
import Header from '../components/template/Header'
import Footer from '../components/template/Footer'
import SideMenu from '../components/template/SideMenu'
import FormContainer from '../components/template/FormContainer'
import Content from '../components/template/Content'

const HomeScreen = () => {

  return (
    <>
      {/* <SideMenu /> */}
        <FormContainer>
          <Header />
            {/* Home Page Content Here */}
          <Footer />
        </FormContainer>
    </>

  )

}

export default HomeScreen