import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
// import moment from 'moment'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

const SeTableRowsTime = (props) => {
  //
  const { 
    rowsData,
    deleteTableRows, 
    handleChangeAddEmployee, 
    handleChange,
    mode,
    addNewRowState,
 } = props

  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { emails:fullname } = userEmail
  
  // User List
  const fullNameOptions = (fullname ? fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  }) : <></>)

//   console.warn(rowsData)

  return(
  // 
  rowsData.map((data, index) => {
      //
      const { employeeId, duration } = data;
      
      console.warn(employeeId)

      return(
          <tr key={index}>
              <td colSpan="2">
                  <TimeRangePicker 
                      className='form-control form-control-sm'
                      onChange={(time) => {
                          handleChangeAddEmployee(index, "time", time)
                      }}
                      // value={(addNewRowState === true ? JSON.parse(duration) : duration)}
                      // Error nag uupdate lahat pag nag add ng new column ayusin mo 
                      value={(mode === 'Edit' && addNewRowState === true  ? ['09:00','16:00'] : duration  )}
                      // value={duration}
                      disableClock 
                  /> 
              </td>
              <td className="align-middle text-center text-sm">
                  <Form.Control
                      size='sm'
                      as='select' 
                      aria-label="Status"
                      onChange={(e) => {
                          // 
                          handleChange(index, e)
                          handleChangeAddEmployee(index, "employeeName", e.target.options[e.target.selectedIndex].text)
                      }}
                      value={employeeId}
                      name="employeeId"
                      // onChange={(e) => setScheduleType(e.target.value)}
                  >
                  <option value="">- Select -</option>
                  { fullNameOptions }
                  </Form.Control>
              </td>                
              <td colSpan="2">
                  <TimeRangePicker 
                      className='form-control form-control-sm'
                      onChange={(time) => {
                          handleChangeAddEmployee(index, "break", time)
                      }}
                      // value={(addNewRowState === true ? JSON.parse(duration) : duration)}
                      // Error nag uupdate lahat pag nag add ng new column ayusin mo 
                      value={['12:00','13:00']}
                      // value={(mode === 'Edit' && addNewRowState === true  ? ['12:00','13:00'] : duration  )}
                      // value={duration}
                      disableClock
                  /> 
              </td>
              <td>
                  <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="" />
                  </Form.Group>
              </td>
          </tr>
      )
  })
  )
}

export default SeTableRowsTime