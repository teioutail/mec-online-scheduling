import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import Attachment from '../../components/upload/attachment';
import EmployeeUpdateCompletion from '../../components/SE/EmployeeUpdateCompletion';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { 
    createActivityUpdateRequest,
} from '../../actions/SE/seActivityUpdateAction';
import { listCalendarSchedule } from '../../actions/Sales/salesCalendarScheduleAction';
import { ACTIVITY_UPDATE_CREATE_RESET } from '../../constants/SE/seActivityUpdateConstants';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const UpdateRequestModal = (props) => {
  // 
  const { 
    show , 
    setShow2,
    onHide,
  } = props
  // 
  const handleClose = () => {
    setShow2(false);
  }
  // Redux
  const dispatch = useDispatch()
  // Calendar Schedule Details
  const calendarScheduleDetailsInfo = useSelector(state => state.calendarScheduleDetails)
  const { calendar: { art_id, status }} = calendarScheduleDetailsInfo
  // Activity Schedule Create Success Message
  const seActivityUpdateCreate = useSelector(state => state.seActivityUpdateCreate)
  const { success:seActivityUpdateCreateSuccess, message:seActivityUpdateCreateMessage } = seActivityUpdateCreate
    // Activity Schedule Create Success Message
    const seActivityUpdateDetails = useSelector(state => state.seActivityUpdateDetails)
    const { loading:seActivityUpdateDetailsLoading } = seActivityUpdateDetails
  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // CommonJS
  const Swal = require('sweetalert2')
  // Fields
  const [srNo, setSrNo] = useState('')
  const [actionsTaken, setActionsTaken] = useState('')
  const [findings, setFindings] = useState('')
  const [pending, setPending] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [remarks, setRemarks] = useState('')
  const [conforme, setConforme] = useState('')
  const [srAttachment, setSrAttachment] = useState([])
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])
  // File Handler
  const onFileChange = (files) => {
    setSrAttachment(files)
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
            let data = {
                ...fields, 
                art_id: art_id,
                updated_by: userInfo.user.id,
            }
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
    })

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
        const { activity:{
            sr_no, 
            // art_id, 
            actions_taken,
            findings,
            pending,
            recommendation,
            remarks,
            conforme,
            attachment
        } } = seActivityUpdateDetails

        // Set State
        setSrNo(sr_no || '')
        setActionsTaken(actions_taken || '')
        setFindings(findings || '')
        setPending(pending || '')
        setRecommendation(recommendation || '')
        setRemarks(remarks || '')
        setConforme(conforme || '')
        setSrAttachment(attachment || '')

    },[seActivityUpdateDetails])

    // Show sweet alert message
    useEffect(() => {
        // Show Success Adding of new records
        if(seActivityUpdateCreateSuccess) {
            Swal.fire(
                'Success!',
                seActivityUpdateCreateMessage,
                'success'
            )
            // Refresh Datatable
            dispatch(listCalendarSchedule())
            // 
            dispatch({
                type: ACTIVITY_UPDATE_CREATE_RESET,
            })
            // Close Both Modals
            handleClose()
            onHide()
        }

    },[seActivityUpdateCreateSuccess,
    seActivityUpdateCreateMessage]);

  return (
    <>
        <Modal
            size='lg'
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
        
        <Modal.Header closeButton>
          <Modal.Title>Updates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { seActivityUpdateDetailsLoading ? <Loader /> : 
            <>
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

            { ! ['Completed'].includes(status) ? 
                <>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Form.Label>SR Attachment</Form.Label> 
                            <Attachment
                                // onFileChange={(files) => onFileChange(files)}
                                onFileChange={(files) => {
                                    onFileChange(files)
                                    changeValueHandler('attachment', files)
                                }}
                            />
                        </Col>
                    </Row>
                </> : 
                <>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Form.Label>Attached Files</Form.Label> 
                            { ! srAttachment ? <></> : srAttachment.map((file, index) => {
                                return (
                                <p className='text-sm text-info text-gradient' key={index}>
                                    {/* <Link className="nav-link" download to={file}>
                                        <FontAwesomeIcon className="me-2" icon={['fas', 'file']} /> {file}
                                    </Link> */}
                                    <a className="nav-link" download href={file}>
                                        <FontAwesomeIcon className="me-2" icon={['fas', 'file']} /> {file}
                                    </a>
                                </p>)
                            })}
                        </Col>
                    </Row>
                </>
            }
            </>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          { ! ['Completed'].includes(status) && <Button variant="btn bg-gradient-primary" onClick={handleSubmit}>Update</Button> }

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateRequestModal