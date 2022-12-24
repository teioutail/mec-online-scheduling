import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="container-fluid py-4">
        { children }
      </div>
    </main>
  )
}

export default FormContainer