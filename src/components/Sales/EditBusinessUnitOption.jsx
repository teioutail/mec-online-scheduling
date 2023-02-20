import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'

const EditBusinessUnitOption = ({ changeValueHandler, mode, selectedBusinessUnitDetails }) => {
  // Business Unit List
  const businessUnitListOption = useSelector(state => state.businessUnitListOption)
  const { business } = businessUnitListOption
  // Business Unit
  const [businessListOptions, setBusinessListOptions] = useState([])

  // Object to get selected Business Unit
  const handleSelectedBusinessUnit = (options) => {
    setSelectedBusinessUnit(options)
  }

  // Selected Business Units
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])
    // Get Business Unit
    useEffect(() => {
        if(mode === 'Edit') {
            // Selected Business Unit 
            setSelectedBusinessUnit(selectedBusinessUnitDetails || [])
        }
        // setState
        setBusinessListOptions(business || [])
    },[business, selectedBusinessUnitDetails])
    
    return (
        <>
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={businessListOptions}
                onChange={(e) => { 
                    handleSelectedBusinessUnit(e)
                    changeValueHandler('business_unit', selectedBusinessUnitDetails)
                }}
                value={selectedBusinessUnit}
            />
        </>
    )
}

export default EditBusinessUnitOption