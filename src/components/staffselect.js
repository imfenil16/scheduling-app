import React from 'react';

function StaffSelect({ value, onChange, staffMembers }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className='w-full text-center border'
    >
      <option value=''>Select Staff</option>
      {staffMembers.map((staff) => (
        <option key={staff} value={staff}>
          {staff}
        </option>
      ))}
    </select>
  );
}

export default StaffSelect;
