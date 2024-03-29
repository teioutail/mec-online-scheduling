import React, { useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap' 
// import EmployeeListOption from './EmployeeListOption'
import EmployeeListOptionTable from './EmployeeListOptionTable'
import DatePicker from 'react-datepicker'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
// import TimeRangePicker from '@wojtekmaj/react-timerange-picker/dist/entry.nostyle';
import 'react-datepicker/dist/react-datepicker.css'
import EditBusinessUnitOption from './EditBusinessUnitOption'
import TrainerNameOption from './TrainerNameOption'
import moment from 'moment'

const TrainingSchedule = (props) => {
  //
  const { 
    artid, calendarScheduleDetails, 
    setTrainingFields, mode,
    scheduleType,
  } = props

  // useState
  const [trainingType, setTrainingType] = useState('')
  const [trainingTopic, setTrainingTopic] = useState('')
  const [trainer, setTrainer] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [trainingSchedule, setTrainingSchedule] = useState([new Date(), new Date()])
  const [startDate, endDate] = trainingSchedule
  //   const [dateRange, setDateRange] = useState([new Date(), new Date()])
  //   const [startDate, endDate] = dateRange
  const [venue, setVenue] = useState('')
  const [siteAddress, setSiteAddress] = useState('')
  const [purposeOfActivity, setPurposeOfActivity] = useState('')
  const [remarks, setRemarks] = useState('')
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])
  const [duration, setDuration] = useState(['09:00', '18:00'])
  // Selected Trainer Names 
  const [selectedTrainerNames, setSelectedTrainerNames] = useState([])
  // Selected Employee Names
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])
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
    site_address: '',
    duration: '',
    trainer: '',
    training_type: '',
    training_topic: '', 
    training_schedule: '',
    purpose_of_activity:'',
    trainer_name: [],
    business_unit: [],
    employee_list: [],
    id: artid,
  })
  
  /**
   * - Value Setter
   */
  const changeValueHandler = (fieldName, value) => {
    const newField = fields
    newField[fieldName] = value
    setFields(newField)
  }

    // Get Edit Details
    useEffect(() => {
        // Selected Calendar Details
        if(mode === 'Edit') {
            // 
            const {  
                art_id,
                sched_type,
                purpose_of_activity,
                remarks,
                ar_id,
                user_id,
                fields:fieldval,
                business_unit,
                trainers,
                persons,
                employee_list,
            } = calendarScheduleDetails

            // Fields
            const { 
               training_type,
               training_topic,
               trainer,
               venue,
               duration,
               site_address,
               training_schedule,
               business_unit:trainingBU,
            } = fieldval

            // setState
            setTrainer(trainer || '')
            setRemarks(remarks || '')
            setTrainingType(training_type || '')
            setPurposeOfActivity(purpose_of_activity || '')
            setTrainingTopic(training_topic || '')
            setVenue(venue || '')
            setDuration(duration || '')
            setSiteAddress(site_address || '')
            setSelectedBusinessUnit(trainingBU || '')
            // setTrainingSchedule(moment(training_schedule).toDate() || [])
            setSelectedTrainerNames(trainers || '')
            // setSelectedEmployeeNames(persons || '')
            setSelectedEmployeeNames(employee_list || '')

            if(training_schedule)
            setTrainingSchedule([moment(training_schedule[0]).toDate(), moment(training_schedule[1]).toDate()] || [])
            // setDestinationListOptions(currentDestination || '')
        }

    }, [calendarScheduleDetails])

    // 
    useEffect(() => {
        changeValueHandler('venue', venue)
        changeValueHandler('site_address', siteAddress)
        changeValueHandler('duration', duration)
        changeValueHandler('trainer', trainer)
        changeValueHandler('training_type', trainingType)
        changeValueHandler('training_topic', trainingTopic)
        changeValueHandler('training_schedule', trainingSchedule)
        changeValueHandler('purpose_of_activity', purposeOfActivity)
        changeValueHandler('trainer_name', selectedTrainerNames)
        changeValueHandler('business_unit', selectedBusinessUnit)
        changeValueHandler('remarks', remarks)
        changeValueHandler('employee_list', selectedEmployeeNames)
        setTrainingFields(fields)
    },[venue,
        trainer,
        trainingType,
        trainingTopic,
        trainingSchedule,
        purposeOfActivity,
        selectedTrainerNames,
        selectedBusinessUnit,
        remarks,
        selectedEmployeeNames,
        siteAddress,
        duration,
    ])
    
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
                    defaultValue={trainer}
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
                            options={(participants)} // balikan mo to di nag shoshow yung participatns
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
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>{trainer === 'Exam' ? 'Exam' : 'Training'} Topics</Form.Label>
                <Form.Control 
                    size='sm'
                    as="textarea"
                    // placeholder='Training Topic'
                    rows={3} 
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
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        // setDateRange(update);
                        setTrainingSchedule(update)
                        changeValueHandler('training_schedule', trainingSchedule)
                        setTrainingFields(fields)
                    }}
                    isClearable={true}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                    <br />
                    <TimeRangePicker 
                        className='form-control form-control-sm'
                        onChange={time => setDuration(time)}
                        value={duration}
                        clearIcon={null}
                        clockIcon={null}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
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
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Site Address</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Site Address'
                    value={siteAddress}
                    onChange={(e) => { 
                        setSiteAddress(e.target.value)
                        changeValueHandler('site_address', e.target.value)
                        setTrainingFields(fields)
                    }}
                />
                </Form.Group>
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
                    <Form.Label>Business Unit</Form.Label>
                    <EditBusinessUnitOption 
                        changeValueHandler={changeValueHandler}
                        selectedBusinessUnit={selectedBusinessUnit}
                        setSelectedBusinessUnit={setSelectedBusinessUnit}
                        mode={mode}
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

        {/* <EmployeeListOption 
            training_type={trainingType}
            calendarScheduleDetails={calendarScheduleDetails}
            changeValueHandler={changeValueHandler}
            selectedEmployeeNames={selectedEmployeeNames}
            setSelectedEmployeeNames={setSelectedEmployeeNames}
            mode={mode}
            scheduleType={scheduleType}
        /> */}

        <EmployeeListOptionTable
            training_type={trainingType}
            calendarScheduleDetails={calendarScheduleDetails}
            changeValueHandler={changeValueHandler}
            selectedEmployeeNames={selectedEmployeeNames}
            setSelectedEmployeeNames={setSelectedEmployeeNames}
            mode={mode}
            scheduleType={scheduleType}
        />

    </>
  )
}

export default TrainingSchedule