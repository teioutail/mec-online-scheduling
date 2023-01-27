import React from 'react'
import { Button, Modal, Form, Row, Col, Table } from 'react-bootstrap' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EmployeeListOption = () => {
  //
  return (
    <>
      <Row>
        <Col>
          <Table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-xs font-weight-bolder opacity-7">DATE</th>
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
                <span className="text-xs font-weight-bold">23/04/18</span>
              </td>
              <td>
                <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='HH:MM'
                  // value={projectName}
                  // onChange={(e) => setProjectName(e.target.value)}
                />
              </td>
              <td>
                <Form.Control 
                  size='sm'
                  type='text'
                  placeholder='HH:MM'
                  // value={projectName}
                  // onChange={(e) => setProjectName(e.target.value)}
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