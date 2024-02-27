// useSocket.js
import { useSelector } from 'react-redux';

const useSocket = () => {
  const socketId = useSelector((state) => state.socket.socketId);

  // Additional logic related to socket connection can be added here

  return {
    socketId,
  };
};

export default useSocket;
