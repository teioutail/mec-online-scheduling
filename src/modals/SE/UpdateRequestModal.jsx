import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Attachment from '../../components/upload/attachment';
import EmployeeUpdateCompletion from '../../components/SE/EmployeeUpdateCompletion';
import { useSelector } from 'react-redux'

const UpdateRequestModal = (props) => {
    const { show , setShow2 } = props
    //   const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow2(false);
    }
    //   const handleShow = () => setShow(true);

  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { loading:calendarDetailsLoading, calendar: { reference_act_type }} = calendarScheduleDetailsInfo

  // Fields
  const [srNo, setSrNo] = useState()
  const [actionsTaken, setActionsTaken] = useState()
  const [findings, setFindings] = useState()
  const [pending, setPending] = useState()
  const [recommendation, setRecommendation] = useState()
  const [remarks, setRemarks] = useState()
  const [conforme, setConforme] = useState()
  const [srAttachment, setSrAttachment] = useState([])

  // 
  const onFileChange = (files) => {
    setSrAttachment(files)
    // console.warn(srAttachment)
  }

    // Fields
    const [fields, setFields] = useState({
        sr_no: '',
        actions_taken: '',
        findings: '',
        pending: '',
        recommendation: '',
        remarks: '',
        conforme: '',
        attachment: [],
        // id: artid,
        // ar_id: '',
        // activity_type: '',
        // activity_related_to: '',
        // destination: '',
        // request_for_dtc: '',
        // purpose_of_activity: '',
        // remarks: '',
        // employee_list:[],
        // netsuite_link: '',
        // srAtt: '',
    })

    /**
     * - Value Setter
    */
    const changeValueHandler = (fieldName, value) => {
        const newField = fields
        newField[fieldName] = value
        setFields(newField)
    }
    

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        size='lg' 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
        <Modal.Header closeButton>
          <Modal.Title>Update Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group>
                    <Form.Label>SR No.</Form.Label>  
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='SR No.'
                        value={srNo}
                        onChange={(e) => {
                            changeValueHandler('sr_no', e.target.value)
                            setSrNo(e.target.value)
                            // setNewScheduleFields(fields)
                            console.warn(fields)
                        }}
                    />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Form.Group>
                        <Form.Label>Actions Taken</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="textarea" 
                            rows={2}
                            value={actionsTaken}
                            onChange={(e) => {
                                changeValueHandler('actions_taken', e.target.value)
                                setActionsTaken(e.target.value)
                                // setNewScheduleFields(fields)
                                console.warn(fields)
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group>
                        <Form.Label>Findings</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="textarea" 
                            rows={2}
                            value={findings}
                            onChange={(e) => {
                                changeValueHandler('findings', e.target.value)
                                setFindings(e.target.value)
                                console.warn(fields)
                                // setNewScheduleFields(fields)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group>
                        <Form.Label>Pending</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="textarea" 
                            rows={2}
                            value={pending}
                            onChange={(e) => {
                                changeValueHandler('pending', e.target.value)
                                setPending(e.target.value)
                                console.warn(fields)
                                // setNewScheduleFields(fields)
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group>
                        <Form.Label>Recommendation</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="textarea" 
                            rows={2}
                            value={recommendation}
                            onChange={(e) => {
                                changeValueHandler('recommendation', e.target.value)
                                setRecommendation(e.target.value)
                                // setNewScheduleFields(fields)
                                console.warn(fields)
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <Form.Group>
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control 
                            size="sm"
                            as="textarea" 
                            rows={2}
                            value={remarks}
                            onChange={(e) => {
                                changeValueHandler('remarks', e.target.value)
                                setRemarks(e.target.value)
                                // setNewScheduleFields(fields)
                                console.warn(fields)
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Form.Group>
                    <Form.Label>Conforme</Form.Label>  
                    <Form.Control 
                        size='sm'
                        type='text'
                        placeholder='Conforme'
                        value={conforme}
                        onChange={(e) => {
                            changeValueHandler('conforme', e.target.value)
                            setConforme(e.target.value)
                            // setNewScheduleFields(fields)
                            console.warn(fields)
                        }}
                    />
                    </Form.Group>
                </Col>
            </Row>

            <EmployeeUpdateCompletion
                mode='Edit'
            />
            
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Form.Label>SR Attachment</Form.Label>  
                    <Attachment
                        // onFileChange={(files) => onFileChange(files)}
                        onFileChange={(e) => {
                            onFileChange(e)
                            changeValueHandler('attachment', e)
                            console.warn(fields)
                            // setNewScheduleFields(fields)
                        }}
                    />
                </Col>
            </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn bg-gradient-primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateRequestModal