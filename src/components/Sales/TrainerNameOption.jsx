import React, { useState, useEffect } from 'react'
import CreateTrainerNameSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated'

const TrainerNameOption = ({trainer, trainerNames, selectedTrainerNames, setSelectedTrainerNames, changeValueHandler }) => {
  // React Select
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
              // components={animatedComponents}
              options={trainerNames}
              onChange={handleSelectedTrainers}
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