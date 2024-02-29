// import React from 'react';
import useMembers from './useMembers';

function RoomMembers() {
  const { members } = useMembers();

  return (
    <div>
      {members && members.length > 0 ? (
        members.map((element, index) => (
          <p key={index}>{element}</p>
        ))
      ) : (
        <p>No one has joined the room yet</p>
      )}
    </div>
  );
}

export default RoomMembers;
