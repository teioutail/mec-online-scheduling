import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Attachment from '../../components/upload/attachment';
import EmployeeUpdateCompletion from '../../components/SE/EmployeeUpdateCompletion';
import { useSelector } from 'react-redux'

const UpdateRequestModal = (props) => {

    const { show } = props
    
// 
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { loading:calendarDetailsLoading, calendar: { reference_act_type }} = calendarScheduleDetailsInfo

  // Fields
  const [srAttachment, setSrAttachment] = useState([])
  const [srNo, setSrNo] = useState()
  const [actionsTaken, setActionsTaken] = useState()
  const [findings, setFindings] = useState()
  const [pending, setPending] = useState()
  const [recommendation, setRecommendation] = useState()
  const [remarks, setRemarks] = useState()
  const [conforme, setConforme] = useState()
  // 
  const onFileChange = (files) => {
    setSrAttachment(files)
    // console.warn(srAttachment)
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        size='lg' 
        show={show}
        onHide={show}
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
                        // placeholder='Netsuite Link'
                        // value={netsuiteLink}
                        // onChange={(e) => {
                        //     changeValueHandler('netsuite_link', e.target.valufse)
                        //     setNetsuitLink(e.target.value)
                        //     setNewScheduleFields(fields)
                        // }}
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
                            // value={remarks}
                            // onChange={(e) => {
                            //     changeValueHandler('remarks', e.target.value)
                            //     setRemarks(e.target.value)
                            //     setNewScheduleFields(fields)
                            // }}
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
                            // value={remarks}
                            // onChange={(e) => {
                            //     changeValueHandler('remarks', e.target.value)
                            //     setRemarks(e.target.value)
                            //     setNewScheduleFields(fields)
                            // }}
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
                            // value={remarks}
                            // onChange={(e) => {
                            //     changeValueHandler('remarks', e.target.value)
                            //     setRemarks(e.target.value)
                            //     setNewScheduleFields(fields)
                            // }}
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
                            // value={remarks}
                            // onChange={(e) => {
                            //     changeValueHandler('remarks', e.target.value)
                            //     setRemarks(e.target.value)
                            //     setNewScheduleFields(fields)
                            // }}
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
                            // value={remarks}
                            // onChange={(e) => {
                            //     changeValueHandler('remarks', e.target.value)
                            //     setRemarks(e.target.value)
                            //     setNewScheduleFields(fields)
                            // }}
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
                        // placeholder='Netsuite Link'
                        // value={netsuiteLink}
                        // onChange={(e) => {
                        //     changeValueHandler('netsuite_link', e.target.value)
                        //     setNetsuitLink(e.target.value)
                        //     setNewScheduleFields(fields)
                        // }}
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
                        onFileChange={(files) => onFileChange(files)}
                    />
                </Col>
            </Row>

        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="btn bg-gradient-primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateRequestModal