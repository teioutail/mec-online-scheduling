import React from 'react'
import moment from 'moment';

const ExpandableRowComponent = (d) => {
    // 
    return (
        <>
            <table className="table align-items-center mb-0" >
                <tbody>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Reference Id</b></td>
                        <td className="align-middle text-left text-sm">{d.data.reference_id}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Activity</b></td>
                        <td className="align-middle text-left text-sm">{d.data.activity}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Activity Date</b></td>
                        <td className="align-middle text-left text-sm">{`${moment(JSON.parse(d.data.activity_date)[0]).format('L')} - ${moment(JSON.parse(d.data.activity_date)[1]).format('L')}`}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Date Requested</b></td>
                        <td className="align-middle text-left text-sm">{d.data.date_requested}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Employee Names</b></td>
                        <td className="align-middle text-left text-sm">{JSON.parse(d.data.employeeNames).toString()}</td>
                    </tr>
                    <tr>
                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"><b>Related Team</b></td>
                        <td className="align-middle text-left text-sm">{d.data.related_team}</td>
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

export default ExpandableRowComponent