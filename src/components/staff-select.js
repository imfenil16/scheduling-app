import React from 'react';

const StaffSelect = ({ value, onChange, staffMembers }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className='w-full text-center border'
    >
      {/* Display default option */}
      <option value=''>Select Staff</option>
      {/* Display options for each staff member */}
      {staffMembers.map((staff) => (
        <option key={staff} value={staff}>
          {staff}
        </option>
      ))}
    </select>
  );
};

export default StaffSelect;
