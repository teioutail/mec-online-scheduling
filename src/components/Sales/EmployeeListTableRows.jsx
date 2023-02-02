import React,{ useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EmployeeListTableRows = ({ rowsData, deleteTableRows, handleChange }) => {
  // useState
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { emails:fullname } = userEmail

  // User List
  const fullNameOptions = fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  })
      
  // Custom Textfield 
  const DatepickerCustomInput = forwardRef(({ value, onClick,  }, ref) => (
    <Form.Control 
        size='sm'
        type='text'
        placeholder='Activity Schedule'
        defaultValue={value}
        onClick={onClick} 
        ref={ref}
    />
  ));

  return(
    // 
    rowsData.map((data, index)=>{
        // 
        const { employeeName, timeFrom, timeTo } = data;
        // const {fullName, emailAddress, salary} = data;

        return(
            <>
                {/* <tr key={index}>    
                    <td>
                        <input type="text" value={employeeName} onChange={(evnt)=>(handleChange(index, evnt))} name="employeeName" className="form-control"/>
                    </td>
                    <td><input type="text" value={timeFrom}  onChange={(evnt)=>(handleChange(index, evnt))} name="timeFrom" className="form-control"/> </td>
                    <td><input type="text" value={timeTo}  onChange={(evnt)=>(handleChange(index, evnt))} name="timeTo" className="form-control" /> </td>
                    <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
                </tr> */}
                
                <tr key={index}>
                    <td>
                        <DatePicker
                            customInput={<DatepickerCustomInput />}
                            selected={fromDate} 
                            // onChange={(date) => setFromDate(date)}
                            onChange={(evnt)=>(handleChange(index, evnt))}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm"
                            showTimeInput
                        />
                    </td>
                    <td>
                        <DatePicker
                            customInput={<DatepickerCustomInput />}
                            selected={toDate} 
                            // onChange={(date) => setToDate(date)}
                            onChange={(evnt)=>(handleChange(index, evnt))}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy h:mm"
                            showTimeInput
                        />
                    </td>
                    <td className="align-middle text-center text-sm">
                        <Form.Control
                        size='sm'
                        as='select' 
                        aria-label="Status"
                        // value={scheduleType}
                        // onChange={(e) => setScheduleType(e.target.value)}
                        >
                        <option value="">- Select -</option>
                        { fullNameOptions }
                        </Form.Control>
                    </td>
                    <td className="align-middle">
                        <a onClick={deleteTableRows} className="btn btn-link text-danger text-gradient px-3 mb-0">
                            <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
                        </a>
                    </td>
                </tr>
            </>
        )
    })
)
}

export default EmployeeListTableRows