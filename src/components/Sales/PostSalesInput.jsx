import { Row, Col, Form, } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const PostSalesInput = () => {


  return (
    <>
        <Row>
        <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Project Name'
                        // value={projectName}
                        // onChange={(e) => setProjectName(e.target.value)}
                    />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group className="mb-3">
                    <Form.Label>Projected Amount</Form.Label>
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Projected Amount'
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