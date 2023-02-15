import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'

const EditBusinessUnitOption = ({ scheduleDetails, changeValueHandler }) => {
  // React Select
  const animatedComponents = makeAnimated();

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
        // Selected Schedule Details
        const {
            business_unit,
        } = scheduleDetails
        // setState
        setBusinessListOptions(business || [])
        // console.warn(businessListOptions)
        // Selected Business Unit 
        setSelectedBusinessUnit(business_unit || [])
    }, [business])
    
    return (
        <>
            <Select
                closeMenuOnSelect={false}
                isMulti
                components={animatedComponents}
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