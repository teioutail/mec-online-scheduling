import React from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 

const NewScheduleRequest = () => {
  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>SR/AR No.</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='SR/AR No.'
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Reference ID</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Type</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Related To</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Destination Details</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Schedule</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Request for DTC?</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="New-Schedule">New Schedule Request</option>
                <option value="Training-Schedule">Training Schedule</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Purpose of Activity</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={2} 
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default NewScheduleRequest