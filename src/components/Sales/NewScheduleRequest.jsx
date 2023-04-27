import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap' 
// import EmployeeListOption from './EmployeeListOption'
import EmployeeListOptionTable from './EmployeeListOptionTable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CreateSelect from 'react-select/creatable'
import { reactSelectCustomStyles } from "../../assets/js/custom_style"
import moment from "moment"

const NewScheduleRequest = (props) => {
  //
  const { 
    artid, 
    calendarScheduleDetails, 
    setNewScheduleFields, 
    mode,
    scheduleType,
  } = props

  // useState
  const [relatedTeam, setRelatedTeam] = useState('')
  const [activitySchedule, setActivitySchedule] = useState([new Date(), new Date()])
  const [startDate, endDate] = activitySchedule
  const [srArNo, setSrArNo] = useState('')
  const [referenceId, setReferenceId] = useState('')
  const [activityType, setActivityType] = useState('')
  const [activityRelatedTo, setActivityRelatedTo] = useState('')
  const [dtc, setDtc] = useState('')
  const [purposeOfActivity, setPurposeOfActivity] = useState('')
  const [remarks, setRemarks] = useState('')
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])
  const [netsuiteLink, setNetsuitLink] = useState([])
  
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
        netsuite_link: '',
        id: artid,
    })

    // console.log(fields)
    /**
     * - Value Setter
     */
    const changeValueHandler = (fieldName, value) => {
        const newField = fields
        newField[fieldName] = value
        setFields(newField)
    }

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
            if(activityOption) {
                let filtered = activityOption.filter(row => row.related_team === relatedTeam)
                // 
                return (filtered ? filtered.map((row, key) => {
                    return <option 
                        key={key} 
                        value={ row.artt_id }>
                        { row.activity }
                    </option>
                }) : <></>)
            }
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

    // Get Edit Details
    useEffect(() => {
        // Selected Calendar Details
        if(mode === 'Edit') {
            
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
                updated,
                created_at,
                updated_at,
                employee_list, // list of employees sa activity_employee_table
            } = calendarScheduleDetails
            
            // New Schedule Fields
            const { 
                activity_related_to,
                activity_schedule,
                activity_type,
                request_for_dtc,
                sr_no,
                destination:currentDestination,
                netsuite_link,
            } = fieldval

            // console.warn(calendarScheduleDetails)
            // setState
            setRemarks(remarks || '')
            setPurposeOfActivity(purpose_of_activity || '')
            setSrArNo(sr_no || '')
            setDtc(request_for_dtc || '')
            setActivityRelatedTo(activity_related_to || '')
            setActivityType(activity_type || '')
            setSelectedDestination(currentDestination || '')
            setReferenceId(ar_id || '')
            setNetsuitLink(netsuite_link || '')
            // setActivitySchedule(moment(activity_schedule).toDate() || '')
            // setSelectedEmployeeNames(persons || '')
            setSelectedEmployeeNames(employee_list || '')

            if(activity_schedule)
                setActivitySchedule([moment(activity_schedule[0]).toDate(), moment(activity_schedule[1]).toDate()] || [])
        }
    }, [])

    // 
    useEffect(() => {
        //
        changeValueHandler('activity_schedule', activitySchedule)
        changeValueHandler('sr_no', srArNo)
        changeValueHandler('ar_id', referenceId)
        changeValueHandler('activity_type', activityType)
        changeValueHandler('activity_related_to', activityRelatedTo)
        changeValueHandler('destination', selectedDestination)
        changeValueHandler('request_for_dtc', dtc)
        changeValueHandler('purpose_of_activity', purposeOfActivity)
        changeValueHandler('remarks', remarks)
        changeValueHandler('employee_list', selectedEmployeeNames)
        changeValueHandler('netsuite_link', netsuiteLink)

        setNewScheduleFields(fields)
    },[activitySchedule,
        srArNo,
        referenceId,
        activityType,
        activityRelatedTo,
        selectedDestination,
        dtc,
        purposeOfActivity,
        remarks,
        netsuiteLink])
        
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
                <Form.Group className="mb-3">
                <Form.Label>Netsuite Link</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Netsuite Link'
                    value={netsuiteLink}
                    onChange={(e) => {
                        changeValueHandler('netsuite_link', e.target.value)
                        setNetsuitLink(e.target.value)
                        setNewScheduleFields(fields)
                    }}
                />
                </Form.Group>
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
                        options={destination}
                        styles={reactSelectCustomStyles}
                        onChange={(e) => {
                            handleSelectedDestination(e)
                        }}
                        value={selectedDestination}
                    />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Schedule</Form.Label>
                <DatePicker
                    className='form-control form-control-sm'
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        // setDateRange(update);
                        setActivitySchedule(update)
                        changeValueHandler('activity_schedule', activitySchedule)
                        setNewScheduleFields(fields)
                    }}
                    isClearable={true}
                />
                {/* <DatePicker
                    customInput={<DatepickerCustomInput />}
                    selected={activitySchedule} 
                    onChange={(date) => {
                        changeValueHandler('activity_schedule', date)
                        setActivitySchedule(date)
                        setNewScheduleFields(fields)
                    }} 
                /> */}
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
        
        {/* <EmployeeListOption
            calendarScheduleDetails={calendarScheduleDetails}
            changeValueHandler={changeValueHandler}
            selectedEmployeeNames={selectedEmployeeNames}
            setSelectedEmployeeNames={setSelectedEmployeeNames}
            mode={mode}
        /> */}

        <EmployeeListOptionTable
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

export default NewScheduleRequest