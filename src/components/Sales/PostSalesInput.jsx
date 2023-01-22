import { Row, Col, Form, } from 'react-bootstrap'
import React, { useState, useImperativeHandle, useRef } from 'react'

const PostSalesInput = ({}, ref) => {
  // useRef
  const projectNoRef = useRef()
  const caseNoRef = useRef()
  const saNoRef = useRef()
  const netsuitLinkRef = useRef()

  // useState
  const [projectNo, setProjectNo] = useState('')
  const [caseNo, setCaseNo] = useState('')
  const [saNo, setSaNo] = useState('')
  const [netsuiteLink, setNetsuiteLink] = useState('')
  
  // Pass reference value
  useImperativeHandle(ref, () => {
    // Get the field values
    return {
        projectNo: projectNoRef.current.value,
        caseNo: caseNoRef.current.value,
        saNo: saNoRef.current.value,
        netsuitLink: netsuitLinkRef.current.value,
    }
  })

  return (
    <>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Project No</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    id='project_number'
                    placeholder='Project Number'
                    value={projectNo}
                    ref={projectNoRef}
                    onChange={(e) => setProjectNo(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Case No</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    id='case_number'
                    placeholder='Case Number'
                    value={caseNo}
                    onChange={(e) => setCaseNo(e.target.value)}
                    ref={caseNoRef}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>SA No</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    id='sa_number'
                    placeholder='SA Number'
                    value={saNo}
                    onChange={(e) => setSaNo(e.target.value)}
                    ref={saNoRef}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Netsuite Link</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    id='netsuite_link'
                    placeholder='Netsuite Link'
                    value={netsuiteLink}
                    onChange={(e) => setNetsuiteLink(e.target.value)}
                    ref={netsuitLinkRef}
                />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default React.forwardRef(PostSalesInput)