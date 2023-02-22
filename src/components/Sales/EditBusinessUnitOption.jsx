import React, { useState, useEffect } from 'react'
import Select from 'react-select'
// import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'

const EditBusinessUnitOption = ({ changeValueHandler, mode, selectedBusinessUnit, setSelectedBusinessUnit }) => {
  // Business Unit List
  const businessUnitListOption = useSelector(state => state.businessUnitListOption)
  const { business } = businessUnitListOption
  // Business Unit
  const [businessListOptions, setBusinessListOptions] = useState([])
  // Object to get selected Business Unit
  const handleSelectedBusinessUnit = (options) => {
    setSelectedBusinessUnit(options)
  }
    // Get Business Unit
    useEffect(() => {
        if(mode === 'Edit') {
            // Selected Business Unit 
            setSelectedBusinessUnit(selectedBusinessUnit || [])
        }
        // setState
        setBusinessListOptions(business || [])
    },[business, selectedBusinessUnit])
    
    return (
        <>
            <Select
                closeMenuOnSelect={false}
                isMulti
                options={businessListOptions}
                onChange={(e) => { 
                    handleSelectedBusinessUnit(e)
                    changeValueHandler('business_unit', selectedBusinessUnit)
                }}
                value={selectedBusinessUnit}
            />
        </>
    )
}

export default EditBusinessUnitOption