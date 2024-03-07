import { useSelector } from 'react-redux';

const useRoomMember = () => {
    const roomNameForMember = useSelector((state) => state.join_room.join_room_name);
    return {
        roomNameForMember,
    };
};

export default useRoomMember;