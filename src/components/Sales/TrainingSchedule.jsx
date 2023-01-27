import React from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'

const TrainingSchedule = () => {

  // 
  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Training Type</Form.Label>
                <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Certification">Certification</option>
                <option value="Non-Certification">Non-Certification</option>
                <option value="Soft-Skills">Soft-Skills</option>
                <option value="Training-Schedule">Tech Training For Non-Tech</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Training Topic</Form.Label>
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Training Topic'
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
                />
              </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Trainer</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="SE">SE</option>
                <option value="Principal">Principal</option>
                <option value="Others">Others</option>
                <option value="Exam">Exam</option>
                <option value="Online Training">Online Training</option>
                <option value="Sales">Sales</option>
                <option value="Webinar">Webinar</option>
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
                <option value="On-Site">On-Site</option>
                <option value="In-House">In-House</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label></Form.Label>
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
                <option value="Partner">Partner</option>
                <option value="End-user">End-user</option>
                <option value="MEC Office">MEC Office</option>
                <option value="Others">Others</option>
                {/* if others text field will show */}
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
                <option value="Yes">Yes</option>
                <option value="No">No</option>
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

        <EmployeeListOption 

        />
    </>
  )
}

export default TrainingSchedule