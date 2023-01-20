import { Row, Col, Form, } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EditEmailBusinessUnit = ({ sampleFunc }) => {
    // React Select
    const animatedComponents = makeAnimated();
    // Email and Business
    const [businessUnit, setBusinessUnit] = useState([]) 
    const [participants, setParticipants] = useState([])

    // // 
    // const businessUnit = (e) => {
    //     sampleFunc(e)
    // }

    // Static Value
    // const options = [
    //     { value: 'Aruba Wired', label: 'Aruba Wired' },
    //     { value: 'Aruba Wireless', label: 'Aruba Wireless' },
    //     { value: 'Ruckus Wired', label: 'Ruckus Wired' },
    //     { value: 'Ruckus Wireless', label: 'Ruckus Wireless' },
    //     { value: 'Commscope', label: 'Commscope' },
    //     { value: 'Panduit', label: 'Panduit' },
    //     { value: 'Ubiquiti', label: 'Ubiquiti' },
    //     { value: 'Mitel', label: 'Mitel' },
    //     { value: 'NEC', label: 'NEC' },
    // ]
    const options = participants

    // 
    useEffect(() => {

    })

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
                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                  />
                </Form.Group>
            </Col>
        </Row>
    </>
  )

}

export default EditEmailBusinessUnit