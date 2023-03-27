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

  // User Login Info
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // User List
  const fullNameOptions = (fullname ? fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  }) : <></>)

  return(
    // 
    rowsData.map((data, index) => {
        // 
        // const { employeeId, timeFrom, timeTo } = data;
        const { employeeId, duration } = data;
        // console.warn(data);
        return(
            <tr key={index}>
                <td colSpan="2">
                    {/* <DatePicker
                        className='form-control form-control-sm'
                        selected={(mode === 'Edit' ? (timeFrom ? moment(timeFrom).toDate() : moment().toDate()) : timeFrom)} 
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm a"
                        showTime = {{ user12hours: true }} 
                        showTimeInput
                        onChange={(e) => handleChangeAddEmployee(index, "timeFrom", e)}
                    /> */}
                    {/* <td>
                    <DatePicker
                        className='form-control form-control-sm'
                        selected={(mode === 'Edit' ? (timeTo ? moment(timeTo).toDate() : moment().toDate())  : timeTo)} 
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm a"
                        showTime = {{ user12hours: true }} 
                        showTimeInput
                        onChange={(e) => handleChangeAddEmployee(index, "timeTo", e)}
                    />
                    </td> */}

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
                        onChange={(e)=>(handleChange(index, e))}
                        value={employeeId}
                        name="employeeId"
                        // onChange={(e) => setScheduleType(e.target.value)}
                    >
                    <option value="">- Select -</option>
                    { fullNameOptions }
                    </Form.Control>
                </td>
                <td className="align-middle">
                    <a onClick={(e) => deleteTableRows(e, index)}className="btn btn-link text-danger text-gradient px-3 mb-0">
                        <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
                    </a>
                </td>
                {/* <td className="align-middle">
                    {userInfo.user_role !== 'Sales' && 
                    <>
                        <a onClick={deleteTableRows} className="btn btn-link text-danger text-gradient px-3 mb-0">
                            <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
                        </a>
                    </>} 
                </td> */}
            </tr>
        )
    })
)
}

export default EmployeeListTableRowsTime