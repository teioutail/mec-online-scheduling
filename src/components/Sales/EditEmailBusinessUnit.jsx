import React from 'react'
import { Row, Col, Form, } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const EditEmailBusinessUnit = ({ sampleFunc }) => {
    // setState
    // const [businessUnit, setBusinessUnit] = useState('')

    // 
    const businessUnit = (e) => {
        sampleFunc(e)
    }

  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Select Activity</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={activityType}
                    onChange={(e) => businessUnit(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Post-Sales">Post-Sales Activity</option>
                <option value="Pre-Sales">Pre-Sales Activity</option>
                </Form.Control>
                </Form.Group>
                </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Select Activity</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={activityType}
                    // onChange={(e) => setActivityType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Post-Sales">Post-Sales Activity</option>
                <option value="Pre-Sales">Pre-Sales Activity</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    </>
  )

}

export default EditEmailBusinessUnit