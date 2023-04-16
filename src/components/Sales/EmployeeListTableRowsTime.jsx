import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
// import moment from 'moment'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

const EmployeeListTableRowsTime = (props) => {
  //
  const { 
    rowsData, 
    deleteTableRows, 
    handleChangeAddEmployee, 
    handleChange, 
    mode, 
 } = props

  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { emails:fullname } = userEmail

  // Get Status
  const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
  const { calendar: { status } } = calendarScheduleDetails

  // User List
  const fullNameOptions = (fullname ? fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  }) : <></>)

  return(
    // 
    rowsData.map((data, index) => {
        // 
        const { employeeId, duration, employeeName } = data;

        return(
            <tr key={index}>
                <td colSpan="2">
                    <TimeRangePicker 
                        className='form-control form-control-sm'
                        onChange={(time) => {
                            handleChangeAddEmployee(index, "duration", time)
                        }}
                        value={duration}
                        clearIcon={null}
                        clockIcon={null}
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
                
                <td className="align-middle">
                    {status !== 'Approved' &&
                        <>
                            <a onClick={(e) => deleteTableRows(e, index)} className="btn btn-link text-danger text-gradient px-3 mb-0">
                                <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
                            </a>
                        </>
                    }
                </td>
            </tr>
        )
    })
)
}

export default EmployeeListTableRowsTime