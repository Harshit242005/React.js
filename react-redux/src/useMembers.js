import { useSelector } from 'react-redux';
const useMembers = () => {
    const members = useSelector((state) => state.memberids.members);
    return {
        members,
    }
}

export default useMembers;