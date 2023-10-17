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
    const currentDaySchedule = schedule[day] || {};
    const prevTimeSlot = timeSlots[timeSlots.indexOf(timeSlot) - 1];

    // Level 5: Prevent Consecutive Lunch Slots
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

    // Level 6: Prevent More than 2 Shifts per Day
    if (
      Object.values(currentDaySchedule).filter((s) => s === staff).length >= 2
    ) {
      alert('A staff member cannot have more than 2 shifts in a day.');
      return;
    }

    // Level 7: Prevent More than 7 Shifts per Week
    const totalShifts = timeSlots.reduce((acc, slot) => {
      const slotDaySchedule = schedule[day] || {};
      return acc + (slotDaySchedule[slot] === staff ? 1 : 0);
    }, 0);

    if (totalShifts >= 7) {
      alert('A staff member cannot have more than 7 shifts in a week.');
      return;
    }

    // Level 8: Prevent Double Booking
    const otherSlotOnSameDay = timeSlots.find(
      (slot) => slot !== timeSlot && currentDaySchedule[slot] === staff
    );

    if (otherSlotOnSameDay) {
      alert(`Staff member ${staff} cannot be in two places at once on ${day}.`);
      return;
    }

    // Update the schedule
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
      Object.values(schedule).forEach((daySchedule) => {
        if (daySchedule[timeSlot] === staff) {
          totalLoad++;
        }
      });
    });
    return totalLoad;
  };

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-2xl mb-4'>Schedule</h1>
      <table className='table-auto border border-collapse w-full'>
        <thead>
          <tr>
            <th></th>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
              (day) => (
                <th key={day}>{day}</th>
              )
            )}
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
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
              (day) => (
                <th key={day}>{day}</th>
              )
            )}
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
