import React, { useState } from 'react';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState({});
  const staffMembers = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'];

  const handleStaffSelect = (day, timeSlot, staff) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [timeSlot]: staff,
      },
    }));
  };

  const countStaffLoad = (staff, day) => {
    const daySchedule = schedule[day] || {};
    return Object.values(daySchedule).filter(
      (staffMember) => staffMember === staff
    ).length;
  };

  return (
    <div className='App'>
      <h1>Schedule</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Morning UpStairs</td>
            <td>
              <select
                value={schedule['Monday']?.['Morning UpStairs'] || ''}
                onChange={(e) =>
                  handleStaffSelect(
                    'Monday',
                    'Morning UpStairs',
                    e.target.value
                  )
                }
              >
                <option value=''>Select Staff</option>
                {staffMembers.map((staff) => (
                  <option key={staff} value={staff}>
                    {staff}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Load Section</h2>
      <table>
        <thead>
          <tr>
            <th>Staff Member</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff) => (
            <tr key={staff}>
              <td>{staff}</td>
              <td>{countStaffLoad(staff, 'Monday')}</td>
              <td>{countStaffLoad(staff, 'Tuesday')}</td>
              <td>{countStaffLoad(staff, 'Wednesday')}</td>
              <td>{countStaffLoad(staff, 'Thursday')}</td>
              <td>{countStaffLoad(staff, 'Friday')}</td>
              <td>
                {countStaffLoad(staff, 'Monday') +
                  countStaffLoad(staff, 'Tuesday') +
                  countStaffLoad(staff, 'Wednesday') +
                  countStaffLoad(staff, 'Thursday') +
                  countStaffLoad(staff, 'Friday')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
