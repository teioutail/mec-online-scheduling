import React,{ useState, useEffect, useImperativeHandle, useRef} from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-datepicker/dist/react-datepicker.css'
import EmployeeListTableRows from './EmployeeListTableRows'

const EmployeeListOption = ({}, ref) => {
  // Table Row Array For Engineers/Employee
  const [rowsData, setRowsData] = useState([])
  // Training Schedule Component Reference
  const emp = useRef()

  // Add New Table Rows
  const addTableRows = () => {
    //
    const rowsInput = {
      employeeId: '',
      timeFrom: '',
      timeTo: '',
    }
    setRowsData([...rowsData, rowsInput])
  }

  // Delete Table Rows
  const deleteTableRows = (index) => {
    const rows = [...rowsData]
    rows.splice(index, 1)
    setRowsData(rows)
  }
  
  // Handle Adding Multiple Technician Feature
  const handleChange = (index, event) => {
    const { name, value } = event.target
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)

    // console.warn(rowsData)
  }
  
  // Handle Adding Multiple SE/Employee
  const handleChangeAddEmployee = (index, name, value) => {
    const rowsInput = [...rowsData]
    rowsInput[index][name] = value
    setRowsData(rowsInput)

    // console.warn(rowsData)
  }

  //
  useImperativeHandle(ref, () => {
    //
    return {
      employeeListTest: emp.testing,
    }
  })

  //
  return (
    <>
      <Row>
        <Col>
          <Table className="table align-items-center mb-0">
            <thead>
              <tr>
                <td colSpan={5}>
                  <Button variant="outline-secondary" size="sm" onClick={addTableRows} className=" font-weight-bold text-xs float-start">
                      <FontAwesomeIcon icon={['fas', 'user-group']} /> Add Employee
                  </Button>
                </td>
              </tr>
              <tr>
                <th colSpan="2" className="text-center text-uppercase text-xs font-weight-bolder opacity-7">DATE</th>
                <th className="opacity-7"></th>
              </tr>
              <tr>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">FROM</th>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">TO</th>
                <th className="text-center text-uppercase  text-xs font-weight-bolder opacity-7">EMPLOYEE</th>
                <th className="text-center text-uppercase text-xs font-weight-bolder opacity-7">ACTION</th>
                <th className="opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <EmployeeListTableRows 
                rowsData={rowsData} 
                deleteTableRows={deleteTableRows}
                handleChangeAddEmployee={handleChangeAddEmployee}
                handleChange={handleChange}
              />
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

// export default EmployeeListOption
export default React.forwardRef(EmployeeListOption)