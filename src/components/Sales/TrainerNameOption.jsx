import React, { useState, useEffect } from 'react'
import CreateTrainerNameSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'

const TrainerNameOption = (props) => {
  // React Select
  const {
    trainer, options, 
    selectedTrainerNames, setSelectedTrainerNames, 
    changeValueHandler 
  } = props

  // const animatedComponents = makeAnimated();
  //
  const handleSelectedTrainers = (options) => {
    // setSelectedTrainers(options)
    changeValueHandler('trainer_name',options)
    setSelectedTrainerNames(options);
  }
 
  return (
      <>
          <CreateTrainerNameSelect
              closeMenuOnSelect={false}
              isMulti
              isClearable
              options={options}
              onChange={handleSelectedTrainers}
              value={selectedTrainerNames}
              // components={animatedComponents}
              placeholder={(trainer === 'SE' ? 
              <div>Select System Engineer</div> : 
              <div>Enter Trainer Name</div>)}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
          />
      </>
  )
  
}

export default TrainerNameOption