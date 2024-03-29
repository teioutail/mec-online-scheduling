import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'

const EmployeeListTableRows = (props) => {
  //
  const { 
    rowsData, 
    deleteTableRows, 
    handleChangeAddEmployee, 
    handleChange, 
    mode, 
 } = props

  const [duration, setDuration] = useState(['09:00', '18:00'])

  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { emails:fullname } = userEmail

  // User List
  const fullNameOptions = (fullname ? fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  }) : <></>)

  return(
    // 
    rowsData.map((data, index) => {
        // 
        const { employeeId, timeFrom, timeTo } = data;
        
        // console.log(data);
        return(
            <tr key={index}>
                <td>
                    <DatePicker
                        className='form-control form-control-sm'
                        selected={(mode === 'Edit' ? (timeFrom ? moment(timeFrom).toDate() : moment().toDate()) : timeFrom)} 
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm a"
                        showTime = {{ user12hours: true }} 
                        showTimeInput
                        onChange={(e) => handleChangeAddEmployee(index, "timeFrom", e)}
                    />
                </td>
                <td>
                    <DatePicker
                        className='form-control form-control-sm'
                        selected={(mode === 'Edit' ? (timeTo ? moment(timeTo).toDate() : moment().toDate())  : timeTo)} 
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm a"
                        showTime = {{ user12hours: true }} 
                        showTimeInput
                        onChange={(e) => handleChangeAddEmployee(index, "timeTo", e)}
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
                    <a onClick={(e) => deleteTableRows(e, index)} className="btn btn-link text-danger text-gradient px-3 mb-0">
                        <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
                    </a>
                </td>
            </tr>
        )
    })
)
}

export default EmployeeListTableRows