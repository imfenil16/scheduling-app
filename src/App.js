import React, { useState } from 'react';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState({});

  const handleStaffSelect = (day, timeSlot, staff) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...prevSchedule[day],
        [timeSlot]: staff,
      },
    }));
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
                <option value='X1'>X1</option>
                <option value='X2'>X2</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
