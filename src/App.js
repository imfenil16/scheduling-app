import React, { useState } from 'react';
import './App.css';
import ShiftTable from './components/shift-table';
import LoadSection from './components/load-section';

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

const App = () => {
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
    calculateStaffNeeded();
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

        // Randomly select a day for assignment
        const randomDay = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ][Math.floor(Math.random() * 5)];
        const staff = staffPool.pop();
        handleStaffSelect(randomDay, timeSlot, staff);
      }
    });
    calculateStaffNeeded();
  };

  const calculateStaffNeeded = () => {
    const neededStaff = {};

    timeSlots.forEach((timeSlot) => {
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(
        (day) => {
          const daySchedule = schedule[day] || {};
          const staffAssigned = daySchedule[timeSlot];

          if (!staffAssigned) {
            if (!neededStaff[day]) {
              neededStaff[day] = [];
            }
            neededStaff[day].push(timeSlot);
          }
        }
      );
    });

    console.log('Staff needed to fill all shifts while respecting the rules:');
    console.log(neededStaff);
  };

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-2xl text-center'>Schedule</h1>
      <div className='flex justify-center items-center gap-5 my-5'>
        <button
          onClick={randomizeEmptyShifts}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Randomize Empty Shifts
        </button>
        <button
          onClick={calculateStaffNeeded}
          className='bg-green-500 text-white px-4 py-2 rounded'
        >
          Calculate Staff Needed
        </button>
      </div>
      <ShiftTable
        schedule={schedule}
        handleStaffSelect={handleStaffSelect}
        staffMembers={staffMembers}
        timeSlots={timeSlots}
      />

      <h2 className='text-2xl my-4 text-center'>Load Section</h2>
      <LoadSection
        schedule={schedule}
        staffMembers={staffMembers}
        timeSlots={timeSlots}
      />
    </div>
  );
};

export default App;
