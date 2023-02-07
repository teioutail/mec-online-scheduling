import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EditBusinessUnitOption from './EditBusinessUnitOption'

const TrainingSchedule = ({ scheduleDetails }) => {

  // React-Datepicker
  const [trainingSchedule, setTrainingSchedule] = useState(new Date());

  // Custom Textfield 
  const DatepickerCustomInput = forwardRef(({ value, onClick }, ref) => (
        <Form.Control 
            size='sm'
            type='text'
            placeholder='Activity Schedule'
            defaultValue={value}
            onClick={onClick}
            ref={ref}
        />
    ));

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
                <Form.Label>Trainer Name</Form.Label>
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
                <Form.Label>Training Schedule</Form.Label>
                <DatePicker
                    customInput={<DatepickerCustomInput />}
                    selected={trainingSchedule} 
                    onChange={(date) => setTrainingSchedule(date)} 
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Venue</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Venue'
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Purpose of Activity</Form.Label>
                <Form.Control 
                    size='sm'
                    as="textarea" 
                    rows={2} 
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                        size='sm'
                        as="textarea" 
                        rows={2} 
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Business Unit</Form.Label>
                    <EditBusinessUnitOption 
                        scheduleDetails={scheduleDetails}
                    />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
            </Col>
        </Row>
        <EmployeeListOption />
    </>
  )
}

export default React.forwardRef(TrainingSchedule)