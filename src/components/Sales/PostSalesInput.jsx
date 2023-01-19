import { Row, Col, Form, } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const PostSalesInput = () => {

  return (
    <>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Project Number</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Project Number'
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Case Number</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Case Number'
                    // value={projectedAmount}
                    // onChange={(e) => setProjectedAmount(e.target.value)}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>SA Number</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='SA Number'
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Netsuite Link</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Netsuite Link'
                    // value={projectedAmount}
                    // onChange={(e) => setProjectedAmount(e.target.value)}
                />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default PostSalesInput