import { Row, Col, Form, } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { reactSelectCustomStyles } from '../../assets/js/custom_style';

const EditEmailBusinessUnit = ({ sampleFunc, handleEmailParticipants }) => {
    // React Select
    const animatedComponents = makeAnimated();
    // Email and Business
    const [businessUnit, setBusinessUnit] = useState([]) 
    // Participants Email List
    const userEmail = useSelector(state => state.userEmail)
    const { emails:participants } = userEmail
    //
    const [options, setOptions] = useState([])
    // 
    const [selectedParticipant, setSelectedParticipant] = useState([])
    //
    const handleSelectedParticipants = (options) => {
        setSelectedParticipant(options)
        // console.warn(selectedParticipant)
        handleEmailParticipants(selectedParticipant)
    }

    // // 
    // const businessUnit = (e) => {
    //     sampleFunc(e)
    // }

    // 
    useEffect(() => {
        // 
        setOptions(participants || [])
    },[participants])

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
                    options={options}

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
                    options={options}
                    onChange={handleSelectedParticipants}
                    // styles={reactSelectCustomStyles}
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                />
                </Form.Group>
            </Col>
        </Row>
    </>
  )
}

export default EditEmailBusinessUnit