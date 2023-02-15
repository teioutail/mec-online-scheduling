import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EditBusinessUnitOption from './EditBusinessUnitOption'
import TrainerNameOption from './TrainerNameOption'

const TrainingSchedule = ({ scheduleDetails, setTrainingFields }) => {
  // useState
  const [trainingType, setTrainingType] = useState('')
  const [trainingTopic, setTrainingTopic] = useState('')
  const [trainer, setTrainer] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [trainingSchedule, setTrainingSchedule] = useState(new Date());
  const [venue, setVenue] = useState('')
  const [purposeOfActivity, setPurposeOfActivity] = useState('')
  const [remarks, setRemarks] = useState('')
  //   const [businessUnit, setBusinessUnit] = useState([])

  // Selected Trainer Names 
  const [selectedTrainerNames, setSelectedTrainerNames] = useState([])

//   console.log(selectedTrainerNames, 'asd123');
  // Participants Email List
  const userEmail = useSelector(state => state.userEmail)
  const { emails:participants } = userEmail
  
  /**
   * - Handle Trainer Option
   */
  const handleTrainer = (state) => {
    setTrainer(state.target.value)
    // Filter Users
    let filtered = participants.filter(row => row.role === 'Engineer')
    // console.warn(filtered)
    setTrainerName(filtered)
  }

  // Fields 
  const [fields, setFields] = useState({
    venue: '',
    trainer: '',
    training_type: '',
    training_topic: '', 
    training_schedule: '',
    purpose_of_activity:'',
    trainer_name: [],
    business_unit: [],
  })
  
  /**
   * - Value Setter
   */
  const changeValueHandler = (fieldName, value) => {
    const newField = fields; 
    newField[fieldName] = value;
    setFields(newField)
  }

  // 
  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Trainer</Form.Label>
                <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                    value={trainer}
                    onChange={(e) => { 
                        handleTrainer(e)
                        setTrainer(e.target.value)
                        changeValueHandler('trainer', e.target.value)
                        setTrainingFields(fields)
                    }}
                >
                <option value="-">- Select -</option>
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
                {(trainer !== 'Exam' && trainer !== '') && <>
                    <Form.Group className="mb-3">
                    <Form.Label>Trainer Name</Form.Label>
                        <TrainerNameOption 
                            selectedTrainerNames={selectedTrainerNames}
                            setSelectedTrainerNames={setSelectedTrainerNames}
                            trainer={trainer}
                            trainerNames={trainerName}
                            changeValueHandler={changeValueHandler}
                        />
                    </Form.Group>
                </>}
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Training Type</Form.Label>
                <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                    value={trainingType}
                    onChange={(e) => { 
                        setTrainingType(e.target.value);
                        changeValueHandler('training_type', e.target.value)
                        setTrainingFields(fields)
                    }}
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
                    value={trainingTopic}
                    onChange={(e) => { 
                        setTrainingTopic(e.target.value)
                        changeValueHandler('training_topic', e.target.value)
                        setTrainingFields(fields)
                    }}
                />
              </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Training Schedule</Form.Label>
                <DatePicker
                    className='form-control form-control-sm'
                    selected={trainingSchedule} 
                    onChange={(date) => { 
                        setTrainingSchedule(date)
                        changeValueHandler('training_schedule', trainingSchedule)
                        setTrainingFields(fields)
                    }}
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
                    value={venue}
                    onChange={(e) => { 
                        setVenue(e.target.value)
                        changeValueHandler('venue', e.target.value)
                        setTrainingFields(fields)
                    }}
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
                    value={purposeOfActivity}
                    onChange={(e) => { 
                        setPurposeOfActivity(e.target.value)
                        changeValueHandler('purpose_of_activity', e.target.value);
                        setTrainingFields(fields)
                    }}
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
                        value={remarks}
                        onChange={(e) => { 
                            setRemarks(e.target.value)
                            changeValueHandler('remarks', e.target.value)
                            setTrainingFields(fields)
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Business Unit</Form.Label>
                    <EditBusinessUnitOption 
                        changeValueHandler={changeValueHandler}
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

export default TrainingSchedule