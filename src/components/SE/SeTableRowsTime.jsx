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
      
    //   console.warn(employeeId)

      return(
          <tr key={index}>
              <td colSpan="2">
                  <TimeRangePicker 
                      className='form-control form-control-sm'
                      onChange={(time) => {
                          handleChangeAddEmployee(index, "time", time)
                      }}
                      value={['09:00','18:00']}
                      disableClock 
                  /> 
              </td>
              <td className="align-middle text-center text-sm">
                  <Form.Control
                      size='sm'
                      as='select' 
                      aria-label="Status"
                      disabled
                      onChange={(e) => {
                          // 
                          handleChange(index, e)
                          handleChangeAddEmployee(index, "employeeName", e.target.options[e.target.selectedIndex].text)
                      }}
                      value={employeeId}
                      name="employeeId"
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
                      value={['12:00','13:00']}
                      disableClock
                  /> 
              </td>
              <td>
                {/* Balikan mo to  */}
                  <Form.Group controlId="formBasicCheckbox">
                      <Form.Check 
                        type="checkbox" 
                        label="" 
                        onChange={(e) => {
                            handleChangeAddEmployee(index, "nobreak", e)
                        }}
                    />
                  </Form.Group>
              </td>
          </tr>
      )
  })
  )
}

export default SeTableRowsTime