import React, { useState, forwardRef, useEffect } from "react"
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap' 
// import EmployeeListOption from './EmployeeListOption'
import EmployeeListOptionTable from './EmployeeListOptionTable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CreateSelect from 'react-select/creatable'
import { reactSelectCustomStyles } from "../../assets/js/custom_style"
import moment from "moment"
import EditBusinessUnitOption from "./EditBusinessUnitOption"

const JobOrderRequest = (props) => {
    //
    const { 
        artid, 
        calendarScheduleDetails, 
        setJoRequestFields , 
        mode,
        scheduleType,
    } = props

    //   console.warn(scheduleType);

    // useState
    const [relatedTeam, setRelatedTeam] = useState('')
    const [activitySchedule, setActivitySchedule] = useState([new Date(), new Date()])
    const [startDate, endDate] = activitySchedule
    const [srArNo, setSrArNo] = useState('')

    const [activityType, setActivityType] = useState('')
    const [activityRelatedTo, setActivityRelatedTo] = useState('')
    const [dtc, setDtc] = useState('')
    const [purposeOfActivity, setPurposeOfActivity] = useState('')
    const [remarks, setRemarks] = useState('')
    const [selectedDestination, setSelectedDestination] = useState('')
    const [selectedEmployeeNames, setSelectedEmployeeNames] = useState([])
    // Job Order Fields 
    const [referenceId, setReferenceId]     = useState('')
    const [projectNo, setProjectNo]         = useState('')
    const [emailSubject, setEmailSubject]   = useState('')
    const [netsuiteLink, setNetsuiteLink]   = useState('')
    const [maNo, setMaNo]                   = useState('')
    const [serialNo, setSerialNo]           = useState('')
    const [partNo, setPartNo]               = useState('')
    const [warranty, setWarranty]           = useState('')
    const [requestType, setRequestType]     = useState('')
    const [priority, setPriority]           = useState('')
    const [reportedProblem,setReportedProblem] = useState('')
    const [notes, setNotes]                 = useState('')
    const [caseNo, setCaseNo]               = useState('')
    const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])
    // Fields
    const [fields, setFields] = useState({
        id: artid,
        ar_id: '',
        project_no: '',
        email_subject: '',
        netsuite_link: '',
        serial_no: '',
        part_no: '',
        warranty: '',
        request_type: '',
        priority: '',
        reported_problem: '',
        notes: '',
        case_no: '',
        // activity_schedule: '',
        // sr_no: '',
        // activity_type: '',
        // activity_related_to: '',
        // destination: '',
        // request_for_dtc: '',
        // purpose_of_activity: '',
        // remarks: '',
        // employee_list:[],
    })
    
    /**
     * - Value Setter
     */
    const changeValueHandler = (fieldName, value) => {
        // 
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
        console.warn(row)
        return <option 
            rel-team={row.activity_type}
            project-no={row.project_no}
            project-name={row.project_name}
            netsuite-link={row.netsuite_link}
            case-no={row.case_no}
            key={key} 
            value={ row.ar_id }
            >{ row.reference_id } - {row.project_name}
        </option>
    }) : <></>)

    // Object to get selected Destination
    const handleSelectedDestination = (options) => {
        setSelectedDestination(options)
        changeValueHandler('destination', options)
        setJoRequestFields(fields)
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
        let project_no = optionElement.getAttribute('project-no')
        let email_subject = optionElement.getAttribute('project-name')
        let netsuite_link = optionElement.getAttribute('netsuite-link')
        let case_no = optionElement.getAttribute('case-no')
        // Set Reference Id
        setReferenceId(state.target.value)
        changeValueHandler('ar_id', state.target.value)
        changeValueHandler('project_no', project_no)
        changeValueHandler('email_subject', email_subject)
        changeValueHandler('netsuite_link', netsuite_link)
        changeValueHandler('case_no', case_no)
        // 
        setEmailSubject(email_subject)
        setProjectNo(project_no)
        setNetsuiteLink(netsuite_link)
        setRelatedTeam(option)
        setCaseNo(case_no)
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
                updated,
                created_at,
                updated_at,
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

            // setState
            setRemarks(remarks || '')
            setPurposeOfActivity(purpose_of_activity || '')
            setSrArNo(sr_no || '')
            setDtc(request_for_dtc || '')
            setActivityRelatedTo(activity_related_to || '')
            setActivityType(activity_type || '')
            setSelectedDestination(currentDestination || '')
            setReferenceId(ar_id || '')
            // setNetsuitLink(netsuite_link || '')
            // setActivitySchedule(moment(activity_schedule).toDate() || '')
            setSelectedEmployeeNames(persons || '')
            if(activity_schedule)
                setActivitySchedule([moment(activity_schedule[0]).toDate(), moment(activity_schedule[1]).toDate()] || [])
        }
    }, [])

    // 
    useEffect(() => {
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

        setJoRequestFields(fields)
        
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
                    <Form.Label>Reference Id</Form.Label>
                    <Form.Control
                        as='select' 
                        size='sm'
                        aria-label="Reference Id"
                        value={referenceId}
                        onChange={(e) => {
                            handleReferenceIdOption(e)
                            setJoRequestFields(fields)
                        }}
                    >
                    <option value="">- Select -</option>
                    { referenceIdOptions }
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Case No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Case No.'
                    value={caseNo}
                    onChange={(e) => {
                        changeValueHandler('case_no', e.target.value)
                        setCaseNo(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Project No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Project No.'
                    value={projectNo}
                    onChange={(e) => {
                        changeValueHandler('project_no', e.target.value)
                        setProjectNo(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Email Subject</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Email Subject'
                    value={emailSubject}
                    onChange={(e) => {
                        changeValueHandler('email_subject', e.target.value)
                        setEmailSubject(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
        <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>MA No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='MA No.'
                    value={maNo}
                    onChange={(e) => {
                        changeValueHandler('ma_no', e.target.value)
                        setMaNo(e.target.value)
                        setJoRequestFields(fields)
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
                        setNetsuiteLink(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
              <h6>Device Information</h6>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
            <Form.Group className="mb-3">
                <Form.Label>Serial No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Serial No.'
                    value={serialNo}
                    onChange={(e) => {
                        changeValueHandler('serial_no', e.target.value)
                        setSerialNo(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Part No.</Form.Label>  
                <Form.Control 
                    size='sm'
                    type='text'
                    placeholder='Part No.'
                    value={partNo}
                    onChange={(e) => {
                        changeValueHandler('part_no', e.target.value)
                        setPartNo(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Warranty</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Warranty"
                            value={warranty}
                            onChange={(e) => {
                                changeValueHandler('warranty', e.target.value)
                                setWarranty(e.target.value)
                                setJoRequestFields(fields)
                            }}
                        >
                        <option value="">- Select -</option>
                        <option value="Void Warranty">Void Warranty</option>
                        <option value="Out Warranty">Out Warranty</option>
                        <option value="In Warranty">In Warranty</option>
                        <option value="Not Purchased from MEC">Not Purchased from MEC</option>
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
                    <Form.Label>Request Type</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Request Type"
                            value={requestType}
                            onChange={(e) => {
                                changeValueHandler('request_type', e.target.value)
                                setRequestType(e.target.value)
                                setJoRequestFields(fields)
                            }}
                        >
                        <option value="">- Select -</option>
                        <option value="Testing of Service Unit">Testing of Service Unit</option>
                        <option value="Testing of Replacement/Repaired Unit">Testing of Replacement/Repaired Unit</option>
                        <option value="Testing of Demo Unit">Testing of Demo Unit</option>
                        <option value="Testing of Returned SU">Testing of Returned SU</option>
                        <option value="Testing of Critical Spare">Testing of Critical Spare</option>
                        <option value="For Initial Assessment">For Initial Assessment</option>
                        <option value="For Documentation">For Documentation</option>
                    </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                            as='select' 
                            size='sm'
                            aria-label="Priority"
                            value={priority}
                            onChange={(e) => {
                                changeValueHandler('priority', e.target.value)
                                setPriority(e.target.value)
                                setJoRequestFields(fields)
                            }}
                        >
                        <option value="">- Select -</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Reported Problem</Form.Label>
                <Form.Control 
                    size="sm"
                    as="textarea" 
                    rows={2} 
                    value={reportedProblem}
                    onChange={(e) => {
                        changeValueHandler('reported_problem', e.target.value)
                        setReportedProblem(e.target.value)
                        setJoRequestFields(fields)
                    }}
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                        size="sm"
                        as="textarea" 
                        rows={2}
                        value={notes}
                        onChange={(e) => {
                            changeValueHandler('notes', e.target.value)
                            setNotes(e.target.value)
                            setJoRequestFields(fields)
                        }}
                    />
                </Form.Group>
            </Col>
        </Row>

        {mode !== 'Add' && 
            <EmployeeListOptionTable
                calendarScheduleDetails={calendarScheduleDetails}
                changeValueHandler={changeValueHandler}
                selectedEmployeeNames={selectedEmployeeNames}
                setSelectedEmployeeNames={setSelectedEmployeeNames}
                mode={mode}
                scheduleType={scheduleType}
            />
        } 

    </>
  )
}

export default JobOrderRequest