import { Row, Col, Form, } from 'react-bootstrap'
import React, { useState, useEffect, useRef, use } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { reactSelectCustomStyles } from '../../assets/js/custom_style';
import { useImperativeHandle } from 'react';

const EditEmailBusinessUnit = ({ scheduleDetails }, ref) => {
    // React Select
    const animatedComponents = makeAnimated();
    // useRef
    const businessUnitRef = useRef()
    const emailParticipantRef = useRef()

    // Email and Business
    const [businessUnit, setBusinessUnit] = useState([]) 

    // Participants Email List
    const userEmail = useSelector(state => state.userEmail)
    const { emails:participants } = userEmail

    // Business Unit List
    const businessUnitListOption = useSelector(state => state.businessUnitListOption)
    const { business } = businessUnitListOption

    // Email Participants
    const [participantListOptions, setParticipantListOptions] = useState([])
    const [businessListOptions, setBusinessListOptions] = useState([])
    // 
    const [selectedParticipant, setSelectedParticipant] = useState([])
    const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])

    // Object to get selected Email Participants
    const handleSelectedParticipants = (options) => {
        setSelectedParticipant(options)
    }

    // Object to get selected Business Unit
    const handleSelectedBusinessUnit = (options) => {
        setSelectedBusinessUnit(options)
    }

    // Object to get 

    // Pass the reference value
    useImperativeHandle(ref, () => {
        // Get field values
        return {
            emailParticipants: selectedParticipant,
            businessUnit: selectedBusinessUnit,
        }
    },[selectedParticipant, selectedBusinessUnit])

    // Get Participants and Business Unit
    useEffect(() => {
        // Selected Schedule Details
        const {
            email_participants,
            business_unit,
        } = scheduleDetails

        // console.warn(email_participants)
        // setState
        setParticipantListOptions(participants || [])
        setBusinessListOptions(business || [])
        // console.warn(businessListOptions)
        // Selected Participants 
        setSelectedParticipant(email_participants || [])
        setSelectedBusinessUnit(business_unit || [])

    },[participants, business])

  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Select Business Unit</Form.Label>
                 <Select
                    closeMenuOnSelect={false}
                    isMulti
                    components={animatedComponents}
                    options={businessListOptions}
                    onChange={handleSelectedBusinessUnit}
                    value={selectedBusinessUnit}
                    ref={businessUnitRef}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                  />
                </Form.Group>
            </Col>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Select Email Participants</Form.Label>
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    components={animatedComponents}
                    options={participantListOptions}
                    onChange={handleSelectedParticipants}
                    value={selectedParticipant}
                    ref={emailParticipantRef}
                    // styles={reactSelectCustomStyles}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default React.forwardRef(EditEmailBusinessUnit)
