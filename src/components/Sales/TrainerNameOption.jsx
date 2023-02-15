import React, { useState, useEffect } from 'react'
import CreateTrainerNameSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'
import { useSelector } from 'react-redux'

const TrainerNameOption = ({ scheduleDetails, trainer, trainerNames, selectedTrainerNames, setSelectedTrainerNames, changeValueHandler }) => {
  // React Select
  const animatedComponents = makeAnimated();
  
  //
  const handleSelectedTrainers = (options) => {
    // setSelectedTrainers(options)
    changeValueHandler('trainer_name',options)
    setSelectedTrainerNames(options);
  }
 
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
              value={selectedTrainerNames}
              placeholder={(trainer === 'SE' ? 
              <div>Select System Engineer</div> : 
              <div>Enter Trainer Name</div>)}
              // defaultValue={[colourOptions[4], colourOptions[5]]}
          />
      </>
  )
  
}

export default TrainerNameOption