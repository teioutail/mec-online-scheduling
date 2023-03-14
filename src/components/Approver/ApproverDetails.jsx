import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap' 
import { useSelector } from 'react-redux'

const ApproverDetails = ({status, mode}) => {
  // useState 
  const [stats, setStats] = useState('')
  const [modes, setModes] = useState('')
  const [approverName, setApproverName] = useState('')
  const [dateApproved, setDateApproved] = useState('')
  const [reason, setReason] = useState('')

  // Schedule Reference Details
  const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
  const { calendar:calendarScheduleDetail } = calendarScheduleDetails
  
  // 
  useEffect(() => {
    // 
    if(status) {
        setStats(status)
        setModes(mode) 
    }
    // 
    if(calendarScheduleDetail) {
        // 
        const {
            date_approved, 
            approved_by, 
            reasons,
        } = calendarScheduleDetail
        // 
        setApproverName(approved_by)
        setDateApproved(date_approved)
        setReason(reasons)
    }

  },[status, calendarScheduleDetail]) 

  // Change Label Type
  const labelType = (type) => {
    // 
    switch(type) {
        case 'Rejected':
            return 'Rejected'
        case 'Canceled':
            return 'Canceled'
        case 'Approved':
            return 'Approved'
        case 'DELEGATE_POSTSALES_SE_FOR_APPROVAL':
        case 'DELEGATE_PRESALES_SE_FOR_APPROVAL':
            return 'For Approval'
        case 'DELEGATED_POSTSALES_SE_APPROVED':
        case 'DELEGATED_PRESALES_SE_APPROVED':
            return 'Delegated Schedule Approved'
    }
  }
  //
  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>
                    { labelType(stats) } by
                </Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    readOnly={modes}
                    value={approverName}
                    onChange={(e) => setApproverName(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Date { labelType(stats) }</Form.Label>  
                    <Form.Control 
                        size='sm'
                        type='text'
                        readOnly={modes}
                        value={dateApproved}
                        onChange={(e) => setDateApproved(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control 
                        size="sm"
                        as="textarea" 
                        rows={2} 
                        readOnly={modes}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default ApproverDetails
