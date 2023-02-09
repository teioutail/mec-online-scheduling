import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CreateSelect from 'react-select/creatable';
import { reactSelectCustomStyles } from "../../assets/js/custom_style";

const NewScheduleRequest = ({ calendarDetails }, ref) => {
  // Employee List
  const employeeListRef = useRef()
  // useState
  const [relatedTeam, setRelatedTeam] = useState('')
  const [destinationListOptions, setDestinationListOptions] = useState([])
  //
  const [selectedDestination, setSelectedDestination] = useState('')

  // useRef
  const srArNoRef = useRef()
  const activityScheduleRef = useRef()
  const arIdRef = useRef()
  const activityTypeRef = useRef()
  const activityRelatedToRef = useRef()
  const destinationDetailsRef = useRef()
  const dtcRef = useRef()
  const purposeOfActivityRef = useRef()
  const remarksRef = useRef()

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
//   const [employeeList, setEmployeeList] = useState([])

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
    const referenceIdOptions = refid.map((row, key) => {
        // 
        return <option 
            rel-team={row.activity_type}
            key={key} 
            value={ row.ar_id }
            >{ row.reference_id } - {row.project_name}
        </option>
    })

    // Object to get selected Destination
    const handleSelectedDestination = (options) => {
        setSelectedDestination(options)
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
            return filtered.map((row, key) => {
                return <option 
                    key={key} 
                    value={ row.artt_id }>
                    { row.activity }
                </option>
            });

        } else {
            // Show all list
            return activityOption.map((row, key) => {
                return <option 
                    key={key} 
                    value={ row.artt_id }>
                    { row.activity }
                </option>
            });
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
        setRelatedTeam(option)
    }

    // Pass the reference value
    useImperativeHandle(ref, () => {
        // Get field values
        let handle = {
            activitySchedule: activitySchedule,
            srArNo: srArNoRef.current.value,
            arId: arIdRef.current.value,
            activityType: activityTypeRef.current.value,
            activityRelatedTo: activityRelatedToRef.current.value,
            dtc: dtcRef.current.value,
            purposeOfActivity: purposeOfActivityRef.current.value,
            remarks: remarksRef.current.value,
            employeeList: employeeListRef.current.employeeListTest
        }

        // Destination Details
        if(selectedDestination !== undefined || selectedDestination !== null) {
            handle.destinationDetails =  selectedDestination.value
        }

        return handle
    })

  // Get Destination
  useEffect(() => {
    // Selected destination
 
    // setState
    setDestinationListOptions(destination || [])
  }, [destination])

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
                    onChange={(e) => setSrArNo(e.target.value)}
                    ref={srArNoRef}
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
                        ref={arIdRef}
                        onChange={handleReferenceIdOption}
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
                    onChange={(e) => setActivityType(e.target.value)}
                    ref={activityTypeRef}
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
                    ref={activityRelatedToRef}
                    onChange={(e) => setActivityRelatedTo(e.target.value)}
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
                        onChange={handleSelectedDestination}
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
                    onChange={(date) => setActivitySchedule(date)} 
                    ref={activityScheduleRef}
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
                    onChange={(e) => setDtc(e.target.value)}
                    ref={dtcRef}
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
                    ref={purposeOfActivityRef}
                    onChange={(e) => setPurposeOfActivity(e.target.value)}
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
                        ref={remarksRef}
                        onChange={(e) => setRemarks(e.target.value)}
                    />
                </Form.Group>
            </Col>
        </Row>
        
        <EmployeeListOption
            ref={employeeListRef}
        />

    </>
  )
}

export default React.forwardRef(NewScheduleRequest)