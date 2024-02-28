import { useSelector } from 'react-redux';

const useRoom = () => {
    const roomName = useSelector((state) => state.room.roomName);
    return {
        roomName,
    };
};

export default useRoom;