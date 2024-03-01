// import React from 'react';
import useMembers from './useMembers';

function RoomMembers() {
  const { members } = useMembers();
  console.log(`members: ${members}`);

  return (
    <div>
      {members && members.length > 0 ? (
        <div>{members}</div>
      ) : (
        <p>No one has joined the room yet</p>
      )}
    </div>
  );
}

export default RoomMembers;
