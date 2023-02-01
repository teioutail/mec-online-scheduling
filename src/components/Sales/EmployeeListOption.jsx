import React,{ useState, useEffect, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { Button, Form, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getUsersEmailList } from '../../actions/userActions'

const EmployeeListOption = () => {
  // useState
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  // Get Fullname, Users Id
  const userEmail = useSelector(state => state.userEmail)
  const { loading, emails:fullname } = userEmail
  // 
  const fullNameOptions = fullname.map((row, key) => {
    return <option
      key={key}
      value={row.id}
    >{ row.label }
    </option>
  })

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
                  { fullNameOptions }
                  </Form.Control>
                </td>
                <td className="align-middle">
                  <a className="btn btn-link text-danger text-gradient px-3 mb-0">
                    {/* <i className="far fa-trash-alt me-2"></i>Delete */}
                    <FontAwesomeIcon className="me-2" icon={['fas', 'trash-alt']} /> Delete
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