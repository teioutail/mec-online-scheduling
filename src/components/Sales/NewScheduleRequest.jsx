import React, { useState, forwardRef, useEffect } from "react"
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CreateSelect from 'react-select/creatable'
import { reactSelectCustomStyles } from "../../assets/js/custom_style"
import moment from "moment"

const NewScheduleRequest = ({ calendarScheduleDetails, setNewScheduleFields }) => {
  // useState
  const [relatedTeam, setRelatedTeam] = useState('')
  const [destinationListOptions, setDestinationListOptions] = useState([])
  // useState
  const [activitySchedule, setActivitySchedule] = useState(new Date())
  const [srArNo, setSrArNo] = useState('')
  const [referenceId, setReferenceId] = useState('')
  const [activityType, setActivityType] = useState('')
  const [activityRelatedTo, setActivityRelatedTo] = useState('')
  const [destinationDetails, setDestinationDetails] = useState('')
  const [dtc, setDtc] = useState('')
  const [purposeOfActivity, setPurposeOfActivity] = useState('')
  const [remarks, setRemarks] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  //   const [employeeList, setEmployeeList] = useState([])

  // Selected Employee Names
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])

    // Fields
    const [fields, setFields] = useState({
        activity_schedule: '',
        sr_no: '',
        ar_id: '',
        activity_type: '',
        activity_related_to: '',
        destination: '',
        request_for_dtc: '',
        purpose_of_activity: '',
        remarks: '',
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

    // Schedule Reference Id List
    const scheduleReferenceIdList = useSelector(state => state.scheduleReferenceIdList)
    const { referenceid:refid } = scheduleReferenceIdList

    //  Activity Related To List Option
    const activityRelatedToListOption = useSelector(state => state.activityRelatedToListOption)
    const { activity:activityOption } = activityRelatedToListOption

    // Destination List
    const destinationListOption = useSelector(state => state.destinationListOption)
    const { destination } = destinationListOption

    // Reference Id Options
    const referenceIdOptions = (refid ? refid.map((row, key) => {
        // 
        return <option 
            rel-team={row.activity_type}
            key={key} 
            value={ row.ar_id }
            >{ row.reference_id } - {row.project_name}
        </option>
    }) : <></>)

    // Object to get selected Destination
    const handleSelectedDestination = (options) => {
        setSelectedDestination(options)
        changeValueHandler('destination', options)
        setNewScheduleFields(fields)
    }

    /**
     * @returns - Activity Related To Options
     */
    const getActivityRelatedToOptions = () => {
        //
        if(relatedTeam) {
            // Filter Activity Related To
            let filtered = activityOption.filter(row => row.related_team === relatedTeam)
            // 
            return (filtered ? filtered.map((row, key) => {
                return <option 
                    key={key} 
                    value={ row.artt_id }>
                    { row.activity }
                </option>
            }) : <></>)

        } else {
            // Show all list
            return (activityOption ? activityOption.map((row, key) => {
                return <option 
                    key={key} 
                    value={ row.artt_id }>
                    { row.activity }
                </option>
            }) : <></>) 
        }
    }

    // Handle Reference Id Option Event
    const handleReferenceIdOption = (state) => {
        // 
        let index = state.target.selectedIndex
        let optionElement = state.target.childNodes[index]
        // Get attribute value
        let option =  optionElement.getAttribute('rel-team')
        // Set Reference Id
        setReferenceId(state.target.value)
        changeValueHandler('ar_id', state.target.value)
        setRelatedTeam(option)
    }

    // Get Destination
    useEffect(() => {
        // Selected Calendar Details
        const {  
            art_id,
            sched_type,
            purpose_of_activity,
            remarks,
            ar_id,
            user_id,
            fields,
            business_unit,
            trainers,
            persons,
            updated,
            created_at,
            updated_at,
        } = calendarScheduleDetails
        
        // const { 
        //     activity_related_to,
        //     activity_schedule,
        //     activity_type,
        //     request_for_dtc,
        //     sr_no,
        //     destination,
        // } = fields

        console.warn(fields)

        // setState
        setRemarks(remarks || '')
        setPurposeOfActivity(purpose_of_activity || '')
        // setSrArNo(sr_no || '')
        // setDtc(request_for_dtc || '')
        // setActivityRelatedTo(activity_related_to || '')
        // setActivityType(activity_type || '')

        // setActivitySchedule(moment(activity_schedule).format('YYYY/MM/DD') || '')
        
        console.warn(calendarScheduleDetails)
        // setDestinationListOptions(destination)

    }, [calendarScheduleDetails])

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
                    value={srArNo}
                    onChange={(e) => {
                        changeValueHandler('sr_no', e.target.value)
                        setSrArNo(e.target.value)
                        setNewScheduleFields(fields)
                    }}
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
                        value={referenceId}
                        onChange={(e) => {
                            handleReferenceIdOption(e)
                            setNewScheduleFields(fields)
                        }}
                    >
                    <option value="">- Select -</option>
                    { referenceIdOptions }
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
                    value={activityType}
                    onChange={(e) => {
                        changeValueHandler('activity_type', e.target.value)
                        setActivityType(e.target.value)
                        setNewScheduleFields(fields)
                    }}
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
                    value={activityRelatedTo}
                    onChange={(e) => {
                        changeValueHandler('activity_related_to', e.target.value)
                        setActivityRelatedTo(e.target.value)
                        setNewScheduleFields(fields)
                    }}
                >
                <option value="">- Select -</option>
                { getActivityRelatedToOptions() }
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Destination Details</Form.Label>
                    <CreateSelect 
                        isClearable
                        options={destinationListOptions}
                        styles={reactSelectCustomStyles}
                        onChange={(e) => {
                            handleSelectedDestination(e)
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Schedule</Form.Label>
                <DatePicker
                    customInput={<DatepickerCustomInput />}
                    selected={activitySchedule} 
                    onChange={(date) => {
                        changeValueHandler('activity_schedule', date)
                        setActivitySchedule(date)
                        setNewScheduleFields(fields)
                    }} 
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Request for DTC?</Form.Label>
                <Form.Control
                    size='sm'
                    as='select' 
                    aria-label="Status"
                    value={dtc}
                    onChange={(e) => {
                        changeValueHandler('request_for_dtc', e.target.value)
                        setDtc(e.target.value)
                        setNewScheduleFields(fields)
                    }}
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
                    size="sm"
                    as="textarea" 
                    rows={2} 
                    value={purposeOfActivity}
                    onChange={(e) => {
                        changeValueHandler('purpose_of_activity', e.target.value)
                        setPurposeOfActivity(e.target.value)
                        setNewScheduleFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control 
                        size="sm"
                        as="textarea" 
                        rows={2}
                        value={remarks}
                        onChange={(e) => {
                            changeValueHandler('remarks', e.target.value)
                            setRemarks(e.target.value)
                            setNewScheduleFields(fields)
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>
        
        <EmployeeListOption
            calendarScheduleDetails={calendarScheduleDetails}
            changeValueHandler={changeValueHandler}
            selectedEmployeeNames={selectedEmployeeNames}
            setSelectedEmployeeNames={setSelectedEmployeeNames}
        />

    </>
  )
}

export default NewScheduleRequest