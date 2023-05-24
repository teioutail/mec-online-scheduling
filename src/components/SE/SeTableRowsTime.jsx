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
    handleCheckboxChange,
    // mode,
    // addNewRowState,
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
      const { employeeId, time:realtime, break:realbreak, nobreak:realnobreak } = data;

      return(
          <tr key={index}>
              <td colSpan="2">
                  <TimeRangePicker 
                      className='form-control form-control-sm'
                      onChange={(time) => {
                          handleChangeAddEmployee(index, "time", time)
                      }}
                      value={realtime ? realtime : ['09:00','18:00']}
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
                      value={realbreak ? realbreak : ['12:00','13:00']}
                      disabled={realnobreak ? true : false}
                      disableClock
                  /> 
              </td>
              <td>
                {/* Balikan mo to  */}
                  <Form.Group controlId="formBasicCheckbox">
                      <Form.Check 
                        type="checkbox" 
                        label="" 
                        name="nobreak"
                        disabled={realnobreak ? true : false}
                        checked={realnobreak ? true : false}
                        onChange={(e) => {
                            handleCheckboxChange(index, "nobreak", e)
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