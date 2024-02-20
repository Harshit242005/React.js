
import { useDispatch, useSelector } from 'react-redux';
import { incrementAction, decrementAction } from './Action'; // Import your action creators

function Counter() {
    const counter = useSelector((state) => state.counter); // Assuming 'counter' is a slice of state
    const dispatch = useDispatch();

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={() => dispatch(incrementAction())}>Increment</button>
            <button onClick={() => dispatch(decrementAction())}>Decrement</button>
        </div>
    )
}

export default Counter