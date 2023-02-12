import React, { useState, useEffect, useRef } from 'react'
import CreateTrainerNameSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'
import { useImperativeHandle } from 'react'

const TrainerNameOption = ({ scheduleDetails }, ref) => {
  // React Select
  const animatedComponents = makeAnimated();
  // useRef
  const trainerNameRef = useRef()
  // Trainer Name
  const [trainerName, setTrainerName] = useState([])
  // Trainer Name List
  const businessUnitListOption = useSelector(state => state.businessUnitListOption)
  const { business } = businessUnitListOption
  // Business Unit
  const [businessListOptions, setBusinessListOptions] = useState([])
  // Object to get selected Business Unit
  const handleSelectedBusinessUnit = (options) => {
    setSelectedBusinessUnit(options)
  }
  
  // 
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])

  // Pass the reference value
  useImperativeHandle(ref, () => {
    // Get field values
    return {
        businessUnit: selectedBusinessUnit,
    }
  })

  // Get Business Unit
  useEffect(() => {
      // Selected Schedule Details
      // const {
      //     business_unit,
      // } = scheduleDetails
      // setState
      setBusinessListOptions(business || [])
      // console.warn(businessListOptions)
      // Selected Business Unit 
      // setSelectedBusinessUnit(business_unit || [])
  }, [business])
    
  return (
      <>
          <CreateTrainerNameSelect
              closeMenuOnSelect={false}
              isMulti
              isClearable
              components={animatedComponents}
              options={businessListOptions}
              onChange={handleSelectedBusinessUnit}
              value={selectedBusinessUnit}
              ref={trainerNameRef}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
          />
      </>
  )
  
}

export default React.forwardRef(TrainerNameOption)