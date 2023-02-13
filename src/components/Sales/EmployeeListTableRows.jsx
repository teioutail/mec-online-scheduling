import React,{ useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment/moment'

const EmployeeListTableRows = ({ rowsData, deleteTableRows, handleChangeAddEmployee, handleChange }, ref) => {

  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { emails:fullname } = userEmail

  // User List
  const fullNameOptions = (fullname ? fullname.map((row, key) => {
    return <option key={ key } value={ row.id }>{ row.label }</option>
  }) : <></>)

    //
    useImperativeHandle(ref, () => {
        //
        const rowsData2 = [...rowsData]
        console.warn(rowsData2)
        //
        return {
            testing: 'abc123',
            // testing: rowsData,
            
        }
    })

  return(
    // 
    rowsData.map((data, index) => {
        // 
        const { employeeId, timeFrom, timeTo } = data;
        
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
                            className='form-control form-control-sm'
                            selected={timeFrom} 
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
                            selected={timeTo} 
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

// export default EmployeeListTableRows
export default React.forwardRef(EmployeeListTableRows)