import React from 'react'
import moment from 'moment'

const ExpandableRowComponentTraining = (d) => {
    // 
    return (
        <>
            <table className="table align-items-center mb-0" >
                <tbody>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Training Type</b></td>
                        <td className="align-middle text-left text-sm">{d.data.training_type}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Training Topic</b></td>
                        <td className="align-middle text-left text-sm">{d.data.training_topic}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Trainer</b></td>
                        <td className="align-middle text-left text-sm">{d.data.trainer}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Venue</b></td>
                        <td className="align-middle text-left text-sm">{d.data.venue}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Attendees</b></td>
                        <td className="align-middle text-left text-sm">{d.data.employeeNames}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Training Schedule</b></td>
                        <td className="align-middle text-left text-sm">{`${moment(JSON.parse(d.data.training_schedule)[0]).format('L')} - ${moment(JSON.parse(d.data.training_schedule)[1]).format('L')}`}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Duration</b></td>
                        <td className="align-middle text-left text-sm">{`${JSON.parse(d.data.duration)[0]} - ${JSON.parse(d.data.duration)[1]}`}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Status</b></td>
                        <td className="align-middle text-left text-sm">{d.data.status}</td>
                    </tr>
                </tbody>
            </table>   
        </>
    );
}

export default ExpandableRowComponentTraining