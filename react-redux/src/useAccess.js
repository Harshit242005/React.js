// getting the 
import { useSelector } from 'react-redux';
const useAccess = () => {
    const access = useSelector((state) => state.access.Access);
    return {
        access
    };
};

export default useAccess;