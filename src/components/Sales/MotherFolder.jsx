import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import Select from 'react-select'
import Loader from '../Loader'
import moment from 'moment'

const MotherFolder = (props) => {
  // Add or Edit State
  const { mode } = props
  // Schedule Reference Details
  const scheduleReferenceDetails = useSelector(state => state.scheduleReferenceDetails)
  const { loading , schedule:scheduleReferenceDetail } = scheduleReferenceDetails
  // Get Business Unit List Options
  const businessUnitListOption = useSelector(state => state.businessUnitListOption)
  const { business:businessListOptions } = businessUnitListOption
  // useState
  const [projectNo, setProjectNo] = useState('')
  const [caseNo, setCaseNo] = useState('')
  const [saNo, setSaNo] = useState('')
  const [netSuiteLink, setNetSuiteLink] = useState('')
  // Schedule Reference Details
  const [partnerCompanyName, setPartnerCompanyName] = useState('')
  const [endUserCompanyName, setEndUserCompanyName] = useState('')
  const [partnerSiteAddress, setPartnerSiteAddress] = useState('')
  const [endUserSiteAddress, setEndUserSiteAddress] = useState('')
  const [partnerContactPerson, setPartnerContactPerson] = useState('')
  const [endUserContactPerson, setEndUserContactPerson] = useState('')
  const [partnerContactNumber, setPartnerContactNumber] = useState('')
  const [endUserContactNumber, setEndUserContactNumber] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [dateRequested, setDateRequested] = useState('')
  const [modes, setModes] = useState('')
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])
  const [activityType, setActivityType] = useState('')
  // 
  useEffect(() => {
    // Selected Schedule Details
    if(scheduleReferenceDetail) {
        // 
        const {
            activity_type,  
            project_no,
            case_no,
            sa_no,
            netsuite_link,
            partner_company_name,
            enduser_company_name,
            partner_site_address,
            enduser_site_address,
            partner_contact_person,
            enduser_contact_person,
            partner_contact_number,
            enduser_contact_number,
            created_at,
            fullname, // not showing
            business_unit,
        } = scheduleReferenceDetail

        // setState
        setProjectNo(project_no || "")
        setCaseNo(case_no || "")
        setSaNo(sa_no || "")
        setNetSuiteLink(netsuite_link || "")
        setPartnerCompanyName(partner_company_name || "")
        setEndUserCompanyName(enduser_company_name || "")
        setPartnerSiteAddress(partner_site_address || "")
        setEndUserSiteAddress(enduser_site_address || "")
        setPartnerContactPerson(partner_contact_person || "")
        setEndUserContactPerson(enduser_contact_person || "")
        setPartnerContactNumber(partner_contact_number || "")
        setEndUserContactNumber(enduser_contact_number || "")
        setRequestedBy(fullname || "")
        setDateRequested(moment(created_at).format('L') || "")
        setSelectedBusinessUnit(business_unit || "")
        setActivityType(activity_type || "")
        setModes(mode === 'Edit')
    }
  }, [scheduleReferenceDetail])

  // 
  return (
    <>
        { loading ? <Loader /> :  
            <>
            { // Show Fields if Activity Type is Post-Sales
                activityType === 'Post-Sales' && 
                    <>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project No.</Form.Label>  
                                    <Form.Control 
                                        size='sm'
                                        type='text'
                                        placeholder='Project No.'
                                        value={projectNo}
                                        onChange={(e) => setProjectNo(e.target.value)}
                                        readOnly={modes}
                                    />
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
                                        onChange={(e) => setCaseNo(e.target.value)}
                                        readOnly={modes}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>SA No.</Form.Label>  
                                    <Form.Control 
                                        size='sm'
                                        type='text'
                                        placeholder='SA No.'
                                        value={saNo}
                                        onChange={(e) => setSaNo(e.target.value)}
                                        readOnly={modes}
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
                                        value={netSuiteLink}
                                        onChange={(e) => setNetSuiteLink(e.target.value)}
                                        readOnly={modes}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                }
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Business Unit</Form.Label>  
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            isOptionDisabled={(option) => option.disabled}
                            options={businessListOptions}
                            onChange={(e) => setSelectedBusinessUnit(e.target.value)}
                            value={selectedBusinessUnit}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Partner Company Name</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Partner Company Name'
                                value={partnerCompanyName}
                                onChange={(e) => setPartnerCompanyName(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End-User Company Name</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='End-User Company Name'
                                value={endUserCompanyName}
                                onChange={(e) => setEndUserCompanyName(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Partner Site Address</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Partner Site Address'
                                value={partnerSiteAddress}
                                onChange={(e) => setPartnerSiteAddress(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End-User Site Address</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='End-User Site Address'
                                value={endUserSiteAddress}
                                onChange={(e) => setEndUserSiteAddress(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Partner Contact Person</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Partner Contact Person'
                                value={partnerContactPerson}
                                onChange={(e) => setPartnerContactPerson(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End-User Contact Person</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='End-User Contact Person'
                                value={endUserContactPerson}
                                onChange={(e) => setEndUserContactPerson(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Partner Contact Number</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Partner Contact Number'
                                value={partnerContactNumber}
                                onChange={(e) => setPartnerContactNumber(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End-User Contact Number</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='End-User Contact Number'
                                value={endUserContactNumber}
                                onChange={(e) => setEndUserContactNumber(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Requested By</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Requested By'
                                value={requestedBy}
                                onChange={(e) => setRequestedBy(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date Requested</Form.Label>  
                            <Form.Control 
                                size='sm'
                                type='text'
                                placeholder='Date Requested'
                                value={dateRequested}
                                onChange={(e) => setDateRequested(e.target.value)}
                                readOnly={modes}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </>
        }
    </>
  )
}

export default MotherFolder