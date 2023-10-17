import React, { useState } from 'react';
import './App.css';
import StaffSelect from './components/staffselect';

const staffMembers = ['X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'];

const timeSlots = [
  'Morning UpStairs',
  'Morning Down Stairs',
  'Morning Parking Lot',
  'Lunch A',
  'Lunch B',
  'Lunch C',
  'Lunch D',
  'Afternoon UpStairs',
  'Afternoon Down Stairs',
  'Afternoon Parking Lot',
];

function App() {
  const [schedule, setSchedule] = useState({});

  const handleStaffSelect = (day, timeSlot, staff) => {
    // Prevent consecutive lunch slots
    const currentDaySchedule = schedule[day] || {};
    const prevTimeSlot = timeSlots[timeSlots.indexOf(timeSlot) - 1];
    if (
      prevTimeSlot &&
      currentDaySchedule[prevTimeSlot] === staff &&
      timeSlot.includes('Lunch')
    ) {
      alert(
        'Consecutive lunch slots for the same staff member are not allowed.'
      );
      return;
    }

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [day]: {
        ...currentDaySchedule,
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

  const calculateTotalLoad = (staff) => {
    let totalLoad = 0;
    timeSlots.forEach((timeSlot) => {
      const daySchedule = schedule[timeSlot] || {};
      if (daySchedule[staff]) {
        totalLoad++;
      }
    });
    return totalLoad;
  };

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-2xl mb-4'>Schedule</h1>
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
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td>{timeSlot}</td>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                (day) => (
                  <td key={day}>
                    <StaffSelect
                      value={schedule[day]?.[timeSlot] || ''}
                      onChange={(e) =>
                        handleStaffSelect(day, timeSlot, e.target.value)
                      }
                      staffMembers={staffMembers}
                    />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className='text-2xl my-4'>Load Section</h2>
      <table className='table-auto border border-collapse w-full'>
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
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                (day) => (
                  <td key={day}>{countStaffLoad(staff, day)}</td>
                )
              )}
              <td>{calculateTotalLoad(staff)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
