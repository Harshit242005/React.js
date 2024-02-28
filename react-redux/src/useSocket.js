// useSocket.js
import { useSelector } from 'react-redux';

const useSocket = () => {
  const socketId = useSelector((state) => state.socket.socketId);

  return {
    socketId,
  };
};

export default useSocket;
