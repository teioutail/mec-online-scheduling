import React,{ useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-datepicker/dist/react-datepicker.css'
// import EmployeeListTableRows from './EmployeeListTableRows'
import SeTableRowsTime from './SeTableRowsTime'

const EmployeeUpdateCompletion = (props) => {
  //
  const { 
    changeValueHandler, 
    selectedEmployeeNames, 
    setSelectedEmployeeNames, 
    mode,
    scheduleType,
  } = props

  // Table Row Array For Engineers/Employee
  const [rowsData, setRowsData] = useState([])
  // Add New Row State
  const [addNewRowState, setAddNewRowState] = useState(0)
  // Get Status
  const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
  const { calendar: { employee_list } } = calendarScheduleDetails

  // Handle Adding Multiple Technician Feature
  const handleChange = (index, event) => {
    const { name, value } = event.target
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)
    setSelectedEmployeeNames(rowsData)
    changeValueHandler('employee_list', rowsData)
  }
  
  // Handle Adding Multiple SE/Employee
  const handleChangeAddEmployee = (index, name, value) => {
    //
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)
    setSelectedEmployeeNames(rowsData)
    changeValueHandler('employee_list', rowsData)
  }

  // 
  useEffect(() => {
    // 
    if(mode === 'Edit') {
      setSelectedEmployeeNames(employee_list)
      setRowsData(selectedEmployeeNames)
    }
  }, [selectedEmployeeNames])

  //
  return (
    <>
      <Row>
        <Col>
          <Table 
            responsive 
            className="table align-items-center mb-0"
          >
            <thead>
              {/* <tr>
                <td colSpan={5}>
                  <Button variant="outline-secondary" size="sm" onClick={addTableRows} className=" font-weight-bold text-xs float-start">
                      <FontAwesomeIcon icon={['fas', 'user-group']} /> Add {scheduleType === 'Training-Schedule' ? 'Attendees' : 'System Engineer'}
                  </Button>
                </td>
              </tr> */}
              <tr>
                <th colSpan="6" className="text-center text-uppercase text-xs font-weight-bolder opacity-7">System Engineer Details</th>
                <th className="opacity-7"></th>
              </tr>
              <tr>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">Time-In</th>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">Time-Out</th>
                <th className="text-center text-uppercase  text-xs font-weight-bolder opacity-7">{scheduleType === 'Training-Schedule' ? 'Attendees' : 'Engineers'}</th>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">Break Start</th>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">Break End</th>
                <th className="text-left text-xs font-weight-bolder opacity-7">No <br />Break</th>
              </tr>
            </thead>
            <tbody>
              <SeTableRowsTime
                rowsData={rowsData}
                setRowsData={setRowsData}
                handleChangeAddEmployee={handleChangeAddEmployee}
                handleChange={handleChange}
                mode={mode}
                addNewRowState={addNewRowState}
              />
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default EmployeeUpdateCompletion