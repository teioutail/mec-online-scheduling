import React,{ useState, forwardRef } from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EmployeeListOption = () => {
  // useState
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  // Custom Textfield 
  const DatepickerCustomInput = forwardRef(({ value, onClick }, ref) => (
    <Form.Control 
        size='sm'
        type='text'
        placeholder='Activity Schedule'
        value={value}
        onClick={onClick} 
        ref={ref}
    />
  ));

  //
  return (
    <>
      <Row>
        <Col>
          <Table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th colspan="2" className="text-center text-uppercase text-xs font-weight-bolder opacity-7">DATE</th>
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
              <tr>
                <td>
                  <DatePicker
                      customInput={<DatepickerCustomInput />}
                      selected={fromDate} 
                      onChange={(date) => setFromDate(date)} 
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm"
                      showTimeInput
                  />
                </td>
                <td>
                    <DatePicker
                      customInput={<DatepickerCustomInput />}
                      selected={toDate} 
                      onChange={(date) => setToDate(date)}
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
                  <option value="New-Schedule">New Schedule Request</option>
                  <option value="Training-Schedule">Training Schedule</option>
                  </Form.Control>
                </td>
                <td className="align-middle">
                  <a href="#" className=" font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <Button variant="outline-secondary" size="sm" className=" font-weight-bold text-xs float-start">
                    <FontAwesomeIcon icon={['fas', 'user-group']} /> Add Employee
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
        </Col>
      </Row>
    </>
  )

}

export default EmployeeListOption