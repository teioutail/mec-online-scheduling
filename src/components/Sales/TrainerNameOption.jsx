import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import CreateTrainerNameSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'

const TrainerNameOption = ({ scheduleDetails, trainer, trainerNames }, ref) => {
  // React Select
  const animatedComponents = makeAnimated();
  // useRef
  const emp = useRef()

  // Trainer Name
  const [trainerName, setTrainerName] = useState([])
  // Trainer Name List
  const businessUnitListOption = useSelector(state => state.businessUnitListOption)
  const { business } = businessUnitListOption

  // Business Unit
  const [businessListOptions, setBusinessListOptions] = useState([])

  // Object to get selected Business Unit
  // const handleSelectedBusinessUnit = (options) => {
  //   setSelectedBusinessUnit(options)
  // }
  
  // // 
  // const [selectedBusinessUnit, setSelectedBusinessUnit] = useState([])

  const handleSelectedTrainers = (options) => {
    setSelectedTrainers(options)
  }

  const [selectedTrainers, setSelectedTrainers] = useState([])

  // Pass the reference value
  useImperativeHandle(ref, () => {
    // Get field 
    // console.warn(selectedTrainers)
    return {
      trainerNames: selectedTrainers,
    }
  })

  // // Get Business Unit
  // useEffect(() => {
  //     // Selected Schedule Details
  //     // const {
  //     //     business_unit,
  //     // } = scheduleDetails
  //     // setState
  //     setBusinessListOptions(business || [])
  //     // console.warn(businessListOptions)
  //     // Selected Business Unit 
  //     // setSelectedBusinessUnit(business_unit || [])
  // }, [business])

  // Get Business Unit
  useEffect(() => {

  })
    
  return (
      <>
      {/* <h1>{selectedTrainers}</h1> */}
          <CreateTrainerNameSelect
              closeMenuOnSelect={false}
              isMulti
              isClearable
              components={animatedComponents}
              options={trainerNames}
              onChange={handleSelectedTrainers}
              // options={(trainer === 'SE' && trainerNames)}
              value={selectedTrainers}
              ref={emp}
              placeholder={(trainer === 'SE' ? 
              <div>Select System Engineer</div> : 
              <div>Enter Trainer Name</div>)}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
          />
      </>
  )
  
}

export default React.forwardRef(TrainerNameOption)