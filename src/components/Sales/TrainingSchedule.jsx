import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import EditBusinessUnitOption from './EditBusinessUnitOption'
import TrainerNameOption from './TrainerNameOption'

const TrainingSchedule = ({ scheduleDetails }, ref) => {
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

  // Participants Email List
  const userEmail = useSelector(state => state.userEmail)
  const { emails:participants } = userEmail
  
  /**
   * - Handle Trainer Option
   */
  const handleTrainer = (state) => {
    setTrainer(state.target.value)
    // Filter Users
    
    let filtered = participants.filter(row => row.role === "Engineer")
    // console.warn(filtered)
    setTrainerName(filtered)
  }

  // useRef
  const trainingScheduleRef = useRef()
  const trainingTypeRef = useRef()
  const trainingTopicRef = useRef()
  const trainerRef = useRef()
  const trainerNameRef = useRef()
  const venueRef = useRef()
  const purposeOfActivityRef = useRef()
  const remarksRef = useRef()
  
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

  // Pass the reference value
  useImperativeHandle(ref, () => {
    console.warn(trainerNameRef)

    // Get field values
    let handle = {
        trainingType: trainingTypeRef.current.value,
        trainingTopic: trainingTopicRef.current.value,
        trainer: trainerRef.current.value,
        venue: venueRef.current.value,
        trainingSchedule: trainingSchedule,
        purposeOfActivity: purposeOfActivityRef.current.value,
        remarks: remarksRef.current.value,
    }

    // Add Trainer Name
    if(trainerNameRef.current !== undefined || trainerNameRef.current !== null) {
        handle.trainerName = trainerNameRef.current
        // handle.trainerName = 'abcsadfjakfjasfjlkasjdfkl'
    }
    
    // 
    return handle
  })

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
                    onChange={handleTrainer}
                    ref={trainerRef}
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
                            trainer={trainer}
                            trainerNames={trainerName}
                            ref={trainerNameRef}
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
                    onChange={(e) => setTrainingType(e.target.value)}
                    ref={trainingTypeRef}
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
                    onChange={(e) => setTrainingTopic(e.target.value)}
                    ref={trainingTopicRef}
                />
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
                    ref={trainingScheduleRef}
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
                    onChange={(e) => setVenue(e.target.value)}
                    ref={venueRef}
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
                    onChange={(e) => setPurposeOfActivity(e.target.value)}
                    ref={purposeOfActivityRef}
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
                        onChange={(e) => setRemarks(e.target.value)}
                        ref={remarksRef}
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