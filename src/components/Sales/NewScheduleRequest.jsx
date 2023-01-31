import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'

const NewScheduleRequest = () => {
  // useState
  const [referenceId, setReferenceId] = useState([])

  // Schedule Reference Id List
  const scheduleReferenceIdList = useSelector(state => state.scheduleReferenceIdList)
  const { loading , referenceid } = scheduleReferenceIdList
  
  // activityRelatedToListOption 
  const activityRelatedToListOption = useSelector(state => state.activityRelatedToListOption)
  const { activity:activityOption } = activityRelatedToListOption

  // 
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
                    <Form.Label>Reference Id</Form.Label>
                    <Form.Control
                    as='select' 
                    size='sm'
                    aria-label="Reference Id"
                    // value={categoryid}
                    onChange={(e) => setReferenceId(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    {
                        referenceid.length > 0  && (
                            referenceid.map((row, key) => (
                                <option key={key} value={ row.ar_id }>{ row.reference_id }</option>
                            ))
                        )
                    }
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
                <Form.Label>Activity Related To</Form.Label>
                <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                {
                    activityOption.length > 0  && (
                        activityOption.map((row, key) => (
                            <option key={key} value={ row.artt_id }>{ row.activity }</option>
                        ))
                    )
                }
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

export default NewScheduleRequest