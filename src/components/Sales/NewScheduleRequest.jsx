import React, {forwardRef, useImperativeHandle, useRef} from "react";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap' 
import EmployeeListOption from './EmployeeListOption'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment/moment";

const NewScheduleRequest = () => {
  // useState
  const [referenceId, setReferenceId] = useState([])
  const [relatedTeam, setRelatedTeam] = useState('')
  // React-Datepicker
  const [startDate, setStartDate] = useState(new Date());
  // Custom Textfield 
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input 
        // className="" 
        onClick={onClick} ref={ref}
        value={value}
    />));

  // Schedule Reference Id List
  const scheduleReferenceIdList = useSelector(state => state.scheduleReferenceIdList)
  const { referenceid:refid } = scheduleReferenceIdList
  //  
  const activityRelatedToListOption = useSelector(state => state.activityRelatedToListOption)
  const { activity:activityOption } = activityRelatedToListOption

  // Reference Id Options
    const referenceIdOptions = refid.map((row, key) => {
        return <option 
            rel-team={row.activity_type}
            key={key} 
            value={ row.ar_id }
            >{ row.reference_id } - {row.project_name}
        </option>
    })
    /**
     * @returns - Activity Related To Options
     */
    const getActivityRelatedToOptions = () => {
        //
        if(relatedTeam) {
            // Filter Activity Related To
            let filtered = activityOption.filter(row => row.related_team === relatedTeam)

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

    // 
    const handleReferenceIdOption = (state) => {
        // 
        let index = state.target.selectedIndex
        let optionElement = state.target.childNodes[index]
        // Get attribute value
        let option =  optionElement.getAttribute('rel-team')
        // console.war(option);
        // Set Reference Id
        setReferenceId(state.target.value)
        setRelatedTeam(option)
    }

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
                    // value={projectName}
                    // onChange={(e) => setProjectName(e.target.value)}
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
                        // value={categoryid}
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
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
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
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                { getActivityRelatedToOptions() }
                </Form.Control>
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Destination Details</Form.Label>
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Partner">Partner</option>
                <option value="End-user">End-user</option>
                <option value="MEC Office">MEC Office</option>
                <option value="Others">Others</option>
                {/* if others text field will show */}
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Activity Schedule</Form.Label>
                <DatePicker
                    customInput={<ExampleCustomInput />}
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
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
                    // value={scheduleType}
                    // onChange={(e) => setScheduleType(e.target.value)}
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
                    as="textarea" 
                    rows={2} 
                />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                    />
                </Form.Group>
            </Col>
        </Row>

        <EmployeeListOption 

        />
    </>
  )
}

export default NewScheduleRequest