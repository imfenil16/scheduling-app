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

  const randomizeEmptyShifts = () => {
    const staffPool = [...staffMembers];

    timeSlots.forEach((timeSlot) => {
      if (!schedule[timeSlot]) {
        // Shuffle the staffPool to randomize staff assignment
        for (let i = staffPool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [staffPool[i], staffPool[j]] = [staffPool[j], staffPool[i]];
        }

        const day = 'Monday'; // You can adjust the day for randomization
        const staff = staffPool.pop();
        handleStaffSelect(day, timeSlot, staff);
      }
    });
  };

  const calculateStaffNeeded = () => {
    const neededStaff = {};

    timeSlots.forEach((timeSlot) => {
      const daySchedule = schedule[timeSlot] || {};

      staffMembers.forEach((staff) => {
        if (!daySchedule[staff]) {
          if (!neededStaff[staff]) {
            neededStaff[staff] = 1;
          } else {
            neededStaff[staff]++;
          }
        }
      });
    });

    console.log('Staff needed for each time slot:');
    console.log(neededStaff);
  };

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-2xl mb-4 text-center'>Schedule</h1>
      {/* <div>
        <button
          onClick={randomizeEmptyShifts}
          className='bg-blue-500 text-white px-4 py-2 mt-4 rounded'
        >
          Randomize Empty Shifts
        </button>
        <button
          onClick={calculateStaffNeeded}
          className='bg-green-500 text-white px-4 py-2 mt-4 rounded'
        >
          Calculate Staff Needed
        </button>
      </div> */}
      <table className='table-auto border border-collapse w-full'>
        <thead>
          <tr className='w-full text-center border'>
            <th></th>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
              (day) => (
                <th key={day} className='text-center border'>
                  {day}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot}>
              <td className='font-medium text-center border'>{timeSlot}</td>
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

      <h2 className='text-2xl my-4 text-center'>Load Section</h2>
      <table className='table-auto border border-collapse w-full'>
        <thead>
          <tr className='text-center border'>
            <th>Staff Member</th>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
              (day) => (
                <th key={day} className='text-center border'>
                  {day}
                </th>
              )
            )}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff) => (
            <tr key={staff}>
              <td className='text-center border'>{staff}</td>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                (day) => (
                  <td key={day} className='text-center border'>
                    {countStaffLoad(staff, day)}
                  </td>
                )
              )}
              <td className='text-center border'>
                {calculateTotalLoad(staff)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
