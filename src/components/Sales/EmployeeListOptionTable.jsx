import React,{ useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Button, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-datepicker/dist/react-datepicker.css'
// import EmployeeListTableRows from './EmployeeListTableRows'
import EmployeeListTableRowsTime from './EmployeeListTableRowsTime'

const EmployeeListOptionTable = (props) => {
  //
  const { 
    changeValueHandler, 
    selectedEmployeeNames, 
    setSelectedEmployeeNames, 
    mode,
    scheduleType,
  } = props

  // Get Status
  const calendarScheduleDetails = useSelector(state => state.calendarScheduleDetails)
  const { calendar: { status } } = calendarScheduleDetails

  // Table Row Array For Engineers/Employee
  const [rowsData, setRowsData] = useState([])
  // Add New Row State
  const [addNewRowState, setAddNewRowState] = useState(0)

  // console.warn(rowsData)

  // Add New Table Rows
  const addTableRows = () => {
    // 
    const rowsInput = {
      employeeId: '',
      duration: '',
      employeeName:'',
    }
    // 
    setAddNewRowState(true)
    setRowsData([...rowsData, rowsInput])
  }

  // Delete Table Rows
  const deleteTableRows = (e, index) => {
    const rows = [...rowsData].filter((v,i) => i !== index)
    // const indx = rows.indexOf(index)
    // rows.splice(indx, 1)
    setRowsData(rows)
    e.preventDefault();
  }
  
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
    // 
    console.warn(rowsInput)
  }

  // 
  useEffect(() => {
    // 
    if(mode === 'Edit') {
     setRowsData(selectedEmployeeNames)
    }
  }, [selectedEmployeeNames])

  //
  return (
    <>
      <Row>
        <Col>
          <Table className="table align-items-center mb-0">
            <thead>
              {mode === 'Add' && 
              // {status !== 'Approved' && 
                <>
                  <tr>
                    <td colSpan={5}>
                      <Button variant="outline-secondary" size="sm" onClick={addTableRows} className=" font-weight-bold text-xs float-start">
                          <FontAwesomeIcon icon={['fas', 'user-group']} /> Add {scheduleType === 'Training-Schedule' ? 'Attendees' : 'System Engineer'}
                      </Button>
                    </td>
                  </tr>
                </>
              }
              <tr>
                <th colSpan="3" className="text-center text-uppercase text-xs font-weight-bolder opacity-7">DATE</th>
                <th className="opacity-7"></th>
              </tr>
              <tr>
                <th colSpan="2" className="text-uppercase text-center text-xs font-weight-bolder opacity-7">SCHEDULED TIME</th>
                <th className="text-center text-uppercase  text-xs font-weight-bolder opacity-7">{scheduleType === 'Training-Schedule' ? 'Attendees' : 'Engineers'}</th>
                {status !== 'Approved' && <th className="text-center text-uppercase text-xs font-weight-bolder opacity-7">ACTION</th>}
              </tr>
            </thead>
            <tbody>
              <EmployeeListTableRowsTime 
                rowsData={rowsData} 
                deleteTableRows={deleteTableRows}
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

export default EmployeeListOptionTable