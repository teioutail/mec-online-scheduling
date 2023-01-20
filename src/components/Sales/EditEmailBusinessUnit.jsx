import { Row, Col, Form, } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EditEmailBusinessUnit = ({ sampleFunc }) => {
    // setState
    const [businessUnit, setBusinessUnit] = useState({})
    const animatedComponents = makeAnimated();
    
    // // 
    // const businessUnit = (e) => {
    //     sampleFunc(e)
    // }

    // Static Value
    const options = [
        { value: 'Aruba Wired', label: 'Aruba Wired' },
        { value: 'Aruba Wireless', label: 'Aruba Wireless' },
        { value: 'Ruckus Wired', label: 'Ruckus Wired' },
        { value: 'Ruckus Wireless', label: 'Ruckus Wireless' },
        { value: 'Commscope', label: 'Commscope' },
        { value: 'Panduit', label: 'Panduit' },
        { value: 'Ubiquiti', label: 'Ubiquiti' },
        { value: 'Mitel', label: 'Mitel' },
        { value: 'NEC', label: 'NEC' },
    ]

  return (
    <>
        <Row>
            <Col sm={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                <Form.Label>Select Business Unit</Form.Label>
                {/* <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={activityType}
                    onChange={(e) => businessUnit(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Post-Sales">Post-Sales Activity</option>
                <option value="Pre-Sales">Pre-Sales Activity</option>
                </Form.Control> */}
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
                <Form.Control
                size='sm'
                as='select' 
                aria-label="Status"
                    // value={activityType}
                    // onChange={(e) => setActivityType(e.target.value)}
                >
                <option value="">- Select -</option>
                <option value="Post-Sales">Post-Sales Activity</option>
                <option value="Pre-Sales">Pre-Sales Activity</option>
                </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    </>
  )

}

export default EditEmailBusinessUnit