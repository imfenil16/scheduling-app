import React from 'react';

const LoadSection = ({ schedule, staffMembers, timeSlots }) => {
  // Function to count the number of shifts a staff member has on a specific day
  const countStaffLoad = (staff, day) => {
    const daySchedule = schedule[day] || {};
    return Object.values(daySchedule).filter(
      (staffMember) => staffMember === staff
    ).length;
  };

  // Function to calculate the total number of shifts a staff member has
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
                  {/* Display the number of shifts for each day */}
                  {countStaffLoad(staff, day)}
                </td>
              )
            )}
            <td className='text-center border'>{calculateTotalLoad(staff)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadSection;
