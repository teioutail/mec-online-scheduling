import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Attachment from '../../components/upload/attachment';
import EmployeeUpdateCompletion from '../../components/SE/EmployeeUpdateCompletion';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { createActivityUpdateRequest } from '../../actions/SE/seActivityUpdateAction';

const UpdateRequestModal = (props) => {
  // 
  const { 
    show , 
    setShow2 
  } = props
  
  // 
  const handleClose = () => {
    setShow2(false);
  }

  // Redux
  const dispatch = useDispatch()

  const MAX_COUNT = 5;

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
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);
  // 
  const onFileChange = (files) => {
    setSrAttachment(files)
    // console.warn(files)
  }
  
  // Save test
  const handleSubmit = async () => {
    // Save Change Here...
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Proceed!'
      }).then((result) => {
        if (result.isConfirmed) {
            // Data Object
            let data = {...fields}
            // Save SE Activity Update
            dispatch(createActivityUpdateRequest(data))
        }
      })
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
        employee_list:[],
        // id: artid,
        // ar_id: '',
        // activity_type: '',
        // activity_related_to: '',
        // destination: '',
        // request_for_dtc: '',
        // purpose_of_activity: '',
        // remarks: '',
        // netsuite_link: '',
        // srAtt: '',
    })

    // 
    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }
    
    const handleFileEvent =  (e) => {
        // const chosenFiles = Array.prototype.slice.call(e.target.files)
        const chosenFiles = Array.prototype.slice.call(e)
        // console.warn(chosenFiles)
        handleUploadFiles(chosenFiles);
    }

    /**
     * - Value Setter
    */
    const changeValueHandler = (fieldName, value) => {
        const newField = fields
        newField[fieldName] = value
        setFields(newField)
    }

    // 
    useEffect(() => {
        //
        changeValueHandler('sr_no', srNo)
        changeValueHandler('actions_taken', actionsTaken)
        changeValueHandler('findings', findings)
        changeValueHandler('pending', pending)
        changeValueHandler('recommendation', recommendation)
        changeValueHandler('remarks', remarks)
        changeValueHandler('conforme', conforme)
        changeValueHandler('attachment', srAttachment)
        // changeValueHandler('employee_list', activitySchedule)
    },[])

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
                        }}
                    />
                    </Form.Group>
                </Col>
            </Row>

            <EmployeeUpdateCompletion
                changeValueHandler={changeValueHandler}
                mode='Edit'
                selectedEmployeeNames={selectedEmployeeNames}
                setSelectedEmployeeNames={setSelectedEmployeeNames}
            />
            
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Form.Label>SR Attachment</Form.Label>  
                    <Attachment
                        // onFileChange={(files) => onFileChange(files)}
                        onFileChange={(files) => {
                            onFileChange(files)
                            handleFileEvent(files)
                            // console.warn(files)
                            // const test = files.map(item => {
                            // })
                            changeValueHandler('attachment', files)
                        }}
                    />
                </Col>
            </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="btn bg-gradient-primary" onClick={handleSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateRequestModal