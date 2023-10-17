import React from 'react';
import StaffSelect from './staff-select';

// Function component for rendering the ShiftTable
const ShiftTable = ({
  schedule,
  handleStaffSelect,
  staffMembers,
  timeSlots,
}) => {
  return (
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
                  {/* Render the StaffSelect component */}
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
  );
};

export default ShiftTable;
